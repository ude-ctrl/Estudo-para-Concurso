# Questões revisadas — cartografia-fundamentos@0.1.2

Leitura de referência, preparada pelo assistente. Não é uma tarefa obrigatória de revisão para o estudante. Os itens continuam identificados como autorais; nenhuma questão é apresentada como prova oficial da FGV.

Parecer e limites em [audit.md](audit.md). Alterações em [changes.md](changes.md).

## v6-fix-4c42e2e9b5d093a7

fixacao · D1/C2

Qual comportamento é mais seguro diante de uma questão de escala?

A. Fazer a conta antes de padronizar unidades.

Explicação: A razão 1:N exige a mesma unidade nas duas medidas. Calcular antes de padronizar pode combinar centímetros com quilômetros e produzir uma distância incorreta.

B. Padronizar unidades, escrever a relação e só então calcular.

Explicação: Padronizar unidades, escrever a razão mapa/terreno e então calcular permite controlar o fator N e conferir a ordem de grandeza do resultado.

C. Tratar 1:50.000 como maior que 1:10.000.

Explicação: Compare as frações: 1/10.000 é maior que 1/50.000. O menor denominador corresponde à escala cartográfica maior, para a mesma finalidade e suporte.

D. Converter quilômetros diretamente em milímetros sem registrar o fator.

Explicação: A conversão de quilômetros para milímetros é possível, mas exige registrar o fator: 1 km = 1.000.000 mm. Pular esse controle favorece erros de unidade.

**Resposta:** Padronizar unidades, escrever a relação e só então calcular.

A ordem unidades → relação → cálculo reduz os erros mecânicos mais comuns.

## v6-fix-bccdc769d88ccd06

fixacao · D1/C2

Uma questão apresenta quatro coordenadas e pede o ponto mais ao norte. Qual variável decide primeiro?

A. longitude

Explicação: Longitude ordena leste/oeste. Altitude é medida vertical; longitude usa outra referência.

B. latitude

Explicação: Correto.

C. escala

Explicação: Escala não define posição geográfica. Altitude é medida vertical; longitude usa outra referência.

D. altitude

Explicação: Altitude é posição vertical. Altitude é medida vertical; longitude usa outra referência.

**Resposta:** latitude

Norte/sul é determinado pela latitude.

## v6-fix-ec0e644dde0c49c4

fixacao · D1/C2

Em um mapa cuja seta do norte aponta para a direita da folha, o topo da folha corresponde aproximadamente a:

A. Norte

Explicação: A seta mostra o norte à direita. Topo da página não é norte obrigatório; bússola não aponta necessariamente ao polo geográfico.

B. Sul

Explicação: Sul estaria à esquerda. Topo da página não é norte obrigatório; bússola não aponta necessariamente ao polo geográfico.

C. Oeste

Explicação: Correto.

D. Leste

Explicação: Leste ficaria embaixo. Topo da página não é norte obrigatório; bússola não aponta necessariamente ao polo geográfico.

**Resposta:** Oeste

Se o norte está à direita, o topo fica a oeste na rotação do sistema.

## v6-fix-eb86fa6c989933cc

fixacao · D1/C2

Um azimute de 180° indica aproximadamente:

A. Norte

Explicação: Norte = 0°/360°. Topo da página não é norte obrigatório; bússola não aponta necessariamente ao polo geográfico.

B. Leste

Explicação: Leste = 90°. Topo da página não é norte obrigatório; bússola não aponta necessariamente ao polo geográfico.

C. Sul

Explicação: Correto.

D. Oeste

Explicação: Oeste = 270°. Topo da página não é norte obrigatório; bússola não aponta necessariamente ao polo geográfico.

**Resposta:** Sul

Na convenção usual, 0°=N, 90°=E, 180°=S, 270°=W.

## v6-fix-6bbe67e30a50e258

fixacao · D1/C2

Qual linha de referência divide a Terra em hemisférios Norte e Sul?

A. Greenwich

Explicação: Greenwich divide referências de longitude. Altitude é medida vertical; longitude usa outra referência.

B. Equador

Explicação: Correto.

C. Trópico de Capricórnio

Explicação: É um paralelo especial, mas não divide os hemisférios N/S. Altitude é medida vertical; longitude usa outra referência.

D. Linha Internacional de Data

Explicação: Relaciona-se à mudança de data. Altitude é medida vertical; longitude usa outra referência.

**Resposta:** Equador

O Equador é o paralelo de 0°.

## v6-fix-3fb13240602b868b

fixacao · D1/C2

Os meridianos são usados principalmente para medir:

A. latitude

Explicação: Latitude usa paralelos. Latitude não mede leste/oeste; software pode usar longitude antes da latitude.

B. altitude

Explicação: Altitude é posição vertical. Latitude não mede leste/oeste; software pode usar longitude antes da latitude.

C. longitude

Explicação: Correto.

D. escala

Explicação: Escala é relação mapa-terreno. Latitude não mede leste/oeste; software pode usar longitude antes da latitude.

**Resposta:** longitude

Longitude é distância angular a leste/oeste do meridiano de Greenwich.

## v6-fix-ad3f0074a7e0a8e6

fixacao · D1/C2

No Hemisfério Sul, qual ponto está mais ao norte?

A. 35° S

Explicação: Está mais ao sul que 22°S e 8°S. Altitude é medida vertical; longitude usa outra referência.

B. 22° S

Explicação: Ainda está ao sul de 8°S. Altitude é medida vertical; longitude usa outra referência.

C. 8° S

Explicação: Correto.

D. 60° S

Explicação: É o mais próximo do polo Sul entre os quatro. Altitude é medida vertical; longitude usa outra referência.

**Resposta:** 8° S

8°S é o mais próximo do Equador.

## v6-fix-f707a05ee2ab642f

fixacao · D1/C2

Latitude 0° corresponde:

A. ao meridiano de Greenwich

Explicação: Greenwich é 0° de longitude. Altitude é medida vertical; longitude usa outra referência.

B. ao Equador

Explicação: Correto.

C. ao polo Norte

Explicação: Polo Norte = 90°N. Altitude é medida vertical; longitude usa outra referência.

D. à Linha Internacional de Data

Explicação: A LID fica aproximadamente em 180° de longitude. Altitude é medida vertical; longitude usa outra referência.

**Resposta:** ao Equador

O Equador é a origem das latitudes.

## v6-fix-f1b45304a19a61b8

