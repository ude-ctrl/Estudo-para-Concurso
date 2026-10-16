import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  ChevronDown,
  Compass,
  Download,
  ExternalLink,
  Gamepad2,
  Layers3,
  Library,
  Map as MapIcon,
  Menu,
  Search,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import {
  PREFERENCES_KEY,
  exportProgress,
  readPreferences,
  readProgress,
  writePreferences,
} from './storage';
import type { Preferences } from './storage';
import { canonicalLegacyRoute } from './legacy-routes';
import type { Catalog, Category, Lesson, Progress, StudyMode } from './types';

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const format = (n: number) => n.toLocaleString('pt-BR');
const categories: Category[] = [
  'Fundamentos',
  'Cartografia',
  'Geografia física',
  'Geografia humana',
  'Amazônia e Pará',
  'Educação',
  'Conhecimentos gerais',
];
const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
type View = 'library' | 'progress' | 'favorites';
interface Route {
  id: string | null;
  mode?: StudyMode;
  resource?: boolean;
}
function getRoute(): Route {
  const hash = location.hash.slice(1),
    [path, query = ''] = hash.split('?');
  const match = path.match(/^\/(missao|recurso)\/([\w-]+)$/);
  const mode = new URLSearchParams(query).get('modo');
  return {
    id: match?.[2] ?? null,
    resource: match?.[1] === 'recurso',
    mode: mode === 'flash' || mode === 'game' || mode === 'study' ? mode : undefined,
  };
}
const lessonHref = (id: string, mode?: StudyMode) => `#/missao/${id}${mode ? `?modo=${mode}` : ''}`;

