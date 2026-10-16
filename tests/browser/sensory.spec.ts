import { test, expect, type Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { attempt, DAY, fresh, rateCard, schedule, STATE_KEY, totalXP } from '../../src/v6/engine';
import type { Content, Experience, State } from '../../src/v6/types';

const content: Content = JSON.parse(
  await readFile(new URL('../../public/v6/cartografia.json', import.meta.url), 'utf8'),
);
const fund = 'cartografia-fundamentos',
  geo = 'geotecnologias';
const route = (unit = fund, mode = 'treino', query = '') =>
  `./v6.html#/unidade/${unit}/${mode}${query ? '?' + query : ''}`;
const pageErrors = new WeakMap<Page, string[]>();
declare global {
  interface Window {
    __sensoryAudioLog: string[];
    __finishAudioResume?: () => void;
  }
}
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  pageErrors.set(page, errors);
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('**/*', (request) =>
    new URL(request.request().url()).hostname === '127.0.0.1'
      ? request.continue()
      : request.abort(),
  );
});
test.afterEach(async ({ page }) => expect(pageErrors.get(page)).toEqual([]));

async function seed(page: Page, state: State) {
  await page.addInitScript(
    ({ key, state }) => {
      if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(state));
    },
    { key: STATE_KEY, state },
  );
}
async function saved(page: Page): Promise<State> {
  return page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
}
async function mockAudio(page: Page, pending = false) {
  await page.addInitScript((pending) => {
    window.__sensoryAudioLog = [];
    class AudioMock {
      state = pending ? 'suspended' : 'running';
      currentTime = 0;
      destination = {};
      waiting?: Promise<void>;
      constructor() {
        window.__sensoryAudioLog.push('context');
      }
      resume() {
        if (pending) {
          this.waiting ??= new Promise<void>((resolve) => {
            window.__finishAudioResume = () => {
              this.state = 'running';
              resolve();
            };
          });
          return this.waiting;
        }
        this.state = 'running';
        return Promise.resolve();
      }
      suspend() {
        this.state = 'suspended';
        window.__sensoryAudioLog.push('suspend');
        return Promise.resolve();
      }
      close() {
        this.state = 'closed';
        window.__sensoryAudioLog.push('close');
        return Promise.resolve();
      }
      createOscillator() {
        let frequency = 0;
        return {
          type: '',
          frequency: {
            setValueAtTime(value: number) {
              frequency = value;
            },
          },
          connect() {},
          disconnect() {},
          start() {
            window.__sensoryAudioLog.push('tone:' + frequency);
          },
          stop() {
            window.__sensoryAudioLog.push('stop');
          },
        };
      }
      createGain() {
        return {
          gain: {
            setValueAtTime() {},
            linearRampToValueAtTime() {},
            exponentialRampToValueAtTime() {},
          },
          connect() {},
          disconnect() {},
        };
      }
    }
    Object.defineProperty(window, 'AudioContext', { configurable: true, value: AudioMock });
  }, pending);
}
async function tones(page: Page) {
  return page.evaluate(() => window.__sensoryAudioLog.filter((event) => event.startsWith('tone:')));
}
function oneQuestion(pool: 'fixacao' | 'elite' = 'fixacao', sound: 'off' | 'soft' = 'off') {
  const q = content.questions.find((question) => question.unit === fund && question.pool === pool)!;
  const state = fresh();
  state.preferences.sound = sound;
  state.session = {
    id: 'sensory-answer',
    kind: 'questions',
    pool,
    ids: [q.id],
    position: 0,
    repeat: [],
    sensorySummary: { xp: 0, reviews: 0, converted: 0 },
  };
  return { state, q };
}
async function confirm(page: Page, correct = true) {
  const prompt = await page.locator('.question-options legend').innerText();
  const q = content.questions.find((question) => question.prompt === prompt)!;
  await page
    .getByRole('radio')
    .nth(
      q.options.findIndex((option) =>
        correct ? option.id === q.correct : option.id !== q.correct,
      ),
    )
    .check();
  await page.getByRole('button', { name: 'Confirmar resposta', exact: true }).click();
  return q;
}

