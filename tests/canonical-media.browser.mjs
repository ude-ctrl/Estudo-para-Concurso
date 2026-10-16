import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';
import { readBundle, root, validateBundle } from '../scripts/canonical-content.mjs';

// This checks the candidate figure in isolation, with the actual theory CSS.
// It does not load candidates into the application or replace the platform E2E suite.
const baseRoot = resolve(root, 'base-conhecimento');
const registry = JSON.parse(await readFile(resolve(baseRoot, 'manifest.json'), 'utf8'));
const unit = registry.units.find((u) => u.unit_id === 'cartografia-fundamentos');
const bundle = await readBundle(baseRoot, unit.unit_id, unit.candidate_version);
validateBundle(bundle);
const css = await readFile(resolve(root, 'src/v6/styles.css'), 'utf8');
const sections = bundle.base.content.missions.flatMap((m) => m.sections);
const content = ['v6-theory-t02-14', 'v6-theory-t02-8']
  .map((id) => {
    const section = sections.find((s) => s.id === id);
    return `<section><h1>${section.title}</h1>${section.html}</section>`;
  })
  .join('');
const output = process.env.V6_MEDIA_EVIDENCE_DIR
  ? resolve(process.env.V6_MEDIA_EVIDENCE_DIR)
  : await mkdtemp(resolve(tmpdir(), 'v6-canonical-media-'));
await mkdir(output, { recursive: true });
const scenarios = [
  { name: 'mobile-light', width: 390, theme: 'light', reducedMotion: 'no-preference' },
  { name: 'mobile-dark', width: 390, theme: 'dark', reducedMotion: 'no-preference' },
  { name: 'small-reduced-motion', width: 320, theme: 'light', reducedMotion: 'reduce' },
  { name: 'desktop-dark', width: 1000, theme: 'dark', reducedMotion: 'reduce' },
];
const luminance = (color) =>
  color
    .match(/[\d.]+/g)
    .slice(0, 3)
    .map(Number)
    .map((v) => v / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((n, v, i) => n + v * [0.2126, 0.7152, 0.0722][i], 0);
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
});
const results = [];
try {
  for (const scenario of scenarios) {
    const context = await browser.newContext({
      viewport: { width: scenario.width, height: 900 },
      offline: true,
      reducedMotion: scenario.reducedMotion,
      colorScheme: scenario.theme,
    });
    try {
      const page = await context.newPage();
      const errors = [],
        requests = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('request', (request) => requests.push(request.url()));
      await page.setContent(
        `<!doctype html><html lang="pt-BR" data-theme="${scenario.theme}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Validação isolada da figura candidata</title><style>${css}</style></head><body><main style="max-width:800px;margin:auto;padding:16px"><article class="theory">${content}</article></main></body></html>`,
      );
      const figure = page.getByRole('img', {
        name: /Mapa didático de Horizonte, território hipotético/,
      });
      assert.equal(await figure.count(), 1);
      assert.equal(await page.locator('svg [data-feature]').count(), 4);
      assert.ok((await page.locator('th[scope="col"]').count()) >= 6);
      assert.ok(
        await page.getByText('A grade local usa quilômetros', { exact: false }).isVisible(),
      );
      const measurements = await page.evaluate(() => {
        const svg = document.querySelector('svg');
        const box = svg.getBoundingClientRect();
        const ids = [...document.querySelectorAll('[id]')].map((n) => n.id);
        return {
          pageWidth: document.documentElement.clientWidth,
          bodyWidth: document.body.scrollWidth,
          svgWidth: box.width,
          svgHeight: box.height,
          color: getComputedStyle(svg).color,
          background: getComputedStyle(svg).backgroundColor,
          animations: svg.getAnimations({ subtree: true }).length,
          duplicateIds: ids.length - new Set(ids).size,
        };
      });
      assert.ok(
        measurements.bodyWidth <= measurements.pageWidth + 1,
        'A figura não deve causar rolagem horizontal na página',
      );
      assert.ok(measurements.svgWidth > 250 && measurements.svgWidth <= measurements.pageWidth);
      assert.ok(
        Math.abs(measurements.svgHeight / measurements.svgWidth - 610 / 420) < 0.01,
        'O limite de altura de figuras antigas não pode comprimir o novo mapa',
      );
      assert.equal(measurements.animations, 0);
      assert.equal(measurements.duplicateIds, 0);
      const colors = [luminance(measurements.color), luminance(measurements.background)].sort(
        (a, b) => b - a,
      );
      const contrast = (colors[0] + 0.05) / (colors[1] + 0.05);
      assert.ok(contrast >= 4.5, 'Texto do SVG precisa de contraste suficiente');
      let sourceLinkReached = false,
        scrollableTables = 0;
      for (let step = 0; step < 10 && !sourceLinkReached; step++) {
        await page.keyboard.press('Tab');
        const focus = await page.evaluate(() => ({
          tag: document.activeElement.tagName,
          tableRegion: document.activeElement.classList.contains('w'),
          overflow: document.activeElement.scrollWidth - document.activeElement.clientWidth,
        }));
        if (focus.tableRegion) {
          assert.ok(focus.overflow > 0, 'O foco automático deve corresponder a uma tabela rolável');
          await page.keyboard.press('ArrowRight');
          await page.waitForFunction(() => document.activeElement.scrollLeft > 0);
          scrollableTables++;
        }
        sourceLinkReached = focus.tag === 'A';
      }
      assert.equal(sourceLinkReached, true, 'As referências precisam ser alcançáveis por Tab');
      await figure.screenshot({ path: resolve(output, scenario.name + '.png') });
      assert.deepEqual(errors, []);
      assert.deepEqual(requests, []);
      results.push({
        ...scenario,
        passed: true,
        measurements,
        textContrast: contrast,
        keyboardSourceLinkReachable: sourceLinkReached,
        keyboardScrollableTables: scrollableTables,
        offlineRequests: 0,
        pageErrors: 0,
        screenshot: scenario.name + '.png',
      });
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(
    resolve(output, 'results.json'),
    JSON.stringify(
      {
        version: unit.candidate_version,
        purpose: 'isolated candidate SVG and theory; not a platform deployment',
        scenarios: results,
      },
      null,
      2,
    ) + '\n',
  );
}
console.log(
  JSON.stringify(
    {
      version: unit.candidate_version,
      passed: results.length,
      failed: scenarios.length - results.length,
      evidence: output,
    },
    null,
    2,
  ),
);
