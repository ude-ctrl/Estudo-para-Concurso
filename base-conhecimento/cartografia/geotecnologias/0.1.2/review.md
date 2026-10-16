# Questões revisadas — geotecnologias@0.1.2

Leitura de referência, preparada pelo assistente. Não é uma tarefa obrigatória de revisão para o estudante. Os itens continuam identificados como autorais; nenhuma questão é apresentada como prova oficial da FGV.

Parecer e limites em [audit.md](audit.md). Alterações em [changes.md](changes.md).

## v6-fix-fb5599f3e9ad7f41

fixacao · D1/C2

Um radar orbital é classificado como sensor ativo porque:

A. usa apenas luz solar

Explicação: Isso descreve sensor passivo óptico. Passivo não significa sempre dependente do Sol: sensores térmicos registram emissão natural.

B. emite energia e mede o sinal de retorno

Explicação: Correto.

C. produz somente dados vetoriais

Explicação: O dado pode ser raster. Passivo não significa sempre dependente do Sol: sensores térmicos registram emissão natural.

D. não possui resolução espacial

Explicação: Todo imageador tem resolução espacial. Passivo não significa sempre dependente do Sol: sensores térmicos registram emissão natural.

**Resposta:** emite energia e mede o sinal de retorno

Sensores ativos têm fonte própria de energia.

## v6-fix-b5782254d12f27da

fixacao · D1/C2

O pixel de uma imagem de satélite corresponde, conceitualmente, a:

A. uma célula da grade com valor registrado

Explicação: Uma imagem raster organiza os registros em uma grade. Cada pixel é uma célula dessa grade e contém um valor por banda ou camada representada.

B. uma linha vetorial obrigatória

Explicação: Uma linha vetorial é definida por geometria e vértices. Pixel é célula de uma grade raster; não é uma linha vetorial obrigatória.

C. um satélite completo

Explicação: O satélite é a plataforma que transporta o sensor. Pixel é uma unidade da imagem produzida, não a plataforma inteira.

D. um datum geodésico

Explicação: Datum define um referencial geodésico. Pixel define a célula de uma imagem raster; os dois participam de funções diferentes na representação espacial.

**Resposta:** uma célula da grade com valor registrado

Imagem raster é uma grade de pixels/células.

## v6-fix-833bebfe438093ed

fixacao · D1/C2

A capacidade de distinguir pequenas diferenças de energia registrada pelo sensor é a resolução:

A. espacial

Explicação: Espacial trata do detalhe no terreno. Melhor resolução espacial não garante revisita suficiente nem classe identificável.

B. temporal

Explicação: Temporal trata da revisita. Melhor resolução espacial não garante revisita suficiente nem classe identificável.

C. radiométrica

Explicação: Correto.

D. cartográfica

Explicação: Não é uma das quatro resoluções de sensor. Melhor resolução espacial não garante revisita suficiente nem classe identificável.

**Resposta:** radiométrica

Radiométrica mede discriminação de níveis de sinal.

## v6-fix-86ce5d2c36ae03ef

fixacao · D1/C2

Se o objetivo é monitorar uma enchente que muda rapidamente, qual resolução ganha importância especial?

A. temporal

Explicação: Correto.

B. apenas espectral

Explicação: Espectral pode ajudar, mas não substitui revisita. Melhor resolução espacial não garante revisita suficiente nem classe identificável.

C. apenas cartográfica

Explicação: Não é resolução do sensor. Melhor resolução espacial não garante revisita suficiente nem classe identificável.

D. topológica

Explicação: Topologia é SIG. Melhor resolução espacial não garante revisita suficiente nem classe identificável.

**Resposta:** temporal

Alta frequência de revisita ajuda a acompanhar fenômenos dinâmicos.

## v6-fix-045511001dd9ef85

fixacao · D1/C2

No NDVI, a combinação básica usa:

A. azul e térmico

Explicação: Não. NDVI alto não prova espécie, biomassa exata, situação jurídica ou ausência de mudança.

B. NIR e vermelho

Explicação: Correto.

C. verde e radar

Explicação: Radar não entra na fórmula clássica. NDVI alto não prova espécie, biomassa exata, situação jurídica ou ausência de mudança.

D. apenas micro-ondas

Explicação: Não. NDVI alto não prova espécie, biomassa exata, situação jurídica ou ausência de mudança.

**Resposta:** NIR e vermelho

NDVI compara infravermelho próximo e vermelho.

## v6-fix-588346b88674e99e

fixacao · D1/C2

Uma composição falsa-cor é:

A. uma imagem necessariamente fraudulenta

Explicação: Não implica falsidade científica. NDVI alto não prova espécie, biomassa exata, situação jurídica ou ausência de mudança.

B. uma atribuição de bandas a cores de exibição para realçar alvos

Explicação: Correto.

C. uma projeção equivalente

Explicação: Não é projeção. NDVI alto não prova espécie, biomassa exata, situação jurídica ou ausência de mudança.

D. um erro de calibração

Explicação: Pode existir sem erro. NDVI alto não prova espécie, biomassa exata, situação jurídica ou ausência de mudança.

**Resposta:** uma atribuição de bandas a cores de exibição para realçar alvos

Falsa-cor é técnica legítima de visualização multiespectral.

## v6-fix-aab58af97c3cfca4

fixacao · D1/C2

Qual estrutura representa melhor uma rede rodoviária com trechos e interseções?

A. vetorial linear

Explicação: Correto.

B. raster obrigatório

Explicação: Raster é possível, mas não é a representação mais natural para a pergunta. Raster não é sempre fotografia e vetor não é sinônimo de precisão ilimitada.

C. tabela sem geometria

Explicação: Perde a geometria. Raster não é sempre fotografia e vetor não é sinônimo de precisão ilimitada.

D. imagem analógica

Explicação: Não é estrutura SIG. Raster não é sempre fotografia e vetor não é sinônimo de precisão ilimitada.

**Resposta:** vetorial linear

Linhas vetoriais representam bem redes discretas.

## v6-fix-76cd267f432fd0a1

fixacao · D1/C2

Criar uma faixa de 500 m ao redor de rios é uma operação de:

A. buffer

Explicação: Correto.

B. geocodificação

Explicação: Geocodificação transforma endereços em posições. Graus de longitude não são metros constantes e cruzar um município não significa expor toda a sua população.

C. classificação espectral

Explicação: É sensoriamento. Graus de longitude não são metros constantes e cruzar um município não significa expor toda a sua população.

D. reprojeção temporal

Explicação: Não existe nessa forma. Graus de longitude não são metros constantes e cruzar um município não significa expor toda a sua população.

**Resposta:** buffer

Buffer cria zonas de distância ao redor de feições.

## v6-fix-988d6242c5380fa0

fixacao · D1/C2

Um Modelo Digital de Elevação é frequentemente armazenado como:

A. raster contínuo

Explicação: Correto.

B. apenas pontos nominais

Explicação: Pode existir amostragem pontual, mas MDE usual é raster. Raster não é sempre fotografia e vetor não é sinônimo de precisão ilimitada.

C. texto sem coordenadas

