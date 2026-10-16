import { useEffect, useState } from 'react';
import { useV6 } from './context';
import { Feedback, Provenance } from './components';
import { QuestionForm } from './Training';
import { blueprintAvailability, examPool, finishExam, makeExam } from './engine';
import type { State, UnitId, Writing } from './types';
import { questionExposure } from './content-progress';
function useNow(active: boolean) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!active) return;
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [active]);
  return now;
}
function timeLeft(ms: number) {
  const n = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`;
}
export function Objective() {
  const { content, state, update, notify } = useV6(),
    [unit, setUnit] = useState(''),
    [count, setCount] = useState(10),
    [minutes, setMinutes] = useState(20),
    exam = state.exam,
    now = useNow(!!exam && !exam.finished);
  useEffect(() => {
    if (exam && !exam.finished && now >= exam.deadline) {
      update((s) => finishExam(s, content, Date.now()));
      notify('Tempo encerrado. As respostas foram salvas e a correção está disponível.');
    }
  }, [now, exam?.deadline, exam?.finished]);
  if (!exam) {
    const pool = examPool(content, unit);
    return (
      <div className="panel exam-setup">
        <span className="eyebrow">Prova do módulo · autoral</span>
        <h2>Concentre-se até encerrar.</h2>
        <p>
          Somente itens Concurso e FGV Elite A–E. O gabarito e as explicações ficam disponíveis
          depois do encerramento. Não é um simulado oficial completo.
        </p>
        <label className="field-label">
          Recorte
          <select
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value);
              setCount(10);
            }}
          >
            <option value="">Módulo completo de Cartografia</option>
            {content.units.map((u) => (
              <option value={u.id} key={u.id}>
                {u.title}
              </option>
            ))}
          </select>
        </label>
        <div className="two-fields">
          <label className="field-label">
            Questões
            <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
              {[5, 10, 20, 30]
                .filter((n) => n <= pool.length)
                .map((n) => (
                  <option key={n}>{n}</option>
                ))}
            </select>
          </label>
          <label className="field-label">
            Duração de treino (min)
            <input
              type="number"
              min={1}
              max={300}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
          </label>
        </div>
        <p>
          {pool.length} itens disponíveis ·{' '}
          {pool.filter((q) => !questionExposure(content, state, q.id)).length} ainda não vistos. A
          montagem prioriza novidade e diversidade de missões; não repete IDs na mesma prova.
        </p>
        <button
          className="primary"
          disabled={count > pool.length || minutes < 1 || minutes > 300}
          onClick={() =>
            update((s) => {
              s.exam = makeExam(content, s, count, minutes, Date.now(), unit || undefined);
            })
          }
        >
          Iniciar prova do piloto
        </button>
        <p className="micro">
          Questões autorais revisadas. Esta prova cobre Cartografia; o simulado completo exige todas
          as áreas.
        </p>
        <details>
          <summary>Perfil oficial SEDUC-PA e estoque necessário</summary>
          <p>
            Blueprint: 60 objetivas, duas discursivas de 15–30 linhas e duração total de 5 horas.
            Este piloto não migra os outros módulos.
          </p>
          <table>
            <thead>
              <tr>
                <th>Área</th>
                <th>Necessárias</th>
                <th>Aprovadas disponíveis</th>
              </tr>
            </thead>
            <tbody>
              {blueprintAvailability({ geografia: examPool(content, undefined, true).length }).map(
                (row) => (
                  <tr key={row.area}>
                    <td>{row.area}</td>
                    <td>{row.required}</td>
                    <td>{row.available}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
          <p>
            Estoque insuficiente para gerar o perfil oficial. Não usamos Fixação para completar a
            prova nem repetimos questões para atingir 60.
          </p>
        </details>
      </div>
    );
  }
  const qs = exam.ids.map((id) => content.questions.find((q) => q.id === id)).filter((q) => !!q);
  if (qs.length !== exam.ids.length)
    return (
      <div className="panel">
        <p>
          A prova salva usa um banco diferente. Exporte o histórico antes de preparar outra prova.
        </p>
        <button
          onClick={() =>
            update((s) => {
              delete s.exam;
            })
          }
        >
          Encerrar sessão incompatível
        </button>
      </div>
    );
  if (exam.finished) {
    const hits = qs.filter((q) => exam.answers[q.id] === q.correct).length,
      missed = qs.filter((q) => exam.answers[q.id] !== q.correct);
    return (
      <>
        <section className="panel">
          <span className="eyebrow">Correção liberada</span>
          <h2>
            {hits} de {qs.length} respostas corretas
          </h2>
          <p>
            {exam.novelty} itens eram inéditos nesta prova · tempo utilizado:{' '}
            {timeLeft(exam.finished - exam.started)}.
          </p>
          <p>
            Um resultado isolado não comprova domínio nem prontidão para o concurso. Confira os
            mecanismos e retome os conceitos após intervalo.
          </p>
          <details>
            <summary>Resultados por missão e nível</summary>
            {content.missions
              .filter((m) => qs.some((q) => q.mission === m.id))
              .map((m) => (
                <p key={m.id}>
                  {m.title}:{' '}
                  {qs.filter((q) => q.mission === m.id && exam.answers[q.id] === q.correct).length}/
                  {qs.filter((q) => q.mission === m.id).length}
                </p>
              ))}
            {['concurso', 'elite'].map((p) => (
              <p key={p}>
                {p}: {qs.filter((q) => q.pool === p && exam.answers[q.id] === q.correct).length}/
                {qs.filter((q) => q.pool === p).length}
              </p>
            ))}
          </details>
          <p>
            {missed.length} itens precisam de recuperação.{' '}
            <a href="#/caderno">Abrir Caderno Global de Erros</a>.
          </p>
          <button
            onClick={() =>
              update((s) => {
                delete s.exam;
              })
            }
          >
            Preparar outra prova
          </button>
        </section>
        {qs.map((q, i) => (
          <details className="result-question" key={q.id}>
            <summary>
              Questão {i + 1} ·{' '}
              {exam.answers[q.id] === q.correct
                ? 'correta'
                : exam.answers[q.id]
                  ? 'revisar'
                  : 'sem resposta'}
            </summary>
            <h3>{q.prompt}</h3>
            <Feedback
              content={content}
              q={q}
              choice={exam.answers[q.id]}
              omitted={!exam.answers[q.id]}
            />
          </details>
        ))}
      </>
    );
  }
  const original = qs[Math.min(exam.current, qs.length - 1)],
    ordered = {
      ...original,
      options: (exam.optionOrder[original.id] || original.options.map((o) => o.id))
        .map((id) => original.options.find((o) => o.id === id)!)
        .filter(Boolean),
    };
  return (
    <>
      <div className="exam-bar">
        <span role="timer" aria-label="Tempo restante de prova">
          {timeLeft(exam.deadline - now)}
        </span>
        <span>
          {Object.keys(exam.answers).length}/{qs.length} respondidas
        </span>
        <span>Correção ao encerrar</span>
      </div>
      <article className="exercise">
        <p className="eyebrow">
          Questão {exam.current + 1} de {qs.length}
        </p>
        <QuestionForm
          q={ordered}
          choice={exam.answers[original.id]}
          onChange={(id) =>
            update((s) => {
              if (s.exam?.id !== exam.id || s.exam.finished) return;
              if (Date.now() >= s.exam.deadline) {
                finishExam(s, content, Date.now());
                return;
              }
              s.exam.answers[original.id] = id;
            })
          }
        />
        <div className="button-row">
          <button
            disabled={exam.current === 0}
            onClick={() =>
              update((s) => {
                s.exam!.current--;
              })
            }
          >
            Anterior
          </button>
          <button
            disabled={exam.current === qs.length - 1}
            onClick={() =>
              update((s) => {
                s.exam!.current++;
              })
            }
          >
            Próxima
          </button>
        </div>
        <details>
          <summary>Navegar pelas questões</summary>
          <div className="question-grid">
            {qs.map((q, i) => (
              <button
                key={q.id}
                aria-label={`Ir à questão ${i + 1}${exam.answers[q.id] ? ', respondida' : ''}`}
                aria-current={i === exam.current ? 'step' : undefined}
                onClick={() =>
                  update((s) => {
                    s.exam!.current = i;
                  })
                }
              >
                {i + 1}
                {exam.answers[q.id] ? ' ✓' : ''}
              </button>
            ))}
          </div>
        </details>
      </article>
      <details className="panel">
        <summary>Encerrar e liberar correção</summary>
        <p>
          {qs.length - Object.keys(exam.answers).length} questão(ões) sem resposta. Encerrar
          registra também as omissões como itens a recuperar.
        </p>
        <button
          className="primary"
          onClick={() => update((s) => finishExam(s, content, Date.now()))}
        >
          Confirmar encerramento da prova
        </button>
      </details>
    </>
  );
}
function formativeError(
  s: State,
  mission: string,
  concept: string,
  unit: UnitId,
  item: string,
  description: string,
  at: number,
) {
  const key = concept + ':E8';
  let e = s.errors[key];
  if (!e) {
    e = {
      id: key,
      concept,
      mission,
      unit,
      type: 'E8',
      misconception: description,
      status: 'aberto',
      first: at,
      last: at,
      count: 0,
      itemIds: [],
      events: [],
      delayedItems: [],
      falseMastery: false,
    };
    s.errors[key] = e;
  }
  e.count++;
  e.last = at;
  e.status = 'aberto';
  if (!e.itemIds.includes(item)) e.itemIds.push(item);
  e.events.push({ at, item, correct: false, note: 'Autoavaliação formativa: ' + description });
}
function wrappedLines(text: string) {
  return text ? text.split('\n').flatMap((line) => line.match(/.{1,60}/gu) || ['']) : [];
}
const universal = [
  'Aderência ao comando',
  'Precisão conceitual',
  'Relação e análise',
  'Exemplo/aplicação escolar',
  'Organização e concisão',
  'Clareza da linguagem',
];
function WritingExercise({ item }: { item: Writing }) {
  const { content, state, update, notify } = useV6(),
    key = 'writing:' + item.id,
    text = state.drafts[key] || '',
    active = state.drafts[key + ':submitted'],
    submission = state.writingHistory.find((h) => h.id === active),
    [medium, setMedium] = useState('digital');
  const lines = wrappedLines(text),
    criteria = [...item.rubric, ...universal];
  let checks: number[] = [];
  try {
    const candidate = JSON.parse(state.drafts[key + ':rubric'] || 'null') || submission?.rubric;
    checks = Array.isArray(candidate) ? candidate.map((n) => ([0, 1, 2].includes(n) ? n : -1)) : [];
  } catch {
    checks = [];
  }
  const setChecks = (fn: (a: number[]) => number[]) =>
    update((s) => {
      s.drafts[key + ':rubric'] = JSON.stringify(fn([...checks]));
    });
  return (
    <article className="panel writing-exercise">
      <h2>{item.prompt}</h2>
      <p>
        Treino de resposta entre 15 e 30 linhas. Rubrica pedagógica da plataforma, sem nota oficial
        FGV.
      </p>
      <div className="segmented">
        <button aria-pressed={medium === 'digital'} onClick={() => setMedium('digital')}>
          Editor digital
        </button>
        <button aria-pressed={medium === 'manuscrito'} onClick={() => setMedium('manuscrito')}>
          Manuscrito em papel
        </button>
      </div>
      {medium === 'manuscrito' && (
        <p>
          Escreva numa folha, respeite 15–30 linhas e transcreva depois para guardar e comparar. O
          contador digital não mede sua caligrafia.
        </p>
      )}
      <label className="field-label" htmlFor={key}>
        Sua resposta antes do modelo
      </label>
      <textarea
        id={key}
        className="writing-editor"
        rows={15}
        disabled={!!submission}
        value={text}
        onChange={(e) =>
          update((s) => {
            s.drafts[key] = e.target.value;
          })
        }
      />
      <p role="status" className={lines.length < 15 || lines.length > 30 ? 'line-alert' : 'micro'}>
        {lines.length} linhas estimadas · {text.trim() ? text.trim().split(/\s+/).length : 0}{' '}
        palavras.{' '}
        {lines.length < 15
          ? 'Abaixo de 15: no perfil oficial há risco de nota zero.'
          : lines.length > 30
            ? 'Acima de 30: o excedente fica fora da prévia de prova.'
            : 'Dentro da faixa de treino.'}
      </p>
      <details>
        <summary>Prévia de 30 linhas e regra de contagem</summary>
        <p>
          Estimativa com 60 caracteres por linha e quebras explícitas. A folha oficial e a
          caligrafia podem produzir outra contagem.
        </p>
        <ol className="paper-preview">
          {Array.from({ length: 30 }, (_, i) => (
            <li key={i}>{lines[i] || ' '}</li>
          ))}
        </ol>
        {lines.length > 30 && <p>Há {lines.length - 30} linha(s) fora da prévia.</p>}
      </details>
      {!submission ? (
        <button
          className="primary"
          disabled={text.trim().length < 40}
          onClick={() =>
            update((s) => {
              const id = crypto.randomUUID();
              s.writingHistory.push({
                id,
                item: item.id,
                at: Date.now(),
                text,
                rubric: [],
                medium,
              });
              s.drafts[key + ':submitted'] = id;
            })
          }
        >
          Finalizar tentativa e conferir modelo
        </button>
      ) : (
        <>
          <div className="feedback">
            <h3>Modelo orientador e pontos esperados</h3>
            <p>{item.model}</p>
            <p>
              Compare sua resposta preservada com os pontos abaixo. O modelo não é espelho oficial e
              não existe correção automática da qualidade do texto.
            </p>
          </div>
          <fieldset className="rubric">
            <legend>Autoavaliação formativa</legend>
            {criteria.map((label, i) => (
              <label key={label}>
                {label}
                <select
                  value={checks[i] ?? -1}
                  onChange={(e) =>
                    setChecks((a) => {
                      const b = [...a];
                      b[i] = Number(e.target.value);
                      return b;
                    })
                  }
                >
                  <option value={-1}>Escolha após comparar</option>
                  <option value={0}>Ausente ou incorreto</option>
                  <option value={1}>Parcial</option>
                  <option value={2}>Presente e consistente</option>
                </select>
                {checks[i] === 0 && (
                  <small>
                    Retome este ponto no modelo e reescreva uma frase ou exemplo que o demonstre.
                  </small>
                )}
                {checks[i] === 1 && (
                  <small>
                    Explicite o mecanismo e conecte-o ao comando; uma palavra isolada não basta.
                  </small>
                )}
                {checks[i] === 2 && (
                  <small>
                    Verifique se há evidência no seu texto e se a formulação permanece precisa.
                  </small>
                )}
              </label>
            ))}
          </fieldset>
          <button
            disabled={criteria.some((_, i) => (checks[i] ?? -1) < 0)}
            onClick={() => {
              update((s) => {
                const h = s.writingHistory.find((h) => h.id === active)!;
                h.rubric = checks;
                const mission = content.missions.find((m) => m.id === item.mission)!;
                if (checks.some((v) => v === 0))
                  formativeError(
                    s,
                    mission.id,
                    mission.conceptIds[0],
                    item.unit,
                    item.id,
                    'Discursiva: pontos ausentes ou imprecisos na rubrica.',
                    Date.now(),
                  );
                else if (!s.awards['writing:' + item.id])
                  s.awards['writing:' + item.id] = {
                    at: Date.now(),
                    xp: 20,
                    reason: 'Discursiva revisada por rubrica',
                  };
              });
              notify('Rubrica registrada. Preserve o texto e tente novamente após revisar.');
            }}
          >
            Registrar rubrica
          </button>
          {submission.rubric.length > 0 && (
            <p role="status">
              Rubrica registrada: {submission.rubric.reduce((a, b) => a + b, 0)}/
              {criteria.length * 2} pontos formativos. Não equivale à nota FGV.
            </p>
          )}
          <button
            className="quiet"
            onClick={() =>
              update((s) => {
                delete s.drafts[key + ':submitted'];
                s.drafts[key] = '';
                delete s.drafts[key + ':rubric'];
              })
            }
          >
            Nova tentativa, mantendo o histórico
          </button>
        </>
      )}
      <Provenance refs={item.refs} />
    </article>
  );
}
export function Discursive() {
  const { content, state, route } = useV6();
  const items = content.writing.filter((w) => w.unit === route.unit),
    [id, setId] = useState(
      items
        .slice()
        .sort(
          (a, b) =>
            (state.writingHistory.filter((h) => h.item === a.id).at(-1)?.at || 0) -
            (state.writingHistory.filter((h) => h.item === b.id).at(-1)?.at || 0),
        )[0]?.id,
    );
  const item = items.find((w) => w.id === id) || items[0];
  return (
    <>
      <label className="field-label">
        Proposta rotativa
        <select value={item.id} onChange={(e) => setId(e.target.value)}>
          {items.map((x, i) => (
            <option key={x.id} value={x.id}>
              Proposta {i + 1} · {state.writingHistory.filter((h) => h.item === x.id).length}{' '}
              tentativa(s)
            </option>
          ))}
        </select>
      </label>
      <WritingExercise key={item.id} item={item} />
      <details className="panel">
        <summary>Histórico de respostas desta unidade</summary>
        {state.writingHistory
          .filter((h) => items.some((i) => i.id === h.item))
          .map((h) => (
            <article key={h.id}>
              <h3>
                {new Date(h.at).toLocaleString('pt-BR')} · {h.medium}
              </h3>
              <p className="preserve-lines">{h.text}</p>
              <p>Rubrica: {h.rubric.length ? h.rubric.join(', ') : 'ainda não registrada'}</p>
            </article>
          ))}
      </details>
    </>
  );
}
export function Practical() {
  const { content, state, update, notify } = useV6(),
    p = state.practical,
    now = useNow(!!p.deadline && ['plano', 'defesa'].includes(p.phase));
  const practice = content.support?.teaching_practice[0];
  if (!practice) return <p>Atividade de aula indisponível nesta edição.</p>;
  const planFields = practice.plan_fields,
    practiceRubric = practice.rubric;
  const checks = p.checks;
  const setChecks = (fn: (a: number[]) => number[]) =>
    update((s) => {
      s.practical.checks = fn([...s.practical.checks]);
    });
  const fields = Object.fromEntries(
    planFields.map(([id]) => [id, state.drafts['practice:' + id] || '']),
  );
  const chosen = content.missions.find((m) => m.id === practice.mission)!;
  return (
    <>
      <section className="panel">
        <span className="eyebrow">Professor em ação · treino autoral</span>
        <h2>{practice.title}</h2>
        <p>{practice.instructions[0]}</p>
        <label className="field-label">
          Tema
          <input
            value={p.topic}
            disabled={p.phase !== 'plano'}
            onChange={(e) =>
              update((s) => {
                s.practical.topic = e.target.value;
              })
            }
          />
        </label>
        <div className="two-fields">
          <label>
            Planejamento (min de treino)
            <input
              type="number"
              min={1}
              max={180}
              value={p.planMinutes}
              disabled={!!p.started}
              onChange={(e) =>
                update((s) => {
                  s.practical.planMinutes = Number(e.target.value);
                })
              }
            />
          </label>
          <label>
            Defesa (min de treino)
            <input
              type="number"
              min={1}
              max={60}
              value={p.defenseMinutes}
              disabled={!!p.started}
              onChange={(e) =>
                update((s) => {
                  s.practical.defenseMinutes = Number(e.target.value);
                })
              }
            />
          </label>
        </div>
        <p className="micro">{practice.instructions[1]}</p>
        {p.deadline && ['plano', 'defesa'].includes(p.phase) && (
          <p role="timer">
            {p.phase === 'plano' ? 'Planejamento' : 'Defesa'}: {timeLeft(p.deadline - now)}{' '}
            {now >= p.deadline ? '· tempo de treino encerrado; avance quando estiver pronto.' : ''}
          </p>
        )}
        {p.phase === 'plano' && (
          <>
            <p>{practice.instructions[2]}</p>
            {!p.started && (
              <button
                disabled={
                  p.planMinutes < 1 ||
                  p.planMinutes > 180 ||
                  p.defenseMinutes < 1 ||
                  p.defenseMinutes > 60 ||
                  !p.topic.trim()
                }
                onClick={() =>
                  update((s) => {
                    s.practical.started = Date.now();
                    s.practical.deadline = Date.now() + p.planMinutes * 60_000;
                  })
                }
              >
                Iniciar planejamento
              </button>
            )}
            {planFields.map(([id, label, hint]) => (
              <label className="field-label" key={id}>
                {label}
                <small>{hint}</small>
                <textarea
                  value={fields[id]}
                  onChange={(e) =>
                    update((s) => {
                      s.drafts['practice:' + id] = e.target.value;
                    })
                  }
                />
              </label>
            ))}
            <button
              className="primary"
              disabled={!p.started || Object.values(fields).some((t) => t.trim().length < 3)}
              onClick={() =>
                update((s) => {
                  s.practical.phase = 'defesa';
                  s.practical.deadline = Date.now() + p.defenseMinutes * 60_000;
                })
              }
            >
              Guardar plano e iniciar defesa oral
            </button>
          </>
        )}
        {p.phase === 'defesa' && (
          <>
            <h3>Defenda suas escolhas</h3>
            <p>{practice.instructions[3]}</p>
            <details>
              <summary>Consultar a transcrição do plano</summary>
              {planFields.map(([id, label]) => (
                <p key={id}>
                  <b>{label}:</b> {fields[id]}
                </p>
              ))}
            </details>
            <button
              className="primary"
              onClick={() =>
                update((s) => {
                  s.practical.phase = 'rubrica';
                  delete s.practical.deadline;
                })
              }
            >
              Finalizar defesa e abrir rubrica
            </button>
          </>
        )}
        {p.phase === 'rubrica' && (
          <>
            <h3>Autoavaliação do plano e da defesa</h3>
            {practiceRubric.map(([label, feedback], i) => (
              <label className="field-label" key={label}>
                {i < 4 ? 'Plano' : 'Defesa'} · {label}
                <select
                  value={checks[i] ?? -1}
                  onChange={(e) =>
                    setChecks((a) => {
                      const n = [...a];
                      n[i] = Number(e.target.value);
                      return n;
                    })
                  }
                >
                  <option value={-1}>Escolha após refletir</option>
                  <option value={0}>Precisa reconstruir</option>
                  <option value={1}>Parcial</option>
                  <option value={2}>Consistente</option>
                </select>
                <small>{feedback}</small>
              </label>
            ))}
            <button
              className="primary"
              disabled={practiceRubric.some((_, i) => (checks[i] ?? -1) < 0)}
              onClick={() => {
                update((s) => {
                  s.practicalHistory.push({
                    id: crypto.randomUUID(),
                    at: Date.now(),
                    topic: p.topic,
                    fields,
                    rubric: checks,
                  });
                  s.practical.checks = checks;
                  s.practical.phase = 'concluida';
                  if (checks.some((v) => v === 0))
                    formativeError(
                      s,
                      chosen.id,
                      chosen.conceptIds[0],
                      chosen.unit,
                      'v6-practice:escala',
                      'Prática: dimensão do plano ou da defesa precisa de reconstrução.',
                      Date.now(),
                    );
                  else if (!s.awards['practical:cartografia-piloto'])
                    s.awards['practical:cartografia-piloto'] = {
                      at: Date.now(),
                      xp: 25,
                      reason: 'Plano e defesa revistos por rubrica',
                    };
                });
                notify('Plano, defesa e rubrica registrados.');
              }}
            >
              Registrar prática e feedback
            </button>
          </>
        )}
        {p.phase === 'concluida' && (
          <>
            <div className="feedback">
              <h3>Prática registrada</h3>
              <p>
                Plano: {p.checks.slice(0, 4).reduce((a, b) => a + b, 0)}/8 · defesa:{' '}
                {p.checks.slice(4).reduce((a, b) => a + b, 0)}/12 pontos formativos. Não equivalem à
                nota da banca.
              </p>
              {practiceRubric
                .filter((_, i) => p.checks[i] < 2)
                .map(([label, feedback]) => (
                  <p key={label}>
                    <b>Retomar {label}:</b> {feedback}
                  </p>
                ))}
              <p>
                Exemplo para aperfeiçoar: compare o que 1 cm representa em 1:25.000 e em
                1:1.000.000, peça à turma uma escolha justificada para localizar lotes e verifique a
                relação entre denominador e detalhe.
              </p>
            </div>
            <button
              onClick={() =>
                update((s) => {
                  s.practical = {
                    ...s.practical,
                    phase: 'plano',
                    started: undefined,
                    deadline: undefined,
                    checks: [],
                  };
                })
              }
            >
              Novo ciclo mantendo o histórico
            </button>
          </>
        )}
      </section>
      <details className="panel">
        <summary>Roteiros históricos preservados e exemplos de abertura</summary>
        {content.supplements
          .filter((x) => x.kind === 'teacherBox')
          .map((x) => (
            <div key={x.id}>
              <p>
                {x.mission === 'escalas-e-medidas'
                  ? 'Roteiro: frações, distância, detalhe e escolha de uso.'
                  : 'Roteiro: dois quadrados, bairro e Brasil, comparação de escalas e checagem.'}
              </p>
              <LegacyTeacher html={x.html} />
              <Provenance refs={x.refs} />
            </div>
          ))}
      </details>
      <details className="panel">
        <summary>Histórico da prática</summary>
        {state.practicalHistory.map((h) => (
          <div key={h.id}>
            <h3>
              {h.topic} · {new Date(h.at).toLocaleString('pt-BR')}
            </h3>
            {planFields.map(([id, label]) => (
              <p key={id}>
                <b>{label}:</b> {h.fields[id]}
              </p>
            ))}
            <p>Rubrica de treino: {h.rubric.join(', ')}</p>
          </div>
        ))}
      </details>
    </>
  );
}
// Sanitized at build time; rendering uses the same component as preserved theory.
import { Html as LegacyTeacher } from './components';
export function Exam() {
  const [tab, setTab] = useState('objetiva');
  return (
    <>
      <div className="unit-heading">
        <span className="eyebrow">Prova · desempenho em contexto</span>
        <h1>Aplique com autonomia.</h1>
        <p>
          Escolha um formato. Objetivas, escrita e prática têm registros e devolutivas próprios.
        </p>
      </div>
      <div className="segmented exam-tabs" aria-label="Formatos de prova">
        {[
          ['objetiva', 'Objetiva'],
          ['discursiva', 'Discursiva'],
          ['pratica', 'Prática de aula'],
        ].map(([id, label]) => (
          <button key={id} aria-pressed={tab === id} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'objetiva' ? <Objective /> : tab === 'discursiva' ? <Discursive /> : <Practical />}
    </>
  );
}
