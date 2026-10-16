# V6 — Fase 14: implementação da Gamificação Sensorial

Data: 16/10/2026 UTC. Branch exclusiva: `v6-piloto-cartografia`.
Implementação sensorial: `83a616c4512ea48f082d2d85d7b61e7e510c34ae`; ajuste de foco: `28ed734`; espera de carregamento nos testes: `704dd7c`. O refinamento de leitura dos avisos está em `bdda892`, revalidado separadamente após a bateria global.

**Situação: implementada para novo teste humano da experiência.** A reconferência P1/P3 anterior permanece registrada. Os 36 itens autorais continuam `human-review-pending`; esta camada não os aprova editorialmente.

**Retorno posterior — 16/10/2026, America/Sao_Paulo:** o usuário ainda não percebeu mudança e autorizou dar continuidade se isso não trouxer implicações. A [consolidação técnica](V6_FASE14_PADRAO_TECNICO.md) registra o avanço documental e mantém a ressalva visual. Não foi confirmado qual endereço/versão foi aberto; o retorno não é apresentado como aprovação dos efeitos, autorização de publicação ou início da Issue #13.

## Autorização e escopo

O usuário pediu a atualização de contexto com a proposta sensorial, a política de Base Canônica, a Issue #13 e o comentário mais recente da Issue #12. Depois do esclarecimento de que a revisão editorial pendente não cria outra rodada obrigatória de auditoria técnica P1/P3, autorizou o prosseguimento: **“Ok, vamos continuar.”**

