# V6 — Fase 14: relatório de testes

**Consolidação documental — 16/10/2026, America/Sao_Paulo:** os resultados abaixo foram vinculados à [referência técnica do piloto](V6_FASE14_PADRAO_TECNICO.md), após o usuário autorizar continuidade com ressalva sobre a aparência. Esta rodada não altera código ou banco e não reexecuta as suítes; mantém os commits, a cobertura e os limites das evidências anteriores. A validação desta rodada se limita à documentação e à ausência de alterações nos arquivos protegidos.

## Gamificação Sensorial — rodada posterior autorizada

Execução: **16/10/2026 UTC**, somente em `v6-piloto-cartografia`. Funcionalidade em `83a616c`; ajuste do foco em `28ed734`; preparação dos testes em `704dd7c`. O refinamento posterior dos avisos está em `bdda892`, com revalidação própria descrita abaixo. [Escopo e decisões](V6_FASE14_GAMIFICACAO_SENSORIAL_IMPLEMENTACAO.md).

**Resultado da bateria global: 63 testes de integridade/lógica e 146 cenários de navegador aprovados**, 73 pela raiz e 73 por `/Estudo-para-Concurso/`, sem falhas, ignorados ou resultados instáveis. A execução global de navegador verificou `704dd7c` e durou aproximadamente **294 segundos**. São os 100 cenários anteriores e 46 da camada sensorial. A build com TypeScript estrito, a geração reproduzível e a formatação dos arquivos de código/testes alterados passaram. Evidência estruturada: [resultado-sensorial.json](v6-evidencias/resultado-sensorial.json).

Os 63 testes são cinco do acervo e 58 V6. As dez novas verificações de lógica cobrem preferências e backups anteriores, checkpoints sem falso domínio, balanço fiel ao ledger, ausência de XP adicional, precedência dos eventos, critérios de conclusão do módulo, nível separado de domínio, sequência civil, prova silenciosa e ciclo de vida do áudio.

Os 23 cenários sensoriais por caminho cobrem percurso e navegação livre por teclado; persistência e restauração das preferências; feedback comum/Elite/erro; ausência de efeito em repetição imediata ou reload; áudio com opt-in, Web Audio nativo, API indisponível e retomada pendente cancelada; desligamento em outra aba e página oculta; Chefão em cinco combinações de intensidade/movimento; erro convertido; conclusão de módulo; balanço de revisão com Difícil sem erro; prova em andamento; dark mode e viewport mobile. A ampliação a 200% foi verificada no dashboard em 430 px. Os casos V6 observam exceções via `pageerror`.

As rodadas preliminares de 38 cenários sensoriais e oito de áudio/ciclo de vida passaram. As revalidações de foco e de teclado/layout passaram em 12 execuções cada. Essas execuções se sobrepõem à bateria global; não são apresentadas como cenários exclusivos adicionais.

Histórico preservado: a primeira bateria global teve 145 acertos e uma falha de foco no seletor Banco; a restauração passou a ocorrer após o commit da rota. A segunda teve 145 acertos e uma falha de primeiro Tab porque o teste podia encontrar o `h1` da tela de carregamento antes do workspace. Esse caso foi reproduzido com a resposta do banco pendente, e a preparação passou a aguardar a interface real antes de testar teclado ou medir layout. As exigências de foco e ausência de overflow foram mantidas. A bateria global posterior, citada acima, passou sem retries.

Após a inspeção visual, o aviso de módulo passou a exigir dispensa manual, e os demais avisos pausam o fechamento durante foco/hover. A revalidação posterior exercita as celebrações antigas e novas, preservação de XP, ausência de repetição e de efeitos na Prova, movimento reduzido, foco e duração do aviso. O teste de expiração foi ajustado para retirar tanto o foco quanto o ponteiro antes de avançar o relógio; manter qualquer um deles sobre o cartão deve preservar a leitura. Os resultados dessa revalidação estão separados no JSON de evidências.

**Revalidação posterior aprovada: 22 execuções**, 11 por caminho, no commit de testes `dbbf058` sobre a implementação `bdda892`; duração aproximada de 37 segundos, zero falhas, ignorados ou resultados instáveis. A build posterior ao refinamento dos avisos também passou. Essas 22 execuções são um recorte da suíte global com verificações de duração acrescentadas; não são 22 cenários exclusivos adicionais. O teste pontual de liberação de foco/ponteiro passou nos dois caminhos antes dessa revalidação completa dos avisos.

