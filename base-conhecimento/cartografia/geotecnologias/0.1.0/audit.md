# Auditoria candidata — Geotecnologias e aplicações

Unidade: `geotecnologias@0.1.0`. Data: 2026-10-16, America/Sao_Paulo. Status: **EM_AUDITORIA**.

Parecer editorial assistido; a decisão humana Premium permanece pendente. Este pacote não está ligado à build do site e não torna conteúdo aprovado por ter sido exportado.

## Leitura e escopo

As 17 explicações preservam fonte de energia, espectro, quatro resoluções, bandas/NDVI, classificação, GNSS/referenciais, SIG e operações digitais, monitoramento regional e ensino. O texto distingue passivo de dependência obrigatória do Sol e inclui limites de inferência por imagens, validação independente e trabalho de campo.

Os 12 recalls, 35 cartões, 89 V/F, duas discursivas e três suplementos foram lidos. As respostas são geralmente atômicas; a explicação expandida depende dos conceitos do motor e deve acompanhar a base. As rubricas e o roteiro de prática atualmente definidos na interface foram preservados como suporte do lote, sem criar novos temas de prática.

As contas de 14 bits e NDVI conferem. g08, g09, g10 e g11 oferecem integração e análise de incerteza mais fortes. g03 e g05 merecem revisão de C4 e plausibilidade dos distratores. g04 tem uma família próxima do Chefão legado. g10 menciona um par real de imagens consultável na teoria, mas não o traz junto do enunciado: recomenda-se tornar essa dependência explícita na próxima versão.

SIRGAS2000, INDE e a função atual de PRODES/DETER foram confrontados com fontes primárias. Foram mantidas as datas históricas das imagens NASA (1984/2015), não transformadas em situação atual. A fonte curricular dos sete princípios tem apoio indexado, mas o PDF direto foi bloqueado; não se declara auditoria integral de BNCC/DCEPA ou cobertura completa do edital.

## Inventário preservado

| Recurso | Quantidade |
| --- | ---: |
| missions | 7 |
| sections | 17 |
| recalls | 12 |
| concepts | 13 |
| questions | 52 |
| authored_questions | 12 |
| cards | 35 |
| game | 89 |
| writing | 2 |
| supplements | 3 |
| parity_records | 241 |

## Itens autorais — revisão individual

| ID | Gabarito | Conferência e decisão pendente |
| --- | --- | --- |
| `v6-q-g01` | Emissão própria de energia e capacidade de atravessar muitas nuvens, conforme frequência e condições. | Radar é ativo e opera sem iluminação solar; micro-ondas são menos limitadas por muitas nuvens. Manter ressalva de frequência/condições; não generalizar para qualquer sensor ativo ou chuva. |
| `v6-q-g02` | 16.384, associados à resolução radiométrica. | 2¹⁴=16.384 códigos possíveis, associados à discretização radiométrica. Manter “em princípio”: bits não comprovam sensibilidade efetiva ou precisão radiométrica do sensor. |
| `v6-q-g03` | Confirmar os referenciais e aplicar transformação apropriada, validando o alinhamento. | Atribuir um rótulo não transforma coordenadas; confirmar referências, parâmetros, época e validar. Reavaliar C4 frente à aplicação direta; manter a distinção entre definição de CRS e transformação. |
| `v6-q-g04` | Compatibilizar dados, criar buffer dos rios e combinar a seleção espacial com os bairros vulneráveis. | Buffer representa distância; seleção/interseção cruza a condição com bairros vulneráveis. Rever família com Chefão legado de mesmas condições; 500 m é parâmetro hipotético, não regra jurídica. |
| `v6-q-g05` | Obter metadados e avaliar adequação temporal, referência, precisão e método. | Metadados permitem avaliar época, referência, precisão e método; zoom não os substitui. Reavaliar C4: decisão direta com vários distratores pouco plausíveis para treino de concurso. |
| `v6-q-g06` | Confunde um produto de alerta operacional com a estimativa anual consolidada do PRODES. | Alertas operacionais DETER não são intercambiáveis com a taxa anual do PRODES. Manter candidato; vincular documentação INPE com data, preservando a diferença entre estimativa e produto consolidado. |
| `v6-q-g07` | P tem NDVI 0,5 e Q cerca de −0,67; os valores são indícios espectrais e não identificam, sozinhos, espécie ou situação jurídica. | P=(0,6−0,2)/(0,6+0,2)=0,5; Q=(0,02−0,1)/(0,02+0,1)=−2/3. Manter candidato de cálculo com limite inferencial; espectros são didáticos e comparáveis por premissa. |
| `v6-q-g08` | Avaliar com amostra de referência independente, informar o desenho amostral e examinar omissões e comissões por classe. | Avaliar nos próprios pixels de ajuste não estima bem generalização; referência independente deve examinar classes. Manter candidato; amostragem e independência espacial merecem discussão na revisão humana. |
| `v6-q-g09` | A interseção não localiza todos os moradores; é preciso estimar a distribuição populacional na faixa e declarar método e incerteza. | Município parcialmente intersectado não localiza toda sua população na faixa; interpolação por área impõe hipótese. Manter candidato de mudança de suporte espacial; não tratar ponderação como contagem exata. |
| `v6-q-g10` | Interpretar diferenças observáveis após conferir comparabilidade; atribuir causas requer evidências complementares às duas imagens. | Comparabilidade de datas/sensores/processamento precede interpretação; causa social exige evidência adicional. Preservar acesso ao par NASA no estudo; a questão hoje o referencia sem trazer as imagens junto do enunciado. |
| `v6-q-g11` | Geocodificar endereços e interpolar chuva entre estações, avaliando a qualidade das posições e a incerteza da superfície estimada. | Geocodificação posiciona endereços; interpolação estima chuva não observada; ambas exigem avaliação. Manter candidato de integração e incerteza; reconhecer que estimativa não é observação direta. |
| `v6-q-g12` | Construir mapas de trajetos com legenda compartilhada, comparar barreiras e justificar alternativas, com recursos táteis ou textuais e avaliação do raciocínio. | Mapear trajetos, comparar barreiras e justificar alternativas com acesso tátil/textual produz evidência do raciocínio. Manter candidato; validar alinhamento pedagógico e fonte curricular antes de aprovação humana. |

