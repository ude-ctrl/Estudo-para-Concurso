# V6 — Plano Mestre Oficial

## Missão
Transformar o projeto SEDUC-PA em uma plataforma de estudo de alto desempenho para Professor de Geografia, preservando integralmente o conteúdo válido já produzido, reduzindo redundâncias, elevando a qualidade de treino para o padrão FGV e tornando a experiência mais clara, padronizada, envolvente e eficaz para retenção e aprovação.

## Evolução estratégica da missão
A V6 também deve preservar o investimento intelectual para concursos futuros. Portanto, a plataforma será organizada logicamente em duas camadas:

1. **Base Permanente de Conhecimento** — teoria, conceitos, flashcards conceituais, questões genéricas, revisão e mecanismos reutilizáveis em diferentes concursos de Professor de Geografia.
2. **Perfil do Concurso** — edital, banca, pesos, conteúdos regionais específicos, legislação, atualidades, simulados, discursivas, prova prática e prioridades daquele certame.

Documento vinculante: `V6_ARQUITETURA_REUTILIZAVEL_CONCURSOS.md`.

Foi criado o snapshot histórico `snapshot-base-estudos-2026-10-15`, derivado da `main`, que não deve ser usado para desenvolvimento e serve como ponto de recuperação da base pré-V6.

## Princípio central
Qualidade > quantidade.

Nenhum conteúdo será mantido apenas porque já existe. Nenhum conteúdo será removido apenas para reduzir volume. Cada decisão deverá considerar:
- aderência ao edital;
- precisão conceitual;
- valor pedagógico;
- relevância para prova;
- redundância;
- qualidade de recuperação ativa;
- clareza de UX;
- possibilidade de integração com outros conteúdos;
- potencial de reutilização em outros concursos.

## Fonte de verdade
1. Edital oficial vigente da SEDUC-PA / FGV para o perfil SEDUC-PA.
2. Páginas HTML aprovadas no repositório.
3. Este Plano Mestre V6.
4. `V6_ARQUITETURA_REUTILIZAVEL_CONCURSOS.md`.
5. Checklist V6.
6. Mapa de Módulos V6.
7. Matriz de Redundância V6.

## Arquitetura pedagógica obrigatória
Cada unidade deverá seguir, quando aplicável:

1. Missão / objetivo
2. Diagnóstico curto
3. Teoria essencial e densa
4. Exemplos e aplicações
5. Recuperação ativa / evocação
6. Treino de fixação
7. Questões de concurso
8. Questões FGV Elite
9. Feedback explicativo
10. Revisão de erros
11. Flashcards
12. Chefão / integração
13. Domínio e próximos passos

## Regra de feedback universal
Toda interação que produza resposta deve ensinar.

Nenhuma questão, flashcard, game ou microatividade pode terminar apenas em “certo” ou “errado”. Sempre que aplicável, o feedback deverá conter:
- resposta correta;
- explicação clara e objetiva;
- mecanismo causal ou relação conceitual;
- pelo menos um exemplo concreto, cotidiano, territorial ou de prova;
- explicação do erro mais provável quando houver resposta incorreta.

## Questões
As questões serão separadas em três níveis:

### Fixação
- objetivo: consolidar conceitos centrais;
- podem ser mais simples;
- não devem ser confundidas com simulação real de prova.

### Concurso
- contextualizadas;
- distratores plausíveis;
- exigem compreensão e aplicação.

### FGV Elite
- formato A–E;
- apenas uma resposta correta;
- distratores próximos conceitualmente;
- sem pistas involuntárias;
- mistura de conceitos;
- aplicação, interpretação e integração;
- dificuldade compatível com candidatos competitivos.

### Regras psicométricas
- balancear respostas A/B/C/D/E;
- evitar sequências previsvisíveis;
- evitar alternativas absurdas;
- evitar repetição literal da teoria;
- registrar conceito cobrado, dificuldade e tipo cognitivo;
- priorizar mapas, gráficos, tabelas, perfis, imagens e situações-problema quando pertinentes.

## Flashcards
- devem exigir recuperação ativa;
- uma ideia principal por cartão;
- respostas curtas e precisas;
- exemplos quando necessários;
- evitar cartões-resumo excessivamente longos;
- integrar repetição espaçada adaptativa;
- registrar “lembrei / difícil / errei”.

## Game V/F
Função principal: fluência, discriminação rápida e consolidação.

Não será tratado como simulador FGV.

Todo item deve possuir explicação após a resposta e exemplos quando úteis.

## Revisão e domínio
O sistema deverá separar:
- conteúdo concluído;
- precisão recente;
- retenção após intervalo;
- reincidência de erros;
- domínio estimado.

Concluir não significa dominar.

## Caderno de erros
Deve ser global, não isolado por página.

Classificar erros em:
- desconhecimento conceitual;
- confusão entre conceitos;
- interpretação;
- cálculo;
- desatenção;
- informação desatualizada;
- aplicação inadequada.

## Simulado oficial
Criar modo compatível com o formato SEDUC-PA/FGV:
- 10 Língua Portuguesa;
- 5 Raciocínio Lógico;
- 5 Atualidades;
- 10 Conhecimentos Pedagógicos;
- 30 Conhecimentos Específicos de Geografia;
- 2 discursivas após a objetiva.

