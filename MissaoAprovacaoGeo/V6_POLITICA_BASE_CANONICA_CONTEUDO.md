# V6 — Política Permanente de Base Canônica de Conteúdo

Data de instituição: 15/10/2026
Status: regra oficial de governança editorial da V6
Escopo: Geografia, Pedagogia e futuros conteúdos da plataforma

## 1. Princípio central

Toda unidade que passar por Auditoria Premium de conteúdo, qualidade de ensino, cobertura de edital, precisão conceitual, nível de confiança e adequação pedagógica deve gerar uma **Base Canônica aprovada**.

Depois de aprovada, essa Base Canônica passa a ser a **fonte oficial de conteúdo da V6** para aquela unidade.

Os HTMLs históricos continuam preservados para rastreabilidade e auditoria, mas deixam de ser a fonte operacional consultada rotineiramente pela plataforma, pelo Codex e pelas futuras migrações.

> Auditar uma vez. Consolidar uma vez. Fixar uma vez. Reutilizar muitas vezes.

## 2. Objetivo

Reduzir retrabalho, ambiguidade, duplicidade e risco de regressão editorial.

A política existe para evitar o ciclo:

HTML legado → interpretação nova → consolidação nova → implementação → redescoberta de inconsistências.

O fluxo oficial passa a ser:

HTMLs / fontes / edital → Auditoria Premium → Base Canônica aprovada → implementação V6.

## 3. O que é Base Canônica

É o conjunto consolidado e versionado de conteúdo que representa a melhor versão aprovada daquela unidade.

Uma Base Canônica pode conter:
- teoria consolidada;
- definições e conceitos nucleares;
- explicações causais;
- exemplos territoriais/cotidianos/escolares;
- contrastes e pegadinhas;
- recalls;
- flashcards aprovados;
- itens de treino aprovados;
- referências e fontes;
- marcações de dado temporal;
- metadados de confiança e auditoria;
- rastreabilidade para `legacy_source` / `legacy_id` quando aplicável.

Ela NÃO precisa reproduzir a estrutura editorial antiga.

Preservar informação não significa preservar embalagem.

## 4. Regra de promoção para canônico

Nenhum conteúdo vira canônico apenas porque:
- já existia no HTML;
- foi importado pelo Codex;
- passou em teste técnico;
- foi escrito por IA;
- está visualmente bem apresentado.

A promoção exige Auditoria Premium com avaliação mínima de:

1. correção conceitual;
2. cobertura do edital/perfil de estudo relevante;
3. profundidade suficiente para concurso;
4. clareza didática;
5. qualidade de exemplos;
6. ausência de redundância editorial desnecessária;
7. consistência terminológica;
8. identificação de lacunas;
9. identificação de dados temporais;
10. adequação ao nível de cobrança esperado;
11. confiabilidade das fontes quando necessárias;
12. qualidade de treino quando este fizer parte da unidade.

## 5. Status possíveis

Cada unidade auditada deve terminar com um status explícito:

- `RASCUNHO`
- `EM_AUDITORIA`
- `APROVADA_COM_RESSALVAS`
- `APROVADA_CANONICA`
- `REABRIR_POR_ATUALIZACAO`
- `SUBSTITUIDA`

Somente `APROVADA_CANONICA` pode ser tratada como fonte oficial da V6.

## 6. Versionamento

Toda Base Canônica aprovada deve possuir versão editorial.

Exemplo:

`cartografia-fundamentos@1.0.0`

Mudanças devem ser classificadas:
- patch: correção pequena sem alteração de escopo;
- minor: ampliação/aperfeiçoamento sem ruptura estrutural;
- major: reestruturação relevante, mudança de escopo ou substituição de base.

A versão anterior permanece rastreável.

## 7. Conteúdo permanente × conteúdo temporal

### Permanente
Exemplos:
- latitude/longitude;
- projeções;
- conceitos de território;
- teorias clássicas;
- processos geomorfológicos;
- princípios de avaliação.

Quando aprovado, pode permanecer estável até nova evidência editorial relevante.

### Temporal
Exemplos:
- população;
- PIB;
- exportações;
- legislação vigente;
- políticas públicas;
- dados de desmatamento;
- atualidades.

