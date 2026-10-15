# V6 — Fase 14: guia de execução e revisão humana

O piloto está isolado na branch `v6-piloto-cartografia`. Não substitui a biblioteca publicada, não migra outros módulos e não publica automaticamente no GitHub Pages.

## Executar

Na cópia desta branch:

```sh
npm ci
npm run import:v6
npm run dev
```

Abra o endereço indicado pelo Vite acrescentando `/v6.html`. Por exemplo, se o servidor indicar `http://localhost:5173`, abra `http://localhost:5173/v6.html`.

O portal anterior continua em `/index.html`. Para conferir a build de produção:

```sh
npm run build
npm run preview
```

Abra `/v6.html` no endereço do preview. Caminhos de assets relativos e rotas após `#` funcionam também sob `/Estudo-para-Concurso/`.

## Revisar o piloto

1. Entre em cada uma das três unidades e abra o seletor de missão. Há 17 missões e 50 explicações históricas, com complementos progressivamente revelados.
2. Registre uma leitura, escreva uma evocação antes do modelo e faça uma rodada de Fixação. Compare o feedback e a procedência com o HTML original.
3. Experimente Concurso, FGV Elite, diagnóstico, pós-teste, Chefão e Game V/F. O novo banco é autoral de treino, pendente de revisão humana.
4. Revele um flashcard somente depois de tentar lembrar. Avalie Errei/Difícil/Bom/Fácil e confira a agenda. Erros antecipam cartões relacionados.
5. Abra o Caderno Global de Erros. Ler feedback não resolve um erro; a recuperação exige evidência posterior. A classificação sugerida pode ser ajustada.
6. Faça uma prova do módulo, saia da tela e volte. O prazo não pausa; a correção só aparece ao encerrar. O perfil oficial completo permanece bloqueado por insuficiência de estoque aprovado.
7. Em Prova, experimente Discursiva e Prática de aula. Modelos e rubricas aparecem após a tentativa. Os registros são formativos e não constituem nota oficial da FGV.
8. Em Preferências, alterne claro/escuro/sistema e movimento reduzido, exporte uma cópia e confira a migração legada explicitamente. Não teste restauração com sua única cópia de progresso.

Não é necessário apagar dados históricos para experimentar. Importação de legado é opcional, mantém o bruto e não cria domínio ou XP. Localhost e GitHub Pages têm armazenamentos separados; use exportação/importação para transportar uma cópia.

## Arquitetura entregue

| Camada | Arquivos | Responsabilidade |
| --- | --- | --- |
| Entrada isolada | `v6.html`, `src/v6/main.tsx` | Inicialização do piloto sem modificar o HTML do portal |
| Navegação e preferências | `src/v6/App.tsx`, `context.tsx` | Cinco destinos principais, unidade ativa, retomada, tema, backup e migração explícita |
| Conteúdo e paridade | `scripts/build-v6.mjs`, `v6-catalog.mjs`, `v6-concepts.mjs`, `v6-authored.mjs` | Extração AST, sanitização, consolidação seletiva, conceitos e novos itens autorais |
| Identidade permanente | `scripts/v6-ids.json` | Registro congelado dos destinos históricos; não recalcular IDs por mudança editorial |
| Banco publicado | `public/v6/cartografia.json` | Conteúdo, variantes, fontes, originais, gabaritos e vínculos de procedência |
| Mapa verificável | `V6_FASE14_PARIDADE.json` | Contagens e destino individual de cada registro histórico |
| Motor independente da interface | `src/v6/engine.ts` | Agenda, evidências, erros, domínio, recompensas, seleção de questões e blueprint genérico |
| Persistência | `src/v6/repository.ts`, `types.ts` | Envelope de estado, validação, revisões, recuperação e espelho do caderno global |
| Ambientes | `Study.tsx`, `Training.tsx`, `Review.tsx`, `Exam.tsx` | Estudo, treino, revisão e prova separados |
| Componentes e linguagem visual | `components.tsx`, `styles.css` | Feedback, procedência, tabelas/figura, tipografia, responsividade e acessibilidade |
| Verificação | `tests/v6.test.mjs`, `tests/browser/v6.spec.ts` | Paridade, gabaritos, motor e fluxos reais de navegação |

Os motores não executam JavaScript histórico. Texto e bancos são extraídos como literais pelo importador AST já existente. O HTML pedagógico é sanitizado e seus IDs recebem namespace. As funções antigas de XP, Game, revisão ou reset não são transplantadas.

O registro bruto permite comparar a representação publicada com a origem. `legacy_source`, `legacy_id` e SHA-256 aparecem por recurso. Alternativas possuem IDs próprios; embaralhar sua posição na prova não altera o gabarito.

## Persistência e extensão futura

- Estado autoritativo: `missaoGeo.v6.cartografia`, esquema 6. Inclui erros, eventos, revisões, agenda, filas, rascunhos e histórico.
- Caderno global: espelho versionado em `missaoGeo.v6.errors`, sob `modules.cartografia`, preservando outros módulos eventualmente presentes. Pode ser refeito a partir do estado autoritativo.
- Recuperação: sufixos `.recovery` e `.before-restore` preservam estado inválido e cópia anterior à restauração, respectivamente, quando o navegador permite gravar.
- Identidade: IDs canônicos não carregam número de Tema. O registro congelado só deve mudar com decisão de migração explícita; novos itens autorais recebem IDs permanentes no banco editorial.
- Extensão: o motor de blueprint recebe cotas e itens aprovados por área. O teste com fixtures abstratas verifica as 60 posições sem introduzir conteúdo de Português, Pedagogia ou outro módulo no piloto.
- Limite: persistência local não é sincronização de conta. Revisões recentes são relidas antes de gravar e outra aba recebe atualização; `localStorage` não oferece transações atômicas entre abas. Evite atividades simultâneas em várias abas para o mesmo progresso.

Uma futura plataforma com autenticação pode substituir o adaptador de persistência e servir bancos por unidade. Não é necessário reescrever o agendamento, o histórico canônico ou o motor de questões para essa evolução. Autenticação, backend, sincronização e migração de outras áreas não fazem parte desta entrega.

## Verificar

```sh
npm test
npm run build
node scripts/build-v6.mjs --check
npx playwright install chromium
npm run test:e2e
```

No ambiente da execução, o download do Chromium foi bloqueado pela rede. Os testes usaram o Chromium já instalado:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Não foi acionado o workflow de publicação. A aprovação humana deste piloto deve ocorrer antes de decidir qualquer merge, deploy ou expansão.
