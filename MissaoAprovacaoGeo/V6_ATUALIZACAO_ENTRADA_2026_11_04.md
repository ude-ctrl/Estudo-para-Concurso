# Retomada V6 — referências atualizadas e entrada única

Revisão das fontes: 04/11/2026. Fechamento técnico: 05/11/2026. Branch: `fix/v6-atualizacao-e-entrada`. Base: `main` em `0c125a63d9eb4a70318b0dd0f67f101c937bd86f`.

## O que foi entregue

O endereço principal passa a abrir a biblioteca de todos os temas. Cartografia aparece uma vez, como um módulo com três unidades, e participa de busca, área, favoritos, ordenação e percurso. O aviso permanente “Um módulo. Três unidades. Um percurso.” sai da página. O conteúdo dos demais temas continua nos mesmos materiais, sem migração ou reescrita.

| Entrada | Destino |
| --- | --- |
| Raiz / `index.html` | Biblioteca: 25 temas, incluindo Cartografia |
| `biblioteca.html` | A mesma biblioteca, preservando o endereço anterior |
| `v6.html` | Cartografia: Fundamentos, Representação e Geotecnologias |
| Atalhos `#/unidade/...`, `#/caderno`, `#/configuracoes` na raiz | Destino correspondente em `v6.html`, preservando parâmetros |
| Atalhos históricos de Cartografia | Unidade canônica correspondente, sem reativar Cartografia II duplicada |
| Atalhos dos demais materiais | Leitor existente, com os mesmos IDs |

A biblioteca informa 26 materiais existentes mais três unidades de Cartografia, 1.414 flashcards e 2.856 itens de game. Os 25 cartões de temas não equivalem às 28 unidades do planejamento canônico: são formas diferentes de organizar o acervo. O pequeno índice `public/v6/library.json` é gerado pelo mesmo construtor do banco canônico, sem baixar todo o conteúdo de Cartografia para listar o cartão.

## Correção do bloqueio de build

A edição ativa 1.0.0 tinha referências com conferência vencida em 30/10. Além disso, o validador exigia validade temporal atual de todas as versões arquivadas, o que impediria corrigir o problema somente criando uma nova edição.

As três bases recebem `1.0.1`, com nova conferência dirigida de referências e prazos. O [relatório temporal](V6_REVISAO_TEMPORAL_2026_11_04.md) identifica fontes consultadas, falhas de acesso, fontes alternativas, decisões e limites. A aprovação pedagógica anterior é herdada sobre conteúdo comprovadamente igual, sem simular nova leitura integral nem homologação humana.

Agora o validador confere a edição ativa na data atual e cada aprovação arquivada na data do respectivo parecer. Permanecem as verificações de integridade, versões, cadeia, escopo autorizado e aprovação. Os testes confirmam que referências vencidas na edição ativa, datas históricas futuras/inválidas e adulterações continuam rejeitadas. Não há relógio de produção congelado, dispensa de prazo ou renovação retroativa de versões antigas.

## Conteúdo e aprendizagem preservados

- Objetos completos `content` e `support` de 1.0.1 iguais aos de 1.0.0 nas três unidades. Nenhuma teoria, questão, alternativa, resposta, justificativa, imagem ou recurso pedagógico foi reescrito.
- 685 registros de paridade e os 31 HTMLs históricos preservados. Edições canônicas anteriores intactas.
- Cartografia mantém 17 missões, 50 seções, 161 questões, 120 flashcards, 256 V/F, 39 recalls, seis discursivas e seis suplementos.
- O cartão da biblioteca apenas lê o progresso. Não grava evidências, domínio, XP ou revisões. Ordenação por progresso usa cobertura de questões respondidas, não estimativa de domínio.
- A mudança de edição mantém a versão original nas tentativas anteriores. Sessões, agenda, rascunhos, leituras, erros e recompensas são preservados; a reconciliação continua aditiva e idempotente.
- A cópia exportada pela biblioteca passa a incluir também o estado atual de Cartografia e seu caderno, além das chaves legadas. Nas configurações de Cartografia, essa cópia pode restaurar o estado do módulo, com preservação do estado anterior pelo mecanismo existente. Não restaura automaticamente outros temas nem mistura históricos de unidades diferentes.

## Verificação executada

- `npm run build`: passou, incluindo importação, validação canônica, TypeScript e Vite.
- A build final de 05/11 reproduziu os hashes dos HTMLs de entrada, bundles e arquivos V6 usados nos testes de navegador.
- Testes de conteúdo, armazenamento, lógica V6, bases canônicas e integração: **133 passaram** (8 + 4 + 58 + 45 + 18). A verificação específica de preservação do progresso 1.0.0 → 1.0.1 foi reexecutada após o ajuste da fixture e passou.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npx playwright test --workers=2`: **218 passaram em 6,1 minutos**, em execução completa em 05/11, na raiz e em `/Estudo-para-Concurso/`. Inclui busca, filtros, favoritos, ordenação, retomada, atalhos, celular, teclado, cópia/restauração, temas, movimento reduzido, treino, revisão, prova e gamificação.
- A primeira execução identificou duas expectativas desatualizadas na suíte e um teste de cronômetro dependente do tempo real da máquina. Os testes foram corrigidos: a biblioteca inclui Cartografia, o seletor usa o nome acessível real e o cronômetro é controlado com verificação do prazo persistido. A execução completa acima passou sem falhas ou retentativas.
- `git diff --check`: passou. Nenhuma alteração nos HTMLs históricos, cópias pedagógicas publicadas ou edições canônicas anteriores.

## Limites e decisões

Esta entrega resolve as fases A/B da retomada: referências necessárias à build e entrada única. Não completa a revisão de todo o edital, não integra Fundamentos do PR #15, não migra módulos e não elimina as pendências pedagógicas identificadas no diagnóstico. A prova oficial completa continua condicionada ao estoque das outras áreas.

A próxima conferência do perfil SEDUC-PA está agendada para **18/11/2026**, ou antes se houver retificação. O prazo permanece bloqueante para novas builds; não interrompe automaticamente o HTML estático já publicado. Conferências futuras exigem consulta real, não simples mudança da data.

Navegação, teclado, celular, persistência e regressões são testados em Chromium. Isso não equivale a teste humano, validação com leitor de tela real, exame em iOS/Safari ou nova auditoria integral das fontes externas. Os testes de navegador isolam a aplicação bloqueando rede externa; a revisão das fontes foi realizada separadamente.

Não houve merge, deploy ou publicação. O site público continua na versão de `main`. O próximo passo é revisar esta entrega e obter autorização de publicação; a autorização de PRs anteriores não é tratada como autorização desta rodada.
