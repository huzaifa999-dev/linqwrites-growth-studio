import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

const URL = "https://linqwrites-growth-studio.lovable.app/imagine";
const VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4";

export const Route = createFileRoute("/imagine")({
  head: () => ({
    meta: [
      { title: "Imagine Anything — LinqWrites" },
      { name: "description", content: "Tell us what it should look like. Even if it lives on the moon. One studio, one team, one bill." },
      { property: "og:title", content: "Imagine Anything — LinqWrites" },
      { property: "og:description", content: "Describe the world you want to build and leave the rest to us." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ImaginePage,
});

function ImaginePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-ink text-paper">
      <video
        aria-hidden
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 h-full w-full object-cover opacity-60"
        src={VIDEO}
      />
      <div aria-hidden className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0_0_0/0.55)_60%,oklch(0_0_0/0.9)_100%)]" />
      <div aria-hidden className="fixed inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/80" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col justify-between px-6 py-10 md:px-10 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-paper/80 backdrop-blur transition hover:border-white/60 hover:text-paper"
        >
          <ArrowLeft size={14} /> Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="my-16"
        >
          <p className="text-[0.7rem] uppercase tracking-[0.35em] text-accent-warm">From here to the moon</p>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1.02] text-paper">
            Tell us what it should look like.<br />
            <em className="italic text-accent-warm">Even if it lives on the moon.</em>
          </h1>
          <div className="mt-10 grid max-w-2xl gap-5 text-base leading-relaxed text-paper/80 md:text-lg">
            <p>
              You don’t need a brief, a deck or a checklist. Describe the world you want to build, the
              audience, the feeling, the outcome, and leave the rest to us.
            </p>
            <p>
              We design it, write it, build it and run it. Strategy, brand, content, code, automation,
              motion. One studio, one team, one bill.
            </p>
            <p className="text-paper">
              Pay what the work is worth. We’ll serve you the dish.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-warm px-7 py-3.5 text-sm font-medium text-ink shadow-lift transition hover:-translate-y-0.5"
            >
              Tell us the vision
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/"
              className="rounded-full border border-white/25 px-7 py-3.5 text-sm text-paper/80 transition hover:border-white/60 hover:text-paper"
            >
              Maybe later
            </Link>
          </div>
        </motion.div>

        <div />
      </div>
    </main>
  );
}