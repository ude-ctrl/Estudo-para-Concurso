# V6 — Fase 11: Discursivas SEDUC-PA

## Base oficial
Para Professor Classe I, a Prova Discursiva do concurso SEDUC-PA vigente:
- é eliminatória e classificatória;
- totaliza 10 pontos;
- contém 2 situações-problema;
- usa tema atual e inédito;
- versa sobre conteúdo específico da formação;
- contextualiza as situações-problema no ambiente escolar;
- exige 15 a 30 linhas por resposta;
- ocorre no mesmo período da Prova Objetiva, dentro de 5 horas totais;
- não admite consulta;
- exige clareza, precisão, consistência, concisão, leitura, interpretação e escrita em norma culta;
- elimina o candidato com menos de 5 pontos no total ou nota zero em qualquer situação-problema.

## Princípio da V6
A plataforma não terá duas discursivas fixas.

Terá um **banco rotativo de situações-problema**, com histórico de exposição, cobertura temática e política anti-repetição semelhante ao banco objetivo.

## Modos de treino
### 1. Discursiva Guiada
Objetivo: aprender estrutura.

Permite:
- decompor o comando;
- identificar verbos de ação;
- listar conceitos obrigatórios;
- montar esqueleto da resposta;
- escrever versão final;
- receber feedback somente após finalizar.

### 2. Discursiva Cronometrada
- uma situação-problema;
- 15–30 linhas;
- sem consulta;
- cronômetro configurável;
- sem dicas durante a execução.

### 3. Par de Discursivas
- duas situações-problema;
- mesma lógica da prova;
- treino de distribuição de tempo e energia.

### 4. Prova Completa 5h
- 60 objetivas + 2 discursivas;
- cronômetro global de 5 horas;
- correção somente ao final.

## Banco de situações-problema
Cada item discursivo deve possuir:
- `id`
- `concept_ids`
- `module_ids`
- `school_context`
- `command_verbs`
- `difficulty`
- `expected_core_points`
- `common_omissions`
- `model_outline`
- `model_answer`
- `verified_at`
- `source_status`
- `seen_count`
- `last_seen_at`

## Política anti-repetição
Prioridade:
1. situação-problema nunca vista;
2. tema já estudado, mas contexto escolar diferente;
3. questão vista há bastante tempo;
4. repetição recente apenas quando necessária para treino de erro específico.

A plataforma deve evitar apenas trocar nomes e chamar isso de questão nova.

## Estrutura de resposta treinada
A V6 não imporá uma redação engessada, mas ensinará um roteiro operacional:
1. responder diretamente ao problema;
2. mobilizar o conceito geográfico correto;
3. explicar relação causal/processual;
4. aplicar ao contexto escolar/territorial proposto;
5. fechar atendendo integralmente ao comando.

## Rubrica pedagógica de treino
Esta rubrica é da plataforma e **não deve ser apresentada como espelho oficial da FGV** enquanto o espelho específico não estiver disponível.

Dimensões:
- **Conteúdo e precisão conceitual** — conceitos corretos, sem generalizações indevidas;
- **Aderência ao comando** — responde exatamente aos verbos e subitens pedidos;
- **Aplicação ao contexto** — conecta teoria à situação-problema escolar/territorial;
- **Argumentação e relações causais** — explica por que e como, não apenas enumera;
- **Estrutura e concisão** — resposta organizada dentro de 15–30 linhas;
- **Língua portuguesa** — clareza, coesão, precisão vocabular e norma culta.

## Feedback
Após a tentativa, mostrar em camadas:
1. nota estimada de treino;
2. pontos obrigatórios presentes/ausentes;
3. conceitos usados corretamente;
4. imprecisões conceituais;
5. trechos tangenciais;
6. problema de estrutura ou comando;
7. sugestões concretas de reescrita;
8. espelho de tópicos;
9. resposta-modelo somente depois da autoavaliação inicial.

## Regra anti-ilusão
A plataforma não deve premiar texto longo.

Resposta densa, precisa e aderente ao comando vale mais do que preencher 30 linhas com repetição ou divagação.

## Linhas
O editor deve simular 30 linhas visuais e alertar:
- abaixo de 15 linhas: risco de nota zero na regra oficial;
- entre 15 e 30: faixa válida;
- acima de 30: conteúdo excedente deve ser considerado fora da resposta simulada.

## Treino manuscrito
Como a prova real é manuscrita, a V6 terá também modo de treino offline/manual:
- exibir o enunciado;
- iniciar cronômetro;
- permitir imprimir/usar folha pautada equivalente;
- registrar depois tempo, autoavaliação e foto/transcrição opcional se implementado no futuro.

O treino digital não deve criar falsa segurança sobre velocidade de escrita manual.

## Histórico de evolução
Registrar por tentativa:
- tema;
- conceito;
- tempo;
- número de linhas;
- nota estimada;
- falhas de comando;
- falhas conceituais;
- reincidências;
- evolução por dimensão da rubrica.

## Integração com caderno de erros
Erros discursivos também alimentam o sistema global.

Exemplos:
- conceito ausente;
- causalidade incompleta;
- confusão entre conceitos;
- resposta tangencial;
- aplicação pedagógica fraca;
- excesso de generalidade.

## Critério de aceite
A Fase 11 estará pronta para implementação quando o piloto conseguir:
- gerar pares diferentes de situações-problema;
- respeitar 15–30 linhas;
- funcionar isoladamente e dentro da prova de 5h;
- não mostrar resposta antes da tentativa;
- corrigir por rubrica transparente;
- registrar histórico;
- alimentar o caderno de erros;
- diferenciar claramente rubrica de treino de espelho oficial.
