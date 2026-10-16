# Auditoria candidata — Fundamentos cartográficos

Unidade: `cartografia-fundamentos@0.1.0`. Data: 2026-10-16, America/Sao_Paulo. Status: **EM_AUDITORIA**.

Parecer editorial assistido; a decisão humana Premium permanece pendente. Este pacote não está ligado à build do site e não torna conteúdo aprovado por ter sido exportado.

## Leitura e escopo

A teoria distingue linguagem cartográfica, referências de orientação, coordenadas, GMS, UTC/Linha de Data e escalas. Os exemplos de sinal, base 60, unidades e redimensionamento foram lidos e mantidos. Não há motivo para abreviar os 19 blocos de explicação.

A sequência oferece 17 recalls, 54 cartões e 106 V/F, além de duas discursivas e dos suplementos. Há recuperações próximas e pares verdadeiro/falso intencionais: isso não justifica apagá-los por repetição de palavras. A futura redução de redundância exige decisão por finalidade e preservação das variantes.

A dificuldade editorial é a principal ressalva do treino novo: f08 e f12 ainda se aproximam de reconhecimento/aplicação direta para o rótulo Elite. f01, f06 e f08 têm famílias próximas do legado. GMS e duas atividades de unidades de escala precisam de revisão de vínculos conceituais. O distrator redundante de GMS já era conhecido; o gabarito permanece correto.

Fusos civis são informação normativa. Os quatro deslocamentos foram conferidos em fonte direta do Observatório Nacional, e a lei citada foi consultada. A distribuição por estado tem apoio indexado oficial, mas a tabela direta teve timeout: essa verificação permanece parcial. As datas 1990/2025 do item f10 são do cenário hipotético, não bases reais certificadas.

## Inventário preservado

| Recurso | Quantidade |
| --- | ---: |
| missions | 5 |
| sections | 19 |
| recalls | 17 |
| concepts | 10 |
| questions | 60 |
| authored_questions | 12 |
| cards | 54 |
| game | 106 |
| writing | 2 |
| supplements | 3 |
| parity_records | 272 |

## Itens autorais — revisão individual

| ID | Gabarito | Conferência e decisão pendente |
| --- | --- | --- |
| `v6-q-f01` | 3,6 km. | 7,2×50.000 cm = 3,6 km; as demais opções erram a conversão. Rever família com o Chefão legado de mesmos dados; confirmar valor como Concurso. |
| `v6-q-f02` | −12,5°. | 30/60=0,5; aplicar o sinal sul ao conjunto resulta em −12,5°. Manter como candidato de aplicação procedimental; revisão humana de linguagem e distratores pendente. |
| `v6-q-f03` | 1h30 de terça-feira. | UTC−3 está 2 h à frente de UTC−5; 23h30 de segunda vira 1h30 de terça. Conferir diretamente a tabela estadual e vincular a data de verificação do fuso do Pará. |
| `v6-q-f04` | Oeste, medido a partir do norte indicado. | Azimute geográfico de 270° corresponde a oeste; rotação do papel não altera a referência. Manter candidato; a referência geográfica está expressa e distingue norte magnético. |
| `v6-q-f05` | Planta em escala grande, com legenda e referência de orientação. | Planta em escala grande atende ao detalhe interno do edifício; as outras opções falham na finalidade. Reavaliar C4: aplicação direta a uma finalidade, com distratores distantes; C3 é hipótese de revisão. |
| `v6-q-f06` | A nova escala numérica é 1:40.000 e a barra redimensionada continua válida. | Ampliação linear por 2 reduz 80.000 a 40.000; barra ampliada junto conserva a relação. Rever família com v6-fix-ba07a3382fd4f8f0; não contar mera quinta alternativa como salto de dificuldade. |
| `v6-q-f07` | Área real de 1 km²; desenho de 16 cm² na nova escala 1:25.000. | 4×(0,5 km)²=1 km²; dobrar os lados dá 16 cm² e escala 1:25.000. Integra área e redimensionamento; confirmar dificuldade sem alterar as unidades ou o gabarito. |
| `v6-q-f08` | B fica ao sul de A e C fica a oeste de A. | Na tabela, −5° fica ao sul de −1°; −52° fica a oeste de −48°. Reavaliar Elite/D3/C4: leitura direta de coordenadas, próxima do Chefão legado; preservar a tabela. |
| `v6-q-f09` | Às 8h de terça-feira em B. | 22h+5h=3h de terça na origem; diferença UTC+2−(−3)=5h; chegada 8h. Manter candidato de integração horário, duração e data; fusos são premissas declaradas. |
| `v6-q-f10` | Examinar B como base potencialmente compatível, verificando levantamento e precisão; a ampliação de A não recupera os detalhes ausentes. | Ampliar base antiga não recupera geometria; a base recente exige verificar método e precisão. Manter candidato de avaliação técnica; 1990/2025 são datas do cenário hipotético, não levantamentos verificados. |
| `v6-q-f11` | Reordenar para (−48, −1), após conferir os campos; o referencial comum não demonstra erro posicional nulo. | A camada exige longitude,latitude: reordenar para (−48,−1); referencial comum não prova erro zero. Manter candidato; conferir interpretação da ordem de eixos e plausibilidade dos distratores. |
| `v6-q-f12` | A escala geográfica da análise pode ser regional e as bases cartográficas locais podem ter escala grande. | Abrangência regional da análise não impede uso de plantas locais em grande escala. Reavaliar Elite/D3/C4: essencialmente distinção conceitual, sem integração exigente ou evidência nova. |

