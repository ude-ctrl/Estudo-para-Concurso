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
export async function buildV6(options = {}) {
  return assemble(unitIds, 'cartografia', options);
}

export async function buildPlatform(options = {}) {
  return assemble(['fundamentos-geografia', ...unitIds], 'plataforma', options);
}

async function assemble(
  allowed,
  scope,
  { baseRoot = resolve(root, 'base-conhecimento'), at } = {},
) {
  await validateLot(baseRoot, { at });
  const registry = JSON.parse(await readFile(resolve(baseRoot, 'manifest.json'), 'utf8'));
  const enabled = registry.units.filter((u) => u.runtime_enabled);
  if (enabled.some((u) => !['fundamentos-geografia', ...unitIds].includes(u.unit_id)))
    throw Error('Consumo fora das unidades autorizadas');
  const entries = enabled.filter((u) => allowed.includes(u.unit_id));
  if (entries.length !== allowed.length || entries.some((u, i) => u.unit_id !== allowed[i]))
    throw Error('Unidades autorizadas ausentes: ' + scope);
  const bundles = [];
  const retiredOptions = [];
  for (const entry of entries) {
    await loadApprovedUnit(baseRoot, entry.unit_id, entry.canonical_version, { at });
    const bundle = await readBundle(baseRoot, entry.unit_id, entry.canonical_version);
    const contract = bundle.base.metadata.consumer_requirements;
    if (
      !(entry.unit_id === 'fundamentos-geografia'
        ? contract.contract === 'canonical-fundamentos-v1'
        : contract.active)
    )
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
      release:
        scope +
        '@' +
        bundles.map((b) => b.base.editorial_version).join('+') +
        ':' +
        sha(versions).slice(0, 16),
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
    secondary: bundles.find((b) => b.provenance.secondary)?.provenance.secondary,
    counts: {
      stages: content.missions.reduce((n, m) => n + m.sections.length, 0),
      questions: content.questions.length,
      legacyQuestions: archive.filter((a) => ['question', 'questions'].includes(a.kind) && Array.isArray(a.original?.o)).length,
      authored: bundles.reduce((n, b) => n + b.provenance.authored_question_ids.length, 0),
      cards: content.cards.length,
      legacyCards: archive.filter((a) => ['card', 'cards'].includes(a.kind)).length,
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
  const library = {
    schemaVersion: 1,
    id: 'module-cartografia',
    title: 'Cartografia e Geotecnologias',
    category: 'Cartografia',
    number: 2,
    units: content.units.map((u) => ({ id: u.id, title: u.title })),
    counts: {
      stages: parity.counts.stages,
      questions: content.questions.length,
      flashcards: content.cards.length,
      game: content.game.length,
    },
    questionIds: content.questions.map((q) => q.id),
  };
  return { content, parity, library };
}

export function moduleIndex(content, id, title, category, number, unitIds, description, keywords) {
  const selected = (items) => items.filter((item) => unitIds.includes(item.unit));
  const missions = selected(content.missions);
  return {
    schemaVersion: 1,
    id,
    title,
    category,
    number,
    description,
    keywords,
    href: `v6.html#/unidade/${unitIds[0]}/estudo`,
    units: content.units.filter((u) => unitIds.includes(u.id)),
    counts: {
      stages: missions.reduce((n, m) => n + m.sections.length, 0),
      questions: selected(content.questions).length,
      flashcards: selected(content.cards).length,
      game: selected(content.game).length,
    },
    legacyLessonIds: id === 'module-fundamentos' ? ['lesson-ff1de1c07eb3'] : [],
    questionIds: selected(content.questions).map((q) => q.id),
    sectionIds: missions.flatMap((m) => m.sections.map((s) => s.id)),
    cardIds: selected(content.cards).map((c) => c.id),
    itemIds: ['questions', 'cards', 'game', 'writing'].flatMap((key) =>
      selected(content[key]).map((item) => item.id),
    ),
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { content, parity, library } = await buildV6();
  const platform = await buildPlatform();
  const modules = [
    moduleIndex(
      platform.content,
      'module-fundamentos',
      'Fundamentos, Conceitos e Autores',
      'Fundamentos',
      1,
      ['fundamentos-geografia'],
      'Conceitos, correntes e autores para interpretar o espaço e ensinar Geografia.',
      'tema 01 espaço lugar paisagem região território redes autores escolas conceitos',
    ),
    moduleIndex(
      platform.content,
      'module-cartografia',
      library.title,
      'Cartografia',
      2,
      unitIds,
      'Orientação, representação do espaço e geotecnologias em um único percurso.',
      'mapas coordenadas escalas projeções sensoriamento remoto SIG fusos tema 02 tema 03 tema 17',
    ),
  ];
  await mkdir(resolve(root, 'public/v6'), { recursive: true });
  for (const [path, value] of [
    ['public/v6/cartografia.json', content],
    ['public/v6/library.json', library],
    ['public/v6/plataforma.json', platform.content],
    ['public/v6/modules.json', { schemaVersion: 1, modules }],
    ['MissaoAprovacaoGeo/V6_FUNDAMENTOS_INTEGRACAO_PARIDADE.json', platform.parity],
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
