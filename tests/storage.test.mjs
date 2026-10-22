import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { readProgress } from '../src/storage.ts';

const catalog = JSON.parse(
  await readFile(new URL('../public/content/catalog.json', import.meta.url), 'utf8'),
);
let saved;
beforeEach(() => {
  saved = new Map();
  // A read-only mock also detects any unexpected write during progress loading.
  globalThis.localStorage = { getItem: (key) => saved.get(key) ?? null };
});

test('partidas salvas dos 26 materiais iniciam o percurso sem aumentar questões ou flashcards conhecidos', () => {
  for (const lesson of catalog.lessons) {
    const raw = JSON.stringify({ g: { n: 1, best: 0, bestS: 0, bestM: 0 } });
    saved.set(lesson.storage.current, raw);
    const progress = readProgress(lesson);
    assert.equal(progress.started, true, lesson.id);
    assert.equal(progress.answered, 0);
    assert.equal(progress.percent, 0);
    assert.equal(progress.known, 0);
    assert.equal(progress.total, lesson.legacyQuestionKeys.length);
    assert.equal(saved.get(lesson.storage.current), raw);
  }
});

test('abrir game ou possuir contador inválido não inicia o percurso', () => {
  const lesson = catalog.lessons[0];
  for (const g of [
    null,
    [],
    {},
    { bestS: 100 },
    ...[0, -1, 1.5, '1', true, null, Number.MAX_SAFE_INTEGER + 1].map((n) => ({ n })),
  ]) {
    saved.set(lesson.storage.current, JSON.stringify({ tab: 'game', g }));
    assert.equal(readProgress(lesson).started, false, JSON.stringify(g));
  }
});

test('partidas na chave antiga são lidas sem migrar ou sobrescrever o armazenamento', () => {
  const lesson = catalog.lessons.find((lesson) => lesson.storage.previous);
  const raw = JSON.stringify({ g: { n: 2, nS: 1, nM: 1 } });
  saved.set(lesson.storage.previous, raw);
  assert.equal(readProgress(lesson).started, true);
  assert.equal(saved.has(lesson.storage.current), false);
  assert.equal(saved.get(lesson.storage.previous), raw);
  saved.set(lesson.storage.current, JSON.stringify({ g: { n: 0 } }));
  assert.equal(readProgress(lesson).started, false, 'o estado atual prevalece após zerar o game');
});

test('o game não altera a contagem das questões de estudo respondidas', () => {
  const lesson = catalog.lessons[0];
  const answers = { [lesson.legacyQuestionKeys[0]]: 0 };
  saved.set(lesson.storage.current, JSON.stringify({ a: answers }));
  const before = readProgress(lesson);
  saved.set(lesson.storage.current, JSON.stringify({ a: answers, g: { n: 12 } }));
  assert.deepEqual(readProgress(lesson), before);
});
