# Mudanças — geotecnologias 0.1.0 → 0.1.1

Revisão assistida, sem promoção canônica. Edição de origem preservada; gabaritos e IDs de recursos mantidos.

## Vínculos corrigidos

| Item | Antes | Depois | Justificativa |
| --- | --- | --- | --- |
| `v6-fix-b5782254d12f27da` | `sensores-espectro` / `sensores` | `resolucoes-indices-classificacao` / `resolucoes` | Pixel/grade raster não tem como conceito principal fonte de energia do sensor. |

## Classificações reavaliadas

| Item | Antes | Depois | Motivo |
| --- | --- | --- | --- |
| `v6-q-g03` | concurso, D2/C4 | concurso, D2/C3 | Aplicação do procedimento de compatibilização de referenciais; não é análise C4 pela simples presença de termos técnicos. |
| `v6-q-g05` | concurso, D2/C4 | concurso, D2/C3 | Aplicação do controle de qualidade por metadados; ausência de dados é explícita e os distratores são pouco próximos. |

Sem calibração psicométrica. Texto e gabarito desses dez itens foram preservados; os feedbacks e os recursos visuais alterados em outros itens constam abaixo.

## Comparação completa de campos editoriais

Os valores completos de cada diferença estão no registro estruturado `provenance.json#revision.changes`. A lista seguinte mostra todos os campos de conteúdo e suporte alterados, com valores anteriores e novos. Atualizações derivadas de metadados/hashes também estão no JSON.

### `v6-theory-t03a-8` — `/content/missions/0/sections/0/html`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"<p><b>Sensoriamento remoto</b> obtém informações de alvos sem contato físico direto, registrando energia eletromagnética refletida ou emitida. <b>Sensores passivos</b> dependem de energia externa, geralmente solar no visível/infravermelho refletido. <b>Sensores ativos</b> emitem energia e medem o retorno, como radar e LiDAR.</p><p>Uma imagem digital é formada por <b>pixels</b>. Cada pixel armazena valores associados às bandas espectrais do sensor. A interpretação depende do sensor, da resolução, da composição de bandas e do fenômeno estudado.</p><div class=\"real-grid\"><figure><img src=\"https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/imagerecords/88000/88103/rio_oli_1984263.jpg\" alt=\"Imagem Landsat de Barra da Tijuca em 1984\"><figcaption>Landsat, 1984 — Barra da Tijuca/RJ. NASA/USGS.</figcaption></figure><figure><img src=\"https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/imagerecords/88000/88103/rio_oli_2015268.jpg\" alt=\"Imagem Landsat de Barra da Tijuca em 2015\"><figcaption>Landsat, 2015 — expansão urbana visível. NASA/USGS.</figcaption></figure></div><div class=\"box dia\"><span class=\"l\">Leia a imagem</span>Compare áreas cinza-claro urbanizadas, vegetação verde e corpos d’água. A imagem permite observar mudança espacial, mas a explicação causal exige outras evidências.</div>"
```

Depois:
```json
"<p><b>Sensoriamento remoto</b> obtém informações de alvos sem contato físico direto, registrando energia eletromagnética refletida ou emitida. <b>Sensores passivos</b> dependem de energia externa, geralmente solar no visível/infravermelho refletido. <b>Sensores ativos</b> emitem energia e medem o retorno, como radar e LiDAR.</p><p>Uma imagem digital é formada por <b>pixels</b>. Cada pixel armazena valores associados às bandas espectrais do sensor. A interpretação depende do sensor, da resolução, da composição de bandas e do fenômeno estudado.</p><div class=\"real-grid\"><figure><img src=\"https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/imagerecords/88000/88103/rio_oli_1984263.jpg\" alt=\"Imagem Landsat de Barra da Tijuca em 1984\"><figcaption>19/09/1984 — Landsat 5/TM, Barra da Tijuca/RJ. Imagem histórica por Jesse Allen/NASA Earth Observatory, com dados USGS.</figcaption></figure><figure><img src=\"https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/imagerecords/88000/88103/rio_oli_2015268.jpg\" alt=\"Imagem Landsat de Barra da Tijuca em 2015\"><figcaption>25/09/2015 — Landsat 8/OLI, expansão urbana observável no par histórico. Imagem por Jesse Allen/NASA Earth Observatory, com dados USGS.</figcaption></figure></div><div class=\"box dia\"><span class=\"l\">Leia a imagem</span>Compare áreas cinza-claro urbanizadas, vegetação verde e corpos d’água. A imagem permite observar mudança espacial, mas a explicação causal exige outras evidências.</div><p class=\"source\">Fonte e créditos: <a href=\"https://science.nasa.gov/earth/earth-observatory/rio-de-janeiro-a-changing-city-88103/\" target=\"_blank\" rel=\"noopener\">Rio de Janeiro: A Changing City</a> (01/06/2016). As imagens são de 1984 e 2015 e não representam a situação atual. As questões e interpretações didáticas são autoria do projeto.</p>"
```

### `v6-theory-t17-0` — `/content/missions/0/sections/1/title`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Como a FGV cobra Cartografia e Geotecnologias"
```

