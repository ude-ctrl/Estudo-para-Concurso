# Mudanças — cartografia-representacao 0.1.0 → 0.1.1

Revisão assistida, sem promoção canônica. Edição de origem preservada; gabaritos e IDs de recursos mantidos.

## Vínculos corrigidos

| Item | Antes | Depois | Justificativa |
| --- | --- | --- | --- |
| `v6-fix-40b0df8d5b8f4ef0` | `graficos-perfis-relevo` / `graficos` | `leitura-critica-integrada` / `critica` | A habilidade central é generalização cartográfica; o complemento atual fala de gráficos/pirâmides. |

## Classificações reavaliadas

| Item | Antes | Depois | Motivo |
| --- | --- | --- | --- |
| `v6-q-r03` | concurso, D2/C4 | concurso, D2/C3 | Aplicação de denominador populacional e período à comparação de incidência, sem conjunto de evidências a decompor. |
| `v6-q-r05` | concurso, D2/C4 | concurso, D2/C3 | Aplicação de variável visual à natureza nominal do dado, com distratores amplamente elimináveis. |
| `v6-q-r07` | elite, D3/C4 | concurso, D2/C3 | Divisão direta de população por área e aplicação da normalização a um coroplético; não exige dificuldade Elite. |
| `v6-q-r08` | elite, D3/C4 | concurso, D2/C2 | Compreensão de propriedades explícitas de Mercator e Gall-Peters e da distinção loxodromia/ortodromia. |
| `v6-q-r10` | elite, D3/C4 | concurso, D2/C3 | Aplicação direta da regra do V a um vale e distinção entre intervalo vertical e distância horizontal. |

Sem calibração psicométrica. Texto e gabarito desses dez itens foram preservados; os feedbacks e os recursos visuais alterados em outros itens constam abaixo.

## Comparação completa de campos editoriais

Os valores completos de cada diferença estão no registro estruturado `provenance.json#revision.changes`. A lista seguinte mostra todos os campos de conteúdo e suporte alterados, com valores anteriores e novos. Atualizações derivadas de metadados/hashes também estão no JSON.

### `v6-theory-t03a-0` — `/content/missions/0/sections/0/hook`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"A banca raramente quer o nome solto: ela mostra um produto e pergunta o que ele preserva, mede ou permite concluir."
```

Depois:
```json
"No treino autoral, relacione o produto cartográfico ao que ele preserva, mede ou permite concluir."
```

### `v6-theory-t03a-0` — `/content/missions/0/sections/0/html`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"<p>A representação cartográfica e as geotecnologias exigem uma leitura por <b>função</b>. Em projeções, pergunte: <b>o que foi preservado e o que foi sacrificado?</b> Em semiologia, pergunte: <b>qual variável visual combina com o tipo de dado?</b> Em sensoriamento, pergunte: <b>qual resolução ou faixa espectral resolve o problema?</b> Em SIG, pergunte: <b>qual estrutura e operação espacial são adequadas?</b></p><div class=\"w\"><table><tbody><tr><th>Se aparecer...</th><th>Pense primeiro em...</th><th>Pegadinha típica</th></tr><tr><td>Mercator</td><td>conformidade + aumento de área em altas latitudes</td><td>chamá-la de equivalente</td></tr><tr><td>taxa por município</td><td>coroplético</td><td>usar valor absoluto</td></tr><tr><td>pixel / bandas</td><td>resoluções</td><td>trocar espacial por espectral</td></tr><tr><td>pontos, linhas, polígonos</td><td>vetor</td><td>confundir com raster</td></tr><tr><td>GPS</td><td>GNSS + referencial</td><td>tratar GPS como sinônimo de todo GNSS</td></tr></tbody></table></div><div class=\"box prova\"><span class=\"l\">Radar de prova</span>O enunciado pode parecer tecnológico, mas normalmente cobra uma relação conceitual curta: propriedade → finalidade; dado → representação; sensor → resolução; camada → operação.</div>"
```

