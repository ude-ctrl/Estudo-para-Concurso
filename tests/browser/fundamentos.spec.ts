import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import type { Content } from '../../src/v6/types';
import { fresh, STATE_KEY, totalXP } from '../../src/v6/engine';

const content: Content = JSON.parse(await readFile(new URL('../../public/v6/plataforma.json', import.meta.url), 'utf8'));
const unit = 'fundamentos-geografia';
const missions = content.missions.filter((m) => m.unit === unit);
const path = (mode: string, mission = '') => `./v6.html#/unidade/${unit}/${mode}${mission ? '?missao=' + mission : ''}`;
const saved = (page: import('@playwright/test').Page) => page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
const errors = new WeakMap<object, string[]>();
test.beforeEach(async ({ page }) => {
  const log: string[] = []; errors.set(page, log);
  page.on('pageerror', (e) => log.push(e.message));
  await page.route('**/*', (route) => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
});
test.afterEach(async ({ page }) => expect(errors.get(page)).toEqual([]));

test('Fundamentos tem entrada única, busca, favoritos e progresso separado de Cartografia', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('.module-card')).toHaveCount(2);
  const module = page.getByRole('article', { name: 'Fundamentos, Conceitos e Autores', exact: true });
  await expect(module).toContainText('48 questões');
  await expect(module).toContainText('45 flashcards');
  await page.getByRole('searchbox').fill('tema 01');
  await expect(page.locator('.lesson-card')).toHaveCount(1);
  await module.getByRole('button', { name: /Adicionar aos favoritos/ }).click();
  await module.locator('.start-link').click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(missions[0].title);
  await expect(page.locator('iframe')).toHaveCount(0);
  await page.getByRole('button', { name: 'Registrar que estudei esta explicação', exact: true }).first().click();
  await page.goto('./');
  await expect(module.locator('.start-link')).toHaveText('Continuar');
  await expect(page.getByRole('article', { name: 'Cartografia e Geotecnologias', exact: true }).locator('.start-link')).toHaveText('Estudar');
  await page.locator('.main-nav').getByRole('button', { name: 'Favoritos 1', exact: true }).click();
  await expect(page.locator('.module-card')).toHaveCount(1);
});

for (const mode of ['study', 'flash', 'game']) {
  test(`Fundamentos: link histórico ${mode} abre o destino V6 e mantém a chave antiga`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('t1i_v21', '{"a":{"b_0_0":1}}'));
    await page.goto(`./#/missao/lesson-ff1de1c07eb3?modo=${mode}`);
    await expect(page).toHaveURL(new RegExp(`/unidade/${unit}/${mode === 'flash' ? 'revisao' : mode === 'game' ? 'treino' : 'estudo'}$`));
    await expect(page.locator('iframe')).toHaveCount(0);
    expect(await page.evaluate(() => localStorage.getItem('t1i_v21'))).toBe('{"a":{"b_0_0":1}}');
  });
}

test('Fundamentos: todas as 11 missões mostram integralmente as 22 explicações, com recalls e suplementos', async ({ page }) => {
  for (const mission of missions) {
    await page.goto(path('estudo', mission.id));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(mission.title);
    // Compare rendered text with the approved HTML, including collapsed details.
    const approved = await page.evaluate((sections) => sections.map((section) => {
      const div = document.createElement('div'); div.innerHTML = section.html;
      return div.textContent?.replace(/\s+/g, ' ').trim();
    }), mission.sections);
    const theory = await page.locator('.reading-section').allTextContents();
    for (const text of approved) expect(theory.some((t) => t.replace(/\s+/g, ' ').includes(text!))).toBe(true);
    await expect(page.locator('.recall-group > details')).toHaveCount(mission.recalls.length);
    const ids = await page.locator('[id]').evaluateAll((els) => els.map((e) => e.id));
    expect(new Set(ids).size).toBe(ids.length);
  }
  await page.goto(path('estudo', 'fundamentos-redes'));
  await page.getByText('Revisão integradora e aplicação em aula', { exact: true }).click();
  await expect(page.locator('.study-aside')).toContainText('território-rede');
});

test('Fundamentos: treino contextual troca a missão anterior e diagnóstico usa seu próprio banco', async ({ page }) => {
  await page.goto(path('treino', 'fundamentos-espaco'));
  await page.getByRole('button', { name: 'Iniciar questões', exact: true }).click();
  const previous = (await saved(page)).session.id;
  await page.goto(path('estudo', 'fundamentos-redes'));
  await page.getByRole('button', { name: 'Registrar que estudei esta explicação', exact: true }).first().click();
  await page.getByRole('link', { name: 'Testar este raciocínio sem consulta', exact: true }).click();
  await page.getByRole('button', { name: 'Iniciar questões', exact: true }).click();
  const contextual = (await saved(page)).session;
  expect(contextual.id).not.toBe(previous);
  expect(contextual.ids.every((id: string) => content.questions.find((q) => q.id === id)?.mission === 'fundamentos-redes')).toBe(true);
  await page.goto(path('treino') + '?banco=diagnostico');
  await page.getByRole('button', { name: 'Iniciar questões', exact: true }).click();
  expect((await saved(page)).session.pool).toBe('diagnostico');
});

