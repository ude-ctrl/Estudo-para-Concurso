import { readFile, writeFile, readdir, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { parse as parseScript } from '@babel/parser';
import { parse as parseHtml } from 'parse5';
import { loadEditorialRevisions, applyEditorialRevisions } from './editorial-revisions.mjs';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const hash = (value) => createHash('sha256').update(value).digest('hex');
const bankNames = new Set(['K', 'OLDK', 'PRE', 'B', 'CH', 'C', 'G', 'X']);
const supplementNames = new Set(['matrixBox', 'discBox', 'teacherBox']);

export function walk(node, fn) {
  fn(node);
  for (const child of node.childNodes ?? []) walk(child, fn);
}

function text(node) {
  return node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
}
function attr(node, key) {
  return node.attrs?.find((a) => a.name === key)?.value;
}
function find(document, predicate) {
  let result;
  walk(document, (node) => {
    if (!result && predicate(node)) result = node;
  });
  return result;
}
function innerSource(node, source) {
  const location = node?.sourceCodeLocation;
  return location?.startTag && location?.endTag
    ? source.slice(location.startTag.endOffset, location.endTag.startOffset)
    : '';
}

// Only literal content is accepted. No original application code is executed.
export function literal(node) {
  if (!node) throw new Error('Conteúdo sem inicializador.');
  switch (node.type) {
    case 'StringLiteral':
    case 'NumericLiteral':
    case 'BooleanLiteral':
      return node.value;
    case 'NullLiteral':
      return null;
    case 'TemplateLiteral':
      if (node.expressions.length) throw new Error('Interpolação não prevista no conteúdo.');
      return node.quasis.map((q) => q.value.cooked ?? q.value.raw).join('');
    case 'UnaryExpression':
      if (node.operator === '-' || node.operator === '+')
        return node.operator === '-' ? -literal(node.argument) : +literal(node.argument);
      break;
    case 'ArrayExpression':
      return node.elements.map(literal);
    case 'ObjectExpression': {
      const value = Object.create(null);
      for (const property of node.properties) {
        if (property.type !== 'ObjectProperty' || property.computed)
          throw new Error('Propriedade dinâmica não prevista.');
        const key =
          property.key.type === 'Identifier' ? property.key.name : String(literal(property.key));
        if (['__proto__', 'constructor', 'prototype'].includes(key))
          throw new Error('Nome de propriedade não permitido.');
        value[key] = literal(property.value);
      }
      return value;
    }
  }
  throw new Error(`Expressão de conteúdo não suportada: ${node.type}`);
}

export function extract(source, sourcePath) {
  const document = parseHtml(source, { sourceCodeLocationInfo: true });
  const title = text(find(document, (n) => n.tagName === 'title')).trim();
  const scripts = [];
  walk(document, (node) => {
    if (node.tagName === 'script' && !attr(node, 'src')) scripts.push(text(node));
  });
  const banks = Object.create(null),
    supplements = {},
    writes = [];
  for (const script of scripts) {
    const ast = parseScript(script, { sourceType: 'script' });
    for (const node of ast.program.body) {
      if (node.type === 'VariableDeclaration') {
        for (const declaration of node.declarations) {
          if (declaration.id.type === 'Identifier' && bankNames.has(declaration.id.name))
            banks[declaration.id.name] = literal(declaration.init);
        }
      }
      if (node.type === 'ExpressionStatement' && node.expression.type === 'AssignmentExpression') {
        const assignment = node.expression,
          left = assignment.left;
        if (
          assignment.operator === '=' &&
          left.type === 'MemberExpression' &&
          !left.computed &&
          left.object.type === 'MemberExpression' &&
          left.object.computed &&
          left.object.object.name === 'B'
        ) {
          writes.push({
            index: literal(left.object.property),
            field: left.property.name,
            value: literal(assignment.right),
          });
        }
      }
      if (node.type === 'FunctionDeclaration' && supplementNames.has(node.id.name)) {
        if (node.body.body.length !== 1 || node.body.body[0].type !== 'ReturnStatement')
          throw new Error(`${sourcePath}: suplemento dinâmico ${node.id.name}.`);
        supplements[node.id.name] = literal(node.body.body[0].argument);
      }
    }
  }
  for (const write of writes) {
    if (!banks.B?.[write.index] || !['r', 'ra'].includes(write.field))
      throw new Error(`${sourcePath}: escrita de conteúdo desconhecida.`);
    banks.B[write.index][write.field] = write.value;
  }
  const staticContent = {};
  for (const id of ['tab-study', 'fontes', 'audit', 'gaps', 'phase']) {
    const node = find(document, (n) => attr(n, 'id') === id);
    if (node) staticContent[id] = innerSource(node, source);
  }
  return { title, banks, supplements, staticContent };
}

function category(number, file) {
  if (number === 1) return 'Fundamentos';
  if (number === 2 || number === 3 || file.includes('Cartografia_Geotecnologias'))
    return 'Cartografia';
  if (number >= 4 && number <= 9) return 'Geografia física';
  if (number >= 10 && number <= 16) return 'Geografia humana';
  if (number >= 17 && number <= 21 && !file.includes('BNCC')) return 'Amazônia e Pará';
  if (file.includes('BNCC') || number === 23 || number === 24) return 'Educação';
  return 'Conhecimentos gerais';
}

export function validateBanks(banks, sourcePath) {
  for (const key of ['PRE', 'B', 'CH', 'C', 'G'])
    if (!Array.isArray(banks[key])) throw new Error(`${sourcePath}: banco ${key} ausente.`);
  const questions = [...banks.PRE, ...banks.B.flatMap((stage) => stage.qs), ...banks.CH];
  for (const q of questions) {
    if (
      typeof q.p !== 'string' ||
      !Array.isArray(q.o) ||
      !Number.isInteger(q.c) ||
      q.c < 0 ||
      q.c >= q.o.length
    )
      throw new Error(`${sourcePath}: questão inválida.`);
  }
  for (const stage of banks.B)
    if (typeof stage.h !== 'string' || typeof stage.t !== 'string')
      throw new Error(`${sourcePath}: etapa inválida.`);
  for (const card of banks.C)
    if (card.length !== 3 || card.some((value) => typeof value !== 'string'))
      throw new Error(`${sourcePath}: flashcard inválido.`);
  for (const item of banks.G)
    if (typeof item.v !== 'boolean' || typeof item.t !== 'string' || typeof item.x !== 'string')
      throw new Error(`${sourcePath}: item de game inválido.`);
}

export async function importContent() {
  const sourceDir = join(root, 'MissaoAprovacaoGeo'),
    outputDir = join(root, 'public/content'),
    legacyDir = join(root, 'public/legacy');
  const names = (await readdir(sourceDir)).filter((file) => file.endsWith('.html')).sort();
  const revisions = await loadEditorialRevisions(root);
  for (const revision of revisions)
    if (!names.some((name) => revision.sourcePath === `MissaoAprovacaoGeo/${name}`))
      throw new Error(`Fonte de revisão desconhecida: ${revision.sourcePath}`);
  const manifest = {
    schemaVersion: 1,
    lessons: [],
    legacyBackupSources: [],
    resources: [],
    totals: {
      pages: names.length,
      lessons: 0,
      stages: 0,
      questions: 0,
      flashcards: 0,
      game: 0,
      recall: 0,
    },
  };
  const imports = [];
  const archive = [];
  const published = new Map();
  for (const name of names) {
    const sourcePath = `MissaoAprovacaoGeo/${name}`,
      bytes = await readFile(join(sourceDir, name)),
      source = bytes.toString('utf8');
    const revision = applyEditorialRevisions(source, sourcePath, revisions, literal);
    published.set(name, revision.source);
    const sourceHash = hash(bytes),
      contentVersion = hash(revision.source),
      id = `lesson-${hash(sourcePath).slice(0, 12)}`,
      extracted = extract(revision.source, sourcePath);
    const legacyUrl = `legacy/${name}`;
    if (!extracted.banks.B) {
      manifest.resources.push({
        id: `resource-${hash(sourcePath).slice(0, 12)}`,
        title: extracted.title,
        sourcePath,
        sourceHash,
        contentVersion,
        editorialVersions: revision.versions,
        legacyUrl,
      });
    } else {
      const { banks } = extracted;
      validateBanks(banks, sourcePath);
      const number = Number(name.match(/Tema_(\d+)/)?.[1]),
        stageQuestions = banks.B.reduce((n, stage) => n + stage.qs.length, 0);
      const counts = {
        stages: banks.B.length,
        stageQuestions,
        diagnostic: banks.PRE.length,
        boss: banks.CH.length,
        questions: stageQuestions + banks.PRE.length + banks.CH.length,
        flashcards: banks.C.length,
        game: banks.G.length,
        recall: banks.B.filter((stage) => stage.r).length,
      };
      const legacyQuestionKeys = banks.B.flatMap((stage, i) =>
        stage.qs.map((_, j) => `b_${i}_${j}`),
      ).concat(banks.CH.map((_, i) => `c_${i}`));
      const legacyQuestionOptions = Object.fromEntries(
        banks.B.flatMap((stage, i) => stage.qs.map((q, j) => [`b_${i}_${j}`, q.o.length])).concat(
          banks.CH.map((q, i) => [`c_${i}`, q.o.length]),
        ),
      );
      const lesson = {
        id,
        code: `T${String(number).padStart(2, '0')}`,
        number,
        title: extracted.title.split('·')[2]?.trim() || extracted.title,
        originalTitle: extracted.title,
        category: category(number, name),
        edition: extracted.title.includes('v2.5') ? 'v2.5' : 'v2.6',
        audited: name.includes('AUDITADA') || extracted.title.includes('Auditada'),
        sourcePath,
        sourceHash,
        contentVersion,
        editorialVersions: revision.versions,
        legacyUrl,
        contentUrl: `content/${id}.json`,
        storage: {
          current: banks.K,
          previous: banks.OLDK?.startsWith('__sem_legado') ? null : banks.OLDK || null,
        },
        counts,
        legacyQuestionKeys,
        legacyQuestionOptions,
      };
      if (lesson.category === 'Cartografia') {
        if (revision.versions.length)
          throw new Error(`${sourcePath}: fonte canônica arquivada não admite revisão legada.`);
        archive.push(lesson);
        const { id, sourceHash, storage } = lesson;
        manifest.legacyBackupSources.push({ id, sourceHash, storage });
      } else manifest.lessons.push(lesson);
      for (const key of ['stages', 'questions', 'flashcards', 'game', 'recall'])
        manifest.totals[key] += counts[key];
      imports.push({
        file: `${id}.json`,
        value: {
          schemaVersion: 1,
          lessonId: id,
          contentVersion,
          sourceHash,
          editorialVersions: revision.versions,
          editorialChanges: revision.edits,
          sourcePath,
          ...extracted,
        },
      });
    }
  }
  const historicalTotals = {
    ...manifest.totals,
    lessons: manifest.lessons.length + archive.length,
  };
  manifest.totals = {
    pages: manifest.lessons.length + manifest.resources.length,
    lessons: manifest.lessons.length,
    ...Object.fromEntries(
      ['stages', 'questions', 'flashcards', 'game', 'recall'].map((key) => [
        key,
        manifest.lessons.reduce((n, lesson) => n + lesson.counts[key], 0),
      ]),
    ),
  };
  // Extraction is complete before replacing generated outputs.
  await rm(outputDir, { recursive: true, force: true });
  await rm(legacyDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });
  await mkdir(legacyDir, { recursive: true });
  for (const name of names) await writeFile(join(legacyDir, name), published.get(name));
  for (const entry of imports)
    await writeFile(join(outputDir, entry.file), JSON.stringify(entry.value));
  await writeFile(join(outputDir, 'catalog.json'), JSON.stringify(manifest));
  await writeFile(
    join(outputDir, 'archive-catalog.json'),
    JSON.stringify({ schemaVersion: 1, lessons: archive, historicalTotals }),
  );
  console.log(
    `Importação íntegra: ${names.length} fontes preservadas; ${manifest.lessons.length} materiais ativos com revisões versionadas; ${archive.length} fontes de Cartografia somente no arquivo de auditoria.`,
  );
  return manifest;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  await importContent();