Explicação: Sem coordenadas não há superfície. Raster não é sempre fotografia e vetor não é sinônimo de precisão ilimitada.

D. legenda categórica

Explicação: Não é estrutura de dados. Raster não é sempre fotografia e vetor não é sinônimo de precisão ilimitada.

**Resposta:** raster contínuo

Altitude contínua é comumente representada em grade raster.

## v6-fix-c2635f4a7e1dba37

fixacao · D1/C2

Qual relação é topológica?

A. distância exata de 3,4 km

Explicação: É métrica. Graus de longitude não são metros constantes e cruzar um município não significa expor toda a sua população.

B. adjacência entre dois polígonos

Explicação: Correto.

C. valor de NDVI

Explicação: É atributo raster/espectral. Graus de longitude não são metros constantes e cruzar um município não significa expor toda a sua população.

D. número de bits do sensor

Explicação: É radiometria. Graus de longitude não são metros constantes e cruzar um município não significa expor toda a sua população.

**Resposta:** adjacência entre dois polígonos

Adjacência é relação topológica.

## v6-fix-0fa0dea95642b75c

fixacao · D1/C2

Qual afirmação é correta?

A. GNSS é apenas o sistema GPS

Explicação: GNSS é mais amplo. Número de satélites não torna automaticamente a medição cadastral precisa.

B. GPS é uma das constelações GNSS

Explicação: Correto.

C. SIRGAS2000 é um satélite

Explicação: É referencial geodésico. Número de satélites não torna automaticamente a medição cadastral precisa.

D. UTM substitui qualquer datum

Explicação: Projeção e datum têm funções diferentes. Número de satélites não torna automaticamente a medição cadastral precisa.

**Resposta:** GPS é uma das constelações GNSS

GPS integra o conjunto GNSS.

## v6-fix-9128c61e1ed75145

fixacao · D1/C2

Por que quatro satélites são referência mínima para posicionamento GNSS 3D convencional?

A. para obter x, y, z e corrigir o erro do relógio do receptor

Explicação: Correto.

B. porque cada satélite mede um fuso UTM

Explicação: Não. Número de satélites não torna automaticamente a medição cadastral precisa.

C. para eliminar todas as fontes de erro

Explicação: Erros adicionais permanecem. Número de satélites não torna automaticamente a medição cadastral precisa.

D. porque existem quatro hemisférios

Explicação: Não há quatro hemisférios nessa lógica. Número de satélites não torna automaticamente a medição cadastral precisa.

**Resposta:** para obter x, y, z e corrigir o erro do relógio do receptor

São quatro incógnitas básicas: três coordenadas e viés de relógio.

## v6-fix-4fcee41852d78f7c

fixacao · D1/C2

Na Amazônia Legal, qual sistema é referência para a estimativa anual oficial da taxa de desmatamento por corte raso?

A. DETER

Explicação: DETER é alerta expedito. Imagem detecta padrões; atribuição causal, legal e social requer dados complementares e validação.

B. PRODES

Explicação: Correto.

C. GPS

Explicação: É navegação. Imagem detecta padrões; atribuição causal, legal e social requer dados complementares e validação.

D. UTM

Explicação: É projeção/coordenadas. Imagem detecta padrões; atribuição causal, legal e social requer dados complementares e validação.

**Resposta:** PRODES

O PRODES produz as estimativas anuais consolidadas; o DETER é um sistema de alertas para fiscalização.

## v6-fix-dcb23160320df481

fixacao · D1/C2

A função principal do DETER é:

A. produzir exclusivamente a taxa anual consolidada

Explicação: Essa é a função do PRODES para taxa anual. Imagem detecta padrões; atribuição causal, legal e social requer dados complementares e validação.

B. gerar alertas rápidos para apoiar fiscalização

Explicação: Correto.

C. definir o datum brasileiro

Explicação: SIRGAS2000 é o referencial. Imagem detecta padrões; atribuição causal, legal e social requer dados complementares e validação.

D. calcular projeções cartográficas

Explicação: Não. Imagem detecta padrões; atribuição causal, legal e social requer dados complementares e validação.

**Resposta:** gerar alertas rápidos para apoiar fiscalização

O DETER é expedito e operacional; seus alertas não equivalem à taxa anual consolidada do PRODES.

## v6-fix-3df001d3a09f53ef

fixacao · D1/C2

Um sensor que emite seu próprio pulso de energia e mede o retorno é classificado como:

A. passivo

Explicação: Sensores passivos dependem de energia externa. Passivo não significa sempre dependente do Sol: sensores térmicos registram emissão natural.

B. ativo

Explicação: Correto.

C. analógico

Explicação: Analógico não é a distinção pedida. Passivo não significa sempre dependente do Sol: sensores térmicos registram emissão natural.

D. vetorial

Explicação: Vetorial é estrutura de dados, não tipo de sensor. Passivo não significa sempre dependente do Sol: sensores térmicos registram emissão natural.

**Resposta:** ativo

Radar e LiDAR são exemplos clássicos de sensores ativos.

## v6-fix-c9007e14ce62d664

fixacao · D1/C2

(Sensoriamento) Um sensor distingue 16.384 níveis de intensidade em uma banda. A característica destacada é principalmente:

A. resolução temporal

Explicação: Temporal = revisita. Melhor resolução espacial não garante revisita suficiente nem classe identificável.

B. resolução radiométrica

Explicação: Correto.

C. resolução espacial

Explicação: Espacial = pixel. Melhor resolução espacial não garante revisita suficiente nem classe identificável.

D. projeção cartográfica

Explicação: Não é projeção. Melhor resolução espacial não garante revisita suficiente nem classe identificável.

E. topologia

Explicação: É conceito SIG. Melhor resolução espacial não garante revisita suficiente nem classe identificável.

**Resposta:** resolução radiométrica

16.384 = 2^14 níveis; isso descreve discretização radiométrica.

## v6-fix-df0accd0b0af1130

fixacao · D1/C2

(SIG) Para localizar escolas que estão simultaneamente dentro de bairros vulneráveis e a até 500 m de rios, a estratégia central é:

A. buffer nos rios e overlay com escolas/bairros

Explicação: Correto.

B. apenas aumentar a resolução radiométrica

Explicação: Não responde à relação espacial. Graus de longitude não são metros constantes e cruzar um município não significa expor toda a sua população.

C. converter tudo para gráfico de barras

Explicação: Perde a localização. Graus de longitude não são metros constantes e cruzar um município não significa expor toda a sua população.

D. usar Mercator sem análise

Explicação: Projeção não substitui análise. Graus de longitude não são metros constantes e cruzar um município não significa expor toda a sua população.

E. trocar GPS por Galileo

Explicação: Constelação GNSS não resolve o cruzamento. Graus de longitude não são metros constantes e cruzar um município não significa expor toda a sua população.

**Resposta:** buffer nos rios e overlay com escolas/bairros

Buffer cria faixa de distância; overlay/seleção espacial cruza as condições.

## v6-fix-ee65e05d0b8bce18

fixacao · D1/C2

Uma prefeitura quer comparar áreas de risco, escolas e população em camadas digitais. A ferramenta mais adequada é:

