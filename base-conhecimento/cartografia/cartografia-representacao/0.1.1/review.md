# Revisão humana de questões — cartografia-representacao@0.1.1

Pacote pendente de aprovação. O gabarito abaixo é o gabarito candidato; conferir resposta única, distratores, explicação, nível e adequação ao conteúdo. Letras servem somente à leitura deste documento, não são identidades no aplicativo.

Parecer assistido por item em `audit.json`. Antes/depois em [changes.md](changes.md). Este documento não registra aprovação humana.

## v6-fix-40b0df8d5b8f4ef0

fixacao · D1 / C2 · human-review-pending

Ao reduzir um mapa para escala menor, a generalização tende a:

A. diminuir porque cabe mais detalhe — `v6-fix-40b0df8d5b8f4ef0-oe8ecca3ac5`

Feedback: Em escala menor, cada comprimento no mapa representa mais terreno e há menos espaço para detalhes. É necessário selecionar e simplificar mais, não menos.

B. aumentar para manter legibilidade — `v6-fix-40b0df8d5b8f4ef0-of0ec74ea45`

Feedback: A escala menor reduz o espaço gráfico disponível por feição. Maior seleção e simplificação ajudam a conservar a legibilidade do fenômeno representado.

C. desaparecer completamente — `v6-fix-40b0df8d5b8f4ef0-o7802d99941`

Feedback: A generalização continua necessária: toda representação seleciona informações. A redução da escala intensifica essa seleção em vez de eliminá-la.

D. transformar vetor em GNSS — `v6-fix-40b0df8d5b8f4ef0-oa43f2b7889`

Feedback: Vetor é um modelo de dados e GNSS é um sistema de posicionamento. Mudar a escala não transforma um modelo de dados em uma tecnologia de localização.

**Gabarito candidato:** aumentar para manter legibilidade (`v6-fix-40b0df8d5b8f4ef0-of0ec74ea45`).

Menor escala exige seleção e simplificação maiores.

Nota de revisão: Revisão editorial assistida 0.1.1: vínculo e feedbacks específicos corrigidos; originais em 0.1.0 e na procedência. Aguarda revisão humana.

Decisão humana: **pendente**.

## v6-q-r01

concurso · D2 / C3 · human-review-pending

Um atlas deseja comparar a participação de cada país na área continental. A propriedade prioritária da projeção deve ser:

A. Conformidade, pois ângulos preservados garantem áreas iguais. — `v6-q-r01-d1`

Feedback: Conformidade local não implica conservação das áreas relativas.

B. Equidistância global entre todos os pares de pontos. — `v6-q-r01-d2`

Feedback: Nenhuma projeção plana preserva todas as distâncias globais dessa maneira.

C. Equivalência, com reconhecimento das deformações de forma. — `v6-q-r01-correct`

Feedback: Preservar relações de área atende à comparação solicitada e não elimina outras deformações.

D. Superfície cilíndrica, independentemente da propriedade. — `v6-q-r01-d3`

Feedback: A família de superfície não informa por si só a propriedade preservada.

E. Ausência de qualquer deformação em um mapa plano. — `v6-q-r01-d4`

Feedback: A passagem de superfície curva para plano impõe deformações.

**Gabarito candidato:** Equivalência, com reconhecimento das deformações de forma. (`v6-q-r01-correct`).

Preservar relações de área atende à comparação solicitada e não elimina outras deformações.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-r02

concurso · D2 / C3 · human-review-pending

Um ponto situado no meridiano central de seu fuso UTM tem, por convenção, qual coordenada leste?

A. 0°, sem necessidade de informar fuso. — `v6-q-r02-d1`

Feedback: UTM usa coordenadas métricas; omitir o fuso torna a posição ambígua.

B. 10.000.000 m em qualquer hemisfério. — `v6-q-r02-d2`

Feedback: 10.000.000 m refere-se à falsa coordenada norte no Equador para o hemisfério sul.

C. 15°, porque cada fuso UTM tem uma hora. — `v6-q-r02-d3`

Feedback: 15° é a base dos fusos horários; UTM tem fusos de 6°.

D. 500.000 m, com fuso, hemisfério e datum identificados. — `v6-q-r02-correct`

