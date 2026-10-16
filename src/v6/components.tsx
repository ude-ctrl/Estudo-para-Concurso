import { useEffect, useRef, useState } from 'react';
import type { Content, LegacyRef, Question, UnitId } from './types';
import { ResponseSignal } from './SensoryUI';
import { useV6 } from './context';
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
        <p>Conteúdo autoral V6. Revisão editorial por IA registrada na base canônica.</p>
      )}
    </details>
  );
}
export function Html({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const imgs = ref.current?.querySelectorAll('img');
    const cleanup: (() => void)[] = [];
    imgs?.forEach((img) => {
      img.loading = 'lazy';
      const fallback = () => {
        if (img.dataset.fallback) return;
        img.dataset.fallback = 'shown';
        img.hidden = true;
        const p = document.createElement('p');
        p.className = 'media-fallback';
        p.textContent =
          'Imagem externa indisponível. ' +
          img.alt +
          ' Consulte a descrição e a fonte deste recurso.';
        img.after(p);
      };
      img.addEventListener('error', fallback, { once: true });
      cleanup.push(() => img.removeEventListener('error', fallback));
      if (img.complete && img.naturalWidth === 0) fallback();
    });
    return () => cleanup.forEach((fn) => fn());
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
  const { content } = useV6();
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const visual = content.support?.visuals.find((v) => v.id === id);
  if (!visual) return null;
  const sources = Object.values(content.editorial?.unit_metadata || {}).flatMap((u) => u.sources);
  return (
    <figure className="visual">
      <figcaption>{visual.caption}</figcaption>
      {visual.svg && (
        <div className="canonical-graphic" dangerouslySetInnerHTML={{ __html: visual.svg }} />
      )}
      {visual.images && (
        <div className="image-pair">
          {visual.images.map((image) => (
            <figure key={image.url}>
              {failed[image.url] ? (
                <p className="media-fallback">Imagem externa indisponível. {image.alt}</p>
              ) : (
                <img
                  src={image.url}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  onError={() => setFailed((previous) => ({ ...previous, [image.url]: true }))}
                />
              )}
              <figcaption>{image.caption}</figcaption>
              <p className="micro">{image.credit}</p>
            </figure>
          ))}
        </div>
      )}
      {visual.heads && visual.rows && (
        <div className="table-scroll" role="region" aria-label={visual.caption} tabIndex={0}>
          <table aria-label={visual.caption}>
            <thead>
              <tr>
                {visual.heads.map((head) => (
                  <th scope="col" key={head}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visual.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((value, j) =>
                    j === 0 ? (
                      <th scope="row" key={j}>
                        {value}
                      </th>
                    ) : (
                      <td key={j}>{value}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {visual.measurement_note && <p className="editorial-note">{visual.measurement_note}</p>}
      {visual.transcript && <p className="media-transcript">{visual.transcript}</p>}
      {visual.author && <p className="micro">{visual.author}</p>}
      {[visual.source_id, visual.usage_source_id]
        .filter((id): id is string => !!id)
        .map((id) => {
          const source = sources.find((s) => s.id === id);
          return (
            source && (
              <p className="micro" key={id}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.title}
                </a>
              </p>
            )
          );
        })}
      {!visual.kind && (
        <p className="micro">Dados didáticos V6. Não representam levantamento oficial.</p>
      )}
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
export function EditorialSources({ unit }: { unit?: UnitId }) {
  const { content } = useV6();
  if (!content.editorial) return null;
  const date = (value: string) =>
    new Date(value.length === 10 ? value + 'T12:00:00' : value).toLocaleDateString('pt-BR');
  return (
    <details className="panel editorial-sources">
      <summary>Fontes e atualização do conteúdo</summary>
      {content.units
        .filter((u) => !unit || u.id === unit)
        .map((u) => {
          const version = content.editorial!.units[u.id];
          const metadata = content.editorial!.unit_metadata[u.id];
          return (
            <section key={u.id}>
              <h3>{u.title}</h3>
              <p>
                Edição {version.version}, revisada por {version.reviewer} (IA) em{' '}
                {date(version.reviewed_at)}. Autoria de estudo; não é certificação externa da banca.
              </p>
              <ul>
                {metadata.sources.map((source) => (
                  <li key={source.id}>
                    <a href={source.url} target="_blank" rel="noreferrer">
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
              <details>
                <summary>Referências temporais e alcance da conferência</summary>
                {metadata.temporal_claims.map((claim) => (
                  <article key={claim.id}>
                    <p>
                      Referência:{' '}
                      {claim.reference_date ? date(claim.reference_date) : claim.reference_year}.
                      Conferência: {claim.verified_at ? date(claim.verified_at) : 'pendente'}.
                    </p>
                    <p>{claim.note}</p>
                    {claim.review_due_at && Date.now() >= Date.parse(claim.review_due_at) && (
                      <p className="editorial-note">
                        Esta referência temporal precisa de nova conferência.
                      </p>
                    )}
                  </article>
                ))}
              </details>
            </section>
          );
        })}
    </details>
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
