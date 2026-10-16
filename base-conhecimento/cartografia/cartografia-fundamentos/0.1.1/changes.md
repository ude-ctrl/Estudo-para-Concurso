# Mudanças — cartografia-fundamentos 0.1.0 → 0.1.1

Revisão assistida, sem promoção canônica. Edição de origem preservada; gabaritos e IDs de recursos mantidos.

## Vínculos corrigidos

| Item | Antes | Depois | Justificativa |
| --- | --- | --- | --- |
| `v6-fix-4c42e2e9b5d093a7` | `escalas-e-medidas` / `redimensionamento` | `escalas-e-medidas` / `escala` | O comando trata do procedimento geral de escala, não de redimensionamento. |
| `v6-fix-3735d553a70c574c` | `coordenadas-gms` / `latitude` | `coordenadas-gms` / `longitude` | A diferença cobrada é leste/oeste entre longitudes. |
| `v6-fix-ae06798f90e822d3` | `coordenadas-gms` / `latitude` | `coordenadas-gms` / `gms` | A operação central é converter minutos de arco e aplicar sinal oeste. |
| `v6-vf-ed85f8a4e29b84b6` | `coordenadas-gms` / `latitude` | `coordenadas-gms` / `gms` | Conversão entre minutos e segundos de arco. |
| `v6-vf-5f14c1fe1dd5d149` | `coordenadas-gms` / `latitude` | `coordenadas-gms` / `gms` | Conversão sexagesimal para graus decimais. |
| `v6-vf-4de26d6a6d22ba10` | `coordenadas-gms` / `latitude` | `coordenadas-gms` / `gms` | Conversão sexagesimal para graus decimais. |
| `v6-vf-dbf4f96d27078992` | `coordenadas-gms` / `latitude` | `coordenadas-gms` / `gms` | Conversão de GMS, com sinal do hemisfério. |
| `v6-vf-2552ea56a33202b6` | `coordenadas-gms` / `latitude` | `coordenadas-gms` / `gms` | Conversão de GMS, com sinal oeste. |
| `v6-vf-21917d1867c75d57` | `coordenadas-gms` / `gms` | `escalas-e-medidas` / `escala` | Unidades de cálculo de escala foram associadas à missão de coordenadas. |
| `v6-vf-2ad33e2a415f1868` | `coordenadas-gms` / `gms` | `escalas-e-medidas` / `escala` | Unidades de cálculo de escala foram associadas à missão de coordenadas. |

## Classificações reavaliadas

| Item | Antes | Depois | Motivo |
| --- | --- | --- | --- |
| `v6-q-f05` | concurso, D2/C4 | concurso, D2/C3 | Aplicação da escolha entre planta, carta e mapa em situação escolar. O comando não exige decompor evidências para C4. |
| `v6-q-f08` | elite, D3/C4 | concurso, D2/C3 | Aplicação direta de sinais e eixos da tabela de coordenadas; distratores distantes do nível Elite. |
| `v6-q-f12` | elite, D3/C4 | concurso, D2/C2 | Compreensão da distinção entre abrangência analítica e razão métrica; a distinção já conduz à resposta sem integração difícil. |

Sem calibração psicométrica. Texto e gabarito desses dez itens foram preservados; os feedbacks e os recursos visuais alterados em outros itens constam abaixo.

## Comparação completa de campos editoriais

Os valores completos de cada diferença estão no registro estruturado `provenance.json#revision.changes`. A lista seguinte mostra todos os campos de conteúdo e suporte alterados, com valores anteriores e novos. Atualizações derivadas de metadados/hashes também estão no JSON.

