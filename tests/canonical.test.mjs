import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { parseFragment } from 'parse5';
import {
  root,
  sha,
  resources,
  readBundle,
  validateBundle,
  validateLot,
  reconstructPilot,
  loadApprovedUnit,
  reviewDigest,
  editorialDiff,
  validateRevision,
  validateSchematicMap,
} from '../scripts/canonical-content.mjs';

const baseRoot = resolve(root, 'base-conhecimento');
const at = '2026-10-16T18:00:00-03:00';
const ids = ['cartografia-fundamentos', 'cartografia-representacao', 'geotecnologias'];
const originals = await Promise.all(ids.map((id) => readBundle(baseRoot, id, '0.1.0')));
const baseline = JSON.parse(
  await readFile(resolve(baseRoot, 'cartografia/baseline-piloto.json'), 'utf8'),
);
const clone = (i = 0) => structuredClone(originals[i]);
function seal(bundle) {
  const b = bundle.base,
    p = bundle.provenance;
  for (const meta of b.metadata.resources)
    meta.source_sha256 = sha(resources(b).find(({ value }) => value.id === meta.id).value);
  for (const row of bundle.audit.authored_questions)
    row.resource_sha256 = sha(b.content.questions.find((q) => q.id === row.id));
  p.snapshot.content_sha256 = sha(b.content);
  p.snapshot.support_sha256 = sha(b.support);
  p.snapshot.metadata_sha256 = sha(b.metadata);
}
// This synthetic fixture exercises the future gate in memory or an isolated temporary copy.
// It is never a human review and never promotes a real candidate in this repository.
function approvedFixture() {
  const x = clone();
  x.base.status = x.audit.status = 'APROVADA_CANONICA';
  x.audit.findings.forEach((f) => {
    f.status = 'resolved';
  });
  x.audit.premium_criteria.forEach((c) => {
    c.decision = 'approved';
  });
  x.base.metadata.resources.forEach((r) => {
    r.editorial_status = 'approved';
  });
  x.base.content.questions.forEach((q) => {
    if (q.status === 'human-review-pending') q.status = 'approved';
  });
  x.audit.authored_questions.forEach((q) => {
    q.human_decision = 'approved';
    q.human_reviewer = 'Fixture sintética';
  });
  x.base.metadata.temporal_claims.forEach((t) => {
    t.verification = 'verified';
    t.verified_at = '2026-10-16';
  });
  seal(x);
  x.audit.human_approval = {
    kind: 'human',
    reviewer: 'Fixture sintética — não é parecer real',
    reviewed_at: at,
    evidence: 'urn:test:synthetic-fixture',
    reviewed_digest: reviewDigest(x),
  };
  return x;
}
function resignFixture(x) {
  seal(x);
  x.audit.human_approval.reviewed_digest = reviewDigest(x);
}

