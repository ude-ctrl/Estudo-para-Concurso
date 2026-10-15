# V6 — Arquitetura Reutilizável para Outros Concursos

## Objetivo
Garantir que a base de estudo construída para a SEDUC-PA possa ser reutilizada futuramente em SEDUC-MA, Prefeitura de Imperatriz-MA e outros concursos de Professor de Geografia sem reconstrução desnecessária.

## Princípio central
Separar **conteúdo permanente de Geografia** de **adaptação específica ao concurso/banca**.

A plataforma deve evoluir para duas camadas lógicas:

### Camada A — Base Permanente de Conhecimento
Conteúdo conceitual e pedagógico reutilizável em diferentes concursos.

Exemplos:
- Fundamentos da Geografia;
- Cartografia e Geotecnologias;
- Geografia Física;
- Geografia Humana;
- Geopolítica;
- Brasil e Regionalização;
- Amazônia como conteúdo geográfico geral;
- Ensino de Geografia e fundamentos pedagógicos gerais;
- conceitos legais/educacionais de validade ampla quando aplicáveis.

Essa camada não deve citar SEDUC-PA como parte intrínseca do conteúdo, salvo em exemplos claramente identificados.

### Camada B — Perfil do Concurso
Configura como a Base Permanente será usada para um edital específico.

Cada perfil define:
- edital e tópicos exigidos;
- banca;
- pesos e distribuição da prova;
- trilha recomendada;
- conteúdos regionais obrigatórios;
- legislação específica;
- atualidades;
- estilo das questões;
- simulados;
- discursivas;
- prova prática;
- calendário e prioridade.

Exemplo de perfis futuros:
- `SEDUC-PA / FGV`
- `SEDUC-MA / banca a definir`
- `Imperatriz-MA / banca a definir`

## Consequência prática
Uma unidade como **Climatologia** é escrita e mantida uma vez na Base Permanente.

No perfil SEDUC-PA, a unidade pode receber:
- aplicações na Amazônia e Pará;
- questões no estilo FGV;
- prioridade conforme edital.

No perfil SEDUC-MA, a mesma unidade pode receber:
- aplicações no Maranhão;
- questões no estilo da banca correspondente;
- exemplos de clima e biomas maranhenses.

O núcleo teórico não é duplicado.

## Componentes reutilizáveis
Devem ser compartilhados entre concursos:
- teoria-base;
- glossário;
- conceitos estruturantes;
- flashcards conceituais;
- questões genéricas de fixação;
- sistema de revisão espaçada;
- caderno de erros;
- métrica de domínio;
- motor de gamificação;
- componentes de UX;
- histórico de aprendizagem do usuário quando compatível.

## Componentes específicos por concurso
Devem ficar fora da base permanente:
- edital;
- banca e estilo de cobrança;
- distribuição de questões;
- questões exclusivas da banca;
- legislação estadual/municipal;
- currículo estadual específico;
- atualidades locais;
- dados regionais voláteis;
- simulados oficiais;
- prova prática específica;
- datas e cronograma.

## Regra de regionalização
Conteúdos regionais podem existir em dois níveis:

1. **Base geográfica regional de validade ampla** — por exemplo Amazônia, Nordeste, Maranhão, Pará, regionalização brasileira.
2. **Aplicação do concurso** — fatos, legislação, atualidades e recortes diretamente exigidos por um edital.

Nunca misturar dado temporário específico de um concurso com a definição conceitual permanente.

## Preservação histórica
Foi criada a branch:

`snapshot-base-estudos-2026-10-15`

Ela congela o estado da `main` antes da futura implementação estrutural da V6.

Regras:
- não usar essa branch para desenvolvimento;
- não reescrevê-la;
- tratá-la como snapshot histórico recuperável;
- desenvolvimento V6 continua em branch própria;
- `main` só recebe mudanças aprovadas.

## Arquitetura futura sugerida
A implementação pode evoluir para algo conceitualmente equivalente a:

```text
/base-conhecimento/
  fundamentos/
  cartografia/
  fisica/
  humana/
  geopolitica/
  brasil/
  amazonia/
  ensino-geografia/

/concursos/
  seduc-pa/
    perfil.json
    trilha.json
    questoes-fgv/
    para/
    legislacao/
    atualidades/
    simulados/
  seduc-ma/
  imperatriz-ma/
```

A estrutura física final dos arquivos será definida apenas durante a implementação técnica; este documento fixa a separação lógica.

## Regra de autoria da V6
Ao revisar uma unidade, perguntar sempre:

**Isto pertence ao conhecimento permanente ou ao perfil SEDUC-PA?**

Se for permanente, manter no núcleo reutilizável.
Se for específico do concurso, marcar como camada de aplicação.

## Benefício estratégico
Essa arquitetura transforma o projeto de uma “apostila da SEDUC-PA” em uma **plataforma pessoal de preparação para concursos de Professor de Geografia**, na qual cada novo concurso reaproveita a maior parte do trabalho já realizado.

## Estado
Decisão arquitetural aprovada antes da Fase 6. Deve orientar todas as fases seguintes da V6.
