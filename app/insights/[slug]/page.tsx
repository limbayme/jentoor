/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { PageShell, Breadcrumbs, InquiryCta, JsonLd } from '../../_catalog/shared';
import { articles, sources } from '../article-data';

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find(item => item.slug === slug);
  return a ? { title: `${a.title} | Jentoor`, description: a.description, alternates: { canonical: `https://jentoor.com/insights/${a.slug}` }, openGraph: { title: a.title, description: a.description, type: 'article', images: [{ url: '/brand/campaigns/process-atelier.webp', alt: 'Conceptual manufacturing atelier' }] } } : {};
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find(item => item.slug === slug);
  if (!article) notFound();
  const related = articles.filter(a => a.slug !== slug).slice(0, 2);
  return <PageShell><div className="knowledge-page knowledge-detail jt-article">
    <a className="knowledge-skip" href="#guide-content">Skip to guide content</a>
    <section className="shell jt-page-hero"><Breadcrumbs items={[{name:'Buyer resources',href:'/insights'},{name:article.shortTitle}]}/><p className="jt-kicker">{article.category}</p><h1>{article.title}</h1><p className="jt-intro">{article.intro}</p><p className="jt-article-byline">Jentoor editorial · Manufacturing & procurement guide</p></section>
    <div className="shell knowledge-detail-layout">
      <aside className="knowledge-toc"><nav aria-label="On this page"><p className="knowledge-kicker">IN THIS GUIDE</p><ol>{article.sections.map(s => <li key={s.id}><a href={`#${s.id}`}>{s.heading.replace(/^\d+ \/ /, '')}</a></li>)}</ol><a className="knowledge-toc-end" href="#checklist">What to prepare <ArrowRight size={14} /></a><a className="knowledge-toc-end" href="#references">Official references <ArrowRight size={14} /></a></nav></aside>
      <article className="knowledge-body" id="guide-content">
        <div className="knowledge-takeaway"><p className="knowledge-kicker">THE WORKING PRINCIPLE</p><p>{article.takeaway}</p></div>
        <figure className="knowledge-detail-photo"><img src="/brand/campaigns/process-atelier.webp" alt="Conceptual manufacturing atelier" width="1536" height="1024" fetchPriority="high" /><figcaption>Conceptual brand artwork. Explore actual production footage on the factory page.</figcaption></figure>
        <figure className="knowledge-process"><figcaption>Planning sequence / adapt to the project</figcaption><ol>{article.steps.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, '0')}</span>{step}</li>)}</ol></figure>
        {article.sections.map(s => <section className="knowledge-prose-section" id={s.id} key={s.id}><h2>{s.heading}</h2>{s.paragraphs.map(p => <p key={p}>{p}</p>)}{s.bullets && <ul>{s.bullets.map(b => <li key={b}>{b}</li>)}</ul>}{s.sourceIds && <div className="knowledge-source-links">{s.sourceIds.map(id => <a key={id} href={sources[id].url}>{sources[id].title} <ArrowUpRight size={13} /></a>)}</div>}</section>)}
        <section className="knowledge-checklist" id="checklist"><p className="knowledge-kicker">YOUR NEXT CONVERSATION</p><h2>What to prepare</h2><ul>{article.checklist.map(c => <li key={c}>{c}</li>)}</ul><a className="knowledge-inline-link" href="/contact">Discuss your product brief <ArrowRight size={17} /></a></section>
        <section className="knowledge-references" id="references"><h2>Official references</h2><p>Use these sources alongside a qualified, product-specific review. This guide provides general manufacturing and business information; it does not establish regulatory compliance or approve a product, label or claim.</p><ul>{article.sourceIds.map(id => <li key={id}><a href={sources[id].url}>{sources[id].title} <ArrowUpRight size={14} /></a></li>)}</ul></section>
      </article>
    </div>
    <section className="knowledge-related"><div className="shell"><p className="knowledge-kicker">CONTINUE EXPLORING</p><h2>Connected decisions.</h2><div>{related.map(a => <a href={`/insights/${a.slug}`} key={a.slug}><span>{a.category}</span><h3>{a.shortTitle}</h3><ArrowRight size={22} /></a>)}</div><a className="knowledge-inline-link" href="/insights">View the knowledge center <ArrowRight size={17} /></a></div></section>
    <section className="shell jt-section"><p className="jt-kicker">TURN RESEARCH INTO A PROJECT</p><h2>Find a practical starting point.</h2><div className="jt-related-catalog"><a href="/catalog">Browse product concepts ↗</a><a href="/packaging">Compare packaging ↗</a><a href="/quality">Review quality documents ↗</a><a href="/contact">Prepare an inquiry ↗</a></div></section>
    <JsonLd data={{'@context':'https://schema.org','@type':'Article',headline:article.title,description:article.description,image:'https://jentoor.com/brand/campaigns/process-atelier.webp',author:{'@type':'Organization',name:'Jentoor',url:'https://jentoor.com/about'},publisher:{'@id':'https://jentoor.com/#organization'},mainEntityOfPage:`https://jentoor.com/insights/${article.slug}`}}/>
  </div><InquiryCta/></PageShell>;
}
