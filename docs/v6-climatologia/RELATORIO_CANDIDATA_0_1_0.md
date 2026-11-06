# Climatologia V6 — entrega da candidata editorial 0.1.0

Data: 06/11/2026. Branch: `v6-climatologia`. Origem do trabalho: `aceaac37bc02d7762d78f45d7dd9531c0a2afac6`, com o inventário `ad8aa85`.

## O que foi entregue

Uma candidata completa para leitura e revisão, no formato de conteúdo do contrato canônico existente. Ela contém o material histórico preservado, correções explícitas e atividades visuais novas. O estado é **EM_AUDITORIA**, sem aprovação canônica, integração ao aplicativo ou publicação.

- [Prévia editorial para abrir no navegador](candidata/0.1.0/previa.html).
- [Conteúdo estruturado](candidata/0.1.0/content.json), incluindo todas as alterações antes/depois em `content.editorialChanges`.
- [Procedência e originais](candidata/0.1.0/provenance.json).
- [Registro de auditoria e limitações](candidata/0.1.0/audit.json).
- [Mapa de preservação inicial](inventario-paridade.json).
- Evidências da prévia: [cenários de navegador](evidencias-0.1.0/results.json), [captura móvel clara](evidencias-0.1.0/climogramas-light.png) e [captura móvel escura](evidencias-0.1.0/climogramas-dark.png).

A prévia é uma página local estática para examinar o material. Permite abrir respostas e navegar pelas etapas com teclado; não grava acertos, agenda, XP ou progresso. Não deve ser confundida com a experiência final de Estudo/Treino/Revisão/Prova da V6.

## Conteúdo antigo × candidata

| Recurso                           |                  Histórico |      Candidata | Decisão                                                          |
| --------------------------------- | -------------------------: | -------------: | ---------------------------------------------------------------- |
| Etapas/missões                    |                         13 |             13 | Todas preservadas e identificadas                                |
| Seções teóricas                   |                         13 |             14 | Acrescentada prática de leitura de climogramas                   |
| Recalls                           |                         13 |             13 | Preservados, com correção rastreada de variabilidade             |
| Questões únicas                   |                         34 |             38 | 34 preservadas + quatro autorais novas                           |
| Formato A–D                       |                         29 |             29 | Não foi inventada uma quinta alternativa                         |
| Formato A–E                       |                          5 |              9 | Cinco históricas + quatro novas                                  |
| Flashcards                        |                         50 |             50 | Nenhum removido                                                  |
| Game V/F                          |                        100 |            100 | 50 verdadeiros/50 falsos, todos com justificativa                |
| Discursivas                       | 2, dentro de um suplemento | 2 estruturadas | Comandos/modelos preservados; não contam como questões objetivas |
| Suplementos + contextos estáticos |                5 registros |    5 registros | Preservados; controles antigos não são executados                |
| Climogramas com tabela            |  0 estáticos inventariados |              2 | Dados explicitamente hipotéticos                                 |
| Registros de paridade             |                        215 |            215 | Originais e hashes preservados                                   |

Há 249 recursos estruturados, contando unidade, missões, conceitos, seções e demais coleções. Esse total **não** é número de atividades. Os 215 registros de paridade também não devem ser somados às atividades: são os vínculos de preservação.

Todos os 34 índices de resposta e todos os textos/ordens de alternativas históricas foram mantidos. Os 100 gabaritos V/F permanecem iguais. Pós-teste e diagnóstico continuam representando os mesmos três itens, sem inflar o estoque.

## Revisão realizada

Foram lidos os 13 blocos teóricos, 13 recalls, 34 questões com alternativas e feedback, 50 cartões, 100 itens V/F e cinco registros de suplementos/contexto. A confrontação externa foi direcionada aos achados; isso não equivale a conferir cada afirmação com múltiplas fontes primárias.

O pacote registra **59 alterações de campo em 46 registros**. Esse número inclui melhoria de feedback e correções do mesmo conceito em formatos diferentes; não representa 59 erros científicos independentes.

