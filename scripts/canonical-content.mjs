import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const statuses = [
  'RASCUNHO',
  'EM_AUDITORIA',
  'APROVADA_COM_RESSALVAS',
  'APROVADA_CANONICA',
  'REABRIR_POR_ATUALIZACAO',
  'SUBSTITUIDA',
];
export const sha = (value) =>
  createHash('sha256')
    .update(typeof value === 'string' || Buffer.isBuffer(value) ? value : JSON.stringify(value))
    .digest('hex');
export const collections = [
  'missions',
  'concepts',
  'questions',
  'cards',
  'game',
  'writing',
  'supplements',
];
export const premiumCriteriaIds = [
  'correcao_conceitual',
  'cobertura',
  'profundidade',
  'clareza',
  'exemplos',
  'redundancia',
  'terminologia',
  'lacunas',
  'temporalidade',
  'nivel',
  'fontes',
  'treino',
];
const requireThat = (condition, message) => {
  if (!condition) throw new Error(message);
};
const validSlug = (s) => typeof s === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
const validVersion = (s) => typeof s === 'string' && /^\d+\.\d+\.\d+$/.test(s);
const nonempty = (s) => typeof s === 'string' && s.trim().length > 0;
const dateValue = (s) => (typeof s === 'string' ? Date.parse(s) : NaN);
const unique = (ids, label) => {
  requireThat(
    ids.every(nonempty) && new Set(ids).size === ids.length,
    `${label}: IDs ausentes/duplicados`,
  );
};

export function resources(base) {
  const c = base.content;
  return [
    { kind: 'unit', value: c.unit },
    ...collections.flatMap((kind) => c[kind].map((value) => ({ kind, value }))),
    ...c.missions.flatMap((m) => [
      ...m.sections.map((value) => ({ kind: 'theory', value })),
      ...m.recalls.map((value) => ({ kind: 'recall', value })),
    ]),
  ];
}

// Leaf changes keep long theory blocks out of unrelated diffs and retain exact old/new values.
export function editorialDiff(before, after, path = '') {
  if (isDeepStrictEqual(before, after)) return [];
  const object = (x) => x !== null && typeof x === 'object';
  if (object(before) && object(after) && Array.isArray(before) === Array.isArray(after)) {
    const keys = [...new Set([...Object.keys(before), ...Object.keys(after)])];
    return keys.flatMap((key) => {
      const child = path + '/' + key.replaceAll('~', '~0').replaceAll('/', '~1');
      const hasBefore = Object.hasOwn(before, key),
        hasAfter = Object.hasOwn(after, key);
      if (hasBefore && hasAfter) return editorialDiff(before[key], after[key], child);
      return [
        {
          path: child,
          before_exists: hasBefore,
          before: hasBefore ? before[key] : null,
          after_exists: hasAfter,
          after: hasAfter ? after[key] : null,
        },
      ];
    });
  }
  return [{ path, before_exists: true, before, after_exists: true, after }];
}

export function validateRevision(parent, next) {
  const revision = next.provenance.revision;
  requireThat(
    revision?.schema_version === 1 && revision.kind === 'correction-with-preservation',
    'Revisão editorial sem contrato de preservação',
  );
  requireThat(
    parent.base.unit_id === next.base.unit_id &&
      parent.base.module_id === next.base.module_id &&
      revision.from_version === parent.base.editorial_version &&
      revision.to_version === next.base.editorial_version &&
      revision.from_version !== revision.to_version,
    'Revisão de outra unidade/versão',
  );
  requireThat(revision.parent_bundle_sha256 === sha(parent), 'Pacote pai da revisão alterado');
  const payload = (bundle) => ({
    content: bundle.base.content,
    support: bundle.base.support,
    metadata: bundle.base.metadata,
  });
  const expected = editorialDiff(payload(parent), payload(next));
  const fields = ['path', 'before_exists', 'before', 'after_exists', 'after'];
  const actual = revision.changes.map((change) =>
    Object.fromEntries(fields.map((key) => [key, change[key]])),
  );
  requireThat(
    isDeepStrictEqual(expected, actual),
    'Alteração editorial não declarada ou antes/depois incorreto',
  );
  requireThat(
    revision.changes.every((change) => nonempty(change.reason)),
    'Revisão sem justificativa',
  );
  const identity = (bundle) => resources(bundle.base).map(({ kind, value }) => [kind, value.id]);
  requireThat(
    isDeepStrictEqual(identity(parent), identity(next)),
    'Revisão perdeu ou substituiu recurso pedagógico',
  );
  for (const field of [
    'archive',
    'parity_records',
    'sources',
    'secondary',
    'previous_editorial_changes',
  ]) {
    requireThat(
      isDeepStrictEqual(parent.provenance[field], next.provenance[field]),
      'Procedência histórica alterada pela revisão: ' + field,
    );
  }
  const replacements = revision.option_replacements;
  unique(
    replacements.map((x) => x.retired_option_id),
    'Alternativas substituídas',
  );
  const used = new Set();
  for (const previous of parent.base.content.questions) {
    const current = next.base.content.questions.find((q) => q.id === previous.id);
    requireThat(
      previous.correct === current.correct,
      'Revisão alterou o ID do gabarito: ' + previous.id,
    );
    requireThat(
      previous.options.find((o) => o.id === previous.correct).text ===
        current.options.find((o) => o.id === current.correct)?.text,
      'Revisão alterou o texto da resposta correta: ' + previous.id,
    );
    requireThat(
      isDeepStrictEqual(previous.refs, current.refs),
      'Origem da questão alterada: ' + previous.id,
    );
    requireThat(
      previous.options.length === current.options.length,
      'Quantidade de alternativas alterada: ' + previous.id,
    );
    previous.options.forEach((option, index) => {
      const replacement = current.options[index];
      if (option.id === replacement.id) return;
      const record = replacements.find(
        (x) =>
          x.question_id === previous.id &&
          x.retired_option_id === option.id &&
          x.replacement_option_id === replacement.id,
      );
      requireThat(
        record && option.id !== previous.correct && record.progress_mapping === null,
        'Troca de alternativa sem registro ou com migração silenciosa: ' + previous.id,
      );
      used.add(record.retired_option_id);
    });
  }
  requireThat(
    used.size === replacements.length,
    'Registro de substituição sem alternativa correspondente',
  );
  for (const visual of parent.base.support.visuals) {
    const current = next.base.support.visuals.find((v) => v.id === visual.id);
    requireThat(
      current &&
        isDeepStrictEqual(current.heads, visual.heads) &&
        isDeepStrictEqual(current.rows, visual.rows) &&
        current.svg === visual.svg,
      'Revisão perdeu dados de tabela ou o SVG preservado: ' + visual.id,
    );
  }
  return {
    unit: next.base.unit_id,
    from: revision.from_version,
    to: revision.to_version,
    changes: expected.length,
    preserved_resources: identity(parent).length,
  };
}

