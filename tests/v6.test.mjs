import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { parseFragment } from 'parse5';
import { readBundle, reconstructPilot } from '../scripts/canonical-content.mjs';
import { extract, root, walk } from '../scripts/import-content.mjs';
import {
  DAY,
  STATE_KEY,
  ERROR_KEY,
  attempt,
  fresh,
  importLegacy,
  mastery,
  schedule,
  rateCard,
  reviewQueue,
  makeExam,
  finishExam,
  blueprintAvailability,
  totalXP,
  localDay,
  streak,
  parseState,
  examPool,
} from '../src/v6/engine.ts';
import { assembleBlueprint, officialBlueprint } from '../src/v6/engine.ts';
import { Repository } from '../src/v6/repository.ts';
import { recognize } from '../src/v6/recognition.ts';
import { editorialReplacements } from '../scripts/v6-editorial.mjs';
import { trainingSessionMatches } from '../src/v6/training-session.ts';
import {
  bestStreak,
  expeditionComplete,
  missionJourney,
  personalLevel,
  recordSessionSummary,
  sensoryEvents,
  sensoryPreferences,
  sensoryQuiet,
} from '../src/v6/sensory.ts';
import { SensoryAudio, soundPatterns } from '../src/v6/sound.ts';
// Frozen pilot regression checks retain their original assertions. The operational canonical
// bank and its new consumer contract are exercised separately in canonical-runtime.test.mjs.
const snapshotRoot = root + '/base-conhecimento';
const snapshotUnits = ['cartografia-fundamentos', 'cartografia-representacao', 'geotecnologias'];
const frozen = await Promise.all(snapshotUnits.map((id) => readBundle(snapshotRoot, id, '0.1.0')));
const c = reconstructPilot(
    frozen,
    JSON.parse(await readFile(snapshotRoot + '/cartografia/baseline-piloto.json', 'utf8')),
  ),
  parity = JSON.parse(await readFile(root + '/MissaoAprovacaoGeo/V6_FASE14_PARIDADE.json', 'utf8')),
  now = Date.UTC(2026, 9, 15, 12),
  sha = (x) =>
    createHash('sha256')
      .update(typeof x === 'string' ? x : JSON.stringify(x))
      .digest('hex');
const entity = (id) =>
  [
    ...c.questions,
    ...c.cards,
    ...c.game,
    ...c.missions.flatMap((m) => m.recalls),
    ...c.writing,
    ...c.supplements,
    ...c.missions.flatMap((m) => m.sections),
  ].find((x) => x.id === id);