Depois:
```json
"<p>A representação cartográfica e as geotecnologias exigem uma leitura por <b>função</b>. Em projeções, pergunte: <b>o que foi preservado e o que foi sacrificado?</b> Em semiologia, pergunte: <b>qual variável visual combina com o tipo de dado?</b> Em sensoriamento, pergunte: <b>qual resolução ou faixa espectral resolve o problema?</b> Em SIG, pergunte: <b>qual estrutura e operação espacial são adequadas?</b></p><div class=\"w\"><table><tbody><tr><th>Se aparecer...</th><th>Pense primeiro em...</th><th>Pegadinha típica</th></tr><tr><td>Mercator</td><td>conformidade + aumento de área em altas latitudes</td><td>chamá-la de equivalente</td></tr><tr><td>taxa por município</td><td>coroplético</td><td>usar valor absoluto</td></tr><tr><td>pixel / bandas</td><td>resoluções</td><td>trocar espacial por espectral</td></tr><tr><td>pontos, linhas, polígonos</td><td>vetor</td><td>confundir com raster</td></tr><tr><td>GPS</td><td>GNSS + referencial</td><td>tratar GPS como sinônimo de todo GNSS</td></tr></tbody></table></div><div class=\"box prova\"><span class=\"l\">Radar de prova</span>Um enunciado autoral pode parecer tecnológico e explorar uma relação conceitual: propriedade → finalidade; dado → representação; sensor → resolução; camada → operação.</div>"
```

### `v6-theory-t03a-3` — `/content/missions/0/sections/3/hook`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"FGV gosta de trocar o nome da propriedade pelo efeito visual."
```

Depois:
```json
"No treino autoral, relacione o nome da propriedade ao efeito visual da projeção."
```

### `v6-theory-t03a-3` — `/content/missions/0/sections/3/html`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"<p><b>Conforme</b>: preserva ângulos e, localmente, formas pequenas; não preserva áreas globais. <b>Equivalente</b>: preserva relações de área; formas podem se deformar. <b>Equidistante</b>: preserva certas distâncias a partir de linhas/pontos definidos, não “todas as distâncias do mundo”. Projeções <b>afiláticas/compromisso</b> não preservam rigorosamente uma dessas propriedades em toda a representação, mas equilibram deformações.</p><div class=\"box prova\"><span class=\"l\">Cuidado</span>“Equidistante” não significa que qualquer distância entre quaisquer dois pontos está correta. A propriedade vale segundo a construção específica da projeção.</div><div class=\"real-grid\"><figure><img src=\"https://upload.wikimedia.org/wikipedia/commons/f/fa/Mercator-proj.png\" alt=\"Mapa-múndi em projeção Mercator\"><figcaption>Mercator: conformidade e forte aumento aparente das altas latitudes. Fonte: Wikimedia Commons, CC BY-SA.</figcaption></figure><figure><img src=\"https://upload.wikimedia.org/wikipedia/commons/4/4b/Gall-peters.png\" alt=\"Mapa-múndi em projeção Gall-Peters\"><figcaption>Gall-Peters: projeção cilíndrica equivalente; áreas relativas preservadas, formas deformadas. Fonte: Wikimedia Commons, domínio público.</figcaption></figure></div>"
```

Depois:
```json
"<p><b>Conforme</b>: preserva ângulos e, localmente, formas pequenas; não preserva áreas globais. <b>Equivalente</b>: preserva relações de área; formas podem se deformar. <b>Equidistante</b>: preserva certas distâncias a partir de linhas/pontos definidos, não “todas as distâncias do mundo”. Projeções <b>afiláticas/compromisso</b> não preservam rigorosamente uma dessas propriedades em toda a representação, mas equilibram deformações.</p><div class=\"box prova\"><span class=\"l\">Cuidado</span>“Equidistante” não significa que qualquer distância entre quaisquer dois pontos está correta. A propriedade vale segundo a construção específica da projeção.</div><div class=\"real-grid\"><figure><img src=\"https://upload.wikimedia.org/wikipedia/commons/f/fa/Mercator-proj.png\" alt=\"Mapa-múndi em projeção Mercator\"><figcaption>Mercator: conformidade e forte aumento aparente das altas latitudes. Crédito: versão modificada por Jecowa, origem na Wikipédia em alemão; <a href=\"https://commons.wikimedia.org/wiki/File:Mercator-proj.png\" target=\"_blank\" rel=\"noopener\">Wikimedia Commons</a>, <a href=\"https://creativecommons.org/licenses/by-sa/3.0/\" target=\"_blank\" rel=\"noopener\">CC BY-SA 3.0</a>. Arquivo exibido sem edição nesta versão.</figcaption></figure><figure><img src=\"https://upload.wikimedia.org/wikipedia/commons/4/4b/Gall-peters.png\" alt=\"Mapa-múndi em projeção Gall-Peters\"><figcaption>Gall-Peters: projeção cilíndrica equivalente; áreas relativas preservadas, formas deformadas. Crédito: Louis Waweru, derivado de Gall-peters.jpg (Mdf/imagem NASA); <a href=\"https://commons.wikimedia.org/wiki/File:Gall-peters.png\" target=\"_blank\" rel=\"noopener\">Wikimedia Commons</a>, domínio público conforme declaração na página do arquivo. Arquivo exibido sem edição nesta versão.</figcaption></figure></div>"
```