A. projeção cartográfica isolada

Explicação: Uma projeção fornece uma transformação geométrica, mas não executa sozinha o armazenamento e o cruzamento de camadas de risco, escolas e população. Essas funções são próprias de um SIG.

B. SIG

Explicação: SIG integra camadas espaciais e atributos, permitindo cruzamentos e análises.

C. apenas GNSS

Explicação: GNSS fornece posicionamento por satélites. Pode apoiar a coleta de pontos de escolas, mas não substitui o SIG necessário para integrar e analisar as diferentes camadas.

D. escala gráfica

Explicação: Escala gráfica auxilia a leitura de distâncias. Ela não organiza atributos nem cruza áreas de risco, escolas e população; para isso, utiliza-se um SIG.

**Resposta:** SIG

SIG integra camadas espaciais e atributos, permitindo cruzamentos e análises.

## v6-fix-6c331742e5afd67d

fixacao · D1/C2

Qual é um exemplo de sensor ativo?

A. radar

Explicação: Radar emite micro-ondas e mede o retorno.

B. câmera óptica dependente de luz solar

Explicação: A câmera descrita registra luz solar refletida pelos alvos, sem emitir a energia de iluminação considerada no exemplo. É um sensor passivo, ao contrário do radar.

C. olho humano

Explicação: O olho humano recebe a luz proveniente dos objetos; não emite pulsos para medir seu retorno. No contraste proposto, ele exemplifica recepção passiva.

D. fotografia aérea analógica passiva

Explicação: Analógico descreve o meio de registro, não torna o sensor ativo. A alternativa informa aquisição passiva, enquanto o radar emite energia e mede o retorno.

**Resposta:** radar

Radar emite micro-ondas e mede o retorno.

## v6-fix-0d1e0738f61b9aa7

fixacao · D1/C2

Uma limitação típica do sensoriamento óptico na Amazônia é:

A. ausência de radiação solar

Explicação: Há radiação solar na Amazônia. No sensoriamento óptico refletido diurno, uma limitação frequente é a presença de nuvens entre o sensor e a superfície, não a ausência regional de Sol.

B. cobertura frequente de nuvens

Explicação: Nuvens podem ocultar a superfície em imagens ópticas.

C. impossibilidade de registrar vegetação

Explicação: Sensores ópticos podem registrar a vegetação por sua resposta espectral, inclusive no visível e no NIR. Nuvens podem ocultar os alvos, mas isso não torna a vegetação impossível de registrar.

D. falta de coordenadas

Explicação: Imagens ópticas podem ser georreferenciadas. A limitação atmosférica típica pedida é a cobertura de nuvens, que pode impedir a observação da superfície.

**Resposta:** cobertura frequente de nuvens

Nuvens podem ocultar a superfície em imagens ópticas.

## v6-fix-bf862746b8832753

fixacao · D1/C2

Para detectar objetos pequenos no terreno, a característica mais diretamente relevante é:

A. resolução espacial

Explicação: Objetos menores exigem pixels menores e maior detalhe espacial.

B. fuso horário

Explicação: Fuso horário organiza a hora civil e não define o tamanho do detalhe discernível em uma imagem. Para objetos pequenos, a dimensão diretamente relevante é a resolução espacial.

C. projeção equivalente

Explicação: Equivalência é propriedade de projeção que preserva relações de área. Ela não reduz o tamanho do pixel nem garante que pequenos objetos sejam distinguíveis.

D. resolução temporal apenas

Explicação: Revisitar frequentemente permite acompanhar mudanças, mas não garante distinguir um objeto menor que o detalhe espacial efetivo. Para o tamanho dos objetos, avalie a resolução espacial.

**Resposta:** resolução espacial

Objetos menores exigem pixels menores e maior detalhe espacial.

## v6-fix-55c07d3e920f8178

fixacao · D1/C2

Um satélite que revisita a mesma área com maior frequência possui melhor:

A. resolução temporal

Explicação: Resolução temporal é a frequência de observação/revisita.

B. escala numérica

Explicação: Escala numérica é uma relação entre representação e terreno. A repetição de observações da mesma área é uma dimensão temporal do sensoriamento.

C. resolução geodésica

Explicação: Referencial e qualidade geodésica condicionam posições, mas não nomeiam a frequência de revisita. No conjunto das quatro resoluções, a característica pedida é a temporal.

D. equidistância altimétrica

Explicação: Equidistância altimétrica é o intervalo vertical entre curvas de nível de uma carta. Não descreve a frequência de aquisição das imagens, que é resolução temporal.

**Resposta:** resolução temporal

Resolução temporal é a frequência de observação/revisita.

## v6-fix-ee3f6ddb1bce6d97

fixacao · D1/C2

Vegetação saudável costuma apresentar alta reflectância no:

A. infravermelho próximo

Explicação: O NIR é muito refletido por folhas saudáveis.

B. raio X

Explicação: A assinatura usada neste estudo de vegetação corresponde à alta reflectância no infravermelho próximo. Raios X não são a faixa que caracteriza esse comportamento das folhas no sensoriamento orbital usual.

C. ultravioleta extremo apenas

Explicação: A resposta destacada é a elevada reflectância no NIR, associada à estrutura interna das folhas. Ultravioleta extremo não substitui essa faixa na interpretação ou na fórmula do NDVI.

D. som audível

Explicação: Som é uma onda mecânica, não uma faixa do espectro eletromagnético. A reflectância foliar discutida é da radiação no infravermelho próximo.

**Resposta:** infravermelho próximo

O NIR é muito refletido por folhas saudáveis.

## v6-fix-9861e84d10d843b5

fixacao · D1/C2

Em imagens de NIR, corpos d’água tendem a aparecer escuros porque:

A. refletem tudo

Explicação: Se refletissem intensamente o NIR para o sensor, esses alvos tenderiam a ter resposta mais clara nessa banda. A aparência escura usual da água está ligada à forte absorção.

B. absorvem fortemente essa radiação

Explicação: A água absorve grande parte do infravermelho próximo.

C. não têm coordenadas

Explicação: Posição geográfica e referenciamento não explicam o brilho de um alvo em uma banda. No NIR, a resposta escura usual da água decorre principalmente da absorção da radiação.

D. são sensores ativos

Explicação: Corpos d’água são os alvos observados, não sensores. Ativo é o instrumento que emite energia e mede o retorno; a pergunta trata da resposta espectral da água.

**Resposta:** absorvem fortemente essa radiação

A água absorve grande parte do infravermelho próximo.

## v6-fix-d7c20c077dc81694

fixacao · D1/C2

No NDVI, a vegetação saudável tende a combinar:

A. alta reflectância no NIR e baixa no vermelho

Explicação: A diferença entre NIR alto e vermelho baixo eleva o NDVI.

B. baixa reflectância em todas as bandas

Explicação: Absorver ou refletir pouco em todas as bandas não descreve o contraste típico da vegetação saudável usado no NDVI. O índice se beneficia de NIR relativamente alto e vermelho baixo.

C. alta no vermelho e zero no NIR

