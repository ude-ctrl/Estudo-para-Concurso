import { DAY, totalXP } from './engine.ts';
import type { Milestone } from './recognition.ts';
import type { Content, Experience, Mission, Sound, State } from './types.ts';

export type SensoryKind =
  | 'correct'
  | 'elite'
  | 'incorrect'
  | 'block'
  | 'mission'
  | 'unit'
  | 'reviews'
  | 'streak'
  | 'error'
  | 'boss'
  | 'module';
export interface SensoryEvent extends Milestone {
  kind: SensoryKind;
  importance: number;
  item?: string;
  xp: number;
}

export function sensoryPreferences(state: State): { experience: Experience; sound: Sound } {
  return {
    experience: state.preferences.experience || 'balanced',
    sound: state.preferences.sound || 'off',
  };
}

export function sensoryQuiet(route: { page: string; mode: string }, state: State) {
  return (
    (route.page === 'unit' && route.mode === 'prova') ||
    !!(state.exam && !state.exam.finished) ||
    !!(state.practical.started && ['plano', 'defesa'].includes(state.practical.phase))
  );
}

export function missionComplete(mission: Mission, state: State) {
  return (
    mission.sections.length > 0 &&
    mission.sections.every((section) => !!state.read[section.id]) &&
    !!state.awards['mission:' + mission.id]
  );
}

export function expeditionComplete(content: Content, state: State, newMilestones: string[] = []) {
  return (
    content.units.length > 0 &&
    content.missions.length > 0 &&
    content.missions.every((mission) => missionComplete(mission, state)) &&
    content.units.every(
      (unit) => state.milestones?.['boss:' + unit.id] || newMilestones.includes('boss:' + unit.id),
    )
  );
}

// These are journey states, deliberately separate from the engine's mastery estimate.
export function missionJourney(content: Content, state: State, mission: Mission, at: number) {
  const due = content.cards.filter(
    (card) => card.mission === mission.id && state.reviews[card.id]?.due <= at,
  ).length;
  const fragile = Object.values(state.errors).some(
    (error) => error.mission === mission.id && error.status !== 'dominado-apos-erro',
  );
  const complete = missionComplete(mission, state);
  const read = mission.sections.filter((section) => state.read[section.id]).length;
  const status = due
    ? 'due'
    : fragile
      ? 'fragile'
      : complete
        ? 'complete'
        : read
          ? 'reading'
          : 'ready';
  const labels = {
    due: 'Revisão pendente',
    fragile: 'Fragilidade em recuperação',
    complete: 'Leitura e recuperação concluídas',
    reading: 'Em estudo',
    ready: 'Disponível',
  };
  return { status, label: labels[status], due, complete, read };
}

export function personalLevel(state: State) {
  const xp = totalXP(state);
  const level = Math.floor(Math.sqrt(xp / 80)) + 1;
  const start = 80 * (level - 1) ** 2;
  const next = 80 * level ** 2;
  return { xp, level, start, next, progress: xp - start, span: next - start };
}

// Compare civil dates, not elapsed milliseconds: DST does not shorten a valid streak.
export function bestStreak(state: State) {
  const days = [...new Set(state.significantDays)].sort();
  let best = 0,
    run = 0,
    previous = -Infinity;
  for (const day of days) {
    const [year, month, date] = day.split('-').map(Number);
    const ordinal = Date.UTC(year, month - 1, date) / DAY;
    run = ordinal === previous + 1 ? run + 1 : 1;
    best = Math.max(best, run);
    previous = ordinal;
  }
  return best;
}

export function sessionCompleted(before: State, after: State) {
  const session = after.session;
  return !!(
    session &&
    session.ids.length &&
    session.position >= session.ids.length &&
    before.session?.id === session.id &&
    before.session.position < session.ids.length
  );
}

// The ledger remains authoritative. Only new XP belonging to this working session is presented.
// Existing saves with no accounting field retain their history without an invented round total.
export function recordSessionSummary(before: State, after: State) {
  const session = after.session;
  if (!session) return;
  if (session.id !== before.session?.id) {
    session.sensorySummary = { xp: 0, reviews: 0, converted: 0 };
    return;
  }
  if (!session.sensorySummary) return;
  const added = after.evidence
    .slice(before.evidence.length)
    .filter(
      (evidence) =>
        evidence.context === session.id ||
        (session.kind === 'cards' &&
          evidence.kind === 'flashcard' &&
          evidence.item === before.session?.ids[before.session.position]),
    );
  if (!added.length) return;
  const newAwards = Object.entries(after.awards).filter(([key]) => !before.awards[key]);
  session.sensorySummary.xp += newAwards.reduce((sum, [, award]) => sum + award.xp, 0);
  session.sensorySummary.reviews += newAwards.filter(([key]) => key.startsWith('review:')).length;
  session.sensorySummary.converted += newAwards.filter(([key]) => key.startsWith('error:')).length;
}

const importance: Record<SensoryKind, number> = {
  correct: 1,
  incorrect: 1,
  elite: 2,
  block: 3,
  reviews: 4,
  streak: 4,
  mission: 5,
  unit: 6,
  boss: 8,
  error: 9,
  module: 10,
};

// Pure presentation events. Never changes awards, evidence, review intervals or mastery.
export function sensoryEvents(
  content: Content,
  before: State,
  after: State,
  milestones: Milestone[],
): SensoryEvent[] {
  const events: SensoryEvent[] = [];
  const xp = Math.max(0, totalXP(after) - totalXP(before));
  for (const milestone of milestones) {
    const kind = milestone.id.split(':')[0] as SensoryKind;
    if (kind in importance) events.push({ ...milestone, kind, importance: importance[kind], xp });
  }
  const added = after.evidence.slice(before.evidence.length);
  const evidence = added.length === 1 ? added[0] : undefined;
  if (evidence?.eligible && evidence.kind !== 'exam') {
    const kind = !evidence.correct ? 'incorrect' : evidence.kind === 'elite' ? 'elite' : 'correct';
    events.push({
      id: evidence.id,
      kind,
      item: evidence.item,
      importance: importance[kind],
      title: !evidence.correct
        ? 'Uma pista para ajustar o raciocínio'
        : kind === 'elite'
          ? 'FGV Elite superada nesta tentativa'
          : evidence.rating === 'dificil'
            ? 'Recuperação com esforço registrada'
            : 'Raciocínio recuperado',
      description: !evidence.correct
        ? 'A explicação ajuda a distinguir a confusão. Retome depois de um intervalo.'
        : 'A retenção continua sendo verificada nas próximas revisões.',
      xp: 0,
    });
  }
  if (sessionCompleted(before, after)) {
    const summary = after.session!.sensorySummary;
    events.push({
      id: 'block:' + after.session!.id,
      kind: 'block',
      importance: importance.block,
      title:
        after.session!.kind === 'cards'
          ? 'Bloco de revisão concluído'
          : 'Bloco de treino concluído',
      description: 'Confira as recuperações e escolha seu próximo passo.',
      xp: summary?.xp || 0,
    });
  }
  return events.sort((a, b) => b.importance - a.importance);
}
