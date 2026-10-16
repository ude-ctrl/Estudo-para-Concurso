# V6 — Issue #13: primeiro lote de Cartografia

Data: 16/10/2026, America/Sao_Paulo. Branch: `v6-base-canonica`.
Referência preservada do piloto: `690692389b8c665c7eff4bb7b34d10be5fdabba8`.

## Resultado e alcance

A Issue #13 foi iniciada após o usuário autorizar o [encerramento técnico com ressalva visual](V6_FASE14_ENCERRAMENTO_TECNICO.md). Foram preparadas três bases candidatas versionadas e uma revisão editorial assistida do conteúdo do piloto, incluindo seus 36 itens autorais. O [guia da base](../base-conhecimento/README.md) explica o contrato, a preservação e a fronteira de aprovação.

**As três unidades permanecem `EM_AUDITORIA`; nenhuma foi promovida para `APROVADA_CANONICA`.** Testes técnicos e este parecer assistido não substituem aprovação editorial humana. O registro das 28 unidades não significa execução de 28 auditorias: as outras 25 não receberam auditoria, exportação de conteúdo ou migração neste lote.

## Inventário integral das candidatas

| Unidade | Missões | Teoria | Questões | Cards | V/F | Recalls | Discursivas | Procedências |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Fundamentos | 5 | 19 | 60 | 54 | 106 | 17 | 2 | 272 |
| Representação | 5 | 14 | 49 | 31 | 61 | 10 | 2 | 172 |
| Geotecnologias | 7 | 17 | 52 | 35 | 89 | 12 | 2 | 241 |
| Total | **17** | **50** | **161** | **120** | **256** | **39** | **6** | **685** |

Há ainda 33 conceitos de apoio e seis suplementos. As questões continuam em 125 Fixação, 18 Concurso e 18 Elite. Cada unidade tem 12 itens autorais pendentes. Os papéis de diagnóstico/pós-teste e Chefão foram preservados, sem contá-los como novas questões.

Os 685 registros são distribuídos acima pelo destino canônico final, não apenas pela missão do arquivo de origem. Quatro aliases de dois V/F sobre seleção/generalização têm origem contextual em Representação e destino consolidado em Fundamentos. A missão original e os hashes continuam preservados. Isso explica a diferença para a distribuição 268/176/241 por contexto de origem; não é uma mudança de conteúdo ou de unidade do item ativo.

O banco inicial pode ser reconstruído pelos pacotes com o mesmo SHA-256 `f45c4d769c05822869ef8030d83915cd14039bc237d750b2985ce303f25ada5c`, incluindo originais, variantes, referências e sete alterações editoriais históricas. Não foram resumidos textos, removidos exemplos, alteradas alternativas ou trocados gabaritos nesta rodada.

## Parecer por unidade

- [Fundamentos — auditoria e itens](../base-conhecimento/cartografia/cartografia-fundamentos/0.1.0/audit.md): orientação, coordenadas, GMS, fusos e escalas preservados. Revisar atribuições conceituais, famílias próximas e o distrator redundante conhecido; concluir conferência direta da tabela estadual de fusos.
- [Representação — auditoria e itens](../base-conhecimento/cartografia/cartografia-representacao/0.1.0/audit.md): propriedades, UTM, semiologia, normalização e relevo preservados. Rever dificuldade de parte do Elite, caráter esquemático do perfil e créditos/licenças das imagens; fechar a fonte de faixa UTM.
- [Geotecnologias — auditoria e itens](../base-conhecimento/cartografia/geotecnologias/0.1.0/audit.md): sensores, resoluções, NDVI, GNSS, SIG, monitoramento e ensino preservados. Manter limites de inferência e dados históricos; melhorar autonomia da questão que referencia o par NASA e concluir a conferência curricular direta.

A leitura abrangeu as 50 explicações, 39 recalls, 33 conceitos, 161 questões com alternativas e feedbacks, 120 cartões e variantes, 256 V/F e variantes, seis discursivas e seis suplementos, além de contextos e referências do banco. A preservação dos 685 originais também foi verificada por hash; isso não transforma uma comparação automática em nova revisão semântica independente de cada fonte histórica.

## Achados relevantes e decisões propostas