const q = c.questions.find((q) => q.id === 'v6-q-f01');
test('contrato: exatamente as três unidades e as 17 missões oficiais do piloto', () => {
  assert.deepEqual(
    c.units.map((u) => u.id),
    ['cartografia-fundamentos', 'cartografia-representacao', 'geotecnologias'],
  );
  assert.equal(c.missions.length, 17);
  assert.equal(new Set(c.missions.map((m) => m.id)).size, 17);
  for (const m of c.missions) {
    assert.ok(m.sections.length);
    assert.ok(m.conceptIds.length);
    assert.ok(c.questions.some((q) => q.mission === m.id));
  }
});
test('as três fontes conservam bytes, 50 etapas, 125 questões, 150 cards, 300 V/F e 39 recalls', async () => {
  assert.deepEqual(
    c.sources.map((s) => s.hash),
    [
      'cc976ddf7ca014693868786b4a6d306ba9d9d04a6fd13283856fb77662610906',
      '3295adad462b654cfdc8d27b280e2bb7e85593de228d5f45456de46aa0dde8aa',
      'a04ee219ef78757498e611179c6657cf578ca680da3520a3e8c9710a383d094f',
    ],
  );
  const expected = { theory: 50, question: 125, card: 150, game: 300, recall: 39 };
  for (const [kind, n] of Object.entries(expected))
    assert.equal(
      c.archive.filter(
        (a) => a.kind === kind && c.sources.some((s) => s.path === a.refs[0].legacy_source),
      ).length,
      n,
    );
  for (const source of c.sources) {
    const raw = await readFile(root + '/' + source.path, 'utf8');
    assert.equal(sha(raw), source.hash);
    const b = extract(raw, source.path).banks;
    for (let i = 0; i < b.B.length; i++) {
      const a = c.archive.find(
        (a) =>
          a.kind === 'theory' &&
          a.refs[0].legacy_source === source.path &&
          a.refs[0].legacy_id === 'B_' + i,
      );
      assert.equal(a.original.h, b.B[i].h);
      assert.equal(a.original.hook, b.B[i].hook);
      assert.equal(a.original.t, b.B[i].t);
    }
  }
});
test('todo registro tem destino canônico, ID de origem e hash verificável; contexto também é preservado', () => {
  for (const a of c.archive) {
    assert.ok(a.id && a.mission);
    assert.ok(entity(a.id) || a.kind === 'context', a.id);
    for (const r of a.refs) {
      assert.ok(r.legacy_source.startsWith('MissaoAprovacaoGeo/'));
      assert.ok(r.legacy_id);
      assert.equal(r.hash, sha(a.original));
    }
  }
  assert.equal(parity.records.length, c.archive.length);
});
test('125 gabaritos, alternativas, feedbacks e papéis históricos preservados sem conversão silenciosa', () => {
  for (const a of c.archive.filter((a) => a.kind === 'question')) {
    const q = entity(a.id);
    assert.equal(q.options.find((o) => o.id === q.correct).text, a.original.o[a.original.c]);
    assert.deepEqual(q.options.map((o) => o.text).sort(), [...a.original.o].sort());
    assert.ok(q.originalFeedback.includes(a.original.e));
    assert.equal(q.pool, 'fixacao');
    for (const text of a.original.ex || []) assert.ok(text.length);
    if (a.refs[0].legacy_id.startsWith('c_')) assert.ok(q.roles.includes('chefao'));
    if (a.refs[0].legacy_id.startsWith('pre_')) assert.ok(q.roles.includes('diagnostico'));
  }
});
test('fusão semântica reduz C/G e conserva todas as formulações e justificativas', () => {
  assert.equal(c.cards.length, 120);
  assert.equal(c.game.length, 256);
  for (const a of c.archive.filter((a) => ['card', 'game'].includes(a.kind))) {
    const e = entity(a.id);
    assert.ok(e.refs.some((r) => r.hash === a.refs[0].hash));
    if (a.kind === 'card')
      assert.ok(
        (e.front === a.original[1] && e.back === a.original[2]) ||
          e.variants.some((v) => v.front === a.original[1] && v.back === a.original[2]),
      );
    else {
      assert.equal(e.truth, a.original.v);
      assert.ok(
        (e.statement === a.original.t && e.justification === a.original.x) ||
          e.variants.some((v) => v.statement === a.original.t && v.justification === a.original.x),
      );
    }
  }
});
test('suplementos e 6 procedências discursivas preservados; fonte secundária estritamente limitada', () => {
  assert.equal(c.archive.filter((a) => a.kind === 'writing').length, 6);
  assert.equal(c.writing.filter((w) => w.refs.length).length, 4);
  assert.equal(c.writing.length, 6);
  assert.deepEqual(
    c.archive
      .filter((a) => a.refs[0].legacy_source === parity.secondary.path)
      .map((a) => a.refs[0].legacy_id),
    ['C_49', 'G_96', 'G_87'],
  );
  assert.equal(c.archive.filter((a) => a.kind === 'supplement').length, 9);
});
test('IDs únicos, referências válidas e nenhum enunciado/alternativa duplicado exato', () => {
  for (const bank of [c.questions, c.cards, c.game, c.missions.flatMap((m) => m.sections)])
    assert.equal(new Set(bank.map((x) => x.id)).size, bank.length);
  for (const q of c.questions) {
    assert.equal(new Set(q.options.map((o) => o.id)).size, q.options.length);
    assert.equal(new Set(q.options.map((o) => o.text.toLowerCase().trim())).size, q.options.length);
    assert.equal(q.options.filter((o) => o.id === q.correct).length, 1);
    assert.ok(c.concepts.some((x) => x.id === q.concept));
  }
  assert.equal(
    new Set(
      c.questions.map((q) =>
        JSON.stringify([
          q.prompt.trim().toLowerCase(),
          q.options.map((o) => o.text).sort(),
          q.options.find((o) => o.id === q.correct).text,
        ]),
      ),
    ).size,
    c.questions.length,
  );
});
test('36 itens novos, 12 por unidade, A–E, letras balanceadas e revisão humana pendente', () => {
  const authored = c.questions.filter((q) => q.refs.length === 0);
  assert.equal(authored.length, 36);
  for (const u of c.units) assert.equal(authored.filter((q) => q.unit === u.id).length, 12);
  for (const p of ['concurso', 'elite'])
    assert.equal(authored.filter((q) => q.pool === p).length, 18);
  const positions = [0, 0, 0, 0, 0];
  for (const q of authored) {
    assert.equal(q.options.length, 5);
    assert.equal(q.status, 'human-review-pending');
    positions[q.options.findIndex((o) => o.id === q.correct)]++;
    assert.ok(q.options.every((o) => o.feedback.length > 35));
    assert.ok(q.difficulty >= 2);
    assert.ok(q.cognitive >= 3);
  }
  assert.ok(Math.max(...positions) - Math.min(...positions) <= 1);
  assert.equal(examPool(c, undefined, true).length, 0);
});
test('conferência independente dos cálculos autorais e dos dados das figuras', () => {
  const answer = (id) =>
    c.questions
      .find((q) => q.id === 'v6-q-' + id)
      .options.find((o) => o.id === c.questions.find((q) => q.id === 'v6-q-' + id).correct).text;
  assert.match(answer('f01'), new RegExp(String((7.2 * 50_000) / 100_000).replace('.', ',')));
  assert.match(answer('f02'), /−12,5/);
  assert.match(answer('f07'), /1 km².*16 cm².*1:25.000/);
  assert.match(answer('r04'), new RegExp(String((40 / 200) * 100) + '%'));
  assert.match(answer('g02'), /16.384/);
  assert.equal(2 ** 14, 16384);
  assert.equal((0.6 - 0.2) / (0.6 + 0.2), 0.49999999999999994);
  assert.match(answer('g07'), /0,5/);
  assert.match(answer('r07'), /1.000.*200/);
  assert.match(answer('f09'), /8h.*terça/);
});
test('HTML publicado não executa mecanismos legados nem produz IDs duplicados', () => {
  const ids = [];
  for (const item of [
    ...c.missions.flatMap((m) => m.sections),
    ...c.supplements,
    ...c.references,
  ]) {
    const doc = parseFragment(item.html);
    walk(doc, (n) => {
      assert.ok(!['script', 'iframe', 'textarea', 'button'].includes(n.tagName));
      for (const a of n.attrs || []) {
        assert.ok(!/^on/i.test(a.name));
        assert.ok(!/^javascript:/i.test(a.value));
        if (a.name === 'id') ids.push(a.value);
      }
    });
  }
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(c.missions.flatMap((m) => m.sections).some((s) => s.html.includes('ocean')));
});
test('agenda: intervalos iniciais e avaliações atrasadas seguem a política declarada', () => {
  for (const [r, d] of Object.entries({ errei: 1, dificil: 2, bom: 4, facil: 7 }))
    assert.equal(schedule(undefined, r, now).due, now + d * DAY);
  const a = schedule(undefined, 'bom', now),
    b = schedule(a, 'bom', now + 5 * DAY);
  assert.equal(b.interval, 9);
  assert.equal(b.history.length, 2);
  const l = schedule(b, 'errei', now + 15 * DAY);
  assert.equal(l.interval, 1);
  assert.equal(l.lapses, 1);
});
test('retentativa precoce não empurra o vencimento para um futuro artificial', () => {
  const a = schedule(undefined, 'errei', now),
    b = schedule(a, 'facil', now + 60_000);
  assert.equal(b.due, a.due);
  assert.equal(b.interval, 1);
});
test('fila vencida finita tem precedência sobre cartões novos', () => {
  const s = fresh(),
    card = c.cards[10];
  s.reviews[card.id] = schedule(undefined, 'bom', now - 5 * DAY);
  assert.equal(reviewQueue(c, s, now, undefined, 4)[0], card.id);
  assert.equal(reviewQueue(c, s, now, undefined, 4).length, 4);
});
test('XP: abrir/ler/virar não premia e repetir acerto imediato não multiplica pontos', () => {
  const s = fresh();
  s.read[c.missions.find((m) => m.id === q.mission).sections[0].id] = now;
  assert.equal(totalXP(s), 0);
  attempt(s, c, { item: q.id, correct: true, kind: 'concurso', at: now });
  const xp = totalXP(s);
  for (let i = 1; i < 30; i++)
    attempt(s, c, { item: q.id, correct: true, kind: 'concurso', at: now + i * 1000 });
  assert.equal(totalXP(s), xp);
  assert.equal(s.evidence.filter((e) => e.eligible).length, 1);
  assert.equal(mastery(c, s, q.unit).score, null);
});
test('revisão vencida concede uma recompensa; repetir Fácil não faz farming', () => {
  const s = fresh(),
    card = c.cards[0];
  rateCard(s, c, card.id, 'bom', now - 5 * DAY);
  rateCard(s, c, card.id, 'bom', now);
  const xp = totalXP(s);
  assert.equal(xp, 8);
  rateCard(s, c, card.id, 'facil', now + 1000);
  assert.equal(totalXP(s), xp);
});
test('erro imediato não resolve; depois de intervalo, acerto objetivo resolve', () => {
  const s = fresh();
  attempt(s, c, { item: q.id, correct: false, kind: 'concurso', at: now });
  const e = Object.values(s.errors)[0];
  attempt(s, c, { item: q.id, correct: true, kind: 'concurso', at: now + 60_000 });
  assert.equal(e.status, 'em-recuperacao');
  attempt(s, c, { item: q.id, correct: true, kind: 'concurso', at: now + 2 * DAY });
  assert.equal(e.status, 'resolvido');
  assert.notEqual(e.status, 'dominado-apos-erro');
});
test('falsa sensação de domínio reabre dificuldade e antecipa cartões relacionados', () => {
  const s = fresh(),
    card = c.cards.find((x) => x.concept === q.concept);
  rateCard(s, c, card.id, 'facil', now);
  const due = s.reviews[card.id].due;
  attempt(s, c, { item: q.id, correct: false, kind: 'concurso', at: now + 1000 });
  assert.ok(Object.values(s.errors)[0].falseMastery);
  assert.equal(s.reviews[card.id].due, now + 1000);
  assert.ok(due > s.reviews[card.id].due);
});
test('domínio fica sem número até haver estudo, diversidade, cobertura e retenção', () => {
  const s = fresh(),
    unit = c.units[0].id,
    ms = c.missions.filter((m) => m.unit === unit);
  for (const m of ms) s.read[m.sections[0].id] = now;
  const picks = c.questions.filter((q) => q.unit === unit && q.pool !== 'fixacao');
  for (const p of picks) attempt(s, c, { item: p.id, correct: true, kind: p.pool, at: now });
  assert.equal(mastery(c, s, unit).score, null);
  for (const p of picks.slice(0, 3))
    attempt(s, c, { item: p.id, correct: true, kind: p.pool, at: now + 2 * DAY });
  rateCard(s, c, c.cards.find((c) => c.unit === unit).id, 'bom', now + 2 * DAY);
  const m = mastery(c, s, unit);
  assert.notEqual(m.score, null);
  assert.equal(m.confidence, 'média');
  assert.ok(m.score < 100);
});
test('prova: sem IDs repetidos, alternativas estáveis, letras equilibradas, novidade e diversidade', () => {
  const s = fresh(),
    ex = makeExam(c, s, 20, 20, now);
  assert.equal(new Set(ex.ids).size, 20);
  assert.equal(ex.novelty, 20);
  assert.ok(new Set(ex.ids.map((id) => entity(id).mission)).size >= 10);
  const pos = [0, 0, 0, 0, 0];
  for (const id of ex.ids) {
    const q = entity(id);
    pos[ex.optionOrder[id].indexOf(q.correct)]++;
    assert.deepEqual([...ex.optionOrder[id]].sort(), q.options.map((o) => o.id).sort());
  }
  assert.deepEqual(pos, [4, 4, 4, 4, 4]);
  s.exam = ex;
  assert.equal(s.evidence.length, 0);
  finishExam(s, c, now + 60_000);
  assert.equal(s.evidence.length, 20);
  assert.equal(Object.keys(s.errors).length > 0, true);
  finishExam(s, c, now + 120_000);
  assert.equal(s.evidence.length, 20);
  const next = makeExam(c, s, 10, 10, now + DAY);
  assert.ok(next.ids.every((id) => !ex.ids.includes(id)));
});
test('estoque insuficiente bloqueia perfil oficial e prova maior que banco', () => {
  assert.throws(() => makeExam(c, fresh(), 60, 300, now), /Estoque/);
  assert.ok(blueprintAvailability({ geografia: 36 }).some((x) => x.missing > 0));
  assert.throws(() => makeExam(c, fresh(), 10, 0, now));
});
test('migração preserva bruto, é idempotente, não cria XP/domínio e não altera fontes', () => {
  const s = fresh(),
    src = c.sources[0],
    raw = JSON.stringify({
      a: { b_0_0: 0, b_0_1: 999, alien: 1 },
      fc: { 0: 'ok', 1: 'rev' },
      u: 3,
      dn: { 1: 1 },
      bx: 999,
    });
  const result = importLegacy(s, c, src.key, raw, now);
  assert.equal(s.migrations[src.key].raw, raw);
  assert.equal(result.imported, 3);
  assert.equal(s.evidence.length, 0);
  assert.equal(totalXP(s), 0);
  assert.equal(Object.values(s.reviews).length, 2);
  assert.ok(Object.values(s.reviews).every((r) => r.due === now && r.last === 0));
  const n = s.legacyHistory.length;
  assert.equal(importLegacy(s, c, src.key, raw, now).imported, 0);
  assert.equal(s.legacyHistory.length, n);
  assert.equal(mastery(c, s, c.units[0].id).score, null);
});
test('índices T03 ambíguos e T17 v25 não são interpretados como evidência', () => {
  const s = fresh();
  importLegacy(
    s,
    c,
    c.sources[1].key,
    JSON.stringify({
      a: { b_14_0: 1, b_16_0: 1, c_4: 1 },
      fc: { 43: 'ok', 49: 'ok' },
      g: { miss: { 96: 1 } },
    }),
    now,
  );
  assert.equal(s.legacyHistory.length, 6);
  assert.ok(s.legacyHistory.every((h) => h.ambiguous));
  assert.equal(Object.keys(s.reviews).length, 0);
  assert.equal(Object.keys(s.errors).length, 0);
  importLegacy(s, c, 't17_cartogeo_v25', JSON.stringify({ fc: { 0: 'ok' } }), now);
  assert.ok(s.legacyHistory.at(-1).ambiguous);
});
test('cópias corrompidas e esquema estranho são rejeitados; estado válido volta integral', () => {
  const s = fresh();
  s.drafts.x = 'meu texto';
  s.exam = makeExam(c, s, 5, 20, now);
  assert.deepEqual(parseState(JSON.stringify(s)), s);
  assert.throws(() => parseState('{'));
  assert.throws(() => parseState(JSON.stringify({ ...s, schema: 5 })));
  assert.throws(() => parseState(JSON.stringify({ ...s, reviews: { a: { due: 0 } } })));
  assert.throws(() => parseState(JSON.stringify({ ...s, evidence: [{ id: 3 }] })));
  assert.throws(() => importLegacy(s, c, c.sources[0].key, 'null', now));
});
class Memory {
  map = new Map();
  getItem(k) {
    return this.map.get(k) || null;
  }
  setItem(k, v) {
    this.map.set(k, v);
  }
}
test('registro congelado mantém identidades separadas das revisões editoriais', async () => {
  const ids = JSON.parse(await readFile(root + '/scripts/v6-ids.json', 'utf8'));
  for (const a of c.archive) {
    const code = c.sources.find((s) => s.path === a.refs[0].legacy_source)?.code || 'T03';
    assert.equal(ids[code + ':' + a.refs[0].legacy_id], a.id);
  }
});
test('guias introdutórios encaminham questões ao conceito cobrado e todos os novos conceitos têm cartão', () => {
  const locate = (source, id) =>
    c.questions.find((q) =>
      q.refs.some((r) => r.legacy_source.includes(source) && r.legacy_id === id),
    );
  assert.equal(locate('Tema_02', 'b_0_0').mission, 'escalas-e-medidas');
  assert.equal(locate('Tema_02', 'b_0_1').concept, 'latitude');
  assert.equal(locate('Tema_17', 'b_0_0').mission, 'sig-modelos-operacoes');
  assert.equal(locate('Tema_17', 'b_0_1').mission, 'projecoes-propriedades');
  for (const q of c.questions.filter((q) => !q.refs.length))
    assert.ok(
      c.cards.some((card) => card.concept === q.concept),
      q.id + ': ' + q.concept,
    );
  for (const r of c.missions.flatMap((m) => m.recalls))
    assert.ok(r.points.length >= 2 && r.points.length <= 4);
});
test('motor genérico monta as 60 posições do blueprint sem migrar disciplinas do piloto', () => {
  const fixtures = Object.entries(officialBlueprint).flatMap(([area, n]) =>
    Array.from({ length: n + 1 }, (_, i) => ({ id: area + '-' + i, area, approved: true })),
  );
  const assembled = assembleBlueprint(fixtures, officialBlueprint);
  assert.equal(assembled.ids.length, 60);
  assert.equal(new Set(assembled.ids).size, 60);
  assert.equal(assembled.novelty, 60);
  assert.deepEqual(assembled.missing, []);
  const blocked = assembleBlueprint(
    fixtures.map((q) => ({ ...q, approved: false })),
    officialBlueprint,
  );
  assert.equal(blocked.ids.length, 0);
  assert.equal(blocked.missing.length, 5);
});
test('erro só atinge domínio após intervalo, outro item e revisões consistentes', () => {
  const s = fresh(),
    other = c.questions.find((x) => x.id !== q.id && x.concept === q.concept),
    card = c.cards.find((x) => x.concept === q.concept);
  attempt(s, c, { item: q.id, correct: false, kind: 'concurso', at: now });
  rateCard(s, c, card.id, 'bom', now + DAY);
  rateCard(s, c, card.id, 'bom', now + 5 * DAY);
  attempt(s, c, { item: q.id, correct: true, kind: 'concurso', at: now + 8 * DAY });
  attempt(s, c, { item: other.id, correct: true, kind: 'concurso', at: now + 9 * DAY });
  assert.equal(Object.values(s.errors)[0].status, 'dominado-apos-erro');
  const xp = totalXP(s);
  attempt(s, c, { item: other.id, correct: true, kind: 'concurso', at: now + 9 * DAY + 1000 });
  assert.equal(totalXP(s), xp);
});
test('primeira revalidação de cartão legado usa intervalo inicial e não presume revisão vencida', () => {
  const s = fresh();
  importLegacy(s, c, c.sources[0].key, JSON.stringify({ fc: { 0: 'ok' } }), now);
  const id = s.legacyHistory[0].canonical;
  rateCard(s, c, id, 'bom', now + 1000);
  assert.equal(s.reviews[id].interval, 4);
  assert.equal(totalXP(s), 0);
});
test('cada Errei retorna uma vez na sessão; fila não cresce indefinidamente', () => {
  const s = fresh(),
    ids = c.cards.slice(0, 12).map((c) => c.id);
  s.session = { id: 'session-test', kind: 'cards', ids: [...ids], position: 0, repeat: [] };
  for (const id of ids) rateCard(s, c, id, 'errei', now);
  assert.equal(s.session.ids.length, 24);
  for (const id of ids) rateCard(s, c, id, 'errei', now + 1000);
  assert.equal(s.session.ids.length, 24);
  assert.equal(totalXP(s), 0);
});
test('redundância numérica histórica está sinalizada, sem alterar o gabarito válido', () => {
  const q = c.questions.find((q) =>
    q.refs.some((r) => r.legacy_source.includes('Tema_02') && r.legacy_id === 'b_6_0'),
  );
  assert.equal(Number('42.3'), Number('42.30'));
  assert.equal(-(42 + 30 / 60), -42.5);
  assert.equal(q.options.find((o) => o.id === q.correct).text, '−42,5°');
  assert.ok(q.qualityFlags.includes('numeric-duplicate-distractor'));
  assert.equal(q.pool, 'fixacao');
});
test('restauração rejeita históricos internos defeituosos e chaves que alterariam protótipos', () => {
  assert.throws(() => parseState(JSON.stringify({ ...fresh(), writingHistory: [null] })));
  assert.throws(() => parseState(JSON.stringify({ ...fresh(), practicalHistory: [{ id: 'x' }] })));
  assert.throws(() =>
    parseState(JSON.stringify(fresh()).replace('"drafts":{}', '"drafts":{"__proto__":{}}')),
  );
});
test('persistência preserva bruto corrompido e mantém rascunhos em falha de quota', () => {
  const m = new Memory();
  m.setItem(STATE_KEY, '{ruim');
  const repo = new Repository(m);
  assert.match(repo.warning, /inválido/);
  assert.equal(m.getItem(STATE_KEY + '.recovery'), '{ruim');
  const noQuota = {
      getItem: () => null,
      setItem: () => {
        throw Error('QuotaExceeded');
      },
    },
    r = new Repository(noQuota);
  r.commit((s) => {
    s.drafts.x = 'texto';
  });
  assert.equal(r.state.drafts.x, 'texto');
  assert.match(r.warning, /só nesta sessão/);
});
test('transações leem revisão recente e caderno global preserva outros módulos', () => {
  const m = new Memory();
  m.setItem(ERROR_KEY, JSON.stringify({ schema: 6, modules: { outro: { x: 1 } } }));
  const a = new Repository(m),
    b = new Repository(m);
  a.commit((s) => {
    s.drafts.a = 'A';
  });
  b.commit((s) => {
    s.drafts.b = 'B';
  });
  assert.deepEqual(b.state.drafts, { a: 'A', b: 'B' });
  assert.deepEqual(JSON.parse(m.getItem(ERROR_KEY)).modules.outro, { x: 1 });
  assert.equal(b.state.revision, 2);
});
test('restauração preserva cópia anterior e rejeita arquivo defeituoso antes de substituir', () => {
  const m = new Memory(),
    r = new Repository(m);
  r.commit((s) => {
    s.drafts.before = 'original';
  });
  const backup = fresh();
  backup.drafts.after = 'cópia';
  r.replace(JSON.stringify(backup));
  assert.equal(r.state.drafts.after, 'cópia');
  assert.ok(JSON.parse(m.getItem(STATE_KEY + '.before-restore')).drafts.before);
  assert.throws(() => r.replace('null'));
  assert.equal(r.state.drafts.after, 'cópia');
});

