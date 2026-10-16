# Revisão humana de questões — cartografia-fundamentos@0.1.1

Pacote pendente de aprovação. O gabarito abaixo é o gabarito candidato; conferir resposta única, distratores, explicação, nível e adequação ao conteúdo. Letras servem somente à leitura deste documento, não são identidades no aplicativo.

Parecer assistido por item em `audit.json`. Antes/depois em [changes.md](changes.md). Este documento não registra aprovação humana.

## v6-fix-4c42e2e9b5d093a7

fixacao · D1 / C2 · human-review-pending

Qual comportamento é mais seguro diante de uma questão de escala?

A. Fazer a conta antes de padronizar unidades. — `v6-fix-4c42e2e9b5d093a7-o11a657956d`

Feedback: A razão 1:N exige a mesma unidade nas duas medidas. Calcular antes de padronizar pode combinar centímetros com quilômetros e produzir uma distância incorreta.

B. Padronizar unidades, escrever a relação e só então calcular. — `v6-fix-4c42e2e9b5d093a7-oc60c329eaa`

Feedback: Padronizar unidades, escrever a razão mapa/terreno e então calcular permite controlar o fator N e conferir a ordem de grandeza do resultado.

C. Tratar 1:50.000 como maior que 1:10.000. — `v6-fix-4c42e2e9b5d093a7-o0a3b3f958d`

Feedback: Compare as frações: 1/10.000 é maior que 1/50.000. O menor denominador corresponde à escala cartográfica maior, para a mesma finalidade e suporte.

D. Converter quilômetros diretamente em milímetros sem registrar o fator. — `v6-fix-4c42e2e9b5d093a7-ob41fe96ac6`

Feedback: A conversão de quilômetros para milímetros é possível, mas exige registrar o fator: 1 km = 1.000.000 mm. Pular esse controle favorece erros de unidade.

**Gabarito candidato:** Padronizar unidades, escrever a relação e só então calcular. (`v6-fix-4c42e2e9b5d093a7-oc60c329eaa`).

A ordem unidades → relação → cálculo reduz os erros mecânicos mais comuns.

Nota de revisão: Revisão editorial assistida 0.1.1: vínculo e feedbacks específicos corrigidos; originais em 0.1.0 e na procedência. Aguarda revisão humana.

Decisão humana: **pendente**.

## v6-fix-3735d553a70c574c

fixacao · D1 / C2 · human-review-pending

Dois pontos têm a mesma latitude, mas longitudes 45°W e 60°W. O ponto 60°W está:

A. mais ao norte — `v6-fix-3735d553a70c574c-o70435bbc6f`

Feedback: Os pontos têm a mesma latitude; a diferença informada é de longitude. Ela permite comparar leste/oeste, não estabelecer que 60°W esteja mais ao norte.

B. mais ao sul — `v6-fix-3735d553a70c574c-o8f821e28b6`

Feedback: Os pontos têm a mesma latitude; a diferença informada é de longitude. Ela permite comparar leste/oeste, não estabelecer que 60°W esteja mais ao sul.

C. mais a oeste — `v6-fix-3735d553a70c574c-o16a0197d1b`

Feedback: Na referência usual a Greenwich, 60°W fica mais a oeste que 45°W: ambos estão no hemisfério oeste e o primeiro tem maior afastamento angular nessa direção.

D. mais a leste — `v6-fix-3735d553a70c574c-of82d0b1122`

Feedback: Entre 45°W e 60°W, 45°W fica mais a leste. Aumentar o afastamento angular para oeste não desloca o ponto para leste.

**Gabarito candidato:** mais a oeste (`v6-fix-3735d553a70c574c-o16a0197d1b`).

Em longitudes oeste, 60°W está mais afastado de Greenwich para oeste.

Nota de revisão: Revisão editorial assistida 0.1.1: vínculo e feedbacks específicos corrigidos; originais em 0.1.0 e na procedência. Aguarda revisão humana.

Decisão humana: **pendente**.

