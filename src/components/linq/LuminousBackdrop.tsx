import { useEffect, useState } from "react";

/**
 * Luminous Creative canvas: pure white with slow, shifting iridescent pastel
 * washes (peach, lavender, mint). Pure CSS so it stays buttery on Windows,
 * macOS and Android — no WebGL cost, no jank.
 */
export function LuminousBackdrop() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
      {mounted && (
        <>
          <div
            className="aurora-blob absolute -left-[15%] -top-[10%] h-[70vmax] w-[70vmax] rounded-full blur-[90px]"
            style={{ background: "radial-gradient(circle, rgba(255,229,217,0.95), transparent 65%)" }}
          />
          <div
            className="aurora-blob absolute -right-[18%] top-[12%] h-[65vmax] w-[65vmax] rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(224,195,252,0.85), transparent 65%)", animationDelay: "-6s" }}
          />
          <div
            className="aurora-blob absolute bottom-[-20%] left-[20%] h-[60vmax] w-[60vmax] rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(232,245,233,0.95), transparent 65%)", animationDelay: "-12s" }}
          />
          <div
            className="absolute inset-0 opacity-[0.55]"
            style={{ background: "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.95), rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.85) 100%)" }}
          />
        </>
      )}
    </div>
  );
}