import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { buildV6 } from '../scripts/build-v6.mjs';
import { root, readBundle, reconstructPilot, sha } from '../scripts/canonical-content.mjs';
import {
  attempt,
  DAY,
  fresh,
  mastery,
  makeExam,
  finishExam,
  examPool,
  totalXP,
  parseState,
  schedule,
  STATE_KEY,
  nextQuestions,
} from '../src/v6/engine.ts';
import {
  editorialVersion,
  familyMembers,
  learningIdentity,
  learningEvidence,
  questionExposure,
  reconcileContent,
} from '../src/v6/content-progress.ts';
import { Repository } from '../src/v6/repository.ts';
import { recognize } from '../src/v6/recognition.ts';

const at = '2026-10-16T18:00:00Z';
const now = Date.parse(at);
const baseRoot = resolve(root, 'base-conhecimento');
const ids = ['cartografia-fundamentos', 'cartografia-representacao', 'geotecnologias'];
const initial = await Promise.all(ids.map((id) => readBundle(baseRoot, id, '0.1.0')));
const previous = await Promise.all(ids.map((id) => readBundle(baseRoot, id, '0.1.2')));
const baseline = JSON.parse(
  await readFile(resolve(baseRoot, 'cartografia/baseline-piloto.json'), 'utf8'),
);
const pilot = reconstructPilot(initial, baseline);
const { content, parity } = await buildV6({ at });
const gmsId = 'v6-fix-ae06798f90e822d3';
const family = content.editorial.question_families[0];
const members = ['fixacao', 'concurso'].map((pool) =>
  family.members.find((id) => content.questions.find((q) => q.id === id).pool === pool),
);
const memory = () => {
  const data = new Map();
  return {
    data,
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  };
};

test('banco operacional contém exatamente a base revisada das três unidades e seus suportes', () => {
  assert.equal(content.version, '6.1.0-canonica.1');
  assert.deepEqual(
    content.units.map((u) => u.id),
    ids,
  );
  assert.deepEqual(parity.counts, {
    stages: 50,
    questions: 161,
    legacyQuestions: 125,
    authored: 36,
    cards: 120,
    legacyCards: 151,
    game: 256,
    legacyGame: 302,
    recalls: 39,
    canonicalRecalls: 39,
    writing: 6,
  });
  assert.equal(parity.records.length, 685);
  for (const key of ['missions', 'concepts', 'cards', 'game', 'writing', 'supplements'])
    assert.deepEqual(
      content[key],
      previous.flatMap((b) => b.base.content[key]),
    );
  const pedagogy = ({ status, reviewNotes, ...q }) => q;
  assert.deepEqual(
    content.questions.map(pedagogy),
    previous.flatMap((b) => b.base.content.questions).map(pedagogy),
  );
  assert.deepEqual(
    content.support.visuals,
    previous.flatMap((b) => b.base.support.visuals),
  );
  assert.equal(content.support.teaching_practice.length, 1);
  assert.equal(content.support.teaching_practice[0].rubric.length, 10);
  assert.equal(content.support.visuals.find((v) => v.id === 'landsat-rio').images.length, 2);
});

test('build canônica funciona apenas com os pacotes, sem HTMLs ou importadores legados', async (t) => {
  const temp = await mkdtemp(resolve(tmpdir(), 'v6-runtime-base-only-'));
  t.after(() => rm(temp, { recursive: true, force: true }));
  await cp(baseRoot, temp, { recursive: true });
  const rebuilt = await buildV6({ baseRoot: temp, at });
  assert.equal(sha(rebuilt.content), sha(content));
  assert.equal(sha(rebuilt.parity), sha(parity));
});

test('tentativa atual registra versão editorial e alternativa, sem apagar sua identidade de origem', () => {
  const state = fresh(),
    q = content.questions.find((q) => q.id === gmsId);
  const choice = q.options.find((o) => o.id !== q.correct);
  const evidence = attempt(state, content, {
    item: q.id,
    correct: false,
    kind: 'fixacao',
    at: now,
    choice: choice.id,
  });
  assert.equal(evidence.editorialVersion, '1.0.0');
  assert.equal(evidence.choice, choice.id);
  assert.equal(evidence.concept, 'gms');
  assert.equal(q.refs[0].legacy_id, 'b_6_0');
  assert.equal(editorialVersion(content, q.unit), '1.0.0');
});