**Preservação:** banco, gabaritos, registro de IDs e proposta sensorial original sem alterações; 685 registros de paridade e 31 HTMLs preservados. As regras de XP, agenda, erro, domínio, B1/B2/C1 e seleção de sessão P1 não foram reescritas. Os 36 itens autorais permanecem pendentes de revisão humana, sem promoção canônica; a prova oficial completa continua bloqueada por estoque aprovado insuficiente.

As capturas foram inspecionadas para hierarquia, legibilidade, modo escuro e posição dos avisos. Usam fixtures, não progresso real do usuário. O Web Audio nativo foi exercitado, mas conforto e volume percebidos requerem o teste humano previsto nesta rodada. Não há alegação de teste físico iOS/Android, auditoria completa com leitores de tela, ganho pedagógico longitudinal ou medição de desempenho em redes móveis reais. Não foram adicionadas bibliotecas, música ou downloads de áudio. O aceite anterior não equivale ao aceite humano dos efeitos novos.

## Reconferência P1/P3 comunicada pelo usuário

Em 16/10/2026 UTC, o usuário informou que reexecutou a build, os **53 testes de integridade/lógica e os 100 cenários de navegador**, todos aprovados, além de **oito verificações adicionais** dos fluxos solicitados. O parecer concluiu que **não resta bloqueador técnico no escopo P1/P3**; a revisão editorial dos itens autorais permanece pendente. O [registro integral da reconferência](V6_FASE14_RECONFERENCIA_P1_P3.md) delimita a procedência e o alcance desse resultado. Esta atualização é documental; não representa uma nova execução da suíte pela implementação.

## Correções P1/P3 — treino contextual, diagnóstico e favoritos

Execução: **16/10/2026 UTC**. Branch exclusiva: `v6-piloto-cartografia`. Implementação verificada: **`c872886fbe544a265a0e9e038e7e10fdc95ee5f2`**, sobre a base auditada `1285715`.

**Resultado final: build aprovada, 53 testes de integridade/lógica aprovados e 100 cenários de navegador aprovados**, 50 pela raiz e 50 por `/Estudo-para-Concurso/`. Zero falhas, testes ignorados ou resultados instáveis. Duração da bateria completa de navegador: aproximadamente 172 segundos. Evidência estruturada, com casos, projetos, resultados e duração: [resultado-p1-p3.json](v6-evidencias/resultado-p1-p3.json).

Antes da correção funcional, duas novas verificações falharam na build de `1285715`, reproduzindo a retomada indevida de Orientação ao pedir Escalas e o contador de favorito arquivado. Essas falhas registram a versão anterior. As rodadas direcionadas passaram em 28 execuções P1/P3 e quatro de foco/Game; são cobertura sobreposta à bateria completa, não 32 cenários exclusivos adicionais. A bateria completa acima usa o código final, incluindo os refinamentos de foco e Game.

Os 53 testes são cinco do acervo e 48 V6. As duas novas verificações de lógica conferem a compatibilidade de todos os IDs, unidade, missão, banco e tipo da sessão, além da retomada com banco opcional e dos backups anteriores. A build verifica TypeScript estrito. A geração `node scripts/build-v6.mjs --check`, a formatação dos arquivos de código/testes alterados e `git diff --check` passaram.

Cobertura de regressão acrescentada nesta rodada:

- sessão de Orientação em andamento ou concluída → Estudo de Escalas → **Testar este raciocínio**, tanto pela entrada principal quanto por `/v6.html`;
- **Diagnosticar** com Fixação em andamento/concluída, diagnóstico concluído, Game ou flashcards salvos;
- preservação da sessão anterior, respostas e XP antes do início explícito da nova fila; missão/banco corretos após iniciar, reload e retomada pelo painel;
- mudanças de query na mesma unidade, controles sincronizados com a URL, setas do teclado mantendo o foco e histórico de voltar do navegador;
- backups anteriores com missão inicial artificial e retomada do diagnóstico preparado ainda sem sessão;
- início explícito do Game da unidade a partir de preparação contextual e retorno ao atalho de questões de Escalas;
- contador com somente favorito arquivado, ou mistura de ativos, arquivados, desconhecidos e duplicados; armazenamento e backup preservados.

Todos os casos são executados nos dois caminhos. A suíte mantém as verificações anteriores de B1/B2/C1, temas, teclado, movimento reduzido, celebrações e demais fluxos. Os fluxos V6 conferem a ausência de exceções JavaScript via `pageerror`.