test('Sensorial: preferências persistem e backup anterior restaura os padrões sem tocar conteúdo', async ({
  page,
}) => {
  await mockAudio(page);
  await page.goto('./v6.html');
  await expect(page.locator('html')).toHaveAttribute('data-experience', 'balanced');
  expect(await page.evaluate(() => window.__sensoryAudioLog)).toEqual([]);
  await page.getByRole('link', { name: 'Preferências e progresso', exact: true }).click();
  const experience = page.getByRole('combobox', { name: 'Experiência', exact: true });
  const sound = page.getByRole('combobox', { name: 'Efeitos sonoros', exact: true });
  await expect(experience).toHaveValue('balanced');
  await expect(sound).toHaveValue('off');
  await expect(page.getByRole('button', { name: 'Ouvir exemplo de efeito' })).toBeDisabled();
  for (const mode of ['focus', 'balanced', 'immersive']) {
    await experience.selectOption(mode);
    await expect(page.locator('html')).toHaveAttribute('data-experience', mode);
  }
  await sound.selectOption('soft');
  await page.getByRole('combobox', { name: 'Movimento', exact: true }).selectOption('reduce');
  await page.getByRole('combobox', { name: 'Aparência', exact: true }).selectOption('dark');
  await page.reload();
  await expect(experience).toHaveValue('immersive');
  await expect(sound).toHaveValue('soft');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduce');
  expect(totalXP(await saved(page))).toBe(0);
  expect(await tones(page)).toEqual([]);
  const copy = fresh();
  copy.drafts.editorialUnchanged = 'Cópia anterior preservada';
  await page.getByLabel('Ler cópia JSON').setInputFiles({
    name: 'previous.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({ schemaVersion: 6, state: copy })),
  });
  await page.getByRole('button', { name: 'Restaurar esta cópia V6', exact: true }).click();
  await expect(experience).toHaveValue('balanced');
  await expect(sound).toHaveValue('off');
  expect((await saved(page)).drafts.editorialUnchanged).toBe(copy.drafts.editorialUnchanged);
  expect((await saved(page)).preferences).toEqual(copy.preferences);
});

test('Sensorial: percurso tem estados explícitos, consulta livre e navegação por teclado', async ({
  page,
}, info) => {
  const state = fresh(),
    first = content.missions[0],
    second = content.missions[1];
  for (const mission of [first, second])
    for (const section of mission.sections) state.read[section.id] = Date.now();
  const q = content.questions.find((q) => q.mission === second.id)!;
  attempt(state, content, { item: q.id, correct: true, kind: q.pool, at: Date.now() });
  state.resume = { unit: first.unit, mode: 'estudo', mission: first.id };
  await seed(page, state);
  await page.goto('./');
  const map = page.locator('.journey-map');
  await expect(map.locator('.journey-stop')).toHaveCount(17);
  await expect(map.locator('.journey-stop.complete')).toHaveCount(1);
  await expect(map.locator('.journey-stop.reading')).toHaveCount(1);
  await expect(map.locator('[aria-current="step"]')).toHaveAttribute(
    'href',
    /linguagem-cartografica/,
  );
  await expect(map.locator('[aria-disabled="true"]')).toHaveCount(0);
  await map.locator('.journey-unit').nth(2).locator('summary').first().click();
  const last = map.getByRole('link', { name: /Cartografia escolar — Disponível/ });
  await last.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cartografia escolar');
  expect(totalXP(await saved(page))).toBe(totalXP(state));
  expect((await saved(page)).evidence).toEqual(state.evidence);
  await page.getByRole('link', { name: 'Início', exact: true }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: info.outputPath('sensorial-percurso-mobile.png'), fullPage: true });
});

