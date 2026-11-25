// Extensão editorial pontual: reutiliza integralmente a candidata 0.1.0.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { buildCandidate } from './build-climatologia-candidate.mjs';
import { root, resources, sha, validateBundle, editorialDiff } from './canonical-content.mjs';
import { preview } from './preview-climatologia.mjs';

export const candidatePath = resolve(root, 'docs/v6-climatologia/candidata/0.2.0');
const date = '2026-11-24';
export async function buildCandidate02() {
  const parent = await buildCandidate();
  const bundle = structuredClone(parent);
  const { base, provenance, audit } = bundle;
  for (const part of [base, provenance, audit]) part.editorial_version = '0.2.0';
  const energy = base.content.missions[2],
    regional = base.content.missions[10];
  energy.sections.push({
    id: 'v6-clima-atmosfera-estrutura',
    title: 'Composição e estrutura vertical da atmosfera',
    hook: 'A camada é identificada pelo perfil térmico; sua composição não explica tudo sozinha.',
    primary: false,
    refs: [],
    html:
      '<p>No ar seco, cerca de 78% são nitrogênio, 21% oxigênio e 0,93% argônio. O restante inclui gases-traço. O vapor d’água é variável e não entra nessa composição do ar seco. Abundância não equivale a importância radiativa: gases pouco abundantes podem absorver radiação em faixas relevantes.</p>' +
      '<table><caption>Perfil térmico simplificado: tendência da temperatura com a altitude</caption><thead><tr><th scope="col">Camada</th><th scope="col">Tendência</th><th scope="col">Processo e limite</th></tr></thead><tbody><tr><th scope="row">Troposfera</th><td>Diminui em média</td><td>Aquecimento pela superfície; concentra vapor e fenômenos meteorológicos. Inversões locais são possíveis.</td></tr><tr><th scope="row">Estratosfera</th><td>Aumenta</td><td>Absorção de ultravioleta pelo ozônio; termina na estratopausa.</td></tr><tr><th scope="row">Mesosfera</th><td>Diminui</td><td>Termina na mesopausa.</td></tr><tr><th scope="row">Termosfera</th><td>Aumenta</td><td>Absorção de radiação solar de alta energia em ar muito rarefeito.</td></tr></tbody></table>' +
      '<p>A tropopausa tende a ser mais alta nos trópicos e mais baixa nas regiões polares; não é uma superfície de altitude fixa. A exosfera é a transição externa extremamente rarefeita, sem uma borda rígida da atmosfera.</p>' +
      '<p><strong>Distinção de prova:</strong> proteção pelo ozônio envolve absorção de ultravioleta solar; efeito estufa envolve absorção e emissão de infravermelho. Não são sinônimos. O próprio ozônio também interage com infravermelho: distinguir mecanismos não significa dizer que um gás só tem uma função.</p>',
  });
  energy.recalls.push({
    id: 'v6-clima-recall-atmosfera',
    mission: energy.id,
    concept: energy.conceptIds[0],
    refs: [],
    prompt:
      'Qual critério distingue troposfera e estratosfera? Explique por que ozônio e efeito estufa não são sinônimos.',
    model:
      'O perfil térmico: queda média de temperatura na troposfera e aumento na estratosfera. A absorção de ultravioleta pelo ozônio difere da interação dos gases com infravermelho no efeito estufa.',
    points: [
      'Usar o perfil térmico, sem exigir altura fixa.',
      'Distinguir ultravioleta de infravermelho.',
    ],
  });
  regional.sections.push({
    id: 'v6-clima-maranhao',
    title: 'Maranhão: explique os contrastes de chuva',
    hook: 'Compare litoral e sul do estado antes de generalizar um calendário de chuvas.',
    primary: false,
    refs: [],
    html:
      '<p>No Maranhão, a sazonalidade não é uniforme. A SEMA descreve, aproximadamente, chuvas de janeiro a junho no litoral norte e de outubro a março no sul. São referências regionais, não datas obrigatórias para cada município ou ano.</p>' +
      '<p>A ZCIT tem papel importante no litoral: convergência dos alísios favorece ascensão de ar úmido. No sul, episódios de ZCAS e influência de sistemas frontais ajudam a explicar as chuvas. Linhas de instabilidade, vórtices em altos níveis e distúrbios de leste também participam da dinâmica estadual. A posição de cada sistema importa: a presença de um vórtice não implica chuva em toda a área sob sua influência.</p>' +
      '<p><strong>Aplicação:</strong> uma chuva intensa observada hoje descreve o tempo. Para comparar climas, use séries de longo prazo, com local, período e variável identificados. Um climograma de São Luís não representa automaticamente Balsas nem o estado inteiro. Os dois climogramas desta unidade continuam hipotéticos; não lhes atribua cidades reais.</p>' +
      '<p><strong>Prática docente:</strong> peça que a turma compare a distribuição mensal de duas séries, explique uma hipótese de circulação e indique que observações faltam para testá-la. Relacione chuva e risco de alagamento sem ignorar drenagem, ocupação e vulnerabilidade.</p>',
  });
  regional.recalls.push({
    id: 'v6-clima-recall-maranhao',
    mission: regional.id,
    concept: regional.conceptIds[0],
    refs: [],
    prompt:
      'Por que o calendário chuvoso do litoral maranhense não deve ser aplicado automaticamente ao sul do estado?',
    model:
      'A atuação e a sazonalidade dos sistemas diferem. A ZCIT é importante no litoral; ZCAS e sistemas frontais contribuem no sul. É necessário delimitar a região e conferir séries locais.',
    points: [
      'Diferenciar sistemas e regiões.',
      'Reconhecer variação anual e necessidade de séries locais.',
    ],
  });
  const additions = [
    {
      suffix: 'atmosfera-perfil',
      mission: energy,
      section: 'v6-clima-atmosfera-estrutura',
      sources: ['noaa-camadas', 'nasa-camadas'],
      prompt:
        'Uma sondagem mostra queda média de temperatura com a altitude, seguida de aumento persistente acima de uma transição. Na interpretação simplificada do perfil atmosférico, essa transição corresponde à passagem:',
      options: [
        'da mesosfera para a estratosfera, em sentido ascendente.',
        'da termosfera para a troposfera.',
        'da troposfera para a estratosfera.',
        'da exosfera para a mesosfera.',
        'entre duas camadas definidas somente pela porcentagem de nitrogênio.',
      ],
      correct: 2,
      feedback: [
        'A estratosfera está abaixo da mesosfera.',
        'Essas camadas não são adjacentes.',
        'A tropopausa separa as tendências térmicas descritas.',
        'A sequência e as tendências não correspondem ao enunciado.',
        'O critério usado é térmico, não a proporção de nitrogênio.',
      ],
      explanation:
        'A transição descrita é a tropopausa. Trata-se do perfil médio: uma inversão local isolada não basta para identificar a estratosfera.',
    },
    {
      suffix: 'atmosfera-ozonio',
      mission: energy,
      section: 'v6-clima-atmosfera-estrutura',
      sources: ['nasa-camadas'],
      prompt:
        'Ao comparar a proteção estratosférica pelo ozônio com o efeito estufa, é correto afirmar que:',
      options: [
        'ambos consistem exclusivamente em reflexão da luz visível.',
        'o efeito estufa depende apenas do nitrogênio, por ser o gás mais abundante.',
        'o ozônio só existe na troposfera.',
        'a proteção pelo ozônio envolve ultravioleta; o efeito estufa envolve interação com infravermelho.',
        'eliminar a camada de ozônio elimina o efeito estufa.',
      ],
      correct: 3,
      feedback: [
        'Absorção e emissão não equivalem a reflexão.',
        'Abundância não determina capacidade de absorção de infravermelho.',
        'Há ozônio estratosférico, fundamental à proteção contra UV.',
        'Os processos e as faixas de radiação devem ser distinguidos.',
        'Gases como vapor d’água e CO₂ participam do efeito estufa independentemente dessa equivalência falsa.',
      ],
      explanation:
        'A alternativa distingue mecanismos. Isso não exclui a participação do próprio ozônio na absorção de infravermelho.',
    },
    {
      suffix: 'maranhao-sazonalidade',
      mission: regional,
      section: 'v6-clima-maranhao',
      sources: ['sema-ma-chuvas', 'uema-chuvas'],
      prompt:
        'Um professor usa o calendário chuvoso do litoral norte para prever, sem ajustes, a distribuição mensal de chuva no sul do Maranhão. A principal limitação desse procedimento é:',
      options: [
        'ignorar diferenças regionais na atuação e sazonalidade dos sistemas atmosféricos.',
        'supor que a chuva depende de movimentos atmosféricos.',
        'considerar que séries mensais podem apoiar comparações climáticas.',
        'reconhecer a existência de variação espacial.',
        'distinguir tempo de clima.',
      ],
      correct: 0,
      feedback: [
        'O litoral e o sul não compartilham obrigatoriamente o mesmo calendário.',
        'A dinâmica atmosférica participa efetivamente da precipitação.',
        'Séries mensais são adequadas se tiverem período e qualidade conhecidos.',
        'O erro é ignorar essa variação, não reconhecê-la.',
        'Essa distinção é necessária e não caracteriza o erro descrito.',
      ],
      explanation:
        'A comparação exige delimitação regional e séries locais. Tendências sazonais não determinam o tempo de um dia específico.',
    },
  ];
  for (const q of additions) {
    const id = `v6-clima-q-${q.suffix}`;
    const item = {
      id,
      unit: 'climatologia',
      mission: q.mission.id,
      concept: q.mission.conceptIds[0],
      refs: [],
      prompt: q.prompt,
      options: q.options.map((text, i) => ({
        id: `${id}-o${i}`,
        text,
        feedback: q.feedback[i],
        errorType: 'E1',
      })),
      correct: `${id}-o${q.correct}`,
      explanation: q.explanation,
      pool: 'concurso',
      roles: [],
      difficulty: 2,
      cognitive: 2,
      origin: 'authored',
      status: 'human-review-pending',
      reviewNotes:
        'Questão autoral A–E; não é item oficial FCC. Dificuldade estimada, sem calibração empírica.',
    };
    base.content.questions.push(item);
    audit.authored_questions.push({
      id,
      resource_sha256: sha(item),
      correct_option_id: item.correct,
      correct_option_text: q.options[q.correct],
      pool: item.pool,
      current_difficulty: 2,
      current_cognitive: 2,
      source_ids: q.sources,
      content_evidence: [q.section],
      human_reviewer: null,
      human_decision: 'pending',
      editorial_decision: {
        kind: 'ai',
        decision: 'candidate-reviewed',
        evidence:
          'Unicidade do gabarito e comentário individual dos distratores conferidos com as fontes da seção.',
      },
    });
  }
  const sources = [
    [
      'noaa-composicao',
      'NOAA — The Atmosphere',
      'https://www.noaa.gov/jetstream/atmosphere',
      'Composição aproximada do ar seco; não estabelece concentração contemporânea fixa de CO₂.',
    ],
    [
      'noaa-camadas',
      'NOAA — Layers of the Atmosphere',
      'https://www.noaa.gov/jetstream/atmosphere/layers-of-atmosphere',
      'Perfil térmico e variação da altura da tropopausa.',
    ],
    [
      'nasa-camadas',
      'NASA — Earth’s Atmosphere: A Multi-layered Cake',
      'https://science.nasa.gov/earth/earth-atmosphere/earths-atmosphere-a-multi-layered-cake/',
      'Camadas, vapor d’água e absorção de UV na estratosfera.',
    ],
    [
      'sema-ma-chuvas',
      'SEMA-MA — As chuvas no Maranhão (25/01/2023)',
      'https://www.sema.ma.gov.br/noticias/as-chuvas-no-maranhao',
      'Contrastes sazonais e sistemas regionais; calendário aproximado, não previsão atual.',
    ],
    [
      'uema-chuvas',
      'NuGeo/UEMA — Fenômenos que produzem chuva no Maranhão (24/02/2023)',
      'https://www.nugeo.uema.br/?p=45738',
      'Sistemas produtores de chuva, ZCIT, ZCAS e dependência da posição dos vórtices.',
    ],
    [
      'fcc-seduc-ma-2026',
      'FCC — SEAD/MA, Edital 01/2026, Professor Geografia (17)',
      'https://www.concursosfcc.com.br/concursos/seadm226/seadm226_edital_de_abertura_1_17_11_26_publicado.pdf',
      'Consulta dirigida: vagas, quadro de provas, previsão de aplicação e programa de Geografia (p. 76). Não é cotejo integral de todo o edital.',
    ],
  ];
  base.metadata.sources.push(
    ...sources.map(([id, title, url, scope]) => ({
      id,
      title,
      url,
      scope,
      verification: 'direct',
      checked_at: date,
    })),
  );
  base.metadata.study_priority = {
    contest: 'SEDUC-MA / FCC',
    role: 'Professor — Geografia',
    code: '17',
    source_id: 'fcc-seduc-ma-2026',
    checked_at: date,
    scope:
      'Clima geral, climatologia brasileira e tempo/clima do Maranhão. Conteúdo do Pará preservado como comparação regional, sem equivalência automática entre editais.',
  };
  base.metadata.reviewed_at = date;
  base.metadata.reviewer = 'ChatGPT';
  base.metadata.resources = resources(base).map(({ kind, value }) => {
    const inherited = parent.base.metadata.resources.find((r) => r.id === value.id);
    return inherited
      ? { ...inherited, source_sha256: sha(value) }
      : {
          id: value.id,
          kind,
          scopes: [value.id.includes('maranhao') ? 'regional' : 'permanente'],
          editorial_status: 'candidate-reviewed-ai',
          source_sha256: sha(value),
          temporal_claim_ids: [],
        };
  });
  provenance.snapshot.content_sha256 = sha(base.content);
  provenance.snapshot.support_sha256 = sha(base.support);
  provenance.snapshot.metadata_sha256 = sha(base.metadata);
  provenance.authored_question_ids = base.content.questions.map((q) => q.id);
  provenance.extension = {
    from_version: '0.1.0',
    parent_bundle_sha256: sha(parent),
    reason: 'Completar atmosfera e aplicação maranhense; manter todos os recursos anteriores.',
    changes: editorialDiff(parent.base, base),
  };
  audit.reviewed_at = date;
  audit.counts.sections += 2;
  audit.counts.recalls += 2;
  audit.counts.questions += 3;
  audit.counts.authored_questions += 3;
  audit.limitations.push(
    'SEDUC-MA/FCC é a prioridade; exemplos e regras históricas SEDUC-PA não são regras do novo concurso. Não foi realizado cotejo integral dos demais temas do edital.',
  );
  validateBundle(bundle);
  return bundle;
}

