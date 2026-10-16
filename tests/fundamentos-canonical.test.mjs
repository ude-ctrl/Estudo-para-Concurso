import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { parseFragment } from 'parse5';
import {
  root,
  sha,
  resources,
  readBundle,
  validateBundle,
  validateLiteralSnapshot,
  validateRevision,
  validateLot,
  loadApprovedUnit,
  reviewDigest,
} from '../scripts/canonical-content.mjs';
import { buildV6 } from '../scripts/build-v6.mjs';

const baseRoot = resolve(root, 'base-conhecimento');
const unit = 'fundamentos-geografia';
const at = '2026-10-16T18:00:00Z';
const initial = await readBundle(baseRoot, unit, '0.1.0');
const canonical = await readBundle(baseRoot, unit, '1.0.0');
const baseline = JSON.parse(
  await readFile(resolve(baseRoot, 'fundamentos/baseline-fundamentos.json'), 'utf8'),
);
const content = canonical.base.content;
const original = baseline.extracted;
const questionRows = (banks) => [
  ...banks.PRE.map((q, i) => [`pre_${i}`, q]),
  ...banks.B.flatMap((stage, i) => stage.qs.map((q, j) => [`b_${i}_${j}`, q])),
  ...banks.CH.map((q, i) => [`c_${i}`, q]),
];
const byRef = (items, ref) => items.find((item) => item.refs?.some((r) => r.legacy_id === ref));
const payload = (bundle) => ({
  content: bundle.base.content,
  support: bundle.base.support,
  metadata: bundle.base.metadata,
});
const clone = () => structuredClone(initial);
const normal = (text) => text.normalize('NFKC').trim().replace(/\s+/g, ' ').toLowerCase();
const nodes = (node) => [node, ...(node.childNodes || []).flatMap(nodes)];

test('Fundamentos tem candidata preservada e primeira edição canônica, com parecer por IA e 12 critérios', () => {
  assert.equal(validateBundle(initial, { at }).approved, false);
  assert.equal(validateBundle(canonical, { approved: true, at }).approved, true);
  validateRevision(initial, canonical);
  assert.deepEqual(initial.base.content, content);
  assert.deepEqual(initial.base.support, canonical.base.support);
  assert.equal(canonical.audit.premium_criteria.length, 12);
  assert.ok(canonical.audit.premium_criteria.every((c) => c.decision === 'approved'));
  assert.equal(canonical.audit.editorial_approval.reviewed_digest, reviewDigest(canonical));
  assert.equal(canonical.audit.editorial_approval.kind, 'delegated-ai');
  assert.equal(canonical.audit.human_approval, null);
  assert.ok(
    canonical.audit.authored_questions.every(
      (q) =>
        q.human_reviewer === null &&
        q.human_decision === 'pending' &&
        q.editorial_decision.kind === 'ai' &&
        q.editorial_decision.decision === 'approved',
    ),
  );
});

test('catálogo tem quatro bases aprovadas, 24 unidades não iniciadas e Fundamentos fora do consumidor', async () => {
  const result = await validateLot(baseRoot, { at });
  assert.equal(result.canonicalUnits, 4);
  assert.equal(result.untouchedUnits, 24);
  await assert.rejects(loadApprovedUnit(baseRoot, unit, '1.0.0', { at }), /desabilitado/);
  await assert.rejects(loadApprovedUnit(baseRoot, unit, '0.1.0', { at }), /não aprovada/);
});

test('fonte histórica confere byte a byte e os 228 vínculos reproduzem o snapshot inicial', async () => {
  const raw = await readFile(resolve(root, baseline.source_path));
  assert.equal(sha(raw), '06bc7c51d80146f6b2f82a0c247d0d7babe56462dc33543ff025353ead69e683');
  assert.equal(baseline.source_sha256, sha(raw));
  assert.equal(validateLiteralSnapshot(initial, baseline).records, 228);
  assert.equal(resources(initial.base).length, 269);
  assert.equal(new Set(baseline.bindings.map((b) => b.legacy_id)).size, 228);
});