Explicação: Essa combinação inverte a resposta foliar típica: a clorofila absorve fortemente no vermelho e a estrutura da folha favorece reflectância no NIR. Com NIR zero e vermelho positivo, o NDVI seria negativo.

D. apenas micro-ondas

Explicação: O NDVI clássico combina vermelho e infravermelho próximo, e não micro-ondas. Radar pode apoiar estudos de vegetação, mas opera com outra resposta física.

**Resposta:** alta reflectância no NIR e baixa no vermelho

A diferença entre NIR alto e vermelho baixo eleva o NDVI.

## v6-fix-f6d3380c31b4466d

fixacao · D1/C2

Na classificação supervisionada:

A. não existem amostras conhecidas

Explicação: A classificação supervisionada depende de exemplos de classes fornecidos para treinamento. Agrupar pixels sem classes previamente informadas corresponde ao princípio da classificação não supervisionada.

B. o analista fornece exemplos/classes de treinamento

Explicação: A supervisão usa amostras previamente identificadas.

C. o mapa dispensa validação

Explicação: Usar treinamento não demonstra a qualidade do mapa final. É necessário avaliar classes com referência independente e examinar erros, por exemplo por matriz de confusão.

D. cada pixel vira uma coordenada GNSS

Explicação: Classificar atribui classes a pixels ou objetos segundo seus atributos. Não transforma cada pixel em uma medição por satélites GNSS, que pertence ao posicionamento.

**Resposta:** o analista fornece exemplos/classes de treinamento

A supervisão usa amostras previamente identificadas.

## v6-fix-cbff9213c997624c

fixacao · D1/C2

O referencial geodésico oficial do Brasil é:

A. SAD69 exclusivamente

Explicação: SAD69 é um referencial histórico ainda encontrado em bases antigas. O término da transição em 25/02/2015 estabeleceu o uso exclusivo de SIRGAS2000 no escopo dos sistemas geodésico e cartográfico nacionais indicado pelo IBGE.

B. SIRGAS2000

Explicação: SIRGAS2000 é o único referencial oficial no país desde 2015.

C. Mercator

Explicação: Mercator é uma projeção cartográfica; não é o referencial geodésico oficial brasileiro. O referencial pedido é SIRGAS2000.

D. UTM

Explicação: UTM é um sistema de coordenadas planas baseado na projeção Transversa de Mercator. Precisa de um referencial geodésico, como SIRGAS2000; não o substitui.

**Resposta:** SIRGAS2000

SIRGAS2000 é o único referencial oficial no país desde 2015.

## v6-fix-6ee5178c530e3757

fixacao · D1/C2

A sigla GNSS refere-se:

A. a um tipo de projeção

Explicação: Projeção cartográfica transforma posições da superfície de referência para um plano. GNSS designa sistemas de navegação e posicionamento por satélites.

B. ao conjunto de sistemas globais de navegação por satélite

Explicação: GNSS abrange constelações como GPS, GLONASS, Galileo e BeiDou.

C. a um índice de vegetação

Explicação: Um índice de vegetação, como NDVI, combina respostas espectrais. GNSS fornece posicionamento a partir de sinais de constelações como GPS, Galileo, GLONASS e BeiDou.

D. a uma escala gráfica

Explicação: Escala gráfica relaciona segmentos desenhados a distâncias no terreno. GNSS é uma tecnologia de posicionamento por satélites, não uma forma de escala.

**Resposta:** ao conjunto de sistemas globais de navegação por satélite

GNSS abrange constelações como GPS, GLONASS, Galileo e BeiDou.

## v6-fix-a5b78f5ee8bc6325

fixacao · D1/C2

Uma rede de rodovias é frequentemente modelada como:

A. linhas vetoriais

Explicação: Rodovias são feições lineares e se adequam ao modelo vetorial.

B. pixels sem localização

Explicação: Pixels sem localização não fornecem uma rede georreferenciada. Um raster referenciado pode representar vias, mas linhas vetoriais expressam de modo direto seus trechos, nós e conexões.

C. apenas tabela

Explicação: Uma tabela pode guardar atributos das rodovias, mas, isoladamente e sem geometrias ou relações de rede, não descreve seu traçado espacial. Linhas vetoriais representam esse traçado.

D. curvas de fuso

Explicação: Fusos organizam referências de coordenadas ou de horário, conforme o sistema. Não são a geometria de uma rede rodoviária, normalmente descrita por trechos lineares conectados.

**Resposta:** linhas vetoriais

Rodovias são feições lineares e se adequam ao modelo vetorial.

## v6-fix-d5f971faee0fc87f

fixacao · D1/C2

Um modelo digital de elevação é comumente representado como:

A. raster

Explicação: Elevação contínua é frequentemente armazenada em grade raster.

B. lista sem coordenadas

Explicação: Uma lista de altitudes sem coordenadas não localiza os valores nem permite construir a superfície espacial de elevação. Uma grade raster associa valores a células referenciadas.

C. texto corrido

Explicação: Texto corrido pode descrever o relevo, mas não constitui a estrutura numérica espacial de um MDE. No armazenamento raster usual, cada célula guarda um valor de elevação.

D. projeção conforme

Explicação: Conformidade é uma propriedade de projeção, não um modelo de armazenamento de altitudes. Um MDE pode ser referenciado a uma projeção e armazenado em raster.

**Resposta:** raster

Elevação contínua é frequentemente armazenada em grade raster.

## v6-fix-67c40485ec0361b6

fixacao · D1/C2

Para delimitar uma faixa de 500 m ao redor de um rio, usa-se:

A. buffer

Explicação: Buffer cria zonas de distância em torno de feições.

B. NDVI

Explicação: NDVI é um índice espectral ligado à vegetação. Não delimita uma faixa métrica de proximidade; para 500 m ao redor do rio, use buffer com referência e unidades adequadas.

C. fuso horário

Explicação: Fuso horário trata da organização da hora civil. A faixa de 500 m é uma condição de distância espacial e deve ser construída por uma operação de buffer.

D. anamorfose

Explicação: Anamorfose modifica a representação das áreas segundo uma variável. Não é a operação usual para delimitar todos os locais a até 500 m de um rio, que é buffer.

**Resposta:** buffer

Buffer cria zonas de distância em torno de feições.

## v6-fix-586335be47954c67

fixacao · D1/C2

Metadados geoespaciais servem para:

A. substituir coordenadas

Explicação: Metadados descrevem as condições de produção e uso dos dados; não substituem as coordenadas que localizam as feições. Os dois componentes são necessários à avaliação da base.

B. descrever origem, qualidade, data e características da base

Explicação: Metadados permitem avaliar adequação e confiabilidade da informação.

C. eliminar projeções

Explicação: Registrar metadados não elimina a necessidade de uma referência espacial apropriada. Eles devem informar, entre outras características, datum, projeção ou sistema de coordenadas utilizado.

D. calcular fuso sem dados

Explicação: Metadados podem informar data e referência temporal, mas não calculam um horário civil sem as informações pertinentes. Sua função geral é documentar origem, qualidade e características da base.

**Resposta:** descrever origem, qualidade, data e características da base

Metadados permitem avaliar adequação e confiabilidade da informação.

## v6-fix-4dc57181021f476d

