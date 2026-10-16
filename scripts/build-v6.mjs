import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  root,
  sha,
  readBundle,
  loadApprovedUnit,
  validateLot,
  collections,
} from './canonical-content.mjs';

const unitIds = ['cartografia-fundamentos', 'cartografia-representacao', 'geotecnologias'];
const runtimeVersion = '6.1.0-canonica.1';

// Cartography is assembled only from approved, versioned bases. There is no legacy fallback.
export async function buildV6({ baseRoot = resolve(root, 'base-conhecimento'), at } = {}) {
  await validateLot(baseRoot, { at });
  const registry = JSON.parse(await readFile(resolve(baseRoot, 'manifest.json'), 'utf8'));
  const entries = registry.units.filter((u) => u.runtime_enabled);
  if (entries.length !== unitIds.length || entries.some((u, i) => u.unit_id !== unitIds[i]))
    throw Error('Consumo fora das três unidades autorizadas de Cartografia');
  const bundles = [];
  const retiredOptions = [];
  for (const entry of entries) {
    await loadApprovedUnit(baseRoot, entry.unit_id, entry.canonical_version, { at });
    const bundle = await readBundle(baseRoot, entry.unit_id, entry.canonical_version);
    if (!bundle.base.metadata.consumer_requirements.active)
      throw Error('Contrato do consumidor não habilitado: ' + entry.unit_id);
    bundles.push(bundle);
    let parent = bundle;
    while (parent.provenance.revision) {
      retiredOptions.push(
        ...parent.provenance.revision.option_replacements.map((r) => ({
          ...r,
          unit_id: entry.unit_id,
          retired_in: parent.base.editorial_version,
        })),
      );
      parent = await readBundle(baseRoot, entry.unit_id, parent.provenance.revision.from_version);
    }
  }
  const combine = (key) => bundles.flatMap((b) => b.base.content[key]);
  const deduplicate = (items, key) => {
    const result = new Map();
    for (const item of items) {
      const previous = result.get(item[key]);
      if (previous && sha(previous) !== sha(item))
        throw Error('Contexto canônico divergente: ' + item[key]);
      result.set(item[key], item);
    }
    return [...result.values()];
  };
  const versions = Object.fromEntries(
    bundles.map(({ base, audit }) => [
      base.unit_id,
      {
        version: base.editorial_version,
        status: base.status,
        reviewer_kind: audit.editorial_approval?.kind || 'human',
        reviewer: (audit.editorial_approval || audit.human_approval).reviewer,
        reviewed_at: audit.reviewed_at,
        digest: (audit.editorial_approval || audit.human_approval).reviewed_digest,
      },
    ]),
  );
  const content = {
    version: runtimeVersion,
    units: bundles.map((b) => b.base.content.unit),
    ...Object.fromEntries(collections.map((key) => [key, combine(key)])),
    references: deduplicate(combine('references'), 'source'),
    archive: bundles.flatMap((b) => b.provenance.archive),
    sources: deduplicate(combine('sources'), 'code'),
    editorialChanges: combine('editorialChanges'),
    support: Object.fromEntries(
      ['visuals', 'editorial_notes', 'teaching_practice', 'media'].map((key) => [
        key,
        bundles.flatMap((b) => b.base.support[key]),
      ]),
    ),
    editorial: {
      release: 'cartografia@1.0.0:' + sha(versions).slice(0, 16),
      units: versions,
      legacy_version: '6.0.0-piloto.1',
      question_families: bundles.flatMap((b) => b.base.metadata.question_families),
      retired_options: retiredOptions,
      unit_metadata: Object.fromEntries(
        bundles.map((b) => [
          b.base.unit_id,
          {
            sources: b.base.metadata.sources,
            temporal_claims: b.base.metadata.temporal_claims,
          },
        ]),
      ),
    },
  };
  const archive = content.archive;
  const parity = {
    version: runtimeVersion,
    source: 'approved-canonical-bases',
    source_versions: versions,
    sources: content.sources,
    secondary: bundles[0].provenance.secondary,
    counts: {
      stages: content.missions.reduce((n, m) => n + m.sections.length, 0),
      questions: content.questions.length,
      legacyQuestions: archive.filter((a) => a.kind === 'question').length,
      authored: bundles.reduce((n, b) => n + b.provenance.authored_question_ids.length, 0),
      cards: content.cards.length,
      legacyCards: archive.filter((a) => a.kind === 'card').length,
      game: content.game.length,
      legacyGame: archive.filter((a) => a.kind === 'game').length,
      recalls: archive.filter((a) => a.kind === 'recall').length,
      canonicalRecalls: content.missions.reduce((n, m) => n + m.recalls.length, 0),
      writing: content.writing.length,
    },
    units: content.units.map((u) => ({
      id: u.id,
      editorial_version: versions[u.id].version,
      missions: content.missions.filter((m) => m.unit === u.id).length,
      questions: content.questions.filter((q) => q.unit === u.id).length,
      cards: content.cards.filter((c) => c.unit === u.id).length,
      game: content.game.filter((g) => g.unit === u.id).length,
    })),
    records: bundles.flatMap((b) => b.provenance.parity_records),
  };
  return { content, parity };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { content, parity } = await buildV6();
  await mkdir(resolve(root, 'public/v6'), { recursive: true });
  for (const [path, value] of [
    ['public/v6/cartografia.json', content],
    ['MissaoAprovacaoGeo/V6_ISSUE13_PARIDADE_INTEGRACAO.json', parity],
  ]) {
    const serialized = JSON.stringify(value, null, 2) + '\n';
    if (process.argv.includes('--check')) {
      if ((await readFile(resolve(root, path), 'utf8')) !== serialized)
        throw Error('Dados V6 desatualizados: ' + path);
    } else await writeFile(resolve(root, path), serialized);
  }
  console.log(JSON.stringify(parity.counts));
}
