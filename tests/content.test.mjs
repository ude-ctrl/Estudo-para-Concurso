import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { literal, extract, importContent, root } from '../scripts/import-content.mjs';
import {
  loadEditorialRevisions,
  applyEditorialRevisions,
} from '../scripts/editorial-revisions.mjs';

const baseline = JSON.parse(
  await readFile(join(root, 'tests/fixtures/source-manifest.json'), 'utf8'),
);
const expectedPages = JSON.parse(await readFile(join(root, 'tests/fixtures/counts.json'), 'utf8'));
const catalog = await importContent();
const archive = JSON.parse(
  await readFile(join(root, 'public/content/archive-catalog.json'), 'utf8'),
);
const allLessons = [...catalog.lessons, ...archive.lessons];
const sha = (bytes) => createHash('sha256').update(bytes).digest('hex');
const revisions = await loadEditorialRevisions(root);

test('os 31 HTMLs históricos permanecem byte a byte iguais; somente cópias com revisão mudam', async () => {
  const files = (await readdir(join(root, 'MissaoAprovacaoGeo'))).filter((file) =>
    file.endsWith('.html'),
  );
  assert.equal(files.length, baseline.files.length);
  for (const source of baseline.files) {
    const original = await readFile(join(root, source.path));
    assert.equal(sha(original), source.sha256, source.path);
    const published = await readFile(join(root, 'public/legacy', source.path.split('/').at(-1)));
    if (!revisions.some((revision) => revision.sourcePath === source.path))
      assert.deepEqual(published, original);
    else {
      const lesson = allLessons.find((item) => item.sourcePath === source.path);
      assert.equal(sha(published), lesson.contentVersion);
      assert.notEqual(lesson.contentVersion, lesson.sourceHash);
    }
  }
});

test('contagens de cada página coincidem com a auditoria independente', () => {
  assert.deepEqual(archive.historicalTotals, {
    pages: 31,
    lessons: 30,
    stages: 542,
    questions: 1327,
    flashcards: 1494,
    game: 3000,
    recall: 452,
  });
  assert.equal(catalog.resources.length, 1);
  assert.equal(catalog.lessons.length, 26);
  assert.equal(archive.lessons.length, 4);
  assert.equal(
    catalog.lessons.some((lesson) => lesson.category === 'Cartografia'),
    false,
  );
  assert.equal(catalog.totals.flashcards, 1294);
  assert.equal(catalog.legacyBackupSources.length, 4);
  for (const expected of expectedPages) {
    const lesson = allLessons.find((lesson) => lesson.sourcePath === expected.sourcePath);
    assert.ok(lesson, expected.sourcePath);
    assert.deepEqual(lesson.counts, expected.counts, expected.sourcePath);
  }
});

test('evocação, suplementos, fontes e estruturas completas sobrevivem à extração', async () => {
  for (const lesson of allLessons) {
    const content = JSON.parse(await readFile(join(root, 'public', lesson.contentUrl), 'utf8'));
    assert.equal(content.contentVersion, lesson.contentVersion);
    assert.equal(content.sourceHash, lesson.sourceHash);
    for (const name of ['matrixBox', 'discBox', 'teacherBox'])
      assert.ok(content.supplements[name]?.includes('<details'), `${lesson.sourcePath}: ${name}`);
    assert.ok(content.staticContent['tab-study']);
    assert.ok(content.staticContent.fontes);
    for (const stage of content.banks.B)
      if (stage.r) assert.ok(stage.ra, `${lesson.sourcePath}: resposta de evocação`);
  }
  const t01 = catalog.lessons.find((lesson) => lesson.number === 1);
  const content = JSON.parse(await readFile(join(root, 'public', t01.contentUrl), 'utf8'));
  assert.equal(
    content.banks.B[3].r,
    'Sem olhar para o texto: explique em até 3 frases a diferença entre sistema de objetos, sistema de ações e rugosidade.',
  );
  assert.equal(content.banks.G.filter((item) => item.v).length, 68);
});

