import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { articles } from './article-data';

export const metadata: Metadata = { title:'Supplement Manufacturing Insights | Jentoor', description:'Practical OEM, ODM, formulation, quality and US market guides for supplement buyers.' };
export default function InsightsPage(){ return <main className="inner-page insights-page" id="top"><header className="insights-hero"><SiteHeader/><div className="shell"><p className="eyebrow"><span/> BUYER INTELLIGENCE</p><h1>Better questions.<br/><em>Stronger products.</em></h1><p className="inner-lede">Practical guidance for supplement brands navigating formulation, manufacturing, quality and market readiness.</p></div></header><section className="article-list shell">{articles.map(a=><a href={`/insights/${a.slug}`} key={a.slug}><span>{a.number}</span><div><small>{a.category} · {a.read}</small><h2>{a.title}</h2><p>{a.description}</p></div><ArrowRight/></a>)}</section><SiteFooter/></main> }
