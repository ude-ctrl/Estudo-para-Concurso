# V6 — Matriz Premium de UX — Fase 3

## 1. Princípio central
A V6 deve parecer uma plataforma de estudo de alto desempenho, não um painel administrativo e não um jogo cheio de estímulos.

**Ordem de prioridade:**
1. clareza;
2. orientação;
3. legibilidade;
4. ação principal;
5. feedback;
6. sensação de progresso;
7. gamificação.

A gamificação existe para reforçar comportamento de estudo, nunca para competir com o conteúdo.

---

# 2. DNA visual preservado da V5

A página V5 de Conceitos e Autores permanece a referência visual de base.

## Preservar
- corpo de leitura com **Literata**;
- elementos de interface com **Inter**;
- fundo claro levemente quente e cartões claros;
- modo escuro equivalente;
- verde como acento principal;
- âmbar/dourado para recompensa e conquista;
- laranja/terroso para alerta/erro relevante;
- largura de leitura controlada;
- cards com cantos arredondados e sombra muito discreta;
- caixas didáticas diferenciadas;
- feedback visual imediato em questões;
- tipografia grande o suficiente para leitura prolongada em celular.

## Corrigir em relação ao sistema atual
- excesso de métricas simultâneas no topo;
- páginas que exigem rolagem sem sensação clara de localização;
- muitas funções misturadas no mesmo nível visual;
- progressão baseada apenas em “concluído”;
- falta de separação clara entre estudar, treinar, revisar e simular;
- excesso de informação útil mostrada ao mesmo tempo.

---

# 3. Regra de densidade cognitiva

## Regra 1 — uma ação primária por tela
Em cada estado da interface deve existir uma ação visualmente dominante.

Exemplos:
- Dashboard: **Continuar estudo**;
- Unidade: **Continuar missão**;
- Revisão: **Revisar agora**;
- Simulado: **Iniciar simulado**.

Outras ações existem, mas com peso visual menor.

## Regra 2 — informação em camadas
A informação deve seguir três níveis:

### Nível A — necessário agora
- próxima ação;
- progresso imediato;
- estado da unidade;
- revisão vencida, se houver.

### Nível B — contexto
- domínio estimado;
- precisão recente;
- pré-requisitos;
- conexões com outras unidades.

### Nível C — detalhes
- histórico;
- XP total;
- conquistas;
- estatísticas extensas;
- sessões anteriores.

Níveis B e C podem ficar em cards secundários, acordeões ou telas próprias.

## Regra 3 — não usar informação como decoração
Nenhum número deve aparecer apenas porque existe no banco de dados.

---

# 4. Estrutura global da plataforma

## Navegação principal
No desktop:
- Hoje;
- Módulos;
- Revisar;
- Treinar;
- Prova;
- Desempenho.

No celular, usar barra inferior com no máximo 5 destinos visíveis:
- Hoje;
- Módulos;
- Revisar;
- Treinar;
- Prova.

`Desempenho` pode ficar dentro de perfil/menu ou dentro de Hoje.

### Regra
Não usar comandos/prompt pré-escritos como elementos centrais da navegação.

---

# 5. Tela “Hoje” — dashboard principal

A tela inicial deve responder em menos de 5 segundos:
1. o que estudar agora?
2. há revisão vencida?
3. como estou indo?

## Ordem da tela

### 1. Card principal — Continuar
Conteúdo:
- módulo;
- unidade;
- missão atual;
- tempo estimado opcional;
- botão **Continuar**.

Este deve ser o maior card da primeira dobra.

### 2. Revisões de hoje
Mostrar apenas:
- quantidade de revisões;
- assunto mais urgente;
- botão **Revisar**.

Não listar dezenas de cartões na tela inicial.

### 3. Estado rápido
Três indicadores no máximo:
- Conteúdo concluído;
- Precisão recente;
- Domínio estimado.

Não chamar “progresso” de domínio.

### 4. Módulos
Cards compactos dos 9 módulos.

Cada card mostra:
- nome;
- unidade atual / total;
- domínio resumido;
- próximo passo.

### 5. Pontos fracos
No máximo 3 recomendações prioritárias.

Exemplo:
- Escala cartográfica — revisar;
- Raciocínio geográfico — 2 erros recentes;
- Climatologia — retenção caiu.

### 6. Gamificação secundária
Streak, XP e conquistas ficam abaixo da zona principal ou em painel recolhível.

---

# 6. Tela de Módulo

Exemplo: `Cartografia e Geotecnologias`

