# V6 — Fase 14: paridade do conteúdo antigo × piloto

Data: 15/10/2026. Branch: `v6-piloto-cartografia`. Visual e teste de uso aprovados; revisão editorial e reavaliação independente pendentes. Ver o [registro de aceite](V6_FASE14_ACEITE_USO_E_PROXIMOS_PASSOS.md).

**Atualização da segunda rodada:** as contagens e os 685 registros de origem permanecem iguais. Sete títulos/transições/comandos recebem redação canônica publicada, sem resumir teoria; os originais integrais e hashes continuam no arquivo. O legado sai da experiência ativa. Ver o [registro completo dessas alterações e riscos](V6_FASE14_CORRECOES_RODADA2.md). As descrições abaixo da primeira entrega não devem ser interpretadas como proibição de reeditar sua embalagem editorial.

O [mapa anterior à implementação](V6_FASE14_MAPA_PARIDADE.md) foi registrado no commit `869d69a01861dbed138963ed701409a8a945d8ad`. O [manifesto por registro](V6_FASE14_PARIDADE.json) e o [registro congelado de IDs](../scripts/v6-ids.json) tornam os destinos verificáveis. Este relatório descreve o resultado efetivamente implementado.

## Contagens e preservação

| Recurso | Três fontes principais | Acréscimo secundário | Consolidação/adição | Piloto |
| --- | ---: | ---: | --- | ---: |
| Etapas de teoria | 50 | 0 | Agrupadas, sem abreviar o texto, em 17 missões | 50 explicações |
| Questões | 125 | 0 | 125 Fixação preservadas + 18 Concurso + 18 FGV Elite | 161 |
| Flashcards | 150 | 1 | 151 registros de origem → 119 objetos; +1 cartão novo de áreas/escala | 120 |
| Game V/F | 300 | 2 | 302 registros → 256 objetos com variantes e justificativas | 256 |
| Recalls | 39 | 0 | Comandos e modelos integrais; tentativa, conferência e autoavaliação | 39 |
| Discursivas | 6 procedências | 0 | 4 propostas históricas distintas +2 novas de representação/leitura | 6 propostas |
| Matrizes e roteiros | 9 suplementos | 0 | 6 objetos distintos; os duplicados mantêm todos os aliases | 6 objetos |

Os nove diagnósticos PRE estão incluídos nas 125 questões. Pós-teste usa os mesmos IDs e não infla o banco. Os 15 itens CH mantêm o papel de Chefão; o rótulo não os promove automaticamente a Concurso ou Elite.

Não foi identificada perda de texto pedagógico, exemplo, questão, gabarito, cartão, afirmação V/F, recall, proposta discursiva ou roteiro das três fontes no confronto automático por registro. O texto `h` de cada uma das 50 etapas, seus títulos e hooks foram comparados integralmente. Os 125 gabaritos foram comparados pela alternativa correta, preservando também as opções e os feedbacks originais. A conferência humana semântica final continua necessária.

Os 31 HTMLs históricos permanecem byte a byte iguais ao acervo de referência; nenhum foi apagado ou reescrito. Nenhum gabarito histórico foi alterado.

## Inventário por unidade

| Unidade canônica | Missões | Explicações | Questões | Flashcards | V/F | Discursivas |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `cartografia-fundamentos` | 5 | 19 | 60 | 54 | 106 | 2 |
| `cartografia-representacao` | 5 | 14 | 49 | 31 | 61 | 2 |
| `geotecnologias` | 7 | 17 | 52 | 35 | 89 | 2 |
| Total | **17** | **50** | **161** | **120** | **256** | **6** |

Cada unidade recebe 6 questões Concurso e 6 FGV Elite novas. As restantes vêm do legado e permanecem em Fixação. Há um conjunto editorial de conceitos para feedback e revisão; ele não substitui os textos de teoria.

### Conteúdo exclusivo conferido

