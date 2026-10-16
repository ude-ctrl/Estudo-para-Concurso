import { useEffect, useRef } from 'react';
import type { Content, LegacyRef, Question, UnitId } from './types';
import { ResponseSignal } from './SensoryUI';
export function Provenance({ refs }: { refs: LegacyRef[] }) {
  return (
    <details className="provenance">
      <summary>Procedência e versões ({refs.length})</summary>
      {refs.length ? (
        refs.map((r) => (
          <p key={r.legacy_source + r.legacy_id}>
            <a
              href={
                'https://github.com/ude-ctrl/Estudo-para-Concurso/blob/v6-piloto-cartografia/' +
                r.legacy_source
              }
              target="_blank"
              rel="noreferrer"
            >
              {r.legacy_source.split('/').at(-1)}
            </a>
            <br />
            <code>{r.legacy_id}</code> · SHA-256 <code className="hash">{r.hash}</code>
          </p>
        ))
      ) : (
        <p>Conteúdo autoral V6, sujeito à revisão humana do piloto.</p>
      )}
    </details>
  );
}
export function Html({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const imgs = ref.current?.querySelectorAll('img');
    imgs?.forEach((img) => {
      img.loading = 'lazy';
      img.addEventListener(
        'error',
        () => {
          img.hidden = true;
          const p = document.createElement('p');
          p.className = 'media-fallback';
          p.textContent =
            'Imagem externa indisponível. ' +
            img.alt +
            ' Consulte a descrição e a fonte deste recurso.';
          img.after(p);
        },
        { once: true },
      );
    });
  }, [html]);
  return <div ref={ref} className="theory" dangerouslySetInnerHTML={{ __html: html }} />;
}
export function studyLink(content: Content, mission: string) {
  const m = content.missions.find((m) => m.id === mission)!;
  return `#/unidade/${m.unit}/estudo?missao=${mission}`;
}
export function ModeLink({
  unit,
  mode,
  children,
  className = '',
}: {
  unit: UnitId;
  mode: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={`#/unidade/${unit}/${mode}`}>
      {children}
    </a>
  );
}
export function Visual({ id }: { id?: string }) {
  if (!id) return null;
  const tables: Record<string, { caption: string; heads: string[]; rows: (string | number)[][] }> =
    {
      coordenadas: {
        caption: 'Coordenadas geográficas — ordem latitude, longitude',
        heads: ['Ponto', 'Latitude', 'Longitude'],
        rows: [
          ['A', '−1°', '−48°'],
          ['B', '−5°', '−48°'],
          ['C', '−1°', '−52°'],
        ],
      },
      densidade: {
        caption: 'Municípios hipotéticos — população e área',
        heads: ['Município', 'Habitantes', 'Área (km²)'],
        rows: [
          ['A', '10.000', 10],
          ['B', '20.000', 100],
        ],
      },
      espectral: {
        caption: 'Reflectâncias adimensionais de alvos hipotéticos',
        heads: ['Alvo', 'Vermelho', 'NIR'],
        rows: [
          ['P', '0,20', '0,60'],
          ['Q', '0,10', '0,02'],
        ],
      },
      perfil: {
        caption: 'Perfil hipotético A–B',
        heads: ['Ponto', 'Distância horizontal (m)', 'Altitude (m)'],
        rows: [
          ['A', 0, 100],
          ['B', 200, 140],
        ],
      },
    };
  const t = tables[id];
  if (!t) return null;
  return (
    <figure className="visual">
      <figcaption>{t.caption}</figcaption>
      {id === 'perfil' && (
        <svg
          viewBox="0 0 460 170"
          role="img"
          aria-label="Seção entre A, a 100 metros de altitude, e B, a 140 metros; distância horizontal de 200 metros."
        >
          <path d="M50 20V130H420" fill="none" stroke="currentColor" />
          <path d="M50 115L150 93L255 85L400 35V130H50Z" fill="var(--soft)" />
          <path
            d="M50 115L150 93L255 85L400 35"
            fill="none"
            stroke="var(--green)"
            strokeWidth="3"
          />
          <text x="52" y="106">
            A · 100 m
          </text>
          <text x="315" y="25">
            B · 140 m
          </text>
          <text x="165" y="156">
            200 m horizontais
          </text>
        </svg>
      )}
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {t.heads.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((r, i) => (
              <tr key={i}>
                {r.map((v, j) => (
                  <td key={j}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="micro">Dados didáticos V6. Não representam levantamento oficial.</p>
    </figure>
  );
}
export function Feedback({
  content,
  q,
  choice,
  omitted = false,
}: {
  content: Content;
  q: Question;
  choice?: string;
  omitted?: boolean;
}) {
  const option = q.options.find((o) => o.id === choice),
    correct = choice === q.correct,
    c = content.concepts.find((c) => c.id === q.concept)!;
  return (
    <section
      className={'feedback ' + (correct ? 'correct' : 'incorrect')}
      aria-label="Feedback explicativo"
      tabIndex={-1}
    >
      <ResponseSignal item={q.id} />
      <h3>
        {omitted
          ? 'Questão sem resposta'
          : correct
            ? 'Resposta correta'
            : 'Vamos ajustar o raciocínio'}
      </h3>
      <p>
        <strong>{q.options.find((o) => o.id === q.correct)?.text}</strong> {q.explanation}
      </p>
      {!correct && option && (
        <p>
          <b>Sua escolha:</b> {option.text}
          <br />
          {option.feedback}
        </p>
      )}
      <p>{c.mechanism}</p>
      <p className="example">
        <b>Exemplo:</b> {c.example}
      </p>
      <details>
        <summary>Comparar alternativas e aprofundar</summary>
        {q.qualityFlags?.includes('numeric-duplicate-distractor') && (
          <p>
            Observação de notação: na origem, −42,3° e −42,30° são dois distratores que representam
            o mesmo número. Ambos estão incorretos: 42°30′W = −(42 + 30/60) = −42,5°. As opções
            históricas foram preservadas.
          </p>
        )}
        {q.options.map((o) => (
          <div className="option-explanation" key={o.id}>
            <strong>
              {o.id === q.correct ? 'Correta: ' : 'Distrator: '}
              {o.text}
            </strong>
            <p>{o.feedback}</p>
          </div>
        ))}
        <p>
          <b>Confusão a evitar:</b> {c.confusion}
        </p>
        {q.originalFeedback.length > 0 && (
          <details>
            <summary>Explicações originais preservadas</summary>
            {q.originalFeedback.map((x, i) => (
              <p key={i}>{x}</p>
            ))}
          </details>
        )}
        <Provenance refs={q.refs} />
      </details>
      <p>
        <b>Próximo passo:</b> {c.repair}{' '}
        <a href={studyLink(content, q.mission)}>Rever a explicação</a>.
      </p>
    </section>
  );
}
export function CompassArt() {
  return (
    <svg
      className="compass-art"
      viewBox="0 0 300 230"
      role="img"
      aria-label="Ilustração de uma rosa dos ventos sobre linhas de um mapa"
    >
      <defs>
        <pattern id="v6-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="currentColor" opacity=".14" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="300" height="230" fill="url(#v6-grid)" />
      <path
        d="M0 190Q80 115 150 160T300 60M0 200Q70 130 150 177T300 80"
        fill="none"
        stroke="currentColor"
        opacity=".22"
      />
      <g transform="translate(156 110)">
        <circle r="69" fill="none" stroke="currentColor" opacity=".35" />
        <circle r="51" fill="none" stroke="currentColor" opacity=".2" />
        <path d="M0-65L13 0L0 65L-13 0Z" fill="currentColor" />
        <path d="M-65 0L0-13L65 0L0 13Z" fill="currentColor" opacity=".35" />
        <circle r="5" fill="var(--paper)" />
        <text x="-5" y="-78">
          N
        </text>
        <text x="-4" y="91">
          S
        </text>
        <text x="80" y="5">
          L
        </text>
        <text x="-91" y="5">
          O
        </text>
      </g>
    </svg>
  );
}