Depois:
```json
"Cartografia e Geotecnologias: percurso de estudo para concursos"
```

### `v6-theory-t17-0` — `/content/missions/0/sections/1/hook`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"O mapa pode estar correto e ainda induzir uma leitura ruim. A banca explora exatamente essa diferença."
```

Depois:
```json
"O mapa pode estar correto e ainda induzir uma leitura ruim. O treino autoral explora essa diferença."
```

### `v6-theory-t17-0` — `/content/missions/0/sections/1/html`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"<p>O edital reúne <b>representações cartográficas, linguagem cartográfica, leitura de mapas, cartas, plantas, tabelas, gráficos e perfis; coordenadas, fusos, projeções, escalas; sensoriamento remoto, SIG, geoprocessamento, cartografia digital, imagens de satélite e tecnologias geoespaciais</b>.</p><p>A FGV tende a cobrar em três camadas: <b>conceito</b> (o que é), <b>procedimento</b> (como calcular/interpretar) e <b>aplicação</b> (qual ferramenta resolve o problema). Para não cair em distratores, pergunte: <b>qual variável está sendo representada? qual escala? qual sistema de referência? qual resolução? qual operação espacial?</b></p><div class=\"box prova\"><span class=\"l\">Radar FGV</span>Palavras parecidas não são sinônimas: <b>escala cartográfica ≠ escala geográfica</b>; <b>sensoriamento remoto ≠ SIG</b>; <b>GNSS ≠ imagem de satélite</b>; <b>projeção ≠ datum</b>.</div>"
```

Depois:
```json
"<p>O edital reúne <b>representações cartográficas, linguagem cartográfica, leitura de mapas, cartas, plantas, tabelas, gráficos e perfis; coordenadas, fusos, projeções, escalas; sensoriamento remoto, SIG, geoprocessamento, cartografia digital, imagens de satélite e tecnologias geoespaciais</b>.</p><p>O treino autoral está organizado em três camadas: <b>conceito</b> (o que é), <b>procedimento</b> (como calcular/interpretar) e <b>aplicação</b> (qual ferramenta resolve o problema). Para não cair em distratores, pergunte: <b>qual variável está sendo representada? qual escala? qual sistema de referência? qual resolução? qual operação espacial?</b></p><div class=\"box prova\"><span class=\"l\">Radar do treino autoral</span>Palavras parecidas não são sinônimas: <b>escala cartográfica ≠ escala geográfica</b>; <b>sensoriamento remoto ≠ SIG</b>; <b>GNSS ≠ imagem de satélite</b>; <b>projeção ≠ datum</b>.</div>"
```

