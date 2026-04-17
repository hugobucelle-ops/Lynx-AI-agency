'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  varying float vHeight;
  varying vec2 vUv;
  varying float vDist;

  void main() {
    vHeight = position.y;
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vDist = length(worldPos.xz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uCyanColor;
  uniform vec3 uGoldColor;
  uniform float uPeakThreshold;
  uniform float uTime;

  varying float vHeight;
  varying vec2 vUv;
  varying float vDist;

  void main() {
    // Height-based color
    float peakMix = smoothstep(uPeakThreshold - 0.1, uPeakThreshold + 0.55, vHeight);
    vec3 color = mix(uCyanColor, uGoldColor, peakMix);

    // Animated glow pulse on peaks
    float pulse = 1.0 + 0.25 * sin(uTime * 2.5 + vUv.x * 8.0);
    float baseAlpha = mix(0.35, 1.0, peakMix);
    float alpha = baseAlpha * (peakMix > 0.05 ? pulse : 1.0);

    // Radial distance fade (center brighter)
    float radialFade = 1.0 - smoothstep(8.0, 18.0, vDist);

    // Edge fade UV
    float edgeFadeX = smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x);
    float edgeFadeY = smoothstep(0.0, 0.08, vUv.y) * smoothstep(1.0, 0.92, vUv.y);
    float edgeFade = edgeFadeX * edgeFadeY;

    gl_FragColor = vec4(color, alpha * edgeFade * (0.5 + 0.5 * radialFade));
  }
`;

export function TerrainMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(42, 42, 120, 120);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  const uniforms = useMemo(
    () => ({
      uCyanColor: { value: new THREE.Color('#00CFFF') },
      uGoldColor: { value: new THREE.Color('#F0B429') },
      uPeakThreshold: { value: 0.5 },
      uTime: { value: 0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!meshRef.current || !groupRef.current) return;

    const time = clock.getElapsedTime();
    uniforms.uTime.value = time;

    const positions = (meshRef.current.geometry as THREE.BufferGeometry).attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);

      const y =
        Math.sin(x * 0.3 + time * 0.8) * 1.1 +
        Math.sin(z * 0.4 + time * 0.6) * 0.75 +
        Math.sin((x + z) * 0.2 + time * 0.5) * 0.55 +
        Math.sin(x * 0.6 + z * 0.35 + time * 1.2) * 0.28 +
        Math.sin(x * 0.15 - z * 0.25 + time * 0.35) * 0.9;

      positions.setY(i, y);
    }

    positions.needsUpdate = true;
    (meshRef.current.geometry as THREE.BufferGeometry).computeVertexNormals();

    // Smooth mouse lerp
    mouseRef.current.x = THREE.MathUtils.lerp(mouseRef.current.x, mouseRef.current.targetX, 0.05);
    mouseRef.current.y = THREE.MathUtils.lerp(mouseRef.current.y, mouseRef.current.targetY, 0.05);

    groupRef.current.rotation.y = mouseRef.current.x * 0.1;
    groupRef.current.rotation.x = mouseRef.current.y * 0.04;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          wireframe={true}
          transparent={true}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
