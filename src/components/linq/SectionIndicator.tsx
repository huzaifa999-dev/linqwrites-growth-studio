import { useEffect, useState } from "react";
import { motion } from "motion/react";

const sections: Array<{ id: string; label: string }> = [
  { id: "top", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "about", label: "Founders" },
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "voices", label: "Voices" },
  { id: "contact", label: "Contact" },
];

/** Fixed left-side scroll spy — neon dots + current section label. */
export function SectionIndicator() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => !!n);
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.6, 1] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed left-6 top-1/2 z-[80] hidden -translate-y-1/2 lg:block">
      <ul className="flex flex-col gap-4">
        {sections.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id} className="pointer-events-auto">
              <a href={`#${s.id}`} className="group flex items-center gap-3">
                <span className="relative grid h-3 w-3 place-items-center">
                  <motion.span
                    animate={{ scale: isActive ? 1 : 0.55, opacity: isActive ? 1 : 0.35 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-3 w-3 rounded-full ${isActive ? "bg-[conic-gradient(from_0deg,#2563eb,#22d3ee,#ec4899,#2563eb)] shadow-[0_0_12px_rgba(34,211,238,0.75)]" : "bg-white/30"}`}
                  />
                </span>
                <motion.span
                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-[0.6rem] uppercase tracking-[0.35em] text-white/85"
                >
                  {s.label}
                </motion.span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
