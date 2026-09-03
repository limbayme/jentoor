/* eslint-disable @next/next/no-html-link-for-pages */
import { ArrowUpRight } from 'lucide-react';

export function SiteHeader() {
  return <nav className="nav shell" aria-label="Primary navigation"><a className="brand" href="/" aria-label="Jentoor home"><img className="brand-logo" src="/brand/jentoor-white.svg" alt="Jentoor" /></a><div className="nav-links"><a href="/#capabilities">Capabilities</a><a href="/#formula">Formulation</a><a href="/#standards">Standards</a><a href="/#about">About</a><a href="/insights">Insights</a></div><a className="nav-cta" href="/#quote">Start a project <ArrowUpRight size={16} /></a></nav>;
}

export function SiteFooter() {
  return <footer><div className="shell footer-top"><a className="brand" href="/" aria-label="Jentoor home"><img className="brand-logo" src="/brand/jentoor-white.svg" alt="Jentoor" /></a><p>Evidence-led nutrition.<br />Engineered to scale.</p><a className="back-top" href="#top">BACK TO TOP <ArrowUpRight size={16} /></a></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} JENTOOR NUTRACEUTICALS</span><span>GUANGZHOU · GLOBAL PARTNERSHIPS</span><span>PRIVACY · TERMS</span></div></footer>;
}