for (const pool of ['fixacao', 'elite'] as const) {
  test(`Sensorial: ${pool} tem feedback proporcional, som desligado e nenhuma conquista por alternativa`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await mockAudio(page);
    const { state } = oneQuestion(pool);
    await seed(page, state);
    await page.goto(route());
    await confirm(page);
    const signal = page.locator('.response-signal');
    await expect(signal).toBeVisible();
    expect(await signal.evaluate((element) => getComputedStyle(element).animationName)).toBe(
      pool === 'elite' ? 'sensory-elite' : 'sensory-pulse',
    );
    await expect(page.locator('.milestone-toast')).toHaveCount(0);
    await expect(page.getByRole('region', { name: 'Feedback explicativo' })).toContainText(
      'Exemplo:',
    );
    expect(await page.evaluate(() => window.__sensoryAudioLog)).toEqual([]);
    const after = await saved(page);
    expect(totalXP(after)).toBe(4);
    await page.reload();
    await expect(page.locator('.feedback')).toBeVisible();
    await expect(page.locator('.response-signal')).toHaveCount(0);
    expect(totalXP(await saved(page))).toBe(totalXP(after));
    await page.evaluate((key) => {
      const state = JSON.parse(localStorage.getItem(key)!);
      state.session.id = 'repeat-immediately';
      state.session.position = 0;
      state.session.answered = false;
      state.session.sensorySummary = { xp: 0, reviews: 0, converted: 0 };
      localStorage.setItem(key, JSON.stringify(state));
    }, STATE_KEY);
    await page.reload();
    await confirm(page);
    await expect(page.locator('.feedback')).toBeVisible();
    await expect(page.locator('.response-signal')).toHaveCount(0);
    expect(totalXP(await saved(page))).toBe(4);
  });
}

test('Sensorial: erro recebe indicação neutra e explicação, sem punição sonora ou efeito forte', async ({
  page,
}) => {
  await mockAudio(page);
  const { state } = oneQuestion();
  await seed(page, state);
  await page.goto(route());
  await confirm(page, false);
  await expect(page.locator('.response-signal.incorrect')).toContainText('ajustar o raciocínio');
  await expect(page.locator('.feedback')).toContainText('Sua escolha:');
  await expect(page.locator('.milestone-toast')).toHaveCount(0);
  await expect(page.locator('.sensory-particles')).toHaveCount(0);
  expect(await tones(page)).toEqual([]);
  expect(Object.keys((await saved(page)).errors).length).toBe(1);
});

test('Sensorial: áudio exige opt-in, é curto e Foco desliga sons sem premiar preferências', async ({
  page,
}) => {
  await mockAudio(page);
  await page.goto('./v6.html#/configuracoes');
  const sound = page.getByRole('combobox', { name: 'Efeitos sonoros', exact: true });
  await sound.selectOption('soft');
  expect(await tones(page)).toEqual([]);
  await page.getByRole('button', { name: 'Ouvir exemplo de efeito' }).click();
  expect((await tones(page)).length).toBe(3);
  const before = (await tones(page)).length;
  await page.getByRole('combobox', { name: 'Experiência', exact: true }).selectOption('focus');
  await expect(sound).toHaveValue('off');
  await expect(page.getByRole('button', { name: 'Ouvir exemplo de efeito' })).toBeDisabled();
  await page.getByRole('link', { name: 'Treino', exact: true }).click();
  await page.getByRole('button', { name: 'Iniciar questões', exact: true }).click();
  await confirm(page);
  expect((await tones(page)).length).toBe(before);
  expect(
    await page
      .locator('.response-signal')
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe('none');
  expect((await saved(page)).preferences.experience).toBe('focus');
  expect(totalXP(await saved(page))).toBe(4);
});

test('Sensorial: áudio opt-in responde a evento real e nunca é repetido por reload', async ({
  page,
}) => {
  await mockAudio(page);
  const { state } = oneQuestion('elite', 'soft');
  await seed(page, state);
  await page.goto(route());
  expect(await page.evaluate(() => window.__sensoryAudioLog)).toEqual([]);
  await confirm(page);
  expect((await tones(page)).length).toBe(3);
  expect((await saved(page)).session?.sensorySummary?.xp).toBe(4);
  await page.reload();
  await expect(page.locator('.feedback')).toBeVisible();
  expect(await page.evaluate(() => window.__sensoryAudioLog)).toEqual([]);
});

test('Sensorial: áudio indisponível mantém feedback, teclado e preferências funcionais', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'AudioContext', { configurable: true, value: undefined });
    Object.defineProperty(window, 'webkitAudioContext', { configurable: true, value: undefined });
  });
  await page.goto('./v6.html#/configuracoes');
  await page.getByRole('combobox', { name: 'Efeitos sonoros', exact: true }).selectOption('soft');
  await page.getByRole('button', { name: 'Ouvir exemplo de efeito' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.status-note')).toContainText('Áudio indisponível');
  await page.getByRole('link', { name: 'Treino', exact: true }).click();
  await page.getByRole('button', { name: 'Iniciar questões', exact: true }).click();
  await confirm(page);
  await expect(page.locator('.feedback')).toBeVisible();
  await expect(page.locator('.response-signal')).toBeVisible();
});

