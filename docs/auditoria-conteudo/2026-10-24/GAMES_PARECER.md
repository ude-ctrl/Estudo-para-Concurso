# Parecer dirigido sobre feedbacks dos jogos V/F

Data: 24/10/2026. Base: commit a40a3c33c7a5b7f20750316fe694331c1a214b61. Nenhum arquivo do conteúdo ou do aplicativo foi alterado.

Foram lidos semanticamente os 117 candidatos selecionados em `checks.json`, com conferência das categorias e dos cartões correspondentes nos bancos publicados. O CSV traz a afirmação, o gabarito armazenado, a justificativa atual, a classificação do problema e uma proposta explicativa para cada registro.

**Resultado:** os 117 registros precisam de revisão de feedback. Isso **não significa 117 gabaritos invertidos**. Em muitos casos, a resposta curta pertence à pergunta do flashcard associado e foi reaproveitada em uma afirmação diferente. Há também negações ambíguas e enunciados que precisam de contexto.

## Contagens

- feedback_ambiguo_sem_explicacao: **10**.
- feedback_contraditorio: **103**.
- feedback_inadequado_com_contexto_a_reformular: **4**.

Total: **117** registros em **13** materiais. O filtro não cobre todos os problemas do banco de 2.600 afirmações: feedbacks longos deslocados ou respostas como “É o objetivo oposto” ficam fora desta seleção. Os demais achados da leitura integral permanecem válidos.

## Por material

| Material | Casos |
|---|---:|
| lesson-445e32dc5a8d | 17 |
| lesson-6de5f5c9ab86 | 1 |
| lesson-17ac614f6079 | 8 |
| lesson-6cf2740c2663 | 4 |
| lesson-ff44e525ee7e | 9 |
| lesson-7d8a7f83d637 | 18 |
| lesson-ffcb6167eb3e | 7 |
| lesson-73811adb3a6b | 8 |
| lesson-5c4795a5ce6d | 8 |
| lesson-88e4a3826cb5 | 9 |
| lesson-ef2039a82c7f | 11 |
| lesson-7ba8b576bbf8 | 6 |
| lesson-84d2660bc7cc | 11 |

## Casos adicionais com perda de contexto

Os cinco casos abaixo **não estão incluídos no total de 117**. O jogo embaralha os itens; o cartão anterior não pode ser pressuposto. A categoria exibida não fornece os dados necessários.

| Material / item | Problema | Proposta para uma revisão posterior |
|---|---|---|
| Lógica `G_70` | “A sequência soma 3 a cada termo” não apresenta a sequência. O feedback “14” não explica a regra. | Incluir “Na sequência 2, 5, 8, 11, as diferenças entre termos consecutivos são 3”. Explicar as três diferenças. |
| Lógica `G_71` | “O próximo termo obrigatório é 13” não informa termos nem regra. Uma lista finita, sozinha, não determina um próximo termo obrigatório. | Incluir sequência e regra: “Seguindo uma progressão aritmética de razão 3 em 2, 5, 8, 11, o próximo termo é 13” (F); justificar 11+3=14. |
| Lógica `G_73` | “A sequência cresce por soma constante de 2” não informa a sequência; “16 depois 32” também não fornece a explicação. | Incluir “1, 2, 4, 8” e explicar que as diferenças 1, 2, 4 não são constantes; a regra didática de duplicação produz 16 e 32. |
| Lógica `G_78` | “Relação de ordem transitiva permite A<C” omite as premissas. Transitividade não prova A<C sem condições. | Incluir “Se A<B e B<C, a transitividade implica A<C”. Explicar a cadeia A<B<C. Escapar os sinais no HTML; não alterar o gabarito sem garantir a exibição integral. |
| Português `G_7` | “Pressupõe que nunca estudou” omite a frase analisada. “Pressuposto” no rótulo não a recompõe. | Incluir “A frase ‘João voltou a estudar’ pressupõe que ele nunca estudou” (F); explicar que voltar a realizar a ação pressupõe sua ocorrência anterior. |

Além desses cinco, o CSV sinaliza `G_45` de BNCC/Didática e `G_83` de Português: o sujeito da afirmação também precisa ser expresso. `G_33` de Pará usa “Região Geográfica nacional” sem definir categoria oficial; `G_78` de Economia do Pará depende da data e do trecho da hidrovia.

## Negação não é justificativa

Em afirmações negativas verdadeiras, um “Não” solto pode parecer concordar com a ausência expressa ou negar a frase inteira. Por isso, esses casos foram classificados como ambiguidade, sem presumir que o autor desejava inverter o gabarito. O aluno precisa receber uma explicação afirmativa da relação conceitual e, quando pertinente, um contraexemplo.

Exemplo reproduzido pelo responsável pela auditoria no navegador: Lógica `G_12` exibe “A afirmação era VERDADEIRA. Não.” após o acerto. A explicação proposta mostra o cálculo 100×1,10×0,90=99, preservando o gabarito V.

## Limites das propostas

As sugestões são propostas editoriais; não foram incorporadas ao banco. Elas não constituem nova validação independente de todas as leis ou de todos os fatos temporais mencionados. O item sobre moeda do BRICS deve carregar fonte/data; a situação da hidrovia precisa ser reconstruída por trecho e momento. Nos recortes regionais, vincular a norma/versão utilizada. As propostas procuram corrigir a explicação sem ampliar silenciosamente a afirmação original.

A prioridade é corrigir a relação enunciado → julgamento → explicação e garantir autonomia do item sorteado. Trocar apenas “Sim” por “Não”, ou vice-versa, manteria a insuficiência pedagógica.
