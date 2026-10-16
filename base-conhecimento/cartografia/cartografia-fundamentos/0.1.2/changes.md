# Comparação cartografia-fundamentos: 0.1.1 → 0.1.2

Gabaritos, alternativas, identidades e originais preservados. Revisão por IA explicitamente delegada; não há promoção canônica automática.

Mudanças da rodada: 10 questões com feedbacks aprimorados; 0 reclassificação.

As diferenças completas, incluindo metadados e hashes, estão em `provenance.json#revision.changes`. Abaixo estão todos os valores de conteúdo e suporte alterados.

## `/content/missions/0/sections/2/html`

Exercício cartográfico autossuficiente, sem atribuir ao PDF histórico elementos não conferidos; conteúdo anterior preservado em 0.1.1.

Antes:
```json
"<p>Uma leitura cartográfica segura começa pelos elementos: <b>título</b> (o quê/onde/quando), <b>legenda</b> (significado dos símbolos), <b>escala</b>, <b>orientação</b> quando necessária, <b>fonte/data</b> e, em produtos técnicos, sistema de referência/projeção.</p><p>Mapas <b>políticos</b> destacam divisões territoriais; <b>físicos</b>, aspectos naturais; <b>topográficos</b>, feições planialtimétricas detalhadas; <b>temáticos</b>, a distribuição de um fenômeno específico. O tipo não substitui a leitura da legenda.</p><p>Mapas não são fotografias neutras: toda representação seleciona, generaliza e simboliza informações segundo finalidade e escala.</p><div class=\"box dia\"><span class=\"l\">Estudo com mapa real</span>Abra novamente o <a href=\"https://atlasescolar.ibge.gov.br/images/mapas/pdf/brasil-federacao-e-territorio-pontos-extremos-e-fuso-horario-p-97.pdf\" target=\"_blank\" rel=\"noopener\">mapa de fusos do IBGE</a>. Identifique título, legenda, coordenadas, escala, orientação, fonte e quatro zonas UTC. Depois explique por que os limites não seguem meridianos retos.</div><div class=\"nu\"><b>Conexão com representação do espaço.</b> O mapa informa “Projeção Policônica”. Na missão Projeções e propriedades, investigue por que toda projeção distorce algo e como reconhecer suas propriedades.</div>"
```

