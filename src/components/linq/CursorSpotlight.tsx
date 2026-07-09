import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Follows the cursor with a soft neon spotlight. Adds cinematic depth on top of the WebGL canvas. */
export function CursorSpotlight() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!mounted) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] mix-blend-screen"
      style={{
        background: "radial-gradient(320px circle at var(--sx) var(--sy), rgba(34,211,238,0.18), rgba(37,99,235,0.08) 40%, transparent 65%)",
        // motion values injected via CSS vars
        // @ts-expect-error CSS var
        "--sx": sx,
        // @ts-expect-error CSS var
        "--sy": sy,
      }}
    />
  );
}
