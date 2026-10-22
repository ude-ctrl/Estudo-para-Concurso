import type { Catalog, Lesson, Progress } from './types';

export const PREFERENCES_KEY = 'missao-geografia:preferences:v1';
export interface Preferences {
  favorites: string[];
  lastVisited: string | null;
}
export const emptyPreferences: Preferences = { favorites: [], lastVisited: null };

export function readPreferences(): Preferences {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(PREFERENCES_KEY) ?? 'null');
    if (!value || typeof value !== 'object') return emptyPreferences;
    const data = value as Record<string, unknown>;
    return {
      favorites: Array.isArray(data.favorites)
        ? data.favorites.filter((id): id is string => typeof id === 'string')
        : [],
      lastVisited: typeof data.lastVisited === 'string' ? data.lastVisited : null,
    };
  } catch {
    return emptyPreferences;
  }
}

export function writePreferences(value: Preferences): boolean {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function readProgress(lesson: Lesson): Progress {
  let state: Record<string, unknown> = {};
  try {
    const raw =
      localStorage.getItem(lesson.storage.current) ||
      (lesson.storage.previous && localStorage.getItem(lesson.storage.previous));
    state = record(raw ? JSON.parse(raw) : null);
  } catch {
    /* Corrupt or unavailable storage must not prevent catalog access. */
  }
  const answers = record(state.a),
    cards = record(state.fc),
    game = record(state.g);
  // Legacy games save completed rounds separately from the study question bank.
  const played = typeof game.n === 'number' && Number.isSafeInteger(game.n) && game.n > 0;
  const answered = lesson.legacyQuestionKeys.filter(
    (key) =>
      typeof answers[key] === 'number' &&
      Number.isInteger(answers[key]) &&
      (answers[key] as number) >= 0 &&
      (answers[key] as number) < lesson.legacyQuestionOptions[key],
  ).length;
  let known = 0,
    review = 0;
  for (let i = 0; i < lesson.counts.flashcards; i++) {
    if (cards[i] === 'ok') known++;
    if (cards[i] === 'rev') review++;
  }
  const total = lesson.legacyQuestionKeys.length;
  const stage =
    typeof state.u === 'number' && Number.isInteger(state.u)
      ? Math.max(0, Math.min(state.u, lesson.counts.stages))
      : 0;
  return {
    answered,
    total,
    percent: total ? Math.round((answered / total) * 100) : 0,
    known,
    review,
    stage,
    started: answered > 0 || stage > 0 || known + review > 0 || played,
  };
}

export function exportProgress(catalog: Catalog, preferences: Preferences): boolean {
  try {
    const sources = [...catalog.lessons, ...(catalog.legacyBackupSources || [])];
    const keys = new Set(
      sources.flatMap((lesson) =>
        [lesson.storage.current, lesson.storage.previous].filter((key): key is string =>
          Boolean(key),
        ),
      ),
    );
    keys.add('seducpa_auditoria_v1');
    const legacyStorage: Record<string, string> = {};
    for (const key of keys) {
      const value = localStorage.getItem(key);
      if (value !== null) legacyStorage[key] = value;
    }
    const payload = {
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      preferences,
      sources: sources.map(({ id, sourceHash, storage }) => ({ id, sourceHash, storage })),
      legacyStorage,
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = `missao-geografia-progresso-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch {
    return false;
  }
}
