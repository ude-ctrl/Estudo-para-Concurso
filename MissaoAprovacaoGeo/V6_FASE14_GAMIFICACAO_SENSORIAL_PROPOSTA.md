# V6 — Fase 14: proposta de gamificação sensorial e experiência imersiva

Data: 15/10/2026
Branch: `v6-piloto-cartografia`

## Status

**PROPOSTA PARA RODADA POSTERIOR À AUDITORIA ATUAL. NÃO IMPLEMENTAR DURANTE A AUDITORIA EM CURSO.**

O usuário testou a segunda rodada do piloto e considerou que a plataforma está "totalmente com outra cara", reconhecendo a mudança estrutural positiva. A nova observação de uso real é que ainda falta uma camada maior de **gamificação, efeitos, sons e sensação de recompensa/dopamina**.

A intenção não é transformar o estudo em cassino visual nem trocar aprendizagem por engajamento vazio. A proposta é criar **gamificação sensorial opcional e proporcional ao valor pedagógico do evento**.

## Princípio central

> A intensidade da recompensa deve acompanhar a importância pedagógica da ação.

Assim:
- acertar questão fácil → microfeedback leve;
- acertar questão Concurso/FGV Elite → feedback mais perceptível;
- concluir missão com recuperação → celebração intermediária;
- converter erro em domínio → celebração forte;
- vencer Chefão → celebração forte e própria;
- concluir módulo → evento raro e especial.

XP continua separado de domínio.

## 1. Gamificação sensorial

Adicionar uma camada visual/sonora opcional, sem bloquear a leitura ou o treino.

### Acerto de questão
- pulso visual curto no card/alternativa correta;
- pequeno brilho/check;
- som curto e satisfatório quando efeitos sonoros estiverem habilitados;
- não abrir modal nem interromper fluxo.

### Erro
- feedback visual distinto, sem agressividade;
- som neutro e curto, sem buzzer punitivo;
- destacar imediatamente a explicação e a confusão provável;
- jamais usar vergonha, punição ou linguagem de culpa.

### Questão difícil / FGV Elite
- recompensa visual um pouco mais forte quando correta;
- pode exibir microtexto do tipo `FGV Elite superada`;
- sem transformar dificuldade em XP inflacionado indefinidamente.

### Final de bloco
- barra/progresso preenchendo;
- consolidar o XP do bloco naquele momento, em vez de premiar visualmente cada clique;
- exibir o que foi conquistado: acertos, erros recuperados, revisões cumpridas.

### Missão concluída
- animação/checkpoint curto;
- revelar o próximo ponto do percurso;
- eventual `+XP` consolidado;
- não confundir conclusão com domínio.

### Erro convertido em domínio
Este deve ser um dos eventos de maior impacto da plataforma.

Exemplo visual:
`Fragilidade → Recuperação → Domínio estável`

Mensagem possível:
`Erro convertido em domínio`
`Escala cartográfica deixou de ser um ponto fraco.`

Pode incluir:
- brilho/efeito de desbloqueio;
- som próprio;
- +XP significativo, conforme regra existente;
- atualização do percurso/ponto fraco.

### Chefão
- identidade visual própria;
- tela/efeito de vitória mais evidente quando superado;
- som próprio opcional;
- mostrar desempenho, conceitos fortes/fracos e próxima ação;
- não usar confete a cada Chefão se isso se tornar frequente; reservar efeito maior para primeira vitória ou melhora relevante.

### Revisões vencidas zeradas
- pequena sensação de "fila limpa";
- animação discreta de conclusão;
- mensagem neutra: `Revisões de hoje concluídas.`

### Streak
- microcelebração apenas nos marcos 3, 7, 14, 30, 60 e 90 dias;
- manter sequência atual e melhor sequência separadas;
- nenhuma linguagem de culpa em caso de quebra.

### Módulo concluído
Evento raro e especial.
Pode usar:
- partículas/confete discreto;
- animação de conclusão do mapa/rota;
- som de conquista;
- card/badge do módulo;
- resumo: missões, Chefões, erros convertidos, domínio estimado, revisões futuras.

## 2. Sons opcionais

Não implementar música de fundo.

Criar efeitos sonoros curtos para eventos pedagógicos:
- correto;
- conclusão de bloco;
- XP consolidado;
- conquista/checkpoint;
- erro convertido;
- Chefão;
- módulo concluído.

### Preferência sugerida
`Efeitos sonoros: Desligado | Suave | Imersivo`

Regras:
- padrão deve ser conservador (preferencialmente Desligado ou Suave na primeira ativação, conforme decisão de UX);
- persistir preferência;
- respeitar contexto do navegador e autoplay policy;
- nunca tocar áudio durante modo Prova;
- sons precisam ser muito curtos e não repetitivos;
- não depender de áudio para transmitir informação.

## 3. Intensidade da experiência

Adicionar preferência global:

`Experiência: Foco | Equilibrado | Imersivo`

### Foco
- animações mínimas;
- sem partículas;
- sons desligados por padrão;
- feedback visual funcional.

### Equilibrado
- microanimações;
- pequenas celebrações;
- som opcional suave;
- checkpoint visual.

### Imersivo
- transições mais perceptíveis, ainda curtas;
- sons habilitáveis;
- partículas somente em eventos importantes;
- celebrações mais expressivas em Chefão, erro convertido e módulo concluído.

