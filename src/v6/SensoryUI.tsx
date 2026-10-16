import { Check, Compass, Flag, RotateCcw, Sparkles, Target, Volume2 } from 'lucide-react';
import { useV6 } from './context';
import { mastery, streak } from './engine';
import {
  bestStreak,
  expeditionComplete,
  missionJourney,
  personalLevel,
  sensoryPreferences,
} from './sensory';
import type { Experience, Sound, UnitId } from './types';

export function ExperienceControls() {
  const { state, update, previewSound } = useV6();
  const preferences = sensoryPreferences(state);
  return (
    <section className="panel experience-settings" aria-labelledby="experience-heading">
      <span className="eyebrow">Conforto de estudo</span>
      <h2 id="experience-heading">Escolha o ritmo da experiência</h2>
      <p>O conteúdo, o XP e os critérios de aprendizagem são os mesmos em todos os modos.</p>
      <label className="field-label">
        Experiência
        <select
          value={preferences.experience}
          onChange={(event) =>
            update((next) => {
              next.preferences.experience = event.target.value as Experience;
              if (event.target.value === 'focus') next.preferences.sound = 'off';
            })
          }
        >
          <option value="focus">Foco — feedback essencial, sem animações</option>
          <option value="balanced">Equilibrado — microanimações e checkpoints</option>
          <option value="immersive">Imersivo — celebrações mais expressivas</option>
        </select>
      </label>
      <label className="field-label">
        Efeitos sonoros
        <select
          value={preferences.sound}
          onChange={(event) =>
            update((next) => {
              next.preferences.sound = event.target.value as Sound;
            })
          }
        >
          <option value="off">Desligado</option>
          <option value="soft">Suave</option>
          <option value="immersive">Imersivo</option>
        </select>
      </label>
      <button disabled={preferences.sound === 'off'} onClick={previewSound}>
        <Volume2 size={18} aria-hidden="true" /> Ouvir exemplo de efeito
      </button>
      <p className="micro">
        Sem música de fundo. O som é opcional e fica desligado na Prova. A preferência de redução de
        movimento do sistema e o ajuste manual prevalecem sobre o modo Imersivo. Ao escolher Foco, o
        som é desligado; você pode habilitá-lo novamente se desejar.
      </p>
    </section>
  );
}

