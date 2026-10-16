# Revisão humana de questões — geotecnologias@0.1.1

Pacote pendente de aprovação. O gabarito abaixo é o gabarito candidato; conferir resposta única, distratores, explicação, nível e adequação ao conteúdo. Letras servem somente à leitura deste documento, não são identidades no aplicativo.

Parecer assistido por item em `audit.json`. Antes/depois em [changes.md](changes.md). Este documento não registra aprovação humana.

## v6-fix-b5782254d12f27da

fixacao · D1 / C2 · human-review-pending

O pixel de uma imagem de satélite corresponde, conceitualmente, a:

A. uma célula da grade com valor registrado — `v6-fix-b5782254d12f27da-o50a77378b4`

Feedback: Uma imagem raster organiza os registros em uma grade. Cada pixel é uma célula dessa grade e contém um valor por banda ou camada representada.

B. uma linha vetorial obrigatória — `v6-fix-b5782254d12f27da-o384a49cb6e`

Feedback: Uma linha vetorial é definida por geometria e vértices. Pixel é célula de uma grade raster; não é uma linha vetorial obrigatória.

C. um satélite completo — `v6-fix-b5782254d12f27da-o942126665f`

Feedback: O satélite é a plataforma que transporta o sensor. Pixel é uma unidade da imagem produzida, não a plataforma inteira.

D. um datum geodésico — `v6-fix-b5782254d12f27da-o931655ae0d`

Feedback: Datum define um referencial geodésico. Pixel define a célula de uma imagem raster; os dois participam de funções diferentes na representação espacial.

**Gabarito candidato:** uma célula da grade com valor registrado (`v6-fix-b5782254d12f27da-o50a77378b4`).

Imagem raster é uma grade de pixels/células.

Nota de revisão: Revisão editorial assistida 0.1.1: vínculo e feedbacks específicos corrigidos; originais em 0.1.0 e na procedência. Aguarda revisão humana.

Decisão humana: **pendente**.

## v6-q-g01

concurso · D2 / C3 · human-review-pending

Para observar uma área frequentemente nublada, inclusive à noite, qual propriedade favorece o uso de radar de micro-ondas?

A. Dependência exclusiva da luz solar refletida nas folhas. — `v6-q-g01-d1`

Feedback: Essa descrição corresponde ao sensoriamento óptico passivo refletido.

B. Ausência de interação com a superfície. — `v6-q-g01-d2`

Feedback: O sinal de retorno decorre da interação com rugosidade, umidade e geometria do alvo.

C. Produção direta da cor natural sem interpretação. — `v6-q-g01-d3`

Feedback: O retorno radar não é uma fotografia RGB natural.

D. Eliminação de toda incerteza e necessidade de validação. — `v6-q-g01-d4`

Feedback: Imagens radar continuam sujeitas a ruído, geometria e ambiguidades de interpretação.

E. Emissão própria de energia e capacidade de atravessar muitas nuvens, conforme frequência e condições. — `v6-q-g01-correct`

Feedback: O radar é ativo; sua operação não depende da iluminação solar e é menos limitada por nuvens que o óptico refletido.

**Gabarito candidato:** Emissão própria de energia e capacidade de atravessar muitas nuvens, conforme frequência e condições. (`v6-q-g01-correct`).

O radar é ativo; sua operação não depende da iluminação solar e é menos limitada por nuvens que o óptico refletido.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-g02

concurso · D2 / C3 · human-review-pending

Um sensor armazena cada banda em 14 bits. Quantos níveis digitais podem ser representados, em princípio?

A. 16.384, associados à resolução radiométrica. — `v6-q-g02-correct`

Feedback: 2¹⁴=16.384; o número de níveis descreve discretização de intensidade, não tamanho do pixel.

B. 14, associados à resolução espectral. — `v6-q-g02-d1`

Feedback: Bits codificam níveis digitais de intensidade em cada banda; a quantidade de bandas pertence à dimensão espectral.

C. 196, associados à resolução espacial. — `v6-q-g02-d2`

Feedback: 14² não é a quantidade de códigos binários e não fornece tamanho de pixel.

