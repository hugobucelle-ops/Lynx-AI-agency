'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { TerrainMesh } from './TerrainMesh';

function SceneFallback() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse at 50% 100%, rgba(0,207,255,0.07) 0%, transparent 60%)',
      }}
    />
  );
}

export function HeroScene() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    >
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          dpr={[1, 1.5]}
          frameloop="always"
          camera={{ position: [0, 9, 17], fov: 52 }}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: true, alpha: true }}
        >
          {/* Ambient light */}
          <ambientLight intensity={0.2} />
          {/* Cyan point light */}
          <pointLight
            position={[0, 10, 0]}
            color="#00CFFF"
            intensity={0.8}
            distance={40}
          />
          {/* Gold accent light */}
          <pointLight
            position={[8, 6, -8]}
            color="#F0B429"
            intensity={0.3}
            distance={30}
          />
          <TerrainMesh />
        </Canvas>
      </Suspense>
    </div>
  );
}
