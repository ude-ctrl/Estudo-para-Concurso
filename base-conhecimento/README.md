# Base de Conhecimento V6

**Estado atual:** quatro unidades possuem edição **`1.0.0`, `APROVADA_CANONICA`**. As três de Cartografia estão integradas e publicadas; `fundamentos-geografia` foi auditada e consolidada na branch `v6-base-fundamentos-geografia`, com consumo ainda desabilitado até sua integração. A [auditoria de Fundamentos](../MissaoAprovacaoGeo/V6_ISSUE13_FUNDAMENTOS_AUDITORIA.md) delimita a nova delegação, as fontes e a paridade. O estudante não precisa auditar arquivos manualmente.

A plataforma usa as bases de Cartografia aprovadas em lugar da extração editorial dos HTMLs. A [integração](../MissaoAprovacaoGeo/V6_ISSUE13_INTEGRACAO_CANONICA_CARTOGRAFIA.md) e o [contrato de revisão delegada](../MissaoAprovacaoGeo/V6_ISSUE13_CONTRATO_REVISAO_DELEGADA.md) identificam o parecer por IA, a autorização, a preservação do progresso e os limites desse primeiro lote. Sua publicação foi concluída no commit `3aa0509193a11d7d6f09ba916d125cc76afe5b79`; os relatos anteriores registram o estado de cada rodada.