D. 1.024, associados à resolução temporal. — `v6-q-g02-d3`

Feedback: 1.024 corresponde a 10 bits; revisita não é determinada pelos bits.

E. 16.384 m de resolução espacial. — `v6-q-g02-d4`

Feedback: A contagem de níveis não tem unidade de comprimento.

**Gabarito candidato:** 16.384, associados à resolução radiométrica. (`v6-q-g02-correct`).

2¹⁴=16.384; o número de níveis descreve discretização de intensidade, não tamanho do pixel.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-g03

concurso · D2 / C3 · human-review-pending

Uma camada SAD69 e outra SIRGAS2000 não coincidem. Qual procedimento é tecnicamente mais adequado?

A. Atribuir o rótulo SIRGAS2000 à camada SAD69 sem transformar valores. — `v6-q-g03-d1`

Feedback: Definir metadado não altera corretamente as coordenadas de origem.

B. Confirmar os referenciais e aplicar transformação apropriada, validando o alinhamento. — `v6-q-g03-correct`

Feedback: Referenciais diferentes podem gerar deslocamento; parâmetros, área de uso e época devem ser considerados.

C. Mudar apenas a cor da camada superior. — `v6-q-g03-d2`

Feedback: A simbologia altera a aparência, mas não transforma coordenadas nem corrige a diferença entre referenciais.

D. Converter todos os graus em metros sem projeção e datum definidos. — `v6-q-g03-d3`

Feedback: A conversão exige uma referência matemática completa.

E. Ignorar a diferença porque GPS e SIRGAS2000 são sinônimos. — `v6-q-g03-d4`

Feedback: GPS é uma constelação; SIRGAS2000 é um referencial geodésico.

**Gabarito candidato:** Confirmar os referenciais e aplicar transformação apropriada, validando o alinhamento. (`v6-q-g03-correct`).

Referenciais diferentes podem gerar deslocamento; parâmetros, área de uso e época devem ser considerados.

Nota de revisão: Classificação editorial assistida 0.1.1: Aplicação do procedimento de compatibilização de referenciais; não é análise C4 pela simples presença de termos técnicos. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados.

Decisão humana: **pendente**.

## v6-q-g04

concurso · D3 / C4 · human-review-pending

Para selecionar escolas a até 500 m de rios e dentro de bairros vulneráveis, qual sequência é coerente?

A. Colorir rios de azul e contar escolas visualmente sem referência métrica. — `v6-q-g04-d1`

Feedback: Simbologia não executa a condição de distância nem garante reprodutibilidade.

B. Usar 500 graus como largura do buffer. — `v6-q-g04-d2`

Feedback: O limite pedido é métrico; graus não são metros constantes.

C. Compatibilizar dados, criar buffer dos rios e combinar a seleção espacial com os bairros vulneráveis. — `v6-q-g04-correct`

Feedback: A distância define o buffer e a conjunção das condições exige cruzar as camadas, com unidades adequadas.

D. Geocodificar os rios e dispensar os bairros. — `v6-q-g04-d3`

Feedback: Geocodificação localiza endereços; não substitui as duas condições espaciais.

E. Selecionar todas as escolas de qualquer município cortado por um rio. — `v6-q-g04-d4`

Feedback: Interseção municipal não prova que cada escola está a até 500 m.

**Gabarito candidato:** Compatibilizar dados, criar buffer dos rios e combinar a seleção espacial com os bairros vulneráveis. (`v6-q-g04-correct`).

A distância define o buffer e a conjunção das condições exige cruzar as camadas, com unidades adequadas.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-g05

concurso · D2 / C3 · human-review-pending

Uma equipe recebe um webmap sem data, referência geodésica ou método de aquisição. Qual é a primeira providência para uma análise métrica responsável?

A. Usar o nível máximo de zoom como prova de precisão. — `v6-q-g05-d1`

Feedback: Zoom não acrescenta acurácia aos dados originais.

B. Considerar toda base digital automaticamente atual. — `v6-q-g05-d2`

Feedback: Formato digital não garante data recente nem atualização.

C. Interpolar a data ausente a partir da cor dos símbolos. — `v6-q-g05-d3`