## v6-fix-ae06798f90e822d3

fixacao · D1 / C2 · human-review-pending

A coordenada 42°30′W equivale, em grau decimal, a:

A. −42,3° — `v6-fix-ae06798f90e822d3-o1d3c11dd04`

Feedback: A escrita decimal usa frações de grau: 30′/60 = 0,5°. Tratar 30 minutos como 0,3° confunde a base sexagesimal com a decimal.

B. −42,5° — `v6-fix-ae06798f90e822d3-oe65276cfd6`

Feedback: 30′/60 = 0,5°; portanto 42°30′ = 42,5°. Como W indica oeste, o sinal usual da longitude é negativo: −42,5°.

C. +42,5° — `v6-fix-ae06798f90e822d3-obde81a7d53`

Feedback: A conversão da parte fracionária está correta, mas W indica oeste. Na convenção usual de coordenadas assinadas, aplica-se sinal negativo ao valor inteiro.

D. −42,05° — `v6-fix-ae06798f90e822d3-o-gms-divisor-600`

Feedback: Dividir 30 por 600 produz 0,05°, dez vezes menos que o correto. Minutos de arco são divididos por 60: 30′ = 0,5°, resultando em −42,5°.

**Gabarito candidato:** −42,5° (`v6-fix-ae06798f90e822d3-oe65276cfd6`).

30′/60 = 0,5°; oeste recebe sinal negativo.

Nota de revisão: Revisão editorial assistida 0.1.1: vínculo e feedbacks específicos corrigidos; originais em 0.1.0 e na procedência. Aguarda revisão humana.

Decisão humana: **pendente**.

## v6-q-f01

concurso · D2 / C3 · human-review-pending

Uma trilha mede 7,2 cm em uma carta 1:50.000. Mantida a escala, qual é a extensão horizontal representada?

A. 3,6 km. — `v6-q-f01-correct`

Feedback: 7,2 × 50.000 = 360.000 cm; dividir por 100.000 dá 3,6 km.

B. 0,36 km. — `v6-q-f01-d1`

Feedback: Esse resultado perde um fator dez na conversão de centímetros para quilômetros.

C. 36 km. — `v6-q-f01-d2`

Feedback: Esse resultado acrescenta um fator dez; 1 cm nessa carta corresponde a 0,5 km.

D. 360 km. — `v6-q-f01-d3`

Feedback: 360.000 é a medida em centímetros, não em quilômetros.

E. 7,2 km. — `v6-q-f01-d4`

Feedback: Igualar cm a km funcionaria em 1:100.000, mas a carta usa 1:50.000.

**Gabarito candidato:** 3,6 km. (`v6-q-f01-correct`).

7,2 × 50.000 = 360.000 cm; dividir por 100.000 dá 3,6 km.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-f02

concurso · D2 / C3 · human-review-pending

Um levantamento informa 12°30′S. Em graus decimais assinados, a latitude é:

A. −12,30°. — `v6-q-f02-d1`

Feedback: Minutos de arco usam base 60, não centésimos de grau.

B. −12,5°. — `v6-q-f02-correct`

Feedback: 30/60 = 0,5; o hemisfério sul aplica sinal negativo a 12,5.

C. 12,5°. — `v6-q-f02-d2`

Feedback: O módulo foi convertido corretamente, mas o sinal sul foi perdido.

D. −12,05°. — `v6-q-f02-d3`

Feedback: 30 minutos são metade de um grau, não cinco centésimos.

E. −11,5°. — `v6-q-f02-d4`

Feedback: O sinal negativo vale para o conjunto: −(12+0,5), e não −12+0,5.

**Gabarito candidato:** −12,5°. (`v6-q-f02-correct`).

30/60 = 0,5; o hemisfério sul aplica sinal negativo a 12,5.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-f03

concurso · D2 / C3 · human-review-pending

Uma transmissão começa às 23h30 de segunda-feira em UTC−5. Qual será a hora no Pará, em UTC−3, no mesmo instante?

