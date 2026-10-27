# Verificações da auditoria

Data: 24/10/2026. Base: `a40a3c33c7a5b7f20750316fe694331c1a214b61`. Os resultados abaixo pertencem a esta auditoria. Resultados de rodadas anteriores não foram somados.

## Testes existentes

O comando `npm test` terminou com **126 testes aprovados e zero falhas**, distribuídos entre os cinco arquivos executados pelo projeto:

| Arquivo | Aprovados |
|---|---:|
| `tests/content.test.mjs` | 5 |
| `tests/storage.test.mjs` | 4 |
| `tests/v6.test.mjs` | 58 |
| `tests/canonical.test.mjs` | 42 |
| `tests/canonical-runtime.test.mjs` | 17 |

[Log completo](evidencias/test-node.log). Esses testes verificam contratos de dados e regras do aplicativo, incluindo comportamento canônico e persistência. **Não demonstram correção pedagógica de todos os enunciados.** Os problemas editoriais desta auditoria existem mesmo com a suíte aprovada.

A build de produção e a suíte completa `test:e2e` não foram reexecutadas nesta rodada documental. O comando de build do projeto executa importadores; não era necessário regenerar conteúdo para produzir o parecer.

## Integridade e triagem dos bancos antigos

Foram examinadas as 1.160 questões originais de múltipla escolha, 1.294 cartões e 2.600 afirmações V/F dos 26 materiais ativos.

| Verificação | Resultado | Interpretação |
|---|---|---|
| Índice do gabarito dentro das opções | Nenhum índice inválido | Não verifica se a alternativa é conceitualmente correta. |
| Opções idênticas após normalização | Nenhuma questão com duplicata textual | Não detecta equivalência semântica entre opções diferentes. |
| Texto prejudicado pela interpretação HTML | Três campos da mesma questão: T26 `b_18_0` | Enunciado e duas opções perdem os sinais e parte da expressão. |
| Distribuição do gabarito | A=537, B=559, C=53, D=11, E=0 | 94,5% em A/B; comparar também a ordenação realmente exibida. |
| Etapas com todas as respostas na primeira opção | T24, T25, T26 e T27, 40 questões cada | Padrão visível nas questões de etapa, cuja ordem não é embaralhada. |
| Candidatos a feedback V/F incoerente | 117 | Revisão semântica posterior confirmou necessidade de revisão nos 117; ver CSV. |
| Versos de cartões menores que 15 caracteres | 271 | Indicador de inspeção; resposta curta não é necessariamente errada. |
| Grupos de textos repetidos | 63 | Mesma categoria e texto normalizado; não equivale a 63 conteúdos a excluir. |

[Resultados estruturados](evidencias/checks.json) e [script da triagem](evidencias/checks.mjs). O algoritmo de repetição compara enunciados/frentes, não valida a equivalência de toda a explicação. Não foi usado para excluir material.

## Navegador — materiais antigos

Foram abertas as **26 páginas ativas**, com Chromium, janela de 390 × 844 pixels e preferência `reduced-motion: reduce`. O teste acessou as páginas HTML locais e coletou o estado inicial, além de dois casos dirigidos de Lógica.

- Nenhuma exceção JavaScript capturada pelo evento `pageerror` no percurso executado.
- Nenhum ID duplicado nem transbordamento horizontal no estado inicial inspecionado.
- Na página de Lógica, a ordem das opções do diagnóstico coincide com a ordem do banco; a inspeção do renderizador confirma também a manutenção da ordem nas questões de etapa.
- **Falha reproduzida:** `b_18_0` apresenta “Se A” no lugar de `Se A<B e B<C, então:`. `A<C` e `C<A` aparecem como “A” e “C”. [Captura](evidencias/logic-damaged-question.png).
- **Falha reproduzida:** após julgar corretamente T26 `G_12`, a tela mostra “A afirmação era VERDADEIRA. Não.”. O cálculo correto é 100 × 1,10 × 0,90 = 99.

[Resultado por página](evidencias/browser-audit.json) e [script](evidencias/browser-audit.mjs). O caso de Lógica foi selecionado por chamadas às funções da própria página, para reproduzir diretamente a etapa e o feedback, sem depender do sorteio. Isso não representa um percurso completo de aluno em todas as atividades.

**Limites relevantes:** requisições externas foram bloqueadas intencionalmente nesse teste. Ele não atesta disponibilidade de imagens, fontes ou links remotos. O estado inicial sem ID duplicado não prova ausência de duplicação em todos os estados dinâmicos. Ativar `reduced-motion` não equivale a certificar todas as animações ou toda a acessibilidade.

O campo `damaged` do coletor inicial ficou vazio por uma limitação da heurística: ela confundia `<B` da desigualdade com marcação de negrito. A coleta dirigida em `logic.question`, a captura e o parser da triagem posterior demonstram o defeito. **O campo vazio não constitui aprovação da renderização.**

## Cartografia canônica

O [parecer específico de QA](QA_CARTOGRAFIA.md) registra separadamente a navegação nas três unidades publicadas e os quatro cenários isolados dos mapas. Não se somam testes isolados de mídia a jornadas completas de estudo.

A revisão editorial dos 161 gabaritos canônicos não encontrou inversão inequívoca da resposta correta. Isso resulta da leitura e do recálculo descritos no parecer, não de uma asserção automatizada de correção conceitual.

## Preservação e reprodução

A auditoria acrescenta somente os documentos desta pasta. Os 31 HTMLs históricos e os três pacotes de conteúdo canônico têm hashes registrados em [HASHES_FONTES.json](evidencias/HASHES_FONTES.json); a [conferência final](evidencias/PRESERVACAO.json) confirmou os 34 arquivos idênticos ao commit-base e aos hashes registrados. Nenhum arquivo previamente rastreado apresenta diferença em relação à base.

Os scripts anexados registram os caminhos usados nesta execução: repositório em `/workspace/Estudo-para-Concurso`, evidências em `/workspace/work/auditoria-integral` e servidor local na porta 4174. Para reproduzir em outro ambiente, ajustar esses caminhos e o executável do Chromium; iniciar Vite diretamente evita executar o importador associado ao `predev`. Os scripts de extração são evidência do método e não devem ser executados sobre os registros finais de leitura, pois recriam os arquivos de acompanhamento.

O [registro de cobertura](evidencias/coverage.json) documenta quais materiais foram lidos. O campo `manualRead` é um registro de trabalho da auditoria, não uma validação automática de exatidão. Seus achados são apresentados nos pareceres Markdown e no CSV dos jogos; o campo auxiliar `findings` vazio não significa ausência de problemas.