fixacao · D1/C2

No monitoramento amazônico, DETER e PRODES:

A. são exatamente o mesmo sistema

Explicação: DETER produz alertas operacionais, enquanto PRODES produz mapeamento e estimativa anual consolidada no recorte estudado. Objetivos, períodos e métodos distintos impedem tratá-los como um único sistema.

B. têm finalidades distintas e complementares

Explicação: DETER prioriza alertas operacionais; PRODES mede o desmatamento anual consolidado.

C. dispensam imagens de satélite

Explicação: Os sistemas empregam sensoriamento remoto para detectar e mapear alterações na cobertura. Validação e outras informações complementam a interpretação, mas não tornam as imagens dispensáveis em sua metodologia.

D. não podem ser usados no Pará

Explicação: O Pará integra o território de monitoramento amazônico. Dados dos sistemas podem apoiar análises no estado, respeitando finalidade, período, resolução e demais limites de cada produto.

**Resposta:** têm finalidades distintas e complementares

DETER prioriza alertas operacionais; PRODES mede o desmatamento anual consolidado.

## v6-fix-ec38ba5c24fee2e8

fixacao · D1/C2

Cruzar mineração, unidades de conservação e hidrografia em um SIG ajuda a:

A. eliminar conflitos automaticamente

Explicação: Identificar sobreposições fornece evidência territorial, mas não resolve automaticamente disputas. Decisões dependem também de contexto, regras aplicáveis e participação dos envolvidos.

B. identificar sobreposições e áreas de pressão

Explicação: SIG auxilia análise espacial, mas decisão e causalidade exigem contexto adicional.

C. substituir licenciamento ambiental

Explicação: Um cruzamento em SIG pode subsidiar a avaliação territorial, mas não substitui o procedimento de licenciamento nem demonstra, por si só, sua regularidade.

D. provar causalidade sem campo

Explicação: Sobreposição ou proximidade espacial não prova causalidade. Explicar os processos pode exigir séries temporais, dados independentes, conhecimento territorial e verificação de campo quando pertinente.

**Resposta:** identificar sobreposições e áreas de pressão

SIG auxilia análise espacial, mas decisão e causalidade exigem contexto adicional.

## v6-fix-35d096cea007d390

fixacao · D1/C2

Uma sequência didática cartográfica consistente deve:

A. começar por comandos técnicos sem problema geográfico

Explicação: Comandos de software podem apoiar a atividade, mas precisam responder a uma pergunta geográfica e a objetivos de aprendizagem. A sequência deve desenvolver leitura, comparação e interpretação espacial.

B. articular representação, leitura, comparação e interpretação espacial

Explicação: Cartografia escolar deve desenvolver raciocínio, não apenas operação técnica.

C. evitar o espaço vivido

Explicação: O espaço vivido pode oferecer situações investigáveis, como trajetos e barreiras de acesso à escola. Evitá-lo como regra reduz possibilidades de relacionar representação e experiência dos estudantes.

D. usar apenas mapas prontos

Explicação: Mapas prontos são recursos úteis, mas não precisam ser exclusivos. Construir legendas, produzir representações e comparar escolhas ajuda a verificar o raciocínio cartográfico.

**Resposta:** articular representação, leitura, comparação e interpretação espacial

Cartografia escolar deve desenvolver raciocínio, não apenas operação técnica.

## v6-fix-bbbba4531de29989

fixacao · D1/C2

Ao usar geotecnologias em aula, o princípio mais adequado é:

A. a ferramenta é o objetivo final

Explicação: Operar a ferramenta pode ser uma habilidade intermediária, mas a aprendizagem geográfica exige interpretar um problema espacial. A escolha do recurso deve decorrer desse objetivo.

B. a tecnologia deve responder a uma questão geográfica e favorecer análise

Explicação: Tecnologia é meio para investigar e comunicar processos espaciais.

C. quanto mais camadas, melhor a aula

Explicação: Acumular camadas pode aumentar a carga de informação sem melhorar a análise. Selecione dados pertinentes à pergunta e peça aos estudantes que justifiquem suas interpretações.

D. imagens dispensam mediação docente

Explicação: Imagens dependem de leitura, contexto e escolhas de interpretação. A mediação docente ajuda a relacionar representação, conceitos e limites das evidências.

**Resposta:** a tecnologia deve responder a uma questão geográfica e favorecer análise

Tecnologia é meio para investigar e comunicar processos espaciais.

## v6-fix-d109a030a0d88278

fixacao · D1/C2

Em sensoriamento remoto, resolução espacial indica:

A. o número de bandas espectrais

Explicação: Quantidade e largura de bandas pertencem à resolução espectral. A resolução espacial está relacionada ao tamanho do pixel e ao detalhe discernível no terreno.

B. o tamanho da menor unidade/pixel representada no terreno

Explicação: Resolução espacial está relacionada ao tamanho do pixel e ao detalhe geométrico observável.

C. a frequência de revisita

Explicação: Frequência de revisita é resolução temporal. Uma observação mais frequente não reduz automaticamente o pixel nem aumenta o detalhe espacial.

D. o número de níveis de cinza

Explicação: Número de níveis digitais está associado à resolução radiométrica. Ele descreve discriminação de intensidade, não o tamanho da célula no terreno.

**Resposta:** o tamanho da menor unidade/pixel representada no terreno

Resolução espacial está relacionada ao tamanho do pixel e ao detalhe geométrico observável.

## v6-fix-832cbc5273858fd2

fixacao · D1/C2

Assinale a alternativa que diferencia corretamente resolução espacial e temporal:

A. espacial = frequência de revisita; temporal = tamanho do pixel

Explicação: As definições estão invertidas. Espacial se relaciona ao detalhe ou tamanho de pixel; temporal, à frequência com que a mesma área é observada.

B. espacial = tamanho do pixel; temporal = frequência de revisita

Explicação: Espacial trata do detalhe geométrico; temporal, da repetição das observações.

C. ambas medem número de bandas

Explicação: Número e largura das bandas caracterizam a dimensão espectral. Espacial e temporal respondem a perguntas diferentes: qual detalhe e com que frequência?

D. ambas são sinônimas de escala cartográfica

Explicação: Escala cartográfica é uma razão entre representação e terreno. As resoluções espacial e temporal descrevem propriedades da aquisição de imagens e não são sinônimos dessa razão.

E. temporal mede apenas cores

Explicação: Cores de exibição dependem da composição de bandas e da simbologia. Resolução temporal é frequência de observação ou revisita, não uma contagem de cores.

**Resposta:** espacial = tamanho do pixel; temporal = frequência de revisita

Espacial trata do detalhe geométrico; temporal, da repetição das observações.

## v6-fix-3c28ce6a0f885125

fixacao · D1/C2

Para identificar municípios a até 10 km de uma rodovia e cruzá-los com população, a sequência mais adequada é:

A. criar buffer da rodovia e sobrepor à camada municipal com atributos

Explicação: Buffer + overlay/seleção espacial é a lógica adequada.

B. usar projeção de Mercator apenas