A. 21h30 de segunda-feira. — `v6-q-f03-d1`

Feedback: Subtrair duas horas inverte a diferença entre os deslocamentos.

B. 1h30 de segunda-feira. — `v6-q-f03-d2`

Feedback: A hora foi ajustada, mas a mudança de dia foi omitida.

C. 1h30 de terça-feira. — `v6-q-f03-correct`

Feedback: UTC−3 está duas horas à frente de UTC−5; a soma ultrapassa meia-noite.

D. 2h30 de terça-feira. — `v6-q-f03-d3`

Feedback: Três horas seria a diferença entre UTC e o Pará; a origem é UTC−5.

E. 23h30 de segunda-feira. — `v6-q-f03-d4`

Feedback: Os dois lugares têm deslocamentos distintos, embora ambos sejam negativos.

**Gabarito candidato:** 1h30 de terça-feira. (`v6-q-f03-correct`).

UTC−3 está duas horas à frente de UTC−5; a soma ultrapassa meia-noite.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-f04

concurso · D2 / C3 · human-review-pending

Uma planta foi girada sobre a mesa. A seta de norte continua visível e um trajeto tem azimute geográfico de 270°. A direção desse trajeto é:

A. Leste, porque o papel foi girado. — `v6-q-f04-d1`

Feedback: Girar a folha não troca o significado da referência geográfica indicada.

B. Sul, pois o azimute passou de 180°. — `v6-q-f04-d2`

Feedback: Sul é exatamente 180°; 270° acrescenta mais um quarto de volta.

C. A parte inferior da folha, independentemente da seta. — `v6-q-f04-d3`

Feedback: A posição no papel só ganha direção a partir da referência indicada.

D. Oeste, medido a partir do norte indicado. — `v6-q-f04-correct`

Feedback: 270° no sentido horário a partir do norte corresponde a oeste, qualquer que seja a rotação do papel.

E. Norte magnético, porque todo azimute usa bússola. — `v6-q-f04-d4`

Feedback: O enunciado especifica azimute geográfico; referências magnética e geográfica podem diferir.

**Gabarito candidato:** Oeste, medido a partir do norte indicado. (`v6-q-f04-correct`).

270° no sentido horário a partir do norte corresponde a oeste, qualquer que seja a rotação do papel.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-f05

concurso · D2 / C3 · human-review-pending

Para discutir a distribuição das salas de uma escola, uma professora precisa de uma representação detalhada do edifício. Qual escolha responde melhor a essa finalidade?

A. Mapa nacional em escala pequena, ampliado na tela. — `v6-q-f05-d1`

Feedback: Zoom amplia pixels, mas não cria detalhes que a base nacional não contém.

B. Carta regional sem legenda, desde que tenha coordenadas. — `v6-q-f05-d2`

Feedback: Coordenadas não substituem a decodificação dos símbolos nem o detalhe interno necessário.

C. Mapa mundial equivalente, para preservar a área de cada sala. — `v6-q-f05-d3`

Feedback: Equivalência global não resolve a escala inadequada nem fornece a planta do edifício.

D. Imagem sem escala, pois detalhes visuais bastam para medir. — `v6-q-f05-d4`

Feedback: Detalhe aparente não estabelece a correspondência métrica exigida para medidas.

E. Planta em escala grande, com legenda e referência de orientação. — `v6-q-f05-correct`

Feedback: Área pequena e grande detalhe favorecem uma planta; os elementos cartográficos continuam necessários.

**Gabarito candidato:** Planta em escala grande, com legenda e referência de orientação. (`v6-q-f05-correct`).

Área pequena e grande detalhe favorecem uma planta; os elementos cartográficos continuam necessários.

Nota de revisão: Classificação editorial assistida 0.1.1: Aplicação da escolha entre planta, carta e mapa em situação escolar. O comando não exige decompor evidências para C4. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados.

Decisão humana: **pendente**.

## v6-q-f06

concurso · D3 / C3 · human-review-pending

