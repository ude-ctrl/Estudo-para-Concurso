# Auditoria candidata — cartografia-fundamentos@0.1.1

Data: 2026-10-16, America/Sao_Paulo. Estado: **EM_AUDITORIA**. Parecer assistido; aprovação humana pendente.

Edição anterior preservada: [0.1.0](../0.1.0/audit.md). [Mudanças antes/depois](changes.md). [Questões para revisão humana](review.md).

## Resultado da correção

- Candidata 0.1.1 derivada exclusivamente da base estruturada 0.1.0. Nenhum HTML histórico foi reinterpretado como fonte editorial desta rodada.
- Inventário, IDs de recursos, gabaritos, variantes, 685 procedências no conjunto e a edição inicial foram preservados. Diferenças editoriais explícitas em provenance.json#revision.
- Ajustes de nível são editoriais, com taxonomia da Fase 6. O estoque da candidata muda para 125 Fixação, 23 Concurso e 13 Elite no conjunto; isso não altera o banco ativo nem aprova itens para prova.
- As correções assistidas e as fontes conferidas não substituem os 12 critérios Premium nem a revisão humana do conteúdo. Achados tratados permanecem aguardando validação humana.
- O PDF IBGE teve acesso bloqueado. A configuração civil tem fonte direta do ON e lei citada; os elementos gráficos do PDF ainda precisam de conferência, com achado próprio aberto.

Inventário: `missions`: 5; `sections`: 19; `recalls`: 17; `concepts`: 10; `questions`: 60; `authored_questions`: 12; `cards`: 54; `game`: 106; `writing`: 2; `supplements`: 3; `parity_records`: 272.

Diferenças declaradas: 107 campos. Fonte canônica ativa: nenhuma.

## Achados

### CAN-EDITORIAL-001 — Parecer humano Premium e aprovação dos itens ainda pendentes

Estado: `open`. Impede promoção: sim.

Este parecer assistido e os testes não promovem uma unidade. Os 12 critérios e o conjunto integral precisam de decisão editorial documentada.

### CAN-FEEDBACK-001 — Complementos genéricos e atribuições de conceitos exigem revisão por pertinência

Estado: `addressed-pending-human-review`. Impede promoção: sim.

Doze associações propostas aplicadas no conjunto e feedbacks específicos dos cinco itens legados identificados revisados. Conteúdo alterado aguarda validação humana.

### CAN-FONTE-001 — Afirmações sobre como a FGV já cobrou não possuem prova/ano/item identificados

Estado: `addressed-pending-human-review`. Impede promoção: sim.

Afirmações não documentadas sobre histórico/frequência de cobrança foram identificadas como orientação e exemplos autorais. O programa do edital permanece citado sem inventar prova/ano/item.

### CAN-NIVEL-001 — Nível cognitivo/dificuldade e distratores precisam de decisão

Estado: `addressed-pending-human-review`. Impede promoção: sim.

Dez classificações revistas no conjunto segundo a Fase 6; cinco itens saem de Elite para Concurso. Sem alegação de dificuldade calibrada; validação humana pendente.

### CAN-FAMILIA-001 — Famílias próximas entre novos itens e legado

Estado: `addressed-pending-human-review`. Impede promoção: sim.

Cinco famílias declaradas no conjunto, com vínculo bidirecional nos itens e novidade independente desativada no contrato. Nenhuma formulação foi excluída. A aplicação atual não consome estes metadados.

### CAN-GMS-001 — Dois distratores numericamente equivalentes no legado de GMS

Estado: `addressed-pending-human-review`. Impede promoção: sim.

Distrator numericamente redundante substituído por −42,05° com novo ID. O ID e valor do gabarito −42,5° são preservados; resposta antiga não é remapeada para a alternativa nova.

### CAN-TEMPORAL-001 — Conferência direta de fonte ainda parcial

Estado: `addressed-pending-human-review`. Impede promoção: sim.

Fonte diretamente consultada: tabela de fusos do ON ou Quadro 1 da BNCC, conforme a unidade. Alcance do recorte e datas explicitados nos metadados.

### CAN-SUPORTE-001 — Dados pedagógicos da interface incluídos no pacote candidato

Estado: `resolved`. Impede promoção: não.

Tabelas extraídas de literais AST, perfil SVG preservado, precisão UTM e rubricas de prática registradas. Nada foi removido do piloto.

### CAN-MIDIA-IBGE-001 — Acesso direto ao PDF cartográfico IBGE ainda não confirmado

Estado: `open`. Impede promoção: sim.

Fonte histórica e exercício gráfico preservados. Conferir o arquivo IBGE e seus elementos em acesso humano ou fonte oficial equivalente antes da promoção. A tabela do ON resolve a configuração civil textual, mas não comprova a escala ou a grade do PDF.

## Matriz Premium

- Correção conceitual: revisão humana pendente.
- Cobertura do escopo e perfil: revisão humana pendente.
- Profundidade para concurso: revisão humana pendente.
- Clareza didática: revisão humana pendente.
- Qualidade dos exemplos: revisão humana pendente.
- Redundância editorial: revisão humana pendente.
- Consistência terminológica: revisão humana pendente.
- Identificação de lacunas: revisão humana pendente.
- Dados temporais: revisão humana pendente.
- Adequação ao nível de cobrança: revisão humana pendente.
- Confiabilidade das fontes: revisão humana pendente.
- Qualidade do treino: revisão humana pendente.

Os 36 itens autorais do conjunto continuam pendentes. Nenhum parecer sintético de teste é usado como aprovação.

## Fontes da correção

- [Observatório Nacional — tabela dos fusos dos estados](https://www.gov.br/observatorio/pt-br/assuntos/areas-de-atuacao/tempo-e-frequencia/brasil): Tabela publicada em 06/10/2026; linha PARÁ: UTC−3 e diferença zero para Brasília. Acre: UTC−5; ilhas oceânicas listadas: UTC−2. Tabela diretamente consultada para os deslocamentos civis usados no material, em conjunto com a lei citada. A linha simplificada Amazonas −4 não substitui a delimitação da parte ocidental em UTC−5 na Lei 12.876/2013.

A comparação editorial completa está em `provenance.json#revision`. A procedência histórica continua preservada integralmente.
