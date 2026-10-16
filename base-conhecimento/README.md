# Base de Conhecimento V6

Primeiro lote da [Issue #13](https://github.com/ude-ctrl/Estudo-para-Concurso/issues/13), autorizado após o [encerramento técnico com ressalva sensorial](../MissaoAprovacaoGeo/V6_FASE14_ENCERRAMENTO_TECNICO.md). Branch: `v6-base-canonica`.

**As três versões presentes são candidatas `EM_AUDITORIA`. Nenhuma é fonte canônica aprovada e nenhuma está conectada à build do site.** Os 36 itens autorais permanecem pendentes de revisão humana. Não houve alteração do conteúdo usado pelo estudante.

## Ler o primeiro lote

| Unidade | Versão | Parecer assistido e pendências |
| --- | --- | --- |
| `cartografia-fundamentos` | `0.1.0` | [Auditoria](cartografia/cartografia-fundamentos/0.1.0/audit.md) |
| `cartografia-representacao` | `0.1.0` | [Auditoria](cartografia/cartografia-representacao/0.1.0/audit.md) |
| `geotecnologias` | `0.1.0` | [Auditoria](cartografia/geotecnologias/0.1.0/audit.md) |

O [manifesto](manifest.json) registra os 28 IDs definidos na documentação oficial. Somente as três unidades acima têm auditoria iniciada e versão candidata; as outras 25 estão como `RASCUNHO`, sem conteúdo exportado ou auditado nesta etapa. `runtime_enabled` descreve consumo da base canônica, não disponibilidade dos materiais históricos no site.

## Contrato do pacote

Cada versão fica em `<módulo>/<unit_id>/<versão>/`, separando:

- `content.json`: conteúdo integral, suporte visual/editorial e metadados de escopo, fontes e temporalidade;
- `provenance.json`: originais e variantes de procedência, paridade, hashes e histórico anterior; não é conteúdo que deva competir com a unidade na navegação;
- `audit.json`: matriz Premium, conferência dos 12 itens autorais da unidade, achados e propostas não aplicadas;
- `audit.md`: parecer legível com decisões pendentes e sugestões;
- `changelog.md`: histórico da versão e classificação de futuras alterações.

O conteúdo preserva as 17 missões, 50 explicações, 39 recalls, 33 conceitos de apoio, 161 questões, 120 cartões, 256 V/F, seis discursivas e seis suplementos do piloto. As alternativas continuam vinculadas por ID. O suporte guarda também as quatro tabelas, o perfil SVG, a precisão de faixa UTM e o roteiro/rubricas de prática anteriormente definidos na interface.

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

Depois de versionada, a edição inicial permanece rastreável. Uma revisão não sobrescreve o conteúdo aprovado para simplificar código: cria versão editorial e mantém a anterior. Patch corrige sem ampliar escopo; minor amplia de forma compatível; major reestrutura ou substitui. As propostas presentes em `audit.json` ainda não foram aplicadas.

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

O [relatório desta execução](../MissaoAprovacaoGeo/V6_ISSUE13_RELATORIO_TESTES_CARTOGRAFIA.md) identifica o commit, os 82 testes aprovados, a build e os limites da evidência. Os 19 novos testes também verificam identidade unidade/versão, paridade duplicada e convivência entre versão aprovada e candidata futura.

Não existe sincronização de progresso nesta estrutura. Os arquivos contêm conteúdo e decisões editoriais; não contêm respostas, agenda, XP ou dados pessoais do estudante. Eventuais correções de associação conceito/missão exigirão uma estratégia explícita para históricos existentes quando forem integradas ao produto.
