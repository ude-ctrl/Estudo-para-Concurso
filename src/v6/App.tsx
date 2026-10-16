import { Component, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Home as HomeIcon,
  Moon,
  RotateCcw,
  Settings as SettingsIcon,
  Target,
  Sun,
} from 'lucide-react';
import { V6Context } from './context';
import type { Route } from './context';
import { Home, Study } from './Study';
import { Training } from './Training';
import { Review, Errors } from './Review';
import { Exam } from './Exam';
import { Html } from './components';
import { importLegacy, STATE_KEY } from './engine';
import { Repository, downloadState } from './repository';
import { Celebration } from './Celebration';
import { recognize } from './recognition';
import { ExperienceControls } from './SensoryUI';
import { recordSessionSummary, sensoryEvents, sensoryPreferences, sensoryQuiet } from './sensory';
import type { SensoryEvent } from './sensory';
import { SensoryAudio } from './sound';
import { canonicalLegacyRoute } from '../legacy-routes';
import { parseTrainingPool, trainingHref } from './training-session';
import type { Content, Mode, State, UnitId } from './types';
const firstUnit: UnitId = 'cartografia-fundamentos';
function parseRoute(): Route {
  let url: URL;
  try {
    url = new URL(
      canonicalLegacyRoute(location.hash) || location.hash.slice(1) || '/',
      location.origin,
    );
  } catch {
    url = new URL('/', location.origin);
  }
  const p = url.pathname.split('/'),
    unit = (
      ['cartografia-fundamentos', 'cartografia-representacao', 'geotecnologias'].includes(p[2])
        ? p[2]
        : firstUnit
    ) as UnitId,
    mode = (['estudo', 'treino', 'revisao', 'prova'].includes(p[3]) ? p[3] : 'estudo') as Mode;
  return {
    page:
      p[1] === 'caderno'
        ? 'errors'
        : p[1] === 'configuracoes'
          ? 'settings'
          : p[1] === 'unidade'
            ? 'unit'
            : 'home',
    unit,
    mode,
    mission: url.searchParams.get('missao') || '',
    pool: mode === 'treino' ? parseTrainingPool(url.searchParams.get('banco')) : undefined,
  };
}
function Settings({
  content,
  state,
  update,
  repo,
  notify,
}: {
  content: Content;
  state: State;
  update: (fn: (s: State) => void) => void;
  repo: Repository;
  notify: (m: string) => void;
}) {
  const [preview, setPreview] = useState<{ key: string; raw: string }[]>([]),
    [restore, setRestore] = useState(''),
    [reports, setReports] = useState<string[]>([]),
    [filename, setFilename] = useState('');
  function scan() {
    const found: { key: string; raw: string }[] = [];
    try {
      for (const source of content.sources)
        for (const key of [source.key, source.previous].filter((k): k is string => !!k)) {
          const raw = localStorage.getItem(key);
          if (raw) found.push({ key, raw });
        }
      setPreview(found);
      setReports(
        found.length
          ? []
          : [
              'Nenhuma chave histórica encontrada nesta origem do navegador. Você pode importar a cópia exportada pelo portal.',
            ],
      );
    } catch {
      notify('Não foi possível ler o armazenamento. Importe uma cópia JSON.');
    }
  }
  async function readFile(file: File) {
    try {
      if (file.size > 15_000_000) throw Error('O arquivo excede 15 MB.');
      const raw = await file.text(),
        obj = JSON.parse(raw);
      setFilename(file.name);
      setRestore('');
      setPreview([]);
      if (obj.schemaVersion === 6 && obj.state) {
        setRestore(JSON.stringify(obj.state));
        setReports([
          'Cópia V6 identificada. Restaurar substitui o estado V6 desta origem e preserva uma cópia anterior.',
        ]);
      } else if (obj.schemaVersion === 1 && obj.legacyStorage) {
        const allowed = new Set(
          content.sources.flatMap((s) => [s.key, s.previous]).filter(Boolean),
        );
        const found = Object.entries(obj.legacyStorage)
          .filter(([key, value]) => allowed.has(key) && typeof value === 'string')
          .map(([key, raw]) => ({ key, raw: raw as string }));
        if (!found.length) throw Error('A cópia não contém chaves de Cartografia reconhecidas.');
        setPreview(found);
        setReports([
          'Cópia histórica reconhecida. Apenas as chaves de Cartografia serão importadas.',
        ]);
      } else
        throw Error('Formato não reconhecido. Use exportação V6 ou a cópia do portal histórico.');
    } catch (e) {
      notify(e instanceof Error ? e.message : 'Não foi possível ler a cópia.');
    }
  }
  return (
    <>
      <div className="unit-heading">
        <span className="eyebrow">Preferências e dados locais</span>
        <h1>Seu estudo, do seu jeito.</h1>
        <p>
          O progresso pertence a este navegador e a esta origem. Exporte uma cópia para trocar de
          dispositivo ou endereço.
        </p>
      </div>
      <section className="panel">
        <h2>Leitura e movimento</h2>
        <label className="field-label">
          Aparência
          <select
            value={state.preferences.theme}
            onChange={(e) =>
              update((s) => {
                s.preferences.theme = e.target.value as State['preferences']['theme'];
              })
            }
          >
            <option value="system">Acompanhar o sistema</option>
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
          </select>
        </label>
        <label className="field-label">
          Movimento
          <select
            value={state.preferences.motion}
            onChange={(e) =>
              update((s) => {
                s.preferences.motion = e.target.value as State['preferences']['motion'];
              })
            }
          >
            <option value="system">Respeitar a preferência do sistema</option>
            <option value="reduce">Reduzir movimento</option>
          </select>
        </label>
      </section>
      <ExperienceControls />
      <section className="panel">
        <h2>Backup e restauração</h2>
        <p>
          Inclui respostas, agenda, erros, rascunhos, provas, rubricas e cópias legadas importadas.
          Não há sincronização em nuvem neste piloto.
        </p>
        <button onClick={() => downloadState(state)}>Exportar progresso V6</button>
        <label className="field-label">
          Ler cópia JSON
          <input
            type="file"
            accept=".json,application/json"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void readFile(f);
              e.target.value = '';
            }}
          />
        </label>
        {filename && <p>Cópia lida: {filename}</p>}
        {restore && (
          <div className="restore-preview">
            <p>
              A restauração substitui o progresso V6 atual. Uma cópia anterior ficará no navegador
              em <code>.before-restore</code>.
            </p>
            <button
              onClick={() => {
                try {
                  repo.replace(restore);
                  update(() => {});
                  setRestore('');
                  notify('Cópia V6 restaurada. Confira sua agenda e seus rascunhos.');
                } catch (e) {
                  notify(e instanceof Error ? e.message : 'Cópia incompatível.');
                }
              }}
            >
              Restaurar esta cópia V6
            </button>
          </div>
        )}
      </section>
      <section className="panel">
        <h2>Migrar o progresso histórico</h2>
        <p>
          A importação mantém as chaves antigas intactas. Respostas sem data ficam como histórico;
          cartões importados vencem agora para revalidação. XP e domínio não são inferidos do
          legado.
        </p>
        <p>
          Tema 03 compartilha chave entre versões: os índices alterados ficam marcados como
          incertos. Tema 17 v25 também exige validação de esquema e será arquivado sem interpretação
          automática.
        </p>
        <button onClick={scan}>Procurar legado neste navegador</button>
        {preview.length > 0 && (
          <>
            <h3>Revisar antes de importar</h3>
            <ul>
              {preview.map((p) => (
                <li key={p.key}>
                  <code>{p.key}</code>: {state.migrations[p.key] ? 'já importado' : 'disponível'} ·{' '}
                  {new Blob([p.raw]).size} bytes
                </li>
              ))}
            </ul>
            <button
              className="primary"
              onClick={() => {
                const notes: string[] = [];
                update((s) => {
                  for (const p of preview) {
                    try {
                      const r = importLegacy(s, content, p.key, p.raw, Date.now());
                      notes.push(p.key + ': ' + r.imported + ' registros. ' + r.notes.join(' '));
                    } catch (e) {
                      notes.push(p.key + ': ' + (e instanceof Error ? e.message : 'não importado'));
                    }
                  }
                });
                setReports(notes);
                setPreview([]);
                notify('Importação concluída. Consulte o relatório abaixo.');
              }}
            >
              Importar estas chaves de Cartografia
            </button>
          </>
        )}
        {reports.length > 0 && (
          <div className="feedback" role="status">
            {reports.map((r, i) => (
              <p key={i}>{r}</p>
            ))}
          </div>
        )}
        <details>
          <summary>Consultar histórico importado e cópias brutas</summary>
          {Object.entries(state.migrations).map(([key, m]) => (
            <article key={key}>
              <h3>{key}</h3>
              <p>
                {m.imported} registros · {new Date(m.at).toLocaleString('pt-BR')}
              </p>
              <ul>
                {m.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
              <details>
                <summary>Cópia bruta preservada</summary>
                <pre>{m.raw}</pre>
              </details>
            </article>
          ))}
          {state.legacyHistory.map((h, i) => (
            <p key={i}>
              <code>
                {h.source} / {h.legacy_id}
              </code>{' '}
              → <code>{h.canonical}</code> · valor {JSON.stringify(h.value)}
              {h.ambiguous ? ' · versão incerta' : ''}
            </p>
          ))}
        </details>
      </section>
      <section className="panel">
        <h2>Rastreabilidade e fontes</h2>
        <p>
          Foram preservadas as três fontes principais e incorporados três itens exclusivos da versão
          secundária de Cartografia II. Cada recurso migrado registra <code>legacy_source</code>,{' '}
          <code>legacy_id</code> e hash do conteúdo original.
        </p>
        <p>
          <a href="./v6/cartografia.json" target="_blank" rel="noreferrer">
            Registro integral de conteúdo, variantes e procedência (JSON)
          </a>{' '}
          ·{' '}
          <a
            href="https://github.com/ude-ctrl/Estudo-para-Concurso/blob/v6-piloto-cartografia/MissaoAprovacaoGeo/V6_FASE14_MAPA_PARIDADE.md"
            target="_blank"
            rel="noreferrer"
          >
            Mapa de paridade
          </a>
        </p>
        {content.references.map((r) => (
          <details key={r.source}>
            <summary>Notas e fontes históricas · {r.source.split('Tema_')[1]?.slice(0, 2)}</summary>
            <p className="editorial-note">
              Texto de procedência preservado. Declarações de auditoria ou contexto de concurso
              desta nota pertencem à versão histórica e não certificam o piloto V6.
            </p>
            <Html html={r.html} />
          </details>
        ))}
      </section>
    </>
  );
}
function Workspace({ content }: { content: Content }) {
  const [repo] = useState(() => {
      try {
        return new Repository(localStorage);
      } catch {
        return new Repository({
          getItem: () => {
            throw Error('Indisponível');
          },
          setItem: () => {
            throw Error('Indisponível');
          },
        });
      }
    }),
    [state, setState] = useState(repo.state),
    [route, setRoute] = useState(parseRoute),
    [message, setMessage] = useState(''),
    [celebration, setCelebration] = useState<SensoryEvent | null>(null),
    [signal, setSignal] = useState<SensoryEvent | null>(null),
    [audio] = useState(() => new SensoryAudio()),
    [systemDark, setSystemDark] = useState(
      () => matchMedia('(prefers-color-scheme: dark)').matches,
    ),
    [tick, setTick] = useState(0),
    main = useRef<HTMLElement>(null),
    pendingFocus = useRef<'bank' | 'mission' | 'heading' | null>(null);
  function update(fn: (s: State) => void) {
    try {
      let events: SensoryEvent[] = [];
      const next = repo.commit((s) => {
        const before = structuredClone(s);
        fn(s);
        recordSessionSummary(before, s);
        const earned = recognize(content, before, s, Date.now());
        events = sensoryEvents(content, before, s, earned);
      });
      setState(next);
      if (!sensoryQuiet(parseRoute(), next)) {
        setSignal(events.find((event) => event.item) || null);
        const milestone = events.find((event) => event.importance >= 3);
        if (milestone) setCelebration(milestone);
        if (events[0])
          audio.play(
            events[0].kind,
            sensoryPreferences(next).sound,
            events[0].importance,
            canPlaySound,
          );
      } else {
        audio.pause();
        setSignal(null);
        setCelebration(null);
      }
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Não foi possível registrar a atividade.');
    }
  }
  const dismissCelebration = useCallback(() => setCelebration(null), []);
  const quiet = sensoryQuiet(route, state);
  function canPlaySound() {
    return (
      document.visibilityState === 'visible' &&
      !sensoryQuiet(parseRoute(), repo.state) &&
      sensoryPreferences(repo.state).sound !== 'off'
    );
  }
  async function previewSound() {
    const requestedHash = location.hash;
    const requestedSound = sensoryPreferences(repo.state).sound;
    if (!canPlaySound()) {
      setMessage(
        'O exemplo sonoro fica disponível com efeitos habilitados e fora de uma prova em andamento.',
      );
      return;
    }
    const unlocked = await audio.unlock();
    if (
      location.hash !== requestedHash ||
      sensoryPreferences(repo.state).sound !== requestedSound ||
      !canPlaySound()
    )
      return;
    if (!unlocked) {
      setMessage('Áudio indisponível neste navegador. Todo feedback continua disponível em texto.');
      return;
    }
    audio.play('mission', sensoryPreferences(repo.state).sound, 5, canPlaySound);
  }
  useEffect(() => {
    function gesture(event: Event) {
      if (event.isTrusted && canPlaySound()) void audio.unlock();
    }
    function hide() {
      if (document.visibilityState !== 'visible') {
        audio.pause();
        setSignal(null);
        setCelebration(null);
      }
    }
    function leave() {
      audio.pause();
      setSignal(null);
      setCelebration(null);
    }
    document.addEventListener('pointerdown', gesture, true);
    document.addEventListener('keydown', gesture, true);
    document.addEventListener('visibilitychange', hide);
    window.addEventListener('pagehide', leave);
    return () => {
      document.removeEventListener('pointerdown', gesture, true);
      document.removeEventListener('keydown', gesture, true);
      document.removeEventListener('visibilitychange', hide);
      window.removeEventListener('pagehide', leave);
      audio.dispose();
    };
  }, [audio, repo]);
  useEffect(() => {
    audio.pause();
  }, [audio, state.preferences.sound, state.preferences.experience, quiet]);
  const dark =
    state.preferences.theme === 'dark' || (state.preferences.theme === 'system' && systemDark);
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const change = () => setSystemDark(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  function go(unit: UnitId, mode: Mode, mission = '') {
    location.hash = `/unidade/${unit}/${mode}${mission ? '?missao=' + mission : ''}`;
  }
  useEffect(() => {
    const onHash = () => {
      const next = parseRoute();
      const focusedFilter = document.activeElement?.getAttribute('data-training-filter');
      const keepFilterFocus =
        next.page === 'unit' &&
        next.mode === 'treino' &&
        (focusedFilter === 'bank' || focusedFilter === 'mission');
      pendingFocus.current = keepFilterFocus ? focusedFilter : 'heading';
      setRoute(next);
      audio.pause();
      setSignal(null);
      setCelebration(null);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === STATE_KEY) {
        audio.pause();
        setSignal(null);
        setCelebration(null);
        setState({ ...repo.reload() });
        setMessage('Progresso atualizado por outra aba. Os dados mais recentes foram carregados.');
      }
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('storage', onStorage);
    };
  }, [repo, audio]);
  // The route can remount Training. Focus must wait for that commit, not an earlier frame.
  useLayoutEffect(() => {
    const target = pendingFocus.current;
    if (!target) return;
    pendingFocus.current = null;
    const filter =
      target !== 'heading'
        ? main.current?.querySelector<HTMLElement>(`select[data-training-filter="${target}"]`)
        : null;
    if (filter) {
      filter.focus();
      return;
    }
    const heading = main.current?.querySelector<HTMLElement>('h1');
    heading?.setAttribute('tabindex', '-1');
    heading?.focus();
  }, [route]);
  useEffect(() => {
    if (route.page === 'unit') {
      const ms = content.missions.filter((m) => m.unit === route.unit),
        mission =
          ms.find((m) => m.id === route.mission)?.id || (route.mode === 'estudo' ? ms[0].id : ''),
        pool = route.mode === 'treino' ? route.pool : undefined;
      if (
        state.resume?.unit !== route.unit ||
        state.resume?.mode !== route.mode ||
        state.resume?.mission !== mission ||
        state.resume?.pool !== pool
      )
        update((s) => {
          s.resume = { unit: route.unit, mode: route.mode, mission, pool };
        });
    }
  }, [route, content]);
  useEffect(() => {
    document.documentElement.dataset.theme = state.preferences.theme;
    document.documentElement.dataset.motion = state.preferences.motion;
    document.documentElement.dataset.experience = sensoryPreferences(state).experience;
    document.documentElement.dataset.quiet = String(quiet);
  }, [state.preferences, quiet]);
  // A deadline is absolute. Leaving the exam screen or reloading does not pause the clock.
  useEffect(() => {
    if (
      !state.exam ||
      state.exam.finished ||
      !state.exam.ids.every((id) => content.questions.some((q) => q.id === id))
    )
      return;
    const id = setTimeout(
      () => {
        if (Date.now() >= state.exam!.deadline)
          update((s) => finishExamImported(s, content, Date.now()));
        setTick((t) => t + 1);
      },
      Math.max(50, Math.min(30_000, state.exam.deadline - Date.now())),
    );
    return () => clearTimeout(id);
  }, [state.exam?.deadline, state.exam?.finished, tick]);
  const unit = route.page === 'unit' ? route.unit : state.resume?.unit || firstUnit;
  const nav = [
    ['estudo', 'Estudo', BookOpen],
    ['treino', 'Treino', Target],
    ['revisao', 'Revisão', RotateCcw],
    ['prova', 'Prova', ClipboardCheck],
  ] as const;
  return (
    <V6Context
      value={{ content, state, update, notify: setMessage, route, go, quiet, signal, previewSound }}
    >
      <a
        className="skip-link"
        href="#conteudo"
        onClick={(e) => {
          e.preventDefault();
          main.current?.focus();
        }}
      >
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <a className="brand" href="#/">
          <span className="brand-icon">
            <Compass size={24} />
          </span>
          <span>
            Missão Aprovação <b>Geo</b>
            <small>Cartografia · V6 piloto</small>
          </span>
        </a>
        <div className="header-tools">
          <button
            className="icon-button"
            aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            onClick={() =>
              update((s) => {
                s.preferences.theme = dark ? 'light' : 'dark';
              })
            }
          >
            {dark ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <a className="icon-button" href="#/caderno" aria-label="Caderno Global de Erros">
            <CheckCircle2 size={22} />
          </a>
          <a className="icon-button" href="#/configuracoes" aria-label="Preferências e progresso">
            <SettingsIcon size={22} />
          </a>
        </div>
      </header>
      <div className="app-shell">
        <nav className="main-navigation" aria-label="Ambientes de aprendizagem">
          <a href="#/" aria-current={route.page === 'home' ? 'page' : undefined}>
            <HomeIcon size={20} />
            <span>Início</span>
          </a>
          {nav.map(([mode, label, Icon]) => (
            <a
              href={`#/unidade/${unit}/${mode}`}
              key={mode}
              aria-current={route.page === 'unit' && route.mode === mode ? 'page' : undefined}
            >
              <Icon size={20} />
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <main id="conteudo" ref={main} tabIndex={-1}>
          <div className="breadcrumb">
            <a href="#/">Cartografia</a>
            <span>/</span>
            <span>
              {route.page === 'home'
                ? 'Seu percurso'
                : route.page === 'errors'
                  ? 'Caderno de erros'
                  : route.page === 'settings'
                    ? 'Preferências'
                    : content.units.find((u) => u.id === unit)?.title}
            </span>
          </div>
          {repo.warning && (
            <div className="storage-warning" role="alert">
              {repo.warning} <button onClick={() => downloadState(state)}>Exportar agora</button>
            </div>
          )}
          {message && (
            <div className="status-note" role="status">
              <span>{message}</span>
              <button aria-label="Dispensar aviso" onClick={() => setMessage('')}>
                ×
              </button>
            </div>
          )}
          {route.page === 'unit' && (
            <label className="unit-switch">
              Unidade
              <select
                aria-label="Escolher unidade"
                value={route.unit}
                onChange={(e) => go(e.target.value as UnitId, route.mode)}
              >
                {content.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.title}
                  </option>
                ))}
              </select>
            </label>
          )}
          {route.page === 'home' ? (
            <Home />
          ) : route.page === 'errors' ? (
            <Errors />
          ) : route.page === 'settings' ? (
            <Settings
              content={content}
              state={state}
              update={update}
              repo={repo}
              notify={setMessage}
            />
          ) : route.mode === 'estudo' ? (
            <Study key={route.mission + route.unit} />
          ) : route.mode === 'treino' ? (
            <Training key={trainingHref(route.unit, route.mission, route.pool)} />
          ) : route.mode === 'revisao' ? (
            <Review key={route.unit} />
          ) : (
            <Exam key={route.unit} />
          )}
          <Celebration milestone={quiet ? null : celebration} onDismiss={dismissCelebration} />
          <footer className="site-footer">
            <span>Aprender com profundidade. Avançar com evidência.</span>
            <a href="./biblioteca.html">Outros materiais</a>
            <a href="#/configuracoes">Dados e fontes</a>
          </footer>
        </main>
      </div>
    </V6Context>
  );
}
import { finishExam as finishExamImported } from './engine';
class Boundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <main className="load-state">
        <h1>Não foi possível abrir este ambiente.</h1>
        <p>
          Seu armazenamento foi mantido. Recarregue para recuperar a sessão; uma cópia inválida pode
          ser exportada pelas ferramentas do navegador.
        </p>
        <button onClick={() => location.reload()}>Recarregar</button>
        <a href="./biblioteca.html">Outros materiais</a>
      </main>
    ) : (
      this.props.children
    );
  }
}
export function App() {
  const [content, setContent] = useState<Content | null>(null),
    [error, setError] = useState(''),
    [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch('./v6/cartografia.json', { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw Error('Falha ' + r.status);
        return r.json();
      })
      .then((data) => {
        if (
          data.version !== '6.0.0-piloto.1' ||
          data.units?.length !== 3 ||
          !Array.isArray(data.questions)
        )
          throw Error('Banco incompatível');
        setContent(data);
        setError('');
      })
      .catch((e) => {
        if (e.name !== 'AbortError')
          setError('Não foi possível carregar o conteúdo. Confira a conexão e tente novamente.');
      });
    return () => controller.abort();
  }, [retry]);
  return content ? (
    <Boundary>
      <Workspace content={content} />
    </Boundary>
  ) : (
    <main className="load-state">
      <h1>Cartografia e Geotecnologias</h1>
      <p role="status">{error || 'Preparando seu percurso de estudo…'}</p>
      {error && (
        <button
          onClick={() => {
            setError('');
            setRetry((n) => n + 1);
          }}
        >
          Tentar novamente
        </button>
      )}
    </main>
  );
}