test('Sensorial: áudio pendente é cancelado ao navegar para Prova', async ({ page }) => {
  await mockAudio(page, true);
  const state = fresh();
  state.preferences.sound = 'soft';
  await seed(page, state);
  await page.goto('./v6.html#/configuracoes');
  await page.getByRole('button', { name: 'Ouvir exemplo de efeito' }).click();
  await page.evaluate(() => {
    location.hash = '#/unidade/cartografia-fundamentos/prova';
  });
  await expect(page.locator('html')).toHaveAttribute('data-quiet', 'true');
  await page.evaluate(() => window.__finishAudioResume?.());
  expect(await tones(page)).toEqual([]);
  await expect(page.locator('.milestone-toast')).toHaveCount(0);
  await expect(page.locator('.status-note')).toHaveCount(0);
});

for (const setup of [
  { mode: 'balanced', reduced: 'no-preference', manual: false, particles: 0, animated: true },
  { mode: 'immersive', reduced: 'no-preference', manual: false, particles: 6, animated: true },
  { mode: 'focus', reduced: 'no-preference', manual: false, particles: 0, animated: false },
  { mode: 'immersive', reduced: 'reduce', manual: false, particles: 0, animated: false },
  { mode: 'immersive', reduced: 'no-preference', manual: true, particles: 0, animated: false },
] as const) {
  test(`Sensorial: Chefão ${setup.mode}/${setup.reduced}/${setup.manual} respeita intensidade e movimento`, async ({
    page,
  }, info) => {
    await page.emulateMedia({ reducedMotion: setup.reduced });
    if (setup.mode === 'focus') await page.clock.install();
    await page.setViewportSize({ width: 390, height: 844 });
    await mockAudio(page);
    const state = fresh();
    state.preferences.experience = setup.mode as Experience;
    if (setup.manual) state.preferences.motion = 'reduce';
    const qs = content.questions.filter((q) => q.unit === fund && q.roles.includes('chefao'));
    state.session = {
      id: 'sensory-boss',
      kind: 'questions',
      pool: 'chefao',
      ids: qs.map((q) => q.id),
      position: qs.length - 1,
      answered: true,
      repeat: [],
    };
    for (const q of qs) {
      attempt(state, content, {
        item: q.id,
        correct: true,
        kind: 'boss',
        context: state.session.id,
        at: Date.now(),
      });
      state.drafts[`answer:${state.session.id}:${q.id}`] = q.correct;
    }
    await seed(page, state);
    await page.goto(route());
    await page.getByRole('button', { name: 'Concluir rodada', exact: true }).click();
    await expect(page.locator('.milestone-toast.sensory-boss')).toContainText('Chefão superado');
    await expect(page.locator('.sensory-particles i')).toHaveCount(setup.particles);
    expect(
      await page
        .locator('.milestone-toast')
        .evaluate((element) => getComputedStyle(element).animationName),
    ).toBe(setup.animated ? 'milestone-enter' : 'none');
    await expect(page.locator('.boss-summary')).toContainText('Acertos por raciocínio');
    const action = await page
      .getByRole('button', { name: 'Preparar outra rodada', exact: true })
      .boundingBox();
    const effect = await page.locator('.milestone-toast').boundingBox();
    expect(effect!.y).toBeGreaterThanOrEqual(action!.y + action!.height);
    expect((await saved(page)).awards).toEqual(state.awards);
    expect(await tones(page)).toEqual([]);
    if (setup.mode === 'focus') {
      await page.getByRole('button', { name: 'Dispensar celebração', exact: true }).focus();
      await page.clock.fastForward(11_000);
      await expect(page.locator('.milestone-toast')).toHaveCount(1);
      await page.getByRole('button', { name: 'Preparar outra rodada', exact: true }).focus();
      await page.clock.fastForward(9_001);
      await expect(page.locator('.milestone-toast')).toHaveCount(0);
    }
    if (setup.mode === 'immersive' && !setup.manual && setup.reduced === 'no-preference')
      await page.screenshot({
        path: info.outputPath('sensorial-chefao-mobile.png'),
        fullPage: true,
        animations: 'disabled',
      });
    await page.reload();
    await expect(page.locator('.milestone-toast')).toHaveCount(0);
    expect((await saved(page)).awards).toEqual(state.awards);
  });
}

