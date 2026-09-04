'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { SceneVariant } from './formula-canvas';

const FormulaCanvas = dynamic(() => import('./formula-canvas'), { ssr: false });
const HeroCapsule = dynamic(() => import('./hero-capsule'), { ssr: false });

export default function DeferredScene({ variant, color = '#d9ff6b', compact = false }: { variant: SceneVariant | 'capsule'; color?: string; compact?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null); const [near, setNear] = useState(false); const [ready, setReady] = useState(false); const [light, setLight] = useState(false);
  useEffect(() => { const handle = requestAnimationFrame(() => { const nav = navigator as Navigator & { deviceMemory?: number }; setLight((nav.deviceMemory ?? 8) <= 4 || navigator.hardwareConcurrency <= 4 || matchMedia('(max-width:760px),(pointer:coarse),(prefers-reduced-motion:reduce)').matches); }); return () => cancelAnimationFrame(handle); }, []);
  useEffect(() => { const el = hostRef.current; if (!el) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setNear(true); observer.disconnect(); } }, { rootMargin: '400px' }); observer.observe(el); return () => observer.disconnect(); }, []);
  useEffect(() => { if (!near || light) return; const browserWindow = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (h: number) => void }; if (browserWindow.requestIdleCallback) { const h = browserWindow.requestIdleCallback(() => setReady(true), { timeout: 1200 }); return () => browserWindow.cancelIdleCallback?.(h); } const h = setTimeout(() => setReady(true), 400); return () => clearTimeout(h); }, [near, light]);
  return <div ref={hostRef} className="formula-canvas-runtime">{ready && !light ? variant === 'capsule' ? <HeroCapsule compact={compact} /> : <FormulaCanvas variant={variant} color={color} compact={compact} /> : <div className="formula-canvas-placeholder" data-scene={variant} style={{ '--scene-color': color } as CSSProperties} aria-hidden="true"><i /><b /><em /></div>}</div>;
}