O banco pedagógico, o mapa com 685 registros de paridade, o registro congelado de IDs e a proposta documental de gamificação sensorial não sofreram alterações. Os testes confirmaram os 31 HTMLs históricos byte a byte. Os 36 itens autorais continuam `human-review-pending`, e a prova oficial completa permanece bloqueada por estoque aprovado insuficiente.

O parecer independente anterior confirmou B1/B2/C1, mas reteve a liberação por P1. Os resultados desta seção documentam a execução da implementação, quando a reconferência ainda estava pendente; o parecer posterior está registrado no início deste relatório. O aceite de uso já comunicado continua válido. Detalhes e decisões: [correções P1/P3](V6_FASE14_CORRECOES_P1_P3.md).

## Segunda rodada — correções após auditoria independente e rejeição UX

As falhas B1 (ciclo de gabarito), B2 (Difícil como erro), C1 (dia UTC) e a exposição indevida do legado não foram detectadas ou resolvidas pela bateria da primeira entrega descrita abaixo. Esses resultados históricos são mantidos para rastreabilidade e não representam aprovação humana.

As correções e seus limites estão em [V6_FASE14_CORRECOES_RODADA2.md](V6_FASE14_CORRECOES_RODADA2.md). A suíte de integridade/lógica dessa rodada passou em **51 testes: 5 do acervo +46 V6**. A bateria global passou em **72 cenários de navegador**, 36 em cada caminho, no commit `e400d86`. O ajuste visual seguinte, commit `bf421cd`, colocou as celebrações no fluxo sem sobrepor ações e recebeu **10 revalidações específicas**, também aprovadas. Entre esses dois commits não houve alteração do motor pedagógico. Evidência: [resultado-rodada2.json](v6-evidencias/resultado-rodada2.json).

Resultado final das duas baterias de navegador: zero falhas, testes ignorados ou resultados instáveis. Durações aproximadas: 122 segundos na bateria global e 25 segundos na revalidação visual. A última build com TypeScript passou. A geração `--check` conferiu os arquivos de conteúdo e paridade sem diferenças.

Uma bateria intermediária desta rodada teve duas falhas, uma por caminho, porque um seletor antigo de retomada passou a encontrar dois elementos. O seletor foi restringido ao material correto; a repetição global passou. Na inspeção visual, a primeira posição da celebração podia cobrir ações no celular; o aviso foi movido para o fluxo e os testes agora conferem a separação geométrica entre aviso e botão, além de teclado, movimento e persistência. Esse histórico é mantido sem atribuir os resultados intermediários à bateria final.

Cobertura acrescentada:

- raiz abrindo V6 e acesso aos demais módulos por `/biblioteca.html`;
- ausência de Cartografia histórica em catálogo ativo, busca, favoritos e retomadas, preservando backup das 30 fontes;
- URLs anteriores encaminhadas ao destino adequado sem reabrir a edição não auditada;
- sete revisões editoriais canônicas, com originais e 685 registros de paridade intactos;
- diagnóstico direto e treino contextual da missão estudada;
- temas no cabeçalho, microcelebração normal/reduzida, teclado, persistência e ausência de recompensa por alternativa ou XP adicional;
- 160 montagens de prova testadas para equilíbrio sem ciclo periódico ou run de três letras, ordem reproduzível e persistente;
- Difícil sem criação/reativação de erro, intervalo menor e Errei ainda criando lapsos; falso domínio permanece coberto;
- calendário local em UTC−3, mudança de offset, migração conservadora e fronteira de meia-noite no navegador;
- restauração sem manter sessão ou marcos ausentes do backup.

## Histórico da primeira entrega

Execução final: 15/10/2026. Branch exclusiva: `v6-piloto-cartografia`. Implementação verificada: commit `410e3ac`.

Resultado: **build aprovada; 39 testes de integridade/motor aprovados; 54 cenários de navegador aprovados**, sem falhas, testes ignorados ou resultados instáveis na bateria final. Este resultado técnico não substitui a revisão pedagógica humana.

Evidência estruturada: [resultado-testes.json](v6-evidencias/resultado-testes.json).

## Ambiente e comandos

- Node 24.19.0; projeto declara Node ≥22.12.
- Chromium 154.0.8037.57, instalado em `/usr/bin/chromium`.
- Build Vite 6.4.4 com verificação TypeScript estrita.
- Servidor de testes: build de produção, porta 4173.
- Dois projetos Playwright: raiz `/` e subdiretório `/Estudo-para-Concurso/`.

```sh
npm run build
npm test
node scripts/build-v6.mjs --check
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e -- --reporter=json
```

