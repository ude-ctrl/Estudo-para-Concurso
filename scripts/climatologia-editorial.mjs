// Revisões explícitas da candidata. Nunca modifica a fonte HTML histórica.
import assert from 'node:assert/strict';

export function revise(records) {
  const revised = structuredClone(records);
  const changes = [];
  function change(id, field, after, reason, sources = []) {
    const row = revised.find((r) => r.legacy_id === id);
    const path = field ? field.split('.') : [];
    const parent = path.length ? path.slice(0, -1).reduce((v, k) => v[k], row.original) : row;
    const key = path.length ? path.at(-1) : 'original',
      before = parent[key];
    assert.notEqual(before, after, `Revisão sem efeito: ${id}.${field}`);
    parent[key] = after;
    changes.push({
      legacy_id: id,
      canonical_id: row.proposed_id,
      field,
      before,
      after,
      reason,
      source_ids: sources,
    });
  }
  function replace(id, field, before, after, reason, sources = []) {
    const row = revised.find((r) => r.legacy_id === id);
    const current = field ? field.split('.').reduce((v, k) => v[k], row.original) : row.original;
    assert.equal(current.split(before).length, 2, `Trecho ausente/ambíguo: ${id}.${field}`);
    change(id, field, current.replace(before, after), reason, sources);
  }
  const editorial =
    'Distinguir orientação didática de frequência ou autoria de questões de uma banca, não demonstradas por provas identificadas.';
  change('B[0]', 't', 'Como interpretar questões de Climatologia', editorial);
  replace(
    'B[0]',
    'h',
    'A FGV tende a transformar conceitos climáticos em <b>problemas de interpretação</b>. Em vez de perguntar apenas “o que é ZCIT?”, ela pode apresentar',
    'Este material trabalha conceitos climáticos como <b>problemas de interpretação</b>. Em vez de perguntar apenas “o que é ZCIT?”, uma atividade autoral pode apresentar',
    editorial,
  );
  replace(
    'B[0].recall',
    'prompt',
    'pelas quais a FGV pode transformar climatologia',
    'de transformar climatologia',
    editorial,
  );
  replace(
    'B[1]',
    'h',
    'A FGV gosta de trocar essas categorias.',
    'Treine a distinção entre essas categorias usando exemplos e contraexemplos.',
    editorial,
  );
  replace('B[5]', 'h', 'A prova adora a regra simplista', 'Evite a regra simplista', editorial);
  replace('B[7]', 'h', 'FGV em modo difícil', 'Leitura crítica de afirmações', editorial);
  replace('B[11]', 'h', 'Ela apresenta cidade', 'Uma atividade pode apresentar cidade', editorial);
  replace('B[12]', 'h', 'Pegadinha FGV', 'Leitura crítica', editorial);
  for (const id of ['B[0]', 'B[2]', 'B[11]'])
    replace(id, 'h', 'Como a banca cobra', 'Como aplicar o conceito', editorial);
  replace(
    'B[3]',
    'h',
    'O essencial é a dinâmica de subsidência/convergência e a estrutura da massa de ar.',
    'No modelo de uma alta com subsidência, há convergência em altitude, movimento descendente e divergência junto à superfície. Indique sempre o nível: convergência superficial costuma favorecer ascensão. A evolução da pressão depende do balanço de massa da coluna e da estrutura atmosférica.',
    'Especificar o nível da convergência e evitar trocar a circulação superficial da alta pela da baixa.',
    ['nws-circulacao'],
  );
  replace(
    'B[4]',
    'h',
    'A <b>umidade relativa</b> compara a quantidade de vapor presente com a quantidade máxima que o ar poderia conter naquela temperatura. Como o ar quente pode sustentar mais vapor, a umidade relativa pode cair durante a tarde mesmo sem perda de vapor.',
    'A <b>umidade relativa (UR)</b> é a razão, em porcentagem, entre a pressão parcial do vapor presente (e) e a pressão de vapor de saturação à mesma temperatura (es): <b>UR = 100 × e/es</b>. Como es aumenta com a temperatura, aquecer o ar mantendo aproximadamente e reduz a UR. A expressão “capacidade do ar” é uma analogia: o ar não funciona como uma esponja.',
    'Usar a definição física e explicitar a condição da comparação.',
    ['nws-umidade'],
  );
  replace(
    'B[4]',
    'h',
    'mantendo aproximadamente o conteúdo de vapor',
    'mantendo aproximadamente a pressão e o conteúdo de vapor',
    'Precisar a definição de ponto de orvalho.',
    ['nws-umidade'],
  );
  change(
    'b_4_1',
    'e',
    'A pressão de vapor de saturação aumenta com a temperatura. Se a pressão de vapor presente variar pouco, a razão e/es e a umidade relativa diminuem.',
    'Coerência entre teoria e feedback sobre UR.',
    ['nws-umidade'],
  );
  change(
    'C[12]',
    '2',
    'UR = 100 × e/es: pressão do vapor presente dividida pela pressão de saturação à mesma temperatura, em porcentagem.',
    'Aplicar a definição física também ao flashcard.',
    ['nws-umidade'],
  );
  change(
    'G[30]',
    'x',
    'A pressão de vapor de saturação aumenta ao aquecer. Mantida aproximadamente a pressão do vapor presente, a razão e/es diminui.',
    'Explicação física preservando o gabarito verdadeiro.',
    ['nws-umidade'],
  );
  change(
    'G[38]',
    'x',
    'A temperatura determina a pressão de vapor de saturação, mas não informa sozinha quanto vapor está efetivamente presente.',
    'Evitar confundir saturação e conteúdo efetivo de vapor.',
    ['nws-umidade'],
  );
  change(
    'b_8_0',
    'p',
    'Um climograma com temperaturas médias mensais elevadas o ano inteiro, pouca variação térmica anual e chuvas elevadas em quase todos os meses é mais compatível com:',
    'Incluir no enunciado a premissa térmica já usada na explicação; alternativas e gabarito preservados.',
  );
  change(
    'G[67]',
    'x',
    'Janeiro mais quente pode ser uma pista de sazonalidade austral, mas não prova sozinho o hemisfério. Em baixas latitudes, a pequena amplitude e a distribuição de nebulosidade e chuva podem deslocar máximos; examine a série completa e a localização. Altitude isolada não determina o mês do máximo.',
    'Retirar altitude como explicação isolada da fase sazonal; explicitar o limite da inferência.',
  );
  const variability =
    'Flutuações das variáveis climáticas além de eventos individuais; podem decorrer de processos internos ou de variações de forçantes externas, naturais ou humanas.';
  change(
    'C[44]',
    '2',
    variability,
    'Variabilidade não se restringe por definição a causas naturais.',
    ['ipcc-glossario'],
  );
  change(
    'B[12].recall',
    'answer',
    'Evento extremo = ocorrência rara/intensa no contexto local; variabilidade = flutuações associadas à dinâmica interna ou a forçantes externas; mudança climática = alteração persistente das estatísticas do clima. Variabilidade e mudança podem coexistir.',
    'Distinguir evento, variabilidade e mudança sem reservar toda variabilidade às causas naturais.',
    ['ipcc-glossario'],
  );
  replace(
    'B[12]',
    'h',
    '<b>Variabilidade climática</b> inclui oscilações naturais em escalas sazonais, interanuais e decadais, como o ENOS.',
    '<b>Variabilidade climática</b> inclui flutuações além de eventos individuais, em diferentes escalas de tempo e espaço. Pode decorrer da dinâmica interna ou de variações em forçantes externas naturais ou humanas. O ENOS é um modo de variabilidade natural que interage com o clima em mudança.',
    'Alinhar teoria, recall e cartão à definição ampla de variabilidade.',
    ['ipcc-glossario'],
  );
  replace(
    'discBox',
    '',
    'Variabilidade reúne oscilações naturais, como ENOS;',
    'Variabilidade inclui flutuações internas ou ligadas a forçantes externas; ENOS é um exemplo de variabilidade natural;',
    'Corrigir também a resposta-modelo da discursiva.',
    ['ipcc-glossario'],
  );
  replace('discBox', '', 'Discursiva FGV · treino 1', 'Discursiva autoral · treino 1', editorial);
  replace('discBox', '', 'Discursiva FGV · treino 2', 'Discursiva autoral · treino 2', editorial);
  for (const id of ['fontes', 'tab-study']) {
    replace(
      id,
      '',
      'Tema 02',
      'Tema 04',
      'Corrigir o número do tema exibido; a chave de progresso legado permanece intacta.',
    );
    replace(
      id,
      '',
      'Os quadros “Como a banca cobra” e “Pegadinha típica” sintetizam padrões observados em questões da FGV sem exibir prova, ano ou número de questão.',
      'Os quadros de aplicação são orientações didáticas autorais; não constituem levantamento de frequência de cobrança nem questões oficiais identificadas.',
      editorial,
    );
  }
  replace(
    'tab-study',
    '',
    'A FGV costuma transformar esses conteúdos em interpretação de climogramas, causas de fenômenos urbanos, relações entre massas/sistemas e análise crítica de afirmações sobre ENOS e mudanças climáticas.',
    'O treino autoral propõe interpretação de climogramas, causas de fenômenos urbanos, relações entre massas/sistemas e análise crítica de afirmações sobre ENOS e mudanças climáticas.',
    editorial,
  );
  replace(
    'tab-study',
    '',
    'questões A–E.',
    'questões A–D e A–E.',
    'Informar corretamente o formato do estoque histórico.',
  );
  for (const r of revised.filter((r) => r.kind === 'question')) {
    r.original.ex.forEach((feedback, i) => {
      if (feedback === 'Correto.')
        change(
          r.legacy_id,
          `ex.${i}`,
          r.original.e,
          'Tornar o feedback da alternativa correta autossuficiente, reaproveitando a explicação já existente.',
        );
    });
  }
  return { revised, changes };
}