As letras não são identidades de gabarito: a resposta permanece vinculada ao ID da alternativa. Todas as decisões humanas dos itens estão pendentes.

## Achados e recomendações

### CAN-EDITORIAL-001 — Parecer humano Premium e aprovação dos itens ainda pendentes

Situação: `open`; impede promoção: **sim**. Este parecer assistido e os testes não promovem uma unidade. Os 12 critérios e o conjunto integral precisam de decisão editorial documentada.

Recursos: `v6-q-f01`, `v6-q-f02`, `v6-q-f03`, `v6-q-f04`, `v6-q-f05`, `v6-q-f06`, `v6-q-f07`, `v6-q-f08`, `v6-q-f09`, `v6-q-f10`, `v6-q-f11`, `v6-q-f12`.

### CAN-FEEDBACK-001 — Complementos genéricos e atribuições de conceitos exigem revisão por pertinência

Situação: `open`; impede promoção: **sim**. Conferir as propostas de vínculo e os feedbacks por alternativa. Na questão v6-fix-ae06798f90e822d3, a resposta de GMS recebe contraste sobre altitude/latitude. Os textos foram preservados nesta candidata.

Recursos: `v6-fix-4c42e2e9b5d093a7`, `v6-fix-3735d553a70c574c`, `v6-fix-ae06798f90e822d3`, `v6-vf-ed85f8a4e29b84b6`, `v6-vf-5f14c1fe1dd5d149`, `v6-vf-4de26d6a6d22ba10`, `v6-vf-dbf4f96d27078992`, `v6-vf-2552ea56a33202b6`, `v6-vf-21917d1867c75d57`, `v6-vf-2ad33e2a415f1868`.

### CAN-FONTE-001 — Afirmações sobre como a FGV já cobrou não possuem prova/ano/item identificados

Situação: `open`; impede promoção: **sim**. Tratar como orientação autoral até verificar exemplos de provas reais; o edital confirma programa/formato, não frequência histórica de cobrança.

Recursos: `v6-theory-t02-0`, `v6-theory-t02-3`, `v6-theory-t02-4`, `v6-theory-t02-5`, `v6-theory-t02-6`, `v6-theory-t02-9`, `v6-theory-t02-13`.

### CAN-NIVEL-001 — Nível cognitivo/dificuldade e distratores precisam de decisão

Situação: `open`; impede promoção: **sim**. Reclassificar ou reconstruir em nova versão após decisão editorial. Não há calibração psicométrica ou promoção pelo rótulo Elite.

Recursos: `v6-q-f05`, `v6-q-f08`, `v6-q-f12`.

### CAN-FAMILIA-001 — Famílias próximas entre novos itens e legado

Situação: `open`; impede promoção: **sim**. Os pares não são duplicatas exatas. Decidir identidade de família, rastreabilidade de reformulação e efeito na novidade antes da promoção; não apagar originais.

Recursos: `v6-q-f01`, `v6-fix-8a27b1529f0b322d`, `v6-q-f06`, `v6-fix-ba07a3382fd4f8f0`, `v6-q-f08`, `v6-fix-56b356298605e196`.

### CAN-GMS-001 — Dois distratores numericamente equivalentes no legado de GMS

Situação: `open`; impede promoção: **sim**. −42,3° e −42,30° são equivalentes e incorretos; −42,5° continua sendo a correta. Decidir manutenção com ressalva ou nova versão do item; original preservado.

Recursos: `v6-fix-ae06798f90e822d3`.

