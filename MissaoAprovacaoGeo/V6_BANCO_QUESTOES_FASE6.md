# V6 — Fase 6: Banco de Questões

## Estado
Especificação oficial do banco de questões da V6.

Esta fase define como o acervo atual será preservado, classificado, melhorado e reutilizado em diferentes concursos sem confundir atividade de aprendizagem com simulação real de prova.

## Fonte oficial do formato SEDUC-PA 2026
Edital consolidado FGV/SEPLAD/SEDUC-PA C-223, retificado em 02/10/2026.

A prova objetiva possui:
- 60 questões;
- 5 alternativas por questão: A, B, C, D e E;
- apenas uma resposta correta;
- 30 questões de Conhecimentos Básicos;
- 30 questões de Conhecimentos Específicos.

Para Professor Classe I:
- Língua Portuguesa: 10;
- Raciocínio Lógico-Matemático: 5;
- Atualidades: 5;
- Conhecimentos Pedagógicos: 10;
- disciplina da habilitação: 30.

Referência oficial: https://conhecimento.fgv.br/concursos/seducpa26

---

# 1. Princípio central

**Questão para aprender não é necessariamente questão para medir aprovação.**

A V6 preservará questões simples quando elas forem pedagogicamente úteis, mas não as apresentará como equivalentes a uma questão FGV.

Qualidade > quantidade.

Uma questão só entra em treino de prova se possuir dificuldade, formato, distratores e nível cognitivo compatíveis com essa função.

---

# 2. Quatro bancos funcionais

## 2.1 Fixação
Objetivo: consolidar um conceito recém-estudado.

Características:
- pode utilizar 3 ou 4 alternativas quando isso reduzir carga desnecessária;
- comando direto;
- um conceito principal;
- feedback imediato;
- distratores baseados em confusões comuns;
- não entra em estatísticas de simulação FGV.

Uso ideal:
- durante a teoria;
- recuperação logo após um bloco;
- correção de erro específico.

## 2.2 Concurso
Objetivo: treinar aplicação e interpretação em padrão de prova.

Características obrigatórias:
- 5 alternativas A–E;
- apenas uma correta;
- enunciado contextualizado quando pertinente;
- distratores plausíveis;
- exige compreensão/aplicação, não mera cópia da teoria;
- feedback universal V6;
- dificuldade média a alta.

## 2.3 FGV Elite
Objetivo: preparar o candidato competitivo para itens difíceis e discriminativos.

Características obrigatórias:
- 5 alternativas A–E;
- apenas uma correta;
- distratores conceitualmente próximos;
- pode integrar 2 ou mais conceitos;
- deve exigir análise, transferência, comparação, inferência ou avaliação;
- preferir situações-problema, mapas, tabelas, gráficos, textos, dados e cenários quando cabível;
- evitar pistas por tamanho, linguagem ou palavras absolutas;
- feedback por distrator sempre que pedagogicamente útil;
- explicação deve mostrar o mecanismo da resposta e a armadilha das demais.

## 2.4 Questões reais da banca
Banco separado das questões autorais.

Regras:
- preservar fielmente enunciado e alternativas originais;
- nunca acrescentar uma quinta alternativa a uma questão real que originalmente não a possua;
- nunca reescrever a questão real e continuar chamando-a de real;
- registrar banca, ano, concurso, cargo, prova/tipo e fonte;
- explicação e comentários podem ser nossos, mas ficam claramente separados do texto original;
- quando houver direitos ou limitações de reprodução, armazenar apenas o necessário e preferir referência à fonte oficial.

**Correção de regra anterior:** o item antigo do checklist “converter avaliações reais para A–E” é inválido. Questões reais permanecem no formato original; a padronização A–E aplica-se às questões autorais de Concurso, FGV Elite e aos simulados SEDUC-PA.

---

# 3. Taxonomia cognitiva V6

Cada questão recebe um nível cognitivo predominante.

- C1 — Reconhecer/recordar: recupera fato, definição ou associação.
- C2 — Compreender: diferencia, explica ou interpreta conceito.
- C3 — Aplicar: usa conceito em situação nova.
- C4 — Analisar: compara evidências, relações, causas ou representações.
- C5 — Integrar/Avaliar: cruza conteúdos, escalas, fontes ou critérios e exige julgamento fundamentado.

