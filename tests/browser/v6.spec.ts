import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import type { Content } from '../../src/v6/types';
import { attempt, fresh, STATE_KEY } from '../../src/v6/engine';
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
  const arr: string[] = [];
  errors.set(page, arr);
  page.on('pageerror', (e) => arr.push(e.message));
  await page.route('**/*', (route) =>
    new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort(),
  );
});
test.afterEach(async ({ page }) => {
  expect(errors.get(page)).toEqual([]);
});
test('V6: três unidades, cinco destinos mobile, retomada e portal histórico', async ({
  page,
}, info) => {
  await page.goto('./v6.html');
  await expect(page.locator('.unit-card')).toHaveCount(3);
  await expect(page.locator('.main-navigation a')).toHaveCount(5);
  await expect(page.getByText('Dados insuficientes', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: /Começar pelos fundamentos/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Linguagem e leitura de mapas');
  await page.getByRole('link', { name: 'Início', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Continuar de onde parei' })).toBeVisible();
  await page.screenshot({ path: info.outputPath('v6-home-desktop.png'), fullPage: true });
});

for (const motion of ['normal', 'system-reduced', 'manual-reduced'] as const) {
  test(`V6: celebração de Chefão ${motion}, sem repetição ou distração em Prova`, async ({
    page,
  }, info) => {
    await page.emulateMedia({
      reducedMotion: motion === 'system-reduced' ? 'reduce' : 'no-preference',
    });
    await page.setViewportSize({ width: 390, height: 844 });
    const state = fresh();
    if (motion === 'manual-reduced') state.preferences.motion = 'reduce';
    const qs = content.questions.filter((q) => q.unit === fund && q.roles.includes('chefao'));
    const id = 'complete-boss-test';
    state.session = {
      id,
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
        context: id,
        at: Date.now(),
      });
      state.drafts[`answer:${id}:${q.id}`] = q.correct;
    }
    await page.addInitScript(
      ({ key, state }) => {
        if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(state));
      },
      { key: STATE_KEY, state },
    );
    await page.goto(path(fund, 'treino'));
    await expect(page.locator('.feedback')).toBeVisible();
    await expect(page.locator('.milestone-toast')).toHaveCount(0);
    await page.getByRole('button', { name: 'Concluir rodada', exact: true }).click();
    await expect(page.locator('.milestone-toast')).toContainText('Chefão superado');
    expect(
      await page.locator('.milestone-toast').evaluate((el) => getComputedStyle(el).animationName),
    ).toBe(motion === 'normal' ? 'milestone-enter' : 'none');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
    expect(saved.awards).toEqual(state.awards);
    expect(saved.milestones['boss:' + fund]).toBeGreaterThan(0);
    const action = await page
      .getByRole('button', { name: 'Preparar outra rodada', exact: true })
      .boundingBox();
    const note = await page.locator('.milestone-toast').boundingBox();
    expect(note!.y).toBeGreaterThanOrEqual(action!.y + action!.height);
    if (motion === 'normal')
      await page.screenshot({
        path: info.outputPath('v6-celebracao-mobile.png'),
        fullPage: true,
        animations: 'disabled',
      });
    await page.getByRole('button', { name: 'Dispensar celebração', exact: true }).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.milestone-toast')).toHaveCount(0);
    await page.reload();
    await expect(
      page.getByRole('heading', { name: 'Rodada concluída', exact: true }),
    ).toBeVisible();
    await expect(page.locator('.milestone-toast')).toHaveCount(0);
    await page
      .locator('.main-navigation')
      .getByRole('link', { name: 'Início', exact: true })
      .click();
    await page.getByText('Seus marcos de aprendizagem', { exact: true }).click();
    await expect(page.locator('.milestone-history')).toContainText('Chefão superado');
    await page
      .locator('.main-navigation')
      .getByRole('link', { name: 'Prova', exact: true })
      .click();
    await page.getByRole('combobox', { name: 'Questões', exact: true }).selectOption('5');
    await page.getByRole('button', { name: 'Iniciar prova do piloto', exact: true }).click();
    await expect(page.getByRole('timer', { name: 'Tempo restante de prova' })).toBeVisible();
    await expect(page.locator('.milestone-toast')).toHaveCount(0);
    await expect(page.locator('.milestone-history')).toHaveCount(0);
  });
}

test('V6: um acerto comum ensina sem celebração por alternativa', async ({ page }) => {
  await page.goto(path(fund, 'treino'));
  await page.getByRole('button', { name: 'Iniciar questões', exact: true }).click();
  const prompt = await page.locator('.question-options legend').innerText();
  const q = content.questions.find((q) => q.prompt === prompt)!;
  await page
    .getByRole('radio')
    .nth(q.options.findIndex((o) => o.id === q.correct))
    .check();
  await page.getByRole('button', { name: 'Confirmar resposta', exact: true }).click();
  await expect(page.locator('.feedback')).toBeVisible();
  await expect(page.locator('.milestone-toast')).toHaveCount(0);
});

test('V6: estudo orienta treino da mesma missão sem rótulos Cartografia I/II', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('link', { name: 'Diagnosticar', exact: true }).click();
  await expect(page.getByRole('combobox', { name: 'Banco', exact: true })).toHaveValue(
    'diagnostico',
  );
  await page.goto(path(fund, 'estudo', 'escalas-e-medidas'));
  await page
    .getByRole('button', { name: 'Registrar que estudei esta explicação', exact: true })
    .first()
    .click();
  await page
    .getByRole('link', { name: 'Testar este raciocínio sem consulta', exact: true })
    .click();
  await expect(page.getByRole('combobox', { name: 'Missão', exact: true })).toHaveValue(
    'escalas-e-medidas',
  );
  await page.getByRole('button', { name: 'Iniciar questões', exact: true }).click();
  await expect(page.locator('.exercise')).toContainText('Escalas e medidas');
  for (const mission of ['linguagem-cartografica', 'fusos-utc-data', 'projecoes-propriedades']) {
    await page.goto(path(content.missions.find((m) => m.id === mission)!.unit, 'estudo', mission));
    await page
      .locator('.reading-section')
      .evaluateAll((nodes) => nodes.forEach((node) => node.setAttribute('open', '')));
    await expect(page.locator('.reading-column')).not.toContainText(
      /Cartografia I{1,2}(?![IV])|Tema\s+\d+/i,
    );
  }
});

