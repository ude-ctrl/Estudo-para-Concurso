# V6 — Arquitetura Definitiva da Fase 2

## 1. Decisão estrutural
A V6 será organizada em quatro níveis:

**SEDUC-PA → Módulo → Unidade → Missões/Etapas**

A tela inicial não exibirá 30 arquivos nem números de Tema. Ela exibirá **9 módulos**. Dentro dos módulos haverá **28 unidades canônicas**. A unidade é a menor página/trilha pedagógica principal; as missões/etapas são blocos internos de estudo, prática, recuperação e avaliação.

### Por que 28 unidades e não 9 páginas gigantes
- reduz a carga visual no painel sem comprimir conteúdos densos;
- evita páginas excessivamente longas;
- permite retomada precisa de progresso;
- facilita revisão espaçada e domínio por assunto;
- mantém granularidade suficiente para 45–60 minutos de estudo;
- elimina apenas duplicação estrutural real, não aprofundamento.

### O que deixa de existir para o estudante
- navegação principal por `Tema 01`, `Tema 02` etc.;
- versões duplicadas aparecendo como conteúdos diferentes;
- páginas com nomes incorretos ou numeração conflituosa;
- necessidade de saber qual arquivo é “Auditado”.

A numeração histórica permanece apenas em metadados de migração e auditoria.

---

# 2. Mapa final — 9 módulos / 28 unidades

## Módulo 1 — Fundamentos da Geografia
**Função:** fornecer os conceitos e autores que serão reutilizados em toda a plataforma.

### Unidade 1.1 — Conceitos, Categorias e Autores
Fonte principal:
- Tema 01 — Conceitos e Autores.

Conteúdo interno preservado:
- espaço geográfico;
- território e territorialidade;
- região e regionalização;
- paisagem;
- lugar;
- redes e escalas;
- escolas do pensamento geográfico;
- autores clássicos e contemporâneos;
- perspectivas crítica, cultural e decolonial;
- integração conceitual.

**Decisão:** manter como unidade robusta única. Não fragmentar a página apenas para reduzir tamanho, pois os conceitos formam um sistema e a V5 é a referência qualitativa do projeto.

**Pré-requisito:** nenhum.

**Conceitos-base gerados:** espaço, território, região, paisagem, lugar, rede, escala.

---

## Módulo 2 — Cartografia e Geotecnologias
**Função:** consolidar Cartografia I, Cartografia II e Cartografia/Geotecnologias sem perda de conteúdo.

### Unidade 2.1 — Orientação, Coordenadas, Fusos e Escala
Fontes:
- Tema 02 — Cartografia I;
- complementos exclusivos do antigo Tema 17 Cartografia.

Núcleo:
- orientação;
- coordenadas;
- latitude/longitude;
- fusos horários;
- escala numérica e gráfica;
- cálculo e interpretação.

### Unidade 2.2 — Projeções e Representação Cartográfica
Fontes:
- Tema 03 Auditada como fonte principal;
- antigo Tema 17 Cartografia para conteúdos exclusivos.

Núcleo:
- mapa, carta e planta;
- projeções;
- Mercator e equivalência/conformidade;
- semiologia gráfica;
- variáveis visuais;
- cartografia temática;
- curvas de nível;
- perfil topográfico;
- declividade;
- tabelas e gráficos.

### Unidade 2.3 — Sensoriamento Remoto, SIG e Geotecnologias
Fontes:
- Tema 03 Auditada;
- antigo Tema 17 Cartografia.

Núcleo:
- sensoriamento remoto;
- espectro eletromagnético;
- resolução e interpretação de imagens;
- classificação de imagens;
- SIG/geoprocessamento;
- GNSS;
- geocodificação;
- interpolação;
- georreferenciamento;
- metadados;
- INDE;
- PRODES/DETER;
- aplicações Amazônia/Pará.

**Regra de fusão:** Tema 03 comum fica como fonte histórica; a versão Auditada é preferencial. Nenhum conteúdo exclusivo do Tema 17 Cartografia pode desaparecer.

**Pré-requisito do módulo:** Unidade 1.1.

---

## Módulo 3 — Geografia Física, Ambiente e Energia
**Função:** preservar os grandes sistemas naturais como unidades próprias e criar conexão sistêmica entre eles.

### Unidade 3.1 — Climatologia
Fonte: Tema 04.

