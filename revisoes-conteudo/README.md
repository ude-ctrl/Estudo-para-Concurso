# Revisões da biblioteca existente

Estes arquivos corrigem a versão usada pelo site sem reescrever os 31 HTMLs históricos de `MissaoAprovacaoGeo/`. Não constituem migração para a V6 nem promoção para Base Canônica. Cartografia permanece no fluxo canônico já publicado.

Cada revisão informa versão, material, caminho e hash da fonte auditada. Cada alteração contém caminho do campo, valor anterior, valor revisado e justificativa. No lote inicial:

- `2026-10-24-games.json`: 122 explicações e dez enunciados de jogos, em 13 materiais; nenhuma alteração de V/F ou posição.
- `2026-10-24-questoes.json`: comando e explicações da questão `b_7_0` de Agrária; explicações da questão `b_17_0` de Lógica; duas correções pontuais de apresentação.

O importador verifica o hash e o valor anterior antes de alterar literais na cópia da página. A extração JSON ocorre sobre essa mesma cópia corrigida. A build falha diante de divergência, caminho proibido ou alteração repetida; não tenta adivinhar qual texto deveria prevalecer. As duas correções de apresentação são restritas a funções identificadas na fonte auditada: escapar texto das questões de Lógica e exibir as explicações por alternativa já declaradas para a questão revisada de Agrária.

`sourceHash` identifica o HTML histórico. `contentVersion` é o SHA-256 da página gerada. `editorialVersions` lista as revisões aplicadas. A exportação do progresso inclui essas identificações, mas **a versão disponível na exportação não é a versão de cada tentativa antiga**: o motor legado não possui esse histórico individual. Não foi inventada uma data ou versão para tentativas anteriores.

IDs, opções, índices corretos, chaves de armazenamento e resultados anteriores são preservados neste lote. A nova redação de um enunciado não transforma uma resposta antiga em evidência de resolução da versão revisada. A correção não refaz a pontuação retroativamente nem concede XP pela atualização.

## Atualizações posteriores

O formato atual aplica os arquivos listados nesta pasta à fonte original; não implementa encadeamento arbitrário de versões sobre versões. Revisões diferentes não podem alterar o mesmo caminho simultaneamente. Para revisar novamente um campo, consolidar a revisão ativa com o novo texto e motivo, preservando o estado anterior no histórico Git e no relatório de auditoria. Não acrescentar uma segunda alteração concorrente esperando que a ordem dos arquivos resolva o conflito.

Para mudanças de alternativas, gabaritos, índices ou semântica que exijam reclassificação de progresso, preparar uma estratégia específica antes de implementar. O formato deste lote não autoriza essas mudanças. Para Cartografia, usar exclusivamente a base aprovada e o processo de versionamento canônico.

Verificação: `npm test`, `npm run build` e `npm run test:e2e`. As primeiras duas tarefas regeneram saídas ignoradas pelo Git. Não editar diretamente `public/content/` ou `public/legacy/`.
