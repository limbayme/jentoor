'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferGeometry, Float32BufferAttribute, DoubleSide, Vector3, Quaternion, CatmullRomCurve3 } from 'three';
import type { Group } from 'three';
import { Cylinder, Label, palette, Plinth, Ring } from './primitives';

function Ribbon({ offset, color }: { offset: number; color: string }) {
  const geometry = useMemo(() => {
    const positions: number[] = []; const indices: number[] = [];
    for (let i = 0; i <= 160; i++) {
      const t = i / 160; const angle = t * Math.PI * 4.2 + offset;
      for (const edge of [-1, 1]) {
        const a = angle;
        positions.push(Math.cos(a) * 0.83, t * 3.35 - 1.2 + edge * 0.14, Math.sin(a) * 0.83);
      }
      if (i < 160) { const k = i * 2; indices.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
    }
    const g = new BufferGeometry(); g.setAttribute('position', new Float32BufferAttribute(positions, 3)); g.setIndex(indices); g.computeVertexNormals(); return g;
  }, [offset]);
  const curve = useMemo(() => new CatmullRomCurve3(Array.from({length:161},(_,i) => {const t=i/160,a=t*Math.PI*4.2+offset;return new Vector3(Math.cos(a)*.83,t*3.35-1.2,Math.sin(a)*.83);})),[offset]);
  return <group><mesh geometry={geometry}><meshPhysicalMaterial color={color} metalness={0.3} roughness={0.26} clearcoat={0.65} side={DoubleSide} /></mesh><mesh><tubeGeometry args={[curve,160,.045,8,false]}/><meshPhysicalMaterial color={color} roughness={.2} metalness={.2} clearcoat={.7}/></mesh></group>;
}
function Pair({ index, accent }: { index: number; accent: string }) {
  const angle = index / 25 * Math.PI * 4.2;
  const rotation = useMemo(() => new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), new Vector3(Math.cos(angle), 0, Math.sin(angle))), [angle]);
  return <group position={[0, index / 25 * 3.35 - 1.2, 0]}>
    <mesh quaternion={rotation} position={[Math.cos(angle) * 0.4, 0, Math.sin(angle) * 0.4]}><cylinderGeometry args={[0.032, 0.032, 0.77, 8]} /><meshStandardMaterial color={index % 2 ? accent : palette.cream} roughness={0.4} /></mesh>
    <mesh quaternion={rotation} position={[-Math.cos(angle) * 0.4, 0, -Math.sin(angle) * 0.4]}><cylinderGeometry args={[0.032, 0.032, 0.77, 8]} /><meshStandardMaterial color={index % 2 ? palette.cream : '#77b395'} roughness={0.4} /></mesh>
  </group>;
}
export default function DnaScene({ expanded, accent, hero = false }: { expanded: boolean; accent: string; hero?: boolean }) {
  const structure = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!structure.current) return;
    const target = expanded ? 1 : 0.78;
    structure.current.scale.y += (target - structure.current.scale.y) * Math.min(delta * 5, 1);
    if (Math.abs(target - structure.current.scale.y) > 0.001) state.invalidate();
  });
  return <group rotation={hero ? [.1, -.2, -.45] : [0, -.25, 0]} scale={hero ? 1.35 : 1} position={hero ? [0, -.5, 0] : [0,0,0]}>
    {!hero && <Plinth label="JT / FORMULA INTELLIGENCE" />}
    {!hero && <group><Cylinder radius={1.13} height={0.16} position={[0, -1.36, 0]} color={palette.metal} />
    <Ring radius={0.98} y={-1.26} tube={0.03} color={accent} /></group>}
    <group ref={structure}>
      <Ribbon offset={0} color={accent} /><Ribbon offset={Math.PI} color={palette.cream} />
      {Array.from({ length: 26 }, (_, i) => <Pair key={i} index={i} accent={accent} />)}
      {!hero && <group><Ring radius={1.02} y={2.22} tube={0.025} color={palette.metal} />
      <Label text="FORMULA / 009" width={1.3} position={[0, 2.23, 0]} /></group>}
    </group>
    {!hero && <group><group position={[-1.55, -0.45, 0.2]} rotation={[0, 0.6, 0]}>
      <Cylinder radius={0.045} height={1.9} position={[0, 0, 0]} />
      <mesh position={[0, 0.45, 0]}><boxGeometry args={[0.85, 0.58, 0.045]} /><meshStandardMaterial color={palette.green} metalness={0.4} roughness={0.3} /></mesh>
      <Label text="BRIEF / 09" width={0.76} position={[0, 0.57, 0.03]} rotation={[0, 0, 0]} />
      <Label text="OEM + ODM" width={0.7} position={[0, 0.34, 0.03]} rotation={[0, 0, 0]} color={palette.cream} />
    </group>
    <group position={[1.45, -1.22, 0.25]}>
      <Cylinder radius={0.37} height={0.42} color={palette.cream} metalness={0.05} />
      <Cylinder radius={0.38} height={0.09} position={[0, 0.25, 0]} color={accent} metalness={0.1} />
      <Label text="JT / R&D" width={0.55} position={[0, 0.3, 0]} color={palette.ink} />
    </group>
    <Ring radius={1.25} y={0.1} tube={0.007} color={palette.metal} /></group>}
  </group>;
}
