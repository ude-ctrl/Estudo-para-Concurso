import { useState } from 'react';
import { ArrowRight, BookOpen, Check, RotateCcw } from 'lucide-react';
import { useV6 } from './context';
import { CompassArt, Html, ModeLink, Provenance, EditorialSources, studyLink } from './components';
import { attempt, mastery, priorityErrors } from './engine';
import { describeMilestone } from './recognition';
import { trainingHref, trainingSessionMatches } from './training-session';
import type { Recall, UnitId } from './types';
import { JourneyMap, ProgressionPanel, ResponseSignal } from './SensoryUI';
export function Mastery({ unit }: { unit: UnitId }) {
  const { content, state } = useV6();
  const m = mastery(content, state, unit);
  return (
    <div className="mastery">
      <span className="eyebrow">{m.label}</span>
      <strong>{m.score === null ? 'Em construção' : m.score + '%'}</strong>
      <p>
        Confiança {m.confidence}. {m.requirements}
      </p>
      <details>
        <summary>Entender esta estimativa</summary>
        <p>
          É uma heurística de treino, não uma previsão de aprovação. XP e leitura não entram na
          nota.
        </p>
        <p>
          45% qualidade das respostas + 30% retenção após intervalo + 15% recuperação de erros + 10%
          cobertura por conceito. Conceitos ainda sem evidência reduzem a cobertura.
        </p>
        <p>
          {m.distinct} questões distintas · {m.delayed} evidências após intervalo · {m.coverage}%
          dos conceitos cobertos.
        </p>
        {m.byConcept.map((c) => (
          <p key={c.id}>
            {c.name}: {c.count ? `${c.count} respostas elegíveis` : 'sem evidência objetiva'}
          </p>
        ))}
      </details>
    </div>
  );
}
export function Home() {
  const { content, state, quiet } = useV6(),
    resume = state.resume;
  const due = content.cards.filter((c) => state.reviews[c.id]?.due <= Date.now()).length;
  const dueUnit = content.cards.find((c) => state.reviews[c.id]?.due <= Date.now())?.unit;
  const first = content.units[0].id,
    eligible = state.evidence.filter(
      (e) => e.eligible && ['fixacao', 'concurso', 'elite', 'exam', 'boss'].includes(e.kind),
    );
  const sections = content.missions.flatMap((m) => m.sections),
    read = sections.filter((x) => state.read[x.id]).length;
  const nextMission =
    content.missions.find((m) => m.id === resume?.mission) ||
    content.missions.find((m) => m.unit === resume?.unit) ||
    content.missions[0];
  const canResumeTraining =
    resume?.mode === 'treino' &&
    trainingSessionMatches(content, state.session, { unit: resume.unit });
  const resumeHref =
    resume?.mode === 'treino'
      ? trainingHref(
          resume.unit,
          canResumeTraining ? '' : resume.mission,
          canResumeTraining ? undefined : resume.pool,
        )
      : resume
        ? `#/unidade/${resume.unit}/${resume.mode}${resume.mission ? '?missao=' + resume.mission : ''}`
        : '';
  const weak = priorityErrors(state)
    .filter((e) => e.status !== 'dominado-apos-erro')
    .slice(0, 3);
  return (
    <>
      <div className="welcome">
        <span className="eyebrow">Hoje · Seu percurso V6</span>
        <h1>
          Leia o mundo.
          <br />
          <em>Domine a linguagem dos mapas.</em>
        </h1>
        <p>
          Um percurso de Cartografia e Geotecnologias, com profundidade para estudar e clareza para
          continuar.
        </p>
        <CompassArt />
        <div className="next-step-context">
          <span className="eyebrow">
            {due ? 'Revisão que precisa de você' : 'Seu próximo passo'}
          </span>
          <strong>{due ? `${due} cartões para recuperar de memória` : nextMission.title}</strong>
          <span>{content.units.find((u) => u.id === (dueUnit || nextMission.unit))?.title}</span>
        </div>
        <a
          className="button primary"
          href={
            dueUnit
              ? `#/unidade/${dueUnit}/revisao`
              : resume
                ? resumeHref
                : `#/unidade/${first}/estudo`
          }
        >
          {due
            ? `Revisar ${due} cartões vencidos`
            : resume
              ? 'Continuar de onde parei'
              : 'Começar pelos fundamentos'}{' '}
          <ArrowRight size={18} />
        </a>
        <a
          className="quiet-link"
          href={due && resume ? resumeHref : `#/unidade/${resume?.unit || first}/revisao`}
        >
          {due && resume ? 'Continuar meu percurso' : 'Preparar minha revisão'}
        </a>
      </div>
      <nav className="learning-path" aria-label="Percurso de aprendizagem">
        <span>Seu método</span>
        <a href={`#/unidade/${resume?.unit || first}/treino?banco=diagnostico`}>Diagnosticar</a>
        <span aria-hidden="true">→</span>
        <a href={studyLink(content, nextMission.id)}>Estudar e evocar</a>
        <span aria-hidden="true">→</span>
        <a href={`#/unidade/${resume?.unit || first}/treino?missao=${nextMission.id}`}>
          Treinar e corrigir
        </a>
        <span aria-hidden="true">→</span>
        <a href={`#/unidade/${resume?.unit || first}/revisao`}>Revisar após intervalo</a>
      </nav>
      <JourneyMap current={nextMission.id} />
      {weak.length > 0 && (
        <section className="weak-points">
          <h2>Transforme dificuldades em próximos passos</h2>
          {weak.map((e) => (
            <a key={e.id} href={studyLink(content, e.mission)}>
              <strong>{content.concepts.find((c) => c.id === e.concept)?.name}</strong>
              <span>{e.count} registro(s) · recuperar o conceito e treinar novamente →</span>
            </a>
          ))}
        </section>
      )}
      <div className="metrics" aria-label="Visão do seu percurso">
        <div>
          <span>Leitura registrada</span>
          <strong>
            {read}/{sections.length}
          </strong>
          <small>explicações estudadas</small>
        </div>
        <div>
          <span>Acerto no treino</span>
          <strong>
            {eligible.length
              ? Math.round((eligible.filter((e) => e.correct).length / eligible.length) * 100) + '%'
              : '—'}
          </strong>
          <small>{eligible.length} tentativas elegíveis</small>
        </div>
        <div>
          <span>Domínio estimado</span>
          <strong>
            {content.units.some((u) => mastery(content, state, u.id).score !== null)
              ? 'Ver por unidade'
              : 'Dados insuficientes'}
          </strong>
          <small>Com cobertura e confiança</small>
        </div>
      </div>
      <div className="section-title">
        <div>
          <span className="eyebrow">Módulo 02</span>
          <h2>Cartografia e Geotecnologias</h2>
        </div>
        <span className="micro">3 unidades · 17 missões</span>
      </div>
      <div className="unit-grid">
        {content.units.map((u, i) => {
          const ms = content.missions.filter((m) => m.unit === u.id),
            ss = ms.flatMap((m) => m.sections),
            n = ss.filter((x) => state.read[x.id]).length;
          return (
            <article className="unit-card" key={u.id}>
              <div className="unit-number">
                0{i + 1}
                <BookOpen size={23} />
              </div>
              <h3>
                <a href={`#/unidade/${u.id}/estudo`}>{u.title}</a>
              </h3>
              <p>{u.description}</p>
              <div className="unit-progress">
                <progress value={n} max={ss.length} aria-label={'Leitura em ' + u.title} />
                <small>
                  {n} de {ss.length} explicações · {ms.length} missões
                </small>
              </div>
              <ModeLink className="button subtle" unit={u.id} mode="estudo">
                Entrar na unidade <ArrowRight size={16} />
              </ModeLink>
            </article>
          );
        })}
      </div>
      <div className="next-actions">
        <article>
          <RotateCcw size={22} />
          <h3>Erros viram caminho de revisão</h3>
          <p>Retome a confusão, explique o mecanismo e teste novamente após um intervalo.</p>
          <a href="#/caderno">Abrir Caderno Global de Erros →</a>
        </article>
        {!quiet && (
          <article className="progression-card">
            <ProgressionPanel />
            <details>
              <summary>Como os pontos funcionam</summary>
              <p>
                Abrir páginas, virar cartões e repetir respostas imediatamente não gera XP. Os
                pontos valorizam recuperação, revisão vencida e melhora após intervalo.
              </p>
              <ul>
                {Object.entries(state.awards)
                  .slice(-8)
                  .map(([id, a]) => (
                    <li key={id}>
                      {a.reason}: {a.xp} XP
                    </li>
                  ))}
              </ul>
            </details>
            <details className="milestone-history">
              <summary>Seus marcos de aprendizagem</summary>
              {Object.keys(state.milestones || {}).length ? (
                <ul>
                  {Object.entries(state.milestones || {})
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 8)
                    .map(([id, at]) => {
                      const milestone = describeMilestone(id, content);
                      return (
                        <li key={id}>
                          <strong>{milestone.title}</strong>
                          <p>{milestone.description}</p>
                          <small>{new Date(at).toLocaleDateString('pt-BR')}</small>
                        </li>
                      );
                    })}
                </ul>
              ) : (
                <p>
                  Os marcos aparecem ao concluir unidades com recuperação, superar Chefões, colocar
                  revisões vencidas em dia, recuperar erros de forma estável e manter dias de
                  prática significativa. Ler ou clicar sozinho não gera conquistas.
                </p>
              )}
            </details>
          </article>
        )}
      </div>
      <p className="pilot-note">
        Este ambiente reúne Cartografia revisada. Os demais módulos continuam disponíveis em{' '}
        <a href="./biblioteca.html">outros materiais</a>.
      </p>
    </>
  );
}
function RecallBox({ recall }: { recall: Recall }) {
  const { content, state, update } = useV6();
  const key = 'recall:' + recall.id,
    text = state.drafts[key] || '',
    tried = !!state.drafts[key + ':attempted'];
  const [show, setShow] = useState(false),
    [rated, setRated] = useState(false);
  return (
    <article className="recall">
      <span className="eyebrow">Recuperação ativa · sem alternativas</span>
      <h3>{recall.prompt}</h3>
      <label className="field-label" htmlFor={recall.id}>
        Sua tentativa de memória
      </label>
      <textarea
        id={recall.id}
        value={text}
        onChange={(e) =>
          update((s) => {
            s.drafts[key] = e.target.value;
          })
        }
        placeholder="Explique com suas palavras antes de consultar o modelo."
      />
      <button
        disabled={text.trim().length < 5}
        onClick={() => {
          update((s) => {
            s.drafts[key + ':attempted'] = 'sim';
          });
          setShow(true);
        }}
      >
        Registrar tentativa e conferir
      </button>
      {show && tried && (
        <div className="feedback">
          <ResponseSignal item={recall.id} />
          <p>{recall.model}</p>
          <details>
            <summary>Pontos para conferir na sua resposta</summary>
            <ul>
              {recall.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </details>
          <p>
            Compare o que escreveu com o modelo. A autoavaliação é evidência de treino e tem peso
            limitado.
          </p>
          <div className="button-row">
            {[
              ['Não consegui', false],
              ['Parcialmente', false],
              ['Consegui explicar', true],
            ].map(([label, correct]) => (
              <button
                disabled={rated}
                key={String(label)}
                onClick={() => {
                  update((s) =>
                    attempt(s, content, {
                      item: recall.id,
                      correct: !!correct,
                      kind: 'recall',
                      at: Date.now(),
                      context: String(label),
                    }),
                  );
                  setRated(true);
                }}
              >
                {String(label)}
              </button>
            ))}
          </div>
          {rated && (
            <p role="status">
              Evocação registrada. Retome depois de um intervalo para verificar retenção.
            </p>
          )}
          <Provenance refs={recall.refs} />
        </div>
      )}
    </article>
  );
}
export function Study() {
  const { content, state, route, update, go } = useV6(),
    ms = content.missions.filter((m) => m.unit === route.unit),
    m = ms.find((m) => m.id === route.mission) || ms[0];
  const index = ms.indexOf(m),
    sections = [...m.sections].sort((a, b) => Number(!a.primary) - Number(!b.primary));
  return (
    <>
      <div className="unit-heading">
        <span className="eyebrow">
          Estudo · missão {index + 1} de {ms.length}
        </span>
        <h1>{m.title}</h1>
        <p>{m.goal}</p>
      </div>
      <details className="outline">
        <summary>Escolher missão nesta unidade</summary>
        <JourneyMap unit={route.unit} current={m.id} />
      </details>
      <div className="study-layout">
        <div className="reading-column">
          {sections.map((sec, i) => (
            <details
              className="reading-section"
              data-resource-id={sec.id}
              key={sec.id}
              open={i === 0 || undefined}
            >
              <summary>
                <span>
                  {sec.title}
                  <small>
                    {state.read[sec.id]
                      ? 'Leitura registrada'
                      : sec.primary
                        ? 'Explicação principal'
                        : 'Aprofundamento e aplicação'}
                  </small>
                </span>
              </summary>
              <div className="reading-body">
                <p className="hook">{sec.hook}</p>
                <Html html={sec.html} />
                {content.support?.editorial_notes
                  .filter((note) => note.target === sec.id)
                  .map((note) => (
                    <aside className="editorial-note" key={note.id}>
                      {note.text}
                    </aside>
                  ))}
                <button
                  className={state.read[sec.id] ? 'subtle' : 'primary'}
                  onClick={() =>
                    update((s) => {
                      s.read[sec.id] = Date.now();
                    })
                  }
                >
                  {state.read[sec.id] ? (
                    <>
                      <Check size={16} /> Leitura registrada
                    </>
                  ) : (
                    'Registrar que estudei esta explicação'
                  )}
                </button>
                {state.read[sec.id] && (
                  <a
                    className="concept-practice"
                    href={`#/unidade/${route.unit}/treino?missao=${m.id}`}
                  >
                    Testar este raciocínio sem consulta <ArrowRight size={16} />
                  </a>
                )}
                <Provenance refs={sec.refs} />
              </div>
            </details>
          ))}
          {m.recalls.length > 0 && (
            <section className="recall-group">
              <h2>Agora, recupere sem olhar</h2>
              <p>Escolha uma pergunta. Escrever uma tentativa vem antes de conferir o modelo.</p>
              {m.recalls.map((r) => (
                <details key={r.id}>
                  <summary>{r.prompt}</summary>
                  <RecallBox recall={r} />
                </details>
              ))}
            </section>
          )}
          <div className="study-next">
            <h2>Transforme leitura em recuperação</h2>
            <p>
              A leitura registrada mede seu percurso. As respostas, revisões e a cobertura ajudam a
              estimar domínio.
            </p>
            <button className="primary" onClick={() => go(route.unit, 'treino', m.id)}>
              Praticar esta missão <ArrowRight size={16} />
            </button>
            {ms[index + 1] && (
              <a href={studyLink(content, ms[index + 1].id)}>
                Próxima missão: {ms[index + 1].title} →
              </a>
            )}
          </div>
        </div>
        <aside className="study-aside">
          <Mastery unit={route.unit} />
          <EditorialSources unit={route.unit} />
          <details>
            <summary>Revisão integradora e aplicação em aula</summary>
            {content.supplements
              .filter(
                (s) =>
                  s.kind !== 'discBox' &&
                  (s.mission === m.id ||
                    m.id === 'leitura-critica-integrada' ||
                    m.id === 'cartografia-escolar'),
              )
              .map((s) => (
                <div key={s.id}>
                  <Html html={s.html} />
                  <Provenance refs={s.refs} />
                </div>
              ))}
            <p>As discursivas e a prática de aula têm rascunhos e rubricas no ambiente Prova.</p>
          </details>
        </aside>
      </div>
    </>
  );
}
