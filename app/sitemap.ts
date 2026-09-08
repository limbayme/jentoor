import type { MetadataRoute } from 'next';
import { articles } from './insights/article-data';
import { products, formats, applications } from './_catalog/data';
export default function sitemap(): MetadataRoute.Sitemap {
 const base='https://jentoor.com';
 const core=['','/catalog','/solutions','/packaging','/manufacturing','/about','/contact','/privacy','/terms','/oem-odm','/factory','/laboratory','/formulation','/faq','/technology','/quality','/insights'];
 return [
 ...core.map(route=>({url:`${base}${route}`,lastModified:new Date('2026-09-09'),changeFrequency:'monthly' as const,priority:route===''?1:route==='/catalog'?.9:.7})),
 ...formats.map(f=>({url:`${base}/catalog/${f.slug}`,lastModified:new Date('2026-09-09'),priority:.8})),
 ...products.map(p=>({url:`${base}/catalog/products/${p.slug}`,lastModified:new Date(p.updatedAt),priority:.7})),
 ...applications.map(a=>({url:`${base}/solutions/${a.slug}`,lastModified:new Date('2026-09-09'),priority:.7})),
 ...articles.map(a=>({url:`${base}/insights/${a.slug}`,lastModified:new Date('2026-09-04'),priority:.6})),
 ];
}
