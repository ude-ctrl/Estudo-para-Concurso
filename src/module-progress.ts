import { parseState, STATE_KEY } from './v6/engine.ts';
import type { StudyModule } from './types';

// Read only. The library never migrates, rewrites or rewards module progress.
export function moduleProgress(module: StudyModule) {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return { started: false, percent: 0 };
    const state = parseState(raw);
    const questions = new Set(module.questionIds);
    const units = new Set(module.units.map((u) => u.id));
    const sectionIds = new Set(module.sectionIds || []);
    const cardIds = new Set(module.cardIds || []);
    const itemIds = new Set(module.itemIds || module.questionIds);
    const answered = new Set(
      state.evidence.filter((e) => questions.has(e.item)).map((e) => e.item),
    );
    return {
      started:
        state.evidence.some((e) => units.has(e.unit)) ||
        Object.keys(state.read).some((id) => sectionIds.has(id)) ||
        Object.keys(state.reviews).some((id) => cardIds.has(id)) ||
        !!(state.resume && units.has(state.resume.unit)) ||
        !!state.session?.ids.some((id) => itemIds.has(id)) ||
        !!state.exam?.ids.some((id) => questions.has(id)),
      percent: module.counts.questions
        ? Math.round((answered.size / module.counts.questions) * 100)
        : 0,
    };
  } catch {
    // Leave malformed/unavailable storage untouched for the module's recovery flow.
    return { started: false, percent: 0 };
  }
}
