import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform, useInView } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Village3D } from "./Village3D";
import guides from "@/assets/guides-aoi-akane.jpg.asset.json";

const PILLARS = [
  "Founder Authority Architecture",
  "Narrative Engineering & Copywriting",
  "SEO & Search Systems",
  "Short Form Video Scripting",
  "Brand Identity & UI Design",
  "AI Powered Operations",
];

const SINGLE_SERVICES = [
  "LinkedIn Ghostwriting",
  "Founder Personal Branding",
  "Long Form Editorial Writing",
  "SEO Content Systems",
  "Short Form Video Scripts",
  "Brand Identity Design",
  "Website & UI Design",
  "Content Calendars",
  "Launch Campaign Copy",
  "AI Workflow Automation",
];

const PACKAGES = [
  { name: "The Authority Architect", price: "$3,500", cadence: "One Time", blurb: "Positioning, narrative spine and a 90 day authority runway built end to end." },
  { name: "The Growth Engine", price: "$5,500", cadence: "per month", blurb: "A full publishing engine: writing, design, distribution and reporting on retainer." },
  { name: "The Mission Impossible Protocol", price: "$12,000", cadence: "per month, custom", blurb: "The whole studio on your problem. Bespoke systems, media and AI operations." },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

/** The stickman rope descent + stats podium. */
function RopeAct() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const y = useTransform(smooth, [0, 0.85], ["0vh", "58vh"]);
  const rotate = useTransform(smooth, [0, 1], [-6, 8]);

  return (
    <div ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="relative flex h-full w-full max-w-5xl flex-col items-center px-6">
          {/* glowing rope */}
          <div className="absolute left-1/2 top-0 h-[72vh] w-[3px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#FF4B72,#A855F7,#00D2FF)] shadow-[0_0_24px_rgba(168,85,247,0.55)]" />
          <motion.div style={{ y, rotate }} className="absolute left-1/2 top-0 -translate-x-1/2">
            <Stickman />
          </motion.div>

          {/* podium */}
          <div className="absolute inset-x-6 bottom-10 mx-auto grid max-w-3xl grid-cols-3 gap-3 md:gap-5">
            {[
              { label: "Pipeline lift", value: 214, suffix: "%" },
              { label: "Impressions", value: 13, suffix: "M+" },
              { label: "Sprint retention", value: 92, suffix: "%" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="lux-glass px-4 py-5 text-center md:px-6 md:py-7"
              >
                <div className="font-display text-2xl text-accent-warm md:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-ink-soft md:text-[0.65rem]">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stickman({ riding = false }: { riding?: boolean }) {
  return (
    <svg width="54" height="78" viewBox="0 0 54 78" fill="none" aria-hidden>
      <circle cx="27" cy="14" r="11" stroke="#1E1B4B" strokeWidth="3" fill="#fff" />
      <path d="M27 25v26" stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" />
      <path d={riding ? "M27 33l-13 6M27 33l13-4" : "M27 33l-14-8M27 33l14-8"} stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" />
      <path d={riding ? "M27 51l-11 9M27 51l10 10" : "M27 51l-12 22M27 51l12 22"} stroke="#1E1B4B" strokeWidth="3" strokeLinecap="round" />
      <circle cx="27" cy="11" r="2" fill="#FF4B72" />
    </svg>
  );
}

/** Sunlit 3D village act: cinematic drone ride past the six service pillars. */
function VillageAct({ onArrive }: { onArrive: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  const [crashed, setCrashed] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      progress.current = v;
      const idx = Math.min(PILLARS.length - 1, Math.floor(v * PILLARS.length));
      setActive(idx);
      const isCrashed = v > 0.93;
      setCrashed(isCrashed);
      if (isCrashed) onArrive();
    });
  }, [scrollYProgress, onArrive]);

  return (
    <div ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Village3D progressRef={progress} />

        {/* pillar callouts */}
        <div className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lux-glass max-w-lg px-6 py-4 text-center"
            >
              <p className="text-[0.6rem] uppercase tracking-[0.35em] text-ink-soft">
                Service pillar {String(active + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-xl text-ink md:text-2xl">{PILLARS[active]}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* white flash on the pothole tumble */}
        <motion.div
          aria-hidden
          animate={{ opacity: crashed ? 1 : 0 }}
          transition={{ duration: 0.45 }}
          className="pointer-events-none absolute inset-0 bg-white"
        />
      </div>
    </div>
  );
}

/** Aoi / Akane branching choice. */
function GuidesAct() {
  const [choice, setChoice] = useState<null | "aoi" | "akane">(null);
  const [deckOpen, setDeckOpen] = useState(false);

  return (
    <section id="guides" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-editorial">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow text-center"
        >
          Choose your guide
        </motion.p>
        <h2 className="mt-4 text-center font-display text-[clamp(2rem,4.5vw,3.4rem)] text-ink">
          A beam of light. <em className="text-accent-warm">Two ways forward.</em>
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { id: "aoi" as const, name: "Aoi", role: "Blue Guide", line: "Tap for Single Services", pos: "left" as const, ring: "rgba(37,99,235,0.5)" },
            { id: "akane" as const, name: "Akane", role: "Red Guide", line: "Tap for Complete System Package", pos: "right" as const, ring: "rgba(255,75,114,0.5)" },
          ].map((g) => (
            <motion.button
              key={g.id}
              type="button"
              onClick={() => {
                setChoice(g.id);
                setDeckOpen(false);
              }}
              whileHover={{ y: -8, scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className={`lux-glass group relative overflow-hidden p-0 text-left ${choice === g.id ? "ring-2" : ""}`}
              style={choice === g.id ? { boxShadow: `0 0 0 2px ${g.ring}, 0 30px 70px -30px ${g.ring}` } : undefined}
            >
              <div className="relative h-[320px] w-full overflow-hidden rounded-t-[1.5rem] md:h-[420px]">
                <img
                  src={guides.url}
                  alt={`${g.name}, the ${g.role} of the LinqWrites studio`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]"
                  style={{ objectPosition: g.pos === "left" ? "22% center" : "78% center" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.55),transparent_60%)]" />
              </div>
              <div className="p-6">
                <p className="text-[0.6rem] uppercase tracking-[0.35em] text-ink-soft">{g.role}</p>
                <p className="mt-1 font-display text-2xl text-ink">{g.name}</p>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-warm px-4 py-2 text-sm">
                  {g.line} <ArrowUpRight size={14} />
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {choice === "aoi" && (
            <motion.div
              key="aoi"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14"
            >
              <h3 className="font-display text-2xl text-ink">Ten single services</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {SINGLE_SERVICES.map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="lux-glass p-5"
                  >
                    <div className="mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,#FFE5D9,#E0C3FC)] shadow-[inset_0_2px_6px_rgba(255,255,255,0.9),0_8px_18px_-10px_rgba(30,27,75,0.4)]">
                      <Sparkles size={16} className="text-[#1E1B4B]" />
                    </div>
                    <p className="text-sm font-medium text-ink">{s}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {choice === "akane" && (
            <motion.div
              key="akane"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14"
            >
              {!deckOpen ? (
                <div className="flex justify-center">
                  <motion.button
                    type="button"
                    onClick={() => setDeckOpen(true)}
                    animate={{ rotate: [0, 3, -3, 0], y: [0, -10, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.05 }}
                    className="grid h-56 w-40 place-items-center rounded-3xl bg-[linear-gradient(140deg,#FFD37A,#FFB020,#FFE9B0)] text-6xl font-bold text-white shadow-[0_30px_70px_-25px_rgba(255,176,32,0.8)]"
                    aria-label="Reveal the Mission Impossible packages"
                  >
                    ?
                  </motion.button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-3">
                  {PACKAGES.map((p, i) => (
                    <motion.article
                      key={p.name}
                      initial={{ opacity: 0, y: 60, rotate: i === 0 ? -8 : i === 2 ? 8 : 0 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ delay: i * 0.14, type: "spring", stiffness: 120, damping: 16 }}
                      whileHover={{ y: -10 }}
                      className="lux-glass iridescent-border relative overflow-hidden p-7"
                    >
                      <p className="text-[0.6rem] uppercase tracking-[0.35em] text-ink-soft">Mission Impossible</p>
                      <h4 className="mt-2 font-display text-xl text-ink">{p.name}</h4>
                      <p className="mt-4 font-display text-3xl text-accent-warm">{p.price}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">{p.cadence}</p>
                      <p className="mt-4 text-sm leading-relaxed text-ink-soft">{p.blurb}</p>
                      <Link to="/book-your-sprint" className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-warm px-5 py-2.5 text-sm">
                        Book this <ArrowUpRight size={14} />
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/**
 * The full cinematic journey: rope descent, stats podium, sunlit 3D village
 * ride through the service pillars, the pothole tumble, then the guide choice.
 */
export function Journey() {
  const [arrived, setArrived] = useState(false);
  const onArrive = useRef(() => setArrived(true)).current;
  return (
    <div id="journey" className="relative">
      <RopeAct />
      <VillageAct onArrive={onArrive} />
      <div className={arrived ? "" : ""}>
        <GuidesAct />
      </div>
    </div>
  );
}