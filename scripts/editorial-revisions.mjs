import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import { parse } from '@babel/parser';
import { parse as parseHtml } from 'parse5';

const sha = (value) => createHash('sha256').update(value).digest('hex');

export async function loadEditorialRevisions(root) {
  const directory = join(root, 'revisoes-conteudo');
  const revisions = [];
  for (const name of (await readdir(directory)).filter((name) => name.endsWith('.json')).sort()) {
    const revision = JSON.parse(await readFile(join(directory, name), 'utf8'));
    if (revision.schemaVersion !== 1 || !revision.version || !Array.isArray(revision.lessons))
      throw new Error(`Revisão editorial inválida: ${name}`);
    for (const lesson of revision.lessons)
      revisions.push({ ...lesson, version: revision.version, revisionFile: name });
  }
  return revisions;
}

function findValue(node, path) {
  if (!path.length) return node;
  const [key, ...rest] = path;
  if (node?.type === 'ArrayExpression' && Number.isInteger(key) && key >= 0)
    return findValue(node.elements[key], rest);
  if (node?.type === 'ObjectExpression' && typeof key === 'string') {
    const property = node.properties.find(
      (p) => p.type === 'ObjectProperty' && !p.computed && (p.key.name ?? p.key.value) === key,
    );
    return findValue(property?.value, rest);
  }
  return undefined;
}

function permittedPath(path) {
  if (!Array.isArray(path)) return false;
  const index = (n) => Number.isInteger(n) && n >= 0;
  return (
    (path.length === 3 && path[0] === 'G' && index(path[1]) && ['t', 'x'].includes(path[2])) ||
    (path.length === 5 &&
      path[0] === 'B' &&
      index(path[1]) &&
      path[2] === 'qs' &&
      index(path[3]) &&
      ['p', 'o', 'e', 'x'].includes(path[4])) ||
    (path.length === 2 && path[0] === 'X' && /^b_\d+_\d+$/.test(path[1]))
  );
}

// Changes are applied at build time to literal values, never by executing historical code.
// Paths deliberately exclude keys, answer indices, theory, XP and storage routines.
export function applyEditorialRevisions(source, sourcePath, revisions, readLiteral) {
  const selected = revisions.filter((r) => r.sourcePath === sourcePath);
  if (!selected.length) return { source, versions: [], edits: [] };
  const nodes = new Map();
  let opt;
  function walk(node) {
    if (node.tagName === 'script' && !node.attrs.some((a) => a.name === 'src')) {
      const offset = node.sourceCodeLocation.startTag.endOffset;
      const end = node.sourceCodeLocation.endTag.startOffset;
      const script = source.slice(offset, end);
      for (const statement of parse(script, { sourceType: 'script' }).program.body) {
        if (statement.type === 'VariableDeclaration') {
          for (const declaration of statement.declarations)
            if (declaration.id.type === 'Identifier')
              nodes.set(declaration.id.name, { node: declaration.init, offset });
        }
        if (statement.type === 'FunctionDeclaration' && statement.id.name === 'opt')
          opt = { start: offset + statement.start, end: offset + statement.end };
      }
    }
    for (const child of node.childNodes ?? []) walk(child);
  }
  walk(parseHtml(source, { sourceCodeLocationInfo: true }));
  const replacements = [],
    paths = new Set(),
    edits = [];
  let runtimeFixed = false;
  for (const revision of selected) {
    if (
      revision.sourceHash !== sha(source) ||
      revision.lessonId !== `lesson-${sha(sourcePath).slice(0, 12)}`
    )
      throw new Error(`${sourcePath}: revisão não corresponde à fonte auditada.`);
    if (!Array.isArray(revision.edits)) throw new Error(`${sourcePath}: alterações ausentes.`);
    for (const edit of revision.edits) {
      const key = JSON.stringify(edit.path);
      if (!permittedPath(edit.path) || paths.has(key))
        throw new Error(`${sourcePath}: caminho editorial proibido ou repetido: ${key}`);
      const bank = nodes.get(edit.path[0]);
      const node = findValue(bank?.node, edit.path.slice(1));
      if (!node || !isDeepStrictEqual(readLiteral(node), edit.before))
        throw new Error(`${sourcePath}: valor anterior divergente: ${key}`);
      const valid = Array.isArray(edit.before)
        ? Array.isArray(edit.after) &&
          edit.after.length === edit.before.length &&
          edit.after.every((value) => typeof value === 'string' && value.trim())
        : typeof edit.before === 'string' && typeof edit.after === 'string' && edit.after.trim();
      if (!valid || !edit.reason)
        throw new Error(`${sourcePath}: substituição editorial inválida: ${key}`);
      paths.add(key);
      replacements.push({
        start: bank.offset + node.start,
        end: bank.offset + node.end,
        value: JSON.stringify(edit.after).replace(/</g, '\\u003c'),
      });
      edits.push({ path: edit.path, reason: edit.reason, version: revision.version });
    }
    for (const fix of revision.runtimeFixes ?? []) {
      if (fix === 'agriculture-family-feedback' && opt && !runtimeFixed) {
        let body = source.slice(opt.start, opt.end);
        for (const [before, after] of [
          [':a;var h=', ':a,x=id==="b_7_0"?(q.x||[]):[];var h='],
          ["+'</i></p>'+(s?", "+'</i></p>'+(x[v]?'<p>'+esc(x[v])+'</p>':'')+(s?"],
          ["+q.o[q.c]+'.</b></p>')", "+q.o[q.c]+'.</b> '+(x[q.c]?esc(x[q.c]):'')+'</p>')"],
        ]) {
          if (body.split(before).length !== 2)
            throw new Error(`${sourcePath}: renderizador de feedback mudou.`);
          body = body.replace(before, after);
        }
        replacements.push({ ...opt, value: body });
        runtimeFixed = true;
        continue;
      }
      if (fix !== 'escape-question-text' || runtimeFixed || !opt)
        throw new Error(`${sourcePath}: correção de apresentação inválida.`);
      let body = source.slice(opt.start, opt.end);
      for (const expression of [
        'q.p',
        't',
        'q.o[v]',
        '(x[v]||"")',
        'q.o[q.c]',
        '(x[q.c]||"")',
        'q.e',
      ]) {
        const before = `+${expression}+`;
        if (body.split(before).length !== 2)
          throw new Error(`${sourcePath}: renderizador mudou: ${expression}`);
        body = body.replace(before, `+esc(${expression})+`);
      }
      replacements.push({ ...opt, value: body });
      runtimeFixed = true;
    }
  }
  // Non-overlapping source ranges preserve every byte outside the reviewed values/function.
  replacements.sort((a, b) => b.start - a.start);
  let previous = source.length;
  let revised = source;
  for (const replacement of replacements) {
    if (replacement.end > previous) throw new Error(`${sourcePath}: revisões sobrepostas.`);
    revised =
      revised.slice(0, replacement.start) + replacement.value + revised.slice(replacement.end);
    previous = replacement.start;
  }
  return { source: revised, versions: selected.map((r) => r.version), edits };
}