test('32 questões antigas mantêm identidades, todos os textos de alternativa anteriores e gabaritos', () => {
  const rows = questionRows(original.banks);
  assert.equal(rows.length, 32);
  for (const [key, old] of rows) {
    const current = byRef(content.questions, key);
    assert.ok(current, key);
    assert.equal(current.correct, current.options[old.c].id, key);
    assert.equal(current.options[old.c].text, old.o[old.c], key);
    assert.deepEqual(
      current.options.slice(0, old.o.length).map((o) => o.text),
      old.o,
      key,
    );
    assert.equal(current.pool, 'fixacao');
  }
  const positions = rows.map(([key]) => {
    const q = byRef(content.questions, key);
    return q.options.findIndex((o) => o.id === q.correct);
  });
  assert.deepEqual(
    [0, 1, 2, 3, 4].map((i) => positions.filter((v) => v === i).length),
    [9, 18, 5, 0, 0],
  );
});

test('faltas de feedback e quinta alternativa do antigo c_4 foram corrigidas sem inflar o Chefão', () => {
  for (const key of ['b_10_0', 'b_10_1', 'b_10_2']) {
    assert.equal(original.banks.X[key], undefined);
    const q = byRef(content.questions, key);
    assert.equal(q.options.length, 4);
    assert.ok(q.options.every((o) => o.feedback.length > 40));
  }
  const c4 = byRef(content.questions, 'c_4');
  assert.equal(c4.options.length, 5);
  assert.equal(c4.correct, c4.options[1].id);
  assert.ok(!c4.roles.includes('chefao'));
  assert.ok(c4.roles.includes('legacy-chefao'));
  assert.ok(!original.banks.CH[4].o.includes(c4.options[4].text));
});

test('48 questões e seis itens do Chefão têm gabarito único; novos itens Concurso e Elite são A–E autorais', () => {
  assert.equal(content.questions.length, 48);
  const pools = ['fixacao', 'concurso', 'elite'].map(
    (p) => content.questions.filter((q) => q.pool === p).length,
  );
  assert.deepEqual(pools, [32, 12, 4]);
  const authored = content.questions.filter((q) => q.origin === 'authored-codex');
  assert.equal(authored.length, 16);
  for (const q of content.questions) {
    assert.equal(q.options.filter((o) => o.id === q.correct).length, 1);
    assert.equal(new Set(q.options.map((o) => normal(o.text))).size, q.options.length);
    assert.equal(q.explanation, q.options.find((o) => o.id === q.correct).feedback);
    assert.ok(q.options.every((o) => o.feedback.length > 25));
  }
  assert.ok(authored.every((q) => q.options.length === 5 && q.refs.length === 0));
  const boss = content.questions.filter((q) => q.roles.includes('chefao'));
  assert.equal(boss.length, 6);
  assert.ok(boss.every((q) => q.options.length === 5 && q.cognitive >= 4 && q.pool !== 'fixacao'));
  assert.equal(content.questions.filter((q) => q.pool === 'real').length, 0);
});

test('cinco famílias explicitam pares próximos e o diagnóstico reutilizado não duplica o estoque', () => {
  const families = canonical.base.metadata.question_families;
  assert.equal(families.length, 5);
  for (const f of families) {
    assert.equal(f.independent_novelty, false);
    assert.equal(f.members.length, 2);
    assert.ok(
      f.members.every((id) => content.questions.find((q) => q.id === id)?.family_id === f.id),
    );
  }
  for (let i = 0; i < 3; i++) {
    const q = byRef(content.questions, `pre_${i}`);
    assert.ok(q.roles.includes('diagnostico') && q.roles.includes('pos-teste'));
  }
});

test('11 missões preservam a teoria corrigida, recebem aprofundamento e mantêm os quatro recalls históricos', () => {
  assert.equal(content.missions.length, 11);
  assert.equal(content.missions.flatMap((m) => m.sections).length, 22);
  const recalls = content.missions.flatMap((m) => m.recalls);
  assert.equal(recalls.length, 11);
  assert.ok(content.missions.every((m) => m.sections.length === 2 && m.recalls.length === 1));
  for (const [i, stage] of original.banks.B.entries()) {
    if (stage.r) {
      const recall = byRef(recalls, `B[${i}].recall`);
      assert.equal(recall.prompt, stage.r);
      assert.equal(recall.model, stage.ra);
    }
  }
  assert.equal(content.concepts.length, 27);
});