O download do navegador Playwright foi bloqueado pela rede. O Chromium já instalado permitiu executar toda a suíte. Não foi necessário modificar dependências ou workflows para contornar o bloqueio. Não se afirma execução local em Node 22, Firefox, Safari ou dispositivos físicos.

## Integridade e conteúdo — 5 testes existentes + 34 V6

| Grupo | Verificação realizada | Resultado |
| --- | --- | --- |
| Acervo anterior | SHA-256 e cópias publicadas dos 31 HTMLs comparados byte a byte ao inventário existente | Passou |
| Fontes principais | Hashes congelados das três fontes e contagens de B/PRE/CH/C/G/recalls | Passou |
| Teoria | Texto `h`, título e hook de cada uma das 50 etapas confrontados integralmente | Passou |
| Procedência | 685 registros históricos com destino, `legacy_source`, `legacy_id` e hash do original verificáveis | Passou |
| Gabaritos legados | 125 alternativas corretas conferidas contra a fonte, com opções e explicações preservadas | Passou |
| Consolidação | 151 registros C →119 objetos; 302 registros G →256 objetos; variantes e justificativas preservadas | Passou |
| Complementos | 6 procedências discursivas, 9 suplementos e somente 3 itens secundários autorizados pela análise | Passou |
| Identidade | IDs canônicos congelados; IDs de opções únicos e resposta vinculada ao ID, não à posição | Passou |
| Banco novo | 36 itens, 12 por unidade; 18 Concurso/18 Elite; cinco opções; uma correta; letras equilibradas; status pendente de revisão humana | Passou |
| Cálculos | Conferência independente de distâncias, GMS, áreas, redimensionamento, fusos, declividade, densidade, 14 bits e NDVI | Passou |
| Duplicatas | Ausência de duplicata exata de questão/opção; redundância numérica conhecida de T02 `b_6_0` sinalizada, gabarito correto | Passou |
| HTML de teoria | Sem handlers executáveis transplantados; IDs com namespace; ausência de colisões no conjunto renderizável | Passou |
| Agenda | Intervalos iniciais, multiplicadores, lapsos, fila vencida antes de novos e retorno de Errei | Passou |
| Retentativa precoce | Não amplia vencimento artificialmente; cada Errei retorna só uma vez, sem fila infinita | Passou |
| XP | Sem prêmio por leitura/abertura; repetição imediata não multiplica XP; revisão realmente vencida premia uma vez | Passou |
| Caderno | Erro não resolve por acerto imediato; recuperação tardia, outro item e revisões consistentes exigidos para domínio após erro | Passou |
| Falsa confiança | Fácil seguido de erro relacionado reabre dificuldade e antecipa revisão | Passou |
| Domínio | Sem número antes de estudo, 10 itens distintos, cobertura mínima, diversidade de atividade e retenção após intervalo | Passou |
| Prova | IDs sem repetição, diversidade de missões, opções estáveis, posições A–E equilibradas, novidade e correção idempotente | Passou |
| Blueprint | Fixtures abstratas montam 60 posições nas cinco áreas; estoque insuficiente bloqueia montagem | Passou |
| Legado | Bruto intacto, importação idempotente, respostas inválidas sem evidência, sem XP/domínio inventados | Passou |
| Versão incerta | Índices ambíguos de T03 e chave T17 v25 arquivados sem interpretação automática | Passou |
| Revalidação | Cartão importado usa intervalos iniciais e não recebe XP de revisão vencida presumida | Passou |
| Resiliência | Cópia corrompida, versões incompatíveis, históricos internos inválidos e chaves de protótipo rejeitados | Passou |
| Armazenamento | Falha de quota mantém sessão em memória e avisa; revisão recente é relida; espelho global preserva outros módulos | Passou |
| Restauração | Cópia anterior preservada e cópia defeituosa rejeitada antes da substituição | Passou |
| Geração reproduzível | Arquivos gerados coincidem exatamente com a execução `--check` | Passou |

As contagens dos recursos novos são conferidas separadamente das contagens de origem. O cartão novo de áreas não é apresentado como legado. A prova oficial não usa itens com `human-review-pending`.

## Navegador — 27 cenários em cada caminho, 54 execuções

Cada cenário observou exceções JavaScript da página via `pageerror`; a suíte final não registrou exceções nos fluxos exercitados.