test('marcos: navegação e leitura sem recuperação não geram celebração nem XP', () => {
  const before = fresh(),
    after = structuredClone(before);
  after.resume = { unit: c.units[0].id, mode: 'estudo', mission: c.missions[0].id };
  for (const m of c.missions) for (const section of m.sections) after.read[section.id] = now;
  assert.deepEqual(recognize(c, before, after, now), []);
  assert.equal(totalXP(after), 0);
  assert.equal(after.milestones, undefined);
});
test('marcos: unidade requer todas as explicações e recuperação por missão, sem fabricar domínio', () => {
  const s = fresh(),
    unit = c.units[0].id,
    missions = c.missions.filter((m) => m.unit === unit);
  for (const m of missions) {
    for (const section of m.sections) s.read[section.id] = now;
    const item = c.questions.find((q) => q.mission === m.id);
    attempt(s, c, { item: item.id, correct: true, kind: item.pool, at: now });
  }
  const before = structuredClone(s),
    final = missions.at(-1).sections.at(-1).id;
  delete before.read[final];
  const xp = totalXP(s);
  assert.deepEqual(
    recognize(c, before, s, now).map((m) => m.id),
    ['unit:' + unit, 'mission:' + missions.at(-1).id],
  );
  assert.equal(totalXP(s), xp);
  assert.equal(mastery(c, s, unit).score, null);
  const restored = parseState(JSON.stringify(s));
  assert.deepEqual(recognize(c, before, restored, now + DAY), []);
});
test('marcos: Chefão requer rodada completa da unidade, pelo menos 80% e não repete conquista', () => {
  const qs = c.questions.filter((q) => q.unit === c.units[0].id && q.roles.includes('chefao'));
  for (const hits of [qs.length - 2, qs.length - 1]) {
    const s = fresh();
    s.session = {
      id: 'boss-round',
      kind: 'questions',
      pool: 'chefao',
      ids: qs.map((q) => q.id),
      position: qs.length - 1,
      repeat: [],
    };
    qs.forEach((q, i) =>
      attempt(s, c, {
        item: q.id,
        correct: i < hits,
        kind: 'boss',
        context: s.session.id,
        at: now,
      }),
    );
    const before = structuredClone(s);
    assert.deepEqual(recognize(c, before, s, now), []);
    s.session.position++;
    const earned = recognize(c, before, s, now);
    assert.equal(earned.length, hits / qs.length >= 0.8 ? 1 : 0);
    assert.deepEqual(recognize(c, before, s, now + DAY), []);
  }
  const subset = fresh();
  subset.session = {
    id: 'subset',
    kind: 'questions',
    pool: 'chefao',
    ids: [qs[0].id],
    position: 0,
    repeat: [],
  };
  attempt(subset, c, { item: qs[0].id, correct: true, kind: 'boss', context: 'subset', at: now });
  const before = structuredClone(subset);
  subset.session.position = 1;
  assert.deepEqual(recognize(c, before, subset, now), []);
});
test('marcos: revisões só ficam em dia quando os vencidos reais terminam; importados não bastam', () => {
  const s = fresh(),
    cards = c.cards.filter((card) => card.unit === c.units[0].id).slice(0, 2);
  s.session = {
    id: 'review-round',
    kind: 'cards',
    ids: cards.map((c) => c.id),
    position: 0,
    repeat: [],
  };
  for (const card of cards) s.reviews[card.id] = schedule(undefined, 'bom', now - 5 * DAY);
  let before = structuredClone(s);
  rateCard(s, c, cards[0].id, 'bom', now);
  assert.deepEqual(recognize(c, before, s, now), []);
  before = structuredClone(s);
  rateCard(s, c, cards[1].id, 'bom', now);
  const xp = totalXP(s);
  assert.match(recognize(c, before, s, now)[0].id, /^reviews:/);
  assert.equal(totalXP(s), xp);
  const imported = fresh();
  importLegacy(imported, c, c.sources[0].key, JSON.stringify({ fc: { 0: 'ok' } }), now);
  const id = Object.keys(imported.reviews)[0];
  imported.session = { id: 'revalidate', kind: 'cards', ids: [id], position: 0, repeat: [] };
  before = structuredClone(imported);
  rateCard(imported, c, id, 'bom', now);
  assert.deepEqual(recognize(c, before, imported, now), []);
});
test('marcos: sete dias exigem prática significativa e não acrescentam pontos', () => {
  const s = fresh();
  s.significantDays = Array.from({ length: 6 }, (_, i) => localDay(now - (i + 1) * DAY));
  const before = structuredClone(s);
  attempt(s, c, { item: q.id, correct: true, kind: 'concurso', at: now });
  const xp = totalXP(s),
    earned = recognize(c, before, s, now);
  assert.ok(earned.some((m) => m.id === 'streak:7'));
  assert.equal(totalXP(s), xp);
  assert.deepEqual(recognize(c, s, s, now), []);
});
test('marcos: erro convertido exige recuperação já validada pelo motor', () => {
  const s = fresh(),
    other = c.questions.find((x) => x.id !== q.id && x.concept === q.concept),
    card = c.cards.find((x) => x.concept === q.concept);
  attempt(s, c, { item: q.id, correct: false, kind: 'concurso', at: now });
  let before = structuredClone(s);
  attempt(s, c, { item: q.id, correct: true, kind: 'concurso', at: now + 1000 });
  assert.deepEqual(recognize(c, before, s, now + 1000), []);
  rateCard(s, c, card.id, 'bom', now + DAY);
  rateCard(s, c, card.id, 'bom', now + 5 * DAY);
  attempt(s, c, { item: q.id, correct: true, kind: 'concurso', at: now + 8 * DAY });
  before = structuredClone(s);
  attempt(s, c, { item: other.id, correct: true, kind: 'concurso', at: now + 9 * DAY });
  const xp = totalXP(s);
  assert.match(recognize(c, before, s, now + 9 * DAY)[0].id, /^error:/);
  assert.equal(totalXP(s), xp);
});
test('marcos: backups anteriores permanecem válidos e marcos inválidos são rejeitados', () => {
  const s = fresh();
  assert.deepEqual(parseState(JSON.stringify(s)), s);
  s.milestones = { 'streak:7': now };
  assert.deepEqual(parseState(JSON.stringify(s)), s);
  for (const invalid of [[], null, { a: 'hoje' }, { a: -1 }])
    assert.throws(() => parseState(JSON.stringify({ ...s, milestones: invalid })), /marcos/);
});

