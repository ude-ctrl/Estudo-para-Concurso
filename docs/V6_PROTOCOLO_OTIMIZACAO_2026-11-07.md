# V6 — Protocolo operacional de eficiência e qualidade (07/11/2026)

**Estado:** protocolo de 07/11/2026 adotado pelo usuário como instrução permanente em 11/11/2026. A consolidação documental está na branch `docs/v6-instrucoes-permanentes-2026-11-11`, derivada de `docs/v6-protocolo-otimizacao-2026-11-07` (`f5730e1`). Merge e publicação não foram autorizados nesta tarefa. **Não altera automaticamente código, CI, conteúdo ou site publicado.**

Entrada permanente do repositório: [AGENTS.md](../AGENTS.md). Este arquivo reúne o protocolo e o único resumo operacional de continuidade; relatórios antigos continuam como evidências datadas, não como retratos automaticamente atuais.

## Objetivo vinculante
Acelerar o Missão Aprovação V6, reduzir tokens e retrabalho **sem baixar o rigor científico, pedagógico, funcional, de acessibilidade ou de preservação de dados**. Qualidade > quantidade. A Base Canônica aprovada é a fonte editorial oficial; HTML histórico permanece íntegro. Não inventar percentuais de economia nem desempenho.

## Evidências revisadas
- `V6_PLANO_MESTRE.md`: migração modular, piloto antes de escala, Auditoria Premium para aprovação de cada unidade, feedback universal e fonte de verdade.
- `V6_ISSUE13_INTEGRACAO_CANONICA_CARTOGRAFIA.md`: Cartografia promovida à Base Canônica; a aprovação editorial é delegada ao Codex, não certificação externa.
- `V6_FUNDAMENTOS_INTEGRACAO.md`: Fundamentos integrados, 228 vínculos de procedência preservados, migração legada voluntária.
- `V6_ATUALIZACAO_ENTRADA_2026_11_04.md`: execução completa de 218 cenários Playwright em 6,1 minutos e 133 testes de conteúdo/armazenamento/lógica; correções específicas de suíte; nenhum merge naquele momento.
- `package.json`: `npm run build` executa importação, build V6, TypeScript e Vite; `npm test` encadeia múltiplas suítes; `npm run test:e2e` invoca Playwright. Estes são comandos atuais, **não** uma nova automação implementada.
- Commits recentes de 05–06/11: entrada única, Fundamentos V6 e prévia de leitura de Climatologia V6. O status de cada entrega deve ser confirmado no commit/PR/CI atual antes de afirmar publicação.

## Diagnóstico
**Confirmado:** projeto possui documentação longa, múltiplas suítes e diversas etapas editoriais distintas; algumas rodadas executaram regressão completa. **Hipótese ainda não medida:** reabrir instruções integrais, auditar escopo amplo e executar suítes extensas em tarefas pequenas aumenta tokens e latência. Não atribuir causa exata nem economia mensurável sem medir.

## Regras operacionais (a partir dos próximos trabalhos)
1. **Tarefa curta e verificável:** cada ticket declara objetivo, artefatos afetados, riscos, critérios de aceite e exclusões. Evitar pedidos como “revisar tudo” para mudanças localizadas.
2. **Contexto mínimo suficiente:** na primeira aplicação, ler este protocolo integralmente; nas tarefas seguintes, reutilizar o contexto conferido e consultar seu diff, o registro de estado, a tarefa e somente os contratos/arquivos impactados. Se o contexto estiver ausente ou desatualizado, recuperar as partes necessárias. Expandir leitura quando dependências, riscos ou falhas comprovadas exigirem. Nunca omitir leitura obrigatória de segurança/contrato aplicável.
3. **Sem reauditoria cega:** Base Canônica aprovada continua válida se conteúdo e contrato não mudaram. Mudança editorial de teoria, gabarito, explicação, fonte crítica ou classificação exige delta versionado, procedência e revisão dirigida; mudanças generalizadas exigem Auditoria Premium da unidade.
4. **Matriz de testes por risco:**
   - **Documentação isolada:** conferir links, consistência e diff; sem build pesada quando comprovadamente desnecessária.
   - **Visual isolado:** testes do componente e fluxos visuais/teclado/mobile afetados; sem auditoria científica integral, salvo conteúdo alterado.
   - **Lógica local:** testes unitários e integração diretamente afetada; build/typecheck quando houver alteração de código.
   - **Conteúdo/gabarito/fonte:** validação canônica, paridade, justificativas, regressão de respostas e vínculos; exigir revisão científica rastreável.
   - **Persistência, migração, IDs, scheduler, caderno de erros, provas, roteamento, dependências ou deploy:** testes amplos de integridade, recuperação, cenários de navegador pertinentes e regressão completa quando necessário.
   - **Merge/release/homologação de módulo:** build, suíte automatizada integral aplicável, acessibilidade, mobile, persistência e Auditoria Premium pedagógica/funcional conforme escopo.
