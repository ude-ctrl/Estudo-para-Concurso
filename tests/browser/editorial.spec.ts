import { test, expect, type Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import type { Catalog, Lesson } from '../../src/types';

const catalog: Catalog = JSON.parse(
  await readFile(new URL('../../public/content/catalog.json', import.meta.url), 'utf8'),
);
const logic = catalog.lessons.find((lesson) => lesson.number === 26)!;
const agrarian = catalog.lessons.find((lesson) => lesson.number === 12)!;
const portuguese = catalog.lessons.find((lesson) => lesson.number === 25)!;

function previousProgress(stage: number, answers: Record<string, number> = {}) {
  return {
    a: answers,
    pre: { pre_0: 0, pre_1: 1 },
    post: { post_0: 0 },
    u: stage,
    fc: { 0: 'ok', 1: 'rev', 17: 'ok' },
    g: {
      best: 70,
      n: 3,
      miss: { 12: 1 } as Record<string, number>,
      bestS: 70,
      bestM: 30,
      nS: 2,
      nM: 1,
    },
    dn: { 0: 1 },
    st: 2,
    bx: 15,
    tab: 'study',
    fd: '2026-10-13',
    // Unknown historical fields must survive an editorial correction too.
    annotation: 'Meu registro anterior à revisão editorial',
  };
}

async function openLegacy(page: Page, lesson: Lesson, state = previousProgress(0)) {
  await page.addInitScript(
    ({ key, initial }) => {
      // Do not reseed on reload: persistence is part of the assertions below.
      if (location.hostname === '127.0.0.1' && localStorage.getItem(key) === null)
        localStorage.setItem(key, JSON.stringify(initial));
    },
    { key: lesson.storage.current, initial: state },
  );
  await page.goto(`./${lesson.legacyUrl}`);
  await expect(page.locator('#tab-study')).toBeVisible();
}

async function startRepescagem(page: Page, mode: 'swipe' | 'mcq' = 'swipe') {
  // On the historical mobile layout, the visible tab label is only an emoji.
  await page.locator('#tabb-game').click();
  await page
    .getByRole('button', { name: mode === 'swipe' ? /Swipe · V\/F/ : /ABCD · Prova/ })
    .click();
  await page.getByRole('button', { name: /Repescagem.*erro/ }).click();
  await page.getByRole('button', { name: /Sem tempo/ }).click();
  await page.getByRole('button', { name: /Jogar/ }).click();
  await page.locator('#gbox').scrollIntoViewIfNeeded();
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route('**/*', (route) =>
    new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort(),
  );
});

test('desigualdades aparecem completas no enunciado, opções e feedback pelo teclado', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await openLegacy(page, logic, previousProgress(18));
  const question = page.locator('#w_b_18_0');
  await expect(question.locator('p.p')).toHaveText('Se A<B e B<C, então:');
  await expect(question.locator('button.o')).toHaveText(['A<C', 'C<A', 'A=C', 'nada se conclui']);
  await question.getByRole('button', { name: 'C<A', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(question.locator('.fb')).toContainText('Você tocou em: C<A');
  await expect(question.locator('.fb')).toContainText('Resposta certa: A<C');
  await question.getByRole('button', { name: 'A<C', exact: true }).click();
  await expect(question.locator('.fb')).toContainText('Você tocou em: A<C');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('Venn explica o erro que produz 40 e a dupla contagem que produz 35', async ({ page }) => {
  await openLegacy(page, logic, previousProgress(17));
  const question = page.locator('#w_b_17_0');
  await question.getByRole('button', { name: '40', exact: true }).click();
  await expect(question.locator('.fb')).toContainText(/20\s*\+\s*15\s*\+\s*5/);
  await expect(question.locator('.fb')).toContainText('30');
  await question.getByRole('button', { name: '35', exact: true }).click();
  await expect(question.locator('.fb')).toContainText(/20\s*\+\s*15/);
  await expect(question.locator('.fb')).toContainText(
    /interseção|dupla contagem|contad[oa]s? duas vezes/i,
  );
  await expect(question.locator('.fb')).toContainText('30');
  // Exploring another explanation must not rewrite the first recorded answer.
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!).a.b_17_0,
      logic.storage.current,
    ),
  ).toBe(1);
});

test('Agricultura Familiar identifica o critério indevidamente usado no caso e explica cada escolha', async ({
  page,
}) => {
  await openLegacy(page, agrarian, previousProgress(7));
  const question = page.locator('#w_b_7_0');
  await expect(question.locator('p.p')).toHaveText(
    'Um candidato classificou um estabelecimento como agricultura familiar apenas porque ele ocupa dois módulos fiscais, sem informações sobre trabalho, renda e gestão. Qual característica foi indevidamente tomada como suficiente nesse raciocínio?',
  );
  await expect(question.locator('button.o')).toHaveText([
    'ter área pequena',
    'usar predominantemente mão de obra familiar',
    'ser dirigido pela família',
    'atender aos critérios legais combinados',
  ]);
  await question
    .getByRole('button', { name: 'usar predominantemente mão de obra familiar', exact: true })
    .click();
  await expect(question.locator('.fb')).toContainText('não foi informada no caso');
  await expect(question.locator('.fb')).toContainText('Resposta certa: ter área pequena');
  await question.getByRole('button', { name: 'ter área pequena', exact: true }).click();
  await expect(question.locator('.fb')).toContainText(
    'O único dado usado foi a área de dois módulos fiscais',
  );
  await expect(question.locator('.fb')).toContainText('demais critérios legais');
});

