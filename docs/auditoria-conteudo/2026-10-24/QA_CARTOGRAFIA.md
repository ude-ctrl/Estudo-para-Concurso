# Verificação dirigida da apresentação de Cartografia V6

Data: 24/10/2026. Base local: `a40a3c33c7a5b7f20750316fe694331c1a214b61`, branch `auditoria-conteudo-integral`. Nenhum arquivo de conteúdo ou código foi alterado por esta verificação. Execução com Chromium instalado no ambiente, servidor Vite local e os dados publicados de `public/v6/cartografia.json`.

## Resultado e alcance

As seis combinações dirigidas de unidade e largura funcionaram para abrir explicação e responder uma questão usando teclado. Não houve transbordamento horizontal da página, IDs duplicados no DOM observado ou exceções JavaScript da aplicação nesses fluxos. O foco chegou ao feedback explicativo. Foi confirmado um defeito visual de baixa prioridade no tratamento de imagens indisponíveis da teoria: a imagem marcada como oculta continua ocupando espaço porque uma regra CSS sobrescreve seu ocultamento.

Esta é uma amostra funcional da apresentação das três unidades, complementar à leitura editorial de todo o conteúdo. Não representa execução de todas as questões, todos os modos nem uma auditoria completa de acessibilidade. Não foi feita publicação ou validação do servidor público neste ensaio.

## Aplicação real: seis cenários

Cada linha foi executada em **390 × 900 px, tema escuro**, e **1440 × 900 px, tema claro**, com `prefers-reduced-motion: reduce`.

| Unidade | Explicação aberta | Questão respondida | Evidência visual |
|---|---|---|---|
| `cartografia-fundamentos` | `v6-theory-t02-14` — leitura de mapas | `v6-q-f08` | SVG de território hipotético e tabela de coordenadas |
| `cartografia-representacao` | `v6-theory-t03a-3` — propriedades das projeções | `v6-q-r09` | Projeções na teoria; tabela de perfil/declividade no treino |
| `geotecnologias` | `v6-theory-t03a-8` — sensoriamento remoto | `v6-q-g10` | Par histórico de imagens Landsat e comparação no treino |

Procedimento: navegação para a missão correspondente; foco no resumo da explicação e abertura com Enter; inspeção do conteúdo expandido; sessão de uma questão preparada no armazenamento local do navegador isolado; escolha por Espaço e confirmação por Enter; inspeção do feedback. Preparar a sessão serve para reproduzir precisamente a questão e não equivale a testar a seleção de rodadas pelo usuário.

Resultados medidos nas seis combinações:

- `scrollWidth` igual à largura da janela, tanto no estudo quanto após responder: 390 ou 1440 px.
- Zero IDs duplicados no DOM do estudo observado.
- Zero animações ativas no trecho de teoria observado com redução de movimento.
- Zero exceções `pageerror` na repetição com o script de teste corrigido.
- As seis explicações abriram por teclado e as seis respostas foram confirmadas por teclado; após responder, o elemento ativo era o bloco de feedback.
- O SVG de Fundamentos preservou sua proporção: 286 × 415,375 px no celular e 544 × 790,094 px no desktop.
- O feedback apresentava explicação da resposta, raciocínio conceitual, exemplo, aprofundamento recolhido e próximo passo. A pertinência editorial desses trechos é tratada nos pareceres por material; a existência do bloco não certifica que todo exemplo esteja perfeitamente alinhado à questão.

As fontes Google foram deliberadamente bloqueadas para reduzir dependência externa do ensaio. Logo, esta execução verifica a legibilidade e o comportamento com a pilha tipográfica substituta; não comprova o carregamento de todas as fontes remotas.

## Imagens externas e defeito confirmado no fallback

As solicitações às imagens Wikimedia e NASA falharam neste ambiente com `ERR_TUNNEL_CONNECTION_FAILED`. Isso **não prova que as URLs estejam quebradas no site público**. A comparação visual das imagens efetivamente carregadas permanece sem validação neste ensaio. Os títulos, créditos, datas e textos alternativos continuaram disponíveis. Em Geotecnologias, o treino mostrou os dois avisos de indisponibilidade previstos pelo componente.

Na teoria, os avisos também aparecem, mas há um defeito reproduzível independentemente da condição da rede. Um ensaio adicional bloqueou deliberadamente as imagens de projeções e mediu:

