# V6 — Issue #13: verificação do primeiro lote

Data: 16/10/2026, America/Sao_Paulo. Branch: `v6-base-canonica`.
Implementação e dados verificados: [`8e2cc9104abdeeb3a50e115b7c31951541d373c6`](https://github.com/ude-ctrl/Estudo-para-Concurso/commit/8e2cc9104abdeeb3a50e115b7c31951541d373c6).
Referência preservada do piloto: `690692389b8c665c7eff4bb7b34d10be5fdabba8`.

## Resultado

**Build aprovada e 82 testes de integridade/lógica aprovados, sem falhas ou testes ignorados.** O lote contém três candidatas `0.1.0`, todas `EM_AUDITORIA`, e nenhuma versão canônica aprovada. As outras 25 unidades permanecem sem auditoria iniciada.

Os [resultados estruturados](v6-evidencias/resultado-base-canonica-cartografia.json) incluem saídas da build e dos testes, hashes dos pacotes e dos 31 HTMLs, inventário e limites. O [relatório editorial](V6_ISSUE13_RELATORIO_CARTOGRAFIA.md) contém os achados que ainda impedem a promoção. Estes resultados não constituem aprovação humana Premium.

## Execução

Ambiente local: Node `v24.19.0`, Vite `6.4.4`. Build e suíte completa foram executadas sequencialmente no commit acima; a geração não deixou alterações no banco ou nos arquivos rastreados.

| Verificação | Resultado |
| --- | --- |
| `npm run build` | Importadores, TypeScript e build de produção passaram |
| `tests/content.test.mjs`, via `npm test` | 5/5 passaram |
| `tests/v6.test.mjs`, via `npm test` | 58/58 passaram |
| `tests/canonical.test.mjs`, via `npm test` | 19/19 passaram |
| `npm run check:canonical` | Três candidatas íntegras; zero unidades canônicas; 25 não iniciadas |
| `node scripts/build-v6.mjs --check` | Saída do piloto consistente com a geração preservada |
| Prettier dos novos scripts/testes e `package.json` | Passou |
| `git diff --check` | Passou |
| Links locais da documentação do lote | Sem destinos ausentes |

Não foi executada uma nova suíte de navegador nesta etapa: não houve mudança de interface, motor, persistência ou entradas de conteúdo do produto. As 146 verificações globais de navegador e as revalidações sensoriais anteriores continuam sendo evidências históricas nos [relatórios do piloto](V6_FASE14_RELATORIO_TESTES.md), com seus próprios commits e limites. Não são somadas aos 82 testes desta rodada.

## Preservação demonstrada

O banco `public/v6/cartografia.json` conserva o SHA-256:

```text
f45c4d769c05822869ef8030d83915cd14039bc237d750b2985ce303f25ada5c
```

A reconstrução com as três edições iniciais recupera exatamente esse banco, incluindo a ordem dos registros, textos, alternativas, gabaritos, variantes, originais, fontes, referências e sete mudanças editoriais históricas. Essa reconstrução não lê os HTMLs, não chama importadores e não depende do banco ativo.

| Unidade | Recursos pedagógicos classificados | Registros de procedência | Status |
| --- | ---: | ---: | --- |
| Fundamentos | 277 | 272 | `EM_AUDITORIA` |
| Representação | 183 | 172 | `EM_AUDITORIA` |
| Geotecnologias | 231 | 241 | `EM_AUDITORIA` |
| Total | **691** | **685** | Nenhuma promoção |

“Recursos” inclui a unidade, missões, explicações, recalls, conceitos e atividades; não equivale a quantidade de questões. O inventário permanece em 161 questões, 120 cartões e 256 V/F, além dos demais recursos descritos no relatório editorial.

As quatro referências que atravessam unidades acompanham o item consolidado em Fundamentos e preservam a missão histórica de Representação. Os três cabeçalhos de contexto continuam arquivados. Os 31 HTMLs e suas cópias publicadas passaram na comparação byte a byte da suíte anterior, reexecutada nesta rodada.

Uma comparação com o commit do piloto também confirmou a preservação de `src/`, `public/`, HTMLs, workflows, lockfile, importadores e testes preexistentes. Os scripts adicionados não são usados pela build do site. Não houve migração de progresso, remapeamento de IDs, alteração de localStorage, merge ou publicação.

## O que os 19 novos testes exercitam

- Catálogo com os 28 IDs oficiais, somente três auditorias iniciadas e inventário integral das candidatas.
- Reconstrução exata do banco e conservação de aliases entre unidades, contextos e histórico editorial.
- Preservação das quatro tabelas, SVG de perfil, precisão UTM, nove campos e dez critérios da prática.
- Recusa operacional de candidatas e de `APROVADA_COM_RESSALVAS`; trocar apenas o status não libera conteúdo.
- Aprovação futura condicionada aos 12 critérios Premium, revisão integral dos recursos, decisão humana dos itens e resolução dos achados impeditivos.
- Vínculo do parecer ao digest do pacote: alteração posterior invalida o parecer mesmo se os hashes locais forem recalculados.
- Recusa de dados temporais parciais ou vencidos e de datas de verificação futuras, usando relógio controlado nos testes.
- Detecção de texto alterado, variante perdida, gabarito inexistente, visual ausente, original adulterado, inventário falso, paridade duplicada e matriz incompleta.
- Recusa de recursos extras ou referências divergentes na reconstrução.
- Preservação explícita das 12 propostas de metadados, cinco famílias e 36 decisões humanas pendentes, sem aplicação silenciosa.
- Leitura de uma cópia contendo somente a base, sem acesso aos HTMLs, importadores ou banco ativo.
- Recusa de caminhos inválidos e de pacote cuja unidade ou versão não corresponde ao caminho solicitado.
- Coexistência de uma edição canônica aprovada com uma nova candidata pendente, mantendo o snapshot inicial e a fonte oficial anterior.

As aprovações desse último cenário e dos demais casos positivos são sintéticas, em memória ou em diretórios temporários isolados, removidos pelos testes. Não constituem pareceres nem modificam o catálogo ou as candidatas reais. O digest detecta divergência; não autentica identidade humana.

## Ajustes encontrados durante a preparação

A primeira checagem identificou referências com missão histórica de outra unidade. A partição passou a considerar o destino canônico do item; os dados originais permaneceram preservados. A conferência do histórico também passou a incluir alterações ligadas a recalls, além das ligadas a explicações, mantendo os sete registros.

Um teste inicial de catálogo contou menções repetidas fora da lista oficial e encontrou 31 ocorrências. A leitura do teste foi delimitada à seção oficial de 28 unidades da Fase 13. A lista esperada continuou igual; não se reduziu o critério para aceitar um catálogo divergente.

A revisão final do contrato acrescentou verificação da identidade unidade/versão contra o caminho e unicidade das referências de paridade. Esses casos têm verificações negativas na suíte final. As execuções intermediárias não são somadas à contagem entregue.

## Limites e decisão

As verificações demonstram integridade e cumprimento do contrato técnico. Não resolvem os achados editoriais, não calibram dificuldade, não aprovam imagens/licenças, não completam a leitura das fontes de acesso parcial e não confirmam conforto sensorial humano.

As 36 questões autorais continuam `human-review-pending`. O estoque aprovado da prova oficial não aumentou. A aplicação permanece na estratégia de geração anterior até existir base aprovada e integração autorizada. A ressalva sensorial permanece no [encerramento técnico](V6_FASE14_ENCERRAMENTO_TECNICO.md).

O lote está preparado para decisão editorial humana sobre as candidatas e seus achados. Não há promoção automática, início dos demais módulos ou necessidade de repetir a reconferência P1/P3 para esta entrega.
