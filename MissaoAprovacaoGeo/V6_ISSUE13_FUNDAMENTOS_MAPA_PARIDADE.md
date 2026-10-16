# Fundamentos da Geografia — mapa anterior à consolidação

Data: 16/10/2026, America/Sao_Paulo. Branch: `v6-base-fundamentos-geografia`.
Unidade: `fundamentos-geografia`, módulo `fundamentos`.

O usuário autorizou a continuidade após a publicação de Cartografia: “Ótimo, vamos continuar”. A auditoria editorial permanece delegada ao Codex, conforme a finalidade já expressa pelo usuário. Este lote executa a próxima unidade da ordem conceitual oficial; não publica outro módulo nem altera a Cartografia aprovada. Não atribui ao estudante revisão manual inexistente.

## Fonte e preservação

Fonte única: `SEDUC_PA_Tema_01_Conceitos_e_Autores.html`, no commit `3aa0509193a11d7d6f09ba916d125cc76afe5b79`.
SHA-256: `06bc7c51d80146f6b2f82a0c247d0d7babe56462dc33543ff025353ead69e683`.

A extração inicial aceita literais JavaScript por AST, sem executar o aplicativo histórico. O arquivo original permanece intacto. Depois da consolidação, a fonte reutilizável será o pacote versionado, com originais e diferenças editoriais na procedência. Não se copiará a interface histórica para dentro da teoria.

| Origem  | Destino da missão                    | Informação exclusiva preservada                                                   |
| ------- | ------------------------------------ | --------------------------------------------------------------------------------- |
| `B[0]`  | `fundamentos-leitura-de-questoes`    | Estratégias de leitura e tabela autor–conceito                                    |
| `B[1]`  | `fundamentos-campo-conhecimento`     | Humboldt, Ritter, Hettner, Hartshorne e crítica às caricaturas históricas         |
| `B[2]`  | `fundamentos-correntes`              | Escolas, gêneros de vida, poder, tabela comparativa e exemplo amazônico           |
| `B[3]`  | `fundamentos-espaco`                 | Objetos/ações, rugosidades, fixos/fluxos, exemplo ferroviário e recall            |
| `B[4]`  | `fundamentos-paisagem-lugar`         | Temporalidades, Sauer, Tuan, Frémont, Augé e leitura escolar                      |
| `B[5]`  | `fundamentos-regiao-territorio`      | Regionalização, Geiger, Raffestin, Haesbaert e multiterritorialidade              |
| `B[6]`  | `fundamentos-redes`                  | Nós, conexões, fluxos, Corrêa, Castells, seletividade e recall                    |
| `B[7]`  | `fundamentos-producao-escalas`       | Lefebvre, Harvey, Massey, Castro, meios de Santos e recall                        |
| `B[8]`  | `fundamentos-decolonialidade`        | Quijano, Said, Escobar, saberes, legislação e notas históricas                    |
| `B[9]`  | `fundamentos-leitura-realidade`      | Roteiro de interpretação, princípios da BNCC e situação cotidiana                 |
| `B[10]` | `fundamentos-autores-complementares` | Forma/função/estrutura/processo, ajuste espacial, agentes urbanos, Smith e recall |

## Inventário conferido

| Recurso                           | Quantidade original | Tratamento                                                                                         |
| --------------------------------- | ------------------: | -------------------------------------------------------------------------------------------------- |
| Etapas e blocos teóricos          |                  11 | Preservar e corrigir apenas com antes/depois explícito                                             |
| Diagnóstico                       |          3 questões | Mesmos itens no pós-teste: não contar como três questões novas                                     |
| Questões nas etapas               |                  24 | Identidade e gabarito rastreáveis por `b_i_j`                                                      |
| Chefão                            |          5 questões | Identidade `c_i`; `c_4` possui quatro alternativas, apesar do anúncio A–E                          |
| Questões únicas                   |                  32 | Todas autorais/didáticas; não há identificação verificável de questão oficial                      |
| Comentários por alternativa (`X`) |        29 conjuntos | Faltam os 12 comentários das três questões de `B[10]`                                              |
| Flashcards                        |                  44 | Preservar o conhecimento, qualificando respostas e separando perguntas compostas quando necessário |
| Game V/F                          |                 100 | 68 verdadeiros / 32 falsos; justificativas existentes, com generalizações a corrigir               |
| Recalls                           |                   4 | `B[3]`, `B[6]`, `B[7]`, `B[10]`; preservar resposta-chave                                          |
| Discursivas                       |                   2 | Comandos, modelo e rubricas em `discBox`; material didático, sem espelho oficial atribuído à FGV   |
| Microprática docente              |                   1 | `teacherBox`; três minutos são sugestão de exercício, não tempo oficial da prova                   |
| Tabelas                           |                   3 | Duas na teoria, uma em `matrixBox`                                                                 |
| Imagens, mapas e SVG pedagógicos  |                   0 | Não inventar acervo visual inexistente; ícones e percurso são interface                            |

