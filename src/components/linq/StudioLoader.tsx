import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const ROTATING = ["Narrative", "Positioning", "Growth", "Systems", "Voice"];

/** Cinematic first-load overlay: "Loading studio XX%" with building bars. */
export function StudioLoader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("linq_studio_loaded") === "1") {
      setDone(true);
      return;
    }
    let raf = 0;
    let start = performance.now();
    const tick = (t: number) => {
      const elapsed = t - start;
      // ~2.2s ease-out to 100
      const p = Math.min(100, Math.round((1 - Math.pow(1 - elapsed / 2200, 3)) * 100));
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("linq_studio_loaded", "1");
        setTimeout(() => setDone(true), 500);
      }
    };
    raf = requestAnimationFrame(tick);
    const iv = setInterval(() => setWordIdx((i) => (i + 1) % ROTATING.length), 420);
    return () => { cancelAnimationFrame(raf); clearInterval(iv); };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[hsl(0_0%_4%)] text-white"
        >
          <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(700px 500px at 50% 45%, rgba(137,170,204,0.22), transparent 70%), radial-gradient(600px 500px at 50% 75%, rgba(78,133,191,0.18), transparent 70%)" }} />
          <div className="relative flex w-full max-w-xl flex-col items-center px-8">
            <div className="mb-8 text-[0.6rem] uppercase tracking-[0.5em] text-white/60">LinqWrites · Studio</div>
            <div className="font-display text-[clamp(4rem,14vw,10rem)] font-light leading-none tracking-tight tabular-nums">
              {String(progress).padStart(3, "0")}
            </div>
            <div className="mt-10 h-[2px] w-full max-w-[360px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-accent-gradient"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="mt-6 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.4em] text-white/55">
              <span>Loading</span>
              <span className="relative inline-block h-4 min-w-[110px] overflow-hidden text-left">
                <AnimatePresence mode="wait">
                  <motion.em
                    key={ROTATING[wordIdx]}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 not-italic font-display italic text-accent-warm normal-case tracking-normal text-sm"
                  >
                    {ROTATING[wordIdx]}
                  </motion.em>
                </AnimatePresence>
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}