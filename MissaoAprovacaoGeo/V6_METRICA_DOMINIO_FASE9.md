# V6 — Fase 9: Métrica de Domínio

## Estado
Especificação oficial da estimativa de domínio da V6.

## Princípio central
**Concluir não significa dominar.**

A V6 separa explicitamente:
- progresso de estudo;
- precisão recente;
- retenção após intervalo;
- reincidência de erros;
- domínio estimado.

XP e streak não participam diretamente do domínio pedagógico.

---

# 1. Quatro métricas distintas

## 1.1 Progresso
Mede quanto do percurso foi percorrido.

Exemplo:
`72% da unidade estudada`.

Não mede aprendizagem.

## 1.2 Precisão recente
Mede desempenho recente em atividades objetivas relevantes.

Exemplo:
`78% de acerto nas últimas questões válidas`.

Não prova retenção futura.

## 1.3 Retenção
Mede recuperação correta depois de intervalo.

Fontes:
- flashcards vencidos;
- retestes de conceitos;
- questões novas de assunto já estudado;
- erros reavaliados após espaçamento.

## 1.4 Domínio estimado
Síntese heurística baseada em múltiplas evidências.

Sempre exibir como **estimativa**, nunca como medida absoluta.

---

# 2. Evidência mínima

Antes de exibir percentual numérico de domínio, exigir pelo menos:
- conteúdo minimamente estudado;
- 8 a 10 evidências objetivas relevantes na unidade/conceito agregado;
- mais de um tipo de atividade;
- pelo menos uma evidência após intervalo quando possível;
- cobertura de mais de um subconceito quando a unidade for ampla.

Sem isso, mostrar:
- `Dados insuficientes`;
- ou `Estimativa inicial — baixa confiança`.

---

# 3. Componentes da estimativa

Heurística V6 inicial:

- **45% — desempenho objetivo ponderado**;
- **30% — retenção após intervalo**;
- **15% — controle de erros/reincidência**;
- **10% — cobertura conceitual**.

Fórmula conceitual:

`Domínio ≈ 0,45Q + 0,30R + 0,15E + 0,10C`

Onde:
- Q = desempenho objetivo;
- R = retenção;
- E = controle de erros;
- C = cobertura.

Esta fórmula é uma **heurística transparente de produto**, não uma escala psicométrica validada. Deve ser calibrada com dados reais do usuário no piloto.

---

# 4. Peso das atividades

Atividades não têm o mesmo valor como evidência.

Pesos iniciais relativos:
- Fixação: 0,6;
- Concurso: 1,0;
- FGV Elite: 1,25;
- Questão real de banca: 1,25;
- Chefão: 1,15;
- Game V/F: 0,3;
- flashcard autorrelatado: entra principalmente em retenção, não em Q;
- simulado oficial: 1,3.

O peso deve refletir capacidade de discriminação e transferência, não prestígio visual da atividade.

---

# 5. Peso por dificuldade

A dificuldade pode ajustar levemente a evidência:
- D1 → 0,85;
- D2 → 1,00;
- D3 → 1,15;
- D4 → 1,30.

Regra:
- errar D4 não pode destruir domínio de um conceito bem consolidado;
- acertar apenas D1 não basta para domínio alto;
- a distribuição de níveis importa mais que um único item.

---

# 6. Desempenho objetivo Q

Q considera:
- acertos/erros recentes;
- tipo de item;
- dificuldade;
- diversidade de contextos;
- recência.

Evitar usar toda a vida do usuário com peso igual.

Sugestão inicial:
- últimas 20–30 evidências relevantes recebem maior peso;
- evidências antigas ainda contam, mas menos;
- questões repetidas literalmente têm peso reduzido.

---

# 7. Retenção R

R mede se o conhecimento permanece acessível depois de tempo suficiente.

Entram:
- flashcards revisados quando devidos;
- retestes após erro;
- questões novas de conceito antigo;
- revisões espaçadas.

Não entram como retenção forte:
- acerto segundos após ver o feedback;
- repetição literal imediata;
- clique em “Fácil” sem outra evidência.

---

# 8. Controle de erros E

E considera:
- quantidade de erros abertos;
- severidade;
- reincidência;
- erros convertidos em domínio;
- falsos domínios detectados.

Quanto maior a reincidência em conceito-base, menor E.

Um erro D4 isolado pesa menos que três erros D1/D2 no mesmo conceito central.

---

# 9. Cobertura C

Evita que o estudante obtenha domínio alto resolvendo muitas questões de um único subtema.

Cobertura considera:
- proporção dos `concept_tags` essenciais com alguma evidência válida;
- diversidade de competências cognitivas;
- contato com diferentes tipos de fonte quando necessário.

Exemplo:
Cartografia não pode atingir domínio máximo apenas com projeções, ignorando escala, SIG e sensoriamento.