### `v6-theory-t02-0` — `/content/missions/0/sections/1/html`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"<p>A FGV costuma cobrar Cartografia por <b>aplicação</b>: comparar coordenadas, localizar pontos, calcular distância, interpretar fusos e reconhecer o efeito do denominador da escala. A teoria é curta; o erro geralmente nasce de <b>sinal, unidade, direção ou proporção</b>.</p><div class=\"w\"><table><tbody><tr><th>Sinal no enunciado</th><th>Pense primeiro em</th><th>Pegadinha</th></tr><tr><td>23° S / 47° W</td><td>hemisférios + posição relativa</td><td>trocar latitude por longitude</td></tr><tr><td>graus, minutos, segundos</td><td>D + M/60 + S/3600</td><td>usar base 100</td></tr><tr><td>diferença de longitude</td><td>15° = 1 h</td><td>errar leste/oeste</td></tr><tr><td>1:25.000</td><td>mesma unidade nos dois lados</td><td>achar que denominador maior = escala maior</td></tr><tr><td>escala gráfica</td><td>medida visual</td><td>esquecer que ela acompanha redimensionamento</td></tr><tr><td>mapa sem norte no topo</td><td>orientação indicada</td><td>assumir convenção como regra natural</td></tr></tbody></table></div><div class=\"box prova\"><span class=\"l\">Como a banca cobra</span>Em Cartografia, a alternativa errada costuma parecer plausível porque acerta o conceito e erra <b>uma operação</b>: sinal, conversão, direção, unidade ou relação inversa.</div>"
```

Depois:
```json
"<p>O treino autoral desta unidade aborda Cartografia por <b>aplicação</b>: comparar coordenadas, localizar pontos, calcular distância, interpretar fusos e reconhecer o efeito do denominador da escala. Nesta sequência, os erros de aplicação examinados envolvem <b>sinal, unidade, direção ou proporção</b>.</p><div class=\"w\"><table><tbody><tr><th>Sinal no enunciado</th><th>Pense primeiro em</th><th>Pegadinha</th></tr><tr><td>23° S / 47° W</td><td>hemisférios + posição relativa</td><td>trocar latitude por longitude</td></tr><tr><td>graus, minutos, segundos</td><td>D + M/60 + S/3600</td><td>usar base 100</td></tr><tr><td>diferença de longitude</td><td>15° = 1 h</td><td>errar leste/oeste</td></tr><tr><td>1:25.000</td><td>mesma unidade nos dois lados</td><td>achar que denominador maior = escala maior</td></tr><tr><td>escala gráfica</td><td>medida visual</td><td>esquecer que ela acompanha redimensionamento</td></tr><tr><td>mapa sem norte no topo</td><td>orientação indicada</td><td>assumir convenção como regra natural</td></tr></tbody></table></div><div class=\"box prova\"><span class=\"l\">Aplicação no treino autoral</span>Em Cartografia, um distrator pode parecer plausível quando acerta o conceito e erra <b>uma operação</b>: sinal, conversão, direção, unidade ou relação inversa.</div>"
```

### `v6-theory-t02-3` — `/content/missions/2/sections/1/html`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"<p><b>Latitude</b> é a distância angular entre um ponto e o plano do Equador, variando de <b>0° a 90°</b> para Norte (N) ou Sul (S). Em coordenadas decimais, por convenção usual, latitudes ao norte são positivas e ao sul negativas.</p><p>Pontos no mesmo paralelo têm a mesma latitude. Quanto maior o valor absoluto da latitude, maior o afastamento do Equador em direção aos polos.</p><p>Para comparar dois pontos no Hemisfério Sul, cuidado: <b>menor valor absoluto</b> significa mais ao norte. Ex.: 10°S está ao norte de 25°S.</p><div class=\"box prova\"><span class=\"l\">Como a banca cobra</span>Uma tabela com municípios permite ordenar norte/sul sem mapa. Basta comparar latitudes e respeitar o hemisfério.</div>"
```

Depois:
```json
"<p><b>Latitude</b> é a distância angular entre um ponto e o plano do Equador, variando de <b>0° a 90°</b> para Norte (N) ou Sul (S). Em coordenadas decimais, por convenção usual, latitudes ao norte são positivas e ao sul negativas.</p><p>Pontos no mesmo paralelo têm a mesma latitude. Quanto maior o valor absoluto da latitude, maior o afastamento do Equador em direção aos polos.</p><p>Para comparar dois pontos no Hemisfério Sul, cuidado: <b>menor valor absoluto</b> significa mais ao norte. Ex.: 10°S está ao norte de 25°S.</p><div class=\"box prova\"><span class=\"l\">Aplicação no treino autoral</span>Uma tabela com municípios permite ordenar norte/sul sem mapa. Basta comparar latitudes e respeitar o hemisfério.</div>"
```