As letras não são identidades de gabarito: a resposta permanece vinculada ao ID da alternativa. Todas as decisões humanas dos itens estão pendentes.

## Achados e recomendações

### CAN-EDITORIAL-001 — Parecer humano Premium e aprovação dos itens ainda pendentes

Situação: `open`; impede promoção: **sim**. Este parecer assistido e os testes não promovem uma unidade. Os 12 critérios e o conjunto integral precisam de decisão editorial documentada.

Recursos: `v6-q-g01`, `v6-q-g02`, `v6-q-g03`, `v6-q-g04`, `v6-q-g05`, `v6-q-g06`, `v6-q-g07`, `v6-q-g08`, `v6-q-g09`, `v6-q-g10`, `v6-q-g11`, `v6-q-g12`.

### CAN-FEEDBACK-001 — Complementos genéricos e atribuições de conceitos exigem revisão por pertinência

Situação: `open`; impede promoção: **sim**. Conferir as propostas de vínculo e os feedbacks por alternativa. Na questão v6-fix-b5782254d12f27da, o conceito de pixel recebe complemento sobre sensores passivos/térmicos. Os textos foram preservados nesta candidata.

Recursos: `v6-fix-b5782254d12f27da`.

### CAN-FONTE-001 — Afirmações sobre como a FGV já cobrou não possuem prova/ano/item identificados

Situação: `open`; impede promoção: **sim**. Tratar como orientação autoral até verificar exemplos de provas reais; o edital confirma programa/formato, não frequência histórica de cobrança.

Recursos: `v6-theory-t17-0`, `v6-theory-t03a-9`, `v6-theory-t03a-12`, `v6-theory-t03a-14`.

### CAN-NIVEL-001 — Nível cognitivo/dificuldade e distratores precisam de decisão

Situação: `open`; impede promoção: **sim**. Reclassificar ou reconstruir em nova versão após decisão editorial. Não há calibração psicométrica ou promoção pelo rótulo Elite.

Recursos: `v6-q-g03`, `v6-q-g05`.

### CAN-FAMILIA-001 — Famílias próximas entre novos itens e legado

Situação: `open`; impede promoção: **sim**. Os pares não são duplicatas exatas. Decidir identidade de família, rastreabilidade de reformulação e efeito na novidade antes da promoção; não apagar originais.

Recursos: `v6-q-g04`, `v6-fix-df0accd0b0af1130`.

### CAN-VISUAL-003 — Questão referencia imagens apresentadas em outro contexto

Situação: `open`; impede promoção: **sim**. O par NASA está na teoria de sensores. Decidir vinculação/exibição junto ao item para torná-lo autônomo, sem alterar o original silenciosamente.

Recursos: `v6-q-g10`.

### CAN-PRATICA-001 — Prática ativa tem um roteiro de escala, compartilhado pelo módulo

Situação: `open`; impede promoção: **não**. Preservado no suporte da unidade de fundamentos; não declarar três temas específicos de prática já implementados. Futuras ampliações exigem autoria/auditoria.

