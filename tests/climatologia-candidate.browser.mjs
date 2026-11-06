import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { candidatePath } from '../scripts/build-climatologia-candidate.mjs';

const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
    (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined),
});
const html = await readFile(
  process.env.CLIMA_PREVIEW_FILE || resolve(candidatePath, 'previa.html'),
  'utf8',
);
const output = process.env.CLIMA_EVIDENCE_DIR || '/tmp/climatologia-evidence';
await mkdir(output, { recursive: true });
const results = [];
try {
  for (const width of [320, 390, 1280])
    for (const colorScheme of ['light', 'dark'])
      for (const reducedMotion of ['reduce', 'no-preference']) {
        const page = await browser.newPage({
          viewport: { width, height: 900 },
          colorScheme,
          reducedMotion,
        });
        const errors = [],
          requests = [];
        page.on('pageerror', (e) => errors.push(e.message));
        page.on('request', (r) => requests.push(r.url()));
        await page.setContent(html);
        await page.locator('details').evaluateAll((ds) => ds.forEach((d) => (d.open = true)));
        assert.equal(await page.locator('svg').count(), 2);
        assert.equal(await page.locator('svg rect').count(), 24);
        assert.equal(await page.locator('svg circle').count(), 24);
        assert.equal(await page.locator('table caption').count(), 2);
        assert.equal(await page.locator('article.exercise').count(), 38);
        assert.ok(
          await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
          `Overflow ${width}`,
        );
        const answer = page.locator('article.exercise details').first();
        await answer.evaluate((d) => (d.open = false));
        await answer.locator('summary').focus();
        await page.keyboard.press('Enter');
        assert.equal(await answer.evaluate((d) => d.open), true);
        assert.deepEqual(errors, []);
        assert.deepEqual(requests, []);
        results.push({ width, colorScheme, reducedMotion, passed: true });
        if (width === 390 && reducedMotion === 'reduce')
          await page
            .locator('#v6-clima-climogramas-pratica')
            .screenshot({ path: resolve(output, `climogramas-${colorScheme}.png`) });
        await page.close();
      }
} finally {
  await browser.close();
}
await writeFile(resolve(output, 'results.json'), JSON.stringify(results, null, 2) + '\n');
console.log(
  JSON.stringify({ scenarios: results.length, passed: results.every((r) => r.passed), output }),
);
