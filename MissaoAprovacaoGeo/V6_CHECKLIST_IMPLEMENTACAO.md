# V6 — Checklist Oficial de Implementação

Status:
- [ ] pendente
- [~] em andamento
- [x] concluído

## Fase 0 — Segurança e governança
- [x] Criar branch exclusiva `v6-planejamento`
- [x] Criar Plano Mestre V6
- [x] Criar Checklist V6
- [x] Criar Mapa de Módulos V6
- [x] Criar Matriz de Redundância V6
- [x] Definir arquivos originais como fonte de verdade durante migração
- [x] Definir política de rollback

## Fase 1 — Auditoria estrutural
- [x] Inventariar todas as páginas atuais
- [x] Identificar duplicidades de numeração
- [x] Identificar páginas com nome e conteúdo desalinhados
- [x] Identificar versões antigas / duplicadas / auditadas
- [x] Mapear conteúdo exclusivo por página
- [x] Mapear conteúdo redundante
- [x] Mapear lacunas frente ao edital
- [x] Mapear dados temporais que precisam de atualização futura

## Fase 2 — Nova arquitetura por módulos
- [x] Aprovar módulos principais
- [x] Associar cada página atual a um módulo
- [x] Definir unidades de estudo finais
- [x] Definir conceitos-base e páginas de aplicação
- [x] Remover “Tema XX” da navegação principal
- [x] Preservar numeração apenas internamente quando útil
- [x] Criar navegação Concurso → Módulo → Unidade → Etapas
- [x] Diferenciar Biblioteca × Trilha SEDUC-PA
- [x] Definir dependências/pré-requisitos principais
- [x] Definir contagem canônica: 9 módulos / 28 unidades

## Fase 3 — Matriz Premium V6 de UX
- [x] Definir template visual único
- [x] Definir cabeçalho padrão
- [x] Definir hierarquia de títulos
- [x] Definir área de progresso
- [x] Definir navegação entre seções
- [x] Definir separação Estudo / Treino / Revisão / Prova
- [x] Definir comportamento mobile
- [x] Definir modo claro/escuro
- [x] Definir acessibilidade e redução de movimento
- [x] Definir dashboard orientado à próxima ação
- [x] Definir regra de densidade e divulgação progressiva
- [x] Definir componentes comuns da V6
- [x] Definir critérios de aceite do piloto UX

## Fase 4 — Gamificação e dopamina controlada
- [x] Definir sistema de XP
- [x] Definir streak
- [x] Definir conquistas
- [x] Definir microcelebrações
- [x] Definir recompensa por correção de erro
- [x] Definir identidade temática por módulo
- [x] Garantir que nenhuma recompensa premie clique vazio
- [x] Criar opção para reduzir/desativar animações
- [x] Definir regras anti-farming
- [x] Separar XP de domínio pedagógico

## Fase 5 — Feedback universal
- [x] Questões: resposta correta
- [x] Questões: explicação clara
- [x] Questões: causalidade/relação conceitual
- [x] Questões: exemplo concreto/cotidiano/territorial
- [x] Questões erradas: explicar confusão provável
- [x] Flashcards: resposta + explicação quando necessária
- [x] Flashcards: exemplo quando necessário
- [x] Game V/F: justificativa obrigatória
- [x] Chefão: feedback analítico
- [x] Discursiva: rubrica + correção
- [x] Definir taxonomia de erros
- [x] Definir feedback por distrator
- [x] Definir recuperação ativa após erro

## Fase 6 — Banco de questões
- [x] Separar Fixação / Concurso / FGV Elite
- [x] Definir banco de questões reais separado das autorais
- [x] Corrigir regra: questão real permanece fiel ao formato original
- [x] Padronizar Concurso / FGV Elite / simulados autorais em A–E
- [x] Definir quinto distrator plausível para itens autorais promovidos
- [x] Definir critérios de qualidade de distratores
- [x] Definir balanceamento A/B/C/D/E
- [x] Definir prevenção de padrões previsíveis
- [x] Classificar dificuldade D1–D4
- [x] Classificar nível cognitivo C1–C5
- [x] Definir regra para questões interdisciplinares
- [x] Definir regra para mapas, gráficos, tabelas e imagens
- [x] Definir esquema de metadados do banco
- [x] Definir migração do legado sem apagar originais
- [x] Definir rastreabilidade por `legacy_id`
- [x] Definir reuso do banco entre concursos
- [x] Realizar auditoria amostral de Tema 01 e Cartografia II
- [x] Validar formato oficial da SEDUC-PA no edital FGV

## Fase 7 — Flashcards e revisão espaçada
- [x] Auditar sistema atual de flashcards
- [x] Definir formato atômico do cartão V6
- [x] Definir verso com resposta + explicação + exemplo
- [x] Definir estados: Errei / Difícil / Bom / Fácil
- [x] Definir agenda `due` por cartão
- [x] Definir heurística inicial de intervalos
- [x] Definir lapsos e cartões problemáticos
- [x] Definir fila diária priorizando revisões vencidas
- [x] Integrar flashcards a erros e questões
- [x] Definir detecção de falso domínio
- [x] Definir metadados e migração do legado
- [x] Definir reuso entre concursos
- [x] Garantir evolução futura do scheduler sem perda de histórico