test('B1: provas equilibradas não têm ciclo periódico nem três letras iguais em sequência', () => {
  const signatures = new Set();
  for (const count of [5, 10, 20, 30])
    for (let seed = 0; seed < 40; seed++) {
      const ex = makeExam(c, fresh(), count, 20, now, undefined, 'auditoria-' + seed);
      const positions = ex.ids.map((id) => ex.optionOrder[id].indexOf(entity(id).correct));
      const frequencies = Array.from(
        { length: 5 },
        (_, p) => positions.filter((x) => x === p).length,
      );
      assert.ok(Math.max(...frequencies) - Math.min(...frequencies) <= 1);
      assert.equal(
        positions.some((p, i) => i >= 2 && p === positions[i - 1] && p === positions[i - 2]),
        false,
      );
      for (let period = 1; period <= Math.min(5, Math.floor(count / 2)); period++)
        assert.equal(
          positions.every((p, i) => p === positions[i % period]),
          false,
        );
      if (count === 20) signatures.add(positions.join(''));
      const restored = parseState(JSON.stringify({ ...fresh(), exam: ex }));
      assert.deepEqual(restored.exam.optionOrder, ex.optionOrder);
    }
  assert.ok(signatures.size >= 35);
  assert.deepEqual(
    makeExam(c, fresh(), 20, 20, now, undefined, 'reproduzir').optionOrder,
    makeExam(c, fresh(), 20, 20, now, undefined, 'reproduzir').optionOrder,
  );
});
test('B2: Difícil é recuperação com esforço, intervalo curto, sem criar ou reabrir erro', () => {
  const s = fresh(),
    card = c.cards.find((x) => x.concept === q.concept);
  rateCard(s, c, card.id, 'dificil', now);
  assert.equal(s.evidence.at(-1).correct, true);
  assert.equal(s.evidence.at(-1).rating, 'dificil');
  assert.equal(Object.keys(s.errors).length, 0);
  assert.equal(s.reviews[card.id].lapses, 0);
  assert.ok(s.reviews[card.id].interval < schedule(undefined, 'bom', now).interval);
  rateCard(s, c, card.id, 'errei', now + DAY);
  const error = Object.values(s.errors)[0];
  assert.equal(error.count, 1);
  error.status = 'resolvido';
  const last = error.last;
  rateCard(s, c, card.id, 'dificil', now + 2 * DAY);
  assert.equal(error.status, 'resolvido');
  assert.equal(error.last, last);
  assert.equal(error.count, 1);
  assert.equal(s.reviews[card.id].lapses, 1);
  rateCard(s, c, card.id, 'errei', now + 3 * DAY);
  assert.equal(error.status, 'aberto');
  assert.equal(error.count, 2);
});
test('C1: dias civis em UTC−3 e calendário com mudança de offset não perdem a sequência', () => {
  const previousTimezone = process.env.TZ;
  try {
    for (const zone of ['America/Sao_Paulo', 'America/New_York']) {
      process.env.TZ = zone;
      const s = fresh();
      const dates =
        zone === 'America/Sao_Paulo'
          ? ['2026-10-15T23:30:00-03:00', '2026-10-16T00:15:00-03:00']
          : [
              '2026-03-07T00:30:00-05:00',
              '2026-03-08T00:30:00-05:00',
              '2026-03-09T00:30:00-04:00',
              '2026-03-10T00:30:00-04:00',
            ];
      dates.forEach((date, i) =>
        attempt(s, c, {
          item: c.questions[i].id,
          correct: true,
          kind: 'fixacao',
          at: Date.parse(date),
        }),
      );
      assert.deepEqual(
        s.significantDays,
        dates.map((x) => x.slice(0, 10)),
      );
      assert.equal(streak(s, Date.parse(dates.at(-1))), dates.length);
      assert.equal(streak(s, Date.parse(dates.at(-1)) + 60 * 60 * 1000), dates.length);
      const legacy = structuredClone(s);
      delete legacy.calendarPolicy;
      legacy.significantDays = ['2000-01-01'];
      const migrated = parseState(JSON.stringify(legacy));
      assert.deepEqual(migrated.legacySignificantDays, ['2000-01-01']);
      assert.deepEqual(migrated.significantDays, s.significantDays);
      assert.equal(migrated.calendarPolicy, 'local-v1');
      assert.deepEqual(parseState(JSON.stringify(migrated)), migrated);
    }
  } finally {
    if (previousTimezone === undefined) delete process.env.TZ;
    else process.env.TZ = previousTimezone;
  }
});
test('UX: a camada canônica troca só a embalagem editorial e mantém originais integrais', () => {
  assert.equal(c.editorialChanges.length, 7);
  for (const [id, field, original, replacement] of editorialReplacements) {
    assert.ok(entity(id)[field].includes(replacement));
    const raw = c.archive.find((entry) => entry.id === id);
    assert.ok(
      JSON.stringify(raw.original).includes(original.replaceAll('"', '\\"')) ||
        JSON.stringify(raw.original).includes(original),
    );
  }
  const active = c.missions.map((m) => ({
    title: m.title,
    goal: m.goal,
    sections: m.sections.map(({ title, hook, html }) => ({ title, hook, html })),
    recalls: m.recalls.map(({ prompt, model }) => ({ prompt, model })),
  }));
  assert.doesNotMatch(JSON.stringify(active), /Cartografia I{1,2}(?![IV])|Tema\s+\d+/i);
  assert.equal(c.archive.length, 685);
});
test('restaurar backup anterior não mantém marcos ou sessão ausentes da cópia', () => {
  const m = new Memory(),
    r = new Repository(m);
  r.commit((s) => {
    s.milestones = { 'streak:7': now };
    s.session = { id: 'old', kind: 'cards', ids: [c.cards[0].id], position: 0, repeat: [] };
  });
  r.replace(JSON.stringify(fresh()));
  assert.equal(r.state.session, undefined);
  assert.equal(r.state.milestones, undefined);
  assert.equal(JSON.parse(m.getItem(STATE_KEY + '.before-restore')).milestones['streak:7'], now);
});

