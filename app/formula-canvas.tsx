'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Group, Mesh } from 'three';

export type SceneVariant = 'dna' | 'tablet' | 'factory';

function DnaScene({ color }: { color: string }) {
  const group = useRef<Group>(null);
  const pairs = useMemo(() => Array.from({ length: 19 }, (_, i) => ({ y: (i - 9) * .22, angle: i * .62 })), []);
  useFrame((state, delta) => { if (group.current) { group.current.rotation.y += delta * .16; group.current.rotation.z = Math.sin(state.clock.elapsedTime * .35) * .08 - .12; } });
  return <Float speed={.55} rotationIntensity={.04} floatIntensity={.12}><group ref={group} rotation={[.05, -.35, -.12]}>
    {pairs.map(({ y, angle }, i) => {
      const x = Math.cos(angle) * .78; const z = Math.sin(angle) * .78;
      return <group key={i} position={[0, y, 0]} rotation={[0, -angle, 0]}>
        <mesh position={[x, 0, z]}><sphereGeometry args={[.11, 12, 12]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={.5} /></mesh>
        <mesh position={[-x, 0, -z]}><sphereGeometry args={[.11, 12, 12]} /><meshStandardMaterial color={i % 2 ? '#8fffd1' : '#f4fff0'} emissive="#20dca0" emissiveIntensity={.3} /></mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.018, .018, 1.56, 6]} /><meshStandardMaterial color="#b6d6ca" transparent opacity={.48} /></mesh>
      </group>;
    })}
    <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.38, .012, 6, 80]} /><meshBasicMaterial color={color} transparent opacity={.32} /></mesh>
    <mesh rotation={[Math.PI / 2.6, .4, 0]}><torusGeometry args={[1.8, .008, 6, 80]} /><meshBasicMaterial color="#78f6c2" transparent opacity={.2} /></mesh>
  </group></Float>;
}

function TabletScene({ color, compact }: { color: string; compact: boolean }) {
  const group = useRef<Group>(null);
  const particles = useMemo(() => Array.from({ length: compact ? 18 : 26 }, (_, i) => ({ angle: i * 2.17, radius: 1.25 + i % 4 * .2, y: -.9 + i % 7 * .3, size: .025 + i % 3 * .012 })), [compact]);
  useFrame((state, delta) => { if (group.current) { group.current.rotation.y += delta * .22; group.current.rotation.x = -.42 + Math.sin(state.clock.elapsedTime * .45) * .05; } });
  return <Float speed={.7} rotationIntensity={.06} floatIntensity={.18}><group ref={group} rotation={[-.42, -.48, .12]} scale={compact ? .9 : 1}>
    <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[1.25, 1.25, .36, 48]} /><meshPhysicalMaterial color={color} roughness={.2} clearcoat={.8} /></mesh>
    <mesh position={[0, .19, 0]} rotation={[0, 0, -.32]}><boxGeometry args={[2.05, .035, .055]} /><meshStandardMaterial color="#17483c" transparent opacity={.72} /></mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.27, .035, 10, 64]} /><meshStandardMaterial color="#f3ffcd" emissive={color} emissiveIntensity={.18} /></mesh>
    {particles.map((p, i) => <mesh key={i} position={[Math.cos(p.angle) * p.radius, p.y, Math.sin(p.angle) * p.radius]}><sphereGeometry args={[p.size, 7, 7]} /><meshBasicMaterial color={i % 3 ? '#fff' : color} transparent opacity={.7} /></mesh>)}
  </group></Float>;
}