Diretriz:
- Fixação: predominância C1–C2;
- Concurso: predominância C2–C4;
- FGV Elite: predominância C3–C5.

---

# 4. Dificuldade

Escala oficial:
- D1 — básica;
- D2 — intermediária;
- D3 — difícil;
- D4 — elite.

Dificuldade não deve ser definida apenas por tamanho do texto. Considerar:
- proximidade dos distratores;
- quantidade de conceitos mobilizados;
- abstração;
- necessidade de inferência;
- carga de cálculo;
- leitura de fonte visual/dados;
- presença de exceções relevantes.

---

# 5. Estrutura de dados de uma questão

Cada questão V6 deverá possuir, quando aplicável:

- `id` — identificador permanente;
- `legacy_id` — origem na página antiga, se houver;
- `origin` — autoral | real_fgv | outra_banca;
- `profile` — core | seduc_pa | seduc_ma | imperatriz_ma | outro;
- `scope` — permanente | regional | banca | temporal;
- `module`;
- `unit`;
- `concept_tags`;
- `level` — fixacao | concurso | fgv_elite | real;
- `difficulty` — D1 a D4;
- `cognitive` — C1 a C5;
- `stem`;
- `options` com IDs estáveis;
- `correct_option_id`;
- `explanation_core`;
- `distractor_feedback`;
- `causal_or_conceptual_mechanism`;
- `concrete_example`;
- `error_tags`;
- `visual_ref`, quando houver;
- `source`, quando houver;
- `source_date`, quando temporal;
- `verified_at`;
- `status` — draft | reviewed | approved | deprecated;
- `review_notes`.

A resposta correta deve ser armazenada por ID da alternativa, não apenas pela posição A/B/C/D/E, para permitir manutenção sem quebrar o gabarito.

---

# 6. Qualidade dos distratores

Um distrator bom é uma resposta que um candidato com compreensão incompleta pode escolher.

Priorizar distratores derivados de:
- confusão entre conceitos vizinhos;
- troca de causa e consequência;
- generalização indevida;
- erro de escala;
- erro de unidade;
- associação autor–conceito trocada;
- leitura incompleta de mapa/gráfico;
- dado correto aplicado ao contexto errado;
- conceito verdadeiro, mas que não responde ao comando.

Evitar:
- alternativas absurdas;
- humor involuntário;
- opção muito mais longa/detalhada que as demais sem necessidade;
- palavras que denunciam a correta;
- “sempre/nunca” usados apenas como pista;
- duas alternativas semanticamente equivalentes;
- duas respostas defensáveis;
- distrator sem relação com o assunto.

---

# 7. Distribuição de gabaritos

Não usar sequência fixa nem corrigir distribuição questão por questão de forma artificial.

Para blocos de prova/simulado:
- A, B, C, D e E devem ter frequência aproximadamente equilibrada;
- nenhuma letra deve dominar o conjunto;
- evitar sequências longas previsíveis;
- o gerador de simulado deve selecionar itens considerando também a distribuição final das letras.

Meta operacional para um simulado de 60 itens:
- aproximadamente 12 respostas por letra;
- pequenas variações são aceitáveis;
- nunca sacrificar validade de uma questão apenas para alcançar simetria perfeita.

---

# 8. Questões visuais e de dados

A V6 deve aumentar progressivamente o uso de:
- mapas temáticos;
- croquis;
- perfis topográficos;
- climogramas;
- pirâmides etárias;
- gráficos;
- tabelas;
- imagens de sensoriamento remoto;
- esquemas de processos;
- pequenos conjuntos de dados.

Toda fonte visual deve possuir:
- legibilidade em celular;
- fonte/proveniência quando necessária;
- texto alternativo;
- informação suficiente para resolver a questão;
- nenhuma dependência exclusiva de cor para diferenciar respostas.

---

# 9. Auditoria amostral do banco atual

## Tema 01 — Fundamentos, Conceitos e Autores — V5
Achados:
- diagnósticos e a maior parte das questões internas utilizam 4 alternativas;
- Chefão utiliza 5 alternativas;
- conteúdo conceitual é bom e vale preservar;
- parte das questões funciona muito bem como Fixação;
- várias ainda são predominantemente associação direta autor → palavra-chave;
- FGV Elite deverá exigir maior aplicação e integração;
- feedback da V5 é útil, mas nem sempre possui análise individual de distratores.

