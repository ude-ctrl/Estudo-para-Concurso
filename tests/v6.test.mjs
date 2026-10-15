import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { parseFragment } from 'parse5';
import { buildV6 } from '../scripts/build-v6.mjs';
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
  parseState,
  examPool,
} from '../src/v6/engine.ts';
import { assembleBlueprint, officialBlueprint } from '../src/v6/engine.ts';
import { Repository } from '../src/v6/repository.ts';
const { content: c, parity } = await buildV6(),
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