Esta é a rodada separada prevista na [proposta sensorial](V6_FASE14_GAMIFICACAO_SENSORIAL_PROPOSTA.md) e no [comentário de governança da Issue #12](https://github.com/ude-ctrl/Estudo-para-Concurso/issues/12#issuecomment-6205257717). O documento original da proposta foi preservado. Não houve merge, publicação, migração de outro módulo ou início da Issue #13.

## O que mudou na experiência

- **Expedição Cartográfica:** percurso visual com as 17 missões, pontos de navegação, indicação da missão atual e contagem de checkpoints por unidade. Grupos recolhíveis evitam abrir todas as missões simultaneamente. Todas continuam consultáveis, sem cadeados artificiais.
- **Estados explícitos:** Disponível, Em estudo, Leitura e recuperação concluídas, Revisão pendente e Fragilidade em recuperação. Ícone, texto e borda acompanham a cor. Pendência de revisão tem prioridade visual sobre fragilidade; a conclusão histórica do percurso continua contada separadamente.
- **Foco / Equilibrado / Imersivo:** preferências globais persistidas. O padrão é Equilibrado. Foco elimina as animações sensoriais e desliga o som ao ser escolhido; a pessoa pode habilitar som novamente de forma explícita.
- **Efeitos sonoros Desligado / Suave / Imersivo:** padrão Desligado. Tons locais curtos, sem música, arquivos de áudio remotos ou dependência de áudio para compreender o resultado. Há um botão para ouvir um exemplo.
- **Feedback proporcional:** resposta comum recebe sinal leve junto à explicação; FGV Elite recebe acento distinto. Erro recebe indicação neutra e acesso à explicação, sem alarme punitivo. Não há modal ou confete por alternativa.
- **Final de bloco:** progresso da rodada, balanço do XP que o motor já concedeu, revisões vencidas cumpridas e erros convertidos. O balanço não gera novos pontos.
- **Chefão:** apresentação própria na preparação, raciocínios cobertos, acertos por conceito no resultado e próximo acesso ao caderno de erros. Precisão da rodada continua distinta de domínio.
- **Marcos importantes:** Chefão, erro convertido em domínio e conclusão da expedição têm destaque próprio. No Imersivo, partículas ficam limitadas ao cartão da celebração, com seis elementos para Chefão/erro e doze para módulo. Não cobrem botões nem bloqueiam ações.
- **Ritmo pessoal:** barra de XP e nível pessoal em área secundária, com sequência atual e melhor sequência separadas. O texto explicita que nível não mede domínio nem prontidão para prova.

## Critérios dos checkpoints e das conquistas

Um checkpoint de missão exige **todas as explicações da missão com leitura registrada e recuperação já reconhecida pelo motor**. Só ler não conclui o checkpoint nem concede pontos. Esse estado mede percurso; não é uma nova estimativa de domínio.

A conquista de conclusão da expedição exige os checkpoints das 17 missões e os três Chefões superados, mantendo o critério anterior de rodada completa com pelo menos 80% de acertos. O resumo mostra missões, Chefões, erros convertidos, domínio estimado com confiança e agenda futura. A conquista se chama **Expedição Cartográfica concluída**; não declara que todas as unidades foram dominadas.

O erro convertido continua dependendo integralmente dos critérios do motor: recuperação posterior, contextos distintos e revisões consistentes. Ler a explicação ou acertar logo depois não dispara esse marco.

As regras anteriores de marcos de revisão, unidade e streak foram mantidas. Os novos checkpoints e a conquista do módulo não acrescentam XP. Marcos de streak permanecem restritos a 3, 7, 14, 30, 60 e 90 dias.

## Eventos, som e interrupção

Os eventos são derivados da diferença entre o estado anterior e o novo estado após uma ação de aprendizagem. No mesmo momento, o evento de maior importância recebe o destaque principal, evitando uma fila de avisos e sons concorrentes. As conquistas ficam no histórico; efeitos visuais e sonoros são transitórios.

O contexto de áudio só é criado a partir de um gesto com efeitos habilitados ou do botão de exemplo. Não é criado ao carregar a página. Sons duram menos de 0,6 segundo e têm limite de frequência; um marco mais importante pode substituir um efeito menor. Navegação, ocultação da página, mudança das preferências, atualização por outra aba e entrada em prova interrompem sons e cancelam efeitos transitórios. Reload, importação e restauração não reproduzem conquistas passadas.

Não há sons na área Prova, nem quando há prova objetiva ou plano/defesa em andamento após sair dessa tela. A camada sensorial não recebe gabarito antecipado e não modifica o cronômetro. A indisponibilidade de Web Audio mantém o estudo e o feedback textual funcionais.

`prefers-reduced-motion` e a redução manual prevalecem sobre qualquer intensidade: não há partículas e as animações são desativadas. Isso também vale quando a preferência do sistema muda durante uma celebração. Os avisos permanecem no fluxo, sem modal ou mudança forçada de foco.

Os avisos comuns pausam o fechamento automático enquanto têm foco de teclado ou ponteiro sobre o cartão. O resumo interativo de conclusão do módulo permanece até dispensa manual ou navegação; não desaparece enquanto a pessoa lê o resultado. O resumo continua acessível no painel de ritmo após a conclusão.

## Persistência e decisões técnicas

| Parte | Decisão |
| --- | --- |
| Preferências | `preferences.experience` e `preferences.sound` são opcionais e validadas; cópias anteriores usam Equilibrado/Desligado |
| Esquema e chaves | Esquema 6 e chaves de armazenamento mantidos |
| Rodada nova | `session.sensorySummary` guarda somente o balanço de XP, revisões devidas e erros convertidos da fila atual |
| Rodada anterior sem balanço | Não se inventa um total retroativo; os registros pedagógicos e a retomada continuam válidos |
| Atribuição de XP | Só recompensas novas pertencentes à fila entram no balanço; atividade paralela não é somada à rodada |
| Marcos | Acrescentados IDs `mission:<id-canônico>` e `module:cartografia`, sem recalcular IDs de conteúdo |
| Efeitos | Não persistem como fila de reprodução; somente a conquista efetivamente obtida é registrada |
| Áudio | Síntese Web Audio local e lazy; sem biblioteca ou dependência nova |
| Nível | Deriva apenas do ledger de XP; não entra no cálculo de domínio |
| Melhor sequência | Recalculada a partir dos dias civis significativos; não usa diferença de 24 horas para atravessar mudanças de offset |

Arquivos centrais: `src/v6/sensory.ts`, `SensoryUI.tsx`, `sound.ts`, `recognition.ts`, `Celebration.tsx` e integração em `App.tsx`. Em `engine.ts`, a alteração limita-se à validação das novas preferências e do balanço opcional. As funções de XP, agenda, erro, domínio, prova e calendário não foram reescritas.

## Preservação e Base Canônica

Permanecem sem alterações o banco pedagógico, seus gabaritos, o mapa de paridade com 685 registros, o registro congelado de IDs e os 31 HTMLs históricos. A camada sensorial não reinterpreta teoria ou questões.

Nenhuma unidade foi promovida a `APROVADA_CANONICA`. A [política oficial](https://github.com/ude-ctrl/Estudo-para-Concurso/blob/v6-planejamento/MissaoAprovacaoGeo/V6_POLITICA_BASE_CANONICA_CONTEUDO.md) foi incorporada ao contexto, mas a implementação da Base Canônica Mestra permanece para depois do fechamento técnico do piloto, em branch própria da Issue #13. A dependência atual de extração dos HTMLs na build não é alterada nesta rodada; deverá ser substituída pela base aprovada na etapa adequada.

O perfil oficial completo permanece bloqueado por estoque aprovado insuficiente. O novo visual não modifica esse limite nem mascara a revisão editorial pendente dos itens autorais.

## Verificação

Os resultados, o commit verificado e a cobertura estão no [relatório de testes](V6_FASE14_RELATORIO_TESTES.md). A evidência estruturada desta rodada é `v6-evidencias/resultado-sensorial.json`.

Resultado: build e geração reproduzível aprovadas; **63 testes de integridade/lógica**, **146 cenários globais de navegador** e **22 revalidações posteriores das celebrações** passaram. A bateria global e a revalidação posterior terminaram sem falhas, ignorados ou resultados instáveis. O relatório explicita os commits e a sobreposição entre essas baterias.

As verificações incluem os modos de experiência, som desligado, Web Audio nativo e simulado, cancelamento de áudio pendente, outra aba, página oculta, redução de movimento automática/manual, teclado, viewport mobile, ampliação, prova limpa, persistência, backups anteriores, ausência de farming e paridade.

O primeiro teste de unidade encontrou o novo checkpoint de missão junto ao marco de unidade, onde a expectativa anterior previa somente a unidade. A expectativa passou a exigir os dois marcos previstos nesta proposta. Os critérios anteriores de unidade e ausência de XP adicional foram mantidos. Esse ajuste de contrato não é apresentado como perda de conteúdo ou mudança da métrica de domínio.

A primeira bateria completa passou em 145 de 146 cenários e encontrou uma falha de foco do teclado na troca de banco, no subdiretório GitHub Pages. O foco era agendado em um frame que podia ocorrer antes da remontagem do treino. O ajuste passou a restaurá-lo após o commit da rota via `useLayoutEffect`, mantendo o teste de regressão existente sem afrouxar suas expectativas. O histórico dessa execução e a revalidação ficam separados dos resultados finais no relatório de testes.

A segunda bateria completa também passou em 145 de 146 cenários: o teste de primeiro Tab podia iniciar na tela de carregamento, que já possuía um `h1`, antes de o workspace existir. O caso foi reproduzido mantendo a resposta do JSON pendente: Tab antecipado não alcançava o skip link; após o carregamento, alcançava. A preparação dos testes de teclado/layout passou a aguardar o workspace real. As verificações de foco, contraste, movimento e overflow foram preservadas; a matriz mobile agora espera o conteúdo de cada tela antes de medi-lo.

A bateria global seguinte passou em **146 cenários**, 73 por caminho, sem falhas, ignorados ou resultados instáveis. O ajuste posterior de duração dos avisos recebeu uma revalidação específica. Nela, o teste de fechamento também foi corrigido para liberar tanto o foco quanto o ponteiro antes de exigir a expiração, mantendo a verificação de que o cartão permanece durante a interação. O relatório distingue a bateria global dessa revalidação posterior.

Capturas da build com dados de teste, sem representar progresso real do usuário:

- [Percurso no celular](v6-evidencias/sensorial-percurso-mobile.png).
- [Percurso no celular em modo escuro](v6-evidencias/sensorial-percurso-dark-mobile.png).
- [Resultado e celebração de Chefão](v6-evidencias/sensorial-chefao-mobile.png).
- [Conclusão da expedição e resumo](v6-evidencias/sensorial-modulo-desktop.png).

## Teste humano desta experiência

1. Na prévia desta branch, abra **Início** e use o percurso para acessar missões de unidades diferentes. Confira se a próxima ação fica compreensível.
2. Abra a engrenagem de **Preferências e progresso**. Alterne **Foco**, **Equilibrado** e **Imersivo**. O conteúdo e a dificuldade devem permanecer iguais.
3. Em **Efeitos sonoros**, escolha **Suave** e use **Ouvir exemplo de efeito**. Confira se o som é confortável; volte a **Desligado** para estudar em silêncio.
4. Faça uma rodada de questões ou Game. Confira se os efeitos ajudam sem interromper a explicação. No fim, veja o balanço de XP. Experimente o Chefão para avaliar o destaque de conclusão.
5. Ative redução de movimento e modo escuro. Abra **Prova** e confira a ausência de sons e celebrações.
6. Recarregue a página e confira preferências e progresso. Não é necessário apagar dados ou fabricar retenção para testar a apresentação; a conversão de erro continua exigindo intervalos reais.

O teste humano deve avaliar conforto, legibilidade, intensidade e sensação de avanço desta camada nova. Os aceites anteriores e a reconferência P1/P3 não precisam ser refeitos integralmente. Não se afirma aprovação humana da Gamificação Sensorial antes desse retorno.

## Critério de parada

O retorno posterior do usuário permitiu consolidar documentalmente os contratos técnicos, mantendo explícita a diferença visual ainda não percebida. Isso não encerra integralmente o piloto nem inventa aceite da experiência sensorial. Sem merge ou publicação, sem migrar outros módulos e sem iniciar a Issue #13 automaticamente. O [registro de consolidação](V6_FASE14_PADRAO_TECNICO.md) delimita esse avanço e as pendências.