for (const entry of ['./', './v6.html'])
  for (const finished of [false, true]) {
    test(`P1: Escalas respeita o atalho com Orientação ${finished ? 'concluída' : 'em andamento'} em ${entry}`, async ({
      page,
    }) => {
      const training = `${entry}#/unidade/${fund}/treino?missao=orientacao-azimute`;
      await page.goto(training);
      await page.getByRole('button', { name: 'Iniciar questões', exact: true }).click();
      const initial = await page.evaluate(
        (key) => JSON.parse(localStorage.getItem(key)!),
        STATE_KEY,
      );
      const n = finished ? initial.session.ids.length : 1;
      for (let i = 0; i < n; i++) {
        const q = content.questions.find((q) => q.id === initial.session.ids[i])!;
        await expect(page.locator('.question-options legend')).toHaveText(q.prompt);
        await page
          .getByRole('radio')
          .nth(q.options.findIndex((o) => o.id === q.correct))
          .check();
        await page.getByRole('button', { name: 'Confirmar resposta', exact: true }).click();
        await page
          .getByRole('button', {
            name: i + 1 === initial.session.ids.length ? 'Concluir rodada' : 'Próxima questão',
            exact: true,
          })
          .click();
      }
      if (finished)
        await expect(
          page.getByRole('heading', { name: 'Rodada concluída', exact: true }),
        ).toBeVisible();
      const before = await page.evaluate(
        (key) => JSON.parse(localStorage.getItem(key)!),
        STATE_KEY,
      );
      await page.goto(`${entry}#/unidade/${fund}/estudo?missao=escalas-e-medidas`);
      await page
        .getByRole('button', { name: 'Registrar que estudei esta explicação', exact: true })
        .first()
        .click();
      await page
        .getByRole('link', { name: 'Testar este raciocínio sem consulta', exact: true })
        .click();
      await expect(page.getByRole('combobox', { name: 'Missão', exact: true })).toHaveValue(
        'escalas-e-medidas',
      );
      await expect(page.locator('.exercise')).toHaveCount(0);
      await expect(
        page.getByRole('heading', { name: 'Rodada concluída', exact: true }),
      ).toHaveCount(0);
      await page.reload();
      await expect(page.getByRole('combobox', { name: 'Missão', exact: true })).toHaveValue(
        'escalas-e-medidas',
      );
      let saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
      expect(saved.session).toEqual(before.session);
      expect(saved.evidence).toEqual(before.evidence);
      expect(saved.awards).toEqual(before.awards);
      await page.getByRole('button', { name: 'Iniciar questões', exact: true }).click();
      await expect(page.locator('.exercise')).toContainText('Escalas e medidas');
      saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
      expect(saved.session.id).not.toBe(before.session.id);
      expect(
        saved.session.ids.every(
          (id: string) =>
            content.questions.find((q) => q.id === id)?.mission === 'escalas-e-medidas',
        ),
      ).toBe(true);
      expect(saved.evidence).toEqual(before.evidence);
      expect(saved.awards).toEqual(before.awards);
      await page.reload();
      await expect(page.locator('.exercise')).toContainText('Escalas e medidas');
      await page
        .locator('.main-navigation')
        .getByRole('link', { name: 'Início', exact: true })
        .click();
      await page.getByRole('link', { name: 'Continuar de onde parei', exact: true }).click();
      await expect(page.locator('.exercise')).toContainText('Escalas e medidas');
      expect(
        await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).session.id, STATE_KEY),
      ).toBe(saved.session.id);
    });
  }

