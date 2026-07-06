import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Home, Layers, Briefcase, Users, DollarSign, Mail, Calendar, X } from "lucide-react";

const items: Array<{ label: string; href: string; icon: React.ComponentType<{ size?: number }>; route?: boolean }> = [
  { label: "Home", href: "#top", icon: Home },
  { label: "Services", href: "#services", icon: Layers },
  { label: "Work", href: "#work", icon: Briefcase },
  { label: "Founders", href: "#about", icon: Users },
  { label: "Pricing", href: "#pricing", icon: DollarSign },
  { label: "Contact", href: "#contact", icon: Mail },
  { label: "Book Sprint", href: "/book-your-sprint", icon: Calendar, route: true },
];

export function OrbNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-[90] md:bottom-8 md:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-20 right-0 w-64 origin-bottom-right rounded-3xl border border-white/10 bg-[#0a0d1a]/90 p-2 shadow-[0_30px_80px_-20px_rgba(37,99,235,0.5)] backdrop-blur-xl"
          >
            <div className="px-3 py-2 text-[0.6rem] uppercase tracking-[0.35em] text-cyan-300/80">Navigate the studio</div>
            <ul className="space-y-1">
              {items.map((it, i) => {
                const Icon = it.icon;
                const inner = (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.3 }}
                    className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-white/85 transition hover:bg-white/5"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-blue-500/20 to-pink-500/20 text-cyan-300 ring-1 ring-white/10 transition group-hover:from-blue-500/40 group-hover:to-pink-500/40">
                      <Icon size={14} />
                    </span>
                    <span className="tracking-wide">{it.label}</span>
                  </motion.span>
                );
                return (
                  <li key={it.label}>
                    {it.route ? (
                      <Link to={it.href} onClick={() => setOpen(false)}>
                        {inner}
                      </Link>
                    ) : (
                      <a href={it.href} onClick={() => setOpen(false)}>
                        {inner}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="relative grid h-16 w-16 place-items-center rounded-full"
      >
        <span className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-pink-500 blur-xl opacity-70" />
        <span className="relative grid h-16 w-16 place-items-center rounded-full bg-[#04050a] ring-1 ring-white/20 shadow-[0_10px_40px_-10px_rgba(34,211,238,0.7)]">
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="text-white">
                <X size={20} />
              </motion.span>
            ) : (
              <motion.span
                key="orb"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                className="h-6 w-6 rounded-full bg-[conic-gradient(from_0deg,#2563eb,#22d3ee,#ec4899,#2563eb)] shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]"
              />
            )}
          </AnimatePresence>
        </span>
      </motion.button>
    </div>
  );
}