1. **Questão `b_8_0`:** acrescentada ao enunciado a informação de temperaturas elevadas, já exigida por sua explicação. O gabarito equatorial úmido foi preservado.
2. **Circulação em `B[3]`:** distinguida convergência em altitude de divergência superficial no modelo de alta com subsidência, indicando o balanço de massa da coluna.
3. **Umidade relativa:** explicitada a razão entre pressão de vapor presente e pressão de saturação na teoria, questão, cartão e justificativas relacionadas. A analogia de “capacidade do ar” não substitui a definição física.
4. **Variabilidade climática:** retirada a restrição a causas exclusivamente naturais na teoria, recall, cartão e modelo discursivo. Variabilidade interna e forçada foram diferenciadas de alteração persistente das estatísticas.
5. **Game `G[67]`:** retirado o uso de altitude isolada como explicação do mês mais quente; mantida a resposta falsa à afirmação de que janeiro prova sozinho o hemisfério.
6. **Autoria e banca:** orientações didáticas deixaram de ser apresentadas como levantamento demonstrado de frequência da FGV. As discursivas são autorais. A nota herdada “Tema 02” passou a “Tema 04”, sem renomear a chave de armazenamento histórica.
7. **Feedback:** quando a alternativa correta dizia apenas “Correto.”, foi reaproveitada a explicação que a questão já possuía. Não se afirma que o material antigo estivesse sem explicações.

As alterações não reescrevem nem resumem integralmente a teoria. O texto anterior permanece disponível na procedência, e cada edição possui antes/depois e motivo.

## Leitura visual e qualidade pedagógica

Os climogramas A e B possuem 12 valores mensais, barras de precipitação em milímetros, linha de temperatura média em graus Celsius, legenda, descrição textual e tabela equivalente. As duas escalas são independentes: seu cruzamento não representa balanço hídrico nem critério ombrotérmico.

- A: amplitude de **1,4 °C** e precipitação anual de **2.680 mm**.
- B: amplitude de **5,5 °C** e precipitação anual de **1.700 mm**; junho, julho e agosto têm P < 60 mm.
- O corte P < 60 mm é uma regra explícita do exercício, não uma definição universal de seca.
- Nenhum número é atribuído a Belém, Marabá, uma estação ou uma normal do INMET. São localidades hipotéticas, sem período observado.

As quatro questões novas trabalham cálculo de amplitude, aplicação de um critério mensal, limite da inferência geográfica e comparação entre total anual e distribuição mensal. Todas são A–E, com justificativa da resposta e dos distratores. O rótulo de banco `concurso` indica aplicação autoral; não atribui origem a prova oficial. Não foi criado estoque “FGV Elite” apenas mudando rótulos.

Os cinco antigos itens de Chefão permanecem como fixação. Foram marcadas cinco famílias de questões próximas: padrão equatorial, ZCIT, friagem, sazonalidade paraense e ilha de calor. Repetições úteis são preservadas, mas não devem ser contadas como evidência independente de domínio. Essas cinco famílias são um primeiro agrupamento, não prova de inexistência de outras semelhanças.

## Fontes e alcance efetivo