for (const previous of [
  { kind: 'questions', pool: 'fixacao', finished: false },
  { kind: 'questions', pool: 'fixacao', finished: true },
  { kind: 'questions', pool: 'diagnostico', finished: true },
  { kind: 'game', pool: undefined, finished: false },
  { kind: 'cards', pool: undefined, finished: false },
] as const) {
  test(`P1: Diagnosticar com sessão anterior ${previous.kind}/${previous.pool || 'fila'}/${previous.finished}`, async ({
    page,
  }) => {
    const state = fresh();
    const ids =
      previous.kind === 'questions'
        ? content.questions
            .filter(
              (q) =>
                q.unit === fund &&
                (previous.pool === 'diagnostico'
                  ? q.roles.includes('diagnostico')
                  : q.mission === 'orientacao-azimute' && q.pool === 'fixacao'),
            )
            .map((q) => q.id)
        : (previous.kind === 'game' ? content.game : content.cards)
            .filter((item) => item.unit === fund)
            .slice(0, 3)
            .map((item) => item.id);
    state.session = {
      id: 'round-before-diagnostic',
      kind: previous.kind,
      pool: previous.pool,
      ids,
      position: previous.finished ? ids.length : 0,
      repeat: [],
    };
    await page.addInitScript(
      ({ key, state }) => {
        if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(state));
      },
      { key: STATE_KEY, state },
    );
    await page.goto('./');
    await page.getByRole('link', { name: 'Diagnosticar', exact: true }).click();
    await expect(page.getByRole('combobox', { name: 'Banco', exact: true })).toHaveValue(
      'diagnostico',
    );
    await expect(page.getByRole('combobox', { name: 'Missão', exact: true })).toHaveValue('');
    await expect(page.locator('.exercise, .session-finish')).toHaveCount(0);
    expect(
      await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).session, STATE_KEY),
    ).toEqual(state.session);
    await page.getByRole('button', { name: 'Iniciar questões', exact: true }).click();
    await expect(page.locator('.exercise-meta')).toContainText('Diagnóstico');
    const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
    expect(saved.session.pool).toBe('diagnostico');
    expect(saved.session.id).not.toBe(state.session.id);
    expect(
      saved.session.ids.every((id: string) =>
        content.questions.some(
          (q) => q.id === id && q.unit === fund && q.roles.includes('diagnostico'),
        ),
      ),
    ).toBe(true);
    expect(saved.evidence).toEqual(state.evidence);
    expect(saved.awards).toEqual(state.awards);
    await page.reload();
    await expect(page.locator('.exercise-meta')).toContainText('Diagnóstico');
    expect(
      await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).session.id, STATE_KEY),
    ).toBe(saved.session.id);
  });
}