Explicação: Uma projeção adequada pode ser necessária para medir, mas não cria a faixa de 10 km nem seleciona os municípios. É preciso executar buffer e cruzamento espacial com a camada municipal e seus atributos.

C. calcular NDVI e dispensar SIG

Explicação: NDVI informa um contraste espectral de vegetação, não a proximidade à rodovia. A pergunta exige uma faixa de distância e a integração com dados municipais em SIG.

D. usar GNSS sem base cartográfica

Explicação: GNSS pode fornecer posições de campo, mas não substitui as geometrias da rodovia, dos municípios e os atributos populacionais necessários ao cruzamento.

E. alterar o datum até coincidir

Explicação: O datum deve corresponder à referência real dos dados; não deve ser alterado por tentativa até obter coincidência visual. Confirme as referências e transforme corretamente antes da análise.

**Resposta:** criar buffer da rodovia e sobrepor à camada municipal com atributos

Buffer + overlay/seleção espacial é a lógica adequada.

## v6-fix-2e242804dd71e8fe

fixacao · D1/C2

Uma base vetorial em SAD69 é sobreposta a outra em SIRGAS2000 sem transformação. O principal risco é:

A. as feições apresentarem deslocamentos por referenciais distintos

Explicação: Misturar referenciais geodésicos pode deslocar feições e comprometer análises.

B. a escala gráfica desaparecer

Explicação: A escala gráfica não desaparece por misturar referenciais. O risco central é interpretar coordenadas de referenciais distintos como se localizassem as feições na mesma posição.

C. o sensor virar passivo

Explicação: Ativo ou passivo descreve o modo de aquisição de energia de um sensor. Misturar SAD69 e SIRGAS2000 em camadas vetoriais não transforma o sensor; pode deslocar as feições sobrepostas.

D. a latitude passar de 90°

Explicação: Latitude acima de 90° é inválida, mas não é a consequência necessária dessa sobreposição. A incompatibilidade de referenciais pode causar deslocamentos mesmo com valores dentro dos limites angulares.

E. o mapa se tornar equivalente

Explicação: Equivalência é propriedade de projeção relacionada à área. Sobrepor dados sem transformar seus referenciais não torna a representação equivalente nem corrige sua posição.

**Resposta:** as feições apresentarem deslocamentos por referenciais distintos

Misturar referenciais geodésicos pode deslocar feições e comprometer análises.

## v6-q-g01

concurso · D2/C3

Para observar uma área frequentemente nublada, inclusive à noite, qual propriedade favorece o uso de radar de micro-ondas?

A. Dependência exclusiva da luz solar refletida nas folhas.

Explicação: Essa descrição corresponde ao sensoriamento óptico passivo refletido.

B. Ausência de interação com a superfície.

Explicação: O sinal de retorno decorre da interação com rugosidade, umidade e geometria do alvo.

C. Produção direta da cor natural sem interpretação.

Explicação: O retorno radar não é uma fotografia RGB natural.

D. Eliminação de toda incerteza e necessidade de validação.

Explicação: Imagens radar continuam sujeitas a ruído, geometria e ambiguidades de interpretação.

E. Emissão própria de energia e capacidade de atravessar muitas nuvens, conforme frequência e condições.

Explicação: O radar é ativo; sua operação não depende da iluminação solar e é menos limitada por nuvens que o óptico refletido.

**Resposta:** Emissão própria de energia e capacidade de atravessar muitas nuvens, conforme frequência e condições.

O radar é ativo; sua operação não depende da iluminação solar e é menos limitada por nuvens que o óptico refletido.

## v6-q-g02

concurso · D2/C3

Um sensor armazena cada banda em 14 bits. Quantos níveis digitais podem ser representados, em princípio?

A. 16.384, associados à resolução radiométrica.

Explicação: 2¹⁴=16.384; o número de níveis descreve discretização de intensidade, não tamanho do pixel.

B. 14, associados à resolução espectral.

Explicação: Bits codificam níveis digitais de intensidade em cada banda; a quantidade de bandas pertence à dimensão espectral.

C. 196, associados à resolução espacial.

Explicação: 14² não é a quantidade de códigos binários e não fornece tamanho de pixel.

D. 1.024, associados à resolução temporal.

Explicação: 1.024 corresponde a 10 bits; revisita não é determinada pelos bits.

E. 16.384 m de resolução espacial.

Explicação: A contagem de níveis não tem unidade de comprimento.

**Resposta:** 16.384, associados à resolução radiométrica.

2¹⁴=16.384; o número de níveis descreve discretização de intensidade, não tamanho do pixel.

## v6-q-g03

concurso · D2/C3

Uma camada SAD69 e outra SIRGAS2000 não coincidem. Qual procedimento é tecnicamente mais adequado?

A. Atribuir o rótulo SIRGAS2000 à camada SAD69 sem transformar valores.

Explicação: Definir metadado não altera corretamente as coordenadas de origem.

B. Confirmar os referenciais e aplicar transformação apropriada, validando o alinhamento.

Explicação: Referenciais diferentes podem gerar deslocamento; parâmetros, área de uso e época devem ser considerados.

C. Mudar apenas a cor da camada superior.

Explicação: A simbologia altera a aparência, mas não transforma coordenadas nem corrige a diferença entre referenciais.

D. Converter todos os graus em metros sem projeção e datum definidos.

Explicação: A conversão exige uma referência matemática completa.

E. Ignorar a diferença porque GPS e SIRGAS2000 são sinônimos.

Explicação: GPS é uma constelação; SIRGAS2000 é um referencial geodésico.

**Resposta:** Confirmar os referenciais e aplicar transformação apropriada, validando o alinhamento.

Referenciais diferentes podem gerar deslocamento; parâmetros, área de uso e época devem ser considerados.

## v6-q-g04

concurso · D3/C4

Para selecionar escolas a até 500 m de rios e dentro de bairros vulneráveis, qual sequência é coerente?

A. Colorir rios de azul e contar escolas visualmente sem referência métrica.

Explicação: Simbologia não executa a condição de distância nem garante reprodutibilidade.

B. Usar 500 graus como largura do buffer.

Explicação: O limite pedido é métrico; graus não são metros constantes.

C. Compatibilizar dados, criar buffer dos rios e combinar a seleção espacial com os bairros vulneráveis.

Explicação: A distância define o buffer e a conjunção das condições exige cruzar as camadas, com unidades adequadas.

D. Geocodificar os rios e dispensar os bairros.

Explicação: Geocodificação localiza endereços; não substitui as duas condições espaciais.

E. Selecionar todas as escolas de qualquer município cortado por um rio.

Explicação: Interseção municipal não prova que cada escola está a até 500 m.

**Resposta:** Compatibilizar dados, criar buffer dos rios e combinar a seleção espacial com os bairros vulneráveis.

A distância define o buffer e a conjunção das condições exige cruzar as camadas, com unidades adequadas.

## v6-q-g05

concurso · D2/C3

Uma equipe recebe um webmap sem data, referência geodésica ou método de aquisição. Qual é a primeira providência para uma análise métrica responsável?

A. Usar o nível máximo de zoom como prova de precisão.

Explicação: Zoom não acrescenta acurácia aos dados originais.

