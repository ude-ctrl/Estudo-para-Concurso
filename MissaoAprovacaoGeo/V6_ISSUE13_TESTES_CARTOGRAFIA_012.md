# Cartografia 0.1.2 — relatório de testes

Data: 16/10/2026. Código e candidatas verificados: `07337379186fe597cab54717e167f6b61c0d0ca1`.
Branch: `v6-base-canonica`.

## Resultado

**Build, 101 testes de integridade/lógica, 25 recálculos independentes e quatro cenários isolados de navegador passaram.** A rodada não executou novamente toda a suíte de navegador da plataforma e não publicou o site.

O [registro estruturado de evidências](v6-evidencias/resultado-base-canonica-cartografia-012.json) contém os logs, os 25 recálculos, os hashes dos 21 arquivos candidatos e dos 36 arquivos preservados, além das referências às capturas finais.

| Verificação | Resultado | Alcance |
| --- | --- | --- |
| `npm run build` | Passou | Importação preservada, TypeScript e build Vite |
| `npm test` | 101 passaram | Cinco testes do acervo, 58 do motor e 38 canônicos; nenhum falhou ou foi ignorado |
| `npm run check:canonical` | Passou | Três candidatas `0.1.2`, 691 recursos, 685 procedências, zero promoções e 25 unidades sem auditoria iniciada |
| `node scripts/build-v6.mjs --check` | Passou | Banco ativo do piloto não sofreu alteração |
| Recálculos independentes | 25 passaram | Coordenadas, escala, fusos, áreas, declividade, níveis radiométricos e NDVI confrontados com as respostas da candidata |
| `npm run test:canonical-media` | Quatro cenários passaram | Novo mapa e os dois blocos de teoria, com CSS real, em navegador offline |
| Prettier e `git diff --check` | Passaram | Arquivos de código alterados e consistência do patch |

O ambiente usou Node 24.19.0 e Chromium do sistema. O teste isolado pode ser executado com o Chromium instalado pelo Playwright ou com `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` apontando para o executável disponível. `V6_MEDIA_EVIDENCE_DIR` define onde salvar os resultados e capturas; sem essa variável, usa diretório temporário.

## Oito novas verificações canônicas

1. Versão `0.1.2` e cadeia de preservação completa; mesmos recursos, enunciados, alternativas e gabaritos de `0.1.1`.
2. Cobertura dos 44 itens identificados na versão anterior e explicações específicas em 137 alternativas incorretas, sem apenas retirar o prefixo genérico.
3. Reclassificação de `r11` para Concurso/D2/C3, com texto preservado e conjunto 125/24/12, sem alegar calibração empírica.
4. Geometria do mapa confrontada com os elementos SVG, a grade, a escala gráfica, a tabela e as posições relativas.
5. Exercício obrigatório independente de imagens externas, com PDF IBGE complementar e sem comprovação de acesso inventada.
6. Rejeição de escala incoerente, coordenadas fora do recorte, ausência de alternativa textual e inserções ativas ou externas no SVG.
7. Parecer por IA vinculado à versão e aos recursos; recusa de conteúdo alterado, matriz incompleta ou autoria humana fictícia.
8. Validação da revisão intermediária e rejeição de ciclos na cadeia de versões, mesmo quando o hash do pai imediato é recalculado.

Os 30 testes canônicos anteriores continuam cobrindo as edições antigas. O caso de `0.1.1` foi ajustado para continuar verificando aquela edição preservada quando o catálogo passa a apontar para `0.1.2`.

## Navegador: figura candidata isolada

Os quatro cenários foram: celular de 390 px em tema claro; celular de 390 px em tema escuro; tela de 320 px com redução de movimento; e desktop de 1000 px em tema escuro com redução de movimento.

Foram conferidos: proporção do SVG, ausência de rolagem horizontal da página, contraste do texto, nome acessível da imagem, tabela e transcrição presentes, ausência de IDs duplicados, ausência de animações, alcance das referências por Tab e rolagem horizontal de tabelas pelo teclado quando necessária. O contexto estava offline; não houve requisições de rede ou erros JavaScript.

As [capturas e medidas](v6-evidencias/cartografia-012/results.json) registram a figura realmente renderizada. A inspeção visual das capturas de celular confirmou as correções de tamanho e tema. Estes são quatro cenários de uma figura candidata, não quatro fluxos novos de ponta a ponta da plataforma, e não foram somados aos resultados históricos de navegador.

## Descobertas durante a rodada

- A primeira tentativa de abrir o Chromium no sandbox falhou por restrição de socket. O teste foi executado com a permissão de rede necessária ao processo, mantendo o contexto do navegador offline. Isso não foi classificado como erro JavaScript da plataforma.
- A primeira expectativa de teclado supunha que o primeiro Tab iria a um link. O Chromium primeiro focaliza tabelas com rolagem. A verificação foi corrigida para testar essa rolagem e a chegada posterior ao link, sem tratar um comportamento acessível como falha.
- A inspeção das capturas revelou que uma regra existente de `max-height: 250px` diminuía os rótulos. O novo SVG passou a declarar sua própria proporção e tamanho máximo, com rótulos maiores. Um teste de proporção passou a impedir essa regressão.
- O fundo fixo das figuras antigas poderia conflitar com a cor herdada no tema escuro. O novo desenho usa o fundo do tema, mantendo os demais gráficos inalterados.

Os resultados finais acima foram obtidos após essas correções. O PDF IBGE continuou sem acesso confirmado: a correção tornou o exercício autossuficiente, sem alegar que o endpoint foi consertado.

## Preservação e limites

Os 36 arquivos das edições `0.1.0` e `0.1.1` nas três unidades permaneceram byte a byte inalterados. Os 31 HTMLs e suas cópias publicadas passaram pela verificação existente. Foram preservados os 161 gabaritos, todos os textos de alternativas, os 120 flashcards, os 256 V/F e suas justificativas, os 39 recalls, as seis discursivas, os seis suplementos, variantes e procedência.

Não houve alteração de `src/`, dependências, lockfile, workflows, HTMLs, regras de XP, persistência ou banco ativo. A única mudança em `package.json` acrescenta o comando do teste isolado de mídia.

Os testes técnicos não medem aprendizagem, não calibram dificuldade nem substituem a fundamentação editorial. O parecer por IA do lote está nos pacotes; os campos humanos não foram preenchidos. Não houve promoção canônica, merge, publicação ou migração de outros módulos.
