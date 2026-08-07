import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cloud, Sky } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { useIsMobile } from "@/hooks/use-mobile";

type ProgressRef = { current: number };

const HOUSE_COLORS = ["#F87171", "#60A5FA", "#FBBF24", "#34D399", "#F472B6", "#A78BFA"];

function House({ position, color, seed }: { position: [number, number, number]; color: string; seed: number }) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8 + seed) * 0.05;
  });
  return (
    <group ref={ref} position={position}>
      <mesh castShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[1.2, 1, 1.2]} />
        <meshStandardMaterial color="#FFF7ED" flatShading />
      </mesh>
      <mesh castShadow position={[0, 1.35, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.05, 0.9, 4]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <mesh position={[0, 0.35, 0.62]}>
        <boxGeometry args={[0.3, 0.55, 0.05]} />
        <meshStandardMaterial color="#C69C6D" flatShading />
      </mesh>
    </group>
  );
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.09, 0.12, 0.7, 5]} />
        <meshStandardMaterial color="#9A6B4F" flatShading />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial color="#6EC07A" flatShading />
      </mesh>
    </group>
  );
}

/** Cyclist that rides along the road as the scroll progress advances. */
function Cyclist({ progressRef }: { progressRef: ProgressRef }) {
  const ref = useRef<Group>(null);
  const wheelA = useRef<Mesh>(null);
  const wheelB = useRef<Mesh>(null);
  useFrame((_, delta) => {
    const p = progressRef.current;
    if (ref.current) {
      ref.current.position.x = -9 + p * 18;
      ref.current.position.y = p > 0.92 ? (p - 0.92) * 14 : 0;
      ref.current.rotation.z = p > 0.92 ? -(p - 0.92) * 12 : 0;
    }
    const spin = delta * 6;
    if (wheelA.current) wheelA.current.rotation.z -= spin;
    if (wheelB.current) wheelB.current.rotation.z -= spin;
  });
  return (
    <group ref={ref} position={[-9, 0, 2.4]}>
      <mesh ref={wheelA} position={[-0.32, 0.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.05, 6, 16]} />
        <meshStandardMaterial color="#1E1B4B" flatShading />
      </mesh>
      <mesh ref={wheelB} position={[0.32, 0.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.05, 6, 16]} />
        <meshStandardMaterial color="#1E1B4B" flatShading />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.7, 0.08, 0.08]} />
        <meshStandardMaterial color="#FF4B72" flatShading />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <capsuleGeometry args={[0.13, 0.28, 3, 8]} />
        <meshStandardMaterial color="#1E1B4B" flatShading />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.17, 12, 12]} />
        <meshStandardMaterial color="#FFD9B3" flatShading />
      </mesh>
    </group>
  );
}

/** Drone-style camera: sweeps low over the village as the user scrolls. */
function DroneCamera({ progressRef }: { progressRef: ProgressRef }) {
  const target = useRef({ x: 0, y: 0 });
  useFrame(({ camera, pointer }, delta) => {
    const p = progressRef.current;
    target.current.x += (pointer.x * 1.4 - target.current.x) * Math.min(1, delta * 2);
    target.current.y += (pointer.y * 0.6 - target.current.y) * Math.min(1, delta * 2);
    const wantX = -6 + p * 12 + target.current.x;
    const wantY = 5.5 - p * 2.4 + target.current.y;
    const wantZ = 12 - p * 4;
    camera.position.x += (wantX - camera.position.x) * Math.min(1, delta * 2.4);
    camera.position.y += (wantY - camera.position.y) * Math.min(1, delta * 2.4);
    camera.position.z += (wantZ - camera.position.z) * Math.min(1, delta * 2.4);
    camera.lookAt(-8 + p * 16, 0.8, 1.5);
  });
  return null;
}

function Scene({ progressRef, mobile }: { progressRef: ProgressRef; mobile: boolean }) {
  const houses = useMemo(
    () =>
      Array.from({ length: mobile ? 8 : 14 }, (_, i) => ({
        position: [-9 + i * 1.45, 0, i % 2 === 0 ? -0.6 : 4.9] as [number, number, number],
        color: HOUSE_COLORS[i % HOUSE_COLORS.length],
        seed: i,
      })),
    [mobile],
  );
  const trees = useMemo(
    () =>
      Array.from({ length: mobile ? 8 : 16 }, (_, i) => ({
        position: [-10 + i * 1.3, 0, i % 2 === 0 ? -2.4 : 6.6] as [number, number, number],
      })),
    [mobile],
  );

  return (
    <>
      <Sky sunPosition={[8, 6, -10]} turbidity={2} rayleigh={0.5} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[8, 10, 6]} intensity={1.5} color="#FFF3D6" />
      <hemisphereLight args={["#cfe9ff", "#8fd18f", 0.7]} />

      {/* grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 2]}>
        <planeGeometry args={[60, 30]} />
        <meshStandardMaterial color="#7CCB6B" flatShading />
      </mesh>
      {/* road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 2.4]}>
        <planeGeometry args={[60, 1.6]} />
        <meshStandardMaterial color="#EFE3CC" />
      </mesh>
      {/* pothole */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[8.4, 0.03, 2.4]}>
        <circleGeometry args={[0.42, 8]} />
        <meshStandardMaterial color="#4B3B2A" />
      </mesh>

      {houses.map((h, i) => (
        <House key={i} {...h} />
      ))}
      {trees.map((t, i) => (
        <Tree key={i} {...t} />
      ))}
      <Cyclist progressRef={progressRef} />
      {!mobile && (
        <>
          <Cloud position={[-6, 7, -6]} speed={0.15} opacity={0.55} segments={12} />
          <Cloud position={[6, 8, -8]} speed={0.12} opacity={0.5} segments={12} />
        </>
      )}
      <DroneCamera progressRef={progressRef} />
    </>
  );
}

/** Sunlit low-poly village with a cinematic drone camera driven by scroll. */
export function Village3D({ progressRef }: { progressRef: ProgressRef }) {
  const mobile = useIsMobile();
  return (
    <Canvas
      dpr={mobile ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [-6, 5.5, 12], fov: 50 }}
      gl={{ antialias: !mobile, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <Scene progressRef={progressRef} mobile={mobile} />
    </Canvas>
  );
}