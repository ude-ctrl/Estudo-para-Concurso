import type { Content, State, TrainingPool, UnitId } from './types.ts';

export function parseTrainingPool(value: unknown): TrainingPool | undefined {
  return typeof value === 'string' &&
    ['fixacao', 'concurso', 'elite', 'diagnostico', 'pos-teste', 'chefao'].includes(value)
    ? (value as TrainingPool)
    : undefined;
}

export function trainingHref(unit: UnitId, mission = '', pool?: TrainingPool) {
  const query = new URLSearchParams();
  if (mission) query.set('missao', mission);
  if (pool) query.set('banco', pool);
  return `#/unidade/${unit}/treino${query.size ? '?' + query : ''}`;
}

// Old saves need no new session fields: their canonical item IDs and pool define compatibility.
// Checking every item prevents a mixed round from masquerading as a mission-specific activity.
export function trainingSessionMatches(
  content: Content,
  session: State['session'],
  requested: { unit: UnitId; mission?: string; pool?: TrainingPool },
): boolean {
  if (!session || session.kind === 'cards' || !session.ids.length) return false;
  if ((requested.mission || requested.pool) && session.kind !== 'questions') return false;
  if (requested.pool && session.pool !== requested.pool) return false;
  const items = session.kind === 'questions' ? content.questions : content.game;
  return session.ids.every((id) => {
    const item = items.find((item) => item.id === id);
    return (
      item?.unit === requested.unit && (!requested.mission || item.mission === requested.mission)
    );
  });
}
