import type { Content, Evidence, State, UnitId } from './types.ts';

export function learningItem(content: Content, id: string) {
  const item = [...content.questions, ...content.cards, ...content.game].find((x) => x.id === id);
  if (item) return item;
  for (const mission of content.missions) {
    const recall = mission.recalls.find((r) => r.id === id);
    if (recall) return { ...recall, unit: mission.unit };
  }
  return undefined;
}

export function learningIdentity(content: Content, id: string) {
  return content.editorial?.question_families.find((f) => f.members.includes(id))?.id || id;
}

export function familyMembers(content: Content, id: string) {
  return content.editorial?.question_families.find((f) => f.members.includes(id))?.members || [id];
}

export function questionExposure(content: Content, state: State, id: string) {
  const members = familyMembers(content, id);
  return Math.max(
    0,
    ...members.map((key) => state.exposures[key] || 0),
    ...state.evidence.filter((e) => members.includes(e.item)).map((e) => e.at),
  );
}

export function editorialVersion(content: Content, unit: UnitId) {
  return content.editorial?.units[unit].version || content.version;
}

function sameBinding(
  content: Content,
  evidence: Pick<Evidence, 'item' | 'concept' | 'mission' | 'unit'>,
) {
  const item = learningItem(content, evidence.item);
  return (
    !!item &&
    item.concept === evidence.concept &&
    item.mission === evidence.mission &&
    item.unit === evidence.unit
  );
}

// Preserve the evidence ledger. Its current interpretation excludes obsolete concept bindings
// and treats nearby answers to equivalent formulations as one independent observation.
export function learningEvidence(content: Content, state: State): Evidence[] {
  if (!content.editorial) return state.evidence;
  const previous = new Map<string, number>();
  const result: Evidence[] = [];
  for (const evidence of [...state.evidence].sort((a, b) => a.at - b.at)) {
    if (!sameBinding(content, evidence)) continue;
    const key = learningIdentity(content, evidence.item);
    const last = previous.get(key);
    const delayed = last !== undefined && evidence.at - last >= 86_400_000;
    previous.set(key, evidence.at);
    if (evidence.eligible && (last === undefined || delayed)) {
      const question = content.questions.find((q) => q.id === evidence.item);
      result.push({
        ...evidence,
        delayed,
        difficulty: question?.difficulty || evidence.difficulty,
        kind:
          question && ['fixacao', 'concurso', 'elite'].includes(evidence.kind)
            ? question.pool
            : evidence.kind,
      });
    }
  }
  return result;
}

// Additive, idempotent migration. No attempts, review dates, prizes or achievements are created.
export function reconcileContent(state: State, content: Content, at: number): boolean {
  const release = content.editorial;
  if (!release) return false;
  const switched = state.contentRevision?.release !== release.release;
  let changed = switched;
  const previousVersions =
    state.contentRevision?.units ||
    Object.fromEntries(content.units.map((u) => [u.id, release.legacy_version]));
  for (const evidence of state.evidence) {
    if (evidence.editorialVersion !== undefined) continue;
    evidence.editorialVersion = release.legacy_version;
    changed = true;
  }
  if (state.exam && !state.exam.editorialVersions) {
    state.exam.editorialVersions = Object.fromEntries(
      content.units.map((u) => [u.id, release.legacy_version]),
    );
    changed = true;
  }
  for (const [key, error] of Object.entries(state.errors)) {
    const incompatible = new Set(
      error.itemIds.filter((id) => {
        const item = learningItem(content, id);
        return (
          item &&
          (item.concept !== error.concept ||
            item.mission !== error.mission ||
            item.unit !== error.unit)
        );
      }),
    );
    if (!incompatible.size) continue;
    changed = true;
    state.contentHistory ??= { errors: [] };
    state.contentHistory.errors.push({
      key,
      record: structuredClone(error),
      version:
        state.evidence.filter((e) => incompatible.has(e.item) && e.concept === error.concept).at(-1)
          ?.editorialVersion ||
        (switched ? previousVersions[error.unit] : release.legacy_version) ||
        release.legacy_version,
      reason:
        'Associação editorial corrigida; o registro anterior não comprova resposta ao novo conceito. Cópia integral preservada.',
    });
    const events = error.events.filter((event) => !incompatible.has(event.item));
    const misses = events.filter((event) => !event.correct);
    if (!misses.length) delete state.errors[key];
    else
      Object.assign(error, {
        itemIds: error.itemIds.filter((id) => !incompatible.has(id)),
        events,
        first: Math.min(...misses.map((e) => e.at)),
        last: Math.max(...misses.map((e) => e.at)),
        count: misses.length,
        delayedItems: [],
        status: 'aberto',
        falseMastery: false,
      });
  }
  if (switched)
    state.contentRevision = {
      release: release.release,
      units: Object.fromEntries(content.units.map((u) => [u.id, release.units[u.id].version])),
      appliedAt: at,
    };
  return changed;
}