- Fundamentos: orientação e azimute; norte geográfico/magnético; rede, hemisférios e ordem das coordenadas; altitude; GMS e sinais; UTC, LID e quatro fusos brasileiros; escalas, conversões, áreas, redimensionamento e escala geográfica.
- Representação: superfícies e propriedades; Mercator/Gall-Peters, loxodromia e UTM; Bertin; categorias nominais/ordinais/quantitativas; coroplético e normalização; símbolos, fluxos, pontos e isolinhas; gráficos e pirâmides; perfil, exagero vertical, curvas, vales/interflúvios e declividade; generalização e decisão técnica.
- Geotecnologias: plataforma/sensor; ativos/passivos, atmosfera e radar; espectro e assinaturas; quatro resoluções, RGB/falsa-cor, NDVI e limites; classificação/treinamento/validação; GNSS/GPS, datum, SIRGAS2000/RBMC; vetor/raster, atributos/topologia; buffer/overlay; geocodificação/interpolação/georreferenciamento; metadados/INDE/webmaps; PRODES/DETER, Amazônia/Pará, campo e limites jurídicos/causais; alfabetização cartográfica e raciocínio geográfico.

Os exemplos numéricos e territoriais não foram substituídos por resumos. As formulações complementares de T17 continuam acessíveis em explicações identificadas. A progressão esconde detalhes até a abertura; não os remove do conteúdo publicado.

## Refinamentos em relação ao mapa inicial