function oldProgress() {
  const state = fresh();
  attempt(state, pilot, { item: gmsId, correct: false, kind: 'fixacao', at: now - DAY });
  delete state.evidence[0].editorialVersion;
  state.read['v6-theory-t02-6'] = now - DAY;
  state.reviews[content.cards[0].id] = schedule(undefined, 'bom', now - 4 * DAY);
  const retired = content.editorial.retired_options[0];
  state.session = {
    id: 'old-round',
    kind: 'questions',
    ids: [gmsId],
    position: 0,
    repeat: [],
    pool: 'fixacao',
  };
  state.drafts['answer:old-round:' + gmsId] = retired.retired_option_id;
  state.awards['first:' + gmsId] = { at: now - DAY, xp: 4, reason: 'Recompensa histórica' };
  state.milestones = { 'mission:coordenadas-gms': now - DAY };
  return JSON.parse(JSON.stringify(state));
}

test('migração conserva agenda, XP, rascunhos, tentativas e cópia exata; não transfere erro a outro conceito', () => {
  const before = oldProgress(),
    raw = JSON.stringify(before),
    store = memory();
  store.setItem(STATE_KEY, raw);
  const repo = new Repository(store, content),
    after = repo.state;
  for (const key of [
    'read',
    'reviews',
    'drafts',
    'awards',
    'milestones',
    'significantDays',
    'session',
  ])
    assert.deepEqual(after[key], before[key], key);
  assert.equal(after.evidence.length, before.evidence.length);
  assert.equal(after.evidence[0].concept, 'latitude');
  assert.equal(after.evidence[0].editorialVersion, pilot.version);
  assert.equal(learningEvidence(content, after).length, 0);
  assert.deepEqual(after.contentHistory.errors[0].record, Object.values(before.errors)[0]);
  assert.equal(Object.keys(after.errors).length, 0);
  assert.equal(totalXP(after), totalXP(before));
  assert.equal(store.getItem(STATE_KEY + '.before-canonical-' + content.editorial.release), raw);
  assert.deepEqual(recognize(content, before, after, now), []);
  const saved = store.getItem(STATE_KEY);
  assert.equal(new Repository(store, content).state.revision, after.revision);
  assert.equal(store.getItem(STATE_KEY), saved);
  assert.deepEqual(parseState(saved), after);
});

test('erro misto conserva cópia integral e mantém somente ocorrências compatíveis no caderno ativo', () => {
  const state = fresh();
  attempt(state, pilot, { item: gmsId, correct: false, kind: 'fixacao', at: now - 2 * DAY });
  attempt(state, pilot, { item: 'v6-q-f08', correct: false, kind: 'concurso', at: now - DAY });
  const original = structuredClone(Object.values(state.errors)[0]);
  assert.equal(original.count, 2);
  reconcileContent(state, content, now);
  assert.deepEqual(state.contentHistory.errors[0].record, original);
  const current = Object.values(state.errors)[0];
  assert.equal(current.concept, 'latitude');
  assert.equal(current.count, 1);
  assert.deepEqual(current.itemIds, ['v6-q-f08']);
  assert.equal(current.status, 'aberto');
  assert.ok(!state.errors['gms:E5']);
});

test('restaurar backup antigo executa a mesma migração, sem novo XP ou perda do histórico', () => {
  const store = memory(),
    repo = new Repository(store, content),
    before = oldProgress();
  const result = repo.replace(JSON.stringify(before));
  assert.equal(result.contentRevision.release, content.editorial.release);
  assert.equal(result.contentHistory.errors.length, 1);
  assert.equal(totalXP(result), totalXP(before));
  assert.equal(
    result.drafts['answer:old-round:' + gmsId],
    content.editorial.retired_options[0].retired_option_id,
  );
  assert.ok(store.getItem(STATE_KEY + '.before-restore'));
});