Feedback: A falsa coordenada evita valores leste negativos no uso convencional; a referência completa continua necessária.

E. 500.000 km, por ser um sistema global. — `v6-q-r02-d4`

Feedback: A unidade convencional é metro; trocar por km gera um fator mil.

**Gabarito candidato:** 500.000 m, com fuso, hemisfério e datum identificados. (`v6-q-r02-correct`).

A falsa coordenada evita valores leste negativos no uso convencional; a referência completa continua necessária.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-r03

concurso · D2 / C3 · human-review-pending

Para comparar incidência de uma doença entre municípios com populações muito diferentes, qual tratamento é mais adequado antes de construir um coroplético?

A. Colorir municípios pelo número absoluto de casos e chamar o resultado de risco. — `v6-q-r03-d1`

Feedback: Contagem absoluta mistura magnitude populacional e incidência; não equivale a risco relativo.

B. Dar a mesma cor a municípios de igual área territorial. — `v6-q-r03-d2`

Feedback: Área territorial não é o denominador populacional necessário nesse caso.

C. Usar o nome do município como ordem quantitativa. — `v6-q-r03-d3`

Feedback: Nomes são categorias nominais e não estabelecem magnitude da incidência.

D. Retirar a legenda para que a taxa seja inferida visualmente. — `v6-q-r03-d4`

Feedback: Sem legenda não se conhece a medida, unidade ou intervalo das classes.

E. Calcular uma taxa com denominador populacional pertinente e explicitar período e base. — `v6-q-r03-correct`

Feedback: A normalização permite comparar incidência relativa; classes, população de referência e período precisam ser declarados.

**Gabarito candidato:** Calcular uma taxa com denominador populacional pertinente e explicitar período e base. (`v6-q-r03-correct`).

A normalização permite comparar incidência relativa; classes, população de referência e período precisam ser declarados.

Nota de revisão: Classificação editorial assistida 0.1.1: Aplicação de denominador populacional e período à comparação de incidência, sem conjunto de evidências a decompor. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados.

Decisão humana: **pendente**.

## v6-q-r04

concurso · D2 / C3 · human-review-pending

Entre dois pontos há desnível de 40 m e distância horizontal de 200 m. Qual é a declividade percentual média?

A. 20%. — `v6-q-r04-correct`

Feedback: 40/200×100=20%; o denominador é a distância horizontal.

B. 5%. — `v6-q-r04-d1`

Feedback: 200/40 inverte a razão; declividade é vertical sobre horizontal.

C. 20°. — `v6-q-r04-d2`

Feedback: Percentual não é ângulo em graus; converter exige função trigonométrica.

D. 0,2%. — `v6-q-r04-d3`

Feedback: 0,2 é a razão adimensional, que deve ser multiplicada por 100 para percentual.

E. 80%. — `v6-q-r04-d4`

Feedback: O produto das medidas não define declividade e tem unidade inadequada.

**Gabarito candidato:** 20%. (`v6-q-r04-correct`).

40/200×100=20%; o denominador é a distância horizontal.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-r05

concurso · D2 / C3 · human-review-pending

Um mapa distingue tipos de rocha sem uma ordem hierárquica. Qual solução visual evita sugerir uma ordenação inexistente?

A. Sequência do muito claro ao muito escuro como se as classes fossem crescentes. — `v6-q-r05-d1`

Feedback: Valor visual sugere ordem e pode comunicar uma hierarquia que o dado não tem.

B. Matizes ou padrões distinguíveis, com legenda nominal acessível. — `v6-q-r05-correct`

Feedback: Categorias nominais pedem diferenciação; redundância por padrões ajuda pessoas com dificuldade de percepção de cor.

C. Círculos sempre maiores para cada nome em ordem alfabética. — `v6-q-r05-d2`

Feedback: Tamanho comunica magnitude, não uma ordenação arbitrária de categorias.

D. Espessura proporcional ao número de letras de cada rocha. — `v6-q-r05-d3`

Feedback: Essa grandeza não representa a variável geológica.

E. Uma única cor sem rótulos para todas as classes. — `v6-q-r05-d4`

Feedback: A ausência de distinção impede identificar a distribuição das categorias.

