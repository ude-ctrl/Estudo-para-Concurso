# Climatologia — integração V6

## Integração funcional — 25/11/2026

O cartão da biblioteca e o endereço histórico de Climatologia abrem agora a unidade V6: 13 missões, 41 questões, 50 flashcards, 100 V/F, duas discursivas e dois climogramas. A chave histórica é preservada e importada uma única vez como histórico, sem XP retroativo. Atmosfera e Maranhão estão no percurso de estudo.

A integração usa a edição 0.2.0 revisada, mantém seu estado editorial EM_AUDITORIA e não inventa aprovação canônica. A auditoria restante é editorial, não uma promessa de integração futura. Os registros abaixo descrevem etapas anteriores.


## Entrega em 24/11/2026 — prioridade SEDUC-MA/FCC

A candidata [0.2.0](candidata/0.2.0/previa.html) reutiliza integralmente 0.1.0 e acrescenta composição/estrutura atmosférica, aplicação ao Maranhão, dois recalls e três questões autorais A–E. Total: **13 missões, 41 questões, 50 cartões, 100 V/F, 2 discursivas, 2 climogramas e 215 vínculos históricos**. A prévia é utilizável para leitura e respostas comentadas; não grava progresso. A versão pública 0.1.0 permanece intacta.

Prioridade registrada em [AGENTS.md](../../AGENTS.md), sem ampliar a arquitetura. Correção temporal dos 40 arquivos anteriores recuperada dos commits locais, sem reconstrução. O gerador incremental é `node scripts/build-climatologia-02.mjs`; `--check` verifica a reprodução sem alterar os arquivos.

### Edital e recorte regional

Fonte: [FCC, Edital SEAD/MA 01/2026](https://www.concursosfcc.com.br/concursos/seadm226/seadm226_edital_de_abertura_1_17_11_26_publicado.pdf), baixado diretamente em 24/11/2026. Professor Geografia, código 17: 141 vagas; prova prevista para 04/04/2027. O quadro de provas registra 20 questões gerais, 30 específicas e redação, com duração total de 4 horas. As 3 horas do quadro de aplicação são permanência mínima, não duração total. Programa de Geografia na página 76: clima, climatologia brasileira e tempo/clima do Maranhão. Consulta dirigida, sem alegar cotejo integral dos demais componentes do concurso.

Fontes dos complementos: NOAA e NASA (atmosfera), SEMA-MA e NuGeo/UEMA (contrastes sazonais e sistemas). URLs, datas e alcance em `metadata.sources`. Não foram inventadas séries municipais nem convertidos os climogramas hipotéticos em observações. Exemplos paraenses permanecem comparativos; as discursivas históricas são treino didático, não reprodução da prova FCC.

### Validação e limite da entrega

183 testes de conteúdo, contratos e persistência aprovados; build (incluindo TypeScript) e validação das quatro unidades canônicas aprovadas. O teste novo compara cada recurso anterior e verifica a preservação de gabaritos, arquivos de origem e vínculos de progresso. A validação de navegador local foi bloqueada antes de abrir a página (`socket() failed: Operation not permitted`); os cenários de ambas as candidatas e da plataforma estão no workflow do PR.

A candidata permanece **EM_AUDITORIA**, sem aprovação canônica artificial. Foram concluídos os complementos de atmosfera e Maranhão; ainda faltam o fechamento das verificações científicas regionais/temporais herdadas (especialmente IPCC), a integração ao motor V6 e sua migração de progresso. A nova prioridade não autoriza apagar essas pendências. Sem merge nem publicação.

---


> **Atualização em 06/11/2026:** a candidata editorial 0.1.0 já foi produzida, com correções rastreadas, dois climogramas e quatro questões novas. Consulte o [relatório da entrega](RELATORIO_CANDIDATA_0_1_0.md) e a [prévia local](candidata/0.1.0/previa.html). O texto abaixo registra a etapa anterior de inventário; não é o estado final da revisão. A candidata continua fora do site e sem aprovação canônica.

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