Questões de simulado deverão usar A–E.

## Discursiva
Treino com:
- 2 questões simultâneas;
- limite de linhas compatível com o edital;
- tempo;
- rubrica;
- avaliação de conteúdo, precisão, argumentação, organização e língua portuguesa;
- resposta-modelo apenas após tentativa.

## Prova prática
Criar módulo específico para:
- sorteio de tema;
- elaboração de plano de aula;
- organização de objetivos, metodologia e avaliação;
- defesa oral;
- cronômetro;
- rubrica;
- feedback.

## UX e organização
Estrutura principal:

Concurso → Módulo → Unidade → Missões/Etapas

A interface deve priorizar:
- clareza;
- baixa carga visual;
- consistência;
- navegação previsível;
- hierarquia visual;
- separação clara entre Estudo, Treino, Revisão e Prova.

## Dopamina e gamificação
Gamificação deve recompensar aprendizagem, não cliques.

Permitido:
- XP;
- streak;
- conquistas;
- pequenas animações;
- microcelebrações;
- cenários temáticos;
- progressão visual;
- desbloqueios;
- feedback de recuperação de erro.

Exemplo desejado:
“Erro convertido em domínio — +25 XP”.

Evitar:
- excesso de confete;
- estímulos constantes;
- cores competitivas demais;
- animação que atrapalhe leitura;
- gamificação sem função pedagógica.

## Identidade temática
O esqueleto visual será o mesmo em todos os módulos.

Podem variar discretamente:
- iconografia;
- atmosfera;
- microtexturas;
- títulos de missão;
- pequenas diferenças de cor.

Exemplos:
- Cartografia → Sala de Comando Cartográfica
- Geografia Física → Laboratório da Terra
- Amazônia e Pará → Expedição Amazônica
- Geopolítica → Sala Estratégica

## Redundância
Antes de atualizar páginas, todo conteúdo repetido deverá ser classificado como:
- manter como fonte principal;
- fundir;
- referenciar;
- transformar em aplicação;
- remover repetição sem valor adicional.

Conceitos centrais devem ser ensinados profundamente uma vez e depois reutilizados em aplicações.

## Reutilização entre concursos
Ao revisar qualquer conteúdo, classificar também como:
- **núcleo permanente**;
- **aplicação regional**;
- **específico de edital/banca**;
- **dado temporal/atualidade**.

Exemplos:
- Climatologia geral → núcleo permanente.
- Climatologia aplicada à Amazônia → aplicação regional.
- questão no estilo FGV → perfil SEDUC-PA.
- legislação estadual do Pará → perfil SEDUC-PA.
- dado econômico de 2026 → dado temporal.

A futura SEDUC-MA ou concurso de Imperatriz deve reutilizar o núcleo permanente e acrescentar apenas sua camada própria.

## Organização por módulos
Os temas deixam de ser a estrutura principal de navegação. “Tema XX” pode continuar internamente, mas a experiência do usuário será organizada por módulos e unidades.

## Padronização
Todas as unidades deverão compartilhar:
- mesma lógica de navegação;
- mesmos tipos de interação;
- mesma taxonomia de dificuldade;
- mesmo padrão de feedback;
- mesmos critérios de domínio;
- mesmos componentes de treino.

## Conteúdo atual
A teoria existente é considerada base valiosa, mas não intocável. Ela deve ser preservada quando correta e útil, corrigida quando necessário e consolidada quando redundante.

## Alterações já identificadas
- corrigir nome/conteúdo do atual Tema 15;
- resolver duplicidades de numeração dos Temas 17 e 18;
- elevar páginas antigas ao padrão moderno;
- tornar explícita a base curricular/documentação curricular do Pará quando necessário;
- reforçar transtornos específicos de aprendizagem;
- revisar dados voláteis de Atualidades e legislação antes da prova;
- separar conteúdo permanente de dado temporal;
- separar base permanente da camada SEDUC-PA/FGV.

## Estratégia de implementação
Não atualizar tudo de uma vez.

Ordem oficial:
1. mapear redundâncias;
2. fechar mapa de módulos;
3. fechar padrão V6;
4. preservar snapshot histórico e arquitetura reutilizável;
5. escolher módulo piloto;
6. migrar piloto;
7. auditar piloto;
8. corrigir padrão;
9. escalar por módulos;
10. criar simulador/revisão global;
11. realizar auditoria final edital × plataforma.

## Módulo piloto sugerido
Cartografia e Geotecnologias ou Geografia Física.

A decisão final será registrada no checklist antes da implementação.

## Critério de aprovação V6
Uma unidade só é considerada pronta quando:
- conteúdo está correto;
- edital está coberto;
- redundância foi tratada;
- classificação permanente × específica foi definida;
- feedback é completo;
- questões têm qualidade;
- UX está padronizada;
- interações funcionam;
- desempenho é registrado corretamente;
- Auditoria Premium foi aprovada.

## Regra final
Nenhuma mudança em massa deve ser feita sem antes validar o padrão em um piloto.