### `v6-theory-t02-5` — `/content/missions/2/sections/3/html`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"<p>Uma posição horizontal é expressa pelo par <b>latitude + longitude</b>. A ordem mais comum em Geografia é latitude primeiro e longitude depois, mas sistemas digitais podem apresentar outras convenções: leia o rótulo.</p><p>Exemplo: <b>23°32′S, 46°38′W</b>. O primeiro valor posiciona o ponto ao sul do Equador; o segundo, a oeste de Greenwich. A <b>altitude</b> é uma terceira dimensão, vertical, e não deve ser confundida com latitude.</p><p>Em tabelas de coordenadas, você pode comparar posição relativa sem desenhar o mapa: latitude ordena norte/sul; longitude ordena leste/oeste.</p><div class=\"box prova\"><span class=\"l\">Radar de prova</span>A FGV já apresentou tabelas de municípios e pediu relações espaciais a partir de latitude/longitude. Leia primeiro os hemisférios, depois compare os valores.</div>"
```

Depois:
```json
"<p>Uma posição horizontal é expressa pelo par <b>latitude + longitude</b>. A ordem mais comum em Geografia é latitude primeiro e longitude depois, mas sistemas digitais podem apresentar outras convenções: leia o rótulo.</p><p>Exemplo: <b>23°32′S, 46°38′W</b>. O primeiro valor posiciona o ponto ao sul do Equador; o segundo, a oeste de Greenwich. A <b>altitude</b> é uma terceira dimensão, vertical, e não deve ser confundida com latitude.</p><p>Em tabelas de coordenadas, você pode comparar posição relativa sem desenhar o mapa: latitude ordena norte/sul; longitude ordena leste/oeste.</p><div class=\"box prova\"><span class=\"l\">Radar de prova</span>Um exercício autoral pode usar tabelas de municípios para explorar relações espaciais a partir de latitude/longitude. Leia primeiro os hemisférios, depois compare os valores.</div>"
```

### `v6-theory-t02-6` — `/content/missions/2/sections/4/html`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"<p>Na notação sexagesimal: <b>1° = 60′</b> e <b>1′ = 60″</b>. Para converter graus-minutos-segundos (GMS) em graus decimais:</p><div class=\"nu\"><b>Decimal = graus + minutos/60 + segundos/3600.</b><br>Depois aplique o sinal: Sul e Oeste normalmente negativos.</div><p>Exemplo: 20°45′00″S = −(20 + 45/60) = <b>−20,75°</b>. Para voltar de decimal a GMS, separe a parte inteira; multiplique a parte decimal por 60 para obter minutos e repita para segundos.</p><p>Não confunda <b>20°30′</b> com 20,30°. Como 30′ = 0,5°, o valor correto é <b>20,5°</b>.</p><div class=\"box prova\"><span class=\"l\">Como a banca cobra</span>Conversão de coordenadas é uma questão curta com alto risco de erro por base 100, sinal ou arredondamento.</div>"
```

Depois:
```json
"<p>Na notação sexagesimal: <b>1° = 60′</b> e <b>1′ = 60″</b>. Para converter graus-minutos-segundos (GMS) em graus decimais:</p><div class=\"nu\"><b>Decimal = graus + minutos/60 + segundos/3600.</b><br>Depois aplique o sinal: Sul e Oeste normalmente negativos.</div><p>Exemplo: 20°45′00″S = −(20 + 45/60) = <b>−20,75°</b>. Para voltar de decimal a GMS, separe a parte inteira; multiplique a parte decimal por 60 para obter minutos e repita para segundos.</p><p>Não confunda <b>20°30′</b> com 20,30°. Como 30′ = 0,5°, o valor correto é <b>20,5°</b>.</p><div class=\"box prova\"><span class=\"l\">Aplicação no treino autoral</span>Conversão de coordenadas é uma questão curta com alto risco de erro por base 100, sinal ou arredondamento.</div>"
```

