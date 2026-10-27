import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { parseFragment } from '/workspace/Estudo-para-Concurso/node_modules/parse5/dist/index.js';
const root='/workspace/Estudo-para-Concurso';
const out='/workspace/work/auditoria-integral';
const read=p=>JSON.parse(readFileSync(root+'/'+p,'utf8'));
const sha=s=>createHash('sha256').update(s).digest('hex');
function plain(s='') {
 if(!/<\/(?:p|b|strong|em|i|span|div|table|tr|td|th|ol|ul|li|details|summary|h[1-6])\s*>/i.test(String(s))) return String(s).replace(/\s+/g,' ').trim();
 const walk=n=>n.nodeName==='#text'?n.value:['script','style'].includes(n.nodeName)?'':(n.childNodes??[]).map(walk).join(['td','th','tr','p','div','li','br'].includes(n.nodeName)?' | ':'');
 return walk(parseFragment(String(s))).replace(/\s+/g,' ').trim();
}
const catalog=read('public/content/catalog.json'), ledger=[],metrics=[];
for(const l of catalog.lessons){
 const d=read('public/'+l.contentUrl),b=d.banks,source=readFileSync(root+'/'+l.sourcePath,'utf8');
 const rows=[], counts={A:0,B:0,C:0,D:0,E:0},issues=[];
 const add=(id,kind,text,data={})=>{rows.push(`[${id}] ${kind} ${text}`);ledger.push({id:l.id+':'+id,material:l.id,title:l.title,source:l.sourcePath,sourceHash:sha(source),kind,reviewed:false,...data});};
 for(const [k,h] of Object.entries(d.staticContent))add('static.'+k,'INTRO/FONTES',plain(h));
 function q(id,v){
   counts['ABCDE'[v.c]]=(counts['ABCDE'[v.c]]??0)+1;
   if(!Number.isInteger(v.c)||!v.o?.[v.c])issues.push({id,problem:'invalid_key'});
   const feedback=b.X[id];
   if(feedback?.length!==v.o.length)issues.push({id,problem:'feedback_count',actual:feedback?.length});
   const short=(feedback??[]).map((x,i)=>({i,text:plain(x)})).filter(x=>x.text.length<35);
   if(short.length)issues.push({id,problem:'short_feedback',items:short});
   add(id,'QUESTÃO',`${plain(v.p)} | ${v.o.map((o,i)=>`${'ABCDE'[i]}${i===v.c?'*':''}: ${plain(o)}`).join(' | ')} | EXPL: ${plain(v.e??'')} | FEEDBACK: ${(feedback??[]).map((x,i)=>'ABCDE'[i]+': '+plain(x)).join(' | ')}`,{correct:v.c,options:v.o.length,feedback:feedback?.length??0});
 }
 b.PRE.forEach((v,i)=>q('pre_'+i,v));
 b.B.forEach((v,i)=>{add('B_'+i,'TEORIA',`${v.t} | GANCHO: ${plain(v.hook)} | ${plain(v.h)}`); if(v.r)add('B_'+i+'_recall','RECALL',`${plain(v.r)} | RESPOSTA: ${plain(v.ra)}`);v.qs.forEach((x,j)=>q(`b_${i}_${j}`,x));});
 b.CH.forEach((v,i)=>q('c_'+i,v));
 b.C.forEach((v,i)=>add('C_'+i,'FLASHCARD',`${v[0]} | ${plain(v[1])} => ${plain(v[2])}`));
 b.G.forEach((v,i)=>{add('G_'+i,'GAME',`${v.v?'V':'F'} | ${v.a} | ${plain(v.t)} => ${plain(v.x)}`);if(typeof v.v!=='boolean'||!v.x)issues.push({id:'G_'+i,problem:'game_missing_truth_or_justification'});});
 for(const [k,h]of Object.entries(d.supplements))add(k,'SUPLEMENTO',plain(h));
 const name=String(l.number).padStart(2,'0')+'-'+l.id;
 writeFileSync(out+'/'+name+'.txt',rows.join('\n')+'\n');
 const m={id:l.id,title:l.title,number:l.number,file:name+'.txt',characters:rows.join('\n').length,records:rows.length,counts:l.counts,answers:counts,true:b.G.filter(g=>g.v).length,false:b.G.filter(g=>!g.v).length,shortFeedback:issues.filter(x=>x.problem==='short_feedback').length,issues};metrics.push(m);
}
writeFileSync(out+'/ledger.json',JSON.stringify(ledger,null,2));
writeFileSync(out+'/metrics.json',JSON.stringify(metrics,null,2));
writeFileSync(out+'/coverage.json',JSON.stringify({commit:'a40a3c33c7a5b7f20750316fe694331c1a214b61',materials:metrics.map(({id,title,file,records})=>({id,title,file,records,manualRead:false})),canonical:[],findings:[]},null,2));
console.log(JSON.stringify(metrics.map(({id,number,title,characters,records,answers,shortFeedback,true:t,false:f})=>({id,number,title,characters,records,answers,shortFeedback,V:t,F:f})),null,2));
