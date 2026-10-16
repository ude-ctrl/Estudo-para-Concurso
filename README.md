# Missão Geografia

**Nova consolidação — Fundamentos `1.0.0`:** a [auditoria de Conceitos, Categorias e Autores](MissaoAprovacaoGeo/V6_ISSUE13_FUNDAMENTOS_AUDITORIA.md) gerou a quarta Base Canônica aprovada, por revisão delegada ao Codex. São 11 missões, 48 questões, 45 flashcards, 100 V/F e 11 recalls. A base foi preparada na branch `v6-base-fundamentos-geografia`; sua integração à interface e a migração de progresso são a próxima etapa. O conteúdo publicado continua sendo o da Cartografia aprovada. [Paridade](MissaoAprovacaoGeo/V6_ISSUE13_FUNDAMENTOS_MAPA_PARIDADE.md) · [Testes](MissaoAprovacaoGeo/V6_ISSUE13_FUNDAMENTOS_TESTES.md) · [Bases e versões](base-conhecimento/README.md). Os registros abaixo preservam a cronologia dos lotes anteriores.

**Integração atual — Cartografia canônica `1.0.0`:** a plataforma usa as três bases revisadas e aprovadas por auditoria delegada ao Codex, preservando os textos de `0.1.2`. [Integração, progresso e limites](MissaoAprovacaoGeo/V6_ISSUE13_INTEGRACAO_CANONICA_CARTOGRAFIA.md) · [Relatório de testes](MissaoAprovacaoGeo/V6_ISSUE13_TESTES_INTEGRACAO_CARTOGRAFIA.md). O usuário autorizou incorporar esta versão à `main` e publicá-la; o fluxo abaixo publica após a validação dessa branch. Os relatos seguintes preservam o estado das rodadas anteriores.

**Correções atuais — Cartografia `0.1.2`:** [44 questões com explicações específicas, mapa didático autossuficiente e revisão por IA](MissaoAprovacaoGeo/V6_ISSUE13_CORRECOES_CARTOGRAFIA_012.md). Enunciados, alternativas, gabaritos e versões anteriores foram preservados. A [verificação](MissaoAprovacaoGeo/V6_ISSUE13_TESTES_CARTOGRAFIA_012.md) passou com build, 101 testes, 25 recálculos e quatro cenários isolados do mapa no navegador. Esta rodada prepara as candidatas para a próxima integração; não altera o site publicado nem exige revisão manual do estudante no GitHub.

**Revisão editorial delegada ao assistente:** a [conferência integral das três candidatas de Cartografia](MissaoAprovacaoGeo/V6_ISSUE13_REVISAO_DELEGADA_CARTOGRAFIA.md) foi executada pelo Codex, incluindo teoria, 161 questões, 120 flashcards e 256 V/F. Os 25 recálculos adicionais, a build e os 93 testes passaram. A revisão manual de arquivos pelo usuário deixa de ser o encaminhamento de trabalho; o parecer distingue autoria por IA, limitações reais, promoção canônica e publicação. Esta rodada não altera o site.

**Atualização editorial — candidatas `0.1.1`:** a [rodada de correções de Cartografia](MissaoAprovacaoGeo/V6_ISSUE13_CORRECOES_CARTOGRAFIA_011.md) aplica os vínculos e feedbacks auditados, reavalia dez classificações e esclarece figuras, autoria e fontes. As edições `0.1.0` permanecem preservadas. As três unidades seguem `EM_AUDITORIA`, com roteiros de questões para revisão humana e sem alteração do conteúdo publicado no site.

[Verificação da rodada `0.1.1`](MissaoAprovacaoGeo/V6_ISSUE13_TESTES_CARTOGRAFIA_011.md): build e 93 testes passaram, com gabaritos, procedência e snapshot inicial preservados.

**Etapa atual — Issue #13:** o usuário autorizou o [encerramento técnico do piloto com ressalva visual](MissaoAprovacaoGeo/V6_FASE14_ENCERRAMENTO_TECNICO.md) e o início da Base Canônica na branch `v6-base-canonica`. O [primeiro lote](MissaoAprovacaoGeo/V6_ISSUE13_PLANO_EXECUCAO.md) contempla somente as três unidades de Cartografia, com revisão editorial e bases candidatas versionadas. Aprovação canônica, merge e publicação não são automáticos. Os registros seguintes descrevem a evolução anterior do piloto.