test('P1: mudança de missão e banco na mesma tela sincroniza filtros e permite voltar à rodada compatível', async ({
  page,
}) => {
  await page.goto(path(fund, 'treino', 'orientacao-azimute'));
  await page.getByRole('button', { name: 'Iniciar questões', exact: true }).click();
  await page.evaluate((unit) => {
    location.hash = `/unidade/${unit}/treino?missao=escalas-e-medidas`;
  }, fund);
  await expect(page.getByRole('combobox', { name: 'Missão', exact: true })).toHaveValue(
    'escalas-e-medidas',
  );
  await page.getByRole('combobox', { name: 'Banco', exact: true }).focus();
  await page.getByRole('combobox', { name: 'Banco', exact: true }).selectOption('concurso');
  await expect(page).toHaveURL(/banco=concurso/);
  await expect(page.getByRole('combobox', { name: 'Banco', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('combobox', { name: 'Banco', exact: true })).toHaveValue('elite');
  await expect(page.getByRole('combobox', { name: 'Banco', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await expect(page.getByRole('combobox', { name: 'Banco', exact: true })).toHaveValue('concurso');
  await page.getByRole('combobox', { name: 'Missão', exact: true }).focus();
  await page.getByRole('combobox', { name: 'Missão', exact: true }).selectOption('coordenadas-gms');
  await expect(page).toHaveURL(/missao=coordenadas-gms/);
  await expect(page.getByRole('combobox', { name: 'Missão', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Iniciar questões', exact: true }).click();
  await expect(page.locator('.exercise-meta')).toContainText('Concurso');
  const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
  expect(
    saved.session.ids.every(
      (id: string) => content.questions.find((q) => q.id === id)?.mission === 'coordenadas-gms',
    ),
  ).toBe(true);
  await page.evaluate((unit) => {
    location.hash = `/unidade/${unit}/treino?banco=diagnostico`;
  }, fund);
  await expect(page.getByRole('combobox', { name: 'Banco', exact: true })).toHaveValue(
    'diagnostico',
  );
  await expect(page.getByRole('combobox', { name: 'Missão', exact: true })).toHaveValue('');
  await page.goBack();
  await expect(page.locator('.exercise-meta')).toContainText('Concurso');
  expect(
    await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).session.id, STATE_KEY),
  ).toBe(saved.session.id);
});

test('P1: Continuar retoma sessão antiga sem impor a missão de retomada artificial', async ({
  page,
}) => {
  const state = fresh(),
    q = content.questions.find(
      (q) => q.unit === fund && q.mission === 'orientacao-azimute' && q.pool === 'concurso',
    )!;
  state.session = {
    id: 'saved-before-p1',
    kind: 'questions',
    pool: 'concurso',
    ids: [q.id],
    position: 0,
    repeat: [],
  };
  state.resume = { unit: fund, mode: 'treino', mission: 'linguagem-cartografica' };
  await page.addInitScript(
    ({ key, state }) => {
      if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(state));
    },
    { key: STATE_KEY, state },
  );
  await page.goto('./');
  await page.getByRole('link', { name: 'Continuar de onde parei', exact: true }).click();
  await expect(page.locator('.exercise')).toContainText('Orientação e azimute');
  await expect(page.locator('.exercise-meta')).toContainText('Concurso');
  expect(
    await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).session.id, STATE_KEY),
  ).toBe(state.session.id);
});

test('P1: destino de diagnóstico sem sessão persiste ao continuar e recarregar', async ({
  page,
}) => {
  await page.goto('./');
  await page.getByRole('link', { name: 'Diagnosticar', exact: true }).click();
  await expect(page.getByRole('combobox', { name: 'Banco', exact: true })).toHaveValue(
    'diagnostico',
  );
  await page.getByRole('link', { name: 'Início', exact: true }).click();
  await page.getByRole('link', { name: 'Continuar de onde parei', exact: true }).click();
  await expect(page.getByRole('combobox', { name: 'Banco', exact: true })).toHaveValue(
    'diagnostico',
  );
  await expect(page.getByRole('combobox', { name: 'Missão', exact: true })).toHaveValue('');
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Banco', exact: true })).toHaveValue(
    'diagnostico',
  );
  expect(
    await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).resume, STATE_KEY),
  ).toMatchObject({ unit: fund, mode: 'treino', mission: '', pool: 'diagnostico' });
});

test('P1: escolher Game em um treino contextual abre a rodada da unidade e permite retornar às questões', async ({
  page,
}) => {
  await page.goto(path(fund, 'treino', 'escalas-e-medidas'));
  await page.getByRole('button', { name: 'Game V/F', exact: true }).click();
  await expect(page.getByText('Rodada da unidade:', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Iniciar 10 afirmações', exact: true }).click();
  await expect(page.locator('.game-exercise')).toBeVisible();
  await expect(page).not.toHaveURL(/[?&](missao|banco)=/);
  const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
  expect(saved.session.kind).toBe('game');
  await page.reload();
  await expect(page.locator('.game-exercise')).toBeVisible();
  await page.goto(path(fund, 'estudo', 'escalas-e-medidas'));
  await page
    .getByRole('button', { name: 'Registrar que estudei esta explicação', exact: true })
    .first()
    .click();
  await page
    .getByRole('link', { name: 'Testar este raciocínio sem consulta', exact: true })
    .click();
  await expect(page.getByRole('combobox', { name: 'Missão', exact: true })).toHaveValue(
    'escalas-e-medidas',
  );
  expect(
    await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).session.id, STATE_KEY),
  ).toBe(saved.session.id);
  await page.getByRole('button', { name: 'Iniciar questões', exact: true }).click();
  await expect(page.locator('.exercise')).toContainText('Escalas e medidas');
});

test('V6: Difícil agenda recuperação com esforço e mantém Caderno de Erros vazio', async ({
  page,
}) => {
  await page.goto(path(fund, 'revisao'));
  await page.getByRole('button', { name: 'Iniciar revisão de até 12 cartões' }).click();
  await page.getByLabel('Tentei recuperar a resposta antes de conferir').check();
  await page.getByRole('button', { name: 'Revelar resposta', exact: true }).click();
  await page.getByRole('button', { name: /^Difícil/ }).click();
  const state = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
  expect(state.errors).toEqual({});
  expect(state.evidence.at(-1)).toMatchObject({ correct: true, rating: 'dificil' });
  expect(Object.values(state.reviews)[0]).toMatchObject({ interval: 2, lapses: 0 });
});

