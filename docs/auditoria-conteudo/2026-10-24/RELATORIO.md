# Auditoria editorial e pedagógica da plataforma

**Data:** 24/10/2026. **Base auditada:** `a40a3c33c7a5b7f20750316fe694331c1a214b61`. **Branch do relatório:** `auditoria-conteudo-integral`.

A plataforma tem conteúdo útil e pode ser melhorada por correções localizadas. A principal fragilidade encontrada está na qualidade do treino: justificativas incoerentes, perguntas sem contexto suficiente, alternativas muito fáceis de eliminar e concentração dos gabaritos nas primeiras posições. Há também erros conceituais pontuais, uma questão prejudicada pela renderização HTML e dados que precisam de atualização ou melhor identificação da fonte.

**Parecer: material aproveitável, com correções prioritárias; não aprovado como acervo integralmente livre de erros.** Leitura completa não equivale a confirmação externa de cada afirmação. As reservas documentais estão identificadas e não foram convertidas em acusações de falsidade.

Este trabalho acrescenta documentação de auditoria. Não modifica teoria, questões, respostas, flashcards, jogos, bases canônicas ou funcionamento do site. Não faz merge, publicação ou migração.

## Documentos para consulta

- [Parecer detalhado de cada material](PARECERES_POR_MATERIAL.md): conceitos, explicações, questões, exemplos, cartões, jogos e recomendações.
- [Inventário completo](INVENTARIO.csv): identificação, fonte e contagens dos 29 materiais.
- [Fontes verificadas](FONTES_VERIFICADAS.md) e [conferência complementar](FONTES_COMPLEMENTARES.md): resultado, fonte, localização e limites de acesso.
- [Revisão individual dos feedbacks de jogos](GAMES_FEEDBACK.csv) e [parecer dos jogos](GAMES_PARECER.md).
- [Relatório de testes](TESTES.md) e [verificação visual da Cartografia](QA_CARTOGRAFIA.md).
- [Cobertura da leitura](evidencias/coverage.json), [registros antigos](evidencias/ledger.json), [registros canônicos](evidencias/canonical-ledger.json), [checagens estruturais](evidencias/checks.json) e [hashes das fontes](evidencias/HASHES_FONTES.json).

## Escopo e método

Foram lidos integralmente os 26 materiais antigos ativos e as três unidades publicadas de Cartografia. Os materiais antigos aparecem agrupados em 24 cartões da biblioteca; agrupamento de navegação não elimina conteúdo. Em Cartografia, a fonte editorial foi exclusivamente a base canônica aprovada de cada unidade, versão 1.0.0. Os HTMLs arquivados não foram usados para reinterpretá-la.

A revisão examinou teoria, comandos, alternativas, gabaritos, explicações gerais e por alternativa, perguntas de evocação, respostas-modelo, flashcards, afirmações V/F, justificativas, suplementos e suportes textuais das imagens. Foram recalculados os exercícios numéricos e avaliadas coerência interna, autonomia dos itens sorteados, clareza das explicações e adequação do raciocínio exigido.

As fontes oficiais foram consultadas de modo dirigido. O edital SEDUC-PA/FGV 2026 foi adotado como referência porque é o perfil explicitamente anunciado pela plataforma. Não se presume que isso cubra qualquer outro concurso de Professor de Geografia. A conferência dos tópicos e do formato não demonstra frequência histórica de cobrança nem dificuldade equivalente à prova.

| Componente | Materiais antigos | Cartografia canônica | Total |
|---|---:|---:|---:|
| Materiais/unidades | 26 | 3 | 29 |
| Etapas/missões | 475 | 17 | 492 |
| Questões de múltipla escolha | 1.160 | 161 | 1.321 |
| Flashcards | 1.294 | 120 | 1.414 |
| Afirmações V/F | 2.600 | 256 | 2.856 |
| Evocações/recalls | 396 | 39 | 435 |

As 1.160 questões antigas incluem 78 diagnósticas, 952 de etapa e 130 de Chefão. Reapresentações do diagnóstico no encerramento e montagens ABCD geradas a partir do banco V/F não são contadas como questões editoriais novas. As 492 etapas/missões são uma soma de estruturas diferentes, não uma medida de duração equivalente. Os 705 registros do leitor canônico incluem títulos, conceitos e suportes; não representam 705 questões.

Os 31 HTMLs históricos foram preservados: 26 materiais ativos, quatro arquivos antigos de Cartografia e um recurso de preparação/auditoria. Esse recurso auxiliar não entra nas contagens dos 29 materiais pedagógicos desta revisão.

