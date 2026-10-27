import fs from 'node:fs';
import {parseFragment} from '/workspace/Estudo-para-Concurso/node_modules/parse5/dist/index.js';
const dir='/workspace/work/auditoria-integral';
const plain=s=>{if(typeof s!=='string')return JSON.stringify(s);if(!/<[a-z][^>]*>/i.test(s))return s;const walk=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(walk).join(['td','th','tr','p','div','li','br'].includes(n.nodeName)?' | ':'');return walk(parseFragment(s)).replace(/\s+/g,' ').trim();};
const ledger=[];
for(const u of ['cartografia-fundamentos','cartografia-representacao','geotecnologias']){
 const path=`base-conhecimento/cartografia/${u}/1.0.0/content.json`;
 const d=JSON.parse(fs.readFileSync('/workspace/Estudo-para-Concurso/'+path));const lines=[];
 const add=(id,kind,s)=>{lines.push(`[${id}] ${kind} ${s}`);ledger.push({id,unit:u,source:path,kind,reviewed:false});};
 const c=d.content;add(u,'UNIDADE',JSON.stringify(c.unit));
 for(const m of c.missions){add(m.id,'MISSÃO',m.title+' | '+m.goal);for(const s of m.sections)add(s.id,'TEORIA',s.title+' | GANCHO '+s.hook+' | '+plain(s.html));for(const r of m.recalls)add(r.id,'RECALL',r.prompt+' => '+r.model+' | PONTOS '+r.points.join(' / '));}
 for(const x of c.concepts)add(x.id,'CONCEITO',JSON.stringify(x));
 for(const q of c.questions)add(q.id,'QUESTÃO',q.pool+' | '+q.prompt+' | '+q.options.map((o,i)=>'ABCDE'[i]+(o.id===q.correct?'*':'')+': '+o.text+' [feedback: '+o.feedback+']').join(' | ')+' | EXPL '+q.explanation);
 for(const f of c.cards)add(f.id,'FLASHCARD',f.front+' => '+f.back+' | VARIANTES '+JSON.stringify(f.variants));
 for(const g of c.game)add(g.id,'GAME',(g.truth?'V':'F')+' | '+g.statement+' => '+g.justification+' | VARIANTES '+JSON.stringify(g.variants));
 for(const w of c.writing)add(w.id,'DISCURSIVA',w.prompt+' => '+w.model+' | RUBRICA '+w.rubric.join(' / '));
 for(const s of c.supplements)add(s.id,'SUPLEMENTO',plain(s.html));
 for(const [k,v]of Object.entries(d.support)){for(const [i,s]of v.entries())add(s.id??k+'-'+i,'SUPORTE',JSON.stringify({...s,svg:s.svg?plain(s.svg):undefined}));}
 fs.writeFileSync(`${dir}/canonical-${u}.txt`,lines.join('\n')+'\n');console.log(u,lines.length,lines.join('\n').length);
}
fs.writeFileSync(dir+'/canonical-ledger.json',JSON.stringify(ledger,null,2));
