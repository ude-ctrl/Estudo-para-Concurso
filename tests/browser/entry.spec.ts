import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { fresh, STATE_KEY, totalXP } from '../../src/v6/engine';

test.beforeEach(async ({ page }) => {
  await page.route('**/*', (route) =>
    new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort(),
  );
});

test('Cartografia participa de busca, ordenação, favoritos e retomada sem gravar aprendizagem', async ({
  page,
}) => {
  const state = fresh();
  state.read['v6-theory-t02-0'] = 1793793600000;
  const raw = JSON.stringify(state);
  await page.addInitScript(
    ({ key, raw }) => {
      if (!localStorage.getItem(key)) localStorage.setItem(key, raw);
    },
    { key: STATE_KEY, raw },
  );
  await page.goto('./');
  await page.getByRole('searchbox').fill('geotecnologias');
  await expect(page.locator('.lesson-card')).toHaveCount(1);
  await expect(page.locator('.module-card .start-link')).toHaveText('Continuar');
  await page
    .getByRole('button', { name: 'Adicionar aos favoritos: Cartografia e Geotecnologias' })
    .click();
  await page.locator('.main-nav').getByRole('button', { name: 'Favoritos 1', exact: true }).click();
  await expect(page.locator('.module-card')).toHaveCount(1);
  await page.reload();
  await page.locator('.main-nav').getByRole('button', { name: 'Favoritos 1', exact: true }).click();
  await expect(page.locator('.lesson-card')).toHaveCount(1);
  await page
    .locator('.main-nav')
    .getByRole('button', { name: 'Meu percurso', exact: true })
    .click();
  await expect(page.locator('.module-card')).toHaveCount(1);
  expect(await page.evaluate((key) => localStorage.getItem(key), STATE_KEY)).toBe(raw);
  await page
    .locator('.main-nav')
    .getByRole('button', { name: /Biblioteca/ })
    .click();
  await page.getByRole('combobox', { name: 'Ordenar temas' }).selectOption('name');
  const titles = await page.locator('.lesson-grid h3').allTextContents();
  expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b, 'pt-BR')));
});

for (const hash of [
  '/unidade/cartografia-representacao/treino?missao=escalas&banco=concurso',
  '/caderno',
  '/configuracoes',
]) {
  test(`atalho salvo na raiz preserva destino ${hash}`, async ({ page }) => {
    await page.goto('./#' + hash);
    await expect(page).toHaveURL(
      new RegExp('v6\\.html#' + hash.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$'),
    );
    await expect(
      page
        .locator('.v6-app, .app-shell')
        .or(page.getByRole('link', { name: 'Todos os temas', exact: true })),
    ).not.toHaveCount(0);
  });
}

test('entrada mobile mantém teclado, redução de movimento e largura sem transbordamento', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(page.locator('.lesson-card')).toHaveCount(25);
  await page.getByRole('searchbox').fill('Cartografia');
  const link = page.locator('.module-card .start-link');
  await link.focus();
  await expect(link).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.screenshot({ path: info.outputPath('entrada-mobile.png'), fullPage: true });
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Linguagem e leitura de mapas');
});

test('cópia da biblioteca inclui progresso V6 e permite sua restauração sem perder legado', async ({
  page,
}) => {
  const state = fresh();
  state.read['v6-theory-t02-0'] = 1793793600000;
  state.drafts['exemplo'] = 'Meu raciocínio';
  const raw = JSON.stringify(state);
  const legacy = '{"u":3,"a":{}}';
  await page.addInitScript(
    ({ key, raw, legacy }) => {
      if (!localStorage.getItem(key)) localStorage.setItem(key, raw);
      localStorage.setItem('t1i_v21', legacy);
    },
    { key: STATE_KEY, raw, legacy },
  );
  await page.goto('./');
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Salvar cópia do progresso', exact: true }).click();
  const path = (await (await downloading).path())!;
  const copy = JSON.parse(await readFile(path, 'utf8'));
  expect(copy.legacyStorage[STATE_KEY]).toBe(raw);
  expect(copy.legacyStorage.t1i_v21).toBe(legacy);
  await page.goto('./v6.html#/configuracoes');
  await page.locator('input[type=file]').setInputFiles(path);
  await expect(page.getByText(/Cópia da biblioteca identificada/)).toBeVisible();
  await page.getByRole('button', { name: 'Restaurar esta cópia V6', exact: true }).click();
  const restored = JSON.parse(
    (await page.evaluate((key) => localStorage.getItem(key), STATE_KEY))!,
  );
  expect(restored.read).toEqual(state.read);
  expect(restored.drafts).toEqual(state.drafts);
  expect(totalXP(restored)).toBe(totalXP(state));
  expect(await page.evaluate(() => localStorage.getItem('t1i_v21'))).toBe(legacy);
});
