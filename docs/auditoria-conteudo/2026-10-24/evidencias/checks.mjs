import {readFileSync,writeFileSync} from 'node:fs';
import {parseFragment} from '/workspace/Estudo-para-Concurso/node_modules/parse5/dist/index.js';
const root='/workspace/Estudo-para-Concurso',out='/workspace/work/auditoria-integral';
const catalog=JSON.parse(readFileSync(root+'/public/content/catalog.json','utf8'));
const plain=s=>{const walk=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(walk).join('');return walk(parseFragment(String(s)))};
const norm=s=>String(s).normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim();
const result={materials:[],invalidKeys:[],duplicateOptions:[],damagedText:[],suspectGameFeedback:[],shortCards:[],duplicates:[]};
const grouped=new Map();
for(const l of catalog.lessons){
 const {banks:b}=JSON.parse(readFileSync(root+'/public/'+l.contentUrl,'utf8'));
 const qs=[...b.PRE.map((q,i)=>({q,id:'pre_'+i})),...b.B.flatMap((v,i)=>v.qs.map((q,j)=>({q,id:`b_${i}_${j}`}))),...b.CH.map((q,i)=>({q,id:'c_'+i}))];
 let counts={A:0,B:0,C:0,D:0,E:0};
 const add=(kind,id,text)=>{const k=kind+':'+norm(text);if(!grouped.has(k))grouped.set(k,[]);grouped.get(k).push({material:l.id,id,text})};
 for(const {q,id} of qs){
  counts['ABCDE'[q.c]]++;
  if(!Number.isInteger(q.c)||q.c<0||q.c>=q.o.length)result.invalidKeys.push({material:l.id,id});
  if(new Set(q.o.map(norm)).size<q.o.length)result.duplicateOptions.push({material:l.id,id,options:q.o});
  for(const [field,text] of [['prompt',q.p],...q.o.map((s,i)=>['option'+i,s])])if(/[<>]/.test(text)&&!/<\/(?:b|strong|i|em|span|p|sup|sub)>/i.test(text)&&plain(text)!==text)result.damagedText.push({material:l.id,id,field,raw:text,rendered:plain(text)});
  add('question',id,q.p);
 }
 b.C.forEach((c,i)=>{if(c[2].trim().length<15)result.shortCards.push({material:l.id,id:'C_'+i,front:c[1],back:c[2]});add('card','C_'+i,c[1])});
 b.G.forEach((g,i)=>{if(g.v&&/^(Não\.?|Falso\.?|É o contrário\.?)$/i.test(g.x.trim())||!g.v&&/^Sim\.?$/i.test(g.x.trim()))result.suspectGameFeedback.push({material:l.id,id:'G_'+i,statement:g.t,truth:g.v,feedback:g.x});add('game','G_'+i,g.t)});
 result.materials.push({id:l.id,title:l.title,counts:l.counts,answers:counts,stageAllA:b.B.every(x=>x.qs.every(q=>q.c===0)),noOptionFeedback:qs.filter(x=>!b.X[x.id]?.length).length,generalExplanation:qs.filter(x=>!!x.q.e).length});
}
result.duplicates=[...grouped.entries()].filter(([k,v])=>v.length>1).map(([k,items])=>({kind:k.split(':')[0],items}));
writeFileSync(out+'/checks.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({invalidKeys:result.invalidKeys.length,duplicateOptionQuestions:result.duplicateOptions.length,damagedText:result.damagedText,gameFeedbackCandidates:result.suspectGameFeedback.length,shortCards:result.shortCards.length,duplicateGroups:result.duplicates.length,allA:result.materials.filter(x=>x.stageAllA).map(x=>x.title),answers:result.materials.reduce((a,x)=>{for(const k in x.answers)a[k]=(a[k]||0)+x.answers[k];return a},{})},null,2));