for (const [lesson, stage, id] of [
  [logic, 18, 'b_18_0'],
  [agrarian, 7, 'b_7_0'],
] as const) {
  test(`revisão de ${lesson.code} preserva respostas, flashcards, jogos e XP após recarga`, async ({
    page,
  }) => {
    const state = previousProgress(stage, { b_0_0: 0, [id]: 0 });
    await openLegacy(page, lesson, state);
    const saved = await page.evaluate((key) => localStorage.getItem(key), lesson.storage.current);
    expect(JSON.parse(saved!)).toEqual(state);
    const xp = await page.locator('#xp').innerText();
    const question = page.locator(`#w_${id}`);
    await expect(question.locator('button.o').first()).toHaveClass(/ok/);
    await question.locator('button.o').nth(1).click();
    await expect(question.locator('.fb')).toBeVisible();
    await question.locator('button.o').first().click();
    expect(await page.locator('#xp').innerText()).toBe(xp);
    expect(await page.evaluate((key) => localStorage.getItem(key), lesson.storage.current)).toBe(
      saved,
    );
    await page.reload();
    await expect(page.locator('#xp')).toHaveText(xp);
    expect(await page.evaluate((key) => localStorage.getItem(key), lesson.storage.current)).toBe(
      saved,
    );
    await expect(page.locator(`#w_${id} button.o`).first()).toHaveClass(/ok/);
  });
}

test('V/F explica a base de porcentagens sucessivas e retira somente o erro respondido', async ({
  page,
}) => {
  const state = previousProgress(3);
  await openLegacy(page, logic, state);
  await startRepescagem(page);
  await expect(page.locator('#gcard .st')).toContainText('99%');
  await page.keyboard.press('v');
  await expect(page.locator('#gfb')).toContainText('A afirmação era VERDADEIRA');
  await expect(page.locator('#gfb')).toContainText(
    /100\s*[×x*]\s*1[,.]10\s*[×x*]\s*0[,.]90\s*=\s*99/,
  );
  await expect(page.locator('#gfb')).not.toContainText('VERDADEIRA. Não.');
  await page.getByRole('button', { name: 'Ver resultado', exact: true }).click();
  const saved = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    logic.storage.current,
  );
  expect(saved.g.miss).toEqual({});
  expect(saved.g.n).toBe(state.g.n + 1);
  expect(saved.a).toEqual(state.a);
  expect(saved.fc).toEqual(state.fc);
  expect(saved.bx).toBe(state.bx);
});

test('ABCD usa a mesma justificativa explicativa sem depender da posição sorteada', async ({
  page,
}) => {
  await openLegacy(page, logic, previousProgress(3));
  await startRepescagem(page, 'mcq');
  await page
    .locator('#gbox button.o')
    .filter({ hasText: 'Aumento de 10% e queda de 10% resultam em 99% do inicial.' })
    .click();
  await expect(page.locator('#gfb')).toContainText('Gabarito: afirmação verdadeira');
  await expect(page.locator('#gfb')).toContainText(
    /100\s*[×x*]\s*1[,.]10\s*[×x*]\s*0[,.]90\s*=\s*99/,
  );
  await expect(page.locator('#gfb')).not.toContainText('verdadeira. Não.');
});

test('jogos de sequências e ordem trazem os dados necessários quando sorteados sozinhos', async ({
  page,
}) => {
  const state = previousProgress(18);
  state.g.miss = { 70: 1, 71: 1, 73: 1, 78: 1 };
  await openLegacy(page, logic, state);
  await startRepescagem(page);
  const seen = new Set<string>();
  for (let i = 0; i < 4; i++) {
    const statement = await page.locator('#gcard .st').innerText();
    seen.add(statement);
    const isOrder = /A\s*<\s*B/.test(statement);
    const isDoubling = /1,\s*2,\s*4,\s*8/.test(statement);
    const isThirteen = /13/.test(statement);
    if (isOrder) {
      expect(statement).toMatch(/B\s*<\s*C/);
      expect(statement).toMatch(/A\s*<\s*C/);
    } else if (isDoubling) {
      expect(statement).toMatch(/soma|diferenças?/i);
    } else {
      expect(statement).toMatch(/2,\s*5,\s*8,\s*11/);
      if (isThirteen) expect(statement).toMatch(/razão 3|somar 3|soma.*3/i);
    }
    await page.locator(isOrder || (!isDoubling && !isThirteen) ? '.gb .gV' : '.gb .gF').click();
    await expect(page.locator('#gfb')).toContainText('Correto!');
    if (isOrder) await expect(page.locator('#gfb')).toContainText(/A\s*<\s*B\s*<\s*C|transitiv/i);
    if (isThirteen) await expect(page.locator('#gfb')).toContainText('14');
    await page
      .getByRole('button', { name: i === 3 ? 'Ver resultado' : 'Próxima', exact: true })
      .click();
  }
  expect(seen.size).toBe(4);
  await expect(page.locator('#gbox')).toContainText('4 acertos');
});

test('Português apresenta a frase-base e explica o pressuposto no próprio jogo', async ({
  page,
}) => {
  const state = previousProgress(0);
  state.g.miss = { 7: 1 };
  await openLegacy(page, portuguese, state);
  await startRepescagem(page);
  await expect(page.locator('#gcard .st')).toContainText('João voltou a estudar');
  await expect(page.locator('#gcard .st')).toContainText('nunca estudou');
  await page.locator('.gb .gF').click();
  await expect(page.locator('#gfb')).toContainText('A afirmação era FALSA');
  await expect(page.locator('#gfb')).toContainText(/antes|anterior|já estud/);
});
