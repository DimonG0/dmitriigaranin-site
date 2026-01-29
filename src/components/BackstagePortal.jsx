import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";

function PortalCore() {
  const mesh = useRef();

  const material = useMemo(() => {
    // Шиммер “платина+золото” без кастомных шейдеров — через стандартный MeshPhysicalMaterial
    const m = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0b0b0b"),
      metalness: 1,
      roughness: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      reflectivity: 1,
      transmission: 0.0,
      envMapIntensity: 1.2,
    });
    return m;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!mesh.current) return;
    mesh.current.rotation.z = t * 0.12;
    mesh.current.rotation.x = Math.sin(t * 0.18) * 0.18;
    mesh.current.rotation.y = Math.cos(t * 0.16) * 0.18;

    // лёгкая “живая” смена оттенка золото/платина
    const hue = 0.12 + Math.sin(t * 0.12) * 0.02; // золото
    const sat = 0.55 + Math.sin(t * 0.09) * 0.05;
    const light = 0.55 + Math.sin(t * 0.11) * 0.04;
    material.color.setHSL(hue, sat, light);
  });

  return (
    <group>
      {/* Ринг-портал */}
      <Float speed={0.6} rotationIntensity={0.7} floatIntensity={0.6}>
        <mesh ref={mesh} material={material}>
          <torusGeometry args={[1.25, 0.28, 64, 220]} />
        </mesh>
      </Float>

      {/* Внутренний “горизонт событий” */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.02, 96]} />
        <meshBasicMaterial
          color={"#000"}
          transparent
          opacity={0.86}
        />
      </mesh>

      {/* Неон-ореол */}
      <mesh>
        <torusGeometry args={[1.32, 0.02, 32, 220]} />
        <meshBasicMaterial color={"#78ffdc"} transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.34, 0.02, 32, 220]} />
        <meshBasicMaterial color={"#7878ff"} transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function GoldDust() {
  const points = useRef();
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const count = 900;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 3.0;
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2.3;
      positions[i * 3 + 0] = Math.cos(a) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(a) * r;
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!points.current) return;
    points.current.rotation.y = t * 0.03;
    points.current.rotation.x = t * 0.01;
  });

  return (
    <points ref={points} geometry={geo}>
      <pointsMaterial
        size={0.012}
        color={"#FFD700"}
        transparent
        opacity={0.42}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function BackstagePortal({ className = "" }) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 4.3], fov: 45 }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />
        <pointLight position={[-2, 1, 2]} intensity={0.9} color={"#FFD700"} />
        <pointLight position={[2, -1, 2]} intensity={0.6} color={"#78ffdc"} />

        <GoldDust />
        <PortalCore />
      </Canvas>
    </div>
  );
}