Uma carta 1:80.000 é ampliada uniformemente para 200% de suas dimensões lineares, incluindo a barra gráfica. Qual é a interpretação correta?

A. A nova escala numérica é 1:40.000 e a barra redimensionada continua válida. — `v6-q-f06-correct`

Feedback: O denominador é dividido por dois; desenho e barra ampliados juntos mantêm a correspondência.

B. A nova escala é 1:160.000 e a barra continua válida. — `v6-q-f06-d1`

Feedback: Ampliar o desenho aumenta a escala; multiplicar o denominador faria o oposto.

C. A escala continua 1:80.000 porque o terreno não mudou. — `v6-q-f06-d2`

Feedback: O terreno não mudou, mas a razão entre desenho e terreno mudou.

D. A escala é 1:40.000, mas a barra deve ficar no tamanho original. — `v6-q-f06-d3`

Feedback: Uma barra mantida no tamanho anterior deixaria de acompanhar o mapa ampliado.

E. A escala é 1:20.000 porque a área quadruplicou. — `v6-q-f06-d4`

Feedback: A razão de escala é linear; a área quadruplica, mas o denominador só é dividido por dois.

**Gabarito candidato:** A nova escala numérica é 1:40.000 e a barra redimensionada continua válida. (`v6-q-f06-correct`).

O denominador é dividido por dois; desenho e barra ampliados juntos mantêm a correspondência.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-f07

elite · D3 / C4 · human-review-pending

Um polígono ocupa 4 cm² em uma carta 1:50.000. Outra impressão duplica as dimensões lineares da carta. Qual combinação está correta?

A. Área real de 2 km²; desenho de 8 cm² na escala 1:25.000. — `v6-q-f07-d1`

Feedback: As duas áreas foram tratadas como grandezas lineares.

B. Área real de 1 km²; desenho de 16 cm² na nova escala 1:25.000. — `v6-q-f07-correct`

Feedback: Cada cm representa 0,5 km, logo 4×0,5²=1 km²; dobrar os lados quadruplica o desenho e reduz N à metade.

C. Área real de 1 km²; desenho de 8 cm² na escala 1:100.000. — `v6-q-f07-d2`

Feedback: A área do desenho cresce quatro vezes e a ampliação diminui, não aumenta, o denominador.

D. Área real de 100 km²; desenho de 16 cm² na escala 1:25.000. — `v6-q-f07-d3`

Feedback: O redimensionamento está correto, mas a conversão de cm² para km² perdeu o quadrado da unidade.

E. Área real de 4 km²; desenho de 16 cm² na escala 1:50.000. — `v6-q-f07-d4`

Feedback: A impressão não aumenta o terreno, e a nova razão linear não pode permanecer igual.

**Gabarito candidato:** Área real de 1 km²; desenho de 16 cm² na nova escala 1:25.000. (`v6-q-f07-correct`).

Cada cm representa 0,5 km, logo 4×0,5²=1 km²; dobrar os lados quadruplica o desenho e reduz N à metade.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-f08

concurso · D2 / C3 · human-review-pending

Observe a tabela didática de coordenadas assinadas. Admitindo a ordem latitude, longitude, qual relação é sustentada?

**Apoio:** Coordenadas geográficas — ordem latitude, longitude

| Ponto | Latitude | Longitude |
| --- | --- | --- |
| A | −1° | −48° |
| B | −5° | −48° |
| C | −1° | −52° |

A. B fica a leste de A e C fica ao sul de A. — `v6-q-f08-d1`

Feedback: B só muda latitude e C só muda longitude: os eixos foram trocados.

B. A e B estão no mesmo paralelo, e A e C no mesmo meridiano. — `v6-q-f08-d2`

Feedback: A e B compartilham longitude, portanto meridiano; A e C compartilham latitude, portanto paralelo.

C. B fica ao sul de A e C fica a oeste de A. — `v6-q-f08-correct`

Feedback: −5° é mais ao sul que −1°; −52° é mais a oeste que −48°.