### Unidade 3.2 — Tectônica, Geologia e Relevo
Fonte: Tema 05.

### Unidade 3.3 — Solos, Erosão e Riscos Geomorfológicos
Fonte: Tema 06.

### Unidade 3.4 — Hidrologia e Recursos Hídricos
Fonte: Tema 07.

### Unidade 3.5 — Biomas e Domínios Morfoclimáticos
Fonte: Tema 08.

### Unidade 3.6 — Ambiente, Conservação e Energia
Fonte: Tema 09.

**Decisão:** não fundir essas seis unidades em uma única página. A integração ocorrerá por missões e questões cruzadas, preservando profundidade e reduzindo repetição de definições.

**Dependências principais:**
- 3.3 usa relevo/processos de 3.2;
- 3.4 dialoga com 3.1 e 3.2;
- 3.5 integra 3.1–3.4;
- 3.6 usa fundamentos de 3.1–3.5.

**Aplicação posterior:** Módulo 7 — Amazônia e Pará.

---

## Módulo 4 — Geografia Humana e Organização do Espaço
**Função:** integrar população, cidade, campo, produção e redes sem transformar áreas autônomas em um bloco excessivamente longo.

### Unidade 4.1 — População, Migrações e Povos Tradicionais
Fonte: Tema 10.

### Unidade 4.2 — Geografia Urbana e Redes Urbanas
Fonte: Tema 11.

### Unidade 4.3 — Geografia Agrária e Questão Fundiária
Fonte: Tema 12.

### Unidade 4.4 — Indústria, Economia, Redes e Logística
Fonte: Tema 13.

**Dependências:**
- 4.2 usa demografia/migrações de 4.1;
- 4.3 usa território de 1.1;
- 4.4 integra campo–cidade, indústria e redes.

**Aplicações posteriores:** Módulo 5 Brasil e Módulo 7 Amazônia e Pará.

---

## Módulo 5 — Brasil: Território e Regionalização
**Função:** aplicar fundamentos físicos e humanos ao território brasileiro, sem repetir as definições dos módulos-base.

### Unidade 5.1 — Brasil: Formação Territorial, Regionalização e Integração
Fonte principal:
- Tema 16 — Brasil e Regionalização.

Núcleo:
- formação territorial;
- tratados/fronteiras;
- Grandes Regiões IBGE;
- Regiões Geográficas Imediatas e Intermediárias;
- complexos geoeconômicos de Geiger;
- Amazônia Legal como recorte político-administrativo;
- desigualdades regionais;
- dinâmica populacional brasileira;
- urbanização;
- espaço agrário;
- industrialização;
- infraestrutura e integração nacional.

**Regra:** população, urbanização, agrário, indústria e redes aparecem aqui como **aplicações brasileiras**, não como nova exposição da teoria-base.

**Pré-requisitos recomendados:** Módulos 1, 3 e 4.

---

## Módulo 6 — Geopolítica, Globalização e Geoeconomia
**Função:** reunir geopolítica clássica, ordem mundial e geoeconomia contemporânea.

### Unidade 6.1 — Geopolítica, Poder e Ordem Mundial
Fonte: Tema 14.

Núcleo:
- Estado, nação, território, soberania e fronteiras;
- Ratzel/Kjellén;
- Mahan, Mackinder e Spykman;
- Guerra Fria;
- ordem pós-1991;
- hard/soft/smart power;
- globalização;
- blocos e integração.

### Unidade 6.2 — Geoeconomia e Conflitos Contemporâneos
Fonte:
- atual arquivo nominal Tema 15, cujo conteúdo real é Geopolítica II.

Núcleo:
- cadeias globais de valor;
- China;
- BRI;
- Taiwan e semicondutores;
- chokepoints;
- minerais críticos;
- friend-shoring, nearshoring e de-risking;
- conflitos contemporâneos e recursos estratégicos.

**Correção obrigatória futura:** remover o nome de arquivo/conteúdo amazônico incorreto do Tema 15 durante a migração.

**Pré-requisitos:** 1.1 e 4.4.

---

## Módulo 7 — Amazônia e Pará
**Função:** eixo regional de alta prioridade para SEDUC-PA. Ensina especificidades amazônicas e paraenses usando conceitos-base dos módulos anteriores.

### Unidade 7.1 — Amazônia: Natureza e Sistemas Ambientais
Fonte: Tema 17 Amazônia.

