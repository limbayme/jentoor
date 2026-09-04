'use client';
import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import type { SceneProps } from './scene-runtime';
import styles from './scenes.module.css';
import FormatStill from './format-still';
const Runtime = lazy(() => import('./scene-runtime'));
const OriginalCapsule = lazy(() => import('./original-capsule'));
function Still({ kind }: Pick<SceneProps, 'kind'>) {
  if (kind === 'capsule' || kind === 'gummy' || kind === 'softgel' || kind === 'film' || kind === 'powder' || kind === 'liquid' || kind === 'chewable' || kind === 'lozenge') return <div className={styles.still}><FormatStill kind={kind} /></div>;
  return <div className={styles.still} aria-label={kind + ' static process illustration'}>
    <svg viewBox="0 0 500 360" className={styles.illustration} aria-hidden="true">
      <ellipse cx="250" cy="282" rx="175" ry="52" fill="#09281f" stroke="#8da891" strokeWidth="1" />
      <ellipse cx="250" cy="279" rx="158" ry="42" fill="none" stroke="#8da891" strokeWidth=".5" />
      {kind === 'tablet' ? <g>
        <path d="M150 270V83M350 270V83" stroke="#8da891" strokeWidth="7" />
        <ellipse cx="250" cy="74" rx="83" ry="22" fill="#153d30" stroke="#d9ff6b" strokeWidth="3" />
        <path d="M225 78v33h50V78" fill="#94afa2" />
        <ellipse cx="250" cy="119" rx="65" ry="18" fill="#94afa2" />
        {[177,214,251].map((y,i) => <g key={y}><path d={'M184 '+y+'v12a66 20 0 0 0 132 0v-12'} fill={i === 1 ? '#b5ce72' : '#b7c4a8'} /><ellipse cx="250" cy={y} rx="66" ry="20" fill={i === 1 ? '#d9ff6b' : '#f4f1df'} /></g>)}
        <path d="M211 173l75 8" stroke="#8da891" />
      </g> : kind === 'dna' ? <g>
        {Array.from({length:17},(_,i) => { const y=65+i*12; const x=250+Math.sin(i/16*Math.PI*4)*65; return <path key={i} d={'M'+x+' '+y+'H'+(500-x)} stroke={i%2 ? '#d9ff6b' : '#94afa2'} strokeWidth="4" />; })}
        <path d="M250 65C365 100 135 130 250 161S365 224 250 257" fill="none" stroke="#d9ff6b" strokeWidth="13" />
        <path d="M250 65C135 100 365 130 250 161S135 224 250 257" fill="none" stroke="#f4f1df" strokeWidth="13" />
      </g> : <g>
        <ellipse cx="250" cy="237" rx="151" ry="49" fill="none" stroke="#94afa2" strokeWidth="18" />
        <path d="M145 228V137a29 29 0 0 1 58 0v51M320 224V144a29 29 0 0 1 58 0v69" fill="none" stroke="#94afa2" strokeWidth="6" />
        <rect x="223" y="107" width="59" height="76" rx="20" fill="#94afa2" /><ellipse cx="252" cy="110" rx="29" ry="9" fill="#153d30" stroke="#d9ff6b" />
        {[125,189,254,321,377].map((x,i) => <g key={x} transform={'translate('+x+' '+(i===0 || i===4 ? 217 : 249)+')'}><path d="M-10 0v-30q0-7 6-9v-8h8v8q6 2 6 9V0Z" fill="#f4f1df" /><path d="M-10-24h20v15h-20Z" fill="#153d30" /><path d="M-5-47h10" stroke="#d9ff6b" strokeWidth="5" /></g>)}
        <circle cx="350" cy="177" r="23" fill="none" stroke="#d9ff6b" strokeWidth="3" />
      </g>}
      <text x="250" y="325" textAnchor="middle" fill="#d9ff6b" fontFamily="monospace" fontSize="10">JENTOOR / OEM + ODM</text>
    </svg>
  </div>;
}
class SceneBoundary extends Component<{ children: React.ReactNode; fallback: React.ReactNode; onUnavailable: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
export default function DeferredProcessScene({ onModeChange, ...props }: SceneProps & { onModeChange?: (interactive: boolean) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [capsuleActive, setCapsuleActive] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setCapsuleActive(entry.isIntersecting && !document.hidden));
    const visible = () => { if (document.hidden) setCapsuleActive(false); else { observer.disconnect(); if (host.current) observer.observe(host.current); } };
    if (host.current) observer.observe(host.current); document.addEventListener('visibilitychange', visible);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visible); };
  }, []);
  const [failed, setFailed] = useState(false);
  const unavailable = useCallback(() => setFailed(true), []);
  const interactive = ready && !failed;
  useEffect(() => { onModeChange?.(interactive); }, [interactive, onModeChange]);
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const media = matchMedia('(max-width: 760px), (pointer: coarse), (prefers-reduced-motion: reduce)');
    const lowPower = (nav.deviceMemory ?? 8) <= 4 || (nav.hardwareConcurrency || 8) <= 4 || !!nav.connection?.saveData;
    let idle: number | undefined; let timer: number | undefined;
    const browser = window as Window & { requestIdleCallback?: (callback: () => void, options: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || lowPower || media.matches) return;
      if (browser.requestIdleCallback) idle = browser.requestIdleCallback(() => setReady(true), { timeout: 1400 });
      else timer = window.setTimeout(() => setReady(true), 300);
      observer.disconnect();
    }, { rootMargin: '240px' });
    const observe = () => { observer.disconnect(); if (idle !== undefined) browser.cancelIdleCallback?.(idle); window.clearTimeout(timer); setReady(false); if (host.current) observer.observe(host.current); };
    observe(); media.addEventListener('change', observe);
    return () => { observer.disconnect(); media.removeEventListener('change', observe); if (idle !== undefined) browser.cancelIdleCallback?.(idle); window.clearTimeout(timer); };
  }, []);
  return <div className={styles.host} ref={host} role="img" aria-label={props.kind + ' manufacturing concept. Drag to rotate when 3D is available.'}>
    <SceneBoundary onUnavailable={unavailable} fallback={<Still kind={props.kind} />}>{!interactive && <Still kind={props.kind} />}{interactive && <div className={styles.runtime}><Suspense fallback={<Still kind={props.kind} />}>{props.kind === 'capsule' ? capsuleActive ? <OriginalCapsule color={props.accent} /> : <Still kind="capsule" /> : <Runtime {...props} onUnavailable={unavailable} />}</Suspense></div>}</SceneBoundary>
  </div>;
}
