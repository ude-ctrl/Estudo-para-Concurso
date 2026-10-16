import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import type { Catalog } from '../../src/types';

const catalog: Catalog = JSON.parse(
  await readFile(new URL('../../public/content/catalog.json', import.meta.url), 'utf8'),
);
const t01 = catalog.lessons.find((lesson) => lesson.number === 1)!;
const urban = catalog.lessons.find((lesson) => lesson.number === 11)!;

test.beforeEach(async ({ page }) => {
  // External font/media access is tested separately from application navigation.
  await page.route('**/*', (route) =>
    new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort(),
  );
});

test('biblioteca mostra todo o acervo e suas contagens', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./biblioteca.html');
  await expect(page.locator('.lesson-card')).toHaveCount(26);
  await expect(page.locator('.stats-grid')).toContainText('1.294');
  await expect(page.locator('.stats-grid')).toContainText('2.600');
  expect(errors).toEqual([]);
});

test('busca ignora acentos e Cartografia histórica não aparece como opção de estudo', async ({
  page,
}) => {
  await page.goto('./biblioteca.html');
  await page.getByRole('searchbox').fill('tectonica');
  await expect(page.locator('.lesson-card')).toHaveCount(1);
  await expect(page.locator('.lesson-card')).toContainText('TEMA 05');
  await page.getByRole('button', { name: 'Limpar busca' }).click();
  await expect(
    page.getByLabel('Filtrar por área').locator('option', { hasText: 'Cartografia' }),
  ).toHaveCount(0);
  await page.getByRole('searchbox').fill('Cartografia II');
  await expect(page.locator('.lesson-card')).toHaveCount(0);
  await page.getByRole('searchbox').fill('assunto-inexistente');
  await expect(page.getByRole('heading', { name: 'Nenhum tema encontrado' })).toBeVisible();
  await page.getByRole('button', { name: 'Ver toda a biblioteca' }).click();
  await expect(page.locator('.lesson-card')).toHaveCount(26);
});

test('favoritos persistem e podem ser removidos', async ({ page }) => {
  await page.goto('./biblioteca.html');
  await page
    .getByRole('button', { name: `Adicionar aos favoritos: ${t01.title}`, exact: true })
    .click();
  await page.reload();
  await page
    .locator('.main-nav')
    .getByRole('button', { name: /Favoritos/ })
    .click();
  await expect(page.locator('.lesson-card')).toHaveCount(1);
  await page
    .getByRole('button', { name: `Remover dos favoritos: ${t01.title}`, exact: true })
    .click();
  await expect(page.getByRole('heading', { name: 'Guarde seus próximos temas' })).toBeVisible();
});

test('uma resposta na página existente atualiza o catálogo e permite retomar', async ({ page }) => {
  await page.goto('./biblioteca.html');
  await page.locator('.lesson-card h3').getByRole('link', { name: t01.title, exact: true }).click();
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('#w_b_0_0 .o')).toHaveCount(4);
  await frame.locator('#w_b_0_0 .o').nth(1).click();
  await page.getByRole('link', { name: 'Biblioteca', exact: true }).click();
  const card = page
    .locator('.lesson-card')
    .filter({ has: page.locator('h3', { hasText: t01.title }) });
  await expect(card).toContainText('3% das questões');
  await expect(page.locator('.resume-card').filter({ hasText: t01.title })).toContainText(
    '1 de 29 questões respondidas',
  );
  await page.locator('.main-nav').getByRole('button', { name: 'Meu percurso' }).click();
  await expect(page.locator('.lesson-card')).toHaveCount(1);
});

test('atalhos abrem flashcards e game sem perder a navegação', async ({ page }) => {
  await page.goto(`./biblioteca.html#/missao/${t01.id}?modo=flash`);
  const frame = page.frameLocator('iframe');
  await expect(frame.locator('#tab-flash')).toBeVisible();
  await page.locator('.skip-link').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#\/missao\//);
  await frame.locator('#memoryCard').click();
  await expect(frame.getByRole('button', { name: '👍 Lembrei' })).toBeVisible();
  await frame.getByRole('button', { name: '👍 Lembrei' }).click();
  await page.locator('.reader-tabs').getByRole('link', { name: 'Game', exact: true }).click();
  await expect(frame.locator('#tab-game')).toBeVisible();
  await expect(frame.locator('.game-launch')).toBeVisible();
  await page.reload();
  await expect(page.frameLocator('iframe').locator('#tab-game')).toBeVisible();
});

test('progresso legado é lido sem contar respostas inválidas', async ({ page }) => {
  await page.addInitScript(
    ({ key }) =>
      localStorage.setItem(
        key,
        JSON.stringify({ a: { b_0_0: 0, b_0_1: 999, fantasma: 1 }, u: 1, fc: { 0: 'ok' } }),
      ),
    { key: urban.storage.previous! },
  );
  await page.goto('./biblioteca.html');
  await page.locator('.main-nav').getByRole('button', { name: 'Meu percurso' }).click();
  await expect(page.locator('.lesson-card')).toHaveCount(1);
  await expect(page.locator('.lesson-card')).toContainText('2% das questões');
});

test('exportação contém uma cópia identificada do progresso', async ({ page }) => {
  await page.goto('./biblioteca.html');
  await page
    .getByRole('button', { name: `Adicionar aos favoritos: ${t01.title}`, exact: true })
    .click();
  const downloaded = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Salvar cópia do progresso' }).click();
  const download = await downloaded;
  const backup = JSON.parse(await readFile((await download.path())!, 'utf8'));
  expect(backup.schemaVersion).toBe(1);
  expect(backup.preferences.favorites).toContain(t01.id);
  expect(backup.sources).toHaveLength(30);
});