| Tema | Evidência e consequência |
| --- | --- |
| 12 vínculos conceituais/de missão | Há cinco questões e sete V/F com propostas explícitas de correção de metadados, incluindo GMS associado a latitude e cálculo de escala na missão de coordenadas. As propostas têm ID, valor anterior, valor sugerido, justificativa e hash; não foram aplicadas |
| Nível do treino autoral | Dez itens merecem reavaliação de classificação/distratores, incluindo cinco rotulados Elite. Os cálculos e respostas são compatíveis com a análise, mas isso não calibra dificuldade nem aprova a questão |
| Cinco famílias próximas | Novos itens e legado repetem dados/operações em distância, ampliação, coordenadas, comparação de áreas e buffer de escolas. Não são duplicatas exatas; decidir relações de família e efeito na novidade, sem apagar originais |
| GMS conhecido | `v6-fix-ae06798f90e822d3` conserva dois distratores equivalentes, `−42,3°` e `−42,30°`; a correta continua `−42,5°`. Decidir manutenção justificada ou nova versão |
| Dados fora do banco | Quatro tabelas, um SVG de perfil, a precisão UTM e o roteiro/rubricas de prática estavam no código. Foram preservados nas candidatas para evitar dependência editorial oculta da interface |
| Perfil topográfico | O desenho preservado é esquemático e não possui os eixos graduados das escalas declaradas na questão. A tabela e as contas sustentam o gabarito. Recomenda-se identificá-lo como esquema sem escala ou substituir por figura compatível em nova versão |
| Questão com referência a imagem | `v6-q-g10` menciona o par Landsat do Rio, disponível na teoria, sem exibi-lo junto do enunciado. Tornar a dependência explícita ou incluir o par na futura versão da questão |
| Feedback do legado | Explicações são preservadas, mas algumas recebem complementos genéricos do conceito associado; há casos em que o contraste fala de outro aspecto. Revisar pertinência antes de aprovação canônica |
| Afirmações sobre cobrança FGV | O edital confirma programa e formato, não frequência histórica ou questão já cobrada. Orientações sem prova/ano/item ficam como autoria editorial até comprovação |
| Referências históricas | Rodapés preservados que dizem “Auditoria Premium concluída” descrevem a fonte histórica; não são aprovação canônica deste lote. A futura apresentação das fontes deve distinguir esses contextos |
| Prática | O roteiro ativo do módulo continua sendo o de escala. Não foram inventados temas específicos de prática para as três unidades |

Os IDs e pareceres dos 36 itens estão em cada `audit.md` e `audit.json`. Todos os campos de decisão humana permanecem pendentes. Não se declara ausência absoluta de erro conceitual com base nesta revisão assistida.

## Cobertura do recorte do edital