Feedback: Interpolação espacial não recupera metadados desconhecidos.

D. Obter metadados e avaliar adequação temporal, referência, precisão e método. — `v6-q-g05-correct`

Feedback: A interface interativa não documenta a qualidade da base; é necessário conhecer suas condições de produção.

E. Substituir o datum pelo nome do município. — `v6-q-g05-d4`

Feedback: Nome geográfico não define referência geométrica.

**Gabarito candidato:** Obter metadados e avaliar adequação temporal, referência, precisão e método. (`v6-q-g05-correct`).

A interface interativa não documenta a qualidade da base; é necessário conhecer suas condições de produção.

Nota de revisão: Classificação editorial assistida 0.1.1: Aplicação do controle de qualidade por metadados; ausência de dados é explícita e os distratores são pouco próximos. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados.

Decisão humana: **pendente**.

## v6-q-g06

concurso · D3 / C4 · human-review-pending

Um relatório soma alertas mensais DETER e publica o total como taxa anual oficial de corte raso na Amazônia Legal. Qual crítica é pertinente?

A. O DETER é inadequado para qualquer fiscalização. — `v6-q-g06-d1`

Feedback: Apoiar fiscalização e controle é justamente sua finalidade.

B. O PRODES é um sistema de posicionamento por satélite. — `v6-q-g06-d2`

Feedback: PRODES é monitoramento, enquanto GNSS é posicionamento.

C. A soma torna automaticamente os métodos equivalentes. — `v6-q-g06-d3`

Feedback: Operar aritmeticamente sobre alertas não altera seu objetivo e suas limitações.

D. A diferença é apenas o nome, pois ambos sempre detectam os mesmos polígonos. — `v6-q-g06-d4`

Feedback: Objetivos, resolução e oportunidade de observação podem gerar conjuntos distintos.

E. Confunde um produto de alerta operacional com a estimativa anual consolidada do PRODES. — `v6-q-g06-correct`

Feedback: Sensores, períodos e procedimentos dos sistemas diferem; os produtos não são intercambiáveis.

**Gabarito candidato:** Confunde um produto de alerta operacional com a estimativa anual consolidada do PRODES. (`v6-q-g06-correct`).

Sensores, períodos e procedimentos dos sistemas diferem; os produtos não são intercambiáveis.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-g07

elite · D3 / C4 · human-review-pending

Os dados espectrais didáticos foram obtidos de bandas comparáveis. Qual cálculo e interpretação são defensáveis?

**Apoio:** Reflectâncias adimensionais de alvos hipotéticos

| Alvo | Vermelho | NIR |
| --- | --- | --- |
| P | 0,20 | 0,60 |
| Q | 0,10 | 0,02 |

A. P tem NDVI 0,5 e Q cerca de −0,67; os valores são indícios espectrais e não identificam, sozinhos, espécie ou situação jurídica. — `v6-q-g07-correct`

Feedback: P: (0,6−0,2)/(0,6+0,2)=0,5. Q: (0,02−0,1)/(0,02+0,1)≈−0,67. O significado exige contexto e validação.

B. P tem NDVI 0,5 e Q cerca de 0,67; os módulos positivos permitem interpretar ambos como vegetação de vigor semelhante. — `v6-q-g07-d1`

Feedback: Tomar o módulo apaga o sinal de Q. A diferença NIR−vermelho é negativa nesse alvo.

C. P tem NDVI 0,4 e Q −0,08; a diferença entre bandas já fornece o índice normalizado quando as reflectâncias são comparáveis. — `v6-q-g07-d2`

Feedback: Esses são numeradores, não índices normalizados; falta dividir cada diferença pela soma das bandas.

D. P tem NDVI 0,5 e Q cerca de −0,67; essa separação prova que P é floresta primária e Q é água, dispensando amostras de referência. — `v6-q-g07-d3`

Feedback: Os cálculos estão corretos, mas classes específicas e sua qualidade não são demonstradas só por dois valores do índice.

E. P tem NDVI −0,5 e Q cerca de 0,67; usar vermelho−NIR preserva o significado e os limiares do NDVI convencional. — `v6-q-g07-d4`