5. **Não confundir otimização com pular testes:** falha desconhecida, alteração transversal ou risco alto eleva imediatamente o nível de verificação.
6. **Saída enxuta do Codex:** resumo do delta; arquivos alterados; evidências e comandos com resultado; riscos/resíduos; próxima ação. Evitar repetir documentos integrais no chat.
7. **Controle explícito de custo:** registrar por tarefa duração observada, número de arquivos lidos/modificados, comandos e tempos disponíveis, iterações de correção e uso de tokens **somente se a ferramenta expuser dados confiáveis**. Fazer comparação após 3–5 tarefas equivalentes; sem percentuais inventados.
8. **Fluxo Git:** trabalho em branch por entrega, PR pequeno, sem push direto na `main` nem deploy automático sem autorização aplicável. Distinguir aprovado tecnicamente, auditado por IA, homologado pelo usuário, mergeado e publicado.
9. **Progresso e conteúdo:** nunca apagar 31 HTMLs históricos; preservar IDs, dados e migrações. Progresso, acerto, retenção e domínio estimado são métricas distintas.
10. **Fonte temporal:** revalidar dados com prazo ou risco de desatualização quando necessários; não renovar datas ficticiamente.
11. **Comunicação didática:** explicar ao proprietário do projeto o que foi feito, por quê, como conferir e o próximo passo; pedir intervenção humana só quando realmente necessária.
12. **Escopo congelado:** não reabrir decisões aprovadas ou mudar UX/arquitetura por preferência do implementador. Reabrir somente por evidência de erro, risco, necessidade do edital ou pedido explícito.

## Formato padrão de tarefa (copiar)
- **Objetivo:** uma entrega concreta.
- **Estado-base:** branch/commit e unidades canônicas relevantes.
- **Modelo recomendado:** opção disponível e justificativa; recomendação não equivale a troca efetiva de modelo.
- **Arquivos/contratos necessários:** caminho exato e motivo.
- **Não mexer:** histórico, módulos fora do escopo, persistência sem migração.
- **Critérios de aceite:** comportamento, precisão, acessibilidade e preservação.
- **Testes por risco:** comandos direcionados e gatilho para regressão integral.
- **Saída:** delta + evidências + pendências + recomendação de merge.
- **Parada:** não avançar para o módulo seguinte automaticamente.

## Próxima execução

A prioridade e o ponto de retomada estão no registro abaixo. Esta execução é exclusivamente documental: não iniciar nem retomar Climatologia. A futura retomada deve aproveitar o trabalho verificável existente e separar conteúdo, integração e homologação em entregas; não repetir lotes concluídos. Comparar consumo apenas após 3–5 tarefas equivalentes com dados observados.

## Registro de continuidade compacto

