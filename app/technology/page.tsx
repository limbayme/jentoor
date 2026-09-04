import type { Metadata } from 'next';
import { ArrowRight, Cpu, ScanLine, Workflow, Gauge } from 'lucide-react';
import DeferredProcessScene from '../components/process-scenes/deferred-scene';
import ManufacturingExperience from '../components/process-scenes/manufacturing-experience';
import { SiteFooter, SiteHeader } from '../site-chrome';

export const metadata: Metadata = { title: 'Smart Supplement Manufacturing Technology | Jentoor', description: 'Explore Jentoor smart manufacturing, connected production controls and scalable supplement production technology.' };

export default function TechnologyPage() {
  return <main className="inner-page tech-page" id="top"><header className="inner-hero"><SiteHeader /><div className="shell inner-hero-grid"><div><p className="eyebrow"><span /> SMART MANUFACTURING</p><h1>Machines move.<br /><em>Data follows.</em></h1><p className="inner-lede">A connected production system turns formulations into repeatable output — with controlled parameters, visible checkpoints and a traceable record behind every lot.</p><a className="primary-button" href="#systems">Explore the system <ArrowRight size={17} /></a></div><div className="inner-scene factory-scene"><DeferredProcessScene kind="factory" accent="#7bffc5" expanded paused={false} /></div></div></header>
    <section className="tech-systems shell" id="systems"><div className="section-heading"><div><p className="section-tag">01 / CONNECTED OPERATIONS</p><h2>Intelligence at<br /><em>every production gate.</em></h2></div><p className="side-copy">Technology supports the operator; controlled procedures and quality review keep the system accountable.</p></div><div className="tech-grid">
      <article><Cpu /><span>01</span><h3>Formula translation</h3><p>Material properties, dose, flow, compression and stability requirements shape the production route.</p></article>
      <article><Workflow /><span>02</span><h3>Line orchestration</h3><p>Mixing, forming, filling, inspection and packing connect through a defined batch sequence.</p></article>
      <article><Gauge /><span>03</span><h3>Process signals</h3><p>Critical operating parameters and in-process checks are captured at the point of work.</p></article>
      <article><ScanLine /><span>04</span><h3>Lot traceability</h3><p>Materials, production records, test results and finished goods remain linked to the released lot.</p></article>
    </div></section>
    <div className="shell"><ManufacturingExperience /></div>
    <section className="data-band"><div className="shell data-grid"><div><span>FORMULA</span><b>01</b><p>Approved inputs</p></div><div><span>PROCESS</span><b>02</b><p>Controlled conversion</p></div><div><span>QUALITY</span><b>03</b><p>Verified release</p></div><div><span>SUPPLY</span><b>04</b><p>Repeatable delivery</p></div></div></section>
    <section className="split-story shell"><div><p className="section-tag">02 / BUILT TO SCALE</p><h2>Automation where it matters. Human judgment where it counts.</h2></div><div><p>Smart manufacturing is not a wall of dashboards. It is the disciplined connection between formula intent, equipment capability, operator action, quality evidence and customer delivery.</p><a href="/quality">Explore quality systems <ArrowRight size={16} /></a></div></section><SiteFooter /></main>;
}