test('catálogo mantém os 28 IDs oficiais e somente as três candidatas deste lote', async () => {
  const registry = JSON.parse(await readFile(resolve(baseRoot, 'manifest.json'), 'utf8'));
  const doc = await readFile(
    resolve(root, 'MissaoAprovacaoGeo/V6_CORRECOES_E_LACUNAS_FASE13.md'),
    'utf8',
  );
  const section = doc.split('## 7. IDs canônicos das 28 unidades')[1].split('## 8.')[0];
  const official = [...section.matchAll(/^\d+\. `([^`]+)`$/gm)].map((m) => m[1]);
  assert.equal(official.length, 28);
  assert.deepEqual(
    registry.units.map((u) => u.unit_id),
    official,
  );
  assert.equal(new Set(registry.units.map((u) => u.module_id)).size, 9);
  assert.deepEqual(
    registry.units.filter((u) => u.audit_started).map((u) => u.unit_id),
    ids,
  );
  assert.equal(
    registry.units.filter((u) => u.status === 'RASCUNHO' && u.candidate_version === null).length,
    25,
  );
  assert.ok(
    registry.units.every((u) => u.canonical_version === null && u.runtime_enabled === false),
  );
});

test('três versões completas validam sem serem aprovadas e preservam o inventário', async () => {
  const result = await validateLot();
  assert.deepEqual(
    result.summaries.map((s) => [s.unit, s.resources, s.parity, s.approved]),
    [
      [ids[0], 277, 272, false],
      [ids[1], 183, 172, false],
      [ids[2], 231, 241, false],
    ],
  );
  assert.equal(result.untouchedUnits, 25);
  assert.equal(result.canonicalUnits, 0);
  const sum = (k) => originals.reduce((n, x) => n + x.audit.counts[k], 0);
  assert.deepEqual(
    [
      'missions',
      'sections',
      'recalls',
      'concepts',
      'questions',
      'authored_questions',
      'cards',
      'game',
      'writing',
      'supplements',
      'parity_records',
    ].map(sum),
    [17, 50, 39, 33, 161, 36, 120, 256, 6, 6, 685],
  );
});

test('reconstrução recupera exatamente o banco original, incluindo variantes e contexto', () => {
  const rebuilt = reconstructPilot(originals, baseline);
  assert.equal(
    sha(JSON.stringify(rebuilt, null, 2) + '\n'),
    'f45c4d769c05822869ef8030d83915cd14039bc237d750b2985ce303f25ada5c',
  );
  assert.equal(rebuilt.archive.length, 685);
  assert.equal(rebuilt.archive.filter((r) => r.kind === 'context').length, 3);
  assert.equal(rebuilt.editorialChanges.length, 7);
  assert.equal(
    originals.reduce((n, x) => n + x.base.content.editorialChanges.length, 0),
    7,
  );
});

test('aliases entre unidades acompanham o destino final e mantêm a missão de origem', () => {
  const p = originals[0].provenance;
  assert.equal(p.cross_unit_aliases.length, 4);
  assert.deepEqual([...new Set(p.cross_unit_aliases.map((r) => r.canonical_id))].sort(), [
    'v6-vf-591cda7c4d9c4b66',
    'v6-vf-d24e1f9e376de0fb',
  ]);
  assert.ok(
    p.cross_unit_aliases.every(
      (r) =>
        r.destination_unit === ids[0] && r.source_context_mission === 'leitura-critica-integrada',
    ),
  );
  const x = clone();
  x.provenance.archive = x.provenance.archive.filter(
    (r) => !(r.id === 'v6-vf-d24e1f9e376de0fb' && r.mission === 'leitura-critica-integrada'),
  );
  assert.throws(() => validateBundle(x, { at }), /Vínculo legado inválido|Contagem de paridade/);
});

test('dados visuais, precisão UTM e prática preservam o suporte antes escondido na interface', () => {
  const visuals = originals.flatMap((x) => x.base.support.visuals);
  assert.deepEqual(visuals.map((v) => v.id).sort(), [
    'coordenadas',
    'densidade',
    'espectral',
    'perfil',
  ]);
  const density = visuals.find((v) => v.id === 'densidade');
  assert.equal(Number(density.rows[0][1].replaceAll('.', '')) / density.rows[0][2], 1000);
  const spectral = visuals.find((v) => v.id === 'espectral');
  const [red, nir] = spectral.rows[0].slice(1).map((v) => Number(v.replace(',', '.')));
  assert.ok(Math.abs((nir - red) / (nir + red) - 0.5) < 1e-12);
  const profile = visuals.find((v) => v.id === 'perfil');
  assert.equal(
    ((profile.rows[1][2] - profile.rows[0][2]) / (profile.rows[1][1] - profile.rows[0][1])) * 100,
    20,
  );
  assert.match(profile.svg, /aria-label=.*200 metros/);
  assert.match(profile.svg, /stroke-width="3"/);
  assert.match(originals[1].base.support.editorial_notes[0].text, /80°S e 84°N/);
  const practice = originals[0].base.support.teaching_practice[0];
  assert.equal(practice.plan_fields.length, 9);
  assert.equal(practice.rubric.length, 10);
  assert.ok(practice.instructions.some((s) => s.includes('não é espelho oficial')));
});

test('candidatas e conteúdo apenas aprovado com ressalvas são recusados para uso operacional', async () => {
  for (const id of ids)
    await assert.rejects(loadApprovedUnit(baseRoot, id, '0.1.0', { at }), /não aprovada/);
  const x = clone();
  x.base.status = x.audit.status = 'APROVADA_COM_RESSALVAS';
  assert.throws(() => validateBundle(x, { approved: true, at }), /não aprovada/);
});

test('trocar somente o status não contorna os achados impeditivos', () => {
  const x = clone();
  x.base.status = x.audit.status = 'APROVADA_CANONICA';
  assert.throws(() => validateBundle(x, { at }), /Achado impeditivo/);
});

test('aprovação futura exige todos os critérios, recursos e itens revisados', () => {
  for (const [alter, pattern] of [
    [
      (x) => {
        x.audit.premium_criteria[0].decision = 'pending-human-review';
      },
      /Auditoria Premium/,
    ],
    [
      (x) => {
        x.base.metadata.resources[0].editorial_status = 'pending-human-review';
        resignFixture(x);
      },
      /Recursos ainda pendentes/,
    ],
    [
      (x) => {
        x.base.content.questions.find((q) => q.id === 'v6-q-f01').status = 'human-review-pending';
        resignFixture(x);
      },
      /Questão autoral/,
    ],
    [
      (x) => {
        x.audit.authored_questions[0].human_reviewer = null;
      },
      /Revisão humana/,
    ],
    [
      (x) => {
        x.audit.human_approval = null;
      },
      /Aprovação humana/,
    ],
  ]) {
    const x = approvedFixture();
    alter(x);
    assert.throws(() => validateBundle(x, { approved: true, at }), pattern);
  }
  assert.equal(validateBundle(approvedFixture(), { approved: true, at }).approved, true);
  assert.ok(
    originals.every((x) => x.base.status === 'EM_AUDITORIA' && x.audit.human_approval === null),
  );
});

test('alteração editorial após o parecer invalida o digest mesmo com hashes locais recalculados', () => {
  const x = approvedFixture();
  x.base.content.questions.find((q) => q.id === 'v6-q-f01').explanation +=
    ' Alteração editorial posterior.';
  seal(x);
  assert.throws(() => validateBundle(x, { approved: true, at }), /Aprovação não corresponde/);
});

test('fonte parcial, dado vencido e data de verificação futura impedem promoção', () => {
  let x = approvedFixture();
  x.base.metadata.temporal_claims[0].verification = 'partial';
  resignFixture(x);
  assert.throws(() => validateBundle(x, { approved: true, at }), /Dado temporal não verificado/);
  x = approvedFixture();
  x.base.metadata.temporal_claims[0].review_due_at = '2026-10-15';
  resignFixture(x);
  assert.throws(() => validateBundle(x, { approved: true, at }), /Dado temporal vencido/);
  x = approvedFixture();
  x.base.metadata.temporal_claims[0].source_ids = ['on-estados'];
  resignFixture(x);
  assert.throws(() => validateBundle(x, { approved: true, at }), /sem fonte diretamente conferida/);
  x = clone();
  x.base.metadata.temporal_claims[0].verified_at = '2099-01-01';
  seal(x);
  assert.throws(() => validateBundle(x, { at }), /Verificação futura/);
});

test('mutação de texto ou perda de variante é detectada sem depender das contagens', () => {
  const x = clone();
  x.base.content.cards[0].back += ' Outra resposta.';
  assert.throws(() => validateBundle(x, { at }), /Conteúdo difere do snapshot/);
  const y = clone();
  y.base.content.cards.find((c) => c.variants.length).variants.pop();
  assert.throws(() => validateBundle(y, { at }), /Conteúdo difere do snapshot/);
});

test('gabarito inexistente e falta do visual são recusados mesmo em snapshot recalculado', () => {
  const x = clone();
  x.base.content.questions[0].correct = 'opcao-inexistente';
  seal(x);
  assert.throws(() => validateBundle(x, { at }), /Gabarito inválido/);
  const y = clone();
  y.base.support.visuals = [];
  seal(y);
  assert.throws(() => validateBundle(y, { at }), /Visual ausente/);
});

test('originais, inventário e matriz Premium não podem ser substituídos por registros incompletos', () => {
  const x = clone();
  x.provenance.archive[0].original = { alterado: true };
  assert.throws(() => validateBundle(x, { at }), /Original alterado/);
  const y = clone();
  y.audit.counts.cards--;
  assert.throws(() => validateBundle(y, { at }), /Inventário da auditoria/);
  const z = clone();
  z.audit.premium_criteria[0].id = 'criterio-inventado';
  assert.throws(() => validateBundle(z, { at }), /Matriz Premium/);
  const duplicate = clone();
  duplicate.provenance.parity_records[1] = structuredClone(duplicate.provenance.parity_records[0]);
  assert.throws(() => validateBundle(duplicate, { at }), /Paridade: IDs ausentes\/duplicados/);
});

test('reconstrução não ignora recursos extras nem referências divergentes', () => {
  const xs = structuredClone(originals);
  xs[0].base.content.cards.push({ ...xs[0].base.content.cards[0], id: 'extra' });
  assert.throws(() => reconstructPilot(xs, baseline), /Snapshot com recursos extras/);
  const ys = structuredClone(originals);
  ys[0].base.content.references = [];
  assert.throws(() => reconstructPilot(ys, baseline), /Contexto de fontes alterado/);
});

test('as 12 propostas de vínculo e as cinco famílias permanecem explícitas e não aplicadas', () => {
  const proposals = originals.flatMap((x) => x.audit.proposed_metadata_changes);
  assert.equal(proposals.length, 12);
  for (const proposal of proposals) {
    const item = originals
      .flatMap((x) => resources(x.base))
      .find(({ value }) => value.id === proposal.id).value;
    assert.deepEqual({ mission: item.mission, concept: item.concept }, proposal.before);
    assert.equal(sha(item), proposal.before_sha256);
    assert.equal(proposal.applied, false);
  }
  assert.equal(originals.flatMap((x) => x.audit.question_families).length, 5);
  assert.equal(
    originals.reduce(
      (n, x) => n + x.audit.authored_questions.filter((q) => q.human_decision === 'pending').length,
      0,
    ),
    36,
  );
});

test('leitura funciona com somente o pacote de base, sem HTMLs, importadores ou banco ativo', async (t) => {
  const temp = await mkdtemp(resolve(tmpdir(), 'v6-canonical-'));
  t.after(() => rm(temp, { recursive: true, force: true }));
  await cp(resolve(baseRoot, 'manifest.json'), resolve(temp, 'manifest.json'));
  await cp(resolve(baseRoot, 'cartografia'), resolve(temp, 'cartografia'), { recursive: true });
  const copy = await readBundle(temp, ids[0], '0.1.0');
  assert.equal(validateBundle(copy, { at }).resources, 277);
  assert.equal((await validateLot(temp)).canonicalUnits, 0);
  await assert.rejects(loadApprovedUnit(temp, ids[0], '0.1.0', { at }), /não aprovada/);
});

test('IDs e versões de caminho inválidos são recusados antes de acessar arquivos', async () => {
  await assert.rejects(readBundle(baseRoot, '../fora', '0.1.0'), /Caminho/);
  await assert.rejects(readBundle(baseRoot, ids[0], '../../main'), /Caminho/);
});

test('pacote de outra unidade ou versão é recusado mesmo sob um caminho registrado', async (t) => {
  const temp = await mkdtemp(resolve(tmpdir(), 'v6-canonical-identity-'));
  t.after(() => rm(temp, { recursive: true, force: true }));
  await cp(resolve(baseRoot, 'manifest.json'), resolve(temp, 'manifest.json'));
  const target = resolve(temp, 'cartografia', ids[0]);
  await mkdir(target, { recursive: true });
  await cp(resolve(baseRoot, 'cartografia', ids[1], '0.1.0'), resolve(target, '0.1.0'), {
    recursive: true,
  });
  await assert.rejects(readBundle(temp, ids[0], '0.1.0'), /Identidade do pacote/);
  await cp(resolve(baseRoot, 'cartografia', ids[0], '0.1.0'), resolve(target, '0.1.1'), {
    recursive: true,
  });
  await assert.rejects(readBundle(temp, ids[0], '0.1.1'), /Identidade do pacote/);
});

test('nova candidata não substitui a versão aprovada nem exige reabrir o HTML legado', async (t) => {
  const temp = await mkdtemp(resolve(tmpdir(), 'v6-canonical-versions-'));
  t.after(() => rm(temp, { recursive: true, force: true }));
  await cp(resolve(baseRoot, 'cartografia'), resolve(temp, 'cartografia'), { recursive: true });
  const registry = JSON.parse(await readFile(resolve(baseRoot, 'manifest.json'), 'utf8'));
  const entry = registry.units.find((u) => u.unit_id === ids[0]);
  entry.canonical_version = '1.0.0';
  entry.candidate_version = '1.1.0';
  entry.status = 'EM_AUDITORIA';
  entry.runtime_enabled = true;
  await writeFile(resolve(temp, 'manifest.json'), JSON.stringify(registry));
  const canonical = approvedFixture(),
    candidate = clone();
  for (const [bundle, version] of [
    [canonical, '1.0.0'],
    [candidate, '1.1.0'],
  ]) {
    for (const doc of [bundle.base, bundle.audit, bundle.provenance])
      doc.editorial_version = version;
    if (version === '1.1.0')
      bundle.provenance.revision = {
        schema_version: 1,
        kind: 'correction-with-preservation',
        from_version: '0.1.0',
        to_version: version,
        parent_bundle_sha256: sha(originals[0]),
        option_replacements: [],
        changes: [],
      };
    if (bundle.audit.human_approval)
      bundle.audit.human_approval.reviewed_digest = reviewDigest(bundle);
    const dir = resolve(temp, 'cartografia', ids[0], version);
    await mkdir(dir, { recursive: true });
    for (const [name, value] of [
      ['content.json', bundle.base],
      ['audit.json', bundle.audit],
      ['provenance.json', bundle.provenance],
    ]) {
      await writeFile(resolve(dir, name), JSON.stringify(value));
    }
  }
  assert.equal((await loadApprovedUnit(temp, ids[0], '1.0.0', { at })).status, 'APROVADA_CANONICA');
  await assert.rejects(loadApprovedUnit(temp, ids[0], '1.1.0', { at }), /não aprovada/);
  const checked = await validateLot(temp, { at });
  assert.equal(checked.canonicalUnits, 1);
  assert.equal(checked.summaries[0].status, 'EM_AUDITORIA');
  assert.equal((await readBundle(temp, ids[0], '0.1.0')).base.status, 'EM_AUDITORIA');
});

const revised = await Promise.all(ids.map((id) => readBundle(baseRoot, id, '0.1.1')));
const revisionClone = (i = 0) => structuredClone(revised[i]);
const revisionPayload = (x) => ({
  content: x.base.content,
  support: x.base.support,
  metadata: x.base.metadata,
});
function redeclareRevision(x, i = 0) {
  seal(x);
  x.provenance.revision.changes = editorialDiff(
    revisionPayload(originals[i]),
    revisionPayload(x),
  ).map((c) => ({
    ...c,
    reason: 'Mutação sintética declarada para verificar as outras salvaguardas.',
  }));
}

test('0.1.1 continua íntegra quando o catálogo evolui e mantém todos os recursos e procedências', async () => {
  const lot = await validateLot(baseRoot, { at });
  assert.ok(lot.summaries.every((s) => !s.approved));
  for (const [i, next] of revised.entries()) {
    assert.equal(validateBundle(next, { at }).approved, false);
    const check = validateRevision(originals[i], next);
    assert.equal(check.preserved_resources, [277, 183, 231][i]);
    assert.ok(check.changes > 0);
    assert.deepEqual(next.provenance.archive, originals[i].provenance.archive);
    assert.deepEqual(next.provenance.parity_records, originals[i].provenance.parity_records);
    assert.deepEqual(next.audit.counts, originals[i].audit.counts);
  }
  assert.equal(lot.canonicalUnits, 0);
  assert.equal(lot.untouchedUnits, 25);
});

test('revisão recusa diferença não declarada, valor anterior falso e pacote pai alterado', () => {
  const missing = revisionClone();
  missing.provenance.revision.changes.pop();
  assert.throws(() => validateRevision(originals[0], missing), /não declarada/);
  const falseBefore = revisionClone();
  falseBefore.provenance.revision.changes[0].before = 'valor anterior inventado';
  assert.throws(() => validateRevision(originals[0], falseBefore), /antes\/depois/);
  const changed = revisionClone();
  changed.base.content.cards[0].back += ' Mudança não declarada.';
  seal(changed);
  assert.throws(() => validateRevision(originals[0], changed), /não declarada/);
  const parent = clone();
  parent.audit.reviewed_at = '2026-10-15';
  assert.throws(() => validateRevision(parent, revised[0]), /Pacote pai/);
});

test('mesmo uma revisão declarada não permite perder recursos, mudar gabarito ou alterar procedência', () => {
  const changedKey = revisionClone();
  changedKey.base.content.questions[0].correct = changedKey.base.content.questions[0].options.find(
    (o) => o.id !== changedKey.base.content.questions[0].correct,
  ).id;
  redeclareRevision(changedKey);
  assert.throws(() => validateRevision(originals[0], changedKey), /ID do gabarito/);
  const changedAnswer = revisionClone();
  const question = changedAnswer.base.content.questions[0];
  question.options.find((o) => o.id === question.correct).text += ' Outra resposta.';
  redeclareRevision(changedAnswer);
  assert.throws(() => validateRevision(originals[0], changedAnswer), /texto da resposta correta/);
  const lost = revisionClone();
  const removed = lost.base.content.cards.pop();
  lost.base.metadata.resources = lost.base.metadata.resources.filter((r) => r.id !== removed.id);
  lost.audit.counts.cards--;
  redeclareRevision(lost);
  assert.throws(() => validateRevision(originals[0], lost), /perdeu ou substituiu recurso/);
  const archive = revisionClone();
  archive.provenance.archive[0].original = { editado: true };
  assert.throws(() => validateRevision(originals[0], archive), /Procedência histórica/);
});

test('as 12 associações são corrigidas na candidata sem apagar as propostas e valores iniciais', () => {
  let count = 0;
  revised.forEach((next, i) => {
    const old = new Map(resources(originals[i].base).map(({ value }) => [value.id, value]));
    const current = new Map(resources(next.base).map(({ value }) => [value.id, value]));
    for (const p of next.audit.proposed_metadata_changes) {
      count++;
      assert.equal(p.applied, true);
      assert.equal(p.human_decision, 'pending');
      assert.deepEqual(
        { mission: old.get(p.id).mission, concept: old.get(p.id).concept },
        p.before,
      );
      assert.deepEqual(
        { mission: current.get(p.id).mission, concept: current.get(p.id).concept },
        p.proposed,
      );
      assert.equal(sha(old.get(p.id)), p.before_sha256);
    }
  });
  assert.equal(count, 12);
});

test('distrator GMS tem identidade nova, valores distintos e não remapeia respostas antigas', () => {
  const id = 'v6-fix-ae06798f90e822d3';
  const q = revised[0].base.content.questions.find((q) => q.id === id);
  const numeric = (text) => Number(text.replace('−', '-').replace(',', '.').replace('°', ''));
  const values = q.options.map((o) => numeric(o.text));
  assert.equal(new Set(values).size, values.length);
  assert.equal(numeric(q.options.find((o) => o.id === q.correct).text), -(42 + 30 / 60));
  assert.equal(q.correct, originals[0].base.content.questions.find((q) => q.id === id).correct);
  const replacement = revised[0].provenance.revision.option_replacements[0];
  assert.equal(replacement.old_text, '−42,30°');
  assert.equal(replacement.new_text, '−42,05°');
  assert.equal(replacement.progress_mapping, null);
  assert.ok(!q.options.some((o) => o.id === replacement.retired_option_id));
  assert.ok(q.options.some((o) => o.id === replacement.replacement_option_id));
  const unmapped = revisionClone();
  unmapped.provenance.revision.option_replacements = [];
  assert.throws(() => validateRevision(originals[0], unmapped), /Troca de alternativa/);
  const remapped = revisionClone();
  remapped.provenance.revision.option_replacements[0].progress_mapping = 'automatic';
  assert.throws(() => validateRevision(originals[0], remapped), /migração silenciosa/);
});

test('cinco questões legadas recebem feedbacks específicos mantendo enunciados e respostas corretas', () => {
  let count = 0;
  revised.forEach((next, i) => {
    for (const q of next.base.content.questions) {
      const previous = originals[i].base.content.questions.find((x) => x.id === q.id);
      if (q.refs.length && q.options.some((o, j) => o.feedback !== previous.options[j].feedback)) {
        count++;
        assert.equal(q.prompt, previous.prompt);
        assert.equal(q.correct, previous.correct);
        assert.ok(q.options.every((o) => o.feedback.length > 40 && o.feedback !== 'Correto.'));
        assert.equal(q.status, 'human-review-pending');
      }
    }
  });
  assert.equal(count, 5);
  const gms = revised[0].base.content.questions.find((q) => q.id === 'v6-fix-ae06798f90e822d3');
  assert.ok(gms.options.every((o) => !/altitude|latitude/i.test(o.feedback)));
  const pixel = revised[2].base.content.questions.find((q) => q.id === 'v6-fix-b5782254d12f27da');
  assert.ok(pixel.options.every((o) => !/térmic|passiv/i.test(o.feedback)));
});

test('dez níveis são reavaliados e cinco itens saem de Elite sem inflar dificuldade ou alterar questões', () => {
  const reassessed = revised.flatMap((x) => x.audit.level_reassessment);
  assert.equal(reassessed.length, 10);
  assert.deepEqual(
    reassessed
      .filter((r) => r.before.pool === 'elite')
      .map((r) => r.id)
      .sort(),
    ['v6-q-f08', 'v6-q-f12', 'v6-q-r07', 'v6-q-r08', 'v6-q-r10'],
  );
  for (const r of reassessed) {
    const before = originals.flatMap((x) => x.base.content.questions).find((q) => q.id === r.id);
    const after = revised.flatMap((x) => x.base.content.questions).find((q) => q.id === r.id);
    assert.equal(r.psychometrically_calibrated, false);
    assert.equal(r.human_decision, 'pending');
    assert.equal(after.pool, 'concurso');
    assert.equal(after.difficulty, 2);
    assert.ok(after.cognitive === 2 || after.cognitive === 3);
    assert.deepEqual(after.options, before.options);
    assert.equal(after.prompt, before.prompt);
    assert.equal(after.correct, before.correct);
    assert.ok(after.roles.includes(after.pool) && !after.roles.includes('elite'));
  }
  const pools = (list) =>
    ['fixacao', 'concurso', 'elite'].map(
      (pool) => list.flatMap((x) => x.base.content.questions).filter((q) => q.pool === pool).length,
    );
  assert.deepEqual(pools(originals), [125, 18, 18]);
  assert.deepEqual(pools(revised), [125, 23, 13]);
  const wrongLevel = revisionClone();
  wrongLevel.base.content.questions[0].difficulty = 5;
  seal(wrongLevel);
  assert.throws(() => validateBundle(wrongLevel, { at }), /Classificação cognitiva/);
  const wrongAudit = revisionClone();
  wrongAudit.audit.authored_questions[0].current_cognitive = 5;
  assert.throws(() => validateBundle(wrongAudit, { at }), /Parecer e classificação/);
});

test('cinco famílias vinculam dez questões sem contá-las como novidade independente', () => {
  const families = revised.flatMap((x) => x.base.metadata.question_families);
  assert.equal(families.length, 5);
  assert.equal(
    families.reduce((n, f) => n + f.members.length, 0),
    10,
  );
  assert.ok(families.every((f) => f.independent_novelty === false));
  const broken = revisionClone();
  const id = broken.base.metadata.question_families[0].members[0];
  delete broken.base.content.questions.find((q) => q.id === id).family_id;
  seal(broken);
  assert.throws(() => validateBundle(broken, { at }), /vínculo bidirecional/);
  const novelty = revisionClone();
  novelty.base.metadata.question_families[0].independent_novelty = true;
  seal(novelty);
  assert.throws(() => validateBundle(novelty, { at }), /decisão de novidade/);
});

test('perfil mantém números e SVG e explicita esquema sem escala; par Landsat acompanha g10', () => {
  const profile = revised[1].base.support.visuals.find((v) => v.id === 'perfil');
  const old = originals[1].base.support.visuals.find((v) => v.id === 'perfil');
  assert.equal(profile.svg, old.svg);
  assert.deepEqual(profile.rows, old.rows);
  assert.match(profile.caption, /sem escala/);
  assert.match(
    revised[1].base.content.questions.find((q) => q.id === 'v6-q-r09').prompt,
    /não deve ser medida/,
  );
  const q = revised[2].base.content.questions.find((q) => q.id === 'v6-q-g10');
  const pair = revised[2].base.support.visuals.find((v) => v.id === q.visual);
  assert.equal(pair.kind, 'image-pair');
  assert.deepEqual(
    pair.images.map((i) => [i.acquired_at, i.sensor]),
    [
      ['1984-09-19', 'Landsat 5/TM'],
      ['2015-09-25', 'Landsat 8/OLI'],
    ],
  );
  assert.ok(pair.images.every((i) => i.alt.length > 40 && i.credit.includes('Jesse Allen')));
  assert.ok(pair.transcript.length > 100);
  assert.match(q.prompt, /sem descrever a situação atual/);
  const corrupt = revisionClone(2);
  corrupt.base.support.visuals.find((v) => v.id === q.visual).images[0].alt = '';
  seal(corrupt);
  assert.throws(() => validateBundle(corrupt, { at }), /Par de imagens incompleto/);
  const missingSource = revisionClone(2);
  missingSource.base.support.visuals.find((v) => v.id === q.visual).source_id = 'fonte-inexistente';
  seal(missingSource);
  assert.throws(() => validateBundle(missingSource, { at }), /Par de imagens sem fonte/);
});

test('fontes parciais têm conferência direta delimitada e o endpoint USGS não recebe verificação inventada', () => {
  const sources = revised.flatMap((x) => x.base.metadata.sources);
  assert.ok(
    sources
      .filter((s) => ['on-estados', 'mec-bncc', 'fgdc-utm-range'].includes(s.id))
      .every((s) => s.verification === 'direct' && s.verified_at === '2026-10-16'),
  );
  const usgs = sources.find((s) => s.id === 'usgs-utm-range');
  assert.equal(usgs.verified_at, null);
  assert.equal(usgs.superseded_for_verification_by, 'fgdc-utm-range');
  assert.ok(
    revised
      .flatMap((x) => x.base.metadata.temporal_claims)
      .every((t) => t.verification === 'verified'),
  );
  const mercator = revised[1].base.support.media.find((m) => m.url.includes('Mercator'));
  assert.equal(mercator.license, 'CC-BY-SA-3.0');
  assert.ok(mercator.credit.includes('Jecowa'));
  assert.equal(mercator.modified_in_this_revision, false);
  assert.ok(
    revised[0].audit.findings.some(
      (f) => f.id === 'CAN-MIDIA-IBGE-001' && f.status === 'open' && f.blocks_promotion,
    ),
  );
});

test('candidatas corrigidas continuam sem aprovação humana, sem consumo operacional e sem falsas provas FGV', async () => {
  for (const [i, next] of revised.entries()) {
    await assert.rejects(loadApprovedUnit(baseRoot, ids[i], '0.1.1', { at }), /não aprovada/);
    assert.equal(next.audit.human_approval, null);
    assert.ok(next.audit.premium_criteria.every((c) => c.decision === 'pending-human-review'));
    assert.ok(
      next.audit.authored_questions.every(
        (q) => q.human_decision === 'pending' && q.human_reviewer === null,
      ),
    );
    const theory = next.base.content.missions
      .flatMap((m) => m.sections)
      .map((s) => [s.title, s.hook, s.html].join(' '))
      .join(' ');
    assert.doesNotMatch(
      theory,
      /FGV já|FGV costuma|FGV tende|FGV gosta|banca raramente|banca gosta/,
    );
    assert.equal(
      next.base.metadata.presentation_policy.historical_premium_footer_is_current_approval,
      false,
    );
  }
  assert.equal(revised.flatMap((x) => x.audit.authored_questions).length, 36);
});

const current = await Promise.all(ids.map((id) => readBundle(baseRoot, id, '0.1.2')));
const currentClone = (i = 0) => structuredClone(current[i]);
const currentMap = () =>
  structuredClone(current[0].base.support.visuals.find((v) => v.kind === 'schematic-map'));

test('0.1.2 valida a cadeia completa e preserva as identidades, alternativas e gabaritos de 0.1.1', async () => {
  const result = await validateLot(baseRoot, { at });
  assert.ok(result.summaries.every((s) => s.version === '0.1.2' && !s.approved));
  assert.equal(result.canonicalUnits, 0);
  assert.equal(result.untouchedUnits, 25);
  for (const [i, next] of current.entries()) {
    assert.equal(validateBundle(next, { at }).approved, false);
    assert.equal(validateRevision(revised[i], next).preserved_resources, [277, 183, 231][i]);
    assert.equal(
      validateRevision(originals[i], revised[i]).preserved_resources,
      [277, 183, 231][i],
    );
    assert.deepEqual(next.audit.counts, revised[i].audit.counts);
    for (const q of next.base.content.questions) {
      const before = revised[i].base.content.questions.find((p) => p.id === q.id);
      assert.equal(q.prompt, before.prompt);
      assert.equal(q.correct, before.correct);
      assert.equal(q.explanation, before.explanation);
      assert.deepEqual(
        q.options.map(({ id, text }) => ({ id, text })),
        before.options.map(({ id, text }) => ({ id, text })),
      );
    }
    for (const key of ['cards', 'game', 'writing', 'supplements'])
      assert.deepEqual(next.base.content[key], revised[i].base.content[key]);
    const prior = new Map(resources(revised[i].base).map(({ value }) => [value.id, value]));
    const changedTheory = resources(next.base).filter(
      ({ kind, value }) => kind === 'theory' && value.html !== prior.get(value.id).html,
    );
    assert.deepEqual(
      changedTheory.map(({ value }) => value.id).sort(),
      i === 0 ? ['v6-theory-t02-14', 'v6-theory-t02-8'] : [],
    );
    for (const { value } of changedTheory)
      assert.ok(value.html.length > prior.get(value.id).html.length);
  }
});

test('44 questões perdem os feedbacks genéricos e 137 distratores recebem explicações individuais', () => {
  let questions = 0,
    alternatives = 0;
  current.forEach((next, i) => {
    const expected = revised[i].base.content.questions.filter((q) =>
      q.options.some(
        (o) =>
          o.id !== q.correct &&
          /^(Distrator\.|Não atende ao comando\.|Não é a melhor resposta\.)/.test(o.feedback),
      ),
    );
    assert.deepEqual(
      next.audit.editorial_round.feedback_question_ids,
      expected.map((q) => q.id),
    );
    for (const old of expected) {
      questions++;
      const q = next.base.content.questions.find((p) => p.id === old.id);
      assert.equal(
        new Set(q.options.filter((o) => o.id !== q.correct).map((o) => o.feedback)).size,
        q.options.length - 1,
      );
      q.options.forEach((o, j) => {
        if (o.id === q.correct) return assert.equal(o.feedback, old.options[j].feedback);
        alternatives++;
        assert.notEqual(o.feedback, old.options[j].feedback);
        assert.ok(o.feedback.length > 50);
        assert.doesNotMatch(
          o.feedback,
          /^(Distrator\.|Não atende ao comando\.|Não é a melhor resposta\.)/,
        );
      });
    }
  });
  assert.equal(questions, 44);
  assert.equal(alternatives, 137);
  const q = current[0].base.content.questions.find((q) => q.id === 'v6-fix-021ea0f23f590e47');
  assert.match(q.options.find((o) => o.text === '2 km').feedback, /4 × 5 = 20 km/);
  assert.match(q.options.find((o) => o.text === '200 km').feedback, /100.000 cm\/km/);
  const slope = current[1].base.content.questions.find((q) => q.id === 'v6-fix-49fa6f33e47651ca');
  assert.match(slope.options.find((o) => o.text === '20° obrigatoriamente').feedback, /11,3°/);
});

test('r11 passa para Concurso sem reescrever o item ou inflar o estoque Elite', () => {
  const before = revised[1].base.content.questions.find((q) => q.id === 'v6-q-r11');
  const q = current[1].base.content.questions.find((q) => q.id === before.id);
  assert.deepEqual([q.pool, q.difficulty, q.cognitive], ['concurso', 2, 3]);
  assert.deepEqual(q.options, before.options);
  assert.equal(q.prompt, before.prompt);
  assert.equal(q.correct, before.correct);
  assert.ok(q.roles.includes('concurso') && !q.roles.includes('elite'));
  const decision = current[1].audit.editorial_round.level_reassessment[0];
  assert.equal(decision.id, q.id);
  assert.equal(decision.psychometrically_calibrated, false);
  assert.deepEqual(
    ['fixacao', 'concurso', 'elite'].map(
      (p) => current.flatMap((x) => x.base.content.questions).filter((q) => q.pool === p).length,
    ),
    [125, 24, 12],
  );
});

test('mapa hipotético tem grade, escala, símbolos e posições coerentes com o SVG e a alternativa textual', () => {
  const map = currentMap();
  validateSchematicMap(map);
  assert.deepEqual(map.extent, [0, 0, 4, 4]);
  assert.equal((map.extent[2] - map.extent[0]) * (map.extent[3] - map.extent[1]), 16);
  assert.equal(map.crs.geodetic_datum, null);
  assert.match(map.caption, /hipotético/);
  assert.match(map.transcript, /não delimita fusos brasileiros/);
  const school = map.features.find((f) => f.id === 'escola');
  const clinic = map.features.find((f) => f.id === 'saude');
  const river = map.features.find((f) => f.id === 'rio');
  assert.deepEqual(school.coordinates, [1, 1]);
  assert.deepEqual(clinic.coordinates, [3, 3]);
  assert.ok(
    clinic.coordinates[0] > school.coordinates[0] && clinic.coordinates[1] > school.coordinates[1],
  );
  assert.equal(river.coordinates[0][0] - school.coordinates[0], 1);
  assert.equal(
    Math.hypot(
      map.scale_bar.to[0] - map.scale_bar.from[0],
      map.scale_bar.to[1] - map.scale_bar.from[1],
    ) / map.rendering.units_per_km,
    1,
  );
  const nodes = [];
  const visit = (node) => {
    nodes.push(node);
    for (const child of node.childNodes || []) visit(child);
  };
  visit(parseFragment(map.svg));
  const attrs = (node) => Object.fromEntries(node.attrs.map((a) => [a.name, a.value]));
  const rect = attrs(
    nodes.find((n) => n.attrs?.some((a) => a.name === 'data-feature' && a.value === 'escola')),
  );
  assert.equal(Number(rect.x) + Number(rect.width) / 2, 120);
  assert.equal(Number(rect.y) + Number(rect.height) / 2, 300);
  const riverPath = attrs(
    nodes.find((n) => n.attrs?.some((a) => a.name === 'data-feature' && a.value === 'rio')),
  );
  assert.equal(riverPath.d, 'M200 380V60');
  assert.equal(nodes.filter((n) => n.tagName === 'svg').length, 1);
  assert.equal(nodes.filter((n) => n.attrs?.some((a) => a.name === 'id')).length, 0);
  assert.deepEqual(map.rows.slice(0, 2), [
    ['Escola', 1, 1],
    ['Posto de saúde', 3, 3],
  ]);
});

test('mapa obrigatório é autossuficiente e PDF histórico fica complementar sem acesso inventado', () => {
  const fund = current[0],
    map = currentMap();
  const sections = fund.base.content.missions.flatMap((m) => m.sections);
  const reading = sections.find((s) => s.id === 'v6-theory-t02-14');
  const time = sections.find((s) => s.id === 'v6-theory-t02-8');
  assert.ok(reading.html.includes(map.svg));
  assert.doesNotMatch(reading.html + time.html, /<object\b|<iframe\b|<img\b/);
  assert.doesNotMatch(reading.html + time.html, /O mapa informa|procure.*escala 1:40.000.000/);
  assert.match(reading.html, /1:40.000.000, 1 cm corresponde a 400 km/);
  assert.match(time.html, /UTC−2/);
  assert.match(time.html, /UTC−5/);
  assert.match(time.html, /Lei nº 12.876\/2013/);
  assert.match(time.html, /Observatório Nacional/);
  assert.ok(
    fund.base.support.media.every(
      (m) =>
        m.required_for_learning === false &&
        m.active_embed === false &&
        m.verification === 'access-blocked',
    ),
  );
  assert.ok(time.html.includes(fund.base.support.media[0].url));
  const finding = fund.audit.findings.find((f) => f.id === 'CAN-MIDIA-IBGE-001');
  assert.equal(finding.status, 'mitigated');
  assert.equal(finding.blocks_promotion, false);
  assert.match(finding.assisted_resolution.summary, /acesso ao PDF continua não concluído/);
  const broken = currentClone();
  broken.base.content.missions.flatMap((m) => m.sections).find((s) => s.id === reading.id).html =
    '<p>Figura perdida.</p>';
  seal(broken);
  assert.throws(() => validateBundle(broken, { at }), /Mapa didático diverge/);
});

test('mapa rejeita escala incoerente, coordenadas fora do recorte e conteúdo ativo ou sem acesso textual', () => {
  const bar = currentMap();
  bar.scale_bar.distance_km = 2;
  assert.throws(() => validateSchematicMap(bar), /Escala gráfica incompatível/);
  const point = currentMap();
  point.features[0].coordinates = [20, 1];
  assert.throws(() => validateSchematicMap(point), /Feição fora/);
  for (const injection of [
    '<script>alert(1)</script>',
    '<image href="https://example.invalid/map.png"/>',
    '<animate attributeName="x"/>',
    '<rect onclick="alert(1)"/>',
  ]) {
    const active = currentMap();
    active.svg += injection;
    assert.throws(() => validateSchematicMap(active), /conteúdo ativo\/externo/);
  }
  const noText = currentMap();
  noText.transcript = '';
  assert.throws(() => validateSchematicMap(noText), /sem contexto/);
});

test('parecer por IA identifica delegação, cobre os recursos e não permite conteúdo alterado ou autoria humana fictícia', async () => {
  for (const [i, next] of current.entries()) {
    assert.equal(next.audit.assisted_review.kind, 'ai');
    assert.equal(next.audit.assisted_review.human_manual_review, false);
    assert.equal(next.audit.assisted_review.resources.length, [277, 183, 231][i]);
    assert.equal(next.audit.assisted_review.premium_criteria.length, 12);
    assert.equal(next.audit.human_approval, null);
    assert.ok(next.audit.authored_questions.every((q) => q.human_reviewer === null));
    await assert.rejects(loadApprovedUnit(baseRoot, ids[i], '0.1.2', { at }), /não aprovada/);
  }
  const changed = currentClone();
  changed.base.content.cards[0].back += ' Alteração posterior.';
  seal(changed);
  assert.throws(() => validateBundle(changed, { at }), /Revisão assistida não corresponde/);
  const falseHuman = currentClone();
  falseHuman.audit.assisted_review.kind = 'human';
  assert.throws(() => validateBundle(falseHuman, { at }), /autoria\/delegação/);
  const missing = currentClone();
  missing.audit.assisted_review.premium_criteria.pop();
  assert.throws(() => validateBundle(missing, { at }), /12 critérios/);
});

test('cadeia valida também a revisão intermediária e recusa ciclos antes de carregar o próprio pacote', async (t) => {
  const temp = await mkdtemp(resolve(tmpdir(), 'v6-canonical-lineage-'));
  t.after(() => rm(temp, { recursive: true, force: true }));
  await cp(resolve(baseRoot, 'manifest.json'), resolve(temp, 'manifest.json'));
  await cp(resolve(baseRoot, 'cartografia'), resolve(temp, 'cartografia'), { recursive: true });
  const parent = structuredClone(revised[0]);
  parent.provenance.revision.changes.pop();
  await writeFile(
    resolve(temp, 'cartografia', ids[0], '0.1.1', 'provenance.json'),
    JSON.stringify(parent.provenance),
  );
  const child = currentClone();
  child.provenance.revision.parent_bundle_sha256 = sha(parent);
  const childPath = resolve(temp, 'cartografia', ids[0], '0.1.2', 'provenance.json');
  await writeFile(childPath, JSON.stringify(child.provenance));
  await assert.rejects(validateLot(temp, { at }), /não declarada/);
  child.provenance.revision.from_version = '0.1.2';
  await writeFile(childPath, JSON.stringify(child.provenance));
  await assert.rejects(validateLot(temp, { at }), /Ciclo na cadeia/);
});
