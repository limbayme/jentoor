'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Group } from 'three';
import TabletScene from './tablet-scene';
import DnaScene from './dna-scene';
import FactoryScene from './factory-scene';
import DosageScene from './dosage-scene';
import RemainingDosageScene from './remaining-dosage-scene';
import type { Station } from './factory-modules';

export type SceneKind = 'tablet' | 'dna' | 'factory' | 'gummy' | 'softgel' | 'film' | 'capsule' | 'powder' | 'liquid' | 'chewable' | 'lozenge';
export type SceneProps = { kind: SceneKind; expanded: boolean; accent: string; paused: boolean; diagnostics?: boolean; presentation?: 'hero' | 'object'; station?: Station; onStationSelect?: (station: Station) => void };
function Turntable({ children, paused, hero }: { children: React.ReactNode; paused: boolean; hero: boolean }) {
  const group = useRef<Group>(null); const phase = useRef(0);
  useFrame((_, delta) => { if (group.current && !paused) { phase.current += Math.min(delta, 0.05) * 0.24; group.current.rotation.y = hero ? phase.current * .45 : Math.sin(phase.current) * .18; } });
  return <group ref={group}>{children}</group>;
}
export default function SceneRuntime({ kind, expanded, accent, paused, diagnostics = false, presentation = 'object', station, onStationSelect, onUnavailable }: SceneProps & { onUnavailable: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (host.current) observer.observe(host.current);
    const onVisibility = () => setForeground(!document.hidden);
    onVisibility(); document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  return <div ref={host} style={{ width: '100%', height: '100%' }} data-scene-runtime data-active={visible && foreground} data-loop={visible && foreground ? paused ? 'demand' : 'always' : 'never'}>
    <Canvas fallback="3D is unavailable on this device." camera={{ position: [5.8, 3.5, 7.5], fov: 37 }} dpr={[0.65, 1]} frameloop={visible && foreground ? paused ? 'demand' : 'always' : 'never'} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}>
      <FitCamera hero={presentation === 'hero'} />
      <ContextHealth onUnavailable={onUnavailable} />
      {diagnostics && <FrameAudit />}
      <ambientLight intensity={presentation === 'hero' ? .55 : .9} />
      <hemisphereLight args={['#f8ffe8', '#143f32', 1.5]} />
      <directionalLight position={[3, 6, 4]} intensity={4.2} color="#fff7da" />
      <directionalLight position={[-4, 2, -3]} intensity={3.4} color="#b7ffd5" />
      <Turntable key={kind + presentation} paused={paused || dragging} hero={presentation === 'hero'}>{kind === 'tablet' ? <TabletScene expanded={expanded} accent={accent} /> : kind === 'dna' ? <DnaScene expanded={expanded} accent={accent} hero={presentation === 'hero'} /> : kind === 'factory' ? <FactoryScene expanded={expanded} accent={accent} paused={paused} station={station} onStationSelect={onStationSelect} /> : kind === 'gummy' || kind === 'softgel' || kind === 'film' ? <DosageScene kind={kind} accent={accent} expanded={expanded} /> : kind === 'powder' || kind === 'liquid' || kind === 'chewable' || kind === 'lozenge' ? <RemainingDosageScene kind={kind} accent={accent} expanded={expanded}/> : null}</Turntable>
      <OrbitControls onStart={() => setDragging(true)} onEnd={() => setDragging(false)} enableZoom={false} enablePan={false} minPolarAngle={0.7} maxPolarAngle={1.6} rotateSpeed={0.45} target={[0, 0.1, 0]} />
    </Canvas>
  </div>;
}

function ContextHealth({ onUnavailable }: { onUnavailable: () => void }) {
  const canvas = useThree(state => state.gl.domElement);
  useEffect(() => {
    canvas.addEventListener('webglcontextlost', onUnavailable);
    return () => canvas.removeEventListener('webglcontextlost', onUnavailable);
  }, [canvas, onUnavailable]);
  return null;
}
// Opt-in preview diagnostics; no per-frame DOM writes in production integrations.
function FrameAudit() {
  const frames = useRef(0);
  useFrame(state => {
    frames.current++;
    if (frames.current % 15 !== 0) return;
    state.gl.domElement.setAttribute('data-frames', String(frames.current));
    state.gl.domElement.setAttribute('data-draw-calls', String(state.gl.info.render.calls));
    state.gl.domElement.setAttribute('data-triangles', String(state.gl.info.render.triangles));
    state.gl.domElement.setAttribute('data-dpr', String(state.gl.getPixelRatio()));
  });
  return null;
}

function FitCamera({ hero }: { hero: boolean }) {
  const camera = useThree(state => state.camera);
  const size = useThree(state => state.size);
  const invalidate = useThree(state => state.invalidate);
  useLayoutEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    camera.position.setLength(10.1 * Math.max(1, (hero ? .68 : 1.05) / aspect));
    camera.updateProjectionMatrix(); invalidate();
  }, [camera, size.width, size.height, hero, invalidate]);
  return null;
}
