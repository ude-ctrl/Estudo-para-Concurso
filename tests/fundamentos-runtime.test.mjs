import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildPlatform, buildV6 } from '../scripts/build-v6.mjs';
import { root, readBundle, collections } from '../scripts/canonical-content.mjs';
import {
  attempt,
  fresh,
  importLegacy,
  mastery,
  parseState,
  totalXP,
  STATE_KEY,
  schedule,
  makeExam,
  examPool,
  rateCard,
} from '../src/v6/engine.ts';
import { Repository } from '../src/v6/repository.ts';
import { recognize } from '../src/v6/recognition.ts';
import { expeditionComplete } from '../src/v6/sensory.ts';
import { moduleProgress } from '../src/module-progress.ts';
import { trainingSessionMatches } from '../src/v6/training-session.ts';
import { canonicalLegacyRoute } from '../src/legacy-routes.ts';

const unit = 'fundamentos-geografia',
  now = Date.parse('2026-11-05T12:00:00Z');
const { content, parity } = await buildPlatform({ at: new Date(now).toISOString() });
const { content: cartography } = await buildV6({ at: new Date(now).toISOString() });
const bundle = await readBundle(root + '/base-conhecimento', unit, '1.0.0');
const modules = JSON.parse(await readFile(root + '/public/v6/modules.json', 'utf8')).modules;
const fund = bundle.base.content;
class MemoryStore {
  data = new Map();
  getItem(key) {
    return this.data.get(key) ?? null;
  }
  setItem(key, value) {
    this.data.set(key, value);
  }
}

test('integração entrega cada coleção aprovada sem edição, omissão ou colisão de IDs', () => {
  assert.equal(content.units.length, 4);
  for (const key of collections) {
    assert.deepEqual(content[key], [...fund[key], ...cartography[key]], key);
    assert.equal(new Set(content[key].map((item) => item.id)).size, content[key].length, key);
  }
  for (const key of Object.keys(bundle.base.support))
    assert.deepEqual(
      content.support[key],
      [...bundle.base.support[key], ...cartography.support[key]],
      key,
    );
  assert.equal(parity.records.length, 913);
  assert.deepEqual(
    parity.units.find((u) => u.id === unit),
    {
      id: unit,
      editorial_version: '1.0.0',
      missions: 11,
      questions: 48,
      cards: 45,
      game: 100,
    },
  );
  assert.equal(parity.counts.stages, 72);
  assert.equal(parity.counts.questions, 209);
  assert.equal(parity.counts.cards, 165);
  assert.equal(parity.counts.game, 356);
});

function fullLegacy() {
  const old = {
    a: {},
    pre: {},
    post: {},
    fc: {},
    g: { miss: {} },
    u: 11,
    dn: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    st: 99,
    bx: 9999,
  };
  for (const entry of bundle.provenance.archive) {
    const id = entry.refs[0].legacy_id;
    if (entry.kind === 'questions' && entry.original?.o) {
      if (id.startsWith('pre_')) {
        old.pre[id] = entry.original.c;
        old.post[id.replace('pre_', 'post_')] = entry.original.c;
      } else old.a[id] = entry.original.c;
    } else if (entry.kind === 'cards') old.fc[id.match(/\d+/)[0]] = 'ok';
    else if (entry.kind === 'game') old.g.miss[id.match(/\d+/)[0]] = 1;
  }
  return old;
}

test('migração recupera 32 respostas + 3 pós-testes, 44 cartões e 100 erros V/F, sem criar aprendizagem', () => {
  const state = fresh(),
    raw = JSON.stringify(fullLegacy());
  const result = importLegacy(state, content, 't1i_v21', raw, now);
  assert.equal(result.imported, 179);
  assert.equal(state.legacyHistory.length, 179);
  assert.equal(state.migrations.t1i_v21.raw, raw);
  assert.equal(state.evidence.length, 0);
  assert.equal(totalXP(state), 0);
  assert.equal(mastery(content, state, unit).score, null);
  assert.deepEqual(state.read, {});
  assert.equal(Object.keys(state.reviews).length, 44);
  for (const review of Object.values(state.reviews)) {
    assert.equal(review.due, now);
    assert.equal(review.reviews, 0);
    assert.equal(review.last, 0);
  }
  const authored = fund.cards.find((c) => !c.refs.length);
  assert.ok(authored);
  assert.equal(state.reviews[authored.id], undefined);
  const before = structuredClone(state);
  assert.equal(importLegacy(state, content, 't1i_v21', raw, now).imported, 0);
  assert.deepEqual(state, before);
  assert.doesNotThrow(() => parseState(JSON.stringify(state)));
});

test('fallback t1i_v2 fica apenas como histórico incerto e conteúdo inválido permanece no bruto', () => {
  const state = fresh(),
    old = fullLegacy();
  old.a.b_0_0 = 999;
  old.fc[0] = 'facil';
  old.g.miss[0] = 'falso';
  const raw = JSON.stringify(old);
  const result = importLegacy(state, content, 't1i_v2', raw, now);
  assert.equal(result.imported, 176);
  assert.ok(state.legacyHistory.every((h) => h.ambiguous));
  assert.deepEqual(state.errors, {});
  assert.deepEqual(state.reviews, {});
  assert.equal(state.migrations.t1i_v2.raw, raw);
  const before = structuredClone(state);
  assert.throws(() => importLegacy(state, content, 't1i_v21', '{quebrado', now));
  assert.deepEqual(state, before);
});