### `v6-theory-t03a-9` — `/content/missions/1/sections/0/html`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"<div class=\"w\"><table><tbody><tr><th>Resolução</th><th>Pergunta</th><th>Exemplo</th></tr><tr><td>Espacial</td><td>qual o tamanho do pixel/menor detalhe discernível?</td><td>10 m vs 30 m</td></tr><tr><td>Espectral</td><td>quantas e quão estreitas são as bandas?</td><td>visível, NIR, SWIR...</td></tr><tr><td>Radiométrica</td><td>quantos níveis de energia podem ser discriminados?</td><td>8 bits = 256 níveis</td></tr><tr><td>Temporal</td><td>com que frequência a área volta a ser observada?</td><td>revisita de dias</td></tr></tbody></table></div><p>“Maior resolução espacial” significa <b>pixel menor e mais detalhe espacial</b>. Já maior resolução radiométrica significa maior capacidade de distinguir diferenças sutis de intensidade registrada.</p><div class=\"box prova\"><span class=\"l\">FGV já cobrou assim</span>A banca descreve “capacidade de discriminar níveis de energia” e espera <b>resolução radiométrica</b>; “frequência de aquisição” aponta para <b>temporal</b>.</div>"
```

Depois:
```json
"<div class=\"w\"><table><tbody><tr><th>Resolução</th><th>Pergunta</th><th>Exemplo</th></tr><tr><td>Espacial</td><td>qual o tamanho do pixel/menor detalhe discernível?</td><td>10 m vs 30 m</td></tr><tr><td>Espectral</td><td>quantas e quão estreitas são as bandas?</td><td>visível, NIR, SWIR...</td></tr><tr><td>Radiométrica</td><td>quantos níveis de energia podem ser discriminados?</td><td>8 bits = 256 níveis</td></tr><tr><td>Temporal</td><td>com que frequência a área volta a ser observada?</td><td>revisita de dias</td></tr></tbody></table></div><p>“Maior resolução espacial” significa <b>pixel menor e mais detalhe espacial</b>. Já maior resolução radiométrica significa maior capacidade de distinguir diferenças sutis de intensidade registrada.</p><div class=\"box prova\"><span class=\"l\">Exemplo autoral de treino</span>Um enunciado autoral descreve “capacidade de discriminar níveis de energia” e espera <b>resolução radiométrica</b>; “frequência de aquisição” aponta para <b>temporal</b>.</div>"
```

### `v6-theory-t03a-12` — `/content/missions/3/sections/1/hook`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"A banca gosta de misturar formato de dado com fenômeno representado."
```

Depois:
```json
"No treino autoral, distinga formato de dado e fenômeno representado."
```

### `v6-theory-t03a-14` — `/content/missions/5/sections/0/hook`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"A diferença entre monitorar e alertar é excelente matéria-prima para questão FGV."
```

Depois:
```json
"A diferença entre monitorar e alertar sustenta questões autorais de aplicação."
```

### `v6-fix-b5782254d12f27da` — `/content/questions/1/mission`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"sensores-espectro"
```

Depois:
```json
"resolucoes-indices-classificacao"
```

### `v6-fix-b5782254d12f27da` — `/content/questions/1/concept`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"sensores"
```

Depois:
```json
"resolucoes"
```

### `v6-fix-b5782254d12f27da` — `/content/questions/1/options/0/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Correto."
```

Depois:
```json
"Uma imagem raster organiza os registros em uma grade. Cada pixel é uma célula dessa grade e contém um valor por banda ou camada representada."
```

### `v6-fix-b5782254d12f27da` — `/content/questions/1/options/1/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Linha é estrutura vetorial. Passivo não significa sempre dependente do Sol: sensores térmicos registram emissão natural."
```

Depois:
```json
"Uma linha vetorial é definida por geometria e vértices. Pixel é célula de uma grade raster; não é uma linha vetorial obrigatória."
```

### `v6-fix-b5782254d12f27da` — `/content/questions/1/options/2/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Não. Passivo não significa sempre dependente do Sol: sensores térmicos registram emissão natural."
```

Depois:
```json
"O satélite é a plataforma que transporta o sensor. Pixel é uma unidade da imagem produzida, não a plataforma inteira."
```

### `v6-fix-b5782254d12f27da` — `/content/questions/1/options/3/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Datum é referência geodésica. Passivo não significa sempre dependente do Sol: sensores térmicos registram emissão natural."
```

Depois:
```json
"Datum define um referencial geodésico. Pixel define a célula de uma imagem raster; os dois participam de funções diferentes na representação espacial."
```

### `v6-fix-b5782254d12f27da` — `/content/questions/1/status`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"legacy-preserved"
```

Depois:
```json
"human-review-pending"
```

