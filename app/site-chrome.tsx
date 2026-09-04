/* eslint-disable @next/next/no-html-link-for-pages */
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import s from './site-chrome.module.css';

const links = [
  ['/#capabilities', 'Capabilities'], ['/oem-odm', 'OEM / ODM'],
  ['/factory', 'Factory'], ['/laboratory', 'Laboratory'],
  ['/formulation', 'Formulation'], ['/technology', 'Technology'],
  ['/quality', 'Quality'], ['/insights', 'Insights'], ['/faq', 'FAQ'],
  ['/case-studies/bterlif', 'Case study'], ['/#about', 'About'],
];

export function SiteHeader() {
  return <nav className={`shell ${s.header}`} aria-label="Primary navigation">
    <Link className="brand" href="/" aria-label="Jentoor home"><img className="brand-logo" src="/brand/jentoor-white.svg" alt="Jentoor" width="132" height="38" /></Link>
    <div className={s.links}>{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</div>
    <Link className={s.cta} href="/#quote">Start a project <ArrowUpRight size={16} /></Link>
    <details className={s.mobile}><summary>Menu <span aria-hidden="true">＋</span></summary><div className={s.panel}><Link href="/">Home</Link>{links.map(([href,label]) => <a href={href} key={href}>{label}</a>)}<a href="/#quote">Start a project ↗</a></div></details>
  </nav>;
}

export function SiteFooter() {
  return <footer><div className="shell footer-top"><a className="brand" href="/" aria-label="Jentoor home"><img className="brand-logo" src="/brand/jentoor-white.svg" alt="Jentoor" /></a><p>Evidence-led nutrition.<br />Engineered to scale.</p><a className="back-top" href="#top">BACK TO TOP <ArrowUpRight size={16} /></a></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} JENTOOR NUTRACEUTICALS</span><span>GUANGZHOU · GLOBAL PARTNERSHIPS</span><span>PRIVACY · TERMS</span></div></footer>;
}
