'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Group } from 'three';

function FormulaCapsule({ color = '#d9ff6b', compact = false }: { color?: string; compact?: boolean }) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * (compact ? 0.28 : 0.16);
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.45) * 0.08 - 0.24;
  });

  const beads = useMemo(() => Array.from({ length: compact ? 32 : 22 }, (_, index) => ({
    angle: index * 2.399,
    radius: 0.16 + (index % 5) * 0.13,
    y: -0.48 + (index % 7) * 0.14,
    size: 0.052 + (index % 3) * 0.018,
  })), [compact]);

  return (
    <Float speed={0.65} rotationIntensity={0.06} floatIntensity={0.14}>
      <group ref={group} rotation={[0.2, -0.55, -0.24]} scale={compact ? 0.83 : 1}>
        <mesh position={[0, 0.78, 0]}>
          <sphereGeometry args={[1, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial color={color} roughness={0.08} metalness={0.02} clearcoat={1} transmission={0.08} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[1, 1, 1.55, 32]} />
          <meshPhysicalMaterial color={color} roughness={0.08} clearcoat={1} transmission={0.08} />
        </mesh>
        <mesh position={[0, -0.78, 0]} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[1.01, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial color="#effbe8" roughness={0.04} transmission={0.72} thickness={1.6} transparent opacity={0.72} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[1.01, 1.01, 1.55, 32]} />
          <meshPhysicalMaterial color="#effbe8" roughness={0.04} transmission={0.72} thickness={1.6} transparent opacity={0.72} />
        </mesh>
        {beads.map((bead, index) => (
          <mesh key={index} position={[Math.cos(bead.angle) * bead.radius, bead.y, Math.sin(bead.angle) * bead.radius]}>
            <sphereGeometry args={[bead.size, 8, 8]} />
            <meshStandardMaterial color={index % 3 === 0 ? color : index % 3 === 1 ? '#f3ffad' : '#ffffff'} emissive={color} emissiveIntensity={0.35} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function FormulaCanvas({ color, compact = false }: { color?: string; compact?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      rootMargin: '180px',
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="formula-canvas-runtime">
      <Canvas
        camera={{ position: [0, 0, compact ? 5.5 : 6.2], fov: 36 }}
        dpr={[0.65, 1]}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[4, 6, 5]} intensity={5} color="#ecffd7" />
        <pointLight position={[-4, -2, 3]} intensity={16} color={color || '#00e998'} />
        <FormulaCapsule color={color} compact={compact} />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.25} minPolarAngle={1.1} maxPolarAngle={2.02} minAzimuthAngle={-0.55} maxAzimuthAngle={0.55} />
      </Canvas>
    </div>
  );
}