Deve conter, quando aplicável:
- `source`;
- `reference_date` ou `reference_year`;
- `verified_at`;
- critério de expiração/revisão.

Conteúdo temporal aprovado continua canônico, mas pode receber status `REABRIR_POR_ATUALIZACAO` sem invalidar toda a unidade.

## 8. Papel dos HTMLs históricos

Depois da aprovação canônica:
- permanecem preservados;
- permanecem citáveis para auditoria;
- podem ser usados para reconstrução de procedência;
- NÃO devem ser usados como fonte editorial primária em novas implementações;
- NÃO devem aparecer como opções concorrentes para o aluno;
- NÃO devem ser consultados repetidamente pelo Codex quando a Base Canônica já responde à necessidade.

## 9. Papel do Codex

O Codex deve tratar a Base Canônica como contrato editorial.

Depois que uma unidade estiver `APROVADA_CANONICA`, o Codex:
- implementa;
- transforma em componentes;
- organiza UX;
- cria testes;
- integra persistência;
- integra treino/revisão;
- preserva metadados.

O Codex NÃO deve reinterpretar ou reescrever silenciosamente conteúdo canônico para simplificar programação.

Qualquer alteração editorial relevante deve voltar para auditoria humana/conteudística.

## 10. Paridade e rastreabilidade

Na primeira consolidação de cada unidade:
- todo conteúdo histórico relevante deve receber destino;
- exclusões devem ser justificadas;
- redundâncias devem ser registradas;
- conteúdo exclusivo deve ser preservado ou conscientemente descartado com motivo;
- `legacy_source` e `legacy_id` devem ser mantidos onde fizer sentido.

Depois da aprovação canônica, a paridade histórica permanece como evidência, não como dependência operacional diária.

## 11. Estrutura sugerida da base

Exemplo conceitual:

```text
/base-conhecimento/
  cartografia/
    fundamentos/
      content.json
      audit.md
      provenance.json
      changelog.md
    representacao/
    geotecnologias/
```

O formato final pode evoluir, mas deve separar:
- conteúdo canônico;
- auditoria;
- procedência;
- histórico de mudanças.

## 12. Regra para novas disciplinas

Conteúdos novos, como Pedagogia, devem nascer diretamente nesta política.

Não criar primeiro HTML legado para depois migrar.

Fluxo ideal:

Matriz → conteúdo → Auditoria Premium → Base Canônica → V6.

## 13. Relação com a Gamificação Sensorial

A política de Base Canônica e a proposta `V6_FASE14_GAMIFICACAO_SENSORIAL_PROPOSTA.md` são complementares:

- Base Canônica = confiança, estabilidade e qualidade do que se estuda;
- Gamificação Sensorial = motivação, continuidade e prazer em executar o estudo.

Uma não deve esconder falhas da outra.

Conteúdo fraco não pode ser mascarado por efeitos.
Conteúdo forte não precisa permanecer numa experiência fria.

## 14. Ordem de execução recomendada

1. concluir a auditoria atual do piloto de Cartografia;
2. testar/aprovar a camada de Gamificação Sensorial;
3. fechar o padrão técnico do piloto;
4. iniciar Auditoria Mestra de Conteúdo das 28 unidades;
5. promover unidade por unidade para `APROVADA_CANONICA`;
6. armazenar a Base Canônica;
7. migrar a V6 a partir dessa base, não dos HTMLs;
8. manter HTMLs apenas como legado auditável.

## 15. Critério de aceite de uma unidade canônica

Uma unidade só pode ser marcada `APROVADA_CANONICA` quando houver evidência de que:
- cobre o escopo esperado;
- possui profundidade suficiente;
- não contém erro conceitual conhecido;
- não possui redundância estrutural relevante;
- dados temporais estão identificados;
- fontes necessárias estão registradas;
- nível de confiança foi explicitamente avaliado;
- conteúdo é adequado para estudo autônomo;
- treino associado é coerente com o conteúdo;
- auditoria Premium foi concluída.

## 16. Decisão de governança

A partir desta política, todo conteúdo aprovado em Auditoria Premium deve ser **fixado numa Base Canônica versionada**.

A plataforma não deve depender indefinidamente dos HTMLs históricos.

A auditoria deixa de ser apenas um relatório: ela passa a produzir a fonte oficial reutilizável do conhecimento aprovado.