**Conferência:** 11/11/2026, America/Sao_Paulo. `origin/main` = `12e7f34b5ae5f96a20680f0ff3c013510abe87c6`, obtido por fetch; PRs [#21](https://github.com/ude-ctrl/Estudo-para-Concurso/pull/21) e [#22](https://github.com/ude-ctrl/Estudo-para-Concurso/pull/22) confirmados como incorporados. Este registro descreve essa referência, não alterações locais de outra branch.

| Área | Implementação e editorial na main | Homologação e publicação |
| --- | --- | --- |
| Cartografia e Geotecnologias | Três unidades `APROVADA_CANONICA@1.0.1`, consumo habilitado; aprovação editorial delegada à IA | Encerramento técnico e aceite de continuidade do piloto com ressalva sensorial registrados; não inventar nova homologação humana de conteúdo. Integração presente na main |
| Fundamentos, Conceitos e Autores | `fundamentos-geografia@1.0.0`, canônica e integrada pelo PR #21, sem refazer sua base | Revisão editorial delegada; relatório não atesta homologação humana nova. Integração presente na main |
| Climatologia | PR #22 contém candidata `0.1.0`, `EM_AUDITORIA`, e prévia estática; manifesto da main mantém `canonical_version: null` e `runtime_enabled: false` | Prévia de leitura tem publicação registrada na rodada anterior; não salva progresso nem significa integração aprovada |
| Demais unidades | 23 sem edição canônica; com Climatologia, são 24 sem versão canônica no manifesto de 28 unidades | Biblioteca histórica continua disponível. Ausência de base V6 não significa ausência de material de estudo |

**Publicação:** o histórico da execução anterior registra sucesso do Pages [42196110366](https://github.com/ude-ctrl/Estudo-para-Concurso/actions/runs/42196110366) para `12e7f34`, com verificação de hashes. Nesta tarefa não se reexecutou CI nem se testou o site ao vivo. Site principal: <https://ude-ctrl.github.io/Estudo-para-Concurso/>; prévia: <https://ude-ctrl.github.io/Estudo-para-Concurso/previas/climatologia.html>. Merge confirmado nesta conferência não é, isoladamente, comprovação de deploy atual.

**Trabalho local preservado:** `v6-integracao-climatologia`, baseada em `12e7f34`, possui 16 arquivos rastreados modificados e `base-conhecimento/fisica/` não rastreada. São alterações inacabadas anteriores a esta tarefa, incluindo código e manifesto. Não foram editadas, testadas, promovidas ou publicadas nesta execução; um status declarado nesses arquivos não comprova aprovação. A entrega documental usa área separada e não incorpora esse diff. A próxima retomada deve primeiro verificar esse trabalho, sem recriá-lo nem presumir sua conclusão.

**Arquitetura mínima para orientação:** React/TypeScript/Vite em `src/`; `scripts/build-v6.mjs` consome pacotes aprovados do [manifesto canônico](../base-conhecimento/manifest.json) e gera os bancos em `public/v6/`. A biblioteca histórica usa `scripts/import-content.mjs`. Estudo / Treino / Revisão / Prova têm componentes existentes reutilizáveis. A chave de progresso `missaoGeo.v6.cartografia` atende hoje também Fundamentos; o caderno global usa `missaoGeo.v6.errors`. Não renomeá-las por aparência. Persistência é local, sem sincronização entre dispositivos. A prova oficial completa permanece bloqueada por estoque insuficiente.

**Evidências indispensáveis, conforme a tarefa:** [integração canônica de Cartografia](../MissaoAprovacaoGeo/V6_ISSUE13_INTEGRACAO_CANONICA_CARTOGRAFIA.md), [encerramento do piloto](../MissaoAprovacaoGeo/V6_FASE14_ENCERRAMENTO_TECNICO.md), [integração de Fundamentos](../MissaoAprovacaoGeo/V6_FUNDAMENTOS_INTEGRACAO.md), [relatório da candidata de Climatologia](v6-climatologia/RELATORIO_CANDIDATA_0_1_0.md). Datas e afirmações de “não publicado” em relatórios históricos valem para sua rodada; os PRs posteriores registram a evolução. Não reler todos em cada tarefa.

**Pendências e prioridade:** avaliar esta consolidação documental antes de autorizar seu merge; depois definir uma entrega pequena de diagnóstico do diff local de Climatologia. Antes de uma nova integração/release, conferir as referências temporais necessárias: perfil de Fundamentos vence em **16/11/2026**, perfis de Cartografia em **18/11/2026**, segundo os pacotes na main. São prazos internos de revisão, não datas do concurso; não prorrogá-los sem evidência. Nenhuma revisão editorial ou de fontes foi executada nesta tarefa.

**Atualização deste resumo:** modificar esta seção quando mudar o estado, citando commit/PR e separando resultados executados de históricos. Não criar outro arquivo de status ou copiar bancos pedagógicos para fornecer contexto.

## Oportunidades concretas de economia

| Ação | Evidência e aplicação | Situação |
| --- | --- | --- |
| Entrada curta e contexto por diferença | `AGENTS.md` aponta para este resumo; consultar `git diff` e trechos necessários em vez de repetir handoffs e relatórios integrais | Documentada nesta entrega |
| Não reimprimir bancos gerados | `public/v6/plataforma.json` e paridades têm muitos dados; usar contagens/IDs por script e linhas relevantes, guardando logs completos fora do chat | Aplicável imediatamente, sem mudar arquivos pedagógicos |
| Testes focados antes do marco de integração | `npm test` encadeia oito arquivos; para alteração isolada, executar o arquivo afetado com a mesma opção Node de `package.json`; no marco crítico, executar o conjunto completo aplicável | Sem alterar scripts ou diminuir a cobertura exigida |
| Evitar build em documentação | `npm run build` executa importadores e gera dados; para Markdown isolado, conferir links, consistência e `git diff --check` | Aplicado nesta tarefa |
| Aproveitar evidências já válidas | Registrar commit, escopo e resultado; repetir testes somente após mudança relevante, falha, vencimento temporal ou no marco previsto | Não transforma teste antigo em resultado novo |
| Modelo proporcional à tarefa | Documento simples: modelo econômico disponível; código/testes habituais: intermediário; Astra para risco transversal ou bloqueador complexo fundamentado | Sem tabela de preços presumida nem troca automática |
| Evitar CI integral para PR apenas documental | `.github/workflows/validate.yml` executa instalação, testes, build e navegador em todo PR, inclusive Markdown | Proposta futura separada: avaliar filtro seguro sem impedir checks obrigatórios. Nenhum workflow alterado |

**Registro desta entrega:** somente dois documentos alterados; checagem de links locais, consistência e diff, sem build/testes de aplicação. Tempo total e tokens não foram instrumentados de forma confiável, portanto não se declara economia medida. Para as próximas 3–5 tarefas, anotar no relatório/PR já existente: escopo/modelo, arquivos lidos/alterados, comandos e duração observada, iterações, falhas reabertas e consumo somente quando disponível. Não criar outro relatório de métricas para cada leitura.

## Limites desta auditoria de processo
Esta avaliação examinou documentos e configuração de scripts, **não** instrumentou execução real do Codex, mediu tokens, auditou integralmente código nem rodou suíte nesta etapa. As recomendações de economia são hipóteses operacionais a verificar. Não há garantia de redução de custo até coletar métricas.


## Adendo — operação sob franquia Plus com Astra (07/11/2026)

### Restrição real informada pelo proprietário
- Plano ChatGPT Plus.
- Modelo habitual no Codex: **GPT-6 Astra**.
- Uma execução de módulo pode consumir praticamente toda a disponibilidade; o proprietário relata esgotamento tanto da janela curta quanto da semanal.
- **Prioridade explícita:** maximizar módulos concluídos por unidade de franquia, sem sacrificar rigor ou integridade.

### Política de roteamento de modelos
- **Padrão:** usar o modelo de menor custo/capacidade disponível que execute a tarefa corretamente. Não pressupor que nomes de modelos ou preços permaneçam constantes; conferir opções presentes no Codex.
- **Modelo intermediário:** implementação habitual, refatorações localizadas, integração isolada e testes de regressão dirigidos.
- **Astra (exceção justificada):** migrações de persistência com risco de perda, arquitetura transversal, bugs difíceis após diagnóstico focado, conflitos científico-pedagógicos complexos ou auditoria crítica quando modelos econômicos se mostrarem insuficientes.
- **Escalonamento:** primeiro tentar diagnóstico/abordagem local e depois escalar com justificativa curta. Não testar indefinidamente uma solução barata que falha.
- **Nunca degradar a aprovação científica:** ausência de Astra disponível não autoriza liberar conteúdo não auditado; registrar pendência e parar.

### Orçamento por tarefa (sem inventar tokens)
Antes de abrir tarefa do Codex, preencher:
1. Resultado exato e condição de conclusão;
2. Arquivos que precisam ser lidos;
3. Modelo recomendado e motivo;
4. Criticidade (baixo, médio, alto) e verificação correspondente;
5. Limite de escopo: não tocar em outras unidades, arquitetura ou conteúdo canônico sem justificativa;
6. Condição de interrupção: se surgirem dependências inesperadas ou necessidade de refatoração ampla, retornar diagnóstico compacto, não executar expansão sem autorização;
7. Registro opcional de uso: consumo e renovação das janelas, caso a interface efetivamente mostre esses dados.

### Execução de módulos em lotes pequenos
- **Lote A — mapa de diferenças:** inventariar o módulo e comparar candidato, edital, Base Canônica e contrato V6; não implementar.
- **Lote B — conteúdo editorial:** corrigir apenas lacunas comprovadas, preservar procedência e versionar deltas; revisão científica dirigida.
- **Lote C — integração técnica:** consumir pacote aprovado e reutilizar componentes existentes; evitar nova implementação de shell.
- **Lote D — verificação/homologação:** testes direcionados durante B/C, suíte integral e Auditoria Premium no marco de aprovação/publicação.
- Se um lote já estiver concluído e verificável no repositório, **não repeti-lo**.

### Diretriz para ChatGPT e Codex
- ChatGPT: faz plano, triagem, análise de relatórios e especificação enxuta; não presumir que chats e Codex possuam franquias independentes.
- Codex: executa alterações reproduzíveis, preferencialmente com um ticket por vez e retorno curto.
- Trabalhar por branch/PR; nunca publicar automaticamente por economia de chamadas.
- Reutilizar validações existentes e cache quando seguro; qualquer alteração em dependências, IDs, persistência, gabaritos ou contratos amplia os testes.
- Não impor limite arbitrário de tokens que cause trabalho incompleto ou perda de segurança.
- Distinguir claramente **custo de execução medido** de **hipótese de economia**; verificar o painel real de uso do plano em vez de estimar quotas.

### Template econômico para enviar ao Codex
> Execute APENAS a tarefa indicada. Leia primeiro este protocolo e os arquivos diretamente relacionados. Objetivo: [resultado]. Base: [branch/commit]. Escopo permitido: [arquivos/unidade]. Proibido: alterar HTML histórico, Base Canônica de outro módulo, IDs e progresso sem migração autorizada. Reutilize componentes e decisões homologados. Escolha testes proporcionais ao risco, mas rode validação completa para integração/homologação. Se precisar abrir escopo ou fizer falta informação crítica, entregue diagnóstico e proposta compactos e pare. Ao final, informe somente arquivos modificados, testes/resultados, riscos e próximo passo. Não iniciar outro módulo.

### Primeira aplicação
O estado da primeira aplicação e sua próxima tarefa estão no [registro de continuidade](#registro-de-continuidade-compacto). A prioridade documental de 11/11 suspende qualquer implementação de módulo nesta execução. Reservar Astra para bloqueador real e registrar apenas duração/uso efetivamente disponibilizados.

### Critério de avaliação
Após 3–5 tarefas comparáveis, observar: tarefas concluídas por janela, revisões adicionais, falhas reabertas, duração observada e consumo exibido pelo produto (se disponível). **Não declarar melhora sem evidências.**