Feedback: Inverter o numerador troca o sinal; os limiares e a interpretação do índice convencional não permanecem iguais.

**Gabarito candidato:** P tem NDVI 0,5 e Q cerca de −0,67; os valores são indícios espectrais e não identificam, sozinhos, espécie ou situação jurídica. (`v6-q-g07-correct`).

P: (0,6−0,2)/(0,6+0,2)=0,5. Q: (0,02−0,1)/(0,02+0,1)≈−0,67. O significado exige contexto e validação.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-g08

elite · D4 / C5 · human-review-pending

Uma classificação supervisionada obteve 99% de acerto ao ser avaliada com os próprios pixels usados no treinamento. Qual revisão metodológica é necessária?

A. Ampliar o conjunto de treinamento e recalcular a acurácia sobre ele, até que a diversidade de exemplos substitua um teste independente. — `v6-q-g08-d1`

Feedback: Mais treinamento pode ajudar o modelo, mas avaliar nos próprios exemplos continua sem estimar adequadamente a generalização.

B. Avaliar com amostra de referência independente, informar o desenho amostral e examinar omissões e comissões por classe. — `v6-q-g08-correct`

Feedback: Reutilizar treinamento na avaliação favorece estimativa otimista. Uma validação independente e a matriz de confusão permitem examinar a qualidade.

C. Separar apenas os pixels classificados com maior confiança e usá-los como referência, excluindo os casos ambíguos da validação. — `v6-q-g08-d2`

Feedback: Selecionar pela confiança do próprio classificador exclui erros difíceis e não constitui referência independente representativa.

D. Apresentar somente a acurácia global, pois 99% torna irrelevante examinar a confusão de classes pequenas ou de interesse específico. — `v6-q-g08-d3`

Feedback: Uma classe rara pode ter erro elevado mesmo com alta acurácia global; omissão e comissão importam à finalidade do mapa.

E. Dividir os pixels de treinamento em dois arquivos após o ajuste e considerar o segundo arquivo um teste, sem treinar novamente. — `v6-q-g08-d4`

Feedback: A separação posterior não desfaz o uso desses pixels no ajuste; o modelo já teve acesso ao suposto teste.

**Gabarito candidato:** Avaliar com amostra de referência independente, informar o desenho amostral e examinar omissões e comissões por classe. (`v6-q-g08-correct`).

Reutilizar treinamento na avaliação favorece estimativa otimista. Uma validação independente e a matriz de confusão permitem examinar a qualidade.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-g09

elite · D3 / C5 · human-review-pending

Um buffer de 10 km de uma rodovia intersecta parte de dois municípios. O analista soma toda a população municipal e chama o resultado de população situada a até 10 km da estrada. Qual avaliação é correta?

A. A soma fornece exatamente a população na faixa, porque a seleção por interseção inclui apenas municípios com parte de seu território no buffer. — `v6-q-g09-d1`

Feedback: Ter uma parte do município no buffer não significa que toda a população municipal esteja nessa parte.

B. Ponderar a população pela proporção da área municipal no buffer fornece o número exato de moradores, sem hipótese sobre distribuição interna. — `v6-q-g09-d2`

Feedback: A ponderação por área pressupõe uma distribuição populacional; pode ser estimativa, mas não contagem exata sem outras evidências.

C. A interseção não localiza todos os moradores; é preciso estimar a distribuição populacional na faixa e declarar método e incerteza. — `v6-q-g09-correct`

Feedback: A unidade agregada não coincide com a faixa de distância. Atribuir todo o total pode superestimar a população situada no buffer.

D. Somar a população dos municípios cujos centroides caem na faixa elimina a incerteza da agregação e determina quem reside perto da rodovia. — `v6-q-g09-d3`

Feedback: O centroide é uma referência geométrica, não a localização de todos os moradores ou sua distribuição intramunicipal.

E. Multiplicar a área total do buffer pela densidade regional fornece uma contagem exata, pois a normalização elimina variação populacional local. — `v6-q-g09-d4`

Feedback: Uma densidade média não elimina a heterogeneidade espacial; a operação impõe uma hipótese e produz estimativa.

