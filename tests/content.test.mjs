import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { literal, importContent, root } from '../scripts/import-content.mjs';

const baseline = JSON.parse(
  await readFile(join(root, 'tests/fixtures/source-manifest.json'), 'utf8'),
);
const expectedPages = JSON.parse(await readFile(join(root, 'tests/fixtures/counts.json'), 'utf8'));
const catalog = await importContent();
const sha = (bytes) => createHash('sha256').update(bytes).digest('hex');

test('os 31 HTMLs originais e as cópias publicadas permanecem byte a byte iguais ao acervo auditado', async () => {
  const files = (await readdir(join(root, 'MissaoAprovacaoGeo'))).filter((file) =>
    file.endsWith('.html'),
  );
  assert.equal(files.length, baseline.files.length);
  for (const source of baseline.files) {
    const original = await readFile(join(root, source.path));
    assert.equal(sha(original), source.sha256, source.path);
    assert.deepEqual(
      await readFile(join(root, 'public/legacy', source.path.split('/').at(-1))),
      original,
    );
  }
});

test('contagens de cada página coincidem com a auditoria independente', () => {
  assert.deepEqual(catalog.totals, {
    pages: 31,
    lessons: 30,
    stages: 542,
    questions: 1327,
    flashcards: 1494,
    game: 3000,
    recall: 452,
  });
  assert.equal(catalog.resources.length, 1);
  for (const expected of expectedPages) {
    const lesson = catalog.lessons.find((lesson) => lesson.sourcePath === expected.sourcePath);
    assert.ok(lesson, expected.sourcePath);
    assert.deepEqual(lesson.counts, expected.counts, expected.sourcePath);
  }
});

test('evocação, suplementos, fontes e estruturas completas sobrevivem à extração', async () => {
  for (const lesson of catalog.lessons) {
    const content = JSON.parse(await readFile(join(root, 'public', lesson.contentUrl), 'utf8'));
    assert.equal(content.contentVersion, lesson.sourceHash);
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

test('variantes são mantidas como lições e versões distintas, com as chaves legadas registradas', () => {
  const cartografia = catalog.lessons.filter((lesson) => lesson.number === 3);
  assert.equal(cartografia.length, 2);
  assert.notEqual(cartografia[0].id, cartografia[1].id);
  assert.notEqual(cartografia[0].sourceHash, cartografia[1].sourceHash);
  assert.equal(cartografia[0].storage.current, 'seducpa_t3_carto2_v26');
  assert.equal(cartografia[1].storage.current, 'seducpa_t3_carto2_v26');
  assert.equal(catalog.lessons.filter((lesson) => lesson.number === 17).length, 2);
  assert.equal(catalog.lessons.filter((lesson) => lesson.number === 18).length, 2);
});

test('importador recusa executar expressões de código dentro dos dados', () => {
  assert.throws(() => literal({ type: 'CallExpression' }), /não suportada/);
  assert.throws(
    () => literal({ type: 'TemplateLiteral', expressions: [{}], quasis: [] }),
    /Interpolação/,
  );
});
