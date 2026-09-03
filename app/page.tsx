'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clipboard,
  Globe2,
  Menu,
  Play,
  ShieldCheck,
} from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import type { Group } from 'three';

const formulas = [
  { id: 'energy', label: 'Energy + Focus', short: 'EF', color: '#d9ff6b', note: 'Clarity / endurance' },
  { id: 'beauty', label: 'Beauty from Within', short: 'BW', color: '#ff9ab8', note: 'Skin / hair / nails' },
  { id: 'sleep', label: 'Sleep + Recovery', short: 'SR', color: '#8fcfff', note: 'Rest / restoration' },
  { id: 'daily', label: 'Daily Wellness', short: 'DW', color: '#62f4bd', note: 'Foundational health' },
];

const formats = [
  { number: '01', title: 'Capsules', copy: 'Precision dosing with flexible shell, size and release options.', icon: 'capsule' },
  { number: '02', title: 'Tablets', copy: 'Engineered compression, coating and stability for daily rituals.', icon: 'tablet' },
  { number: '03', title: 'Powders', copy: 'Flavor-forward blends built for solubility, texture and performance.', icon: 'powder' },
  { number: '04', title: 'Liquids', copy: 'Ingestible liquids from functional shots to drop-based systems.', icon: 'liquid' },
];

function FormatIcon({ type }: { type: string }) {
  return (
    <span className={`format-symbol ${type}`} aria-hidden="true">
      <i /><b /><em />
    </span>
  );
}