Depois:
```json
"<p>Uma leitura cartográfica segura começa pelos elementos: <b>título</b> (o quê/onde/quando), <b>legenda</b> (significado dos símbolos), <b>escala</b>, <b>orientação</b> quando necessária, <b>fonte/data</b> e, em produtos técnicos, sistema de referência/projeção.</p><p>Mapas <b>políticos</b> destacam divisões territoriais; <b>físicos</b>, aspectos naturais; <b>topográficos</b>, feições planialtimétricas detalhadas; <b>temáticos</b>, a distribuição de um fenômeno específico. O tipo não substitui a leitura da legenda.</p><p>Mapas não são fotografias neutras: toda representação seleciona, generaliza e simboliza informações segundo finalidade e escala.</p><figure class=\"visual\" aria-label=\"Mapa didático com alternativa textual\"><figcaption><b>Horizonte — mapa didático de um território hipotético</b></figcaption><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 610\" role=\"img\" aria-label=\"Mapa didático de Horizonte, território hipotético. Escola a sudoeste do posto de saúde, rio na linha leste 2 km e parque no noroeste. Grade de 1 km e barra de 1 km.\" style=\"display:block;width:100%;height:auto;max-width:34rem;max-height:none;margin:auto;color:inherit;background:var(--card);font-family:inherit;font-size:22px\" fill=\"currentColor\">\n<desc>Grade local em quilômetros, não latitude e longitude. Cada quadrícula tem lado de 1 km. Os dados completos e a legenda estão também em texto e tabela.</desc>\n<text x=\"40\" y=\"30\">Norte (km)</text>\n<path d=\"M40 60V380 M40 380H360\" fill=\"none\" stroke=\"currentColor\" opacity=\"0.22\"/><text x=\"40\" y=\"405\" text-anchor=\"middle\">0</text><text x=\"25\" y=\"386\" text-anchor=\"end\">0</text><path d=\"M120 60V380 M40 300H360\" fill=\"none\" stroke=\"currentColor\" opacity=\"0.22\"/><text x=\"120\" y=\"405\" text-anchor=\"middle\">1</text><text x=\"25\" y=\"306\" text-anchor=\"end\">1</text><path d=\"M200 60V380 M40 220H360\" fill=\"none\" stroke=\"currentColor\" opacity=\"0.22\"/><text x=\"200\" y=\"405\" text-anchor=\"middle\">2</text><text x=\"25\" y=\"226\" text-anchor=\"end\">2</text><path d=\"M280 60V380 M40 140H360\" fill=\"none\" stroke=\"currentColor\" opacity=\"0.22\"/><text x=\"280\" y=\"405\" text-anchor=\"middle\">3</text><text x=\"25\" y=\"146\" text-anchor=\"end\">3</text><path d=\"M360 60V380 M40 60H360\" fill=\"none\" stroke=\"currentColor\" opacity=\"0.22\"/><text x=\"360\" y=\"405\" text-anchor=\"middle\">4</text><text x=\"25\" y=\"66\" text-anchor=\"end\">4</text>\n<rect x=\"40\" y=\"60\" width=\"320\" height=\"320\" fill=\"none\" stroke=\"currentColor\"/>\n<rect data-feature=\"parque\" x=\"40\" y=\"60\" width=\"80\" height=\"120\" fill=\"currentColor\" opacity=\"0.12\"/>\n<path d=\"M40 180H120V60\" fill=\"none\" stroke=\"currentColor\" stroke-dasharray=\"2 4\"/>\n<text x=\"49\" y=\"104\" font-size=\"22\">Parque</text>\n<path data-feature=\"rio\" d=\"M200 380V60\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\" stroke-dasharray=\"9 5\"/>\n<rect data-feature=\"escola\" x=\"113\" y=\"293\" width=\"14\" height=\"14\"/>\n<text x=\"132\" y=\"294\" font-size=\"22\">Escola</text>\n<path data-feature=\"saude\" d=\"M272 140H288 M280 132V148\" stroke=\"currentColor\" stroke-width=\"4\"/>\n<text x=\"290\" y=\"128\" font-size=\"22\">Saúde</text>\n<path d=\"M389 135V85 M382 96L389 85L396 96\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/>\n<text x=\"389\" y=\"72\" text-anchor=\"middle\">N</text>\n<text x=\"280\" y=\"434\">Leste (km)</text>\n<rect x=\"40\" y=\"464\" width=\"13\" height=\"13\"/><text x=\"65\" y=\"476\">Escola</text>\n<path d=\"M226 470H242 M234 462V478\" stroke=\"currentColor\" stroke-width=\"3\"/><text x=\"252\" y=\"476\">Posto de saúde</text>\n<path d=\"M40 507H65\" stroke=\"currentColor\" stroke-width=\"4\" stroke-dasharray=\"8 4\"/><text x=\"77\" y=\"513\">Rio</text>\n<rect x=\"225\" y=\"496\" width=\"18\" height=\"18\" fill=\"currentColor\" opacity=\"0.2\"/><text x=\"252\" y=\"513\">Parque</text>\n<path d=\"M40 545V555 M40 550H120 M80 545V555 M120 545V555\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/>\n<text x=\"40\" y=\"578\" text-anchor=\"middle\">0</text><text x=\"80\" y=\"578\" text-anchor=\"middle\">0,5</text><text x=\"120\" y=\"578\" text-anchor=\"middle\">1 km</text>\n<text x=\"200\" y=\"556\" font-size=\"22\">Escala gráfica</text>\n</svg><p>Grade local em quilômetros: cada quadrícula tem lado de 1 km. Ela não representa latitude/longitude nem limites reais de municípios ou fusos.</p><div class=\"w\"><table><thead><tr><th scope=\"col\">Referência</th><th scope=\"col\">Leste (km)</th><th scope=\"col\">Norte (km)</th></tr></thead><tbody><tr><td>Escola</td><td>1</td><td>1</td></tr><tr><td>Posto de saúde</td><td>3</td><td>3</td></tr><tr><td>Rio</td><td>2</td><td>de 0 a 4</td></tr><tr><td>Parque</td><td>de 0 a 1</td><td>de 2,5 a 4</td></tr></tbody></table></div><p>A grade local usa quilômetros, com leste para a direita e norte para cima. A escola está em E=1 km, N=1 km; o posto de saúde em E=3 km, N=3 km. Um rio segue E=2 km, de N=0 a N=4 km. O parque ocupa E de 0 a 1 km e N de 2,5 a 4 km. A barra gráfica de 1 km tem o mesmo comprimento de um lado da quadrícula. Pontos, linha e área possuem símbolos e rótulos distintos. O lugar é hipotético e não delimita fusos brasileiros.</p><p class=\"source\">Elaboração didática do projeto em 16/10/2026; território e medidas hipotéticos.</p></figure><div class=\"box dia\"><span class=\"l\">Leitura com evidências</span>Identifique título, legenda, orientação, escala gráfica, grade e fonte. Localize a escola e o posto de saúde: o posto está a nordeste da escola. A escola fica 1 km a oeste do rio. Confira essas relações pela grade e pela tabela, sem depender apenas da cor dos símbolos.</div><p>O norte indicado orienta a leitura; a grade usa medidas locais em quilômetros, não graus de latitude e longitude. A barra gráfica acompanha o redimensionamento proporcional do desenho. Para áreas, cada quadrícula representa 1 km².</p><div class=\"nu\"><b>Conexão com representação do espaço.</b> Em mapas reais, leia o sistema de referência e a projeção quando informados. Se a legenda indicar, por exemplo, “Projeção Policônica”, investigue suas propriedades na missão Projeções e propriedades. Nenhuma projeção plana preserva todas as propriedades da superfície terrestre.</div><p>Exercício de escala numérica: em uma representação 1:40.000.000, 1 cm corresponde a 400 km. Essa razão pertence ao exemplo; para medir o mapa de Horizonte, use a barra gráfica apresentada com ele.</p>"
```

## `/content/missions/3/sections/1/html`

Exercício cartográfico autossuficiente, sem atribuir ao PDF histórico elementos não conferidos; conteúdo anterior preservado em 0.1.1.

