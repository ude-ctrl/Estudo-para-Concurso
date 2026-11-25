import { buildCandidate02 } from './build-climatologia-02.mjs';
import { sha } from './canonical-content.mjs';
// Use the reviewed candidate without inventing canonical approval. Its original
// audit and historical files remain intact and the release declares its status.
export async function integrateClimatologia(platform) {
  const { base, provenance } = await buildCandidate02();
  const c = platform.content,
    b = base.content;
  c.units.push({
    ...b.unit,
    description: 'Dinâmica atmosférica, climogramas e clima do Maranhão — preparação SEDUC-MA/FCC.',
  });
  for (const key of ['missions', 'concepts', 'questions', 'cards', 'game', 'writing'])
    c[key].push(...b[key]);
  for (const q of c.questions.filter((q) => q.unit === 'climatologia')) {
    q.scope = 'Climatologia — autoral';
    q.originalFeedback = [];
  }
  c.supplements.push(
    ...b.supplements.filter(
      (x) =>
        x.render_policy !== 'archive-only' &&
        !['v6-clima-tab-study', 'v6-clima-fontes'].includes(x.id),
    ),
  );
  c.archive.push(...provenance.archive);
  c.support.visuals.push(...base.support.visuals);
  c.sources.push({
    code: 'T04',
    path: provenance.snapshot.source_path,
    hash: provenance.snapshot.source_sha256,
    key: base.metadata.legacy_progress.key,
    previous: null,
    counts: { questions: 34, cards: 50, game: 100 },
  });
  c.references.push({
    source: provenance.snapshot.source_path,
    html: 'Climatologia: conteúdo histórico preservado e complementos de atmosfera e Maranhão. Questões autorais; não são itens oficiais FCC.',
  });
  c.editorial.units.climatologia = {
    version: base.editorial_version,
    status: base.status,
    reviewer_kind: 'ai',
    reviewer: base.metadata.reviewer,
    reviewed_at: base.metadata.reviewed_at,
    digest: sha(base),
  };
  c.editorial.question_families.push(...base.metadata.question_families);
  c.editorial.unit_metadata.climatologia = {
    sources: base.metadata.sources,
    temporal_claims: base.metadata.temporal_claims,
  };
  c.editorial.release += '+climatologia@' + base.editorial_version + ':' + sha(base).slice(0, 16);
  platform.parity.source = 'canonical-bases-and-reviewed-climatologia';
  platform.parity.records.push(...provenance.parity_records);
  platform.parity.units.push({
    id: 'climatologia',
    editorial_version: base.editorial_version,
    missions: 13,
    questions: 41,
    cards: 50,
    game: 100,
  });
  platform.parity.counts.stages += b.missions.reduce((n, m) => n + m.sections.length, 0);
  platform.parity.counts.questions += b.questions.length;
  platform.parity.counts.cards += b.cards.length;
  platform.parity.counts.game += b.game.length;
  return platform;
}
