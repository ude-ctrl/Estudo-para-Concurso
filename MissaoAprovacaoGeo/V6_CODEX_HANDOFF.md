# V6 — Handoff Oficial para Codex

## Estado atual
O planejamento da V6 foi concluído até a **Fase 13**.

A próxima tarefa não é mais auditoria nem desenho conceitual: é construir o **Piloto V6 — Módulo 2: Cartografia e Geotecnologias**, conforme a Issue #12.

A branch `main` contém a plataforma histórica publicada e deve permanecer intacta durante o piloto.

A branch `v6-planejamento` contém a documentação oficial e é a fonte de verdade do novo sistema.

Existe também o snapshot histórico:
- `snapshot-base-estudos-2026-10-15`

## Leia antes de codificar
Obrigatório ler integralmente, nesta ordem:
1. `V6_PLANO_MESTRE.md`
2. `V6_CHECKLIST_IMPLEMENTACAO.md`
3. `V6_ARQUITETURA_REUTILIZAVEL_CONCURSOS.md`
4. `V6_ARQUITETURA_DEFINITIVA_FASE2.md`
5. `V6_MAPA_DE_MODULOS.md`
6. `V6_MATRIZ_REDUNDANCIA.md`
7. `V6_MATRIZ_PREMIUM_UX_FASE3.md`
8. `V6_GAMIFICACAO_FASE4.md`
9. `V6_FEEDBACK_UNIVERSAL_FASE5.md`
10. `V6_BANCO_QUESTOES_FASE6.md`
11. `V6_FLASHCARDS_REVISAO_FASE7.md`
12. `V6_CADERNO_ERROS_FASE8.md`
13. `V6_METRICA_DOMINIO_FASE9.md`
14. `V6_GERADOR_SIMULADOS_FASE10.md`
15. `V6_DISCURSIVAS_FASE11.md`
16. `V6_PROVA_PRATICA_FASE12.md`
17. `V6_CORRECOES_E_LACUNAS_FASE13.md`
18. `V6_AUDITORIA_CARTOGRAFIA.md`
19. Issue #12 — `V6 — Fase 14: Piloto Cartografia e Geotecnologias`

Em caso de conflito, prevalece a documentação mais recente e específica da V6.

## Missão do projeto
Construir uma plataforma pessoal de preparação de alto desempenho para concursos de Professor de Geografia.

A SEDUC-PA/FGV é o primeiro perfil de concurso, mas a arquitetura deve separar:
- **Base Permanente de Conhecimento**;
- **Aplicações regionais**;
- **Perfil de concurso/banca**;
- **Dados temporais**.

O objetivo é reaproveitar a base futuramente em SEDUC-MA, Imperatriz-MA e outros concursos sem reconstruir tudo.

## Arquitetura oficial
Navegação:
`Concurso → Módulo → Unidade → Missão/Etapa`

Painel principal: 9 módulos / 28 unidades canônicas.

Módulos:
1. Fundamentos da Geografia
2. Cartografia e Geotecnologias
3. Geografia Física e Sistemas Naturais
4. Geografia Humana e Organização do Espaço
5. Geopolítica, Globalização e Economia Mundial
6. Amazônia e Pará
7. Brasil — Território, Economia e Regionalização
8. Educação, Ensino de Geografia e Legislação
9. Conhecimentos Básicos

`Tema XX` não é identidade na V6. Usar `unit_id` canônico.

## Fluxo pedagógico
Fluxo mental:
`Diagnóstico → Aprender → Evocar → Treinar → Corrigir → Revisar → Integrar → Dominar`

Separar claramente:
- Estudo
- Treino
- Revisão
- Prova

## Regra pedagógica inviolável
**Toda interação que entrega informação deve ensinar.**

Nenhuma questão, flashcard, Game V/F ou atividade pode terminar apenas em “certo/errado”.

Quando aplicável, feedback deve conter:
- resposta correta;
- explicação objetiva;
- mecanismo causal/relação conceitual;
- exemplo concreto, cotidiano ou territorial;
- contraste com a confusão provável;
- micro-recuperação quando útil.

## Questões
Pools funcionais:
- Fixação
- Concurso
- FGV Elite
- Questões Reais

Regras:
- questões reais permanecem fiéis ao original;
- autorais Concurso/FGV Elite do perfil SEDUC-PA usam A–E;
- uma correta;
- distratores plausíveis;
- sem padrão previsível de gabarito;
- dificuldade D1–D4;
- nível cognitivo C1–C5;
- `legacy_id`/rastreabilidade;
- mapas, gráficos, tabelas e imagens quando aumentarem validade do item.

## Flashcards
- recuperação antes da revelação;
- card atômico;
- verso = resposta nuclear + explicação + exemplo;
- estados Errei / Difícil / Bom / Fácil;
- `due` individual;
- revisão espaçada;
- lapsos e cartões problemáticos;
- integração com erros e domínio.

## Caderno Global de Erros
Erro é objeto global por conceito/misconception, não por página.

Ver explicação não resolve erro.

