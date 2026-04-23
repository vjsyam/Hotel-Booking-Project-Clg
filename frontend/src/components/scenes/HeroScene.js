import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';

/* ─── The original Holographic Distorted Globe ─── */
const HolographicGlobe = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const { x, y } = state.mouse;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.1 + x * 0.6;
    meshRef.current.rotation.x = t * 0.05 + y * -0.4;
  });

  return (
    <Sphere ref={meshRef} args={[2.5, 64, 64]} scale={1.2}>
      <MeshDistortMaterial
        color="#00f2fe"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
        emissive="#00f2fe"
        emissiveIntensity={0.5}
        transparent={true}
        opacity={0.8}
      />
    </Sphere>
  );
};

/* ─── Orbiting tiny particles ─── */
const Particles = () => {
  const ref = useRef();
  const count = 200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#00f2fe" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

/* ─── Main exported scene ─── */
const HeroScene = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#e02fe2" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#00f2fe" />
        <Stars radius={100} depth={50} count={2500} factor={4} saturation={0} fade speed={1} />
        <Particles />
        <HolographicGlobe />
      </Canvas>
    </div>
  );
};

export default HeroScene;
