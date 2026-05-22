import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export interface PageShellProps {
  index: string; // e.g. "01"
  eyebrow: string; // section label
  title: string;
  emphasis?: string; // italic gold accent word(s) inside title (appended)
  lede: string;
  children: ReactNode;
  cta?: { label: string; href: string; external?: boolean };
}

export function PageShell({ index, eyebrow, title, emphasis, lede, children, cta }: PageShellProps) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-40 border-b border-hairline bg-paper/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-2 text-sm text-ink-soft transition hover:text-ink">
            <ArrowLeft size={14} /> LinqWrites
          </Link>
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft">({index}) {eyebrow}</span>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-hairline px-6 py-28 md:py-40">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,oklch(0.82_0.14_80/0.16),transparent_70%)] blur-3xl" />
        <div className="relative mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft"
          >
            ({index}) {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.4rem,6vw,5.2rem)] font-light leading-[1.02]"
          >
            {title}
            {emphasis && (
              <>
                {" "}
                <em className="italic text-accent-warm">{emphasis}</em>
              </>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft"
          >
            {lede}
          </motion.p>
        </div>
      </section>

      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-5xl px-6 py-20 md:py-28"
      >
        <div className="prose-linq space-y-10">{children}</div>

        {cta && (
          <div className="mt-20 flex justify-center">
            <a
              href={cta.href}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noreferrer" : undefined}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm text-[var(--paper)] shadow-lift transition hover:-translate-y-0.5"
            >
              {cta.label}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        )}
      </motion.main>

      <style>{`
        .prose-linq h2 { font-family: "Fraunces", serif; font-size: clamp(1.6rem, 3vw, 2.4rem); line-height: 1.1; color: var(--ink); margin-top: 2.5rem; letter-spacing: -0.01em; }
        .prose-linq h3 { font-family: "Fraunces", serif; font-size: 1.25rem; color: var(--ink); margin-top: 1.5rem; }
        .prose-linq p { color: var(--ink-soft); font-size: 1.0625rem; line-height: 1.75; }
        .prose-linq ul { list-style: none; padding: 0; display: grid; gap: 0.75rem; }
        .prose-linq li { color: var(--ink-soft); padding-left: 1.25rem; position: relative; line-height: 1.6; }
        .prose-linq li::before { content: ""; position: absolute; left: 0; top: 0.7em; width: 6px; height: 6px; border-radius: 999px; background: var(--accent-warm); }
        .prose-linq .card-grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
        .prose-linq .card { border: 1px solid var(--hairline); border-radius: 1rem; padding: 1.5rem; background: var(--paper-warm); transition: transform 0.4s ease, border-color 0.4s ease; }
        .prose-linq .card:hover { transform: translateY(-4px); border-color: var(--accent-warm); }
        .prose-linq .card h3 { margin-top: 0; }
      `}</style>
    </div>
  );
}
