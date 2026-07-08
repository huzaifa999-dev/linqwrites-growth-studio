import { motion, useScroll, useSpring } from "motion/react";

/** Top-of-page neon scroll progress rail. */
export function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width, transformOrigin: "0% 50%" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[95] h-[3px] bg-gradient-to-r from-blue-500 via-cyan-300 to-pink-500 shadow-[0_0_18px_rgba(34,211,238,0.7)]"
    />
  );
}
