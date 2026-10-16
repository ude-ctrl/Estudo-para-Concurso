# V6 — Verificação das candidatas de Cartografia 0.1.1

Data: 16/10/2026, America/Sao_Paulo. Branch: `v6-base-canonica`.
Código e pacotes verificados: [`033fde91839cc2a120249439f3aa156c86899efa`](https://github.com/ude-ctrl/Estudo-para-Concurso/commit/033fde91839cc2a120249439f3aa156c86899efa).
Referência anterior preservada: `02151ebe08a98705bd2ec46931d84534d029c4c3`.

## Resultado

**Build e 93 testes aprovados, sem falhas ou testes ignorados.** As três candidatas atuais são `0.1.1`, todas `EM_AUDITORIA`. O catálogo conserva as 25 unidades não iniciadas e nenhuma unidade canônica ou consumo operacional habilitado.

As [evidências estruturadas](v6-evidencias/resultado-base-canonica-cartografia-011.json) incluem as saídas completas da build e da suíte, hashes dos pacotes de ambas as versões, inventário, tentativas de acesso às mídias e limites da verificação. As correções e os pareceres estão no [relatório editorial](V6_ISSUE13_CORRECOES_CARTOGRAFIA_011.md).

## Execução

Ambiente local: Node `v24.19.0`, Vite `6.4.4`. Build e suíte completa foram executadas sequencialmente no commit acima. A geração do banco não deixou alterações nos arquivos rastreados.

| Verificação | Resultado |
| --- | --- |
| `npm run build` | Importação, TypeScript e produção passaram |
| `tests/content.test.mjs`, via `npm test` | 5/5 passaram |
| `tests/v6.test.mjs`, via `npm test` | 58/58 passaram |
| `tests/canonical.test.mjs`, via `npm test` | 30/30 passaram |
| `npm run check:canonical` | Três candidatas íntegras, revisões declaradas e snapshot inicial preservado |
| `node scripts/build-v6.mjs --check` | Banco do piloto consistente com sua geração preservada |
| Prettier dos scripts/testes alterados | Passou |
| `git diff --check` | Passou |
| Links locais dos documentos de entrega | Sem destinos ausentes |

As 30 verificações canônicas incluem as 19 anteriores e 11 novas. Execuções intermediárias e subcasos não são somados ao total de 93. Não houve nova execução de Playwright: interface, motor, persistência e banco consumido pelo site permaneceram iguais. Os testes de navegador anteriores mantêm seus commits e limites históricos, sem serem apresentados como execução desta rodada.

## Preservação e correções

O banco ativo mantém o SHA-256:

```text
f45c4d769c05822869ef8030d83915cd14039bc237d750b2985ce303f25ada5c
```

A reconstrução desse banco continua usando somente as três edições iniciais `0.1.0`, sem ler HTMLs ou chamar importadores. A verificação de revisão compara cada `0.1.1` à sua edição de origem; diferenças intencionais da candidata são declaradas e não confundidas com paridade byte a byte do snapshot histórico.

| Unidade | Recursos preservados | Procedências preservadas | Campos alterados declarados |
| --- | ---: | ---: | ---: |
| Fundamentos | 277 | 272 | 107 |
| Representação | 183 | 172 | 93 |
| Geotecnologias | 231 | 241 | 80 |
| Total | **691** | **685** | **280** |

Os campos alterados incluem metadados e hashes derivados. Não equivalem a 280 novas atividades. O inventário pedagógico conserva 161 questões, 120 cartões e 256 V/F, além das explicações, recalls e demais recursos.

Os 161 IDs de questão, IDs de resposta correta e textos dessas respostas são preservados. A única nova identidade de alternativa substitui um distrator incorreto redundante de GMS, com aposentadoria e ausência de remapeamento explicitamente registradas. As duas alternativas não são tratadas como a mesma resposta histórica.

A comparação com a referência anterior preservou integralmente `0.1.0`, o baseline do piloto, os 31 HTMLs, `src/`, `public/`, importadores, testes preexistentes de conteúdo/motor, workflows, `package.json` e lockfile. A suíte de conteúdo também revalidou a igualdade byte a byte dos originais e das cópias publicadas.

## Novos cenários exercitados

- A candidata do catálogo é `0.1.1`, enquanto o snapshot inicial e as 691 identidades continuam preservados.
- Alteração sem declaração, valor anterior inventado e pacote pai divergente são recusados.
- Declarar uma diferença não autoriza perder recurso, alterar ID ou texto do gabarito, nem modificar procedência histórica.
- As 12 associações têm correspondência entre valor inicial, proposta e valor aplicado; a decisão humana continua pendente.
- Os quatro valores numéricos de GMS são distintos, o cálculo independente confirma `−42,5°` e o distrator novo não herda respostas antigas. Registros ausentes ou remapeamento automático são recusados.
- As cinco questões legadas revisadas conservam enunciado e gabarito, com explicações específicas em todas as 20 alternativas.
- Dez classificações refletem a reavaliação; cinco itens saem de Elite, sem mudar seus textos. Valores fora da taxonomia e divergência entre parecer e item são recusados.
- Cinco famílias vinculam dez questões nos dois sentidos, sem novidade independente entre membros. Quebra de vínculo e marcação de novidade indevida são recusadas.
- O perfil conserva SVG e números, com aviso de esquema sem escala. O par de imagens acompanha `g10`, com datas, sensores, transcrição e créditos. Falta de texto alternativo ou de fonte registrada é recusada.
- ON, BNCC e FGDC possuem conferência direta delimitada, enquanto o endpoint histórico USGS conserva a verificação parcial verdadeira. O achado de acesso ao IBGE permanece aberto.
- As candidatas continuam recusadas para uso operacional, sem aprovação humana presumida, sem falsos registros de prova FGV e sem aumento do estoque aprovado.

Os cenários positivos de aprovação futura continuam usando dados explicitamente sintéticos e isolados. Nenhum registro real recebeu aprovação por causa deles.

## Ajustes durante a preparação

A primeira execução ampliada passou em 29 de 30 testes. O cenário de perda declarada removia um cartão, mas deixava sua classificação na preparação da mutação; o helper falhava antes de chegar ao validador. O cenário foi corrigido para remover também a classificação e ajustar o inventário simulado, mantendo a exigência de recusa da perda de recurso. A execução final passou integralmente.

A conferência documental também corrigiu o nome do campo usado para exibir os 12 critérios Premium nos rascunhos de auditoria. Os pacotes versionados trazem os títulos corretos; nenhum critério foi omitido ou marcado como aprovado.

## Limites e pendências

Os testes verificam integridade, rastreabilidade, regras de preservação e coerência do contrato. Não calibram dificuldade, não comprovam correção conceitual absoluta e não substituem parecer humano Premium.

As páginas de descrição/licença Wikimedia e o artigo/créditos NASA foram consultados diretamente. Downloads binários foram bloqueados no proxy; não se declara nova inspeção visual, hash ou teste de carregamento desses arquivos. O PDF cartográfico IBGE também continua sem conferência direta dos elementos gráficos. O bloqueio de acesso não é evidência de link quebrado.

O novo par de imagens, as famílias e as evidências por versão ainda não são consumidos pela aplicação. A futura integração precisa de adaptador e testes de navegador próprios antes de habilitar a base aprovada. Nenhuma mudança de XP, domínio, agenda ou progresso foi aplicada nesta rodada.

Os 36 itens autorais e as cinco questões legadas corrigidas aguardam revisão humana, assim como os critérios do conjunto das três unidades. Não houve promoção canônica, merge, publicação ou migração das outras 25 unidades.