fixacao · D1/C2

Qual ponto está mais a oeste de Greenwich?

A. 15° W

Explicação: Está a oeste, mas menos que 60°W. Latitude não mede leste/oeste; software pode usar longitude antes da latitude.

B. 30° E

Explicação: Está a leste. Latitude não mede leste/oeste; software pode usar longitude antes da latitude.

C. 60° W

Explicação: Correto.

D. 5° E

Explicação: Está a leste. Latitude não mede leste/oeste; software pode usar longitude antes da latitude.

**Resposta:** 60° W

Entre longitudes oeste, maior valor angular significa maior afastamento para oeste.

## v6-fix-09e47a60c30d70e9

fixacao · D1/C2

No formato decimal usual, uma longitude de 46,6° W é representada aproximadamente como:

A. +46,6

Explicação: Sinal positivo costuma indicar leste. Latitude não mede leste/oeste; software pode usar longitude antes da latitude.

B. −46,6

Explicação: Correto.

C. +133,4

Explicação: Não é a conversão pedida. Latitude não mede leste/oeste; software pode usar longitude antes da latitude.

D. −133,4

Explicação: Não corresponde à mesma longitude. Latitude não mede leste/oeste; software pode usar longitude antes da latitude.

**Resposta:** −46,6

Oeste recebe sinal negativo na convenção decimal mais usada.

## v6-fix-190cac3f6985590e

fixacao · D1/C2

Ponto A: 2°S, 48°W. Ponto B: 10°S, 48°W. Qual relação é correta?

A. A está ao norte de B.

Explicação: Correto.

B. A está ao sul de B.

Explicação: Inverte a posição. Altitude é medida vertical; longitude usa outra referência.

C. A está a leste de B.

Explicação: Têm a mesma longitude. Altitude é medida vertical; longitude usa outra referência.

D. As longitudes diferentes impedem comparação.

Explicação: É possível comparar diretamente. Altitude é medida vertical; longitude usa outra referência.

**Resposta:** A está ao norte de B.

Com a mesma longitude, basta comparar latitudes: 2°S está mais ao norte que 10°S.

## v6-fix-3735d553a70c574c

fixacao · D1/C2

Dois pontos têm a mesma latitude, mas longitudes 45°W e 60°W. O ponto 60°W está:

A. mais ao norte

Explicação: Os pontos têm a mesma latitude; a diferença informada é de longitude. Ela permite comparar leste/oeste, não estabelecer que 60°W esteja mais ao norte.

B. mais ao sul

Explicação: Os pontos têm a mesma latitude; a diferença informada é de longitude. Ela permite comparar leste/oeste, não estabelecer que 60°W esteja mais ao sul.

C. mais a oeste

Explicação: Na referência usual a Greenwich, 60°W fica mais a oeste que 45°W: ambos estão no hemisfério oeste e o primeiro tem maior afastamento angular nessa direção.

D. mais a leste

Explicação: Entre 45°W e 60°W, 45°W fica mais a leste. Aumentar o afastamento angular para oeste não desloca o ponto para leste.

**Resposta:** mais a oeste

Em longitudes oeste, 60°W está mais afastado de Greenwich para oeste.

## v6-fix-ae06798f90e822d3

fixacao · D1/C2

A coordenada 42°30′W equivale, em grau decimal, a:

A. −42,3°

Explicação: A escrita decimal usa frações de grau: 30′/60 = 0,5°. Tratar 30 minutos como 0,3° confunde a base sexagesimal com a decimal.

B. −42,5°

Explicação: 30′/60 = 0,5°; portanto 42°30′ = 42,5°. Como W indica oeste, o sinal usual da longitude é negativo: −42,5°.

C. +42,5°

Explicação: A conversão da parte fracionária está correta, mas W indica oeste. Na convenção usual de coordenadas assinadas, aplica-se sinal negativo ao valor inteiro.

D. −42,05°

Explicação: Dividir 30 por 600 produz 0,05°, dez vezes menos que o correto. Minutos de arco são divididos por 60: 30′ = 0,5°, resultando em −42,5°.

**Resposta:** −42,5°

30′/60 = 0,5°; oeste recebe sinal negativo.

## v6-fix-b5a227a4695fa7d0

fixacao · D1/C2

Em 10°15′30″, a parcela correspondente a 30″ é:

A. 30/60 de grau

Explicação: Isso converteria minutos. 20°30′ não é 20,30°; é 20,5°.

B. 30/100 de grau

Explicação: Base 100 está errada. 20°30′ não é 20,30°; é 20,5°.

C. 30/3600 de grau

Explicação: Correto.

D. 30 graus

Explicação: Confunde unidade. 20°30′ não é 20,30°; é 20,5°.

**Resposta:** 30/3600 de grau

Segundos de arco são divididos por 3600 para converter em graus.

## v6-fix-921f6c66f1a18d4a

fixacao · D1/C2

Se uma cidade B está 45° a leste de A, no modelo ideal B está:

A. 3 h atrasada

Explicação: O sentido está invertido. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

B. 3 h adiantada

Explicação: Correto.

C. 45 min adiantada

Explicação: Graus não equivalem diretamente a minutos de relógio. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

D. 1 h adiantada

Explicação: 15° é 1 h; 45° são 3 h. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

**Resposta:** 3 h adiantada

45°/15° = 3 h; leste = adiantado.

## v6-fix-f4785d7c2e276670

fixacao · D1/C2

Uma diferença de 75° de longitude corresponde teoricamente a:

A. 3 h

Explicação: 45° = 3h. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

B. 4 h

Explicação: 60° = 4h. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

C. 5 h

Explicação: Correto.

D. 6 h

Explicação: 90° = 6h. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

**Resposta:** 5 h

75/15 = 5 horas.

## v6-fix-ce0a056c611ab242

fixacao · D1/C2

O horário civil do Pará corresponde atualmente a:

A. UTC−2

Explicação: UTC−2 é usado em ilhas oceânicas brasileiras. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

B. UTC−3

Explicação: Correto.

C. UTC−4

Explicação: UTC−4 ocorre mais a oeste. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

D. UTC−5

Explicação: UTC−5 ocorre no Acre e oeste do Amazonas. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

**Resposta:** UTC−3

O Pará integra o fuso de Brasília, UTC−3.

## v6-fix-62f0416f41438e13

fixacao · D1/C2

A existência de limites irregulares entre fusos civis mostra que:

A. longitude não tem relação com tempo

Explicação: A longitude é a base geométrica do sistema. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

B. fusos legais podem ser ajustados por decisões políticas e fronteiras

Explicação: Correto.

C. cada país deve possuir exatamente um fuso

Explicação: Países extensos podem ter vários fusos. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

D. todo fuso civil mede exatamente 15° em cada ponto

Explicação: Na prática, os limites podem desviar dos meridianos ideais. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

**Resposta:** fusos legais podem ser ajustados por decisões políticas e fronteiras

A geometria ideal orienta, mas os fusos civis incorporam decisões territoriais.

## v6-fix-9d667a70d08d4a5b

fixacao · D1/C2

Greenwich e Linha Internacional de Data localizam-se aproximadamente em:

A. 0° e 180° de longitude

Explicação: Correto.

B. 90°N e 90°S

Explicação: São latitudes polares, não meridianos de referência. Não confunda trocar a data com a regra de adiantar horas para leste.

C. 0° e 90° de latitude

Explicação: Mistura latitude e longitude. Não confunda trocar a data com a regra de adiantar horas para leste.

D. 180° e 0° de latitude

Explicação: Mistura coordenadas. Não confunda trocar a data com a regra de adiantar horas para leste.

**Resposta:** 0° e 180° de longitude

Greenwich é 0° de longitude; a LID acompanha aproximadamente 180°.

## v6-fix-5c56c52cdc2d10e5

fixacao · D1/C2

Ao cruzar a Linha Internacional de Data das Américas em direção à Ásia, em regra:

A. subtrai-se um dia

Explicação: É o sentido contrário. Não confunda trocar a data com a regra de adiantar horas para leste.

B. soma-se um dia

Explicação: Correto.

C. a data não muda

Explicação: A função da linha é justamente ajustar a data. Não confunda trocar a data com a regra de adiantar horas para leste.

D. soma-se exatamente 12 horas

Explicação: Não é uma correção fixa de 12h. Não confunda trocar a data com a regra de adiantar horas para leste.

**Resposta:** soma-se um dia

No sentido leste→oeste, avança-se a data em um dia.

## v6-fix-6de40dba724f0055

fixacao · D1/C2

Qual das escalas é a maior?

A. 1:1.000.000

Explicação: É a menor entre as opções. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

B. 1:500.000

Explicação: Ainda menor que 1:100.000 e 1:25.000. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

C. 1:100.000

Explicação: Grande, mas não a maior. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

D. 1:25.000

Explicação: Correto.

**Resposta:** 1:25.000

A maior escala é a de menor denominador.

## v6-fix-e9cc352d93ffeea6

fixacao · D1/C2

Em comparação a 1:1.000.000, um mapa 1:25.000 tende a mostrar:

A. menos detalhe e maior área

Explicação: É o contrário. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

B. mais detalhe e menor área

Explicação: Correto.

C. a mesma quantidade de detalhe

Explicação: A mudança de escala altera generalização/detalhe. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

D. necessariamente o planeta inteiro

Explicação: Não decorre da escala. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

**Resposta:** mais detalhe e menor área

Escala maior representa menor extensão com maior detalhamento.

## v6-fix-d3b66da76f246248

fixacao · D1/C2

Em 1:100.000, 6,5 cm no mapa correspondem a:

A. 650 m

Explicação: Seria 0,65 km. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

B. 6,5 km

Explicação: Correto.

C. 65 km

Explicação: Dez vezes maior. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

D. 650 km

Explicação: Cem vezes maior. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

**Resposta:** 6,5 km

6,5×100.000 = 650.000 cm = 6,5 km.

## v6-fix-5f0730f3bd5ef3ce

fixacao · D1/C2

Uma estrada mede 12 km no terreno e 4 cm no mapa. A escala numérica é:

A. 1:3.000

Explicação: Muito grande para a relação dada. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

B. 1:30.000

Explicação: Ainda dez vezes menor. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

C. 1:300.000

Explicação: Correto.

D. 1:3.000.000

Explicação: Dez vezes maior. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

**Resposta:** 1:300.000

12 km = 1.200.000 cm; 1.200.000/4 = 300.000.

## v6-fix-ba07a3382fd4f8f0

fixacao · D1/C2

Um mapa 1:80.000 é ampliado para 200% de seu tamanho linear. A nova escala é aproximadamente:

A. 1:160.000

Explicação: Isso ocorreria numa redução para 50%. Copiar o texto 1:100.000 para a imagem ampliada não recalibra esse texto.

B. 1:80.000

Explicação: Ignora o redimensionamento. Copiar o texto 1:100.000 para a imagem ampliada não recalibra esse texto.

C. 1:40.000

Explicação: Correto.

D. 1:20.000

Explicação: Exigiria ampliação 400%. Copiar o texto 1:100.000 para a imagem ampliada não recalibra esse texto.

**Resposta:** 1:40.000

Dobrar a dimensão gráfica reduz pela metade o denominador.

## v6-fix-f0b05f778294703e

fixacao · D1/C2

Qual tipo de escala preserva sua utilidade visual quando mapa e barra são redimensionados juntos?

A. numérica impressa

Explicação: A numérica precisa ser recalculada. Copiar o texto 1:100.000 para a imagem ampliada não recalibra esse texto.

B. gráfica

Explicação: Correto.

C. geográfica

Explicação: Escala geográfica é nível de análise. Copiar o texto 1:100.000 para a imagem ampliada não recalibra esse texto.

D. temporal

Explicação: Não é uma escala cartográfica. Copiar o texto 1:100.000 para a imagem ampliada não recalibra esse texto.

**Resposta:** gráfica

A barra gráfica é redimensionada na mesma proporção do mapa.

## v6-fix-e42ba9b8b341f66f

fixacao · D1/C2

A expressão 'analisar o fenômeno em escala regional' refere-se principalmente à:

A. escala gráfica

Explicação: É uma barra de distância. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

B. escala numérica

Explicação: É uma razão matemática. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

C. escala geográfica

Explicação: Correto.

D. projeção cartográfica

Explicação: Projeção trata da transformação da superfície curva. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

**Resposta:** escala geográfica

Regional indica nível espacial de análise.

## v6-fix-3cf3fe896b79ebba

fixacao · D1/C2

Qual afirmação é correta?

A. Escala cartográfica e geográfica são sinônimos.

Explicação: Os conceitos são distintos. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