Não há duplicatas textuais normalizadas entre as 32 questões, 44 frentes de cartões ou 100 enunciados V/F. Há redundância semântica, especialmente território/rede, escala e associações autor–conceito. Questões próximas devem formar famílias sem novidade independente. A distribuição original dos gabaritos é A=9, B=18, C=5, D=0, E=0; não deve orientar a posição exibida na interface V6.

## JavaScript e armazenamento

- Chaves: `t1i_v21`, com fallback para `t1i_v2`.
- Respostas `a.b_i_j` / `a.c_i`, diagnóstico `pre`, pós-teste `post`, etapa `u`, etapas concluídas `dn` e aba `tab`.
- Cartões `fc[i]`: apenas `ok` ou `rev`, sem agenda individual comprovada de quatro avaliações.
- Game `g`: placares, contadores e `miss[i]`; V/F por swipe/teclado e ABCD montado com itens de polaridade oposta.
- XP calculado das respostas, sequência `st`, bônus `bx`; refazer questões pode repetir bônus no mecanismo antigo. Não importar isso como evidência nova de aprendizagem.
- Revisão `fd`: sugestões de dias a partir de data inicial e erros agregados; não equivale à revisão espaçada individual da V6.
- Caderno local reúne questões erradas e até dez itens V/F. Um acerto no Game remove imediatamente o erro antigo; isso não comprova retenção posterior.
- `rfim` chama acerto imediato de “domínio” e repete diagnóstico no pós-teste. Na futura migração, manter o histórico sem converter esses sinais em domínio ou novidade.
- As respostas discursivas usam `textarea` e contador, sem persistência no mecanismo inspecionado. Não anunciar recuperação de textos que não foram salvos.
- Redução de movimento condiciona os efeitos de confete; a futura integração deve seguir o motor V6 já testado, inclusive gestos, teclado, som, anti-farming e separação Prova/estudo.

Dependências externas localizadas: Google Fonts e página oficial FGV. Não há biblioteca externa de execução. Não há IDs estáticos duplicados. A migração de progresso será implementada e testada quando houver integração da unidade; este mapa registra o contrato e não declara um migrador inexistente.

## Riscos editoriais identificados na leitura

1. A enumeração de Corrêa em `B[10]` e `C[34]` omite proprietários dos meios de produção. A questão correspondente continua com resposta válida, mas o ensino da lista precisa ser completado.
2. `B[4]` e seus comentários tratam não-lugar como atributo intrínseco de aeroportos. É necessário explicitar relação, uso e experiência, sem trocar o gabarito silenciosamente.
3. A nuance historiográfica Ratzel/Vidal presente na teoria se perde em alguns cartões/comentários categóricos.
4. Há confusão entre rede e território-rede em `B[5].qs[2]` e `CH[3]`, apesar da distinção correta de `B[6]`.
5. Certos V/F reduzem distância a desaparecimento físico, uniformizam povos tradicionais ou limitam o capital ao local. Enunciado e justificativa precisam ser avaliados juntos.
6. Há forte concentração em reconhecimento, distratores absolutos e repetição. “Chefão” não comprova dificuldade de concurso nem FGV Elite.
7. Quantitativa, natureza/sociedade, produção das escalas e leitura de evidências precisam de maior aprofundamento e aplicação. A presença do título não basta para atestar cobertura.
8. Distâncias ferroviárias, leis e formato do concurso precisam de fonte, referência e alcance da verificação explícitos. Datas históricas não devem ser atualizadas para o presente.

As decisões e alterações efetivamente aplicadas serão registradas no pacote e no relatório de auditoria. A aprovação canônica dependerá dos critérios de conteúdo, e não apenas da preservação ou do sucesso de testes.
