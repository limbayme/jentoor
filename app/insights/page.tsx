/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SiteFooter, SiteHeader } from '../site-chrome';
import { articles, formats, imageAlt, mediaUrl } from './article-data';

export const metadata: Metadata = {
  title: 'Supplement Manufacturing Knowledge Center | Jentoor',
  description: 'Explore nine supplement formats, OEM and ODM development, manufacturing quality and label preparation guides.',
  alternates: { canonical: 'https://jentoor.com/insights' },
};
export default function InsightsPage() {
  return <main className="knowledge-page" id="top">
    <a className="knowledge-skip" href="#guides">Skip to manufacturing guides</a>
    <header className="knowledge-hero">
      <SiteHeader />
      <div className="shell knowledge-hero-grid">
        <div><p className="knowledge-kicker">INSIGHTS / MANUFACTURING KNOWLEDGE</p><h1>Understand the product.<br /><em>Plan the process.</em></h1><p className="knowledge-lede">A practical resource for supplement brands. Explore formats, development decisions and the work behind a production-ready specification.</p><a className="knowledge-button" href="#guides">Explore the guides <ArrowRight size={18} /></a></div>
        <figure className="knowledge-hero-photo"><img src={mediaUrl('equipment')} alt={imageAlt('equipment')} width="1707" height="1280" fetchPriority="high" /><figcaption><span>INSIDE PRODUCTION</span> A closer look at production equipment.</figcaption></figure>
      </div>
      <nav className="shell knowledge-topics" aria-label="Knowledge center sections"><a href="#guides">01 / Buying & development</a><a href="#formats">02 / Dosage forms</a><a href="#next-steps">03 / Project resources</a></nav>
    </header>
    <section className="shell knowledge-guides" id="guides" aria-labelledby="guides-heading">
      <div className="knowledge-section-head"><div><p className="knowledge-kicker">THE MANUFACTURING LIBRARY</p><h2 id="guides-heading">Clear decisions.<br /><em>From brief to batch.</em></h2></div><p>Start with the question in front of you. Each guide connects the decision to the information, approvals and evidence to request.</p></div>
      <div className="knowledge-guide-grid">{articles.map(a => <a className="knowledge-guide-card" href={`/insights/${a.slug}`} key={a.slug}><div className="knowledge-card-top"><span>{a.number}</span><span>{a.category}</span><ArrowUpRight size={21} /></div><h3>{a.shortTitle}</h3><p>{a.description}</p><span className="knowledge-card-link">Open guide <ArrowRight size={16} /></span></a>)}</div>
    </section>
    <section className="knowledge-formats" id="formats" aria-labelledby="formats-heading"><div className="shell"><div className="knowledge-section-head"><div><p className="knowledge-kicker">DOSAGE FORM SELECTION</p><h2 id="formats-heading">Nine formats.<br /><em>Different questions.</em></h2></div><p>Jentoor supports these nine formats. The right choice depends on the formula, serving experience and project-specific manufacturing review.</p></div><div className="knowledge-format-grid">{formats.map((f, i) => <article key={f.name}><span>{String(i + 1).padStart(2, '0')}</span><h3>{f.name}</h3><p>{f.note}</p></article>)}</div><a className="knowledge-inline-link" href="/insights/how-custom-supplement-formulation-works#format">Understand the formulation tradeoffs <ArrowRight size={17} /></a></div></section>
    <section className="shell knowledge-resources" id="next-steps" aria-labelledby="resources-heading"><figure><img src={mediaUrl('production-floor')} alt={imageAlt('production-floor')} width="1707" height="1280" loading="lazy" decoding="async" /><figcaption>Jentoor production-floor photography. Confirm the producing site and scope for your SKU.</figcaption></figure><div><p className="knowledge-kicker">PUT THE KNOWLEDGE TO WORK</p><h2 id="resources-heading">Bring better questions<br /><em>to your next project.</em></h2><p>Use the guides to prepare your brief, then work through the practical questions and development stages.</p><a href="/faq">Manufacturing FAQ <ArrowUpRight size={20} /></a><a href="/formulation">Custom formulation process <ArrowUpRight size={20} /></a><a href="/#quote">Discuss your product brief <ArrowUpRight size={20} /></a></div></section>
    <SiteFooter />
  </main>;
}
