# Fundamentos — relatório de verificação

Data: 16/10/2026. Branch: `v6-base-fundamentos-geografia`.
Implementação verificada: `da66234f2db3701dec096dc7c000aed5d9aa916a`.
Origem preservada: `3aa0509193a11d7d6f09ba916d125cc76afe5b79`.

## Resultado local

**Build e 145 testes passaram, sem falhas ou testes ignorados.** Os 23 testes
específicos de Fundamentos foram acrescentados às verificações anteriores.
A verificação de conteúdo não equivale a testar uma interface de Fundamentos,
cuja integração ainda não foi implementada.

| Verificação                                 | Resultado                                                                                                             |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `npm run build`                             | Importação, montagem canônica, TypeScript e Vite aprovados                                                            |
| `npm test`                                  | 145 aprovados: acervo 5, motor V6 58, contrato canônico anterior 42, Fundamentos 23, consumidor/progresso canônico 17 |
| `npm run check:canonical`                   | Quatro bases `1.0.0` aprovadas, com cadeias anteriores válidas; 24 unidades não iniciadas                             |
| `node scripts/build-v6.mjs --check`         | Banco ativo e paridade gerados conferem com os arquivos disponíveis                                                   |
| Prettier dos 24 arquivos da implementação   | Aprovado                                                                                                              |
| `git diff --cached --check` antes do commit | Aprovado                                                                                                              |
| Comparação com o commit de origem           | 31 HTMLs, 79 arquivos canônicos de Cartografia e 28 arquivos de interface/workflows/montador idênticos                |
| Cópias públicas dos HTMLs                   | 31 conferidas byte a byte                                                                                             |
| Catálogo anterior                           | As outras 27 entradas e o objeto da delegação original mantêm os mesmos valores                                       |

O [registro estruturado](v6-evidencias/resultado-fundamentos.json) contém saídas,
hashes dos materiais verificados e inventário da preservação. As comparações
usaram arquivos extraídos do commit de origem por `git archive`, sem modificar
as fontes históricas ou executar seus aplicativos.

## O que os 23 testes específicos verificam

- Candidata `0.1.0` preservada, promoção para `1.0.0` sem reescrita pedagógica,
  matriz de 12 critérios, digest do parecer e autoria por IA sem humano fictício.
- Unidade aprovada mas ainda indisponível no consumidor; candidata recusada
  para uso operacional. Cartografia permanece a única área ativa no banco V6.
- Hash original, 228 vínculos literais, 269 IDs de recurso e originais completos.
- As 32 questões antigas, suas alternativas anteriores, posições corretas e
  textos corretos. Distribuição de origem A=9, B=18, C=5, D=0, E=0.
- Preenchimento dos 12 comentários ausentes; quinta alternativa do antigo
  `c_4`; todos os gabaritos únicos e feedback explicativo em 48 questões.
- Classificação 32 Fixação / 12 Concurso / quatro Elite; 16 itens novos A–E
  autorais e seis itens do novo Chefão com aplicação/integração.
- Cinco famílias de pares próximos, sem novidade independente; diagnóstico e
  pós-teste reutilizando as mesmas identidades.
- 11 missões, 22 seções, 27 conceitos e 11 recalls; quatro recalls anteriores
  com os mesmos comandos e modelos.
- 44 identidades antigas de cartão, 45 cartões finais e divisão explícita de
  Said/Escobar com relação ao cartão de origem.
- Os 100 V/F, com 68 verdadeiros e 32 falsos, justificativas e limites de uso
  como evidência de domínio.
- Discursivas, modelos, rubricas, três tabelas históricas e microprática;
  duração/rubricas didáticas sem atribuição indevida à prova oficial.
- Tabela hipotética com cabeçalhos e recálculo independente: A cai 20 minutos
  (50%); B aumenta 15 minutos (75%). O item não infere distância física, causa
  ou redistribuição de poder apenas desses tempos.
- Ausência de duplicatas textuais normalizadas de enunciados, frentes de
  cartões e V/F; IDs únicos e alternativas distintas.
- Diferença entre fonte diretamente consultada, resumo, excerto indexado e
  referência bibliográfica; dado histórico ferroviário separado de dado atual.
- Bloqueio por informação temporal vencida, verificação ausente ou data futura.
- Contrato, ainda não implementado, das chaves `t1i_v21` / `t1i_v2`, com
  mapeamentos de respostas, cartões e V/F sem XP ou retenção presumidos.
- Rejeição de fonte ou payload adulterado, roster incompleto, ponteiro inválido,
  antes/depois falso, apagamento e caminho de protótipo perigoso.
- Correspondência da teoria compilada com o hook efetivamente auditado,
  alteração posterior ao parecer e decisão por item ausente.
- Rejeição de delegação sobreposta/ausente, lote de escopo duplicado, caminho de
  snapshot fora do diretório e tipo de consolidação desconhecido.
- Mesmo banco público de Cartografia após a nova consolidação, sem vazamento de
  conteúdo da unidade ainda não integrada.

Os testes de adulteração usam cópias sintéticas em memória ou diretório
temporário. Recalcular um hash nessas cópias serve para isolar a próxima barreira
de validação; não é um comando de aprovação editorial nem modifica a base real.

## Preservação do site e navegador

Banco operacional: `6.1.0-canonica.1`, com apenas as três unidades de Cartografia.
SHA-256 dos bytes de `public/v6/cartografia.json`:
`574b248f3b9180dac5633d5d304eddc5598a98e4f150df8b087ecee341b2af05`.
Os 685 vínculos de paridade e 691 recursos da Cartografia aprovada permanecem.

Os cinco assets produzidos conservam os nomes da versão publicada:
`portal-ozacjLQX.css`, `main-VOxYawnG.css`, `portal-BKylBOax.js`,
`main-CWwm2WoY.js` e `legacy-routes-C9LWSb9Z.js`.

A suíte de 166 cenários de navegador não foi repetida localmente nesta rodada:
não houve alteração da interface, do motor, dos estilos, dos workflows ou do
banco ativo. A execução anterior aprovada está documentada no relatório de
integração de Cartografia; esse resultado não é contado como teste novo aqui.
O workflow do pull request executa novamente a suíte completa. Seu resultado
pertence ao commit remoto correspondente e pode ser conferido na aba Checks.

Não existe teste de migração operacional de Fundamentos neste lote, pois não
há migrador implementado. Nenhum comportamento novo de interface ou dado real
de progresso foi anunciado como validado.

## Limites do parecer

Os testes verificam integridade, coerência estrutural, gabaritos e fronteiras de
consumo. A [auditoria editorial](V6_ISSUE13_FUNDAMENTOS_AUDITORIA.md) registra a
leitura conceitual, as fontes e o alcance da aprovação. Dificuldade continua sendo
classificação editorial; não houve calibração com uma amostra de candidatos.
Não foram certificadas as outras 24 unidades nem a suficiência para o concurso
inteiro. Este relatório não autoriza publicação ou merge por si só.
