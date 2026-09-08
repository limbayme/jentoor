/* eslint-disable @next/next/no-html-link-for-pages */
import { PageShell, Breadcrumbs, InquiryCta } from '../_catalog/shared';
import s from './knowledge.module.css';
import { sources, type SourceKey } from './content';
export function KnowledgeShell({current,title,emphasis,intro,children}:{current:'FAQ'|'Formulation';title:string;emphasis:string;intro:string;children:React.ReactNode}){return <PageShell><section className="shell jt-page-hero"><Breadcrumbs items={[{name:current}]}/><p className="jt-kicker">JENTOOR / PRODUCT DEVELOPMENT</p><h1>{title}<br/><em>{emphasis}</em></h1><p className="jt-intro">{intro}</p><nav className="jt-category-links" aria-label="Knowledge pages"><a href="/faq" aria-current={current==='FAQ'?'page':undefined}>Manufacturing FAQ</a><a href="/formulation" aria-current={current==='Formulation'?'page':undefined}>Formulation process</a><a href="/insights">Buyer guides ↗</a><a href="/catalog">Explore product concepts ↗</a></nav></section><div className={s.page}>{children}</div></PageShell>;}
export function SourceLink({source}:{source:SourceKey}){return <a className={s.source} href={sources[source].url}>{sources[source].title} <span aria-hidden="true">↗</span></a>;}
export function ProjectCta(){return <InquiryCta/>;}
