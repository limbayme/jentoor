/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteFooter, SiteHeader } from '../../site-chrome';
import { articles } from '../article-data';

export function generateStaticParams(){ return articles.map(({slug})=>({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{ const {slug}=await params; const a=articles.find(item=>item.slug===slug); return a?{title:`${a.title} | Jentoor Insights`,description:a.description}:{}; }
export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){ const {slug}=await params; const article=articles.find(item=>item.slug===slug); if(!article) notFound(); const index=articles.findIndex(item=>item.slug===slug); const next=articles[(index+1)%articles.length]; return <main className="inner-page article-page" id="top"><header className="article-hero"><SiteHeader/><div className="shell article-head"><a href="/insights"><ArrowLeft size={15}/> ALL INSIGHTS</a><p>{article.category} · {article.read}</p><h1>{article.title}</h1><p className="article-intro">{article.intro}</p></div></header><article className="article-body shell">{article.sections.map((section,i)=><section key={section.heading}><span>0{i+1}</span><div><h2>{section.heading}</h2>{section.paragraphs.map(p=><p key={p}>{p}</p>)}{section.bullets&&<ul>{section.bullets.map(b=><li key={b}>{b}</li>)}</ul>}</div></section>)}<aside><b>Publisher note</b><p>This guide provides general manufacturing and business information, not legal, regulatory, medical or laboratory advice. Product-specific decisions should be reviewed by appropriately qualified professionals.</p></aside></article><section className="next-article"><div className="shell"><span>NEXT GUIDE</span><a href={`/insights/${next.slug}`}>{next.title}<ArrowRight/></a></div></section><SiteFooter/></main>; }