test('P1: compatibilidade exige todos os IDs no destino, tipo e banco solicitado', () => {
  const unit = 'cartografia-fundamentos',
    mission = 'orientacao-azimute';
  const question = c.questions.find((q) => q.mission === mission && q.pool === 'fixacao');
  const otherMission = c.questions.find((q) => q.unit === unit && q.mission !== mission);
  const otherUnit = c.questions.find((q) => q.unit !== unit);
  const session = {
    id: 'old-save',
    kind: 'questions',
    ids: [question.id],
    pool: 'fixacao',
    position: 0,
    repeat: [],
  };
  assert.equal(trainingSessionMatches(c, session, { unit }), true);
  assert.equal(trainingSessionMatches(c, session, { unit, mission }), true);
  assert.equal(trainingSessionMatches(c, session, { unit, mission: 'escalas-e-medidas' }), false);
  assert.equal(trainingSessionMatches(c, session, { unit, pool: 'diagnostico' }), false);
  for (const id of [otherMission.id, otherUnit.id, 'unknown-id'])
    assert.equal(
      trainingSessionMatches(c, { ...session, ids: [question.id, id] }, { unit, mission }),
      false,
    );
  assert.equal(
    trainingSessionMatches(c, { ...session, ids: [question.id, otherUnit.id] }, { unit }),
    false,
  );
  assert.equal(trainingSessionMatches(c, { ...session, ids: [] }, { unit }), false);
  assert.equal(trainingSessionMatches(c, undefined, { unit }), false);
  const game = { ...session, kind: 'game', ids: [c.game.find((g) => g.unit === unit).id] };
  assert.equal(trainingSessionMatches(c, game, { unit }), true);
  assert.equal(trainingSessionMatches(c, game, { unit, mission }), false);
  assert.equal(trainingSessionMatches(c, game, { unit, pool: 'diagnostico' }), false);
  assert.equal(trainingSessionMatches(c, { ...session, kind: 'cards' }, { unit }), false);
});
test('P1: retomada conserva banco opcional e aceita backups anteriores sem inventar banco', () => {
  const s = fresh();
  s.resume = { unit: 'cartografia-fundamentos', mode: 'treino', mission: '' };
  assert.deepEqual(parseState(JSON.stringify(s)), s);
  assert.equal(parseState(JSON.stringify(s)).resume.pool, undefined);
  for (const pool of ['fixacao', 'concurso', 'elite', 'diagnostico', 'pos-teste', 'chefao']) {
    s.resume.pool = pool;
    assert.equal(parseState(JSON.stringify(s)).resume.pool, pool);
  }
  for (const pool of [null, [], ['fixacao'], {}, 1, 'outro']) {
    s.resume.pool = pool;
    assert.throws(() => parseState(JSON.stringify(s)), /Retomada/);
  }
});

