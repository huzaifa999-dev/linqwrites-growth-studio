import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { SiteNav, SiteFooter } from "./SiteChrome";
import { Reveal, MaskedLine } from "./Reveal";

export interface Tier {
  name: string;
  price: string;
  cadence?: string;
  scope: string;
  bestFit: string;
  logic: string;
  highlight?: string;
}

export interface ServicePageProps {
  index: string;
  label: string;
  lead: string;
  intro: string[];
  capabilities: { title: string; body: string }[];
  tiers: Tier[];
  footnote: string;
  cta: { label: string; note: string };
  next: { to: string; label: string; blurb: string }[];
}

export function ServicePage(p: ServicePageProps) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteNav />

      <main>
        <section className="wrap pb-16 pt-20 md:pb-24 md:pt-28">
          <div className="rail">
            <p className="rail-label">
              <b>{p.index}</b> / {p.label}
            </p>
            <div>
              <h1 className="t-display max-w-[18ch]">
                <MaskedLine>{p.lead}</MaskedLine>
              </h1>
              <div className="measure mt-8 space-y-5">
                {p.intro.map((t) => (
                  <p key={t} className="t-lead text-ink-soft">
                    {t}
                  </p>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/book-your-sprint" className="btn btn-primary">
                  {p.cta.label} <ArrowRight size={16} />
                </Link>
                <span className="t-small self-center text-ink-soft">{p.cta.note}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap rail">
            <p className="rail-label">What this covers</p>
            <div className="grid gap-px bg-[var(--rule)] sm:grid-cols-2">
              {p.capabilities.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.04} className="bg-paper p-6">
                  <h2 className="t-h3">{c.title}</h2>
                  <p className="t-body mt-3 max-w-[45ch] text-ink-soft">{c.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap rail">
            <p className="rail-label">Pricing</p>
            <div>
              <div className="grid gap-6 lg:grid-cols-3">
                {p.tiers.map((t, i) => (
                  <PricingCard key={t.name} tier={t} delay={i * 0.05} />
                ))}
              </div>
              <p className="t-small measure mt-8 text-ink-soft">{p.footnote}</p>
            </div>
          </div>
        </section>

        <section className="section on-plum">
          <div className="wrap rail">
            <p className="rail-label">Next</p>
            <div className="grid gap-6 sm:grid-cols-2">
              {p.next.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="card group transition-transform duration-300 hover:-translate-y-1"
                >
                  <h2 className="t-h3 flex items-center gap-2">
                    {n.label}
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </h2>
                  <p className="t-body mt-3 text-ink-soft">{n.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function PricingCard({ tier, delay }: { tier: Tier; delay: number }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  return (
    <Reveal delay={delay} className="flex">
      <div
        className={`card flex w-full flex-col ${tier.highlight ? "border-[var(--ochre-ink)]" : ""}`}
      >
        {tier.highlight && (
          <span className="t-label mb-4 self-start rounded-full border border-[var(--ochre-ink)] px-3 py-1 text-ochre">
            {tier.highlight}
          </span>
        )}
        <h3 className="t-h3">{tier.name}</h3>
        <p className="font-display mt-3 text-[2rem] font-bold leading-none text-ink">
          {tier.price}
          {tier.cadence && <span className="t-small font-normal text-ink-soft"> {tier.cadence}</span>}
        </p>
        <p className="t-body mt-5 text-ink-soft">{tier.scope}</p>
        <p className="t-small mt-4 text-ink">
          <span className="t-label text-ink-soft">Best fit</span>
          <br />
          {tier.bestFit}
        </p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="t-label mt-6 inline-flex items-center gap-2 self-start text-ochre"
        >
          {open ? <Minus size={14} /> : <Plus size={14} />} The logic
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.p
              key="logic"
              initial={reduced ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="t-body mt-4 border-t border-rule pt-4 text-ink-soft"
            >
              {tier.logic}
            </motion.p>
          )}
        </AnimatePresence>

        <Link to="/book-your-sprint" className="btn btn-quiet mt-8 self-start">
          Start here <ArrowRight size={16} />
        </Link>
      </div>
    </Reveal>
  );
}
