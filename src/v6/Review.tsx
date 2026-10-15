import { useEffect, useRef, useState } from 'react';
import { useV6 } from './context';
import { Provenance, studyLink } from './components';
import { errorLabels, priorityErrors, rateCard, reviewQueue, schedule } from './engine';
import { Mastery } from './Study';
import type { ErrorType, Rating, UnitId } from './types';
const ratings: { id: Rating; label: string }[] = [
  { id: 'errei', label: 'Errei' },
  { id: 'dificil', label: 'Difícil' },
  { id: 'bom', label: 'Bom' },
  { id: 'facil', label: 'Fácil' },
];
function Cards() {
  const { content, state, update, notify } = useV6(),
    ses = state.session!,
    card = content.cards.find((c) => c.id === ses.ids[ses.position]);
  const [attempted, setAttempted] = useState(false),
    [revealed, setRevealed] = useState(false),
    front = useRef<HTMLHeadingElement>(null),
    back = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    front.current?.focus();
  }, [card?.id]);
  useEffect(() => {
    if (revealed) back.current?.focus();
  }, [revealed]);
  if (!card)
    return (
      <div className="session-finish">
        <h2>Revisão concluída por hoje</h2>
        <p>
          A agenda foi atualizada a cada avaliação. Cartões com dificuldade voltam antes; os demais
          ganham intervalo.
        </p>
        <button
          onClick={() =>
            update((s) => {
              delete s.session;
            })
          }
        >
          Voltar à agenda
        </button>
      </div>
    );
  const c = content.concepts.find((c) => c.id === card.concept)!,
    old = state.reviews[card.id];
  function rate(rating: Rating) {
    if (!card || !revealed) return;
    update((s) => {
      if (!s.session || s.session.id !== ses.id || s.session.position !== ses.position) return;
      rateCard(s, content, card.id, rating, Date.now());
      s.session.position++;
    });
    notify(
      rating === 'errei'
        ? 'Erro registrado. O cartão retorna uma vez nesta fila e vence em 1 dia.'
        : `Avaliação registrada. Próxima revisão em ${schedule(old, rating, Date.now()).interval} dias.`,
    );
  }
  return (
    <article className="flashcard panel">
      <div className="exercise-meta">
        <span>Revisão ativa · {c.name}</span>
        <span>
          {ses.position + 1} / {ses.ids.length}
        </span>
      </div>
      <h2 tabIndex={-1} ref={front}>
        {card.front}
      </h2>
      <p>Responda de memória antes de consultar o verso. Pode falar ou escrever numa folha.</p>
      {ses.ids.indexOf(card.id) < ses.position && (
        <p className="micro">
          Retentativa de recuperação: faça uma breve pausa se não houve outros cartões entre as
          tentativas. A repetição próxima não amplia o intervalo, a estimativa de domínio ou o XP.
        </p>
      )}
      {!revealed && (
        <>
          <label className="check">
            <input
              type="checkbox"
              checked={attempted}
              onChange={(e) => setAttempted(e.target.checked)}
            />
            Tentei recuperar a resposta antes de conferir
          </label>
          <button className="primary" disabled={!attempted} onClick={() => setRevealed(true)}>
            Revelar resposta
          </button>
        </>
      )}
      {revealed && (
        <div className="card-back">
          <h3 tabIndex={-1} ref={back}>
            Resposta
          </h3>
          <p className="card-answer">{card.back}</p>
          <p>
            <b>Por quê:</b> {c.mechanism}
          </p>
          <p>
            <b>Exemplo:</b> {c.example}
          </p>
          <p>
            <b>Cuidado:</b> {c.confusion}
          </p>
          {card.variants.length > 0 && (
            <details>
              <summary>Outras formulações preservadas</summary>
              {card.variants.map((v, i) => (
                <div key={i}>
                  <p>
                    <b>{v.front}</b>
                  </p>
                  <p>{v.back}</p>
                </div>
              ))}
            </details>
          )}
          <p>Como foi sua recuperação?</p>
          <p className="micro">
            Errei: não recuperei ou respondi errado. Difícil: recuperei com esforço ou insegurança.
            Bom e Fácil indicam recuperação correta, com estabilidade crescente.
          </p>
          <div className="rating-grid">
            {ratings.map((r) => (
              <button key={r.id} onClick={() => rate(r.id)}>
                {r.label}
                <small>{schedule(old, r.id, Date.now()).interval} dia(s)</small>
              </button>
            ))}
          </div>
          <a href={studyLink(content, card.mission)}>Retomar a teoria deste cartão</a>
          <Provenance refs={card.refs} />
        </div>
      )}
      {old && (
        <p className="micro">
          {old.reviews} avaliações · {old.lapses} lapsos
          {old.lapses >= 3
            ? ' · Cartão problemático: retome a explicação e reformule sua resposta.'
            : ''}
        </p>
      )}
      <button
        className="quiet"
        onClick={() =>
          update((s) => {
            delete s.session;
          })
        }
      >
        Encerrar e manter a agenda
      </button>
    </article>
  );
}
export function Review() {
  const { content, state, route, update } = useV6(),
    cards = content.cards.filter((c) => c.unit === route.unit),
    now = Date.now(),
    due = cards.filter((c) => state.reviews[c.id]?.due <= now),
    newCards = cards.filter((c) => !state.reviews[c.id]),
    problem = cards.filter((c) => (state.reviews[c.id]?.lapses || 0) >= 3),
    active =
      state.session?.kind === 'cards' &&
      state.session.ids.some((id) => cards.some((c) => c.id === id));
  return (
    <>
      <div className="unit-heading">
        <span className="eyebrow">Revisão · lembrar após um intervalo</span>
        <h1>Consolide o que fica.</h1>
        <p>
          Uma fila finita, com prioridade para cartões vencidos e dificuldades. Revelar o verso não
          dá pontos.
        </p>
      </div>
      {active ? (
        <Cards key={state.session!.id + state.session!.position} />
      ) : (
        <>
          <div className="review-layout">
            <section className="panel">
              <span className="eyebrow">Agenda desta unidade</span>
              <h2>
                {due.length ? `${due.length} cartões aguardam revisão` : 'Sua agenda está em dia'}
              </h2>
              <p>
                {newCards.length} novos disponíveis · {problem.length} com três ou mais lapsos.
              </p>
              <button
                className="primary"
                disabled={!reviewQueue(content, state, now, route.unit).length}
                onClick={() =>
                  update((s) => {
                    s.session = {
                      id: crypto.randomUUID(),
                      kind: 'cards',
                      ids: reviewQueue(content, s, Date.now(), route.unit),
                      position: 0,
                      repeat: [],
                    };
                  })
                }
              >
                Iniciar revisão de até 12 cartões
              </button>
              <details>
                <summary>Como os intervalos são calculados</summary>
                <p>
                  Na primeira avaliação: Errei 1 dia; Difícil 2; Bom 4; Fácil 7. Depois: Errei volta
                  a 1 dia; Difícil multiplica por 1,3; Bom por 2,2; Fácil por 3,5, arredondando para
                  dias.
                </p>
                <p>
                  Errei retorna uma vez ao fim da fila, mantendo a sessão finita: até 12 cartões
                  iniciais e 12 retornos. Se for o último item, faça uma breve pausa. Erro numa
                  questão antecipa cartões do mesmo conceito. A agenda é uma heurística ajustável,
                  com histórico preservado.
                </p>
              </details>
              <details>
                <summary>Consultar agenda e cartões problemáticos</summary>
                {cards.map((c) => {
                  const r = state.reviews[c.id];
                  return (
                    <p key={c.id}>
                      <b>{c.front}</b>
                      <br />
                      {r
                        ? `Próxima: ${new Date(r.due).toLocaleDateString('pt-BR')} · ${r.lapses} lapsos`
                        : 'Novo'}
                    </p>
                  );
                })}
              </details>
            </section>
            <Mastery unit={route.unit} />
          </div>
          <section className="panel error-invite">
            <h2>Revise as confusões, não só os itens</h2>
            <p>
              O caderno reúne erros das questões, Games, recalls, flashcards e provas. Conferir uma
              explicação não apaga um erro.
            </p>
            <a className="button subtle" href="#/caderno">
              Abrir Caderno Global de Erros →
            </a>
          </section>
        </>
      )}
    </>
  );
}
export function Errors() {
  const { content, state, update, go } = useV6(),
    [unit, setUnit] = useState(''),
    [type, setType] = useState(''),
    [status, setStatus] = useState(''),
    errors = priorityErrors(state, unit, type, status);
  return (
    <>
      <div className="unit-heading">
        <span className="eyebrow">Revisão · todos os ambientes do piloto</span>
        <h1>Caderno Global de Erros</h1>
        <p>
          Uma dificuldade é um ponto de partida. A recuperação exige evidência posterior; ler o
          feedback ou acertar imediatamente não resolve o registro.
        </p>
      </div>
      <div className="filters">
        <label>
          Unidade
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="">Todas</option>
            {content.units.map((u) => (
              <option value={u.id} key={u.id}>
                {u.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tipo
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Todos</option>
            {Object.entries(errorLabels).map(([id, label]) => (
              <option key={id} value={id}>
                {id} · {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Estado
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Todos</option>
            {['aberto', 'em-recuperacao', 'resolvido', 'dominado-apos-erro'].map((x) => (
              <option value={x} key={x}>
                {x.replaceAll('-', ' ')}
              </option>
            ))}
          </select>
        </label>
      </div>
      {!errors.length ? (
        <section className="panel">
          <h2>Nenhum registro neste filtro</h2>
          <p>Quando uma resposta revelar dificuldade, o conceito e a explicação aparecerão aqui.</p>
        </section>
      ) : (
        errors.map((err) => {
          const c = content.concepts.find((c) => c.id === err.concept);
          if (!c) return null;
          return (
            <article className="error-card panel" key={err.id}>
              <div className="exercise-meta">
                <span>
                  {err.type} · {errorLabels[err.type]}
                </span>
                <span>{err.status.replaceAll('-', ' ')}</span>
              </div>
              <h2>{c.name}</h2>
              <p>{err.misconception}</p>
              {err.falseMastery && (
                <p className="editorial-note">
                  Possível falsa sensação de domínio: houve erro objetivo relacionado a cartão
                  avaliado como Fácil. O tema voltou à recuperação.
                </p>
              )}
              <p className="micro">
                {err.count} ocorrência(s) · {err.itemIds.length} item(ns) · última ocorrência
                registrada em {new Date(err.last).toLocaleDateString('pt-BR')}
              </p>
              <details>
                <summary>Entender e recuperar</summary>
                <label className="field-label">
                  Ajustar classificação deste erro
                  <select
                    value={err.type}
                    onChange={(e) =>
                      update((s) => {
                        s.errors[err.id].type = e.target.value as ErrorType;
                      })
                    }
                  >
                    {Object.entries(errorLabels).map(([id, label]) => (
                      <option value={id} key={id}>
                        {id} · {label}
                      </option>
                    ))}
                  </select>
                </label>
                <p>{c.explanation}</p>
                <p>{c.mechanism}</p>
                <p>
                  <b>Exemplo:</b> {c.example}
                </p>
                <p>{c.repair}</p>
                <a href={studyLink(content, err.mission)}>Estudar o conceito →</a>
                <p>
                  Resolvido: acerto objetivo pelo menos um dia depois do último erro. Dominado após
                  erro: dois itens corretos após intervalo, outro contexto, revisões consistentes e
                  sete dias sem recorrência.
                </p>
                <ul>
                  {err.events.slice(-12).map((e, i) => (
                    <li key={i}>
                      {new Date(e.at).toLocaleDateString('pt-BR')}: {e.note}
                    </li>
                  ))}
                </ul>
              </details>
              <button
                onClick={() => {
                  const qs = content.questions
                    .filter((q) => q.concept === err.concept)
                    .sort(
                      (a, b) =>
                        Number(err.itemIds.includes(a.id)) - Number(err.itemIds.includes(b.id)),
                    );
                  if (!qs.length) {
                    go(err.unit, 'revisao', err.mission);
                    return;
                  }
                  update((s) => {
                    s.session = {
                      id: crypto.randomUUID(),
                      kind: 'questions',
                      ids: qs.slice(0, 3).map((q) => q.id),
                      position: 0,
                      repeat: [],
                      pool: 'recuperacao',
                    };
                  });
                  go(err.unit, 'treino', err.mission);
                }}
              >
                Tentar recuperar com outra questão
              </button>
            </article>
          );
        })
      )}
      <details className="panel">
        <summary>Sobre a classificação</summary>
        <p>
          O tipo inicial é sugerido pela confusão testada, sem diagnóstico psicológico. Use o
          histórico e a explicação para avaliar se o erro foi conceitual, de interpretação,
          aplicação, cálculo, atenção ou outro tipo. A priorização considera possível falsa sensação
          de domínio, recorrência e antiguidade.
        </p>
      </details>
    </>
  );
}
