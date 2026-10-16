# Base de Conhecimento V6

**Encaminhamento atual:** o usuário delegou a auditoria e a revisão ao assistente. A [revisão integral de Cartografia por IA](../MissaoAprovacaoGeo/V6_ISSUE13_REVISAO_DELEGADA_CARTOGRAFIA.md) registra leitura, recálculos, fontes, testes e melhorias a cargo do Codex. Não é necessário pedir ao usuário que leia questões no GitHub para a conferência editorial avançar. Este parecer não simula os registros humanos exigidos pelo contrato de promoção descrito adiante e não modifica o consumo do site.

Primeiro lote da [Issue #13](https://github.com/ude-ctrl/Estudo-para-Concurso/issues/13), autorizado após o [encerramento técnico com ressalva sensorial](../MissaoAprovacaoGeo/V6_FASE14_ENCERRAMENTO_TECNICO.md). Branch: `v6-base-canonica`.

**As três candidatas atuais são `0.1.2`, todas `EM_AUDITORIA`; as edições `0.1.0` e `0.1.1` estão preservadas. Nenhuma está conectada à build do site.** A revisão por IA foi conduzida pelo assistente e está vinculada aos recursos em `audit.json#assisted_review`. Os campos humanos do contrato anterior permanecem sem preenchimento fictício; não foi criada uma tarefa de leitura manual para o estudante. Não houve alteração do conteúdo publicado no site.

## Ler o primeiro lote

| Unidade | Versão | Parecer assistido e pendências |
| --- | --- | --- |
| `cartografia-fundamentos` | `0.1.2` | [Auditoria](cartografia/cartografia-fundamentos/0.1.2/audit.md) · [Questões](cartografia/cartografia-fundamentos/0.1.2/review.md) |
| `cartografia-representacao` | `0.1.2` | [Auditoria](cartografia/cartografia-representacao/0.1.2/audit.md) · [Questões](cartografia/cartografia-representacao/0.1.2/review.md) |
| `geotecnologias` | `0.1.2` | [Auditoria](cartografia/geotecnologias/0.1.2/audit.md) · [Questões](cartografia/geotecnologias/0.1.2/review.md) |

O [relatório atual, `0.1.2`](../MissaoAprovacaoGeo/V6_ISSUE13_CORRECOES_CARTOGRAFIA_012.md), registra 137 explicações aprimoradas em 44 questões, a reclassificação de r11 e o novo suporte cartográfico. O [relatório anterior, `0.1.1`](../MissaoAprovacaoGeo/V6_ISSUE13_CORRECOES_CARTOGRAFIA_011.md), preserva as correções de vínculos, fontes, figuras e a estratégia de progresso.

O [manifesto](manifest.json) registra os 28 IDs definidos na documentação oficial. Somente as três unidades acima têm auditoria iniciada e versão candidata; as outras 25 estão como `RASCUNHO`, sem conteúdo exportado ou auditado nesta etapa. `runtime_enabled` descreve consumo da base canônica, não disponibilidade dos materiais históricos no site.

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

As classificações `permanente`, `regional`, `banca` e `temporal` podem coexistir no mesmo recurso. São metadados editoriais iniciais, sujeitos à revisão, sem cortar passagens de um texto misto. Um dado normativo em um exemplo não transforma todo o conceito em informação volátil. Parâmetros hipotéticos de exercícios são separados de fatos observados; datas históricas de imagens não são atualizadas para o presente.

`checked_at` registra consulta/tentativa. `verified_at` só registra o alcance da verificação descrita. `indexed-excerpt` não equivale à leitura integral da fonte; quando isso impede conferir o fato completo, a respectiva afirmação temporal mantém `verified_at: null`. Datas de publicação desconhecidas não são preenchidas com o ano da consulta. As datas de revisão são critérios operacionais propostos, não prazos oficiais.

## Fronteira de aprovação

Estados da política: `RASCUNHO`, `EM_AUDITORIA`, `APROVADA_COM_RESSALVAS`, `APROVADA_CANONICA`, `REABRIR_POR_ATUALIZACAO`, `SUBSTITUIDA`.

Somente `APROVADA_CANONICA` pode ser fonte operacional. A aprovação deve identificar a versão revisada, resolver achados impeditivos, concluir os 12 critérios Premium, registrar decisões humanas sobre os itens autorais e verificar os fatos temporais necessários. Aprovar o desenvolvimento da infraestrutura não aprova o conteúdo.

O validador exige concordância entre conteúdo, inventário, procedência, classificação e revisão. O carregador `loadApprovedUnit()` exige também que a versão esteja registrada como canônica no manifesto. Trocar apenas o status ou habilitar consumo no catálogo não basta.

O parecer humano registra `kind: human`, responsável, data e evidência de aprovação, vinculados ao digest calculado por `reviewDigest()`. O digest cobre conteúdo, suporte, metadados, procedência e decisões da auditoria. Alterar esses dados após o parecer invalida o vínculo e exige nova revisão. Esse mecanismo detecta divergências; não autentica a identidade de alguém nem substitui controle de acesso ou assinatura digital.

Não há comando que aprove automaticamente as candidatas. As aprovações usadas em testes são dados sintéticos em memória ou cópias temporárias isoladas, sem efeitos nas bases reais ou no produto. Todas as decisões reais deste lote continuam pendentes.

## Preservação e versionamento

O [registro do snapshot inicial](cartografia/baseline-piloto.json) fixa o commit `6906923`, a ordem e o hash do banco do piloto. A reconstrução feita com os três pacotes iniciais recupera exatamente esse banco, sem reler os HTMLs históricos. A checagem inicial considera aliases pelo destino canônico final; a missão original de cada procedência é preservada. Quatro aliases cruzam unidades e os três cabeçalhos históricos continuam no arquivo de procedência.

Depois de versionada, a edição inicial permanece rastreável. Uma revisão não sobrescreve o conteúdo aprovado para simplificar código: cria versão editorial e mantém a anterior. Patch corrige sem ampliar escopo; minor amplia de forma compatível; major reestrutura ou substitui. As propostas de `0.1.0` foram aplicadas explicitamente nas candidatas `0.1.1`, mantendo os valores anteriores e a decisão humana pendente.

O manifesto distingue `initial_snapshot_version`, `candidate_version` e `canonical_version`. A comparação com o piloto utiliza a versão inicial congelada; uma edição editorial futura não precisa reescrever o snapshot histórico. A primeira promoção deve gerar uma edição aprovada separada, preservando `0.1.0` como candidata inicial. Antes de qualquer promoção, conteúdo alterado deve ter procedência e parecer correspondentes à nova versão.

Uma nova candidata pode estar em auditoria enquanto a edição canônica anterior continua como fonte oficial válida. O carregador usa o ponteiro `canonical_version` e verifica a própria edição aprovada; não a substitui pela candidata nem confunde seus estados. Dados temporais vencidos da edição aprovada continuam sujeitos ao bloqueio e à revisão definidos no contrato.

Quando houver aprovação canônica, o consumidor deve usar a base aprovada. Os caminhos de HTML em `provenance.json` servem à auditoria e não são instruções para reextrair ou reinterpretar o conteúdo. A build atual do piloto permanece na estratégia anterior até a etapa de integração da base aprovada.

## Verificar

```sh
npm run check:canonical
npm run test:canonical
npm test
```

O primeiro comando valida as três candidatas e sua paridade inicial. Não promove versões. Os testes exercitam preservação, aliases, recursos visuais, dados temporais, revisão vinculada à versão, rejeição de candidatas e leitura sem dependência dos HTMLs/importadores. O comando `npm test` inclui as verificações anteriores do acervo e do motor.

O [relatório inicial de `0.1.0`](../MissaoAprovacaoGeo/V6_ISSUE13_RELATORIO_TESTES_CARTOGRAFIA.md) identifica o commit, os 82 testes e os limites daquela execução. A [rodada `0.1.1`](../MissaoAprovacaoGeo/V6_ISSUE13_TESTES_CARTOGRAFIA_011.md) passou com build e 93 testes, dos quais 30 verificam o contrato canônico, incluindo revisão declarada, preservação de gabaritos, famílias e alternativas aposentadas. Os 19 casos iniciais permanecem cobertos.

A [rodada `0.1.2`](../MissaoAprovacaoGeo/V6_ISSUE13_TESTES_CARTOGRAFIA_012.md) passou com build e 101 testes, incluindo 38 canônicos. Foram conferidos também 25 recálculos e quatro cenários isolados da figura no navegador, executáveis por `npm run test:canonical-media`. Esse comando valida mídia candidata com o CSS real, sem integrar candidatas à plataforma. Requer um Chromium instalado pelo Playwright ou indicado em `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

Não existe sincronização de progresso nesta estrutura. Os arquivos contêm conteúdo e decisões editoriais; não contêm respostas, agenda, XP ou dados pessoais do estudante. Eventuais correções de associação conceito/missão exigirão uma estratégia explícita para históricos existentes quando forem integradas ao produto.
