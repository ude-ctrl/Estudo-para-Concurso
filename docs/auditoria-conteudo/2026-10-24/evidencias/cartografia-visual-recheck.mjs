import {chromium} from '/workspace/Estudo-para-Concurso/node_modules/@playwright/test/index.mjs';
import {fresh,STATE_KEY} from '/workspace/Estudo-para-Concurso/src/v6/engine.ts';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const out='/workspace/work/auditoria-integral/cartografia-visual-recheck';mkdirSync(out,{recursive:true});
const content=JSON.parse(readFileSync('/workspace/Estudo-para-Concurso/public/v6/cartografia.json','utf8'));
const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const results=[];
const scenarios=[
 {unit:'cartografia-fundamentos',section:'v6-theory-t02-14',question:'v6-q-f08'},
 {unit:'cartografia-representacao',section:'v6-theory-t03a-3',question:'v6-q-r09'},
 {unit:'geotecnologias',section:'v6-theory-t03a-8',question:'v6-q-g10'}
];
try {
for(const width of [390,1440])for(const s of scenarios){
 const theme=width===390?'dark':'light'; const ctx=await b.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(15000);
 const errors=[],network=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(!r.url().startsWith('http://127.0.0.1'))network.push({url:r.url(),status:r.status()})});p.on('requestfailed',r=>{if(!r.url().startsWith('http://127.0.0.1'))network.push({url:r.url(),error:r.failure()?.errorText})});
 await p.route('**/*',r=>/fonts\.(googleapis|gstatic)\.com/.test(r.request().url())?r.abort():r.continue());
 let st=fresh();st.preferences.theme=theme;await p.addInitScript(({key,st})=>{if(location.origin==='http://127.0.0.1:4174'&&!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify(st))},{key:STATE_KEY,st});
 const mission=content.missions.find(m=>m.sections.some(x=>x.id===s.section));
 await p.goto(`http://127.0.0.1:4174/v6.html#/unidade/${s.unit}/estudo?missao=${mission.id}`,{waitUntil:'domcontentloaded'});
 const sect=p.locator(`[data-resource-id="${s.section}"]`);await sect.locator(':scope > summary').waitFor();await sect.locator(':scope > summary').focus();if(await sect.getAttribute('open')===null)await p.keyboard.press('Enter');await sect.scrollIntoViewIfNeeded();
 await p.waitForTimeout(1500);
 const study=await p.evaluate(sel=>{const e=document.querySelector(sel);return {title:document.querySelector('h1')?.textContent,opened:e.open,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,images:[...e.querySelectorAll('img')].map(x=>({url:x.src,complete:x.complete,naturalWidth:x.naturalWidth,alt:x.alt})),svg:[...e.querySelectorAll('svg')].map(x=>({width:x.getBoundingClientRect().width,height:x.getBoundingClientRect().height})),tables:e.querySelectorAll('table').length,duplicateIds:(()=>{const ids=[...document.querySelectorAll('[id]')].map(x=>x.id);return ids.length-new Set(ids).size})(),fallbackText:e.innerText.includes('Imagem externa indisponível'),focus:document.activeElement?.tagName,animations:e.getAnimations({subtree:true}).length}},`[data-resource-id="${s.section}"]`);
 await sect.screenshot({path:out+`/${s.unit}-${width}-study.png`,timeout:15000}); await p.screenshot({path:out+`/${s.unit}-${width}-viewport.png`});
 st=fresh();st.preferences.theme=theme;const q=content.questions.find(q=>q.id===s.question);st.session={id:'visual-audit-'+q.id,kind:'questions',ids:[q.id],position:0,repeat:[],pool:q.pool};
 await p.goto('about:blank'); await p.addInitScript(({key,st})=>{if(location.origin==='http://127.0.0.1:4174')localStorage.setItem(key,JSON.stringify(st))},{key:STATE_KEY,st});
 await p.goto(`http://127.0.0.1:4174/v6.html#/unidade/${s.unit}/treino`,{waitUntil:'domcontentloaded'});
 await p.locator('.question-options').waitFor();
 if(await p.locator('.visual').count()){await p.locator('.visual').scrollIntoViewIfNeeded();await p.waitForTimeout(1500);await p.locator('.visual').screenshot({path:out+`/${s.unit}-${width}-visual.png`,timeout:15000})}
 await p.locator('.question-options input').first().focus();await p.keyboard.press('Space');await p.getByRole('button',{name:'Confirmar resposta',exact:true}).focus();await p.keyboard.press('Enter');await p.locator('.feedback').waitFor();
 const question=await p.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,feedback:document.querySelector('.feedback')?.innerText,focus:document.activeElement?.className,images:[...document.querySelectorAll('.visual img')].map(x=>({url:x.src,complete:x.complete,naturalWidth:x.naturalWidth})),fallbacks:document.querySelectorAll('.media-fallback').length,tables:document.querySelectorAll('.visual table').length}));
 await p.locator('.feedback').screenshot({path:out+`/${s.unit}-${width}-feedback.png`});
 results.push({...s,width,theme,study,question,network,errors});writeFileSync(out+'/results.json',JSON.stringify(results,null,2));
 await ctx.close();
}
}finally{await b.close()}
console.log(JSON.stringify(results.map(x=>({unit:x.unit,width:x.width,errors:x.errors,studyOverflow:x.study.scrollWidth>x.width,questionOverflow:x.question.scrollWidth>x.width,studyImages:x.study.images,network:x.network,focus:x.question.focus,fallbacks:x.question.fallbacks})),null,2));