export const missionNotes = [
  [
    'Leitura de evidências',
    'Relacionar processo, evidência e escala.',
    'Uma pista orienta a análise, mas não substitui o comando.',
    'Um climograma informa chuva e temperatura; não identifica sozinho a cidade.',
    'Nomear o clima antes de descrever os dados.',
  ],
  [
    'Tempo e clima',
    'Distinguir episódio, padrão, elemento e fator.',
    'Clima descreve distribuições de longo prazo; tempo descreve condições atmosféricas.',
    'Uma tarde fria em Belém não demonstra por si só uma mudança climática.',
    'Confundir normal climatológica com valor repetido todo ano.',
  ],
  [
    'Energia e temperatura',
    'Relacionar balanço de energia e controles geográficos.',
    'Reflexão, absorção, emissão e trocas de calor participam do balanço energético.',
    'Sombra e superfície exposta podem ter temperaturas distintas no mesmo bairro.',
    'Transformar o gradiente ambiental médio em regra invariável.',
  ],
  [
    'Circulação atmosférica',
    'Reconstruir fluxos superficiais e em altitude.',
    'Gradientes de pressão, rotação e atrito condicionam os ventos.',
    'No modelo de Hadley, o retorno superficial tropical ocorre pelos alísios.',
    'Mencionar convergência sem indicar o nível atmosférico.',
  ],
  [
    'Umidade e chuva',
    'Explicar saturação e mecanismos de ascensão.',
    'Resfriamento de ar úmido pode favorecer saturação, condensação e formação de nuvens.',
    'Uma encosta pode forçar ascensão; a umidade disponível condiciona a chuva.',
    'Confundir UR elevada com grande quantidade absoluta de vapor.',
  ],
  [
    'Massas e frentes',
    'Relacionar origem, trajetória e transformação.',
    'Massas modificam suas propriedades ao se deslocar e interagir com superfícies.',
    'Uma incursão polar pode provocar friagem na Amazônia.',
    'Supor que toda massa continental é seca.',
  ],
  [
    'ZCIT e ZCAS',
    'Comparar sistemas sem confundir suas escalas e posições.',
    'Convergência, umidade e ascensão organizam precipitação.',
    'Banda persistente Amazônia–Sudeste no verão sugere ZCAS.',
    'Tratar ZCIT e ZCAS como sinônimos.',
  ],
  [
    'ENOS e Atlântico',
    'Interpretar teleconexões probabilisticamente.',
    'Anomalias oceânicas interagem com a circulação e modulam probabilidades regionais.',
    'El Niño não determina sozinho a chuva de uma cidade.',
    'Tratar La Niña como espelho perfeito de El Niño.',
  ],
  [
    'Climogramas e classificação',
    'Calcular, comparar e limitar inferências.',
    'Temperatura e precipitação mensais permitem descrever sazonalidade.',
    'Duas localidades podem ter total anual semelhante e regimes mensais distintos.',
    'Confundir um exercício hipotético com normal de estação real.',
  ],
  [
    'Climas brasileiros',
    'Reconhecer diversidade e critérios de regionalização.',
    'Latitude, relevo, oceanos e circulação combinam-se na distribuição climática.',
    'O interior tropical e o litoral leste não precisam ter a mesma estação chuvosa.',
    'Aplicar uma síntese nacional a todo lugar sem contexto.',
  ],
  [
    'Amazônia e Pará',
    'Explicar a variação regional das chuvas.',
    'Transporte oceânico, reciclagem de umidade e sistemas atmosféricos interagem.',
    'Compare a sazonalidade pluviométrica de setores costeiros e do sudeste paraense.',
    'Homogeneizar todo o Pará ou atribuir diferenças somente à altitude.',
  ],
  [
    'Clima urbano',
    'Distinguir contraste horizontal e estrutura vertical.',
    'Uso do solo modifica fluxos de energia; estabilidade limita mistura vertical.',
    'Uma rua sombreada e arborizada pode oferecer melhor conforto térmico.',
    'Confundir ilha de calor com inversão térmica.',
  ],
  [
    'Mudanças e extremos',
    'Separar variabilidade, tendência e atribuição.',
    'Mudanças de forçantes e dinâmica interna afetam as estatísticas climáticas.',
    'Um extremo exige comparação estatística e contexto para investigar atribuição.',
    'Atribuir automaticamente qualquer evento a uma única causa.',
  ],
];
