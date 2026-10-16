# V6 — Cartografia: correções editoriais candidatas 0.1.1

Data: 16/10/2026, America/Sao_Paulo. Branch: `v6-base-canonica`.
Versão de origem preservada: `0.1.0`, commit `02151ebe08a98705bd2ec46931d84534d029c4c3`.

## Resultado e autorização

O usuário autorizou esta rodada no chat com “Está ok”, após a proposta de corrigir vínculos e feedbacks, rever dez classificações, esclarecer recursos visuais e concluir a conferência das fontes e créditos pendentes. Essa autorização permite preparar a candidata corrigida; não constitui aprovação editorial Premium.

Foram preparadas as três edições **`0.1.1`, todas `EM_AUDITORIA`**. O manifesto aponta para essas candidatas e mantém `0.1.0` como snapshot inicial. Nenhuma unidade possui versão canônica ativa ou consumo habilitado pelo site. A [política oficial](https://github.com/ude-ctrl/Estudo-para-Concurso/blob/v6-planejamento/MissaoAprovacaoGeo/V6_POLITICA_BASE_CANONICA_CONTEUDO.md) continua aplicável.

A [verificação técnica da rodada](V6_ISSUE13_TESTES_CARTOGRAFIA_011.md) passou com build e **93 testes**, incluindo preservação das duas edições e recusa de mudanças editoriais sem declaração. Isso não constitui aprovação humana de conteúdo.

O material corrigido foi derivado exclusivamente das bases estruturadas `0.1.0`, sem reextrair ou reinterpretar os HTMLs históricos. O banco ativo, a aplicação, o progresso e as demais 25 unidades do catálogo não foram migrados nesta rodada. Os arquivos `0.1.0` permanecem integralmente preservados.

## Pacotes para revisão

| Unidade | Parecer atualizado | Antes/depois | Questões completas para revisão |
| --- | --- | --- | --- |
| Fundamentos | [Auditoria](../base-conhecimento/cartografia/cartografia-fundamentos/0.1.1/audit.md) | [Mudanças](../base-conhecimento/cartografia/cartografia-fundamentos/0.1.1/changes.md) | [12 autorais + 3 legadas corrigidas](../base-conhecimento/cartografia/cartografia-fundamentos/0.1.1/review.md) |
| Representação | [Auditoria](../base-conhecimento/cartografia/cartografia-representacao/0.1.1/audit.md) | [Mudanças](../base-conhecimento/cartografia/cartografia-representacao/0.1.1/changes.md) | [12 autorais + 1 legada corrigida](../base-conhecimento/cartografia/cartografia-representacao/0.1.1/review.md) |
| Geotecnologias | [Auditoria](../base-conhecimento/cartografia/geotecnologias/0.1.1/audit.md) | [Mudanças](../base-conhecimento/cartografia/geotecnologias/0.1.1/changes.md) | [12 autorais + 1 legada corrigida](../base-conhecimento/cartografia/geotecnologias/0.1.1/review.md) |

Cada pacote separa conteúdo, procedência, auditoria, histórico, comparação editorial e roteiro de revisão. Os pareceres humanos permanecem vazios e as decisões dos 36 itens autorais continuam pendentes. As cinco questões legadas com feedback/distrator revisados também ficam explicitamente pendentes de revisão humana.

Os roteiros de questões facilitam a revisão dos itens. A decisão Premium deve cobrir também teoria, recalls, cartões, V/F, discursivas, suplementos e os 12 critérios do conjunto de cada unidade.

## Correções aplicadas nas candidatas

| Achado | Tratamento |
| --- | --- |
| 12 vínculos de conceito/missão | Aplicadas as propostas rastreadas da auditoria inicial: dez em Fundamentos, uma em Representação e uma em Geotecnologias. Os valores anteriores continuam registrados |
| Feedbacks inadequados em cinco questões legadas | Reescritas as 20 explicações por alternativa para tratar a operação ou o conceito realmente cobrado, incluindo o feedback da resposta correta |
| Distrator redundante em GMS | `−42,30°` foi substituído por `−42,05°`, que representa dividir minutos por 600. Gabarito `−42,5°` preservado. A alternativa nova recebeu ID próprio |
| Dez classificações de dificuldade/cognição | Reavaliação editorial segundo a [taxonomia da Fase 6](V6_BANCO_QUESTOES_FASE6.md). Cinco itens passam de Elite para Concurso; os outros cinco mantêm Concurso com classificação cognitiva ajustada |
| Cinco famílias próximas | Relações explícitas entre dez questões, com vínculo nos dois sentidos. As formulações são preservadas e não devem ser interpretadas como evidências independentes de novidade |
| Perfil topográfico | Enunciado, legenda e nota esclarecem que a figura é esquema sem escala. SVG, tabela, números e gabarito permanecem intactos |
| Questão Landsat `v6-q-g10` | Par histórico vinculado à própria questão, com datas, sensores, créditos e transcrição textual de apoio, sem exigir navegação anterior na teoria |
| Afirmações sem prova identificada sobre cobrança FGV | Orientações e exemplos passam a ser identificados como autorais. O conteúdo conceitual e as operações são preservados; não foi inventada prova, ano ou questão oficial |
| Créditos de mídia | Identificados autores, páginas dos arquivos, licença/declaração e condições de uso pertinentes. As legendas passam a fornecer a procedência específica |
| Referências históricas a “Auditoria Premium concluída” | Metadados de apresentação distinguem o rótulo histórico da aprovação atual. Fontes originais preservadas para auditoria |

As explicações conceituais não foram encurtadas para adequação ao código. As alterações de teoria qualificam autoria, orientação de estudo, créditos e condições de leitura dos recursos. Os valores anteriores e posteriores de cada campo alterado constam em `provenance.json#revision.changes` e, para conteúdo/suporte, em `changes.md`.

Os achados tratados receberam estado `addressed-pending-human-review`, com resolução assistida descrita. Esse estado não simula encerramento humano: permanece impeditivo de promoção até a validação correspondente.

## Inventário e nível de cobrança

O inventário pedagógico conserva 17 missões, 50 explicações, 39 recalls, 33 conceitos, 161 questões, 120 cartões, 256 V/F, seis discursivas e seis suplementos. Há 691 identidades de recurso e 685 registros de procedência, incluindo variantes e contextos. Os sete registros editoriais históricos e os quatro aliases entre unidades foram preservados.

| Unidade | Fixação | Concurso | Elite | Total de questões |
| --- | ---: | ---: | ---: | ---: |
| Fundamentos | 48 | 8 | 4 | 60 |
| Representação | 37 | 9 | 3 | 49 |
| Geotecnologias | 40 | 6 | 6 | 52 |
| Total da candidata `0.1.1` | **125** | **23** | **13** | **161** |
| Total preservado de `0.1.0` | **125** | **18** | **18** | **161** |

Os itens `v6-q-f08`, `v6-q-f12`, `v6-q-r07`, `v6-q-r08` e `v6-q-r10` passam para Concurso, D2, com C2 ou C3 conforme a operação predominante. Seus enunciados, alternativas e gabaritos permanecem iguais. Os demais cinco reavaliados são `f05`, `r03`, `r05`, `g03` e `g05`, todos mantidos em Concurso/D2 e ajustados para C3.

Essas classificações são editoriais, sem calibração psicométrica ou dados de candidatos. A quantidade menor de Elite é uma consequência explícita da revisão. Não se adicionaram itens para preencher artificialmente o estoque. O banco ativo do piloto continua com a composição anterior, e a prova oficial completa continua bloqueada por estoque aprovado insuficiente. A nova candidata não aumenta o estoque aprovado.

## Fontes e mídias

- [Observatório Nacional — tabela dos estados](https://www.gov.br/observatorio/pt-br/assuntos/areas-de-atuacao/tempo-e-frequencia/brasil): consulta direta da tabela publicada em 06/10/2026, especialmente Pará UTC−3. A linha resumida do Amazonas não substitui a [delimitação legal de sua parte ocidental](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12876.htm). A base combina essas fontes e o registro anterior dos quatro deslocamentos nacionais.
- [MEC — BNCC, edição completa de 2018](https://basenacionalcomum.mec.gov.br/images/BNCC_EI_EF_110518_versaofinal_site.pdf): conferência direta do Quadro 1, página impressa 360, índice PDF 361. Confirmados os sete princípios no recorte de Geografia do Ensino Fundamental. Essa consulta não equivale a auditoria integral da BNCC ou do DCEPA.
- [FGDC — definição de UTM, seção 4.1.2.2.2](https://www.fgdc.gov/csdgmgraphical/spref/horiz/planar/gridsys/utm.htm): conferência direta da faixa 80°S–84°N. O endpoint USGS anteriormente parcial continua preservado como histórico, com `verified_at: null`; a nova conferência não é atribuída a uma abertura inexistente desse endpoint.
- [Mercator-proj.png](https://commons.wikimedia.org/wiki/File:Mercator-proj.png): versão modificada por Jecowa, com origem indicada na Wikipédia em alemão; CC BY-SA 3.0. A fonte e o link da licença acompanham a imagem.
- [Gall-peters.png](https://commons.wikimedia.org/wiki/File:Gall-peters.png): derivação por Louis Waweru, a partir de Gall-peters.jpg, com procedência Mdf/imagem NASA e declaração de domínio público na página específica do arquivo.
- [NASA — Rio de Janeiro: A Changing City](https://science.nasa.gov/earth/earth-observatory/rio-de-janeiro-a-changing-city-88103/): imagens por Jesse Allen com dados USGS; artigo de Adam Voiland. As cenas são de 19/09/1984, Landsat 5/TM, e 25/09/2015, Landsat 8/OLI. Foram consultadas as [diretrizes de uso educacional/informativo](https://www.nasa.gov/nasa-brand-center/images-and-media/). Questões e comentários são autoria do projeto, sem atribuir sua aprovação à NASA.

As datas históricas das cenas não foram atualizadas para o presente. Não se acrescentaram estatísticas anuais, levantamentos territoriais ou fatos de atualidades fora do escopo da correção.

Os 11 registros temporais do conjunto agora têm conferência delimitada registrada. O conjunto de fontes mantém um endpoint histórico USGS de acesso parcial, substituído para a comprovação da faixa UTM pela fonte primária FGDC. Uma fonte histórica conservada não é apresentada como recém-verificada.

**Limitação remanescente de mídia:** não foi possível abrir o PDF cartográfico do IBGE. A navegação retornou falha de acesso e o ambiente de execução bloqueou requisições no proxy com 403. Isso não comprova que o link esteja quebrado. A configuração civil textual está sustentada pelo ON e pela lei; grade, escala e outros elementos do PDF ainda exigem conferência. O achado `CAN-MIDIA-IBGE-001` impede a promoção de Fundamentos até ser resolvido.

O download binário das duas imagens Wikimedia e das duas cenas NASA também foi bloqueado no proxy. Páginas de descrição, artigo, datas e créditos tiveram consulta direta, mas não se declara nova inspeção visual, integridade binária ou teste de carregamento das imagens no navegador. Os URLs originais permanecem preservados, sem edição de imagens nesta rodada.

## Rastreabilidade e estratégia de progresso

Cada edição possui o hash do pacote pai e uma lista completa de diferenças, com caminho, existência, valor anterior, valor novo, recurso e justificativa. O validador compara essa lista à diferença real entre as versões. A reconstrução exata do banco histórico continua usando somente as edições iniciais congeladas.

Os 161 IDs de questão, os IDs de suas respostas corretas e os respectivos textos corretos são preservados. A exceção de identidade é uma alternativa incorreta de GMS:

- Aposentada nesta edição: `v6-fix-ae06798f90e822d3-ofb7693d282`, texto `−42,30°`.
- Nova: `v6-fix-ae06798f90e822d3-o-gms-divisor-600`, texto `−42,05°`.
- O registro de transição contém `progress_mapping: null`. Escolher a alternativa antiga não significa ter escolhido a nova.

Antes da futura integração ao produto:

1. Guardar evidências com `item_id` e versão editorial. Históricos anteriores devem continuar associados à edição do piloto que os originou, com cópia bruta preservada.
2. Manter respostas e erros antigos com seus conceitos/missões originais. As 12 correções não autorizam atribuir retroativamente sucesso, domínio ou erro a outro conceito.
3. Tratar novos agrupamentos por família na novidade e diversidade das evidências. Duas formulações da mesma família não devem aumentar artificialmente a confiança de domínio.
4. Conservar a alternativa aposentada no histórico da edição antiga. Não converter seu ID para a alternativa nova nem alterar a resposta registrada.
5. Preservar XP, agenda e conquistas existentes; não premiar novamente a simples atualização da base. Recuperação na edição nova deve ser registrada como atividade real.
6. Validar o adaptador, a persistência por versão e a apresentação dos novos recursos antes de habilitar consumo da base aprovada.

Essa estratégia é um contrato de integração. Nenhum progresso real ou formato de persistência foi migrado agora. A aplicação atual ainda não consome famílias, versões de item ou o novo tipo de par de imagens da candidata.

## Pendências para a decisão humana

O parecer deve identificar a unidade e versão efetivamente revisadas, resolver ou aceitar justificadamente os achados, concluir os 12 critérios Premium e vincular sua decisão ao digest do pacote final. Os roteiros de revisão trazem as 36 questões autorais e cinco legadas alteradas, com alternativas e feedbacks completos.

Continuam pendentes a aprovação editorial humana do conjunto e dos itens, a conferência gráfica do PDF IBGE e a verificação visual das mídias no contexto de apresentação. O roteiro de prática compartilhado de escala continua como limitação de escopo documentada; não foram inventadas três práticas já implementadas.

Não houve promoção canônica, migração de outros módulos, merge, publicação ou mudança das regras de XP/domínio nesta rodada. A ressalva sensorial registrada no encerramento do piloto permanece com seu próprio histórico e não se transforma em aprovação editorial.
