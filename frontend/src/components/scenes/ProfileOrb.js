import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const Orb = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const { x, y } = state.mouse;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15 + y * -0.4;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25 + x * 0.4;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshStandardMaterial
        color="#818cf8"
        wireframe
        emissive="#818cf8"
        emissiveIntensity={0.6}
        transparent
        opacity={0.8}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
};

const ProfileOrb = () => {
  return (
    <div style={{ width: '120px', height: '120px', margin: '0 auto 24px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#00f2fe" />
        <directionalLight position={[-5, -5, -5]} intensity={1} color="#e02fe2" />
        <Orb />
      </Canvas>
    </div>
  );
};

export default ProfileOrb;
