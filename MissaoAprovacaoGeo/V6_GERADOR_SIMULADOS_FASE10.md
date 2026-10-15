# V6 — Fase 10: Gerador de Simulados SEDUC-PA

## Correção conceitual
A plataforma não terá um simulado fixo de 60 questões.

O número 60 representa o tamanho de cada prova gerada conforme o edital. O sistema funcionará como um **motor de montagem de simulados** alimentado por um banco amplo e expansível.

## Princípio central
**Banco grande + blueprint de prova + histórico do aluno + política anti-repetição.**

Cada nova tentativa deverá ser diferente sempre que houver estoque suficiente.

## Blueprint oficial por tentativa
Cada simulado objetivo oficial terá:
- 10 Língua Portuguesa;
- 5 Raciocínio Lógico;
- 5 Atualidades;
- 10 Conhecimentos Pedagógicos;
- 30 Conhecimentos Específicos de Geografia.

Total: 60 questões.

Para questões autorais do perfil SEDUC-PA:
- alternativas A–E;
- uma correta;
- sem feedback durante a execução;
- correção somente ao final.

## Prova completa integrada
O edital vigente estabelece **5 horas para a realização conjunta da Prova Objetiva e da Prova Discursiva** para Professor Classe I.

Por isso, a V6 terá dois níveis de simulação:

### Simulado Objetivo
- 60 questões;
- cronômetro próprio;
- adequado para treinos frequentes.

### Prova Completa SEDUC-PA
- 60 questões objetivas;
- 2 situações-problema discursivas;
- cronômetro global de 5 horas;
- sem feedback durante a execução;
- possibilidade de o aluno escolher a ordem de resolução, como estratégia de prova;
- correção somente ao final.

A plataforma deve registrar quanto tempo foi gasto em objetiva, discursivas e revisão final, sem obrigar uma divisão artificial do tempo.

## O banco não terá limite conceitual de 60 itens
O banco deverá crescer continuamente.

A arquitetura deve aceitar centenas ou milhares de questões sem precisar alterar o motor do simulado.

O objetivo não é definir agora um número artificial como “1000 questões obrigatórias”. A prioridade é possuir estoque suficiente, equilibrado e de alta qualidade para permitir muitas provas com baixa repetição.

## Pools separados
O banco será dividido logicamente em:
1. Fixação
2. Concurso
3. FGV Elite
4. Questões Reais

O Simulado Oficial usa prioritariamente Concurso + FGV Elite e, quando juridicamente/pedagogicamente adequado, questões reais em área separada ou modo específico.

Questões de Fixação não devem inflar artificialmente o estoque de prova.

## Histórico de exposição
Cada item terá, por usuário:
- `seen_count`
- `last_seen_at`
- `last_result`
- `correct_count`
- `wrong_count`
- `recent_exposure_score`

O gerador usa esses dados para evitar repetição excessiva.

## Política anti-repetição
Prioridade padrão:
1. questão nunca vista;
2. questão vista há muito tempo;
3. questão vista recentemente apenas se necessária para cumprir blueprint/cobertura;
4. não repetir a mesma questão em simulados consecutivos, salvo ausência de estoque.

Se o banco não tiver quantidade suficiente para gerar uma prova significativamente nova, a interface deve informar isso de forma transparente.

Exemplo:
> 84% desta prova será inédita para você. O banco de Raciocínio Lógico está com baixo estoque de questões novas.

Nunca fingir variedade.

## Índice de novidade
Antes de iniciar um simulado, o sistema poderá mostrar:
- percentual de itens inéditos;
- percentual vistos há muito tempo;
- percentual de repetição recente inevitável.

O índice serve para transparência, não para criar pontuação de desempenho.

## Modos de simulado
### 1. Oficial
Replica a distribuição do edital.

### 2. Inédito
Maximiza questões nunca vistas, preservando a distribuição oficial.

### 3. Adaptativo
Mantém a estrutura geral, mas aumenta moderadamente a presença de conceitos fracos.

Não pode transformar o simulado em mera lista de erros.

### 4. Revisão de Erros
Não simula a prova oficial. É um treino dirigido por erros e misconceptions.

### 5. Por Módulo
Permite treino intensivo de Cartografia, Física, Humana etc.