### `v6-theory-t02-8` — `/content/missions/3/sections/1/html`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"<p>O Brasil possui atualmente <b>quatro fusos horários legais</b>, de UTC−2 a UTC−5. O fuso UTC−3 reúne Brasília e grande parte da população brasileira; <b>todo o Pará está em UTC−3</b>.</p><p>Em síntese: <b>UTC−2</b> abrange ilhas oceânicas como Fernando de Noronha; <b>UTC−3</b> inclui Pará, Amapá, Tocantins, Goiás, Distrito Federal e os estados do Nordeste, Sudeste e Sul; <b>UTC−4</b> inclui Mato Grosso, Mato Grosso do Sul, Rondônia, Roraima e grande parte do Amazonas; <b>UTC−5</b> inclui Acre e parte ocidental do Amazonas.</p><div class=\"map-real\"><div class=\"map-real-head\"><div><b>Mapa real · Atlas Geográfico Escolar do IBGE</b><span>Fusos horários do Brasil · referência atual baseada na Lei 12.876/2013</span></div><a href=\"https://atlasescolar.ibge.gov.br/images/mapas/pdf/brasil-federacao-e-territorio-pontos-extremos-e-fuso-horario-p-97.pdf\" target=\"_blank\" rel=\"noopener\">Abrir no IBGE ↗</a></div><object data=\"https://atlasescolar.ibge.gov.br/images/mapas/pdf/brasil-federacao-e-territorio-pontos-extremos-e-fuso-horario-p-97.pdf#page=1&amp;view=FitH\" type=\"application/pdf\"><p>Seu navegador não exibiu o PDF incorporado. <a href=\"https://atlasescolar.ibge.gov.br/images/mapas/pdf/brasil-federacao-e-territorio-pontos-extremos-e-fuso-horario-p-97.pdf\" target=\"_blank\" rel=\"noopener\">Abra o mapa oficial do IBGE</a>.</p></object><p class=\"visual-cap\">Use o mapa para procurar <b>grade de coordenadas, orientação, escala 1:40.000.000, projeção e zonas UTC</b>. A imagem não é decoração: ela é parte do exercício de leitura cartográfica.</p></div><div class=\"box prova\"><span class=\"l\">Leitura do mapa real</span>Localize o Pará, identifique sua zona UTC e observe que os limites civis se ajustam a fronteiras territoriais: eles não são meras faixas geométricas de 15°.</div>"
```

Depois:
```json
"<p>O Brasil possui atualmente <b>quatro fusos horários legais</b>, de UTC−2 a UTC−5. O fuso UTC−3 reúne Brasília e grande parte da população brasileira; <b>todo o Pará está em UTC−3</b>.</p><p>Em síntese: <b>UTC−2</b> abrange ilhas oceânicas como Fernando de Noronha; <b>UTC−3</b> inclui Pará, Amapá, Tocantins, Goiás, Distrito Federal e os estados do Nordeste, Sudeste e Sul; <b>UTC−4</b> inclui Mato Grosso, Mato Grosso do Sul, Rondônia, Roraima e grande parte do Amazonas; <b>UTC−5</b> inclui Acre e parte ocidental do Amazonas.</p><div class=\"map-real\"><div class=\"map-real-head\"><div><b>Mapa real · Atlas Geográfico Escolar do IBGE</b><span>Fusos horários do Brasil · confira a data do mapa e a configuração civil nas fontes oficiais</span></div><a href=\"https://atlasescolar.ibge.gov.br/images/mapas/pdf/brasil-federacao-e-territorio-pontos-extremos-e-fuso-horario-p-97.pdf\" target=\"_blank\" rel=\"noopener\">Abrir no IBGE ↗</a></div><object data=\"https://atlasescolar.ibge.gov.br/images/mapas/pdf/brasil-federacao-e-territorio-pontos-extremos-e-fuso-horario-p-97.pdf#page=1&amp;view=FitH\" type=\"application/pdf\"><p>Seu navegador não exibiu o PDF incorporado. <a href=\"https://atlasescolar.ibge.gov.br/images/mapas/pdf/brasil-federacao-e-territorio-pontos-extremos-e-fuso-horario-p-97.pdf\" target=\"_blank\" rel=\"noopener\">Abra o mapa oficial do IBGE</a>.</p></object><p class=\"visual-cap\">Use o mapa para procurar <b>grade de coordenadas, orientação, escala 1:40.000.000, projeção e zonas UTC</b>. A imagem não é decoração: ela é parte do exercício de leitura cartográfica.</p></div><div class=\"box prova\"><span class=\"l\">Leitura do mapa real</span>Localize o Pará, identifique sua zona UTC e observe que os limites civis se ajustam a fronteiras territoriais: eles não são meras faixas geométricas de 15°.</div><p class=\"source\">Conferência da configuração civil: <a href=\"https://www.gov.br/observatorio/pt-br/assuntos/areas-de-atuacao/tempo-e-frequencia/brasil\" target=\"_blank\" rel=\"noopener\">Observatório Nacional — tabela dos estados</a>, consultada em 16/10/2026. O Pará está em UTC−3. A consulta à tabela é uma alternativa textual para conferir os fusos; o mapa continua necessário para os exercícios sobre seus elementos gráficos.</p>"
```

### `v6-theory-t02-13` — `/content/missions/4/sections/3/html`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"<p><b>Escala cartográfica</b> é uma razão matemática entre representação e realidade: 1:25.000, 1:1.000.000 etc. <b>Escala geográfica</b> é o nível de abrangência da análise: local, regional, nacional, global.</p><p>Uma questão sobre ilha de calor pode trabalhar na escala geográfica intraurbana, enquanto o mapa usado para representá-la possui uma escala cartográfica específica. Os conceitos se relacionam na pesquisa, mas <b>não são sinônimos</b>.</p><p>A escolha cartográfica depende do fenômeno e do detalhe necessário. Não existe uma única escala numérica obrigatória para “mapa urbano” ou “mapa regional”.</p><div class=\"box prova\"><span class=\"l\">Como a banca cobra</span>A FGV já explorou diretamente essa distinção. Se aparecer “abrangência do fenômeno”, pense primeiro em escala geográfica.</div>"
```

