# Auditoria por IA — cartografia-representacao@0.1.2

Data: 2026-10-16. Responsável: Codex. Estado do pacote: **EM_AUDITORIA**.

A revisão foi conduzida pelo assistente por delegação do usuário. Não é necessário pedir ao estudante que audite questões no GitHub. Este documento não simula parecer de um especialista humano nem executa promoção ou publicação.

Origem preservada: [0.1.1](../0.1.1/audit.md). [Antes/depois](changes.md). [Questões completas](review.md).

- Candidata 0.1.2 derivada da base estruturada 0.1.1, preservada integralmente com 0.1.0. Nenhum HTML foi reextraído ou reinterpretado nesta correção.
- 44 questões legadas recebem explicações individualizadas das alternativas incorretas no conjunto. Todas as alternativas, seus IDs e os 161 gabaritos são preservados.
- r11 passa a Concurso/D2/C3, preservando texto e opções. O conjunto contém 125 Fixação, 24 Concurso e 12 Elite, sem calibração psicométrica.
- Revisão editorial realizada pelo Codex por delegação do usuário, com autoria por IA explícita e vínculo aos hashes do conteúdo. Não se exige que o estudante revise arquivos no GitHub.
- A promoção e o consumo operacional permanecem distintos deste parecer; nenhum registro humano foi inventado. O site, o progresso e as outras 25 unidades não foram alterados.

Inventário: `missions`: 5; `sections`: 14; `recalls`: 10; `concepts`: 10; `questions`: 49; `authored_questions`: 12; `cards`: 31; `game`: 61; `writing`: 2; `supplements`: 0; `parity_records`: 172.

Diferenças declaradas: 62. Identidades preservadas: 183.

## Parecer do assistente nos 12 critérios

| Critério | Avaliação por IA | Justificativa |
| --- | --- | --- |
| Correção conceitual | satisfactory | Conceitos, respostas e contrastes herdados da leitura integral; nenhum gabarito a trocar identificado. Correções atuais tornam explícito o erro de cada distrator selecionado. |
| Cobertura do escopo e perfil | satisfactory-in-scope | As 17 missões do conjunto cobrem o recorte de Cartografia do edital. A avaliação não cobre as outras 25 unidades nem todo o programa do concurso. |
| Profundidade para concurso | satisfactory-with-limitations | Fundamentos, aplicação, cálculos e limites de inferência preservados. O estoque de treino avançado é limitado; não constitui prova oficial completa. |
| Clareza didática | improved | Explicações dos 44 itens identificados substituem os prefixos genéricos por análise específica de cada alternativa incorreta. |
| Qualidade dos exemplos | satisfactory-in-scope | Exemplos hipotéticos continuam identificados; nenhum exemplo válido foi resumido ou removido. O mapa autoral declara suas medidas e referências. |
| Redundância editorial | satisfactory-with-limitations | Identidades e variantes preservadas; cinco famílias existentes continuam explícitas. Ausência de duplicata exata não implica independência entre todas as atividades. |
| Consistência terminológica | satisfactory | Preservadas as distinções entre latitude/longitude, escala geográfica/cartográfica, datum/projeção, SIG/GNSS, raster/vetor e as operações digitais. |
| Identificação de lacunas | identified | Permanecem o estoque insuficiente para prova oficial, a prática compartilhada de escala e limitações de acesso aos binários externos. São trabalho do assistente, não tarefa obrigatória do estudante. |
| Dados temporais | satisfactory-in-scope | Os fatos temporais e suas fontes/datas permanecem delimitados. Coordenadas e medidas do novo mapa são hipotéticas, não observações territoriais atuais. |
| Adequação ao nível de cobrança | editorial-reassessment | Além das dez reclassificações anteriores, r11 passa de Elite/D3/C5 para Concurso/D2/C3. Não há alegação de dificuldade calibrada. |
| Confiabilidade das fontes | satisfactory-with-limitations | Fatos normativos e institucionais usam as fontes oficiais registradas. A grade e a escala do PDF IBGE não são afirmadas sem conferência; o exercício obrigatório possui suporte autoral autossuficiente. |
| Qualidade do treino | improved | Gabaritos e alternativas preservados, feedbacks individualizados e A–E nos 36 itens Concurso/Elite. O parecer por IA não simula uma questão real da banca nem certificação externa. |

