# V6 — Fase 14: Feedback de uso real do piloto

Data: 15/10/2026
Branch: `v6-piloto-cartografia`

## Retorno posterior à implementação sensorial

Em 16/10/2026 (America/Sao_Paulo), o usuário informou:

> Continua a mesma coisa e sinceramente ? se não implciar em nada, vamos em frente e dar continuidade

A [consolidação técnica](V6_FASE14_PADRAO_TECNICO.md) registra a autorização para continuidade documental e mantém a diferença visual ainda não percebida como ressalva. Não se conhece o endereço ou a versão aberta nesse retorno. O aceite anterior não foi retirado, mas não é estendido aos efeitos novos; não foi comunicado um novo resultado funcional. Não houve nova alteração de interface, conteúdo, publicação ou início da Issue #13 nesta rodada.

## Atualização após a segunda rodada

O usuário aprovou a mudança visual e informou **“Testei, tudo ok.”** após testar a versão `67c38a7`. O [registro de aceite e próximos passos](V6_FASE14_ACEITE_USO_E_PROXIMOS_PASSOS.md) distingue esse aceite de uso da [reconferência técnica P1/P3 recebida](V6_FASE14_RECONFERENCIA_P1_P3.md), da revisão editorial ainda pendente e de autorização de publicação. A rejeição descrita abaixo corresponde à primeira entrega e permanece preservada no histórico.

## Status da avaliação inicial

**PILOTO NÃO APROVADO PELO USUÁRIO.**

A avaliação prática apontou que a experiência ainda parece "mais do mesmo" em relação à plataforma histórica. Isso invalida a hipótese de que apenas reorganizar o legado dentro de um shell novo seria suficiente para caracterizar a V6.

## Falha P0 — duas versões de Cartografia II continuam expostas no acervo

Existem simultaneamente:
- `SEDUC_PA_Tema_03_Cartografia_II_MATRIZ_OFICIAL_V2_6.html`
- `SEDUC_PA_Tema_03_Cartografia_II_MATRIZ_OFICIAL_V2_6_AUDITADA.html`

Preservar ambas no repositório como fonte histórica é correto. Porém, para o estudante, apenas a versão canônica deve existir como conteúdo ativo. A versão não auditada precisa ser tratada como **arquivo histórico/legado**, fora de qualquer catálogo, busca, navegação, recomendação ou contagem de módulos/unidades.

Regra nova:
- histórico pode existir no repositório;
- histórico NÃO pode competir com conteúdo canônico na interface do aluno;
- `legacy_source` serve para auditoria, não para navegação principal;
- somente a fonte canônica aprovada participa da experiência ativa.

## Falha P0 — embalagem antiga foi preservada demais

O banco V6 ainda carrega rótulos e frases históricas como:
- `Como a FGV cobra Cartografia I`;
- `Ponte para Cartografia II`;
- referências visíveis a `Tema XX` dentro do percurso.

Isso viola a intenção arquitetural da V6: preservar conteúdo e profundidade sem preservar necessariamente a antiga estrutura editorial.

Regra nova de migração:

> **Preservar informação não significa preservar embalagem.**

Na camada canônica V6:
- títulos, subtítulos, hooks e transições podem e devem ser reeditados para a nova arquitetura;
- a redação histórica integral permanece no arquivo/paridade para auditoria;
- a experiência do aluno deve falar apenas a linguagem de Módulo → Unidade → Missão;
- `Cartografia I`, `Cartografia II` e `Tema 17` não devem aparecer como identidade estrutural do conteúdo novo.

## Diagnóstico UX

O piloto cumpriu preservação técnica, rastreabilidade e engenharia, mas não demonstrou transformação suficiente da experiência de estudo.

A V6 precisa ser perceptivelmente melhor em três dimensões:

1. **Clareza estrutural**
   - uma única versão ativa de cada unidade;
   - nenhum legado concorrendo visualmente;
   - linguagem canônica consistente;
   - próxima ação evidente.

2. **Experiência de aprendizagem**
   - conteúdo reorganizado por raciocínio, não por origem de arquivo;
   - teoria entregue em blocos coerentes e progressivos;
   - treino integrado naturalmente após conceitos-chave;
   - revisão e erros percebidos como parte do percurso, não como telas adicionais soltas.

3. **Identidade V6**
   - não parecer um portal antigo encapsulado;
   - não depender de nomes e divisões históricas;
   - reduzir sensação de catálogo de páginas;
   - o aluno deve perceber um percurso único de aprendizagem.

## Consequência para a Fase 14

Além dos bloqueadores técnicos já registrados na auditoria independente, o piloto agora possui um **bloqueador de aceitação humana/UX**.

Portanto:
- NÃO fazer merge;
- NÃO escalar;
- NÃO considerar apenas B1/B2/C1 suficientes;
- revisar a estratégia de exposição do legado;
- remover versões antigas do catálogo/UX ativa;
- reescrever títulos/transições históricas na camada canônica;
- revisar a primeira dobra, navegação e fluxo para que a experiência seja claramente diferente da plataforma anterior;
- preservar tudo no arquivo de paridade, sem perda de conteúdo.

## Critério novo de aceite

O piloto só poderá ser aprovado quando:
1. houver uma única Cartografia II canônica na experiência ativa;
2. arquivos legados duplicados não aparecerem ao aluno como opções de estudo;
3. títulos/transições internas usarem a arquitetura V6, não a nomenclatura histórica;
4. o usuário perceber diferença clara de organização, fluxo e orientação em relação à plataforma anterior;
5. paridade pedagógica continuar preservada;
6. os bloqueadores técnicos da auditoria independente também estiverem corrigidos.