Núcleo:
- circulação atmosférica amazônica;
- ZCIT aplicada;
- evapotranspiração e reciclagem de umidade;
- rios e pulso de inundação;
- várzea/igapó;
- solos, floresta e água;
- desmatamento/degradação;
- monitoramento ambiental.

### Unidade 7.2 — Amazônia: Formação Territorial, Redes e Urbanização
Fonte: Tema 18 Amazônia.

Núcleo:
- territorialidades indígenas;
- ocupação colonial;
- missões, drogas do sertão e Pombal;
- ciclo da borracha;
- rios e rede urbana;
- SPVEA/SUDAM;
- PIN;
- Transamazônica/BR-163;
- urbanização amazônica e Bertha Becker.

### Unidade 7.3 — Amazônia: Conflitos, Grandes Projetos e Desenvolvimento
Fonte: Tema 19.

Núcleo:
- mineração/Carajás;
- garimpo e mercúrio;
- conflitos territoriais;
- povos e comunidades;
- hidrelétricas;
- Tucuruí/Belo Monte;
- grandes projetos;
- desenvolvimento, custos e distribuição de benefícios.

### Unidade 7.4 — Pará: Território, População e Regionalização
Fonte: Tema 20.

Núcleo:
- formação territorial paraense;
- Cabanagem em chave territorial;
- 144 municípios;
- Regiões de Integração;
- IBGE;
- população, mobilidade e rede urbana;
- Belém, Santarém, Marabá e demais centralidades.

### Unidade 7.5 — Pará: Economia, Infraestrutura e Ambiente
Fonte: Tema 21.

Núcleo:
- mineração;
- Carajás e EFC;
- Barcarena/portos;
- agropecuária;
- energia;
- logística;
- exportações;
- crescimento × desenvolvimento;
- concentração espacial;
- impactos ambientais e territoriais.

**Regra conceito-base → aplicação:**
- ZCIT é ensinada em 3.1 e aplicada em 7.1;
- hidrologia é ensinada em 3.4 e aplicada em 7.1;
- território/territorialidade são ensinados em 1.1 e aplicados em 7.2/7.3;
- redes urbanas/REGIC são ensinadas em 4.2 e aplicadas em 7.2/7.4;
- mineração/logística são estruturadas em 4.4 e aplicadas em 7.3/7.5;
- povos tradicionais são conceituados em 4.1 e territorializados regionalmente em 7.2/7.3.

**Pré-requisitos recomendados:** 1.1, 3.1–3.6, 4.1–4.4 e 5.1.

---

## Módulo 8 — Educação, Ensino de Geografia e Legislação
**Função:** concentrar os conhecimentos pedagógicos sem perder a especificidade do ensino de Geografia.

### Unidade 8.1 — BNCC e Ensino de Geografia
Fontes:
- antigo Tema 18 BNCC;
- Tema 22 Auditado.

Regra de fusão:
- antigo Tema 18 fornece a espinha normativa/curricular: arquitetura da BNCC, competências específicas, unidades temáticas, princípios, códigos de habilidades, EF × EM, planejamento e contextualização;
- Tema 22 fornece a espinha de didática específica: pensamento espacial × raciocínio geográfico, cartografia escolar, Castellar, Callai, Castro Panizza, erros dos estudantes e situações de ensino.

Nenhuma das versões substitui integralmente a outra.

### Unidade 8.2 — Legislação e Fundamentos da Educação
Fonte: Tema 23.

Núcleo:
- Constituição;
- LDB;
- ECA;
- gestão democrática;
- financiamento/fundamentos legais conforme edital;
- PNE/SNE e legislação aplicável.

### Unidade 8.3 — Fundamentos Pedagógicos, Aprendizagem e Inclusão
Fonte: Tema 24.

Núcleo:
- Piaget;
- Vygotsky;
- Freire;
- Wallon;
- avaliação;
- PPP/interdisciplinaridade;
- aprendizagem baseada em evidências;
- memória, atenção e funções executivas;
- DUA;
- AEE;
- inclusão;
- TEA, TDAH e transtornos específicos de aprendizagem.

**Complementos obrigatórios antes da versão final:**
1. verificar/inserir Documento/Base Curricular do Pará;
2. tornar explícito o bloco de transtornos específicos de aprendizagem e diferenciações cobradas no edital.

---