test('gravação posterior de aba antiga é reconciliada mesmo com o marcador atual presente', () => {
  const store = memory(),
    repo = new Repository(store, content);
  const old = oldProgress(),
    cached = JSON.parse(store.getItem(STATE_KEY));
  cached.evidence.push(...old.evidence);
  Object.assign(cached.errors, old.errors);
  cached.revision += 2;
  store.setItem(STATE_KEY, JSON.stringify(cached));
  const reloaded = repo.reload();
  assert.equal(reloaded.contentRevision.release, content.editorial.release);
  assert.equal(reloaded.evidence[0].editorialVersion, pilot.version);
  assert.equal(reloaded.contentHistory.errors.length, 1);
  assert.equal(reloaded.contentHistory.errors[0].version, pilot.version);
  assert.deepEqual(reloaded.errors, {});
  assert.equal(totalXP(reloaded), 0);
  assert.equal(new Repository(store, content).state.contentHistory.errors.length, 1);
});

test('migração sem armazenamento mantém dados em memória e permite exportação válida', () => {
  const raw = JSON.stringify(oldProgress());
  const repo = new Repository(
    {
      getItem: () => raw,
      setItem: () => {
        throw Error('Quota');
      },
    },
    content,
  );
  assert.match(repo.warning, /memória|sessão/);
  assert.equal(repo.state.contentHistory.errors.length, 1);
  assert.equal(totalXP(repo.state), 4);
  assert.equal(
    parseState(JSON.stringify(repo.state)).contentRevision.release,
    content.editorial.release,
  );
});

test('trocar formulações da mesma família não gera XP imediato nem diversidade independente', () => {
  const state = fresh();
  const first = attempt(state, content, {
    item: members[0],
    correct: true,
    kind: 'fixacao',
    at: now,
  });
  const xp = totalXP(state);
  const second = attempt(state, content, {
    item: members[1],
    correct: true,
    kind: 'concurso',
    at: now + 1_000,
  });
  assert.equal(first.eligible, true);
  assert.equal(second.eligible, false);
  assert.equal(second.familyId, first.familyId);
  assert.equal(totalXP(state), xp);
  const delayed = attempt(state, content, {
    item: members[1],
    correct: true,
    kind: 'concurso',
    at: now + DAY + 2_000,
  });
  assert.equal(delayed.delayed, true);
  assert.equal(totalXP(state), xp);
  assert.equal(mastery(content, state, ids[0]).distinct, 1);
  assert.equal(mastery(content, state, ids[0]).score, null);
});

test('evidências antigas de familiares próximos são preservadas e não inflam domínio atual', () => {
  const state = fresh();
  for (const [i, id] of members.entries())
    attempt(state, pilot, { item: id, correct: true, kind: 'fixacao', at: now + i * 1000 });
  assert.ok(state.evidence.every((e) => e.eligible));
  const raw = JSON.stringify(state.evidence);
  assert.equal(mastery(content, state, ids[0]).distinct, 1);
  assert.equal(learningEvidence(content, state).length, 1);
  assert.equal(JSON.stringify(state.evidence), raw);
});

test('estimativa aplica a classificação canônica sem reescrever o registro histórico de Elite', () => {
  const state = fresh();
  attempt(state, pilot, { item: 'v6-q-r11', correct: true, kind: 'elite', at: now });
  const raw = JSON.stringify(state.evidence);
  const current = learningEvidence(content, state)[0];
  assert.equal(current.kind, 'concurso');
  assert.equal(current.difficulty, 2);
  assert.equal(state.evidence[0].kind, 'elite');
  assert.equal(state.evidence[0].difficulty, 3);
  assert.equal(JSON.stringify(state.evidence), raw);
});

test('família conhecida pelo legado reduz novidade e é ordenada depois das não vistas', () => {
  const state = fresh();
  state.exposures[members[0]] = now;
  assert.equal(questionExposure(content, state, members[1]), now);
  const exam = makeExam(content, state, 36, 30, now + DAY, undefined, 'family-novelty');
  assert.equal(exam.novelty, 35);
  assert.equal(new Set(exam.ids.map((id) => learningIdentity(content, id))).size, 36);
  assert.deepEqual(exam.editorialVersions, Object.fromEntries(ids.map((id) => [id, '1.0.0'])));
  assert.equal(nextQuestions(content, state, 'concurso', ids[0]).at(-1), members[1]);
});