### `v6-theory-t17-5` — `/content/missions/0/sections/4/html`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"<p>Projetar a superfície curva da Terra em um plano produz inevitáveis deformações. Projeções <b>conformes</b> preservam ângulos e formas locais; <b>equivalentes</b> preservam proporções de área; <b>equidistantes</b> preservam certas distâncias a partir de linhas ou pontos específicos.</p><p>A projeção de <b>Mercator</b> é cilíndrica e conformal, importante historicamente para navegação, mas amplia áreas em altas latitudes. A projeção de <b>Gall-Peters</b> é equivalente: compara áreas proporcionalmente, sacrificando formas. Projeções azimutais são úteis quando o centro de interesse é um ponto ou região polar.</p><div class=\"box prova\"><span class=\"l\">FGV</span>Se a questão disser que Mercator “preserva áreas”, está errada. Se disser que toda projeção “elimina distorções”, também.</div>"
```

Depois:
```json
"<p>Projetar a superfície curva da Terra em um plano produz inevitáveis deformações. Projeções <b>conformes</b> preservam ângulos e formas locais; <b>equivalentes</b> preservam proporções de área; <b>equidistantes</b> preservam certas distâncias a partir de linhas ou pontos específicos.</p><p>A projeção de <b>Mercator</b> é cilíndrica e conformal, importante historicamente para navegação, mas amplia áreas em altas latitudes. A projeção de <b>Gall-Peters</b> é equivalente: compara áreas proporcionalmente, sacrificando formas. Projeções azimutais são úteis quando o centro de interesse é um ponto ou região polar.</p><div class=\"box prova\"><span class=\"l\">Treino autoral</span>Se a questão disser que Mercator “preserva áreas”, está errada. Se disser que toda projeção “elimina distorções”, também.</div>"
```

### `v6-theory-t03a-6` — `/content/missions/2/sections/0/html`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"<p>A semiologia gráfica de tradição bertiniana distingue <b>implantações</b> pontual, linear e zonal e utiliza variáveis visuais como <b>tamanho, valor (claro–escuro), matiz/cor, forma, orientação e textura/granulação</b>.</p><p>Dados <b>nominais</b> pedem diferenças sem ordem (matizes/formas distintas). Dados <b>ordinais</b> pedem gradação perceptível (valor, por exemplo). Dados <b>quantitativos</b> podem exigir tamanho proporcional quando a magnitude absoluta é central.</p><div class=\"box prova\"><span class=\"l\">Como a banca cobra</span>Ela apresenta uma legenda e pergunta se a variável visual sugere diferença, ordem ou proporção compatível com o dado.</div>"
```

Depois:
```json
"<p>A semiologia gráfica de tradição bertiniana distingue <b>implantações</b> pontual, linear e zonal e utiliza variáveis visuais como <b>tamanho, valor (claro–escuro), matiz/cor, forma, orientação e textura/granulação</b>.</p><p>Dados <b>nominais</b> pedem diferenças sem ordem (matizes/formas distintas). Dados <b>ordinais</b> pedem gradação perceptível (valor, por exemplo). Dados <b>quantitativos</b> podem exigir tamanho proporcional quando a magnitude absoluta é central.</p><div class=\"box prova\"><span class=\"l\">Aplicação no treino autoral</span>Um exercício autoral pode apresentar uma legenda e perguntar se a variável visual sugere diferença, ordem ou proporção compatível com o dado.</div>"
```

