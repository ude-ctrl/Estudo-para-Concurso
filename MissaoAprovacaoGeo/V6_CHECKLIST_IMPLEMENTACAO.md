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

## Fase 10 — Gerador de Simulados SEDUC-PA
- [x] Substituir conceito de simulado fixo por gerador de provas
- [x] Definir banco amplo e expansível
- [x] Definir blueprint de 60 questões por tentativa
- [x] 10 Língua Portuguesa
- [x] 5 Raciocínio Lógico
- [x] 5 Atualidades
- [x] 10 Conhecimentos Pedagógicos
- [x] 30 Geografia
- [x] Definir A–E para questões autorais do perfil SEDUC-PA
- [x] Definir política anti-repetição
- [x] Registrar histórico de exposição por questão
- [x] Definir índice de novidade
- [x] Definir modos Oficial / Inédito / Adaptativo / Revisão de Erros / Por Módulo / Prova Nova
- [x] Definir cobertura acumulada entre tentativas
- [x] Definir distribuição inicial de dificuldade e nível cognitivo
- [x] Definir controle de gabaritos
- [x] Definir validade temporal de Atualidades
- [x] Definir diagnóstico final e integração com erros/domínio
- [x] Definir motor genérico por `exam_profile`
- [x] Integrar objetiva + 2 discursivas em modo Prova Completa de 5h
- [x] Garantir transparência quando o estoque inédito estiver baixo

## Fase 11 — Discursivas
- [x] Criar especificação do ambiente próprio
- [x] Definir 2 situações-problema por prova completa
- [x] Validar limite oficial de 15–30 linhas por resposta
- [x] Integrar ao cronômetro global de 5h
- [x] Definir rubrica pedagógica de treino sem confundir com espelho oficial
- [x] Definir correção de conteúdo / estrutura / linguagem / aderência ao comando
- [x] Modelo de resposta somente após tentativa
- [x] Definir histórico de evolução
- [x] Definir banco rotativo e política anti-repetição
- [x] Definir treino manuscrito/folha simulada
- [x] Integrar erros discursivos ao caderno global

## Fase 12 — Prova prática
- [x] Modelar defesa de plano de aula
- [x] Validar plano manuscrito no local
- [x] Registrar que o tema será definido em edital de convocação
- [x] Validar Plano 4 pontos / Defesa 6 pontos
- [x] Modelar apresentação oral / aula / conteúdo / situação-problema
- [x] Treinar sem projetor, vídeo ou computador
- [x] Usar quadro/lousa e pincel como cenário oficial atual
- [x] Definir plano de quadro
- [x] Definir rubrica alinhada aos critérios gerais do edital
- [x] Não inventar tempo oficial antes do edital de convocação
- [x] Definir feedback e histórico de evolução
- [x] Preparar arquitetura para atualização quando sair o edital de convocação

## Fase 13 — Saneamento final antes do piloto
- [x] Confirmar conteúdo real do antigo Tema 15 como Geopolítica II
- [x] Definir `unit_id` canônico para Geopolítica II sem renomear destrutivamente o legado
- [x] Resolver conflito de numeração Tema 17 por IDs canônicos
- [x] Resolver conflito de numeração Tema 18 por IDs canônicos
- [x] Fechar regra de consolidação Cartografia I + II + Cartografia/Geotecnologias
- [x] Revisar sobreposição Amazônia 15/17/18/19
- [x] Revisar sobreposição Brasil/Pará 16/20/21
- [x] Revisar sobreposição BNCC 18/22
- [x] Verificar Documento Curricular do Estado do Pará como lacuna explícita
- [x] Incluir DCEPA EI/EF e Ensino Médio no escopo obrigatório de migração
- [x] Verificar transtornos funcionais específicos como lacuna explícita
- [x] Incluir dislexia, disortografia, disgrafia, discalculia e TDAH no escopo pedagógico
- [x] Definir distinção entre TFE e público-alvo da Educação Especial
- [x] Definir limite da atuação docente: apoio pedagógico, não diagnóstico clínico
- [x] Definir 28 IDs canônicos independentes de `Tema XX`
- [x] Manter HTMLs históricos intactos até auditoria de paridade
- [x] Transferir atualização efetiva dos módulos antigos para as Fases 14/15

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
