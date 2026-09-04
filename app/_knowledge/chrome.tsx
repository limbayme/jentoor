/* eslint-disable @next/next/no-html-link-for-pages */
import { SiteHeader, SiteFooter } from '../site-chrome';
import s from './knowledge.module.css';
import { sources, type SourceKey } from './content';

export function KnowledgeShell({ current, title, emphasis, intro, children }: { current: 'FAQ' | 'Formulation'; title: string; emphasis: string; intro: string; children: React.ReactNode }) {
  return <div className={s.page} id="top">
    <a className={s.skip} href="#main-content">Skip to content</a>
    <header className={s.hero}><SiteHeader /><div className={`${s.container} ${s.heroCopy}`}>
      <nav className={s.breadcrumb} aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/insights">Insights</a><span aria-hidden="true">/</span><span aria-current="page">{current}</span></nav>
      <p className={s.kicker}>JENTOOR / PRODUCT DEVELOPMENT</p>
      <h1>{title}<br /><em>{emphasis}</em></h1><p className={s.intro}>{intro}</p>
      <nav className={s.pageNav} aria-label="Knowledge pages"><a href="/faq" aria-current={current === 'FAQ' ? 'page' : undefined}>Manufacturing FAQ</a><a href="/formulation" aria-current={current === 'Formulation' ? 'page' : undefined}>Formulation process</a><a href="/insights">Explore Insights <span aria-hidden="true">↗</span></a></nav>
    </div></header>
    <main id="main-content" tabIndex={-1}>{children}</main><SiteFooter />
  </div>;
}
export function SourceLink({ source }: { source: SourceKey }) { return <a className={s.source} href={sources[source].url}>{sources[source].title} <span aria-hidden="true">↗</span></a>; }
export function ProjectCta() { return <section className={`${s.container} ${s.cta}`} aria-labelledby="project-title"><div><p className={s.kicker}>YOUR NEXT STEP</p><h2 id="project-title">Start with a clear brief.</h2><p>Share your consumer, market, format, serving, quantity and packaging direction. A focused brief makes the next decision easier.</p></div><a className={s.button} href="/#quote">Discuss your project <span aria-hidden="true">↗</span></a></section>; }
