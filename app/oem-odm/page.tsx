/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
import { ArrowRight, Check, Layers3, PackageCheck, PenTool } from 'lucide-react';
import DeferredProcessScene from '../components/process-scenes/deferred-scene';
import ManufacturingExperience from '../components/process-scenes/manufacturing-experience';
import { SiteFooter, SiteHeader } from '../site-chrome';

export const metadata: Metadata = { title: 'OEM, ODM & Private Label Supplement Manufacturing | Jentoor', description: 'Flexible supplement manufacturing models from market-ready private label to fully custom OEM and ODM development.' };

export default function OemOdmPage() {
  return <main className="inner-page" id="top">
    <header className="inner-hero"><SiteHeader /><div className="shell inner-hero-grid"><div><p className="eyebrow"><span /> OEM / ODM / PRIVATE LABEL</p><h1>Built around<br /><em>your advantage.</em></h1><p className="inner-lede">Choose the right balance of speed, ownership and differentiation. We connect formulation, manufacturing, packaging and market readiness in one accountable program.</p><a className="primary-button" href="/#quote">Define your project <ArrowRight size={17} /></a></div><div className="inner-scene"><DeferredProcessScene kind="tablet" accent="#d9ff6b" expanded paused={false} /></div></div></header>
    <section className="oem-science"><div className="shell"><p className="section-tag light">SCIENCE TO SMART MANUFACTURING</p><div className="oem-science-grid">
      <article><h2>Formula intelligence</h2><p>A molecular-inspired exploration of formulation thinking.</p><div className="oem-science-canvas" aria-label="Interactive DNA concept visualization"><DeferredProcessScene kind="dna" accent="#d9ff6b" expanded paused={false} /></div><small>CONCEPT VISUALIZATION · NOT A BIOLOGICAL CLAIM</small></article>
      <article><h2>Intelligent manufacturing</h2><p>From an approved product specification to a coordinated production route.</p><div className="oem-science-canvas" aria-label="Interactive smart manufacturing concept"><DeferredProcessScene kind="factory" accent="#7bffc5" expanded paused={false} /></div><small>ILLUSTRATIVE PRODUCTION SYSTEM · DRAG TO EXPLORE</small></article>
    </div><ManufacturingExperience /><div className="oem-resource-links"><a href="/formulation">Full formulation process ↗</a><a href="/faq">Manufacturing FAQ ↗</a><a href="/technology">Explore manufacturing technology ↗</a></div></div></section>
    <section className="model-section shell"><p className="section-tag">01 / THREE WAYS TO BUILD</p><div className="model-grid">
      <article><PackageCheck /><small>FASTEST ROUTE</small><h2>Private Label</h2><p>Start with a proven formulation platform, then apply your brand, packaging and chosen market positioning.</p><ul><li><Check /> Lower development load</li><li><Check /> Market-ready format options</li><li><Check /> Packaging coordination</li></ul></article>
      <article className="featured"><Layers3 /><small>BALANCED ROUTE</small><h2>ODM</h2><p>Co-develop the formula, flavor, dosage system and pack around a clear consumer outcome and commercial target.</p><ul><li><Check /> Collaborative formulation</li><li><Check /> Prototype and refinement</li><li><Check /> Scale-up engineering</li></ul></article>
      <article><PenTool /><small>CONTROLLED ROUTE</small><h2>OEM</h2><p>Bring an approved formula or product specification and use a documented manufacturing route built for repeatability.</p><ul><li><Check /> Buyer-defined specification</li><li><Check /> Controlled sourcing</li><li><Check /> Batch-level release</li></ul></article>
    </div></section>
    <section className="dark-process"><div className="shell"><p className="section-tag light">02 / ONE CONNECTED SYSTEM</p><div className="process-heading"><h2>From commercial brief<br />to <em>repeatable supply.</em></h2><p>Every program moves through visible decision gates. Formula, sample, artwork and release stay version-controlled.</p></div><div className="process-rail">{[['01','Market brief'],['02','Feasibility'],['03','Prototype'],['04','Validation'],['05','Production'],['06','Delivery']].map(([n,t]) => <div key={n}><span>{n}</span><b>{t}</b></div>)}</div></div></section>
    <section className="split-story shell"><div><p className="section-tag">03 / BUILT FOR ECOMMERCE</p><h2>Amazon-ready thinking starts before the bottle.</h2></div><div><p>Packaging durability, barcode placement, tamper evidence, case packs, lot coding, label consistency and replenishment timing are considered alongside the formula.</p><a href="/case-studies/bterlif">See the Bterlif brand case <ArrowRight size={16} /></a><a href="/insights/oem-vs-odm-private-label">Read the OEM vs. ODM guide <ArrowRight size={16} /></a></div></section>
    <section className="page-cta"><div className="shell"><p className="section-tag light">START WITH THE RIGHT MODEL</p><h2>Bring the ambition.<br /><em>We will map the route.</em></h2><a className="primary-button" href="/#quote">Start a project <ArrowRight size={17} /></a></div></section><SiteFooter />
  </main>;
}
