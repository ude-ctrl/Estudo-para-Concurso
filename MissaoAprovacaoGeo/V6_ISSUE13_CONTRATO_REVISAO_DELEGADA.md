# V6 — revisão editorial delegada e primeira integração de Cartografia

Data: 16/10/2026. Branch: `v6-base-canonica`.
Contrato: `delegated-content-review-v1`. Escopo exclusivo: as três unidades de Cartografia.

## Autorização e responsabilidade

O usuário definiu a finalidade e delegou a revisão ao assistente:

> Olha, eu só quero um site que me ajude estudar para ao concurso. Uma plataforma, auditada e revisada por você. Porque é tão difícil?

Depois da conferência integral, autorizou a continuidade: “Ok, vamos em frente”. Após a entrega das correções `0.1.2` e a indicação de que a próxima etapa seria integrá-las à plataforma, respondeu “Ok”. Essa sequência autoriza esta integração na branch de trabalho, sem exigir que o estudante revise manualmente as questões no GitHub. Não autoriza merge, publicação ou migração de outros módulos.

O responsável pela auditoria editorial e pelas decisões é **Codex, assistente de IA**. Não se atribui ao usuário a leitura de cada item, nem se inventa uma aprovação de especialista humano. O aceite de uso do piloto e a ressalva sensorial anteriores continuam com seu alcance original.

## Relação com a política oficial

A [política canônica](https://github.com/ude-ctrl/Estudo-para-Concurso/blob/v6-planejamento/MissaoAprovacaoGeo/V6_POLITICA_BASE_CANONICA_CONTEUDO.md) exige auditoria Premium de conteúdo nos 12 critérios. Testes técnicos ou autoria por IA, isoladamente, não aprovam conteúdo. O contrato anterior acrescentava campos exclusivamente humanos; a revisão delegada passa a ser representada de forma explícita, como alternativa à atestação humana, sem dispensar os critérios editoriais, fontes, temporalidade, procedência ou vínculo com a versão.

A [leitura integral](V6_ISSUE13_REVISAO_DELEGADA_CARTOGRAFIA.md), as [correções auditadas `0.1.2`](V6_ISSUE13_CORRECOES_CARTOGRAFIA_012.md) e os pareceres de cada pacote são a fundamentação editorial desta etapa. Não é uma promoção por sucesso de testes. Não se declara calibração psicométrica, garantia de ausência absoluta de erro ou auditoria das outras 25 unidades.

## Contrato de aprovação

A primeira edição operacional será `1.0.0`, separada das candidatas `0.1.0`, `0.1.1` e `0.1.2`, que permanecem imutáveis. Os textos pedagógicos de `0.1.2` serão preservados; a promoção registra decisões e condições de consumo.

Para aprovação delegada, o validador exige:

- estado `APROVADA_CANONICA`, no pacote e no catálogo;
- 12 critérios concluídos com fundamentação editorial;
- parecer por IA cobrindo todos os recursos, suporte e metadados por hash;
- decisão editorial explícita nos 36 itens autorais, sem preencher os campos humanos;
- tratamento documentado de todos os achados impeditivos;
- dados temporais verificados no alcance declarado, com fonte direta e prazo/regra de revisão;
- aprovação `editorial_approval.kind: delegated-ai`, vinculada ao digest do pacote inteiro;
- contrato e escopo da delegação registrados no manifesto;
- habilitação operacional explícita e validação da cadeia de versões.

O caminho de aprovação humana permanece disponível para futuras revisões reais. Um hash detecta alteração; não autentica pessoas nem substitui assinatura digital. Alterações editoriais relevantes exigem nova edição e novo parecer.

## Condições da integração

A build de Cartografia deve consumir exclusivamente os pacotes aprovados. HTMLs históricos, candidatas e snapshot inicial são material de procedência e testes, sem fallback editorial silencioso. Os demais materiais da biblioteca mantêm seu fluxo atual.

O consumidor deve apresentar as tabelas, o perfil esquemático, o par Landsat com créditos e alternativa textual, o mapa hipotético e as notas editoriais contidos nos pacotes. O PDF IBGE permanece complementar e com acesso não concluído. A prática de escala continua compartilhada; não são anunciados três roteiros específicos inexistentes.

O progresso usa os mesmos IDs e a mesma chave de armazenamento. A atualização não gera XP, evidência de aprendizagem, conquistas ou datas de retenção. Evidências antigas permanecem identificadas como provenientes do piloto; associações corrigidas não são reinterpretadas como respostas a outro conceito. Erros afetados preservam sua cópia histórica; agendas, rascunhos, tentativas e recompensas permanecem recuperáveis.

Famílias próximas contam como uma identidade para novidade e diversidade; trocar a formulação não libera recompensa imediata. A alternativa aposentada de GMS mantém seu ID e texto históricos, sem mapeamento para a opção nova. A prova oficial completa continua sujeita ao estoque de todas as áreas e não é liberada pela aprovação de Cartografia.

## Limite desta autorização

Esta etapa termina com integração, testes e relatório na branch `v6-base-canonica`. Não altera `main`, `v6-planejamento` ou `v6-piloto-cartografia`; não publica o site; não inicia outros módulos. A auditoria editorial fica a cargo do assistente, sem devolver ao estudante uma tarefa obrigatória de revisão de arquivos.