Depois:
```json
"<p><b>Escala cartográfica</b> é uma razão matemática entre representação e realidade: 1:25.000, 1:1.000.000 etc. <b>Escala geográfica</b> é o nível de abrangência da análise: local, regional, nacional, global.</p><p>Uma questão sobre ilha de calor pode trabalhar na escala geográfica intraurbana, enquanto o mapa usado para representá-la possui uma escala cartográfica específica. Os conceitos se relacionam na pesquisa, mas <b>não são sinônimos</b>.</p><p>A escolha cartográfica depende do fenômeno e do detalhe necessário. Não existe uma única escala numérica obrigatória para “mapa urbano” ou “mapa regional”.</p><div class=\"box prova\"><span class=\"l\">Aplicação no treino autoral</span>A distinção orienta os exercícios autorais desta unidade. Se aparecer “abrangência do fenômeno”, pense primeiro em escala geográfica.</div>"
```

### `v6-fix-4c42e2e9b5d093a7` — `/content/questions/0/concept`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"redimensionamento"
```

Depois:
```json
"escala"
```

### `v6-fix-4c42e2e9b5d093a7` — `/content/questions/0/options/0/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Mistura unidades e aumenta o risco de erro. Copiar o texto 1:100.000 para a imagem ampliada não recalibra esse texto."
```

Depois:
```json
"A razão 1:N exige a mesma unidade nas duas medidas. Calcular antes de padronizar pode combinar centímetros com quilômetros e produzir uma distância incorreta."
```

### `v6-fix-4c42e2e9b5d093a7` — `/content/questions/0/options/1/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Correto."
```

Depois:
```json
"Padronizar unidades, escrever a razão mapa/terreno e então calcular permite controlar o fator N e conferir a ordem de grandeza do resultado."
```

### `v6-fix-4c42e2e9b5d093a7` — `/content/questions/0/options/2/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"1:10.000 é a escala cartográfica maior. Copiar o texto 1:100.000 para a imagem ampliada não recalibra esse texto."
```

Depois:
```json
"Compare as frações: 1/10.000 é maior que 1/50.000. O menor denominador corresponde à escala cartográfica maior, para a mesma finalidade e suporte."
```

### `v6-fix-4c42e2e9b5d093a7` — `/content/questions/0/options/3/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"É possível converter, mas pular o controle de unidade é uma armadilha. Copiar o texto 1:100.000 para a imagem ampliada não recalibra esse texto."
```

Depois:
```json
"A conversão de quilômetros para milímetros é possível, mas exige registrar o fator: 1 km = 1.000.000 mm. Pular esse controle favorece erros de unidade."
```

### `v6-fix-4c42e2e9b5d093a7` — `/content/questions/0/status`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"legacy-preserved"
```