B. Considerar toda base digital automaticamente atual.

Explicação: Formato digital não garante data recente nem atualização.

C. Interpolar a data ausente a partir da cor dos símbolos.

Explicação: Interpolação espacial não recupera metadados desconhecidos.

D. Obter metadados e avaliar adequação temporal, referência, precisão e método.

Explicação: A interface interativa não documenta a qualidade da base; é necessário conhecer suas condições de produção.

E. Substituir o datum pelo nome do município.

Explicação: Nome geográfico não define referência geométrica.

**Resposta:** Obter metadados e avaliar adequação temporal, referência, precisão e método.

A interface interativa não documenta a qualidade da base; é necessário conhecer suas condições de produção.

## v6-q-g06

concurso · D3/C4

Um relatório soma alertas mensais DETER e publica o total como taxa anual oficial de corte raso na Amazônia Legal. Qual crítica é pertinente?

A. O DETER é inadequado para qualquer fiscalização.

Explicação: Apoiar fiscalização e controle é justamente sua finalidade.

B. O PRODES é um sistema de posicionamento por satélite.

Explicação: PRODES é monitoramento, enquanto GNSS é posicionamento.

C. A soma torna automaticamente os métodos equivalentes.

Explicação: Operar aritmeticamente sobre alertas não altera seu objetivo e suas limitações.

D. A diferença é apenas o nome, pois ambos sempre detectam os mesmos polígonos.

Explicação: Objetivos, resolução e oportunidade de observação podem gerar conjuntos distintos.

E. Confunde um produto de alerta operacional com a estimativa anual consolidada do PRODES.

Explicação: Sensores, períodos e procedimentos dos sistemas diferem; os produtos não são intercambiáveis.

**Resposta:** Confunde um produto de alerta operacional com a estimativa anual consolidada do PRODES.

Sensores, períodos e procedimentos dos sistemas diferem; os produtos não são intercambiáveis.

## v6-q-g07

elite · D3/C4

Os dados espectrais didáticos foram obtidos de bandas comparáveis. Qual cálculo e interpretação são defensáveis?

Apoio: Reflectâncias adimensionais de alvos hipotéticos

| Alvo | Vermelho | NIR |
| --- | --- | --- |
| P | 0,20 | 0,60 |
| Q | 0,10 | 0,02 |

A. P tem NDVI 0,5 e Q cerca de −0,67; os valores são indícios espectrais e não identificam, sozinhos, espécie ou situação jurídica.

Explicação: P: (0,6−0,2)/(0,6+0,2)=0,5. Q: (0,02−0,1)/(0,02+0,1)≈−0,67. O significado exige contexto e validação.

B. P tem NDVI 0,5 e Q cerca de 0,67; os módulos positivos permitem interpretar ambos como vegetação de vigor semelhante.

Explicação: Tomar o módulo apaga o sinal de Q. A diferença NIR−vermelho é negativa nesse alvo.

C. P tem NDVI 0,4 e Q −0,08; a diferença entre bandas já fornece o índice normalizado quando as reflectâncias são comparáveis.

Explicação: Esses são numeradores, não índices normalizados; falta dividir cada diferença pela soma das bandas.

D. P tem NDVI 0,5 e Q cerca de −0,67; essa separação prova que P é floresta primária e Q é água, dispensando amostras de referência.

Explicação: Os cálculos estão corretos, mas classes específicas e sua qualidade não são demonstradas só por dois valores do índice.

E. P tem NDVI −0,5 e Q cerca de 0,67; usar vermelho−NIR preserva o significado e os limiares do NDVI convencional.

Explicação: Inverter o numerador troca o sinal; os limiares e a interpretação do índice convencional não permanecem iguais.

**Resposta:** P tem NDVI 0,5 e Q cerca de −0,67; os valores são indícios espectrais e não identificam, sozinhos, espécie ou situação jurídica.

P: (0,6−0,2)/(0,6+0,2)=0,5. Q: (0,02−0,1)/(0,02+0,1)≈−0,67. O significado exige contexto e validação.

## v6-q-g08

elite · D4/C5

Uma classificação supervisionada obteve 99% de acerto ao ser avaliada com os próprios pixels usados no treinamento. Qual revisão metodológica é necessária?

A. Ampliar o conjunto de treinamento e recalcular a acurácia sobre ele, até que a diversidade de exemplos substitua um teste independente.

Explicação: Mais treinamento pode ajudar o modelo, mas avaliar nos próprios exemplos continua sem estimar adequadamente a generalização.

B. Avaliar com amostra de referência independente, informar o desenho amostral e examinar omissões e comissões por classe.

Explicação: Reutilizar treinamento na avaliação favorece estimativa otimista. Uma validação independente e a matriz de confusão permitem examinar a qualidade.

C. Separar apenas os pixels classificados com maior confiança e usá-los como referência, excluindo os casos ambíguos da validação.

Explicação: Selecionar pela confiança do próprio classificador exclui erros difíceis e não constitui referência independente representativa.

D. Apresentar somente a acurácia global, pois 99% torna irrelevante examinar a confusão de classes pequenas ou de interesse específico.

Explicação: Uma classe rara pode ter erro elevado mesmo com alta acurácia global; omissão e comissão importam à finalidade do mapa.

E. Dividir os pixels de treinamento em dois arquivos após o ajuste e considerar o segundo arquivo um teste, sem treinar novamente.

Explicação: A separação posterior não desfaz o uso desses pixels no ajuste; o modelo já teve acesso ao suposto teste.

**Resposta:** Avaliar com amostra de referência independente, informar o desenho amostral e examinar omissões e comissões por classe.

Reutilizar treinamento na avaliação favorece estimativa otimista. Uma validação independente e a matriz de confusão permitem examinar a qualidade.

## v6-q-g09

elite · D3/C5

Um buffer de 10 km de uma rodovia intersecta parte de dois municípios. O analista soma toda a população municipal e chama o resultado de população situada a até 10 km da estrada. Qual avaliação é correta?

A. A soma fornece exatamente a população na faixa, porque a seleção por interseção inclui apenas municípios com parte de seu território no buffer.

Explicação: Ter uma parte do município no buffer não significa que toda a população municipal esteja nessa parte.

B. Ponderar a população pela proporção da área municipal no buffer fornece o número exato de moradores, sem hipótese sobre distribuição interna.

Explicação: A ponderação por área pressupõe uma distribuição populacional; pode ser estimativa, mas não contagem exata sem outras evidências.

C. A interseção não localiza todos os moradores; é preciso estimar a distribuição populacional na faixa e declarar método e incerteza.

Explicação: A unidade agregada não coincide com a faixa de distância. Atribuir todo o total pode superestimar a população situada no buffer.

D. Somar a população dos municípios cujos centroides caem na faixa elimina a incerteza da agregação e determina quem reside perto da rodovia.

Explicação: O centroide é uma referência geométrica, não a localização de todos os moradores ou sua distribuição intramunicipal.

E. Multiplicar a área total do buffer pela densidade regional fornece uma contagem exata, pois a normalização elimina variação populacional local.

Explicação: Uma densidade média não elimina a heterogeneidade espacial; a operação impõe uma hipótese e produz estimativa.