**Gabarito candidato:** Matizes ou padrões distinguíveis, com legenda nominal acessível. (`v6-q-r05-correct`).

Categorias nominais pedem diferenciação; redundância por padrões ajuda pessoas com dificuldade de percepção de cor.

Nota de revisão: Classificação editorial assistida 0.1.1: Aplicação de variável visual à natureza nominal do dado, com distratores amplamente elimináveis. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados.

Decisão humana: **pendente**.

## v6-q-r06

concurso · D3 / C4 · human-review-pending

Uma pirâmide etária apresenta uma faixa adulta relativamente larga em um município. Qual conclusão é sustentada apenas pela figura?

A. A migração foi necessariamente a única causa da forma. — `v6-q-r06-d1`

Feedback: Uma mesma estrutura pode decorrer de processos diferentes; a figura não isola a causa.

B. A natalidade atual é igual ao tamanho dessa faixa adulta. — `v6-q-r06-d2`

Feedback: A faixa adulta reflete coortes anteriores e outros processos, não a natalidade atual diretamente.

C. Há concentração relativa nessa faixa; explicar a causa exige outras evidências. — `v6-q-r06-correct`

Feedback: A forma descreve estrutura etária, mas migração e dinâmica de coortes exigem dados adicionais.

D. O município tem mais habitantes que todos os vizinhos. — `v6-q-r06-d3`

Feedback: Proporções etárias não informam por si só totais populacionais comparados.

E. A fonte e o período podem ser ignorados porque a forma basta. — `v6-q-r06-d4`

Feedback: Fonte, unidade, período e recorte são condições da interpretação.

**Gabarito candidato:** Há concentração relativa nessa faixa; explicar a causa exige outras evidências. (`v6-q-r06-correct`).

A forma descreve estrutura etária, mas migração e dinâmica de coortes exigem dados adicionais.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-r07

concurso · D2 / C3 · human-review-pending

Observe os dados didáticos de população e área. Para comparar densidade entre os municípios, qual combinação é correta?

**Apoio:** Municípios hipotéticos — população e área

| Município | Habitantes | Área (km²) |
| --- | --- | --- |
| A | 10.000 | 10 |
| B | 20.000 | 100 |

A. A: 100; B: 200 hab./km²; coroplético de população absoluta. — `v6-q-r07-d1`

Feedback: A densidade de A foi dividida por um fator dez; total absoluto também não é densidade.

B. A: 1.000; B: 200 hab./km²; B deve receber a classe de maior densidade. — `v6-q-r07-d2`

Feedback: Os cálculos estão corretos, mas a classe de maior densidade cabe a A.

C. A: 10.000; B: 20.000 hab./km²; tamanho dos municípios como denominador dispensável. — `v6-q-r07-d3`

Feedback: Esses são totais; faltou dividir pela área.

D. A: 1.000 hab./km²; B: 200 hab./km²; coroplético de densidade com legenda explícita. — `v6-q-r07-correct`

Feedback: 10.000/10=1.000 e 20.000/100=200; a maior população absoluta está em B, mas a densidade maior em A.

E. A e B têm a mesma densidade porque B tem mais habitantes. — `v6-q-r07-d4`

Feedback: O aumento populacional não é proporcional à diferença de área neste conjunto.

**Gabarito candidato:** A: 1.000 hab./km²; B: 200 hab./km²; coroplético de densidade com legenda explícita. (`v6-q-r07-correct`).

10.000/10=1.000 e 20.000/100=200; a maior população absoluta está em B, mas a densidade maior em A.

Nota de revisão: Classificação editorial assistida 0.1.1: Divisão direta de população por área e aplicação da normalização a um coroplético; não exige dificuldade Elite. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados.

Decisão humana: **pendente**.

## v6-q-r08

concurso · D2 / C2 · human-review-pending

Um navegador traça uma reta em Mercator para manter rumo constante. Um atlas usa Gall-Peters para comparar áreas. Avalie as escolhas:

A. A reta de Mercator será sempre o menor percurso sobre a esfera. — `v6-q-r08-d1`

Feedback: Loxodromia e ortodromia têm propriedades diferentes e não coincidem em geral.

