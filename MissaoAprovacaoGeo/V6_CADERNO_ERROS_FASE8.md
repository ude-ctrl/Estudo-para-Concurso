# V6 — Fase 8: Caderno Global de Erros

## Estado
Especificação oficial do sistema global de erros da V6.

## Missão
Transformar erro em dado pedagógico utilizável.

O objetivo não é acumular uma lista de respostas erradas, mas identificar:
- o conceito envolvido;
- a natureza do erro;
- a confusão específica;
- a reincidência;
- a revisão necessária;
- a evidência de que o erro foi superado.

---

# 1. Problema do sistema atual

Hoje o projeto registra desempenho dentro de cada página/mecanismo, por estruturas locais como respostas, erros do Game e estados de atividade.

Limitações:
- erros ficam fragmentados entre páginas;
- o mesmo erro conceitual pode aparecer várias vezes sem ser reconhecido como reincidência;
- não existe uma fila global de correção;
- não existe histórico de resolução;
- um acerto imediato após o feedback pode parecer domínio, mesmo sem retenção;
- mudar de concurso ou módulo quebra a visão global do estudante.

A V6 elimina essa fragmentação.

---

# 2. Unidade central: evento de erro

Todo erro relevante gera um `error_event`.

Campos mínimos:
- `id`;
- `timestamp`;
- `profile` — core | seduc_pa | seduc_ma | imperatriz_ma | outro;
- `module`;
- `unit`;
- `concept_tags`;
- `question_id` ou `activity_id`;
- `source_type` — fixacao | concurso | fgv_elite | real | chefao | game | flashcard | simulado;
- `selected_option_id` ou resposta dada;
- `correct_option_id` ou resposta esperada;
- `error_type`;
- `misconception_tag` quando identificável;
- `feedback_shown`;
- `attempt_number`;
- `confidence` opcional;
- `resolved` false/true;
- `next_review_at`;
- `notes` opcional.

---

# 3. Taxonomia oficial de erros

## E1 — Desconhecimento conceitual
O conceito não foi recuperado ou não era conhecido.

Exemplo:
confundir projeção conforme porque não sabe o que conformidade preserva.

## E2 — Confusão entre conceitos
Conhece termos próximos, mas troca relações.

Exemplo:
Mercator = equivalente e Gall-Peters = conforme.

## E3 — Interpretação do comando/fonte
O conteúdo pode estar conhecido, mas o candidato leu mal o comando, gráfico, mapa, texto ou condição.

## E4 — Aplicação inadequada
Sabe a definição, mas não consegue transferi-la para uma situação nova.

## E5 — Cálculo/procedimento
Erro operacional em escala, fuso, porcentagem, raciocínio lógico etc.

## E6 — Desatenção
Troca sem indício de lacuna conceitual, leitura precipitada, marcação errada ou omissão de condição explícita.

## E7 — Informação temporal/desatualizada
Erro causado por dado factual que mudou no tempo ou foi estudado com versão antiga.

## E8 — Lacuna de linguagem/termo
Não compreende palavra técnica, formulação normativa ou vocabulário do enunciado.

Uma questão pode sugerir mais de um tipo, mas deve registrar um tipo predominante.

---

# 4. Misconception tag

Quando possível, o erro deve registrar a confusão específica e não apenas o assunto amplo.

Exemplos:
- `escala_geografica_vs_cartografica`;
- `mercator_vs_equivalente`;
- `prodes_vs_deter`;
- `territorio_vs_regiao`;
- `competencia_vs_habilidade_bncc`;
- `amazonia_legal_vs_bioma_amazonia`.

Isso permite detectar reincidência real mesmo quando o erro aparece em questões diferentes.

---

# 5. Agregador de erro

Além dos eventos individuais, a V6 mantém um registro agregado por `concept_tag + misconception_tag`.

Campos sugeridos:
- `first_seen_at`;
- `last_seen_at`;
- `total_errors`;
- `consecutive_errors`;
- `successful_retests`;
- `last_success_at`;
- `status`;
- `next_review_at`;
- `severity`.

Status:
- `open`;
- `reviewing`;
- `resolved`;
- `mastered_after_error`.

---

# 6. Fluxo após uma questão errada

1. registrar o evento;
2. mostrar feedback V6;
3. identificar conceito e confusão provável;
4. atualizar reincidência;
5. inserir revisão adequada;
6. antecipar flashcards relacionados;
7. agendar uma recuperação futura;
8. não considerar o erro resolvido só porque o aluno viu a explicação.

---

# 7. Correção imediata × retenção

## Correção imediata
O aluno entendeu após o feedback e consegue responder uma microquestão logo depois.

Isso é positivo, mas não prova retenção.

## Erro resolvido
Exige recuperação posterior, preferencialmente em outro item/contexto.

Critério inicial V6:
- pelo menos 1 acerto posterior após intervalo;
- nenhuma reincidência grave do mesmo misconception no período.

