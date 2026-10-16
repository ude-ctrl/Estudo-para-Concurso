import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import type { Content, State } from '../../src/v6/types';
import { fresh, makeExam, schedule, STATE_KEY, DAY } from '../../src/v6/engine';

const content: Content = JSON.parse(
  await readFile(new URL('../../public/v6/cartografia.json', import.meta.url), 'utf8'),
);
const fund = 'cartografia-fundamentos',
  rep = 'cartografia-representacao',
  geo = 'geotecnologias';
const path = (unit: string, mode: string, mission = '') =>
  `./v6.html#/unidade/${unit}/${mode}${mission ? '?missao=' + mission : ''}`;
const errors = new WeakMap<object, string[]>();
test.beforeEach(async ({ page }) => {
  const list: string[] = [];
  errors.set(page, list);
  page.on('pageerror', (e) => list.push(e.message));
  await page.route('**/*', (route) =>
    new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort(),
  );
});
test.afterEach(async ({ page }) => {
  expect(errors.get(page)).toEqual([]);
});

async function save(page: import('@playwright/test').Page, state: State) {
  await page.addInitScript(
    ({ key, state }) => {
      if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(state));
    },
    { key: STATE_KEY, state },
  );
}
function round(id: string) {
  const state = fresh(),
    q = content.questions.find((q) => q.id === id)!;
  state.session = {
    id: 'canonical-test-' + id,
    kind: 'questions',
    ids: [id],
    position: 0,
    repeat: [],
    pool: q.pool,
  };
  return state;
}

test('Canônica: aplicativo usa as três edições aprovadas e apresenta fontes atuais', async ({
  page,
  request,
}) => {
  const response = await request.get('./v6/cartografia.json');
  const bank = await response.json();
  expect(bank.version).toBe('6.1.0-canonica.1');
  expect(
    Object.values(bank.editorial.units).every(
      (u: any) =>
        u.version === '1.0.0' &&
        u.status === 'APROVADA_CANONICA' &&
        u.reviewer_kind === 'delegated-ai',
    ),
  ).toBe(true);
  await page.goto('./v6.html#/configuracoes');
  await page.getByText('Fontes e atualização do conteúdo', { exact: true }).click();
  await expect(page.locator('.editorial-sources h3')).toHaveCount(3);
  await expect(page.locator('.editorial-sources')).toContainText('Codex (IA)');
  await expect(page.locator('.editorial-sources a').first()).toHaveAttribute('href', /^https:\/\//);
  await expect(page.getByText(/itens novos estão pendentes de revisão humana/)).toHaveCount(0);
});

for (const scenario of [
  { width: 390, theme: 'light' },
  { width: 390, theme: 'dark' },
  { width: 320, theme: 'dark' },
] as const) {
  test(`Canônica: mapa na leitura real ${scenario.width}px ${scenario.theme}, teclado e redução de movimento`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width: scenario.width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const state = fresh();
    state.preferences.theme = scenario.theme;
    await save(page, state);
    const mission = content.missions.find((m) =>
      m.sections.some((s) => s.id === 'v6-theory-t02-14'),
    )!;
    await page.goto(path(mission.unit, 'estudo', mission.id));
    const section = page.locator('[data-resource-id="v6-theory-t02-14"]');
    await section.locator(':scope > summary').focus();
    if ((await section.getAttribute('open')) === null) await page.keyboard.press('Enter');
    const svg = section.getByRole('img', { name: /Mapa didático de Horizonte/ });
    await expect(svg).toBeVisible();
    await expect(section).toContainText('território hipotético');
    const box = await svg.boundingBox();
    expect(box!.height / box!.width).toBeCloseTo(610 / 420, 2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
    expect(saved.evidence).toHaveLength(0);
    expect(saved.awards).toEqual({});
    expect(saved.preferences.theme).toBe(scenario.theme);
    await svg.screenshot({
      path: info.outputPath('canonical-map-' + scenario.theme + '-' + scenario.width + '.png'),
    });
  });
}

test('Canônica: perfil e nota sem escala são apresentados junto aos valores de cálculo', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 900 });
  const state = round('v6-q-r09');
  state.preferences.theme = 'dark';
  await save(page, state);
  await page.goto(path(rep, 'treino'));
  await expect(page.locator('.visual figcaption').first()).toContainText('esquema sem escala');
  await expect(page.locator('.visual')).toContainText('Não medir distâncias ou inclinação na tela');
  await expect(page.locator('.visual table')).toContainText('200');
  await expect(page.locator('.visual table')).toContainText('140');
  await expect(page.locator('.visual svg')).toBeVisible();
  expect(
    (await page.locator('.visual svg text').first().boundingBox())!.height,
  ).toBeGreaterThanOrEqual(12);
  expect(
    await page
      .locator('.visual svg text')
      .first()
      .evaluate((el) => getComputedStyle(el).fill),
  ).toBe(await page.locator('.visual svg').evaluate((el) => getComputedStyle(el).color));
  await page.locator('.visual [tabindex="0"]').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.visual [tabindex="0"]')).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('.visual').screenshot({ path: info.outputPath('canonical-profile.png') });
});

