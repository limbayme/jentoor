'use client';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { CanvasTexture, Vector2, Object3D, InstancedMesh } from 'three';

export const palette = { lime: '#d9ff6b', cream: '#f4f1df', green: '#153d30', metal: '#94afa2', ink: '#08251d' };
export function Cylinder({ radius = 1, height = 0.1, color = palette.metal, position = [0, 0, 0], metalness = 0.65 }: { radius?: number; height?: number; color?: string; position?: [number, number, number]; metalness?: number }) {
  return <mesh position={position}><cylinderGeometry args={[radius, radius, height, 64]} /><meshStandardMaterial color={color} roughness={0.32} metalness={metalness} /></mesh>;
}
export function Ring({ radius, tube = 0.015, color = palette.lime, y = 0 }: { radius: number; tube?: number; color?: string; y?: number }) {
  return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}><torusGeometry args={[radius, tube, 8, 80]} /><meshStandardMaterial color={color} roughness={0.35} metalness={0.35} /></mesh>;
}
export function Tablet({ radius = 0.85, height = 0.36, color = palette.cream, scored = false }: { radius?: number; height?: number; color?: string; scored?: boolean }) {
  const profile = useMemo(() => [new Vector2(0, -height / 2), new Vector2(radius * 0.8, -height / 2), new Vector2(radius * 0.96, -height * 0.35), new Vector2(radius, -height * 0.12), new Vector2(radius, height * 0.12), new Vector2(radius * 0.96, height * 0.35), new Vector2(radius * 0.8, height / 2), new Vector2(0, height / 2)], [radius, height]);
  return <group><mesh><latheGeometry args={[profile, 64]} /><meshStandardMaterial color={color} roughness={0.47} metalness={0.03} /></mesh>{scored && <mesh position={[0, height / 2 + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[radius * 1.35, 0.018]} /><meshStandardMaterial color="#8b9973" /></mesh>}</group>;
}
// Generated local lettering: no remote fonts, scripts or texture requests.
export function Label({ text, width = 1, position = [0, 0, 0], rotation = [-Math.PI / 2, 0, 0], color = '#d9ff6b' }: { text: string; width?: number; position?: [number, number, number]; rotation?: [number, number, number]; color?: string }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 128;
    const context = canvas.getContext('2d')!;
    context.fillStyle = color; context.font = '500 40px monospace'; context.textAlign = 'center'; context.textBaseline = 'middle'; context.fillText(text, 256, 64);
    return new CanvasTexture(canvas);
  }, [text, color]);
  useEffect(() => () => texture.dispose(), [texture]);
  return <mesh position={position} rotation={rotation}><planeGeometry args={[width, width / 4]} /><meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} /></mesh>;
}
export function Plinth({ radius = 2.4, label = 'JENTOOR / DEVELOPMENT' }: { radius?: number; label?: string }) {
  return <group position={[0, -1.65, 0]}>
    <Cylinder radius={radius} height={0.16} color={palette.ink} />
    <Cylinder radius={radius - 0.05} height={0.035} position={[0, 0.1, 0]} color={palette.green} />
    <Ring radius={radius - 0.12} y={0.13} tube={0.008} color={palette.metal} />
    <Ring radius={radius - 0.42} y={0.13} tube={0.006} color={palette.metal} />
    <DialTicks radius={radius} />
    <Label text={label} width={1.8} position={[0, 0.14, radius - 0.7]} />
  </group>;
}

function DialTicks({ radius }: { radius: number }) {
  const mesh = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    const transform = new Object3D();
    for (let i = 0; i < 48; i++) {
      const angle = i / 48 * Math.PI * 2;
      transform.position.set(Math.cos(angle) * (radius - 0.23), 0.133, -Math.sin(angle) * (radius - 0.23));
      transform.rotation.y = angle; transform.scale.set(i % 4 ? 0.045 : 0.11, 0.006, 0.012);
      transform.updateMatrix(); mesh.current.setMatrixAt(i, transform.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [radius]);
  return <instancedMesh ref={mesh} args={[undefined, undefined, 48]}><boxGeometry /><meshBasicMaterial color={palette.metal} /></instancedMesh>;
}