B. Escala geográfica expressa somente uma razão 1:N.

Explicação: 1:N é cartográfica. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

C. Escala cartográfica trata da redução; escala geográfica trata da abrangência da análise.

Explicação: Correto.

D. Toda análise local exige escala 1:10.000.

Explicação: Não há denominador universal obrigatório. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

**Resposta:** Escala cartográfica trata da redução; escala geográfica trata da abrangência da análise.

Essa é a distinção conceitual correta.

## v6-fix-98f180b92edc32a7

fixacao · D1/C2

Em um mapa temático, a legenda serve principalmente para:

A. definir o norte geográfico

Explicação: Orientação é outro elemento. Detalhamento não torna uma representação neutra ou automaticamente adequada.

B. traduzir símbolos, cores e classes representadas

Explicação: Correto.

C. calcular automaticamente o fuso horário

Explicação: Não é sua função. Detalhamento não torna uma representação neutra ou automaticamente adequada.

D. substituir a fonte dos dados

Explicação: Fonte e legenda têm funções distintas. Detalhamento não torna uma representação neutra ou automaticamente adequada.

**Resposta:** traduzir símbolos, cores e classes representadas

A legenda decodifica a linguagem gráfica do mapa.

## v6-fix-dd7f8316f5a2a345

fixacao · D1/C2

Qual prática é mais adequada antes de tirar conclusões de um mapa?

A. Ignorar título e fonte para evitar viés.

Explicação: Isso elimina informação essencial. Detalhamento não torna uma representação neutra ou automaticamente adequada.

B. Ler título, legenda, escala, fonte/data e recorte espacial.

Explicação: Correto.

C. Assumir que o topo é norte em qualquer documento.

Explicação: A orientação deve ser verificada. Detalhamento não torna uma representação neutra ou automaticamente adequada.

D. Tratar todo mapa como representação exata e completa da realidade.

Explicação: Mapas generalizam e selecionam informação. Detalhamento não torna uma representação neutra ou automaticamente adequada.

**Resposta:** Ler título, legenda, escala, fonte/data e recorte espacial.

A leitura crítica começa pelo contexto e pelas convenções do produto.

## v6-fix-81d39388e7e83625

fixacao · D1/C2

Em um mapa na escala 1:25.000, uma distância de 8 cm corresponde, no terreno, a:

A. 200 m

Explicação: Faltou um fator 10 na conversão. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

B. 2 km

Explicação: Correto: 200.000 cm = 2.000 m = 2 km.

C. 20 km

Explicação: Valor dez vezes maior. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

D. 200 km

Explicação: Valor cem vezes maior. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

**Resposta:** 2 km

8 × 25.000 = 200.000 cm = 2 km.

## v6-fix-fc3cb4f05cf4dcd9

fixacao · D1/C2

Um ponto situado em 23° S e 47° W está nos hemisférios:

A. Norte e Leste

Explicação: 23° S não pertence ao Norte. Altitude é medida vertical; longitude usa outra referência.

B. Norte e Oeste

Explicação: A latitude está errada. Altitude é medida vertical; longitude usa outra referência.

C. Sul e Leste

Explicação: A longitude 47° W não está a leste de Greenwich. Altitude é medida vertical; longitude usa outra referência.

D. Sul e Oeste

Explicação: Correto.

**Resposta:** Sul e Oeste

S indica Hemisfério Sul e W/O indica Hemisfério Oeste.

## v6-fix-59a03e4071862572

fixacao · D1/C2

Duas localidades ideais diferem 30° de longitude. A diferença teórica de horário é:

A. 30 minutos

Explicação: 30° não equivalem a 30 minutos. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

B. 1 hora

Explicação: 15° equivalem a 1 h. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

C. 2 horas

Explicação: Correto.

D. 3 horas

Explicação: 45° equivaleriam a 3 h. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

**Resposta:** 2 horas

Como 360° correspondem a 24 h, cada 15° equivalem a 1 h; 30° equivalem a 2 h.

## v6-fix-8a27b1529f0b322d

fixacao · D1/C2

(Escala) Uma trilha mede 7,2 cm em um mapa 1:50.000. Sua extensão real é:

A. 360 m

Explicação: Faltou um zero. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

B. 1,44 km

Explicação: Não corresponde à razão. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

C. 3,6 km

Explicação: Correto.

D. 36 km

Explicação: Dez vezes maior. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

E. 360 km

Explicação: Cem vezes maior. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

**Resposta:** 3,6 km

7,2×50.000 = 360.000 cm = 3,6 km.

## v6-fix-56b356298605e196

fixacao · D1/C2

(Coordenadas) A: 1°S, 48°W; B: 5°S, 48°W; C: 1°S, 52°W. Qual afirmação é correta?

A. B está ao norte de A.

Explicação: B está mais ao sul. Altitude é medida vertical; longitude usa outra referência.

B. C está a leste de A.

Explicação: 52°W está mais a oeste. Altitude é medida vertical; longitude usa outra referência.

C. A está ao norte de B e a leste de C.

Explicação: Correto.

D. A e C têm longitudes iguais.

Explicação: As longitudes diferem. Altitude é medida vertical; longitude usa outra referência.

E. B está a oeste de C.

Explicação: 48°W está a leste de 52°W. Altitude é medida vertical; longitude usa outra referência.

**Resposta:** A está ao norte de B e a leste de C.

1°S está ao norte de 5°S; 48°W está a leste de 52°W.

## v6-fix-d57efa12d8d469c7

fixacao · D1/C2

(Conversão) 20°45′14″S em grau decimal é aproximadamente:

A. −20,754°

Explicação: Correto.

B. −20,451°

Explicação: Trata minutos como centésimos. 20°30′ não é 20,30°; é 20,5°.

C. +20,754°

Explicação: Sinal de Sul está errado. 20°30′ não é 20,30°; é 20,5°.

D. −20,761°

Explicação: Não resulta da conversão. 20°30′ não é 20,30°; é 20,5°.

E. +20,451°

Explicação: Erro de base e sinal. 20°30′ não é 20,30°; é 20,5°.

**Resposta:** −20,754°

20 + 45/60 + 14/3600 ≈ 20,7539; Sul = negativo.

## v6-fix-4240d9a66446c554

fixacao · D1/C2

(Fusos) Se em uma referência UTC−3 são 14h, em UTC−5 são:

A. 9h

