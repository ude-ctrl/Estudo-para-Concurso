import { useEffect, useRef, useState } from 'react';
import { useV6 } from './context';
import { Feedback, Provenance, Visual, studyLink } from './components';
import { attempt, identifyGame, nextQuestions } from './engine';
import type { Question, State } from './types';
import { parseTrainingPool, trainingHref, trainingSessionMatches } from './training-session';
function diagnostic(state: State, key: string): { hits: number; total: number } | null {
  try {
    const value = JSON.parse(state.drafts[key] || 'null');
    return value && Number.isFinite(value.hits) && Number.isFinite(value.total) ? value : null;
  } catch {
    return null;
  }
}
export function QuestionForm({
  q,
  choice,
  onChange,
  onConfirm,
  locked = false,
}: {
  q: Question;
  choice?: string;
  onChange: (id: string) => void;
  onConfirm?: () => void;
  locked?: boolean;
}) {
  const name = 'choice-' + q.id;
  return (
    <>
      <Visual id={q.visual} />
      <fieldset className="question-options" disabled={locked}>
        <legend>{q.prompt}</legend>
        {q.options.map((o, i) => (
          <label className={choice === o.id ? 'selected' : ''} key={o.id}>
            <input
              type="radio"
              name={name}
              value={o.id}
              checked={choice === o.id}
              onChange={() => onChange(o.id)}
            />
            <span className="letter">{String.fromCharCode(65 + i)}</span>
            <span>{o.text}</span>
          </label>
        ))}
      </fieldset>
      {onConfirm && (
        <button className="primary" disabled={!choice || locked} onClick={onConfirm}>
          Confirmar resposta
        </button>
      )}
    </>
  );
}
export function QuestionRunner() {
  const { content, state, update, notify } = useV6(),
    ses = state.session!;
  const q = content.questions.find((q) => q.id === ses.ids[ses.position]),
    ref = useRef<HTMLDivElement>(null);
  const k = 'answer:' + ses.id + ':' + q?.id,
    choice = state.drafts[k];
  useEffect(() => {
    if (ses.answered) ref.current?.querySelector<HTMLElement>('.feedback')?.focus();
    else ref.current?.focus();
  }, [ses.answered]);
  const unit = content.questions.find((q) => q.id === ses.ids[0])?.unit;
  const before = diagnostic(state, 'diagnostic:' + unit + ':diagnostico'),
    after = diagnostic(state, 'diagnostic:' + unit + ':pos-teste');
  const comparison = ['diagnostico', 'pos-teste'].includes(ses.pool || '') && (
    <p>
      Comparação dos mesmos itens: diagnóstico{' '}
      {before ? `${before.hits}/${before.total}` : 'ainda não registrado'} · pós-teste{' '}
      {after ? `${after.hits}/${after.total}` : 'ainda não registrado'}. A melhora imediata não
      comprova retenção; retome após intervalo.
    </p>
  );
  if (!q)
    return (
      <div className="session-finish">
        <h2>Rodada concluída</h2>
        <p>
          {state.evidence.filter((e) => e.context === ses.id && e.correct).length} de{' '}
          {ses.ids.length} respostas corretas nesta rodada. Repetições próximas não acrescentam
          evidência de retenção.
        </p>
        {comparison}
        <button
          onClick={() =>
            update((s) => {
              delete s.session;
            })
          }
        >
          Preparar outra rodada
        </button>
        <a href="#/caderno">Revisar erros registrados →</a>
      </div>
    );
  return (
    <article className="exercise" ref={ref} tabIndex={-1}>
      <div className="exercise-meta">
        <span>
          {ses.pool === 'diagnostico'
            ? 'Diagnóstico'
            : ses.pool === 'pos-teste'
              ? 'Pós-teste'
              : ses.pool === 'chefao'
                ? 'Chefão'
                : q.pool === 'elite'
                  ? 'FGV Elite'
                  : q.pool === 'concurso'
                    ? 'Concurso'
                    : 'Fixação'}{' '}
          · D{q.difficulty} · C{q.cognitive}
        </span>
        <span>
          {ses.position + 1} / {ses.ids.length}
        </span>
      </div>
      <p className="micro">
        {content.missions.find((m) => m.id === q.mission)?.title} · {q.origin}
      </p>
      <QuestionForm
        q={q}
        choice={choice}
        locked={ses.answered}
        onChange={(id) =>
          update((s) => {
            s.drafts[k] = id;
          })
        }
        onConfirm={() => {
          if (ses.answered || !choice) return;
          update((s) => {
            if (s.session?.id !== ses.id || s.session?.answered) return;
            const option = q.options.find((o) => o.id === choice)!;
            attempt(s, content, {
              item: q.id,
              correct: choice === q.correct,
              kind: ses.pool === 'chefao' ? 'boss' : q.pool,
              at: Date.now(),
              type: option.errorType,
              context: ses.id,
            });
            s.exposures[q.id] = Date.now();
            s.session!.answered = true;
          });
          notify('Resposta registrada. Confira a explicação.');
        }}
      />
      {ses.answered && (
        <>
          <Feedback q={q} content={content} choice={choice} />
          <button
            className="primary"
            onClick={() =>
              update((s) => {
                if (s.session?.id !== ses.id) return;
                if (
                  s.session.position + 1 === ses.ids.length &&
                  ['diagnostico', 'pos-teste'].includes(ses.pool || '')
                )
                  s.drafts['diagnostic:' + q.unit + ':' + ses.pool] = JSON.stringify({
                    hits: s.evidence.filter((e) => e.context === ses.id && e.correct).length,
                    total: ses.ids.length,
                    at: Date.now(),
                  });
                s.session!.position++;
                s.session!.answered = false;
              })
            }
          >
            {ses.position + 1 === ses.ids.length ? 'Concluir rodada' : 'Próxima questão'}
          </button>
        </>
      )}
      <button
        className="quiet"
        onClick={() =>
          update((s) => {
            delete s.session;
          })
        }
      >
        Encerrar rodada e manter respostas
      </button>
    </article>
  );
}
export function GameRunner() {
  const { content, state, update, notify } = useV6(),
    ses = state.session!,
    g = content.game.find((g) => g.id === ses.ids[ses.position]),
    [clock, setClock] = useState(Date.now());
  const feedbackRef = useRef<HTMLDivElement>(null),
    key = 'game:' + ses.id + ':' + g?.id;
  function answer(v: boolean | null) {
    if (!g || ses.answered) return;
    update((s) => {
      if (s.session?.id !== ses.id || s.session?.answered) return;
      s.drafts[key] = String(v);
      attempt(s, content, {
        item: g.id,
        correct: v === g.truth,
        kind: 'game',
        at: Date.now(),
        context: ses.id,
      });
      s.exposures[g.id] = Date.now();
      s.session!.answered = true;
    });
    notify('Decisão registrada com justificativa.');
  }
  useEffect(() => {
    if (!ses.deadline || ses.answered) return;
    const timer = setInterval(() => setClock(Date.now()), 250);
    return () => clearInterval(timer);
  }, [ses.deadline, ses.answered]);
  useEffect(() => {
    if (ses.deadline && clock >= ses.deadline && !ses.answered) answer(null);
  }, [clock, ses.deadline, ses.answered]);
  useEffect(() => {
    if (ses.answered) feedbackRef.current?.focus();
  }, [ses.answered]);
  if (!g)
    return (
      <div className="session-finish">
        <h2>Rodada de V/F concluída</h2>
        <p>
          As justificativas fazem parte do treino. Os erros continuam no caderno para recuperação
          após intervalo.
        </p>
        <button
          onClick={() =>
            update((s) => {
              delete s.session;
            })
          }
        >
          Preparar nova rodada
        </button>
      </div>
    );
  const c = content.concepts.find((c) => c.id === g.concept)!;
  return (
    <article className="exercise game-exercise">
      <div className="exercise-meta">
        <span>
          Game V/F · {ses.position + 1} de {ses.ids.length}
        </span>
        {ses.deadline && !ses.answered && (
          <span role="timer" aria-label="Tempo restante">
            {Math.max(0, Math.ceil((ses.deadline - clock) / 1000))} s
          </span>
        )}
      </div>
      <h2>{g.statement}</h2>
      <p>Decida primeiro. Depois, confira o mecanismo e a formulação correta.</p>
      <div className="button-row">
        <button disabled={ses.answered} onClick={() => answer(false)}>
          Falso
        </button>
        <button disabled={ses.answered} onClick={() => answer(true)}>
          Verdadeiro
        </button>
      </div>
      {ses.answered && (
        <>
          <div ref={feedbackRef} className="feedback" tabIndex={-1}>
            <h3>
              {state.drafts[key] === String(g.truth)
                ? 'Decisão correta'
                : state.drafts[key] === 'null'
                  ? 'Tempo encerrado; vamos conferir'
                  : 'Vamos corrigir a afirmação'}
            </h3>
            <p>
              <b>{identifyGame(g)}</b>
              {g.truth ? ' ' + g.justification : ''}
            </p>
            <p>{c.mechanism}</p>
            <p>
              <b>Exemplo:</b> {c.example}
            </p>
            <p>{c.confusion}</p>
            <a href={studyLink(content, g.mission)}>
              Rever a explicação e tentar após um intervalo →
            </a>
            {g.variants.length > 0 && (
              <details>
                <summary>Formulações equivalentes preservadas</summary>
                {g.variants.map((v, i) => (
                  <p key={i}>
                    <b>{v.statement}</b> {v.justification}
                  </p>
                ))}
              </details>
            )}
            <Provenance refs={g.refs} />
          </div>
          <button
            className="primary"
            onClick={() =>
              update((s) => {
                s.session!.position++;
                s.session!.answered = false;
                if (s.session!.deadline) s.session!.deadline = Date.now() + 20_000;
              })
            }
          >
            Próximo item
          </button>
        </>
      )}
      <button
        className="quiet"
        onClick={() =>
          update((s) => {
            delete s.session;
          })
        }
      >
        Encerrar rodada
      </button>
    </article>
  );
}
export function Training() {
  const { content, state, route, update } = useV6(),
    pool = route.pool || 'fixacao',
    mission = route.mission,
    [game, setGame] = useState(false),
    [timed, setTimed] = useState(false),
    [completedOnEntry] = useState(() =>
      state.session && state.session.position >= state.session.ids.length ? state.session.id : null,
    );
  const active =
    trainingSessionMatches(content, state.session, route) &&
    (!(route.mission || route.pool) || state.session?.id !== completedOnEntry);
  const available = content.questions.filter(
    (q) =>
      q.unit === route.unit &&
      (pool === 'chefao'
        ? q.roles.includes('chefao')
        : ['diagnostico', 'pos-teste'].includes(pool)
          ? q.roles.includes('diagnostico')
          : q.pool === pool) &&
      (!mission || q.mission === mission),
  );
  return (
    <>
      <div className="unit-heading">
        <span className="eyebrow">Treino · feedback imediato</span>
        <h1>Pratique uma decisão por vez.</h1>
        <p>
          Fixe conceitos, aplique em situações de concurso e investigue as armadilhas. Sua primeira
          resposta de cada tentativa fica registrada.
        </p>
      </div>
      {active ? (
        state.session!.kind === 'game' ? (
          <GameRunner key={state.session!.id + state.session!.position} />
        ) : (
          <QuestionRunner key={state.session!.id + state.session!.position} />
        )
      ) : (
        <div className="panel training-setup">
          <h2>Prepare uma rodada</h2>
          <div className="segmented">
            <button aria-pressed={!game} onClick={() => setGame(false)}>
              Questões
            </button>
            <button aria-pressed={game} onClick={() => setGame(true)}>
              Game V/F
            </button>
          </div>
          {!game ? (
            <>
              <label className="field-label">
                Banco
                <select
                  data-training-filter="bank"
                  value={pool}
                  onChange={(e) => {
                    location.hash = trainingHref(
                      route.unit,
                      mission,
                      parseTrainingPool(e.target.value),
                    );
                  }}
                >
                  <option value="fixacao">Fixação — fundamentos e memória</option>
                  <option value="concurso">Concurso — aplicação A–E</option>
                  <option value="elite">FGV Elite — integração A–E</option>
                  <option value="diagnostico">Diagnóstico da unidade</option>
                  <option value="pos-teste">Pós-teste — os mesmos itens do diagnóstico</option>
                  <option value="chefao">Chefão da unidade</option>
                </select>
              </label>
              <label className="field-label">
                Missão
                <select
                  data-training-filter="mission"
                  value={mission}
                  onChange={(e) => {
                    location.hash = trainingHref(route.unit, e.target.value, pool);
                  }}
                >
                  <option value="">Todas desta unidade</option>
                  {content.missions
                    .filter((m) => m.unit === route.unit)
                    .map((m) => (
                      <option value={m.id} key={m.id}>
                        {m.title}
                      </option>
                    ))}
                </select>
              </label>
              <p>
                {available.length} questões disponíveis. Até 10 por rodada, priorizando as menos
                vistas.
              </p>
              <button
                className="primary"
                disabled={!available.length}
                onClick={() =>
                  update((s) => {
                    const ids = nextQuestions(
                      content,
                      s,
                      pool,
                      route.unit,
                      content.questions.length,
                    )
                      .filter(
                        (id) =>
                          !mission ||
                          content.questions.find((q) => q.id === id)?.mission === mission,
                      )
                      .slice(0, 10);
                    s.session = {
                      id: crypto.randomUUID(),
                      kind: 'questions',
                      ids,
                      position: 0,
                      pool,
                      repeat: [],
                    };
                  })
                }
              >
                Iniciar questões
              </button>
              <p className="micro">
                O Chefão integra os raciocínios da unidade em uma rodada de desafio. A dificuldade
                real aparece nos metadados; não converte automaticamente Fixação em FGV Elite.
              </p>
            </>
          ) : (
            <>
              <p>
                Rodada da unidade: verdadeiro ou falso, sempre com explicação. Não há perda de vidas
                nem bônus por repetir o mesmo acerto.
              </p>
              <label className="check">
                <input
                  type="checkbox"
                  checked={timed}
                  onChange={(e) => setTimed(e.target.checked)}
                />
                Ritmo opcional: 20 segundos por afirmação
              </label>
              <button
                className="primary"
                onClick={() => {
                  update((s) => {
                    const ids = content.game
                      .filter((g) => g.unit === route.unit)
                      .sort(
                        (a, b) =>
                          Number(
                            Object.values(s.errors).some(
                              (e) => e.concept === b.concept && e.status === 'aberto',
                            ),
                          ) -
                            Number(
                              Object.values(s.errors).some(
                                (e) => e.concept === a.concept && e.status === 'aberto',
                              ),
                            ) ||
                          (s.exposures[a.id] || 0) - (s.exposures[b.id] || 0) ||
                          a.id.localeCompare(b.id),
                      )
                      .slice(0, 10)
                      .map((g) => g.id);
                    s.session = {
                      id: crypto.randomUUID(),
                      kind: 'game',
                      ids,
                      position: 0,
                      repeat: [],
                      deadline: timed ? Date.now() + 20_000 : undefined,
                    };
                  });
                  // Starting the unit Game is an explicit change of activity, not a question-bank route.
                  location.hash = trainingHref(route.unit);
                }}
              >
                Iniciar 10 afirmações
              </button>
            </>
          )}
          {state.session && (
            <p className="micro">
              Iniciar substitui a fila ativa de outra unidade ou atividade. O histórico de respostas
              e a agenda são preservados.
            </p>
          )}
        </div>
      )}
    </>
  );
}