1. Questões dos guias B0 foram encaminhadas individualmente pelo que cobram: T02 `b_0_0` → escalas; `b_0_1` → coordenadas; T03A `b_0_1` → semiologia; T17 `b_0_0` → SIG; `b_0_1` → projeções. A teoria dos guias continua no destino previsto. Isso evita feedback, cartão relacionado e evidência de domínio ligados ao capítulo errado.
2. Categorias amplas de cartões e Game receberam refinamento: pixel/resoluções, aplicações SIG, escolha de projeção e adequação da resolução. Há conceitos próprios para isolinhas, magnitude/fluxos e operações digitais, evitando explicações genéricas sobre outro assunto.
3. Foram incorporados exatamente três itens da versão T03 não auditada: `C_49` (fluxo de escolha da técnica), `G_96` (imagem e causalidade) e `G_87` (unidades em gráficos). Demais formulações secundárias substituídas pela auditoria não foram reintroduzidas.
4. Foi acrescentado um flashcard sobre conversão de áreas por N², para dar revisão relacionada à habilidade dos novos itens e à teoria histórica. Não há meta artificial de 50 cartões por unidade.
5. Foram acrescentadas duas discursivas de representação/leitura, cobrindo normalização/legenda/escala em contexto escolar e curvas/perfis/declividade/exagero vertical. As quatro históricas não foram reescritas.
6. Foi adicionada ressalva sobre a faixa convencional UTM, 80°S–84°N. O texto histórico fica preservado, com a precisão V6 identificada. A fonte técnica é o [padrão de referência espacial USGS/FGDC](https://geology.usgs.gov/tools/metadata/standard/04.html).

## Duplicatas e gabaritos

Cards e Game são consolidados por equivalência explicitamente mapeada e por igualdade normalizada. Variantes não literais mantêm frente/verso ou afirmação/justificativa próprios no objeto canônico. Todos os aliases conservam procedência e hash; os originais também permanecem no registro publicado.

Não há duplicação exata de questão com o mesmo enunciado, opções e resposta correta. Há dois enunciados genéricos iguais, “Qual afirmação é correta?”, referentes a escala e GNSS. Foram mantidos com suas alternativas e contexto de missão; não são a mesma questão.

Foi encontrada uma redundância numérica nos distratores de T02 `b_6_0`: `−42,3°` e `−42,30°` representam o mesmo valor. Ambos são incorretos; o gabarito `−42,5°` está correto. A origem e as opções foram preservadas, o caso recebeu `qualityFlags`/nota editorial e a comparação de alternativas explica a equivalência. O item permanece só em Fixação, fora das provas A–E. Recomenda-se revisão humana para decidir sua futura substituição sem apagar o histórico.

As questões novas possuem cinco opções e apenas um ID correto. Os gabaritos autorais são distribuídos entre A–E, com diferença máxima de um item entre letras no conjunto. Na prova, a posição correta é balanceada sem alterar IDs de opção. As tabelas e o perfil das questões são dados didáticos identificados, sem atribuição a levantamento oficial.

Um teste encontrou colisão entre sinais matemáticos na primeira versão do gerador. A normalização foi corrigida antes da entrega: `+46,6` e `−46,6` têm IDs de alternativa distintos. A suíte compara novamente todos os gabaritos históricos com as fontes.

## Imagens, mapas, fontes e dependências

| Recurso preservado | Tratamento V6 | Verificação |
| --- | --- | --- |
| SVG de paralelos/meridianos de T02 | Mesmo desenho, namespace de IDs, descrição acessível | Incluído na paridade e verificação de IDs |
| PDF IBGE de pontos extremos/fusos | Link, incorporação, legenda e alternativa textual preservados | Acesso da ferramenta retornou 403; disponibilidade final inconclusiva |
| Mercator e Gall-Peters do Wikimedia | URLs, legendas, créditos e alt preservados | As duas imagens responderam à consulta externa |
| Par Landsat Rio 1984/2015, NASA/USGS | Par e contexto de comparação preservados | Ambas as imagens e a página NASA responderam |
| Referências históricas IBGE/INPE/FGV | Notas preservadas em Dados e fontes | Nem todos os destinos aceitaram acesso da ferramenta; não classificados como 404 sem evidência |
| Inter/Literata via Google Fonts | Mesmas famílias, com fallbacks locais de sistema | Fluxos e screenshots verificados com solicitações externas bloqueadas |

As imagens indisponíveis exibem descrição e a teoria continua legível. O PDF tem link e contexto textual fora do visualizador. Não se promete modo offline integral: o banco inicial ainda precisa ser carregado e mídias externas dependem de rede. Não foram empacotadas cópias locais das mídias externas.

A precisão de SIRGAS2000 foi confrontada com o [IBGE/PMRG](https://www.ibge.gov.br/geociencias/informacoes-sobre-posicionamento-geodesico/sirgas/16691-projeto-mudanca-do-referencial-geodesico-pmrg.html); a distinção PRODES/DETER com o [INPE](https://www.gov.br/inpe/pt-br/area-conhecimento/unidade-amazonia/projetos-e-pesquisas/deter). Não foram introduzidas estatísticas atuais de desmatamento ou conteúdo de outros módulos.

## Migração de progresso

Chaves reconhecidas: `seducpa_t2_carto1_v26`, `seducpa_t3_carto2_v26`, `t17_cartogeo_v26` e `t17_cartogeo_v25`.

Importação é explícita e idempotente por chave. Cópia bruta, valores válidos, notas e registros incertos são preservados. T03 usa a mesma chave entre edições: B14/B16, CH4, C43/C49 e G78/G87/G96 ficam conservadoramente como versão incerta. T17 v25 é arquivado sem interpretação automática como v26.

Respostas antigas não possuem datas individuais. Entram no histórico, sem XP ou evidência V6. Erros não ambíguos alimentam o caderno com nota indicando a data da importação, sem inventar data da tentativa. Cartões compatíveis vencem imediatamente para revalidação; a primeira avaliação usa os intervalos iniciais e não recebe recompensa de revisão vencida presumida. `u`, `dn`, placares, bônus e campos desconhecidos permanecem na cópia bruta, sem fabricar conclusão ou domínio.

Os dados antigos não são apagados nem regravados. A cópia do portal, esquema 1, pode ser lida para transportar apenas as chaves deste módulo. O novo envelope tem esquema 6 e usa IDs canônicos congelados.

## Alterações de comportamento e riscos declarados

- Game ABCD formado por afirmações aleatórias foi substituído pelo V/F justificado e pelo banco A–E editorial. Isso altera o mecanismo, sem excluir afirmações pedagógicas.
- XP por combo, abertura ou repetição imediata foi substituído por ledger de recuperações significativas. Placares antigos ficam no bruto; não se convertem em pontuação V6.
- Leitura/conclusão foi separada de acerto e domínio. “Domínio” deixa de ser concedido por uma única passagem pelo banco.
- A estimativa é heurística, com cobertura, retenção e confiança; não é prontidão oficial nem previsão de aprovação.
- A prova disponível é do módulo, experimental. O perfil oficial completo exige itens aprovados e outras áreas; está bloqueado, sem preencher lacunas com Fixação.
- O armazenamento é local. Há backup, recuperação, aviso de quota e atualização entre abas, mas não sincronização de conta nem garantia transacional de gravações simultâneas.
- Roteiros/rubricas de escrita e prática são formativos; autoavaliação não equivale à correção humana da banca. A contagem digital de linhas é uma estimativa explícita de 60 caracteres, não uma leitura da folha manuscrita.
- Novos itens, critérios e feedbacks precisam de revisão humana antes de promoção ao pool oficial. Metadados `human-review-pending` permanecem nessa condição.

Perda pedagógica identificada: **nenhuma no confronto por registros das três fontes**. Perdas de comportamento intencional, diferenças de métrica, indisponibilidades externas e incertezas de progresso estão declaradas acima. Não houve merge, deploy ou migração de outro módulo.