test('Fundamentos: questão A–E mostra explicações, conserva ordem e registra erro global', async ({ page }) => {
  await page.goto(path('treino') + '?banco=concurso');
  await page.getByRole('button', { name: 'Iniciar questões', exact: true }).click();
  await expect(page.getByRole('radio')).toHaveCount(5);
  const before = await page.locator('.question-options label').allTextContents();
  await page.reload();
  await expect(page.getByRole('radio')).toHaveCount(5);
  expect(await page.locator('.question-options label').allTextContents()).toEqual(before);
  const s = await saved(page), q = content.questions.find((q) => q.id === s.session.ids[0])!;
  const wrong = q.options.find((o) => o.id !== q.correct)!;
  await page.locator(`input[type=radio][value="${wrong.id}"]`).check();
  await page.getByRole('button', { name: 'Confirmar resposta', exact: true }).click();
  await expect(page.locator('.feedback')).toContainText(wrong.feedback);
  const after = await saved(page);
  expect(Object.values(after.errors).some((e: any) => e.unit === unit)).toBe(true);
  await page.goto('./v6.html#/caderno');
  await expect(page.locator('.error-card').first()).toBeVisible();
});

test('Fundamentos: flashcards usam quatro avaliações e agenda individual sem erro por Difícil', async ({ page }) => {
  await page.goto(path('revisao'));
  await page.getByRole('button', { name: 'Iniciar revisão de até 12 cartões' }).click();
  await expect(page.getByRole('button', { name: 'Revelar resposta' })).toBeDisabled();
  await page.getByLabel('Tentei recuperar a resposta antes de conferir').check();
  await page.getByRole('button', { name: 'Revelar resposta' }).click();
  await expect(page.locator('.rating-grid button')).toHaveCount(4);
  await page.getByRole('button', { name: /^Difícil/ }).click();
  const state = await saved(page);
  expect(Object.values(state.reviews)[0]).toMatchObject({ rating: 'dificil', reviews: 1 });
  expect(state.errors).toEqual({});
  await page.reload();
  expect((await saved(page)).reviews).toEqual(state.reviews);
});

test('Fundamentos: Game V/F entrega justificativa e mantém a resposta após recarregar', async ({ page }) => {
  await page.goto(path('treino'));
  await page.getByRole('button', { name: 'Game V/F', exact: true }).click();
  await page.getByRole('button', { name: 'Iniciar 10 afirmações', exact: true }).click();
  const state = await saved(page), item = content.game.find((g) => g.id === state.session.ids[0])!;
  await page.getByRole('button', { name: /Verdadeiro/ }).click();
  await expect(page.locator('.game-exercise')).toContainText(item.justification);
  await page.reload();
  await expect(page.locator('.game-exercise')).toContainText(item.justification);
});

test('Fundamentos: prova usa somente a unidade e mantém feedback fechado até encerrar', async ({ page }) => {
  await page.goto(path('prova'));
  await expect(page.getByRole('combobox', { name: 'Recorte' })).toHaveValue(unit);
  await page.getByRole('combobox', { name: 'Questões', exact: true }).selectOption('5');
  await page.getByRole('button', { name: 'Iniciar prova do piloto' }).click();
  const state = await saved(page);
  expect(state.exam.ids.every((id: string) => content.questions.find((q) => q.id === id)?.unit === unit)).toBe(true);
  await page.getByRole('radio').first().check();
  await expect(page.locator('.feedback')).toHaveCount(0);
  await page.getByText('Encerrar e liberar correção', { exact: true }).click();
  await page.getByRole('button', { name: 'Confirmar encerramento da prova' }).click();
  await expect(page.getByText('Correção liberada', { exact: true })).toBeVisible();
});

test('Fundamentos: duas discursivas e microaula preservam rascunhos e histórico próprios', async ({ page }) => {
  await page.goto(path('prova'));
  await page.getByRole('button', { name: 'Discursiva', exact: true }).click();
  await expect(page.getByRole('combobox', { name: 'Proposta rotativa' }).locator('option')).toHaveCount(2);
  await page.getByLabel('Sua resposta antes do modelo').fill('As conexões articulam lugares de forma seletiva, com apropriação e controle distintos.');
  await page.reload();
  await page.getByRole('button', { name: 'Discursiva', exact: true }).click();
  await expect(page.getByLabel('Sua resposta antes do modelo')).toHaveValue(/articulam lugares/);
  await page.getByRole('button', { name: 'Prática de aula', exact: true }).click();
  await page.getByLabel('Roteiro da microaula').fill('Use as rotas de ônibus do bairro para explicar conexões, apropriação e controle das redes.');
  for (const select of await page.locator('.panel select').all()) await select.selectOption('2');
  await page.getByRole('button', { name: 'Registrar microaula e feedback' }).click();
  await expect(page.getByRole('button', { name: 'Registrar microaula e feedback' })).toBeDisabled();
  const state = await saved(page);
  expect(state.practicalHistory).toHaveLength(1);
  expect(state.practicalHistory[0].practiceId).toBe('v6-fund-practice');
  expect(totalXP(state)).toBe(0);
  await page.reload();
  await page.getByRole('button', { name: 'Prática de aula', exact: true }).click();
  await expect(page.getByLabel('Roteiro da microaula')).toHaveValue(/rotas de ônibus/);
  await page.goto('./v6.html#/unidade/cartografia-fundamentos/prova');
  await page.getByRole('button', { name: 'Prática de aula', exact: true }).click();
  await expect(page.getByLabel('Tema', { exact: true })).not.toHaveValue(/ônibus/);
});