Não deve ser rotulado como simulado oficial.

### 6. Prova Nova
Gera uma nova versão completa evitando itens usados nas últimas tentativas.

### 7. Prova Completa 5h
Integra objetiva + duas discursivas sob um único cronômetro, reproduzindo a carga temporal oficial.

## Blueprint interno de Geografia
As 30 questões específicas não serão sorteadas aleatoriamente de um saco único.

O motor deve equilibrar os grandes eixos do edital e variar a composição entre provas, considerando:
- Fundamentos;
- Cartografia;
- Geografia Física;
- Geografia Humana/Econômica;
- Geopolítica;
- Brasil;
- Amazônia/Pará;
- Ensino de Geografia quando aplicável ao bloco específico conforme edital.

A distribuição exata pode variar entre simulados para evitar previsibilidade, mas nenhum grande eixo pode desaparecer repetidamente.

## Cobertura acumulada
Além da cobertura de uma prova isolada, o sistema deve avaliar a cobertura das últimas tentativas.

Objetivo:
- evitar que um eixo importante fique ausente por várias provas consecutivas;
- aumentar a diversidade temática ao longo do tempo;
- não transformar cada prova em uma divisão rígida e previsível.

## Dificuldade
Cada simulado deve misturar dificuldade.

Perfil inicial recomendado para testes do motor:
- D1: 10–15%
- D2: 35–40%
- D3: 35–40%
- D4: 10–15%

A distribuição deverá ser calibrada empiricamente após uso real e não tratada como regra psicométrica definitiva.

## Nível cognitivo
Evitar simulados dominados por reconhecimento literal.

O motor deve garantir presença de:
- compreensão;
- aplicação;
- análise;
- integração entre conteúdos.

## Gabarito
Nas questões autorais A–E:
- distribuição aproximadamente equilibrada;
- sem sequência previsível;
- sem ajuste artificial que prejudique a qualidade do item.

O balanceamento deve ocorrer na montagem da prova, não reescrevendo uma questão correta apenas para mudar sua letra.

## Atualidades
Questões de Atualidades precisam possuir:
- fonte;
- data de verificação;
- validade temporal;
- possibilidade de arquivamento quando envelhecerem.

Itens expirados não entram em novos simulados oficiais.

## Resultado do simulado
Ao terminar, mostrar:
- nota geral;
- acertos por bloco;
- acertos por módulo/conceito;
- dificuldade dos erros;
- tempo total e por questão;
- questões em branco;
- padrões de erro;
- comparação com tentativas anteriores;
- conceitos que precisam de revisão;
- índice de novidade efetivo da prova.

Depois da correção, os erros alimentam:
- Caderno Global de Erros;
- fila de revisão;
- flashcards relacionados;
- métrica de domínio.

## Prontidão para prova
Simulado não deve ser confundido com domínio conceitual.

A plataforma poderá manter uma métrica separada de **Prontidão para a Prova**, baseada em desempenho recente em simulados completos, estabilidade entre tentativas, tempo e cobertura.

## Reuso entre concursos
O motor é genérico.

Cada concurso fornece um `exam_profile` com:
- quantidade total;
- distribuição por disciplina;
- banca;
- número de alternativas;
- regras de prova;
- duração;
- presença e formato de discursiva;
- pesos, se houver;
- conteúdos prioritários.

Assim, o mesmo motor poderá gerar futuramente:
- SEDUC-PA;
- SEDUC-MA;
- Prefeitura de Imperatriz-MA;
- outros concursos.

## Critério de qualidade do banco
Não perseguir volume vazio.

É melhor ter 800 questões fortes, bem distribuídas e classificadas do que 3.000 itens rasos, repetitivos ou com distratores absurdos.

O estoque deve crescer por necessidade de cobertura e variedade, não por meta ornamental.

## Critério de aceite do gerador
O piloto deve demonstrar que:
- gera provas diferentes;
- mantém o blueprint;
- controla repetição;
- respeita distribuição temática;
- respeita dificuldade;
- preserva questões reais;
- não usa itens vencidos de Atualidades;
- registra exposição;
- integra resultados ao sistema de erros/domínio;
- informa quando o estoque inédito estiver baixo;
- consegue executar prova completa de 5 horas com objetiva + discursivas sob cronômetro único.