test('Sensorial: erro convertido recebe destaque somente após recuperação já validada pelo motor', async ({
  page,
}) => {
  const state = fresh(),
    now = Date.now(),
    initial = now - 9 * DAY;
  state.preferences.experience = 'immersive';
  const q = content.questions.find((question) => question.id === 'v6-q-f01')!;
  const other = content.questions.find(
    (question) => question.id !== q.id && question.concept === q.concept,
  )!;
  const card = content.cards.find((card) => card.concept === q.concept)!;
  attempt(state, content, { item: q.id, correct: false, kind: q.pool, at: initial });
  rateCard(state, content, card.id, 'bom', initial + DAY);
  rateCard(state, content, card.id, 'bom', initial + 5 * DAY);
  attempt(state, content, { item: q.id, correct: true, kind: q.pool, at: initial + 8 * DAY });
  state.session = {
    id: 'sensory-recover',
    kind: 'questions',
    pool: other.pool,
    ids: [other.id],
    position: 0,
    repeat: [],
    sensorySummary: { xp: 0, reviews: 0, converted: 0 },
  };
  await seed(page, state);
  await page.goto(route());
  await confirm(page);
  await expect(page.locator('.milestone-toast.sensory-error')).toContainText(
    'Erro convertido em domínio',
  );
  await expect(page.locator('.milestone-toast')).toContainText(
    'Fragilidade → recuperação → domínio estável',
  );
  expect(Object.values((await saved(page)).errors)[0].status).toBe('dominado-apos-erro');
  expect((await saved(page)).session?.sensorySummary?.converted).toBe(1);
  const after = await saved(page);
  await page.reload();
  await expect(page.locator('.milestone-toast')).toHaveCount(0);
  expect((await saved(page)).awards).toEqual(after.awards);
});

test('Sensorial: módulo concluído é raro, proporcional e mantém domínio e agenda independentes', async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.clock.install();
  const state = fresh();
  state.preferences.experience = 'immersive';
  for (const mission of content.missions) {
    for (const section of mission.sections) state.read[section.id] = Date.now();
    const q = content.questions.find((q) => q.mission === mission.id)!;
    attempt(state, content, { item: q.id, correct: true, kind: q.pool, at: Date.now() });
  }
  state.milestones = Object.fromEntries(
    content.units.slice(0, -1).map((unit) => ['boss:' + unit.id, Date.now()]),
  );
  const qs = content.questions.filter((q) => q.unit === geo && q.roles.includes('chefao'));
  state.session = {
    id: 'sensory-module',
    kind: 'questions',
    pool: 'chefao',
    ids: qs.map((q) => q.id),
    position: qs.length - 1,
    answered: true,
    repeat: [],
  };
  for (const q of qs) {
    attempt(state, content, {
      item: q.id,
      correct: true,
      kind: 'boss',
      context: state.session.id,
      at: Date.now(),
    });
    state.drafts[`answer:${state.session.id}:${q.id}`] = q.correct;
  }
  await seed(page, state);
  await page.goto(route(geo));
  await expect(page.locator('.milestone-toast')).toHaveCount(0);
  await page.getByRole('button', { name: 'Concluir rodada', exact: true }).click();
  await expect(page.locator('.milestone-toast.sensory-module')).toContainText(
    'Expedição Cartográfica concluída',
  );
  await expect(page.locator('.sensory-particles i')).toHaveCount(12);
  await page.locator('.expedition-summary summary').click();
  await page.clock.fastForward(11_000);
  await expect(page.locator('.milestone-toast.sensory-module')).toBeVisible();
  await expect(page.locator('.expedition-summary')).toContainText('17/17');
  await expect(page.locator('.expedition-summary')).toContainText('3/3');
  await expect(page.locator('.expedition-summary')).toContainText('ainda sem evidência suficiente');
  expect((await saved(page)).awards).toEqual(state.awards);
  await page.screenshot({
    path: info.outputPath('sensorial-modulo-desktop.png'),
    fullPage: true,
    animations: 'disabled',
  });
  await page.reload();
  await expect(page.locator('.milestone-toast')).toHaveCount(0);
});