**Gabarito candidato:** A interseção não localiza todos os moradores; é preciso estimar a distribuição populacional na faixa e declarar método e incerteza. (`v6-q-g09-correct`).

A unidade agregada não coincide com a faixa de distância. Atribuir todo o total pode superestimar a população situada no buffer.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-g10

elite · D3 / C4 · human-review-pending

Considere o par histórico Landsat do Rio de Janeiro apresentado com a questão: 19/09/1984 (Landsat 5/TM) e 25/09/2015 (Landsat 8/OLI). Ele permite observar diferenças de cobertura e forma urbana entre as duas datas, sem descrever a situação atual. Qual afirmação respeita o alcance desse tipo de evidência?

**Apoio:** Rio de Janeiro — par histórico Landsat, 1984 e 2015

![Cena em cores naturais de Barra da Tijuca e Zona Oeste do Rio de Janeiro, 1984-09-19, Landsat 5/TM. Vegetação em verde e áreas urbanizadas em cinza.](https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/imagerecords/88000/88103/rio_oli_1984263.jpg)

1984-09-19 — Landsat 5/TM. Jesse Allen/NASA Earth Observatory, com dados Landsat do USGS; artigo de Adam Voiland. Questão e comentários são autoria do projeto, sem revisão ou endosso da NASA.

