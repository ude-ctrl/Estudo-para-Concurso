# V6 — Fase 14: Auditoria Independente do Piloto

Data: 15/10/2026
Branch auditada: `v6-piloto-cartografia`
Escopo: piloto Cartografia e Geotecnologias

## Parecer

**APROVAÇÃO CONDICIONAL — NÃO ESCALAR E NÃO FAZER MERGE AINDA.**

O piloto está estruturalmente forte e demonstra que a arquitetura V6 é viável. A preservação do acervo, a separação Estudo/Treino/Revisão/Prova, o modelo de procedência, a migração conservadora, o caderno global, a revisão espaçada e a instrumentação de testes são avanços reais.

Entretanto, a auditoria independente encontrou falhas de lógica que não foram capturadas pela autoauditoria/testes atuais. Elas precisam ser corrigidas antes de aprovar a Matriz V6 como padrão para os demais módulos.

---

## Pontos aprovados

### 1. Preservação e rastreabilidade
- fontes históricas permanecem intactas;
- `legacy_source`, `legacy_id` e hashes foram preservados;
- conteúdo de teoria, questões, cards, V/F, recalls e discursivas possui mapa de paridade;
- versões ambíguas de progresso não são convertidas em domínio/XP artificial.

### 2. Arquitetura
- três unidades canônicas coerentes;
- navegação por ambientes separados;
- IDs canônicos estáveis;
- conteúdo autoral novo separado do legado;
- prova oficial completa bloqueada enquanto o estoque aprovado é insuficiente.

### 3. Feedback pedagógico
- questões exibem resposta, explicação, mecanismo, exemplo e feedback da alternativa escolhida;
- Game V/F inclui justificativa e retorno à teoria;
- flashcards exigem tentativa antes da revelação e mostram mecanismo/exemplo/armadilha.

### 4. Métricas e segurança
- XP separado de domínio;
- domínio não aparece sem evidência mínima;
- progresso legado não fabrica retenção;
- backup/restauração e falha de quota foram tratados explicitamente.

### 5. Testabilidade
- suíte técnica ampla;
- testes de integridade do legado;
- testes de navegador e persistência;
- dados e build reproduzíveis.

---

# BLOQUEADORES

## B1 — Padrão previsível de gabarito no modo Prova

### Problema
Em `src/v6/engine.ts`, `makeExam()` posiciona a alternativa correta usando:

```ts
wrong.splice(i % 5, 0, q.correct);
```

Isso produz o ciclo previsível:

`A → B → C → D → E → A → B → C → D → E ...`

O resultado é estatisticamente equilibrado, porém pedagogicamente inadequado e contrário à especificação V6, que exige **balanceamento sem padrão previsível**.

### Por que os testes não detectaram
A suíte verifica equilíbrio de posições, mas não verifica previsibilidade, run pattern ou entropia da ordem.

### Correção obrigatória
- gerar a ordem uma única vez ao criar a sessão;
- usar embaralhamento reproduzível/seed da sessão ou aleatoriedade persistida em `optionOrder`;
- manter aproximadamente equilibradas A–E no conjunto;
- impedir ciclo determinístico e sequências anormais;
- preservar a ordem após reload usando `exam.optionOrder` já salvo;
- adicionar teste específico que falhe para ciclo A-B-C-D-E repetido.

Critério de aceite sugerido:
- diferença máxima de frequência entre posições ≤ 1 quando o tamanho permitir;
- não aceitar sequência periódica fixa;
- não aceitar run excessivo da mesma posição;
- duas provas novas com estoques/seed diferentes não devem produzir a mesma sequência de letras por construção.

---

## B2 — `Difícil` em flashcard está sendo tratado como erro conceitual

### Problema
A especificação oficial da Fase 7 define:

- **Errei** = não recuperou ou respondeu conceitualmente errado;
- **Difícil** = recuperou parcialmente/com esforço/insegurança;
- **Bom** = recuperou corretamente;
- **Fácil** = recuperou corretamente e com segurança.

No piloto, `rateCard()` chama:

```ts
correct: rating === 'bom' || rating === 'facil'
```