## Cabeçalho
- voltar;
- nome do módulo;
- domínio do módulo;
- pequena frase de objetivo.

## Corpo
Cards das unidades, em ordem pedagógica.

Cada unidade mostra:
- nome;
- status: Não iniciada / Em estudo / Revisar / Dominada;
- domínio estimado;
- missões concluídas;
- eventual pré-requisito.

### Estados visuais
- **Não iniciada:** neutro;
- **Em estudo:** acento verde;
- **Revisão vencida:** atenção discreta;
- **Dominada:** marca de domínio sem exagero.

Não usar cadeados rígidos para quase tudo. Pré-requisitos são orientação, não punição. Bloqueio só quando houver razão pedagógica real.

---

# 7. Tela de Unidade

## Cabeçalho compacto
Desktop:
- breadcrumb;
- título curto;
- barra de progresso da unidade;
- domínio resumido;
- ação de sair/voltar.

Mobile:
- voltar;
- título truncado;
- progresso;
- menu de opções.

Evitar colocar XP, streak, domínio, acertos, tempo e vários botões simultaneamente no cabeçalho.

## Hero da unidade
Antes da teoria:
- título;
- “por que isso cai”;
- objetivo de domínio;
- pré-requisitos relevantes;
- diagnóstico, se ainda não realizado.

## Navegação interna
Quatro áreas lógicas:
1. **Estudo**;
2. **Treino**;
3. **Revisão**;
4. **Fechamento**.

A separação pode ser por tabs/segmentos ou trilha vertical com âncoras; a Fase Piloto deverá testar a melhor solução mobile.

---

# 8. Missões/Etapas de Estudo

Uma missão deve ter meta clara e tamanho controlado.

## Estrutura típica
- título específico;
- gancho curto;
- teoria;
- exemplo;
- caixa “Radar FGV” quando pertinente;
- questão de recuperação;
- recall curto quando necessário;
- botão para próxima missão.

## Regra de leitura
- parágrafos não excessivamente longos;
- subtítulos informativos;
- listas somente quando melhorarem compreensão;
- tabelas responsivas;
- fórmulas/cálculos com etapas visuais;
- mapas e gráficos com legenda e leitura guiada.

## Largura de leitura
Manter coluna confortável próxima ao padrão V5; em desktop a plataforma pode ter área geral mais larga, mas o texto principal não deve se esticar em toda a tela.

---

# 9. Caixas didáticas

Usar poucas categorias semânticas e consistentes.

## Tipos oficiais
### Conceito-chave
Definição ou distinção que precisa ser lembrada.

### Radar FGV
Pegadinha, contraste ou padrão de cobrança.

### Aplicação
Caso brasileiro, amazônico, paraense ou cotidiano.

### Cuidado
Erro frequente ou simplificação perigosa.

### Recuperação
Pergunta curta sem consulta.

### Conexão
Ligação com conceito-base de outra unidade.

Não criar dezenas de estilos diferentes de caixas.

---

# 10. Questões

## Interface
- enunciado visualmente separado;
- alternativas com área de toque ampla;
- resposta não revelada antes da escolha;
- feedback no mesmo contexto;
- botão “Ver por que as outras estão erradas” quando houver explicação completa;
- botão “Adicionar ao caderno de erros” automático/confirmável conforme lógica futura.

## Feedback correto
Mostrar:
- resposta correta;
- regra/conceito;
- relação causal quando necessária;
- exemplo curto.

## Feedback de erro
Mostrar também:
- provável confusão;
- como distinguir da alternativa escolhida;
- link para recuperar conceito-base.

## Dificuldade
Tags discretas:
- Fixação;
- Concurso;
- FGV Elite.

As tags não devem dominar visualmente o enunciado.

---

# 11. Flashcards

## Um cartão por vez no modo de revisão
Evitar grade de dezenas de cartões durante revisão ativa.

## Estados de resposta
- Errei;
- Difícil;
- Bom;
- Fácil.

## Depois de virar
Mostrar:
- resposta;
- explicação curta quando necessária;
- exemplo ou contraste apenas quando agrega valor.

## Navegação
- swipe opcional;
- botões sempre disponíveis;
- funcionamento completo sem gestos.

---

# 12. Game V/F

Permanece como **fluência/consolidação**, não como simulado principal.

## UX
- uma afirmação por vez;
- Verdadeiro / Falso;
- justificativa obrigatória após resposta;
- ritmo rápido;
- erros alimentam revisão;
- melhor sequência pode gerar pequena recompensa.