## Módulo 9 — Conhecimentos Básicos
**Função:** organizar as disciplinas gerais sem misturá-las com a biblioteca de Geografia.

### Unidade 9.1 — Língua Portuguesa — FGV
Fonte: Tema 25.

### Unidade 9.2 — Raciocínio Lógico — FGV
Fonte: Tema 26.

### Unidade 9.3 — Atualidades do Pará e Sociedade
Fonte: Tema 27.

**Regra de Atualidades:** toda informação temporal deve exibir fonte, data de referência e data de verificação.

---

# 3. Contagem canônica

| Módulo | Unidades |
|---|---:|
| 1. Fundamentos da Geografia | 1 |
| 2. Cartografia e Geotecnologias | 3 |
| 3. Geografia Física, Ambiente e Energia | 6 |
| 4. Geografia Humana e Organização do Espaço | 4 |
| 5. Brasil: Território e Regionalização | 1 |
| 6. Geopolítica, Globalização e Geoeconomia | 2 |
| 7. Amazônia e Pará | 5 |
| 8. Educação, Ensino de Geografia e Legislação | 3 |
| 9. Conhecimentos Básicos | 3 |
| **Total** | **28** |

### De 30 páginas atuais para 28 unidades canônicas
A redução vem de:
- Tema 03 comum + Tema 03 Auditada → uma fonte canônica de Cartografia II, com integração seletiva;
- BNCC antiga + BNCC auditada → uma unidade V6 combinada;
- conflitos de numeração deixam de existir na interface;
- o antigo Tema 17 Cartografia não vira uma quarta unidade isolada: seu conteúdo é distribuído nas três unidades do Módulo 2.

A redução **não** vem de cortar teoria aprovada.

---

# 4. Biblioteca ≠ trilha de estudo

## Biblioteca
A biblioteca organiza conteúdo por lógica científica e facilidade de localização. Ela não obriga o aluno a concluir todos os módulos em sequência antes de estudar Conhecimentos Básicos.

## Trilha SEDUC-PA
A trilha de preparação deve ser intercalada para se aproximar da prova e favorecer retenção. A plataforma deve alternar três faixas:

1. **Geografia específica** — eixo principal;
2. **Conhecimentos pedagógicos** — recorrentes desde o início;
3. **Português, Raciocínio Lógico e Atualidades** — distribuídos ao longo do ciclo.

Isso evita o erro de estudar 100% da Geografia primeiro e deixar metade da prova objetiva para o fim.

### Ordem conceitual recomendada dentro da Geografia
1. 1.1 Fundamentos;
2. 2.1–2.3 Cartografia;
3. 3.1–3.6 Física;
4. 4.1–4.4 Humana;
5. 5.1 Brasil;
6. 7.1–7.5 Amazônia e Pará;
7. 6.1–6.2 Geopolítica.

Geopolítica pode ser antecipada em ciclos de revisão, mas o fluxo acima maximiza reaproveitamento de conceitos e aplicações regionais.

---

# 5. Modelo interno de cada unidade

Cada unidade V6 seguirá o mesmo esqueleto lógico. O número de missões pode variar conforme densidade.

## Entrada
1. Visão da unidade e por que cai;
2. diagnóstico curto;
3. mapa de pré-requisitos;
4. objetivo de domínio.

## Estudo
5. teoria em missões temáticas;
6. exemplos e aplicações;
7. caixas FGV/pegadinhas;
8. questões de recuperação inseridas na teoria;
9. recall sem consulta.

## Treino
10. Fixação;
11. Concurso;
12. FGV Elite;
13. questões cruzadas com unidades anteriores;
14. questões visuais quando pertinentes.

## Revisão
15. flashcards;
16. revisão de erros;
17. recuperação espaçada;
18. síntese ativa.

## Fechamento
19. Chefão;
20. Game V/F como fluência/consolidação;
21. domínio estimado;
22. próximos passos e conexões.

Uma unidade não precisa expor 22 telas fixas. Este é o repertório funcional; a UX da Fase 3 definirá como agrupar sem poluição visual.

---

# 6. Navegação definitiva

## Nível 1 — Concurso
`SEDUC-PA`

Tela de entrada:
- Continuar estudando;
- Revisões de hoje;
- Próxima missão;
- pontos fracos;
- Simulado;
- Módulos;
- Caderno de erros.

