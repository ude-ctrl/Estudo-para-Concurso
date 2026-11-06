import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { parse } from 'parse5';
import { extract, validateBanks, walk, root } from './import-content.mjs';
const source = 'MissaoAprovacaoGeo/SEDUC_PA_Tema_04_Climatologia_MATRIZ_OFICIAL_V2_6.html';
const raw = await readFile(root + '/' + source, 'utf8');
const extracted = extract(raw, source);
const { banks: b } = extracted;
validateBanks(b, source);
const sha = (s) => createHash('sha256').update(typeof s === 'string' ? s : JSON.stringify(s)).digest('hex');
const names = ['leitura-de-questoes','tempo-clima-normais','energia-temperatura','circulacao-atmosferica','umidade-precipitacao','massas-frentes','zcit-zcas','enos-atlantico','climogramas-classificacoes','climas-brasil','amazonia-para','clima-urbano','mudancas-extremos'];
const rows = [];
function add(kind, legacy_id, value, mission = null) {
  rows.push({ kind, legacy_source: source, legacy_id, proposed_id: 'v6-clima-' + legacy_id.replace(/[^a-zA-Z0-9]+/g, '-').replace(/-$/, ''), proposed_mission: mission, sha256: sha(value), original: value });
}
b.B.forEach((s,i) => {
  const mission = 'clima-' + names[i];
  add('theory', `B[${i}]`, { t:s.t, hook:s.hook, h:s.h }, mission);
  s.qs.forEach((q,j) => add('question', `b_${i}_${j}`, q, mission));
  if(s.r) add('recall', `B[${i}].recall`, {prompt:s.r,answer:s.ra}, mission);
});
b.PRE.forEach((q,i) => add('question', `pre_${i}`,q));
b.CH.forEach((q,i) => add('question', `c_${i}`,q));
b.C.forEach((c,i) => add('card', `C[${i}]`,c));
b.G.forEach((g,i) => add('game', `G[${i}]`,g));
for (const [id,value] of Object.entries(extracted.supplements)) add('supplement',id,value);
for (const [id,value] of Object.entries(extracted.staticContent)) add('static',id,value);
const ids=[], media=[], links=[];
walk(parse(raw), node => {
  const attrs=Object.fromEntries((node.attrs||[]).map(a=>[a.name,a.value]));
  if(attrs.id) ids.push(attrs.id);
  if(['img','svg','canvas','iframe'].includes(node.tagName)) media.push({tag:node.tagName,...attrs});
  if(attrs.href || attrs.src) links.push({tag:node.tagName,url:attrs.href||attrs.src});
});
const duplicates = values => [...new Set(values.filter((v,i)=>values.indexOf(v)!==i))];
const questions=rows.filter(r=>r.kind==='question');
assert.equal(rows.length,215);assert.equal(new Set(rows.map(r=>r.proposed_id)).size,rows.length);
for(const {original:q} of questions){assert.ok(q.c>=0&&q.c<q.o.length);assert.equal(q.ex.length,q.o.length);}
const report = {
  status:'MAPA_PREPARATORIO_NAO_CANONICO', unit_id:'climatologia', module_id:'fisica',
  source, source_sha256:sha(raw),
  storage:{current:b.K,previous:b.OLDK,previous_is_placeholder:b.OLDK.startsWith('__sem_legado')},
  counts:Object.fromEntries([...new Set(rows.map(r=>r.kind))].map(k=>[k,rows.filter(r=>r.kind===k).length])),
  question_options:questions.reduce((o,{original:q})=>(o[q.o.length]=(o[q.o.length]||0)+1,o),{}),
  game_truth:{true:b.G.filter(g=>g.v).length,false:b.G.filter(g=>!g.v).length},
  duplicate_static_ids:duplicates(ids),
  exact_duplicates:{questions:duplicates(questions.map(r=>r.original.p.trim().toLowerCase())),game:duplicates(b.G.map(g=>g.t.trim().toLowerCase()))},
  media,links,functions:[...raw.matchAll(/function\s+(\w+)\s*\(/g)].map(m=>m[1]),
  missions:b.B.map((s,i)=>({legacy_id:`B[${i}]`,proposed_id:'clima-'+names[i],title:s.t,questions:s.qs.length,recall:!!s.r})),
  records:rows,
  limits:['IDs são proposta; vínculos sem missão exigem classificação editorial.', 'Pós-teste reutiliza PRE; não adiciona questões únicas.', 'Links externos não foram consultados nesta verificação.', 'Não representa aprovação editorial nem integração V6.']
};
const output=root+'/docs/v6-climatologia/inventario-paridade.json';
const serialized=JSON.stringify(report,null,2)+'\n';
if(process.argv.includes('--check')) assert.equal(await readFile(output,'utf8'),serialized);
else await writeFile(output,serialized);
console.log(JSON.stringify({records:rows.length,counts:report.counts,options:report.question_options,storage:report.storage,media:media.length,duplicateIds:report.duplicate_static_ids,duplicates:report.exact_duplicates}));