Não mostrar explosões, confetes ou animações intensas a cada acerto.

---

# 13. Chefão

O Chefão precisa parecer uma avaliação de domínio, não apenas outra lista de questões.

## Antes
- tópicos cobrados;
- quantidade;
- aviso de que feedback vem ao final ou conforme regra da unidade.

## Depois
- nota;
- domínio por conceito;
- erros críticos;
- recomendações de revisão;
- desbloqueio simbólico da unidade, quando aplicável.

---

# 14. Revisão inteligente

Tela própria e muito simples.

## Primeira dobra
- “X revisões para hoje”;
- tempo aproximado;
- botão **Começar revisão**.

## Tipos na fila
- flashcards vencidos;
- questões erradas;
- recalls;
- conceitos com queda de retenção.

O estudante não precisa escolher manualmente dezenas de filtros para começar.

Filtros avançados ficam em nível secundário.

---

# 15. Caderno de erros

## Card de erro
- pergunta/assunto;
- unidade;
- tipo de erro;
- data;
- reincidência;
- estado atual.

## Tipos futuros
- conceito;
- interpretação;
- distração;
- cálculo;
- confusão entre conceitos;
- falta de conteúdo;
- leitura de comando.

## Estado positivo
Erro pode virar **Convertido em domínio** após recuperação comprovada.

---

# 16. Prova / Simulado

O modo prova deve ter linguagem visual própria: mais limpa e sem gamificação durante a execução.

## Durante
- número da questão;
- cronômetro discreto;
- marcar para revisar;
- navegação por questões;
- sem XP, confete, streak ou feedback instantâneo.

## Depois
- resultado;
- corte por disciplina;
- tempo;
- conceitos fracos;
- erros enviados ao caderno;
- plano de revisão pós-simulado.

---

# 17. Discursiva

Interface semelhante a ambiente de prova.

- enunciado;
- limite/contador de linhas;
- cronômetro;
- área limpa para resposta;
- rubrica somente após envio quando em modo simulado;
- modelo de resposta depois da tentativa.

---

# 18. Prova prática

Tela focada em fluxo:
1. tema sorteado;
2. preparação do plano;
3. cronômetro;
4. defesa;
5. rubrica;
6. histórico de evolução.

Durante a defesa, esconder elementos irrelevantes.

---

# 19. Tipografia e hierarquia

## UI
Inter ou equivalente já utilizado.

## Leitura longa
Literata ou equivalente já utilizado.

## Hierarquia recomendada
- H1: título da unidade;
- H2: missão/seção principal;
- H3: subtópico;
- corpo: leitura confortável;
- meta/legendas: UI font menor, mas nunca minúscula.

## Regra
Não usar três ou quatro níveis de texto visualmente quase iguais.

---

# 20. Espaçamento e cartões

## Cards
- raio coerente;
- sombra mínima;
- borda sutil;
- bastante respiro;
- não aninhar card dentro de card repetidamente.

## Espaçamento
Usar escala consistente, evitando telas em que tudo parece igualmente importante.

## Separadores
Preferir espaço e hierarquia; bordas apenas quando ajudam.

---

# 21. Cores

Manter o sistema semântico da V5.

- verde: ação principal/progresso;
- neutros: estrutura e leitura;
- dourado/âmbar: conquista/recompensa;
- laranja/terroso: erro/atenção;
- vermelho apenas para situações realmente críticas, se necessário.

## Identidade por módulo
Pode existir ícone ou acento secundário por módulo, mas a plataforma deve continuar visualmente única. Não criar nove aplicativos coloridos diferentes.

---

# 22. Modo claro e escuro

Requisitos:
- respeitar preferência do sistema;
- permitir escolha manual;
- preservar contraste sem inverter significado semântico;
- evitar preto absoluto em grandes áreas;
- caixas e bordas precisam continuar distinguíveis no escuro.

---

# 23. Mobile first

A maior parte das decisões deve funcionar primeiro em 360–430 px de largura.

## Regras
- alvos de toque confortáveis;
- nada depende de hover;
- tabelas com rolagem horizontal ou transformação adequada;
- cabeçalho compacto;
- barra inferior fixa não pode cobrir conteúdo;
- botões primários ocupam largura útil quando necessário;
- texto não pode exigir zoom;
- modais longos devem virar telas/folhas roláveis.

---

# 24. Acessibilidade

