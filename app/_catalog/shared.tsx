/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { SiteHeader, SiteFooter } from '../site-chrome';
import { getFormat, type Product } from './data';
import { AddToInquiry } from './inquiry';

export function pageMetadata(title: string, description: string, path: string, image = '/og.png'): Metadata {
  return { title: `${title} | Jentoor`, description, alternates: { canonical: path }, openGraph: { title: `${title} | Jentoor`, description, url: path, type: 'website', images: [{ url: image }] }, twitter: { card: 'summary_large_image', title, description, images: [image] } };
}
export function JsonLd({ data }: { data: unknown }) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />; }
export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  const all = [{name:'Home',href:'/'},...items];
  return <><nav className="jt-breadcrumbs" aria-label="Breadcrumb">{all.map((item,i) => <span key={i}>{i > 0 && <b aria-hidden="true">/</b>}{item.href ? <a href={item.href}>{item.name}</a> : <span aria-current="page">{item.name}</span>}</span>)}</nav><JsonLd data={{ '@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:all.map((item,i) => ({'@type':'ListItem',position:i+1,name:item.name,...(item.href ? {item:`https://jentoor.com${item.href}`} : {})})) }} /></>;
}
export function PageShell({children}: {children:React.ReactNode}) { return <div className="jt" id="top"><a className="jt-skip" href="#main-content">Skip to content</a><div className="jt-nav"><SiteHeader tone="light" /></div><main id="main-content">{children}</main><SiteFooter /></div>; }
export function ProductCard({ product, priority=false }: { product: Product; priority?:boolean }) {
  return <article className="jt-product-card"><a className="jt-product-image" href={`/catalog/products/${product.slug}`}><img src={product.thumbnail} width="420" height="420" alt={`${product.name} — illustrative Jentoor packaging`} loading={priority?'eager':'lazy'} decoding="async" /><span className="jt-image-arrow" aria-hidden="true"><ArrowUpRight size={19}/></span></a><div className="jt-card-meta"><span>{getFormat(product.format)?.name}</span><span>{product.id}</span></div><h3><a href={`/catalog/products/${product.slug}`}>{product.name}</a></h3><p>{product.ingredients}</p><div className="jt-card-bottom"><span>{product.packaging}</span><AddToInquiry id={product.id} compact /></div></article>;
}
export function SectionHeading({kicker,title,copy,href,label}: {kicker:string;title:string;copy?:string;href?:string;label?:string}) { return <div className="jt-section-heading"><div><p className="jt-kicker">{kicker}</p><h2>{title}</h2>{copy && <p>{copy}</p>}</div>{href && <a className="jt-link" href={href}>{label || 'Explore more'} <ArrowUpRight size={18}/></a>}</div>; }
export function InquiryCta(){return <section className="jt-cta" id="quote"><div className="shell"><p className="jt-kicker">LET’S MAKE SOMETHING CONSIDERED</p><h2>Your next product.<br/><em>Let’s shape it together.</em></h2><p>Bring a product reference, a formula or simply an idea. Start with a brief that connects your market, format and ambitions.</p><a className="jt-button" href="/contact">Discuss your project <ArrowUpRight size={19}/></a><a className="jt-cta-secondary" href="/catalog">Explore the catalog <ArrowRight size={17}/></a></div></section>;}
