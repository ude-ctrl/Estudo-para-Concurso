// Authorial pilot bank. First option in each row is correct; publication order is balanced.
// Explicit IDs in the builder remain stable when wording is reviewed. Human approval is pending.
const rows = [
  [
    'f01',
    'escalas-e-medidas',
    'escala',
    'concurso',
    2,
    3,
    'Uma trilha mede 7,2 cm em uma carta 1:50.000. Mantida a escala, qual é a extensão horizontal representada?',
    [
      ['3,6 km.', '7,2 × 50.000 = 360.000 cm; dividir por 100.000 dá 3,6 km.'],
      [
        '0,36 km.',
        'Esse resultado perde um fator dez na conversão de centímetros para quilômetros.',
      ],
      ['36 km.', 'Esse resultado acrescenta um fator dez; 1 cm nessa carta corresponde a 0,5 km.'],
      ['360 km.', '360.000 é a medida em centímetros, não em quilômetros.'],
      ['7,2 km.', 'Igualar cm a km funcionaria em 1:100.000, mas a carta usa 1:50.000.'],
    ],
  ],
  [
    'f02',
    'coordenadas-gms',
    'gms',
    'concurso',
    2,
    3,
    'Um levantamento informa 12°30′S. Em graus decimais assinados, a latitude é:',
    [
      ['−12,5°.', '30/60 = 0,5; o hemisfério sul aplica sinal negativo a 12,5.'],
      ['−12,30°.', 'Minutos de arco usam base 60, não centésimos de grau.'],
      ['12,5°.', 'O módulo foi convertido corretamente, mas o sinal sul foi perdido.'],
      ['−12,05°.', '30 minutos são metade de um grau, não cinco centésimos.'],
      ['−11,5°.', 'O sinal negativo vale para o conjunto: −(12+0,5), e não −12+0,5.'],
    ],
  ],
  [
    'f03',
    'fusos-utc-data',
    'fusos',
    'concurso',
    2,
    3,
    'Uma transmissão começa às 23h30 de segunda-feira em UTC−5. Qual será a hora no Pará, em UTC−3, no mesmo instante?',
    [
      [
        '1h30 de terça-feira.',
        'UTC−3 está duas horas à frente de UTC−5; a soma ultrapassa meia-noite.',
      ],
      [
        '21h30 de segunda-feira.',
        'Subtrair duas horas inverte a diferença entre os deslocamentos.',
      ],
      ['1h30 de segunda-feira.', 'A hora foi ajustada, mas a mudança de dia foi omitida.'],
      [
        '2h30 de terça-feira.',
        'Três horas seria a diferença entre UTC e o Pará; a origem é UTC−5.',
      ],
      [
        '23h30 de segunda-feira.',
        'Os dois lugares têm deslocamentos distintos, embora ambos sejam negativos.',
      ],
    ],
  ],
  [
    'f04',
    'orientacao-azimute',
    'orientacao',
    'concurso',
    2,
    3,
    'Uma planta foi girada sobre a mesa. A seta de norte continua visível e um trajeto tem azimute geográfico de 270°. A direção desse trajeto é:',
    [
      [
        'Oeste, medido a partir do norte indicado.',
        '270° no sentido horário a partir do norte corresponde a oeste, qualquer que seja a rotação do papel.',
      ],
      [
        'Leste, porque o papel foi girado.',
        'Girar a folha não troca o significado da referência geográfica indicada.',
      ],
      [
        'Sul, pois o azimute passou de 180°.',
        'Sul é exatamente 180°; 270° acrescenta mais um quarto de volta.',
      ],
      [
        'A parte inferior da folha, independentemente da seta.',
        'A posição no papel só ganha direção a partir da referência indicada.',
      ],
      [
        'Norte magnético, porque todo azimute usa bússola.',
        'O enunciado especifica azimute geográfico; referências magnética e geográfica podem diferir.',
      ],
    ],
  ],
  [
    'f05',
    'linguagem-cartografica',
    'linguagem',
    'concurso',
    2,
    4,
    'Para discutir a distribuição das salas de uma escola, uma professora precisa de uma representação detalhada do edifício. Qual escolha responde melhor a essa finalidade?',
    [
      [
        'Planta em escala grande, com legenda e referência de orientação.',
        'Área pequena e grande detalhe favorecem uma planta; os elementos cartográficos continuam necessários.',
      ],
      [
        'Mapa nacional em escala pequena, ampliado na tela.',
        'Zoom amplia pixels, mas não cria detalhes que a base nacional não contém.',
      ],
      [
        'Carta regional sem legenda, desde que tenha coordenadas.',
        'Coordenadas não substituem a decodificação dos símbolos nem o detalhe interno necessário.',
      ],
      [
        'Mapa mundial equivalente, para preservar a área de cada sala.',
        'Equivalência global não resolve a escala inadequada nem fornece a planta do edifício.',
      ],
      [
        'Imagem sem escala, pois detalhes visuais bastam para medir.',
        'Detalhe aparente não estabelece a correspondência métrica exigida para medidas.',
      ],
    ],
  ],
  [
    'f06',
    'escalas-e-medidas',
    'redimensionamento',
    'concurso',
    3,
    3,
    'Uma carta 1:80.000 é ampliada uniformemente para 200% de suas dimensões lineares, incluindo a barra gráfica. Qual é a interpretação correta?',
    [
      [
        'A nova escala numérica é 1:40.000 e a barra redimensionada continua válida.',
        'O denominador é dividido por dois; desenho e barra ampliados juntos mantêm a correspondência.',
      ],
      [
        'A nova escala é 1:160.000 e a barra continua válida.',
        'Ampliar o desenho aumenta a escala; multiplicar o denominador faria o oposto.',
      ],
      [
        'A escala continua 1:80.000 porque o terreno não mudou.',
        'O terreno não mudou, mas a razão entre desenho e terreno mudou.',
      ],
      [
        'A escala é 1:40.000, mas a barra deve ficar no tamanho original.',
        'Uma barra mantida no tamanho anterior deixaria de acompanhar o mapa ampliado.',
      ],
      [
        'A escala é 1:20.000 porque a área quadruplicou.',
        'A razão de escala é linear; a área quadruplica, mas o denominador só é dividido por dois.',
      ],
    ],
  ],
  [
    'f07',
    'escalas-e-medidas',
    'area',
    'elite',
    3,
    4,
    'Um polígono ocupa 4 cm² em uma carta 1:50.000. Outra impressão duplica as dimensões lineares da carta. Qual combinação está correta?',
    [
      [
        'Área real de 1 km²; desenho de 16 cm² na nova escala 1:25.000.',
        'Cada cm representa 0,5 km, logo 4×0,5²=1 km²; dobrar os lados quadruplica o desenho e reduz N à metade.',
      ],
      [
        'Área real de 2 km²; desenho de 8 cm² na escala 1:25.000.',
        'As duas áreas foram tratadas como grandezas lineares.',
      ],
      [
        'Área real de 1 km²; desenho de 8 cm² na escala 1:100.000.',
        'A área do desenho cresce quatro vezes e a ampliação diminui, não aumenta, o denominador.',
      ],
      [
        'Área real de 100 km²; desenho de 16 cm² na escala 1:25.000.',
        'O redimensionamento está correto, mas a conversão de cm² para km² perdeu o quadrado da unidade.',
      ],
      [
        'Área real de 4 km²; desenho de 16 cm² na escala 1:50.000.',
        'A impressão não aumenta o terreno, e a nova razão linear não pode permanecer igual.',
      ],
    ],
  ],
  [
    'f08',
    'coordenadas-gms',
    'latitude',
    'elite',
    3,
    4,
    'Observe a tabela didática de coordenadas assinadas. Admitindo a ordem latitude, longitude, qual relação é sustentada?',
    [
      [
        'B fica ao sul de A e C fica a oeste de A.',
        '−5° é mais ao sul que −1°; −52° é mais a oeste que −48°.',
      ],
      [
        'B fica a leste de A e C fica ao sul de A.',
        'B só muda latitude e C só muda longitude: os eixos foram trocados.',
      ],
      [
        'A e B estão no mesmo paralelo, e A e C no mesmo meridiano.',
        'A e B compartilham longitude, portanto meridiano; A e C compartilham latitude, portanto paralelo.',
      ],
      [
        'B fica ao sul de A, mas C fica a leste de A.',
        'A primeira relação está correta; no hemisfério oeste, aumentar o módulo da longitude desloca para oeste.',
      ],
      [
        'A fica a oeste de C, e B fica ao norte de A.',
        'As duas comparações foram invertidas: −48° fica a leste de −52°, e −5° fica ao sul de −1°.',
      ],
    ],
    'coordenadas',
  ],
  [
    'f09',
    'fusos-utc-data',
    'fusos',
    'elite',
    3,
    4,
    'Uma aeronave parte às 22h de segunda-feira de A (UTC−3). O voo dura 5 horas e chega a B (UTC+2). Considerando somente esses fusos civis declarados, a chegada ocorre:',
    [
      [
        'Às 8h de terça-feira em B.',
        '22h+5h de voo=3h de terça em UTC−3; B está cinco horas à frente, logo 8h.',
      ],
      ['Às 3h de terça-feira em B.', 'Esse é o horário após o voo ainda no fuso da origem.'],
      [
        'Às 0h de terça-feira em B.',
        'Subtrair três horas não aplica a diferença entre UTC−3 e UTC+2.',
      ],
      [
        'Às 8h de segunda-feira em B.',
        'O resultado horário exige avançar o calendário depois da meia-noite.',
      ],
      [
        'Às 17h de segunda-feira em B.',
        'Esse cálculo inverte a diferença de fusos e ignora o tempo de voo.',
      ],
    ],
  ],
  [
    'f10',
    'linguagem-cartografica',
    'linguagem',
    'elite',
    3,
    4,
    'Uma equipe dispõe de A, base municipal generalizada 1:100.000 produzida em 1990, e B, planta 1:2.000 de 2025. A é ampliada na tela até apresentar a mesma extensão aparente de B. Para investigar acessos de uma escola, qual conduta distingue escala de exibição, época e qualidade?',
    [
      [
        'Examinar B como base potencialmente compatível, verificando levantamento e precisão; a ampliação de A não recupera os detalhes ausentes.',
        'B tem escala e época mais próximas da finalidade, mas isso não dispensa conferir fonte, método e precisão. A não ganha informação pela ampliação.',
      ],
      [
        'Usar A para medir os acessos, recalibrando a escala numérica; a atualização da razão recompõe a geometria generalizada.',
        'Recalibrar a escala corrige uma relação de exibição, mas não reconstrói a geometria que foi omitida.',
      ],
      [
        'Adotar B sem verificar o levantamento, pois escala grande e data recente demonstram precisão suficiente para qualquer medida local.',
        'Escala e data são condições relevantes, mas não certificam sozinhas a precisão do levantamento.',
      ],
      [
        'Comparar as duas imagens pela mesma quantidade de pixels na tela e escolher a mais nítida como base de maior acurácia posicional.',
        'Resolução de exibição e nitidez não medem a diferença entre posições representadas e posições de referência.',
      ],
      [
        'Reprojetar A para o mesmo sistema de B e tratá-las como equivalentes em detalhe, já que a referência geométrica será comum.',
        'Compatibilizar referência é necessário ao cruzamento, mas não iguala época, detalhe de aquisição ou generalização.',
      ],
    ],
  ],
  [
    'f11',
    'coordenadas-gms',
    'longitude',
    'elite',
    3,
    4,
    'Uma camada declara pares (longitude, latitude) em graus decimais no SIRGAS2000. Recebeu (−1, −48), copiado de uma planilha cuja ordem é (latitude, longitude). O analista quer corrigir a posição e afirmar que ela não tem erro, pois o referencial é o mesmo. Qual avaliação é adequada?',
    [
      [
        'Reordenar para (−48, −1), após conferir os campos; o referencial comum não demonstra erro posicional nulo.',
        'A troca dos eixos explica esta inconsistência. Corrigir a ordem não mede a incerteza da aquisição ou a qualidade da posição.',
      ],
      [
        'Reordenar para (−48, −1) e considerar a posição exata, pois qualquer dado no SIRGAS2000 compartilha a mesma precisão.',
        'A ordem fica correta, mas um referencial comum não torna todos os levantamentos igualmente precisos.',
      ],
      [
        'Manter (−1, −48), porque a declaração SIRGAS2000 corrige automaticamente a ordem de quaisquer campos importados.',
        'O referencial não troca campos de uma planilha; a convenção do esquema precisa ser respeitada.',
      ],
      [
        'Reordenar para (−48, −1) e dividir ambos os valores por 60, para converter os pares assinados em graus decimais.',
        'Os valores já estão em graus decimais; a divisão introduziria uma conversão angular indevida.',
      ],
      [
        'Conservar os valores e apenas atribuir ao arquivo a convenção latitude–longitude, sem conferir o esquema exigido pela aplicação.',
        'Mudar a descrição para acomodar a planilha não garante que a aplicação leia os eixos na ordem exigida.',
      ],
    ],
  ],
  [
    'f12',
    'escalas-e-medidas',
    'escala',
    'elite',
    3,
    4,
    'Uma análise é regional, mas utiliza plantas 1:2.000 para verificar acessos a escolas antes de agregar resultados. Isso significa que:',
    [
      [
        'A escala geográfica da análise pode ser regional e as bases cartográficas locais podem ter escala grande.',
        'Abrangência analítica e razão métrica são dimensões relacionadas, mas distintas.',
      ],
      [
        'Toda análise regional exige que cada base cartográfica tenha escala pequena.',
        'A agregação regional pode depender de observações locais detalhadas.',
      ],
      [
        '1:2.000 é escala pequena porque abrange uma pequena área.',
        'Área pequena e detalhe elevado caracterizam escala cartográfica grande.',
      ],
      [
        'Escala geográfica e cartográfica são a mesma fração.',
        'Só a cartográfica expressa a razão matemática mapa/terreno.',
      ],
      [
        'A agregação torna desnecessário conhecer a qualidade das plantas.',
        'Erros da base podem propagar-se para o resultado regional.',
      ],
    ],
  ],
  [
    'r01',
    'projecoes-propriedades',
    'projecao',
    'concurso',
    2,
    3,
    'Um atlas deseja comparar a participação de cada país na área continental. A propriedade prioritária da projeção deve ser:',
    [
      [
        'Equivalência, com reconhecimento das deformações de forma.',
        'Preservar relações de área atende à comparação solicitada e não elimina outras deformações.',
      ],
      [
        'Conformidade, pois ângulos preservados garantem áreas iguais.',
        'Conformidade local não implica conservação das áreas relativas.',
      ],
      [
        'Equidistância global entre todos os pares de pontos.',
        'Nenhuma projeção plana preserva todas as distâncias globais dessa maneira.',
      ],
      [
        'Superfície cilíndrica, independentemente da propriedade.',
        'A família de superfície não informa por si só a propriedade preservada.',
      ],
      [
        'Ausência de qualquer deformação em um mapa plano.',
        'A passagem de superfície curva para plano impõe deformações.',
      ],
    ],
  ],
  [
    'r02',
    'mercator-peters-utm',
    'utm',
    'concurso',
    2,
    3,
    'Um ponto situado no meridiano central de seu fuso UTM tem, por convenção, qual coordenada leste?',
    [
      [
        '500.000 m, com fuso, hemisfério e datum identificados.',
        'A falsa coordenada evita valores leste negativos no uso convencional; a referência completa continua necessária.',
      ],
      [
        '0°, sem necessidade de informar fuso.',
        'UTM usa coordenadas métricas; omitir o fuso torna a posição ambígua.',
      ],
      [
        '10.000.000 m em qualquer hemisfério.',
        '10.000.000 m refere-se à falsa coordenada norte no Equador para o hemisfério sul.',
      ],
      [
        '15°, porque cada fuso UTM tem uma hora.',
        '15° é a base dos fusos horários; UTM tem fusos de 6°.',
      ],
      [
        '500.000 km, por ser um sistema global.',
        'A unidade convencional é metro; trocar por km gera um fator mil.',
      ],
    ],
  ],
  [
    'r03',
    'semiologia-tematica',
    'tematico',
    'concurso',
    2,
    4,
    'Para comparar incidência de uma doença entre municípios com populações muito diferentes, qual tratamento é mais adequado antes de construir um coroplético?',
    [
      [
        'Calcular uma taxa com denominador populacional pertinente e explicitar período e base.',
        'A normalização permite comparar incidência relativa; classes, população de referência e período precisam ser declarados.',
      ],
      [
        'Colorir municípios pelo número absoluto de casos e chamar o resultado de risco.',
        'Contagem absoluta mistura magnitude populacional e incidência; não equivale a risco relativo.',
      ],
      [
        'Dar a mesma cor a municípios de igual área territorial.',
        'Área territorial não é o denominador populacional necessário nesse caso.',
      ],
      [
        'Usar o nome do município como ordem quantitativa.',
        'Nomes são categorias nominais e não estabelecem magnitude da incidência.',
      ],
      [
        'Retirar a legenda para que a taxa seja inferida visualmente.',
        'Sem legenda não se conhece a medida, unidade ou intervalo das classes.',
      ],
    ],
  ],
  [
    'r04',
    'graficos-perfis-relevo',
    'relevo',
    'concurso',
    2,
    3,
    'Entre dois pontos há desnível de 40 m e distância horizontal de 200 m. Qual é a declividade percentual média?',
    [
      ['20%.', '40/200×100=20%; o denominador é a distância horizontal.'],
      ['5%.', '200/40 inverte a razão; declividade é vertical sobre horizontal.'],
      ['20°.', 'Percentual não é ângulo em graus; converter exige função trigonométrica.'],
      ['0,2%.', '0,2 é a razão adimensional, que deve ser multiplicada por 100 para percentual.'],
      ['80%.', 'O produto das medidas não define declividade e tem unidade inadequada.'],
    ],
  ],
  [
    'r05',
    'semiologia-tematica',
    'semiologia',
    'concurso',
    2,
    4,
    'Um mapa distingue tipos de rocha sem uma ordem hierárquica. Qual solução visual evita sugerir uma ordenação inexistente?',
    [
      [
        'Matizes ou padrões distinguíveis, com legenda nominal acessível.',
        'Categorias nominais pedem diferenciação; redundância por padrões ajuda pessoas com dificuldade de percepção de cor.',
      ],
      [
        'Sequência do muito claro ao muito escuro como se as classes fossem crescentes.',
        'Valor visual sugere ordem e pode comunicar uma hierarquia que o dado não tem.',
      ],
      [
        'Círculos sempre maiores para cada nome em ordem alfabética.',
        'Tamanho comunica magnitude, não uma ordenação arbitrária de categorias.',
      ],
      [
        'Espessura proporcional ao número de letras de cada rocha.',
        'Essa grandeza não representa a variável geológica.',
      ],
      [
        'Uma única cor sem rótulos para todas as classes.',
        'A ausência de distinção impede identificar a distribuição das categorias.',
      ],
    ],
  ],
  [
    'r06',
    'graficos-perfis-relevo',
    'graficos',
    'concurso',
    3,
    4,
    'Uma pirâmide etária apresenta uma faixa adulta relativamente larga em um município. Qual conclusão é sustentada apenas pela figura?',
    [
      [
        'Há concentração relativa nessa faixa; explicar a causa exige outras evidências.',
        'A forma descreve estrutura etária, mas migração e dinâmica de coortes exigem dados adicionais.',
      ],
      [
        'A migração foi necessariamente a única causa da forma.',
        'Uma mesma estrutura pode decorrer de processos diferentes; a figura não isola a causa.',
      ],
      [
        'A natalidade atual é igual ao tamanho dessa faixa adulta.',
        'A faixa adulta reflete coortes anteriores e outros processos, não a natalidade atual diretamente.',
      ],
      [
        'O município tem mais habitantes que todos os vizinhos.',
        'Proporções etárias não informam por si só totais populacionais comparados.',
      ],
      [
        'A fonte e o período podem ser ignorados porque a forma basta.',
        'Fonte, unidade, período e recorte são condições da interpretação.',
      ],
    ],
  ],
  [
    'r07',
    'semiologia-tematica',
    'tematico',
    'elite',
    3,
    4,
    'Observe os dados didáticos de população e área. Para comparar densidade entre os municípios, qual combinação é correta?',
    [
      [
        'A: 1.000 hab./km²; B: 200 hab./km²; coroplético de densidade com legenda explícita.',
        '10.000/10=1.000 e 20.000/100=200; a maior população absoluta está em B, mas a densidade maior em A.',
      ],
      [
        'A: 100; B: 200 hab./km²; coroplético de população absoluta.',
        'A densidade de A foi dividida por um fator dez; total absoluto também não é densidade.',
      ],
      [
        'A: 1.000; B: 200 hab./km²; B deve receber a classe de maior densidade.',
        'Os cálculos estão corretos, mas a classe de maior densidade cabe a A.',
      ],
      [
        'A: 10.000; B: 20.000 hab./km²; tamanho dos municípios como denominador dispensável.',
        'Esses são totais; faltou dividir pela área.',
      ],
      [
        'A e B têm a mesma densidade porque B tem mais habitantes.',
        'O aumento populacional não é proporcional à diferença de área neste conjunto.',
      ],
    ],
    'densidade',
  ],
  [
    'r08',
    'mercator-peters-utm',
    'mercator',
    'elite',
    3,
    4,
    'Um navegador traça uma reta em Mercator para manter rumo constante. Um atlas usa Gall-Peters para comparar áreas. Avalie as escolhas:',
    [
      [
        'São coerentes com finalidades distintas; a reta de rumo constante não é necessariamente o caminho mínimo.',
        'Mercator representa loxodromias por retas e Gall-Peters preserva relações de área; nenhuma elimina todos os custos geométricos.',
      ],
      [
        'A reta de Mercator será sempre o menor percurso sobre a esfera.',
        'Loxodromia e ortodromia têm propriedades diferentes e não coincidem em geral.',
      ],
      [
        'Gall-Peters conserva todas as formas porque conserva áreas.',
        'Equivalência é obtida com deformação de formas.',
      ],
      [
        'Mercator é equivalente e Gall-Peters é conformal.',
        'As propriedades foram invertidas: Mercator preserva ângulos locais; Gall-Peters preserva relações de área.',
      ],
      [
        'A finalidade é irrelevante porque toda projeção representa o mesmo globo.',
        'Representar o mesmo objeto não torna as deformações e usos intercambiáveis.',
      ],
    ],
  ],
  [
    'r09',
    'graficos-perfis-relevo',
    'relevo',
    'elite',
    3,
    4,
    'O perfil didático usa escala horizontal 1:50.000 e vertical 1:10.000. Entre A e B são 200 m horizontais e 40 m de desnível. Qual avaliação é correta?',
    [
      [
        'Exagero vertical de 5 vezes e declividade média real de 20%.',
        '50.000/10.000=5; a declividade deriva de 40/200 e não da inclinação aparente exagerada.',
      ],
      [
        'Exagero de 0,2 vez e declividade real de 20%.',
        'A razão das escalas foi invertida; a vertical foi ampliada em relação à horizontal.',
      ],
      [
        'Exagero de 5 vezes e declividade real de 100%.',
        'Multiplicar a declividade pelo exagero descreve uma aparência, não a razão física real.',
      ],
      [
        'Sem exagero e declividade de 20°.',
        'As escalas são diferentes e o cálculo resulta em percentual, não graus.',
      ],
      [
        'Exagero de 5 vezes e desnível real de 200 m.',
        'O desnível informado é 40 m; o exagero do desenho não altera o terreno.',
      ],
    ],
    'perfil',
  ],
  [
    'r10',
    'graficos-perfis-relevo',
    'relevo',
    'elite',
    3,
    4,
    'Uma carta com equidistância de 20 m mostra curvas formando um V ao cruzarem um vale. As altitudes crescem na direção da ponta do V. A interpretação mais consistente é:',
    [
      [
        'A ponta do V indica montante; a água tende a escoar para altitudes menores.',
        'No vale, as curvas infletem para montante; equidistância é diferença vertical entre curvas sucessivas.',
      ],
      [
        'A ponta indica jusante porque o desenho se assemelha a uma seta.',
        'Ler o V como seta de fluxo inverte a regra do vale.',
      ],
      [
        'A distância horizontal entre todas as curvas é de 20 m.',
        '20 m é intervalo vertical; espaçamento no papel depende da declividade e escala.',
      ],
      [
        'A água tende a escoar para a ponta, subindo as cotas.',
        'Sem outra força, escoamento segue o gradiente para menores altitudes.',
      ],
      [
        'A forma do V prova que todas as encostas têm a mesma declividade.',
        'Declividade depende de espaçamento e desnível, não apenas da forma geral.',
      ],
    ],
  ],
  [
    'r11',
    'leitura-critica-integrada',
    'critica',
    'elite',
    3,
    5,
    'Um mapa nacional de rios é ampliado para delimitar uma faixa de proteção em um lote. Qual decisão técnica deve preceder a medição?',
    [
      [
        'Obter base e método compatíveis com a precisão e a finalidade, verificando escala, referência e qualidade.',
        'Uma feição generalizada em escala nacional não sustenta automaticamente delimitação local ou jurídica.',
      ],
      [
        'Medir diretamente a linha ampliada, pois zoom melhora precisão.',
        'Zoom só amplia a representação disponível, incluindo sua generalização e incerteza.',
      ],
      [
        'Retirar a generalização por um filtro de suavização.',
        'Suavizar não recupera a geometria original não registrada.',
      ],
      [
        'Usar qualquer projeção equivalente, que resolve todos os erros de distância.',
        'Equivalência preserva áreas e não garante toda distância nem corrige a origem da base.',
      ],
      [
        'Dispensar a fonte se o traço coincide visualmente com uma fotografia.',
        'Coincidência aparente não documenta precisão, época ou método.',
      ],
    ],
  ],
  [
    'r12',
    'mercator-peters-utm',
    'utm',
    'elite',
    4,
    5,
    'Duas escolas têm coordenadas UTM em fusos vizinhos. Um analista subtrai seus valores E e N como se ambos pertencessem à mesma grade. Qual é a crítica correta?',
    [
      [
        'Compatibilizar referências e projeções, ou usar método geodésico apropriado; as falsas origens pertencem a grades de fusos distintos.',
        'Números métricos semelhantes em grades diferentes não compartilham automaticamente a mesma origem e geometria.',
      ],
      [
        'Subtrair diretamente E e N, desde que ambas as camadas tenham o mesmo datum; o uso de metros torna as grades comparáveis.',
        'O datum comum não elimina a diferença entre projeções, origens e meridianos centrais dos fusos.',
      ],
      [
        'Retirar 500.000 m de cada coordenada E e subtrair os resultados, pois essa operação unifica os eixos dos fusos vizinhos.',
        'Retirar o falso leste não alinha meridianos centrais nem resolve a diferença geométrica entre grades.',
      ],
      [
        'Atribuir às duas camadas o rótulo do fuso da primeira e conservar os números, evitando uma transformação adicional.',
        'Atribuir outra referência sem transformar coordenadas não é uma reprojeção e desloca a interpretação das posições.',
      ],
      [
        'Transformar os pontos em longitude e latitude e aplicar uma conversão fixa de graus para metros, válida em qualquer latitude.',
        'O comprimento de um grau de longitude varia com a latitude; a distância deve usar método e precisão adequados.',
      ],
    ],
  ],
  [
    'g01',
    'sensores-espectro',
    'sensores',
    'concurso',
    2,
    3,
    'Para observar uma área frequentemente nublada, inclusive à noite, qual propriedade favorece o uso de radar de micro-ondas?',
    [
      [
        'Emissão própria de energia e capacidade de atravessar muitas nuvens, conforme frequência e condições.',
        'O radar é ativo; sua operação não depende da iluminação solar e é menos limitada por nuvens que o óptico refletido.',
      ],
      [
        'Dependência exclusiva da luz solar refletida nas folhas.',
        'Essa descrição corresponde ao sensoriamento óptico passivo refletido.',
      ],
      [
        'Ausência de interação com a superfície.',
        'O sinal de retorno decorre da interação com rugosidade, umidade e geometria do alvo.',
      ],
      [
        'Produção direta da cor natural sem interpretação.',
        'O retorno radar não é uma fotografia RGB natural.',
      ],
      [
        'Eliminação de toda incerteza e necessidade de validação.',
        'Imagens radar continuam sujeitas a ruído, geometria e ambiguidades de interpretação.',
      ],
    ],
  ],
  [
    'g02',
    'resolucoes-indices-classificacao',
    'resolucoes',
    'concurso',
    2,
    3,
    'Um sensor armazena cada banda em 14 bits. Quantos níveis digitais podem ser representados, em princípio?',
    [
      [
        '16.384, associados à resolução radiométrica.',
        '2¹⁴=16.384; o número de níveis descreve discretização de intensidade, não tamanho do pixel.',
      ],
      [
        '14, associados à resolução espectral.',
        'Bits codificam níveis digitais de intensidade em cada banda; a quantidade de bandas pertence à dimensão espectral.',
      ],
      [
        '196, associados à resolução espacial.',
        '14² não é a quantidade de códigos binários e não fornece tamanho de pixel.',
      ],
      [
        '1.024, associados à resolução temporal.',
        '1.024 corresponde a 10 bits; revisita não é determinada pelos bits.',
      ],
      ['16.384 m de resolução espacial.', 'A contagem de níveis não tem unidade de comprimento.'],
    ],
  ],
  [
    'g03',
    'gnss-referenciais',
    'datum',
    'concurso',
    2,
    4,
    'Uma camada SAD69 e outra SIRGAS2000 não coincidem. Qual procedimento é tecnicamente mais adequado?',
    [
      [
        'Confirmar os referenciais e aplicar transformação apropriada, validando o alinhamento.',
        'Referenciais diferentes podem gerar deslocamento; parâmetros, área de uso e época devem ser considerados.',
      ],
      [
        'Atribuir o rótulo SIRGAS2000 à camada SAD69 sem transformar valores.',
        'Definir metadado não altera corretamente as coordenadas de origem.',
      ],
      [
        'Mudar apenas a cor da camada superior.',
        'A simbologia altera a aparência, mas não transforma coordenadas nem corrige a diferença entre referenciais.',
      ],
      [
        'Converter todos os graus em metros sem projeção e datum definidos.',
        'A conversão exige uma referência matemática completa.',
      ],
      [
        'Ignorar a diferença porque GPS e SIRGAS2000 são sinônimos.',
        'GPS é uma constelação; SIRGAS2000 é um referencial geodésico.',
      ],
    ],
  ],
  [
    'g04',
    'sig-modelos-operacoes',
    'topologia',
    'concurso',
    3,
    4,
    'Para selecionar escolas a até 500 m de rios e dentro de bairros vulneráveis, qual sequência é coerente?',
    [
      [
        'Compatibilizar dados, criar buffer dos rios e combinar a seleção espacial com os bairros vulneráveis.',
        'A distância define o buffer e a conjunção das condições exige cruzar as camadas, com unidades adequadas.',
      ],
      [
        'Colorir rios de azul e contar escolas visualmente sem referência métrica.',
        'Simbologia não executa a condição de distância nem garante reprodutibilidade.',
      ],
      [
        'Usar 500 graus como largura do buffer.',
        'O limite pedido é métrico; graus não são metros constantes.',
      ],
      [
        'Geocodificar os rios e dispensar os bairros.',
        'Geocodificação localiza endereços; não substitui as duas condições espaciais.',
      ],
      [
        'Selecionar todas as escolas de qualquer município cortado por um rio.',
        'Interseção municipal não prova que cada escola está a até 500 m.',
      ],
    ],
  ],
  [
    'g05',
    'geoprocessamento-dados-digitais',
    'digital',
    'concurso',
    2,
    4,
    'Uma equipe recebe um webmap sem data, referência geodésica ou método de aquisição. Qual é a primeira providência para uma análise métrica responsável?',
    [
      [
        'Obter metadados e avaliar adequação temporal, referência, precisão e método.',
        'A interface interativa não documenta a qualidade da base; é necessário conhecer suas condições de produção.',
      ],
      [
        'Usar o nível máximo de zoom como prova de precisão.',
        'Zoom não acrescenta acurácia aos dados originais.',
      ],
      [
        'Considerar toda base digital automaticamente atual.',
        'Formato digital não garante data recente nem atualização.',
      ],
      [
        'Interpolar a data ausente a partir da cor dos símbolos.',
        'Interpolação espacial não recupera metadados desconhecidos.',
      ],
      [
        'Substituir o datum pelo nome do município.',
        'Nome geográfico não define referência geométrica.',
      ],
    ],
  ],
  [
    'g06',
    'amazonia-monitoramento',
    'monitoramento',
    'concurso',
    3,
    4,
    'Um relatório soma alertas mensais DETER e publica o total como taxa anual oficial de corte raso na Amazônia Legal. Qual crítica é pertinente?',
    [
      [
        'Confunde um produto de alerta operacional com a estimativa anual consolidada do PRODES.',
        'Sensores, períodos e procedimentos dos sistemas diferem; os produtos não são intercambiáveis.',
      ],
      [
        'O DETER é inadequado para qualquer fiscalização.',
        'Apoiar fiscalização e controle é justamente sua finalidade.',
      ],
      [
        'O PRODES é um sistema de posicionamento por satélite.',
        'PRODES é monitoramento, enquanto GNSS é posicionamento.',
      ],
      [
        'A soma torna automaticamente os métodos equivalentes.',
        'Operar aritmeticamente sobre alertas não altera seu objetivo e suas limitações.',
      ],
      [
        'A diferença é apenas o nome, pois ambos sempre detectam os mesmos polígonos.',
        'Objetivos, resolução e oportunidade de observação podem gerar conjuntos distintos.',
      ],
    ],
  ],
  [
    'g07',
    'resolucoes-indices-classificacao',
    'ndvi',
    'elite',
    3,
    4,
    'Os dados espectrais didáticos foram obtidos de bandas comparáveis. Qual cálculo e interpretação são defensáveis?',
    [
      [
        'P tem NDVI 0,5 e Q cerca de −0,67; os valores são indícios espectrais e não identificam, sozinhos, espécie ou situação jurídica.',
        'P: (0,6−0,2)/(0,6+0,2)=0,5. Q: (0,02−0,1)/(0,02+0,1)≈−0,67. O significado exige contexto e validação.',
      ],
      [
        'P tem NDVI 0,5 e Q cerca de 0,67; os módulos positivos permitem interpretar ambos como vegetação de vigor semelhante.',
        'Tomar o módulo apaga o sinal de Q. A diferença NIR−vermelho é negativa nesse alvo.',
      ],
      [
        'P tem NDVI 0,4 e Q −0,08; a diferença entre bandas já fornece o índice normalizado quando as reflectâncias são comparáveis.',
        'Esses são numeradores, não índices normalizados; falta dividir cada diferença pela soma das bandas.',
      ],
      [
        'P tem NDVI 0,5 e Q cerca de −0,67; essa separação prova que P é floresta primária e Q é água, dispensando amostras de referência.',
        'Os cálculos estão corretos, mas classes específicas e sua qualidade não são demonstradas só por dois valores do índice.',
      ],
      [
        'P tem NDVI −0,5 e Q cerca de 0,67; usar vermelho−NIR preserva o significado e os limiares do NDVI convencional.',
        'Inverter o numerador troca o sinal; os limiares e a interpretação do índice convencional não permanecem iguais.',
      ],
    ],
    'espectral',
  ],
  [
    'g08',
    'resolucoes-indices-classificacao',
    'classificacao',
    'elite',
    4,
    5,
    'Uma classificação supervisionada obteve 99% de acerto ao ser avaliada com os próprios pixels usados no treinamento. Qual revisão metodológica é necessária?',
    [
      [
        'Avaliar com amostra de referência independente, informar o desenho amostral e examinar omissões e comissões por classe.',
        'Reutilizar treinamento na avaliação favorece estimativa otimista. Uma validação independente e a matriz de confusão permitem examinar a qualidade.',
      ],
      [
        'Ampliar o conjunto de treinamento e recalcular a acurácia sobre ele, até que a diversidade de exemplos substitua um teste independente.',
        'Mais treinamento pode ajudar o modelo, mas avaliar nos próprios exemplos continua sem estimar adequadamente a generalização.',
      ],
      [
        'Separar apenas os pixels classificados com maior confiança e usá-los como referência, excluindo os casos ambíguos da validação.',
        'Selecionar pela confiança do próprio classificador exclui erros difíceis e não constitui referência independente representativa.',
      ],
      [
        'Apresentar somente a acurácia global, pois 99% torna irrelevante examinar a confusão de classes pequenas ou de interesse específico.',
        'Uma classe rara pode ter erro elevado mesmo com alta acurácia global; omissão e comissão importam à finalidade do mapa.',
      ],
      [
        'Dividir os pixels de treinamento em dois arquivos após o ajuste e considerar o segundo arquivo um teste, sem treinar novamente.',
        'A separação posterior não desfaz o uso desses pixels no ajuste; o modelo já teve acesso ao suposto teste.',
      ],
    ],
  ],
  [
    'g09',
    'sig-modelos-operacoes',
    'topologia',
    'elite',
    3,
    5,
    'Um buffer de 10 km de uma rodovia intersecta parte de dois municípios. O analista soma toda a população municipal e chama o resultado de população situada a até 10 km da estrada. Qual avaliação é correta?',
    [
      [
        'A interseção não localiza todos os moradores; é preciso estimar a distribuição populacional na faixa e declarar método e incerteza.',
        'A unidade agregada não coincide com a faixa de distância. Atribuir todo o total pode superestimar a população situada no buffer.',
      ],
      [
        'A soma fornece exatamente a população na faixa, porque a seleção por interseção inclui apenas municípios com parte de seu território no buffer.',
        'Ter uma parte do município no buffer não significa que toda a população municipal esteja nessa parte.',
      ],
      [
        'Ponderar a população pela proporção da área municipal no buffer fornece o número exato de moradores, sem hipótese sobre distribuição interna.',
        'A ponderação por área pressupõe uma distribuição populacional; pode ser estimativa, mas não contagem exata sem outras evidências.',
      ],
      [
        'Somar a população dos municípios cujos centroides caem na faixa elimina a incerteza da agregação e determina quem reside perto da rodovia.',
        'O centroide é uma referência geométrica, não a localização de todos os moradores ou sua distribuição intramunicipal.',
      ],
      [
        'Multiplicar a área total do buffer pela densidade regional fornece uma contagem exata, pois a normalização elimina variação populacional local.',
        'Uma densidade média não elimina a heterogeneidade espacial; a operação impõe uma hipótese e produz estimativa.',
      ],
    ],
  ],
  [
    'g10',
    'sensores-espectro',
    'sensores',
    'elite',
    3,
    4,
    'O par Landsat do Rio permite observar diferenças de cobertura e forma urbana entre duas datas. Qual afirmação respeita o alcance desse tipo de evidência?',
    [
      [
        'Interpretar diferenças observáveis após conferir comparabilidade; atribuir causas requer evidências complementares às duas imagens.',
        'Data, estação, sensor e processamento condicionam a comparação; a imagem, sozinha, não identifica a causa social da mudança.',
      ],
      [
        'Tratar as duas composições como equivalentes em resposta espectral se usarem os mesmos nomes de cores, sem conferir bandas e aquisição.',
        'As cores de exibição não garantem as mesmas bandas, respostas espectrais, condições atmosféricas ou sazonais.',
      ],
      [
        'Concluir que todo aumento de detalhe é expansão urbana, desde que a imagem mais recente tenha resolução espacial superior.',
        'Uma resolução melhor pode revelar objetos já existentes; detalhe adicional não é necessariamente transformação no terreno.',
      ],
      [
        'Atribuir as mudanças a um processo social específico depois de normalizar a radiometria, sem investigar dados territoriais ou históricos.',
        'Normalização pode melhorar comparabilidade, mas não transforma associação visual em demonstração causal.',
      ],
      [
        'Usar apenas a coincidência visual entre os limites de classes nas duas datas como prova de ausência de mudança, sem medir erros de classificação.',
        'Erros de classe, registro e resolução podem ocultar ou simular diferenças; a coincidência aparente precisa ser avaliada.',
      ],
    ],
  ],
  [
    'g11',
    'geoprocessamento-dados-digitais',
    'operacoes-digitais',
    'elite',
    3,
    4,
    'Uma equipe dispõe de endereços de escolas e valores de chuva medidos em estações. Deseja localizar escolas e estimar chuva entre estações. Qual associação é correta?',
    [
      [
        'Geocodificar endereços e interpolar chuva entre estações, avaliando a qualidade das posições e a incerteza da superfície estimada.',
        'Uma operação vincula descrições a posições; a outra estima valores em locais não amostrados. Ambas exigem avaliação.',
      ],
      [
        'Georreferenciar os endereços com uma transformação de imagem e geocodificar a chuva entre estações, por serem dados com localização.',
        'Os problemas são de localização por descrição e estimativa de valores; os nomes das operações não são intercambiáveis.',
      ],
      [
        'Criar buffers dos endereços ainda sem posição e atribuir a cada área de chuva o nome da estação, dispensando localização e estimativa.',
        'Buffer requer feições localizadas e define distância; não resolve endereços nem estima chuva entre amostras.',
      ],
      [
        'Geocodificar endereços e interpolar chuva; considerar toda posição encontrada e todo valor interpolado como observação direta sem erro.',
        'A associação inicial está correta, mas a qualidade da geocodificação varia e interpolação produz estimativa, não nova observação.',
      ],
      [
        'Interpolar endereços e realizar overlay das estações para preencher automaticamente os valores ausentes de chuva em toda a região.',
        'Interpolar pressupõe variável e amostras adequadas; overlay cruza camadas, sem fornecer por si só um modelo de chuva.',
      ],
    ],
  ],
  [
    'g12',
    'cartografia-escolar',
    'ensino',
    'elite',
    3,
    5,
    'Uma turma deve investigar barreiras no acesso à escola. Qual proposta articula cartografia, inclusão e evidência de aprendizagem?',
    [
      [
        'Construir mapas de trajetos com legenda compartilhada, comparar barreiras e justificar alternativas, com recursos táteis ou textuais e avaliação do raciocínio.',
        'A proposta conecta pergunta, representação, comparação e evidência de aprendizagem, oferecendo formas acessíveis de participação.',
      ],
      [
        'Construir mapas acessíveis e corretos dos trajetos, avaliando a aprendizagem pelo número de funções digitais utilizadas e pela variedade de efeitos visuais.',
        'Acessibilidade e produção são relevantes, mas contar funções ou efeitos não demonstra interpretação espacial das barreiras.',
      ],
      [
        'Comparar trajetos em mapas com legenda e participação oral ou tátil, tomando sempre a menor distância em linha reta como prova de maior acessibilidade.',
        'A rota geometricamente menor pode conter barreiras; acessibilidade precisa considerar o problema e as condições observadas.',
      ],
      [
        'Usar um atlas nacional acessível para inferir os obstáculos de cada quarteirão, mantendo a atividade de comparação e exigindo justificativas dos alunos.',
        'Participação e justificativa não corrigem uma base sem detalhe compatível com a pergunta local.',
      ],
      [
        'Levantar barreiras com participação de todos e construir mapas, encerrando a avaliação no reconhecimento de símbolos sem pedir interpretação ou alternativas de acesso.',
        'Reconhecer símbolos faz parte da alfabetização, mas não cobre a comparação e a interpretação exigidas pelo problema investigado.',
      ],
    ],
  ],
];
export const authored = rows.map(
  ([id, mission, concept, pool, difficulty, cognitive, prompt, answers, visual]) => ({
    id: `v6-q-${id}`,
    mission,
    concept,
    pool,
    difficulty,
    cognitive,
    prompt,
    answers,
    visual,
  }),
);