test('sensorial: preferências opcionais mantêm backups antigos; valores e resumos inválidos são rejeitados', () => {
  const state = fresh();
  assert.deepEqual(sensoryPreferences(parseState(JSON.stringify(state))), {
    experience: 'balanced',
    sound: 'off',
  });
  for (const experience of ['focus', 'balanced', 'immersive'])
    for (const sound of ['off', 'soft', 'immersive']) {
      state.preferences.experience = experience;
      state.preferences.sound = sound;
      assert.deepEqual(sensoryPreferences(parseState(JSON.stringify(state))), {
        experience,
        sound,
      });
    }
  for (const key of ['experience', 'sound'])
    for (const value of [null, [], ['off'], {}, true, 'outro'])
      assert.throws(
        () =>
          parseState(
            JSON.stringify({ ...state, preferences: { ...state.preferences, [key]: value } }),
          ),
        /sensorial/,
      );
  state.session = {
    id: 'summary',
    kind: 'questions',
    ids: [q.id],
    position: 0,
    repeat: [],
    sensorySummary: { xp: 14, reviews: 1, converted: 0 },
  };
  assert.deepEqual(parseState(JSON.stringify(state)), state);
  for (const value of [
    null,
    [],
    { xp: -1, reviews: 0, converted: 0 },
    { xp: 1, reviews: '2', converted: 0 },
    { xp: 1, reviews: 0, converted: 0.5 },
  ])
    assert.throws(
      () =>
        parseState(
          JSON.stringify({ ...state, session: { ...state.session, sensorySummary: value } }),
        ),
      /Resumo sensorial/,
    );
});

