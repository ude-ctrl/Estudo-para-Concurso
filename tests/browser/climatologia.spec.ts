import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { STATE_KEY } from '../../src/v6/engine';
const bank = JSON.parse(
  await readFile(new URL('../../public/v6/plataforma.json', import.meta.url), 'utf8'),
);
const missions = bank.missions.filter((m: any) => m.unit === 'climatologia');
test('acesso antigo abre Climatologia V6 e importa histórico uma única vez', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('./');
  await page.evaluate(() =>
    localStorage.setItem(
      'seducpa_t2_clima_v26',
      JSON.stringify({ a: { b_0_0: 0 }, fc: { 0: 'ok' }, g: { miss: { 0: 1 } } }),
    ),
  );
  await page.goto('./#/missao/lesson-92668ec707af');
  await expect(page).toHaveURL(/v6.html#\/unidade\/climatologia\/estudo/);
  await expect(page.locator('iframe')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: missions[0].title, exact: true })).toBeVisible();
  const before = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
  expect(before.migrations.seducpa_t2_clima_v26.imported).toBe(3);
  await page.reload();
  const after = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
  expect(after.legacyHistory).toEqual(before.legacyHistory);
  expect(await page.evaluate(() => localStorage.getItem('seducpa_t2_clima_v26'))).toBeTruthy();
  expect(errors).toEqual([]);
});
test('seções novas e os dois climogramas são acessíveis no percurso', async ({ page }) => {
  for (const id of [
    'v6-clima-atmosfera-estrutura',
    'v6-clima-maranhao',
    'v6-clima-climogramas-pratica',
  ]) {
    const m = missions.find((m: any) => m.sections.some((s: any) => s.id === id));
    await page.goto('./v6.html#/unidade/climatologia/estudo?missao=' + m.id);
    const section = page.locator('[data-resource-id="' + id + '"]');
    await expect(section).toBeVisible();
    if ((await section.getAttribute('open')) === null) await section.locator('summary').click();
    await expect(section.locator('.reading-body')).toBeVisible();
  }
  await expect(page.locator('svg[role="img"]')).toHaveCount(2);
});