Antes:
```json
"<p>O Brasil possui atualmente <b>quatro fusos horários legais</b>, de UTC−2 a UTC−5. O fuso UTC−3 reúne Brasília e grande parte da população brasileira; <b>todo o Pará está em UTC−3</b>.</p><p>Em síntese: <b>UTC−2</b> abrange ilhas oceânicas como Fernando de Noronha; <b>UTC−3</b> inclui Pará, Amapá, Tocantins, Goiás, Distrito Federal e os estados do Nordeste, Sudeste e Sul; <b>UTC−4</b> inclui Mato Grosso, Mato Grosso do Sul, Rondônia, Roraima e grande parte do Amazonas; <b>UTC−5</b> inclui Acre e parte ocidental do Amazonas.</p><div class=\"map-real\"><div class=\"map-real-head\"><div><b>Mapa real · Atlas Geográfico Escolar do IBGE</b><span>Fusos horários do Brasil · confira a data do mapa e a configuração civil nas fontes oficiais</span></div><a href=\"https://atlasescolar.ibge.gov.br/images/mapas/pdf/brasil-federacao-e-territorio-pontos-extremos-e-fuso-horario-p-97.pdf\" target=\"_blank\" rel=\"noopener\">Abrir no IBGE ↗</a></div><object data=\"https://atlasescolar.ibge.gov.br/images/mapas/pdf/brasil-federacao-e-territorio-pontos-extremos-e-fuso-horario-p-97.pdf#page=1&amp;view=FitH\" type=\"application/pdf\"><p>Seu navegador não exibiu o PDF incorporado. <a href=\"https://atlasescolar.ibge.gov.br/images/mapas/pdf/brasil-federacao-e-territorio-pontos-extremos-e-fuso-horario-p-97.pdf\" target=\"_blank\" rel=\"noopener\">Abra o mapa oficial do IBGE</a>.</p></object><p class=\"visual-cap\">Use o mapa para procurar <b>grade de coordenadas, orientação, escala 1:40.000.000, projeção e zonas UTC</b>. A imagem não é decoração: ela é parte do exercício de leitura cartográfica.</p></div><div class=\"box prova\"><span class=\"l\">Leitura do mapa real</span>Localize o Pará, identifique sua zona UTC e observe que os limites civis se ajustam a fronteiras territoriais: eles não são meras faixas geométricas de 15°.</div><p class=\"source\">Conferência da configuração civil: <a href=\"https://www.gov.br/observatorio/pt-br/assuntos/areas-de-atuacao/tempo-e-frequencia/brasil\" target=\"_blank\" rel=\"noopener\">Observatório Nacional — tabela dos estados</a>, consultada em 16/10/2026. O Pará está em UTC−3. A consulta à tabela é uma alternativa textual para conferir os fusos; o mapa continua necessário para os exercícios sobre seus elementos gráficos.</p>"
```

Depois:
```json
"<p>O Brasil possui atualmente <b>quatro fusos horários legais</b>, de UTC−2 a UTC−5. O fuso UTC−3 reúne Brasília e grande parte da população brasileira; <b>todo o Pará está em UTC−3</b>.</p><p>Em síntese: <b>UTC−2</b> abrange ilhas oceânicas como Fernando de Noronha; <b>UTC−3</b> inclui Pará, Amapá, Tocantins, Goiás, Distrito Federal e os estados do Nordeste, Sudeste e Sul; <b>UTC−4</b> inclui Mato Grosso, Mato Grosso do Sul, Rondônia, Roraima e grande parte do Amazonas; <b>UTC−5</b> inclui Acre e parte ocidental do Amazonas.</p><div class=\"w\"><table><thead><tr><th scope=\"col\">Fuso civil</th><th scope=\"col\">Exemplo no Brasil</th><th scope=\"col\">No instante em que o Pará marca 14h</th></tr></thead><tbody><tr><td>UTC−2</td><td>Fernando de Noronha</td><td>15h</td></tr><tr><td>UTC−3</td><td>Pará e Brasília</td><td>14h</td></tr><tr><td>UTC−4</td><td>Mato Grosso e Mato Grosso do Sul</td><td>13h</td></tr><tr><td>UTC−5</td><td>Acre e parte ocidental do Amazonas</td><td>12h</td></tr></tbody></table></div><div class=\"box prova\"><span class=\"l\">Leitura do território e da hora</span>Identifique a zona UTC do Pará e compare os quatro horários da tabela. Para explicar os limites civis, retome as decisões legais e as fronteiras territoriais: eles não precisam formar faixas retas de 15°. A divisão interna do Amazonas em UTC−4 e UTC−5 exige atenção à delimitação legal.</div><p class=\"source\">Fontes: <a href=\"https://www.gov.br/observatorio/pt-br/assuntos/areas-de-atuacao/tempo-e-frequencia/brasil\" target=\"_blank\" rel=\"noopener\">Observatório Nacional — tabela dos estados</a> e <a href=\"https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12876.htm\" target=\"_blank\" rel=\"noopener\">Lei nº 12.876/2013</a>, consultadas no recorte registrado em 16/10/2026. A linha resumida do Amazonas na tabela do ON não substitui a delimitação da lei.</p><p>Para ampliar a leitura cartográfica, consulte o <a href=\"https://atlasescolar.ibge.gov.br/images/mapas/pdf/brasil-federacao-e-territorio-pontos-extremos-e-fuso-horario-p-97.pdf\" target=\"_blank\" rel=\"noopener\">mapa de fusos do Atlas Geográfico Escolar do IBGE</a>. Confira a data, as zonas UTC, a projeção e a escala indicadas no próprio documento antes de utilizá-lo. Os conceitos e os cálculos desta missão podem ser estudados pela teoria e pela tabela acima.</p>"
```

