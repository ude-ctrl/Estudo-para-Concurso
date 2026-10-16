# Fase 14 — mapa de paridade anterior à implementação

Data: 15/10/2026. Branch exclusiva: `v6-piloto-cartografia`.
Baseline: `2761cf4b8a6f828b55d4d405b92f74bb4025f26d`.
Estado deste documento: análise concluída; decisões propostas para implementação do piloto. A aceitação final depende de revisão humana.

## Autoridade e leitura

Issue [#12](https://github.com/ude-ctrl/Estudo-para-Concurso/issues/12), corpo integral e comentário de confirmação, e `V6_CODEX_HANDOFF.md` lidos integralmente antes deste arquivo. Também lidos, na ordem do handoff: Plano Mestre; Checklist; Arquitetura Reutilizável; Arquitetura Definitiva Fase 2; Mapa de Módulos; Matriz de Redundância; Matriz Premium UX Fase 3; Gamificação Fase 4; Feedback Universal Fase 5; Banco de Questões Fase 6; Flashcards/Revisão Fase 7; Caderno de Erros Fase 8; Métrica de Domínio Fase 9; Gerador de Simulados Fase 10; Discursivas Fase 11; Prova Prática Fase 12; Correções/Lacunas Fase 13; Auditoria de Cartografia.

As três fontes abaixo foram inspecionadas integralmente: HTML estático, CSS, bancos literais, atribuições posteriores de recalls, suplementos, funções JavaScript, persistência e mídias. O CSS e os mecanismos idênticos foram comparados por diff; as diferenças foram lidas. A referência visual de Conceitos e Autores foi inspecionada para tipografia, densidade, cores, feedback e navegação. Seus conteúdos não entram nesta migração.

## Fontes congeladas e contagens

Os identificadores T02, T03A e T17 abaixo são abreviações de procedência, não IDs de progresso V6.

| Fonte HTML em `MissaoAprovacaoGeo/` | Etapas B | Questões B | PRE | Chefão CH | Flashcards C | V/F G | Recalls |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| T02 `SEDUC_PA_Tema_02_Cartografia_I_MATRIZ_OFICIAL_V2_6.html` | 15 | 30 | 3 | 5 | 50 | 100 | 15 |
| T03A `SEDUC_PA_Tema_03_Cartografia_II_MATRIZ_OFICIAL_V2_6_AUDITADA.html` | 17 | 35 | 3 | 5 | 50 | 100 | 17 |
| T17 `SEDUC_PA_Tema_17_Cartografia_Geotecnologias_e_Representacao_do_Espaco.html` | 18 | 36 | 3 | 5 | 50 | 100 | 7 |
| Total de registros históricos | **50** | **101** | **9** | **15** | **150** | **300** | **39** |

São 125 registros de questões; o pós-teste reutiliza PRE e não aumenta o banco. Há seis comandos discursivos nas fontes, mas os dois de T03A são cópias exatas dos de T02: quatro distintos. Os três suplementos de T03A (matriz, discursivas, professor) são cópias de T02. O roteiro didático de T17 ensina a mesma relação de escala, mas contém abertura e sequência diferentes e precisa sobreviver.

SHA-256 das fontes:

| Fonte | SHA-256 |
| --- | --- |
| T02 | `cc976ddf7ca014693868786b4a6d306ba9d9d04a6fd13283856fb77662610906` |
| T03A | `3295adad462b654cfdc8d27b280e2bb7e85593de228d5f45456de46aa0dde8aa` |
| T17 | `a04ee219ef78757498e611179c6657cf578ca680da3520a3e8c9710a383d094f` |

## Destinos canônicos — teoria, exemplos, questões e recalls

Índices B são base zero, exatamente como os arrays JavaScript. Cada questão `b_i_j` e cada recall `B[i].r/ra` acompanha o destino da etapa. Treino e revisão ficam em ambientes próprios; seus vínculos continuam apontando para a missão conceitual. Guias de cobrança serão introduções recolhíveis, sem duplicar toda a teoria. Nenhum HTML inteiro será concatenado.

| Unidade V6 | Missão estável | Etapas históricas e decisão |
| --- | --- | --- |
| `cartografia-fundamentos` | `linguagem-cartografica` | T17 B1 (base: mapa/carta/planta/elementos); T02 B14 (leitura, legenda, generalização, policônica, complemento); T02 B0 (guia histórico recolhível) |
| mesma | `orientacao-azimute` | T02 B1 integral: referência, cardeais, colaterais, azimute e norte geográfico/magnético |
| mesma | `coordenadas-gms` | T02 B2–B6 integral: rede, latitude, longitude, pares, sinais, altitude, GMS/decimal; T17 B3 como formulação complementar |
| mesma | `fusos-utc-data` | T02 B7–B9 integral: 15°, UTC, Brasil/Pará, limites civis e LID; T17 B4 como aplicação integrada |
| mesma | `escalas-e-medidas` | T02 B10–B13 integral: fração, cálculo, unidades, área, redimensionamento, gráfica, escala geográfica; T17 B2 com exemplos próprios |
| `cartografia-representacao` | `projecoes-propriedades` | T03A B1–B3 integral; T17 B5 complementar; T03A B0 guia recolhível |
| mesma | `mercator-peters-utm` | T03A B4–B5 integral: loxodromia, áreas, fusos UTM de 6°, falsas origens; imagens das duas projeções |
| mesma | `semiologia-tematica` | T03A B6–B7 integral: Bertin e dado/símbolo; T17 B6 acrescenta pontos de contagem e leitura temática |
| mesma | `graficos-perfis-relevo` | T03A B16 integral, inclusive pirâmides auditadas e generalização; T17 B7–B8 integral: tabelas, barras/linhas/setores/dispersão, perfil, exagero vertical, curvas/equidistância/vales/interflúvios/declividade |
| mesma | `leitura-critica-integrada` | T03A B15 integral: fenômeno → escala → dado → representação → limitação; leitura crítica e adequação |
| `geotecnologias` | `sensores-espectro` | T03A B8 integral e par Landsat; T17 B9 e B11: plataforma/sensor, atmosfera, radar, espectro e assinaturas; T17 B0 guia recolhível |
| mesma | `resolucoes-indices-classificacao` | T03A B9–B10 integral; T17 B10 e B12: resoluções, composições, NDVI, saturação, classificação supervisionada/não supervisionada, treinamento e validação independente/matriz de confusão |
| mesma | `gnss-referenciais` | T03A B13 integral: GNSS/GPS, relógio/quatro satélites, SIRGAS/RBMC; T17 B13 complementar, data da oficialização |
| mesma | `sig-modelos-operacoes` | T03A B11–B12 integral: vetor/raster, atributos, topologia e operações; T17 B14 com aplicações próprias |
| mesma | `geoprocessamento-dados-digitais` | T17 B15 integral: buffer/overlay, geocodificação, interpolação, georreferenciamento, metadados, INDE e webmaps |
| mesma | `amazonia-monitoramento` | T03A B14 como base revisada PRODES/DETER na Amazônia Legal; T17 B16 integral: aplicações, cruzamentos, validação, campo e limites jurídicos/causais |
| mesma | `cartografia-escolar` | T17 B17 integral: alfabetização cartográfica, lateralidade, sete princípios e pergunta geográfica antes da ferramenta |

### Exclusividade, redundância e limites da consolidação

Exclusivos ou mais completos de T02: azimute; GMS base 60; altitude e ordem de coordenadas; distinção fusos horários/UTM; quatro fusos brasileiros; LID; área e escala ao quadrado; redimensionamento da escala numérica/gráfica; distinção de escala geográfica/cartográfica; exemplos numéricos, discursivas e aula.

Exclusivos ou mais completos de T03A: famílias/propriedades de projeções; loxodromia; convenções UTM; semiologia bertiniana; dado absoluto/relativo e simbologia; resoluções radiométrica/espectral; composições/NDVI; topologia; RBMC; delimitação PRODES/DETER; integração técnica; leitura auditada de pirâmides; imagens reais; feedbacks específicos.

Exclusivos ou mais completos de T17: mapa/carta/planta; pontos de contagem; perfis e exagero vertical; curvas, vales e declividade percentual; espectro/assinatura; classificação e validação; geocodificação/interpolação/georreferenciamento; metadados/INDE/webmaps; limites da interpretação amazônica; escola e raciocínio geográfico.

Redundância conceitual não autoriza descarte automático. Um segundo exemplo, uma exceção, uma justificativa ou uma aplicação diferente são preservados como complemento identificado. Duplicatas literais podem compartilhar um objeto canônico e manter todos os aliases históricos. Bancos com enunciados semelhantes e respostas/explicações diferentes precisam de comparação antes de fusão; variantes permanecem recuperáveis. A rastreabilidade deverá abranger também o texto original e seus hashes, além do objeto publicado.

## Bancos e destinos

| Conjunto | Regra de destino |
| --- | --- |
| PRE T02 | escala → `escalas-e-medidas`; hemisférios → `coordenadas-gms`; diferença horária → `fusos-utc-data` |
| PRE T03A | conformidade → `projecoes-propriedades`; população absoluta → `semiologia-tematica`; ativo/passivo → `sensores-espectro` |
| PRE T17 | escala → `escalas-e-medidas`; Mercator → `mercator-peters-utm`; pixel → `resolucoes-indices-classificacao` |
| CH T02 | escala, coordenadas, GMS, UTC e combinação de escalas → missões correspondentes; papel Chefão preservado |
| CH T03A | projeção, semiologia, resolução radiométrica, buffer/overlay e UTM/PRODES → missões correspondentes; última com vínculo secundário ao monitoramento |
| CH T17 | escala, resoluções, SIG, projeções e datum → missões correspondentes; papel Chefão preservado |
| C e G T02 | orientação/rede/latitude/longitude/conversão/fusos/Brasil/data/escala/conceitos/leitura → missões correspondentes, inspeção do enunciado nas categorias amplas |
| C e G T03A | projeções/Mercator/Peters/UTM/semiologia/temáticos/SR/resoluções/NDVI/imagem/SIG/GNSS/geodésia/INPE/generalização/gráficos/crítica/pirâmides → missões correspondentes |
| C e G T17 | fundamentos/escala/coordenadas/fusos/projeções/temática/relevo/gráficos/sensoriamento/resolução/espectro/índices/classificação/GNSS/geodésia/SIG/operações/dados/digital/Amazônia/crítica/ensino → missões correspondentes |
| Recalls | 39 pares comando/modelo, mantendo texto integral; tentativa anterior ao modelo e autoavaliação V6 |
| Discursivas | T02 d1/d2 + aliases T03A d1/d2; T17 d1/d2; 4 objetos com histórico de todas as 6 procedências |
| Professor em ação | roteiro T02 + alias T03A, e roteiro T17; preservar exemplos antes de acoplar ao motor da prática |
| Matrizes | T02 + alias T03A; T17 matriz integrada: preservar tabelas e âncoras |

As questões simples antigas entram em **Fixação**, inclusive as que têm cinco alternativas mas não atingem complexidade Concurso/Elite. O papel diagnóstico ou Chefão não certifica dificuldade. Concurso e FGV Elite exigem objetos A–E novos, justificativa por alternativa e procedência autoral explícita. Não serão inventadas questões oficiais FGV. O viés original de gabaritos (T02: A3/B16/C16/D3; T03A: A11/B29/C3; T17: A16/B25/C3) não deverá ser reproduzido como desenho de novos bancos.

### Fonte secundária T03 não auditada

A comparação integral das diferenças confirmou dois recursos válidos retirados da versão auditada: `C[49]` (fluxo fenômeno → escala → dado → representação → limitação) e `G[96]` (imagem não prova causalidade). Podem ser incorporados com `legacy_source` da versão não auditada, sem importar seus demais bancos nem reabrir as formulações PRODES substituídas. `G[87]` sobre conferir unidades já está coberto, mas sua formulação pode ser preservada como variante rastreável se não houver equivalência literal. O relatório final deverá declarar os itens secundários efetivamente incorporados.

## Mídias, dependências e conteúdo de contexto

| Recurso | Local e destino | Risco/medida |
| --- | --- | --- |
| SVG de paralelos/meridianos, `viewBox 720 330` | T02 B2 → coordenadas | preservar desenho e descrição; namespace de `id=ocean` para evitar colisão |
| PDF do Atlas Escolar IBGE, pontos extremos/fusos | T02 B8 → fusos | preservar link, legenda, fonte e alternativa textual; PDF externo pode falhar no celular |
| `Mercator-proj.png` / `Gall-peters.png`, Wikimedia | T03A B3 → projeções | preservar comparação, alt, legendas e créditos; disponibilidade/licença da URL deve ser verificada, não presumida |
| Landsat Rio 1984/2015, NASA/USGS | T03A B8 → sensores | preservar par, datas, fonte e roteiro interpretativo; fotografia não prova causa |
| Fontes IBGE/INPE/NASA e contexto de concurso | rodapé/intro das 3 fontes | manter referência e data/escopo; alegação histórica “auditoria concluída” não constitui aprovação V6 |
| Google Fonts Inter/Literata | CSS de todas | manter família visual com fallback legível; cache local/licenças se viável |

As URLs exatas permanecerão no registro de origem. Diagramas novos devem ser identificados como esquemas/dados didáticos, não como cartas oficiais. Nenhum arquivo histórico ou mídia será apagado. Links externos não podem ser condição para compreender a teoria ou realizar uma questão.

## Mecanismos JavaScript e persistência

| Original | Comportamento observado | Destino V6 |
| --- | --- | --- |
| `PRE/B/CH/C/G/X`, `B[i].r/ra`, `matrixBox/discBox/teacherBox` | dados misturados a funções de renderização | conteúdo validado separado do motor; manifesto por registro e hash; extração AST sem executar JS legado |
| `opt/tap/ans/pans`, `V` | primeira resposta conta, depois comparar alternativas | tentativa imutável, feedback por opção; exame só corrige ao encerrar |
| `X0` T17 | X existe, mas `opt` não o usa | preservar X na procedência; feedback V6 explica o distrator, mecanismo e exemplo |
| `rb/nx/chk/rdo` | desbloqueio por etapa, concluir por responder; refazer apaga respostas | leitura separada de evidência; histórico persistente, retentativa não apaga evento |
| `rvp` | calendário baseado em uma data geral, sem agendamento por cartão | agenda real por ID canônico e histórico de avaliações |
| `fStart/fRevealCard/fRate` | avaliações `ok/rev`, avanço automático e premiação por sequência | quatro avaliações, tentativa antes do verso, fila finita, sem XP por virar |
| `gStart/gSwipe/gAns/gAnsM` | V/F e ABCD gerado de itens opostos sem afinidade temática | V/F próprio e justificado; A–E usa banco autoral, sem transformar V/F aleatório em prova |
| `gClock/gQuit/gScore` | timer opcional; callback posterior pode usar `g=null` | temporizadores com limpeza; sem recompensa repetida por combo |
| `xp/conf/fxBurst` | pontos por respostas e sequências, efeitos frequentes | XP por recuperação significativa, ledger contra farming; movimento reduzido respeitado |
| `errBox` | lista até 14 enunciados, game remove erro ao acertar | caderno global por conceito/confusão, eventos, recuperação tardia, sem resolução por abrir feedback |
| `discCount`, textareas de recall/discursiva | rascunhos não persistem; contagem estimada | rascunhos/histórico persistentes, contagem transparente e rubrica formativa |
| `rfim` | “domínio” inferido de acerto único; botão final com aspas inválidas no handler | domínio com cobertura, atraso e confiança; controles React e testes funcionais |

### Chaves legadas e campos

| Fonte | K | OLDK |
| --- | --- | --- |
| T02 | `seducpa_t2_carto1_v26` | `__sem_legado_carto1__` (placeholder) |
| T03A | `seducpa_t3_carto2_v26` | `__sem_legado_carto2__` (placeholder) |
| T17 | `t17_cartogeo_v26` | `t17_cartogeo_v25` |

Campos: `a` (respostas `b_i_j`/`c_i`), `pre`/`post`, `u` (posição), `dn` (etapas concluídas), `fc` (índice → `ok/rev`), `g` (`miss`, placares, partidas), `st`/`bx` (sequência/bônus), `fd` (data geral), `tab` e campos desconhecidos possíveis. Não há datas individuais de respostas ou revisões. Não converter `ok` em retenção comprovada, nem XP antigo em domínio V6.

T03 auditada e não auditada compartilham **a mesma chave**. São ambíguos B14, B16, CH4, C43/C49 e G78/G87/G96, entre outros campos de versão. O backup bruto é obrigatório; respostas ambíguas serão mantidas como histórico de versão incerta, não usadas como evidência. T17 v25 é de esquema não confirmado: arquivar e não interpretar automaticamente como v26. Nunca apagar/regravar chaves antigas. Importação explícita, idempotente, com relatório de conflitos e estado bruto preservado. Exportação local deve permitir transportar histórico entre origens/navegadores; GitHub Pages e localhost não compartilham localStorage.

## Riscos e decisões previstas

1. Preservar todo texto pedagógico válido e seus exemplos, mesmo em complementos recolhíveis. Ocultar detalhes por padrão não equivale a removê-los.
2. Manter todos os registros originais auditáveis; deduplicar apenas com aliases e melhor explicação. Não confundir “125 registros” com “125 habilidades distintas”.
3. Acrescentar ressalva técnica UTM (faixa convencional 80°S–84°N; regiões polares usam outros sistemas), sem apagar a formulação histórica. Dados temporais/regionais devem ter escopo explícito.
4. O piloto só tem Cartografia. Um simulado oficial completo de 60 questões depende de outros módulos; o motor deve declarar insuficiência de estoque, sem repetir itens ou fabricar cobertura de Português/Pedagogia. Disponibilizar prova do módulo e motor de blueprint testável.
5. Entrada V6 isolada, sem substituir o portal nem as 31 fontes históricas. Deploy e merge fora desta tarefa. Acesso inicial por `v6.html` na build da branch.
6. Banco novo é autoral de treino, sujeito a revisão humana. “FGV Elite” identifica função de treinamento, não autenticação pela banca.
7. Estado local não sincroniza entre dispositivos; quota, corrupção e conflitos entre abas precisam de mensagem clara, backup e teste. Evitar prometer salvamento se a gravação falhar.
8. A auditoria final deverá distinguir implementação, testes observados e itens ainda pendentes de validação humana. Nenhuma perda pode ser escondida sob “modernização”.

Este mapa foi produzido antes de qualquer implementação de código V6. Os documentos finais acrescentarão as contagens canônicas efetivas, testes, exceções e rastreabilidade verificável.
