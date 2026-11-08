# V6 — Protocolo operacional de eficiência e qualidade (07/11/2026)

**Estado:** diretriz proposta pelo usuário, documentada nesta branch para revisão antes do merge. **Não altera automaticamente código, CI, conteúdo ou site publicado.**

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
2. **Contexto mínimo suficiente:** antes de codificar, ler este documento, o registro de estado, a tarefa e somente os contratos/arquivos que ela impacta. Expandir leitura quando dependências, riscos ou falhas comprovadas exigirem. Nunca omitir leitura obrigatória de segurança/contrato aplicável.
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
- **Arquivos/contratos necessários:** caminho exato e motivo.
- **Não mexer:** histórico, módulos fora do escopo, persistência sem migração.
- **Critérios de aceite:** comportamento, precisão, acessibilidade e preservação.
- **Testes por risco:** comandos direcionados e gatilho para regressão integral.
- **Saída:** delta + evidências + pendências + recomendação de merge.
- **Parada:** não avançar para o módulo seguinte automaticamente.

## Próxima execução
1. Conferir estado atual de Climatologia no PR/branch/main e sua prévia publicada; distinguir prévia de leitura de unidade aprovada.
2. Fazer inventário dirigido de lacunas de Climatologia, sem reler integralmente Fundamentos e Cartografia.
3. Executar alterações de Climatologia em um PR limitado, com paridade, revisão científica dirigida e testes apropriados.
4. Homologar o módulo e só então avançar ao seguinte, usando o mesmo padrão.
5. Depois de 3–5 entregas equivalentes, comparar tempos/tokens observáveis com base histórica disponível e ajustar este protocolo.

## Registro de continuidade compacto
**Plataforma:** Missão Aprovação V6, SEDUC-PA, base permanente reutilizável por outros concursos.
**Padrão:** Estudo / Treino / Revisão / Prova, feedback explicativo, revisão espaçada e caderno global.
**Consolidado no histórico:** Cartografia canônica; Fundamentos integrado; biblioteca unificada; prévia de Climatologia.
**Pendente:** confirmar estado editorial e publicação de Climatologia; migrar outras unidades; validar cobertura total do edital e homologar plataforma completa.
**Restrições:** preservar legado, progresso e rastreabilidade; jamais tratar especificação como recurso implementado.
**Próxima tarefa prioritária:** Climatologia V6 com escopo e aceite explícitos.

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
**Climatologia V6:** conferir o commit de prévia (#22) e os critérios não cumpridos; evitar reconstruir o que já está integrado. Definir primeiro ticket de baixo ou médio risco e usar modelo econômico/intermediário se capaz. Reservar Astra para bloqueador real. Registrar duração/uso disponibilizados pela interface e revisão final antes de publicações.

### Critério de avaliação
Após 3–5 tarefas comparáveis, observar: tarefas concluídas por janela, revisões adicionais, falhas reabertas, duração observada e consumo exibido pelo produto (se disponível). **Não declarar melhora sem evidências.**