export function preview02(base) {
  return preview(base)
    .replace('Candidata 0.1.0', 'Candidata 0.2.0')
    .replace(
      '38 questões (34 preservadas + 4 novas)',
      '41 questões (38 da edição anterior + 3 novas)',
    )
    .replace(
      '<nav aria-label="Etapas">',
      '<aside><h2>Prioridade: SEDUC-MA / FCC</h2><p>Estude os fundamentos e os climogramas; nesta edição, avance também para <a href="#v6-clima-atmosfera-estrutura">estrutura da atmosfera</a> e <a href="#v6-clima-maranhao">tempo e clima do Maranhão</a>. Os exemplos paraenses continuam como comparação, sem substituir o recorte maranhense. As discursivas são treino didático; não reproduzem o formato oficial FCC.</p></aside><nav aria-label="Etapas">',
    )
    .replace(
      'Conferência registrada em 06/11/2026.',
      'Base revisada em 06/11/2026; complementos de atmosfera e Maranhão conferidos em 24/11/2026.',
    );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const bundle = await buildCandidate02();
  await mkdir(candidatePath, { recursive: true });
  const files = {
    'content.json': bundle.base,
    'provenance.json': bundle.provenance,
    'audit.json': bundle.audit,
  };
  for (const [name, value] of Object.entries(files)) {
    const text = JSON.stringify(value, null, 2) + '\n';
    if (process.argv.includes('--check'))
      assert.equal(await readFile(resolve(candidatePath, name), 'utf8'), text);
    else await writeFile(resolve(candidatePath, name), text);
  }
  const html = preview02(bundle.base);
  if (process.argv.includes('--check'))
    assert.equal(await readFile(resolve(candidatePath, 'previa.html'), 'utf8'), html);
  else await writeFile(resolve(candidatePath, 'previa.html'), html);
  console.log(JSON.stringify(validateBundle(bundle)));
}