Explicação: Diferença de cinco horas foi aplicada incorretamente. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

B. 11h

Explicação: Diferença é duas, não três. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

C. 12h

Explicação: Correto.

D. 16h

Explicação: Seria adiantado, não atrasado. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

E. 19h

Explicação: Soma indevida. Fuso horário ideal de 15° não é fuso UTM de 6°; limites civis não são faixas perfeitas.

**Resposta:** 12h

UTC−5 está duas horas atrás de UTC−3: 12h.

## v6-fix-fdd24e6701e2ed7d

fixacao · D1/C2

(Conceito) Qual combinação está correta?

A. escala maior → denominador maior → menos detalhe

Explicação: Relação invertida. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

B. longitude → norte/sul do Equador

Explicação: Longitude mede leste/oeste. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

C. latitude → leste/oeste de Greenwich

Explicação: Latitude mede norte/sul. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

D. escala maior → denominador menor → mais detalhe

Explicação: Correto.

E. fuso horário ideal → 6° por hora

Explicação: Fuso ideal usa 15° por hora; 6° lembra UTM. Maior denominador não significa maior detalhe; escala geográfica é abrangência de análise.

**Resposta:** escala maior → denominador menor → mais detalhe

Escala cartográfica maior é fração maior: denominador menor, maior detalhe.

## v6-fix-d6c7dfafd8e85899

fixacao · D1/C2

Qual representação tende a mostrar maior detalhe de um lote urbano?

A. planisfério 1:50.000.000

Explicação: Em 1:50.000.000, 1 cm representa 500 km. Essa escala generaliza extensas áreas e não fornece o detalhe de um lote urbano; uma planta 1:1.000 atende melhor a essa finalidade.

B. planta 1:1.000

Explicação: 1:1.000 é escala muito grande e adequada a área pequena e detalhada.

C. mapa estadual 1:2.000.000

Explicação: Em 1:2.000.000, 1 cm representa 20 km. Um mapa estadual nessa escala não sustenta a leitura detalhada de um lote, para a qual a planta 1:1.000 é mais adequada.

D. carta continental 1:20.000.000

Explicação: Em 1:20.000.000, 1 cm representa 200 km. O recorte continental e a escala pequena não permitem o detalhamento local pedido; compare com a planta 1:1.000.

**Resposta:** planta 1:1.000

1:1.000 é escala muito grande e adequada a área pequena e detalhada.

## v6-fix-e0928f0d1e78eddd

fixacao · D1/C2

A legenda de um mapa tem como função principal:

A. definir o datum

Explicação: O datum estabelece a referência geodésica das coordenadas e deve ser identificado nas informações técnicas do produto. A legenda explica o significado de símbolos, cores e classes.

B. explicar a correspondência entre símbolos e fenômenos

Explicação: A legenda decodifica a linguagem simbólica utilizada.

C. determinar o fuso horário

Explicação: Uma legenda de mapa de fusos pode explicar as classes de horário representadas, mas não determina o fuso civil. Essa definição depende da convenção legal e do território.

D. corrigir distorções da projeção

Explicação: A legenda comunica a simbologia; não modifica a transformação matemática da superfície para o plano. As deformações da projeção precisam ser avaliadas segundo sua propriedade e finalidade.

**Resposta:** explicar a correspondência entre símbolos e fenômenos

A legenda decodifica a linguagem simbólica utilizada.

## v6-fix-021ea0f23f590e47

fixacao · D1/C2

Em um mapa 1:500.000, 4 cm correspondem a:

A. 2 km

Explicação: Em 1:500.000, 1 cm representa 5 km. Para 4 cm, são 4 × 5 = 20 km; 2 km é um resultado dez vezes menor, decorrente de conversão incorreta.

B. 20 km

Explicação: 4 × 500.000 cm = 2.000.000 cm = 20 km.

C. 200 km

Explicação: A conta é 4 × 500.000 = 2.000.000 cm. Dividir por 100.000 cm/km resulta em 20 km; 200 km acrescenta um fator dez.

D. 2.000 km

Explicação: O produto fornece 2.000.000 cm, equivalentes a 20 km. Responder 2.000 km acrescenta um fator cem à distância correta; mantenha a unidade em cada etapa.

**Resposta:** 20 km

4 × 500.000 cm = 2.000.000 cm = 20 km.

## v6-fix-d7f5c9687a4e3050

fixacao · D1/C2

Entre 1:25.000 e 1:250.000, qual é a escala maior?

A. 1:25.000

Explicação: Menor denominador significa maior escala e maior detalhe.

B. 1:250.000

Explicação: Compare as frações: 1/250.000 é dez vezes menor que 1/25.000. Portanto, 1:250.000 é a escala menor, embora seu denominador seja maior.

C. são iguais

Explicação: Os denominadores diferem por um fator dez. Para a mesma medida no papel, 1:250.000 representa dez vezes mais distância no terreno; as razões não são iguais.

D. depende da projeção

Explicação: As duas razões numéricas já permitem a comparação: 1/25.000 é maior que 1/250.000. A projeção importa à adequação das medidas, mas não inverte a ordem dessas frações.

**Resposta:** 1:25.000

Menor denominador significa maior escala e maior detalhe.

## v6-fix-1a998af4f14615ef

fixacao · D1/C2

Um ponto 5°N, 48°W está:

A. ao sul do Equador e a leste de Greenwich

Explicação: N indica norte do Equador e W indica oeste de Greenwich. Esta alternativa inverte os dois hemisférios informados em 5°N, 48°W.

B. ao norte do Equador e a oeste de Greenwich

Explicação: N indica norte do Equador; W indica oeste de Greenwich.

C. ao norte e a leste

Explicação: A posição ao norte está correta, mas W significa oeste, e não leste. Leia separadamente a letra da latitude e a da longitude.

D. sobre Greenwich

Explicação: Greenwich corresponde à longitude 0°. Como o ponto tem longitude 48°W, ele está a oeste desse meridiano, não sobre ele.

**Resposta:** ao norte do Equador e a oeste de Greenwich

N indica norte do Equador; W indica oeste de Greenwich.

## v6-fix-190545c170ff650b

fixacao · D1/C2

A longitude é medida a partir:

A. do Equador

Explicação: O Equador é o paralelo de latitude 0° e referencia a medida norte–sul. A longitude mede a posição leste–oeste a partir de Greenwich.

B. do Trópico de Capricórnio

