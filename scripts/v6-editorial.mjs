// Presentation edits only. Original full wording remains in archive[].original with its hash.
export const editorialReplacements = [
  [
    'v6-theory-t02-0',
    'title',
    'Como a FGV cobra Cartografia I',
    'Fundamentos cartográficos: decisões e armadilhas de prova',
  ],
  [
    'v6-theory-t02-14',
    'html',
    '<b>Ponte para Cartografia II.</b> O mapa informa “Projeção Policônica”. Na próxima página estudaremos por que toda projeção distorce algo e como reconhecer suas propriedades.',
    '<b>Conexão com representação do espaço.</b> O mapa informa “Projeção Policônica”. Na missão Projeções e propriedades, investigue por que toda projeção distorce algo e como reconhecer suas propriedades.',
  ],
  [
    'v6-theory-t02-7',
    'html',
    'que pertence ao sistema cartográfico estudado na Cartografia II.',
    'que pertence ao sistema cartográfico estudado na missão Mercator, Gall-Peters e UTM.',
  ],
  [
    'v6-theory-t03a-0',
    'title',
    'Como a FGV cobra Cartografia II',
    'Representação e geotecnologias: decidir pela finalidade',
  ],
  [
    'v6-theory-t03a-0',
    'html',
    'Cartografia II exige uma leitura por',
    'A representação cartográfica e as geotecnologias exigem uma leitura por',
  ],
  [
    'v6-recall-af03d6ab5d10acbb',
    'prompt',
    'Sem olhar: cite quatro erros mecânicos que a FGV pode explorar em Cartografia I.',
    'Sem olhar: cite quatro erros mecânicos que a FGV pode explorar em fundamentos cartográficos.',
  ],
  [
    'v6-recall-4803dafc8397a392',
    'prompt',
    'Explique em 30 segundos por que uma questão de Cartografia II deve começar pela finalidade do produto.',
    'Explique em 30 segundos por que uma questão de representação cartográfica ou geotecnologias deve começar pela finalidade do produto.',
  ],
];
export function applyEditorial(missions) {
  const entities = missions.flatMap((m) => [...m.sections, ...m.recalls]);
  for (const [id, field, original, replacement] of editorialReplacements) {
    const entity = entities.find((x) => x.id === id);
    if (!entity || !entity[field].includes(original))
      throw Error('Revisão editorial sem origem esperada: ' + id);
    entity[field] = entity[field].replace(original, replacement);
  }
  return editorialReplacements.map(([id, field, original, replacement]) => ({
    id,
    field,
    original,
    replacement,
    reason: 'Identidade e transição canônica V6; conteúdo conceitual preservado.',
  }));
}