### `v6-fix-b5782254d12f27da` — `/content/questions/1/reviewNotes`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente."
```

Depois:
```json
"Revisão editorial assistida 0.1.1: vínculo e feedbacks específicos corrigidos; originais em 0.1.0 e na procedência. Aguarda revisão humana."
```

### `v6-fix-df0accd0b0af1130` — `/content/questions/16/family_id`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
null
```

Depois:
```json
"familia-buffer-escolas-500"
```

### `v6-q-g03` — `/content/questions/42/cognitive`

Aplicação do procedimento de compatibilização de referenciais; não é análise C4 pela simples presença de termos técnicos.

Antes:
```json
4
```

Depois:
```json
3
```

### `v6-q-g03` — `/content/questions/42/reviewNotes`

Aplicação do procedimento de compatibilização de referenciais; não é análise C4 pela simples presença de termos técnicos.

Antes:
```json
"Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial."
```

Depois:
```json
"Classificação editorial assistida 0.1.1: Aplicação do procedimento de compatibilização de referenciais; não é análise C4 pela simples presença de termos técnicos. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados."
```

### `v6-q-g04` — `/content/questions/43/family_id`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
null
```

Depois:
```json
"familia-buffer-escolas-500"
```

### `v6-q-g05` — `/content/questions/44/cognitive`

Aplicação do controle de qualidade por metadados; ausência de dados é explícita e os distratores são pouco próximos.

Antes:
```json
4
```

Depois:
```json
3
```

### `v6-q-g05` — `/content/questions/44/reviewNotes`

Aplicação do controle de qualidade por metadados; ausência de dados é explícita e os distratores são pouco próximos.

Antes:
```json
"Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial."
```

Depois:
```json
"Classificação editorial assistida 0.1.1: Aplicação do controle de qualidade por metadados; ausência de dados é explícita e os distratores são pouco próximos. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados."
```

### `v6-q-g10` — `/content/questions/49/prompt`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"O par Landsat do Rio permite observar diferenças de cobertura e forma urbana entre duas datas. Qual afirmação respeita o alcance desse tipo de evidência?"
```

Depois:
```json
"Considere o par histórico Landsat do Rio de Janeiro apresentado com a questão: 19/09/1984 (Landsat 5/TM) e 25/09/2015 (Landsat 8/OLI). Ele permite observar diferenças de cobertura e forma urbana entre as duas datas, sem descrever a situação atual. Qual afirmação respeita o alcance desse tipo de evidência?"
```

### `v6-q-g10` — `/content/questions/49/reviewNotes`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial."
```

Depois:
```json
"Revisão 0.1.1: par histórico, datas, sensores e transcrição acessível acompanham a questão. Gabarito preservado; aprovação humana pendente."
```

### `v6-q-g10` — `/content/questions/49/visual`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
null
```

Depois:
```json
"landsat-rio"
```

### `geotecnologias` — `/support/visuals/1`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
{
  "id": "landsat-rio",
  "kind": "image-pair",
  "caption": "Rio de Janeiro — par histórico Landsat, 1984 e 2015",
  "historical": true,
  "source_id": "nasa-rio",
  "usage_source_id": "nasa-media-usage",
  "transcript": "Duas cenas da mesma área de Barra da Tijuca e Zona Oeste do Rio de Janeiro, em cores naturais. O artigo identifica vegetação em verde e áreas urbanizadas em cinza e descreve diferenças de cobertura e forma urbana entre as datas. Datas, sensores e processamento devem ser considerados na comparação.",
  "images": [
    {
      "url": "https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/imagerecords/88000/88103/rio_oli_1984263.jpg",
      "alt": "Cena em cores naturais de Barra da Tijuca e Zona Oeste do Rio de Janeiro, 1984-09-19, Landsat 5/TM. Vegetação em verde e áreas urbanizadas em cinza.",
      "caption": "1984-09-19 — Landsat 5/TM",
      "acquired_at": "1984-09-19",
      "sensor": "Landsat 5/TM",
      "credit": "Jesse Allen/NASA Earth Observatory, com dados Landsat do USGS; artigo de Adam Voiland. Questão e comentários são autoria do projeto, sem revisão ou endosso da NASA.",
      "loading": "lazy",
      "decoding": "async"
    },
    {
      "url": "https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/imagerecords/88000/88103/rio_oli_2015268.jpg",
      "alt": "Cena em cores naturais de Barra da Tijuca e Zona Oeste do Rio de Janeiro, 2015-09-25, Landsat 8/OLI. Vegetação em verde e áreas urbanizadas em cinza.",
      "caption": "2015-09-25 — Landsat 8/OLI",
      "acquired_at": "2015-09-25",
      "sensor": "Landsat 8/OLI",
      "credit": "Jesse Allen/NASA Earth Observatory, com dados Landsat do USGS; artigo de Adam Voiland. Questão e comentários são autoria do projeto, sem revisão ou endosso da NASA.",
      "loading": "lazy",
      "decoding": "async"
    }
  ]
}
```

### `geotecnologias` — `/support/media/0/resource_ids/1`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"v6-q-g10"
```

