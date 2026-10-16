# V6 — Fase 14: consolidação do padrão técnico

**Decisão posterior:** o usuário autorizou o [encerramento técnico com ressalva sensorial e o início da Issue #13](V6_FASE14_ENCERRAMENTO_TECNICO.md), em branch própria. O registro abaixo preserva o estado anterior dessa consolidação; suas restrições de início foram superadas somente no escopo autorizado. A aprovação sensorial e a editorial não são presumidas.

Registro: 16/10/2026, America/Sao_Paulo. Branch: `v6-piloto-cartografia`.
Referência consolidada: `e7302000106b70c0fcaa37594d575e4a8b92d0f8`.

**Situação: referência técnica consolidada, com ressalva de experiência sensorial.** Este documento fixa o que já foi implementado e verificado. Não declara encerramento integral da Fase 14, aprovação editorial, publicação ou autorização de escala.

## Retorno e continuidade autorizada

O usuário informou no chat:

> Continua a mesma coisa e sinceramente ? se não implciar em nada, vamos em frente e dar continuidade

Esse retorno autoriza continuar a organização técnica sem exigir outra repetição da reconferência P1/P3. Registra também que a diferença visual ainda não foi percebida. Não há confirmação do endereço, da versão aberta ou do uso dos modos sensoriais nesse retorno; portanto, não se atribui uma causa definitiva à aparência relatada nem se registra aprovação dos efeitos novos.

A continuidade desta rodada é documental. Não altera conteúdo, gabaritos, métricas, progresso, preferências, interface ou configuração de publicação. A ressalva visual permanece aberta e não é apresentada como um erro conceitual no material de estudo.

## Versão de código e versão acessível

Na conferência desta rodada, as referências remotas eram:

| Referência | Commit | Entrada no código |
| --- | --- | --- |
| `main` | `d33acb4b544ea01ed501807603f9b9288f9ac830` | Biblioteca, `src/main.tsx` |
| `v6-piloto-cartografia` | `e7302000106b70c0fcaa37594d575e4a8b92d0f8` | Piloto, `src/v6/main.tsx` |
| `v6-planejamento` | `fc8023b9b99cf2978f21e613e43d232aa53643b0` | Documentação oficial |

Uma branch no GitHub não cria automaticamente uma prévia navegável. O workflow `Publicar no GitHub Pages` depende de acionamento manual; não foi acionado nesta rodada nem na implementação sensorial. Não foi criado um endereço hospedado de teste.

A consulta direta ao endereço público foi impedida pelo acesso de rede da ferramenta (`Tunnel connection failed: 403 Forbidden`). Isso não comprova indisponibilidade do site nem identifica o que o usuário abriu. A comparação acima é dos arquivos e das referências Git, não de uma inspeção bem-sucedida do site publicado.

Na cópia da branch, a raiz e `/v6.html` abrem o piloto. Os demais materiais ficam em `/biblioteca.html`. O [guia](V6_FASE14_GUIA_PILOTO.md) descreve a execução; as [capturas da implementação](V6_FASE14_GAMIFICACAO_SENSORIAL_IMPLEMENTACAO.md) permitem consultar a aparência registrada sem criar uma publicação.

## Contratos técnicos consolidados

| Área | Contrato a preservar | Referência |
| --- | --- | --- |
| Escopo | Somente as unidades `cartografia-fundamentos`, `cartografia-representacao` e `geotecnologias` | [Paridade](V6_FASE14_RELATORIO_PARIDADE.md) |
| Navegação | Estudo, Treino, Revisão e Prova separados; destino contextual respeitado mesmo com sessão anterior | [Correções P1/P3](V6_FASE14_CORRECOES_P1_P3.md) |
| Separação de camadas | Conteúdo estruturado, motor pedagógico, persistência e apresentação com responsabilidades distintas | [Arquitetura entregue](V6_FASE14_GUIA_PILOTO.md) |
| Feedback | Questão, cartão e V/F com explicação; tentativa antes da revelação; erro não resolvido apenas por leitura | [Auditoria Premium](V6_FASE14_AUDITORIA_PREMIUM.md) |
| Identidade | IDs canônicos estáveis; opções vinculadas ao ID, não à posição; `legacy_source`, `legacy_id` e hash mantidos | [Registro de IDs](../scripts/v6-ids.json) e [manifesto de paridade](V6_FASE14_PARIDADE.json) |
| Treino e prova | Sessão considera unidade, missão, banco, tipo e itens; ordem salva; distribuição A–E sem ciclo previsível; prova sem feedback antecipado | [Testes e regressões](V6_FASE14_RELATORIO_TESTES.md) |
| Flashcards | Errei/Difícil/Bom/Fácil; agenda individual; Difícil é recuperação com esforço e não cria erro conceitual | [Segunda rodada](V6_FASE14_CORRECOES_RODADA2.md) |
| Erros e domínio | Evidência posterior, variedade e intervalo para recuperação; estimativa de domínio com confiança; leitura e XP separados dessa estimativa | [Auditoria Premium](V6_FASE14_AUDITORIA_PREMIUM.md) |
| Recompensa | Mesmo ledger de XP; sem farming por navegação/repetição; streak por dia civil local; checkpoint não equivale a domínio | [Implementação sensorial](V6_FASE14_GAMIFICACAO_SENSORIAL_IMPLEMENTACAO.md) |
| Experiência | Mobile-first, claro/escuro/sistema, teclado, feedback em texto e ícone, divulgação progressiva e redução de movimento soberana | [Matriz verificada](V6_FASE14_AUDITORIA_PREMIUM.md) |
| Camada sensorial | Opcional; Equilibrado e som desligado por padrão; áudio iniciado por gesto; sem sons/celebrações na Prova; conforto percebido ainda não confirmado | [Implementação sensorial](V6_FASE14_GAMIFICACAO_SENSORIAL_IMPLEMENTACAO.md) |
| Legado | HTMLs preservados para rastreabilidade; edições arquivadas fora do catálogo ativo, busca, favoritos e retomadas | [Correções e decisões](V6_FASE14_CORRECOES_RODADA2.md) |

## Persistência e compatibilidade

O estado autoritativo permanece no esquema 6, chave `missaoGeo.v6.cartografia`. O espelho do Caderno Global usa `missaoGeo.v6.errors`, sob `modules.cartografia`, sem substituir dados de outros módulos. As cópias `.recovery` e `.before-restore` mantêm suas funções de recuperação e proteção da restauração.

`preferences.experience`, `preferences.sound` e `session.sensorySummary` são adições opcionais. Backups anteriores continuam aceitos; não se inventa balanço retroativo de rodada. Efeitos transitórios não são reproduzidos novamente por reload ou restauração.

A importação legada continua explícita, idempotente e conservadora. Preserva o bruto, não fabrica datas, XP ou domínio e mantém índices ambíguos de Cartografia II como versão incerta. Armazenamentos de localhost, Codespaces e GitHub Pages pertencem a origens diferentes; não há sincronização de conta. A política não foi alterada nesta consolidação.

## Evidência disponível

Os [resultados estruturados](v6-evidencias/resultado-sensorial.json) e o [relatório de testes](V6_FASE14_RELATORIO_TESTES.md) registram:

- build com TypeScript e geração reproduzível aprovadas;
- 63 testes de integridade/lógica aprovados;
- 146 cenários globais de navegador, 73 por caminho, aprovados sobre `704dd7c`;
- 22 revalidações posteriores das celebrações sobre `bdda892`/`dbbf058`, aprovadas e sobrepostas à suíte global;
- 685 registros de paridade e 31 HTMLs históricos preservados;
- reconferência independente P1/P3 recebida sem bloqueador remanescente nesse escopo.

Esta consolidação não reexecuta nem amplia esses resultados. Não se apresenta como outra auditoria independente, teste de conforto sonoro, revisão editorial ou comprovação de retenção humana.

A conferência documental desta rodada verificou 76 links locais nos oito documentos novos/atualizados, sem destino ausente, e ausência de erros em `git diff --check`. Comparou ainda 94 arquivos protegidos com a referência `e730200`, todos idênticos byte a byte: código, scripts, testes, workflows, banco, evidências, fontes HTML e registros de paridade. Entre eles estão os 31 HTMLs históricos. São verificações desta consolidação, separadas das suítes anteriores.

## Pendências e efeito sobre a próxima etapa

| Pendência | Consequência |
| --- | --- |
| Usuário ainda não percebeu a mudança sensorial; versão acessada não identificada | Manter a ressalva visual. Não registrar aceite dos sons, intensidade ou celebrações sem observação correspondente |
| 36 questões autorais em `human-review-pending` | Permanecem pendentes; verificação técnica não as promove a aprovadas |
| Distrator histórico redundante de GMS e recomendações editoriais já registradas | Preservar original e ressalva; eventual alteração deve ter revisão e histórico |
| Estoque aprovado insuficiente para prova oficial completa | Bloqueio mantido; não preencher com Fixação ou conteúdo não aprovado |
| Nenhuma unidade em `APROVADA_CANONICA` | Não tratar o JSON atual como Base Canônica editorial aprovada |
| Build atual ainda extrai conteúdo histórico | Limitação conhecida; substituir por consumo da base aprovada na etapa própria, sem reinterpretar unidades já promovidas |
| Dispositivos físicos, leitores de tela e uso longitudinal | Permanecem limites da evidência, não verificações realizadas |

## Continuidade sem mistura de etapas

O resultado desta rodada é uma referência única dos contratos técnicos já verificados e das decisões que continuam abertas. Não é necessário repetir B1/B2/C1 ou P1/P3 apenas para registrar este avanço.

O encerramento integral do piloto deve distinguir a decisão sobre a ressalva sensorial da revisão editorial. A [ordem oficial da Issue #12](https://github.com/ude-ctrl/Estudo-para-Concurso/issues/12#issuecomment-6205257717) e a [política de Base Canônica](https://github.com/ude-ctrl/Estudo-para-Concurso/blob/v6-planejamento/MissaoAprovacaoGeo/V6_POLITICA_BASE_CANONICA_CONTEUDO.md) continuam registradas, sem presumir aceite que não foi comunicado.

A próxima etapa de conteúdo prevista é a Issue #13, em branch própria, após o fechamento do piloto e comando para iniciá-la. Ela deverá produzir auditoria e promoção versionada unidade por unidade. Esta consolidação não inicia a Auditoria Mestra, não cria bases aprovadas e não migra outro módulo. Merge e publicação continuam fora da autorização atual.
