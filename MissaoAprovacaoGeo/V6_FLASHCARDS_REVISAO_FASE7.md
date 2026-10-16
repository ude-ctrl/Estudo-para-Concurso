# V6 — Fase 7: Flashcards e Revisão Espaçada

## Estado
Especificação oficial do sistema de flashcards e revisão espaçada da V6.

## Princípio científico
A V6 usa dois princípios com forte respaldo empírico:
1. **recuperação ativa** — tentar recuperar a resposta antes de vê-la;
2. **espaçamento** — voltar ao conteúdo em intervalos distribuídos no tempo.

Referências de base:
- McDermott, K. B. (2021). Practicing Retrieval Facilitates Learning. Annual Review of Psychology.
- Agarwal, P. K.; Nunes, L. D.; Blunt, J. R. (2021). Retrieval Practice Consistently Benefits Student Learning. Educational Psychology Review.
- Cepeda, N. J. et al. (2008). Spacing Effects in Learning: A Temporal Ridgeline of Optimal Retention. Psychological Science.

A evidência sustenta o princípio geral de recuperação espaçada; não existe um único intervalo universal ótimo para todas as pessoas, conteúdos e horizontes de prova. Por isso, os intervalos V6 são uma heurística operacional ajustável.

---

# 1. Auditoria do sistema atual

## Pontos fortes da V5
- o aluno é instruído a tentar responder antes de revelar;
- existem sessões de aprendizado e reforço;
- cartões não lembrados voltam para reforço;
- há boa clareza visual;
- o sistema registra estado por cartão no `localStorage`.

## Limitações atuais
- classificação binária: `Lembrei` / `Não lembrei`;
- não existe data de próxima revisão (`due`);
- não existe intervalo individual por cartão;
- cartões lembrados podem desaparecer por tempo indeterminado sem teste de retenção;
- cartão “lembrado” não significa necessariamente domínio;
- não há integração entre desempenho em questões e agenda do flashcard;
- muitos versos mostram apenas resposta curta, sem explicação causal ou exemplo;
- cartões conceitualmente redundantes podem competir entre si.

Conclusão: a base atual é boa como recuperação ativa simples, mas ainda não é um sistema completo de revisão espaçada.

---

# 2. Formato obrigatório do flashcard V6

Cada cartão deve possuir uma única recuperação principal.

## Frente
- categoria/unidade;
- pergunta curta e precisa;
- uma única ideia principal;
- sem pista desnecessária;
- sem resposta embutida no enunciado.

## Verso
Sempre que aplicável:
1. **Resposta nuclear** — curta e direta;
2. **Por quê?** — mecanismo, relação ou explicação conceitual;
3. **Exemplo** — concreto, territorial, cotidiano ou de prova;
4. **Armadilha/contraste** — apenas quando realmente útil.

Exemplo:

Frente: `Por que Mercator amplia áreas em altas latitudes?`

Verso:
- Resposta: porque a escala aumenta em direção aos polos para preservar ângulos localmente.
- Por quê: a conformidade exige deformação crescente das áreas.
- Exemplo: Groenlândia aparece muito maior do que é em relação à África.
- Armadilha: Mercator não é equivalente.

---

# 3. Estados de autoavaliação

Após revelar o verso, o aluno escolhe:

## Errei
Não recuperou a resposta ou respondeu de modo conceitualmente incorreto.

## Difícil
Recuperou parcialmente, demorou muito ou precisou reconstruir com insegurança.

## Bom
Recuperou corretamente com esforço normal.

## Fácil
Recuperou de forma rápida, correta e segura.

Regra:
- o botão só aparece depois da tentativa/revelação;
- nenhuma avaliação antes de revelar;
- a classificação serve para agendar, não para inflar domínio.

---

# 4. Agenda inicial de espaçamento

## Cartão novo
Após a primeira tentativa:
- Errei → reaparece ainda na sessão após alguns cartões + revisão no dia seguinte;
- Difícil → próxima revisão em ~1–2 dias;
- Bom → próxima revisão em ~3–4 dias;
- Fácil → próxima revisão em ~7 dias.

## Cartão já revisado
Intervalos crescem conforme a estabilidade demonstrada.

Heurística inicial V6:
- Errei → intervalo volta para ~1 dia;
- Difícil → intervalo anterior × ~1,3;
- Bom → intervalo anterior × ~2,2;
- Fácil → intervalo anterior × ~3,5.

Regras:
- arredondar para dias inteiros;
- nunca interpretar esses multiplicadores como lei científica universal;
- permitir ajuste posterior a partir de desempenho real;
- revisão vencida tem prioridade sobre cartão novo.

---

# 5. Reaprendizagem e lapsos

Cada erro após um cartão já ter sido considerado estável é um `lapse`.

Registrar:
- `lapses`;
- data do último lapso;
- conceito associado;
- erros objetivos relacionados.

## Cartão problemático
Um cartão é sinalizado quando:
- acumula 3 lapsos ou mais;
- o aluno marca Fácil repetidamente, mas erra questões do mesmo conceito;
- o próprio cartão é ambíguo ou excessivamente amplo.

Ação:
- antecipar revisão;
- oferecer cartão de contraste;
- propor uma questão curta de recuperação;
- revisar a redação do card se necessário.

---

# 6. Fila diária

A página inicial deve mostrar algo como:

`Revisões de hoje: 18`

