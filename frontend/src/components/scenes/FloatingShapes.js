import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';

/* ─── Each shape tracks the mouse ─── */
const FloatingShape = ({ position, geometry, color, speed, scale = 1, distort = 0.3 }) => {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const { x, y } = state.mouse;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * speed * 0.3 + y * -0.4;
    ref.current.rotation.y = t * speed * 0.4 + x * 0.4;
    ref.current.position.y = position[1] + Math.sin(t * speed) * 0.5;
  });

  const getGeometry = () => {
    switch(geometry) {
      case 'icosahedron': return <icosahedronGeometry args={[1, 0]} />;
      case 'box':         return <boxGeometry args={[1.2, 1.2, 1.2]} />;
      case 'torus':       return <torusGeometry args={[1, 0.35, 16, 32]} />;
      case 'octahedron':  return <octahedronGeometry args={[1, 0]} />;
      case 'sphere':      return <sphereGeometry args={[1, 32, 32]} />;
      default:            return <icosahedronGeometry args={[1, 0]} />;
    }
  };

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {getGeometry()}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.4}
        roughness={0.15}
        metalness={0.85}
        wireframe
        emissive={color}
        emissiveIntensity={0.4}
      />
    </mesh>
  );
};

const FloatingShapes = ({ theme = 'default' }) => {
  const colorSets = {
    default:     ['#00f2fe', '#e02fe2', '#8b5cf6', '#00f2fe'],
    offers:      ['#f59e0b', '#ef4444', '#fcd34d', '#f97316'],
    experiences: ['#10b981', '#3b82f6', '#6ee7b7', '#14b8a6'],
    login:       ['#818cf8', '#c084fc', '#a78bfa', '#7c3aed'],
    payment:     ['#f472b6', '#ec4899', '#f9a8d4', '#db2777'],
    checkout:    ['#34d399', '#059669', '#6ee7b7', '#10b981'],
  };

  const c = colorSets[theme] || colorSets.default;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 1,               /* FIXED: was -1. Now renders in front of bg */
      pointerEvents: 'none',   /* clicks pass through */
    }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <FloatingShape position={[-5, 2, -5]}  geometry="icosahedron" color={c[0]} speed={0.5} scale={1.4} />
        <FloatingShape position={[6, -1, -8]}   geometry="box"         color={c[1]} speed={0.7} scale={1.2} />
        <FloatingShape position={[0, -4, -4]}   geometry="torus"       color={c[2]} speed={0.6} scale={1.1} />
        <FloatingShape position={[-3, -3, -6]}  geometry="octahedron"  color={c[3]} speed={0.8} scale={1.0} />
      </Canvas>
    </div>
  );
};

export default FloatingShapes;