// The attestation binds the actual content, sources, findings and review decisions.
// A local hash detects accidental drift; it is not identity verification or a digital signature.
export function reviewDigest({ base, provenance, audit }) {
  const decisions = { ...audit, human_approval: null };
  if (Object.hasOwn(decisions, 'editorial_approval')) decisions.editorial_approval = null;
  return sha({ base, provenance, audit: decisions });
}

export function validateSchematicMap(visual) {
  const pair = (value) =>
    Array.isArray(value) && value.length === 2 && value.every(Number.isFinite);
  const extent = visual.extent;
  requireThat(
    visual.illustrative === true &&
      nonempty(visual.caption) &&
      nonempty(visual.author) &&
      nonempty(visual.transcript) &&
      visual.crs?.kind === 'local-cartesian' &&
      visual.crs.unit === 'km' &&
      visual.crs.east === 'positive-x' &&
      visual.crs.north === 'positive-y' &&
      visual.crs.geodetic_datum === null &&
      Array.isArray(extent) &&
      extent.length === 4 &&
      extent.every(Number.isFinite) &&
      extent[2] > extent[0] &&
      extent[3] > extent[1],
    'Mapa didático sem contexto ou referência local válida: ' + visual.id,
  );
  const rendering = visual.rendering;
  requireThat(
    pair(rendering?.origin) &&
      Number.isFinite(rendering.units_per_km) &&
      rendering.units_per_km > 0 &&
      Array.isArray(rendering.view_box) &&
      rendering.view_box.length === 4 &&
      rendering.view_box.every(Number.isFinite) &&
      rendering.view_box[2] > 0 &&
      rendering.view_box[3] > 0,
    'Mapa didático sem transformação gráfica válida: ' + visual.id,
  );
  requireThat(
    Array.isArray(visual.features) && visual.features.length > 0,
    'Mapa sem feições: ' + visual.id,
  );
  unique(
    visual.features.map((f) => f.id),
    'Feições do mapa',
  );
  for (const feature of visual.features) {
    const points = feature.geometry === 'point' ? [feature.coordinates] : feature.coordinates;
    requireThat(
      nonempty(feature.label) &&
        nonempty(feature.symbol) &&
        ['point', 'line', 'polygon'].includes(feature.geometry) &&
        Array.isArray(points) &&
        points.length >= { point: 1, line: 2, polygon: 3 }[feature.geometry] &&
        points.every(
          (p) =>
            pair(p) &&
            p[0] >= extent[0] &&
            p[0] <= extent[2] &&
            p[1] >= extent[1] &&
            p[1] <= extent[3],
        ),
      'Feição fora do mapa didático: ' + feature.id,
    );
  }
  const bar = visual.scale_bar;
  requireThat(
    pair(bar?.from) &&
      pair(bar.to) &&
      Number.isFinite(bar.distance_km) &&
      bar.distance_km > 0 &&
      Number.isFinite(bar.subdivision_km) &&
      bar.subdivision_km > 0 &&
      bar.subdivision_km <= bar.distance_km &&
      Math.abs(
        Math.hypot(bar.to[0] - bar.from[0], bar.to[1] - bar.from[1]) / rendering.units_per_km -
          bar.distance_km,
      ) < 1e-9,
    'Escala gráfica incompatível com a grade do mapa: ' + visual.id,
  );
  requireThat(
    Array.isArray(visual.heads) &&
      visual.heads.length > 0 &&
      Array.isArray(visual.rows) &&
      visual.rows.length > 0 &&
      visual.rows.every((r) => Array.isArray(r) && r.length === visual.heads.length) &&
      nonempty(visual.svg) &&
      /role="img"/.test(visual.svg) &&
      /aria-label="[^"]+"/.test(visual.svg) &&
      !/<\s*(?:script|foreignObject|image|iframe|object|use|a|animate|animateMotion|animateTransform|set)\b|\bon[a-z]+\s*=|\b(?:href|src)\s*=|url\s*\(|<!\s*(?:ENTITY|DOCTYPE)/i.test(
        visual.svg,
      ),
    'Mapa didático sem alternativa acessível ou com conteúdo ativo/externo: ' + visual.id,
  );
}