test('fontes de Cartografia ficam apenas no arquivo de auditoria, com IDs e chaves preservados', () => {
  const cartografia = allLessons.filter((lesson) => lesson.number === 3);
  assert.equal(cartografia.length, 2);
  assert.notEqual(cartografia[0].id, cartografia[1].id);
  assert.notEqual(cartografia[0].sourceHash, cartografia[1].sourceHash);
  assert.equal(cartografia[0].storage.current, 'seducpa_t3_carto2_v26');
  assert.equal(cartografia[1].storage.current, 'seducpa_t3_carto2_v26');
  assert.equal(allLessons.filter((lesson) => lesson.number === 17).length, 2);
  assert.equal(allLessons.filter((lesson) => lesson.number === 18).length, 2);
});

test('importador recusa executar expressões de código dentro dos dados', () => {
  assert.throws(() => literal({ type: 'CallExpression' }), /não suportada/);
  assert.throws(
    () => literal({ type: 'TemplateLiteral', expressions: [{}], quasis: [] }),
    /Interpolação/,
  );
});

test('conteúdo publicado difere do histórico exclusivamente nos campos editoriais revisados', async () => {
  for (const lesson of allLessons) {
    const original = extract(
      await readFile(join(root, lesson.sourcePath), 'utf8'),
      lesson.sourcePath,
    );
    const expected = structuredClone(original);
    const selected = revisions.filter((revision) => revision.lessonId === lesson.id);
    for (const revision of selected) {
      for (const edit of revision.edits) {
        let parent = expected.banks;
        for (const part of edit.path.slice(0, -1)) parent = parent[part];
        const key = edit.path.at(-1);
        assert.deepEqual(parent[key], edit.before, `${lesson.id}: valor auditado`);
        parent[key] = edit.after;
      }
    }
    const published = await readFile(join(root, 'public', lesson.legacyUrl), 'utf8');
    const actual = extract(published, lesson.sourcePath);
    assert.deepEqual(
      JSON.parse(JSON.stringify(actual)),
      JSON.parse(JSON.stringify(expected)),
      lesson.id,
    );
    const json = JSON.parse(await readFile(join(root, 'public', lesson.contentUrl), 'utf8'));
    assert.deepEqual(json.banks, JSON.parse(JSON.stringify(actual.banks)));
    assert.deepEqual(
      json.editorialVersions,
      selected.map((revision) => revision.version),
    );
    const keys = (banks) =>
      [...banks.PRE, ...banks.B.flatMap((b) => b.qs), ...banks.CH].map((q) => q.c);
    assert.deepEqual(keys(actual.banks), keys(original.banks), 'não reclassifica respostas salvas');
    assert.deepEqual(
      actual.banks.G.map((g) => g.v),
      original.banks.G.map((g) => g.v),
    );
    assert.equal(actual.banks.K, original.banks.K);
    assert.equal(actual.banks.OLDK, original.banks.OLDK);
  }
});

test('revisão interrompe a importação diante de fonte divergente, caminho proibido ou duplicata', async () => {
  const revision = structuredClone(revisions.find((r) => r.edits[0].path[0] === 'G'));
  const source = await readFile(join(root, revision.sourcePath), 'utf8');
  const apply = (rows) => applyEditorialRevisions(source, revision.sourcePath, rows, literal);
  assert.throws(() => apply([{ ...revision, sourceHash: 'desatualizado' }]), /fonte auditada/);
  const changed = structuredClone(revision);
  changed.edits[0].before = 'Não corresponde ao texto auditado';
  assert.throws(() => apply([changed]), /valor anterior divergente/);
  const forbidden = structuredClone(revision);
  forbidden.edits[0].path = ['G', 0, 'v'];
  assert.throws(() => apply([forbidden]), /caminho editorial proibido/);
  assert.throws(() => apply([revision, revision]), /repetido/);
});

test('texto editorial com delimitador HTML permanece dado literal, sem fechar o script', async () => {
  const revision = structuredClone(revisions.find((r) => r.edits[0].path[0] === 'G'));
  revision.edits = revision.edits.slice(0, 1);
  const edit = revision.edits[0];
  edit.after = 'Exemplo textual: </script><script>throw new Error("não executar")</script>';
  const source = await readFile(join(root, revision.sourcePath), 'utf8');
  const result = applyEditorialRevisions(source, revision.sourcePath, [revision], literal);
  assert.equal(result.source.includes(edit.after), false);
  assert.equal(extract(result.source, revision.sourcePath).banks.G[edit.path[1]].x, edit.after);
});