test('sensorial: percurso distingue leitura, recuperação e pendências sem fabricar domínio ou bloquear consulta', () => {
  const state = fresh(),
    mission = c.missions.find((m) => m.id === q.mission);
  const snapshot = JSON.stringify(state);
  assert.equal(missionJourney(c, state, mission, now).status, 'ready');
  assert.equal(JSON.stringify(state), snapshot);
  for (const section of mission.sections) state.read[section.id] = now;
  assert.equal(missionJourney(c, state, mission, now).status, 'reading');
  assert.equal(missionJourney(c, state, mission, now).complete, false);
  const before = structuredClone(state);
  attempt(state, c, { item: q.id, correct: true, kind: q.pool, at: now });
  const xp = totalXP(state);
  const earned = recognize(c, before, state, now);
  assert.ok(earned.some((m) => m.id === 'mission:' + mission.id));
  assert.equal(missionJourney(c, state, mission, now).status, 'complete');
  assert.equal(mastery(c, state, mission.unit).score, null);
  assert.equal(totalXP(state), xp);
  assert.deepEqual(recognize(c, state, state, now), []);
  const card = c.cards.find((card) => card.mission === mission.id);
  state.reviews[card.id] = schedule(undefined, 'bom', now - 5 * DAY);
  assert.equal(missionJourney(c, state, mission, now).status, 'due');
  delete state.reviews[card.id];
  attempt(state, c, { item: q.id, correct: false, kind: q.pool, at: now + DAY });
  for (const id of Object.keys(state.reviews)) delete state.reviews[id];
  assert.equal(missionJourney(c, state, mission, now + DAY).status, 'fragile');
});

test('sensorial: resumo contabiliza somente XP real da rodada e não incorpora atividade paralela', () => {
  let before = fresh(),
    state = structuredClone(before);
  state.session = { id: 'round-account', kind: 'questions', ids: [q.id], position: 0, repeat: [] };
  recordSessionSummary(before, state);
  assert.deepEqual(state.session.sensorySummary, { xp: 0, reviews: 0, converted: 0 });
  before = structuredClone(state);
  const unrelated = c.questions.find((other) => other.mission !== q.mission);
  attempt(state, c, {
    item: unrelated.id,
    correct: true,
    kind: unrelated.pool,
    at: now,
    context: 'other-round',
  });
  recordSessionSummary(before, state);
  assert.equal(state.session.sensorySummary.xp, 0);
  before = structuredClone(state);
  attempt(state, c, {
    item: q.id,
    correct: true,
    kind: q.pool,
    at: now,
    context: state.session.id,
  });
  const ledger = structuredClone(state.awards),
    evidence = structuredClone(state.evidence);
  recordSessionSummary(before, state);
  assert.equal(state.session.sensorySummary.xp, 4);
  assert.deepEqual(state.awards, ledger);
  assert.deepEqual(state.evidence, evidence);
  state = parseState(JSON.stringify(state));
  before = structuredClone(state);
  attempt(state, c, {
    item: q.id,
    correct: true,
    kind: q.pool,
    at: now + 1000,
    context: state.session.id,
  });
  recordSessionSummary(before, state);
  assert.equal(state.session.sensorySummary.xp, 4);
  const old = fresh();
  old.session = { id: 'old-round', kind: 'questions', ids: [q.id], position: 0, repeat: [] };
  before = structuredClone(old);
  attempt(old, c, { item: q.id, correct: true, kind: q.pool, at: now, context: 'old-round' });
  recordSessionSummary(before, old);
  assert.equal(old.session.sensorySummary, undefined);
});

test('sensorial: revisões devidas entram no balanço; virar, repetir cedo e preferências não rendem XP', () => {
  const state = fresh(),
    card = c.cards[0];
  state.reviews[card.id] = schedule(undefined, 'bom', now - 5 * DAY);
  let before = structuredClone(state);
  state.session = { id: 'review-account', kind: 'cards', ids: [card.id], position: 0, repeat: [] };
  recordSessionSummary(before, state);
  before = structuredClone(state);
  rateCard(state, c, card.id, 'dificil', now);
  state.session.position++;
  recordSessionSummary(before, state);
  assert.deepEqual(state.session.sensorySummary, { xp: 8, reviews: 1, converted: 0 });
  assert.equal(Object.keys(state.errors).length, 0);
  const xp = totalXP(state);
  before = structuredClone(state);
  state.preferences.experience = 'immersive';
  state.preferences.sound = 'soft';
  const milestones = recognize(c, before, state, now);
  assert.deepEqual(sensoryEvents(c, before, state, milestones), []);
  assert.equal(totalXP(state), xp);
  assert.deepEqual(state.session.sensorySummary, { xp: 8, reviews: 1, converted: 0 });
});

test('sensorial: eventos comuns não são conquistas; repetição imediata e recarga não repetem efeitos', () => {
  const state = fresh();
  let before = structuredClone(state);
  attempt(state, c, { item: q.id, correct: true, kind: 'elite', at: now });
  const snapshot = JSON.stringify(state);
  const events = sensoryEvents(c, before, state, recognize(c, before, state, now));
  assert.equal(events.length, 1);
  assert.equal(events[0].kind, 'elite');
  assert.equal(events[0].xp, 0);
  assert.ok(events[0].importance < 3);
  assert.equal(JSON.stringify(state), snapshot);
  before = structuredClone(state);
  attempt(state, c, { item: q.id, correct: true, kind: 'elite', at: now + 1000 });
  assert.deepEqual(sensoryEvents(c, before, state, recognize(c, before, state, now + 1000)), []);
  const restored = parseState(JSON.stringify(state));
  assert.deepEqual(sensoryEvents(c, restored, restored, []), []);
  const next = structuredClone(restored);
  const other = c.questions.find((other) => other.id !== q.id);
  attempt(next, c, { item: other.id, correct: false, kind: other.pool, at: now + 2000 });
  assert.equal(sensoryEvents(c, restored, next, [])[0].kind, 'incorrect');
});