| Fonte                                                                                                                           | Conferência desta rodada                       | Uso                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [NWS — Umidade relativa](https://www.weather.gov/media/epz/wxcalc/rhWetBulbFromTd.pdf)                                          | Abertura direta; fórmula da página 1           | Definição UR = 100 × e/es                                                                       |
| [NWS — Divergência/convergência](https://www.weather.gov/source/zhu/ZHU_Training_Page/Miscellaneous/Divergence/divergence.html) | Leitura dos trechos pertinentes                | Níveis atmosféricos e balanço de massa                                                          |
| [INMET — Normais](https://portal.inmet.gov.br/normais)                                                                          | Abertura direta; períodos disponíveis          | Confirmar 1991–2020 como exemplo publicado, sem baixar dados de estações                        |
| [IPCC AR6 — Glossário](https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_AnnexVII.pdf)                           | Excerto indexado; abertura direta retornou 403 | Variabilidade interna e forçada; limitação registrada                                           |
| [IPCC AR6 — Capítulo 4](https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-4/)                                                  | Excerto indexado; abertura direta retornou 403 | Distinção entre amplitude oceânica do ENOS e variabilidade da precipitação; conferência parcial |

Não foi alegada leitura integral do IPCC. Referências temporais estão identificadas, e projeções não receberam status de verificação integral. O cotejo fino com o edital e suas retificações, assim como a documentação científica regional de Amazônia/Pará, ainda precisa ser fechado antes da promoção. A candidata não certifica cobertura integral do concurso.

## Persistência, segurança e integração

A chave de origem permanece `seducpa_t2_clima_v26`; `__sem_legado_t2__` é um marcador de ausência de versão anterior. O pacote contém mapas explícitos de questões, cartões e games para IDs de destino. **O importador ainda não foi implementado.** A implementação deverá guardar o bruto, ser idempotente e não transformar pontos, leituras ou avaliações binárias antigas em XP novo ou domínio demonstrado.

O histórico HTML está intacto. Controles antigos presentes no arquivo de procedência não são executados pela prévia. A integração deverá sanitizar HTML e usar os componentes V6 existentes. Os registros `archive-only`, inclusive o antigo corpo da aba de estudo, não devem ser injetados no aplicativo.

O pacote fica em `docs/v6-climatologia/candidata/0.1.0`, fora do catálogo aprovado. Passa em `validateBundle`, mas é deliberadamente rejeitado quando se exige `approved: true`. Não foi alterado o manifesto canônico, nem as bases aprovadas de Fundamentos/Cartografia, nem os arquivos operacionais em `src` e `public/v6`.

## Verificação

Comandos da candidata:

```sh
node scripts/inventory-climatologia.mjs --check
node scripts/build-climatologia-candidate.mjs --check
node scripts/preview-climatologia.mjs --check
node tests/climatologia-candidate.test.mjs
node tests/climatologia-candidate.browser.mjs
```

- **11 testes da candidata passaram:** reprodução dos arquivos, contrato/status, paridade, todos os gabaritos históricos, trilha antes/depois, vínculos, cálculos, âncoras, ausência de controles executáveis e rejeição de adulteração.
- **12 cenários de navegador passaram:** larguras 320/390/1280, temas claro/escuro e preferência de movimento reduzido ativada/desativada. Conferidos ausência de rolagem horizontal do documento, gráficos/tabelas, abertura de resposta pelo teclado, erros JavaScript e requisições externas.
- **166 testes existentes passaram**, cobrindo o conteúdo, persistência, motor V6, contrato canônico e Fundamentos. Os 11 testes novos foram incorporados ao comando `npm test`; os cenários da prévia foram acrescentados ao workflow de validação.
- A captura móvel clara dos climogramas foi inspecionada visualmente. Gráficos possuem textos pequenos em telas estreitas; as tabelas apresentam os mesmos valores em texto legível. Não foi realizada auditoria completa WCAG ou teste com leitor de tela.
- **Build passou:** importação, TypeScript e compilação Vite concluídos. A regeneração não alterou o conteúdo operacional versionado. Os **31 HTMLs históricos** permanecem sem diferenças em relação ao início do lote.

Os cenários da prévia não são os testes E2E da plataforma. A suíte E2E completa não foi reexecutada localmente neste lote. Testes automatizados e inspeção pelo Codex não equivalem a homologação humana.

## Próximo lote, sem refazer o que já está pronto

1. Fechar as fontes regionais, as referências de projeções e o cotejo curricular sobre esta candidata, registrando somente as alterações necessárias. O responsável pela plataforma não precisa refazer a revisão editorial técnica.
2. Consolidar e registrar a versão canônica, com aprovação editorial conforme o contrato vigente e sem inventar aprovação humana.
3. Integrar ao motor V6 já existente: Estudo/Treino/Revisão/Prova, erros, agenda, progresso e visuais. Testar migração idempotente e regressão de Fundamentos/Cartografia na raiz e no subdiretório GitHub Pages.
4. Entregar uma única versão navegável para teste de uso e solicitar autorização específica de publicação quando estiver pronta. Não migrar outro módulo neste lote.

Esta entrega não faz merge, deploy ou publicação.