test('Canônica: Landsat mantém datas, créditos e transcrição quando imagens externas falham', async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await save(page, round('v6-q-g10'));
  await page.goto(path(geo, 'treino'));
  await expect(page.locator('.image-pair figure')).toHaveCount(2);
  await page.locator('.image-pair figure').last().scrollIntoViewIfNeeded();
  await expect(page.locator('.image-pair .media-fallback')).toHaveCount(2);
  await expect(page.locator('.visual')).toContainText('1984-09-19');
  await expect(page.locator('.visual')).toContainText('2015-09-25');
  await expect(page.locator('.visual')).toContainText('Jesse Allen');
  await expect(page.locator('.media-transcript')).toContainText('Duas cenas da mesma área');
  await expect(page.locator('.visual')).toContainText('sem revisão ou endosso da NASA');
  await page
    .locator('.visual')
    .screenshot({ path: info.outputPath('canonical-landsat-fallback.png') });
});

test('Canônica: seleção aposentada de GMS permanece histórica e exige escolha atual', async ({
  page,
}) => {
  const retired = content.editorial!.retired_options[0],
    state = round(retired.question_id);
  const key = 'answer:' + state.session!.id + ':' + retired.question_id;
  state.drafts[key] = retired.retired_option_id;
  state.awards['first:' + retired.question_id] = {
    at: Date.now() - DAY,
    xp: 4,
    reason: 'Histórico',
  };
  await save(page, state);
  await page.goto(path(fund, 'treino'));
  await expect(page.getByText(/Sua seleção anterior, −42,30°/)).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Confirmar resposta', exact: true }),
  ).toBeDisabled();
  await expect(page.getByRole('radio', { name: /−42,05°/ })).toBeVisible();
  const q = content.questions.find((q) => q.id === retired.question_id)!;
  await page.locator(`input[value="${q.correct}"]`).check();
  await page.getByRole('button', { name: 'Confirmar resposta', exact: true }).click();
  await expect(page.locator('.feedback')).toContainText('Resposta correta');
  const saved = await page.evaluate(
    ({ key, release }) => ({
      current: JSON.parse(localStorage.getItem(key)!),
      before: JSON.parse(localStorage.getItem(key + '.before-canonical-' + release)!),
    }),
    { key: STATE_KEY, release: content.editorial!.release },
  );
  expect(saved.before.drafts[key]).toBe(retired.retired_option_id);
  expect(saved.current.evidence[0].choice).toBe(q.correct);
  expect(saved.current.evidence[0].editorialVersion).toBe('1.0.0');
  expect(Object.values(saved.current.awards).reduce((n: number, a: any) => n + a.xp, 0)).toBe(4);
});

