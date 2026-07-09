import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, MicOff, X } from "lucide-react";

type Status = "idle" | "listening" | "denied" | "unsupported";

/**
 * Floating audio-reactive orb. Toggle button opens a bloom orb that scales /
 * pulses to live microphone amplitude. If permission is denied or the API is
 * unavailable, falls back to an autonomous ambient pulse so the visual never
 * dies.
 */
export function AudioOrb() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [level, setLevel] = useState(0);
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    ctxRef.current?.close().catch(() => {});
    ctxRef.current = null;
    analyserRef.current = null;
  }, []);

  useEffect(() => () => stop(), [stop]);

  // Fallback ambient pulse when we can't (or don't) have a mic feed.
  useEffect(() => {
    if (status === "listening") return;
    if (!open) return;
    let t = 0;
    let raf = 0;
    const tick = () => {
      t += 0.03;
      setLevel(0.35 + Math.sin(t) * 0.15 + Math.sin(t * 2.3) * 0.08);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [status, open]);

  const start = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AC: typeof AudioContext =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      ctxRef.current = ctx;
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      src.connect(analyser);
      analyserRef.current = analyser;
      const data = new Uint8Array(analyser.frequencyBinCount);
      const loop = () => {
        analyser.getByteFrequencyData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += data[i];
        const avg = sum / data.length / 255; // 0..1
        setLevel((prev) => prev * 0.6 + avg * 1.4 * 0.4);
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
      setStatus("listening");
    } catch {
      setStatus("denied");
    }
  }, []);

  const toggle = () => {
    if (open) {
      stop();
      setStatus("idle");
      setOpen(false);
    } else {
      setOpen(true);
      void start();
    }
  };

  const scale = 1 + Math.min(level, 1.2) * 0.55;
  const glow = 40 + Math.min(level, 1.2) * 90;

  return (
    <div className="fixed bottom-6 left-6 z-[92] md:bottom-8 md:left-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-20 left-0 w-72 rounded-3xl border border-white/10 bg-[#0a0d1a]/90 p-5 shadow-[0_30px_80px_-20px_rgba(236,72,153,0.45)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-[0.6rem] uppercase tracking-[0.35em] text-cyan-300/80">
                {status === "listening"
                  ? "Listening"
                  : status === "denied"
                    ? "Ambient mode"
                    : status === "unsupported"
                      ? "Ambient mode"
                      : "Warming up"}
              </span>
              <button
                aria-label="Close orb"
                onClick={toggle}
                className="grid h-6 w-6 place-items-center rounded-full text-white/60 hover:text-white"
              >
                <X size={12} />
              </button>
            </div>
            <div className="mt-4 grid h-40 place-items-center">
              <motion.div
                style={{
                  scale,
                  boxShadow: `0 0 ${glow}px rgba(34,211,238,0.55), 0 0 ${glow * 1.4}px rgba(236,72,153,0.35)`,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="h-20 w-20 rounded-full bg-[conic-gradient(from_0deg,#2563eb,#22d3ee,#ec4899,#2563eb)] ring-1 ring-white/25"
              />
            </div>
            <p className="mt-3 text-center text-[0.65rem] leading-relaxed text-white/60">
              {status === "denied" && "Mic permission blocked — running an ambient pulse instead."}
              {status === "unsupported" && "Mic API unavailable — enjoying an ambient pulse."}
              {status === "listening" && "Reacting to your room. Speak, whistle, play a track."}
              {status === "idle" && "Requesting microphone…"}
            </p>
            {(status === "denied" || status === "unsupported") && (
              <button
                onClick={() => {
                  setStatus("idle");
                  void start();
                }}
                className="mt-3 w-full rounded-full border border-white/15 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-white/80 transition hover:border-cyan-300/60 hover:text-cyan-200"
              >
                Try mic again
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        aria-label={open ? "Close audio orb" : "Open audio orb"}
        onClick={toggle}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        data-hover
        className="relative grid h-14 w-14 place-items-center rounded-full"
      >
        <span
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background: "linear-gradient(135deg,#2563eb,#22d3ee,#ec4899)",
            opacity: 0.55 + Math.min(level, 1) * 0.4,
          }}
        />
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#04050a] ring-1 ring-white/20 text-cyan-200 shadow-[0_10px_40px_-10px_rgba(236,72,153,0.6)]">
          {status === "denied" || status === "unsupported" ? <MicOff size={16} /> : <Mic size={16} />}
        </span>
      </motion.button>
    </div>
  );
}
