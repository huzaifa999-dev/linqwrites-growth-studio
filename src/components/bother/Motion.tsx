import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useRouterState } from "@tanstack/react-router";

/* ---------- 5. Scroll text highlight (native) ---------- */
export function ScrollHighlight({
  text,
  tone = "ochre",
  className = "",
}: {
  text: string;
  tone?: "ochre" | "plum";
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={`hl hl-${tone} ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} reduced={!!reduced} />
      ))}
    </p>
  );
}

function Word({
  word,
  progress,
  range,
  reduced,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  reduced: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(progress, range, ["var(--ink)", "var(--hl-color)"]);
  return (
    <motion.span aria-hidden style={reduced ? { color: "var(--hl-color)" } : { opacity, color }} className="hl-word">
      {word}{" "}
    </motion.span>
  );
}

/* ---------- 6. Custom cursor ---------- */
export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("a,button,[data-cursor]");
      setLabel(el ? el.dataset.cursor ?? (el.matches("[href^='/book'],.btn-signal") ? "start" : el.matches("article a,.frame a") ? "read" : "open") : null);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduced, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="cursor"
      style={{ x: sx, y: sy }}
      animate={{ width: label ? 64 : 12, height: label ? 64 : 12 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <AnimatePresence>{label && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{label}</motion.span>}</AnimatePresence>
    </motion.div>
  );
}

/* ---------- 7. Magnetic pull ---------- */
export function Magnetic({ children, radius = 80, className = "" }: { children: ReactNode; radius?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy);
      if (d < radius + Math.max(r.width, r.height) / 2) {
        x.set(dx * 0.3);
        y.set(dy * 0.3);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [radius, reduced, x, y]);

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className={`inline-flex ${className}`}>
      {children}
    </motion.div>
  );
}

/* ---------- 8. Clip-path headline ---------- */
export function ClipLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className="block"
      initial={reduced ? false : { clipPath: "inset(0 100% 0 0)", y: 24 }}
      animate={{ clipPath: "inset(0 0% 0 0)", y: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.77, 0, 0.18, 1] }}
    >
      {children}
    </motion.span>
  );
}

/* ---------- 9. Portrait reveal with parallax + duotone ---------- */
export function Portrait({
  src,
  alt,
  name,
  role,
  children,
  tone = "ink",
  delay = 0,
}: {
  src: string;
  alt: string;
  name: string;
  role: string;
  children: ReactNode;
  tone?: "ink" | "plum";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-40, 40]);
  const capY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [30, -30]);
  return (
    <div ref={ref} className="portrait-block">
      <motion.figure
        className={`portrait portrait-${tone} frame`}
        initial={reduced ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        whileHover={reduced ? undefined : { rotateX: -3, rotateY: 4, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        <motion.span
          className="portrait-bar"
          variants={{ hidden: { x: "-101%" }, show: { x: "101%" } }}
          transition={{ duration: 1.1, delay, ease: [0.77, 0, 0.18, 1] }}
        />
        <motion.img
          src={src}
          alt={alt}
          width={640}
          height={800}
          loading="lazy"
          style={{ y: imgY }}
          variants={{ hidden: { clipPath: "inset(0 100% 0 0)" }, show: { clipPath: "inset(0 0% 0 0)" } }}
          transition={{ duration: 1, delay: delay + 0.35, ease: [0.77, 0, 0.18, 1] }}
        />
        <span className="grain" aria-hidden />
      </motion.figure>
      <motion.div style={{ y: capY }} className="mt-6">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-none">{name}</h2>
        <p className="t-label mt-2 text-ochre">{role}</p>
        <p className="t-body mt-4 max-w-[40ch] text-ink-soft">{children}</p>
      </motion.div>
    </div>
  );
}

/* ---------- 10. Paper / ink page wipe ---------- */
export function PageWipe() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduced = useReducedMotion();
  const prev = useRef(pathname);
  const [wipe, setWipe] = useState<null | { key: number; big: boolean }>(null);

  useEffect(() => {
    if (prev.current === pathname) return;
    const big = prev.current === "/" && pathname === "/book-your-sprint";
    prev.current = pathname;
    if (reduced) return;
    setWipe({ key: Date.now(), big });
    const t = setTimeout(() => setWipe(null), big ? 1900 : 900);
    return () => clearTimeout(t);
  }, [pathname, reduced]);

  return (
    <AnimatePresence>
      {wipe && (
        <motion.div key={wipe.key} className="wipe" aria-hidden>
          <motion.div
            className="wipe-ink"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 1, 0] }}
            transition={{ duration: wipe.big ? 1.8 : 0.8, times: [0, 0.4, 0.6, 1], ease: [0.77, 0, 0.18, 1] }}
          />
          {wipe.big && (
            <motion.p
              className="wipe-word font-display"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: [0, 1, 1, 0], y: [30, 0, 0, -30] }}
              transition={{ duration: 1.8, times: [0.25, 0.45, 0.65, 0.85] }}
            >
              Find the friction.
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