function Favorite({
  active,
  onClick,
  title,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      className={`icon-button favorite ${active ? 'is-saved' : ''}`}
      onClick={onClick}
      aria-pressed={active}
      aria-label={`${active ? 'Remover dos' : 'Adicionar aos'} favoritos: ${title}`}
    >
      <Bookmark size={18} fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}

function LessonCard({
  lesson,
  progress,
  favorite,
  toggle,
}: {
  lesson: Lesson;
  progress: Progress;
  favorite: boolean;
  toggle: () => void;
}) {
  return (
    <article className={`lesson-card category-${categories.indexOf(lesson.category)}`}>
      <div className="card-top">
        <span className="topic-label">TEMA {String(lesson.number).padStart(2, '0')}</span>
        <Favorite active={favorite} onClick={toggle} title={lesson.title} />
      </div>
      <div className="card-category">{lesson.category}</div>
      <h3>
        <a href={lessonHref(lesson.id)}>{lesson.title}</a>
      </h3>
      <div className="card-edition">
        <span>{lesson.edition}</span>
        {lesson.audited && (
          <span>
            <Check size={12} /> Edição auditada
          </span>
        )}
      </div>
      <div className="card-counts">
        <span>
          <BookOpen size={14} /> {lesson.counts.stages} etapas
        </span>
        <span>
          <Target size={14} /> {lesson.counts.questions} questões
        </span>
      </div>
      <div className="card-tools">
        <a href={lessonHref(lesson.id, 'flash')} aria-label={`Flashcards de ${lesson.title}`}>
          <Layers3 size={15} /> {lesson.counts.flashcards} flashcards
        </a>
        <a href={lessonHref(lesson.id, 'game')} aria-label={`Game de ${lesson.title}`}>
          <Gamepad2 size={16} /> Game
        </a>
      </div>
      <div className="card-bottom">
        <div className="card-progress">
          <span>
            {progress.percent === 100
              ? 'Questões concluídas'
              : progress.started
                ? `${progress.percent}% das questões`
                : 'Pronto para começar'}
          </span>
          <div
            className="progress-track"
            aria-label={`${progress.percent}% das questões respondidas`}
          >
            <i style={{ width: `${progress.percent}%` }} />
          </div>
        </div>
        <a className="start-link" href={lessonHref(lesson.id)}>
          {progress.started ? 'Continuar' : 'Estudar'}
          <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}

interface LegacyWindow extends Window {
  showTab?: (name: StudyMode, noScroll?: boolean) => void;
  S?: { tab?: string };
}
function Reader({
  title,
  url,
  lesson,
  route,
  favorite,
  toggle,
  onVisit,
  onProgress,
}: {
  title: string;
  url: string;
  lesson?: Lesson;
  route: Route;
  favorite: boolean;
  toggle: () => void;
  onVisit: (id: string) => void;
  onProgress: () => void;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [mode, setMode] = useState<StudyMode>(route.mode ?? 'study');
  const [loaded, setLoaded] = useState(false);
  const syncMode = useCallback(() => {
    try {
      const value = (frame.current?.contentWindow as LegacyWindow | null)?.S?.tab;
      if (value === 'study' || value === 'flash' || value === 'game') setMode(value);
    } catch {
      /* The reader uses only same-origin originals. */
    }
  }, []);
  useEffect(() => {
    setLoaded(false);
    if (lesson) onVisit(lesson.id);
  }, [url, lesson?.id, onVisit]);
  useEffect(() => {
    if (loaded && route.mode) {
      (frame.current?.contentWindow as LegacyWindow | null)?.showTab?.(route.mode, true);
      setMode(route.mode);
    }
  }, [loaded, route.mode]);
  useEffect(() => {
    const changed = () => {
      onProgress();
      syncMode();
    };
    window.addEventListener('storage', changed);
    return () => window.removeEventListener('storage', changed);
  }, [onProgress, syncMode]);
  return (
    <main className="reader">
      <div className="reader-toolbar">
        <a className="back-link" href="#/">
          <ArrowLeft size={18} />
          <span>Biblioteca</span>
        </a>
        <div className="reader-title">
          {lesson && <span>Tema {String(lesson.number).padStart(2, '0')}</span>}
          <h1>{title}</h1>
        </div>
        <div className="reader-actions">
          {lesson && <Favorite active={favorite} onClick={toggle} title={title} />}
          <a
            className="icon-button"
            href={assetUrl(url)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir página de estudo em outra aba"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
      {lesson && (
        <nav className="reader-tabs" aria-label="Ambientes de estudo">
          {(
            [
              ['study', BookOpen, 'Estudo'],
              ['flash', Layers3, 'Flashcards'],
              ['game', Gamepad2, 'Game'],
            ] as const
          ).map(([value, Icon, label]) => (
            <a
              key={value}
              href={lessonHref(lesson.id, value)}
              className={mode === value ? 'active' : ''}
              aria-current={mode === value ? 'page' : undefined}
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
        </nav>
      )}
      {!loaded && (
        <div className="reader-loading" role="status">
          Abrindo seu material de estudo…
        </div>
      )}
      <iframe
        key={url}
        ref={frame}
        src={assetUrl(url)}
        title={`Material de estudo: ${title}`}
        className="study-frame"
        onLoad={() => {
          setLoaded(true);
          syncMode();
          onProgress();
        }}
      />
    </main>
  );
}

export default function App() {
  const [catalog, setCatalog] = useState<Catalog | null>(null),
    [error, setError] = useState(false);
  const [route, setRoute] = useState(getRoute),
    [view, setView] = useState<View>('library');
  const [query, setQuery] = useState(''),
    [category, setCategory] = useState('Todas as áreas'),
    [sort, setSort] = useState('theme');
  const [preferences, setPreferences] = useState<Preferences>(readPreferences),
    [revision, setRevision] = useState(0);
  const [menu, setMenu] = useState(false),
    [notice, setNotice] = useState('');
  const refreshProgress = useCallback(() => setRevision((value) => value + 1), []);
  const visit = useCallback(
    (id: string) =>
      setPreferences((previous) =>
        previous.lastVisited === id ? previous : { ...previous, lastVisited: id },
      ),
    [],
  );
  useEffect(() => {
    const controller = new AbortController();
    fetch(assetUrl('content/catalog.json'), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Catálogo indisponível');
        return response.json();
      })
      .then((value: Catalog) => {
        if (value.schemaVersion !== 1 || !Array.isArray(value.lessons))
          throw new Error('Catálogo inválido');
        setCatalog(value);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setError(true);
      });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    const change = () => {
      setRoute(getRoute());
      setMenu(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, []);
  useEffect(() => {
    if (!writePreferences(preferences))
      setNotice('Este navegador não permitiu salvar suas preferências.');
  }, [preferences]);
  useEffect(() => {
    const change = (event: StorageEvent) => {
      if (event.key === PREFERENCES_KEY) setPreferences(readPreferences());
      refreshProgress();
    };
    window.addEventListener('storage', change);
    window.addEventListener('focus', refreshProgress);
    return () => {
      window.removeEventListener('storage', change);
      window.removeEventListener('focus', refreshProgress);
    };
  }, [refreshProgress]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 4500);
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    if (!menu) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenu(false);
        document.querySelector<HTMLButtonElement>('.mobile-menu-button')?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menu]);
  const progress = useMemo(
    () => new Map(catalog?.lessons.map((lesson) => [lesson.id, readProgress(lesson)]) ?? []),
    [catalog, revision],
  );
  const filtered = useMemo(() => {
    const words = normalize(query).trim().split(/\s+/).filter(Boolean);
    return (catalog?.lessons ?? [])
      .filter((lesson) => {
        const searchable = normalize(
          `${lesson.title} ${lesson.category} tema ${lesson.number} ${String(lesson.number).padStart(2, '0')} ${lesson.edition} ${lesson.audited ? 'auditada' : ''}`,
        );
        return (
          words.every((word) => searchable.includes(word)) &&
          (category === 'Todas as áreas' || lesson.category === category) &&
          (view !== 'favorites' || preferences.favorites.includes(lesson.id)) &&
          (view !== 'progress' || progress.get(lesson.id)?.started)
        );
      })
      .sort((a, b) =>
        sort === 'name'
          ? a.title.localeCompare(b.title, 'pt-BR')
          : sort === 'progress'
            ? (progress.get(b.id)?.percent ?? 0) - (progress.get(a.id)?.percent ?? 0) ||
              a.number - b.number
            : a.number - b.number ||
              Number(b.audited) - Number(a.audited) ||
              a.title.localeCompare(b.title, 'pt-BR'),
      );
  }, [catalog, query, category, sort, view, preferences.favorites, progress]);
  useEffect(() => {
    const canonical = canonicalLegacyRoute(location.hash);
    if (canonical) location.replace(assetUrl('index.html') + '#' + canonical);
  }, [route]);
  const toggleFavorite = (id: string) =>
    setPreferences((previous) => ({
      ...previous,
      favorites: previous.favorites.includes(id)
        ? previous.favorites.filter((value) => value !== id)
        : [...previous.favorites, id],
    }));
  const openView = (next: View) => {
    setView(next);
    setMenu(false);
    location.hash = '/';
  };
  if (error)
    return (
      <main className="loading-screen">
        <Compass size={36} />
        <h1>Não foi possível abrir a biblioteca</h1>
        <p>Confira sua conexão e tente novamente.</p>
        <button className="primary-button" onClick={() => location.reload()}>
          Tentar novamente
        </button>
      </main>
    );
  if (!catalog)
    return (
      <main className="loading-screen" role="status">
        <Compass size={36} />
        <p>Preparando sua biblioteca…</p>
      </main>
    );
  const lesson = catalog.lessons.find((item) => item.id === route.id),
    resource = catalog.resources.find((item) => item.id === route.id);
  const lastLesson = catalog.lessons.find((item) => item.id === preferences.lastVisited);
  const favoriteCount = catalog.lessons.filter((item) =>
    preferences.favorites.includes(item.id),
  ).length;
  const started = catalog.lessons.filter((item) => progress.get(item.id)?.started).length;
  const complete = catalog.lessons.filter((item) => progress.get(item.id)?.percent === 100).length;
  const heading =
    view === 'favorites'
      ? 'Seus favoritos'
      : view === 'progress'
        ? 'Seu percurso de estudo'
        : 'Biblioteca de temas';
  return (
    <div className={route.id ? 'app app-reading' : 'app'}>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main-content')?.focus();
        }}
      >
        Pular para o conteúdo
      </a>
      <button
        className="mobile-menu-button icon-button"
        aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={menu}
        onClick={() => setMenu(!menu)}
      >
        {menu ? <X size={22} /> : <Menu size={22} />}
      </button>
      {menu && (
        <button className="menu-scrim" aria-label="Fechar menu" onClick={() => setMenu(false)} />
      )}
      <aside className={`sidebar ${menu ? 'open' : ''}`}>
        <a
          className="brand"
          href="#/"
          onClick={() => {
            setView('library');
            setMenu(false);
          }}
        >
          <div className="brand-mark">
            <Compass size={26} strokeWidth={1.5} />
          </div>
          <div>
            Missão<span>Geografia</span>
          </div>
        </a>
        <div className="sidebar-label">SEU ESPAÇO DE ESTUDO</div>
        <nav className="main-nav" aria-label="Navegação principal">
          <button
            className={view === 'library' && !route.id ? 'active' : ''}
            onClick={() => openView('library')}
          >
            <Library size={19} />
            Outros materiais<span>{catalog.totals.lessons}</span>
          </button>
          <button
            className={view === 'progress' && !route.id ? 'active' : ''}
            onClick={() => openView('progress')}
          >
            <MapIcon size={19} />
            Meu percurso
          </button>
          <button
            className={view === 'favorites' && !route.id ? 'active' : ''}
            onClick={() => openView('favorites')}
          >
            <Bookmark size={19} />
            Favoritos
            {favoriteCount > 0 && <span>{favoriteCount}</span>}
          </button>
        </nav>
        <a className="resource-link" href={assetUrl('index.html')}>
          <Compass size={19} />
          <span>
            Cartografia V6<small>Continuar meu percurso</small>
          </span>
          <ArrowRight size={14} />
        </a>
        <div className="sidebar-divider" />
        <div className="sidebar-label">PREPARAÇÃO</div>
        <a className="resource-link" href={`#/recurso/${catalog.resources[0]?.id}`}>
          <Target size={19} />
          <span>
            Plano de preparação<small>Auditoria e próximos passos</small>
          </span>
          <ArrowRight size={14} />
        </a>
        <div className="sidebar-bottom">
          <div className="storage-note">
            <span className="status-dot" />
            <span>Progresso neste navegador</span>
          </div>
          <button
            className="backup-button"
            onClick={() =>
              setNotice(
                exportProgress(catalog, preferences)
                  ? 'Uma cópia do seu progresso foi baixada.'
                  : 'Não foi possível exportar o progresso neste navegador.',
              )
            }
          >
            <Download size={15} />
            Salvar cópia do progresso
          </button>
          <div className="sidebar-footer">
            Um tema por vez.
            <br />
            <strong>Um passo mais perto.</strong>
          </div>
        </div>
      </aside>
      <div className="workspace" id="main-content" tabIndex={-1}>
        {route.id ? (
          lesson || resource ? (
            <Reader
              title={lesson?.title ?? resource!.title}
              url={lesson?.legacyUrl ?? resource!.legacyUrl}
              lesson={lesson}
              route={route}
              favorite={Boolean(lesson && preferences.favorites.includes(lesson.id))}
              toggle={() => lesson && toggleFavorite(lesson.id)}
              onVisit={visit}
              onProgress={refreshProgress}
            />
          ) : (
            <main className="loading-screen">
              <h1>Material não encontrado</h1>
              <a href="#/" className="primary-button">
                Voltar à biblioteca
              </a>
            </main>
          )
        ) : (
          <>
            <header className="topbar">
              <div className="breadcrumb">
                Seu espaço <span>/</span>{' '}
                <strong>
                  {view === 'library'
                    ? 'Biblioteca'
                    : view === 'favorites'
                      ? 'Favoritos'
                      : 'Meu percurso'}
                </strong>
              </div>
              <div className="exam-badge">
                <span className="status-dot" />
                SEDUC · PA <span>2026</span>
              </div>
            </header>
            <main className="library-content">
              <section className="resume-card" aria-label="Percurso canônico de Cartografia">
                <Compass size={26} aria-hidden="true" />
                <div>
                  <span>CARTOGRAFIA V6</span>
                  <h2>Um módulo. Três unidades. Um percurso.</h2>
                  <p>Cartografia agora tem seu próprio ambiente de aprendizagem.</p>
                </div>
                <a href={assetUrl('index.html')}>
                  Continuar Cartografia V6 <ArrowRight size={17} />
                </a>
              </section>
              <section className="welcome">
                <div>
                  <div className="eyebrow">
                    <span /> GEOGRAFIA PARA CONCURSOS
                  </div>
                  <h1>
                    {view === 'library' ? (
                      <>
                        Seu próximo passo
                        <br />
                        começa <em>aqui.</em>
                      </>
                    ) : (
                      heading
                    )}
                  </h1>
                  <p>
                    {view === 'library'
                      ? 'Todo o seu material, organizado para estudar com constância.'
                      : view === 'favorites'
                        ? 'Os temas que você quer manter por perto.'
                        : 'Retome os temas que você já começou a estudar.'}
                  </p>
                </div>
                <div className="welcome-art" aria-hidden="true">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <div className="orbit orbit-three" />
                  <div className="art-cross cross-one" />
                  <div className="art-cross cross-two" />
                  <Compass size={108} strokeWidth={0.65} />
                  <span className="coordinate">01°27′ S · 48°30′ O</span>
                </div>
              </section>
              <section className="stats-grid" aria-label="Seu acervo de estudo">
                <div className="stat-card">
                  <span className="stat-icon">
                    <BookOpen size={21} />
                  </span>
                  <div>
                    <strong>{catalog.totals.lessons}</strong>
                    <span>missões de estudo</span>
                  </div>
                  <small>{catalog.totals.stages} etapas no acervo</small>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">
                    <Layers3 size={21} />
                  </span>
                  <div>
                    <strong>{format(catalog.totals.flashcards)}</strong>
                    <span>flashcards</span>
                  </div>
                  <small>Recupere o que aprendeu</small>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">
                    <Gamepad2 size={22} />
                  </span>
                  <div>
                    <strong>{format(catalog.totals.game)}</strong>
                    <span>itens de game</span>
                  </div>
                  <small>Treine reconhecimento e agilidade</small>
                </div>
              </section>
              {lastLesson && (
                <section className="resume-card">
                  <div className="resume-icon">
                    <Sparkles size={21} />
                  </div>
                  <div>
                    <span>RETOME SEU ÚLTIMO TEMA</span>
                    <h2>{lastLesson.title}</h2>
                    <p>
                      {progress.get(lastLesson.id)?.answered ?? 0} de{' '}
                      {progress.get(lastLesson.id)?.total ?? 0} questões respondidas
                    </p>
                  </div>
                  <a href={lessonHref(lastLesson.id)}>
                    Continuar estudando
                    <ArrowRight size={17} />
                  </a>
                </section>
              )}
              {view === 'progress' && (
                <div className="journey-summary">
                  <strong>
                    {started} {started === 1 ? 'missão iniciada' : 'missões iniciadas'}
                  </strong>
                  <span>{complete} com todas as questões respondidas</span>
                </div>
              )}
              <section className="catalog-section" aria-labelledby="catalog-heading">
                <div className="section-title">
                  <div>
                    <h2 id="catalog-heading">{heading}</h2>
                    <p>
                      {view === 'library'
                        ? 'Escolha um tema e encontre seu ritmo.'
                        : view === 'favorites'
                          ? 'Sua seleção para os próximos estudos.'
                          : 'Seu progresso acompanha cada missão.'}
                    </p>
                  </div>
                  <span className="results-count">
                    {filtered.length} {filtered.length === 1 ? 'missão' : 'missões'}
                  </span>
                </div>
                <div className="catalog-controls">
                  <label className="search-field">
                    <Search size={18} />
                    <input
                      type="search"
                      placeholder="Buscar tema ou assunto…"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      aria-label="Buscar tema ou assunto"
                    />
                    {query && (
                      <button aria-label="Limpar busca" onClick={() => setQuery('')}>
                        <X size={16} />
                      </button>
                    )}
                  </label>
                  <label className="select-field">
                    <select
                      aria-label="Filtrar por área"
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                    >
                      <option>Todas as áreas</option>
                      {categories
                        .filter((value) => catalog.lessons.some((item) => item.category === value))
                        .map((value) => (
                          <option key={value}>{value}</option>
                        ))}
                    </select>
                    <ChevronDown size={15} />
                  </label>
                  <label className="select-field sort-field">
                    <select
                      aria-label="Ordenar temas"
                      value={sort}
                      onChange={(event) => setSort(event.target.value)}
                    >
                      <option value="theme">Ordem dos temas</option>
                      <option value="name">Ordem alfabética</option>
                      <option value="progress">Maior progresso</option>
                    </select>
                    <ChevronDown size={15} />
                  </label>
                </div>
                {filtered.length ? (
                  <div className="lesson-grid">
                    {filtered.map((item) => (
                      <LessonCard
                        key={item.id}
                        lesson={item}
                        progress={progress.get(item.id)!}
                        favorite={preferences.favorites.includes(item.id)}
                        toggle={() => toggleFavorite(item.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <BookOpen size={32} />
                    <h3>
                      {query || category !== 'Todas as áreas'
                        ? 'Nenhum tema encontrado'
                        : view === 'favorites'
                          ? 'Guarde seus próximos temas'
                          : 'Seu percurso começa com uma missão'}
                    </h3>
                    <p>
                      {query || category !== 'Todas as áreas'
                        ? 'Tente outro assunto ou ajuste os filtros.'
                        : view === 'favorites'
                          ? 'Toque no marcador de um tema para adicioná-lo aqui.'
                          : 'Escolha um tema na biblioteca para começar.'}
                    </p>
                    <button
                      className="secondary-button"
                      onClick={() => {
                        setQuery('');
                        setCategory('Todas as áreas');
                        setView('library');
                      }}
                    >
                      Ver toda a biblioteca
                    </button>
                  </div>
                )}
              </section>
              <footer className="content-footer">
                <span>
                  <Compass size={15} />
                  Missão Geografia
                </span>
                <span>Estude com intenção. Avance com constância.</span>
              </footer>
            </main>
          </>
        )}
      </div>
      <div className={`toast ${notice ? 'show' : ''}`} role="status" aria-live="polite">
        {notice}
      </div>
    </div>
  );
}