Primeiro lote da [Issue #13](https://github.com/ude-ctrl/Estudo-para-Concurso/issues/13), autorizado após o [encerramento técnico com ressalva sensorial](../MissaoAprovacaoGeo/V6_FASE14_ENCERRAMENTO_TECNICO.md). Branch: `v6-base-canonica`.

As candidatas `0.1.0`, `0.1.1` e `0.1.2` permanecem preservadas com seus pareceres originais. O conteúdo pedagógico de `0.1.2` foi mantido na primeira edição aprovada. A revisão foi conduzida pelo Codex por delegação do usuário; os campos humanos não foram preenchidos ficticiamente e não há tarefa de auditoria manual imposta ao estudante.

## Ler o primeiro lote

| Unidade                     | Versão  | Parecer assistido e pendências                                                                                                                      |
| --------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cartografia-fundamentos`   | `1.0.0` | [Auditoria](cartografia/cartografia-fundamentos/1.0.0/audit.md) · [Questões](cartografia/cartografia-fundamentos/1.0.0/review.md)                   |
| `cartografia-representacao` | `1.0.0` | [Auditoria](cartografia/cartografia-representacao/1.0.0/audit.md) · [Questões](cartografia/cartografia-representacao/1.0.0/review.md)               |
| `geotecnologias`            | `1.0.0` | [Auditoria](cartografia/geotecnologias/1.0.0/audit.md) · [Questões](cartografia/geotecnologias/1.0.0/review.md)                                     |
| `fundamentos-geografia`     | `1.0.0` | [Auditoria](fundamentos/fundamentos-geografia/1.0.0/audit.md) · [Questões](fundamentos/fundamentos-geografia/1.0.0/review.md) · Integração pendente |

O [relatório de `0.1.2`](../MissaoAprovacaoGeo/V6_ISSUE13_CORRECOES_CARTOGRAFIA_012.md) registra 137 explicações aprimoradas em 44 questões, a reclassificação de r11 e o novo suporte cartográfico. O [relatório de `0.1.1`](../MissaoAprovacaoGeo/V6_ISSUE13_CORRECOES_CARTOGRAFIA_011.md) preserva as correções de vínculos, fontes, figuras e a estratégia de progresso. A [primeira integração operacional](../MissaoAprovacaoGeo/V6_ISSUE13_INTEGRACAO_CANONICA_CARTOGRAFIA.md) usa esses textos revisados.

O [manifesto](manifest.json) registra os 28 IDs definidos na documentação oficial. As quatro unidades acima têm auditoria e versão canônica; as outras 24 estão como `RASCUNHO`, sem conteúdo exportado ou auditado nesta etapa. `runtime_enabled` descreve consumo da base canônica, não disponibilidade dos materiais históricos no site.

## Contrato do pacote

Cada versão fica em `<módulo>/<unit_id>/<versão>/`, separando:

- `content.json`: conteúdo integral, suporte visual/editorial e metadados de escopo, fontes e temporalidade;
- `provenance.json`: originais e variantes de procedência, paridade, hashes e histórico anterior; não é conteúdo que deva competir com a unidade na navegação;
- `audit.json`: matriz Premium, conferência dos 12 itens autorais da unidade, achados e propostas não aplicadas;
- `audit.md`: parecer legível com decisões pendentes e sugestões;
- `changelog.md`: histórico da versão e classificação de futuras alterações.

As edições corrigidas também incluem `changes.md`, com comparação antes/depois, e `review.md`, com as questões completas para consulta. A procedência registra o hash do pacote pai e todas as diferenças editoriais; a validação rejeita diferenças não declaradas, perda de recursos e alteração de gabarito no contrato desta correção.

Em `0.1.2`, `review.md` é leitura de referência com as questões completas, sem atribuir ao estudante obrigação de auditoria. `assisted_review` identifica a autoria por IA, os 12 critérios e os hashes do conteúdo efetivamente revisado. O validador recusa conteúdo posterior divergente ou atribuição humana fictícia e percorre toda a cadeia de versões até o snapshot inicial. O mapa didático guarda suas coordenadas, escala gráfica, SVG e alternativa textual no próprio pacote.

O conteúdo preserva as 17 missões, 50 explicações, 39 recalls, 33 conceitos de apoio, 161 questões, 120 cartões, 256 V/F, seis discursivas e seis suplementos do piloto. As alternativas continuam vinculadas por ID. O suporte guarda também as quatro tabelas anteriores e a nova tabela do mapa, o perfil SVG, a precisão de faixa UTM e o roteiro/rubricas de prática anteriormente definidos na interface.

Fundamentos acrescenta uma base independente: 11 missões, 22 blocos teóricos, 27 conceitos, 48 questões (32 Fixação, 12 Concurso, quatro Elite), 45 cartões, 100 V/F, 11 recalls e duas discursivas. Os 228 vínculos de procedência e 139 alterações literais explícitas preservam a fonte sem usá-la novamente como base editorial. Nenhum gabarito antigo foi trocado. [Diferenças completas](fundamentos/fundamentos-geografia/1.0.0/changes.md) · [Paridade estruturada](../MissaoAprovacaoGeo/V6_ISSUE13_FUNDAMENTOS_PARIDADE.json).

As classificações `permanente`, `regional`, `banca` e `temporal` podem coexistir no mesmo recurso. São metadados editoriais iniciais, sujeitos à revisão, sem cortar passagens de um texto misto. Um dado normativo em um exemplo não transforma todo o conceito em informação volátil. Parâmetros hipotéticos de exercícios são separados de fatos observados; datas históricas de imagens não são atualizadas para o presente.

`checked_at` registra consulta/tentativa. `verified_at` só registra o alcance da verificação descrita. `indexed-excerpt` não equivale à leitura integral da fonte; quando isso impede conferir o fato completo, a respectiva afirmação temporal mantém `verified_at: null`. Datas de publicação desconhecidas não são preenchidas com o ano da consulta. As datas de revisão são critérios operacionais propostos, não prazos oficiais.

## Fronteira de aprovação

Estados da política: `RASCUNHO`, `EM_AUDITORIA`, `APROVADA_COM_RESSALVAS`, `APROVADA_CANONICA`, `REABRIR_POR_ATUALIZACAO`, `SUBSTITUIDA`.

Somente `APROVADA_CANONICA` pode ser fonte operacional. A aprovação deve identificar a versão revisada, resolver achados impeditivos, concluir os 12 critérios Premium, registrar decisões editoriais sobre os itens autorais e verificar os fatos temporais necessários. Aprovar o desenvolvimento da infraestrutura não aprova o conteúdo. O contrato admite parecer humano real ou revisão delegada por IA explícita, no escopo autorizado no manifesto.

O validador exige concordância entre conteúdo, inventário, procedência, classificação e revisão. O carregador `loadApprovedUnit()` exige também que a versão esteja registrada como canônica no manifesto. Trocar apenas o status ou habilitar consumo no catálogo não basta.

O parecer humano registra `kind: human`, responsável, data e evidência de aprovação, vinculados ao digest calculado por `reviewDigest()`. O digest cobre conteúdo, suporte, metadados, procedência e decisões da auditoria. Alterar esses dados após o parecer invalida o vínculo e exige nova revisão. Esse mecanismo detecta divergências; não autentica a identidade de alguém nem substitui controle de acesso ou assinatura digital.

A primeira aprovação real usa `editorial_approval.kind: delegated-ai`, contrato `delegated-content-review-v1`, responsável, autorização e digest integral. `assisted_review` cobre todos os recursos e os 12 critérios; cada item autoral possui uma decisão editorial por IA. Campos humanos continuam nulos/pendentes como registro honesto de uma revisão humana que não ocorreu. O manifesto delimita a delegação às três unidades. Trocar status, omitir decisão por item ou alterar o conteúdo após o parecer continua sendo rejeitado.

Não há comando que aprove automaticamente candidatas. Fixtures de aprovação humana nos testes continuam sintéticas e isoladas. As decisões reais de `1.0.0` estão documentadas como revisão delegada ao Codex, apoiadas na leitura e nas correções anteriores, sem certificação humana externa.

## Preservação e versionamento

O [registro do snapshot inicial](cartografia/baseline-piloto.json) fixa o commit `6906923`, a ordem e o hash do banco do piloto. A reconstrução feita com os três pacotes iniciais recupera exatamente esse banco, sem reler os HTMLs históricos. A checagem inicial considera aliases pelo destino canônico final; a missão original de cada procedência é preservada. Quatro aliases cruzam unidades e os três cabeçalhos históricos continuam no arquivo de procedência.

Depois de versionada, a edição inicial permanece rastreável. Uma revisão não sobrescreve o conteúdo aprovado para simplificar código: cria versão editorial e mantém a anterior. Patch corrige sem ampliar escopo; minor amplia de forma compatível; major reestrutura ou substitui. As propostas de `0.1.0` foram aplicadas explicitamente nas candidatas `0.1.1`, mantendo os valores anteriores. A decisão editorial delegada posterior está registrada separadamente em `1.0.0`.

O manifesto distingue `initial_snapshot_version`, `candidate_version` e `canonical_version`. A comparação com o piloto utiliza a versão inicial congelada; uma edição editorial futura não precisa reescrever o snapshot histórico. A primeira promoção deve gerar uma edição aprovada separada, preservando `0.1.0` como candidata inicial. Antes de qualquer promoção, conteúdo alterado deve ter procedência e parecer correspondentes à nova versão.

Uma nova candidata pode estar em auditoria enquanto a edição canônica anterior continua como fonte oficial válida. O carregador usa o ponteiro `canonical_version` e verifica a própria edição aprovada; não a substitui pela candidata nem confunde seus estados. Dados temporais vencidos da edição aprovada continuam sujeitos ao bloqueio e à revisão definidos no contrato.

O consumidor usa exclusivamente as bases aprovadas apontadas por `canonical_version`, com habilitação operacional explícita. Os caminhos de HTML em `provenance.json` servem à auditoria e não são instruções para reextrair ou reinterpretar conteúdo. A build de Cartografia não importa os extratores históricos. O importador da biblioteca continua preservando o acervo para os materiais ainda não migrados.

## Verificar

```sh
npm run check:canonical
npm run test:canonical
npm test
```

O primeiro comando valida as quatro edições aprovadas, suas cadeias de candidatas e a paridade inicial dos lotes registrados. Não promove versões. Os testes exercitam preservação, aliases, recursos visuais, dados temporais, revisão vinculada à versão, rejeição de candidatas e leitura sem dependência dos HTMLs/importadores. O comando `npm test` inclui as verificações anteriores do acervo e do motor, os testes do consumidor canônico e os 23 cenários específicos de Fundamentos. O [relatório de Fundamentos](../MissaoAprovacaoGeo/V6_ISSUE13_FUNDAMENTOS_TESTES.md) distingue validação de conteúdo e integração ainda não realizada.

O [relatório inicial de `0.1.0`](../MissaoAprovacaoGeo/V6_ISSUE13_RELATORIO_TESTES_CARTOGRAFIA.md) identifica o commit, os 82 testes e os limites daquela execução. A [rodada `0.1.1`](../MissaoAprovacaoGeo/V6_ISSUE13_TESTES_CARTOGRAFIA_011.md) passou com build e 93 testes, dos quais 30 verificam o contrato canônico, incluindo revisão declarada, preservação de gabaritos, famílias e alternativas aposentadas. Os 19 casos iniciais permanecem cobertos.

A [rodada `0.1.2`](../MissaoAprovacaoGeo/V6_ISSUE13_TESTES_CARTOGRAFIA_012.md) passou com build e 101 testes, incluindo 38 canônicos. Foram conferidos também 25 recálculos e quatro cenários isolados da figura no navegador, executáveis por `npm run test:canonical-media`. Esse comando valida mídia candidata com o CSS real, sem integrar candidatas à plataforma. Requer um Chromium instalado pelo Playwright ou indicado em `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

Não existe sincronização de progresso entre dispositivos nesta estrutura. As bases contêm conteúdo e decisões editoriais, sem respostas ou dados pessoais. O consumidor preserva o progresso local, identifica versões em evidências, arquiva integralmente os erros afetados por associação corrigida, mantém a alternativa aposentada sem remapeá-la e aplica famílias à novidade/diversidade. Atualização e importação não concedem XP ou evidência nova de aprendizagem; a estimativa atual considera apenas evidências compatíveis e as classificações canônicas.
