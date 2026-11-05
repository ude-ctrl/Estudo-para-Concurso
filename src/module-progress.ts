import { parseState, STATE_KEY } from './v6/engine.ts';
import type { StudyModule } from './types';

// Read only. The library never migrates, rewrites or rewards module progress.
export function moduleProgress(module: StudyModule) {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return { started: false, percent: 0 };
    const state = parseState(raw);
    const questions = new Set(module.questionIds);
    const answered = new Set(
      state.evidence.filter((e) => questions.has(e.item)).map((e) => e.item),
    );
    return {
      started:
        state.evidence.length > 0 ||
        Object.keys(state.read).length > 0 ||
        Object.keys(state.reviews).length > 0 ||
        !!state.resume ||
        !!state.session ||
        !!state.exam,
      percent: module.counts.questions
        ? Math.round((answered.size / module.counts.questions) * 100)
        : 0,
    };
  } catch {
    // Leave malformed/unavailable storage untouched for the module's recovery flow.
    return { started: false, percent: 0 };
  }
}
