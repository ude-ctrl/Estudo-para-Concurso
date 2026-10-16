import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
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