## Nível 2 — Módulo
Exemplo:
`Cartografia e Geotecnologias`

Mostra:
- domínio do módulo;
- 3 unidades;
- pré-requisitos;
- revisão pendente;
- desafio do módulo.

## Nível 3 — Unidade
Exemplo:
`2.2 Projeções e Representação Cartográfica`

Mostra:
- progresso da unidade;
- domínio estimado;
- missões;
- treino;
- revisão;
- Chefão.

## Nível 4 — Missão/Etapa
Trecho estudável de curta duração com uma meta clara.

### Breadcrumb
`SEDUC-PA › Cartografia e Geotecnologias › Projeções e Representação › Missão 4`

A numeração histórica `Tema XX` não aparece no breadcrumb.

---

# 7. Regra de conceitos-base e aplicações

## Conceito-base
É ensinado com definição, mecanismo, contrastes, exemplos e treino completo em uma unidade canônica.

## Aplicação
Ao reaparecer em Brasil, Amazônia ou Pará:
- não repetir a aula inteira;
- fazer uma recuperação curta;
- fornecer link “Revisar conceito-base”;
- aplicar o conceito a novo caso;
- cobrar comparação/transferência.

### Exemplos oficiais
| Conceito-base | Unidade-base | Aplicações |
|---|---|---|
| território | 1.1 | 5.1, 6.1, 7.2, 7.3, 7.4 |
| escala geográfica | 1.1 | 4.2, 5.1, 7.1–7.5, 8.1 |
| cartografia temática | 2.2 | 4.2, 5.1, 7.4, 8.1 |
| sensoriamento remoto | 2.3 | 7.1, 7.3, 7.5 |
| ZCIT | 3.1 | 7.1 |
| bacia/vazão/cheias | 3.4 | 7.1, 7.5 |
| biomas | 3.5 | 5.1, 7.1 |
| rede urbana/REGIC | 4.2 | 5.1, 7.2, 7.4 |
| questão agrária | 4.3 | 5.1, 7.3, 7.5 |
| cadeia/logística | 4.4 | 5.1, 6.2, 7.3, 7.5 |
| povos tradicionais | 4.1 | 7.2, 7.3, 8.1 |

---

# 8. Conteúdos transversais

Não devem virar novas páginas teóricas duplicadas.

## Sistemas globais
- caderno de erros;
- revisão espaçada;
- flashcards;
- banco de questões;
- simulados;
- discursivas;
- prova prática;
- domínio/desempenho.

## Conteúdos que atravessam módulos
- escalas;
- território;
- redes;
- natureza–sociedade;
- desigualdades;
- sustentabilidade;
- cartografia;
- interpretação de dados.

Esses conceitos terão tags globais para permitir questões interdisciplinares e revisão por conceito.

---

# 9. Regras de migração por unidade

Antes de declarar uma unidade V6 pronta:
1. listar todas as fontes históricas;
2. inventariar teoria, questões, recalls, flashcards, Chefão e Game;
3. marcar conteúdo duplicado, complementar e exclusivo;
4. migrar conteúdo exclusivo integralmente;
5. substituir repetição por referência apenas quando a versão canônica estiver preservada;
6. manter exemplos regionais úteis;
7. preservar ou migrar `localStorage` quando possível;
8. testar paridade de conteúdo;
9. executar Auditoria Premium;
10. somente depois classificar o original como legado.

---

# 10. Política de tamanho

A V6 não terá meta artificial de “poucas páginas”. O critério é carga cognitiva.

### Uma unidade deve ser separada quando
- possui núcleo conceitual próprio;
- exige treino específico;
- possui volume suficiente para sessão própria;
- pode ser revisada independentemente.

### Unidades devem ser fundidas quando
- uma é versão antiga da outra;
- a separação cria repetição forte;
- são partes inseparáveis de um mesmo fluxo;
- a fusão melhora busca e revisão sem tornar a unidade excessiva.

---

# 11. Estado da Fase 2

Com este documento ficam definidos:
- 9 módulos;
- 28 unidades canônicas;
- fontes de cada unidade;
- dependências principais;
- navegação em quatro níveis;
- conceito-base × aplicação;
- distinção biblioteca × trilha;
- regras de migração.

A implementação visual ainda pertence à **Fase 3 — Matriz Premium V6 de UX**. Nenhum HTML de estudo foi modificado nesta fase.