---

# 10. Confiança da estimativa

Toda estimativa deve trazer:
- `baixa`;
- `média`;
- `alta` confiança.

## Baixa
Poucas evidências, pouca diversidade ou ausência de retenção.

## Média
Volume razoável, variedade e pelo menos alguma recuperação após intervalo.

## Alta
Boa amostra, diversidade de dificuldade/contexto, retenção comprovada e baixa reincidência recente.

Exemplo de UI:
`Domínio estimado: 68% · confiança média`

---

# 11. Faixas interpretativas

Sugestão de linguagem:
- 0–29: início;
- 30–49: em construção;
- 50–69: funcional;
- 70–84: consolidando;
- 85–100: forte.

Evitar chamar 100% de “domínio absoluto”.

O estado `dominado` pode ser usado apenas em nível conceitual quando houver retenção e ausência de reincidência recente, mas continua revisável.

---

# 12. Domínio por conceito

Unidade mínima recomendada para cálculo interno:
`concept_tag`.

Exemplo:
- `projecao_conforme`;
- `escala_numerica`;
- `prodes_vs_deter`.

A unidade agrega seus conceitos; o módulo agrega suas unidades.

Isso evita que uma página grande esconda fragilidades internas.

---

# 13. Domínio da unidade

Não usar simples média cega.

Regras:
- conceitos essenciais têm maior peso que detalhes periféricos;
- conceitos sem evidência limitam a confiança;
- um subconceito crítico muito fraco deve aparecer como ponto fraco mesmo quando a média geral é boa.

Exibir:
- domínio estimado;
- confiança;
- melhor ponto;
- principal fragilidade;
- próxima ação recomendada.

---

# 14. Domínio do módulo

Agregar unidades sem inventar “peso de prova” quando o edital não fornece distribuição interna.

Padrão:
- pesos pedagógicos transparentes;
- prioridade de estudo pode ser diferente de peso de domínio;
- histórico de incidência FGV pode orientar prioridade, mas não deve ser confundido com regra oficial do edital.

---

# 15. Prontidão para prova ≠ domínio

A V6 deve manter uma métrica separada de `Prontidão SEDUC-PA`.

Prontidão pode considerar:
- domínio dos módulos;
- desempenho em simulados completos;
- tempo de prova;
- desempenho em básicos;
- discursivas;
- prova prática;
- proximidade da prova.

Domínio de Geografia sozinho não significa prontidão total para o concurso.

---

# 16. Proteções contra falso domínio

Reduzir ou limitar domínio quando:
- acertos vêm apenas de itens repetidos;
- acertos são quase todos D1;
- o usuário marca cartões como Fácil mas falha em questões;
- conceito não foi testado após intervalo;
- existem erros reincidentes críticos;
- baixa cobertura.

---

# 17. Proteções contra farming

Não aumentar domínio por:
- abrir página;
- rolar texto;
- repetir a mesma questão após memorizar a letra;
- marcar flashcard Fácil repetidamente em sequência;
- jogar V/F indefinidamente.

A evidência precisa ser informativa.

---

# 18. Dashboard

Exemplo por unidade:
- Progresso: 84%;
- Precisão recente: 76%;
- Retenção: 63%;
- Domínio estimado: 68% · confiança média;
- Erros ativos: 3;
- Revisões de hoje: 7;
- Ponto fraco: projeções equivalentes × conformes.

Ação primária:
`Fortalecer ponto fraco`.

---

# 19. Persistência

Chave sugerida:
`missaoGeo.v6.mastery`

Dados:
- `schema_version`;
- evidências por conceito;
- snapshots por unidade;
- confiança;
- timestamps;
- último cálculo.

Preferência:
recalcular a estimativa a partir das evidências quando possível, em vez de armazenar apenas um número final opaco.

---

# 20. Reuso entre concursos

Domínio de conteúdo permanente acompanha o estudante.

Exemplo:
se Cartografia está forte na SEDUC-PA, esse histórico deve servir de base para SEDUC-MA.

O perfil do concurso filtra:
- conteúdos exigidos;
- prioridade;
- banca;
- regionalidade;
- temporalidade.

Mas não apaga o conhecimento já demonstrado.

---

# 21. Critério de conclusão da Fase 9

A fase de especificação é concluída quando:
- progresso foi separado de domínio;
- precisão e retenção estão definidas;
- fórmula heurística é transparente;
- requisitos mínimos de evidência estão definidos;
- confiança está definida;
- pesos por atividade/dificuldade estão definidos;
- reincidência está integrada;
- falso domínio/farming estão protegidos;
- domínio conceitual/unidade/módulo está definido;
- prontidão para prova permanece separada.

A implementação e calibração ocorrerão no piloto V6.