B. Gall-Peters conserva todas as formas porque conserva áreas. — `v6-q-r08-d2`

Feedback: Equivalência é obtida com deformação de formas.

C. Mercator é equivalente e Gall-Peters é conformal. — `v6-q-r08-d3`

Feedback: As propriedades foram invertidas: Mercator preserva ângulos locais; Gall-Peters preserva relações de área.

D. A finalidade é irrelevante porque toda projeção representa o mesmo globo. — `v6-q-r08-d4`

Feedback: Representar o mesmo objeto não torna as deformações e usos intercambiáveis.

E. São coerentes com finalidades distintas; a reta de rumo constante não é necessariamente o caminho mínimo. — `v6-q-r08-correct`

Feedback: Mercator representa loxodromias por retas e Gall-Peters preserva relações de área; nenhuma elimina todos os custos geométricos.

**Gabarito candidato:** São coerentes com finalidades distintas; a reta de rumo constante não é necessariamente o caminho mínimo. (`v6-q-r08-correct`).

Mercator representa loxodromias por retas e Gall-Peters preserva relações de área; nenhuma elimina todos os custos geométricos.

Nota de revisão: Classificação editorial assistida 0.1.1: Compreensão de propriedades explícitas de Mercator e Gall-Peters e da distinção loxodromia/ortodromia. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados.

Decisão humana: **pendente**.

## v6-q-r09

elite · D3 / C4 · human-review-pending

Considere um perfil construído com escala horizontal 1:50.000 e vertical 1:10.000. Entre A e B são 200 m horizontais e 40 m de desnível. A figura de apoio é um esquema sem escala e não deve ser medida; use os valores declarados. Qual avaliação é correta?

**Apoio:** Perfil hipotético A–B — esquema sem escala; use os valores da tabela

| Ponto | Distância horizontal (m) | Altitude (m) |
| --- | --- | --- |
| A | 0 | 100 |
| B | 200 | 140 |

O traçado SVG é esquemático, sem eixos graduados e sem proporção gráfica das escalas do cálculo. Não medir distâncias ou inclinação na tela; use a tabela e as escalas declaradas no enunciado.

A. Exagero vertical de 5 vezes e declividade média real de 20%. — `v6-q-r09-correct`

Feedback: 50.000/10.000=5; a declividade deriva de 40/200 e não da inclinação aparente exagerada.

B. Exagero de 0,2 vez e declividade real de 20%. — `v6-q-r09-d1`

Feedback: A razão das escalas foi invertida; a vertical foi ampliada em relação à horizontal.

C. Exagero de 5 vezes e declividade real de 100%. — `v6-q-r09-d2`

Feedback: Multiplicar a declividade pelo exagero descreve uma aparência, não a razão física real.

D. Sem exagero e declividade de 20°. — `v6-q-r09-d3`

Feedback: As escalas são diferentes e o cálculo resulta em percentual, não graus.

E. Exagero de 5 vezes e desnível real de 200 m. — `v6-q-r09-d4`

Feedback: O desnível informado é 40 m; o exagero do desenho não altera o terreno.

**Gabarito candidato:** Exagero vertical de 5 vezes e declividade média real de 20%. (`v6-q-r09-correct`).

50.000/10.000=5; a declividade deriva de 40/200 e não da inclinação aparente exagerada.

Nota de revisão: Revisão 0.1.1: perfil identificado como esquema sem escala; dados e ID do gabarito preservados. Aprovação humana pendente.

Decisão humana: **pendente**.

## v6-q-r10

concurso · D2 / C3 · human-review-pending

Uma carta com equidistância de 20 m mostra curvas formando um V ao cruzarem um vale. As altitudes crescem na direção da ponta do V. A interpretação mais consistente é:

A. A ponta indica jusante porque o desenho se assemelha a uma seta. — `v6-q-r10-d1`

Feedback: Ler o V como seta de fluxo inverte a regra do vale.

B. A ponta do V indica montante; a água tende a escoar para altitudes menores. — `v6-q-r10-correct`

Feedback: No vale, as curvas infletem para montante; equidistância é diferença vertical entre curvas sucessivas.

C. A distância horizontal entre todas as curvas é de 20 m. — `v6-q-r10-d2`

