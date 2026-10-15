import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { parseFragment, serialize } from 'parse5';
import { extract, root, walk } from './import-content.mjs';
import {
  units,
  missions as templates,
  stageMap,
  preMap,
  bossMap,
  routeTopic,
  cardAliases,
  gameAliases,
} from './v6-catalog.mjs';
import { concepts, conceptFor } from './v6-concepts.mjs';
import { authored } from './v6-authored.mjs';
const sha = (x) =>
  createHash('sha256')
    .update(typeof x === 'string' ? x : JSON.stringify(x))
    .digest('hex');
// Mathematical signs and punctuation are semantic: +46,6 and −46,6 must never collide.
const norm = (x) =>
  x
    .normalize('NFKC')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[−–]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
const text = (n) => (n.nodeName === '#text' ? n.value : (n.childNodes || []).map(text).join(''));
function htmlSafe(html, prefix) {
  const f = parseFragment(html);
  const remove = new Set(['script', 'style', 'iframe', 'textarea', 'input', 'button']);
  function clean(n) {
    n.childNodes = (n.childNodes || []).filter((x) => !remove.has(x.tagName));
    for (const c of n.childNodes) {
      if (c.attrs)
        c.attrs = c.attrs
          .filter(
            (a) =>
              !/^on/i.test(a.name) &&
              !['srcdoc', 'tabindex'].includes(a.name) &&
              !/^\s*(javascript|data:text\/html):/i.test(a.value),
          )
          .map((a) => {
            if (a.name === 'id') return { ...a, value: prefix + '-' + a.value };
            if (a.value.includes('url(#'))
              return { ...a, value: a.value.replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`) };
            if (a.name === 'href' && a.value.startsWith('#'))
              return { ...a, value: '#' + prefix + '-' + a.value.slice(1) };
            return a;
          });
      clean(c);
    }
  }
  clean(f);
  return serialize(f);
}
const files = {
  T02: 'SEDUC_PA_Tema_02_Cartografia_I_MATRIZ_OFICIAL_V2_6.html',
  T03A: 'SEDUC_PA_Tema_03_Cartografia_II_MATRIZ_OFICIAL_V2_6_AUDITADA.html',
  T17: 'SEDUC_PA_Tema_17_Cartografia_Geotecnologias_e_Representacao_do_Espaco.html',
};
export async function buildV6() {
  // Published identities are frozen independently from editorial wording and feedback.
  const stableIds = JSON.parse(await readFile(root + '/scripts/v6-ids.json', 'utf8'));
  const stableId = (code, legacyId) => {
    const id = stableIds[code + ':' + legacyId];
    if (!id)
      throw Error('Recurso sem identidade aprovada no registro V6: ' + code + ':' + legacyId);
    return id;
  };
  const missions = structuredClone(templates),
    questions = [],
    cards = [],
    game = [],
    writing = [],
    supplements = [],
    archive = [],
    sources = [],
    references = [];
  const findMission = (id) => {
    const m = missions.find((m) => m.id === id);
    if (!m) throw Error('Missão desconhecida ' + id);
    return m;
  };
  const qKeys = new Map(),
    cKeys = new Map(),
    gKeys = new Map(),
    cRefs = new Map(),
    gRefs = new Map(),
    suppKeys = new Map(),
    recallKeys = new Map();
  const record = (code, path, kind, id, payload, mission, canonical) => {
    const ref = { legacy_source: path, legacy_id: id, hash: sha(payload) };
    archive.push({ id: canonical, kind, mission, refs: [ref], original: payload });
    return ref;
  };
  function addQ(code, path, id, q, mission, role, X) {
    const key = sha([norm(q.p), q.o.map(norm).sort(), norm(q.o[q.c])]);
    let item = qKeys.get(key);
    const full = Object.assign({}, q, { dormantFeedback: X?.[id] || [] });
    if (!item) {
      const cid = stableId(code, id),
        concept = conceptFor(mission, q.p + ' ' + q.e);
      const c = concepts.find((c) => c.id === concept);
      item = {
        id: cid,
        mission,
        unit: findMission(mission).unit,
        concept,
        prompt: q.p,
        options: q.o.map((o, i) => ({
          id: cid + '-o' + sha(norm(o)).slice(0, 10),
          text: o,
          feedback: (q.ex?.[i] || X?.[id]?.[i] || '') + (i === q.c ? '' : ' ' + c.confusion),
          errorType: c.errorType,
        })),
        correct: cid + '-o' + sha(norm(q.o[q.c])).slice(0, 10),
        explanation: q.e,
        pool: 'fixacao',
        roles: [],
        difficulty: 1,
        cognitive: 2,
        scope: code === 'T17' ? 'base-com-aplicacao-regional' : 'base',
        origin: 'Autoral legado; sem atribuição a prova oficial',
        status: 'legacy-preserved',
        reviewNotes:
          'KEEP_FIXATION: gabarito preservado; feedback ampliado pelo registro de conceitos. Revisão humana V6 pendente.',
        refs: [],
        originalFeedback: [],
      };
      qKeys.set(key, item);
      questions.push(item);
    }
    if (code === 'T02' && id === 'b_6_0') {
      item.qualityFlags = ['numeric-duplicate-distractor'];
      item.reviewNotes +=
        ' Dois distratores históricos, −42,3° e −42,30°, são numericamente equivalentes e incorretos; gabarito −42,5° preservado. Item limitado à Fixação, revisão editorial humana pendente.';
    }
    if (!item.roles.includes(role)) item.roles.push(role);
    if (q.e && !item.originalFeedback.includes(q.e)) item.originalFeedback.push(q.e);
    item.refs.push(record(code, path, 'question', id, full, mission, item.id));
  }
  function addC(code, path, i, c) {
    const refKey = code + ':C_' + i,
      alias = cardAliases[refKey];
    let mission = routeTopic(c[0], c[1] + ' ' + c[2]);
    if (code === 'T03A' && i === 25) mission = 'resolucoes-indices-classificacao';
    if (code === 'T02' && c[0] === 'Rede') mission = 'coordenadas-gms';
    const key = sha([norm(c[1]), norm(c[2])]);
    let item =
      (alias && cRefs.get(alias)) ||
      cKeys.get(key) ||
      cards.find((c) => c.id === stableId(code, 'C_' + i));
    if (!item) {
      const id = stableId(code, 'C_' + i);
      item = {
        id,
        mission,
        unit: findMission(mission).unit,
        concept: conceptFor(mission, c.join(' ')),
        front: c[1],
        back: c[2],
        variants: [],
        refs: [],
      };
      cards.push(item);
      cKeys.set(key, item);
    } else if (c[1] !== item.front || c[2] !== item.back)
      item.variants.push({ front: c[1], back: c[2] });
    item.refs.push(record(code, path, 'card', 'C_' + i, c, mission, item.id));
    cRefs.set(refKey, item);
  }
  function addG(code, path, i, g) {
    let mission = routeTopic(g.a, g.t + ' ' + g.x);
    if (code === 'T03A' && [42, 43].includes(i)) mission = 'resolucoes-indices-classificacao';
    if (code === 'T03A' && [92, 93].includes(i)) mission = 'sig-modelos-operacoes';
    if (code === 'T03A' && i === 94) mission = 'sensores-espectro';
    if (code === 'T03A' && [98, 99].includes(i)) mission = 'projecoes-propriedades';
    if (code === 'T17' && [97, 98].includes(i)) mission = 'resolucoes-indices-classificacao';
    const key = sha([norm(g.t), g.v]);
    let item =
      gRefs.get(gameAliases[code + ':G_' + i]) ||
      gKeys.get(key) ||
      game.find((g) => g.id === stableId(code, 'G_' + i));
    if (!item) {
      item = {
        id: stableId(code, 'G_' + i),
        mission,
        unit: findMission(mission).unit,
        concept: conceptFor(mission, g.t + ' ' + g.x),
        statement: g.t,
        truth: g.v,
        justification: g.x,
        variants: [],
        refs: [],
      };
      game.push(item);
      gKeys.set(key, item);
    } else if (item.justification !== g.x || item.statement !== g.t)
      item.variants.push({ statement: g.t, justification: g.x });
    if (item.truth !== g.v) throw Error('Alias V/F com gabarito incompatível');
    item.refs.push(record(code, path, 'game', 'G_' + i, g, mission, item.id));
    gRefs.set(code + ':G_' + i, item);
  }
  for (const [code, file] of Object.entries(files)) {
    const path = 'MissaoAprovacaoGeo/' + file,
      raw = await readFile(root + '/' + path, 'utf8'),
      data = extract(raw, path),
      b = data.banks;
    sources.push({
      code,
      path,
      hash: sha(raw),
      key: b.K,
      previous: b.OLDK.startsWith('__') ? null : b.OLDK,
      counts: {
        stages: b.B.length,
        questions: b.PRE.length + b.CH.length + b.B.reduce((n, s) => n + s.qs.length, 0),
        cards: b.C.length,
        game: b.G.length,
        recalls: b.B.filter((s) => s.r).length,
      },
    });
    for (const [i, s] of b.B.entries()) {
      const mission = stageMap[code][i],
        m = findMission(mission),
        id = `v6-theory-${code.toLowerCase()}-${i}`;
      const ref = record(
        code,
        path,
        'theory',
        `B_${i}`,
        { t: s.t, hook: s.hook, h: s.h },
        mission,
        id,
      );
      m.sections.push({
        id,
        title: s.t,
        hook: s.hook,
        html: htmlSafe(s.h, id),
        primary: i !== 0 && (code !== 'T17' || [1, 7, 8, 11, 12, 15, 16, 17].includes(i)),
        refs: [ref],
      });
      s.qs.forEach((q, j) => {
        const guideDestinations = {
          T02: ['escalas-e-medidas', 'coordenadas-gms'],
          T03A: ['projecoes-propriedades', 'semiologia-tematica'],
          T17: ['sig-modelos-operacoes', 'projecoes-propriedades'],
        };
        addQ(
          code,
          path,
          `b_${i}_${j}`,
          q,
          i === 0 ? guideDestinations[code][j] : mission,
          'fixacao',
          b.X,
        );
      });
      if (s.r) {
        const key = sha([norm(s.r), norm(s.ra)]);
        let r =
          recallKeys.get(key) ||
          missions.flatMap((m) => m.recalls).find((r) => r.id === stableId(code, `B_${i}_recall`));
        if (!r) {
          r = {
            id: stableId(code, `B_${i}_recall`),
            mission,
            concept: conceptFor(mission, s.r + ' ' + s.ra),
            prompt: s.r,
            model: s.ra,
            points: [
              s.ra,
              concepts.find((c) => c.id === conceptFor(mission, s.r + ' ' + s.ra)).confusion,
            ],
            refs: [],
          };
          m.recalls.push(r);
          recallKeys.set(key, r);
        }
        r.refs.push(
          record(code, path, 'recall', `B_${i}_recall`, { r: s.r, ra: s.ra }, mission, r.id),
        );
      }
    }
    b.PRE.forEach((q, i) => addQ(code, path, 'pre_' + i, q, preMap[code][i], 'diagnostico', b.X));
    b.CH.forEach((q, i) => addQ(code, path, 'c_' + i, q, bossMap[code][i], 'chefao', b.X));
    b.C.forEach((c, i) => addC(code, path, i, c));
    b.G.forEach((g, i) => addG(code, path, i, g));
    for (const [kind, h] of Object.entries(data.supplements)) {
      if (kind === 'discBox') {
        const f = parseFragment(h);
        let index = 0;
        for (const detail of f.childNodes.filter((n) => n.tagName === 'details')) {
          const ps = [],
            rub = [];
          let model = '';
          walk(detail, (n) => {
            if (n.tagName === 'p') ps.push(text(n));
            if (
              n.tagName === 'span' &&
              n.parentNode?.attrs?.some((a) => a.name === 'class' && a.value === 'rub')
            )
              rub.push(text(n).replace('□', '').trim());
          });
          const prompt = ps[0].replace(/^Comando:\s*/, ''),
            key = sha(norm(prompt));
          let item = writing.find((w) => w.id === stableId(code, 'd' + (index + 1)));
          const mission =
            code === 'T17'
              ? index === 0
                ? 'gnss-referenciais'
                : 'amazonia-monitoramento'
              : index === 0
                ? 'escalas-e-medidas'
                : 'fusos-utc-data';
          model = ps.slice(1).join('\n');
          if (!item) {
            item = {
              id: stableId(code, 'd' + (index + 1)),
              mission,
              unit: findMission(mission).unit,
              prompt,
              model,
              rubric: rub,
              refs: [],
            };
            writing.push(item);
          }
          item.refs.push(
            record(
              code,
              path,
              'writing',
              'd' + (index + 1),
              { prompt, model, rubric: rub },
              mission,
              item.id,
            ),
          );
          index++;
        }
      }
      const key = sha(h),
        mission = code === 'T17' ? 'amazonia-monitoramento' : 'escalas-e-medidas';
      let item = suppKeys.get(key) || supplements.find((s) => s.id === stableId(code, kind));
      if (!item) {
        item = {
          id: stableId(code, kind),
          kind,
          mission,
          html: htmlSafe(h, 'supp-' + key.slice(0, 12)),
          refs: [],
        };
        supplements.push(item);
        suppKeys.set(key, item);
      }
      item.refs.push(record(code, path, 'supplement', kind, h, mission, item.id));
    }
    references.push({
      source: path,
      html: htmlSafe(data.staticContent.fontes || '', code + '-references'),
    });
    const f = parseFragment(data.staticContent['tab-study'] || '');
    const header = f.childNodes.find((n) => n.tagName === 'header');
    if (header) {
      const original = serialize(header);
      archive.push({
        id: 'v6-context-' + code,
        kind: 'context',
        mission: stageMap[code][0],
        refs: [{ legacy_source: path, legacy_id: 'header', hash: sha(original) }],
        original,
      });
    }
  }
  // Only three proven unique valid pedagogical resources from the secondary source.
  const secondary = 'MissaoAprovacaoGeo/SEDUC_PA_Tema_03_Cartografia_II_MATRIZ_OFICIAL_V2_6.html';
  const secondaryRaw = await readFile(root + '/' + secondary, 'utf8');
  const sb = extract(secondaryRaw, secondary).banks;
  addC('T03', secondary, 49, sb.C[49]);
  addG('T03', secondary, 96, sb.G[96]);
  addG('T03', secondary, 87, sb.G[87]);
  for (const [i, q] of authored.entries()) {
    const desired = i % 5,
      answers = q.answers.map(([text, feedback], j) => ({
        id: q.id + (j === 0 ? '-correct' : '-d' + j),
        text,
        feedback,
        errorType: concepts.find((c) => c.id === q.concept).errorType,
      }));
    const correct = answers.shift();
    answers.splice(desired, 0, correct);
    questions.push({
      ...q,
      unit: findMission(q.mission).unit,
      options: answers,
      correct: correct.id,
      explanation: q.answers[0][1],
      roles: [q.pool],
      scope: ['amazonia-monitoramento'].includes(q.mission) ? 'regional-amazonia-legal' : 'base',
      origin: 'Autoral V6 — treino; não reproduz questão oficial FGV',
      status: 'human-review-pending',
      reviewNotes:
        'Revisão técnica e testes automáticos; aguarda aprovação humana para pool oficial.',
      refs: [],
      originalFeedback: [],
      answers: undefined,
    });
  }
  for (const m of missions) {
    m.conceptIds = concepts.filter((c) => c.mission === m.id).map((c) => c.id);
    if (m.id === 'linguagem-cartografica')
      m.sections.sort(
        (a, b) => Number(b.id === 'v6-theory-t17-1') - Number(a.id === 'v6-theory-t17-1'),
      );
  }
  cards.push({
    id: 'v6-fc-area-escala',
    mission: 'escalas-e-medidas',
    unit: 'cartografia-fundamentos',
    concept: 'area',
    front: 'Como a razão de escala transforma áreas?',
    back: 'Numa escala linear 1:N, a razão entre áreas é 1:N². Converta a relação linear para a unidade real e eleve-a ao quadrado: 4 cm² em 1:50.000 = 4 × (0,5 km)² = 1 km².',
    variants: [],
    refs: [],
  });
  writing.push(
    {
      id: 'v6-disc-representacao-finalidade',
      unit: 'cartografia-representacao',
      mission: 'semiologia-tematica',
      prompt:
        'Uma turma compara desigualdades de acesso a equipamentos públicos entre bairros de áreas e populações diferentes. Proponha uma representação cartográfica, diferencie valores absolutos e relativos e explique como escala, legenda e classes condicionam a leitura. Indique uma ação de ensino que permita verificar a compreensão dos estudantes.',
      model:
        'Comece definindo o indicador: total de equipamentos informa oferta absoluta, enquanto uma razão por população atende a outra pergunta. Um mapa de símbolos proporcionais pode representar totais; um coroplético com indicador relativo, base populacional e período explícitos permite comparações entre bairros. A escolha deve responder ao objetivo, sem tratar grandes polígonos como prova de maior necessidade. A escala precisa sustentar o detalhamento da análise; a legenda informa medida e intervalos, que influenciam o padrão percebido. Na aula, os estudantes podem construir e comparar duas representações do mesmo conjunto, justificar a diferença e identificar limitações, com tabelas e descrições acessíveis.',
      rubric: [
        'Indicador e normalização',
        'Simbologia coerente',
        'Escala, classes e limites',
        'Ação escolar e evidência de aprendizagem',
      ],
      refs: [],
    },
    {
      id: 'v6-disc-representacao-relevo',
      unit: 'cartografia-representacao',
      mission: 'graficos-perfis-relevo',
      prompt:
        'Planeje uma explicação para uma turma sobre curvas de nível e perfil topográfico. Diferencie equidistância e espaçamento horizontal, apresente um cálculo de declividade e explique por que o exagero vertical pode induzir uma leitura visual equivocada.',
      model:
        'Curvas de nível unem pontos de igual altitude. Equidistância é o intervalo vertical constante entre curvas consecutivas; seu espaçamento no mapa depende da escala e da inclinação do terreno. Onde as curvas se aproximam, um mesmo desnível ocorre em menor distância horizontal. Um perfil é uma seção altimétrica ao longo de um traçado. Para 40 m de desnível em 200 m horizontais, a declividade média é 40/200×100=20%, que não equivale a 20 graus. Se as escalas vertical e horizontal diferem, o perfil apresenta exagero vertical; o desenho pode parecer muito mais íngreme sem alterar a declividade real. A turma pode traçar e comparar perfis com dois exageros e explicar o que muda na aparência e o que permanece nas medidas.',
      rubric: [
        'Curvas e equidistância',
        'Perfil e espaçamento',
        'Cálculo e unidades',
        'Exagero e ação de ensino',
      ],
      refs: [],
    },
  );
  const obj = {
    version: '6.0.0-piloto.1',
    units,
    missions,
    concepts,
    questions,
    cards,
    game,
    writing,
    supplements,
    references,
    archive,
    sources,
  };
  const parity = {
    version: obj.version,
    baseline: '2761cf4b8a6f828b55d4d405b92f74bb4025f26d',
    sources,
    secondary: { path: secondary, hash: sha(secondaryRaw), items: ['C_49', 'G_96', 'G_87'] },
    counts: {
      stages: archive.filter((a) => a.kind === 'theory').length,
      questions: questions.length,
      legacyQuestions: archive.filter((a) => a.kind === 'question').length,
      authored: authored.length,
      cards: cards.length,
      legacyCards: archive.filter((a) => a.kind === 'card').length,
      game: game.length,
      legacyGame: archive.filter((a) => a.kind === 'game').length,
      recalls: archive.filter((a) => a.kind === 'recall').length,
      canonicalRecalls: missions.reduce((n, m) => n + m.recalls.length, 0),
      writing: writing.length,
    },
    units: units.map((u) => ({
      id: u.id,
      missions: missions.filter((m) => m.unit === u.id).length,
      questions: questions.filter((q) => q.unit === u.id).length,
      cards: cards.filter((c) => c.unit === u.id).length,
      game: game.filter((g) => g.unit === u.id).length,
    })),
    records: archive.map((a) => ({
      canonical_id: a.id,
      kind: a.kind,
      mission: a.mission,
      ...a.refs[0],
      decision:
        a.kind === 'question'
          ? 'KEEP_FIXATION'
          : a.kind === 'card' && cards.find((c) => c.id === a.id)?.refs.length > 1
            ? 'MERGE_ALIASES'
            : 'PRESERVE',
    })),
  };
  return { content: obj, parity };
}
if (process.argv[1]?.endsWith('build-v6.mjs')) {
  const { content, parity } = await buildV6();
  await mkdir(root + '/public/v6', { recursive: true });
  for (const [path, value] of [
    ['public/v6/cartografia.json', content],
    ['MissaoAprovacaoGeo/V6_FASE14_PARIDADE.json', parity],
  ]) {
    const serialized = JSON.stringify(value, null, 2) + '\n';
    if (process.argv.includes('--check')) {
      if ((await readFile(root + '/' + path, 'utf8')) !== serialized)
        throw Error('Dados V6 desatualizados: ' + path);
    } else await writeFile(root + '/' + path, serialized);
  }
  console.log(JSON.stringify(parity.counts));
}