| Cenário V6 | O que foi observado |
| --- | --- |
| Entrada e retomada | Três unidades, cinco destinos principais, retorno ao percurso e acesso ao portal anterior |
| Estudo | Todas as 17 missões abrem, texto aparece, IDs não colidem, leitura persiste após reload |
| Questões | Confirmar exige seleção, resposta persiste, feedback explica o distrator e cria registro no caderno |
| Recall | Tentativa exigida antes do modelo, rascunho persiste e autoavaliação registra evocação |
| Flashcards | Quatro avaliações só após tentativa e verso; Errei atualiza agenda e fila persistente |
| Game | Justificativa e exemplo presentes; timer opcional expira; encerrar não deixa callback acessando jogo inexistente |
| Prova | Sem feedback antecipado, seleção e relógio sobrevivem a reload, correção inclui omissões |
| Prazo e estoque | Relógio continua fora da tela e perfil oficial completo declara insuficiência de estoque |
| Discursiva | Texto persiste, modelo só após finalizar, rubrica fica no histórico |
| Prática | Plano → defesa → quatro dimensões do plano/seis da defesa; sequência e timer persistem |
| Migração | Importação explícita; ambiguidades preservadas; nenhuma evidência V6 fabricada; chave antiga intacta |
| Backup | Exportação/restauração mantém rascunhos e cópia incompatível não substitui estado |
| Responsividade | Telas de estudo, treino, revisão, prova, caderno e preferências sem overflow em 360, 390 e 430 px |
| Aparência e acesso | Dark do sistema/manual, override claro, movimento reduzido e atalho de conteúdo |
| Mídia indisponível | Imagem externa falha com descrição de fallback; explicação continua acessível |
| Quota | Aviso de memória temporária e exportação continuam funcionais |
| Teclado e abas | Setas selecionam rádio, Tab/Enter confirmam; preferências recentes chegam à outra aba sem apagar a outra preferência |
| Diagnóstico/pós-teste | Mesmos IDs e comparação de resultados, com aviso de que melhora imediata não comprova retenção |
| Redundância numérica | Equivalência dos distratores de GMS aparece na explicação, mantendo o gabarito histórico |

Os outros nove cenários por caminho são os testes existentes do portal: acervo, busca/filtros, favoritos, progresso, atalhos, leitura legada, exportação, recursos e layout mobile. Esses testes passaram sem modificar a interface ou o conteúdo de outro módulo.

Estatísticas Playwright finais: `expected=54`, `unexpected=0`, `flaky=0`, `skipped=0`; duração aproximada de 68 segundos. O relatório JSON relaciona cada caso e seu projeto.

## Problemas encontrados e corrigidos

1. Normalização inicial removia sinais matemáticos: corrigida para distinguir alternativas positivas e negativas; todos os gabaritos foram novamente confrontados.
2. Guias e categorias amplas podiam encaminhar itens ao conceito errado: destinos de escala, latitude, SIG, pixel, projeções e resoluções foram refinados; teste garante cartões para todos os conceitos dos itens novos.
3. Retentativa de flashcard podia alongar intervalo sem espera: revisão precoce agora mantém o vencimento, sem XP de revisão presumida.
4. Comparação pré/pós aparecia durante questões, mas faltava na conclusão: movida para o encerramento e verificada nos dois caminhos.
5. Foco de teclado precisava acompanhar o conteúdo: foco foi definido na navegação, nova questão, feedback e verso do cartão.

Seletores de testes foram ajustados para usar o nome acessível dos comboboxes e aguardar a montagem inicial. Uma execução intermediária coincidiu com reconstrução de `dist`, gerando 404 transitório; a bateria final usou build congelada e terminou sem falhas ou retries.

## Mídias e limites da evidência

Os testes de fluxo bloqueiam recursos externos para tornar falhas de imagem/fontes reproduzíveis e evitar que disponibilidade de terceiros masque o comportamento local. A disponibilidade real de algumas mídias foi consultada separadamente: Mercator, Gall-Peters e as duas imagens NASA responderam; diversos endpoints IBGE recusaram a ferramenta com 403. Não se conclui “link quebrado” a partir disso.

Não foram executados: teste longitudinal com estudantes, calibração psicométrica do domínio, correção humana das discursivas, avaliação oral real por banca, auditoria integral com leitores de tela, teste físico iOS/Android ou medição de desempenho em redes móveis reais. Os testes com tempo usam relógio controlado; não equivalem a acompanhar retenção humana durante semanas.

Não há alegação de aprovação pedagógica automática ou conformidade integral WCAG. Na primeira entrega aqui registrada, o aceite humano ainda estava pendente; o aceite de uso posterior e a reconferência técnica P1 estão distinguidos na atualização no início deste relatório.
