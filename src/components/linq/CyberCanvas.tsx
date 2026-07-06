import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, TorusKnot, Sparkles, Environment, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Cinematic cyber background — floats behind the site with neon accents.
 * Palette: black base, electric blue, cyan, hot pink.
 * Client-only (guards SSR + prefers-reduced-motion).
 */

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += (target.current.x - group.current.rotation.y) * Math.min(1, dt * 1.4);
    group.current.rotation.x += (target.current.y - group.current.rotation.x) * Math.min(1, dt * 1.4);
  });
  return <group ref={group}>{children}</group>;
}

function NeonKnot({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  return (
    <Float speed={1.4} rotationIntensity={0.7} floatIntensity={1.6}>
      <TorusKnot args={[0.9, 0.28, 180, 32]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.4}
          roughness={0.15}
          metalness={0.6}
          distort={0.35}
          speed={1.2}
        />
      </TorusKnot>
    </Float>
  );
}

function GlassOrb({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <Float speed={1.1} rotationIntensity={0.4} floatIntensity={1.2}>
      <Icosahedron args={[1, 4]} position={position} scale={scale}>
        <MeshTransmissionMaterial
          thickness={0.6}
          transmission={1}
          roughness={0.05}
          ior={1.3}
          chromaticAberration={0.08}
          backside
          color="#22d3ee"
        />
      </Icosahedron>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#04050a"]} />
      <fog attach="fog" args={["#04050a", 8, 22]} />

      <ambientLight intensity={0.35} />
      <pointLight position={[6, 4, 6]} intensity={30} color="#2563eb" distance={20} />
      <pointLight position={[-6, -3, 4]} intensity={26} color="#ec4899" distance={20} />
      <pointLight position={[0, 5, -4]} intensity={18} color="#22d3ee" distance={20} />

      <Rig>
        <NeonKnot position={[-3.2, 1.4, -1]} color="#2563eb" scale={0.9} />
        <NeonKnot position={[3.4, -1.2, -2]} color="#ec4899" scale={1.1} />
        <NeonKnot position={[0.4, 2.6, -4]} color="#22d3ee" scale={0.7} />
        <GlassOrb position={[2.2, 1.6, 0.4]} scale={0.9} />
        <GlassOrb position={[-2.8, -1.4, 0.6]} scale={0.7} />

        <Sparkles count={140} scale={[14, 8, 10]} size={2.4} speed={0.35} color="#22d3ee" opacity={0.85} />
        <Sparkles count={80} scale={[16, 10, 12]} size={1.6} speed={0.2} color="#ec4899" opacity={0.7} />
      </Rig>

      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>
    </>
  );
}

export function CyberCanvas() {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
  }, []);
  if (!mounted) return null;
  if (reduced) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% 20%, rgba(37,99,235,0.28), transparent 60%), radial-gradient(900px 500px at 80% 70%, rgba(236,72,153,0.22), transparent 60%), #04050a",
        }}
      />
    );
  }
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}