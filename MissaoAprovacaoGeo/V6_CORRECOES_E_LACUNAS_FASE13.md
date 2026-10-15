# V6 — Fase 13: Correções estruturais e lacunas antes do piloto

## Objetivo
Fechar os conflitos estruturais e as lacunas conhecidas antes de iniciar qualquer migração V6.

Esta fase **não renomeia, apaga ou reescreve os HTMLs históricos da `main`**. Ela define o destino canônico de cada conteúdo e o que obrigatoriamente deverá entrar na migração.

---

## 1. Tema 15 — nome de arquivo incompatível com o conteúdo

Arquivo histórico:
`SEDUC_PA_Tema_15_Amazonia_Natureza_Territorio_e_Desenvolvimento.html`

O próprio `<title>` interno confirma que o conteúdo real é **Tema 15 · Geopolítica II**.

### Decisão V6
O arquivo histórico não será renomeado agora.

Na V6, o conteúdo terá identidade canônica independente do número legado:
- `unit_id`: `geopolitica-ii-geoeconomia-asia`
- módulo: **Geopolítica, Globalização e Economia Mundial**
- título de navegação sugerido: **Geopolítica II — China, Taiwan, BRI, Chokepoints e Geoeconomia**

O nome antigo fica apenas em `legacy_source` para rastreabilidade.

---

## 2. Conflito Tema 17

Existem dois arquivos históricos com número 17:
- Amazônia — Natureza e Sistemas Ambientais;
- Cartografia, Geotecnologias e Representação do Espaço.

### Decisão V6
A numeração deixa de ter função de identidade.

Destinos:
- Amazônia Natureza → `amazonia-natureza-sistemas`
- Cartografia integrada → conteúdo distribuído no Módulo Cartografia, especialmente `cartografia-representacao` e `geotecnologias`

Nenhum arquivo histórico será apagado antes da auditoria de paridade.

---

## 3. Conflito Tema 18

Existem dois arquivos históricos com número 18:
- Amazônia — Formação Territorial e Redes;
- BNCC e Ensino de Geografia.

### Decisão V6
Destinos:
- Amazônia Formação/Redes → `amazonia-formacao-redes`
- BNCC antigo → fonte complementar de `ensino-geografia-bncc`
- Tema 22 BNCC auditado → segunda fonte complementar da mesma unidade

A unidade V6 de Ensino de Geografia será formada por **fusão seletiva** das duas versões, preservando:
- arquitetura curricular e códigos/habilidades da versão mais normativa;
- Castellar, Callai, Castro Panizza, tratamento de erros e didática específica da versão auditada.

---

## 4. Cartografia — consolidação obrigatória

Fontes históricas:
- Tema 02 — Cartografia I;
- Tema 03 Auditada — Cartografia II;
- Tema 17 — Cartografia/Geotecnologias.

### Regra de migração
Não escolher uma página vencedora e não concatenar três HTMLs.

A V6 terá três unidades canônicas:
1. `cartografia-fundamentos`
2. `cartografia-representacao`
3. `geotecnologias`

A versão não auditada do Tema 03 fica como legado e não entra na navegação V6, salvo conteúdo exclusivo comprovado na auditoria de paridade.

---

## 5. DCEPA / Base Curricular do Pará — lacuna confirmada

As páginas atuais tratam BNCC, DCNs, currículo e PPP, mas a auditoria não encontrou um bloco explícito dedicado ao **Documento Curricular do Estado do Pará (DCEPA)**.

### Fontes oficiais de referência para migração
A V6 deverá incluir e versionar, no mínimo:
- Documento Curricular do Estado do Pará — Educação Infantil e Ensino Fundamental;
- Documento Curricular do Estado do Pará — Ensino Médio;
- atos/normas vigentes do Conselho Estadual de Educação do Pará pertinentes ao currículo da rede.

### Conteúdo mínimo do bloco DCEPA
- relação BNCC × currículo estadual × PPP;
- princípios e contexto amazônico/paraense;
- diversidade sociocultural e territorial;
- contextualização curricular;
- interdisciplinaridade;
- educação ambiental/sustentabilidade quando pertinente;
- implicações para o ensino de Geografia;
- leitura de habilidade/competência em situação didática;
- atualização normativa com `verified_at` e fonte.

### Local V6
Módulo 8 — Educação, Ensino de Geografia e Legislação.

O DCEPA será conteúdo explícito, não apenas uma menção dentro de BNCC.

---

## 6. Transtornos funcionais específicos — lacuna confirmada