export function validateBundle(bundle, { approved = false, at = new Date().toISOString() } = {}) {
  const { base: b, provenance: p, audit: a } = bundle;
  requireThat(
    b?.schema_version === 1 && a?.schema_version === 1 && p?.schema_version === 1,
    'Esquema da base incompatível',
  );
  requireThat(
    validSlug(b.module_id) && validSlug(b.unit_id) && validVersion(b.editorial_version),
    'Identidade/versão inválida',
  );
  requireThat(statuses.includes(b.status), 'Status editorial inválido');
  for (const doc of [p, a]) {
    requireThat(
      doc.unit_id === b.unit_id && doc.editorial_version === b.editorial_version,
      'Versões do pacote divergentes',
    );
  }
  requireThat(
    a.status === b.status && b.content?.unit.id === b.unit_id,
    'Status ou unidade divergente',
  );
  requireThat(
    sha(b.content) === p.snapshot.content_sha256,
    'Conteúdo difere do snapshot desta versão',
  );
  requireThat(
    sha(b.support) === p.snapshot.support_sha256,
    'Recurso visual/editorial difere do snapshot',
  );
  requireThat(sha(b.metadata) === p.snapshot.metadata_sha256, 'Metadados diferem do snapshot');
  for (const key of collections)
    requireThat(Array.isArray(b.content[key]), `Coleção ausente: ${key}`);
  requireThat(
    Object.keys(b.content).every((key) =>
      ['unit', ...collections, 'references', 'sources', 'editorialChanges'].includes(key),
    ),
    'Coleção desconhecida no conteúdo',
  );
  const all = resources(b);
  unique(
    all.map(({ value }) => value.id),
    b.unit_id,
  );
  const ownedIds = new Set(all.map(({ value }) => value.id));
  const mids = new Set(b.content.missions.map((m) => m.id));
  const concepts = new Map(b.content.concepts.map((c) => [c.id, c]));
  for (const m of b.content.missions) {
    requireThat(m.unit === b.unit_id && m.sections.length > 0, `Missão incompatível: ${m.id}`);
    requireThat(
      m.conceptIds.every((id) => concepts.get(id)?.mission === m.id),
      `Conceito da missão ausente: ${m.id}`,
    );
    for (const s of m.sections)
      requireThat(nonempty(s.html) && nonempty(s.title), `Teoria vazia: ${s.id}`);
  }
  const archive = new Map();
  for (const item of p.archive) {
    requireThat(
      ownedIds.has(item.id) || (item.kind === 'context' && mids.has(item.mission)),
      `Procedência sem destino nesta unidade: ${item.id}`,
    );
    for (const ref of item.refs) {
      const key = `${ref.legacy_source}#${ref.legacy_id}`;
      requireThat(!archive.has(key), `Procedência duplicada: ${key}`);
      requireThat(sha(item.original) === ref.hash, `Original alterado: ${key}`);
      archive.set(key, { id: item.id, hash: ref.hash });
    }
  }
  for (const { value } of all) {
    if (value.mission) requireThat(mids.has(value.mission), `Missão ausente: ${value.id}`);
    if (value.unit)
      requireThat(value.unit === b.unit_id, `Unidade de recurso divergente: ${value.id}`);
    if (value.concept) requireThat(concepts.has(value.concept), `Conceito ausente: ${value.id}`);
    for (const ref of value.refs || []) {
      const origin = archive.get(`${ref.legacy_source}#${ref.legacy_id}`);
      requireThat(
        origin?.id === value.id && origin.hash === ref.hash,
        `Vínculo legado inválido: ${value.id}`,
      );
    }
  }
  requireThat(p.parity_records.length === archive.size, 'Contagem de paridade divergente');
  unique(
    p.parity_records.map((ref) => `${ref.legacy_source}#${ref.legacy_id}`),
    'Paridade',
  );
  for (const ref of p.parity_records) {
    const origin = archive.get(`${ref.legacy_source}#${ref.legacy_id}`);
    requireThat(
      origin?.id === ref.canonical_id && origin.hash === ref.hash,
      `Paridade sem original: ${ref.legacy_id}`,
    );
  }
  const counts = {
    missions: b.content.missions.length,
    sections: b.content.missions.reduce((n, m) => n + m.sections.length, 0),
    recalls: b.content.missions.reduce((n, m) => n + m.recalls.length, 0),
    concepts: b.content.concepts.length,
    questions: b.content.questions.length,
    authored_questions: p.authored_question_ids.length,
    cards: b.content.cards.length,
    game: b.content.game.length,
    writing: b.content.writing.length,
    supplements: b.content.supplements.length,
    parity_records: p.parity_records.length,
  };
  requireThat(
    Object.entries(counts).every(([key, n]) => a.counts[key] === n),
    'Inventário da auditoria diverge do conteúdo',
  );
  for (const q of b.content.questions) {
    requireThat(
      Number.isInteger(q.difficulty) &&
        q.difficulty >= 1 &&
        q.difficulty <= 4 &&
        Number.isInteger(q.cognitive) &&
        q.cognitive >= 1 &&
        q.cognitive <= 5,
      `Classificação cognitiva/dificuldade inválida: ${q.id}`,
    );
    requireThat(
      ['fixacao', 'concurso', 'elite', 'real'].includes(q.pool),
      `Banco desconhecido: ${q.id}`,
    );
    unique(
      q.options.map((o) => o.id),
      q.id,
    );
    requireThat(
      q.options.filter((o) => o.id === q.correct).length === 1,
      `Gabarito inválido: ${q.id}`,
    );
    requireThat(nonempty(q.prompt) && nonempty(q.explanation), `Questão sem explicação: ${q.id}`);
    requireThat(
      q.options.every((o) => nonempty(o.text) && nonempty(o.feedback)),
      `Alternativa sem conteúdo: ${q.id}`,
    );
    if (q.pool === 'concurso' || q.pool === 'elite')
      requireThat(q.options.length === 5, `A–E incompleto: ${q.id}`);
    if (q.visual)
      requireThat(
        b.support.visuals.some((v) => v.id === q.visual),
        `Visual ausente: ${q.id}`,
      );
  }
  for (const c of b.content.cards)
    requireThat(nonempty(c.front) && nonempty(c.back), `Cartão vazio: ${c.id}`);
  for (const g of b.content.game)
    requireThat(
      typeof g.truth === 'boolean' && nonempty(g.justification),
      `V/F sem justificativa: ${g.id}`,
    );
  const families = b.metadata.question_families || [];
  unique(
    families.map((f) => f.id),
    'Famílias',
  );
  const questionById = new Map(b.content.questions.map((q) => [q.id, q]));
  for (const family of families) {
    unique(family.members, family.id);
    requireThat(
      family.members.length >= 2 &&
        family.members.every((id) => questionById.get(id)?.family_id === family.id),
      'Família sem vínculo bidirecional: ' + family.id,
    );
    requireThat(
      nonempty(family.reason) && family.independent_novelty === false,
      'Família sem decisão de novidade: ' + family.id,
    );
  }
  for (const q of b.content.questions)
    if (q.family_id)
      requireThat(
        families.some((f) => f.id === q.family_id && f.members.includes(q.id)),
        'Questão sem família correspondente: ' + q.id,
      );
  for (const visual of b.support.visuals) {
    if (visual.kind === 'schematic-map') {
      validateSchematicMap(visual);
      const sections = b.content.missions.flatMap((m) => m.sections);
      requireThat(
        Array.isArray(visual.resource_ids) &&
          visual.resource_ids.length > 0 &&
          visual.resource_ids.every((id) =>
            sections.some((s) => s.id === id && s.html.includes(visual.svg)),
          ),
        'Mapa didático diverge do apoio apresentado na teoria: ' + visual.id,
      );
    }
    if (visual.kind === 'image-pair') {
      requireThat(
        visual.images.length === 2 &&
          nonempty(visual.caption) &&
          nonempty(visual.transcript) &&
          visual.images.every(
            (i) =>
              /^https:\/\//.test(i.url) &&
              nonempty(i.alt) &&
              nonempty(i.credit) &&
              Number.isFinite(dateValue(i.acquired_at)),
          ),
        'Par de imagens incompleto: ' + visual.id,
      );
    }
  }
  const classified = b.metadata.resources.map((r) => r.id);
  unique(classified, 'Classificação');
  requireThat(
    all.length === classified.length && all.every(({ value }) => classified.includes(value.id)),
    'Recurso sem classificação editorial',
  );
  for (const meta of b.metadata.resources) {
    requireThat(
      meta.scopes.length > 0 &&
        meta.scopes.every((s) => ['permanente', 'regional', 'banca', 'temporal'].includes(s)),
      `Escopo inválido: ${meta.id}`,
    );
    requireThat(
      meta.source_sha256 === sha(all.find(({ value }) => value.id === meta.id).value),
      `Classificação de outra versão: ${meta.id}`,
    );
  }
  unique(
    b.metadata.sources.map((s) => s.id),
    'Fontes',
  );
  const availableSources = new Map(b.metadata.sources.map((s) => [s.id, s]));
  for (const visual of b.support.visuals)
    if (visual.kind === 'image-pair')
      requireThat(
        availableSources.has(visual.source_id) && availableSources.has(visual.usage_source_id),
        'Par de imagens sem fonte/créditos registrados: ' + visual.id,
      );
  const current = dateValue(at);
  requireThat(Number.isFinite(current), 'Data de verificação inválida');
  for (const t of b.metadata.temporal_claims) {
    requireThat(
      t.resource_ids.length > 0 && t.resource_ids.every((id) => classified.includes(id)),
      `Dado temporal sem destino: ${t.id}`,
    );
    requireThat(
      t.source_ids.length > 0 && t.source_ids.every((id) => availableSources.has(id)),
      `Dado temporal sem fonte: ${t.id}`,
    );
    requireThat(
      nonempty(t.review_trigger) && (t.reference_date || t.reference_year),
      `Data/regra de revisão ausente: ${t.id}`,
    );
    if (t.verified_at !== null)
      requireThat(
        Number.isFinite(dateValue(t.verified_at)) && dateValue(t.verified_at) <= current,
        `Verificação futura/inválida: ${t.id}`,
      );
  }
  unique(
    b.metadata.temporal_claims.map((t) => t.id),
    'Fatos temporais',
  );
  for (const meta of b.metadata.resources)
    requireThat(
      meta.temporal_claim_ids.every((id) =>
        b.metadata.temporal_claims.some((t) => t.id === id && t.resource_ids.includes(meta.id)),
      ),
      `Temporalidade sem registro: ${meta.id}`,
    );
  requireThat(
    a.authored_questions.length === p.authored_question_ids.length &&
      a.authored_questions.every((q) => p.authored_question_ids.includes(q.id)),
    'Revisão autoral incompleta',
  );
  unique(
    a.authored_questions.map((q) => q.id),
    'Revisão autoral',
  );
  for (const row of a.authored_questions) {
    const q = b.content.questions.find((q) => q.id === row.id);
    requireThat(
      q && row.correct_option_id === q.correct && row.resource_sha256 === sha(q),
      `Revisão de outra versão do item: ${row.id}`,
    );
    requireThat(
      row.pool === q.pool &&
        row.current_difficulty === q.difficulty &&
        row.current_cognitive === q.cognitive &&
        row.correct_option_text === q.options.find((o) => o.id === q.correct).text,
      `Parecer e classificação/gabarito do item divergem: ${row.id}`,
    );
    requireThat(
      row.source_ids.every((id) => availableSources.has(id)),
      `Fonte da revisão ausente: ${row.id}`,
    );
    requireThat(
      row.content_evidence.every((id) => ownedIds.has(id)),
      `Evidência da revisão ausente: ${row.id}`,
    );
  }
  requireThat(
    a.premium_criteria.length === 12 &&
      new Set(a.premium_criteria.map((c) => c.id)).size === 12 &&
      premiumCriteriaIds.every((id) => a.premium_criteria.some((c) => c.id === id)),
    'Matriz Premium incompleta',
  );
  if (a.assisted_review) {
    const review = a.assisted_review;
    requireThat(
      review.kind === 'ai' &&
        nonempty(review.reviewer) &&
        review.human_manual_review === false &&
        nonempty(review.delegation_evidence) &&
        review.unit_id === b.unit_id &&
        review.editorial_version === b.editorial_version &&
        Number.isFinite(dateValue(review.reviewed_at)) &&
        dateValue(review.reviewed_at) <= current,
      'Revisão assistida sem autoria/delegação ou versão válida',
    );
    requireThat(
      review.reviewed_payload_sha256 ===
        sha({ content: b.content, support: b.support, metadata: b.metadata }) &&
        isDeepStrictEqual(
          review.resources,
          all.map(({ kind, value }) => ({ kind, id: value.id, sha256: sha(value) })),
        ),
      'Revisão assistida não corresponde ao conteúdo atual',
    );
    requireThat(
      Array.isArray(review.premium_criteria) &&
        review.premium_criteria.length === 12 &&
        new Set(review.premium_criteria.map((c) => c.id)).size === 12 &&
        premiumCriteriaIds.every((id) =>
          review.premium_criteria.some(
            (c) => c.id === id && nonempty(c.assessment) && nonempty(c.reason),
          ),
        ),
      'Revisão assistida sem os 12 critérios editoriais',
    );
  }
  if (approved || b.status === 'APROVADA_CANONICA') {
    requireThat(b.status === 'APROVADA_CANONICA', 'Base não aprovada: uso operacional bloqueado');
    requireThat(
      !a.findings.some((f) => f.blocks_promotion && f.status !== 'resolved'),
      'Achado impeditivo aberto',
    );
    requireThat(
      a.premium_criteria.every((c) => c.decision === 'approved'),
      'Auditoria Premium incompleta',
    );
    requireThat(
      b.metadata.resources.every((r) => r.editorial_status === 'approved'),
      'Recursos ainda pendentes de revisão editorial',
    );
    requireThat(
      b.content.questions.every((q) => q.status !== 'human-review-pending'),
      'Questão autoral ainda pendente',
    );
    const delegated = a.editorial_approval?.kind === 'delegated-ai';
    if (delegated) {
      requireThat(
        a.human_approval === null && a.assisted_review?.kind === 'ai',
        'Revisão delegada não pode simular aprovação humana',
      );
      requireThat(
        a.authored_questions.every(
          (q) =>
            q.editorial_decision?.kind === 'ai' &&
            q.editorial_decision.decision === 'approved' &&
            q.editorial_decision.reviewer === a.assisted_review.reviewer &&
            nonempty(q.editorial_decision.evidence) &&
            q.human_reviewer === null &&
            q.human_decision === 'pending',
        ),
        'Revisão delegada dos itens pendente ou autoria humana fictícia',
      );
    } else {
      requireThat(!a.editorial_approval, 'Tipo de aprovação editorial desconhecido');
      requireThat(
        a.authored_questions.every(
          (q) => q.human_decision === 'approved' && nonempty(q.human_reviewer),
        ),
        'Revisão humana dos itens pendente',
      );
    }
    for (const t of b.metadata.temporal_claims) {
      requireThat(
        t.verification === 'verified' && t.verified_at !== null,
        `Dado temporal não verificado: ${t.id}`,
      );
      requireThat(
        t.source_ids.some((id) => availableSources.get(id).verification === 'direct'),
        `Dado temporal sem fonte diretamente conferida: ${t.id}`,
      );
      if (t.review_due_at)
        requireThat(dateValue(t.review_due_at) > current, `Dado temporal vencido: ${t.id}`);
    }
    const approval = delegated ? a.editorial_approval : a.human_approval;
    requireThat(
      approval?.kind === (delegated ? 'delegated-ai' : 'human') &&
        nonempty(approval.reviewer) &&
        nonempty(approval.evidence),
      'Aprovação humana ou editorial delegada não registrada',
    );
    if (delegated)
      requireThat(
        approval.contract === 'delegated-content-review-v1' &&
          approval.reviewer === a.assisted_review.reviewer &&
          approval.human_manual_review === false &&
          nonempty(approval.delegation_evidence),
        'Aprovação delegada sem contrato ou delegação explícita',
      );
    requireThat(
      Number.isFinite(dateValue(approval.reviewed_at)) &&
        dateValue(approval.reviewed_at) <= current,
      'Data de aprovação inválida',
    );
    requireThat(
      approval.reviewed_digest === reviewDigest(bundle),
      'Aprovação não corresponde a este conteúdo',
    );
  } else
    requireThat(
      a.human_approval === null && !a.editorial_approval,
      'Candidata não deve simular aprovação canônica',
    );
  return {
    unit: b.unit_id,
    version: b.editorial_version,
    status: b.status,
    resources: all.length,
    parity: archive.size,
    approved: b.status === 'APROVADA_CANONICA',
  };
}

