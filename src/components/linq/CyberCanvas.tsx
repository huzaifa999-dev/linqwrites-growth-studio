import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Icosahedron,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  Sparkles,
  TorusKnot,
} from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import type { Group } from "three";
import { useIsMobile } from "@/hooks/use-mobile";

/** Mouse parallax rig — subtly rotates the whole 3D group with the cursor. */
function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += (mouse.current.x * 0.35 - ref.current.rotation.y) * Math.min(1, delta * 2);
    ref.current.rotation.x += (-mouse.current.y * 0.2 - ref.current.rotation.x) * Math.min(1, delta * 2);
  });

  return <group ref={ref}>{children}</group>;
}

function NeonKnot({ position, color, speed = 1, scale = 1 }: { position: [number, number, number]; color: string; speed?: number; scale?: number }) {
  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.6} position={position}>
      <TorusKnot args={[0.9, 0.28, 220, 32]} scale={scale}>
        <MeshDistortMaterial color={color} distort={0.35} speed={1.6} roughness={0.15} metalness={0.7} emissive={color} emissiveIntensity={0.35} />
      </TorusKnot>
    </Float>
  );
}

function GlassOrb({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <Float speed={0.7} rotationIntensity={0.4} floatIntensity={1.2} position={position}>
      <Icosahedron args={[0.9, 2]} scale={scale}>
        <MeshTransmissionMaterial color="#22d3ee" thickness={0.6} transmission={1} roughness={0.1} ior={1.3} chromaticAberration={0.35} anisotropy={0.4} distortion={0.2} temporalDistortion={0.1} />
      </Icosahedron>
    </Float>
  );
}

/** Ambient cinematic WebGL backdrop with brand logo watermark overlay. */
export function CyberCanvas() {
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#04050a]">
      <Canvas
        dpr={isMobile ? [1, 1.25] : [1, 1.6]}
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#04050a"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 4, 6]} intensity={1.2} color="#22d3ee" />
        <pointLight position={[-6, -3, 4]} intensity={1.1} color="#ec4899" />
        <pointLight position={[0, 5, -4]} intensity={0.9} color="#2563eb" />
        <Suspense fallback={null}>
          {!reduce && (
            <Rig>
              <NeonKnot position={[-2.6, 0.6, 0]} color="#2563eb" speed={0.9} scale={0.9} />
              <NeonKnot position={[2.4, -0.4, -1]} color="#ec4899" speed={1.1} scale={0.7} />
              <NeonKnot position={[0.2, 1.6, -2]} color="#22d3ee" speed={0.75} scale={0.55} />
              <GlassOrb position={[1.4, 1.2, 1]} scale={0.7} />
              {!isMobile && <GlassOrb position={[-1.8, -1.4, 0.5]} scale={0.55} />}
              <Sparkles count={isMobile ? 30 : 70} scale={[10, 6, 6]} size={2.5} speed={0.4} color="#22d3ee" />
            </Rig>
          )}
          <Environment preset="night" />
        </Suspense>
      </Canvas>

      {/* Vignette for text legibility */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(4,5,10,0.55) 100%)" }}
      />
    </div>
  );
}