Erro convertido em domínio exige recuperação posterior, preferencialmente em outro contexto.

## Domínio
Nunca confundir:
- progresso;
- precisão;
- retenção;
- domínio.

Domínio é estimativa com confiança e exige evidência mínima. Não fabricar percentuais por clique, leitura ou conclusão de página.

## Gamificação
Gamificação recompensa aprendizagem, não navegação.

Permitido:
- XP;
- streak;
- conquistas discretas;
- microcelebrações;
- erro convertido em domínio;
- identidade temática.

Proibido:
- farming;
- XP por clique/passive scroll;
- ruído visual constante;
- confundir XP com domínio.

## UX
DNA visual aprovado: V5 de Conceitos e Autores.

Preservar:
- Literata para leitura;
- Inter para UI;
- fundo claro quente;
- cards discretos;
- verde principal;
- dark mode;
- leitura confortável.

V6 deve melhorar:
- menos informação simultânea;
- primeira dobra responde “o que faço agora?”;
- divulgação progressiva;
- uma ação primária por tela;
- mobile-first;
- foco visível/teclado;
- contraste;
- feedback não dependente só de cor;
- `prefers-reduced-motion`.

## Simulados
Não existe prova fixa de 60 questões.

Existe **gerador sobre banco amplo**.

Cada tentativa SEDUC-PA:
- 10 Português
- 5 Lógica
- 5 Atualidades
- 10 Pedagógicos
- 30 Geografia

Política anti-repetição e índice de novidade obrigatórios.

Modo Prova Completa: 60 objetivas + 2 discursivas sob cronômetro global de 5h.

## Discursivas
Para Professor:
- 2 situações-problema;
- 15–30 linhas cada;
- contexto escolar;
- sem resposta-modelo antes da tentativa;
- banco rotativo;
- treino digital + manuscrito;
- rubrica pedagógica não deve ser apresentada como espelho oficial da FGV.

## Prova prática
Treino deve refletir o edital geral vigente:
- defesa de plano de aula;
- plano manuscrito no local;
- Plano = 4 pontos;
- Defesa = 6 pontos;
- sem projetor, vídeo ou computador;
- lousa/quadro e pincel;
- não inventar tempo oficial antes do edital de convocação.

## Correções estruturais já fechadas
- antigo Tema 15 é Geopolítica II apesar do nome do arquivo;
- conflitos de Tema 17 e Tema 18 são resolvidos por `unit_id`, não por renumeração destrutiva;
- BNCC 18 + 22 = fusão seletiva;
- Cartografia 02 + 03 Auditada + 17 = consolidação seletiva;
- DCEPA deve entrar explicitamente no Módulo 8;
- transtornos funcionais específicos devem entrar explicitamente em Fundamentos Pedagógicos;
- originais permanecem até auditoria de paridade.

## PILOTO OFICIAL — CARTOGRAFIA
Fontes históricas obrigatórias:
- `SEDUC_PA_Tema_02_Cartografia_I_MATRIZ_OFICIAL_V2_6.html`
- `SEDUC_PA_Tema_03_Cartografia_II_MATRIZ_OFICIAL_V2_6_AUDITADA.html`
- `SEDUC_PA_Tema_17_Cartografia_Geotecnologias_e_Representacao_do_Espaco.html`

Unidades canônicas:
1. `cartografia-fundamentos`
2. `cartografia-representacao`
3. `geotecnologias`

A versão não auditada do Tema 03 é legado secundário.

## Regras de implementação do piloto
- NÃO alterar `main`;
- criar/trabalhar em branch própria do piloto;
- NÃO apagar ou sobrescrever os três arquivos históricos;
- primeiro produzir mapa de paridade fonte → unidade V6;
- preservar todo conteúdo exclusivo válido;
- não concatenar os HTMLs;
- criar shell/componentes reutilizáveis;
- separar conteúdo/dados da camada de UI quando isso reduzir duplicação sem complicar manutenção;
- preservar funcionamento estático compatível com GitHub Pages;
- persistência deve usar IDs canônicos, com estratégia explícita para migração de progresso legado;
- testar mobile, dark mode, reduced motion, teclado, localStorage;
- criar testes/auditorias para contagens, chaves, duplicatas e gabaritos;
- nenhum merge para `main` antes da Auditoria Premium e aprovação humana.

## Entregas obrigatórias do piloto
- entrada/dashboard do Módulo Cartografia;
- 3 unidades V6 navegáveis;
- Estudo/Treino/Revisão/Prova separados;
- conteúdo migrado com relatório de paridade;
- questões V6;
- flashcards V6;
- Game V/F justificado;
- caderno global de erros;
- domínio estimado com confiança;
- persistência e migração de progresso testadas;
- auditoria funcional;
- relatório de Auditoria Premium.

## Critério de parada
**Não migrar outro módulo automaticamente.**

Quando o piloto estiver funcional e auditado:
1. parar;
2. documentar resultados, problemas e decisões;
3. aguardar revisão/aprovação humana;
4. só então escalar.
