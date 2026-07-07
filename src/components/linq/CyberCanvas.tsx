import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import linqLogo from "@/assets/linq-logo.webp";

/**
 * Ambient brand backdrop — deep-night base with a large, low-opacity
 * LinqWrites logo watermark and slow drifting neon washes.
 * Replaces the earlier WebGL scene: quieter, on-brand, always readable.
 */
export function CyberCanvas() {
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#04050a]">
      {/* Drifting neon washes */}
      <motion.div
        className="absolute -left-32 -top-32 h-[70vmax] w-[70vmax] rounded-full opacity-[0.28] blur-3xl"
        style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 60%)" }}
        animate={reduce ? undefined : { x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-40 top-1/3 h-[65vmax] w-[65vmax] rounded-full opacity-[0.22] blur-3xl"
        style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 60%)" }}
        animate={reduce ? undefined : { x: [0, -50, 20, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 26, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/4 h-[60vmax] w-[60vmax] rounded-full opacity-[0.18] blur-3xl"
        style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 60%)" }}
        animate={reduce ? undefined : { x: [0, 40, -30, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 28, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* LinqWrites logo watermark */}
      <motion.img
        src={linqLogo}
        alt=""
        draggable={false}
        className="absolute left-1/2 top-1/2 w-[min(85vw,900px)] -translate-x-1/2 -translate-y-1/2 select-none"
        style={{
          opacity: 0.06,
          filter: "brightness(1.6) drop-shadow(0 0 60px rgba(34,211,238,0.5))",
        }}
        animate={reduce ? undefined : { scale: [1, 1.03, 1], rotate: [0, 0.6, 0] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Vignette for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(4,5,10,0.55) 100%)",
        }}
      />
    </div>
  );
}