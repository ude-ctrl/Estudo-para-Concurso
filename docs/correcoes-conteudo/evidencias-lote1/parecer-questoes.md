# Parecer independente — questões prioritárias do lote 1

Data: 24/10/2026. Base consultada: bancos publicados do commit `a40a3c33c7a5b7f20750316fe694331c1a214b61`. Revisão somente de leitura; nenhum arquivo do repositório foi alterado.

## T12 — Agricultura Familiar, `b_7_0`

O comando antigo admite A, B e C: área, trabalho familiar e direção familiar não bastam isoladamente. Trocar somente o gabarito não resolve o defeito.

Proposta de enunciado, preservando as quatro opções e o índice correto 0:

> Um candidato classificou um estabelecimento como agricultura familiar apenas porque ele ocupa dois módulos fiscais, sem informações sobre trabalho, renda e gestão. Qual característica foi indevidamente tomada como suficiente nesse raciocínio?

As opções permanecem, na mesma ordem: `ter área pequena`; `usar predominantemente mão de obra familiar`; `ser dirigido pela família`; `atender aos critérios legais combinados`.

Resposta geral (`e`):

> O candidato usou apenas a área. Ela é um dos critérios e não comprova, sozinha, o enquadramento como agricultura familiar: também é necessário verificar os requisitos legais de trabalho, renda e direção do estabelecimento. No caso apresentado, essas informações não foram fornecidas.

Feedbacks `q.x`, na ordem original:

1. **A:** `Correta. O único dado usado foi a área de dois módulos fiscais. O erro foi tratar esse dado como suficiente, sem verificar os demais critérios legais.`
2. **B:** `A predominância da mão de obra familiar não foi informada no caso. Ela integra os critérios legais, mas não foi o dado usado pelo candidato para chegar à conclusão.`
3. **C:** `A direção pela família também não foi informada. É um critério que deve ser verificado, não a informação isolada usada nesse raciocínio.`
4. **D:** `O candidato não verificou os critérios combinados: baseou-se apenas na área. Conferir os requisitos legais em conjunto é o procedimento que evitaria a conclusão indevida.`

A proposta tem resposta única sem afirmar que os requisitos B ou C bastam sozinhos. O nível permanece introdutório; o ganho é retirar a ambiguidade e explicitar a inferência inválida. Não se propõe alterar a teoria, criar novo critério legal nem afirmar que todo grupo abrangido pela política se submete indistintamente a uma regra única de área.

Persistência: manter ID, opções, ordem e índice evita remapear respostas e XP. A redação mudou; o registro de versão deve explicitar que tentativas antigas correspondem ao item anterior. Preservar a tentativa não significa produzir evidência de resolução da nova redação ou reavaliar retroativamente quem marcou B/C no enunciado ambíguo.

## T26 — Conjuntos, `b_17_0`

Enunciado, opções e índice correto permanecem. Cálculo: `20 + 15 − 5 = 30`. A soma inicial conta duas vezes os cinco elementos da interseção; uma única subtração mantém esses elementos contados uma vez.

Proposta para `X.b_17_0`:

1. **A = 30:** `Correta. A soma 20 + 15 conta os cinco elementos da interseção duas vezes. Subtraindo uma dessas contagens: 20 + 15 − 5 = 30.`
2. **B = 40:** `40 resulta de 20 + 15 + 5, somando novamente a interseção. A correção da dupla contagem exige subtrair 5, não acrescentar 5.`
3. **C = 25:** `25 resulta de 20 + 15 − 5 − 5, retirando a interseção duas vezes. Os elementos comuns devem aparecer uma vez na união; por isso, basta uma subtração.`
4. **D = 35:** `35 é apenas 20 + 15. Nessa soma, os cinco elementos comuns foram contados duas vezes; desconte uma contagem de 5 para obter 30.`

Os quatro caminhos correspondem aos valores das opções. O texto diagnostica o cálculo possível associado ao distrator, sem alegar conhecer o raciocínio efetivamente realizado por cada aluno. A explicação geral existente `20+15−5=30.` continua correta e pode permanecer.

## T26 — renderização de textos em `opt()`

Inspecionados os campos `p`, `o`, `e`, `q.x` e as entradas de `X` das 48 questões (diagnóstico, etapas e Chefão). **Não foi encontrado HTML intencional nem entidade HTML nesses campos.** Os únicos sinais `<`, `>` ou `&` encontrados foram três campos da mesma questão:

- `b_18_0.p`: `Se A<B e B<C, então:`;
- `b_18_0.o[0]`: `A<C`;
- `b_18_0.o[1]`: `C<A`.

Portanto, escapar os textos interpolados de questões no `opt()` **somente da página T26** preserva a apresentação pedagógica existente e corrige o corte. A teoria `B[i].h` contém HTML legítimo e deve continuar sendo renderizada como conteúdo formatado; não estender o escape a ela.

Campos a proteger em `opt()`:

- `q.p`;
- texto `t` de cada opção;
- `q.o[v]` no trecho “Você tocou em”;
- `q.o[q.c]` na resposta certa;
- `x[v] || ""` e `x[q.c] || ""` nas explicações;
- `q.e` no trecho “Para guardar”.

O `esc()` existente transforma `&` e `<`, suficiente para esses nós de texto. Não escapar o HTML estrutural produzido pelo renderizador. Não presumir que isso seja automaticamente seguro em outras páginas sem nova inspeção, pois podem existir negritos ou outras marcações intencionais nos campos.

Verificação funcional relevante: conferir o texto exato antes da resposta; escolher C<A e conferir que a alternativa escolhida e o gabarito A<C continuam íntegros no feedback; conferir também a alternativa correta. Testar com resposta antiga já persistida e após recarregar para demonstrar que o conserto visual não reseta nem remunera novamente a questão.
