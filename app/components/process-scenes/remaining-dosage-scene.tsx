'use client';
import LiquidProductScene from './liquid-product-scene';
import { Cylinder, Label, palette, Plinth, Ring, Tablet } from './primitives';

export type RemainingDosageKind = 'powder' | 'liquid' | 'chewable' | 'lozenge';
function Sachet({ accent }: { accent: string }) {
 return <group rotation={[.08,0,-.12]}><mesh><boxGeometry args={[1.35,2.1,.17]}/><meshStandardMaterial color={palette.cream} roughness={.4} metalness={.12}/></mesh><mesh position={[0,.05,.092]}><boxGeometry args={[1.34,.68,.025]}/><meshStandardMaterial color={accent}/></mesh>{[-.96,.96].map(y=>Array.from({length:15},(_,i)=><mesh key={y+':'+i} position={[-.61+i*.086,y,.1]}><boxGeometry args={[.025,.14,.025]}/><meshStandardMaterial color={palette.metal}/></mesh>))}</group>;
}
export default function RemainingDosageScene({kind,accent,expanded}:{kind:RemainingDosageKind;accent:string;expanded:boolean}) {
 return <group rotation={[0,.15,0]}><Plinth label={'JT / '+kind.toUpperCase()+' DEVELOPMENT'}/>
 {kind==='powder'?<><group position={[-.25,expanded?.25:-.15,-.12]} rotation={[0,-.2,0]}><Sachet accent={accent}/></group><group position={[.95,-1.2,.8]}><mesh scale={[.68,.15,.48]}><sphereGeometry args={[1,28,12]}/><meshStandardMaterial color="#e8dfb9" roughness={1}/></mesh>{Array.from({length:28},(_,i)=><mesh key={i} position={[Math.cos(i*2.4)*(.15+i*.017),.07+(i%4)*.015,Math.sin(i*2.4)*(.1+i*.01)]}><icosahedronGeometry args={[.035,0]}/><meshStandardMaterial color={i%2?palette.cream:'#d2c59d'}/></mesh>)}</group><Label text="BLEND / SINGLE SERVE" position={[0,-1.47,1.45]} width={1.8}/></>
 :kind==='liquid'?<LiquidProductScene accent={accent} expanded={expanded}/>
 :<><Cylinder radius={1.35} height={.13} position={[0,-1.32,0]} color={palette.metal}/><group position={[0,expanded?.25:-1.03,0]} rotation={[.25,0,.12]} scale={kind==='lozenge'?[1.3,1,.72]:[1,1,1]}><Tablet radius={.95} height={kind==='lozenge'?.32:.4} color={accent}/>{kind==='chewable'?<><mesh position={[0,.205,0]}><boxGeometry args={[1.4,.012,.035]}/><meshStandardMaterial color={palette.green}/></mesh>{Array.from({length:20},(_,i)=><mesh key={i} position={[Math.cos(i*2.4)*(.15+i*.029),.205,Math.sin(i*2.4)*(.15+i*.029)]}><sphereGeometry args={[.018,6,4]}/><meshStandardMaterial color="#b4a57e"/></mesh>)}</>:<Ring radius={.77} y={.164} tube={.012} color={palette.cream}/>}</group><group position={[1.1,-1.15,.75]} scale={kind==='lozenge'?[.65,.55,.36]:[.5,.5,.5]}><Tablet radius={.95} height={.35} color={palette.cream}/></group><Label text={kind==='lozenge'?'LOZENGE / SENSORY STUDY':'CHEWABLE / TEXTURE STUDY'} position={[0,-1.47,1.45]} width={2}/></>}
 </group>;
}
