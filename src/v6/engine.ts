import type {
  Card,
  Content,
  ErrorType,
  Evidence,
  ExamSession,
  GameItem,
  Question,
  Rating,
  Review,
  State,
  UnitId,
} from './types.ts';
import { parseTrainingPool } from './training-session.ts';
export const DAY = 86_400_000;
export const STATE_KEY = 'missaoGeo.v6.cartografia';
export const ERROR_KEY = 'missaoGeo.v6.errors';
export const errorLabels: Record<ErrorType, string> = {
  E1: 'Conceito',
  E2: 'Confusão entre conceitos',
  E3: 'Interpretação',
  E4: 'Aplicação',
  E5: 'Cálculo',
  E6: 'Atenção',
  E7: 'Dado temporal',
  E8: 'Linguagem',
};
export function fresh(): State {
  return {
    schema: 6,
    revision: 0,
    updated: 0,
    preferences: { theme: 'system', motion: 'system' },
    read: {},
    drafts: {},
    reviews: {},
    evidence: [],
    errors: {},
    awards: {},
    migrations: {},
    legacyHistory: [],
    exposures: {},
    writingHistory: [],
    practical: {
      phase: 'plano',
      topic: 'Escala e acesso à escola',
      planMinutes: 15,
      defenseMinutes: 5,
      checks: [],
    },
    practicalHistory: [],
    significantDays: [],
    calendarPolicy: 'local-v1',
  };
}
export function schedule(old: Review | undefined, rating: Rating, at: number): Review {
  const first = { errei: 1, dificil: 2, bom: 4, facil: 7 };
  const factor = { errei: 0, dificil: 1.3, bom: 2.2, facil: 3.5 };
  let interval =
    !old || old.reviews === 0
      ? first[rating]
      : rating === 'errei'
        ? 1
        : Math.max(1, Math.round(old.interval * factor[rating]));
  const early = !!old && old.last > 0 && at < old.due && rating !== 'errei';
  if (early) interval = old.interval;
  return {
    due: early ? old!.due : at + interval * DAY,
    last: at,
    interval,
    reviews: (old?.reviews || 0) + 1,
    lapses: (old?.lapses || 0) + (rating === 'errei' ? 1 : 0),
    rating,
    history: [...(old?.history || []), { at, rating, interval }],
  };
}
export function reviewQueue(
  content: Content,
  s: State,
  at: number,
  unit?: string,
  limit = 12,
): string[] {
  return content.cards
    .filter((c) => (!unit || c.unit === unit) && (!s.reviews[c.id] || s.reviews[c.id].due <= at))
    .sort((a, b) => {
      const rank = (c: Card) => {
        const r = s.reviews[c.id];
        if (r?.due <= at) return r.rating === 'errei' ? 0 : r.rating === 'dificil' ? 1 : 2;
        return 3;
      };
      return (
        rank(a) - rank(b) ||
        (s.reviews[a.id]?.due || 0) - (s.reviews[b.id]?.due || 0) ||
        a.id.localeCompare(b.id)
      );
    })
    .slice(0, limit)
    .map((c) => c.id);
}
function award(s: State, key: string, xp: number, reason: string, at: number) {
  if (!s.awards[key]) s.awards[key] = { at, xp, reason };
}
export function totalXP(s: State) {
  return Object.values(s.awards).reduce((n, a) => n + a.xp, 0);
}
export function localDay(at: number) {
  const d = new Date(at);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function significant(s: State, at: number) {
  const d = localDay(at);
  if (!s.significantDays.includes(d)) s.significantDays.push(d);
}
export function streak(s: State, at: number) {
  let days = 0;
  const t = new Date(at);
  t.setHours(12, 0, 0, 0);
  if (!s.significantDays.includes(localDay(at))) t.setDate(t.getDate() - 1);
  for (let i = 0; i < 365; i++, t.setDate(t.getDate() - 1)) {
    if (!s.significantDays.includes(localDay(t.getTime()))) break;
    days++;
  }
  return days;
}
export function attempt(
  s: State,
  content: Content,
  args: {
    item: string;
    correct: boolean;
    kind: Evidence['kind'];
    at: number;
    type?: ErrorType;
    rating?: Rating;
    context?: string;
  },
): Evidence {
  const item = [...content.questions, ...content.cards, ...content.game].find(
    (x) => x.id === args.item,
  );
  const recall = content.missions.flatMap((m) => m.recalls).find((r) => r.id === args.item);
  const mission = item?.mission || recall?.mission;
  const m = content.missions.find((m) => m.id === mission);
  if (!m) throw Error('Atividade desconhecida.');
  const concept = item?.concept || recall?.concept || m.conceptIds[0];
  const c = content.concepts.find((c) => c.id === concept)!;
  const previous = s.evidence.filter((e) => e.item === args.item).at(-1);
  const delayed = !!previous && args.at - previous.at >= DAY;
  const eligible = !previous || delayed;
  const evidence: Evidence = {
    id: crypto.randomUUID(),
    item: args.item,
    concept,
    mission: m.id,
    unit: m.unit,
    at: args.at,
    kind: args.kind,
    correct: args.correct,
    delayed,
    eligible,
    difficulty: 'difficulty' in (item || {}) ? (item as Question).difficulty : 1,
    rating: args.rating,
    context: args.context,
  };
  s.evidence.push(evidence);
  if (eligible) significant(s, args.at);
  // Stable misconception IDs are deliberately independent of the question and option position.
  const type = args.type || c.errorType,
    key = concept + ':' + type;
  if (!args.correct) {
    let err = s.errors[key];
    const easy = content.cards.some(
      (card) => card.concept === concept && s.reviews[card.id]?.rating === 'facil',
    );
    if (!err) {
      err = {
        id: key,
        concept,
        mission: m.id,
        unit: m.unit,
        type,
        misconception: c.confusion,
        status: 'aberto',
        first: args.at,
        last: args.at,
        count: 0,
        itemIds: [],
        events: [],
        delayedItems: [],
        falseMastery: false,
      };
      s.errors[key] = err;
    }
    err.last = args.at;
    err.count++;
    err.status = 'aberto';
    err.delayedItems = [];
    err.falseMastery ||= easy;
    if (!err.itemIds.includes(args.item)) err.itemIds.push(args.item);
    err.events.push({
      at: args.at,
      item: args.item,
      correct: false,
      note: easy
        ? 'Possível falsa sensação de domínio: cartão Fácil seguido de erro.'
        : c.confusion,
    });
    // Bring related cards forward without rewriting their successful review history.
    for (const card of content.cards.filter((card) => card.concept === concept)) {
      const r = s.reviews[card.id];
      if (r) r.due = Math.min(r.due, args.at);
      else
        s.reviews[card.id] = {
          due: args.at,
          last: 0,
          interval: 0,
          reviews: 0,
          lapses: 0,
          rating: 'errei',
          history: [],
        };
    }
  } else {
    for (const err of Object.values(s.errors).filter(
      (e) => e.concept === concept && e.status !== 'dominado-apos-erro',
    )) {
      err.events.push({
        at: args.at,
        item: args.item,
        correct: true,
        note:
          args.at - err.last >= DAY
            ? 'Recuperação após intervalo.'
            : 'Retentativa próxima: não resolve o erro.',
      });
      if (args.at - err.last < DAY) {
        if (err.status === 'aberto') err.status = 'em-recuperacao';
        continue;
      }
      const objective = ['fixacao', 'concurso', 'elite', 'exam', 'boss'].includes(args.kind);
      if (objective && !err.delayedItems.includes(args.item)) err.delayedItems.push(args.item);
      if (err.delayedItems.length) err.status = 'resolvido';
      const consistentFC = content.cards.some(
        (card) =>
          card.concept === concept &&
          (s.reviews[card.id]?.history.filter(
            (h, i, hs) =>
              ['bom', 'facil'].includes(h.rating) && (i === 0 || h.at - hs[i - 1].at >= DAY),
          ).length || 0) >= 2,
      );
      const novelContext = err.delayedItems.some((id) => !err.itemIds.includes(id));
      if (
        err.delayedItems.length >= 2 &&
        novelContext &&
        consistentFC &&
        args.at - err.last >= 7 * DAY
      ) {
        err.status = 'dominado-apos-erro';
        err.falseMastery = false;
        award(s, 'error:' + key + ':' + err.last, 15, 'Erro recuperado de forma estável', args.at);
      }
    }
  }
  if (args.correct && eligible) {
    if (args.kind === 'boss')
      award(s, 'boss:' + args.item, 25, 'Primeiro acerto do Chefão', args.at);
    else if (args.kind === 'recall')
      award(s, 'recall:' + args.item + ':' + localDay(args.at), 4, 'Evocação ativa', args.at);
    else if (args.kind !== 'flashcard' && args.kind !== 'game')
      award(s, 'first:' + args.item, 4, 'Primeira recuperação objetiva', args.at);
    if (delayed && previous && !previous.correct)
      award(
        s,
        'improvement:' + args.item + ':' + previous.id,
        10,
        'Melhora após intervalo',
        args.at,
      );
  }
  const hasRead = Object.keys(s.read).some((id) => m.sections.some((sec) => sec.id === id));
  if (args.correct && eligible && hasRead)
    award(s, 'mission:' + m.id, 10, 'Missão com leitura e recuperação', args.at);
  return evidence;
}
export function rateCard(s: State, content: Content, id: string, rating: Rating, at: number) {
  const old = s.reviews[id],
    wasDue = !!old && old.reviews > 0 && old.last > 0 && old.due <= at && at - old.last >= DAY;
  s.reviews[id] = schedule(old, rating, at);
  if (
    rating === 'errei' &&
    s.session?.kind === 'cards' &&
    s.session.ids.includes(id) &&
    !s.session.repeat.includes(id)
  ) {
    s.session.ids.push(id);
    s.session.repeat.push(id);
  }
  attempt(s, content, {
    item: id,
    correct: rating !== 'errei',
    kind: 'flashcard',
    rating,
    at,
  });
  if (wasDue) award(s, 'review:' + id + ':' + old.due, 8, 'Revisão no vencimento', at);
}
export function mastery(content: Content, s: State, unit: UnitId) {
  const concepts = content.concepts.filter((c) =>
    content.missions.some((m) => m.id === c.mission && m.unit === unit),
  );
  const all = s.evidence.filter((e) => e.unit === unit && e.eligible),
    objective = all.filter((e) =>
      ['fixacao', 'concurso', 'elite', 'exam', 'boss'].includes(e.kind),
    );
  const distinct = new Set(objective.map((e) => e.item)).size,
    covered = new Set(objective.map((e) => e.concept)),
    coverage = covered.size / concepts.length;
  const hasRead = content.missions
    .filter((m) => m.unit === unit)
    .some((m) => m.sections.some((sec) => s.read[sec.id]));
  const retained = all.filter((e) => e.delayed),
    types = new Set(
      all.map((e) =>
        ['fixacao', 'concurso', 'elite', 'boss'].includes(e.kind) ? 'objetiva' : e.kind,
      ),
    );
  const enough =
    hasRead && distinct >= 10 && coverage >= 0.5 && types.size >= 2 && retained.length >= 2;
  const conf = enough
    ? distinct >= 24 && coverage >= 0.8 && retained.length >= 8
      ? 'alta'
      : 'média'
    : 'baixa';
  const weights = {
    fixacao: 0.6,
    concurso: 1,
    elite: 1.25,
    boss: 1.15,
    game: 0.3,
    exam: 1.3,
    recall: 0.5,
    flashcard: 0.4,
  };
  const byConcept = concepts.map((c) => {
    const es = all.filter((e) => e.concept === c.id).slice(-25),
      qs = es.filter((e) => !['recall', 'flashcard'].includes(e.kind));
    const weighted = qs.reduce(
      (a, e) => {
        const w = weights[e.kind] * [0, 0.85, 1, 1.15, 1.3][e.difficulty];
        return [a[0] + (e.correct ? w : 0), a[1] + w];
      },
      [0, 0],
    );
    const Q = weighted[1] ? weighted[0] / weighted[1] : 0;
    const rs = es.filter((e) => e.delayed);
    const R = rs.length
      ? rs.reduce(
          (n, e) =>
            n + (e.correct ? (e.kind === 'flashcard' && e.rating === 'dificil' ? 0.5 : 1) : 0),
          0,
        ) / rs.length
      : 0;
    const errs = Object.values(s.errors).filter((e) => e.concept === c.id);
    const E = errs.length
      ? errs.filter((e) => ['resolvido', 'dominado-apos-erro'].includes(e.status)).length /
        errs.length
      : qs.length >= 3
        ? 1
        : 0;
    const C = Math.min(1, new Set(qs.map((e) => e.item)).size / 3);
    return {
      id: c.id,
      name: c.name,
      Q,
      R,
      E,
      C,
      score: 100 * (0.45 * Q + 0.3 * R + 0.15 * E + 0.1 * C),
      count: qs.length,
    };
  });
  const score = Math.round(byConcept.reduce((n, c) => n + c.score, 0) / byConcept.length);
  return {
    score: enough ? score : null,
    confidence: conf,
    coverage: Math.round(coverage * 100),
    distinct,
    delayed: retained.length,
    types: types.size,
    label: enough
      ? 'Estimativa de domínio'
      : all.length
        ? 'Estimativa inicial'
        : 'Dados insuficientes',
    byConcept,
    requirements: !enough
      ? 'Para estimar: estudo, 10 questões distintas, pelo menos metade dos conceitos, duas atividades e duas evidências após intervalo.'
      : '',
  };
}
export const officialBlueprint = {
  portugues: 10,
  raciocinio: 5,
  atualidades: 5,
  pedagogicos: 10,
  geografia: 30,
};
export function blueprintAvailability(stock: Record<string, number>) {
  return Object.entries(officialBlueprint).map(([area, required]) => ({
    area,
    required,
    available: stock[area] || 0,
    missing: Math.max(0, required - (stock[area] || 0)),
  }));
}
// Generic motor: test fixtures can supply every edital area without migrating those modules.
export function assembleBlueprint(
  bank: { id: string; area: string; approved: boolean }[],
  quotas: Record<string, number>,
  exposures: Record<string, number> = {},
) {
  const unique = new Map(bank.filter((q) => q.approved).map((q) => [q.id, q]));
  const missing = Object.entries(quotas)
    .filter(([area, n]) => [...unique.values()].filter((q) => q.area === area).length < n)
    .map(([area, n]) => ({
      area,
      missing: n - [...unique.values()].filter((q) => q.area === area).length,
    }));
  if (missing.length) return { ids: [] as string[], novelty: 0, missing };
  const ids = Object.entries(quotas).flatMap(([area, n]) =>
    [...unique.values()]
      .filter((q) => q.area === area)
      .sort((a, b) => (exposures[a.id] || 0) - (exposures[b.id] || 0) || a.id.localeCompare(b.id))
      .slice(0, n)
      .map((q) => q.id),
  );
  return { ids, novelty: ids.filter((id) => !exposures[id]).length, missing };
}
export function examPool(content: Content, unit?: string, official = false) {
  return content.questions.filter(
    (q) =>
      (!unit || q.unit === unit) &&
      q.pool !== 'fixacao' &&
      q.options.length === 5 &&
      (!official || q.status === 'approved'),
  );
}
export function makeExam(
  content: Content,
  s: State,
  count: number,
  minutes: number,
  at: number,
  unit?: string,
  seed?: string,
): ExamSession {
  const pool = examPool(content, unit);
  if (
    !Number.isInteger(count) ||
    count < 1 ||
    count > pool.length ||
    !Number.isFinite(minutes) ||
    minutes < 1 ||
    minutes > 300
  )
    throw Error('Estoque ou duração inválidos.');
  // Unseen first, then the oldest exposure. A round-robin prevents a large mission swallowing the exam.
  const buckets = new Map<string, Question[]>();
  for (const q of pool) {
    const b = buckets.get(q.mission) || [];
    b.push(q);
    buckets.set(q.mission, b);
  }
  for (const b of buckets.values())
    b.sort(
      (a, b) => (s.exposures[a.id] || 0) - (s.exposures[b.id] || 0) || a.id.localeCompare(b.id),
    );
  const selected: Question[] = [];
  while (selected.length < count) {
    const candidates = [...buckets.values()]
      .filter((b) => b.length)
      .sort((a, b) => (s.exposures[a[0].id] || 0) - (s.exposures[b[0].id] || 0));
    if (!candidates.length) break;
    for (const b of candidates) {
      if (selected.length < count) selected.push(b.shift()!);
    }
  }
  // Generate once per session, then persist optionOrder. Balance alone must not reveal a cycle.
  const id = crypto.randomUUID();
  let value =
    [...(seed || id)].reduce((n, ch) => Math.imul(n ^ ch.charCodeAt(0), 16777619), 2166136261) >>>
    0;
  const random = () => {
    let t = (value += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const shuffle = <T>(items: T[]): T[] => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };
  let positions: number[] = [];
  for (let tries = 0; tries < 128; tries++) {
    positions = shuffle(Array.from({ length: count }, (_, i) => i % 5));
    const excessiveRun = positions.some(
      (p, i) => i >= 2 && p === positions[i - 1] && p === positions[i - 2],
    );
    const periodic = [1, 2, 3, 4, 5].some(
      (period) => count >= 2 * period && positions.every((p, i) => p === positions[i % period]),
    );
    if (!excessiveRun && !periodic) break;
    if (tries === 127) throw Error('Não foi possível montar uma ordem válida. Tente novamente.');
  }
  const optionOrder: Record<string, string[]> = {};
  selected.forEach((q, i) => {
    const wrong = shuffle(q.options.filter((o) => o.id !== q.correct).map((o) => o.id));
    wrong.splice(positions[i], 0, q.correct);
    optionOrder[q.id] = wrong;
  });
  return {
    id,
    ids: selected.map((q) => q.id),
    answers: {},
    optionOrder,
    started: at,
    deadline: at + minutes * 60_000,
    current: 0,
    profile: unit || 'modulo-cartografia',
    novelty: selected.filter((q) => !s.exposures[q.id]).length,
  };
}
export function finishExam(s: State, content: Content, at: number) {
  const exam = s.exam;
  if (!exam || exam.finished) return;
  exam.finished = at;
  for (const id of exam.ids) {
    const q = content.questions.find((q) => q.id === id)!;
    const option = q.options.find((o) => o.id === exam.answers[id]);
    attempt(s, content, {
      item: id,
      correct: option?.id === q.correct,
      kind: 'exam',
      at,
      type: option?.errorType,
      context: exam.id,
    });
    s.exposures[id] = at;
  }
}
function isObject(x: unknown): x is Record<string, unknown> {
  return !!x && typeof x === 'object' && !Array.isArray(x);
}
// JSON is untrusted, including a backup edited outside the platform. Reject malformed state as a whole.
export function parseState(raw: string): State {
  if (raw.length > 15_000_000) throw Error('Cópia excede 15 MB.');
  const o = JSON.parse(raw);
  if (!isObject(o) || o.schema !== 6) throw Error('Versão de progresso incompatível.');
  const inspect = (x: unknown, depth = 0) => {
    if (depth > 30) throw Error('Estrutura de cópia profunda demais.');
    if (x && typeof x === 'object') {
      for (const [k, v] of Object.entries(x)) {
        if (['__proto__', 'prototype', 'constructor'].includes(k))
          throw Error('Chave de cópia não permitida.');
        inspect(v, depth + 1);
      }
    }
  };
  inspect(o);
  for (const k of ['read', 'drafts', 'reviews', 'errors', 'awards', 'migrations', 'exposures'])
    if (!isObject(o[k])) throw Error('Campo inválido: ' + k);
  for (const k of [
    'evidence',
    'legacyHistory',
    'writingHistory',
    'practicalHistory',
    'significantDays',
  ])
    if (!Array.isArray(o[k])) throw Error('Histórico inválido: ' + k);
  if (
    !isObject(o.preferences) ||
    !['system', 'light', 'dark'].includes(String(o.preferences.theme)) ||
    !['system', 'reduce'].includes(String(o.preferences.motion))
  )
    throw Error('Preferências inválidas.');
  if (!Number.isSafeInteger(o.revision) || Number(o.revision) < 0 || !Number.isFinite(o.updated))
    throw Error('Revisão inválida.');
  if (
    !isObject(o.practical) ||
    !['plano', 'defesa', 'rubrica', 'concluida'].includes(String(o.practical.phase)) ||
    !Array.isArray(o.practical.checks) ||
    typeof o.practical.topic !== 'string' ||
    !Number.isFinite(o.practical.planMinutes) ||
    !Number.isFinite(o.practical.defenseMinutes)
  )
    throw Error('Prática inválida.');
  for (const v of Object.values(o.drafts as Record<string, unknown>))
    if (typeof v !== 'string') throw Error('Rascunho inválido.');
  for (const v of [
    ...Object.values(o.read as Record<string, unknown>),
    ...Object.values(o.exposures as Record<string, unknown>),
  ])
    if (!Number.isFinite(v)) throw Error('Data inválida.');
  for (const r of Object.values(o.reviews as Record<string, unknown>)) {
    if (
      !isObject(r) ||
      !['errei', 'dificil', 'bom', 'facil'].includes(String(r.rating)) ||
      !Array.isArray(r.history) ||
      ['due', 'last', 'interval', 'reviews', 'lapses'].some((k) => !Number.isFinite(r[k]))
    )
      throw Error('Agenda inválida.');
    for (const h of r.history)
      if (
        !isObject(h) ||
        !Number.isFinite(h.at) ||
        !Number.isFinite(h.interval) ||
        !['errei', 'dificil', 'bom', 'facil'].includes(String(h.rating))
      )
        throw Error('Evento de agenda inválido.');
  }
  for (const e of o.evidence as unknown[]) {
    if (
      !isObject(e) ||
      typeof e.id !== 'string' ||
      typeof e.item !== 'string' ||
      typeof e.concept !== 'string' ||
      typeof e.mission !== 'string' ||
      !['cartografia-fundamentos', 'cartografia-representacao', 'geotecnologias'].includes(
        String(e.unit),
      ) ||
      !['fixacao', 'concurso', 'elite', 'game', 'recall', 'flashcard', 'exam', 'boss'].includes(
        String(e.kind),
      ) ||
      typeof e.correct !== 'boolean' ||
      typeof e.delayed !== 'boolean' ||
      typeof e.eligible !== 'boolean' ||
      !Number.isFinite(e.at) ||
      ![1, 2, 3, 4].includes(Number(e.difficulty))
    )
      throw Error('Evidência inválida.');
  }
  for (const e of Object.values(o.errors as Record<string, unknown>)) {
    if (
      !isObject(e) ||
      typeof e.id !== 'string' ||
      typeof e.concept !== 'string' ||
      typeof e.misconception !== 'string' ||
      !Object.keys(errorLabels).includes(String(e.type)) ||
      !['aberto', 'em-recuperacao', 'resolvido', 'dominado-apos-erro'].includes(String(e.status)) ||
      !Array.isArray(e.events) ||
      !Array.isArray(e.itemIds) ||
      !Array.isArray(e.delayedItems) ||
      !Number.isFinite(e.last) ||
      !Number.isFinite(e.count)
    )
      throw Error('Caderno inválido.');
  }
  for (const a of Object.values(o.awards as Record<string, unknown>))
    if (
      !isObject(a) ||
      !Number.isFinite(a.xp) ||
      Number(a.xp) < 0 ||
      !Number.isFinite(a.at) ||
      typeof a.reason !== 'string'
    )
      throw Error('Recompensa inválida.');
  if (
    o.milestones !== undefined &&
    (!isObject(o.milestones) ||
      Object.values(o.milestones).some((at) => !Number.isFinite(at) || Number(at) < 0))
  )
    throw Error('Histórico de marcos inválido.');
  for (const m of Object.values(o.migrations as Record<string, unknown>))
    if (
      !isObject(m) ||
      typeof m.raw !== 'string' ||
      !Array.isArray(m.notes) ||
      !Number.isFinite(m.imported)
    )
      throw Error('Migração inválida.');
  const strings = (x: unknown) => Array.isArray(x) && x.every((v) => typeof v === 'string');
  const rubric = (x: unknown) =>
    Array.isArray(x) && x.every((v) => v === null || [-1, 0, 1, 2].includes(Number(v)));
  for (const h of o.writingHistory as unknown[])
    if (
      !isObject(h) ||
      !['id', 'item', 'text', 'medium'].every((k) => typeof h[k] === 'string') ||
      !Number.isFinite(h.at) ||
      !rubric(h.rubric)
    )
      throw Error('Histórico de escrita inválido.');
  for (const h of o.practicalHistory as unknown[])
    if (
      !isObject(h) ||
      typeof h.id !== 'string' ||
      typeof h.topic !== 'string' ||
      !Number.isFinite(h.at) ||
      !isObject(h.fields) ||
      !Object.values(h.fields).every((v) => typeof v === 'string') ||
      !rubric(h.rubric)
    )
      throw Error('Histórico de prática inválido.');
  for (const h of o.legacyHistory as unknown[])
    if (
      !isObject(h) ||
      !['source', 'legacy_id', 'canonical'].every((k) => typeof h[k] === 'string') ||
      typeof h.ambiguous !== 'boolean'
    )
      throw Error('Histórico legado inválido.');
  for (const e of Object.values(o.errors as Record<string, unknown>)) {
    const err = e as Record<string, unknown>;
    if (!strings(err.itemIds) || !strings(err.delayedItems))
      throw Error('IDs do caderno inválidos.');
    for (const ev of err.events as unknown[])
      if (
        !isObject(ev) ||
        typeof ev.note !== 'string' ||
        typeof ev.item !== 'string' ||
        typeof ev.correct !== 'boolean' ||
        !Number.isFinite(ev.at)
      )
        throw Error('Evento do caderno inválido.');
  }
  if (!strings(o.significantDays) || !o.significantDays.every((v) => /^\d{4}-\d{2}-\d{2}$/.test(v)))
    throw Error('Calendário inválido.');
  if (o.calendarPolicy !== undefined && o.calendarPolicy !== 'local-v1')
    throw Error('Política de calendário inválida.');
  if (
    o.legacySignificantDays !== undefined &&
    (!strings(o.legacySignificantDays) ||
      !o.legacySignificantDays.every((v) => /^\d{4}-\d{2}-\d{2}$/.test(v)))
  )
    throw Error('Calendário legado inválido.');
  if (
    o.resume &&
    (!isObject(o.resume) ||
      typeof o.resume.mission !== 'string' ||
      (o.resume.pool !== undefined && parseTrainingPool(o.resume.pool) === undefined) ||
      !['cartografia-fundamentos', 'cartografia-representacao', 'geotecnologias'].includes(
        String(o.resume.unit),
      ) ||
      !['estudo', 'treino', 'revisao', 'prova'].includes(String(o.resume.mode)))
  )
    throw Error('Retomada inválida.');
  if (o.exam) {
    const e = o.exam;
    if (
      !isObject(e) ||
      !Array.isArray(e.ids) ||
      !e.ids.every((id) => typeof id === 'string') ||
      !isObject(e.answers) ||
      !isObject(e.optionOrder) ||
      !Number.isFinite(e.started) ||
      !Number.isFinite(e.deadline) ||
      !Number.isSafeInteger(e.current) ||
      !Object.values(e.optionOrder).every(
        (v) => Array.isArray(v) && v.every((id) => typeof id === 'string'),
      )
    )
      throw Error('Prova inválida.');
  }
  if (o.session) {
    const x = o.session;
    if (
      !isObject(x) ||
      typeof x.id !== 'string' ||
      !['cards', 'questions', 'game'].includes(String(x.kind)) ||
      !Array.isArray(x.ids) ||
      !Array.isArray(x.repeat) ||
      ![...x.ids, ...x.repeat].every((id) => typeof id === 'string') ||
      !Number.isSafeInteger(x.position) ||
      Number(x.position) < 0 ||
      (x.deadline !== undefined && !Number.isFinite(x.deadline))
    )
      throw Error('Sessão inválida.');
  }
  if (o.calendarPolicy === undefined) {
    // Earlier V6 builds used UTC days. Retain that history and reconstruct only dated evidence.
    const previous = o.significantDays as string[];
    const dated = [
      ...(o.evidence as Evidence[]).filter((e) => e.eligible).map((e) => e.at),
      ...(o.writingHistory as State['writingHistory']).map((h) => h.at),
      ...(o.practicalHistory as State['practicalHistory']).map((h) => h.at),
    ];
    o.legacySignificantDays = [...previous];
    o.significantDays = [...new Set(dated.map(localDay))].sort();
    o.calendarPolicy = 'local-v1';
  }
  return o as unknown as State;
}
export function importLegacy(s: State, content: Content, key: string, raw: string, at: number) {
  if (s.migrations[key])
    return { imported: 0, notes: ['Esta chave já foi importada; nenhuma duplicação criada.'] };
  if (raw.length > 5_000_000) throw Error('Legado excede 5 MB.');
  const old = JSON.parse(raw);
  if (!isObject(old)) throw Error('Legado não é um objeto.');
  const source = content.sources.find((x) => x.key === key || x.previous === key);
  if (!source) throw Error('Chave fora do escopo do piloto.');
  const notes: string[] = [],
    ambiguous = (id: string) =>
      (source.code === 'T03A' && /^(b_14_|b_16_|c_4$|C_(43|49)$|G_(78|87|96)$)/.test(id)) ||
      key === source.previous;
  let imported = 0;
  const objects = ['a', 'pre', 'post', 'fc'];
  function retain(legacy_id: string, value: unknown, kind: string) {
    const search = legacy_id.replace(/^post_/, 'pre_');
    const record = content.archive.find(
      (a) =>
        a.kind === kind &&
        a.refs.some((r) => r.legacy_source === source!.path && r.legacy_id === search),
    );
    if (!record) {
      notes.push('ID não mapeado: ' + legacy_id);
      return;
    }
    if (kind === 'question') {
      const q = record.original as { o: string[] };
      if (!Number.isInteger(value) || Number(value) < 0 || Number(value) >= q.o.length) {
        notes.push('Resposta inválida preservada no bruto: ' + legacy_id);
        return;
      }
    }
    if (kind === 'game' && value !== 1 && value !== true) {
      notes.push('Registro de Game inválido: ' + legacy_id);
      return;
    }
    if (kind === 'card' && !['ok', 'rev'].includes(String(value))) {
      notes.push('Avaliação inválida: ' + legacy_id);
      return;
    }
    const uncertain = ambiguous(search);
    s.legacyHistory.push({
      source: key,
      legacy_id,
      canonical: record.id,
      value,
      ambiguous: uncertain,
    });
    imported++;
    if (uncertain) {
      notes.push('Versão incerta; somente histórico: ' + legacy_id);
      return;
    }
    const entity = [...content.questions, ...content.cards, ...content.game].find(
      (x) => x.id === record.id,
    );
    const original = record.original as { c?: number };
    const wasWrong = (kind === 'question' && value !== original.c) || kind === 'game';
    if (wasWrong && entity) {
      const c = content.concepts.find((c) => c.id === entity.concept)!;
      const eid = c.id + ':' + c.errorType;
      let e = s.errors[eid];
      if (!e) {
        e = {
          id: eid,
          concept: c.id,
          mission: entity.mission,
          unit: entity.unit,
          type: c.errorType,
          misconception: c.confusion,
          status: 'aberto',
          first: at,
          last: at,
          count: 0,
          itemIds: [],
          events: [],
          delayedItems: [],
          falseMastery: false,
        };
        s.errors[eid] = e;
      }
      e.count++;
      if (!e.itemIds.includes(entity.id)) e.itemIds.push(entity.id);
      e.events.push({
        at,
        item: entity.id,
        correct: false,
        note: 'Erro legado importado nesta data; data da tentativa original desconhecida.',
      });
    }
    if (kind === 'card') {
      // No invented intervals, dates or successful retention: every imported card is due for revalidation.
      if (!s.reviews[record.id])
        s.reviews[record.id] = {
          due: at,
          last: 0,
          interval: 0,
          reviews: 0,
          lapses: 0,
          rating: value === 'rev' ? 'errei' : 'dificil',
          history: [],
        };
    }
  }
  for (const field of objects) {
    const obj = old[field];
    if (obj === undefined) continue;
    if (!isObject(obj)) {
      notes.push('Campo não interpretado: ' + field);
      continue;
    }
    for (const [id, value] of Object.entries(obj))
      retain(field === 'fc' ? 'C_' + id : id, value, field === 'fc' ? 'card' : 'question');
  }
  if (isObject(old.g) && isObject(old.g.miss))
    for (const [id, value] of Object.entries(old.g.miss)) retain('G_' + id, value, 'game');
  notes.push(
    'Sem datas individuais: histórico legado não gera XP, acerto V6, conclusão de estudo ou estimativa de domínio.',
    'u, dn, placares e campos desconhecidos preservados no backup bruto.',
  );
  s.migrations[key] = { at, raw, notes, imported };
  return { imported, notes };
}
export function priorityErrors(s: State, unit?: string, type?: string, status?: string) {
  return Object.values(s.errors)
    .filter(
      (e) =>
        (!unit || e.unit === unit) &&
        (!type || e.type === type) &&
        (!status || e.status === status),
    )
    .sort(
      (a, b) =>
        Number(b.falseMastery) - Number(a.falseMastery) ||
        Number(a.status === 'resolvido') - Number(b.status === 'resolvido') ||
        b.count - a.count ||
        a.last - b.last,
    );
}
export function nextQuestions(content: Content, s: State, pool: string, unit: string, limit = 10) {
  return content.questions
    .filter(
      (q) =>
        q.unit === unit &&
        (pool === 'chefao'
          ? q.roles.includes('chefao')
          : ['diagnostico', 'pos-teste'].includes(pool)
            ? q.roles.includes('diagnostico')
            : q.pool === pool),
    )
    .sort((a, b) => (s.exposures[a.id] || 0) - (s.exposures[b.id] || 0) || a.id.localeCompare(b.id))
    .slice(0, limit)
    .map((q) => q.id);
}
export function identifyGame(item: GameItem) {
  return item.truth
    ? 'A afirmação é verdadeira.'
    : 'A afirmação é falsa. Formulação correta: ' + item.justification;
}