## Erro convertido em domínio
Critério mais forte:
- acerto posterior após intervalo;
- novo acerto em questão diferente ou aplicação diferente;
- desempenho coerente no cartão/conceito relacionado;
- ausência de reincidência recente.

Só então exibir:
`🔥 Erro convertido em domínio`.

Essa conquista pode gerar XP, mas o XP não é a evidência de domínio.

---

# 8. Severidade

A gravidade de um erro deve considerar:
- reincidência;
- centralidade do conceito;
- proximidade da prova;
- dificuldade do item;
- confiança do aluno.

Exemplo importante:
errar uma questão D4 pela primeira vez é menos preocupante que errar três vezes um conceito-base D1/D2.

Níveis sugeridos:
- baixa;
- média;
- alta;
- crítica.

---

# 9. Falso domínio

A V6 deve detectar situações como:
- flashcard marcado Fácil, mas questões relacionadas erradas;
- taxa de acerto alta apenas em itens muito fáceis;
- acerto imediato após feedback, seguido de erro após intervalo;
- memorização de padrão de gabarito sem compreensão.

Ação:
- reabrir o erro;
- antecipar revisão;
- aumentar diversidade do próximo item;
- reduzir estimativa de domínio do conceito.

---

# 10. Fila de erros

A tela global de erros deve priorizar ação, não histórico bruto.

Blocos sugeridos:

## Corrigir hoje
Erros vencidos ou graves.

## Reincidentes
Conceitos que voltaram a falhar.

## Quase resolvidos
Precisam de mais uma recuperação bem-sucedida.

## Convertidos em domínio
Histórico positivo, recolhido/compacto.

Filtros:
- módulo;
- unidade;
- tipo de erro;
- banca/concurso;
- dificuldade;
- data.

---

# 11. Integração com flashcards

Erro conceitual:
- antecipar cartão relacionado;
- criar cartão de contraste se necessário;
- não criar duplicata automática sem revisão.

Erro de aplicação:
- priorizar questão nova, não apenas cartão definicional.

Erro de cálculo:
- repetir procedimento com valores diferentes.

Erro de interpretação:
- usar nova fonte/mapa/gráfico com comando semelhante.

---

# 12. Integração com banco de questões

O motor de treino pode selecionar itens a partir do caderno de erros.

Exemplo:
se `prodes_vs_deter` está aberto:
- 1 questão curta de discriminação;
- depois 1 item contextualizado;
- posteriormente 1 FGV Elite integrando monitoramento ambiental.

Regra:
- não repetir literalmente a mesma questão como principal evidência de superação;
- usar transferência para contexto diferente.

---

# 13. Integração com Game V/F

O Game pode gerar eventos de erro, mas seu peso de domínio é menor que uma questão de Concurso/FGV Elite.

Função do Game:
- detectar confusão rápida;
- alimentar revisão;
- não declarar domínio sozinho.

---

# 14. Dashboard de pontos fracos

Mostrar poucas informações prioritárias:

Exemplo:
- `3 erros reincidentes`;
- `Cartografia · projeções`;
- `BNCC · competência × habilidade`;
- `Amazônia · PRODES × DETER`.

Ação primária:
`Corrigir meus erros agora`.

Não exibir dezenas de gráficos simultaneamente.

---

# 15. Persistência

Chave sugerida:
`missaoGeo.v6.errors`

Estrutura versionada:
- `schema_version`;
- `events`;
- `aggregates`;
- `last_migration_at`.

Regras:
- IDs estáveis;
- nenhuma dependência de número antigo de Tema;
- suporte a migração futura;
- backup antes de alteração estrutural;
- integração futura com sincronização em nuvem sem mudar IDs conceituais.

---

# 16. Reuso entre concursos

Um erro em conteúdo permanente pertence ao perfil do estudante, não apenas ao edital.

Exemplo:
`escala_geografica_vs_cartografica` deve continuar relevante em SEDUC-PA, SEDUC-MA ou Imperatriz.

Erros específicos de legislação/localidade mantêm `profile` próprio.

Assim, trocar de concurso não zera artificialmente o histórico de aprendizagem.

---

# 17. Privacidade e controle

O caderno é pedagógico, não punitivo.

O usuário deve poder:
- visualizar erros;
- filtrar;
- reiniciar dados deliberadamente;
- exportar futuramente;
- distinguir erro ativo de histórico resolvido.

Não transformar reincidência em mensagem humilhante.

---

# 18. Critério de conclusão da Fase 8

A fase de especificação é concluída quando:
- modelo global de erro está definido;
- taxonomia está definida;
- misconception tags estão definidas;
- reincidência está definida;
- critérios de resolução estão definidos;
- erro convertido em domínio está definido;
- integrações com flashcards/questões/Game estão definidas;
- persistência está definida;
- reuso entre concursos está garantido.

A implementação ocorrerá no piloto V6.