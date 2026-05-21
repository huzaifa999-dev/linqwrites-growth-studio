import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

/**
 * Cinematic 3D-feeling planet rendered with pure CSS + SVG.
 * Inspired by editorial hero compositions: glowing sphere,
 * subtle ring, atmospheric halo, parallax glass cards on top.
 */
export function Planet3D() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  const rotY = useTransform(sx, [-1, 1], [-12, 12]);
  const rotX = useTransform(sy, [-1, 1], [10, -10]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w) * 2 - 1);
      my.set((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none relative mx-auto h-[420px] w-[420px] md:h-[560px] md:w-[560px]" style={{ perspective: 1200 }}>
      {/* Atmospheric halo */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,oklch(0.82_0.14_80/0.35),transparent_60%)] blur-2xl" />

      {/* Orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        className="absolute inset-6 rounded-full border border-white/10"
        style={{ transform: "rotateX(72deg)" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
        className="absolute inset-16 rounded-full border border-white/5"
        style={{ transform: "rotateX(68deg) rotateZ(20deg)" }}
      />

      {/* Planet sphere */}
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="absolute inset-[12%]"
      >
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          className="relative h-full w-full overflow-hidden rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 30%, oklch(0.95 0.05 85 / 0.9), oklch(0.55 0.12 60 / 0.5) 40%, oklch(0.16 0.04 260) 70%), linear-gradient(120deg, oklch(0.22 0.06 260), oklch(0.38 0.12 60), oklch(0.22 0.06 260))",
            backgroundSize: "200% 100%, 100% 100%",
            boxShadow:
              "inset -30px -40px 80px oklch(0 0 0 / 0.65), inset 20px 30px 60px oklch(0.95 0.1 85 / 0.18), 0 60px 140px -40px oklch(0.82 0.14 80 / 0.45)",
          }}
        >
          {/* Surface noise / clouds */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='3'/%3E%3CfeColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.85 0 0 0 0 0.65 0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          {/* Terminator shadow */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_85%_60%,transparent_30%,oklch(0_0_0/0.7)_75%)]" />
          {/* Specular highlight */}
          <div className="absolute left-[18%] top-[14%] h-[30%] w-[35%] rounded-full bg-[radial-gradient(circle,oklch(1_0_0/0.35),transparent_70%)] blur-xl" />
        </motion.div>
      </motion.div>

      {/* Floating glass spec cards */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute -left-4 top-10 hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left backdrop-blur-xl md:block"
      >
        <div className="text-[0.6rem] uppercase tracking-[0.25em] text-white/50">Narrative</div>
        <div className="mt-1 font-display text-sm text-white">Clarity engine</div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute -right-2 top-24 hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left backdrop-blur-xl md:block"
      >
        <div className="text-[0.6rem] uppercase tracking-[0.25em] text-white/50">Inbound</div>
        <div className="mt-1 font-display text-sm text-white">+312% qoq</div>
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute bottom-10 left-6 hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left backdrop-blur-xl md:block"
      >
        <div className="text-[0.6rem] uppercase tracking-[0.25em] text-white/50">Impressions</div>
        <div className="mt-1 font-display text-sm text-white">13M / quarter</div>
      </motion.div>
    </div>
  );
}