Depois:
```json
"human-review-pending"
```

### `v6-fix-4c42e2e9b5d093a7` — `/content/questions/0/reviewNotes`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente."
```

Depois:
```json
"Revisão editorial assistida 0.1.1: vínculo e feedbacks específicos corrigidos; originais em 0.1.0 e na procedência. Aguarda revisão humana."
```

### `v6-fix-3735d553a70c574c` — `/content/questions/11/concept`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"latitude"
```

Depois:
```json
"longitude"
```

### `v6-fix-3735d553a70c574c` — `/content/questions/11/options/0/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Latitude é igual. Altitude é medida vertical; longitude usa outra referência."
```

Depois:
```json
"Os pontos têm a mesma latitude; a diferença informada é de longitude. Ela permite comparar leste/oeste, não estabelecer que 60°W esteja mais ao norte."
```

### `v6-fix-3735d553a70c574c` — `/content/questions/11/options/1/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Latitude é igual. Altitude é medida vertical; longitude usa outra referência."
```

Depois:
```json
"Os pontos têm a mesma latitude; a diferença informada é de longitude. Ela permite comparar leste/oeste, não estabelecer que 60°W esteja mais ao sul."
```

### `v6-fix-3735d553a70c574c` — `/content/questions/11/options/2/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Correto."
```

Depois:
```json
"Na referência usual a Greenwich, 60°W fica mais a oeste que 45°W: ambos estão no hemisfério oeste e o primeiro tem maior afastamento angular nessa direção."
```

### `v6-fix-3735d553a70c574c` — `/content/questions/11/options/3/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"45°W é que está mais a leste. Altitude é medida vertical; longitude usa outra referência."
```

Depois:
```json
"Entre 45°W e 60°W, 45°W fica mais a leste. Aumentar o afastamento angular para oeste não desloca o ponto para leste."
```

### `v6-fix-3735d553a70c574c` — `/content/questions/11/status`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"legacy-preserved"
```

Depois:
```json
"human-review-pending"
```

### `v6-fix-3735d553a70c574c` — `/content/questions/11/reviewNotes`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente."
```

Depois:
```json
"Revisão editorial assistida 0.1.1: vínculo e feedbacks específicos corrigidos; originais em 0.1.0 e na procedência. Aguarda revisão humana."
```

### `v6-fix-ae06798f90e822d3` — `/content/questions/12/concept`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"latitude"
```

Depois:
```json
"gms"
```

### `v6-fix-ae06798f90e822d3` — `/content/questions/12/options/0/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"30 minutos não são 0,3 grau. Altitude é medida vertical; longitude usa outra referência."
```

Depois:
```json
"A escrita decimal usa frações de grau: 30′/60 = 0,5°. Tratar 30 minutos como 0,3° confunde a base sexagesimal com a decimal."
```

### `v6-fix-ae06798f90e822d3` — `/content/questions/12/options/1/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Correto."
```

Depois:
```json
"30′/60 = 0,5°; portanto 42°30′ = 42,5°. Como W indica oeste, o sinal usual da longitude é negativo: −42,5°."
```

### `v6-fix-ae06798f90e822d3` — `/content/questions/12/options/2/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"O sinal está invertido. Altitude é medida vertical; longitude usa outra referência."
```

Depois:
```json
"A conversão da parte fracionária está correta, mas W indica oeste. Na convenção usual de coordenadas assinadas, aplica-se sinal negativo ao valor inteiro."
```

### `v6-fix-ae06798f90e822d3` — `/content/questions/12/options/3/id`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"v6-fix-ae06798f90e822d3-ofb7693d282"
```

Depois:
```json
"v6-fix-ae06798f90e822d3-o-gms-divisor-600"
```