test('prova recusa estoque artificialmente inflado por duas questões da mesma família', () => {
  const copy = structuredClone(content);
  const q = structuredClone(copy.questions.find((q) => q.id === members[1]));
  q.id = 'test-equivalent-formulation';
  copy.questions.push(q);
  copy.editorial.question_families[0].members.push(q.id);
  assert.equal(examPool(copy).length, 37);
  assert.throws(() => makeExam(copy, fresh(), 37, 30, now), /Estoque/);
  const exam = makeExam(copy, fresh(), 36, 30, now, undefined, 'no-family-repeat');
  assert.equal(new Set(exam.ids.map((id) => learningIdentity(copy, id))).size, exam.ids.length);
});

test('recompensa antiga por um membro impede primeiro-acerto duplicado por outro', () => {
  const state = fresh();
  state.awards['first:' + members[0]] = { at: now - DAY, xp: 4, reason: 'Anterior' };
  attempt(state, content, { item: members[1], correct: true, kind: 'concurso', at: now });
  assert.equal(totalXP(state), 4);
});

test('outro membro da mesma família não satisfaz os dois contextos para erro convertido', () => {
  const state = fresh();
  attempt(state, content, { item: members[0], correct: false, kind: 'fixacao', at: now });
  const card = content.cards.find(
    (c) => c.concept === content.questions.find((q) => q.id === members[0]).concept,
  );
  state.reviews[card.id] = {
    due: now,
    last: now,
    interval: 4,
    reviews: 2,
    lapses: 0,
    rating: 'bom',
    history: [
      { at: now + DAY, rating: 'bom', interval: 4 },
      { at: now + 3 * DAY, rating: 'bom', interval: 9 },
    ],
  };
  attempt(state, content, { item: members[1], correct: true, kind: 'concurso', at: now + 4 * DAY });
  attempt(state, content, { item: members[0], correct: true, kind: 'fixacao', at: now + 8 * DAY });
  assert.notEqual(Object.values(state.errors)[0].status, 'dominado-apos-erro');
  assert.ok(!Object.keys(state.awards).some((key) => key.startsWith('error:')));
});

test('prova registra respostas e versões e mantém gabaritos após retomar a sessão', () => {
  const state = fresh();
  state.exam = makeExam(content, state, 5, 20, now, undefined, 'canonical-resume');
  const order = structuredClone(state.exam.optionOrder);
  for (const id of state.exam.ids)
    state.exam.answers[id] = content.questions.find((q) => q.id === id).correct;
  const restored = parseState(JSON.stringify(state));
  assert.deepEqual(restored.exam.optionOrder, order);
  finishExam(restored, content, now + 5000);
  assert.equal(restored.evidence.length, 5);
  assert.ok(
    restored.evidence.every((e) => e.correct && e.editorialVersion === '1.0.0' && e.choice),
  );
  const xp = totalXP(restored);
  finishExam(restored, content, now + 6000);
  assert.equal(totalXP(restored), xp);
  assert.throws(() => makeExam(content, restored, 60, 300, now), /Estoque/);
});

test('backup recusa versões e histórico editorial malformados sem rejeitar esquema 6 antigo', () => {
  assert.doesNotThrow(() => parseState(JSON.stringify(fresh())));
  for (const mutate of [
    (s) => {
      s.contentRevision = { release: 'x', units: { x: 7 }, appliedAt: now };
    },
    (s) => {
      s.contentHistory = { errors: [{ key: 'x', version: 'x', reason: 'x', record: {} }] };
    },
    (s) => {
      attempt(s, content, { item: gmsId, correct: true, kind: 'fixacao', at: now });
      s.evidence[0].editorialVersion = {};
    },
    (s) => {
      s.exam = makeExam(content, s, 5, 20, now);
      s.exam.editorialVersions = [1];
    },
  ]) {
    const state = fresh();
    mutate(state);
    assert.throws(() => parseState(JSON.stringify(state)), /inválid/);
  }
});
