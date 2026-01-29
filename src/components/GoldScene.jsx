import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";

function Particles() {
  const ref = useRef();
  const points = useMemo(() => {
    const arr = new Float32Array(900 * 3);
    for (let i = 0; i < 900; i++) {
      const i3 = i * 3;
      arr[i3 + 0] = (Math.random() - 0.5) * 8;
      arr[i3 + 1] = (Math.random() - 0.5) * 3;
      arr[i3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.06;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={points} count={points.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} transparent opacity={0.8} />
    </points>
  );
}

function GoldOrb() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.25;
  });

  return (
    <Float speed={1.0} rotationIntensity={0.45} floatIntensity={0.55}>
      <mesh ref={ref} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.25, 2]} />
        <meshStandardMaterial metalness={1} roughness={0.25} />
      </mesh>
    </Float>
  );
}

export default function GoldScene() {
  return (
    <Canvas camera={{ position: [0, 0.8, 4], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />
      <directionalLight position={[-6, 2, -2]} intensity={0.6} />
      <GoldOrb />
      <Particles />
    </Canvas>
  );
}
