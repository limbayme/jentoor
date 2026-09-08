import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const base=process.env.SITE_URL||'http://localhost:3002';
const productData=JSON.parse(await readFile(new URL('../app/_catalog/products.json',import.meta.url),'utf8'));
const sitemap=await fetch(`${base}/sitemap.xml`);
assert.equal(sitemap.status,200,'sitemap status');
const xml=await sitemap.text();
const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
assert(urls.length>40,'sitemap should include catalog, categories, solutions and guides');
assert.equal(new Set(urls).size,urls.length,'duplicate sitemap URLs');
assert(!xml.includes('bterlif')&&!xml.includes('scene-studio'),'removed/private pages in sitemap');
const failures=[];let cursor=0;
await Promise.all(Array.from({length:3},async()=>{while(cursor<urls.length){const url=urls[cursor++];const path=new URL(url).pathname;try{const response=await fetch(base+path);assert.equal(response.status,200,`${path} status`);const html=await response.text();assert(/<h1[ >]/.test(html),`${path} missing SSR H1`);assert(/<title>[^<]+<\/title>/.test(html),`${path} missing title`);assert(html.includes(`rel="canonical" href="${url}"`)||html.includes(`href="${url}" rel="canonical"`),`${path} incorrect canonical`);assert(!/bterlif|case-studies\/bterlif/i.test(html),`${path} contains removed brand`);for(const [,json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs))JSON.parse(json);if(path==='/catalog')assert((html.match(/class="jt-product-card"/g)||[]).length===24,'catalog lacks 24 SSR cards');if(path==='/')assert(html.includes('Formula delivery lab')&&html.includes('Interactive manufacturing process'),'home is missing original interactive experiences');}catch(e){failures.push(e.message);}}}));
for(const p of productData){for(const asset of [p.thumbnail,p.image]){const response=await fetch(base+asset);assert.equal(response.status,200,`missing image ${asset}`);assert(response.headers.get('content-type')?.includes('image/'),'image content type');}}
for(const path of ['/catalog/products/not-a-product','/catalog/not-a-format','/solutions/not-an-application','/case-studies/bterlif']){const response=await fetch(base+path);if(response.status!==404)failures.push(`${path}: expected 404, received ${response.status}`);}
assert.equal(failures.length,0,failures.join('\n'));
console.log(`PASS: ${urls.length} sitemap pages: HTTP 200, SSR H1/title/canonical, valid JSON-LD, no removed brand. 48 product assets and 4 not-found routes verified. Original home 3D modules present in HTML.`);
