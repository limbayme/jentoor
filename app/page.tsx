'use client';

import dynamic from 'next/dynamic';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clipboard,
  Globe2,
  Menu,
  Pause,
  Play,
  ShieldCheck,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const assetOrigin = (process.env.NEXT_PUBLIC_ASSET_ORIGIN || '').replace(/\/$/, '');
const assetUrl = (path: string) => `${assetOrigin}${path}`;

const FormulaCanvas = dynamic(() => import('./formula-canvas'), {
  ssr: false,
  loading: () => <div className="formula-canvas-placeholder" aria-hidden="true" />,
});

function DeferredFormulaCanvas({ color, compact = false }: { color?: string; compact?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [ready, setReady] = useState(false);
  const [useLightweightVisual, setUseLightweightVisual] = useState(false);

  useEffect(() => {
    const handle = window.requestAnimationFrame(() => {
      const nav = navigator as Navigator & { deviceMemory?: number };
      const lowPowerDevice = (nav.deviceMemory ?? 8) <= 4 || navigator.hardwareConcurrency <= 4;
      const compactViewport = window.matchMedia('(max-width: 760px), (pointer: coarse)').matches;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setUseLightweightVisual(lowPowerDevice || compactViewport || reducedMotion);
    });
    return () => window.cancelAnimationFrame(handle);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: '400px' });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport || useLightweightVisual) return;
    const browserWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (browserWindow.requestIdleCallback) {
      const handle = browserWindow.requestIdleCallback(() => setReady(true), { timeout: 1400 });
      return () => browserWindow.cancelIdleCallback?.(handle);
    }
    const handle = window.setTimeout(() => setReady(true), 500);
    return () => window.clearTimeout(handle);
  }, [nearViewport, useLightweightVisual]);

  return (
    <div ref={hostRef} className="formula-canvas-runtime">
      {ready && !useLightweightVisual ? <FormulaCanvas color={color} compact={compact} /> : <div className="formula-canvas-placeholder" style={{ '--capsule-color': color || '#d9ff6b' } as React.CSSProperties} aria-hidden="true"><i /></div>}
    </div>
  );
}

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

function ProjectSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <div className={`project-select${open ? ' is-open' : ''}`} ref={rootRef}>
      <span className="project-select-label">{label}</span>
      <button className="project-select-trigger" type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)}>
        <strong>{selected.label}</strong>
        <ChevronDown size={18} />
      </button>
      {open && (
        <div className="project-select-options" role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={option.value === value ? 'is-selected' : ''}
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <span>{option.label}</span>
              {option.value === value && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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

function ViewportVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => undefined);
      else video.pause();
    }, { rootMargin: '160px' });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return <video ref={videoRef} src={src} className={className} preload="metadata" muted loop playsInline />;
}

