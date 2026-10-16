# V6 — Fase 14: correções do treino contextual e dos favoritos

Execução: 16/10/2026 UTC (15/10/2026 em America/Sao_Paulo). Branch exclusiva: `v6-piloto-cartografia`.

**Situação atualizada: reconferência recebida, sem bloqueador técnico remanescente no escopo P1/P3.** O [parecer comunicado pelo usuário](V6_FASE14_RECONFERENCIA_P1_P3.md) registra build, 53 testes de integridade/lógica, 100 cenários de navegador e oito verificações adicionais aprovados. O aceite visual e de uso permanece válido; a revisão editorial dos itens autorais continua pendente. Não houve merge, publicação, expansão de módulos ou implementação da proposta de gamificação sensorial.

## Parecer recebido e escopo

O usuário trouxe o parecer da reauditoria sobre `a0bc936`, conferido também contra `1285715`. O revisor confirmou B1, B2 e C1 corrigidos, informou 7.200 montagens adicionais para B1 e manteve o aceite de uso. Identificou:

- **P1, bloqueador:** sessões anteriores da mesma unidade tomavam o lugar do destino solicitado por missão/banco. Orientação continuava aparecendo ao pedir treino de Escalas; Diagnosticar retomava Fixação; uma rodada concluída podia reaparecer no lugar de preparar a atividade solicitada.
- **P3, menor:** o contador de favoritos incluía o material arquivado, embora a lista corretamente não o exibisse.

Essas conclusões são do parecer comunicado pelo usuário. As execuções de teste desta correção são registradas separadamente; não se apresenta a implementação como emissora de uma nova aprovação independente.

## P1 — comportamento corrigido

1. Uma sessão só é retomada automaticamente se seus itens canônicos forem compatíveis com a unidade e, quando solicitados, missão e banco. Todos os IDs precisam corresponder; encontrar um único item da unidade não basta.
2. O destino explícito de questão/diagnóstico não é substituído por uma fila de flashcards ou Game. Diagnóstico e Fixação permanecem distinguíveis mesmo quando compartilham itens históricos.
3. Missão e banco são lidos da rota tipada. Alterar os filtros atualiza a URL; mudar a query na mesma unidade atualiza os controles e a seleção de atividade.
4. Ao entrar por um destino explícito com uma sessão já concluída, abre-se a preparação da nova rodada. A conclusão da rodada feita na tela atual continua mostrando seu resultado normalmente; o acesso genérico ao treino mantém a retomada anterior.
5. Navegar para outro destino não apaga a sessão anterior, suas respostas, seus erros, a agenda ou o XP. O usuário escolhe **Iniciar questões** para substituir a fila de trabalho. Evidências e rascunhos já registrados permanecem.
6. O botão **Continuar de onde parei** retoma a sessão compatível da unidade, inclusive em cópias anteriores que salvavam uma missão inicial artificial. Sem sessão para retomar, preserva o destino solicitado, incluindo o banco de diagnóstico.
7. O cabeçalho de uma rodada identifica Diagnóstico, Pós-teste e Chefão; a classificação original dos itens e seus gabaritos não são reescritos para mudar esse rótulo de atividade.
8. O foco permanece no seletor ao trocar missão/banco pelo teclado. As demais navegações continuam levando o foco ao título.
9. Escolher e iniciar explicitamente o **Game da unidade** sai do filtro de questões e abre o Game existente. Voltar ao atalho contextual de Escalas prepara as questões corretas; não retoma esse Game no lugar delas.

Arquivos principais: `src/v6/training-session.ts`, `Training.tsx`, `App.tsx`, `Study.tsx`, `context.tsx` e `types.ts`.

## Persistência e decisões