test('Sensorial: revisão consolida XP real do bloco e mantém Difícil sem erro', async ({
  page,
}) => {
  const state = fresh(),
    now = Date.now(),
    target = content.cards.find((card) => card.unit === fund)!;
  for (const card of content.cards) state.reviews[card.id] = schedule(undefined, 'bom', now);
  state.reviews[target.id] = schedule(undefined, 'bom', now - 5 * DAY);
  await seed(page, state);
  await page.goto(route(fund, 'revisao'));
  await page.getByRole('button', { name: 'Iniciar revisão de até 12 cartões' }).click();
  await page
    .getByRole('checkbox', { name: 'Tentei recuperar a resposta antes de conferir' })
    .check();
  await page.getByRole('button', { name: 'Revelar resposta', exact: true }).click();
  await page.getByRole('button', { name: /^Difícil/ }).click();
  await expect(
    page.getByRole('heading', { name: 'Revisão concluída por hoje', exact: true }),
  ).toBeVisible();
  await expect(page.locator('.round-gains')).toContainText('+8 XP');
  await expect(page.locator('.round-gains')).toContainText('1 revisões vencidas');
  expect(totalXP(await saved(page))).toBe(8);
  expect(Object.keys((await saved(page)).errors)).toEqual([]);
  await page.reload();
  await expect(page.locator('.round-gains')).toContainText('+8 XP');
  await expect(page.locator('.milestone-toast')).toHaveCount(0);
});

test('Sensorial: Prova permanece silenciosa e sem XP, inclusive ao sair com prova ativa', async ({
  page,
}) => {
  await mockAudio(page);
  const state = fresh();
  state.preferences.sound = 'immersive';
  state.preferences.experience = 'immersive';
  await seed(page, state);
  await page.goto(route(fund, 'prova'));
  await page.getByRole('combobox', { name: 'Questões', exact: true }).selectOption('5');
  await page.getByRole('button', { name: 'Iniciar prova do piloto', exact: true }).click();
  await expect(page.getByRole('timer', { name: 'Tempo restante de prova' })).toBeVisible();
  await page.getByRole('radio').first().check();
  await expect(
    page.locator('.response-signal, .milestone-toast, .sensory-particles, .progression-panel'),
  ).toHaveCount(0);
  expect(await page.evaluate(() => window.__sensoryAudioLog)).toEqual([]);
  await page.getByRole('link', { name: 'Início', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-quiet', 'true');
  await expect(page.locator('.progression-panel')).toHaveCount(0);
  await page.getByRole('link', { name: 'Preferências e progresso', exact: true }).click();
  await page.getByRole('button', { name: 'Ouvir exemplo de efeito' }).click();
  expect(await tones(page)).toEqual([]);
});

test('Sensorial: mobile, dark e ampliação preservam controles e percurso sem overflow', async ({
  page,
}, info) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(page.locator('.journey-map')).toBeVisible();
  for (const width of [360, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const stops = page.locator('.journey-unit[open] .journey-stop a');
    for (const stop of await stops.all()) {
      const box = await stop.boundingBox();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
  }
  await page.evaluate(() => (document.documentElement.style.fontSize = '200%'));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.evaluate(() => (document.documentElement.style.fontSize = ''));
  await page.screenshot({
    path: info.outputPath('sensorial-percurso-dark-mobile.png'),
    fullPage: true,
  });
  await page.getByRole('link', { name: 'Preferências e progresso', exact: true }).click();
  for (const width of [360, 430]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
});

test('Sensorial: Web Audio nativo só cria contexto e toca após escolha e gesto explícitos', async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.__sensoryAudioLog = [];
    const NativeAudio = window.AudioContext;
    class ObservedAudio extends NativeAudio {
      constructor() {
        super();
        window.__sensoryAudioLog.push('native-context');
      }
      createOscillator() {
        const oscillator = super.createOscillator();
        const start = oscillator.start.bind(oscillator);
        oscillator.start = (at = 0) => {
          window.__sensoryAudioLog.push('tone:native');
          start(at);
        };
        return oscillator;
      }
    }
    Object.defineProperty(window, 'AudioContext', { configurable: true, value: ObservedAudio });
  });
  await page.goto('./v6.html#/configuracoes');
  expect(await page.evaluate(() => window.__sensoryAudioLog)).toEqual([]);
  await page.getByRole('combobox', { name: 'Efeitos sonoros', exact: true }).selectOption('soft');
  await page.getByRole('button', { name: 'Ouvir exemplo de efeito' }).click();
  await expect.poll(async () => (await tones(page)).length).toBe(3);
  await expect(page.locator('.status-note')).toHaveCount(0);
  expect(totalXP(await saved(page))).toBe(0);
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Efeitos sonoros', exact: true })).toHaveValue(
    'soft',
  );
  expect(await page.evaluate(() => window.__sensoryAudioLog)).toEqual([]);
});

