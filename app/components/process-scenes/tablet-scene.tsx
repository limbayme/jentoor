'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { Cylinder, Label, palette, Plinth, Ring, Tablet } from './primitives';

export default function TabletScene({ expanded, accent }: { expanded: boolean; accent: string }) {
  const upper = useRef<Group>(null); const layers = useRef<Group>(null);
  useFrame((state, delta) => {
    const step = Math.min(1, delta * 5);
    if (upper.current) upper.current.position.y += ((expanded ? 1.75 : 0.72) - upper.current.position.y) * step;
    if (layers.current) layers.current.scale.y += ((expanded ? 1 : 0.38) - layers.current.scale.y) * step;
    if (upper.current && Math.abs(upper.current.position.y - (expanded ? 1.75 : 0.72)) > 0.001) state.invalidate();
  });
  return <group rotation={[0, -0.35, 0]}>
    <Plinth label="JT / NUTRITION STUDY" />
    <Cylinder radius={1.45} height={0.14} position={[0, -1.38, 0]} />
    <Cylinder radius={1.1} height={0.35} position={[0, -1.15, 0]} color="#e5dfcc" metalness={0} />
    <Cylinder radius={0.92} height={0.16} position={[0, -0.77, 0]} color={palette.cream} />
    <Ring radius={1.17} y={-0.8} tube={0.025} color={palette.cream} />
    <group ref={layers} position={[0, -0.1, 0]}>
      <group position={[0, -0.37, 0]}><Tablet height={0.2} color={palette.cream} /></group>
      <group position={[0, 0.07, 0]}><Tablet height={0.25} color={accent} />
        {Array.from({ length: 36 }, (_, i) => <mesh key={i} position={[Math.cos(i * 2.399) * Math.sqrt(i / 36) * 0.69, 0.132, Math.sin(i * 2.399) * Math.sqrt(i / 36) * 0.69]}><sphereGeometry args={[0.013 + i % 3 * 0.004, 6, 4]} /><meshStandardMaterial color={i % 2 ? '#779544' : '#f9ffe4'} /></mesh>)}
      </group>
      <group position={[0, 0.53, 0]}><Tablet height={0.2} color={palette.cream} scored /></group>
    </group>
    <group ref={upper} position={[0, 1.75, 0]}>
      <group rotation={[.15, 0, -.12]}><Tablet radius={.64} height={.22} color="#e7dcc3" scored /></group>
    </group>
    <group position={[1.45, -1.31, 0.9]} rotation={[0, -0.3, 0]}><Tablet radius={0.37} height={0.15} color={accent} scored /></group>
    <Label text="FORM / 018" position={[-1.1, -1.48, 1]} width={0.95} />
  </group>;
}