Explicação: O Trópico de Capricórnio é um paralelo do Hemisfério Sul, não o meridiano de origem das longitudes. A referência pedida é Greenwich, longitude 0°.

C. do meridiano de Greenwich

Explicação: Greenwich é o meridiano de referência para longitudes.

D. do polo Norte

Explicação: O polo Norte corresponde a 90°N de latitude. A origem da longitude é um meridiano, Greenwich; o polo não substitui essa referência angular.

**Resposta:** do meridiano de Greenwich

Greenwich é o meridiano de referência para longitudes.

## v6-fix-d29a15811dfcee29

fixacao · D1/C2

Duas cidades teóricas diferem 45° de longitude. A diferença solar aproximada é:

A. 1 h

Explicação: Uma hora corresponde aproximadamente a 15° no modelo solar. Para a diferença de 45° indicada, a operação correta é 45/15 = 3 horas.

B. 2 h

Explicação: Duas horas corresponderiam a 30°. Como a diferença dada é 45°, divida por 15° por hora e obtenha 3 horas.

C. 3 h

Explicação: 45 ÷ 15 = 3 horas.

D. 4 h

Explicação: Quatro horas corresponderiam a 60°. Para 45°, a diferença solar aproximada é 3 horas; a divisão é por 15, não uma contagem arbitrária de localidades.

**Resposta:** 3 h

45 ÷ 15 = 3 horas.

## v6-fix-b410c9c2bff563a0

fixacao · D1/C2

Em relação a Greenwich, um local mais a leste tende, no modelo dos fusos, a estar:

A. atrasado

Explicação: No modelo ideal, a Terra gira de oeste para leste e os lugares a leste alcançam antes a mesma referência solar. Seus horários ficam adiantados, não atrasados, em relação a Greenwich.

B. adiantado

Explicação: O movimento aparente do Sol e a rotação terrestre fazem os horários avançarem para leste.

C. no mesmo horário necessariamente

Explicação: Localidades podem compartilhar uma hora civil por decisão legal, mas isso não é necessário para qualquer ponto a leste. O modelo geométrico do enunciado relaciona avanço para leste a adiantamento horário.

D. sem relação com o tempo

Explicação: A longitude tem relação geométrica com a hora: 360° em aproximadamente 24 horas fundamentam 15° por hora. Ajustes dos fusos civis não eliminam essa relação.

**Resposta:** adiantado

O movimento aparente do Sol e a rotação terrestre fazem os horários avançarem para leste.

## v6-fix-3685fc1570f91cc0

fixacao · D1/C2

Em uma escala 1:250.000, 1 cm no mapa representa no terreno:

A. 250 m

Explicação: 1 cm corresponde a 250.000 cm, ou 2.500 m. Responder 250 m perde um fator dez na conversão; o resultado correto é 2,5 km.

B. 2,5 km

Explicação: 1 cm × 250.000 = 250.000 cm = 2.500 m = 2,5 km.

C. 25 km

Explicação: 250.000 cm / 100.000 cm por km = 2,5 km. O valor 25 km é dez vezes maior que a distância representada por 1 cm nessa escala.

D. 250 km

Explicação: A escala usa 250.000 centímetros no terreno para cada centímetro no mapa, não 250 quilômetros. A conversão resulta em 2,5 km; 250 km acrescenta um fator cem.

**Resposta:** 2,5 km

1 cm × 250.000 = 250.000 cm = 2.500 m = 2,5 km.

## v6-fix-ace8da47b352aa60

fixacao · D1/C2

Em um mapa 1:250.000, a distância entre dois pontos é 6 cm. A distância real é:

A. 1,5 km

Explicação: Em 1:250.000, cada centímetro representa 2,5 km. Para 6 cm, 6 × 2,5 = 15 km; 1,5 km é dez vezes menor.

B. 15 km

Explicação: 6 × 250.000 cm = 1.500.000 cm = 15 km.

C. 150 km

Explicação: 6 × 250.000 = 1.500.000 cm. A conversão para quilômetros divide por 100.000, produzindo 15 km; 150 km acrescenta um fator dez.

D. 1.500 km

Explicação: 1.500.000 cm equivalem a 15 km. Responder 1.500 km deixa o resultado cem vezes maior; confira a relação 1 km = 100.000 cm.

E. 0,15 km

Explicação: 0,15 km são 150 m, mas cada centímetro do mapa já representa 2.500 m. Para 6 cm, a distância é 15 km, cem vezes maior que esta alternativa.

**Resposta:** 15 km

6 × 250.000 cm = 1.500.000 cm = 15 km.

## v6-q-f01

concurso · D2/C3

Uma trilha mede 7,2 cm em uma carta 1:50.000. Mantida a escala, qual é a extensão horizontal representada?

A. 3,6 km.

Explicação: 7,2 × 50.000 = 360.000 cm; dividir por 100.000 dá 3,6 km.

B. 0,36 km.

Explicação: Esse resultado perde um fator dez na conversão de centímetros para quilômetros.

C. 36 km.

Explicação: Esse resultado acrescenta um fator dez; 1 cm nessa carta corresponde a 0,5 km.

D. 360 km.

Explicação: 360.000 é a medida em centímetros, não em quilômetros.

E. 7,2 km.

Explicação: Igualar cm a km funcionaria em 1:100.000, mas a carta usa 1:50.000.

**Resposta:** 3,6 km.

7,2 × 50.000 = 360.000 cm; dividir por 100.000 dá 3,6 km.

## v6-q-f02

concurso · D2/C3

Um levantamento informa 12°30′S. Em graus decimais assinados, a latitude é:

A. −12,30°.

Explicação: Minutos de arco usam base 60, não centésimos de grau.

B. −12,5°.

Explicação: 30/60 = 0,5; o hemisfério sul aplica sinal negativo a 12,5.

C. 12,5°.

Explicação: O módulo foi convertido corretamente, mas o sinal sul foi perdido.

D. −12,05°.

Explicação: 30 minutos são metade de um grau, não cinco centésimos.

E. −11,5°.

Explicação: O sinal negativo vale para o conjunto: −(12+0,5), e não −12+0,5.

**Resposta:** −12,5°.

30/60 = 0,5; o hemisfério sul aplica sinal negativo a 12,5.

## v6-q-f03

concurso · D2/C3

Uma transmissão começa às 23h30 de segunda-feira em UTC−5. Qual será a hora no Pará, em UTC−3, no mesmo instante?