D. B fica ao sul de A, mas C fica a leste de A. — `v6-q-f08-d3`

Feedback: A primeira relação está correta; no hemisfério oeste, aumentar o módulo da longitude desloca para oeste.

E. A fica a oeste de C, e B fica ao norte de A. — `v6-q-f08-d4`

Feedback: As duas comparações foram invertidas: −48° fica a leste de −52°, e −5° fica ao sul de −1°.

**Gabarito candidato:** B fica ao sul de A e C fica a oeste de A. (`v6-q-f08-correct`).

−5° é mais ao sul que −1°; −52° é mais a oeste que −48°.

Nota de revisão: Classificação editorial assistida 0.1.1: Aplicação direta de sinais e eixos da tabela de coordenadas; distratores distantes do nível Elite. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados.

Decisão humana: **pendente**.

## v6-q-f09

elite · D3 / C4 · human-review-pending

Uma aeronave parte às 22h de segunda-feira de A (UTC−3). O voo dura 5 horas e chega a B (UTC+2). Considerando somente esses fusos civis declarados, a chegada ocorre:

A. Às 3h de terça-feira em B. — `v6-q-f09-d1`

Feedback: Esse é o horário após o voo ainda no fuso da origem.

B. Às 0h de terça-feira em B. — `v6-q-f09-d2`

Feedback: Subtrair três horas não aplica a diferença entre UTC−3 e UTC+2.

C. Às 8h de segunda-feira em B. — `v6-q-f09-d3`

Feedback: O resultado horário exige avançar o calendário depois da meia-noite.

D. Às 8h de terça-feira em B. — `v6-q-f09-correct`

Feedback: 22h+5h de voo=3h de terça em UTC−3; B está cinco horas à frente, logo 8h.

E. Às 17h de segunda-feira em B. — `v6-q-f09-d4`

Feedback: Esse cálculo inverte a diferença de fusos e ignora o tempo de voo.

**Gabarito candidato:** Às 8h de terça-feira em B. (`v6-q-f09-correct`).

22h+5h de voo=3h de terça em UTC−3; B está cinco horas à frente, logo 8h.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-f10

elite · D3 / C4 · human-review-pending

Uma equipe dispõe de A, base municipal generalizada 1:100.000 produzida em 1990, e B, planta 1:2.000 de 2025. A é ampliada na tela até apresentar a mesma extensão aparente de B. Para investigar acessos de uma escola, qual conduta distingue escala de exibição, época e qualidade?

A. Usar A para medir os acessos, recalibrando a escala numérica; a atualização da razão recompõe a geometria generalizada. — `v6-q-f10-d1`

Feedback: Recalibrar a escala corrige uma relação de exibição, mas não reconstrói a geometria que foi omitida.

B. Adotar B sem verificar o levantamento, pois escala grande e data recente demonstram precisão suficiente para qualquer medida local. — `v6-q-f10-d2`

Feedback: Escala e data são condições relevantes, mas não certificam sozinhas a precisão do levantamento.

C. Comparar as duas imagens pela mesma quantidade de pixels na tela e escolher a mais nítida como base de maior acurácia posicional. — `v6-q-f10-d3`

Feedback: Resolução de exibição e nitidez não medem a diferença entre posições representadas e posições de referência.

D. Reprojetar A para o mesmo sistema de B e tratá-las como equivalentes em detalhe, já que a referência geométrica será comum. — `v6-q-f10-d4`

Feedback: Compatibilizar referência é necessário ao cruzamento, mas não iguala época, detalhe de aquisição ou generalização.

E. Examinar B como base potencialmente compatível, verificando levantamento e precisão; a ampliação de A não recupera os detalhes ausentes. — `v6-q-f10-correct`

Feedback: B tem escala e época mais próximas da finalidade, mas isso não dispensa conferir fonte, método e precisão. A não ganha informação pela ampliação.

**Gabarito candidato:** Examinar B como base potencialmente compatível, verificando levantamento e precisão; a ampliação de A não recupera os detalhes ausentes. (`v6-q-f10-correct`).