| Propriedade | Ambas as imagens de projeção |
|---|---|
| `img.hidden` | `true` |
| `naturalWidth` | `0` |
| `getComputedStyle(img).display` | `block` |
| `visibility` | `visible` |
| Caixa ocupada no celular | 314 × 32,828 px |
| Avisos textuais de indisponibilidade | 2, legíveis |
| Exceções JavaScript | 0 |

Causa localizada: `Html()` em `src/v6/components.tsx` define `img.hidden = true`; `.theory img` em `src/v6/styles.css` define `display: block`. A regra de apresentação torna visível a caixa da imagem quebrada acima do aviso. Em tema escuro, o texto alternativo nessa faixa clara tem contraste ruim, embora o aviso separado permaneça legível.

**Recomendação técnica, sem alteração aplicada:** fazer a regra CSS respeitar `[hidden]`, ou retirar a imagem falha da renderização. Preservar aviso, descrição e créditos. Considerar hospedagem local autorizada/licenciada das imagens para reduzir dependência externa. Classificação: baixa prioridade visual; não impede ler a teoria nem concluir a resposta.

## Figura isolada: quatro cenários complementares

O teste já executado `tests/canonical-media.browser.mjs` tem propósito diferente: monta apenas a figura e duas seções da **versão candidata 1.0.0** de Fundamentos, com CSS real, sem abrir a aplicação. Seu resultado não foi tratado como se validasse o catálogo publicado inteiro.

Passaram os quatro cenários registrados em `media-qa/results.json`: 390 px claro, 390 px escuro, 320 px claro com redução de movimento e 1000 px escuro com redução de movimento. Houve zero erros de página, IDs duplicados ou solicitações de rede; não houve transbordamento horizontal. O contraste medido entre texto e fundo do SVG foi 11,77:1 no claro e 12,97:1 no escuro. As referências foram alcançadas por Tab. Nas três larguras estreitas, as duas tabelas roláveis aceitaram foco e deslocamento por seta. Esses números se aplicam ao SVG ensaiado, não a todo texto ou controle da plataforma.

## Artefatos e reprodução

Diretório de trabalho utilizado: `/workspace/work/auditoria-integral/`. As evidências selecionadas foram copiadas para esta pasta de auditoria.

- [Script externo](evidencias/cartografia-visual-recheck.mjs) e [log da execução válida](evidencias/cartografia-visual-recheck.log).
- [Resultados dos seis cenários](evidencias/cartografia-visual-recheck/results.json), incluindo rede, DOM e feedback.
- [Script de reprodução do fallback](evidencias/fallback-check.mjs) e [medidas do DOM](evidencias/cartografia-visual-recheck/fallback-dom.json).
- [Resultados da figura isolada](evidencias/media-qa/results.json).
- Capturas: [Fundamentos no celular](evidencias/cartografia-visual-recheck/cartografia-fundamentos-390-viewport.png), [Fundamentos no desktop](evidencias/cartografia-visual-recheck/cartografia-fundamentos-1440-study.png), [Representação no celular](evidencias/cartografia-visual-recheck/cartografia-representacao-390-study.png), [feedback de Representação](evidencias/cartografia-visual-recheck/cartografia-representacao-1440-feedback.png) e [feedback de Geotecnologias](evidencias/cartografia-visual-recheck/geotecnologias-390-feedback.png).

As capturas de elementos muito longos podem incluir a barra inferior fixa no meio da imagem composta. Isso não foi classificado como ocultamento permanente do conteúdo: a captura de viewport registra a posição real da barra e o conteúdo pode ser rolado.

Nota sobre o primeiro ensaio: `cartografia-visual/results.json` registrava um erro de acesso a `localStorage` ao navegar para `about:blank`. Ele era provocado pelo `addInitScript` do próprio teste, executado também nessa origem sem armazenamento. O script externo foi corrigido para só semear o armazenamento na origem local; a repetição dos seis cenários resultou em zero `pageerror`. O código da aplicação não foi modificado.

Não foram cobertos por estes cenários: leitores de tela, todas as combinações de tema e largura, todas as telas de Prova/Revisão, todos os tipos de celebração, persistência entre versões, funcionamento de imagens remotas em outra conexão, nem URLs sob o prefixo do GitHub Pages. As verificações semânticas e os testes de lógica registrados no relatório geral são evidências separadas.