Feedback: 20 m é intervalo vertical; espaçamento no papel depende da declividade e escala.

D. A água tende a escoar para a ponta, subindo as cotas. — `v6-q-r10-d3`

Feedback: Sem outra força, escoamento segue o gradiente para menores altitudes.

E. A forma do V prova que todas as encostas têm a mesma declividade. — `v6-q-r10-d4`

Feedback: Declividade depende de espaçamento e desnível, não apenas da forma geral.

**Gabarito candidato:** A ponta do V indica montante; a água tende a escoar para altitudes menores. (`v6-q-r10-correct`).

No vale, as curvas infletem para montante; equidistância é diferença vertical entre curvas sucessivas.

Nota de revisão: Classificação editorial assistida 0.1.1: Aplicação direta da regra do V a um vale e distinção entre intervalo vertical e distância horizontal. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados.

Decisão humana: **pendente**.

## v6-q-r11

elite · D3 / C5 · human-review-pending

Um mapa nacional de rios é ampliado para delimitar uma faixa de proteção em um lote. Qual decisão técnica deve preceder a medição?

A. Medir diretamente a linha ampliada, pois zoom melhora precisão. — `v6-q-r11-d1`

Feedback: Zoom só amplia a representação disponível, incluindo sua generalização e incerteza.

B. Retirar a generalização por um filtro de suavização. — `v6-q-r11-d2`

Feedback: Suavizar não recupera a geometria original não registrada.

C. Obter base e método compatíveis com a precisão e a finalidade, verificando escala, referência e qualidade. — `v6-q-r11-correct`

Feedback: Uma feição generalizada em escala nacional não sustenta automaticamente delimitação local ou jurídica.

D. Usar qualquer projeção equivalente, que resolve todos os erros de distância. — `v6-q-r11-d3`

Feedback: Equivalência preserva áreas e não garante toda distância nem corrige a origem da base.

E. Dispensar a fonte se o traço coincide visualmente com uma fotografia. — `v6-q-r11-d4`

Feedback: Coincidência aparente não documenta precisão, época ou método.

**Gabarito candidato:** Obter base e método compatíveis com a precisão e a finalidade, verificando escala, referência e qualidade. (`v6-q-r11-correct`).

Uma feição generalizada em escala nacional não sustenta automaticamente delimitação local ou jurídica.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-r12

elite · D4 / C5 · human-review-pending

Duas escolas têm coordenadas UTM em fusos vizinhos. Um analista subtrai seus valores E e N como se ambos pertencessem à mesma grade. Qual é a crítica correta?

A. Subtrair diretamente E e N, desde que ambas as camadas tenham o mesmo datum; o uso de metros torna as grades comparáveis. — `v6-q-r12-d1`

Feedback: O datum comum não elimina a diferença entre projeções, origens e meridianos centrais dos fusos.

B. Retirar 500.000 m de cada coordenada E e subtrair os resultados, pois essa operação unifica os eixos dos fusos vizinhos. — `v6-q-r12-d2`

Feedback: Retirar o falso leste não alinha meridianos centrais nem resolve a diferença geométrica entre grades.

C. Atribuir às duas camadas o rótulo do fuso da primeira e conservar os números, evitando uma transformação adicional. — `v6-q-r12-d3`

Feedback: Atribuir outra referência sem transformar coordenadas não é uma reprojeção e desloca a interpretação das posições.

D. Compatibilizar referências e projeções, ou usar método geodésico apropriado; as falsas origens pertencem a grades de fusos distintos. — `v6-q-r12-correct`

Feedback: Números métricos semelhantes em grades diferentes não compartilham automaticamente a mesma origem e geometria.

E. Transformar os pontos em longitude e latitude e aplicar uma conversão fixa de graus para metros, válida em qualquer latitude. — `v6-q-r12-d4`

Feedback: O comprimento de um grau de longitude varia com a latitude; a distância deve usar método e precisão adequados.

**Gabarito candidato:** Compatibilizar referências e projeções, ou usar método geodésico apropriado; as falsas origens pertencem a grades de fusos distintos. (`v6-q-r12-correct`).

Números métricos semelhantes em grades diferentes não compartilham automaticamente a mesma origem e geometria.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.
