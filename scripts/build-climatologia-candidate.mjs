import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { sha, resources, premiumCriteriaIds, validateBundle } from './canonical-content.mjs';
import { revise, missionNotes } from './climatologia-editorial.mjs';
import { datasets, visual, newQuestions } from './climatologia-climograms.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
export const candidatePath = resolve(root, 'docs/v6-climatologia/candidata/0.1.0');
export async function buildCandidate() {
  const inventory = JSON.parse(
    await readFile(resolve(root, 'docs/v6-climatologia/inventario-paridade.json'), 'utf8'),
  );
  assert.equal(
    sha(await readFile(resolve(root, inventory.source))),
    inventory.source_sha256,
    'Fonte histórica mudou: atualizar inventário antes da revisão.',
  );
  const { revised, changes } = revise(inventory.records);
  const originals = new Map(inventory.records.map((r) => [r.legacy_id, r]));
  const byId = new Map(revised.map((r) => [r.legacy_id, r]));
  const mid = (i) => inventory.missions[i].proposed_id;
  const cid = (i) => `${mid(i)}-conceito`;
  const ref = (r) => [
    {
      legacy_source: r.legacy_source,
      legacy_id: r.legacy_id,
      hash: originals.get(r.legacy_id).sha256,
    },
  ];
  const ids = (id) => byId.get(id).proposed_id;
  const missions = inventory.missions.map((m, i) => {
    const t = byId.get(`B[${i}]`),
      r = byId.get(`B[${i}].recall`);
    return {
      id: m.proposed_id,
      unit: 'climatologia',
      title: t.original.t,
      goal: missionNotes[i][1],
      conceptIds: [cid(i)],
      sections: [
        {
          id: t.proposed_id,
          title: t.original.t,
          hook: t.original.hook,
          html: t.original.h,
          primary: true,
          refs: ref(t),
        },
      ],
      recalls: [
        {
          id: r.proposed_id,
          mission: mid(i),
          concept: cid(i),
          prompt: r.original.prompt,
          model: r.original.answer,
          points: [
            'Explique o mecanismo solicitado.',
            'Diferencie o conceito de uma confusão frequente.',
          ],
          refs: ref(r),
        },
      ],
    };
  });
  const concepts = missionNotes.map(([name, goal, mechanism, example, confusion], i) => ({
    id: cid(i),
    mission: mid(i),
    name,
    explanation: goal,
    mechanism,
    example,
    confusion,
    repair: 'Releia a explicação e aplique o conceito a outro caso antes de responder novamente.',
    errorType: 'E1',
  }));
  const cardMission = (i) =>
    i <= 3
      ? 1
      : i <= 7
        ? 2
        : i <= 11
          ? 3
          : i <= 16
            ? 4
            : i <= 22
              ? 5
              : i <= 25
                ? 6
                : i <= 29
                  ? 7
                  : i <= 33
                    ? 8
                    : i <= 37
                      ? 9
                      : i <= 40
                        ? 10
                        : i <= 43
                          ? 11
                          : i <= 48
                            ? 12
                            : 0;
  const gameMission = (i) =>
    i <= 9
      ? 1
      : i <= 19
        ? 2
        : i <= 29
          ? 3
          : i <= 39
            ? 4
            : i <= 45
              ? 5
              : i <= 51
                ? 6
                : i <= 54
                  ? 5
                  : i <= 64
                    ? 7
                    : i <= 70
                      ? 8
                      : i <= 74
                        ? 9
                        : i <= 84
                          ? 10
                          : i <= 89
                            ? 11
                            : i <= 98
                              ? 12
                              : 0;
  const qMission = (id) =>
    id.startsWith('b_')
      ? Number(id.split('_')[1])
      : id.startsWith('pre_')
        ? [1, 6, 5][Number(id.slice(4))]
        : [8, 6, 7, 10, 11][Number(id.slice(2))];
  const owner = (r, i) => ({
    id: r.proposed_id,
    unit: 'climatologia',
    mission: mid(i),
    concept: cid(i),
    refs: ref(r),
  });
  const questions = revised
    .filter((r) => r.kind === 'question')
    .map((r) => {
      const q = r.original,
        i = qMission(r.legacy_id);
      return {
        ...owner(r, i),
        prompt: q.p,
        options: q.o.map((text, j) => ({
          id: `${r.proposed_id}-o${j}`,
          text,
          feedback: q.ex[j],
          errorType: 'E1',
        })),
        correct: `${r.proposed_id}-o${q.c}`,
        explanation: q.e,
        pool: 'fixacao',
        roles: r.legacy_id.startsWith('pre_') ? ['diagnostico', 'pos-teste'] : [],
        difficulty: 1,
        cognitive: 1,
        origin: 'legacy-authored',
        status: 'human-review-pending',
        reviewNotes:
          'Leitura editorial assistida realizada; candidata sem aprovação canônica. Dificuldade estimada, sem calibração.',
        legacy_progress_key: r.legacy_id,
      };
    });
  for (const q of newQuestions) {
    const id = `v6-clima-q-${q.suffix}`;
    questions.push({
      id,
      unit: 'climatologia',
      mission: mid(8),
      concept: cid(8),
      prompt: q.prompt,
      options: q.options.map((text, j) => ({
        id: `${id}-o${j}`,
        text,
        feedback: q.feedback[j],
        errorType: 'E3',
      })),
      correct: `${id}-o${q.correct}`,
      explanation: q.explanation,
      pool: 'concurso',
      roles: [],
      difficulty: q.difficulty,
      cognitive: q.cognitive,
      origin: 'authored',
      status: 'human-review-pending',
      visual: q.visual,
      refs: [],
      reviewNotes:
        'Autoral: não é questão oficial de concurso nem item FGV. Nível é estimativa editorial.',
    });
  }
  const cards = revised
    .filter((r) => r.kind === 'card')
    .map((r, i) => ({
      ...owner(r, cardMission(i)),
      category: r.original[0],
      front: r.original[1],
      back: r.original[2],
      answer: r.original[2],
      variants: [],
    }));
  const game = revised
    .filter((r) => r.kind === 'game')
    .map((r, i) => ({
      ...owner(r, gameMission(i)),
      statement: r.original.t,
      truth: r.original.v,
      justification: r.original.x,
      author_label: r.original.a,
      variants: [],
      qualityFlags: ['recognition-practice', 'not-standalone-mastery-evidence'],
    }));
  // HTML de procedência é preservado para auditoria. Não injete os controles legados em React.
  const supplements = revised
    .filter((r) => ['supplement', 'static'].includes(r.kind))
    .map((r) => ({
      id: r.proposed_id,
      mission: mid(r.legacy_id === 'teacherBox' ? 8 : 0),
      kind: r.kind === 'static' ? 'archived-context' : 'legacy-supplement',
      html: r.original,
      refs: ref(r),
      render_policy:
        r.legacy_id === 'discBox' || r.kind === 'static'
          ? 'archive-only'
          : 'sanitize-before-display',
    }));
  const disc = byId.get('discBox').original;
  const prompts = [...disc.matchAll(/<b>Comando:<\/b> ([\s\S]*?)<\/p>/g)].map((m) => m[1]);
  const models = [
    ...disc.matchAll(/Ver espinha dorsal de resposta<\/summary><p>([\s\S]*?)<\/p>/g),
  ].map((m) => m[1]);
  assert.equal(prompts.length, 2);
  assert.equal(models.length, 2);
  const writing = prompts.map((prompt, i) => ({
    id: `v6-clima-writing-${i}`,
    unit: 'climatologia',
    mission: mid(i ? 12 : 10),
    prompt,
    model: models[i],
    rubric: i
      ? [
          'Definir variabilidade e mudança.',
          'Explicar atribuição probabilística.',
          'Aplicar ENOS sem determinismo.',
        ]
      : [
          'Relacionar ZCIT e sazonalidade.',
          'Explicar transporte e reciclagem de umidade.',
          'Distinguir setores do Pará.',
        ],
    refs: [],
    source_supplement: ids('discBox'),
    recommended_lines: [15, 30],
    rubric_kind: 'didactic-not-official',
  }));
  const visuals = datasets.map(visual);
  missions[8].sections.push({
    id: 'v6-clima-climogramas-pratica',
    title: 'Leia os dados antes de nomear o clima',
    hook: 'Compare os meses, calcule a amplitude e separe observação de hipótese.',
    html:
      '<p>Os dois casos abaixo são hipotéticos, criados para praticar leitura. Não representam Belém, Marabá ou qualquer estação do INMET. Identifique os eixos antes de comparar a altura das barras e da linha.</p>' +
      visuals.map((v) => v.html).join('') +
      '<p>Amplitude anual: maior média mensal menos menor média mensal. Para o exercício de B, conte meses com P &lt; 60 mm; esse corte é didático, não um balanço hídrico. Não confunda escalas gráficas independentes com critério ombrotérmico. Totais anuais iguais também podem esconder sazonalidades diferentes.</p>',
    primary: false,
    refs: [],
  });
  const families = [
    ['climograma-padrao', ['b_8_0', 'c_0'], 'Reconhecimento do mesmo padrão equatorial.'],
    ['zcit', ['pre_1', 'c_1'], 'Reconhecimento de convergência equatorial.'],
    ['friagem', ['pre_2', 'b_5_1'], 'Reconhecimento de incursão polar amazônica.'],
    ['para-sazonalidade', ['b_10_0', 'c_3'], 'Mesmo contraste regional em formato semelhante.'],
    ['ilha-calor', ['b_11_0', 'c_4'], 'Mesma combinação de processos urbanos.'],
  ].map(([id, members, reason]) => ({
    id: `clima-familia-${id}`,
    members: members.map(ids),
    reason,
    independent_novelty: false,
  }));
  for (const f of families)
    for (const id of f.members) questions.find((q) => q.id === id).family_id = f.id;
  const sources = [
    {
      id: 'nws-umidade',
      title: 'NWS — Relative Humidity from vapor pressure',
      url: 'https://www.weather.gov/media/epz/wxcalc/rhWetBulbFromTd.pdf',
      verification: 'direct',
      scope: 'Página 1: UR = 100 e/es; não representa leitura de toda a bibliografia.',
    },
    {
      id: 'nws-circulacao',
      title: 'NWS — Divergence/Convergence',
      url: 'https://www.weather.gov/source/zhu/ZHU_Training_Page/Miscellaneous/Divergence/divergence.html',
      verification: 'direct',
      scope: 'Trechos sobre convergência, divergência, coluna de ar e movimento vertical.',
    },
    {
      id: 'inmet-normais',
      title: 'INMET — Normais Climatológicas do Brasil',
      url: 'https://portal.inmet.gov.br/normais',
      verification: 'direct',
      scope:
        'Disponibilidade dos períodos 1961–1990, 1981–2010 e 1991–2020; não foram baixados dados de estações.',
    },
    {
      id: 'ipcc-glossario',
      title: 'IPCC AR6 — Annex VII, Climate variability',
      url: 'https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_AnnexVII.pdf',
      verification: 'indexed-excerpt',
      scope:
        'Definição de variabilidade interna/forçada conferida no trecho indexado; abertura direta retornou HTTP 403.',
    },
    {
      id: 'ipcc-enos',
      title: 'IPCC AR6 WGI — Chapter 4, ENSO projections',
      url: 'https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-4/',
      verification: 'indexed-excerpt',
      scope:
        'Trecho indexado diferencia amplitude de SST e variabilidade da precipitação; leitura direta bloqueada por HTTP 403.',
    },
    {
      id: 'clima-dados-autorais',
      title: 'Climogramas autorais hipotéticos A/B',
      verification: 'authored',
      scope: 'Dados sintéticos, sem estação ou período observado; cálculos conferidos em testes.',
    },
  ].map((s) => ({ ...s, checked_at: '2026-11-06' }));
  const content = {
    unit: {
      id: 'climatologia',
      title: 'Climatologia',
      description:
        'Dinâmica atmosférica, leitura de dados e aplicação ao Brasil, à Amazônia e ao Pará.',
      refs: [],
    },
    missions,
    concepts,
    questions,
    cards,
    game,
    writing,
    supplements,
    editorialChanges: changes,
  };
  const base = {
    schema_version: 1,
    module_id: 'fisica',
    unit_id: 'climatologia',
    editorial_version: '0.1.0',
    status: 'EM_AUDITORIA',
    content,
    support: {
      visuals,
      editorial_notes: [
        'Os suplementos marcados archive-only não devem ser renderizados.',
        'Os 34 itens históricos são autorais de fixação; cinco deles preservam a origem Chefão sem herdar dificuldade avançada.',
      ],
    },
    metadata: {
      reviewed_at: '2026-11-06',
      reviewer: 'Codex',
      reviewer_kind: 'ai',
      human_manual_review: false,
      sources,
      temporal_claims: [],
      resources: [],
      question_families: families,
      legacy_progress: {
        key: inventory.storage.current,
        previous_placeholder: inventory.storage.previous,
        import_placeholder: false,
        implemented: false,
        policy:
          'Importar somente evidências interpretáveis; acerto, pontuação, leitura ou marcação binária antigos não concedem XP novo nem domínio. Migração deve ser idempotente e guardar cópia dos dados originais.',
        question_ids: questions
          .filter((q) => q.legacy_progress_key)
          .map((q) => ({ legacy_id: q.legacy_progress_key, canonical_id: q.id })),
        cards: cards.map((c, index) => ({ legacy_index: index, canonical_id: c.id })),
        game: game.map((g, index) => ({ legacy_index: index, canonical_id: g.id })),
      },
      consumer_requirements: [
        'Não consumir no runtime antes de promoção e registro canônico.',
        'Sanitizar HTML e substituir controles legados pelos componentes V6.',
        'Não chamar classificações de dificuldade de calibração psicométrica.',
        'Manter separação XP/domínio e regras anti-farming.',
      ],
    },
  };
  const temporal = [
    {
      id: 'clima-normal-1991-2020',
      resource_ids: [ids('B[1]'), ids('G[2]')],
      source_ids: ['inmet-normais'],
      reference_date: '1991-01-01/2020-12-31',
      verification: 'verified',
      verified_at: '2026-11-06',
      review_trigger:
        'Rever se o texto passar a afirmar que este é o período mais recente; atualmente é exemplo histórico.',
    },
    {
      id: 'clima-projecoes-ar6',
      resource_ids: [
        ids('B[7]'),
        ids('B[12]'),
        ids('C[48]'),
        ids('G[62]'),
        ids('G[63]'),
        ids('G[64]'),
        ids('c_2'),
      ],
      source_ids: ['ipcc-enos'],
      reference_year: 2021,
      verification: 'partial',
      verified_at: null,
      review_trigger: 'Confrontar seções completas e atualizações antes da promoção canônica.',
    },
    {
      id: 'clima-perfil-edital',
      resource_ids: [ids('tab-study'), ids('fontes')],
      source_ids: ['clima-edital-pendente'],
      reference_year: 2026,
      verification: 'pending',
      verified_at: null,
      review_trigger: 'Conferir o edital e suas retificações antes de afirmar cobertura integral.',
    },
  ];
  base.metadata.sources.push({
    id: 'clima-edital-pendente',
    title: 'Perfil SEDUC-PA 2026 herdado do material',
    verification: 'pending',
    scope: 'Conferência documental curricular ainda pendente nesta candidata.',
  });
  base.metadata.temporal_claims = temporal;
  base.metadata.resources = resources(base).map(({ kind, value }) => ({
    id: value.id,
    kind,
    scopes: [
      value.mission === mid(10) ? 'regional' : 'permanente',
      ...(temporal.some((t) => t.resource_ids.includes(value.id)) ? ['temporal'] : []),
    ],
    editorial_status: 'candidate-reviewed-ai',
    source_sha256: sha(value),
    temporal_claim_ids: temporal.filter((t) => t.resource_ids.includes(value.id)).map((t) => t.id),
  }));
  const archive = inventory.records.map((r) => ({
    id: r.proposed_id,
    kind: r.kind,
    refs: ref(r),
    original: r.original,
  }));
  const provenance = {
    schema_version: 1,
    unit_id: 'climatologia',
    editorial_version: '0.1.0',
    source_commit: 'ad8aa85',
    snapshot: {
      source_path: inventory.source,
      source_sha256: inventory.source_sha256,
      content_sha256: sha(content),
      support_sha256: sha(base.support),
      metadata_sha256: sha(base.metadata),
    },
    archive,
    parity_records: inventory.records.map((r) => ({ ...ref(r)[0], canonical_id: r.proposed_id })),
    authored_question_ids: questions.map((q) => q.id),
    legacy_bindings: base.metadata.legacy_progress,
  };
  const limitations = [
    'Não é aprovação canônica nem homologação humana.',
    'Cotejo fino com edital/retificações e atualização científica regional ainda pendentes.',
    'IPCC conferido por excertos indexados; leitura direta retornou 403.',
    'Não foi calibrada dificuldade com estudantes.',
    'Migração de progresso e integração ao runtime não implementadas neste lote.',
    'Duas fontes estáticas e controles HTML permanecem somente como procedência, sem executar JavaScript legado.',
  ];
  const audit = {
    schema_version: 1,
    unit_id: 'climatologia',
    editorial_version: '0.1.0',
    status: 'EM_AUDITORIA',
    reviewed_at: '2026-11-06',
    reviewer_kind: 'ai',
    human_approval: null,
    scope: {
      all_legacy_pedagogical_records_read: true,
      full_primary_source_audit: false,
      runtime_integrated: false,
    },
    counts: {
      missions: 13,
      sections: 14,
      recalls: 13,
      concepts: 13,
      questions: 38,
      authored_questions: 38,
      cards: 50,
      game: 100,
      writing: 2,
      supplements: 5,
      parity_records: 215,
    },
    premium_criteria: premiumCriteriaIds.map((id) => ({
      id,
      decision: 'pending',
      assessment: 'candidate-review',
      evidence: 'Revisão e correções locais registradas; fechamento Premium ainda não emitido.',
    })),
    authored_questions: questions.map((q) => ({
      id: q.id,
      resource_sha256: sha(q),
      correct_option_id: q.correct,
      correct_option_text: q.options.find((o) => o.id === q.correct).text,
      pool: q.pool,
      current_difficulty: q.difficulty,
      current_cognitive: q.cognitive,
      source_ids: q.origin === 'authored' ? ['clima-dados-autorais'] : [],
      content_evidence: [
        missions.find((m) => m.id === q.mission).sections[0].id,
        ...(q.origin === 'authored' ? ['v6-clima-climogramas-pratica'] : []),
      ],
      human_reviewer: null,
      human_decision: 'pending',
      editorial_decision: {
        kind: 'ai',
        decision: 'candidate-reviewed',
        evidence:
          q.origin === 'authored'
            ? 'Cálculo e unicidade da resposta conferidos; cada distrator tem explicação.'
            : 'Enunciado, gabarito e feedback lidos; alternativas e índice correto histórico preservados.',
      },
    })),
    findings: [
      {
        id: 'clima-cobertura-fontes',
        status: 'open',
        blocks_promotion: true,
        description:
          'Fechar cotejo curricular e referências científicas regionais/temporais antes da promoção.',
      },
      {
        id: 'clima-integracao',
        status: 'open',
        blocks_promotion: false,
        description: 'Integrar visualização, migração e fluxos V6 em lote posterior.',
      },
    ],
    limitations,
  };
  const bundle = { base, provenance, audit };
  validateBundle(bundle);
  return bundle;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const bundle = await buildCandidate();
  await mkdir(candidatePath, { recursive: true });
  for (const [file, value] of Object.entries({
    'content.json': bundle.base,
    'provenance.json': bundle.provenance,
    'audit.json': bundle.audit,
  })) {
    const text = JSON.stringify(value, null, 2) + '\n';
    if (process.argv.includes('--check'))
      assert.equal(await readFile(resolve(candidatePath, file), 'utf8'), text, file);
    else await writeFile(resolve(candidatePath, file), text);
  }
  console.log(JSON.stringify(validateBundle(bundle)));
}