A. 21h30 de segunda-feira.

Explicação: Subtrair duas horas inverte a diferença entre os deslocamentos.

B. 1h30 de segunda-feira.

Explicação: A hora foi ajustada, mas a mudança de dia foi omitida.

C. 1h30 de terça-feira.

Explicação: UTC−3 está duas horas à frente de UTC−5; a soma ultrapassa meia-noite.

D. 2h30 de terça-feira.

Explicação: Três horas seria a diferença entre UTC e o Pará; a origem é UTC−5.

E. 23h30 de segunda-feira.

Explicação: Os dois lugares têm deslocamentos distintos, embora ambos sejam negativos.

**Resposta:** 1h30 de terça-feira.

UTC−3 está duas horas à frente de UTC−5; a soma ultrapassa meia-noite.

## v6-q-f04

concurso · D2/C3

Uma planta foi girada sobre a mesa. A seta de norte continua visível e um trajeto tem azimute geográfico de 270°. A direção desse trajeto é:

A. Leste, porque o papel foi girado.

Explicação: Girar a folha não troca o significado da referência geográfica indicada.

B. Sul, pois o azimute passou de 180°.

Explicação: Sul é exatamente 180°; 270° acrescenta mais um quarto de volta.

C. A parte inferior da folha, independentemente da seta.

Explicação: A posição no papel só ganha direção a partir da referência indicada.

D. Oeste, medido a partir do norte indicado.

Explicação: 270° no sentido horário a partir do norte corresponde a oeste, qualquer que seja a rotação do papel.

E. Norte magnético, porque todo azimute usa bússola.

Explicação: O enunciado especifica azimute geográfico; referências magnética e geográfica podem diferir.

**Resposta:** Oeste, medido a partir do norte indicado.

270° no sentido horário a partir do norte corresponde a oeste, qualquer que seja a rotação do papel.

## v6-q-f05

concurso · D2/C3

Para discutir a distribuição das salas de uma escola, uma professora precisa de uma representação detalhada do edifício. Qual escolha responde melhor a essa finalidade?

A. Mapa nacional em escala pequena, ampliado na tela.

Explicação: Zoom amplia pixels, mas não cria detalhes que a base nacional não contém.

B. Carta regional sem legenda, desde que tenha coordenadas.

Explicação: Coordenadas não substituem a decodificação dos símbolos nem o detalhe interno necessário.

C. Mapa mundial equivalente, para preservar a área de cada sala.

Explicação: Equivalência global não resolve a escala inadequada nem fornece a planta do edifício.

D. Imagem sem escala, pois detalhes visuais bastam para medir.

Explicação: Detalhe aparente não estabelece a correspondência métrica exigida para medidas.

E. Planta em escala grande, com legenda e referência de orientação.

Explicação: Área pequena e grande detalhe favorecem uma planta; os elementos cartográficos continuam necessários.

**Resposta:** Planta em escala grande, com legenda e referência de orientação.

Área pequena e grande detalhe favorecem uma planta; os elementos cartográficos continuam necessários.

## v6-q-f06

concurso · D3/C3

Uma carta 1:80.000 é ampliada uniformemente para 200% de suas dimensões lineares, incluindo a barra gráfica. Qual é a interpretação correta?

A. A nova escala numérica é 1:40.000 e a barra redimensionada continua válida.

Explicação: O denominador é dividido por dois; desenho e barra ampliados juntos mantêm a correspondência.

B. A nova escala é 1:160.000 e a barra continua válida.

Explicação: Ampliar o desenho aumenta a escala; multiplicar o denominador faria o oposto.

C. A escala continua 1:80.000 porque o terreno não mudou.

Explicação: O terreno não mudou, mas a razão entre desenho e terreno mudou.

D. A escala é 1:40.000, mas a barra deve ficar no tamanho original.

Explicação: Uma barra mantida no tamanho anterior deixaria de acompanhar o mapa ampliado.

E. A escala é 1:20.000 porque a área quadruplicou.

Explicação: A razão de escala é linear; a área quadruplica, mas o denominador só é dividido por dois.

**Resposta:** A nova escala numérica é 1:40.000 e a barra redimensionada continua válida.

O denominador é dividido por dois; desenho e barra ampliados juntos mantêm a correspondência.

## v6-q-f07

elite · D3/C4

Um polígono ocupa 4 cm² em uma carta 1:50.000. Outra impressão duplica as dimensões lineares da carta. Qual combinação está correta?

A. Área real de 2 km²; desenho de 8 cm² na escala 1:25.000.

Explicação: As duas áreas foram tratadas como grandezas lineares.

B. Área real de 1 km²; desenho de 16 cm² na nova escala 1:25.000.

Explicação: Cada cm representa 0,5 km, logo 4×0,5²=1 km²; dobrar os lados quadruplica o desenho e reduz N à metade.

C. Área real de 1 km²; desenho de 8 cm² na escala 1:100.000.

Explicação: A área do desenho cresce quatro vezes e a ampliação diminui, não aumenta, o denominador.

D. Área real de 100 km²; desenho de 16 cm² na escala 1:25.000.

Explicação: O redimensionamento está correto, mas a conversão de cm² para km² perdeu o quadrado da unidade.

E. Área real de 4 km²; desenho de 16 cm² na escala 1:50.000.

Explicação: A impressão não aumenta o terreno, e a nova razão linear não pode permanecer igual.

**Resposta:** Área real de 1 km²; desenho de 16 cm² na nova escala 1:25.000.

Cada cm representa 0,5 km, logo 4×0,5²=1 km²; dobrar os lados quadruplica o desenho e reduz N à metade.

## v6-q-f08

concurso · D2/C3

Observe a tabela didática de coordenadas assinadas. Admitindo a ordem latitude, longitude, qual relação é sustentada?

Apoio: Coordenadas geográficas — ordem latitude, longitude

| Ponto | Latitude | Longitude |
| --- | --- | --- |
| A | −1° | −48° |
| B | −5° | −48° |
| C | −1° | −52° |

A. B fica a leste de A e C fica ao sul de A.

Explicação: B só muda latitude e C só muda longitude: os eixos foram trocados.

B. A e B estão no mesmo paralelo, e A e C no mesmo meridiano.

Explicação: A e B compartilham longitude, portanto meridiano; A e C compartilham latitude, portanto paralelo.

C. B fica ao sul de A e C fica a oeste de A.