export function JourneyMap({ unit, current }: { unit?: UnitId; current?: string }) {
  const { content, state } = useV6();
  const now = Date.now();
  const units = content.units.filter((item) => !unit || item.id === unit);
  const active =
    current ||
    state.resume?.mission ||
    content.missions.find((mission) => !missionJourney(content, state, mission, now).complete)?.id;
  return (
    <section
      className={'journey-map' + (unit ? ' journey-compact' : '')}
      aria-label="Expedição Cartográfica"
    >
      <div className="journey-heading">
        <div>
          <span className="eyebrow">
            <Compass size={16} aria-hidden="true" /> Expedição Cartográfica
          </span>
          <h2>{unit ? 'Sua missão no percurso' : 'Um caminho, muitos raciocínios.'}</h2>
        </div>
        {!unit && (
          <a href="#/configuracoes" className="journey-settings">
            Ajustar experiência
          </a>
        )}
      </div>
      {units.map((item) => {
        const missions = content.missions.filter((mission) => mission.unit === item.id);
        const complete = missions.filter(
          (mission) => missionJourney(content, state, mission, now).complete,
        ).length;
        return (
          <details
            className="journey-unit"
            key={item.id}
            open={!!unit || missions.some((mission) => mission.id === active) || undefined}
          >
            <summary className="journey-unit-title">
              <span>{item.title}</span>
              <span>
                {complete}/{missions.length} checkpoints
              </span>
            </summary>
            <nav aria-label={'Missões de ' + item.title}>
              <ol className="journey-track">
                {missions.map((mission, index) => {
                  const node = missionJourney(content, state, mission, now);
                  const isCurrent = mission.id === active;
                  const Icon =
                    node.status === 'due'
                      ? RotateCcw
                      : node.status === 'fragile'
                        ? Target
                        : node.complete
                          ? Check
                          : Flag;
                  return (
                    <li key={mission.id} className={'journey-stop ' + node.status}>
                      <a
                        href={`#/unidade/${mission.unit}/estudo?missao=${mission.id}`}
                        aria-current={isCurrent ? 'step' : undefined}
                        aria-label={`${mission.title} — ${node.label}${isCurrent ? ' · missão atual' : ''}`}
                      >
                        <span className="journey-marker" aria-hidden="true">
                          {node.complete || node.status === 'due' || node.status === 'fragile' ? (
                            <Icon size={18} />
                          ) : (
                            index + 1
                          )}
                        </span>
                        <span className="journey-name">{mission.title}</span>
                        <span className="journey-status">
                          {isCurrent ? 'Atual · ' : ''}
                          {node.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </details>
        );
      })}
      <p className="journey-note">
        Cada ponto abre uma missão. Checkpoint significa leitura e recuperação; domínio exige
        evidência após intervalo. Todas as missões estão disponíveis.
      </p>
    </section>
  );
}

export function ProgressionPanel() {
  const { content, state, quiet } = useV6();
  if (quiet) return null;
  const level = personalLevel(state);
  return (
    <section className="progression-panel" aria-label="Ritmo e XP">
      <div className="progression-title">
        <Sparkles size={21} aria-hidden="true" />
        <h2>Seu ritmo deixa marcas.</h2>
      </div>
      <div className="level-line">
        <strong>Nível pessoal {level.level}</strong>
        <span>
          {level.xp} / {level.next} XP
        </span>
      </div>
      <progress
        value={level.progress}
        max={level.span}
        aria-label="XP até o próximo nível pessoal"
      />
      <p className="micro">
        O nível representa atividade acumulada. Não mede domínio nem prontidão para prova.
      </p>
      <div className="streak-pair">
        <span>
          Sequência atual <b>{streak(state, Date.now())} dia(s) de prática</b>
        </span>
        <span>
          Melhor sequência <b>{bestStreak(state)} dia(s)</b>
        </span>
      </div>
      {expeditionComplete(content, state) && <ExpeditionSummary />}
    </section>
  );
}

export function ExpeditionSummary() {
  const { content, state } = useV6();
  const completed = content.missions.filter(
    (mission) => missionJourney(content, state, mission, Date.now()).complete,
  ).length;
  const bosses = content.units.filter((unit) => state.milestones?.['boss:' + unit.id]).length;
  const converted = Object.values(state.errors).filter(
    (error) => error.status === 'dominado-apos-erro',
  ).length;
  const reviews = content.cards.map((card) => state.reviews[card.id]).filter(Boolean);
  const next = reviews
    .map((review) => review.due)
    .filter((due) => due > Date.now())
    .sort((a, b) => a - b)[0];
  return (
    <details className="expedition-summary">
      <summary>Expedição concluída · ver percurso e próximas revisões</summary>
      <p>
        {completed}/{content.missions.length} missões com leitura e recuperação · {bosses}/
        {content.units.length} Chefões superados · {converted} erro(s) convertido(s) em domínio.
      </p>
      <ul>
        {content.units.map((unit) => {
          const estimate = mastery(content, state, unit.id);
          return (
            <li key={unit.id}>
              {unit.title}: domínio estimado{' '}
              {estimate.score === null ? 'ainda sem evidência suficiente' : estimate.score + '%'} ·
              confiança {estimate.confidence}.
            </li>
          );
        })}
      </ul>
      <p>
        {reviews.filter((review) => review.due <= Date.now()).length} revisões vencidas.
        {next
          ? ` Próximo vencimento: ${new Date(next).toLocaleDateString('pt-BR')}.`
          : ' Sua agenda continuará acompanhando as próximas recuperações.'}
      </p>
      <a href={`#/unidade/${state.resume?.unit || content.units[0].id}/revisao`}>
        Consultar revisões →
      </a>
    </details>
  );
}

export function ResponseSignal({ item }: { item: string }) {
  const { signal, quiet } = useV6();
  if (quiet || signal?.item !== item) return null;
  const correct = signal.kind !== 'incorrect';
  return (
    <p className={'response-signal ' + signal.kind} key={signal.id} data-sensory-event={signal.id}>
      {correct ? <Check size={18} aria-hidden="true" /> : <Target size={18} aria-hidden="true" />}
      <span>{signal.title}</span>
    </p>
  );
}

export function RoundProgress() {
  const { state } = useV6();
  const session = state.session;
  if (!session) return null;
  return (
    <progress
      className="round-progress"
      value={Math.min(session.position, session.ids.length)}
      max={session.ids.length || 1}
      aria-label="Itens concluídos nesta rodada"
    />
  );
}

export function RoundSummary() {
  const { content, state, quiet } = useV6();
  const session = state.session;
  if (!session) return null;
  const answers = state.evidence.filter((evidence) => evidence.context === session.id);
  const boss = session.kind === 'questions' && session.pool === 'chefao';
  const concepts = [...new Set(answers.map((answer) => answer.concept))];
  return (
    <section
      className={'round-summary' + (boss ? ' boss-summary' : '')}
      aria-label="Balanço da rodada"
    >
      <RoundProgress />
      {boss && (
        <>
          <span className="eyebrow">
            <Flag size={17} aria-hidden="true" /> Chefão da Expedição
          </span>
          <h3>Integre os raciocínios, reconheça os próximos passos.</h3>
        </>
      )}
      {!quiet && session.sensorySummary && (
        <p className="round-gains">
          <Sparkles size={18} aria-hidden="true" />{' '}
          <strong>+{session.sensorySummary.xp} XP registrados no bloco</strong>
          <span>
            {session.sensorySummary.reviews} revisões vencidas cumpridas ·{' '}
            {session.sensorySummary.converted} erros convertidos
          </span>
        </p>
      )}
      {boss && (
        <details open>
          <summary>Acertos por raciocínio nesta rodada</summary>
          <ul>
            {concepts.map((id) => {
              const attempts = answers.filter((answer) => answer.concept === id);
              return (
                <li key={id}>
                  <b>{content.concepts.find((concept) => concept.id === id)?.name}:</b>{' '}
                  {attempts.filter((answer) => answer.correct).length}/{attempts.length} acertos.
                </li>
              );
            })}
          </ul>
          <p>
            Este recorte mostra precisão na rodada. A estimativa de domínio exige diversidade e
            retenção após intervalo.
          </p>
        </details>
      )}
    </section>
  );
}
