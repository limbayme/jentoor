'use client';
import { useEffect, useMemo } from 'react';
import { BufferGeometry, CanvasTexture, Float32BufferAttribute, SRGBColorSpace, Vector2 } from 'three';
import { Cylinder, Ring } from './primitives';

// Smooth, closed packaging profiles, with a local curved label texture.
function BrandLabel({ accent }: { accent: string }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas'); canvas.width = 768; canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#123e31'; ctx.fillRect(0, 0, 768, 1024);
    ctx.strokeStyle = '#718777'; ctx.lineWidth = 2; ctx.strokeRect(46, 46, 676, 932);
    ctx.textAlign = 'center'; ctx.fillStyle = '#f3efdb';
    ctx.font = 'italic 600 92px Georgia'; ctx.fillText('jentoor', 384, 240);
    ctx.fillStyle = accent; ctx.fillRect(344, 328, 80, 5);
    ctx.font = '30px monospace'; ctx.fillText('LIQUID FORMULA', 384, 440);
    ctx.font = '64px Georgia'; ctx.fillStyle = '#f3efdb'; ctx.fillText('Daily Ritual', 384, 554);
    ctx.font = '24px monospace'; ctx.fillStyle = '#b8c8b7'; ctx.fillText('FORMULATION STUDY', 384, 653);
    ctx.beginPath(); ctx.moveTo(128, 790); ctx.lineTo(640, 790); ctx.stroke();
    ctx.font = '26px monospace'; ctx.fillStyle = '#f3efdb'; ctx.fillText('JT / 01', 384, 875);
    const map = new CanvasTexture(canvas); map.colorSpace = SRGBColorSpace; map.anisotropy = 4; return map;
  }, [accent]);
  useEffect(() => () => texture.dispose(), [texture]);
  const geometry = useMemo(() => {
    const vertices:number[]=[],uv:number[]=[],indices:number[]=[];
    for(let y=0;y<2;y++)for(let i=0;i<=48;i++){
      const u=i/48, a=(u-.5)*1.85+.56;
      vertices.push(Math.sin(a)*.588,.43+y*1.39,Math.cos(a)*.588); uv.push(u,y);
      if(y===0&&i<48){const k=i;indices.push(k,k+1,k+49,k+1,k+50,k+49);}
    }
    const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute(vertices,3));g.setAttribute('uv',new Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();return g;
  },[]);
  return <mesh geometry={geometry}><meshStandardMaterial map={texture} roughness={.62} metalness={0}/></mesh>;
}
export default function LiquidProductScene({accent,expanded}:{accent:string;expanded:boolean}) {
  const body=useMemo(()=>[[0,0],[.38,0],[.5,.025],[.557,.07],[.579,.14],[.583,.25],[.583,1.89],[.578,1.99],[.56,2.08],[.522,2.16],[.458,2.24],[.377,2.31],[.308,2.37],[.285,2.43],[.282,2.58],[0,2.58]].map(([r,y])=>new Vector2(r,y)),[]);
  const cap=useMemo(()=>[[0,0],[.30,0],[.327,.025],[.335,.055],[.335,.30],[.325,.33],[.29,.345],[0,.345]].map(([r,y])=>new Vector2(r,y)),[]);
  const cup=useMemo(()=>[[0,.035],[.27,.035],[.29,.065],[.342,.62],[.335,.655],[.305,.655],[.30,.62],[.254,.1],[0,.1]].map(([r,y])=>new Vector2(r,y)),[]);
  return <group>
    <group position={[-.36,-1.48,-.15]}>
      <mesh><latheGeometry args={[body,96]}/><meshPhysicalMaterial color="#eee9d9" roughness={.31} metalness={.02} clearcoat={.55} clearcoatRoughness={.25}/></mesh>
      <BrandLabel accent={accent}/>
      <Ring radius={.286} y={2.46} tube={.017} color="#b6a16f"/>
      <group position={[0,2.49+(expanded?.1:0),0]}>
        <mesh><latheGeometry args={[cap,80]}/><meshPhysicalMaterial color="#103c2f" roughness={.3} metalness={.12} clearcoat={.4}/></mesh>
        <Ring radius={.332} y={.047} tube={.008} color="#bea879"/>
        <Cylinder radius={.24} height={.005} position={[0,.347,0]} color="#204b3b" metalness={.12}/>
      </group>
    </group>
    <group position={[.93,-1.45,.54]} rotation={[0,.1,0]}>
      <mesh><latheGeometry args={[cup,64]}/><meshPhysicalMaterial color="#dbece2" transparent opacity={.31} roughness={.12} metalness={.03} clearcoat={1} depthWrite={false}/></mesh>
      <Cylinder radius={.278} height={.24} position={[0,.22,0]} color="#a97531" metalness={.02}/>
      <Ring radius={.322} y={.643} tube={.015} color="#cfdbcb"/>
      {[.24,.37,.5].map((y,i)=><mesh key={y} position={[.17,y,.276]} rotation={[0,.55,0]}><boxGeometry args={[i===2?.12:.08,.01,.006]}/><meshStandardMaterial color="#e6eddf" roughness={.6}/></mesh>)}
    </group>
  </group>;
}