B tem escala e época mais próximas da finalidade, mas isso não dispensa conferir fonte, método e precisão. A não ganha informação pela ampliação.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-f11

elite · D3 / C4 · human-review-pending

Uma camada declara pares (longitude, latitude) em graus decimais no SIRGAS2000. Recebeu (−1, −48), copiado de uma planilha cuja ordem é (latitude, longitude). O analista quer corrigir a posição e afirmar que ela não tem erro, pois o referencial é o mesmo. Qual avaliação é adequada?

A. Reordenar para (−48, −1), após conferir os campos; o referencial comum não demonstra erro posicional nulo. — `v6-q-f11-correct`

Feedback: A troca dos eixos explica esta inconsistência. Corrigir a ordem não mede a incerteza da aquisição ou a qualidade da posição.

B. Reordenar para (−48, −1) e considerar a posição exata, pois qualquer dado no SIRGAS2000 compartilha a mesma precisão. — `v6-q-f11-d1`

Feedback: A ordem fica correta, mas um referencial comum não torna todos os levantamentos igualmente precisos.

C. Manter (−1, −48), porque a declaração SIRGAS2000 corrige automaticamente a ordem de quaisquer campos importados. — `v6-q-f11-d2`

Feedback: O referencial não troca campos de uma planilha; a convenção do esquema precisa ser respeitada.

D. Reordenar para (−48, −1) e dividir ambos os valores por 60, para converter os pares assinados em graus decimais. — `v6-q-f11-d3`

Feedback: Os valores já estão em graus decimais; a divisão introduziria uma conversão angular indevida.

E. Conservar os valores e apenas atribuir ao arquivo a convenção latitude–longitude, sem conferir o esquema exigido pela aplicação. — `v6-q-f11-d4`

Feedback: Mudar a descrição para acomodar a planilha não garante que a aplicação leia os eixos na ordem exigida.

**Gabarito candidato:** Reordenar para (−48, −1), após conferir os campos; o referencial comum não demonstra erro posicional nulo. (`v6-q-f11-correct`).

A troca dos eixos explica esta inconsistência. Corrigir a ordem não mede a incerteza da aquisição ou a qualidade da posição.

Nota de revisão: Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.

Decisão humana: **pendente**.

## v6-q-f12

concurso · D2 / C2 · human-review-pending

Uma análise é regional, mas utiliza plantas 1:2.000 para verificar acessos a escolas antes de agregar resultados. Isso significa que:

A. Toda análise regional exige que cada base cartográfica tenha escala pequena. — `v6-q-f12-d1`

Feedback: A agregação regional pode depender de observações locais detalhadas.

B. A escala geográfica da análise pode ser regional e as bases cartográficas locais podem ter escala grande. — `v6-q-f12-correct`

Feedback: Abrangência analítica e razão métrica são dimensões relacionadas, mas distintas.

C. 1:2.000 é escala pequena porque abrange uma pequena área. — `v6-q-f12-d2`

Feedback: Área pequena e detalhe elevado caracterizam escala cartográfica grande.

D. Escala geográfica e cartográfica são a mesma fração. — `v6-q-f12-d3`

Feedback: Só a cartográfica expressa a razão matemática mapa/terreno.

E. A agregação torna desnecessário conhecer a qualidade das plantas. — `v6-q-f12-d4`

Feedback: Erros da base podem propagar-se para o resultado regional.

**Gabarito candidato:** A escala geográfica da análise pode ser regional e as bases cartográficas locais podem ter escala grande. (`v6-q-f12-correct`).

Abrangência analítica e razão métrica são dimensões relacionadas, mas distintas.

Nota de revisão: Classificação editorial assistida 0.1.1: Compreensão da distinção entre abrangência analítica e razão métrica; a distinção já conduz à resposta sem integração difícil. Sem calibração psicométrica; aprovação humana pendente. Enunciado e gabarito preservados.

Decisão humana: **pendente**.