test('adicionar Fundamentos preserva evidências, erros, agenda, rascunho, XP e sessão de Cartografia', () => {
  const store = new MemoryStore();
  const old = new Repository(store, cartography);
  const q = cartography.questions[0],
    c = cartography.cards[0];
  old.commit((s) => {
    attempt(s, cartography, {
      item: q.id,
      correct: false,
      kind: 'fixacao',
      context: 'anterior',
      at: now,
    });
    s.reviews[c.id] = schedule(undefined, 'bom', now);
    s.read[cartography.missions[0].sections[0].id] = now;
    s.drafts.anterior = 'Meu raciocínio preservado';
    s.session = {
      id: 'anterior',
      kind: 'questions',
      pool: 'fixacao',
      ids: [q.id],
      position: 0,
      repeat: [],
    };
    s.milestones = { 'module:cartografia': now - 1000 };
  }, now);
  const before = JSON.parse(JSON.stringify(old.state)),
    raw = store.getItem(STATE_KEY);
  const next = new Repository(store, content);
  for (const key of [
    'evidence',
    'errors',
    'read',
    'reviews',
    'drafts',
    'awards',
    'session',
    'milestones',
  ])
    assert.deepEqual(next.state[key], before[key], key);
  assert.equal(store.getItem(STATE_KEY + '.before-canonical-' + content.editorial.release), raw);
  const revision = next.state.revision;
  assert.equal(new Repository(store, content).state.revision, revision);
});

test('agenda V6 existente vence a importação binária antiga e avaliações de Fundamentos persistem', () => {
  const state = fresh(),
    c = fund.cards[0];
  state.reviews[c.id] = schedule(undefined, 'facil', now - 1000);
  const before = structuredClone(state.reviews[c.id]);
  importLegacy(state, content, 't1i_v21', JSON.stringify({ fc: { 0: 'rev' } }), now);
  assert.deepEqual(state.reviews[c.id], before);
  rateCard(state, content, c.id, 'dificil', now + 1000, 'fund-review');
  const restored = parseState(JSON.stringify(state));
  assert.equal(restored.reviews[c.id].rating, 'dificil');
  assert.deepEqual(restored.errors, {});
});

test('sessões contextuais e diagnósticos não retomam outra missão ou outro módulo', () => {
  const q = fund.questions.find((q) => q.mission === 'fundamentos-espaco');
  const session = {
    id: 's',
    kind: 'questions',
    pool: 'fixacao',
    ids: [q.id],
    position: 0,
    repeat: [],
  };
  assert.equal(trainingSessionMatches(content, session, { unit, mission: q.mission }), true);
  assert.equal(
    trainingSessionMatches(content, session, { unit, mission: 'fundamentos-redes' }),
    false,
  );
  assert.equal(trainingSessionMatches(content, session, { unit, pool: 'diagnostico' }), false);
  assert.equal(
    trainingSessionMatches(content, session, { unit: 'cartografia-fundamentos' }),
    false,
  );
});

test('provas respeitam recortes, gabaritos canônicos e alternativas A–E', () => {
  assert.equal(examPool(content, unit).length, 16);
  assert.equal(examPool(content, 'module-cartografia').length, examPool(cartography).length);
  const exam = makeExam(content, fresh(), 10, 20, now, unit, 'fund-test');
  assert.equal(new Set(exam.ids).size, 10);
  for (const id of exam.ids) {
    const q = content.questions.find((q) => q.id === id);
    assert.equal(q.unit, unit);
    assert.equal(q.options.length, 5);
    assert.ok(exam.optionOrder[id].includes(q.correct));
  }
});

test('conclusão de Cartografia e de Fundamentos são independentes, sem XP ou repetição do marco', () => {
  const before = fresh();
  for (const mission of cartography.missions) {
    mission.sections.forEach((s) => (before.read[s.id] = now));
    before.awards['mission:' + mission.id] = { at: now, xp: 0, reason: 'fixture' };
  }
  before.milestones = Object.fromEntries(cartography.units.map((u) => ['boss:' + u.id, now]));
  assert.equal(expeditionComplete(content, before), true);
  assert.equal(expeditionComplete(content, before, [], 'fundamentos'), false);
  const after = structuredClone(before);
  for (const m of fund.missions) {
    m.sections.forEach((s) => (after.read[s.id] = now));
    after.awards['mission:' + m.id] = { at: now, xp: 0, reason: 'fixture' };
  }
  after.milestones['boss:' + unit] = now;
  const events = recognize(content, before, after, now);
  assert.ok(events.some((e) => e.id === 'module:fundamentos'));
  assert.ok(!events.some((e) => e.id === 'module:cartografia'));
  assert.equal(totalXP(after), 0);
  assert.deepEqual(recognize(content, after, structuredClone(after), now), []);
});

test('biblioteca calcula início e percentual por módulo sem regravar histórico', () => {
  const store = new MemoryStore();
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: store });
  try {
    const s = fresh();
    s.read[fund.missions[0].sections[0].id] = now;
    s.resume = { unit, mission: fund.missions[0].id, mode: 'estudo' };
    const raw = JSON.stringify(s);
    store.setItem(STATE_KEY, raw);
    assert.deepEqual(moduleProgress(modules[0]), { started: true, percent: 0 });
    assert.deepEqual(moduleProgress(modules[1]), { started: false, percent: 0 });
    assert.equal(store.getItem(STATE_KEY), raw);
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor);
    else delete globalThis.localStorage;
  }
});

test('URLs antigas de Fundamentos apontam para os modos canônicos', () => {
  for (const [mode, destination] of [
    ['study', 'estudo'],
    ['flash', 'revisao'],
    ['game', 'treino'],
  ])
    assert.equal(
      canonicalLegacyRoute('#/missao/lesson-ff1de1c07eb3?modo=' + mode),
      `/unidade/${unit}/${destination}`,
    );
});