export async function readBundle(baseRoot, unit, version) {
  requireThat(validSlug(unit) && validVersion(version), 'Caminho de unidade/versão inválido');
  const registry = JSON.parse(await readFile(resolve(baseRoot, 'manifest.json'), 'utf8'));
  const module = registry.units.find((u) => u.unit_id === unit)?.module_id;
  requireThat(validSlug(module), 'Unidade não registrada');
  const dir = resolve(baseRoot, module, unit, version);
  const read = async (name) => JSON.parse(await readFile(resolve(dir, name), 'utf8'));
  const [base, provenance, audit] = await Promise.all([
    read('content.json'),
    read('provenance.json'),
    read('audit.json'),
  ]);
  requireThat(base.module_id === module, 'Módulo do pacote divergente do catálogo');
  requireThat(
    base.unit_id === unit && base.editorial_version === version,
    'Identidade do pacote divergente do caminho solicitado',
  );
  return { base, provenance, audit };
}

function validateRegisteredApproval(registry, bundle) {
  if (bundle.audit.editorial_approval?.kind === 'delegated-ai') {
    const policies = [registry.editorial_governance, ...(registry.editorial_delegations || [])];
    const matches = policies.filter((p) => p?.unit_ids?.includes(bundle.base.unit_id));
    requireThat(
      matches.length === 1,
      'Aprovação delegada fora do contrato/escopo autorizado no catálogo',
    );
    const policy = matches[0];
    requireThat(
      policy?.contract === 'delegated-content-review-v1' &&
        policy.reviewer_kind === 'ai' &&
        policy.reviewer === bundle.audit.editorial_approval.reviewer &&
        policy.authorization === bundle.audit.editorial_approval.delegation_evidence &&
        Array.isArray(policy.unit_ids) &&
        policy.unit_ids.includes(bundle.base.unit_id),
      'Aprovação delegada fora do contrato/escopo autorizado no catálogo',
    );
  }
}

