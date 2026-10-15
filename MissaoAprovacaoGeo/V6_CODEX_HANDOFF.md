# V6 — Handoff Oficial para Codex

## Objetivo
Transformar o projeto SEDUC-PA em uma plataforma de estudo de alto desempenho, mantendo integralmente o conteúdo pedagógico válido já produzido, reduzindo redundâncias, reorganizando por módulos e elevando a qualidade de treino para o padrão FGV.

## Fonte de verdade
Antes de qualquer alteração, ler obrigatoriamente:
1. `V6_PLANO_MESTRE.md`
2. `V6_CHECKLIST_IMPLEMENTACAO.md`
3. `V6_MAPA_DE_MODULOS.md`
4. `V6_MATRIZ_REDUNDANCIA.md`

Esses quatro arquivos têm precedência sobre decisões implícitas no código antigo.

## Regras invioláveis
- NÃO apagar conteúdo pedagógico válido sem decisão explícita documentada.
- NÃO resumir teoria por conveniência técnica.
- NÃO migrar tudo de uma vez.
- NÃO alterar a branch `main` diretamente.
- Trabalhar somente em branch própria derivada de `v6-planejamento` ou conforme instrução explícita.
- Preservar os HTMLs originais como fonte de comparação durante a migração.
- Toda fusão deve passar pela Matriz de Redundância.
- Toda alteração de conteúdo precisa manter ou melhorar cobertura do edital SEDUC-PA.
- Toda alteração deve ser auditável e reversível.

## Direção pedagógica aprovada
A V6 deve priorizar QUALIDADE, não volume.

Estrutura mental desejada:
`Concurso → Módulo → Unidade → Missões/Etapas`

Fluxo-padrão de estudo:
`Diagnóstico → Aprender → Evocar → Treinar → Revisar erros → Chefão → Domínio`

Separar claramente ambientes de:
- Estudo
- Treino
- Revisão
- Prova

## Organização por módulos
A navegação principal deve migrar de “Tema XX” para módulos conceituais, preservando números apenas internamente quando necessário.

Módulos-base:
1. Fundamentos da Geografia
2. Cartografia e Geotecnologias
3. Geografia Física e Sistemas Naturais
4. Geografia Humana e Econômica
5. Amazônia e Pará
6. Geopolítica e Mundo Contemporâneo
7. Educação, BNCC e Ensino de Geografia
8. Conhecimentos Básicos — Português, Raciocínio Lógico e Atualidades

## Consolidação e redundância
Conteúdos repetidos não devem simplesmente ser copiados entre páginas.

Usar quatro decisões possíveis:
- MANTER: conteúdo exclusivo e necessário.
- FUNDIR: conteúdos equivalentes/fortemente sobrepostos.
- REFERENCIAR: conceito ensinado profundamente uma vez e aplicado em outros módulos.
- REMOVER REPETIÇÃO: retirar duplicação sem retirar cobertura.

Exemplos já identificados:
- Cartografia I + Cartografia II + Cartografia/Geotecnologias → consolidação controlada.
- BNCC antigo + BNCC auditado → consolidar versão canônica.
- Amazônia em vários temas → separar conceitos-base de aplicações específicas.
- Brasil/Pará → reduzir repetição entre regionalização, economia, redes e territorialidade.
- Tema 15 atual possui nome/conteúdo desalinhados e deve ser corrigido.
- Existem duplicidades de numeração em Tema 17 e Tema 18.

## Interação e feedback
Regra central: nenhuma interação deve terminar apenas em “certo” ou “errado”.

Toda resposta interativa relevante deve conter:
1. resposta correta;
2. explicação clara e objetiva;
3. relação causal ou conceitual;
4. pelo menos um exemplo concreto, cotidiano ou territorial quando aplicável;
5. quando houver erro, explicar a confusão provável;
6. quando útil, gerar uma micropergunta de recuperação.

Aplicar isso a:
- questões;
- flashcards;
- Game V/F;
- Chefão;
- discursivas.

## Questões
Separar em três níveis:
- Fixação
- Concurso
- FGV Elite

Para modo prova/FGV:
- 5 alternativas A–E;
- apenas uma correta;
- distratores plausíveis;
- gabaritos balanceados;
- sem padrões previsíveis;
- dificuldade classificada;
- nível cognitivo classificado;
- incluir questões interdisciplinares;
- incluir mapas, gráficos, tabelas e imagens quando pertinente.

## Flashcards
- Manter recuperação ativa.
- Evitar cartões longos demais.
- Atomizar quando necessário.
- Permitir estados: errei / difícil / bom / fácil.
- Integrar revisão espaçada e fila diária.

## Gamificação e dopamina
A gamificação deve reforçar aprendizagem, não clique vazio.

Permitido e desejado:
- XP;
- streak;
- pequenas animações;
- conquistas;
- cenários temáticos por módulo;
- recompensa especial para erro convertido em domínio;
- barras de domínio;
- microcelebrações discretas.

Evitar:
- poluição visual;
- animação sem função;
- recompensas por apenas navegar/clicar;
- interface que esconda a dificuldade real da FGV.

## Métricas
Não confundir “concluído” com “dominado”.

Exibir separadamente:
- conteúdo concluído;
- precisão recente;
- retenção após intervalo;
- reincidência de erros;
- domínio estimado;
- pontos fracos.

## Simulado oficial
Criar posteriormente modo SEDUC-PA com:
- 10 Língua Portuguesa
- 5 Raciocínio Lógico
- 5 Atualidades
- 10 Conhecimentos Pedagógicos
- 30 Geografia
- 2 discursivas ao final

## Prova prática
A V6 deve contemplar futuramente:
- sorteio de tema;
- plano de aula;
- preparação cronometrada;
- defesa oral;
- rubrica;
- feedback.

## Estratégia de execução
NÃO iniciar migração total.

Ordem correta:
1. Auditoria estrutural completa.
2. Matriz de redundância detalhada.
3. Mapa final de módulos/unidades.
4. Template V6.
5. Um módulo piloto.
6. Auditoria Premium do piloto.
7. Só depois escalar.

## Primeira tarefa recomendada ao Codex
Executar APENAS uma auditoria estrutural, sem modificar HTMLs de estudo:
- inventariar todas as páginas;
- identificar versões duplicadas/antigas/auditadas;
- identificar numerações conflitantes;
- mapear conteúdo exclusivo;
- mapear conteúdo repetido;
- sugerir versão canônica por tema;
- produzir relatório de migração;
- atualizar documentos V6 apenas se instruído.

## Critério de segurança
Se houver dúvida entre apagar ou preservar, PRESERVAR e registrar a dúvida.

## Critério de qualidade
A V6 só avança para migração em escala quando o módulo piloto demonstrar:
- zero perda de conteúdo relevante;
- cobertura do edital mantida ou ampliada;
- UX mais clara;
- feedback mais explicativo;
- treino mais próximo da FGV;
- métricas de domínio funcionando;
- auditoria Premium aprovada.