test('Canônica: caderno conserva erro de associação anterior sem transferi-lo a outro conceito', async ({
  page,
}) => {
  const state = fresh(),
    now = Date.now() - DAY,
    concept = content.concepts.find((c) => c.id === 'latitude')!;
  const item = 'v6-fix-ae06798f90e822d3',
    key = 'latitude:' + concept.errorType;
  state.errors[key] = {
    id: key,
    concept: 'latitude',
    mission: 'coordenadas-gms',
    unit: fund,
    type: concept.errorType,
    misconception: concept.confusion,
    status: 'aberto',
    first: now,
    last: now,
    count: 1,
    itemIds: [item],
    events: [{ at: now, item, correct: false, note: 'Erro da versão anterior preservado.' }],
    delayedItems: [],
    falseMastery: false,
  };
  state.evidence = [
    {
      id: 'old-evidence',
      item,
      concept: 'latitude',
      mission: 'coordenadas-gms',
      unit: fund,
      at: now,
      kind: 'fixacao',
      correct: false,
      delayed: false,
      eligible: true,
      difficulty: 1,
    },
  ];
  state.awards.historical = { at: now, xp: 99, reason: 'Histórico' };
  state.reviews[content.cards[0].id] = schedule(undefined, 'bom', now);
  const reviews = structuredClone(state.reviews);
  await save(page, state);
  await page.goto('./v6.html#/caderno');
  await expect(page.locator('.error-card')).toHaveCount(0);
  await page.getByText('Histórico preservado de versões anteriores (1)', { exact: true }).click();
  await expect(
    page.getByText('Erro da versão anterior preservado.', { exact: false }),
  ).toBeVisible();
  let stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
  expect(stored.evidence[0].concept).toBe('latitude');
  expect(stored.errors).toEqual({});
  expect(stored.awards).toEqual(state.awards);
  expect(stored.reviews).toEqual(reviews);
  await page.reload();
  stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
  expect(stored.contentHistory.errors).toHaveLength(1);
  expect(stored.awards).toEqual(state.awards);
});

test('Canônica: feedback de escala explica o fator do erro com o gabarito preservado', async ({
  page,
}) => {
  const id = 'v6-fix-021ea0f23f590e47',
    q = content.questions.find((q) => q.id === id)!;
  const wrong = q.options.find((o) => /^2\s*km\.?$/.test(o.text))!;
  expect(wrong).toBeTruthy();
  await save(page, round(id));
  await page.goto(path(fund, 'treino'));
  await page.locator(`input[value="${wrong.id}"]`).check();
  await page.getByRole('button', { name: 'Confirmar resposta', exact: true }).click();
  await expect(page.locator('.feedback')).toContainText('20 km');
  await expect(page.locator('.feedback')).toContainText(/dez|10/);
  await expect(page.locator('.feedback')).not.toContainText('Não é a melhor resposta.');
});

test('Canônica: prova anterior retoma ordem, resposta e cronômetro sem prêmio por atualização', async ({
  page,
}) => {
  const state = fresh(),
    now = Date.now();
  state.exam = makeExam(content, state, 5, 20, now, undefined, 'old-exam-resume');
  delete state.exam.editorialVersions;
  const id = state.exam.ids[0];
  state.exam.answers[id] = content.questions.find((q) => q.id === id)!.correct;
  await save(page, state);
  await page.goto(path(fund, 'prova'));
  await expect(page.getByRole('timer', { name: 'Tempo restante de prova' })).toBeVisible();
  await expect(page.locator('.question-options input:checked')).toHaveValue(state.exam.answers[id]);
  await page.reload();
  await expect(page.getByRole('timer', { name: 'Tempo restante de prova' })).toBeVisible();
  const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
  expect(saved.exam.optionOrder).toEqual(state.exam.optionOrder);
  expect(saved.exam.deadline).toBe(state.exam.deadline);
  expect(saved.exam.answers).toEqual(state.exam.answers);
  expect(saved.exam.editorialVersions[fund]).toBe('6.0.0-piloto.1');
  expect(saved.awards).toEqual({});
  expect(saved.evidence).toEqual([]);
  await expect(page.locator('.milestone-toast')).toHaveCount(0);
});
