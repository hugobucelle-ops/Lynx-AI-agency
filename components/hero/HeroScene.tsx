'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TerrainMesh } from './TerrainMesh';
import * as THREE from 'three';

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, count } = (() => {
    const count = 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 36;
      positions[i * 3 + 1] = Math.random() * 8 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 36;
    }
    return { positions, count };
  })();

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.018;
    const pos = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      pos.setY(i, positions[i * 3 + 1] + Math.sin(t * 0.4 + i * 0.3) * 0.15);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        color="#00CFFF"
        size={0.055}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function GoldParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, count } = (() => {
    const count = 60;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = Math.random() * 6 + 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    return { positions, count };
  })();

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    pointsRef.current.rotation.y = -t * 0.012;
    const pos = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      pos.setY(i, positions[i * 3 + 1] + Math.sin(t * 0.5 + i * 0.5) * 0.2);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        color="#F0B429"
        size={0.04}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function SceneFallback() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(0,207,255,0.1) 0%, transparent 60%)',
      }}
    />
  );
}

export function HeroScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          dpr={[1, 1.5]}
          frameloop="always"
          camera={{ position: [0, 10, 18], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 12, 0]} color="#00CFFF" intensity={1.2} distance={50} />
          <pointLight position={[10, 8, -10]} color="#F0B429" intensity={0.4} distance={40} />
          <pointLight position={[-10, 6, 5]} color="#00CFFF" intensity={0.3} distance={30} />
          <TerrainMesh />
          <Particles />
          <GoldParticles />
        </Canvas>
      </Suspense>
    </div>
  );
}