export default function Home() {
  const factoryVideoRef = useRef<HTMLVideoElement>(null);
  const [activeFormula, setActiveFormula] = useState(formulas[0]);
  const [format, setFormat] = useState('Capsules');
  const [volume, setVolume] = useState('10k–50k units');
  const [submitted, setSubmitted] = useState(false);
  const [isFactoryPlaying, setIsFactoryPlaying] = useState(true);
  const brief = `Jentoor project brief\nGoal: ${activeFormula.label}\nFormat: ${format}\nVolume: ${volume}`;

  const copyBrief = async () => {
    await navigator.clipboard?.writeText(brief);
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 1800);
  };

  const toggleFactoryVideo = () => {
    const video = factoryVideoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  useEffect(() => {
    const video = factoryVideoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => setIsFactoryPlaying(false));
      else video.pause();
    }, { rootMargin: '160px' });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

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
            <DeferredFormulaCanvas />
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
            <div className="lab-canvas"><DeferredFormulaCanvas color={activeFormula.color} compact /></div>
            <div className="lab-ring r1" /><div className="lab-ring r2" />
            <div className="lab-readout"><span>ACTIVE CONCEPT</span><strong>{activeFormula.label}</strong><p>FORMULA SIGNAL / <b>LIVE</b></p></div>
            <div className="lab-metric m1"><span>01</span>Outcome</div><div className="lab-metric m2"><span>02</span>Delivery</div><div className="lab-metric m3"><span>03</span>Scale</div>
          </div>
        </div>
      </section>

      <section className="factory" id="factory">
        <div className="shell factory-head"><div><p className="section-tag">04 / INSIDE THE FACTORY</p><h2>Proof lives<br /><em>in the process.</em></h2></div><p>Real production footage. Real equipment. Real visibility into the work behind every finished unit.</p></div>
        <div className="factory-reel shell">
          <video ref={factoryVideoRef} src={assetUrl('/media/production-line.mp4')} preload="metadata" muted loop playsInline poster={assetUrl('/media/production-floor.jpg')} aria-label="Jentoor production line" onClick={toggleFactoryVideo} onPlay={() => setIsFactoryPlaying(true)} onPause={() => setIsFactoryPlaying(false)} />
          <div className="video-shade" /><p className="video-index">JT / FACTORY FILM 001</p><button className={`play-disc${isFactoryPlaying ? ' is-playing' : ''}`} type="button" onClick={toggleFactoryVideo} aria-label={isFactoryPlaying ? 'Pause factory film' : 'Play factory film'}>{isFactoryPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={20} fill="currentColor" />}</button><p className="video-caption"><span>01:12</span> Precision liquid filling &amp; quality control</p>
        </div>
        <div className="factory-stills shell"><article><img src={assetUrl('/media/equipment.jpg')} loading="lazy" decoding="async" alt="Stainless steel production equipment in a clean manufacturing room" /><span>FILLING SYSTEM / 01</span></article><article className="video-card"><ViewportVideo src={assetUrl('/media/packaging-line.mp4')} /><span>PACKAGING LINE / 02</span></article><div className="factory-copy"><strong>Controlled operations.<br />Documented at every stage.</strong><p>Dry formulation, mixing, encapsulation, liquid filling, tablet compression, primary packaging, quality-unit operations and warehousing.</p></div></div>
      </section>

      <section className="standards" id="standards">
        <div className="shell standards-grid">
          <div><p className="section-tag light">05 / VERIFIED STANDARDS</p><h2>Trust should be<br /><em>visible.</em></h2><p className="standards-intro">We make qualification records accessible — so procurement and quality teams can verify before they commit.</p></div>
          <div className="certificate-list">
            <a href={assetUrl('/certificates/nsf-certificate.pdf')} target="_blank" rel="noreferrer"><span>01</span><div><b>NSF/ANSI 455-2</b><small>Guangzhou Yinglian Health Industry Co., Ltd · C0910528-HSCDS-1</small></div><strong>VALID TO 2027</strong><ArrowUpRight /></a>
            <a href={assetUrl('/certificates/factory-qualifications.pdf')} target="_blank" rel="noreferrer"><span>02</span><div><b>FDA Facility Registration</b><small>Guangzhou Jianrun Biotechnology Co., Ltd · Facility record</small></div><strong>VIEW RECORD</strong><ArrowUpRight /></a>
            <a href={assetUrl('/certificates/factory-qualifications.pdf')} target="_blank" rel="noreferrer"><span>03</span><div><b>ISO + HACCP Systems</b><small>Guangzhou Jianrun Biotechnology Co., Ltd · Qualification dossier</small></div><strong>VIEW RECORD</strong><ArrowUpRight /></a>
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
        <div className="social-cards shell"><article><ViewportVideo src={assetUrl('/media/bottling-line.mp4')} /><div><SocialGlyph kind="instagram" /> PRODUCTION NOTE 014</div></article><article><ViewportVideo src={assetUrl('/media/warehouse.mp4')} /><div><SocialGlyph kind="instagram" /> DELIVERY NOTE 021</div></article><article className="social-text"><small>FIELD NOTE / QUALITY</small><blockquote>“Visibility is not a marketing layer. It is how good manufacturing earns trust.”</blockquote><span>JENTOOR OPERATIONS</span></article></div>
      </section>

      <section className="quote" id="quote">
        <div className="shell quote-grid">
          <div className="quote-copy"><p className="section-tag light">08 / START A PROJECT</p><h2>Your next formula<br /><em>starts here.</em></h2><p>Configure a concise first brief. We will use it to shape a more focused formulation and manufacturing conversation.</p><div className="response-time"><span>01</span><p>Prepared for technical review<br /><strong>No generic sales loop</strong></p></div></div>
          <form className="quote-builder" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <ProjectSelect label="01 / PRIMARY OUTCOME" value={activeFormula.id} options={formulas.map((item) => ({ value: item.id, label: item.label }))} onChange={(value) => setActiveFormula(formulas.find((item) => item.id === value) || formulas[0])} />
            <ProjectSelect label="02 / DOSAGE FORMAT" value={format} options={formats.map((item) => ({ value: item.title, label: item.title }))} onChange={setFormat} />
            <ProjectSelect label="03 / INITIAL VOLUME" value={volume} options={['Under 10k units', '10k–50k units', '50k–250k units', '250k+ units'].map((item) => ({ value: item, label: item }))} onChange={setVolume} />
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