Consequência: `dificil` entra em `attempt()` como `correct=false` e pode:
- abrir/reativar registro no Caderno Global de Erros;
- aumentar contagem de erro;
- antecipar cartões como se tivesse ocorrido erro conceitual;
- reduzir evidência de retenção como resposta incorreta.

Isso conflita com a semântica aprovada da Fase 7.

### Correção obrigatória
Tratar `Difícil` como **recuperação bem-sucedida de baixa estabilidade**, não como erro conceitual.

Modelo mínimo:
- `Errei` → `correct=false`, lapse/erro;
- `Difícil` → `correct=true`, intervalo curto, confiança/estabilidade menor;
- `Bom` → `correct=true`;
- `Fácil` → `correct=true`.

Se desejado, criar campo próprio para qualidade da recuperação (`rating`) e usar pesos distintos sem transformar `Difícil` em erro.

### Testes obrigatórios
Adicionar testes garantindo que:
1. marcar `Difícil` não cria registro de erro;
2. `Difícil` agenda intervalo menor que `Bom`;
3. `Errei` continua criando/reativando erro;
4. `Fácil` seguido de erro objetivo continua acionando falso domínio.

---

# CORREÇÃO IMPORTANTE

## C1 — Streak usa dia UTC, não dia civil local

### Problema
`significant()` e `streak()` usam:

```ts
new Date(at).toISOString().slice(0, 10)
```

Isso transforma o dia em UTC. Para usuários em fusos negativos, uma atividade noturna pode ser registrada como o dia seguinte antes da meia-noite local. Ex.: 22h no Brasil pode já ser o dia seguinte em UTC.

Além disso, subtrair `DAY = 86_400_000` não é a melhor abstração para dias civis em locais que possuam horário de verão.

### Correção recomendada antes de escalar
- usar chave de data civil local do navegador, ou timezone explicitamente configurado;
- realizar progressão por dias de calendário, não apenas por blocos fixos de 24h;
- adicionar teste de atividade próxima da meia-noite em UTC−3 e, para reuso da plataforma, ao menos um cenário com mudança de offset.

Essa falha não afeta o conteúdo pedagógico, mas afeta confiança da gamificação/consistência.

---

# OBSERVAÇÃO SOBRE TESTES

A suíte é boa, porém os dois bloqueadores mostram uma lacuna metodológica: alguns testes validam **propriedades internas já implementadas**, mas não necessariamente a intenção pedagógica externa.

Na próxima rodada, acrescentar testes derivados diretamente das regras dos documentos V6, por exemplo:
- “balanceado E não previsível”;
- “Difícil não é Errei”;
- “dia de streak = dia civil do usuário”.

Isso reduz o risco de uma implementação tecnicamente consistente violar a especificação sem quebrar testes.

---

# Revisão pedagógica dos itens autorais

A amostra independente dos itens novos mostra boa qualidade geral:
- distratores tecnicamente plausíveis;
- questões de cálculo sem pistas óbvias;
- itens Elite com integração de precisão, escala, projeções, UTM, interpretação crítica e incerteza;
- feedbacks explicativos e não apenas declarativos.

Ainda assim, os 36 itens permanecem corretamente em `human-review-pending`. Não promovê-los automaticamente ao pool oficial até concluir revisão editorial humana do conjunto.

---

# Decisão de governança

Até corrigir B1 e B2 e revalidar a suíte:

- NÃO fazer merge para `main`;
- NÃO marcar Fase 14 como concluída;
- NÃO escalar para o próximo módulo;
- manter Issue #12 aberta;
- corrigir na mesma branch `v6-piloto-cartografia`;
- rerodar build + testes unitários + navegador;
- atualizar relatório de testes e autoauditoria;
- solicitar nova auditoria independente.

## Critério para segunda avaliação

O piloto poderá seguir para aprovação do padrão quando:
1. B1 estiver corrigido e testado;
2. B2 estiver corrigido e testado;
3. C1 estiver corrigido ou documentadamente resolvido antes da escala;
4. todos os testes anteriores continuarem passando;
5. não houver perda de paridade;
6. os relatórios refletirem as correções sem apagar histórico das falhas encontradas.