- Mantidos esquema 6, chaves de armazenamento, IDs de itens e estrutura das sessões existentes.
- `resume.pool` é um campo opcional, validado na leitura de backups. Cópias anteriores sem ele continuam aceitas. Não se inventa banco para uma cópia antiga.
- Não há migração destrutiva nem limpeza automática de sessões ao mudar a URL.
- Continua existindo uma única fila de trabalho de questões/Game/flashcards. Iniciar outra atividade substitui essa fila, como já informado na interface; não foi introduzido um arquivo de todas as sessões interrompidas.
- Não foram alteradas as regras de XP, revisão, domínio, B1, B2 ou C1. No motor, a mudança limita-se à validação do banco opcional da retomada.

## P3 — comportamento corrigido

O contador considera a interseção entre favoritos e materiais do catálogo ativo, contando cada material uma única vez. IDs arquivados, desconhecidos ou repetidos não aumentam o número apresentado. As preferências históricas continuam no armazenamento e no backup; não foram apagadas para ajustar o contador.

Arquivo principal: `src/App.tsx`. A busca e a lista de favoritos continuam sem expor as fontes arquivadas de Cartografia.

## Verificação

Antes da alteração funcional, dois testes novos falharam na build de `1285715`, reproduzindo P1 e P3: ausência do seletor de Escalas por retomada indevida de Orientação e contador `Favoritos1` com lista sem material ativo. Essas falhas são evidência da versão anterior, não da bateria final.

As regressões exercitam:

- Orientação em andamento e concluída → Estudo de Escalas → Testar este raciocínio, pela raiz e pelo alias `/v6.html`;
- reload antes/depois de iniciar a nova rodada, preservação de respostas/XP e retomada pelo painel;
- Diagnosticar com Fixação em andamento/concluída, diagnóstico já concluído, Game e flashcards salvos;
- mudança de query na mesma tela, filtros por teclado e histórico de voltar do navegador;
- cópias anteriores com missão de retomada artificial e diagnóstico preparado ainda sem sessão;
- início explícito do Game a partir de treino contextual e retorno às questões;
- contador com somente legado e mistura de favoritos ativos, arquivados, duplicados e desconhecidos, preservando o backup.

Todos os cenários de navegador são exercitados em `/` e `/Estudo-para-Concurso/`. Os resultados finais e o commit testado constam no [relatório de testes](V6_FASE14_RELATORIO_TESTES.md) e em `v6-evidencias/resultado-p1-p3.json`.

A implementação `c872886fbe544a265a0e9e038e7e10fdc95ee5f2` passou na build, nos **53 testes de integridade/lógica** e nos **100 cenários completos de navegador**, 50 por caminho. A bateria final terminou sem falhas, testes ignorados ou resultados instáveis. A geração reproduzível, a formatação dos arquivos de código/testes alterados e a verificação de whitespace também passaram.

## Paridade e limites mantidos

O banco publicado, os 685 registros de paridade e o registro congelado de IDs não mudaram. Os 31 HTMLs permanecem byte a byte iguais ao inventário. O documento da proposta de gamificação sensorial permanece integralmente como recebido, sem implementação.

Os 36 itens novos continuam `human-review-pending`; o perfil oficial completo permanece bloqueado por estoque aprovado insuficiente. Os riscos já declarados sobre provas antigas e histórico anterior de Difícil continuam documentados. Esta rodada não modifica esses registros históricos nem declara uma aprovação editorial individual dos itens.

## Roteiro da reconferência, preservado no histórico

Reproduzir o P1 com uma sessão anterior de Orientação: pedir Escalas pelo estudo e diagnóstico pelo painel, incluindo a rodada anterior concluída. Confirmar que o destino solicitado prevalece e que as respostas anteriores ficam preservadas. Conferir também o contador P3 com somente Cartografia arquivada favoritada.

O parecer anterior sobre B1/B2/C1 e o aceite de uso permanecem registrados. A entrega desta correção parou para reconferência do bloqueador P1. O [retorno posterior](V6_FASE14_RECONFERENCIA_P1_P3.md) encerrou essa reconferência sem bloqueador técnico no escopo P1/P3; não autoriza publicação ou novos módulos e não substitui revisão editorial.