test('Sensorial: ocultar a página interrompe sons e efeitos sem repetir recompensas ao voltar', async ({
  page,
}) => {
  await mockAudio(page);
  const { state } = oneQuestion('elite', 'soft');
  await seed(page, state);
  await page.goto(route());
  await confirm(page);
  await expect(page.locator('.response-signal')).toBeVisible();
  expect((await tones(page)).length).toBe(3);
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(page.locator('.response-signal')).toHaveCount(0);
  expect(await page.evaluate(() => window.__sensoryAudioLog.includes('suspend'))).toBe(true);
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(page.locator('.response-signal')).toHaveCount(0);
  expect((await tones(page)).length).toBe(3);
  expect(totalXP(await saved(page))).toBe(4);
});

test('Sensorial: desligar som em outra aba atualiza a preferência sem reproduzir efeitos', async ({
  page,
}) => {
  await mockAudio(page);
  const state = fresh();
  state.preferences.sound = 'soft';
  await seed(page, state);
  await page.goto('./v6.html#/configuracoes');
  await page.getByRole('button', { name: 'Ouvir exemplo de efeito' }).click();
  expect((await tones(page)).length).toBe(3);
  const other = await page.context().newPage();
  await other.goto('./v6.html#/configuracoes');
  await other.getByRole('combobox', { name: 'Efeitos sonoros', exact: true }).selectOption('off');
  await expect(page.getByRole('combobox', { name: 'Efeitos sonoros', exact: true })).toHaveValue(
    'off',
  );
  await expect(page.getByRole('button', { name: 'Ouvir exemplo de efeito' })).toBeDisabled();
  expect((await tones(page)).length).toBe(3);
  expect(totalXP(await saved(page))).toBe(0);
  await other.close();
});

test('Sensorial: redução de movimento do sistema prevalece mesmo durante uma celebração imersiva', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const state = fresh();
  state.preferences.experience = 'immersive';
  const qs = content.questions.filter((q) => q.unit === fund && q.roles.includes('chefao'));
  state.session = {
    id: 'dynamic-reduce',
    kind: 'questions',
    pool: 'chefao',
    ids: qs.map((q) => q.id),
    position: qs.length - 1,
    answered: true,
    repeat: [],
  };
  for (const q of qs) {
    attempt(state, content, {
      item: q.id,
      correct: true,
      kind: 'boss',
      at: Date.now(),
      context: state.session.id,
    });
    state.drafts[`answer:${state.session.id}:${q.id}`] = q.correct;
  }
  await seed(page, state);
  await page.goto(route());
  await page.getByRole('button', { name: 'Concluir rodada', exact: true }).click();
  await expect(page.locator('.sensory-particles i')).toHaveCount(6);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.sensory-particles i')).toHaveCount(0);
  expect(
    await page
      .locator('.milestone-toast')
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe('none');
  expect((await saved(page)).awards).toEqual(state.awards);
});
