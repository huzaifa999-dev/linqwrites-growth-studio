import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/** Cinematic first-load overlay: "Loading studio XX%" with building bars. */
export function StudioLoader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

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
      // ~1.6s ease-out to 100
      const p = Math.min(100, Math.round((1 - Math.pow(1 - elapsed / 1600, 3)) * 100));
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("linq_studio_loaded", "1");
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#04050a] text-white"
        >
          <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(600px 400px at 50% 40%, rgba(37,99,235,0.35), transparent 70%), radial-gradient(500px 400px at 50% 70%, rgba(236,72,153,0.28), transparent 70%)" }} />
          <div className="relative flex flex-col items-center">
            <div className="mb-6 text-[0.65rem] uppercase tracking-[0.5em] text-cyan-300/80">LinqWrites · Studio</div>
            <div className="font-display text-[clamp(3rem,10vw,7rem)] font-light leading-none tracking-tight">
              {String(progress).padStart(3, "0")}
              <span className="ml-1 text-cyan-300">%</span>
            </div>
            <div className="mt-8 h-px w-[240px] overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-300 to-pink-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="mt-4 text-[0.6rem] uppercase tracking-[0.4em] text-white/50">
              Loading studio · {progress < 40 ? "compiling narratives" : progress < 80 ? "spinning up momentum" : "opening portal"}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}