function SocialGlyph({ kind }: { kind: 'instagram' | 'linkedin' | 'youtube' }) {
  if (kind === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle className="fill" cx="17.5" cy="6.5" r="1" /></svg>;
  if (kind === 'linkedin') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9v10M5 5.5v.1M9.5 19V9m0 4.3c1-2.6 5.8-3.4 5.8 1.2V19M15.3 9v10" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="4" /><path className="fill" d="m10 9 6 3-6 3z" /></svg>;
}

function FormulaCapsule({ color = '#d9ff6b', compact = false }: { color?: string; compact?: boolean }) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * (compact ? 0.28 : 0.16);
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.45) * 0.08 - 0.24;
  });

  const beads = useMemo(() => Array.from({ length: compact ? 32 : 22 }, (_, index) => ({
    angle: index * 2.399,
    radius: 0.16 + (index % 5) * 0.13,
    y: -0.48 + (index % 7) * 0.14,
    size: 0.052 + (index % 3) * 0.018,
  })), [compact]);

  return (
    <Float speed={0.65} rotationIntensity={0.06} floatIntensity={0.14}>
      <group ref={group} rotation={[0.2, -0.55, -0.24]} scale={compact ? 0.83 : 1}>
        <mesh position={[0, 0.78, 0]}>
          <sphereGeometry args={[1, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial color={color} roughness={0.08} metalness={0.02} clearcoat={1} transmission={0.08} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[1, 1, 1.55, 64]} />
          <meshPhysicalMaterial color={color} roughness={0.08} clearcoat={1} transmission={0.08} />
        </mesh>
        <mesh position={[0, -0.78, 0]} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[1.01, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial color="#effbe8" roughness={0.04} transmission={0.72} thickness={1.6} transparent opacity={0.72} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[1.01, 1.01, 1.55, 64]} />
          <meshPhysicalMaterial color="#effbe8" roughness={0.04} transmission={0.72} thickness={1.6} transparent opacity={0.72} />
        </mesh>
        {beads.map((bead, index) => (
          <mesh key={index} position={[Math.cos(bead.angle) * bead.radius, bead.y, Math.sin(bead.angle) * bead.radius]}>
            <sphereGeometry args={[bead.size, 16, 16]} />
            <meshStandardMaterial color={index % 3 === 0 ? color : index % 3 === 1 ? '#f3ffad' : '#ffffff'} emissive={color} emissiveIntensity={0.35} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function FormulaCanvas({ color, compact = false }: { color?: string; compact?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, compact ? 5.5 : 6.2], fov: 36 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[4, 6, 5]} intensity={5} color="#ecffd7" />
      <pointLight position={[-4, -2, 3]} intensity={16} color={color || '#00e998'} />
      <FormulaCapsule color={color} compact={compact} />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.25} minPolarAngle={1.1} maxPolarAngle={2.02} minAzimuthAngle={-0.55} maxAzimuthAngle={0.55} />
    </Canvas>
  );
}

export default function Home() {
  const [activeFormula, setActiveFormula] = useState(formulas[0]);
  const [format, setFormat] = useState('Capsules');
  const [volume, setVolume] = useState('10k–50k units');
  const [submitted, setSubmitted] = useState(false);
  const brief = `Jentoor project brief\nGoal: ${activeFormula.label}\nFormat: ${format}\nVolume: ${volume}`;

  const copyBrief = async () => {
    await navigator.clipboard?.writeText(brief);
    setSubmitted(true);
  };

  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav shell" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Jentoor home"><img className="brand-logo" src="/brand/jentoor-white.svg" alt="Jentoor" /></a>
          <div className="nav-links"><a href="#capabilities">Capabilities</a><a href="#formula">Formulation</a><a href="#standards">Standards</a><a href="#about">About</a></div>
          <a className="nav-cta" href="#quote">Start a project <ArrowUpRight size={16} /></a>
          <button className="menu-button" aria-label="Open navigation"><Menu size={19} /></button>
        </nav>

        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Global nutraceutical manufacturing partner</p>
            <h1>Evidence-led nutrition.<br /><em>Engineered to scale.</em></h1>
            <p className="hero-lede">From first formula to global fulfillment, we transform ambitious wellness concepts into market-ready products — with science, speed and manufacturing visibility.</p>
            <div className="hero-actions"><a className="primary-button" href="#quote">Build your formula <ArrowDownRight size={18} /></a><a className="text-link" href="#factory">Explore our factory <span>↗</span></a></div>
          </div>
          <div className="hero-visual" aria-label="Interactive 3D nutrient capsule. Drag to rotate.">
            <FormulaCanvas />
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="formula-note note-one"><b>01</b><span>Active system<br /><strong>Precision blend</strong></span></div>
            <div className="formula-note note-two"><b>22</b><span>Micro-elements<br /><strong>Inside the formula</strong></span></div>
            <p className="drag-hint">DRAG TO EXPLORE</p>
          </div>
        </div>
        <div className="proof-bar shell">
          <p><ShieldCheck size={19} /> NSF/ANSI 455-2 <span>GMP CERTIFIED</span></p><p><Globe2 size={19} /> BUILT FOR GLOBAL MARKETS</p><p className="proof-stat"><strong>04</strong> DOSAGE FORMS</p><p className="proof-stat"><strong>01</strong> END-TO-END PARTNER</p>
        </div>
      </section>

      <section className="manifesto shell" id="about">
        <p className="section-tag">01 / WHY JENTOOR</p>
        <div><h2>Where rigorous manufacturing<br />meets <em>category-defining wellness.</em></h2><p>We unite formulation thinking, disciplined quality systems and responsive production under one accountable partnership. No black boxes. No generic solutions. Just a clearer route from idea to shelf.</p></div>
      </section>

      <section className="formats" id="capabilities">
        <div className="shell section-heading"><div><p className="section-tag">02 / CAPABILITIES</p><h2>One system.<br /><em>Four intelligent formats.</em></h2></div><p className="side-copy">Select a delivery system engineered around your consumer, formula and market.</p></div>
        <div className="format-grid shell">
          {formats.map((item) => <article className="format-card" key={item.title}><div className="format-top"><span>{item.number}</span><ArrowUpRight size={17} /></div><FormatIcon type={item.icon} /><h3>{item.title}</h3><p>{item.copy}</p></article>)}
        </div>
        <div className="capability-ticker" aria-label="Manufacturing capabilities"><div>DRY FORMULATION <i /> ENCAPSULATION <i /> LIQUID FORMULATION <i /> MIXING <i /> TABLET COMPRESSION <i /> PRIMARY PACKAGING <i /> QUALITY OPERATIONS <i /> WAREHOUSING <i /></div></div>
      </section>

      <section className="formula-lab" id="formula">
        <div className="formula-lab-grid shell">
          <div className="lab-copy"><p className="section-tag light">03 / FORMULA INTELLIGENCE</p><h2>Build around an outcome,<br /><em>not a catalogue.</em></h2><p>Choose a market direction and explore how delivery, ingredient logic and production requirements connect. This interactive prototype turns your brief into a smarter first conversation.</p>
            <div className="formula-options" role="radiogroup" aria-label="Formula direction">{formulas.map((item) => <button key={item.id} role="radio" aria-checked={activeFormula.id === item.id} onClick={() => setActiveFormula(item)} className={activeFormula.id === item.id ? 'active' : ''}><span style={{ background: item.color }}>{item.short}</span><b>{item.label}<small>{item.note}</small></b><ArrowRight size={16} /></button>)}</div>
          </div>
          <div className="lab-visual" style={{ '--formula-color': activeFormula.color } as React.CSSProperties}>
            <div className="lab-canvas"><FormulaCanvas color={activeFormula.color} compact /></div>
            <div className="lab-ring r1" /><div className="lab-ring r2" />
            <div className="lab-readout"><span>ACTIVE CONCEPT</span><strong>{activeFormula.label}</strong><p>FORMULA SIGNAL / <b>LIVE</b></p></div>
            <div className="lab-metric m1"><span>01</span>Outcome</div><div className="lab-metric m2"><span>02</span>Delivery</div><div className="lab-metric m3"><span>03</span>Scale</div>
          </div>
        </div>
      </section>

      <section className="factory" id="factory">
        <div className="shell factory-head"><div><p className="section-tag">04 / INSIDE THE FACTORY</p><h2>Proof lives<br /><em>in the process.</em></h2></div><p>Real production footage. Real equipment. Real visibility into the work behind every finished unit.</p></div>
        <div className="factory-reel shell">
          <video src="/media/production-line.mp4" autoPlay muted loop playsInline poster="/media/production-floor.jpg" aria-label="Jentoor production line" />
          <div className="video-shade" /><p className="video-index">HW / FACTORY FILM 001</p><div className="play-disc"><Play size={20} fill="currentColor" /></div><p className="video-caption"><span>01:12</span> Precision liquid filling &amp; quality control</p>
        </div>
        <div className="factory-stills shell"><article><img src="/media/equipment.jpg" alt="Stainless steel production equipment in a clean manufacturing room" /><span>FILLING SYSTEM / 01</span></article><article className="video-card"><video src="/media/packaging-line.mp4" autoPlay muted loop playsInline /><span>PACKAGING LINE / 02</span></article><div className="factory-copy"><strong>Controlled operations.<br />Documented at every stage.</strong><p>Dry formulation, mixing, encapsulation, liquid filling, tablet compression, primary packaging, quality-unit operations and warehousing.</p></div></div>
      </section>

      <section className="standards" id="standards">
        <div className="shell standards-grid">
          <div><p className="section-tag light">05 / VERIFIED STANDARDS</p><h2>Trust should be<br /><em>visible.</em></h2><p className="standards-intro">We make qualification records accessible — so procurement and quality teams can verify before they commit.</p></div>
          <div className="certificate-list">
            <a href="/certificates/nsf-certificate.pdf" target="_blank" rel="noreferrer"><span>01</span><div><b>NSF/ANSI 455-2</b><small>Guangzhou Yinglian Health Industry Co., Ltd · C0910528-HSCDS-1</small></div><strong>VALID TO 2027</strong><ArrowUpRight /></a>
            <a href="/certificates/factory-qualifications.pdf" target="_blank" rel="noreferrer"><span>02</span><div><b>FDA Facility Registration</b><small>Guangzhou Jianrun Biotechnology Co., Ltd · Facility record</small></div><strong>VIEW RECORD</strong><ArrowUpRight /></a>
            <a href="/certificates/factory-qualifications.pdf" target="_blank" rel="noreferrer"><span>03</span><div><b>ISO + HACCP Systems</b><small>Guangzhou Jianrun Biotechnology Co., Ltd · Qualification dossier</small></div><strong>VIEW RECORD</strong><ArrowUpRight /></a>
          </div>
        </div>
        <p className="compliance-note shell">Certification and registration apply to the facilities and scopes named in each linked record. FDA registration does not denote FDA approval.</p>
      </section>

      <section className="pathway">
        <div className="shell"><p className="section-tag">06 / HOW WE WORK</p><h2>A clearer path<br /><em>from brief to market.</em></h2><div className="steps">{[
          ['01','Discover','Market, audience and commercial target.'],['02','Formulate','Ingredient logic, dosage and delivery system.'],['03','Validate','Pilot, sensory, stability and documentation.'],['04','Manufacture','Controlled production and quality release.'],['05','Deliver','Packaging, warehousing and global readiness.']
        ].map(([n,t,c]) => <article key={n}><span>{n}</span><div className="step-dot" /><h3>{t}</h3><p>{c}</p></article>)}</div></div>
      </section>

      <section className="social-wall">
        <div className="shell social-head"><div><p className="section-tag">07 / FROM THE FLOOR</p><h2>Manufacturing,<br /><em>without the curtain.</em></h2></div><div className="social-actions"><a href="https://www.instagram.com/zaxvchung/" target="_blank" rel="noreferrer" aria-label="Jentoor on Instagram"><SocialGlyph kind="instagram" /></a><span aria-label="LinkedIn link pending"><SocialGlyph kind="linkedin" /></span><span aria-label="YouTube link pending"><SocialGlyph kind="youtube" /></span></div></div>
        <div className="social-cards shell"><article><video src="/media/bottling-line.mp4" muted autoPlay loop playsInline /><div><SocialGlyph kind="instagram" /> PRODUCTION NOTE 014</div></article><article><video src="/media/warehouse.mp4" muted autoPlay loop playsInline /><div><SocialGlyph kind="instagram" /> DELIVERY NOTE 021</div></article><article className="social-text"><small>FIELD NOTE / QUALITY</small><blockquote>“Visibility is not a marketing layer. It is how good manufacturing earns trust.”</blockquote><span>JENTOOR OPERATIONS</span></article></div>
      </section>

      <section className="quote" id="quote">
        <div className="shell quote-grid">
          <div className="quote-copy"><p className="section-tag light">08 / START A PROJECT</p><h2>Your next formula<br /><em>starts here.</em></h2><p>Configure a concise first brief. We will use it to shape a more focused formulation and manufacturing conversation.</p><div className="response-time"><span>01</span><p>Prepared for technical review<br /><strong>No generic sales loop</strong></p></div></div>
          <form className="quote-builder" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <label>01 / PRIMARY OUTCOME<select value={activeFormula.id} onChange={(e) => setActiveFormula(formulas.find((item) => item.id === e.target.value) || formulas[0])}>{formulas.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
            <label>02 / DOSAGE FORMAT<select value={format} onChange={(e) => setFormat(e.target.value)}>{formats.map((item) => <option key={item.title}>{item.title}</option>)}</select></label>
            <label>03 / INITIAL VOLUME<select value={volume} onChange={(e) => setVolume(e.target.value)}><option>Under 10k units</option><option>10k–50k units</option><option>50k–250k units</option><option>250k+ units</option></select></label>
            <div className="brief-preview"><span>YOUR PROJECT SIGNAL</span><b style={{ color: activeFormula.color }}>{activeFormula.short}</b><p>{activeFormula.label}<small>{format} / {volume}</small></p></div>
            <button type="button" onClick={copyBrief}>{submitted ? <><Check size={18} /> Brief copied</> : <><Clipboard size={18} /> Copy project brief</>}<ArrowRight size={18} /></button>
            <p className="form-note">Connect this brief to your preferred CRM, email or WhatsApp endpoint at launch.</p>
          </form>
        </div>
      </section>

      <footer><div className="shell footer-top"><a className="brand" href="#top" aria-label="Jentoor home"><img className="brand-logo" src="/brand/jentoor-white.svg" alt="Jentoor" /></a><p>Evidence-led nutrition.<br />Engineered to scale.</p><a className="back-top" href="#top">BACK TO TOP <ArrowUpRight size={16} /></a></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} JENTOOR NUTRACEUTICALS</span><span>GUANGZHOU · GLOBAL PARTNERSHIPS</span><span>PRIVACY · TERMS</span></div></footer>
    </main>
  );
}
