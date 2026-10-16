# Integração canônica de Cartografia — relatório de testes

Data: 16/10/2026. Branch: `v6-base-canonica`.
Implementação final: `8ab19368fb402a606d5645160e67d482ad850b19`.

## Resultado

**Build, 122 testes de integridade/lógica, 166 cenários globais de navegador e 25 recálculos do banco operacional passaram.** Após o ajuste final do tamanho dos rótulos do perfil, duas reconferências sobrepostas também passaram. Não são anunciados 168 fluxos independentes.

[Evidências estruturadas, resultados e hashes](v6-evidencias/resultado-integracao-canonica-cartografia.json). [Paridade operacional](V6_ISSUE13_PARIDADE_INTEGRACAO.json). [Relatório da integração](V6_ISSUE13_INTEGRACAO_CANONICA_CARTOGRAFIA.md).

| Verificação | Resultado | Alcance |
| --- | --- | --- |
| `npm run build` | Passou | Importação da biblioteca, geração canônica, TypeScript e Vite |
| `npm test` | **122 passaram** | 5 acervo, 58 regressões do snapshot/motor, 42 contrato canônico e 17 consumidor/progresso; sem falhas ou casos ignorados |
| `npm run check:canonical` | Passou | Três `1.0.0` aprovadas, 691 recursos, 685 procedências e 25 unidades não iniciadas |
| `node scripts/build-v6.mjs --check` | Passou | Banco e paridade gerados coincidem com os pacotes aprovados |
| Recálculos independentes | **25 passaram** | Operações confrontadas com as respostas do banco operacional `public/v6/cartografia.json` |
| Suíte global Playwright | **166 passaram** | 83 cenários na raiz e 83 no subdiretório GitHub Pages; zero falhas, ignorados ou resultados instáveis |
| Perfil após ajuste final | **2 passaram, sobrepostos** | Celular em tema escuro, nos dois endereços; contraste, tamanho de texto, tabela, nota, teclado e largura |
| Prettier e `git diff --check` | Passaram | Código alterado e integridade do patch |

Ambiente: Node 24.19.0, Vite 6.4.4 e Chromium instalado no sistema. Os fluxos de navegador bloqueiam requisições externas; a aplicação e seus dados são servidos localmente. A verificação cobre compatibilidade dos caminhos, sem publicar no domínio real do GitHub Pages.

## Conteúdo, aprovação e procedência

Foram conferidos o conteúdo operacional e as três bases aprovadas, sem dependência editorial dos HTMLs. Uma cópia temporária contendo apenas a pasta de bases produz o mesmo banco e a mesma paridade. Candidatas continuam recusadas para consumo.

As 21 peças das novas edições mantêm os textos de `0.1.2`. A comparação semântica retira apenas status e notas de revisão das questões: o restante do conteúdo e todo o suporte coincidem integralmente. As 161 respostas corretas e todos os textos de alternativas dessa candidata permanecem iguais. A correção do único distrator de GMS, em relação ao piloto inicial, continua explicitamente rastreada desde `0.1.1`.

O contrato recusa revisão por item ausente, autoria humana fictícia, digest divergente, delegação fora do escopo e consumo desabilitado. A cadeia da canônica também é verificada quando existe uma candidata diferente. As fixtures humanas antigas continuam sintéticas, não registros reais de aprovação.

Os 57 arquivos das três edições anteriores e os 31 HTMLs com suas cópias permanecem íntegros. O snapshot, o relatório histórico de paridade, lockfile, workflows e código dos outros módulos não foram alterados. IDs, fontes, variantes e procedências continuam disponíveis.

## Progresso e aprendizagem

Os 17 testes novos do consumidor cobrem:

- composição exclusivamente canônica e preservação dos recursos/suportes;
- execução sem HTMLs ou importadores;
- versão editorial e alternativa nas tentativas atuais;
- migração idempotente, cópia bruta e preservação de agenda, rascunhos, tentativas, XP e marcos;
- erros mistos e associações corrigidas, sem transferência de resposta a outro conceito;
- restauração de backups antigos e armazenamento sem espaço;
- gravação posterior de uma aba antiga, mesmo com marcador da edição atual;
- famílias na elegibilidade, recompensa, diversidade, novidade e seleção de prova;
- exclusão de evidências antigas incompatíveis e preservação do registro original;
- aplicação da classificação atual na estimativa, sem reescrever o histórico de Elite;
- ausência de recompensa duplicada por IDs antigos da mesma família;
- exigência de contextos independentes para erro convertido;
- retomada e encerramento idempotente de prova;
- rejeição de campos editoriais malformados, mantendo o esquema 6 antigo válido.

As 58 regressões anteriores usam o snapshot congelado para conservar suas assertivas históricas. Os 17 casos acima usam o banco operacional atual; não se apresenta teste apenas do legado como comprovação da integração nova.

## Navegador e inspeção visual

Os 20 cenários novos da integração, incluídos nos 166 globais, verificam: origem e fontes canônicas; mapa na tela real em 390 px claro/escuro e 320 px escuro, com teclado e redução de movimento; perfil; Landsat com rede externa indisponível; alternativa aposentada; histórico de erros; explicação de escala; e retomada de prova antiga. Cada cenário roda na raiz e no subdiretório.

As verificações anteriores de estudo, treino contextual/diagnóstico, favoritos, revisão espaçada, erros, backup, prova, temas, teclado, layouts, som e celebrações continuam passando. Nenhum erro JavaScript foi observado nos fluxos executados. Não se declara que todos os links e binários externos foram carregados com sucesso.

As capturas do mapa, do perfil e da alternativa textual Landsat foram inspecionadas. A cor dos rótulos do perfil passou a acompanhar o tema. Após a suíte global, a inspeção mostrou letras pequenas no esquema; a fonte foi ampliada por CSS, sem alterar SVG, números ou conteúdo. A build foi refeita, e o cenário do perfil passou novamente nos dois projetos, incluindo altura mínima do texto. Entre o snapshot da suíte global e o código final mudaram somente essa regra CSS e sua assertiva de navegador; os hashes estão nas evidências. Não se simula reexecução global após essa última mudança restrita.

## Descobertas intermediárias e correções

- Uma fixture antiga de aprovação sintética não declarava a cadeia da canônica. A validação ampliada a recusou; a fixture passou a declarar os deltas, preservando o teste de candidata independente.
- A primeira execução dos testes do mapa usou um seletor que abrangia dois `summary`, incluindo procedência. Foi corrigido para o título direto da seção. As seis falhas daquela tentativa não eram erros JavaScript do produto.
- Uma chamada a `findLast` não era compatível com a biblioteca TypeScript configurada. Foi substituída por `filter(...).at(-1)`, mantendo o alvo existente; a build final passou.
- A inspeção visual identificou o tamanho insuficiente dos rótulos do perfil; a correção e as reconferências finais estão descritas acima.

As tentativas intermediárias não são somadas aos números finais. Nenhum desses casos foi ocultado por edição dos relatórios históricos.

## Limites e publicação

Testes não medem aprendizagem, calibração psicométrica ou aprovação em concurso. O parecer editorial está nos pacotes, com autoria por IA explícita. Não há novo teste humano de conforto sensorial nem validação física dos binários externos. A prova oficial completa continua condicionada ao estoque das demais áreas.

Não houve migração das outras 25 unidades, merge, publicação ou execução do workflow de Pages. `main`, `v6-planejamento` e `v6-piloto-cartografia` permanecem preservadas.
