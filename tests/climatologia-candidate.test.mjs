import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parse } from 'parse5';
import { buildCandidate, candidatePath } from '../scripts/build-climatologia-candidate.mjs';
import { preview } from '../scripts/preview-climatologia.mjs';
import { root, sha, validateBundle, resources } from '../scripts/canonical-content.mjs';
import { walk } from '../scripts/import-content.mjs';

const bundle = await buildCandidate(),
  { base, provenance, audit } = bundle;
const inventory = JSON.parse(
  await readFile(resolve(root, 'docs/v6-climatologia/inventario-paridade.json'), 'utf8'),
);
test('candidata satisfaz contrato existente, sem alegar aprovação', () => {
  assert.deepEqual(validateBundle(bundle), {
    unit: 'climatologia',
    version: '0.1.0',
    status: 'EM_AUDITORIA',
    resources: 249,
    parity: 215,
    approved: false,
  });
  assert.throws(() => validateBundle(bundle, { approved: true }), /não aprovada/);
  assert.equal(audit.human_approval, null);
});
test('arquivos versionados são reproduzíveis', async () => {
  for (const [file, value] of Object.entries({
    'content.json': base,
    'provenance.json': provenance,
    'audit.json': audit,
  }))
    assert.deepEqual(JSON.parse(await readFile(resolve(candidatePath, file), 'utf8')), value);
  assert.equal(await readFile(resolve(candidatePath, 'previa.html'), 'utf8'), preview(base));
  const published = await readFile(resolve(root, 'public/previas/climatologia.html'), 'utf8');
  assert.equal(published, preview(base, { published: true }));
  assert.match(published, /em revisão/);
  assert.match(published, /não registra respostas nem altera seu progresso/);
  assert.match(published, /href="\.\.\/"/);
});
test('215 originais e a fonte histórica têm hashes intactos', async () => {
  assert.equal(sha(await readFile(resolve(root, inventory.source))), inventory.source_sha256);
  assert.equal(provenance.archive.length, 215);
  for (const r of inventory.records) {
    const a = provenance.archive.find((a) => a.id === r.proposed_id);
    assert.deepEqual(a.original, r.original);
    assert.equal(sha(a.original), r.sha256);
  }
});
test('34 gabaritos e todas as alternativas históricas são preservados', () => {
  const old = inventory.records.filter((r) => r.kind === 'question');
  assert.equal(old.length, 34);
  for (const r of old) {
    const q = base.content.questions.find((q) => q.id === r.proposed_id);
    assert.deepEqual(
      q.options.map((o) => o.text),
      r.original.o,
    );
    assert.equal(q.correct, q.options[r.original.c].id);
    assert.equal(q.legacy_progress_key, r.legacy_id);
  }
  assert.equal(base.content.questions.filter((q) => q.options.length === 4).length, 29);
  assert.equal(base.content.questions.filter((q) => q.options.length === 5).length, 9);
});
test('todas as alterações textuais registram antes/depois aplicável em sequência', () => {
  const copy = structuredClone(inventory.records);
  for (const ch of base.content.editorialChanges) {
    const r = copy.find((r) => r.legacy_id === ch.legacy_id),
      path = ch.field ? ch.field.split('.') : [];
    const parent = path.length ? path.slice(0, -1).reduce((v, k) => v[k], r.original) : r;
    const key = path.length ? path.at(-1) : 'original';
    assert.equal(parent[key], ch.before);
    parent[key] = ch.after;
  }
  for (const r of copy) {
    const v = resources(base).find(({ value }) => value.id === r.proposed_id).value;
    if (r.kind === 'theory') assert.deepEqual({ t: v.title, hook: v.hook, h: v.html }, r.original);
    if (r.kind === 'recall') assert.deepEqual({ prompt: v.prompt, answer: v.model }, r.original);
    if (r.kind === 'card') assert.deepEqual([v.category, v.front, v.back], r.original);
    if (r.kind === 'game')
      assert.deepEqual(
        { a: v.author_label, t: v.statement, v: v.truth, x: v.justification },
        r.original,
      );
    if (['static', 'supplement'].includes(r.kind)) assert.equal(v.html, r.original);
    if (r.kind === 'question')
      assert.deepEqual(
        {
          p: v.prompt,
          o: v.options.map((o) => o.text),
          c: v.options.findIndex((o) => o.id === v.correct),
          e: v.explanation,
          ex: v.options.map((o) => o.feedback),
        },
        r.original,
      );
  }
});
test('gabaritos V/F, recalls e estoque de cartões não desaparecem', () => {
  for (const r of inventory.records.filter((r) => r.kind === 'game'))
    assert.equal(base.content.game.find((g) => g.id === r.proposed_id).truth, r.original.v);
  assert.equal(base.content.game.filter((g) => g.truth).length, 50);
  assert.equal(base.content.cards.length, 50);
  assert.equal(base.content.missions.flatMap((m) => m.recalls).length, 13);
  assert.equal(base.content.writing.length, 2);
});
test('todo recurso de treino tem missão e conceito válidos; IDs não colidem', () => {
  const all = resources(base).map((r) => r.value.id);
  assert.equal(new Set(all).size, all.length);
  for (const q of [...base.content.questions, ...base.content.cards, ...base.content.game]) {
    assert.ok(base.content.missions.some((m) => m.id === q.mission));
    assert.ok(base.content.concepts.some((c) => c.id === q.concept && c.mission === q.mission));
  }
});
test('exercícios usam dados e resultados calculáveis, sem estação real inventada', () => {
  const [a, b] = base.support.visuals;
  assert.equal(a.rows.length, 12);
  assert.equal(b.rows.length, 12);
  assert.equal(
    a.rows.reduce((s, r) => s + r[2], 0),
    2680,
  );
  assert.equal(
    b.rows.reduce((s, r) => s + r[2], 0),
    1700,
  );
  assert.ok(
    Math.abs(Math.max(...a.rows.map((r) => r[1])) - Math.min(...a.rows.map((r) => r[1])) - 1.4) <
      1e-10,
  );
  assert.deepEqual(
    b.rows.filter((r) => r[2] < 60).map((r) => r[0]),
    ['Jun', 'Jul', 'Ago'],
  );
  const added = base.content.questions.filter((q) => q.origin === 'authored');
  assert.deepEqual(
    added.map((q) => q.options.findIndex((o) => o.id === q.correct)),
    [0, 2, 4, 1],
  );
  for (const v of [a, b]) {
    assert.match(v.caption, /hipotético/);
    assert.match(v.caption, /sem período observado/);
    assert.match(v.measurement_note, /não é uma normal/);
  }
});
test('prévia é estática, com tabelas, descrição, âncoras e IDs exclusivos', () => {
  const html = preview(base),
    ids = [],
    targets = [],
    charts = [],
    tables = [];
  walk(parse(html), (n) => {
    const a = Object.fromEntries((n.attrs || []).map((a) => [a.name, a.value]));
    if (a.id) ids.push(a.id);
    if (a.href?.startsWith('#')) targets.push(a.href.slice(1));
    if (n.tagName === 'svg') charts.push(a);
    if (n.tagName === 'caption') tables.push(n);
    assert.ok(!['script', 'iframe', 'textarea'].includes(n.tagName));
    for (const attr of n.attrs || []) assert.ok(!/^on/i.test(attr.name));
  });
  assert.equal(ids.length, new Set(ids).size);
  for (const target of targets) assert.ok(ids.includes(target), target);
  assert.equal(charts.length, 2);
  assert.equal(tables.length, 2);
  for (const c of charts) {
    assert.equal(c.role, 'img');
    for (const id of c['aria-labelledby'].split(' ')) assert.ok(ids.includes(id));
  }
});
test('runtime e registro canônico não ativam a candidata', async () => {
  const manifest = JSON.parse(
    await readFile(resolve(root, 'base-conhecimento/manifest.json'), 'utf8'),
  );
  const u = manifest.units.find((u) => u.unit_id === 'climatologia');
  assert.equal(u.canonical_version, null);
  assert.equal(u.runtime_enabled, false);
  const runtime = JSON.parse(await readFile(resolve(root, 'public/v6/plataforma.json'), 'utf8'));
  assert.ok(!JSON.stringify(runtime).includes('v6-clima-q-climograma-'));
  assert.equal(base.metadata.legacy_progress.implemented, false);
  assert.equal(base.metadata.legacy_progress.key, 'seducpa_t2_clima_v26');
  assert.equal(base.metadata.legacy_progress.import_placeholder, false);
});
test('validador rejeita adulteração de conteúdo, gabarito e procedência', () => {
  for (const mutate of [
    (b) => (b.base.content.questions[0].correct = 'missing'),
    (b) => (b.provenance.archive[0].original.t = 'alterado'),
    (b) => b.base.content.cards.pop(),
  ]) {
    const b = structuredClone(bundle);
    mutate(b);
    assert.throws(() => validateBundle(b));
  }
});