**Resposta:** A interseção não localiza todos os moradores; é preciso estimar a distribuição populacional na faixa e declarar método e incerteza.

A unidade agregada não coincide com a faixa de distância. Atribuir todo o total pode superestimar a população situada no buffer.

## v6-q-g10

elite · D3/C4

Considere o par histórico Landsat do Rio de Janeiro apresentado com a questão: 19/09/1984 (Landsat 5/TM) e 25/09/2015 (Landsat 8/OLI). Ele permite observar diferenças de cobertura e forma urbana entre as duas datas, sem descrever a situação atual. Qual afirmação respeita o alcance desse tipo de evidência?

Apoio: Rio de Janeiro — par histórico Landsat, 1984 e 2015

![Cena em cores naturais de Barra da Tijuca e Zona Oeste do Rio de Janeiro, 1984-09-19, Landsat 5/TM. Vegetação em verde e áreas urbanizadas em cinza.](https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/imagerecords/88000/88103/rio_oli_1984263.jpg)

1984-09-19 — Landsat 5/TM. Jesse Allen/NASA Earth Observatory, com dados Landsat do USGS; artigo de Adam Voiland. Questão e comentários são autoria do projeto, sem revisão ou endosso da NASA.

![Cena em cores naturais de Barra da Tijuca e Zona Oeste do Rio de Janeiro, 2015-09-25, Landsat 8/OLI. Vegetação em verde e áreas urbanizadas em cinza.](https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/imagerecords/88000/88103/rio_oli_2015268.jpg)

2015-09-25 — Landsat 8/OLI. Jesse Allen/NASA Earth Observatory, com dados Landsat do USGS; artigo de Adam Voiland. Questão e comentários são autoria do projeto, sem revisão ou endosso da NASA.

Duas cenas da mesma área de Barra da Tijuca e Zona Oeste do Rio de Janeiro, em cores naturais. O artigo identifica vegetação em verde e áreas urbanizadas em cinza e descreve diferenças de cobertura e forma urbana entre as datas. Datas, sensores e processamento devem ser considerados na comparação.

A. Tratar as duas composições como equivalentes em resposta espectral se usarem os mesmos nomes de cores, sem conferir bandas e aquisição.

Explicação: As cores de exibição não garantem as mesmas bandas, respostas espectrais, condições atmosféricas ou sazonais.

B. Concluir que todo aumento de detalhe é expansão urbana, desde que a imagem mais recente tenha resolução espacial superior.

Explicação: Uma resolução melhor pode revelar objetos já existentes; detalhe adicional não é necessariamente transformação no terreno.

C. Atribuir as mudanças a um processo social específico depois de normalizar a radiometria, sem investigar dados territoriais ou históricos.

Explicação: Normalização pode melhorar comparabilidade, mas não transforma associação visual em demonstração causal.

D. Interpretar diferenças observáveis após conferir comparabilidade; atribuir causas requer evidências complementares às duas imagens.

Explicação: Data, estação, sensor e processamento condicionam a comparação; a imagem, sozinha, não identifica a causa social da mudança.

E. Usar apenas a coincidência visual entre os limites de classes nas duas datas como prova de ausência de mudança, sem medir erros de classificação.

Explicação: Erros de classe, registro e resolução podem ocultar ou simular diferenças; a coincidência aparente precisa ser avaliada.

**Resposta:** Interpretar diferenças observáveis após conferir comparabilidade; atribuir causas requer evidências complementares às duas imagens.

Data, estação, sensor e processamento condicionam a comparação; a imagem, sozinha, não identifica a causa social da mudança.

## v6-q-g11

elite · D3/C4

Uma equipe dispõe de endereços de escolas e valores de chuva medidos em estações. Deseja localizar escolas e estimar chuva entre estações. Qual associação é correta?

A. Georreferenciar os endereços com uma transformação de imagem e geocodificar a chuva entre estações, por serem dados com localização.

Explicação: Os problemas são de localização por descrição e estimativa de valores; os nomes das operações não são intercambiáveis.

B. Criar buffers dos endereços ainda sem posição e atribuir a cada área de chuva o nome da estação, dispensando localização e estimativa.

Explicação: Buffer requer feições localizadas e define distância; não resolve endereços nem estima chuva entre amostras.

C. Geocodificar endereços e interpolar chuva; considerar toda posição encontrada e todo valor interpolado como observação direta sem erro.

Explicação: A associação inicial está correta, mas a qualidade da geocodificação varia e interpolação produz estimativa, não nova observação.

D. Interpolar endereços e realizar overlay das estações para preencher automaticamente os valores ausentes de chuva em toda a região.

Explicação: Interpolar pressupõe variável e amostras adequadas; overlay cruza camadas, sem fornecer por si só um modelo de chuva.

E. Geocodificar endereços e interpolar chuva entre estações, avaliando a qualidade das posições e a incerteza da superfície estimada.

Explicação: Uma operação vincula descrições a posições; a outra estima valores em locais não amostrados. Ambas exigem avaliação.

**Resposta:** Geocodificar endereços e interpolar chuva entre estações, avaliando a qualidade das posições e a incerteza da superfície estimada.

Uma operação vincula descrições a posições; a outra estima valores em locais não amostrados. Ambas exigem avaliação.

## v6-q-g12

elite · D3/C5

Uma turma deve investigar barreiras no acesso à escola. Qual proposta articula cartografia, inclusão e evidência de aprendizagem?

A. Construir mapas de trajetos com legenda compartilhada, comparar barreiras e justificar alternativas, com recursos táteis ou textuais e avaliação do raciocínio.

Explicação: A proposta conecta pergunta, representação, comparação e evidência de aprendizagem, oferecendo formas acessíveis de participação.

B. Construir mapas acessíveis e corretos dos trajetos, avaliando a aprendizagem pelo número de funções digitais utilizadas e pela variedade de efeitos visuais.

Explicação: Acessibilidade e produção são relevantes, mas contar funções ou efeitos não demonstra interpretação espacial das barreiras.

C. Comparar trajetos em mapas com legenda e participação oral ou tátil, tomando sempre a menor distância em linha reta como prova de maior acessibilidade.

Explicação: A rota geometricamente menor pode conter barreiras; acessibilidade precisa considerar o problema e as condições observadas.

D. Usar um atlas nacional acessível para inferir os obstáculos de cada quarteirão, mantendo a atividade de comparação e exigindo justificativas dos alunos.

Explicação: Participação e justificativa não corrigem uma base sem detalhe compatível com a pergunta local.

E. Levantar barreiras com participação de todos e construir mapas, encerrando a avaliação no reconhecimento de símbolos sem pedir interpretação ou alternativas de acesso.

Explicação: Reconhecer símbolos faz parte da alfabetização, mas não cobre a comparação e a interpretação exigidas pelo problema investigado.

**Resposta:** Construir mapas de trajetos com legenda compartilhada, comparar barreiras e justificar alternativas, com recursos táteis ou textuais e avaliação do raciocínio.

A proposta conecta pergunta, representação, comparação e evidência de aprendizagem, oferecendo formas acessíveis de participação.