Explicação: −5° é mais ao sul que −1°; −52° é mais a oeste que −48°.

D. B fica ao sul de A, mas C fica a leste de A.

Explicação: A primeira relação está correta; no hemisfério oeste, aumentar o módulo da longitude desloca para oeste.

E. A fica a oeste de C, e B fica ao norte de A.

Explicação: As duas comparações foram invertidas: −48° fica a leste de −52°, e −5° fica ao sul de −1°.

**Resposta:** B fica ao sul de A e C fica a oeste de A.

−5° é mais ao sul que −1°; −52° é mais a oeste que −48°.

## v6-q-f09

elite · D3/C4

Uma aeronave parte às 22h de segunda-feira de A (UTC−3). O voo dura 5 horas e chega a B (UTC+2). Considerando somente esses fusos civis declarados, a chegada ocorre:

A. Às 3h de terça-feira em B.

Explicação: Esse é o horário após o voo ainda no fuso da origem.

B. Às 0h de terça-feira em B.

Explicação: Subtrair três horas não aplica a diferença entre UTC−3 e UTC+2.

C. Às 8h de segunda-feira em B.

Explicação: O resultado horário exige avançar o calendário depois da meia-noite.

D. Às 8h de terça-feira em B.

Explicação: 22h+5h de voo=3h de terça em UTC−3; B está cinco horas à frente, logo 8h.

E. Às 17h de segunda-feira em B.

Explicação: Esse cálculo inverte a diferença de fusos e ignora o tempo de voo.

**Resposta:** Às 8h de terça-feira em B.

22h+5h de voo=3h de terça em UTC−3; B está cinco horas à frente, logo 8h.

## v6-q-f10

elite · D3/C4

Uma equipe dispõe de A, base municipal generalizada 1:100.000 produzida em 1990, e B, planta 1:2.000 de 2025. A é ampliada na tela até apresentar a mesma extensão aparente de B. Para investigar acessos de uma escola, qual conduta distingue escala de exibição, época e qualidade?

A. Usar A para medir os acessos, recalibrando a escala numérica; a atualização da razão recompõe a geometria generalizada.

Explicação: Recalibrar a escala corrige uma relação de exibição, mas não reconstrói a geometria que foi omitida.

B. Adotar B sem verificar o levantamento, pois escala grande e data recente demonstram precisão suficiente para qualquer medida local.

Explicação: Escala e data são condições relevantes, mas não certificam sozinhas a precisão do levantamento.

C. Comparar as duas imagens pela mesma quantidade de pixels na tela e escolher a mais nítida como base de maior acurácia posicional.

Explicação: Resolução de exibição e nitidez não medem a diferença entre posições representadas e posições de referência.

D. Reprojetar A para o mesmo sistema de B e tratá-las como equivalentes em detalhe, já que a referência geométrica será comum.

Explicação: Compatibilizar referência é necessário ao cruzamento, mas não iguala época, detalhe de aquisição ou generalização.

E. Examinar B como base potencialmente compatível, verificando levantamento e precisão; a ampliação de A não recupera os detalhes ausentes.

Explicação: B tem escala e época mais próximas da finalidade, mas isso não dispensa conferir fonte, método e precisão. A não ganha informação pela ampliação.

**Resposta:** Examinar B como base potencialmente compatível, verificando levantamento e precisão; a ampliação de A não recupera os detalhes ausentes.

B tem escala e época mais próximas da finalidade, mas isso não dispensa conferir fonte, método e precisão. A não ganha informação pela ampliação.

## v6-q-f11

elite · D3/C4

Uma camada declara pares (longitude, latitude) em graus decimais no SIRGAS2000. Recebeu (−1, −48), copiado de uma planilha cuja ordem é (latitude, longitude). O analista quer corrigir a posição e afirmar que ela não tem erro, pois o referencial é o mesmo. Qual avaliação é adequada?

A. Reordenar para (−48, −1), após conferir os campos; o referencial comum não demonstra erro posicional nulo.

Explicação: A troca dos eixos explica esta inconsistência. Corrigir a ordem não mede a incerteza da aquisição ou a qualidade da posição.

B. Reordenar para (−48, −1) e considerar a posição exata, pois qualquer dado no SIRGAS2000 compartilha a mesma precisão.

Explicação: A ordem fica correta, mas um referencial comum não torna todos os levantamentos igualmente precisos.

C. Manter (−1, −48), porque a declaração SIRGAS2000 corrige automaticamente a ordem de quaisquer campos importados.

Explicação: O referencial não troca campos de uma planilha; a convenção do esquema precisa ser respeitada.

D. Reordenar para (−48, −1) e dividir ambos os valores por 60, para converter os pares assinados em graus decimais.

Explicação: Os valores já estão em graus decimais; a divisão introduziria uma conversão angular indevida.

E. Conservar os valores e apenas atribuir ao arquivo a convenção latitude–longitude, sem conferir o esquema exigido pela aplicação.

Explicação: Mudar a descrição para acomodar a planilha não garante que a aplicação leia os eixos na ordem exigida.

**Resposta:** Reordenar para (−48, −1), após conferir os campos; o referencial comum não demonstra erro posicional nulo.

A troca dos eixos explica esta inconsistência. Corrigir a ordem não mede a incerteza da aquisição ou a qualidade da posição.

## v6-q-f12

concurso · D2/C2

Uma análise é regional, mas utiliza plantas 1:2.000 para verificar acessos a escolas antes de agregar resultados. Isso significa que:

A. Toda análise regional exige que cada base cartográfica tenha escala pequena.

Explicação: A agregação regional pode depender de observações locais detalhadas.

B. A escala geográfica da análise pode ser regional e as bases cartográficas locais podem ter escala grande.

Explicação: Abrangência analítica e razão métrica são dimensões relacionadas, mas distintas.

C. 1:2.000 é escala pequena porque abrange uma pequena área.

Explicação: Área pequena e detalhe elevado caracterizam escala cartográfica grande.

D. Escala geográfica e cartográfica são a mesma fração.

Explicação: Só a cartográfica expressa a razão matemática mapa/terreno.

E. A agregação torna desnecessário conhecer a qualidade das plantas.

Explicação: Erros da base podem propagar-se para o resultado regional.

**Resposta:** A escala geográfica da análise pode ser regional e as bases cartográficas locais podem ter escala grande.

Abrangência analítica e razão métrica são dimensões relacionadas, mas distintas.