### `v6-fix-40b0df8d5b8f4ef0` — `/content/questions/18/mission`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"graficos-perfis-relevo"
```

Depois:
```json
"leitura-critica-integrada"
```

### `v6-fix-40b0df8d5b8f4ef0` — `/content/questions/18/concept`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"graficos"
```

Depois:
```json
"critica"
```

### `v6-fix-40b0df8d5b8f4ef0` — `/content/questions/18/options/0/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"É o contrário. Contagens e percentuais não são intercambiáveis; um gráfico bonito pode usar bases incompatíveis."
```

Depois:
```json
"Em escala menor, cada comprimento no mapa representa mais terreno e há menos espaço para detalhes. É necessário selecionar e simplificar mais, não menos."
```

### `v6-fix-40b0df8d5b8f4ef0` — `/content/questions/18/options/1/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Correto."
```

Depois:
```json
"A escala menor reduz o espaço gráfico disponível por feição. Maior seleção e simplificação ajudam a conservar a legibilidade do fenômeno representado."
```

### `v6-fix-40b0df8d5b8f4ef0` — `/content/questions/18/options/2/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Sempre há escolhas. Contagens e percentuais não são intercambiáveis; um gráfico bonito pode usar bases incompatíveis."
```

Depois:
```json
"A generalização continua necessária: toda representação seleciona informações. A redução da escala intensifica essa seleção em vez de eliminá-la."
```

### `v6-fix-40b0df8d5b8f4ef0` — `/content/questions/18/options/3/feedback`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Não tem relação. Contagens e percentuais não são intercambiáveis; um gráfico bonito pode usar bases incompatíveis."
```

Depois:
```json
"Vetor é um modelo de dados e GNSS é um sistema de posicionamento. Mudar a escala não transforma um modelo de dados em uma tecnologia de localização."
```

### `v6-fix-40b0df8d5b8f4ef0` — `/content/questions/18/status`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"legacy-preserved"
```

Depois:
```json
"human-review-pending"
```

### `v6-fix-40b0df8d5b8f4ef0` — `/content/questions/18/reviewNotes`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente."
```

Depois:
```json
"Revisão editorial assistida 0.1.1: vínculo e feedbacks específicos corrigidos; originais em 0.1.0 e na procedência. Aguarda revisão humana."
```

### `v6-fix-7aeb0c4f82d0daab` — `/content/questions/23/family_id`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
null
```

Depois:
```json
"familia-area-atlas"
```

### `v6-q-r01` — `/content/questions/37/family_id`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
null
```

Depois:
```json
"familia-area-atlas"
```

### `v6-q-r03` — `/content/questions/39/cognitive`

Aplicação de denominador populacional e período à comparação de incidência, sem conjunto de evidências a decompor.

Antes:
```json
4
```

Depois:
```json
3
```

### `v6-q-r03` — `/content/questions/39/reviewNotes`

Aplicação de denominador populacional e período à comparação de incidência, sem conjunto de evidências a decompor.

Antes:
```json
"Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial."
```

Depois:
```json
"Classificação editorial assistida 0.1.1: Aplicação de denominador populacional e período à comparação de incidência, sem conjunto de evidências a decompor. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados."
```

### `v6-q-r05` — `/content/questions/41/cognitive`

Aplicação de variável visual à natureza nominal do dado, com distratores amplamente elimináveis.

Antes:
```json
4
```

Depois:
```json
3
```

### `v6-q-r05` — `/content/questions/41/reviewNotes`

Aplicação de variável visual à natureza nominal do dado, com distratores amplamente elimináveis.

Antes:
```json
"Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial."
```

Depois:
```json
"Classificação editorial assistida 0.1.1: Aplicação de variável visual à natureza nominal do dado, com distratores amplamente elimináveis. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados."
```

### `v6-q-r07` — `/content/questions/43/pool`

Divisão direta de população por área e aplicação da normalização a um coroplético; não exige dificuldade Elite.

Antes:
```json
"elite"
```

Depois:
```json
"concurso"
```

### `v6-q-r07` — `/content/questions/43/difficulty`