test('sensorial: expedição exige todas as missões com recuperação e os três Chefões, sem XP novo', () => {
  const state = fresh();
  for (const mission of c.missions) {
    for (const section of mission.sections) state.read[section.id] = now;
    const question = c.questions.find((question) => question.mission === mission.id);
    attempt(state, c, { item: question.id, correct: true, kind: question.pool, at: now });
  }
  state.milestones = Object.fromEntries(
    c.units.slice(0, -1).map((unit) => ['boss:' + unit.id, now]),
  );
  assert.equal(expeditionComplete(c, state), false);
  const questions = c.questions.filter(
    (question) => question.unit === c.units.at(-1).id && question.roles.includes('chefao'),
  );
  state.session = {
    id: 'last-boss',
    kind: 'questions',
    pool: 'chefao',
    ids: questions.map((question) => question.id),
    position: questions.length - 1,
    repeat: [],
  };
  for (const question of questions)
    attempt(state, c, {
      item: question.id,
      correct: true,
      kind: 'boss',
      at: now,
      context: state.session.id,
    });
  const before = structuredClone(state);
  state.session.position++;
  const ledger = structuredClone(state.awards);
  const earned = recognize(c, before, state, now);
  assert.ok(earned.some((milestone) => milestone.id === 'module:cartografia'));
  assert.equal(expeditionComplete(c, state), true);
  const events = sensoryEvents(c, before, state, earned);
  assert.equal(events[0].kind, 'module');
  assert.ok(
    events.find((event) => event.kind === 'boss').importance >
      events.find((event) => event.kind === 'block').importance,
  );
  assert.deepEqual(state.awards, ledger);
  assert.deepEqual(recognize(c, before, state, now + DAY), []);
  assert.equal(mastery(c, state, c.units[0].id).score, null);
  const missing = structuredClone(state);
  delete missing.awards['mission:' + c.missions[0].id];
  assert.equal(expeditionComplete(c, missing), false);
});

test('sensorial: nível é somente XP e melhor sequência preserva intervalos civis e retomadas', () => {
  const state = fresh();
  assert.equal(personalLevel(state).level, 1);
  for (const [xp, level] of [
    [79, 1],
    [80, 2],
    [319, 2],
    [320, 3],
    [720, 4],
  ]) {
    state.awards.sample = { at: now, xp, reason: 'fixture' };
    const result = personalLevel(state);
    assert.equal(result.level, level);
    assert.ok(result.progress >= 0 && result.progress < result.span);
    assert.equal(mastery(c, state, c.units[0].id).score, null);
  }
  state.significantDays = [
    '2026-03-10',
    '2026-03-07',
    '2026-03-08',
    '2026-03-09',
    '2026-03-10',
    '2026-10-15',
  ];
  assert.equal(bestStreak(state), 4);
  assert.equal(streak(state, Date.parse('2026-10-16T12:00:00Z')), 1);
});

test('sensorial: prova, discursiva e defesa em andamento mantêm o modo silencioso', () => {
  const home = { page: 'home', mode: 'estudo' },
    exam = { page: 'unit', mode: 'prova' };
  const state = fresh();
  assert.equal(sensoryQuiet(home, state), false);
  assert.equal(sensoryQuiet(exam, state), true);
  state.exam = makeExam(c, state, 5, 20, now);
  assert.equal(sensoryQuiet(home, state), true);
  state.exam.finished = now + 1000;
  assert.equal(sensoryQuiet(home, state), false);
  state.practical.started = now;
  state.practical.phase = 'defesa';
  assert.equal(sensoryQuiet(home, state), true);
  state.practical.phase = 'concluida';
  assert.equal(sensoryQuiet(home, state), false);
});

test('sensorial: áudio é lazy, opcional, curto, limitado e interrompido ao sair ou mudar preferências', async () => {
  const oldWindow = globalThis.window;
  let created = 0,
    starts = 0,
    stopped = 0,
    clock = 1000;
  const originalNow = Object.getOwnPropertyDescriptor(performance, 'now');
  Object.defineProperty(performance, 'now', { configurable: true, value: () => clock });
  class FakeAudio {
    state = 'running';
    currentTime = 0;
    destination = {};
    constructor() {
      created++;
    }
    async resume() {
      this.state = 'running';
    }
    async suspend() {
      this.state = 'suspended';
    }
    async close() {
      this.state = 'closed';
    }
    createOscillator() {
      return {
        type: '',
        frequency: { setValueAtTime() {} },
        connect() {},
        disconnect() {},
        start() {
          starts++;
        },
        stop() {
          stopped++;
        },
      };
    }
    createGain() {
      return {
        gain: {
          setValueAtTime() {},
          linearRampToValueAtTime() {},
          exponentialRampToValueAtTime() {},
        },
        connect() {},
        disconnect() {},
      };
    }
  }
  globalThis.window = { AudioContext: FakeAudio };
  const audio = new SensoryAudio();
  try {
    assert.equal(created, 0);
    assert.equal(
      audio.play('correct', 'soft', 1, () => true),
      false,
    );
    assert.equal(await audio.unlock(), true);
    assert.equal(created, 1);
    assert.equal(
      audio.play('correct', 'off', 1, () => true),
      false,
    );
    assert.equal(
      audio.play('correct', 'soft', 1, () => false),
      false,
    );
    assert.equal(starts, 0);
    assert.equal(
      audio.play('correct', 'soft', 1, () => true),
      true,
    );
    assert.equal(starts, 2);
    assert.equal(
      audio.play('correct', 'soft', 1, () => true),
      false,
    );
    assert.equal(
      audio.play('boss', 'soft', 8, () => true),
      true,
    );
    assert.equal(starts, 7);
    audio.pause();
    assert.ok(stopped >= 7);
    clock += 1000;
    assert.equal(
      audio.play('correct', 'soft', 1, () => true),
      false,
    );
    assert.equal(await audio.unlock(), true);
    assert.equal(
      audio.play('correct', 'immersive', 1, () => true),
      true,
    );
    for (const pattern of Object.values(soundPatterns))
      assert.ok(pattern.length * 0.075 + 0.14 < 0.6);
  } finally {
    audio.dispose();
    if (oldWindow === undefined) delete globalThis.window;
    else globalThis.window = oldWindow;
    if (originalNow) Object.defineProperty(performance, 'now', originalNow);
    else delete performance.now;
  }
});

test('sensorial: liberação de áudio pendente não toca depois de cancelamento e falhas não quebram o estudo', async () => {
  const oldWindow = globalThis.window;
  let release;
  class Suspended {
    state = 'suspended';
    resume() {
      return new Promise((resolve) => {
        release = () => {
          this.state = 'running';
          resolve();
        };
      });
    }
    async close() {
      this.state = 'closed';
    }
  }
  try {
    globalThis.window = { AudioContext: Suspended };
    const audio = new SensoryAudio();
    const pending = audio.unlock();
    audio.stop();
    release();
    assert.equal(await pending, false);
    audio.dispose();
    globalThis.window = {};
    assert.equal(await new SensoryAudio().unlock(), false);
    globalThis.window = {
      AudioContext: class {
        constructor() {
          throw Error('unsupported');
        }
      },
    };
    assert.equal(await new SensoryAudio().unlock(), false);
  } finally {
    if (oldWindow === undefined) delete globalThis.window;
    else globalThis.window = oldWindow;
  }
});