Decisão:
- não eliminar o banco;
- preservar questões simples como Fixação;
- criar versões novas de Concurso/FGV Elite quando necessário;
- não inflar artificialmente questões antigas apenas acrescentando alternativa E.

## Tema 03 — Cartografia II — V2.6 Auditada
Achados:
- diagnósticos e questões internas utilizam majoritariamente 4 alternativas;
- Chefão já utiliza 5 alternativas;
- feedback por alternativa está mais desenvolvido que no Tema 01;
- teoria e aplicações são fortes;
- há muitos bons itens aproveitáveis para Fixação/Concurso;
- a amostra apresenta concentração visível da alternativa correta na posição B;
- vários distratores ainda são distantes demais da resposta correta para nível FGV Elite.

Decisão:
- Tema 03 será excelente fonte do banco V6;
- preservar estrutura explicativa;
- recalibrar posição de gabaritos;
- elevar distratores dos itens promovidos a Concurso/Elite;
- criar itens de integração Cartografia + Amazônia + dados + SIG.

---

# 10. Migração do banco legado

Nenhuma questão antiga será apagada durante a migração.

Cada item receberá uma decisão:

1. `KEEP_FIXATION` — manter quase como está para Fixação;
2. `PROMOTE_CONTEST` — reescrever para Concurso, mantendo rastreabilidade;
3. `REBUILD_ELITE` — usar o conceito como semente para nova questão FGV Elite;
4. `KEEP_REAL` — preservar questão real exatamente como publicada;
5. `DEPRECATE` — retirar da experiência ativa por erro, ambiguidade, duplicidade ou baixo valor, mantendo no histórico;
6. `MERGE` — consolidar duplicatas conceituais em um item melhor.

Uma reescrita não substitui silenciosamente o original. A nova questão recebe novo ID e mantém `legacy_id`.

---

# 11. Banco reutilizável para concursos futuros

Questões de conteúdo permanente não devem ser amarradas à SEDUC-PA.

Exemplos:
- projeções cartográficas → `scope: permanente`;
- hidrografia do Pará → `scope: regional`, `profile: seduc_pa`;
- estilo de distrator FGV → `scope: banca`;
- dado econômico de 2026 → `scope: temporal`.

Isso permite montar futuramente:
- SEDUC-PA;
- SEDUC-MA;
- Prefeitura de Imperatriz-MA;
- outros concursos de Professor de Geografia,
sem duplicar toda a base.

---

# 12. Qualidade mínima para aprovação

Uma questão de Concurso/FGV Elite só pode receber `approved` se passar por todos os critérios:

1. comando claro;
2. conteúdo correto;
3. aderência ao conceito/edital;
4. uma única resposta defensável;
5. cinco alternativas A–E;
6. distratores plausíveis;
7. ausência de pistas involuntárias;
8. nível/dificuldade classificados;
9. gabarito validado;
10. explicação central correta;
11. mecanismo causal ou relação conceitual explícita;
12. exemplo concreto quando pertinente;
13. feedback do erro provável;
14. fonte/data quando temporal;
15. revisão humana/premium antes de entrar no simulado.

---

# 13. Regra de quantidade

Não existe meta de “100 questões por unidade” como fim em si.

Preferência oficial:
- menos questões;
- melhor distribuição cognitiva;
- distratores melhores;
- maior capacidade de diagnóstico;
- maior transferência para situações novas.

Uma unidade com 30 itens excelentes pode valer mais que uma com 100 itens repetitivos.

---

# 14. Critério de conclusão da Fase 6

A especificação desta fase é considerada fechada quando:
- níveis funcionais estão definidos;
- formato A–E está definido para treino de prova;
- banco real está separado;
- esquema de metadados está definido;
- taxonomias cognitiva e de dificuldade estão definidas;
- regra de distratores está definida;
- regra de balanceamento está definida;
- migração legado → V6 está definida;
- reuso entre concursos está garantido;
- auditoria amostral foi registrada.

A implementação física do banco ocorrerá no piloto e nas fases de migração, não nesta fase de planejamento.