### CAN-TEMPORAL-001 — Conferência direta de fonte ainda parcial

Situação: `open`; impede promoção: **sim**. Trecho indexado ou falha de acesso não equivale a conferência integral. Manter verified_at nulo no fato parcialmente verificado e resolver antes da promoção.

Recursos: `fusos`, `v6-fix-ce0a056c611ab242`, `v6-q-f03`, `v6-fc-a259e3963c78ffbb`, `v6-fc-bb3de28c722ddd84`, `v6-fc-7dd4b0996f1edfb1`, `v6-fc-0ff888d3040aa56a`, `v6-vf-747c2b0df9e1325b`, `v6-vf-7594daf0aee1067c`, `v6-vf-1d51e42f2335afbb`, `v6-vf-d155830b8235395e`, `v6-vf-5bd81ef3254a984e`, `v6-vf-d995b22cec4ea4f7`, `v6-vf-56a9fc1bed220792`, `v6-vf-8f51c0c6e35754fe`, `v6-supp-ecacec940765a30c`, `v6-theory-t02-4`, `v6-theory-t02-8`, `v6-recall-77116d32fb7c5779`.

### CAN-SUPORTE-001 — Dados pedagógicos da interface incluídos no pacote candidato

Situação: `resolved`; impede promoção: **não**. Tabelas extraídas de literais AST, perfil SVG preservado, precisão UTM e rubricas de prática registradas. Nada foi removido do piloto.

Recursos: `v6-q-f08`.

## Critérios Premium

| Critério | Situação |
| --- | --- |
| Correção conceitual | Parecer humano pendente |
| Cobertura do escopo e perfil | Parecer humano pendente |
| Profundidade para concurso | Parecer humano pendente |
| Clareza didática | Parecer humano pendente |
| Qualidade dos exemplos | Parecer humano pendente |
| Redundância editorial | Parecer humano pendente |
| Consistência terminológica | Parecer humano pendente |
| Identificação de lacunas | Parecer humano pendente |
| Dados temporais | Parecer humano pendente |
| Adequação ao nível de cobrança | Parecer humano pendente |
| Confiabilidade das fontes | Parecer humano pendente |
| Qualidade do treino | Parecer humano pendente |

## Fontes e temporalidade

- [Observatório Nacional — difusão da Hora Legal Brasileira](https://www.gov.br/observatorio/pt-br/assuntos/areas-de-atuacao/tempo-e-frequencia/difusao-da-hora-por-linha-privada): `direct`; consulta 2026-10-16; verificação direta 2026-10-16. Quatro deslocamentos nacionais. Não foi usada como prova de distribuição de cada estado.
- [Observatório Nacional — tabela dos fusos dos estados](https://www.gov.br/observatorio/pt-br/assuntos/areas-de-atuacao/tempo-e-frequencia/brasil): `indexed-excerpt`; consulta 2026-10-16; verificação direta não concluída. Evidência parcial da tabela estadual; requer conferência direta antes da promoção.
- [Lei nº 12.876, de 30 de outubro de 2013](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12876.htm): `direct`; consulta 2026-10-16; verificação direta 2026-10-16. Base normativa citada pelo material. Não substitui verificação de alterações posteriores ou a tabela estadual completa.
- [FGV/SEPLAD/SEDUC-PA — C-223, edital consolidado](https://conhecimento.fgv.br/sites/default/files/concursos/edital-consolidado-01.10-minuta.pdf): `direct`; consulta 2026-10-16; verificação direta 2026-10-16. Presença dos tópicos de Cartografia e formato do perfil. Não comprova frequência histórica de cobrança ou dificuldade dos itens autorais.
- [FGV — página de acompanhamento do concurso SEDUC-PA 2026](https://conhecimento.fgv.br/concursos/seducpa26): `direct`; consulta 2026-10-16; verificação direta 2026-10-16. Identificação da versão consultada. Retificações posteriores exigem revisão.

Metadados completos, datas de referência, recursos afetados e gatilhos de revisão estão em `content.json`. Datas hipotéticas de exercícios não foram transformadas em dados reais atualizados.

## Decisão do lote

**Não promover esta versão automaticamente.** Resolver os achados impeditivos, registrar revisão humana do conjunto e dos itens e vincular a aprovação ao conteúdo efetivamente revisado. Preservar esta versão antes de qualquer alteração editorial relevante.

Procedência integral em `provenance.json`; revisão estruturada e propostas não aplicadas em `audit.json`. Não houve exclusão, resumo de teoria, troca de alternativa, gabarito ou perda de variante.
