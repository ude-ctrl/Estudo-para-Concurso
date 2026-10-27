import {chromium} from '/workspace/Estudo-para-Concurso/node_modules/@playwright/test/index.mjs';
import {writeFileSync} from 'node:fs';
const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const p=await b.newPage({viewport:{width:390,height:900}});
await p.route('https://**/*',r=>r.abort());
const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://127.0.0.1:4174/v6.html#/unidade/cartografia-representacao/estudo?missao=projecoes-propriedades');
const e=p.locator('[data-resource-id="v6-theory-t03a-3"]');
if(!(await e.count())) {console.log((await p.locator('body').innerText()).slice(0,500)); await b.close(); process.exit(1);}
await e.locator(':scope > summary').click();await e.scrollIntoViewIfNeeded();await p.waitForTimeout(700);
const result=await e.evaluate(e=>({images:[...e.querySelectorAll('img')].map(img=>({src:img.src,hidden:img.hidden,display:getComputedStyle(img).display,rect:{width:img.getBoundingClientRect().width,height:img.getBoundingClientRect().height},complete:img.complete,naturalWidth:img.naturalWidth,visibility:getComputedStyle(img).visibility})),fallbacks:[...e.querySelectorAll('.media-fallback')].map(x=>x.textContent)}));
result.errors=errors;writeFileSync('/workspace/work/auditoria-integral/cartografia-visual-recheck/fallback-dom.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));await b.close();