## `/content/questions/38/options/0/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “planta 1:1.000”. 1:1.000 é escala muito grande e adequada a área pequena e detalhada. Detalhamento não torna uma representação neutra ou automaticamente adequada."
```

Depois:
```json
"Em 1:50.000.000, 1 cm representa 500 km. Essa escala generaliza extensas áreas e não fornece o detalhe de um lote urbano; uma planta 1:1.000 atende melhor a essa finalidade."
```

## `/content/questions/38/options/2/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “planta 1:1.000”. 1:1.000 é escala muito grande e adequada a área pequena e detalhada. Detalhamento não torna uma representação neutra ou automaticamente adequada."
```

Depois:
```json
"Em 1:2.000.000, 1 cm representa 20 km. Um mapa estadual nessa escala não sustenta a leitura detalhada de um lote, para a qual a planta 1:1.000 é mais adequada."
```

## `/content/questions/38/options/3/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “planta 1:1.000”. 1:1.000 é escala muito grande e adequada a área pequena e detalhada. Detalhamento não torna uma representação neutra ou automaticamente adequada."
```

Depois:
```json
"Em 1:20.000.000, 1 cm representa 200 km. O recorte continental e a escala pequena não permitem o detalhamento local pedido; compare com a planta 1:1.000."
```

## `/content/questions/38/reviewNotes`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente."
```

Depois:
```json
"Revisão editorial por IA 0.1.2: cada alternativa incorreta recebe explicação específica. Enunciado, opções, resposta correta e procedência preservados. Revisão conduzida pelo Codex por delegação do usuário; sem simular parecer humano."
```

## `/content/questions/39/options/0/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “explicar a correspondência entre símbolos e fenômenos”. A legenda decodifica a linguagem simbólica utilizada. Detalhamento não torna uma representação neutra ou automaticamente adequada."
```

Depois:
```json
"O datum estabelece a referência geodésica das coordenadas e deve ser identificado nas informações técnicas do produto. A legenda explica o significado de símbolos, cores e classes."
```

## `/content/questions/39/options/2/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “explicar a correspondência entre símbolos e fenômenos”. A legenda decodifica a linguagem simbólica utilizada. Detalhamento não torna uma representação neutra ou automaticamente adequada."
```

Depois:
```json
"Uma legenda de mapa de fusos pode explicar as classes de horário representadas, mas não determina o fuso civil. Essa definição depende da convenção legal e do território."
```

## `/content/questions/39/options/3/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “explicar a correspondência entre símbolos e fenômenos”. A legenda decodifica a linguagem simbólica utilizada. Detalhamento não torna uma representação neutra ou automaticamente adequada."
```

Depois:
```json
"A legenda comunica a simbologia; não modifica a transformação matemática da superfície para o plano. As deformações da projeção precisam ser avaliadas segundo sua propriedade e finalidade."
```

## `/content/questions/39/reviewNotes`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente."
```

Depois:
```json
"Revisão editorial por IA 0.1.2: cada alternativa incorreta recebe explicação específica. Enunciado, opções, resposta correta e procedência preservados. Revisão conduzida pelo Codex por delegação do usuário; sem simular parecer humano."
```

## `/content/questions/40/options/0/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “20 km”. 4 × 500.000 cm = 2.000.000 cm = 20 km. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise."
```

Depois:
```json
"Em 1:500.000, 1 cm representa 5 km. Para 4 cm, são 4 × 5 = 20 km; 2 km é um resultado dez vezes menor, decorrente de conversão incorreta."
```

## `/content/questions/40/options/2/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “20 km”. 4 × 500.000 cm = 2.000.000 cm = 20 km. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise."
```

Depois:
```json
"A conta é 4 × 500.000 = 2.000.000 cm. Dividir por 100.000 cm/km resulta em 20 km; 200 km acrescenta um fator dez."
```

## `/content/questions/40/options/3/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “20 km”. 4 × 500.000 cm = 2.000.000 cm = 20 km. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise."
```

Depois:
```json
"O produto fornece 2.000.000 cm, equivalentes a 20 km. Responder 2.000 km acrescenta um fator cem à distância correta; mantenha a unidade em cada etapa."
```

## `/content/questions/40/reviewNotes`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente."
```

Depois:
```json
"Revisão editorial por IA 0.1.2: cada alternativa incorreta recebe explicação específica. Enunciado, opções, resposta correta e procedência preservados. Revisão conduzida pelo Codex por delegação do usuário; sem simular parecer humano."
```

