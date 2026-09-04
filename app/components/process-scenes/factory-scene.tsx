'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector2 } from 'three';
import type { Group } from 'three';
import { PickRobot, ProcessPipe, Scanner, StationHalo, type Station } from './factory-modules';
import { Cylinder, Label, palette, Plinth, Ring } from './primitives';

function Bottle({ accent }: { accent: string }) {
  const profile = useMemo(() => [new Vector2(0, 0), new Vector2(0.15, 0), new Vector2(0.17, 0.04), new Vector2(0.17, 0.37), new Vector2(0.15, 0.43), new Vector2(0.085, 0.49), new Vector2(0.085, 0.56), new Vector2(0, 0.56)], []);
  return <group><mesh><latheGeometry args={[profile, 24]} /><meshStandardMaterial color={palette.cream} roughness={0.27} metalness={0.06} /></mesh>
    <Cylinder radius={0.094} height={0.075} position={[0, 0.565, 0]} color={accent} metalness={0.05} />
    <mesh position={[0, 0.23, 0]}><cylinderGeometry args={[0.173, 0.173, 0.2, 24]} /><meshStandardMaterial color={palette.green} roughness={0.6} /></mesh>
    <Label text="JT" width={0.23} position={[0, 0.24, 0.176]} rotation={[0, 0, 0]} />
  </group>;
}
function Carrier({ index, accent, paused }: { index: number; accent: string; paused: boolean }) {
  const initialPhase = index / 12 * Math.PI * 2;
  const group = useRef<Group>(null); const phase = useRef(0);
  useFrame((_, delta) => {
    if (!group.current) return;
    if (!paused) phase.current += Math.min(delta, 0.05);
    const segment = Math.floor(phase.current / 5); const t = Math.min((phase.current % 5) / 3.5, 1);
    const angle = initialPhase + (segment + t*t*(3-2*t)) * Math.PI / 6;
    group.current.position.set(Math.cos(angle) * 1.95, -0.8, Math.sin(angle) * 1.2);
    group.current.rotation.y = -angle;
  });
  return <group ref={group} position={[Math.cos(initialPhase) * 1.95, -0.8, Math.sin(initialPhase) * 1.2]}>
    <Cylinder radius={0.22} height={0.055} color={palette.metal} /><Bottle accent={accent} />
  </group>;
}
function Arch({ position, color = palette.metal }: { position: [number, number, number]; color?: string }) {
  return <group position={position}>
    {[-0.44, 0.44].map(x => <Cylinder key={x} radius={0.055} height={1.12} position={[x, -0.25, 0]} color={color} />)}
    <mesh position={[0, 0.31, 0]}><torusGeometry args={[0.44, 0.055, 8, 32, Math.PI]} /><meshStandardMaterial color={color} roughness={0.3} metalness={0.7} /></mesh>
  </group>;
}
export default function FactoryScene({ expanded, accent, paused, station = 'fill', onStationSelect }: { expanded: boolean; accent: string; paused: boolean; station?: Station; onStationSelect?: (station: Station) => void }) {
  const head = useRef<Group>(null); const cycle = useRef(0);
  useFrame((state, delta) => { if (head.current) {
    if (!paused) cycle.current += Math.min(delta, .05);
    const target = (expanded ? 0.22 : 0) + (paused ? 0 : Math.max(0, Math.sin(cycle.current * 1.6)) * .12);
    head.current.position.y += (target - head.current.position.y) * Math.min(delta * 5, 1);
    if (Math.abs(target - head.current.position.y) > 0.001) state.invalidate();
  } });
  return <group rotation={[0, 0.35, 0]} scale={0.95}>
    <Plinth radius={2.85} label="JT / CONCEPT BATCH 001" />
    <group scale={[1.625, 1, 1]}>
      <Cylinder radius={1.42} height={0.22} position={[0, -1.03, 0]} color={palette.green} />
      <Ring radius={1.2} y={-0.86} tube={0.14} color={palette.metal} />
      <Ring radius={1.37} y={-0.7} tube={0.016} color={accent} />
      <Ring radius={1.04} y={-0.7} tube={0.016} color={palette.cream} />
    </group>
    {Array.from({ length: 12 }, (_, index) => <Carrier key={index} index={index} accent={accent} paused={paused} />)}
    <group position={[-0.7, 0.45, -0.32]}>
      <Cylinder radius={0.46} height={1.04} color={palette.metal} />
      <mesh position={[0, -0.7, 0]}><cylinderGeometry args={[0.46, 0.09, 0.36, 48]} /><meshStandardMaterial color={palette.metal} metalness={0.7} roughness={0.28} /></mesh>
      <Cylinder radius={0.48} height={0.09} position={[0, 0.58, 0]} color={palette.green} />
      <Ring radius={0.44} y={0.64} tube={0.018} color={accent} />
      <Label text="BLEND / 01" width={0.7} position={[0, 0.65, 0]} />
      {[-0.35, 0.35].map(x => <Cylinder key={x} radius={0.035} height={0.9} position={[x, -1.12, 0]} />)}
    </group>
    <ProcessPipe /><PickRobot accent={accent} paused={paused} selected={station === 'pack'} /><Scanner accent={accent} paused={paused} selected={station === 'inspect'} />
    {(['blend','fill','inspect','pack'] as Station[]).map(item => <StationHalo key={item} station={item} selected={station} accent={accent} onSelect={onStationSelect} />)}
    <Arch position={[-1.65, 0.07, 0]} />
    <group ref={head}>
      <mesh position={[-1.65, 0.61, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.07, 0.07, 0.68, 16]} /><meshStandardMaterial color={palette.metal} metalness={0.7} roughness={0.3} /></mesh>
      {[-1.83, -1.49].map(x => <Cylinder key={x} radius={0.035} height={0.42} position={[x, 0.34, 0]} />)}
    </group>
    <Arch position={[1.6, 0.07, 0]} color={palette.green} />
    <group position={[1.6, 0.02, 0]}><mesh><torusGeometry args={[0.37, 0.035, 8, 48]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} /></mesh></group>
    <group position={[0.8, -0.82, -0.65]} rotation={[0, 0.6, 0]}>
      <Cylinder radius={0.035} height={1.05} />
      <mesh position={[0, 0.55, 0]}><boxGeometry args={[0.9, 0.53, 0.055]} /><meshStandardMaterial color={palette.ink} roughness={0.4} /></mesh>
      <Label text="DEMO / 001" width={0.8} position={[0, 0.66, 0.035]} rotation={[0, 0, 0]} />
      <Label text="OEM • ODM" width={0.75} position={[0, 0.44, 0.035]} rotation={[0, 0, 0]} color={palette.cream} />
    </group>
    {[-1.12, -0.59].map((x, i) => <group key={x} position={[x, -1.16, 1.75 + i * 0.12]}>
      <mesh><boxGeometry args={[0.42, 0.7, 0.3]} /><meshStandardMaterial color={palette.cream} roughness={0.7} /></mesh>
      <mesh position={[0, 0.23, 0.152]}><planeGeometry args={[0.42, 0.14]} /><meshStandardMaterial color={accent} roughness={0.6} /></mesh>
      <Label text="JT" width={0.35} position={[0, 0.08, 0.155]} rotation={[0, 0, 0]} color={palette.ink} />
      <Label text={i ? 'ODM' : 'OEM'} width={0.35} position={[0, -0.13, 0.155]} rotation={[0, 0, 0]} color={palette.ink} />
    </group>)}
    <Label text="01 / FILL" width={0.9} position={[-1.75, -1.49, 1.05]} />
    <Label text="02 / INSPECT" width={1.1} position={[1.55, -1.49, 1.15]} />
  </group>;
}
