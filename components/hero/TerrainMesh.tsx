'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  varying float vHeight;
  varying vec2 vUv;

  void main() {
    vHeight = position.y;
    vUv = uv;
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

  void main() {
    float peakMix = smoothstep(uPeakThreshold - 0.15, uPeakThreshold + 0.4, vHeight);
    vec3 color = mix(uCyanColor, uGoldColor, peakMix);

    // Pulse opacity on peaks
    float pulse = 1.0 + 0.15 * sin(uTime * 2.0);
    float baseAlpha = mix(0.28, 0.85, peakMix);
    float alpha = baseAlpha * (peakMix > 0.1 ? pulse : 1.0);

    // Fade edges
    float edgeFadeX = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
    float edgeFadeY = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.88, vUv.y);
    float edgeFade = edgeFadeX * edgeFadeY;

    gl_FragColor = vec4(color, alpha * edgeFade);
  }
`;

export function TerrainMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Track mouse globally
  if (typeof window !== 'undefined') {
    window.onmousemove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
  }

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(34, 34, 90, 90);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  const uniforms = useMemo(
    () => ({
      uCyanColor: { value: new THREE.Color('#00CFFF') },
      uGoldColor: { value: new THREE.Color('#F0B429') },
      uPeakThreshold: { value: 0.55 },
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
        Math.sin(x * 0.28 + time * 0.75) * 0.65 +
        Math.sin(z * 0.38 + time * 0.55) * 0.42 +
        Math.sin((x + z) * 0.18 + time * 0.48) * 0.32 +
        Math.sin(x * 0.55 + z * 0.3 + time * 1.1) * 0.15;

      positions.setY(i, y);
    }

    positions.needsUpdate = true;
    (meshRef.current.geometry as THREE.BufferGeometry).computeVertexNormals();

    // Smooth mouse parallax tilt
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseRef.current.x * 0.07,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseRef.current.y * 0.03,
      0.04
    );
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