## `/content/questions/41/options/1/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “1:25.000”. Menor denominador significa maior escala e maior detalhe. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise."
```

Depois:
```json
"Compare as frações: 1/250.000 é dez vezes menor que 1/25.000. Portanto, 1:250.000 é a escala menor, embora seu denominador seja maior."
```

## `/content/questions/41/options/2/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “1:25.000”. Menor denominador significa maior escala e maior detalhe. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise."
```

Depois:
```json
"Os denominadores diferem por um fator dez. Para a mesma medida no papel, 1:250.000 representa dez vezes mais distância no terreno; as razões não são iguais."
```

## `/content/questions/41/options/3/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “1:25.000”. Menor denominador significa maior escala e maior detalhe. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise."
```

Depois:
```json
"As duas razões numéricas já permitem a comparação: 1/25.000 é maior que 1/250.000. A projeção importa à adequação das medidas, mas não inverte a ordem dessas frações."
```

## `/content/questions/41/reviewNotes`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente."
```

Depois:
```json
"Revisão editorial por IA 0.1.2: cada alternativa incorreta recebe explicação específica. Enunciado, opções, resposta correta e procedência preservados. Revisão conduzida pelo Codex por delegação do usuário; sem simular parecer humano."
```

## `/content/questions/42/options/0/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “ao norte do Equador e a oeste de Greenwich”. N indica norte do Equador; W indica oeste de Greenwich. Altitude é medida vertical; longitude usa outra referência."
```

Depois:
```json
"N indica norte do Equador e W indica oeste de Greenwich. Esta alternativa inverte os dois hemisférios informados em 5°N, 48°W."
```

## `/content/questions/42/options/2/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “ao norte do Equador e a oeste de Greenwich”. N indica norte do Equador; W indica oeste de Greenwich. Altitude é medida vertical; longitude usa outra referência."
```

Depois:
```json
"A posição ao norte está correta, mas W significa oeste, e não leste. Leia separadamente a letra da latitude e a da longitude."
```

## `/content/questions/42/options/3/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “ao norte do Equador e a oeste de Greenwich”. N indica norte do Equador; W indica oeste de Greenwich. Altitude é medida vertical; longitude usa outra referência."
```

Depois:
```json
"Greenwich corresponde à longitude 0°. Como o ponto tem longitude 48°W, ele está a oeste desse meridiano, não sobre ele."
```

## `/content/questions/42/reviewNotes`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente."
```

Depois:
```json
"Revisão editorial por IA 0.1.2: cada alternativa incorreta recebe explicação específica. Enunciado, opções, resposta correta e procedência preservados. Revisão conduzida pelo Codex por delegação do usuário; sem simular parecer humano."
```

## `/content/questions/43/options/0/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “do meridiano de Greenwich”. Greenwich é o meridiano de referência para longitudes. Latitude não mede leste/oeste; software pode usar longitude antes da latitude."
```

Depois:
```json
"O Equador é o paralelo de latitude 0° e referencia a medida norte–sul. A longitude mede a posição leste–oeste a partir de Greenwich."
```

## `/content/questions/43/options/1/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “do meridiano de Greenwich”. Greenwich é o meridiano de referência para longitudes. Latitude não mede leste/oeste; software pode usar longitude antes da latitude."
```

Depois:
```json
"O Trópico de Capricórnio é um paralelo do Hemisfério Sul, não o meridiano de origem das longitudes. A referência pedida é Greenwich, longitude 0°."
```

## `/content/questions/43/options/3/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “do meridiano de Greenwich”. Greenwich é o meridiano de referência para longitudes. Latitude não mede leste/oeste; software pode usar longitude antes da latitude."
```

Depois:
```json
"O polo Norte corresponde a 90°N de latitude. A origem da longitude é um meridiano, Greenwich; o polo não substitui essa referência angular."
```

## `/content/questions/43/reviewNotes`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente."
```

Depois:
```json
"Revisão editorial por IA 0.1.2: cada alternativa incorreta recebe explicação específica. Enunciado, opções, resposta correta e procedência preservados. Revisão conduzida pelo Codex por delegação do usuário; sem simular parecer humano."
```

## `/content/questions/44/options/0/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “3 h”. 45 ÷ 15 = 3 horas. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas."
```

Depois:
```json
"Uma hora corresponde aproximadamente a 15° no modelo solar. Para a diferença de 45° indicada, a operação correta é 45/15 = 3 horas."
```

## `/content/questions/44/options/1/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “3 h”. 45 ÷ 15 = 3 horas. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas."
```

Depois:
```json
"Duas horas corresponderiam a 30°. Como a diferença dada é 45°, divida por 15° por hora e obtenha 3 horas."
```

## `/content/questions/44/options/3/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “3 h”. 45 ÷ 15 = 3 horas. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas."
```

Depois:
```json
"Quatro horas corresponderiam a 60°. Para 45°, a diferença solar aproximada é 3 horas; a divisão é por 15, não uma contagem arbitrária de localidades."
```

## `/content/questions/44/reviewNotes`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente."
```

Depois:
```json
"Revisão editorial por IA 0.1.2: cada alternativa incorreta recebe explicação específica. Enunciado, opções, resposta correta e procedência preservados. Revisão conduzida pelo Codex por delegação do usuário; sem simular parecer humano."
```

