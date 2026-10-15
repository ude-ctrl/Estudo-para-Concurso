import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import type { Content } from '../../src/v6/types';
import { fresh, STATE_KEY } from '../../src/v6/engine';
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