## Correções prioritárias

P1 significa que o problema pode induzir aprendizagem errada, impedir a resolução ou comprometer a avaliação. P2 indica precisão conceitual, contextualização ou melhoria didática. Não são ordens automáticas para retirar o site do ar.

| Prioridade | Localização | Constatação | Correção recomendada |
|---|---|---|---|
| P1 | T26 Lógica, `b_18_0` | O original contém `Se A<B e B<C, então:`, mas o navegador exibe “Se A”; as alternativas A<C e C<A aparecem como A e C. Reproduzido e fotografado. | Renderizar os campos textuais de forma segura, preservando os sinais e o gabarito. Conferir também o texto do feedback. |
| P1 | T12 Agrária, `b_7_0` | O comando pergunta qual característica isolada não basta para identificar agricultura familiar. Área pequena, mão de obra familiar e direção familiar são insuficientes isoladamente. Mais de uma alternativa responde ao comando. | Reformular o caso com o conjunto de critérios ou pedir uma afirmação inequivocamente falsa. Não basta trocar a letra correta. |
| P1 | T26 Lógica, `b_17_0`, feedback B | Para conjuntos de 20 e 15, com interseção 5, o resultado correto é 30. A alternativa 40 é explicada como ausência de desconto da interseção, mas esse erro produziria 35. | Manter o resultado 30 e adequar a explicação de cada distrator ao número correspondente. |
| P1 | Jogos antigos, casos nos pareceres e CSV | Há justificativas que contradizem ou não explicam a própria afirmação. Exemplo reproduzido: T26 `G_12`, +10% e −10% resultam em 99%; o jogo mostra “VERDADEIRA. Não.” | Escrever justificativa própria para cada afirmação, com mecanismo ou cálculo. Neste exemplo: 1,10×0,90=0,99. |
| P1 | T26 `G_70`, `G_71`, `G_73`, `G_78`; T25 `G_7`; outros casos identificados | Itens sorteados fazem referência a uma sequência, premissa ou frase que não é apresentada. | Incluir no próprio item a sequência, as premissas e o contexto necessários. Uma categoria curta não substitui o enunciado. |
| P1 | Questões de etapa antigas, especialmente T24–T27 | As quatro disciplinas têm todas as 40 questões de etapa com a primeira alternativa correta. O código mantém a ordem original. | Distribuir/embaralhar alternativas com identidade persistente e histórico compatível. Preservar a correção semântica; não alterar letras diretamente no progresso salvo. |
| P2 | T09 Energia, `B_4`, `C_14` e ocorrências relacionadas | O material usa 49,5%; o BEN 2026 consultado informa 49,4% de renovabilidade energética em 2025. Os 86,8% da matriz elétrica conferem. | Conciliar versão da fonte e atualizar todas as ocorrências relacionadas com ano-base e referência. |
| P2 | T07 Hidrologia, `C_3` | A fórmula usa “± armazenamento”, sem distinguir estoque de variação nem definir o sinal. | Usar, no modelo simplificado, P=ET+Q+ΔS; definir período, unidades e convenção de entradas/saídas. |
| P2 | T21 Economia, `B_16_recall` | Inclui extração vegetal na indústria extrativa, no contexto de classificação econômica. CNAE separa produção florestal (A) e indústria extrativa (B). | Explicitar o sistema classificatório e separar produção vegetal, extração mineral e transformação industrial. |
| P2 | T18 BNCC, `c_0` | O código EF07GE04 é vinculado a uma comparação genérica de mapas, sem especificar os dados populacionais exigidos pela habilidade. | Informar o tema dos mapas, a ação do aluno e a evidência esperada; conferir a redação oficial do código. |
| P2 | T16 Brasil, `B_16`, `C_33`, `G_66`, matriz | O total 203.062.512 corresponde à divulgação inicial do Censo 2022; resultados posteriores usam 203.080.756. | Identificar versão e usar números nacionais/regionais coerentes. Preservar dados anteriores somente com rótulo histórico claro. |
| P2 | Cartografia, `v6-fix-5f0730f3bd5ef3ce` | Feedback “dez vezes menor/maior” não identifica se se refere ao denominador ou à escala; as relações são inversas. | Nomear o denominador e explicar a fração, preservando a resposta 1:300.000. |
| P2 | Cartografia, `v6-fc-224939a37ec33bc5`, `v6-vf-7f2d8cd01b2f9898` | “Ampliação de 200%” admite interpretações distintas. | Padronizar “para 200% das dimensões lineares”, como já ocorre em outra questão da unidade. |