## `/content/questions/45/options/0/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “adiantado”. O movimento aparente do Sol e a rotação terrestre fazem os horários avançarem para leste. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas."
```

Depois:
```json
"No modelo ideal, a Terra gira de oeste para leste e os lugares a leste alcançam antes a mesma referência solar. Seus horários ficam adiantados, não atrasados, em relação a Greenwich."
```

## `/content/questions/45/options/2/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “adiantado”. O movimento aparente do Sol e a rotação terrestre fazem os horários avançarem para leste. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas."
```

Depois:
```json
"Localidades podem compartilhar uma hora civil por decisão legal, mas isso não é necessário para qualquer ponto a leste. O modelo geométrico do enunciado relaciona avanço para leste a adiantamento horário."
```

## `/content/questions/45/options/3/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Distrator. A alternativa correta é “adiantado”. O movimento aparente do Sol e a rotação terrestre fazem os horários avançarem para leste. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas."
```

Depois:
```json
"A longitude tem relação geométrica com a hora: 360° em aproximadamente 24 horas fundamentam 15° por hora. Ajustes dos fusos civis não eliminam essa relação."
```

## `/content/questions/45/reviewNotes`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente."
```

Depois:
```json
"Revisão editorial por IA 0.1.2: cada alternativa incorreta recebe explicação específica. Enunciado, opções, resposta correta e procedência preservados. Revisão conduzida pelo Codex por delegação do usuário; sem simular parecer humano."
```

## `/content/questions/46/options/0/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Não é a melhor resposta. O conceito pedido aponta para 2,5 km. 1 cm × 250.000 = 250.000 cm = 2.500 m = 2,5 km. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise."
```

Depois:
```json
"1 cm corresponde a 250.000 cm, ou 2.500 m. Responder 250 m perde um fator dez na conversão; o resultado correto é 2,5 km."
```

## `/content/questions/46/options/2/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Não é a melhor resposta. O conceito pedido aponta para 2,5 km. 1 cm × 250.000 = 250.000 cm = 2.500 m = 2,5 km. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise."
```

Depois:
```json
"250.000 cm / 100.000 cm por km = 2,5 km. O valor 25 km é dez vezes maior que a distância representada por 1 cm nessa escala."
```

## `/content/questions/46/options/3/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Não é a melhor resposta. O conceito pedido aponta para 2,5 km. 1 cm × 250.000 = 250.000 cm = 2.500 m = 2,5 km. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise."
```

Depois:
```json
"A escala usa 250.000 centímetros no terreno para cada centímetro no mapa, não 250 quilômetros. A conversão resulta em 2,5 km; 250 km acrescenta um fator cem."
```

## `/content/questions/46/reviewNotes`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente."
```

Depois:
```json
"Revisão editorial por IA 0.1.2: cada alternativa incorreta recebe explicação específica. Enunciado, opções, resposta correta e procedência preservados. Revisão conduzida pelo Codex por delegação do usuário; sem simular parecer humano."
```

## `/content/questions/47/options/0/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Não atende ao comando. A resposta correta é “15 km”. 6 × 250.000 cm = 1.500.000 cm = 15 km. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise."
```

Depois:
```json
"Em 1:250.000, cada centímetro representa 2,5 km. Para 6 cm, 6 × 2,5 = 15 km; 1,5 km é dez vezes menor."
```

## `/content/questions/47/options/2/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Não atende ao comando. A resposta correta é “15 km”. 6 × 250.000 cm = 1.500.000 cm = 15 km. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise."
```

Depois:
```json
"6 × 250.000 = 1.500.000 cm. A conversão para quilômetros divide por 100.000, produzindo 15 km; 150 km acrescenta um fator dez."
```

## `/content/questions/47/options/3/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Não atende ao comando. A resposta correta é “15 km”. 6 × 250.000 cm = 1.500.000 cm = 15 km. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise."
```

Depois:
```json
"1.500.000 cm equivalem a 15 km. Responder 1.500 km deixa o resultado cem vezes maior; confira a relação 1 km = 100.000 cm."
```

## `/content/questions/47/options/4/feedback`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"Não atende ao comando. A resposta correta é “15 km”. 6 × 250.000 cm = 1.500.000 cm = 15 km. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise."
```

Depois:
```json
"0,15 km são 150 m, mas cada centímetro do mapa já representa 2.500 m. Para 6 cm, a distância é 15 km, cem vezes maior que esta alternativa."
```

## `/content/questions/47/reviewNotes`

Explicação específica do distrator ou reclassificação editorial; enunciados, opções e gabaritos preservados.

Antes:
```json
"KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente."
```

Depois:
```json
"Revisão editorial por IA 0.1.2: cada alternativa incorreta recebe explicação específica. Enunciado, opções, resposta correta e procedência preservados. Revisão conduzida pelo Codex por delegação do usuário; sem simular parecer humano."
```

## `/support/visuals/1`

Exercício cartográfico autossuficiente, sem atribuir ao PDF histórico elementos não conferidos; conteúdo anterior preservado em 0.1.1.

Antes:
```json
null
```