Divisão direta de população por área e aplicação da normalização a um coroplético; não exige dificuldade Elite.

Antes:
```json
3
```

Depois:
```json
2
```

### `v6-q-r07` — `/content/questions/43/cognitive`

Divisão direta de população por área e aplicação da normalização a um coroplético; não exige dificuldade Elite.

Antes:
```json
4
```

Depois:
```json
3
```

### `v6-q-r07` — `/content/questions/43/roles/0`

Divisão direta de população por área e aplicação da normalização a um coroplético; não exige dificuldade Elite.

Antes:
```json
"elite"
```

Depois:
```json
"concurso"
```

### `v6-q-r07` — `/content/questions/43/reviewNotes`

Divisão direta de população por área e aplicação da normalização a um coroplético; não exige dificuldade Elite.

Antes:
```json
"Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial."
```

Depois:
```json
"Classificação editorial assistida 0.1.1: Divisão direta de população por área e aplicação da normalização a um coroplético; não exige dificuldade Elite. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados."
```

### `v6-q-r08` — `/content/questions/44/pool`

Compreensão de propriedades explícitas de Mercator e Gall-Peters e da distinção loxodromia/ortodromia.

Antes:
```json
"elite"
```

Depois:
```json
"concurso"
```

### `v6-q-r08` — `/content/questions/44/difficulty`

Compreensão de propriedades explícitas de Mercator e Gall-Peters e da distinção loxodromia/ortodromia.

Antes:
```json
3
```

Depois:
```json
2
```

### `v6-q-r08` — `/content/questions/44/cognitive`

Compreensão de propriedades explícitas de Mercator e Gall-Peters e da distinção loxodromia/ortodromia.

Antes:
```json
4
```

Depois:
```json
2
```

### `v6-q-r08` — `/content/questions/44/roles/0`

Compreensão de propriedades explícitas de Mercator e Gall-Peters e da distinção loxodromia/ortodromia.

Antes:
```json
"elite"
```

Depois:
```json
"concurso"
```

### `v6-q-r08` — `/content/questions/44/reviewNotes`

Compreensão de propriedades explícitas de Mercator e Gall-Peters e da distinção loxodromia/ortodromia.

Antes:
```json
"Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial."
```

Depois:
```json
"Classificação editorial assistida 0.1.1: Compreensão de propriedades explícitas de Mercator e Gall-Peters e da distinção loxodromia/ortodromia. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados."
```

### `v6-q-r09` — `/content/questions/45/prompt`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"O perfil didático usa escala horizontal 1:50.000 e vertical 1:10.000. Entre A e B são 200 m horizontais e 40 m de desnível. Qual avaliação é correta?"
```

Depois:
```json
"Considere um perfil construído com escala horizontal 1:50.000 e vertical 1:10.000. Entre A e B são 200 m horizontais e 40 m de desnível. A figura de apoio é um esquema sem escala e não deve ser medida; use os valores declarados. Qual avaliação é correta?"
```

### `v6-q-r09` — `/content/questions/45/reviewNotes`

Correção dirigida de vínculo, feedback, distrator, atribuição de autoria ou apresentação acessível; conteúdo anterior preservado em 0.1.0.

Antes:
```json
"Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial."
```

Depois:
```json
"Revisão 0.1.1: perfil identificado como esquema sem escala; dados e ID do gabarito preservados. Aprovação humana pendente."
```

### `v6-q-r10` — `/content/questions/46/pool`

Aplicação direta da regra do V a um vale e distinção entre intervalo vertical e distância horizontal.

Antes:
```json
"elite"
```

Depois:
```json
"concurso"
```

### `v6-q-r10` — `/content/questions/46/difficulty`

Aplicação direta da regra do V a um vale e distinção entre intervalo vertical e distância horizontal.

Antes:
```json
3
```

Depois:
```json
2
```

### `v6-q-r10` — `/content/questions/46/cognitive`

Aplicação direta da regra do V a um vale e distinção entre intervalo vertical e distância horizontal.

Antes:
```json
4
```

Depois:
```json
3
```

### `v6-q-r10` — `/content/questions/46/roles/0`

Aplicação direta da regra do V a um vale e distinção entre intervalo vertical e distância horizontal.

Antes:
```json
"elite"
```

Depois:
```json
"concurso"
```

### `v6-q-r10` — `/content/questions/46/reviewNotes`

Aplicação direta da regra do V a um vale e distinção entre intervalo vertical e distância horizontal.

Antes:
```json
"Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial."
```

Depois:
```json
"Classificação editorial assistida 0.1.1: Aplicação direta da regra do V a um vale e distinção entre intervalo vertical e distância horizontal. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados."
```

### `cartografia-representacao` — `/support/visuals/1/caption`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
"Perfil hipotético A–B"
```

