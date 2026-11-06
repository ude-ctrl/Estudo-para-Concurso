# Climatologia — preparação da migração V6

Branch: `v6-climatologia`. Origem publicada: `aceaac37bc02d7762d78f45d7dd9531c0a2afac6` (Fundamentos e Cartografia). Este lote conclui o inventário reproduzível e o mapa preparatório; não promove a unidade nem altera o site. Não é um parecer de aprovação Premium.

## Destino e preservação

O mapa oficial coloca `climatologia` no módulo `fisica`, antes de Tectônica, Solos, Hidrologia, Biomas e Ambiente/Energia. Essas unidades permanecem independentes. ZCIT e ENOS terão sua base explicativa em Climatologia, com aplicação regional em Amazônia/Pará.

A fonte é `MissaoAprovacaoGeo/SEDUC_PA_Tema_04_Climatologia_MATRIZ_OFICIAL_V2_6.html`. O [inventário estruturado](inventario-paridade.json) guarda SHA-256 da fonte, originais, hashes individuais, identificação histórica, proposta de identidade V6 e destinos de teoria/questões das etapas. Os IDs propostos ainda não foram utilizados no armazenamento do estudante. A classificação por missão dos cartões, games e questões gerais permanece pendente de revisão editorial.

| Recurso | Inventariado | Destino V6 |
| --- | ---: | --- |
| Etapas teóricas | 13 | Estudo: 13 missões propostas |
| Questões de etapa | 26 | Treino, com vínculo à missão |
| Diagnóstico | 3 | Diagnóstico/pós-teste, mesmos itens |
| Chefão histórico | 5 | Reclassificar por exigência cognitiva, preservando os cinco itens |
| Questões únicas | 34 | 29 A–D e cinco A–E |
| Flashcards | 50 | Revisão individual Errei/Difícil/Bom/Fácil |
| Game V/F | 100 | 50 verdadeiros e 50 falsos, com justificativa |
| Recalls | 13 | Recuperação ativa por missão |
| Suplementos | 3 | Matriz de revisão, bloco de discursivas e prática docente |
| Blocos estáticos | 2 | Contexto de estudo e fontes |

São 215 registros de preservação. Os blocos estáticos podem contextualizar conteúdo já representado em outras coleções; não devem inflar a quantidade de atividades. Os 34 itens têm índice de gabarito válido e comentário para cada alternativa. Isso verifica estrutura, não garante qualidade científica ou profundidade. O pós-teste não aumenta o estoque de questões únicas.

## Achados reconferidos e trabalho editorial

A [auditoria anterior](../auditoria-conteudo/2026-10-24/PARECERES_POR_MATERIAL.md) já examinou Climatologia. Nesta rodada foram reconferidos os trechos abaixo; não se alega nova leitura editorial integral de todos os cartões e games.

1. **Enunciado `b_8_0`:** informa baixa variação térmica e muita chuva, mas omite temperaturas altas. A explicação usa essa premissa para justificar clima equatorial. Completar a premissa ou fornecer os dados de um climograma, preservando o gabarito e registrando antes/depois.
2. **Circulação, `B[3]`:** a expressão final “subsidência/convergência” não indica o nível atmosférico. Explicitar convergência em altitude e divergência superficial no modelo de alta pressão, sem reduzir a explicação a um slogan.
3. **Variabilidade, `B[12].ra`:** a resposta de recall a restringe a flutuações naturais. Revisar à luz da distinção entre variabilidade interna e forçantes externas; a teoria já é mais cuidadosa ao dizer “inclui”.
4. **Game `G[67]`:** manter a afirmação falsa sobre janeiro provar sozinho o hemisfério, mas melhorar a justificativa. Altitude isolada não explica a fase sazonal do máximo térmico; contextualizar latitude, nebulosidade e sazonalidade.
5. **Leitura visual:** o roteiro docente manda interpretar barras e linha e calcular amplitude, mas a inspeção estrutural não encontrou imagem, SVG, canvas ou iframe estático. A integração precisa entregar efetivamente climogramas com tabela acessível, unidades, período e fonte; dados inventados para exercício devem ser identificados como hipotéticos.
6. **Bancos de treino:** a presença do rótulo Chefão não certifica dificuldade. As cinco questões precisam ser avaliadas antes de compor o banco de aplicação. Não transformar automaticamente 29 questões A–D em itens de concurso A–E, nem atribuir autoria à FGV sem identificação de prova.

Nenhum desses textos foi alterado nesta etapa. A próxima revisão deverá registrar alterações editoriais relevantes, preservar gabaritos válidos e justificar eventual necessidade de revisão. A fonte histórica continua intacta.

## Persistência e mecanismos

A chave real é `seducpa_t2_clima_v26`, apesar de o arquivo ser Tema 04. O valor de `OLDK`, `__sem_legado_t2__`, é um marcador de ausência; não deve ser anunciado como versão anterior de progresso nem importado automaticamente.

A fonte implementa diagnóstico/pós-teste, questões de etapa, Chefão, flashcards binários, Game V/F/ABCD, repescagem de erros, pontos, sequência, revisão sugerida e efeitos visuais. O inventário lista suas funções JavaScript para conferência. Esses mecanismos serão substituídos pelos componentes já existentes na V6, preservando os registros interpretáveis. Leitura, placar e avaliação binária antiga não serão convertidos em domínio ou XP novos. Rascunhos não persistidos não podem ser recuperados.

## Verificação executada

- Extração literal de bancos por AST, sem executar o aplicativo histórico.
- `validateBanks` e conferência de índice de resposta/comentários de todas as 34 questões.
- 215 identidades propostas únicas e inventário reproduzido com `node scripts/inventory-climatologia.mjs --check`.
- Nenhum ID HTML estático duplicado; nenhum enunciado de questão ou V/F idêntico após normalização de caixa e espaços externos. Isso não descarta redundância semântica ou duplicação dinâmica.
- Fonte, gabaritos e código publicado preservados. Não foram executadas build ou regressão de navegador nesta etapa documental.

Links externos foram inventariados, mas não consultados nesta rodada. Conferência científica com fontes primárias, alinhamento fino ao edital, duplicações semânticas, conteúdo dinâmico, classificação por conceito/missão e testes de migração continuam pendentes. Não há homologação humana ou aprovação canônica atribuída a essa análise estrutural.

## Próxima entrega

Consolidar uma candidata de Climatologia com as correções rastreadas e atividades visuais, realizar a auditoria editorial e científica, validar a paridade e só então promover a base aprovada. A integração reaproveitará Estudo/Treino/Revisão/Prova da V6. O aceite técnico exigirá migração idempotente, preservação de Cartografia/Fundamentos, referências válidas e fluxos de teclado/celular. Publicação dependerá de autorização específica após a entrega pronta.