export async function loadApprovedUnit(baseRoot, unit, version, options = {}) {
  const bundle = await readBundle(baseRoot, unit, version);
  const registry = JSON.parse(await readFile(resolve(baseRoot, 'manifest.json'), 'utf8'));
  const entry = registry.units.find((u) => u.unit_id === unit);
  requireThat(
    entry.canonical_version === version,
    'Base não aprovada no catálogo: uso operacional bloqueado',
  );
  requireThat(entry.runtime_enabled, 'Consumo canônico desabilitado no catálogo');
  validateRegisteredApproval(registry, bundle);
  validateBundle(bundle, { ...options, approved: true });
  return bundle.base;
}

// Initial consolidation check. It reconstructs the frozen pilot bank from the candidates;
// no historical HTML is read. Future editorial releases keep this snapshot as provenance.
export function reconstructPilot(bundles, baseline) {
  const index = new Map();
  const insert = (key, value) => {
    requireThat(!index.has(key), `ID compartilhado indevidamente entre unidades: ${key}`);
    index.set(key, value);
  };
  for (const bundle of bundles) {
    for (const key of ['references', 'sources'])
      requireThat(
        sha(bundle.base.content[key]) === sha(baseline.context[key]),
        `Contexto de fontes alterado: ${key}`,
      );
    const editedIds = new Set(
      bundle.base.content.missions.flatMap((m) => [...m.sections, ...m.recalls].map((r) => r.id)),
    );
    requireThat(
      sha(bundle.base.content.editorialChanges) ===
        sha(baseline.context.editorialChanges.filter((c) => editedIds.has(c.id))),
      'Histórico editorial do piloto divergente',
    );
    for (const key of collections)
      for (const item of bundle.base.content[key]) insert(`${key}:${item.id}`, item);
    insert(`units:${bundle.base.content.unit.id}`, bundle.base.content.unit);
    for (const item of bundle.provenance.archive)
      insert(`archive:${item.refs[0].legacy_source}#${item.refs[0].legacy_id}`, item);
  }
  requireThat(
    index.size === Object.values(baseline.order).reduce((n, ids) => n + ids.length, 0),
    'Snapshot com recursos extras ou ausentes',
  );
  const result = {};
  for (const key of baseline.top_level_order) {
    if (baseline.context[key] !== undefined) result[key] = baseline.context[key];
    else
      result[key] = baseline.order[key].map((id) => {
        const value = index.get(`${key}:${id}`);
        requireThat(value, `Snapshot sem recurso ${key}:${id}`);
        return value;
      });
  }
  requireThat(
    sha(JSON.stringify(result, null, 2) + '\n') === baseline.source_sha256,
    'Paridade integral com o piloto falhou',
  );
  return result;
}