### `geotecnologias` — `/support/media/0/verification`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
"not-checked-in-this-lot"
```

Depois:
```json
"article-and-credit-direct"
```

### `geotecnologias` — `/support/media/0/checked_at`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"2026-10-16"
```

### `geotecnologias` — `/support/media/0/source_id`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"nasa-rio"
```

### `geotecnologias` — `/support/media/0/credit`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"Jesse Allen/NASA Earth Observatory, com dados Landsat do USGS; artigo de Adam Voiland. Questão e comentários são autoria do projeto, sem revisão ou endosso da NASA."
```

### `geotecnologias` — `/support/media/0/acquired_at`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"1984-09-19"
```

### `geotecnologias` — `/support/media/0/sensor`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"Landsat 5/TM"
```

### `geotecnologias` — `/support/media/0/usage_source_id`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"nasa-media-usage"
```

### `geotecnologias` — `/support/media/0/usage`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"Uso educacional/informativo com reconhecimento da fonte, conforme as diretrizes NASA e os créditos específicos do artigo."
```

### `geotecnologias` — `/support/media/0/modified_in_this_revision`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
false
```

### `geotecnologias` — `/support/media/0/asset_access`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"blocked-in-execution-environment"
```

### `geotecnologias` — `/support/media/0/asset_access_note`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"Artigo, datas e créditos conferidos diretamente; download binário bloqueado no proxy (403). Não se declara nova inspeção visual ou hash do arquivo."
```

### `geotecnologias` — `/support/media/1/resource_ids/1`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"v6-q-g10"
```

### `geotecnologias` — `/support/media/1/verification`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
"not-checked-in-this-lot"
```

Depois:
```json
"article-and-credit-direct"
```

### `geotecnologias` — `/support/media/1/checked_at`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"2026-10-16"
```

### `geotecnologias` — `/support/media/1/source_id`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"nasa-rio"
```

### `geotecnologias` — `/support/media/1/credit`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"Jesse Allen/NASA Earth Observatory, com dados Landsat do USGS; artigo de Adam Voiland. Questão e comentários são autoria do projeto, sem revisão ou endosso da NASA."
```

### `geotecnologias` — `/support/media/1/acquired_at`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"2015-09-25"
```

### `geotecnologias` — `/support/media/1/sensor`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"Landsat 8/OLI"
```

### `geotecnologias` — `/support/media/1/usage_source_id`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"nasa-media-usage"
```

### `geotecnologias` — `/support/media/1/usage`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"Uso educacional/informativo com reconhecimento da fonte, conforme as diretrizes NASA e os créditos específicos do artigo."
```

### `geotecnologias` — `/support/media/1/modified_in_this_revision`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
false
```

### `geotecnologias` — `/support/media/1/asset_access`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"blocked-in-execution-environment"
```

### `geotecnologias` — `/support/media/1/asset_access_note`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"Artigo, datas e créditos conferidos diretamente; download binário bloqueado no proxy (403). Não se declara nova inspeção visual ou hash do arquivo."
```

## Progresso e integração

Nenhum progresso real foi migrado. Mudanças de conceito/missão, nível, família e alternativa exigem leitura da versão editorial na futura integração. Uma escolha do distrator aposentado de GMS não representa escolha da alternativa nova.

A edição inicial conserva 241 registros nesta unidade. Esta revisão declara 80 diferenças e preserva 231 identidades de recurso.