Depois:
```json
"Perfil hipotético A–B — esquema sem escala; use os valores da tabela"
```

### `cartografia-representacao` — `/support/visuals/1/measurement_note`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
"Esquema preservado; não medir como desenho em escala. A interpretação métrica deve usar os valores declarados."
```

Depois:
```json
"O traçado SVG é esquemático, sem eixos graduados e sem proporção gráfica das escalas do cálculo. Não medir distâncias ou inclinação na tela; use a tabela e as escalas declaradas no enunciado."
```

### `cartografia-representacao` — `/support/editorial_notes/0/source_ids`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
[
  "fgdc-utm-range"
]
```

### `cartografia-representacao` — `/support/editorial_notes/0/verified_at`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"2026-10-16"
```

### `cartografia-representacao` — `/support/media/0/verification`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
"not-checked-in-this-lot"
```

Depois:
```json
"description-page-direct"
```

### `cartografia-representacao` — `/support/media/0/checked_at`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"2026-10-16"
```

### `cartografia-representacao` — `/support/media/0/source_id`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"commons-mercator"
```

### `cartografia-representacao` — `/support/media/0/credit`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"Versão modificada por Jecowa; origem na Wikipédia em alemão; Wikimedia Commons."
```

### `cartografia-representacao` — `/support/media/0/license`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"CC-BY-SA-3.0"
```

### `cartografia-representacao` — `/support/media/0/license_url`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"https://creativecommons.org/licenses/by-sa/3.0/"
```

### `cartografia-representacao` — `/support/media/0/modified_in_this_revision`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
false
```

### `cartografia-representacao` — `/support/media/0/asset_access`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"blocked-in-execution-environment"
```

### `cartografia-representacao` — `/support/media/0/asset_access_note`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"Página de descrição e licença conferida diretamente; download binário bloqueado no proxy (403). Não se declara nova inspeção visual ou hash do arquivo."
```

### `cartografia-representacao` — `/support/media/1/verification`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
"not-checked-in-this-lot"
```

Depois:
```json
"description-page-direct"
```

### `cartografia-representacao` — `/support/media/1/checked_at`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"2026-10-16"
```

### `cartografia-representacao` — `/support/media/1/source_id`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"commons-gall-peters"
```

### `cartografia-representacao` — `/support/media/1/credit`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"Louis Waweru, derivado de Gall-peters.jpg (Mdf/imagem NASA); Wikimedia Commons."
```

### `cartografia-representacao` — `/support/media/1/license`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"Public domain (PD-self, descrição do arquivo)"
```

### `cartografia-representacao` — `/support/media/1/license_url`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"https://commons.wikimedia.org/wiki/File:Gall-peters.png#Licensing"
```

### `cartografia-representacao` — `/support/media/1/modified_in_this_revision`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
false
```

### `cartografia-representacao` — `/support/media/1/asset_access`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"blocked-in-execution-environment"
```

### `cartografia-representacao` — `/support/media/1/asset_access_note`

Suporte visual, créditos e precisão de uso diretamente ligados aos achados auditados.

Antes:
```json
null
```

Depois:
```json
"Página de descrição e licença conferida diretamente; download binário bloqueado no proxy (403). Não se declara nova inspeção visual ou hash do arquivo."
```

## Progresso e integração

Nenhum progresso real foi migrado. Mudanças de conceito/missão, nível, família e alternativa exigem leitura da versão editorial na futura integração. Uma escolha do distrator aposentado de GMS não representa escolha da alternativa nova.

A edição inicial conserva 172 registros nesta unidade. Esta revisão declara 93 diferenças e preserva 183 identidades de recurso.
