# V6 — Fase 14: relatório de testes

## Segunda rodada — correções após auditoria independente e rejeição UX

As falhas B1 (ciclo de gabarito), B2 (Difícil como erro), C1 (dia UTC) e a exposição indevida do legado não foram detectadas ou resolvidas pela bateria da primeira entrega descrita abaixo. Esses resultados históricos são mantidos para rastreabilidade e não representam aprovação humana.

As correções e seus limites estão em [V6_FASE14_CORRECOES_RODADA2.md](V6_FASE14_CORRECOES_RODADA2.md). A suíte atual de integridade/lógica passou em **51 testes: 5 do acervo +46 V6**. A bateria global passou em **72 cenários de navegador**, 36 em cada caminho, no commit `e400d86`. O ajuste visual seguinte, commit `bf421cd`, colocou as celebrações no fluxo sem sobrepor ações e recebeu **10 revalidações específicas**, também aprovadas. Não houve alteração posterior do motor pedagógico. Evidência: [resultado-rodada2.json](v6-evidencias/resultado-rodada2.json).

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

Não há alegação de aprovação pedagógica automática ou conformidade integral WCAG. O aceite humano do piloto continua pendente.