### `v6-fix-ae06798f90e822d3` — `/content/questions/12/options/3/text`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"−42,30°"
```

Depois:
```json
"−42,05°"
```

### `v6-fix-ae06798f90e822d3` — `/content/questions/12/options/3/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"42°30′ ≠ 42,30° decimal. Altitude é medida vertical; longitude usa outra referência."
```

Depois:
```json
"Dividir 30 por 600 produz 0,05°, dez vezes menos que o correto. Minutos de arco são divididos por 60: 30′ = 0,5°, resultando em −42,5°."
```

### `v6-fix-ae06798f90e822d3` — `/content/questions/12/status`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"legacy-preserved"
```

Depois:
```json
"human-review-pending"
```

### `v6-fix-ae06798f90e822d3` — `/content/questions/12/reviewNotes`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente. Dois distratores históricos, −42,3° e −42,30°, são numericamente equivalentes e incorretos; gabarito −42,5° preservado. Item limitado à Fixação, revisão editorial humana pendente."
```

Depois:
```json
"Revisão editorial assistida 0.1.1: vínculo e feedbacks específicos corrigidos; originais em 0.1.0 e na procedência. Aguarda revisão humana."
```

### `v6-fix-ae06798f90e822d3` — `/content/questions/12/qualityFlags/0`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"numeric-duplicate-distractor"
```

Depois:
```json
null
```

### `v6-fix-ba07a3382fd4f8f0` — `/content/questions/24/family_id`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
null
```

Depois:
```json
"familia-ampliacao-80000"
```

### `v6-fix-8a27b1529f0b322d` — `/content/questions/33/family_id`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
null
```

Depois:
```json
"familia-distancia-72-50000"
```

### `v6-fix-56b356298605e196` — `/content/questions/34/family_id`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
null
```

Depois:
```json
"familia-coordenadas-abc"
```

### `v6-q-f01` — `/content/questions/48/family_id`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
null
```

Depois:
```json
"familia-distancia-72-50000"
```

### `v6-q-f05` — `/content/questions/52/cognitive`

Aplicação da escolha entre planta, carta e mapa em situação escolar. O comando não exige decompor evidências para C4.

Antes:
```json
4
```

Depois:
```json
3
```

### `v6-q-f05` — `/content/questions/52/reviewNotes`

Aplicação da escolha entre planta, carta e mapa em situação escolar. O comando não exige decompor evidências para C4.

Antes:
```json
"Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial."
```

Depois:
```json
"Classificação editorial assistida 0.1.1: Aplicação da escolha entre planta, carta e mapa em situação escolar. O comando não exige decompor evidências para C4. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados."
```

### `v6-q-f06` — `/content/questions/53/family_id`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
null
```

Depois:
```json
"familia-ampliacao-80000"
```

### `v6-q-f08` — `/content/questions/55/pool`

Aplicação direta de sinais e eixos da tabela de coordenadas; distratores distantes do nível Elite.

Antes:
```json
"elite"
```

Depois:
```json
"concurso"
```

### `v6-q-f08` — `/content/questions/55/difficulty`

Aplicação direta de sinais e eixos da tabela de coordenadas; distratores distantes do nível Elite.

Antes:
```json
3
```

Depois:
```json
2
```

### `v6-q-f08` — `/content/questions/55/cognitive`

Aplicação direta de sinais e eixos da tabela de coordenadas; distratores distantes do nível Elite.

Antes:
```json
4
```

Depois:
```json
3
```

### `v6-q-f08` — `/content/questions/55/roles/0`

Aplicação direta de sinais e eixos da tabela de coordenadas; distratores distantes do nível Elite.

Antes:
```json
"elite"
```

Depois:
```json
"concurso"
```

### `v6-q-f08` — `/content/questions/55/reviewNotes`

Aplicação direta de sinais e eixos da tabela de coordenadas; distratores distantes do nível Elite.

Antes:
```json
"Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial."
```

Depois:
```json
"Classificação editorial assistida 0.1.1: Aplicação direta de sinais e eixos da tabela de coordenadas; distratores distantes do nível Elite. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados."
```

### `v6-q-f08` — `/content/questions/55/family_id`

Aplicação direta de sinais e eixos da tabela de coordenadas; distratores distantes do nível Elite.

Antes:
```json
null
```

Depois:
```json
"familia-coordenadas-abc"
```

### `v6-q-f12` — `/content/questions/59/pool`

Compreensão da distinção entre abrangência analítica e razão métrica; a distinção já conduz à resposta sem integração difícil.

Antes:
```json
"elite"
```

Depois:
```json
"concurso"
```

### `v6-q-f12` — `/content/questions/59/difficulty`

Compreensão da distinção entre abrangência analítica e razão métrica; a distinção já conduz à resposta sem integração difícil.

Antes:
```json
3
```

Depois:
```json
2
```

### `v6-q-f12` — `/content/questions/59/cognitive`

Compreensão da distinção entre abrangência analítica e razão métrica; a distinção já conduz à resposta sem integração difícil.

Antes:
```json
4
```

Depois:
```json
2
```

### `v6-q-f12` — `/content/questions/59/roles/0`

Compreensão da distinção entre abrangência analítica e razão métrica; a distinção já conduz à resposta sem integração difícil.

Antes:
```json
"elite"
```

Depois:
```json
"concurso"
```

### `v6-q-f12` — `/content/questions/59/reviewNotes`

Compreensão da distinção entre abrangência analítica e razão métrica; a distinção já conduz à resposta sem integração difícil.

Antes:
```json
"Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial."
```

Depois:
```json
"Classificação editorial assistida 0.1.1: Compreensão da distinção entre abrangência analítica e razão métrica; a distinção já conduz à resposta sem integração difícil. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados."
```

### `v6-vf-ed85f8a4e29b84b6` — `/content/game/33/concept`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"latitude"
```