Depois:
```json
{
  "id": "mapa-leitura-horizonte",
  "kind": "schematic-map",
  "resource_ids": [
    "v6-theory-t02-14"
  ],
  "caption": "Horizonte — mapa didático de um território hipotético",
  "illustrative": true,
  "author": "Elaboração didática do projeto em 16/10/2026; território e medidas hipotéticos.",
  "transcript": "A grade local usa quilômetros, com leste para a direita e norte para cima. A escola está em E=1 km, N=1 km; o posto de saúde em E=3 km, N=3 km. Um rio segue E=2 km, de N=0 a N=4 km. O parque ocupa E de 0 a 1 km e N de 2,5 a 4 km. A barra gráfica de 1 km tem o mesmo comprimento de um lado da quadrícula. Pontos, linha e área possuem símbolos e rótulos distintos. O lugar é hipotético e não delimita fusos brasileiros.",
  "crs": {
    "kind": "local-cartesian",
    "unit": "km",
    "east": "positive-x",
    "north": "positive-y",
    "geodetic_datum": null
  },
  "extent": [
    0,
    0,
    4,
    4
  ],
  "rendering": {
    "origin": [
      40,
      380
    ],
    "units_per_km": 80,
    "view_box": [
      0,
      0,
      420,
      610
    ]
  },
  "features": [
    {
      "id": "escola",
      "label": "Escola",
      "geometry": "point",
      "coordinates": [
        1,
        1
      ],
      "symbol": "square"
    },
    {
      "id": "saude",
      "label": "Posto de saúde",
      "geometry": "point",
      "coordinates": [
        3,
        3
      ],
      "symbol": "cross"
    },
    {
      "id": "rio",
      "label": "Rio",
      "geometry": "line",
      "coordinates": [
        [
          2,
          0
        ],
        [
          2,
          4
        ]
      ],
      "symbol": "dashed-line"
    },
    {
      "id": "parque",
      "label": "Parque",
      "geometry": "polygon",
      "coordinates": [
        [
          0,
          2.5
        ],
        [
          1,
          2.5
        ],
        [
          1,
          4
        ],
        [
          0,
          4
        ]
      ],
      "symbol": "shaded-area"
    }
  ],
  "scale_bar": {
    "from": [
      40,
      550
    ],
    "to": [
      120,
      550
    ],
    "distance_km": 1,
    "subdivision_km": 0.5
  },
  "heads": [
    "Referência",
    "Leste (km)",
    "Norte (km)"
  ],
  "rows": [
    [
      "Escola",
      1,
      1
    ],
    [
      "Posto de saúde",
      3,
      3
    ],
    [
      "Rio",
      "2",
      "de 0 a 4"
    ],
    [
      "Parque",
      "de 0 a 1",
      "de 2,5 a 4"
    ]
  ],
  "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 610\" role=\"img\" aria-label=\"Mapa didático de Horizonte, território hipotético. Escola a sudoeste do posto de saúde, rio na linha leste 2 km e parque no noroeste. Grade de 1 km e barra de 1 km.\" style=\"display:block;width:100%;height:auto;max-width:34rem;max-height:none;margin:auto;color:inherit;background:var(--card);font-family:inherit;font-size:22px\" fill=\"currentColor\">\n<desc>Grade local em quilômetros, não latitude e longitude. Cada quadrícula tem lado de 1 km. Os dados completos e a legenda estão também em texto e tabela.</desc>\n<text x=\"40\" y=\"30\">Norte (km)</text>\n<path d=\"M40 60V380 M40 380H360\" fill=\"none\" stroke=\"currentColor\" opacity=\"0.22\"/><text x=\"40\" y=\"405\" text-anchor=\"middle\">0</text><text x=\"25\" y=\"386\" text-anchor=\"end\">0</text><path d=\"M120 60V380 M40 300H360\" fill=\"none\" stroke=\"currentColor\" opacity=\"0.22\"/><text x=\"120\" y=\"405\" text-anchor=\"middle\">1</text><text x=\"25\" y=\"306\" text-anchor=\"end\">1</text><path d=\"M200 60V380 M40 220H360\" fill=\"none\" stroke=\"currentColor\" opacity=\"0.22\"/><text x=\"200\" y=\"405\" text-anchor=\"middle\">2</text><text x=\"25\" y=\"226\" text-anchor=\"end\">2</text><path d=\"M280 60V380 M40 140H360\" fill=\"none\" stroke=\"currentColor\" opacity=\"0.22\"/><text x=\"280\" y=\"405\" text-anchor=\"middle\">3</text><text x=\"25\" y=\"146\" text-anchor=\"end\">3</text><path d=\"M360 60V380 M40 60H360\" fill=\"none\" stroke=\"currentColor\" opacity=\"0.22\"/><text x=\"360\" y=\"405\" text-anchor=\"middle\">4</text><text x=\"25\" y=\"66\" text-anchor=\"end\">4</text>\n<rect x=\"40\" y=\"60\" width=\"320\" height=\"320\" fill=\"none\" stroke=\"currentColor\"/>\n<rect data-feature=\"parque\" x=\"40\" y=\"60\" width=\"80\" height=\"120\" fill=\"currentColor\" opacity=\"0.12\"/>\n<path d=\"M40 180H120V60\" fill=\"none\" stroke=\"currentColor\" stroke-dasharray=\"2 4\"/>\n<text x=\"49\" y=\"104\" font-size=\"22\">Parque</text>\n<path data-feature=\"rio\" d=\"M200 380V60\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\" stroke-dasharray=\"9 5\"/>\n<rect data-feature=\"escola\" x=\"113\" y=\"293\" width=\"14\" height=\"14\"/>\n<text x=\"132\" y=\"294\" font-size=\"22\">Escola</text>\n<path data-feature=\"saude\" d=\"M272 140H288 M280 132V148\" stroke=\"currentColor\" stroke-width=\"4\"/>\n<text x=\"290\" y=\"128\" font-size=\"22\">Saúde</text>\n<path d=\"M389 135V85 M382 96L389 85L396 96\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/>\n<text x=\"389\" y=\"72\" text-anchor=\"middle\">N</text>\n<text x=\"280\" y=\"434\">Leste (km)</text>\n<rect x=\"40\" y=\"464\" width=\"13\" height=\"13\"/><text x=\"65\" y=\"476\">Escola</text>\n<path d=\"M226 470H242 M234 462V478\" stroke=\"currentColor\" stroke-width=\"3\"/><text x=\"252\" y=\"476\">Posto de saúde</text>\n<path d=\"M40 507H65\" stroke=\"currentColor\" stroke-width=\"4\" stroke-dasharray=\"8 4\"/><text x=\"77\" y=\"513\">Rio</text>\n<rect x=\"225\" y=\"496\" width=\"18\" height=\"18\" fill=\"currentColor\" opacity=\"0.2\"/><text x=\"252\" y=\"513\">Parque</text>\n<path d=\"M40 545V555 M40 550H120 M80 545V555 M120 545V555\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/>\n<text x=\"40\" y=\"578\" text-anchor=\"middle\">0</text><text x=\"80\" y=\"578\" text-anchor=\"middle\">0,5</text><text x=\"120\" y=\"578\" text-anchor=\"middle\">1 km</text>\n<text x=\"200\" y=\"556\" font-size=\"22\">Escala gráfica</text>\n</svg>"
}
```