test.describe('dia civil do estudante', () => {
  test.use({ timezoneId: 'America/Sao_Paulo' });
  test('V6: prática noturna e após meia-noite conta dois dias locais', async ({ page }) => {
    await page.clock.install({ time: new Date('2026-10-16T02:30:00Z') });
    await page.goto(path(fund, 'treino'));
    await page.getByRole('button', { name: 'Iniciar questões', exact: true }).click();
    await page.getByRole('radio').first().check();
    await page.getByRole('button', { name: 'Confirmar resposta', exact: true }).click();
    let state = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
    expect(state.significantDays).toEqual(['2026-10-15']);
    await page.clock.setSystemTime(new Date('2026-10-16T03:05:00Z'));
    await page.getByRole('button', { name: 'Próxima questão', exact: true }).click();
    await page.getByRole('radio').first().check();
    await page.getByRole('button', { name: 'Confirmar resposta', exact: true }).click();
    state = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STATE_KEY);
    expect(state.significantDays).toEqual(['2026-10-15', '2026-10-16']);
    await page.getByRole('link', { name: 'Início', exact: true }).click();
    await expect(page.getByText(/2 dia\(s\) de prática/)).toBeVisible();
  });
});
test('V6: 17 missões acessíveis, teoria preservada, IDs únicos e registro de leitura', async ({
  page,
}) => {
  for (const m of content.missions) {
    await page.goto(path(m.unit, 'estudo', m.id));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(m.title);
    const first = page.locator('.reading-section').first();
    await expect(first.locator('.theory')).toBeVisible();
    const ids = await page.locator('[id]').evaluateAll((ns) => ns.map((n) => n.id));
    expect(new Set(ids).size).toBe(ids.length);
  }
  await page.goto(path(fund, 'estudo', 'coordenadas-gms'));
  await page.getByRole('button', { name: 'Registrar que estudei esta explicação' }).first().click();
  await page.reload();
  await expect(page.getByRole('button', { name: 'Leitura registrada' }).first()).toBeVisible();
});
test('V6: questão registra tentativa, explica distrator e alimenta o caderno', async ({ page }) => {
  await page.goto(path(fund, 'treino'));
  await page.getByRole('combobox', { name: 'Banco', exact: true }).selectOption('concurso');
  await page.getByRole('button', { name: 'Iniciar questões' }).click();
  const prompt = await page.locator('.question-options legend').innerText(),
    q = content.questions.find((q) => q.prompt === prompt)!;
  const wrong = q.options.findIndex((o) => o.id !== q.correct);
  await expect(page.getByRole('button', { name: 'Confirmar resposta' })).toBeDisabled();
  await page.getByRole('radio').nth(wrong).check();
  await page.getByRole('button', { name: 'Confirmar resposta' }).click();
  await expect(page.getByRole('region', { name: 'Feedback explicativo' })).toContainText(
    'Exemplo:',
  );
  await expect(page.locator('.feedback')).toContainText(q.options[wrong].feedback);
  await page.reload();
  await expect(page.locator('.feedback')).toBeVisible();
  await page.getByRole('link', { name: 'Caderno Global de Erros', exact: true }).click();
  await expect(page.locator('.error-card')).toHaveCount(1);
  await page
    .getByRole('combobox', { name: 'Tipo', exact: true })
    .selectOption(q.options[wrong].errorType);
  await expect(page.locator('.error-card')).toBeVisible();
});
test('V6: recall exige tentativa, rascunho sobrevive e modelo precede autoavaliação', async ({
  page,
}) => {
  await page.goto(path(fund, 'estudo', 'orientacao-azimute'));
  await page.locator('.recall-group>details').first().locator('summary').first().click();
  await expect(page.getByRole('button', { name: 'Registrar tentativa e conferir' })).toBeDisabled();
  await page
    .getByLabel('Sua tentativa de memória')
    .fill('Norte é referência; o azimute parte dele em sentido horário.');
  await page.reload();
  await page.locator('.recall-group>details').first().locator('summary').first().click();
  await expect(page.getByLabel('Sua tentativa de memória')).toHaveValue(/azimute/);
  await page.getByRole('button', { name: 'Registrar tentativa e conferir' }).click();
  await page.getByRole('button', { name: 'Consegui explicar' }).click();
  await expect(page.getByText('Evocação registrada.', { exact: false })).toBeVisible();
});
test('V6: flashcard só libera quatro avaliações após tentativa e verso; agenda persiste', async ({
  page,
}) => {
  await page.goto(path(fund, 'revisao'));
  await page.getByRole('button', { name: 'Iniciar revisão de até 12 cartões' }).click();
  await expect(page.getByRole('button', { name: 'Revelar resposta' })).toBeDisabled();
  await expect(page.locator('.rating-grid button')).toHaveCount(0);
  await page.getByLabel('Tentei recuperar a resposta antes de conferir').check();
  await page.getByRole('button', { name: 'Revelar resposta' }).click();
  await expect(page.locator('.rating-grid button')).toHaveCount(4);
  await page.getByRole('button', { name: /^Errei/ }).click();
  const saved = await page.evaluate((k) => JSON.parse(localStorage.getItem(k)!), STATE_KEY);
  expect(Object.values(saved.reviews)[0]).toMatchObject({
    lapses: 1,
    rating: 'errei',
    interval: 1,
  });
  expect(saved.session.ids.length).toBeGreaterThan(12);
  await page.reload();
  await expect(page.getByRole('button', { name: 'Revelar resposta' })).toBeVisible();
});
test('V6: V/F sempre justifica, timer é opcional e encerrar não causa callback inválido', async ({
  page,
}) => {
  await page.clock.install();
  await page.goto(path(geo, 'treino'));
  await page.getByRole('button', { name: 'Game V/F', exact: true }).click();
  await page.getByLabel('Ritmo opcional: 20 segundos por afirmação').check();
  await page.getByRole('button', { name: 'Iniciar 10 afirmações' }).click();
  await page.clock.fastForward(21_000);
  await expect(page.locator('.feedback')).toContainText('Exemplo:');
  await expect(page.locator('.feedback')).toContainText(/verdadeira|falsa/);
  await page.getByRole('button', { name: 'Encerrar rodada', exact: true }).click();
  await page.clock.fastForward(30_000);
  await expect(page.getByRole('heading', { name: 'Prepare uma rodada' })).toBeVisible();
});
test('V6: prova salva seleção e relógio, não corrige antes e corrige omissões no fim', async ({
  page,
}) => {
  await page.clock.install();
  await page.goto(path(fund, 'prova'));
  await page.getByRole('combobox', { name: 'Questões', exact: true }).selectOption('5');
  await page.getByRole('button', { name: 'Iniciar prova do piloto' }).click();
  await page.getByRole('radio').first().check();
  await expect(page.locator('.feedback')).toHaveCount(0);
  await page.getByRole('button', { name: 'Próxima', exact: true }).click();
  await page.clock.fastForward(60_000);
  await page.reload();
  await expect(page.getByRole('timer')).toContainText('19:');
  await page.getByRole('button', { name: 'Anterior', exact: true }).click();
  await expect(page.getByRole('radio').first()).toBeChecked();
  await page.getByText('Encerrar e liberar correção', { exact: true }).click();
  await page.getByRole('button', { name: 'Confirmar encerramento da prova' }).click();
  await expect(page.getByText('Correção liberada', { exact: true })).toBeVisible();
  await page.locator('.result-question').nth(1).locator('summary').first().click();
  await expect(page.locator('.result-question').nth(1)).toContainText('Questão sem resposta');
});
test('V6: prazo de prova continua fora da tela e bloqueia a prova oficial sem estoque', async ({
  page,
}) => {
  await page.clock.install();
  await page.goto(path(fund, 'prova'));
  await page.getByText('Perfil oficial SEDUC-PA e estoque necessário', { exact: true }).click();
  await expect(page.getByText(/Estoque insuficiente para gerar/)).toBeVisible();
  await page.getByLabel('Duração de treino (min)').fill('1');
  await page.getByRole('button', { name: 'Iniciar prova do piloto' }).click();
  await page.getByRole('link', { name: 'Início', exact: true }).click();
  await page.clock.fastForward(61_000);
  const data = await page.evaluate((k) => JSON.parse(localStorage.getItem(k)!), STATE_KEY);
  expect(data.exam.finished).toBeTruthy();
});
test('V6: discursiva conserva texto e rubrica e não libera modelo antes de finalizar', async ({
  page,
}) => {
  await page.goto(path(rep, 'prova'));
  await page.getByRole('button', { name: 'Discursiva', exact: true }).click();
  await expect(page.getByText('Modelo orientador e pontos esperados')).toHaveCount(0);
  await page
    .getByLabel('Sua resposta antes do modelo')
    .fill(
      Array.from(
        { length: 16 },
        (_, i) => `Linha ${i + 1}: escala, legenda e dados precisam responder à finalidade.`,
      ).join('\n'),
    );
  await page.reload();
  await page.getByRole('button', { name: 'Discursiva', exact: true }).click();
  await expect(page.getByLabel('Sua resposta antes do modelo')).toHaveValue(/Linha 16/);
  await page.getByRole('button', { name: 'Finalizar tentativa e conferir modelo' }).click();
  await expect(page.getByText('Modelo orientador e pontos esperados')).toBeVisible();
  for (const sel of await page.locator('.rubric select').all()) await sel.selectOption('2');
  await page.getByRole('button', { name: 'Registrar rubrica', exact: true }).click();
  await expect(page.getByText(/Rubrica registrada:/)).toBeVisible();
  const s = await page.evaluate((k) => JSON.parse(localStorage.getItem(k)!), STATE_KEY);
  expect(s.writingHistory).toHaveLength(1);
  expect(s.writingHistory[0].rubric.every((v: number) => v === 2)).toBeTruthy();
});
test('V6: prática percorre plano, defesa e dez dimensões da rubrica', async ({ page }) => {
  await page.goto(path(fund, 'prova'));
  await page.getByRole('button', { name: 'Prática de aula', exact: true }).click();
  await page.getByRole('button', { name: 'Iniciar planejamento', exact: true }).click();
  for (const ta of await page.locator('.panel textarea').all())
    await ta.fill('Comparar frações, desenhar o mapa e justificar escolhas de escala.');
  await page.getByRole('button', { name: 'Guardar plano e iniciar defesa oral' }).click();
  await page.reload();
  await page.getByRole('button', { name: 'Prática de aula', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Defenda suas escolhas' })).toBeVisible();
  await page.getByRole('button', { name: 'Finalizar defesa e abrir rubrica' }).click();
  for (const sel of await page.locator('.panel select').all()) await sel.selectOption('2');
  await page.getByRole('button', { name: 'Registrar prática e feedback' }).click();
  await expect(page.getByText(/Plano: 8\/8.*defesa: 12\/12/)).toBeVisible();
});
test('V6: importação é explícita, mantém bruto e ambiguidades sem criar domínio', async ({
  page,
}) => {
  const key = content.sources[1].key,
    raw = JSON.stringify({
      a: { b_14_0: 1 },
      fc: { 43: 'ok', 1: 'rev' },
      g: { miss: { 96: 1 } },
      bx: 500,
    });
  await page.addInitScript(({ key, raw }) => localStorage.setItem(key, raw), { key, raw });
  await page.goto('./v6.html');
  await page.getByRole('link', { name: 'Preferências e progresso' }).click();
  await page.getByRole('button', { name: 'Procurar legado neste navegador' }).click();
  await expect(page.getByText('Revisar antes de importar')).toBeVisible();
  await page.getByRole('button', { name: 'Importar estas chaves de Cartografia' }).click();
  const state = await page.evaluate((k) => JSON.parse(localStorage.getItem(k)!), STATE_KEY);
  expect(state.evidence).toHaveLength(0);
  expect(state.legacyHistory.filter((h: { ambiguous: boolean }) => h.ambiguous)).toHaveLength(3);
  expect(state.migrations[key].raw).toBe(raw);
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBe(raw);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Seu estudo, do seu jeito.' })).toBeVisible();
});
test('V6: exportar e restaurar mantém rascunhos; cópia incompatível não substitui estado', async ({
  page,
}) => {
  await page.goto('./v6.html#/configuracoes');
  const before = fresh();
  before.drafts.test = 'cópia preservada';
  await page.getByLabel('Ler cópia JSON').setInputFiles({
    name: 'v6.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({ schemaVersion: 6, state: before })),
  });
  await page.getByRole('button', { name: 'Restaurar esta cópia V6' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar progresso V6' }).click();
  const file = await downloadPromise;
  const exported = JSON.parse(await readFile((await file.path())!, 'utf8'));
  expect(exported.state.drafts.test).toBe('cópia preservada');
  await page.getByLabel('Ler cópia JSON').setInputFiles({
    name: 'quebrada.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{'),
  });
  await expect(page.locator('.status-note')).toContainText(/JSON|position|Expected/i);
  expect(
    await page.evaluate((k) => JSON.parse(localStorage.getItem(k)!).drafts.test, STATE_KEY),
  ).toBe('cópia preservada');
});
test('V6: dark mode, teclado, movimento reduzido e layouts 360–430 px', async ({ page }, info) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('./v6.html');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(
    await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--paper').trim(),
    ),
  ).toBe('#101a18');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  for (const width of [360, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    for (const url of [
      './v6.html',
      path(fund, 'estudo'),
      path(rep, 'treino'),
      path(geo, 'revisao'),
      path(fund, 'prova'),
      './v6.html#/caderno',
      './v6.html#/configuracoes',
    ]) {
      await page.goto(url);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      ).toBeTruthy();
    }
  }
  await page.goto('./v6.html#/configuracoes');
  await page.getByRole('combobox', { name: 'Aparência', exact: true }).selectOption('light');
  expect(
    await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--paper').trim(),
    ),
  ).toBe('#f7f6f1');
  await page.getByRole('combobox', { name: 'Movimento', exact: true }).selectOption('reduce');
  expect(
    await page
      .locator('button')
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe('0s');
  await page.goto('./v6.html');
  await page.screenshot({ path: info.outputPath('v6-home-mobile.png'), fullPage: true });
});
test('V6: mídia externa indisponível tem descrição e explicação continua acessível', async ({
  page,
}) => {
  await page.goto(path(rep, 'estudo', 'projecoes-propriedades'));
  const section = page
    .locator('.reading-section')
    .filter({ hasText: 'Propriedades: conformidade' });
  await section.locator('summary').first().click();
  await section.scrollIntoViewIfNeeded();
  await expect(page.locator('.media-fallback').first()).toBeVisible();
  await expect(section.locator('.theory')).toBeVisible();
});
test('V6: quota indisponível informa memória temporária e permite backup', async ({ page }) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (k, v) {
      if (k.startsWith('missaoGeo.v6')) throw new DOMException('Quota', 'QuotaExceededError');
      return original.call(this, k, v);
    };
  });
  await page.goto(path(fund, 'estudo', 'orientacao-azimute'));
  await page.getByRole('button', { name: 'Registrar que estudei esta explicação' }).first().click();
  await expect(page.getByRole('alert')).toContainText('só nesta sessão');
  const downloaded = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar agora' }).click();
  const f = await downloaded;
  expect(
    Object.keys(JSON.parse(await readFile((await f.path())!, 'utf8')).state.read),
  ).not.toHaveLength(0);
});
test('V6: teclado seleciona alternativas e outra aba preserva preferências recentes', async ({
  page,
  context,
}) => {
  await page.goto(path(fund, 'treino'));
  await page.getByRole('button', { name: 'Iniciar questões' }).click();
  const options = page.getByRole('radio');
  await options.first().focus();
  await page.keyboard.press('ArrowDown');
  await expect(options.nth(1)).toBeChecked();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Confirmar resposta' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('region', { name: 'Feedback explicativo' })).toBeVisible();
  await page.goto('./v6.html#/configuracoes');
  const other = await context.newPage();
  await other.route('**/*', (r) =>
    new URL(r.request().url()).hostname === '127.0.0.1' ? r.continue() : r.abort(),
  );
  await other.goto(page.url());
  await page.getByRole('combobox', { name: 'Aparência', exact: true }).selectOption('dark');
  await expect(other.getByRole('combobox', { name: 'Aparência', exact: true })).toHaveValue('dark');
  await other.getByRole('combobox', { name: 'Movimento', exact: true }).selectOption('reduce');
  await expect(page.getByRole('combobox', { name: 'Movimento', exact: true })).toHaveValue(
    'reduce',
  );
  expect(
    await page.evaluate((k) => JSON.parse(localStorage.getItem(k)!).preferences, STATE_KEY),
  ).toEqual({ theme: 'dark', motion: 'reduce' });
  await other.close();
});
test('V6: diagnóstico e pós-teste usam os mesmos IDs com comparação transparente', async ({
  page,
}) => {
  await page.goto(path(geo, 'treino'));
  for (const pool of ['diagnostico', 'pos-teste']) {
    await page.getByRole('combobox', { name: 'Banco', exact: true }).selectOption(pool);
    await page.getByRole('button', { name: 'Iniciar questões' }).click();
    for (let i = 0; i < 2; i++) {
      await page.getByRole('radio').first().check();
      await page.getByRole('button', { name: 'Confirmar resposta' }).click();
      await page
        .getByRole('button', { name: i === 1 ? 'Concluir rodada' : 'Próxima questão' })
        .click();
    }
    await expect(page.getByText(/Comparação dos mesmos itens:/)).toBeVisible();
    if (pool === 'diagnostico')
      await page.getByRole('button', { name: 'Preparar outra rodada' }).click();
  }
  await expect(page.getByText(/melhora imediata não comprova retenção/)).toBeVisible();
});
test('V6: equivalência de distratores históricos é explicada sem trocar o gabarito', async ({
  page,
}) => {
  const q = content.questions.find((q) =>
      q.refs.some((r) => r.legacy_source.includes('Tema_02') && r.legacy_id === 'b_6_0'),
    )!,
    state = fresh();
  state.session = {
    id: 'numeric-legacy-test',
    kind: 'questions',
    ids: [q.id],
    position: 0,
    repeat: [],
    pool: 'fixacao',
  };
  await page.addInitScript(({ key, state }) => localStorage.setItem(key, JSON.stringify(state)), {
    key: STATE_KEY,
    state,
  });
  await page.goto(path(fund, 'treino'));
  await page
    .getByRole('radio')
    .nth(q.options.findIndex((o) => o.id === q.correct))
    .check();
  await page.getByRole('button', { name: 'Confirmar resposta' }).click();
  await page.getByText('Comparar alternativas e aprofundar', { exact: true }).click();
  await expect(page.getByText(/Observação de notação:/)).toContainText('−42,5°');
});
