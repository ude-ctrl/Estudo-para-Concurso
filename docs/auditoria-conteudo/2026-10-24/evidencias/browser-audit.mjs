import {chromium} from '/workspace/Estudo-para-Concurso/node_modules/@playwright/test/index.mjs';
import {readFileSync,writeFileSync} from 'node:fs';
const root='/workspace/Estudo-para-Concurso';
const catalog=JSON.parse(readFileSync(root+'/public/content/catalog.json','utf8'));
const out='/workspace/work/auditoria-integral';
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const results=[];
try {
 for(const l of catalog.lessons){
  const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:4174')?r.continue():r.abort());
  await page.goto('http://127.0.0.1:4174/'+l.legacyUrl,{waitUntil:'domcontentloaded'});
  const data=await page.evaluate(()=>{
   const ids=[...document.querySelectorAll('[id]')].map(x=>x.id),seen=new Set(),dup=[];
   for(const id of ids){if(seen.has(id))dup.push(id);seen.add(id)}
   const staged=B.flatMap((b,i)=>b.qs.map((q,j)=>({q,id:`b_${i}_${j}`})));
   const damaged=[];
   for(const {q,id} of staged){
    const div=document.createElement('div');div.innerHTML=opt(id,q,{},'ans');
    const p=div.querySelector('.p')?.textContent;
    const options=[...div.querySelectorAll('button')].map(x=>x.textContent);
    if(/[<>]/.test(q.p)&&!/<\/?(?:b|strong|i|em|span|br)\b/i.test(q.p)&&p!==q.p)damaged.push({id,raw:q.p,rendered:p,rawOptions:q.o,options});
   }
   return {title:document.title,stages:B.length,orderedFirstOptions:[...document.querySelectorAll('#w_pre_0 button')].map(x=>x.textContent),rawFirstOptions:PRE[0].o,duplicateIds:dup,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,damaged};
  });
  if(l.number===26){
   data.logic=await page.evaluate(()=>{S.u=18;rb();return {question:document.querySelector('#w_b_18_0')?.innerText}});
   await page.screenshot({path:out+'/logic-mobile.png',fullPage:true});
   data.game=await page.evaluate(()=>{showTab('game',true);gTm=false;g={q:[12],i:0,s:0,c:0,l:5,ok:0,er:0,mode:'swipe',w:false,lock:false};gNext();gAns(true);return document.querySelector('#gbox').innerText;});
   await page.screenshot({path:out+'/logic-game.png',fullPage:true});
  }
  results.push({id:l.id,title:l.title,...data,errors});
  await ctx.close();
 }
}finally{await browser.close();writeFileSync(out+'/browser-audit.json',JSON.stringify(results,null,2));}
console.log(JSON.stringify({pages:results.length,errors:results.filter(x=>x.errors.length),overflow:results.filter(x=>x.scrollWidth>x.width+1).map(x=>({id:x.id,width:x.width,scrollWidth:x.scrollWidth})),damaged:results.flatMap(x=>x.damaged.map(d=>({material:x.id,...d}))),duplicates:results.filter(x=>x.duplicateIds.length).map(x=>({id:x.id,ids:x.duplicateIds})),logic:results.find(x=>x.logic)}));