## `/support/media/0/access_note`

Exercício cartográfico autossuficiente, sem atribuir ao PDF histórico elementos não conferidos; conteúdo anterior preservado em 0.1.1.

Antes:
```json
"A navegação não abriu o PDF e o ambiente de execução bloqueou o acesso no proxy (403). O estado HTTP do endpoint não foi determinado; não foi declarado quebrado nem substituído por imagem não conferida."
```

Depois:
```json
"PDF histórico preservado como referência complementar. Acesso não concluído; não se atribui ao arquivo grade, projeção ou escala não conferidas. O exercício obrigatório usa mapa autoral com coordenadas e escala gráfica explícitas; os fusos civis são sustentados pelo ON e pela lei."
```

## `/support/media/0/role`

Exercício cartográfico autossuficiente, sem atribuir ao PDF histórico elementos não conferidos; conteúdo anterior preservado em 0.1.1.

Antes:
```json
null
```

Depois:
```json
"optional-legacy-reference"
```

## `/support/media/0/required_for_learning`

Exercício cartográfico autossuficiente, sem atribuir ao PDF histórico elementos não conferidos; conteúdo anterior preservado em 0.1.1.

Antes:
```json
null
```

Depois:
```json
false
```

## `/support/media/0/active_embed`

Exercício cartográfico autossuficiente, sem atribuir ao PDF histórico elementos não conferidos; conteúdo anterior preservado em 0.1.1.

Antes:
```json
null
```

Depois:
```json
false
```

## `/support/media/0/alternative_support`

Exercício cartográfico autossuficiente, sem atribuir ao PDF histórico elementos não conferidos; conteúdo anterior preservado em 0.1.1.

Antes:
```json
null
```

Depois:
```json
"mapa-leitura-horizonte"
```

## `/support/media/1/access_note`

Exercício cartográfico autossuficiente, sem atribuir ao PDF histórico elementos não conferidos; conteúdo anterior preservado em 0.1.1.

Antes:
```json
"A navegação não abriu o PDF e o ambiente de execução bloqueou o acesso no proxy (403). O estado HTTP do endpoint não foi determinado; não foi declarado quebrado nem substituído por imagem não conferida."
```

Depois:
```json
"PDF histórico preservado como referência complementar. Acesso não concluído; não se atribui ao arquivo grade, projeção ou escala não conferidas. O exercício obrigatório usa mapa autoral com coordenadas e escala gráfica explícitas; os fusos civis são sustentados pelo ON e pela lei."
```

## `/support/media/1/role`

Exercício cartográfico autossuficiente, sem atribuir ao PDF histórico elementos não conferidos; conteúdo anterior preservado em 0.1.1.

Antes:
```json
null
```

Depois:
```json
"optional-legacy-reference"
```

## `/support/media/1/required_for_learning`

Exercício cartográfico autossuficiente, sem atribuir ao PDF histórico elementos não conferidos; conteúdo anterior preservado em 0.1.1.

Antes:
```json
null
```

Depois:
```json
false
```

## `/support/media/1/active_embed`

Exercício cartográfico autossuficiente, sem atribuir ao PDF histórico elementos não conferidos; conteúdo anterior preservado em 0.1.1.

Antes:
```json
null
```

Depois:
```json
false
```

## `/support/media/1/alternative_support`

Exercício cartográfico autossuficiente, sem atribuir ao PDF histórico elementos não conferidos; conteúdo anterior preservado em 0.1.1.

Antes:
```json
null
```

Depois:
```json
"mapa-leitura-horizonte"
```

Total de diferenças declaradas: 69. A edição 0.1.1 permanece disponível integralmente. Nenhum progresso ou XP foi migrado.