// Initial literal consolidation is evidence only. Approved content is read from its bundle,
// never rebuilt from the historical HTML. These checks protect the first frozen candidate.
export function validateLiteralSnapshot(bundle, baseline) {
  requireThat(
    baseline.schema_version === 1 &&
      baseline.kind === 'legacy-literals' &&
      baseline.unit_ids.length === 1 &&
      baseline.unit_ids[0] === bundle.base.unit_id,
    'Snapshot literal de outra unidade ou esquema',
  );
  requireThat(sha(baseline.extracted) === baseline.extracted_sha256, 'Snapshot literal alterado');
  requireThat(
    bundle.provenance.snapshot.source_path === baseline.source_path &&
      bundle.provenance.snapshot.source_sha256 === baseline.source_sha256 &&
      bundle.provenance.source_commit === baseline.source_commit,
    'Fonte histórica divergente do snapshot literal',
  );
  requireThat(
    sha({
      content: bundle.base.content,
      support: bundle.base.support,
      metadata: bundle.base.metadata,
    }) === baseline.initial_payload_sha256 &&
      sha(bundle.provenance.archive) === baseline.initial_archive_sha256 &&
      sha(bundle.provenance.previous_editorial_changes) === baseline.initial_changes_sha256,
    'Primeira consolidação literal alterada depois de fixada',
  );
  requireThat(
    isDeepStrictEqual(
      resources(bundle.base).map((r) => r.value.id),
      baseline.initial_resource_ids,
    ),
    'Consolidação perdeu ou substituiu recurso',
  );
  requireThat(
    isDeepStrictEqual(bundle.provenance.legacy_bindings, baseline.bindings) &&
      baseline.bindings.length === bundle.provenance.parity_records.length,
    'Mapa de vínculos literais divergente',
  );
  unique(
    baseline.bindings.map((b) => b.legacy_id),
    'Vínculos literais',
  );
  const pointer = (value, path) => {
    requireThat(typeof path === 'string' && path.startsWith('/'), 'Ponteiro literal inválido');
    return path
      .slice(1)
      .split('/')
      .map((s) => s.replaceAll('~1', '/').replaceAll('~0', '~'))
      .reduce((node, key) => {
        requireThat(
          !['__proto__', 'constructor', 'prototype'].includes(key) &&
            node !== null &&
            typeof node === 'object' &&
            Object.hasOwn(node, key),
          'Ponteiro literal sem original',
        );
        return node[key];
      }, value);
  };
  for (const binding of baseline.bindings) {
    const whole = pointer(baseline.extracted, binding.pointer);
    const original = binding.fields
      ? Object.fromEntries(binding.fields.map((key) => [key, whole[key]]))
      : whole;
    const item = bundle.provenance.archive.find((a) =>
      a.refs.some(
        (r) => r.legacy_source === baseline.source_path && r.legacy_id === binding.legacy_id,
      ),
    );
    requireThat(
      item?.id === binding.canonical_id &&
        sha(original) === binding.sha256 &&
        isDeepStrictEqual(original, item.original),
      'Original literal sem destino íntegro: ' + binding.legacy_id,
    );
  }
  const corrected = structuredClone(baseline.extracted);
  for (const change of bundle.provenance.previous_editorial_changes) {
    const parts = change.path
      .slice(1)
      .split('/')
      .map((s) => s.replaceAll('~1', '/').replaceAll('~0', '~'));
    const key = parts.pop();
    requireThat(
      !parts.concat(key).some((s) => ['__proto__', 'constructor', 'prototype'].includes(s)),
      'Caminho de correção literal inválido',
    );
    const parent = parts.reduce((node, part) => node?.[part], corrected);
    requireThat(
      parent &&
        typeof parent === 'object' &&
        Object.hasOwn(parent, key) === change.before_exists &&
        (!change.before_exists || isDeepStrictEqual(parent[key], change.before)) &&
        change.after_exists &&
        nonempty(change.reason),
      'Antes/depois da correção literal divergente',
    );
    parent[key] = structuredClone(change.after);
  }
  requireThat(
    sha(corrected) === baseline.corrected_literals_sha256,
    'Correções literais não reproduzem a versão declarada',
  );
  const byRef = (items, legacyId) =>
    items.find((item) =>
      item.refs?.some(
        (ref) => ref.legacy_source === baseline.source_path && ref.legacy_id === legacyId,
      ),
    );
  const sections = bundle.base.content.missions.flatMap((m) => m.sections);
  corrected.banks.B.forEach((stage, i) => {
    const section = byRef(sections, `B[${i}]`);
    requireThat(
      section?.html === stage.h && section.title === stage.t && section.hook === stage.hook,
      'Teoria canônica diverge da correção declarada: ' + i,
    );
    if (stage.r) {
      const recall = byRef(
        bundle.base.content.missions.flatMap((m) => m.recalls),
        `B[${i}].recall`,
      );
      requireThat(
        recall?.prompt === stage.r && recall.model === stage.ra,
        'Recall histórico divergente',
      );
    }
  });
  const legacyQuestions = (banks) => [
    ...banks.PRE.map((q, i) => [`pre_${i}`, q]),
    ...banks.B.flatMap((stage, i) => stage.qs.map((q, j) => [`b_${i}_${j}`, q])),
    ...banks.CH.map((q, i) => [`c_${i}`, q]),
  ];
  const originalQuestions = new Map(legacyQuestions(baseline.extracted.banks));
  requireThat(
    baseline.preserve_answer_keys === true,
    'Contrato literal exige preservação dos gabaritos neste lote',
  );
  for (const [key, q] of legacyQuestions(corrected.banks)) {
    const current = byRef(bundle.base.content.questions, key),
      original = originalQuestions.get(key);
    requireThat(
      current?.prompt === q.p &&
        isDeepStrictEqual(
          current.options.map((o) => o.text),
          q.o,
        ) &&
        current.correct === current.options[q.c]?.id &&
        isDeepStrictEqual(
          current.options.map((o) => o.feedback),
          corrected.banks.X[key],
        ) &&
        current.explanation === corrected.banks.X[key][q.c],
      'Questão canônica diverge da correção declarada: ' + key,
    );
    requireThat(
      q.c === original.c && q.o[q.c] === original.o[original.c],
      'Gabarito histórico alterado no lote literal',
    );
  }
  corrected.banks.C.forEach((card, i) => {
    const current = byRef(bundle.base.content.cards, `C[${i}]`);
    requireThat(
      current?.front === card[1] && current.answer === card[2] && current.back.includes(card[2]),
      'Cartão diverge da correção declarada',
    );
  });
  corrected.banks.G.forEach((game, i) => {
    const current = byRef(bundle.base.content.game, `G[${i}]`);
    requireThat(
      current?.statement === game.t && current.truth === game.v && current.justification === game.x,
      'V/F diverge da correção declarada',
    );
    requireThat(
      game.v === baseline.extracted.banks.G[i].v,
      'Polaridade histórica alterada no lote literal',
    );
  });
  return {
    unit: bundle.base.unit_id,
    records: baseline.bindings.length,
    source_sha256: baseline.source_sha256,
  };
}

