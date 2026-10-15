export const units = [
  {
    id: 'cartografia-fundamentos',
    title: 'Fundamentos cartográficos',
    description: 'Da orientação à medida: localizar, converter e interpretar com segurança.',
  },
  {
    id: 'cartografia-representacao',
    title: 'Representação e leitura do espaço',
    description: 'Escolher projeções e símbolos; ler gráficos, perfis e formas do relevo.',
  },
  {
    id: 'geotecnologias',
    title: 'Geotecnologias e aplicações',
    description:
      'Investigar o território com imagens, posicionamento, SIG e critérios de validação.',
  },
];
const rows = [
  [
    'linguagem-cartografica',
    0,
    'Linguagem e leitura de mapas',
    'Distinguir mapa, carta e planta e conferir os elementos que sustentam uma interpretação.',
  ],
  [
    'orientacao-azimute',
    0,
    'Orientação e azimute',
    'Localizar direções pela referência indicada e distinguir norte geográfico e magnético.',
  ],
  [
    'coordenadas-gms',
    0,
    'Coordenadas e conversão GMS',
    'Ler hemisférios, comparar posições e converter graus, minutos e segundos.',
  ],
  [
    'fusos-utc-data',
    0,
    'Fusos, UTC e mudança de data',
    'Relacionar rotação, convenções civis, horários brasileiros e Linha de Data.',
  ],
  [
    'escalas-e-medidas',
    0,
    'Escalas e medidas',
    'Calcular distâncias e áreas e explicar o efeito da ampliação e da redução.',
  ],
  [
    'projecoes-propriedades',
    1,
    'Projeções e propriedades',
    'Escolher o que preservar, reconhecendo os limites de toda representação plana.',
  ],
  [
    'mercator-peters-utm',
    1,
    'Mercator, Gall-Peters e UTM',
    'Comparar propriedades, navegação e convenções de coordenadas métricas.',
  ],
  [
    'semiologia-tematica',
    1,
    'Semiologia e mapas temáticos',
    'Relacionar natureza do dado, implantação e variável visual.',
  ],
  [
    'graficos-perfis-relevo',
    1,
    'Gráficos, perfis e relevo',
    'Ler eixos, pirâmides, curvas de nível e declividade sem extrapolar a evidência.',
  ],
  [
    'leitura-critica-integrada',
    1,
    'Leitura crítica e decisão técnica',
    'Justificar a cadeia fenômeno, escala, dado, representação e limitação.',
  ],
  [
    'sensores-espectro',
    2,
    'Sensores e espectro',
    'Relacionar fonte de energia, alvo, atmosfera e assinatura espectral.',
  ],
  [
    'resolucoes-indices-classificacao',
    2,
    'Resoluções, índices e classificação',
    'Selecionar resoluções, calcular NDVI e validar classes com amostra independente.',
  ],
  [
    'gnss-referenciais',
    2,
    'GNSS e referenciais geodésicos',
    'Distinguir constelação, datum, projeção e apoio geodésico.',
  ],
  [
    'sig-modelos-operacoes',
    2,
    'SIG: modelos e operações',
    'Escolher vetor ou raster e combinar camadas com coerência topológica e métrica.',
  ],
  [
    'geoprocessamento-dados-digitais',
    2,
    'Geoprocessamento e dados digitais',
    'Distinguir operações e avaliar metadados, INDE e mapas digitais.',
  ],
  [
    'amazonia-monitoramento',
    2,
    'Monitoramento na Amazônia e no Pará',
    'Diferenciar PRODES e DETER e reconhecer limites de inferência e decisão.',
  ],
  [
    'cartografia-escolar',
    2,
    'Cartografia escolar',
    'Planejar uma investigação que desenvolva linguagem e raciocínio geográfico.',
  ],
];
export const missions = rows.map(([id, u, title, goal]) => ({
  id,
  unit: units[u].id,
  title,
  goal,
  conceptIds: [],
  sections: [],
  recalls: [],
}));
const m = rows.map((r) => r[0]);
export const stageMap = {
  T02: [m[0], m[1], m[2], m[2], m[2], m[2], m[2], m[3], m[3], m[3], m[4], m[4], m[4], m[4], m[0]],
  T03A: [
    m[5],
    m[5],
    m[5],
    m[5],
    m[6],
    m[6],
    m[7],
    m[7],
    m[10],
    m[11],
    m[11],
    m[13],
    m[13],
    m[12],
    m[15],
    m[9],
    m[8],
  ],
  T17: [
    m[10],
    m[0],
    m[4],
    m[2],
    m[3],
    m[5],
    m[7],
    m[8],
    m[8],
    m[10],
    m[11],
    m[10],
    m[11],
    m[12],
    m[13],
    m[14],
    m[15],
    m[16],
  ],
};
export const preMap = {
  T02: [m[4], m[2], m[3]],
  T03A: [m[5], m[7], m[10]],
  T17: [m[4], m[6], m[11]],
};
export const bossMap = {
  T02: [m[4], m[2], m[2], m[3], m[4]],
  T03A: [m[5], m[7], m[11], m[13], m[6]],
  T17: [m[4], m[11], m[13], m[5], m[12]],
};
// Semantic aliases: same retrieval target, all original formulations retained as variants.
export const cardAliases = {
  'T02:C_34': 'T02:C_33',
  'T17:C_1': 'T02:C_35',
  'T17:C_5': 'T02:C_8',
  'T17:C_6': 'T02:C_10',
  'T17:C_7': 'T02:C_21',
  'T17:C_8': 'T02:C_29',
  'T17:C_9': 'T03A:C_1',
  'T17:C_10': 'T03A:C_2',
  'T17:C_11': 'T03A:C_5',
  'T17:C_12': 'T03A:C_8',
  'T17:C_13': 'T03A:C_18',
  'T17:C_14': 'T03A:C_19',
  'T17:C_15': 'T03A:C_21',
  'T17:C_20': 'T03A:C_22',
  'T17:C_21': 'T03A:C_24',
  'T17:C_22': 'T03A:C_23',
  'T17:C_23': 'T03A:C_26',
  'T17:C_24': 'T03A:C_29',
  'T17:C_25': 'T03A:C_27',
  'T17:C_26': 'T03A:C_28',
  'T17:C_29': 'T03A:C_30',
  'T17:C_31': 'T03A:C_39',
  'T17:C_32': 'T03A:C_41',
  'T17:C_34': 'T03A:C_33',
  'T17:C_35': 'T03A:C_34',
  'T17:C_36': 'T03A:C_35',
  'T17:C_38': 'T03A:C_36',
  'T17:C_39': 'T03A:C_37',
  'T17:C_43': 'T03A:C_38',
  'T17:C_46': 'T03A:C_44',
  'T17:C_47': 'T03A:C_43',
  'T17:C_48': 'T03A:C_48',
};
export const gameAliases = {
  'T03A:G_90': 'T02:G_92',
  'T03A:G_91': 'T02:G_93',
  'T17:G_2': 'T02:G_62',
  'T17:G_4': 'T02:G_78',
  'T17:G_6': 'T02:G_10',
  'T17:G_7': 'T02:G_15',
  'T17:G_8': 'T02:G_12',
  'T17:G_10': 'T02:G_40',
  'T17:G_12': 'T02:G_42',
  'T17:G_13': 'T02:G_47',
  'T17:G_14': 'T03A:G_0',
  'T17:G_15': 'T03A:G_1',
  'T17:G_16': 'T03A:G_10',
  'T17:G_17': 'T03A:G_11',
  'T17:G_18': 'T03A:G_12',
  'T17:G_19': 'T03A:G_17',
  'T17:G_20': 'T03A:G_16',
  'T17:G_21': 'T03A:G_31',
  'T17:G_22': 'T03A:G_30',
  'T17:G_24': 'T03A:G_32',
  'T17:G_34': 'T03A:G_38',
  'T17:G_36': 'T03A:G_40',
  'T17:G_40': 'T03A:G_44',
  'T17:G_41': 'T03A:G_45',
  'T17:G_42': 'T03A:G_46',
  'T17:G_44': 'T03A:G_50',
  'T17:G_45': 'T03A:G_49',
  'T17:G_46': 'T03A:G_48',
  'T17:G_48': 'T03A:G_54',
  'T17:G_51': 'T03A:G_53',
  'T17:G_52': 'T03A:G_52',
  'T17:G_55': 'T03A:G_71',
  'T17:G_56': 'T03A:G_70',
  'T17:G_58': 'T03A:G_74',
  'T17:G_63': 'T03A:G_59',
  'T17:G_64': 'T03A:G_58',
  'T17:G_67': 'T03A:G_43',
  'T17:G_68': 'T03A:G_68',
  'T17:G_70': 'T03A:G_62',
  'T17:G_71': 'T03A:G_65',
  'T17:G_72': 'T03A:G_64',
  'T17:G_79': 'T03A:G_67',
  'T17:G_80': 'T03A:G_66',
  'T17:G_86': 'T03A:G_82',
  'T17:G_91': 'T02:G_93',
  'T17:G_92': 'T02:G_92',
};
export function routeTopic(topic, text) {
  const label = topic
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const exact = {
    orientacao: 1,
    rede: 2,
    latitude: 2,
    longitude: 2,
    coordenadas: 2,
    conversao: 2,
    fusos: 3,
    brasil: 3,
    data: 3,
    escala: 4,
    conceitos: 4,
    leitura: 0,
    projecoes: 5,
    mercator: 6,
    peters: 6,
    utm: 6,
    semiologia: 7,
    tematicos: 7,
    tematica: 7,
    sr: 10,
    sensoriamento: 10,
    resolucoes: 11,
    resolucao: 11,
    ndvi: 11,
    imagem: 11,
    indices: 11,
    classificacao: 11,
    sig: 13,
    gnss: 12,
    geodesia: 12,
    inpe: 15,
    generalizacao: 9,
    graficos: 8,
    piramides: 8,
    critica: 9,
    'cartografia critica': 9,
    aplicacao: 9,
    integracao: 9,
    fundamentos: 0,
    relevo: 8,
    espectro: 10,
    geoprocessamento: 14,
    topologia: 13,
    dados: 14,
    digital: 14,
    amazonia: 15,
    ensino: 16,
    vetor: 13,
    raster: 13,
    buffer: 13,
    overlay: 13,
    geocodificacao: 14,
    interpolacao: 14,
    georreferenciamento: 14,
    metadados: 14,
    'cartografia digital': 14,
    qualidade: 14,
    analise: 9,
  };
  if (label in exact) return m[exact[label]];
  const t = (topic + ' ' + text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  if (/ensino|aula|alfabetizacao cartografica/.test(t)) return m[16];
  if (/prodes|deter|amazonia|juridic|causalidade/.test(t)) return m[15];
  if (/metadad|inde\b|webmap|geocodific|interpolac|georreferenciamento|cartografia digital/.test(t))
    return m[14];
  if (/gnss|gps|sirgas|datum|geodes|rbmc/.test(t)) return m[12];
  if (/ndvi|resolu|radiometric|bits|bandas|classificac|falsa.cor|rgb/.test(t)) return m[11];
  if (/espectro|sensoriamento|sensor|\bsr\b|nir|infravermelho|energia|satelite|landsat/.test(t))
    return m[10];
  if (/\bsig\b|raster|vetor|buffer|overlay|topologia|atributo/.test(t)) return m[13];
  if (/mercator|peters|\butm\b|loxodrom|false|falso leste/.test(t)) return m[6];
  if (/projec|conforme|conformal|equivalente|equidistante|azimutal/.test(t)) return m[5];
  if (/semiologia|tematic|coroplet|simbolos proporcionais|isolin|fluxo/.test(t)) return m[7];
  if (/relevo|perfil|curvas|decliv|equidistancia|grafico|piramide|eixo/.test(t)) return m[8];
  if (
    /critica|critico|generaliz|representacao seletiva|fenomeno.*escala.*dado|tecnica|qualidade|analise/.test(
      t,
    )
  )
    return m[9];
  if (/azimute|orientac|cardeal|cardeais|colateral|magnetico/.test(t)) return m[1];
  if (/fuso|utc|linha.*data|antimeridiano|leste.*hora|oeste.*hora|brasil|^data /.test(t))
    return m[3];
  if (
    /coordenad|latitude|longitude|gms|conversao|graus|grau|minuto|segundo|equador|greenwich|paralelo|meridiano|^rede /.test(
      t,
    )
  )
    return m[2];
  if (/escala|denominador|centimetro|\bcm\b|quilometro|\bkm\b|conceitos/.test(t)) return m[4];
  return m[0];
}