[Imagem do erro de Lógica](evidencias/logic-damaged-question.png). Os IDs dos materiais e caminhos dos arquivos constam do inventário. Índices `B_0`, `C_0` e `G_0` começam em zero; `b_18_0` é a primeira questão da 19ª etapa.

## Qualidade do treino

Nos bancos antigos, as respostas corretas se distribuem em A=537, B=559, C=53, D=11 e E=0. Portanto, 94,5% estão nas duas primeiras posições. Isso não torna cada gabarito incorreto, mas permite aprender o padrão da interface em vez do conteúdo. A constatação vale para as questões originais de diagnóstico, etapa e Chefão. O minigame ABCD embaralha suas montagens, e a V6 possui mecanismo próprio de ordenação; não se deve generalizar a mesma falha a esses modos.

Não foram encontrados índices de gabarito fora das alternativas nem opções textualmente idênticas nas 1.160 questões antigas. Essa integridade estrutural não detecta duas respostas semanticamente aceitáveis, como em Agricultura Familiar.

A triagem selecionou 117 justificativas de jogos, posteriormente examinadas individualmente: **103 contradizem o julgamento exibido, 10 são ambíguas e não explicam a resposta e quatro exigem também reformulação do contexto**. Os 117 registros, distribuídos em 13 materiais, precisam de revisão; isso não equivale a 117 gabaritos invertidos. O CSV registra cada afirmação, problema e proposta de explicação. Outros defeitos encontrados na leitura integral estão nos pareceres por material.

Foram também identificados 271 versos de flashcards com menos de 15 caracteres e 63 grupos de enunciados/frentes exatamente repetidos após normalização. **Esses dois números são sinais para revisão, não contagens automáticas de erros.** Uma resposta numérica curta pode ser adequada; repetição pode ser reforço intencional.

Muitas alternativas incorretas são de outro assunto ou usam absolutos evidentes. Isso serve à primeira familiarização, mas não sustenta sozinho o rótulo “FGV” ou “Elite”. Recomenda-se manter a fixação e acrescentar situações em que duas ou três opções sejam plausíveis, diferenciadas por critério conceitual, método, escala, fonte ou condição legal. O Chefão deve combinar conhecimentos em um caso novo, em vez de apenas repetir definições.

No material antigo há explicação geral mesmo quando não existe um banco separado de justificativas por alternativa. Na V6 o feedback também inclui mecanismo e exemplo do conceito. A crítica é à suficiência e à pertinência de cada explicação, não à inexistência universal de feedback.

## Teoria, exemplos e formas de raciocínio

Há boas explicações a preservar: distinção entre risco e suscetibilidade; urbanização e metropolização; agricultura familiar e agronegócio sem oposição simplista; PRODES e DETER; datum e projeção; associação espacial e causalidade; inclusão e uso pedagógico das tecnologias. Os exemplos de trajetos escolares, enchentes, logística, uso do solo e acesso a serviços ajudam a ligar o conceito à experiência cotidiana.

O principal ganho didático virá de tornar explícita a sequência **pergunta → dados → conceito → raciocínio → conclusão → limite**. Sugestões concretas:

- Clima: comparar dois climogramas com números e unidades, calcular amplitude e justificar a hipótese climática.
- Hidrologia: explicar por que a mesma chuva produz hidrogramas diferentes em duas bacias, controlando as condições de comparação.
- Agrária: apresentar área, módulo fiscal, trabalho, gestão e renda de um estabelecimento e discutir os critérios em conjunto.
- Economia paraense: comparar valor exportado, volume e valor agregado; não inferir local de produção apenas do registro exportador.
- Português: usar pequenos textos completos para inferência, coesão e reescrita, além de frases isoladas.
- Lógica: mostrar diagrama de Venn e tabela-verdade, com cada etapa do cálculo e um contraexemplo para a inferência inválida.
- Didática: apresentar uma resposta realista de aluno, diagnosticar o raciocínio e escolher uma intervenção com evidência de aprendizagem.

Essas propostas ampliam aplicação e profundidade. Não justificam resumir ou excluir a teoria válida existente.

## Flashcards, jogos e revisão

Cartões como “Visão vertical? → Importante” (T22) e “Mediação? → Central” (T24) não recuperam uma definição ou um procedimento. Devem evoluir para perguntas autossuficientes: o que é, como funciona, qual exemplo e qual confusão evitar. Manter cartões curtos quando a informação recuperada é precisa.

