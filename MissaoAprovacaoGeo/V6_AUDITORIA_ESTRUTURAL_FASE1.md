# V6 — Auditoria Estrutural — Fase 1

## Objetivo
Inventariar a estrutura atual do projeto SEDUC-PA antes de qualquer migração para a V6, identificando versões canônicas, duplicidades, conflitos de numeração, nome×conteúdo, redundâncias temáticas e riscos de perda.

## Regra de segurança
- Nenhuma página HTML foi alterada nesta fase.
- `main` permanece como fonte de verdade do material publicado.
- Toda consolidação futura ocorrerá primeiro fora de `main` e deverá preservar integralmente conteúdo único, questões, flashcards, games, explicações e dados relevantes.

## Inventário estrutural confirmado
O diretório `MissaoAprovacaoGeo` contém a série principal SEDUC-PA, além de arquivos de auditoria. A série cobre, em linhas gerais:
1. Conceitos e Autores
2. Cartografia I
3. Cartografia II
4. Climatologia
5. Tectônica e Relevo
6. Solos e Erosão
7. Hidrologia
8. Biomas e Domínios
9. Ambiente e Energia
10. População e Povos Tradicionais
11. Geografia Urbana
12. Geografia Agrária
13. Indústria, Economia e Redes
14. Geopolítica, Globalização e Ordem Mundial
15. arquivo nominalmente Amazônia, mas internamente Geopolítica II
16. Geografia do Brasil e do Pará
17. Amazônia: Natureza e Sistemas Ambientais
17. Cartografia, Geotecnologias e Representação do Espaço
18. Amazônia: Formação Territorial e Redes
18. BNCC e Ensino de Geografia
19. Amazônia: Conflitos e Desenvolvimento
20. Pará: Território, População e Regionalização
21. Pará: Economia, Infraestrutura e Ambiente
22. BNCC e Ensino de Geografia — versão auditada
23. Legislação e Fundamentos da Educação
24. Fundamentos Pedagógicos
25. Língua Portuguesa FGV
26. Raciocínio Lógico FGV
27. Atualidades do Pará e Sociedade

Há ainda versões paralelas/legadas e auditorias, incluindo uma versão não auditada e outra auditada do Tema 03.

## Achados confirmados

### 1. Tema 03 possui duas versões
- `SEDUC_PA_Tema_03_Cartografia_II_MATRIZ_OFICIAL_V2_6.html`
- `SEDUC_PA_Tema_03_Cartografia_II_MATRIZ_OFICIAL_V2_6_AUDITADA.html`

Decisão preliminar: considerar a versão **AUDITADA** candidata canônica; a versão sem `AUDITADA` deve permanecer preservada como legado até a comparação final antes/depois.

### 2. Tema 15 tem nome de arquivo incompatível com o conteúdo real
Arquivo:
`SEDUC_PA_Tema_15_Amazonia_Natureza_Territorio_e_Desenvolvimento.html`

Título interno confirmado:
`Tema 15 · Geopolítica II · Matriz Oficial v2.6 · Auditada`

Decisão: NÃO apagar nem renomear ainda. Na V6, o conteúdo deve migrar para o módulo Geopolítica, com nome coerente, após inventário semântico completo.

### 3. Existem dois Tema 17 com conteúdos distintos
- `Tema 17 · Amazônia: Natureza e Sistemas Ambientais · Auditada`
- `Tema 17 · Cartografia, Geotecnologias e Representação do Espaço`

Não são versões do mesmo conteúdo. É conflito de numeração, não duplicação de página.

Decisão: remover numeração temática da experiência V6; usar IDs internos estáveis e navegação por Módulo → Unidade.

### 4. Existem dois Tema 18 com conteúdos distintos
- `Tema 18 · Amazônia: Formação Territorial e Redes · Auditada`
- `Tema 18 · BNCC e Ensino de Geografia`

Novamente, é conflito de numeração.

### 5. BNCC possui duplicidade temática real
- Tema 18 — BNCC e Ensino de Geografia
- Tema 22 — BNCC e Ensino de Geografia — Auditada

Decisão preliminar: Tema 22 é candidato canônico por ser versão auditada e posterior. Antes da consolidação, comparar conteúdo exclusivo, questões, flashcards, games e explicações do Tema 18 para não perder material útil.

### 6. Cartografia possui sobreposição estrutural forte
Fontes principais:
- Tema 02 — Cartografia I
- Tema 03 — Cartografia II, com versão auditada
- Tema 17 — Cartografia, Geotecnologias e Representação do Espaço