function FactoryScene({ color }: { color: string }) {
  const group = useRef<Group>(null);
  const refs = useRef<Array<Mesh | null>>([]);
  const products = useMemo(() => Array.from({ length: 8 }, (_, i) => -2.4 + i * .7), []);
  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y = Math.sin(state.clock.elapsedTime * .24) * .07 - .2;
    refs.current.forEach(mesh => { if (mesh) { mesh.position.x += delta * .48; if (mesh.position.x > 2.65) mesh.position.x = -2.65; mesh.rotation.y += delta * .5; } });
  });
  return <group ref={group} rotation={[-.06, -.2, 0]} position={[0, -.25, 0]}>
    <mesh position={[0, -.5, 0]}><boxGeometry args={[5.6, .22, 1.25]} /><meshStandardMaterial color="#173f38" metalness={.65} roughness={.35} /></mesh>
    <mesh position={[0, -.35, 0]}><boxGeometry args={[5.25, .08, 1.02]} /><meshStandardMaterial color="#5d8078" metalness={.8} roughness={.25} /></mesh>
    {[-2.35, 2.35].map(x => <mesh key={x} position={[x, -1.05, 0]}><boxGeometry args={[.16, 1.05, .9]} /><meshStandardMaterial color="#496b64" metalness={.7} /></mesh>)}
    <mesh position={[-1.35, .35, 0]}><boxGeometry args={[1.15, 1.65, 1.45]} /><meshStandardMaterial color="#dfece5" metalness={.45} roughness={.28} /></mesh>
    <mesh position={[-1.35, .45, .74]}><boxGeometry args={[.7, .62, .035]} /><meshStandardMaterial color="#082f29" emissive="#0d7d66" emissiveIntensity={.35} /></mesh>
    <mesh position={[-1.35, 1.36, 0]}><cylinderGeometry args={[.5, .24, .68, 24]} /><meshStandardMaterial color="#a9c7bd" metalness={.65} /></mesh>
    <mesh position={[1.5, .12, 0]}><boxGeometry args={[1.05, 1.2, 1.38]} /><meshStandardMaterial color="#b8cec6" metalness={.55} roughness={.28} /></mesh>
    {[0,1,2].map(i => <mesh key={i} position={[1.18 + i * .31, .38, .72]}><sphereGeometry args={[.055, 9, 9]} /><meshStandardMaterial color={i === 0 ? color : i === 1 ? '#60f4b8' : '#ffcc66'} emissive={i === 0 ? color : '#1fb981'} emissiveIntensity={1} /></mesh>)}
    {products.map((x, i) => <mesh key={i} ref={mesh => { refs.current[i] = mesh; }} position={[x, -.16, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.17, .17, .08, 18]} /><meshStandardMaterial color={i % 2 ? color : '#efffe8'} emissive={color} emissiveIntensity={.15} /></mesh>)}
    <mesh position={[0, .58, -.8]}><boxGeometry args={[5.5, .05, .05]} /><meshBasicMaterial color={color} transparent opacity={.42} /></mesh>
  </group>;
}

export default function FormulaCanvas({ variant = 'dna', color = '#d9ff6b', compact = false }: { variant?: SceneVariant; color?: string; compact?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null); const [visible, setVisible] = useState(false);
  useEffect(() => { const el = containerRef.current; if (!el) return; const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '180px' }); observer.observe(el); return () => observer.disconnect(); }, []);
  return <div ref={containerRef} className="formula-canvas-runtime"><Canvas camera={{ position: variant === 'factory' ? [0, 1, 7.2] : [0, 0, compact ? 5.5 : 6.2], fov: variant === 'factory' ? 35 : 36 }} dpr={[.65, 1]} frameloop={visible ? 'always' : 'never'} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
    <ambientLight intensity={variant === 'factory' ? 1.8 : 1.4} /><directionalLight position={[4, 6, 5]} intensity={4.5} color="#ecffd7" /><pointLight position={[-4, -2, 3]} intensity={14} color={color} />
    {variant === 'dna' && <DnaScene color={color} />}{variant === 'tablet' && <TabletScene color={color} compact={compact} />}{variant === 'factory' && <FactoryScene color={color} />}
    <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={.22} minPolarAngle={1.05} maxPolarAngle={2.05} minAzimuthAngle={-.55} maxAzimuthAngle={.55} />
  </Canvas></div>;
}