test('todas as páginas originais e dados são servidos no caminho publicado', async ({
  page,
  request,
  baseURL,
}) => {
  await page.goto('./biblioteca.html');
  for (const item of [...catalog.lessons, ...catalog.resources]) {
    const response = await request.get(new URL(item.legacyUrl, baseURL!).href);
    expect(response.status()).toBe(200);
  }
  const response = await request.get(new URL(t01.contentUrl, baseURL!).href);
  expect((await response.json()).banks.C).toHaveLength(44);
  await page.goto(`./biblioteca.html#/recurso/${catalog.resources[0].id}`);
  await expect(
    page.frameLocator('iframe').getByRole('heading', { name: 'Auditoria-Mestra dos 18 Temas' }),
  ).toBeVisible();
});

test('celular tem menu funcional e não transborda horizontalmente', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./biblioteca.html');
  await expect(page.locator('.lesson-card')).toHaveCount(26);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused();
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page
    .locator('.main-nav')
    .getByRole('button', { name: /Favoritos/ })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Seus favoritos', exact: true, level: 1 }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeVisible();
});

test('endereço principal abre V6; outros módulos ficam acessíveis sem duplicar Cartografia', async ({
  page,
}, info) => {
  await page.goto('./');
  await expect(page.locator('.unit-card')).toHaveCount(3);
  await expect(page.locator('.lesson-card')).toHaveCount(0);
  await expect(page.locator('.main-navigation a')).toHaveText([
    'Início',
    'Estudo',
    'Treino',
    'Revisão',
    'Prova',
  ]);
  await expect(page.getByText('Seu próximo passo', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Ativar modo escuro', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Ativar modo claro', exact: true })).toBeVisible();
  await page.screenshot({ path: info.outputPath('v6-entrada-canonica.png'), fullPage: true });
  await page.goto('./biblioteca.html');
  await expect(page.locator('.lesson-card')).toHaveCount(26);
  await expect(page.locator('.lesson-grid')).not.toContainText('Cartografia II');
  await page.getByRole('link', { name: 'Continuar Cartografia V6', exact: true }).click();
  await expect(page.locator('.unit-card')).toHaveCount(3);
});

test('Cartografia não auditada não é pesquisável, favoritada ou recomendada; URL antiga leva à V6', async ({
  page,
  request,
  baseURL,
}) => {
  const original = 'lesson-76fbd0d2b7a4';
  await page.addInitScript(
    ({ id }) => {
      localStorage.setItem(
        'missao-geografia:preferences:v1',
        JSON.stringify({ favorites: [id], lastVisited: id }),
      );
      localStorage.setItem(
        'seducpa_t3_carto2_v26',
        JSON.stringify({ a: { b_0_0: 1 }, fc: { 0: 'ok' } }),
      );
    },
    { id: original },
  );
  await page.goto('./biblioteca.html');
  await expect(page.locator('.resume-card')).not.toContainText('Cartografia II');
  await expect(page.locator('.main-nav').getByRole('button', { name: /Favoritos/ })).toHaveText(
    'Favoritos',
  );
  await page.getByRole('searchbox').fill('Cartografia II');
  await expect(page.locator('.lesson-card')).toHaveCount(0);
  await page.getByRole('button', { name: 'Limpar busca', exact: true }).click();
  await page
    .locator('.main-nav')
    .getByRole('button', { name: /Favoritos/ })
    .click();
  await expect(page.locator('.lesson-card')).toHaveCount(0);
  const downloaded = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Salvar cópia do progresso', exact: true }).click();
  const backup = JSON.parse(await readFile((await (await downloaded).path())!, 'utf8'));
  expect(backup.sources).toHaveLength(30);
  expect(backup.legacyStorage.seducpa_t3_carto2_v26).toContain('b_0_0');
  const active = await (await request.get(new URL('content/catalog.json', baseURL!).href)).json();
  expect(active.lessons.some((item: { category: string }) => item.category === 'Cartografia')).toBe(
    false,
  );
  await page.goto(`./biblioteca.html#/missao/${original}`);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Projeções e propriedades');
  await expect(page.locator('iframe')).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('seducpa_t3_carto2_v26'))).toContain(
    'b_0_0',
  );
  await page.goto(`./#/missao/${t01.id}`);
  await expect(page.frameLocator('iframe').locator('#tab-study')).toBeVisible();
});

test('P3: contador considera favoritos ativos únicos e mantém os arquivados na cópia', async ({
  page,
}) => {
  const key = 'missao-geografia:preferences:v1';
  const favorites = ['lesson-76fbd0d2b7a4', 'lesson-76fbd0d2b7a4', t01.id, t01.id, 'unknown-id'];
  await page.addInitScript(
    ({ key, favorites }) => {
      if (!localStorage.getItem(key))
        localStorage.setItem(key, JSON.stringify({ favorites, lastVisited: null }));
    },
    { key, favorites },
  );
  await page.goto('./biblioteca.html');
  const button = page.locator('.main-nav').getByRole('button', { name: /Favoritos/ });
  await expect(button).toHaveText('Favoritos1');
  await button.click();
  await expect(page.locator('.lesson-card')).toHaveCount(1);
  const downloaded = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Salvar cópia do progresso', exact: true }).click();
  const backup = JSON.parse(await readFile((await (await downloaded).path())!, 'utf8'));
  expect(backup.preferences.favorites).toEqual(favorites);
  await page
    .getByRole('button', { name: `Remover dos favoritos: ${t01.title}`, exact: true })
    .click();
  await expect(button).toHaveText('Favoritos');
  await expect(page.locator('.lesson-card')).toHaveCount(0);
  await page.reload();
  await expect(button).toHaveText('Favoritos');
  expect(
    await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).favorites, key),
  ).toEqual(favorites.filter((id) => id !== t01.id));
});