Escopo: suporte do módulo.

### CAN-TEMPORAL-001 — Conferência direta de fonte ainda parcial

Situação: `open`; impede promoção: **sim**. Trecho indexado ou falha de acesso não equivale a conferência integral. Manter verified_at nulo no fato parcialmente verificado e resolver antes da promoção.

Recursos: `ensino`, `v6-theory-t17-17`.

### CAN-SUPORTE-001 — Dados pedagógicos da interface incluídos no pacote candidato

Situação: `resolved`; impede promoção: **não**. Tabelas extraídas de literais AST, perfil SVG preservado, precisão UTM e rubricas de prática registradas. Nada foi removido do piloto.

Recursos: `v6-q-g07`.

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

- [IBGE — Resolução da Presidência nº 01/2015](https://geoftp.ibge.gov.br/metodos_e_outros_documentos_de_referencia/normas/rpr_01_2015_sirgas2000.pdf): `direct`; consulta 2026-10-16; verificação direta 2026-10-16. Data de adoção exclusiva e necessidade de transformação de referenciais. Não certifica precisão de um levantamento.
- [INPE — DETER](https://www.gov.br/inpe/pt-br/area-conhecimento/unidade-amazonia/projetos-e-pesquisas/deter/deter): `direct`; consulta 2026-10-16; verificação direta 2026-10-16. Princípios e limitações. Números de sensores/limiares dessa página datada não foram incorporados como configuração atual.
- [INPE — divulgação de PRODES e DETER em agosto de 2026](https://www.gov.br/inpe/pt-br/assuntos/ultimas-noticias/governo-federal-apresenta-dados-que-indicam-reducao-do-desmatamento-nos-biomas-brasileiros/): `direct`; consulta 2026-10-16; verificação direta 2026-10-16. Atualidade da distinção funcional. Nenhuma taxa ou área nova da notícia foi inserida nas bases.
- [Decreto nº 6.666/2008, redação com alterações de 2025](https://planalto.gov.br/ccivil_03/_ato2007-2010/2008/decreto/d6666.htm): `direct`; consulta 2026-10-16; verificação direta 2026-10-16. Definição e finalidade. Não foi criada exposição jurídica nova na teoria.
- [NASA Earth Observatory — Rio de Janeiro: A Changing City](https://science.nasa.gov/earth/earth-observatory/rio-de-janeiro-a-changing-city-88103/): `direct`; consulta 2026-10-16; verificação direta 2026-10-16. Datas, sensores e contexto do par histórico. Não representa cobertura atual do Rio em 2026.
- [MEC — BNCC, Geografia do Ensino Fundamental](https://basenacionalcomum.mec.gov.br/images/BNCC_20dez_site.pdf): `indexed-excerpt`; consulta 2026-10-16; verificação direta não concluída. Apoio parcial à lista de princípios. Não é auditoria completa da BNCC, do Ensino Médio ou do DCEPA.
- [FGV/SEPLAD/SEDUC-PA — C-223, edital consolidado](https://conhecimento.fgv.br/sites/default/files/concursos/edital-consolidado-01.10-minuta.pdf): `direct`; consulta 2026-10-16; verificação direta 2026-10-16. Presença dos tópicos de Cartografia e formato do perfil. Não comprova frequência histórica de cobrança ou dificuldade dos itens autorais.
- [FGV — página de acompanhamento do concurso SEDUC-PA 2026](https://conhecimento.fgv.br/concursos/seducpa26): `direct`; consulta 2026-10-16; verificação direta 2026-10-16. Identificação da versão consultada. Retificações posteriores exigem revisão.
- [USGS — Landsat Normalized Difference Vegetation Index](https://www.usgs.gov/landsat-missions/landsat-normalized-difference-vegetation-index): `direct`; consulta 2026-10-16; verificação direta 2026-10-16. Cálculo e significado geral do índice; não autoriza inferência de espécie, situação jurídica ou biomassa exata.

Metadados completos, datas de referência, recursos afetados e gatilhos de revisão estão em `content.json`. Datas hipotéticas de exercícios não foram transformadas em dados reais atualizados.

## Decisão do lote

**Não promover esta versão automaticamente.** Resolver os achados impeditivos, registrar revisão humana do conjunto e dos itens e vincular a aprovação ao conteúdo efetivamente revisado. Preservar esta versão antes de qualquer alteração editorial relevante.

Procedência integral em `provenance.json`; revisão estruturada e propostas não aplicadas em `audit.json`. Não houve exclusão, resumo de teoria, troca de alternativa, gabarito ou perda de variante.
