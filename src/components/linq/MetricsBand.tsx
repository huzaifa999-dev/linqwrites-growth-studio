import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";

const metrics: Array<{ value: number; suffix?: string; label: string; sub: string }> = [
  { value: 187, suffix: "M+", label: "Impressions engineered", sub: "Across founder feeds we ghostwrite" },
  { value: 42, suffix: "x", label: "Average pipeline lift", sub: "From launch systems shipped in 2025" },
  { value: 96, suffix: "%", label: "Retention after sprint", sub: "Founders who continue past month one" },
  { value: 14, suffix: " days", label: "From brief to launch", sub: "Median for a full narrative system" },
];

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20, mass: 0.8 });
  const rounded = useTransform(spring, (v) => Math.round(v).toLocaleString());
  const [text, setText] = useState("0");
  useEffect(() => { if (inView) mv.set(to); }, [inView, mv, to]);
  useEffect(() => rounded.on("change", (v) => setText(v)), [rounded]);
  return (
    <span ref={ref} className="tabular-nums">
      {text}
      {suffix && <span className="text-cyan-300">{suffix}</span>}
    </span>
  );
}

/** Animated KPI band with count-up numbers on scroll into view. */
export function MetricsBand() {
  return (
    <section id="metrics" aria-label="Studio metrics" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "radial-gradient(600px 300px at 20% 0%, rgba(37,99,235,0.18), transparent 60%), radial-gradient(500px 260px at 90% 100%, rgba(236,72,153,0.18), transparent 60%)" }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-[0.65rem] uppercase tracking-[0.35em] text-cyan-300/80">Signal, not vanity</p>
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] font-light leading-[1.05] text-white">
              Numbers that <em className="italic text-cyan-300">actually move</em> the room.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/60">
            Every metric below is measured across founder accounts we operate. No screenshots from 2019, no borrowed case studies.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-[#04050a] p-8 md:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="font-display text-[clamp(2.6rem,5vw,4rem)] font-light leading-none text-white">
                <Counter to={m.value} suffix={m.suffix} />
              </div>
              <div className="mt-5 text-sm font-medium text-white/90">{m.label}</div>
              <div className="mt-1.5 text-xs text-white/50">{m.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