Obrigatório no piloto:
- contraste adequado;
- foco visível por teclado;
- labels acessíveis;
- estados não dependerem somente de cor;
- `prefers-reduced-motion` respeitado;
- animações desativáveis/reduzíveis;
- texto ajustável sem quebrar layout;
- imagens com descrição/alt quando didaticamente relevantes;
- controles com nomes claros.

---

# 25. Movimento e microinterações

## Permitido
- transições breves de 150–250 ms;
- progresso preenchendo suavemente;
- pequena celebração ao concluir uma unidade/recorde relevante;
- feedback tátil/visual discreto quando suportado.

## Evitar
- confete em respostas comuns;
- animação constante;
- elementos pulando para chamar atenção;
- recompensas por mero clique;
- cronômetros agressivos fora do modo prova.

---

# 26. Dopamina controlada

A recompensa deve acompanhar comportamentos de aprendizagem:
- concluir uma missão com recuperação ativa;
- converter erro em acerto estável;
- cumprir revisão vencida;
- melhorar domínio;
- completar Chefão;
- manter consistência de estudo.

Não recompensar:
- abrir página;
- clicar rapidamente;
- virar flashcard sem avaliar;
- repetir atividade fácil só para farmar XP.

O desenho detalhado de XP e streak pertence à Fase 4.

---

# 27. Comportamento de progresso

Nunca usar uma barra única como se significasse conhecimento.

## Três conceitos separados
### Conclusão
Quanto do conteúdo foi percorrido.

### Precisão
Desempenho recente em questões/recall.

### Domínio
Estimativa que considera precisão, retenção, dificuldade e reincidência de erros.

No dashboard, no máximo os três aparecem juntos e de forma simples.

---

# 28. Estados vazios e recuperação

Se não houver revisão:
- mensagem simples;
- sugerir continuar estudo ou treino leve.

Se houver muitas revisões atrasadas:
- não mostrar culpa nem dezenas de alertas;
- criar fila prioritária e opção de sessão curta.

Se o estudante errar muito:
- reduzir dificuldade temporariamente;
- sugerir recuperação de conceito-base;
- nunca usar linguagem punitiva.

---

# 29. Busca

Busca global futura deve encontrar:
- conceitos;
- autores;
- unidades;
- leis;
- questões;
- flashcards.

Resultado deve indicar o contexto:
`Território — Fundamentos da Geografia`
`Territorialidade indígena — Amazônia e Pará`

---

# 30. Regra de consistência

Um mesmo componente deve se comportar igual em todas as 28 unidades:
- questão;
- feedback;
- flashcard;
- recall;
- progresso;
- Chefão;
- caixas didáticas;
- botões;
- tabs.

Conteúdo pode variar; comportamento não.

---

# 31. Componentes do template V6

## Globais
- AppShell;
- TopBar;
- BottomNav mobile;
- Breadcrumb;
- ModuleCard;
- UnitCard;
- ProgressSummary;
- MasteryBadge;
- ReviewAlert.

## Estudo
- MissionCard/Section;
- ConceptBox;
- FGVBox;
- ApplicationBox;
- CautionBox;
- ConnectionBox;
- RecallPrompt.

## Treino
- QuestionCard;
- OptionButton;
- FeedbackPanel;
- DifficultyTag;
- BossPanel.

## Revisão
- Flashcard;
- RecallQueue;
- ErrorCard.

## Prova
- ExamShell;
- Timer;
- QuestionNavigator;
- DiscursiveEditor;
- PracticalExamFlow.

---

# 32. Critérios de aceite do piloto UX

O piloto só passa se:
1. a ação principal for evidente sem explicação;
2. o usuário conseguir voltar ao ponto de estudo em no máximo 2 interações a partir de Hoje;
3. nenhuma tela mobile exigir zoom;
4. Estudo, Treino, Revisão e Prova forem visualmente distinguíveis;
5. progresso não for confundido com domínio;
6. V5 continue reconhecível no DNA visual;
7. métricas secundárias não poluam a primeira dobra;
8. modo escuro estiver funcional;
9. redução de movimento funcionar;
10. questões e flashcards forem confortáveis em toque;
11. o conteúdo denso continue legível;
12. a gamificação não concorra com a teoria.

---

# 33. Decisão final da Fase 3

A V6 usará uma interface **clean, densa quando necessário e progressivamente revelada**, com sensação de plataforma de alto desempenho. A V5 é a referência de linguagem visual, mas a V6 acrescenta arquitetura de produto: dashboard orientado à próxima ação, navegação por módulos/unidades, separação funcional dos modos e métricas de domínio.

Nenhum HTML de estudo foi modificado nesta fase.