Depois:
```json
"gms"
```

### `v6-vf-5f14c1fe1dd5d149` — `/content/game/34/concept`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"latitude"
```

Depois:
```json
"gms"
```

### `v6-vf-4de26d6a6d22ba10` — `/content/game/35/concept`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"latitude"
```

Depois:
```json
"gms"
```

### `v6-vf-dbf4f96d27078992` — `/content/game/38/concept`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"latitude"
```

Depois:
```json
"gms"
```

### `v6-vf-2552ea56a33202b6` — `/content/game/39/concept`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"latitude"
```

Depois:
```json
"gms"
```

### `v6-vf-21917d1867c75d57` — `/content/game/98/mission`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"coordenadas-gms"
```

Depois:
```json
"escalas-e-medidas"
```

### `v6-vf-21917d1867c75d57` — `/content/game/98/concept`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"gms"
```

Depois:
```json
"escala"
```

### `v6-vf-2ad33e2a415f1868` — `/content/game/99/mission`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"coordenadas-gms"
```

Depois:
```json
"escalas-e-medidas"
```

### `v6-vf-2ad33e2a415f1868` — `/content/game/99/concept`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"gms"
```

Depois:
```json
"escala"
```

### `cartografia-fundamentos` — `/support/media/0/verification`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
"not-checked-in-this-lot"
```

Depois:
```json
"access-blocked"
```

### `cartografia-fundamentos` — `/support/media/0/checked_at`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"2026-10-16"
```

### `cartografia-fundamentos` — `/support/media/0/access_note`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"A navegação não abriu o PDF e o ambiente de execução bloqueou o acesso no proxy (403). O estado HTTP do endpoint não foi determinado; não foi declarado quebrado nem substituído por imagem não conferida."
```

### `cartografia-fundamentos` — `/support/media/0/fallback_source_id`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"on-estados"
```

### `cartografia-fundamentos` — `/support/media/1/verification`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
"not-checked-in-this-lot"
```

Depois:
```json
"access-blocked"
```

### `cartografia-fundamentos` — `/support/media/1/checked_at`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"2026-10-16"
```

### `cartografia-fundamentos` — `/support/media/1/access_note`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"A navegação não abriu o PDF e o ambiente de execução bloqueou o acesso no proxy (403). O estado HTTP do endpoint não foi determinado; não foi declarado quebrado nem substituído por imagem não conferida."
```

### `cartografia-fundamentos` — `/support/media/1/fallback_source_id`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"on-estados"
```

## Progresso e integração

Nenhum progresso real foi migrado. Mudanças de conceito/missão, nível, família e alternativa exigem leitura da versão editorial na futura integração. Uma escolha do distrator aposentado de GMS não representa escolha da alternativa nova.

A edição inicial conserva 272 registros nesta unidade. Esta revisão declara 107 diferenças e preserva 277 identidades de recurso.