test('Fundamentos: importação mantém bruto, revalida cartões e não inventa XP ou domínio', async ({ page }) => {
  const raw = JSON.stringify({ a: { b_0_0: 1 }, fc: { 0: 'ok', 1: 'rev' }, g: { miss: { 0: 1 } }, u: 10, bx: 5000 });
  await page.addInitScript((raw) => localStorage.setItem('t1i_v21', raw), raw);
  await page.goto('./v6.html#/configuracoes');
  await page.getByRole('button', { name: 'Procurar legado neste navegador' }).click();
  await page.getByRole('button', { name: 'Importar estas chaves de Fundamentos e Cartografia' }).click();
  const state = await saved(page);
  expect(state.migrations.t1i_v21.imported).toBe(4);
  expect(state.migrations.t1i_v21.raw).toBe(raw);
  expect(state.legacyHistory).toHaveLength(4);
  expect(Object.keys(state.reviews)).toHaveLength(2);
  expect(state.evidence).toHaveLength(0);
  expect(totalXP(state)).toBe(0);
  expect(await page.evaluate(() => localStorage.getItem('t1i_v21'))).toBe(raw);
  await page.getByRole('button', { name: 'Procurar legado neste navegador' }).click();
  await page.getByRole('button', { name: 'Importar estas chaves de Fundamentos e Cartografia' }).click();
  expect((await saved(page)).legacyHistory).toHaveLength(4);
});

for (const width of [320, 390]) {
  test(`Fundamentos: ${width}px, tema escuro, teclado, reduced-motion e tabela acessível`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
    const state = fresh(); state.preferences.theme = 'dark';
    await page.addInitScript(({ state, key }) => localStorage.setItem(key, JSON.stringify(state)), { state, key: STATE_KEY });
    await page.goto(path('estudo', 'fundamentos-leitura-de-questoes'));
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const action = page.getByRole('button', { name: 'Registrar que estudei esta explicação', exact: true }).first();
    await action.focus(); await expect(action).toBeFocused(); await page.keyboard.press('Enter');
    expect(Object.keys((await saved(page)).read)).toHaveLength(1);
    await expect(page.locator('.reading-section table').first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: info.outputPath(`fundamentos-${width}.png`), fullPage: true });
  });
}


test('Fundamentos: favorito histórico reaparece como entrada canônica única e pode ser removido', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('missao-geografia:preferences:v1', JSON.stringify({ favorites: ['lesson-ff1de1c07eb3', 'lesson-ff1de1c07eb3'], lastVisited: 'lesson-ff1de1c07eb3' })));
  await page.goto('./');
  await page.locator('.main-nav').getByRole('button', { name: 'Favoritos 1', exact: true }).click();
  await expect(page.locator('.module-card')).toHaveCount(1);
  await page.getByRole('button', { name: 'Remover dos favoritos: Fundamentos, Conceitos e Autores', exact: true }).click();
  await expect(page.locator('.lesson-card')).toHaveCount(0);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('missao-geografia:preferences:v1')!).favorites)).toEqual([]);
});

test('Fundamentos: recall mantém tentativa, libera modelo depois da escrita e registra recuperação', async ({ page }) => {
  await page.goto(path('estudo', 'fundamentos-espaco'));
  await page.locator('.recall-group > details').first().locator('summary').first().click();
  await page.getByLabel('Sua tentativa de memória').fill('Os objetos e as ações formam uma relação indissociável; uma via física muda de função conforme os fluxos e os usos.');
  await page.reload();
  await page.locator('.recall-group > details').first().locator('summary').first().click();
  await expect(page.getByLabel('Sua tentativa de memória')).toHaveValue(/indissociável/);
  await page.getByRole('button', { name: 'Registrar tentativa e conferir' }).click();
  await page.getByRole('button', { name: 'Consegui explicar' }).click();
  await expect(page.getByText('Evocação registrada.', { exact: false })).toBeVisible();
  expect((await saved(page)).evidence.some((e: any) => e.unit === unit && e.kind === 'recall')).toBe(true);
});
