import { motion } from "motion/react";

/**
 * Kinetic neon ribbon — cinematic bridge between sections in cyber mode.
 * Two counter-scrolling marquee bands framed by neon glow.
 */
const words = [
  "Narrative Engineering",
  "Founder Voice",
  "Momentum × Design",
  "AI Ghostwriting",
  "LinkedIn Growth",
  "24 Hour Delivery",
  "Studio · Not Agency",
];

function Row({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap gap-14 py-6 text-[clamp(1.6rem,4.5vw,3.2rem)] font-display font-light tracking-tight"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
      >
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-14">
            <span className={i % 2 === 0 ? "neon-text" : "text-white/85"}>{w}</span>
            <span aria-hidden className="inline-block h-3 w-3 rounded-full bg-[conic-gradient(from_0deg,#2563eb,#22d3ee,#ec4899,#2563eb)] shadow-[0_0_18px_rgba(34,211,238,0.65)]" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function NeonRibbon() {
  return (
    <section aria-hidden className="neon-ribbon relative isolate">
      <Row />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <Row reverse />
    </section>
  );
}