Cada item temporal deve levar seu ano-base e recorte, inclusive quando aparece sozinho em revisão. Cada item V/F deve explicar por que a afirmação é verdadeira ou apresentar a formulação correta quando falsa. A explicação de um flashcard não pode ser reaproveitada automaticamente como justificativa de uma afirmação diferente.

A pontuação e o percentual de acerto devem ser lidos como desempenho naquele banco. Acertar várias negações óbvias do mesmo conceito não demonstra domínio amplo. A Cartografia já tem mecanismos de famílias e evidências; futuras melhorias devem respeitá-los e verificar se todas as paráfrases relevantes estão agrupadas.

## Cartografia publicada

As três bases canônicas apresentam maior consistência nas explicações e melhor cuidado com limitações metodológicas. Na leitura dos 161 gabaritos não foi identificada inversão inequívoca da resposta correta. Foram conferidos cálculos de escala e área, conversões angulares, fusos com mudança de dia, densidade, declividade, exagero vertical, níveis radiométricos e NDVI.

Permanecem melhorias: precisão da redação de escalas; feedbacks de distratores mais específicos; checklist de recall alinhado ao comando; gráficos efetivos em atividades que hoje descrevem verbalmente uma figura; e prática docente específica de geotecnologias, pois o treino prático compartilhado ainda parte de escala. A nota sobre a faixa UTM 80°S–84°N já existe e não deve ser apontada como ausente.

Nos seis fluxos dirigidos de Cartografia, teclado e feedback funcionaram em celular e desktop. Foi encontrado um defeito visual de baixa prioridade: quando uma imagem externa falha, a regra CSS mantém sua caixa visível apesar de `hidden=true`; o aviso textual continua legível. A falha de rede do ambiente não permite concluir que as URLs estejam quebradas.

Não foi retirado o status formal das bases nem feita alteração silenciosa em conteúdo aprovado. Uma correção editorial futura precisa gerar revisão versionada e manter rastreabilidade.

## Aderência ao concurso e atualização

O acervo cobre os grandes eixos do programa consultado. Isso não significa profundidade suficiente em todos os subitens. Português precisa ampliar exercícios de sintaxe, formação de palavras, ortografia e textos completos; biomas mundiais e algumas categorias classificatórias são pouco desenvolvidos; conteúdos de mapas, gráficos e perfis frequentemente têm mais descrição verbal que interpretação visual.

Treinos com quatro alternativas podem continuar como fixação. Uma simulação anunciada como fiel ao formato objetivo do edital precisa das cinco alternativas e da composição oficial de disciplinas. Questões autorais devem ser identificadas como tais; expressões “a FGV cobra” exigem prova, ano e item que sustentem a afirmação.

Atualidades é um retrato datado, não um fluxo automático. Recomenda-se acrescentar um registro de atualização com data de consulta, período do indicador, território, unidade e status (estimativa/consolidado). O PRODES 2026 divulgado depois do retrato de 13/10 é uma atualização disponível, não prova de que o número de 2025 estava errado.

## Ordem recomendada de execução

1. Corrigir a questão cortada, a questão com múltiplas respostas, os feedbacks incompatíveis e os jogos sem contexto. Validar os casos concretos antes/depois.
2. Corrigir as divergências factuais confirmadas e padronizar fonte, período e versão das estatísticas.
3. Reduzir a previsibilidade das alternativas, preservando os IDs e a interpretação do progresso antigo.
4. Melhorar cartões vazios e feedbacks curtos; acrescentar exemplos resolvidos e exercícios visuais aos temas mais fracos.
5. Acrescentar treino de concurso com dificuldade real e casos novos, sem condicionar essas melhorias a uma migração da plataforma.

Critério de conclusão de cada lote: nenhuma perda de conteúdo válido; gabarito único; alternativas plausíveis; feedback coerente com a própria resposta; contexto completo no item isolado; referência rastreável; apresentação legível no celular; preservação do progresso. Uma etapa pequena e verificável é suficiente para entregar valor ao estudante.

## Limites do parecer

A auditoria registra o que foi lido, reproduzido e comprovado. Não certifica que todas as URLs externas estejam disponíveis em todas as redes, que toda citação de autor tenha sido confrontada com a obra original ou que toda norma recente tenha sido verificada em todos os seus efeitos judiciais. Esses pontos permanecem discriminados nos anexos. As verificações de navegador são dirigidas e não substituem uma auditoria completa de acessibilidade.

O resultado permite iniciar correções úteis na plataforma que já funciona. Não exige migrar outros módulos nem refazer todo o projeto para resolver os problemas encontrados.