![Cena em cores naturais de Barra da Tijuca e Zona Oeste do Rio de Janeiro, 2015-09-25, Landsat 8/OLI. Vegetação em verde e áreas urbanizadas em cinza.](https://assets.science.nasa.gov/dynamicimage/assets/science/esd/eo/images/imagerecords/88000/88103/rio_oli_2015268.jpg)

2015-09-25 — Landsat 8/OLI. Jesse Allen/NASA Earth Observatory, com dados Landsat do USGS; artigo de Adam Voiland. Questão e comentários são autoria do projeto, sem revisão ou endosso da NASA.

Duas cenas da mesma área de Barra da Tijuca e Zona Oeste do Rio de Janeiro, em cores naturais. O artigo identifica vegetação em verde e áreas urbanizadas em cinza e descreve diferenças de cobertura e forma urbana entre as datas. Datas, sensores e processamento devem ser considerados na comparação.

A. Tratar as duas composições como equivalentes em resposta espectral se usarem os mesmos nomes de cores, sem conferir bandas e aquisição. — `v6-q-g10-d1`

Feedback: As cores de exibição não garantem as mesmas bandas, respostas espectrais, condições atmosféricas ou sazonais.

B. Concluir que todo aumento de detalhe é expansão urbana, desde que a imagem mais recente tenha resolução espacial superior. — `v6-q-g10-d2`

Feedback: Uma resolução melhor pode revelar objetos já existentes; detalhe adicional não é necessariamente transformação no terreno.

C. Atribuir as mudanças a um processo social específico depois de normalizar a radiometria, sem investigar dados territoriais ou históricos. — `v6-q-g10-d3`

Feedback: Normalização pode melhorar comparabilidade, mas não transforma associação visual em demonstração causal.

D. Interpretar diferenças observáveis após conferir comparabilidade; atribuir causas requer evidências complementares às duas imagens. — `v6-q-g10-correct`

Feedback: Data, estação, sensor e processamento condicionam a comparação; a imagem, sozinha, não identifica a causa social da mudança.

E. Usar apenas a coincidência visual entre os limites de classes nas duas datas como prova de ausência de mudança, sem medir erros de classificação. — `v6-q-g10-d4`

Feedback: Erros de classe, registro e resolução podem ocultar ou simular diferenças; a coincidência aparente precisa ser avaliada.

**Gabarito candidato:** Interpretar diferenças observáveis após conferir comparabilidade; atribuir causas requer evidências complementares às duas imagens. (`v6-q-g10-correct`).

Data, estação, sensor e processamento condicionam a comparação; a imagem, sozinha, não identifica a causa social da mudança.

Nota de revisão: Revisão 0.1.1: par histórico, datas, sensores e transcrição acessível acompanham a questão. Gabarito preservado; aprovação humana pendente.

Decisão humana: **pendente**.

## v6-q-g11

elite · D3 / C4 · human-review-pending

Uma equipe dispõe de endereços de escolas e valores de chuva medidos em estações. Deseja localizar escolas e estimar chuva entre estações. Qual associação é correta?

A. Georreferenciar os endereços com uma transformação de imagem e geocodificar a chuva entre estações, por serem dados com localização. — `v6-q-g11-d1`

Feedback: Os problemas são de localização por descrição e estimativa de valores; os nomes das operações não são intercambiáveis.

B. Criar buffers dos endereços ainda sem posição e atribuir a cada área de chuva o nome da estação, dispensando localização e estimativa. — `v6-q-g11-d2`

Feedback: Buffer requer feições localizadas e define distância; não resolve endereços nem estima chuva entre amostras.

C. Geocodificar endereços e interpolar chuva; considerar toda posição encontrada e todo valor interpolado como observação direta sem erro. — `v6-q-g11-d3`

Feedback: A associação inicial está correta, mas a qualidade da geocodificação varia e interpolação produz estimativa, não nova observação.

D. Interpolar endereços e realizar overlay das estações para preencher automaticamente os valores ausentes de chuva em toda a região. — `v6-q-g11-d4`

Feedback: Interpolar pressupõe variável e amostras adequadas; overlay cruza camadas, sem fornecer por si só um modelo de chuva.

E. Geocodificar endereços e interpolar chuva entre estações, avaliando a qualidade das posições e a incerteza da superfície estimada. — `v6-q-g11-correct`

Feedback: Uma operação vincula descrições a posições; a outra estima valores em locais não amostrados. Ambas exigem avaliação.

**Gabarito candidato:** Geocodificar endereços e interpolar chuva entre estações, avaliando a qualidade das posições e a incerteza da superfície estimada. (`v6-q-g11-correct`).

Uma operação vincula descrições a posições; a outra estima valores em locais não amostrados. Ambas exigem avaliação.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-g12

elite · D3 / C5 · human-review-pending

Uma turma deve investigar barreiras no acesso à escola. Qual proposta articula cartografia, inclusão e evidência de aprendizagem?

A. Construir mapas de trajetos com legenda compartilhada, comparar barreiras e justificar alternativas, com recursos táteis ou textuais e avaliação do raciocínio. — `v6-q-g12-correct`

Feedback: A proposta conecta pergunta, representação, comparação e evidência de aprendizagem, oferecendo formas acessíveis de participação.

B. Construir mapas acessíveis e corretos dos trajetos, avaliando a aprendizagem pelo número de funções digitais utilizadas e pela variedade de efeitos visuais. — `v6-q-g12-d1`

Feedback: Acessibilidade e produção são relevantes, mas contar funções ou efeitos não demonstra interpretação espacial das barreiras.

C. Comparar trajetos em mapas com legenda e participação oral ou tátil, tomando sempre a menor distância em linha reta como prova de maior acessibilidade. — `v6-q-g12-d2`

Feedback: A rota geometricamente menor pode conter barreiras; acessibilidade precisa considerar o problema e as condições observadas.

D. Usar um atlas nacional acessível para inferir os obstáculos de cada quarteirão, mantendo a atividade de comparação e exigindo justificativas dos alunos. — `v6-q-g12-d3`

Feedback: Participação e justificativa não corrigem uma base sem detalhe compatível com a pergunta local.

E. Levantar barreiras com participação de todos e construir mapas, encerrando a avaliação no reconhecimento de símbolos sem pedir interpretação ou alternativas de acesso. — `v6-q-g12-d4`

Feedback: Reconhecer símbolos faz parte da alfabetização, mas não cobre a comparação e a interpretação exigidas pelo problema investigado.

**Gabarito candidato:** Construir mapas de trajetos com legenda compartilhada, comparar barreiras e justificar alternativas, com recursos táteis ou textuais e avaliação do raciocínio. (`v6-q-g12-correct`).

A proposta conecta pergunta, representação, comparação e evidência de aprendizagem, oferecendo formas acessíveis de participação.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.