Sobreposições já identificadas: orientação, coordenadas, escala, fusos, projeções, cartografia temática, sensoriamento remoto, SIG/geoprocessamento, GNSS, gráficos/perfis.

Decisão: forte candidato a virar **um único módulo de Cartografia e Geotecnologias**, com várias unidades internas, preservando questões e aprofundamentos exclusivos.

### 7. Amazônia está distribuída em vários níveis de análise
Principais páginas:
- Amazônia: Natureza e Sistemas Ambientais
- Amazônia: Formação Territorial e Redes
- Amazônia: Conflitos e Desenvolvimento
- conteúdos amazônicos em Climatologia, Hidrologia, Biomas, População, Agrária, Ambiente e Pará

Isso não deve ser tratado como simples duplicação. Grande parte é **conceito-base + aplicação regional**.

Decisão: manter um módulo próprio Amazônia e Pará, removendo apenas repetição conceitual sem ganho pedagógico.

### 8. Brasil/Pará possui sobreposição planejável
- Tema 16 — Geografia do Brasil e do Pará
- Tema 20 — Pará: Território, População e Regionalização
- Tema 21 — Pará: Economia, Infraestrutura e Ambiente

Decisão: separar conteúdos nacionais estruturais dos conteúdos paraenses específicos. Evitar repetir regionalização, demografia e infraestrutura quando a unidade regional pode apenas aplicar o conceito-base.

### 9. Conceitos-base reaparecem em vários módulos
Exemplos: território, territorialidade, região, rede, escala, urbanização, estrutura fundiária, logística, globalização, desenvolvimento, sustentabilidade.

Decisão V6: cada conceito terá uma fonte principal; páginas posteriores devem aplicar, aprofundar ou recuperar o conceito, e não reensiná-lo integralmente.

## Candidatos canônicos preliminares
- Tema 03 Cartografia II: versão `AUDITADA`
- Tema 06, 07, 08, 09, 10: versões marcadas `AUDITADA`
- Amazônia 17, 18, 19: versões `AUDITADA`
- Pará 20 e 21: versões `AUDITADA`
- BNCC: Tema 22 `AUDITADA`, condicionado à preservação de exclusivos do Tema 18 antigo
- Temas 23–27: versões `AUDITADA`

Para temas sem dupla versão explícita, o arquivo publicado atual continua como referência até nova verificação.

## Riscos de perda de conteúdo
1. Apagar uma página “duplicada” sem comparar questões/flashcards exclusivos.
2. Fundir teoria e perder exemplos regionais que funcionam como transferência/aplicação.
3. Preservar apenas texto e perder mecanismos de interação, explicações e feedbacks.
4. Misturar dados permanentes e dados temporais, dificultando atualização pré-prova.
5. Alterar chaves de `localStorage` sem migração de progresso.
6. Renomear/mover arquivos antes de mapear links e dependências do site publicado.
7. Considerar número de tema como identidade estável — já há conflitos 17 e 18.

## Dados temporais que exigem marcação para atualização futura
- população e estimativas IBGE;
- PIB e exportações do Pará/FAPESPA;
- desmatamento/monitoramento ambiental;
- legislação educacional recente;
- atualidades do Pará;
- indicadores econômicos;
- fatos e dados pós-COP30;
- números anuais de matrizes energética/elétrica.

Na V6, esses itens deverão possuir metadados `fonte`, `ano/referência` e `última verificação`.

## Situação da Fase 1
### Concluído nesta rodada
- inventário estrutural macro;
- conflitos de numeração 17 e 18 confirmados;
- conflito Tema 15 nome×conteúdo confirmado;
- duplicidade de versão do Tema 03 confirmada;
- duplicidade temática BNCC 18/22 confirmada;
- sobreposições macro Cartografia, Amazônia e Brasil/Pará mapeadas;
- riscos de migração registrados;
- classes de dados temporais registradas.

### Ainda necessário para encerrar a Fase 1 em nível Premium
- inventário semântico fino por página (seções, conceitos e exemplos exclusivos);
- contagem por página de questões, flashcards, game e evocação;
- comparação detalhada Tema 03 comum × auditada;
- comparação detalhada BNCC Tema 18 × Tema 22;
- mapeamento completo das páginas 01–27 para destino V6;
- validação final Edital × mapa de conteúdo;
- definição definitiva de canônicos e legados.

## Próxima ação recomendada
Executar o **inventário semântico por blocos**, começando por Cartografia, por ser o caso de maior sobreposição estrutural e o melhor candidato inicial para consolidar três páginas em um módulo V6 sem perda de conteúdo.
