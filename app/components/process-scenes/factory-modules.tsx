'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CatmullRomCurve3, Vector3 } from 'three';
import type { Group, Mesh } from 'three';
import { Cylinder, palette, Ring } from './primitives';
export type Station = 'blend' | 'fill' | 'inspect' | 'pack';
export function ProcessPipe() {
  const path = useMemo(()=>new CatmullRomCurve3([new Vector3(-.7,1.08,-.32),new Vector3(-.9,1.45,-.32),new Vector3(-1.65,1.4,-.1),new Vector3(-1.65,.76,0)]),[]);
  return <mesh><tubeGeometry args={[path,48,.045,10,false]}/><meshStandardMaterial color="#bfd0c5" roughness={.23} metalness={.7}/></mesh>;
}
export function PickRobot({ accent, paused, selected }: { accent: string; paused: boolean; selected: boolean }) {
  const shoulder=useRef<Group>(null), elbow=useRef<Group>(null), phase=useRef(0);
  useFrame((_,delta)=>{
    if(!paused) phase.current+=Math.min(delta,.05)*.6;
    if(shoulder.current) shoulder.current.rotation.z=.25+Math.sin(phase.current)*.28;
    if(elbow.current) elbow.current.rotation.z=-1.25+Math.sin(phase.current+.7)*.32;
  });
  return <group position={[.2,-.8,-.38]} rotation={[0,.2,0]}>
    <Cylinder radius={.28} height={.28} color={palette.green}/><Ring radius={.27} y={.15} tube={.018} color={selected?accent:palette.metal}/>
    <group ref={shoulder} position={[0,.14,0]}>
      <Joint accent={accent}/><Arm length={.66}/>
      <group position={[0,.66,0]} ref={elbow}><Joint accent={accent}/><Arm length={.62}/>
        <group position={[0,.62,0]} rotation={[0,0,.65]}>
          <Cylinder radius={.12} height={.18} color={palette.green}/>
          {[-.09,.09].map(x=><mesh key={x} position={[x,.18,0]}><boxGeometry args={[.035,.22,.07]}/><meshStandardMaterial color={palette.metal} metalness={.65} roughness={.28}/></mesh>)}
        </group>
      </group>
    </group>
  </group>;
}
function Joint({ accent }: { accent: string }) {
  return <group rotation={[Math.PI/2,0,0]}><Cylinder radius={.15} height={.23} color={palette.green}/><Cylinder radius={.075} height={.242} color={accent}/></group>;
}
function Arm({ length }: { length: number }) {
  return <group position={[0,length/2,0]}><mesh><capsuleGeometry args={[.095,length-.19,5,12]}/><meshStandardMaterial color="#c3d2c9" roughness={.27} metalness={.65}/></mesh><mesh position={[0,0,.097]}><boxGeometry args={[.06,length*.6,.008]}/><meshStandardMaterial color={palette.green}/></mesh></group>;
}
export function Scanner({ accent, paused, selected }: { accent: string; paused: boolean; selected: boolean }) {
  const band=useRef<Mesh>(null); const time=useRef(0);
  useFrame((_,delta)=>{if(!paused) time.current+=Math.min(delta,.05);if(band.current) band.current.position.y=-.35+Math.sin(time.current*1.7)*.22;});
  return <group position={[1.6,0,0]}>
    <mesh ref={band} rotation={[Math.PI/2,0,0]}><planeGeometry args={[.64,.5]}/><meshBasicMaterial color={accent} transparent opacity={selected?.2:.08} depthWrite={false} side={2}/></mesh>
    <mesh position={[0,.31,.08]}><boxGeometry args={[.17,.12,.13]}/><meshStandardMaterial color={palette.ink} metalness={.4} roughness={.3}/></mesh>
    <mesh position={[0,.28,.154]}><circleGeometry args={[.038,16]}/><meshBasicMaterial color={accent}/></mesh>
  </group>;
}
export function StationHalo({ station, selected, accent, onSelect }: { station: Station; selected: Station; accent: string; onSelect?: (station: Station) => void }) {
  const positions: Record<Station,[number,number,number]>={blend:[-.7,-.84,-.32],fill:[-1.68,-.82,0],inspect:[1.65,-.82,0],pack:[-.85,-1.5,1.8]};
  return <group position={positions[station]} onClick={event => { if (event.delta < 4) { event.stopPropagation(); onSelect?.(station); } }}><mesh position={[0,.5,0]}><cylinderGeometry args={[.48,.48,1,16]}/><meshBasicMaterial transparent opacity={0} depthWrite={false}/></mesh><Ring radius={station==='blend'?.6:.47} tube={selected===station?.022:.008} color={selected===station?accent:palette.metal}/></group>;
}