test('44 identidades de cartão e o conhecimento de Said/Escobar são conservados em 45 cartões explicativos', () => {
  assert.equal(content.cards.length, 45);
  for (let i = 0; i < 44; i++) assert.ok(byRef(content.cards, `C[${i}]`));
  assert.ok(
    content.cards.every((c) => c.answer && c.explanation && c.example && c.back.includes(c.answer)),
  );
  assert.match(byRef(content.cards, 'C[25]').answer, /Said/);
  assert.ok(
    content.cards.some(
      (c) => c.refs.length === 0 && /Escobar/.test(c.front) && c.derived_from === 'v6-fund-card-25',
    ),
  );
});

test('100 V/F mantêm as polaridades anteriores, justificativas e limites de uso como evidência de domínio', () => {
  assert.equal(content.game.length, 100);
  assert.equal(content.game.filter((g) => g.truth).length, 68);
  for (const [i, old] of original.banks.G.entries()) {
    const current = byRef(content.game, `G[${i}]`);
    assert.equal(current.truth, old.v, `G[${i}]`);
    assert.ok(current.justification.length > 20);
    assert.ok(current.qualityFlags.includes('not-standalone-mastery-evidence'));
  }
  assert.match(
    canonical.base.metadata.game_sampling.requirements.join(' '),
    /sem inverter gabaritos/,
  );
});

test('discursivas, três tabelas históricas e prática docente continuam recuperáveis e sem falsa rubrica oficial', () => {
  const archived = initial.provenance.archive;
  for (const id of ['discBox', 'teacherBox', 'matrixBox']) {
    const item = archived.find((a) => a.refs.some((r) => r.legacy_id === id));
    assert.equal(item.original, original.supplements[id]);
  }
  assert.equal(content.writing.length, 2);
  assert.ok(
    content.writing.every(
      (w) =>
        w.source_supplement === 'discBox' &&
        w.rubric_kind === 'didactic-not-official' &&
        w.rubric.length === 4 &&
        original.supplements.discBox.includes(w.prompt) &&
        original.supplements.discBox.includes(w.model),
    ),
  );
  const theoryTables = content.missions
    .flatMap((m) => m.sections)
    .flatMap((s) => nodes(parseFragment(s.html)))
    .filter((n) => n.tagName === 'table');
  const supplementTables = content.supplements
    .flatMap((s) => nodes(parseFragment(s.html)))
    .filter((n) => n.tagName === 'table');
  assert.equal(theoryTables.length + supplementTables.length, 3);
  const practice = canonical.base.support.teaching_practice[0];
  assert.equal(practice.official_duration, false);
  assert.equal(practice.recommended_minutes, 3);
});

test('tabela nova é hipotética, acessível como dados e matematicamente coerente com o item Elite', () => {
  const table = canonical.base.support.visuals.find((v) => v.id === 'v6-fund-visual-tempos');
  assert.equal(table.source_kind, 'authored-hypothetical');
  assert.deepEqual(table.heads, ['Bairro', 'Antes (min)', 'Depois (min)']);
  const [, beforeA, afterA] = table.rows[0],
    [, beforeB, afterB] = table.rows[1];
  assert.equal(afterA - beforeA, -20);
  assert.equal((afterA - beforeA) / beforeA, -0.5);
  assert.equal(afterB - beforeB, 15);
  assert.equal((afterB - beforeB) / beforeB, 0.75);
  const q = content.questions.find((q) => q.id === 'v6-fund-q-elite01');
  assert.equal(q.correct, q.options[2].id);
  assert.match(q.explanation, /não mecanismos causais, distância física/);
});