## Fase 8 — Caderno global de erros
- [x] Centralizar modelo de erros entre módulos
- [x] Definir taxonomia E1–E8
- [x] Registrar conceito e `misconception_tag`
- [x] Registrar reincidência por conceito/confusão
- [x] Definir agregador global de erro
- [x] Definir revisão automática a partir dos erros
- [x] Definir integração com flashcards, questões e Game
- [x] Definir critérios de resolução após intervalo
- [x] Definir estado “erro convertido em domínio”
- [x] Definir detecção de falso domínio
- [x] Definir severidade e priorização
- [x] Definir fila global de correção
- [x] Definir persistência versionada
- [x] Definir reuso de histórico entre concursos

## Fase 9 — Métrica de domínio
- [x] Separar progresso de domínio
- [x] Definir precisão recente
- [x] Definir retenção após intervalo
- [x] Integrar reincidência de erros
- [x] Definir fórmula heurística transparente de domínio
- [x] Definir requisitos mínimos de evidência
- [x] Definir confiança baixa / média / alta
- [x] Definir pesos relativos por tipo de atividade
- [x] Definir ajuste por dificuldade
- [x] Definir cobertura conceitual
- [x] Definir domínio por conceito
- [x] Definir domínio estimado por unidade
- [x] Definir domínio por módulo
- [x] Definir proteção contra falso domínio e farming
- [x] Separar prontidão para prova de domínio conceitual
- [x] Definir painel de pontos fracos e próxima ação
- [x] Definir persistência e reuso entre concursos

## Fase 10 — Simulado SEDUC-PA
- [ ] Criar modo 60 questões
- [ ] 10 Língua Portuguesa
- [ ] 5 Raciocínio Lógico
- [ ] 5 Atualidades
- [ ] 10 Conhecimentos Pedagógicos
- [ ] 30 Geografia
- [ ] Questões A–E
- [ ] Cronômetro
- [ ] Correção final
- [ ] Diagnóstico por disciplina e assunto
- [ ] Alimentar caderno de erros
- [ ] Adicionar 2 discursivas ao final

## Fase 11 — Discursivas
- [ ] Criar ambiente próprio
- [ ] 2 questões simultâneas
- [ ] Limite de linhas
- [ ] Cronômetro
- [ ] Rubrica de conteúdo
- [ ] Rubrica de estrutura
- [ ] Rubrica de linguagem
- [ ] Modelo de resposta após tentativa
- [ ] Histórico de evolução

## Fase 12 — Prova prática
- [ ] Criar sorteio de tema
- [ ] Criar modelo de plano de aula
- [ ] Definir tempo de preparação
- [ ] Criar defesa oral cronometrada
- [ ] Criar rubrica
- [ ] Criar feedback
- [ ] Simular condições sem projetor

## Fase 13 — Correções já conhecidas
- [ ] Renomear/corrigir atual Tema 15
- [ ] Resolver duplicidade Tema 17
- [ ] Resolver duplicidade Tema 18
- [~] Consolidar Cartografia I + II + Cartografia/Geotecnologias
- [x] Revisar sobreposição Amazônia 15/17/18/19
- [x] Revisar sobreposição Brasil/Pará 16/20/21
- [x] Revisar sobreposição BNCC 18/22
- [ ] Atualizar módulos antigos ao padrão V6
- [ ] Verificar Documento/Base Curricular do Pará
- [ ] Reforçar transtornos específicos de aprendizagem

## Fase 14 — Piloto
- [ ] Escolher módulo piloto
- [ ] Criar cópia/migração sem destruir original
- [ ] Aplicar V6 integralmente
- [ ] Testar navegação
- [ ] Testar localStorage
- [ ] Testar questões
- [ ] Testar flashcards
- [ ] Testar game
- [ ] Testar caderno de erros
- [ ] Testar domínio
- [ ] Auditoria Premium do piloto
- [ ] Aprovar padrão definitivo

## Fase 15 — Escala
- [ ] Migrar módulo 2
- [ ] Auditar módulo 2
- [ ] Migrar módulo 3
- [ ] Auditar módulo 3
- [ ] Repetir até concluir todos os módulos

## Fase 16 — Auditoria final
- [ ] Edital × conteúdo
- [ ] Conteúdo original × conteúdo migrado
- [ ] Questões e gabaritos
- [ ] Flashcards
- [ ] Games
- [ ] Feedbacks
- [ ] Links
- [ ] JavaScript
- [ ] Responsividade
- [ ] Acessibilidade
- [ ] Desempenho
- [ ] Dados atuais
- [ ] Simulados
- [ ] Discursivas
- [ ] Prova prática

## Fase 17 — Pré-prova
- [ ] Congelar expansão teórica
- [ ] Atualizar dados temporais
- [ ] Atualizar legislação
- [ ] Intensificar revisão espaçada
- [ ] Intensificar simulados
- [ ] Revisar caderno de erros
- [ ] Treinar discursivas
- [ ] Treinar prova prática

## Critério de encerramento
A V6 só será considerada concluída após:
- cobertura do edital validada;
- todas as unidades migradas e auditadas;
- simulador funcional;
- revisão adaptativa funcional;
- prova prática implementada;
- auditoria Premium final aprovada.