export async function validateLot(baseRoot = resolve(root, 'base-conhecimento'), { at } = {}) {
  const registry = JSON.parse(await readFile(resolve(baseRoot, 'manifest.json'), 'utf8'));
  requireThat(
    registry.schema_version === 1 && registry.units.length === 28,
    'Catálogo canônico incompleto',
  );
  unique(
    registry.units.map((u) => u.unit_id),
    'Catálogo',
  );
  requireThat(
    registry.units.every((u) => statuses.includes(u.status)),
    'Status inválido no catálogo',
  );
  requireThat(
    registry.units.every((u) => !u.runtime_enabled || u.canonical_version !== null),
    'Consumo canônico habilitado antes da aprovação',
  );
  const lots = registry.consolidation_lots || [
    {
      id: 'cartografia-piloto',
      kind: 'pilot',
      unit_ids: ['cartografia-fundamentos', 'cartografia-representacao', 'geotecnologias'],
      baseline: 'cartografia/baseline-piloto.json',
    },
  ];
  const declared = lots.flatMap((lot) => lot.unit_ids);
  unique(
    lots.map((lot) => lot.id),
    'Lotes de consolidação',
  );
  unique(declared, 'Unidades dos lotes');
  const registeredActive = registry.units.filter((u) => u.candidate_version !== null);
  requireThat(
    declared.length === registeredActive.length &&
      declared.every((id) => registeredActive.some((u) => u.unit_id === id)),
    'Escopo dos lotes de consolidação divergente',
  );
  const active = declared.map((id) => registeredActive.find((u) => u.unit_id === id));
  const bundles = [],
    summaries = [];
  async function checkLineage(unit, bundle, snapshot) {
    let revisionBundle = bundle;
    const lineage = new Set();
    while (revisionBundle.base.editorial_version !== unit.initial_snapshot_version) {
      const version = revisionBundle.base.editorial_version;
      requireThat(!lineage.has(version), 'Ciclo na cadeia de versões: ' + unit.unit_id);
      lineage.add(version);
      const revision = revisionBundle.provenance.revision;
      requireThat(validVersion(revision?.from_version), 'Revisão sem versão de origem válida');
      requireThat(
        !lineage.has(revision.from_version),
        'Ciclo na cadeia de versões: ' + unit.unit_id,
      );
      const parent =
        revision.from_version === unit.initial_snapshot_version
          ? snapshot
          : await readBundle(baseRoot, unit.unit_id, revision.from_version);
      validateBundle(parent, { at });
      validateRevision(parent, revisionBundle);
      revisionBundle = parent;
    }
  }
  for (const unit of active) {
    const bundle = await readBundle(baseRoot, unit.unit_id, unit.candidate_version);
    requireThat(unit.status === bundle.base.status, 'Catálogo e base divergem');
    const snapshot =
      unit.initial_snapshot_version === unit.candidate_version
        ? bundle
        : await readBundle(baseRoot, unit.unit_id, unit.initial_snapshot_version);
    validateBundle(snapshot, { at });
    if (unit.canonical_version !== null) {
      const canonical =
        unit.canonical_version === unit.candidate_version
          ? bundle
          : await readBundle(baseRoot, unit.unit_id, unit.canonical_version);
      validateBundle(canonical, { approved: true, at });
      validateRegisteredApproval(registry, canonical);
      if (canonical !== bundle) await checkLineage(unit, canonical, snapshot);
    }
    summaries.push(validateBundle(bundle, { at }));
    await checkLineage(unit, bundle, snapshot);
    bundles.push(snapshot);
  }
  for (const lot of lots) {
    requireThat(
      typeof lot.baseline === 'string' && /^[a-z0-9/-]+\.json$/.test(lot.baseline),
      'Caminho de snapshot do lote inválido',
    );
    const baseline = JSON.parse(await readFile(resolve(baseRoot, lot.baseline), 'utf8'));
    requireThat(
      isDeepStrictEqual(lot.unit_ids, baseline.unit_ids),
      'Escopo do snapshot divergente',
    );
    const selected = lot.unit_ids.map((id) => bundles.find((b) => b.base.unit_id === id));
    if (lot.kind === 'pilot') reconstructPilot(selected, baseline);
    else if (lot.kind === 'legacy-literals') {
      requireThat(selected.length === 1, 'Lote literal deve conter uma unidade');
      validateLiteralSnapshot(selected[0], baseline);
    } else throw new Error('Tipo de consolidação desconhecido');
  }
  return {
    summaries,
    untouchedUnits: registry.units.filter((u) => u.candidate_version === null).length,
    canonicalUnits: registry.units.filter((u) => u.canonical_version !== null).length,
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    console.log(JSON.stringify(await validateLot(), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