Foi consultado o [edital consolidado disponível na FGV](https://conhecimento.fgv.br/sites/default/files/concursos/edital-consolidado-01.10-minuta.pdf), indicado na página do certame como retificado em 02/10/2026. O recorte de Cartografia aparece na página impressa 102. O quadro abaixo é uma identificação de presença no material, não um percentual de aprovação ou suficiência pedagógica.

| Tópico do recorte | Missões de referência |
| --- | --- |
| Representações e linguagem cartográfica | `linguagem-cartografica` |
| Mapas, cartas e plantas | `linguagem-cartografica` |
| Tabelas, gráficos e perfis | `graficos-perfis-relevo`, com tabelas didáticas de apoio |
| Coordenadas geográficas | `coordenadas-gms` |
| Fusos horários | `fusos-utc-data` |
| Projeções cartográficas | `projecoes-propriedades`, `mercator-peters-utm` |
| Escalas | `escalas-e-medidas` |
| Sensoriamento remoto e imagens | `sensores-espectro`, `resolucoes-indices-classificacao` |
| SIG | `sig-modelos-operacoes` |
| Geoprocessamento e cartografia digital | `geoprocessamento-dados-digitais` |
| Aplicação territorial de geotecnologias | `amazonia-monitoramento`, `leitura-critica-integrada` |

Cartografia escolar articula o recorte com o ensino, mas não substitui a unidade `ensino-geografia-bncc`. A auditoria completa dessa unidade, do DCEPA e do restante do programa está fora deste lote. Não foi reutilizada uma estimativa histórica de cobertura global como se fosse resultado novo.

## Fontes e dados temporais

Foram registradas 14 fontes primárias distintas nos metadados, com alcance de consulta delimitado. A conferência direta sustentou o programa do certame, quatro deslocamentos da Hora Legal Brasileira, a lei de fusos citada, a adoção de SIRGAS2000, convenções básicas UTM, fórmula NDVI, funções distintas de PRODES/DETER, definição geral de INDE e datas do par NASA.

Exemplos de registros relevantes:

- [IBGE — Resolução 01/2015](https://geoftp.ibge.gov.br/metodos_e_outros_documentos_de_referencia/normas/rpr_01_2015_sirgas2000.pdf): documento datado de 24/02/2015, com término da transição em 25/02/2015; essas datas não foram confundidas.
- [INPE — divulgação de agosto de 2026](https://www.gov.br/inpe/pt-br/assuntos/ultimas-noticias/governo-federal-apresenta-dados-que-indicam-reducao-do-desmatamento-nos-biomas-brasileiros/): confirma a diferença funcional entre alertas e mapeamento anual; não foram inseridos novos índices anuais da notícia.
- [NASA — Rio de Janeiro](https://science.nasa.gov/earth/earth-observatory/rio-de-janeiro-a-changing-city-88103/): imagens históricas de 19/09/1984 e 25/09/2015; não descrevem a situação de 2026.

O PDF curricular do MEC e o endpoint USGS/FGDC da faixa UTM retornaram 403; a tabela estadual do Observatório Nacional teve timeout. Trechos indexados dessas fontes foram registrados como apoio parcial, sem simular leitura integral. A configuração estadual de fusos e os princípios curriculares mantêm afirmações com `verified_at` nulo até a conclusão da conferência direta. Um bloqueio de acesso da ferramenta não é classificado como link quebrado.

Parâmetros como população dos municípios hipotéticos, reflectâncias, 14 bits, horários de viagens e datas 1990/2025 de um cenário de bases cartográficas foram identificados como dados didáticos. Não receberam fonte inventada, atualização para o presente ou aparência de levantamento real.

## Arquitetura e proteção de aprovação

Os pacotes separam conteúdo, procedência, auditoria e histórico. O catálogo usa os 28 IDs oficiais e identificadores semânticos dos módulos; divergências antigas de numeração de módulos não são propagadas para a identidade dos dados.

O validador rejeita perda de texto/variante, gabarito sem alternativa, visual ausente, procedência inconsistente, inventário divergente e dados temporais sem destino/fonte/regra de revisão. O carregador operacional exige registro canônico, matriz Premium concluída, achados impeditivos resolvidos e aprovação humana vinculada ao digest da versão. Há testes de recusa quando alguém altera apenas o status ou modifica conteúdo após o parecer.

A reconstrução inicial não lê os HTMLs nem chama o importador. A aplicação atual ainda usa a estratégia anterior de geração; integrar somente bases aprovadas será uma etapa posterior. Nenhuma candidata foi disponibilizada como conteúdo oficial pelo site, e o estoque aprovado de prova não aumentou.

## Decisões e riscos para a próxima revisão

1. Resolver as propostas e os achados por unidade, com responsável e versão editorial. Uma correção no conteúdo deve preservar a edição inicial e retornar à revisão.
2. Confirmar ou revisar a classificação dos itens autorais e suas relações com o legado. Questão tecnicamente válida não é automaticamente Elite nem questão oficial da banca.
3. Concluir as fontes parcialmente verificadas e os créditos de mídia. Dados temporais mantêm fonte, referência, verificação e gatilho de revisão.
4. Antes de integrar correções de conceito/missão, definir como tratar evidências e erros já registrados no navegador. IDs dos itens permanecem estáveis; não remapear silenciosamente o histórico do estudante.
5. Promover apenas a versão que receber parecer humano Premium correspondente ao pacote revisado. A autorização de iniciar a Issue #13 não é esse parecer.

O site, o progresso, os 31 HTMLs, os gabaritos e as regras do piloto foram preservados. A ressalva sensorial segue registrada, sem ser apresentada como revisão editorial ou condicionamento para repetir a reconferência P1/P3.
