import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { buildCandidate } from '../scripts/build-climatologia-candidate.mjs';
import { buildCandidate02, candidatePath, preview02 } from '../scripts/build-climatologia-02.mjs';
import { resources, sha, validateBundle } from '../scripts/canonical-content.mjs';
const parent = await buildCandidate(),
  next = await buildCandidate02();
test('0.2.0 mantém todos os recursos anteriores, salvo acréscimos nas missões', () => {
  const current = new Map(resources(next.base).map(({ value }) => [value.id, value]));
  for (const { kind, value } of resources(parent.base)) {
    const actual = structuredClone(current.get(value.id));
    if (kind === 'missions') {
      actual.sections = actual.sections.filter((s) =>
        value.sections.some((old) => old.id === s.id),
      );
      actual.recalls = actual.recalls.filter((s) => value.recalls.some((old) => old.id === s.id));
    }
    assert.deepEqual(actual, value, value.id);
  }
  assert.deepEqual(next.provenance.archive, parent.provenance.archive);
  assert.deepEqual(next.provenance.parity_records, parent.provenance.parity_records);
  assert.deepEqual(next.base.metadata.legacy_progress, parent.base.metadata.legacy_progress);
  assert.equal(next.provenance.extension.parent_bundle_sha256, sha(parent));
});
test('0.2.0 é reproduzível, válida e não simula aprovação', async () => {
  assert.equal(validateBundle(next).resources, 256);
  for (const [name, value] of Object.entries({
    'content.json': next.base,
    'provenance.json': next.provenance,
    'audit.json': next.audit,
  }))
    assert.deepEqual(JSON.parse(await readFile(resolve(candidatePath, name), 'utf8')), value);
  assert.equal(await readFile(resolve(candidatePath, 'previa.html'), 'utf8'), preview02(next.base));
  assert.throws(() => validateBundle(next, { approved: true }), /não aprovada/);
});
test('Maranhão e atmosfera têm atividades vinculadas, fontes e três gabaritos únicos', () => {
  assert.equal(next.base.content.missions.length, 13);
  const additions = next.base.content.questions.slice(38);
  assert.equal(additions.length, 3);
  for (const q of additions) {
    assert.equal(q.options.length, 5);
    assert.equal(q.options.filter((o) => o.id === q.correct).length, 1);
    assert.ok(q.options.every((o) => o.feedback.length > 20));
    const review = next.audit.authored_questions.find((a) => a.id === q.id);
    assert.ok(
      review.source_ids.every((id) =>
        next.base.metadata.sources.some((s) => s.id === id && s.verification === 'direct'),
      ),
    );
    assert.ok(
      review.content_evidence.every((id) =>
        next.base.content.missions
          .find((m) => m.id === q.mission)
          .sections.some((s) => s.id === id),
      ),
    );
  }
  assert.match(preview02(next.base), /SEDUC-MA \/ FCC/);
  assert.match(preview02(next.base), /não reproduzem o formato oficial FCC/);
});
