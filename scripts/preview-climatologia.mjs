import { writeFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { buildCandidate, candidatePath } from './build-climatologia-candidate.mjs';

const escape = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
export function preview(base) {
  const c = base.content;
  const question = (q) =>
    `<article class="exercise" id="${q.id}"><p><b>${escape(q.origin === 'authored' ? 'Aplicação autoral A–E' : 'Fixação preservada')}</b></p><h4>${escape(q.prompt)}</h4>${q.visual ? `<p><a href="#${q.visual}">Consultar climograma e tabela</a></p>` : ''}<ol type="A">${q.options.map((o) => `<li>${escape(o.text)}</li>`).join('')}</ol><details><summary>Conferir raciocínio e alternativas</summary><p><b>Resposta: ${String.fromCharCode(65 + q.options.findIndex((o) => o.id === q.correct))}.</b> ${escape(q.explanation)}</p><ol type="A">${q.options.map((o) => `<li>${escape(o.feedback)}</li>`).join('')}</ol></details></article>`;
  const content = c.missions
    .map(
      (m) =>
        `<section id="${m.id}"><h2>${escape(m.title)}</h2><p>${escape(m.goal)}</p>${m.sections.map((s) => `<section id="${s.id}"><h3>${escape(s.title)}</h3><p><em>${escape(s.hook)}</em></p>${s.html}</section>`).join('')}${m.recalls.map((r) => `<aside><h3>Recupere sem consultar</h3><p>${escape(r.prompt)}</p><details><summary>Comparar com resposta-modelo</summary><p>${escape(r.model)}</p></details></aside>`).join('')}<details class="bank"><summary>Questões desta etapa</summary>${c.questions
          .filter((q) => q.mission === m.id)
          .map(question)
          .join(
            '',
          )}</details><details class="bank"><summary>Flashcards desta etapa</summary>${c.cards
          .filter((q) => q.mission === m.id)
          .map(
            (q) =>
              `<details id="${q.id}"><summary>${escape(q.front)}</summary><p>${escape(q.back)}</p></details>`,
          )
          .join('')}</details><details class="bank"><summary>Game V/F desta etapa</summary>${c.game
          .filter((q) => q.mission === m.id)
          .map(
            (q) =>
              `<details id="${q.id}"><summary>${escape(q.statement)}</summary><p><b>${q.truth ? 'Verdadeiro' : 'Falso'}.</b> ${escape(q.justification)}</p></details>`,
          )
          .join('')}</details></section>`,
    )
    .join('');
  const page = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Climatologia — prévia editorial V6</title><style>
  :root{color-scheme:light dark;--bg:#f7f8f3;--fg:#20332c;--card:#fff;--line:#bcc9be;--link:#075d4a}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:17px/1.65 system-ui,sans-serif}main{max-width:900px;margin:auto;padding:20px}h1,h2,h3,h4{line-height:1.3;overflow-wrap:anywhere}h1{font-size:2rem}h2{font-size:1.65rem}h3{font-size:1.3rem}h4{font-size:1.05rem}main>section{margin:36px 0;padding-top:16px;border-top:2px solid var(--line)}section section,aside,.exercise{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px;margin:16px 0}a{color:var(--link)}figure{margin:16px 0}figcaption,caption{font-size:.9rem}table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:.88rem}td,th{border:1px solid var(--line);padding:6px;overflow-wrap:anywhere;text-align:left}details{margin:12px 0;padding:8px;border:1px solid var(--line);border-radius:8px}summary{cursor:pointer;padding:6px;min-height:44px}summary:focus-visible,a:focus-visible{outline:3px solid var(--link);outline-offset:3px}ol{padding-left:24px}li{padding:4px 0}svg{max-width:100%}nav ol{columns:2}p{overflow-wrap:anywhere}@media(max-width:500px){main{padding:12px}section section,aside,.exercise{padding:10px}nav ol{columns:1}table{font-size:.8rem}}@media(prefers-color-scheme:dark){:root{--bg:#12201c;--fg:#e6eee8;--card:#1b3028;--line:#738b7e;--link:#9ee2c4}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;animation:none!important;transition:none!important}}
  </style></head><body><main id="conteudo"><header><p>Missão Aprovação Geo V6 · prévia editorial local</p><h1>Climatologia</h1><p>Candidata 0.1.0, em auditoria. Esta prévia permite ler o conteúdo; não registra respostas nem altera seu progresso. Ainda não está integrada ao site.</p><p>13 etapas · 38 questões (34 preservadas + 4 novas) · 50 flashcards · 100 itens V/F · 2 discursivas.</p></header><nav aria-label="Etapas"><ol>${c.missions.map((m) => `<li><a href="#${m.id}">${escape(m.title)}</a></li>`).join('')}</ol></nav>${content}<section><h2>Discursivas autorais</h2>${c.writing.map((w) => `<article><h3>${escape(w.prompt)}</h3><p>Treino didático de 15–30 linhas; não é regra oficial de prova.</p><details><summary>Resposta-modelo e critérios</summary><p>${escape(w.model)}</p><ul>${w.rubric.map((r) => `<li>${escape(r)}</li>`).join('')}</ul></details></article>`).join('')}</section><section><h2>Matriz de revisão e prática docente</h2>${c.supplements
    .filter((s) => ['v6-clima-matrixBox', 'v6-clima-teacherBox'].includes(s.id))
    .map((s) => s.html)
    .join(
      '',
    )}</section><footer><h2>Referências e alcance da conferência</h2><ul>${base.metadata.sources.map((s) => `<li>${s.url ? `<a href="${escape(s.url)}" rel="noopener noreferrer">${escape(s.title)}</a>` : escape(s.title)} — ${escape(s.scope)}</li>`).join('')}</ul><p>Conferência registrada em 06/11/2026. Aprovação canônica, integração e homologação humana não atribuídas.</p></footer></main></body></html>`;
  assert.ok(
    !/<script\b|\bon\w+\s*=/i.test(page),
    'A prévia não pode executar controles do legado.',
  );
  return page;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { base } = await buildCandidate();
  const text = preview(base),
    path = resolve(candidatePath, 'previa.html');
  if (process.argv.includes('--check')) assert.equal(await readFile(path, 'utf8'), text);
  else await writeFile(path, text);
  console.log(path);
}