A página de Fundamentos Pedagógicos cobre inclusão, DUA, AEE, TEA, deficiência, AH/SD e tecnologia assistiva, mas não possui bloco explícito sobre **transtornos funcionais específicos**.

### Distinção conceitual obrigatória
A V6 deve impedir a equivalência automática entre:
- deficiência / TEA / AH-SD como público-alvo da Educação Especial nos registros oficiais aplicáveis;
- transtornos funcionais específicos.

Segundo orientação oficial do INEP, pessoas com transtornos funcionais específicos, como TDAH, discalculia, disgrafia, dislexia e disortografia, não devem ser declaradas no Censo Escolar como pessoas com deficiência apenas por essa condição.

### Conteúdo mínimo
- dislexia;
- disortografia;
- disgrafia;
- discalculia;
- TDAH;
- distinções conceituais e educacionais relevantes;
- barreiras observáveis à aprendizagem;
- estratégias pedagógicas e de avaliação;
- DUA e adaptações de acesso quando pertinentes;
- cooperação escola-família-rede de apoio;
- limites da atuação docente.

### Regra de segurança conceitual
Professor não realiza diagnóstico clínico.

A plataforma deve treinar:
**observar evidências pedagógicas → reduzir barreiras → registrar/acompanhar → dialogar com equipe/família → encaminhar quando cabível**, sem rotular o estudante clinicamente.

### Local V6
Módulo 8, em Fundamentos Pedagógicos/Inclusão, conectado a DUA e avaliação.

---

## 7. IDs canônicos das 28 unidades

A navegação e a persistência da V6 não dependerão de `Tema XX`.

1. `fundamentos-geografia`
2. `cartografia-fundamentos`
3. `cartografia-representacao`
4. `geotecnologias`
5. `climatologia`
6. `tectonica-relevo`
7. `solos-erosao`
8. `hidrologia`
9. `biomas-dominios`
10. `ambiente-energia`
11. `populacao-povos-tradicionais`
12. `geografia-urbana`
13. `geografia-agraria`
14. `industria-economia-redes`
15. `geopolitica-ordem-mundial`
16. `geopolitica-ii-geoeconomia-asia`
17. `brasil-territorio-regionalizacao`
18. `amazonia-natureza-sistemas`
19. `amazonia-formacao-redes`
20. `amazonia-conflitos-desenvolvimento`
21. `para-territorio-populacao-regionalizacao`
22. `para-economia-infraestrutura-ambiente`
23. `ensino-geografia-bncc`
24. `legislacao-educacao`
25. `fundamentos-pedagogicos`
26. `lingua-portuguesa`
27. `raciocinio-logico`
28. `atualidades`

Esses IDs são estáveis e reutilizáveis entre concursos. O perfil de concurso decide quais unidades ativa e quais complementos regionais/banca adiciona.

---

## 8. Política de arquivos históricos

Até a aprovação do piloto e auditoria de paridade:
- nenhum HTML histórico será excluído;
- nenhum arquivo histórico será sobrescrito em massa;
- conflitos de nome/número serão resolvidos na camada V6 por `unit_id`;
- fontes antigas permanecem rastreáveis via `legacy_source`;
- após a migração, arquivos antigos poderão ir para diretório `legacy/` ou snapshot, somente com auditoria aprovada.

---

## 9. O que significa “atualizar módulos antigos ao padrão V6”

Não significa reescrever todos agora.

A regra correta é:
1. construir um piloto;
2. validar UX, dados, questões, flashcards, erros e domínio;
3. auditar paridade de conteúdo;
4. congelar o template V6;
5. migrar unidade a unidade;
6. só então retirar páginas antigas da navegação.

Portanto, a atualização dos módulos é **Fase 14/15 de implementação**, e não pré-requisito para encerrar o saneamento conceitual da Fase 13.

---

## 10. Critério de fechamento da Fase 13

Considera-se o saneamento concluído quando:
- Tema 15 possui destino canônico correto;
- conflitos 17/18 possuem destino canônico sem depender de renumeração;
- Cartografia possui regra de fusão definida;
- DCEPA entra explicitamente no escopo de migração;
- transtornos funcionais específicos entram explicitamente no escopo pedagógico;
- IDs canônicos estão definidos;
- nenhum original foi destruído;
- implementação em massa fica bloqueada até o piloto.

## Resultado
Com essas decisões, o projeto está pronto para escolher e construir o **piloto V6** sem carregar ambiguidades estruturais conhecidas.