`prefers-reduced-motion` e configuração manual de redução de movimento continuam soberanos sobre qualquer intensidade escolhida.

## 4. Percurso visual de missões

A principal oportunidade de gamificação estrutural é transformar as missões numa **jornada visual** em vez de apenas uma contagem textual.

Exemplo conceitual:

`●────●────●────◉────○────○`

Estados possíveis:
- concluída;
- atual;
- disponível;
- bloqueada apenas quando houver motivo pedagógico real;
- revisão pendente;
- fragilidade ativa;
- consolidada.

Em Cartografia, a rota pode mostrar semanticamente:

`Orientação → Coordenadas → Fusos → Escala → Projeções → Semiologia → SIG → Sensoriamento ...`

Ao concluir uma missão:
- checkpoint acende;
- rota avança;
- próxima missão ganha destaque;
- sistema pode sugerir treino/revisão antes de avançar quando houver evidência de fragilidade.

A rota não deve bloquear artificialmente conteúdo que o usuário queira consultar.

## 5. Identidade temática dos módulos

Manter uma marca única, mas dar mais personalidade temática a cada módulo.

Possíveis identidades narrativas:
- Cartografia → `Expedição Cartográfica`;
- Geografia Física → `Laboratório da Terra`;
- Geopolítica → `Sala Estratégica`;
- Amazônia e Pará → `Expedição Amazônica`;
- Geografia Urbana → `Rede de Cidades`.

Isso deve aparecer em:
- ícone;
- microcopy;
- pequenos acentos visuais;
- percurso;
- Chefão.

Não transformar cada módulo em um aplicativo visualmente desconectado dos demais.

## 6. XP mais perceptível, sem virar métrica principal

XP pode ganhar apresentação melhor, por exemplo:

`+10 XP · Missão consolidada`

ou

`Nível 7 · 680 / 800 XP`
`████████████████░░░`

Mas manter regras:
- XP = atividade de aprendizagem significativa;
- domínio = evidência de conhecimento;
- nenhum clique/passive scroll gera XP;
- sem farming;
- ganho visual preferencialmente consolidado no fim do bloco/missão;
- modo Prova sem XP/efeitos durante execução.

## 7. Níveis pessoais

Pode ser implementado como camada motivacional pessoal, sem afirmar competência técnica.

Exemplos provisórios:
- Início;
- Em Ritmo;
- Consistente;
- Avançando;
- Preparação Forte;
- Reta Final.

Critério: nível deriva de XP/consistência, não de domínio.

## 8. Conquistas significativas

Poucas conquistas, mas mais visíveis quando realmente alcançadas.

Exemplos:
- `Cartógrafo` — concluir e consolidar as três unidades de Cartografia;
- `Erro Convertido` — converter determinada quantidade de erros em domínio estável;
- `7 Dias de Ritmo`;
- `Chefão Superado` na primeira vitória relevante;
- `Módulo Consolidado`.

Evitar dezenas de badges triviais.

## 9. Regras anti-excesso

Mesmo no modo Imersivo:
- sem confete a cada questão;
- sem popup frequente;
- sem som longo;
- sem piscar;
- sem vibração repetitiva;
- sem autoplay de música;
- sem bloquear ações;
- sem usar vermelho/alarme para culpa;
- sem transformar XP em objetivo diário principal;
- sem gamificação durante a execução de prova.

## 10. Critérios de aceite desta rodada futura

A implementação só deve ser aprovada se:
1. a plataforma parecer mais viva e recompensadora sem ficar infantil;
2. feedback sensorial não atrapalhar leitura ou raciocínio;
3. efeitos forem proporcionais à importância do evento;
4. sons puderem ser desligados e não forem requisito de acessibilidade;
5. `prefers-reduced-motion` funcionar corretamente;
6. modo Prova permanecer limpo;
7. XP continuar impossível de farmar por clique;
8. domínio permanecer separado;
9. percurso visual ajudar a entender onde o aluno está e qual é o próximo passo;
10. eventos raros (erro convertido, Chefão, módulo) sejam claramente mais recompensadores que acertos triviais;
11. mobile não tenha sobreposição de efeitos/botões;
12. as preferências Foco/Equilibrado/Imersivo persistam e sejam testadas;
13. não haja regressão de paridade, conteúdo, agenda, caderno de erros ou domínio.

## 11. Ordem recomendada de implementação

Após concluir a auditoria atual e receber comando explícito do usuário:

1. desenhar percurso visual/checkpoints;
2. implementar preferência de intensidade;
3. implementar sistema central de eventos sensoriais;
4. adicionar efeitos visuais por evento;
5. adicionar sons opcionais;
6. integrar XP/nível de forma secundária;
7. reforçar Chefão, erro convertido e conclusão de módulo;
8. testar mobile, teclado, reduced-motion, áudio desligado e modo Prova;
9. submeter novamente a teste humano.

## 12. Governança

- NÃO implementar esta proposta enquanto a auditoria atual estiver em andamento;
- primeiro terminar e documentar a auditoria em curso;
- depois ler este documento;
- só implementar mediante comando explícito do usuário;
- manter `main` intacta;
- continuar na branch `v6-piloto-cartografia` enquanto o piloto não for aprovado;
- não escalar para outros módulos antes do aceite humano final.