Prioridade:
1. cartões vencidos;
2. cartões provenientes de erros recentes;
3. cartões difíceis;
4. cartões novos.

A V6 não deve abrir por padrão uma sessão “com todos os 50 cartões”.

Sessões recomendadas:
- Revisar agora;
- Novos cartões;
- Erros recentes;
- Misturar módulo;
- Revisão final pré-prova.

---

# 7. Integração com questões

Flashcard e questão não são sistemas independentes.

## Se o aluno erra uma questão
- identificar `concept_tags`;
- antecipar cartões relacionados;
- criar evento no caderno de erros;
- reduzir a estabilidade estimada do conceito.

## Se marca Fácil mas erra questão relacionada
A V6 não aceita a autopercepção como única evidência de domínio.

Ação:
- antecipar o cartão;
- reduzir confiança/estabilidade;
- marcar possível “falso domínio”.

## Se acerta repetidamente questões + cartões após intervalo
- aumentar estabilidade;
- espaçar mais;
- contribuir para domínio da unidade.

---

# 8. Metadados do cartão

Cada flashcard V6 deverá possuir:
- `id`;
- `legacy_id`;
- `module`;
- `unit`;
- `concept_tags`;
- `scope` — permanente | regional | banca | temporal;
- `profile` — core | seduc_pa | seduc_ma | imperatriz_ma | outro;
- `front`;
- `answer_core`;
- `why`;
- `example`;
- `trap` opcional;
- `source` quando necessário;
- `source_date` quando temporal;
- `status` — draft | reviewed | approved | deprecated.

Estado de revisão por usuário:
- `last_reviewed_at`;
- `due_at`;
- `interval_days`;
- `last_rating`;
- `reviews`;
- `lapses`;
- `stability_estimate` opcional;
- `difficulty_estimate` opcional.

---

# 9. Migração do banco atual

Nenhum cartão antigo será apagado silenciosamente.

Cada cartão será classificado como:
- `KEEP` — bom e atômico;
- `ENRICH` — manter pergunta, adicionar explicação/exemplo;
- `SPLIT` — cartão contém fatos demais e será atomizado;
- `MERGE` — duplicata sem valor adicional;
- `REWRITE` — pergunta ruim, mas conceito necessário;
- `DEPRECATE` — erro, ambiguidade ou baixíssimo valor.

O original continua rastreável por `legacy_id`.

---

# 10. Critérios de qualidade

Um cartão só recebe `approved` se:
1. cobra uma recuperação principal;
2. pode ser respondido sem contexto escondido;
3. resposta é precisa;
4. não é apenas um mini-resumo gigante;
5. possui explicação quando necessária;
6. possui exemplo quando útil;
7. não duplica outro cartão sem motivo;
8. fonte/data estão presentes quando temporal;
9. está associado a conceitos/unidade;
10. funciona bem em tela pequena.

---

# 11. Cartões que não devem existir

Evitar:
- perguntas vagas como “Fale sobre urbanização”;
- versos com vários parágrafos e dez conceitos;
- listas enormes sem agrupamento significativo;
- perguntas cuja resposta está contida literalmente na frente;
- cartão duplicado apenas com sinônimo;
- cartões factuais voláteis sem data/fonte.

---

# 12. Tipos especiais

Permitidos com moderação:

## Contraste
`Escala geográfica × escala cartográfica?`

## Causa → efeito
`Por que desmatamento pode reduzir reciclagem de umidade?`

## Exemplo → conceito
`Passagem controlada por grupo armado funciona como qual categoria geográfica?`

## Mapa mental curto
Até 3–4 itens conectados; não virar lista enciclopédica.

## Cartão reverso
Usar somente quando a relação nos dois sentidos for útil.

---

# 13. Reuso entre concursos

Cartões permanentes pertencem à Base de Conhecimento.

Exemplos:
- `Mercator = conforme` → permanente;
- `Regiões de Integração do Pará` → regional SEDUC-PA;
- `estilo de cobrança FGV` → banca;
- `PIB do Pará 2025` → temporal.

A fila de cada concurso seleciona apenas os cartões pertinentes ao perfil ativo.

---

# 14. Modo pré-prova

Nos dias finais antes da prova:
- priorizar vencidos, erros reincidentes e pontos fracos;
- não inundar a fila com centenas de cartões novos;
- cartões estáveis podem receber revisão final estratégica;
- dados temporais e legislação recebem prioridade de atualização.

A agenda deve respeitar a data da prova e evitar marcar revisão importante para depois dela.

---

# 15. Evolução futura do algoritmo

A arquitetura de dados deve permitir, no futuro, trocar a heurística inicial por um algoritmo mais avançado de repetição espaçada (por exemplo, um modelo de estabilidade/dificuldade) sem perder o histórico do usuário.

A V6 inicial não deve fingir precisão matemática que ainda não foi validada com os dados reais do estudante.

---

# 16. Critério de conclusão da Fase 7

A fase de especificação é concluída quando:
- formato do cartão está definido;
- explicação/exemplo estão incorporados;
- quatro avaliações estão definidas;
- regra de `due` está definida;
- lapsos estão definidos;
- fila diária está definida;
- integração com questões está definida;
- migração do legado está definida;
- reuso entre concursos está garantido;
- arquitetura permite evolução futura do scheduler.

A implementação ocorrerá no módulo piloto.