O registro estruturado `audit.json#assisted_review` vincula o parecer ao conteúdo, suporte e metadados e identifica os recursos examinados. Os campos de aprovação humana do contrato anterior permanecem sem preenchimento fictício.

## Achados e tratamento

### CAN-EDITORIAL-001 — Parecer humano Premium e aprovação dos itens ainda pendentes

Estado: `open`. Impede promoção no contrato atual: sim.

Este parecer assistido e os testes não promovem uma unidade. Os 12 critérios e o conjunto integral precisam de decisão editorial documentada.

### CAN-FEEDBACK-001 — Complementos genéricos e atribuições de conceitos exigem revisão por pertinência

Estado: `addressed-pending-human-review`. Impede promoção no contrato atual: sim.

Correções de vínculo e feedback da rodada anterior preservadas e revistas. Nesta rodada, 11 questões desta unidade recebem explicação específica de cada alternativa incorreta. A explicação central continua preservada.

### CAN-FONTE-001 — Afirmações sobre como a FGV já cobrou não possuem prova/ano/item identificados

Estado: `addressed-pending-human-review`. Impede promoção no contrato atual: sim.

Afirmações não documentadas sobre histórico/frequência de cobrança foram identificadas como orientação e exemplos autorais. O programa do edital permanece citado sem inventar prova/ano/item.

### CAN-NIVEL-001 — Nível cognitivo/dificuldade e distratores precisam de decisão

Estado: `addressed-pending-human-review`. Impede promoção no contrato atual: sim.

Dez reclassificações anteriores preservadas e nova reclassificação de r11 para Concurso/D2/C3 aplicada. Nenhum item foi artificialmente promovido a Elite.

### CAN-FAMILIA-001 — Famílias próximas entre novos itens e legado

Estado: `addressed-pending-human-review`. Impede promoção no contrato atual: sim.

Cinco famílias declaradas no conjunto, com vínculo bidirecional nos itens e novidade independente desativada no contrato. Nenhuma formulação foi excluída. A aplicação atual não consome estes metadados.

### CAN-VISUAL-002 — Perfil esquemático não tem proporção gráfica das escalas declaradas no item

Estado: `addressed-pending-human-review`. Impede promoção no contrato atual: sim.

Enunciado, legenda e nota de medição esclarecem que o SVG é esquema sem escala. Tabela, SVG e gabarito permanecem preservados.

### CAN-MIDIA-001 — Créditos/licenças das imagens externas precisam de conferência completa

Estado: `addressed-pending-human-review`. Impede promoção no contrato atual: sim.

Créditos e licenças dos dois arquivos Wikimedia conferidos diretamente nas páginas dos arquivos e incorporados às legendas e aos metadados.

### CAN-TEMPORAL-001 — Conferência direta de fonte ainda parcial

Estado: `addressed-pending-human-review`. Impede promoção no contrato atual: sim.

Faixa UTM conferida diretamente na fonte primária FGDC. O endpoint USGS antes parcial permanece registrado como histórico, sem fingir abertura direta.

### CAN-SUPORTE-001 — Dados pedagógicos da interface incluídos no pacote candidato

Estado: `resolved`. Impede promoção no contrato atual: não.

Tabelas extraídas de literais AST, perfil SVG preservado, precisão UTM e rubricas de prática registradas. Nada foi removido do piloto.

## Limites

- Dificuldade não calibrada empiricamente.
- Referências externas podem exigir acesso de rede; os binários não receberam nova inspeção visual nesta rodada.
- O banco completo de prova e a prática específica de cada unidade permanecem fora desta correção.

Nenhuma informação pedagógica válida foi encurtada para facilitar a programação. O histórico integral e os gabaritos continuam rastreáveis.