[Resultado do primeiro lote](MissaoAprovacaoGeo/V6_ISSUE13_RELATORIO_CARTOGRAFIA.md): três [bases candidatas `0.1.0`](base-conhecimento/README.md), conteúdo integral preservado, revisão assistida dos 36 itens e pendências por ID. Todas permanecem `EM_AUDITORIA`, sem consumo pela build do site. As outras 25 unidades estão apenas registradas no catálogo. Verificação: `npm run check:canonical` e `npm run test:canonical`.

[Relatório de testes do lote](MissaoAprovacaoGeo/V6_ISSUE13_RELATORIO_TESTES_CARTOGRAFIA.md): build e 82 testes passaram; nenhum conteúdo foi promovido automaticamente.

**Prévia da branch `v6-piloto-cartografia`:** a raiz abre o piloto V6 de Cartografia e Geotecnologias, com três unidades e os ambientes Estudo, Treino, Revisão e Prova. Os demais materiais continuam em `/biblioteca.html`; as fontes históricas de Cartografia ficam fora do catálogo ativo e preservadas para auditoria/backup. Veja o [guia de execução e revisão](MissaoAprovacaoGeo/V6_FASE14_GUIA_PILOTO.md), a [segunda rodada de correções](MissaoAprovacaoGeo/V6_FASE14_CORRECOES_RODADA2.md) e o [aceite de uso e próximo passo](MissaoAprovacaoGeo/V6_FASE14_ACEITE_USO_E_PROXIMOS_PASSOS.md). O visual e o teste de uso da experiência anterior foram aprovados pelo usuário; a reconferência recebida não encontrou bloqueador técnico remanescente no escopo P1/P3. A revisão editorial dos itens autorais permanece pendente. Não houve merge/publicação na `main`.

Atualização do piloto: as [correções de treino contextual e favoritos](MissaoAprovacaoGeo/V6_FASE14_CORRECOES_P1_P3.md) passaram pela [reconferência comunicada pelo usuário](MissaoAprovacaoGeo/V6_FASE14_RECONFERENCIA_P1_P3.md). A rodada posterior de [Gamificação Sensorial](MissaoAprovacaoGeo/V6_FASE14_GAMIFICACAO_SENSORIAL_IMPLEMENTACAO.md) foi autorizada e implementada: percurso visual, Foco/Equilibrado/Imersivo, sons opcionais e celebrações proporcionais. **A nova experiência aguarda teste humano.** O padrão inicial é Equilibrado com som desligado. A Issue #13 e a promoção a Base Canônica não foram iniciadas.

Continuidade: o usuário informou que ainda vê a mesma aparência e autorizou seguir sem implicações. O [padrão técnico consolidado](MissaoAprovacaoGeo/V6_FASE14_PADRAO_TECNICO.md) registra contratos e evidências, mantendo a ressalva visual e a revisão editorial pendentes. Esta consolidação é documental: não publica, não altera conteúdo e não inicia a Issue #13. A branch, por si só, não cria um endereço de prévia hospedada.

A descrição abaixo registra a base histórica da biblioteca, anterior ao piloto.

Biblioteca de estudos para concursos de Professor de Geografia. Esta primeira etapa reúne o acervo em uma interface React/TypeScript, com busca, filtros por área, favoritos, percurso e acesso a estudo, flashcards e games.

## Executar localmente

Requer Node.js 22.12 ou superior.

```bash
npm ci
npm run dev
```

Abra o endereço mostrado pelo Vite, normalmente `http://localhost:5173/`.

O importador roda automaticamente antes do desenvolvimento e do build. Os arquivos em `public/content/` e `public/legacy/` são gerados e não precisam ser versionados.

```bash
npm test
npm run build
npm run preview
```

`dist/` contém o site estático pronto para hospedagem.

## Conteúdo preservado

Os 31 arquivos em `MissaoAprovacaoGeo/` continuam sendo os originais. Nenhum texto, questão, alternativa, explicação, imagem ou banco pedagógico foi reescrito.

O acervo contém 30 páginas de estudo e uma auditoria: 542 etapas, 1.327 questões cadastradas, 1.494 flashcards, 3.000 itens de game e 452 comandos de evocação. O diagnóstico é reapresentado no pós-teste e não é contado novamente.

`scripts/import-content.mjs`:

- lê os HTMLs sem executar o código das páginas;
- extrai dados literais de `PRE`, `B`, `CH`, `C`, `G`, `X`, incluindo as atribuições adicionais de evocação;
- preserva o conteúdo estático e os suplementos de revisão, discursiva e prática docente;
- identifica cada arquivo separadamente por um ID e registra o hash da versão;
- gera o catálogo, os dados estruturados e cópias byte a byte dos HTMLs;
- mantém todas as variantes dos temas 03, 17 e 18.

Os testes comparam os hashes e as contagens com o commit auditado `f245ca9f663d437bbda0fd3b6c774f76497363d9`. Uma mudança editorial futura exige uma nova versão e atualização explícita das referências de integridade.

## Progresso

Favoritos e último tema acessado usam uma chave própria da biblioteca. O percurso lê as chaves de progresso já utilizadas pelas páginas, incluindo a chave anterior quando disponível. Respostas fora do banco ou fora das alternativas não entram no percentual.

O percentual corresponde às questões das etapas e do Chefão respondidas; não significa acerto ou domínio. Flashcards possuem avaliações independentes.

O botão **Salvar cópia do progresso** baixa um JSON com as chaves disponíveis, as preferências e a identificação das versões. A restauração de backups ainda não está implementada.

O armazenamento pertence ao navegador e à origem do site. Dados de arquivos abertos por `file://`, de outro domínio ou de outro dispositivo não são acessíveis automaticamente. Esta etapa não possui login ou sincronização.

## Migração gradual

O leitor integrado abre os HTMLs preservados em um iframe de mesma origem. A aplicação organiza o acesso e acompanha o progresso; o motor pedagógico interno ainda é o existente. Esse limite mantém todo o material disponível enquanto a extração estruturada é validada.

As limitações previamente auditadas nas páginas continuam presentes: reinício de missão com comando inválido, rascunhos não persistidos, callback de game que pode acessar uma rodada encerrada e estado legado sem validação estrutural. As duas versões de Cartografia II ainda compartilham a chave `seducpa_t3_carto2_v26`; sua separação precisa de uma migração versionada do motor e do progresso.

Próxima etapa: substituir o motor copiado por componentes comuns, com persistência de rascunhos e mapeamento seguro entre versões, preservando os conteúdos já extraídos.

## Testes no navegador

```bash
npm run build
npx playwright install chromium
npm run test:e2e
```

Os mesmos fluxos são testados na raiz e em `/Estudo-para-Concurso/`, incluindo celular, favoritos, busca, progresso legado, exportação, materiais e navegação direta. Se já existir um Chromium instalado, a variável `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` pode indicar o executável.

## GitHub Pages

O build usa assets relativos e navegação por hash, permitindo abrir e recarregar uma missão sem configuração de rotas no servidor.

O workflow **Publicar no GitHub Pages** publica automaticamente quando **Validar plataforma** conclui com sucesso na `main`. Ele usa o commit validado e ignora execuções antigas se a `main` já avançou. As branches de trabalho não são publicadas por esse fluxo.

Para atualizar depois da revisão:

1. Enviar a implementação revisada em uma branch e abrir um pull request para `main`.
2. Em **Settings → Pages**, selecionar **GitHub Actions** como fonte.
3. Após os testes do pull request passarem, incorporar a alteração à `main`.
4. Em **Actions**, acompanhar **Validar plataforma** e, em seguida, **Publicar no GitHub Pages**. O fluxo de publicação confere os três HTMLs de entrada e o banco por SHA-256 no endereço público, além do carregamento dos assets JavaScript/CSS.

O acionamento manual continua disponível em **Actions → Publicar no GitHub Pages → Run workflow**, selecionando `main`, para republicar uma versão já revisada. Esse acionamento refaz testes de lógica e build; a validação completa de navegador é executada pelo workflow **Validar plataforma**.

O endereço esperado é `https://ude-ctrl.github.io/Estudo-para-Concurso/`. A disponibilidade do Pages depende das configurações e do plano do repositório.

## Organização

```text
MissaoAprovacaoGeo/       HTMLs originais preservados
scripts/                 Importador de conteúdo
src/                     Biblioteca, leitor e progresso
public/content/          Catálogo e bancos gerados
public/legacy/           Cópias integrais geradas
tests/fixtures/          Integridade e contagens da auditoria
tests/browser/           Validação dos fluxos no Chromium
.github/workflows/       Verificação e publicação após validação da main
dist/                    Site gerado para hospedagem
```
