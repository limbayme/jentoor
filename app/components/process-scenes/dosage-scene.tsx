'use client';
import { useMemo } from 'react';
import { BufferGeometry, DoubleSide, Float32BufferAttribute, Shape } from 'three';
import { Cylinder, Label, palette, Plinth, Ring, Tablet } from './primitives';

export type DosageKind = 'gummy' | 'softgel' | 'film';
function Gummy({ accent }: { accent: string }) {
  const shape = useMemo(() => {
    const s = new Shape(); const r = 0.68; const k = 0.32;
    s.moveTo(-r + k, -r); s.lineTo(r - k, -r); s.quadraticCurveTo(r, -r, r, -r + k);
    s.lineTo(r, r - k); s.quadraticCurveTo(r, r, r - k, r); s.lineTo(-r + k, r);
    s.quadraticCurveTo(-r, r, -r, r - k); s.lineTo(-r, -r + k); s.quadraticCurveTo(-r, -r, -r + k, -r); return s;
  }, []);
  return <group rotation={[-Math.PI / 2, 0, 0]}>
    <mesh><extrudeGeometry args={[shape, { depth: 0.3, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: 0.13, bevelThickness: 0.13, curveSegments: 12 }]} /><meshPhysicalMaterial color={accent} roughness={0.23} metalness={0.03} clearcoat={0.9} clearcoatRoughness={0.2} /></mesh>
  </group>;
}
function Softgel({ accent }: { accent: string }) {
  return <group rotation={[0.1, 0.5, -0.2]}>
    <mesh scale={[0.49, 0.32, 0.91]}><sphereGeometry args={[1, 40, 24]} /><meshPhysicalMaterial color={accent} roughness={0.18} metalness={0.1} clearcoat={1} clearcoatRoughness={0.12} /></mesh>
    <group scale={[0.49, 1, 0.91]}><Ring radius={1} y={0} tube={0.008} color="#c2d0a2" /></group>
  </group>;
}
function Film({ accent }: { accent: string }) {
  const geometry = useMemo(() => {
    const p: number[] = []; const uv: number[] = []; const indices: number[] = [];
    const n = 24;
    for (let z = 0; z <= n; z++) for (let x = 0; x <= n; x++) {
      const u=x/n, v=z/n;
      p.push((u-.5)*2.05, Math.sin(u*Math.PI*1.4+v*1.5)*.2 + Math.pow(u,4)*.22, (v-.5)*1.42); uv.push(u,v);
      if(x<n && z<n){const k=z*(n+1)+x;indices.push(k,k+1,k+n+1,k+1,k+n+2,k+n+1);}
    }
    const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute(p,3));g.setAttribute('uv',new Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();return g;
  }, []);
  return <mesh geometry={geometry}><meshPhysicalMaterial color={accent} metalness={0.05} roughness={0.32} clearcoat={0.65} side={DoubleSide} transparent opacity={0.88} /></mesh>;
}
export default function DosageScene({ kind, accent, expanded }: { kind: DosageKind; accent: string; expanded: boolean }) {
  return <group rotation={[0, 0.15, 0]}>
    <Plinth label={kind === 'gummy' ? 'JT / GUMMY DEVELOPMENT' : kind === 'softgel' ? 'JT / SOFTGEL DEVELOPMENT' : 'JT / ORAL FILM DEVELOPMENT'} />
    {kind === 'gummy' ? <>
      <Cylinder radius={1.48} height={0.14} position={[0,-1.34,0]} color={palette.metal} />
      {[-.67,.67].flatMap(x=>[-.67,.67].map(z=><group key={x+':'+z} position={[x,-1.24,z]}><Cylinder radius={.43} height={.025} color={palette.ink} /><Ring radius={.42} tube={.02} /></group>))}
      <group position={[0,expanded ? .55 : -.15,0]} rotation={[0,.4,.18]}><Gummy accent={accent} /><Label text="JT" position={[0,.44,0]} width={.7} color={palette.ink} /></group>
      <group position={[1.18,-1.25,.9]} scale={.45}><Gummy accent="#e8aa58" /></group>
      <Label text="MOULD / G–01" position={[-.9,-1.48,1.4]} width={1.1} />
    </> : kind === 'softgel' ? <>
      <Cylinder radius={.92} height={.12} position={[0,-1.34,0]} color={palette.metal} />
      <Cylinder radius={.85} height={.72} position={[0,-.94,0]} color={palette.cream} metalness={.05} />
      <Cylinder radius={.7} height={.028} position={[0,-.56,0]} color={palette.ink} />
      <Ring radius={.76} tube={.055} y={-.54} color={palette.metal} />
      <group position={[0,expanded ? .45 : -.15,0]} rotation={[.3,0,.3]}><Softgel accent={accent} /></group>
      <group position={[1.25,-1.18,.8]} scale={.6}><Softgel accent="#d3a749" /></group>
      <group position={[-1.2,-1.22,.7]} rotation={[0,0,.16]}><Tablet radius={.6} height={.12} color={palette.green} /></group>
      <Label text="SOFTGEL / SG–01" position={[0,-1.48,1.4]} width={1.5} />
    </> : <>
      <mesh position={[0,-1.25,0]} rotation={[0,.08,0]}><boxGeometry args={[2.5,.045,1.85]} /><meshStandardMaterial color={palette.cream} metalness={.15} roughness={.35} /></mesh>
      {[-1.17,1.17].map(x=>Array.from({length:15},(_,i)=><mesh key={x+':'+i} position={[x,-1.219,-.8+i*.115]}><boxGeometry args={[.11,.008,.025]} /><meshStandardMaterial color={palette.metal} roughness={.4} /></mesh>))}
      <Label text="JENTOOR / FILM–01" position={[0,-1.218,.62]} width={1.5} color={palette.ink} />
      <group position={[0,expanded ? .2 : -.9,0]} rotation={[0,-.25,.15]}><Film accent={accent} /></group>
      <Label text="INDIVIDUAL SACHET" position={[0,-1.48,1.5]} width={1.65} />
    </>}
  </group>;
}