test('não há duplicatas textuais normalizadas de questões, cartões, V/F ou IDs de recurso', () => {
  for (const [items, field] of [
    [content.questions, 'prompt'],
    [content.cards, 'front'],
    [content.game, 'statement'],
  ])
    assert.equal(new Set(items.map((item) => normal(item[field]))).size, items.length);
  const ids = resources(canonical.base).map((r) => r.value.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('fontes distinguem consulta direta, resumo, excerto indexado e referência bibliográfica', () => {
  const meta = canonical.base.metadata;
  const bibliography = meta.sources.find((s) => s.id === 'bibliografia-conceitual');
  assert.equal(bibliography.verified_at, null);
  assert.equal(bibliography.verification, 'bibliographic-reference');
  assert.match(meta.sources.find((s) => s.id === 'correa-resumo').locator, /resumo secundário/);
  assert.equal(
    meta.historical_claims.find((s) => s.id === 'geiger-1967').verification,
    'corroborated-indexed-excerpts',
  );
  assert.ok(
    meta.sources
      .filter((s) => s.verification === 'indexed-excerpt')
      .every((s) => s.verified_at === null),
  );
  const railway = meta.temporal_claims.find((t) => t.id === 'fund-efc-2015');
  assert.equal(railway.reference_date, '2015-02-27');
  assert.match(railway.claim, /não descrição atualizada|em comunicado de 2015/);
});

test('vencimento, ausência de verificação ou data futura impedem consumir a edição aprovada', () => {
  assert.throws(
    () => validateBundle(canonical, { approved: true, at: '2026-11-16T12:00:00Z' }),
    /vencido/,
  );
  for (const [field, value, expected] of [
    ['verified_at', null, /não verificado/],
    ['verified_at', '2026-10-17', /futura/],
  ]) {
    const x = structuredClone(canonical);
    x.base.metadata.temporal_claims[0][field] = value;
    x.provenance.snapshot.metadata_sha256 = sha(x.base.metadata);
    // Synthetic in-memory tampering isolates the temporal gate, before the approval digest gate.
    x.audit.assisted_review.reviewed_payload_sha256 = sha(payload(x));
    assert.throws(() => validateBundle(x, { approved: true, at }), expected);
  }
});

test('contrato de progresso documenta as duas chaves e não afirma implementar migração nem retenção', () => {
  const migration = canonical.base.metadata.legacy_progress;
  assert.equal(migration.current_key, 't1i_v21');
  assert.equal(migration.previous_key, 't1i_v2');
  assert.equal(migration.implemented, false);
  assert.equal(migration.integration_gate, true);
  assert.equal(migration.questions.length, 32);
  assert.equal(migration.cards.length, 44);
  assert.equal(migration.game.length, 100);
  assert.ok(migration.questions.every((q) => /no new learning evidence or XP/.test(q.import_as)));
});

test('snapshot recusa perda de original, fonte divergente, alteração de payload e troca de roster', () => {
  const changedRaw = structuredClone(baseline);
  changedRaw.extracted.banks.PRE[0].p += ' alterado';
  assert.throws(() => validateLiteralSnapshot(initial, changedRaw), /Snapshot literal alterado/);
  const changedSource = clone();
  changedSource.provenance.snapshot.source_sha256 = '0'.repeat(64);
  assert.throws(
    () => validateLiteralSnapshot(changedSource, baseline),
    /Fonte histórica divergente/,
  );
  const changedText = clone();
  changedText.base.content.missions[0].sections[0].html += '<p>Sem revisão.</p>';
  assert.throws(() => validateLiteralSnapshot(changedText, baseline), /depois de fixada/);
  const changedRoster = structuredClone(baseline);
  changedRoster.initial_resource_ids.pop();
  assert.throws(() => validateLiteralSnapshot(initial, changedRoster), /perdeu ou substituiu/);
});

test('ponteiros inválidos e originais sem correspondência não passam pelo mapa de paridade', () => {
  for (const pointer of ['/banks/__proto__', '/banks/PRE/999', 'banks/PRE/0']) {
    const x = structuredClone(baseline),
      bundle = clone();
    x.bindings[0].pointer = pointer;
    bundle.provenance.legacy_bindings = x.bindings;
    assert.throws(() => validateLiteralSnapshot(bundle, x), /Ponteiro literal/);
  }
  const x = structuredClone(baseline),
    bundle = clone();
  x.bindings[0].sha256 = '0'.repeat(64);
  bundle.provenance.legacy_bindings = x.bindings;
  assert.throws(() => validateLiteralSnapshot(bundle, x), /Original literal sem destino/);
});

test('antes/depois falso, apagamento e caminho perigoso são rejeitados mesmo com hash da lista recalculado', () => {
  for (const change of [
    { before: 'texto anterior falso' },
    { after_exists: false },
    { path: '/banks/__proto__/polluted' },
  ]) {
    const bundle = clone(),
      x = structuredClone(baseline);
    Object.assign(bundle.provenance.previous_editorial_changes[0], change);
    x.initial_changes_sha256 = sha(bundle.provenance.previous_editorial_changes);
    assert.throws(() => validateLiteralSnapshot(bundle, x), /correção literal/);
  }
  assert.equal(Object.prototype.polluted, undefined);
});

test('teoria compilada precisa refletir também o hook auditado, mesmo recalculando o hash externo', () => {
  const bundle = clone(),
    x = structuredClone(baseline);
  bundle.base.content.missions[0].sections[0].hook = original.banks.B[0].hook;
  x.initial_payload_sha256 = sha(payload(bundle));
  assert.throws(() => validateLiteralSnapshot(bundle, x), /Teoria canônica diverge/);
});

test('edição aprovada recusa alteração posterior e ausência de decisão por item', () => {
  const changed = structuredClone(canonical);
  changed.base.content.cards[0].back += ' mudança';
  assert.throws(() => validateBundle(changed, { approved: true, at }), /difere do snapshot/);
  const pending = structuredClone(canonical);
  delete pending.audit.authored_questions[0].editorial_decision;
  assert.throws(
    () => validateBundle(pending, { approved: true, at }),
    /Revisão delegada dos itens pendente/,
  );
});

test('delegação e lotes recusam escopo sobreposto, snapshot fora do diretório e consolidação desconhecida', async (t) => {
  const temp = await mkdtemp(resolve(tmpdir(), 'fundamentos-catalog-'));
  t.after(() => rm(temp, { recursive: true, force: true }));
  await cp(baseRoot, temp, { recursive: true });
  const registry = JSON.parse(await readFile(resolve(temp, 'manifest.json'), 'utf8'));
  const cases = [
    [(r) => r.editorial_delegations[0].unit_ids.splice(0), /escopo autorizado/],
    [
      (r) => r.editorial_delegations.push(structuredClone(r.editorial_delegations[0])),
      /escopo autorizado/,
    ],
    [
      (r) => r.consolidation_lots[1].unit_ids.push(r.consolidation_lots[0].unit_ids[0]),
      /Unidades dos lotes/,
    ],
    [
      (r) => {
        r.consolidation_lots[1].baseline = '../manifest.json';
      },
      /Caminho de snapshot/,
    ],
    [
      (r) => {
        r.consolidation_lots[1].kind = 'unknown';
      },
      /Tipo de consolidação/,
    ],
  ];
  for (const [mutate, expected] of cases) {
    const r = structuredClone(registry);
    mutate(r);
    await writeFile(resolve(temp, 'manifest.json'), JSON.stringify(r));
    await assert.rejects(validateLot(temp, { at }), expected);
  }
});

test('banco público permanece exclusivamente Cartografia e conserva os mesmos bytes após a nova consolidação', async () => {
  const { content: active } = await buildV6({ at });
  assert.deepEqual(
    active.units.map((u) => u.id),
    ['cartografia-fundamentos', 'cartografia-representacao', 'geotecnologias'],
  );
  const built = JSON.stringify(active);
  assert.ok(!active.units.some((u) => u.id === unit));
  const committedBank = await readFile(resolve(root, 'public/v6/cartografia.json'));
  assert.equal(
    sha(committedBank),
    '574b248f3b9180dac5633d5d304eddc5598a98e4f150df8b087ecee341b2af05',
  );
  assert.equal(sha(JSON.parse(committedBank)), sha(active));
  assert.ok(!built.includes('v6-fund-q-'));
});
