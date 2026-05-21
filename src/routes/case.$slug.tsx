import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/components/linq/caseStudies";

export const Route = createFileRoute("/case/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.study;
    if (!s) return { meta: [{ title: "Case Study | LinqWrites" }] };
    return {
      meta: [
        { title: s.seoTitle },
        { name: "description", content: s.seoDescription },
        { property: "og:title", content: s.seoTitle },
        { property: "og:description", content: s.seoDescription },
        { property: "og:image", content: s.img },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: s.seoTitle },
        { name: "twitter:description", content: s.seoDescription },
        { name: "twitter:image", content: s.img },
      ],
      links: [{ rel: "canonical", href: `/case/${s.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-paper text-ink">
      <div className="text-center">
        <h1 className="font-display text-4xl">Case not found</h1>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm text-accent-warm">
          <ArrowLeft size={14} /> Back to LinqWrites
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6 text-center text-ink">
      <div>
        <p className="text-sm text-ink-soft">{error.message}</p>
        <Link to="/" className="mt-4 inline-flex items-center gap-2 text-sm text-accent-warm">
          <ArrowLeft size={14} /> Back home
        </Link>
      </div>
    </div>
  ),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { study } = Route.useLoaderData();
  const related = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-hairline bg-paper/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-xl text-ink">
            Linq<em className="italic text-accent-warm">Writes</em>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink-soft hover:text-ink">
            <ArrowLeft size={14} /> All work
          </Link>
        </div>
      </header>

      <article>
        <section className="relative overflow-hidden pt-36 pb-20 md:pt-44">
          <div className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,oklch(0.82_0.14_80/0.18),transparent_70%)] blur-3xl" />
          <div className="mx-auto max-w-5xl px-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-[0.7rem] uppercase tracking-[0.3em] text-accent-warm"
            >
              {study.tag} · {study.client} · {study.year}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-light leading-[1.05] text-ink"
            >
              {study.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft"
            >
              {study.excerpt}
            </motion.p>
          </div>
        </section>

        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-6xl overflow-hidden rounded-3xl px-6"
        >
          <div className="aspect-[16/9] overflow-hidden rounded-3xl shadow-lift">
            <img src={study.img} alt={study.title} className="h-full w-full object-cover" />
          </div>
        </motion.figure>

        <section className="mx-auto mt-24 grid max-w-5xl grid-cols-1 gap-12 px-6 md:grid-cols-3">
          {study.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="border-t border-hairline pt-6"
            >
              <div className="font-display text-4xl text-ink">{m.value}</div>
              <div className="mt-2 text-[0.7rem] uppercase tracking-[0.25em] text-ink-soft">{m.label}</div>
            </motion.div>
          ))}
        </section>

        <section className="mx-auto mt-28 grid max-w-5xl grid-cols-1 gap-16 px-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-accent-warm">Services</p>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              {study.services.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <Check size={14} className="text-accent-warm" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-8 space-y-12">
            <Block label="The challenge">{study.challenge}</Block>
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-accent-warm">The approach</p>
              <ul className="mt-6 space-y-5">
                {study.approach.map((a, i) => (
                  <motion.li
                    key={a}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex gap-4 border-l border-hairline pl-5"
                  >
                    <span className="font-display text-sm text-accent-warm">0{i + 1}</span>
                    <span className="text-base leading-relaxed text-ink-soft">{a}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <Block label="The outcome">{study.outcome}</Block>
          </div>
        </section>

        <section className="mx-auto mt-32 max-w-7xl px-6">
          <div className="flex items-end justify-between border-b border-hairline pb-6">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">More work</p>
            <Link to="/" className="text-xs uppercase tracking-widest text-ink hover:text-accent-warm">All cases</Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/case/$slug"
                params={{ slug: r.slug }}
                className="group block"
              >
                <div className="overflow-hidden rounded-2xl shadow-soft">
                  <div className="aspect-[16/11] overflow-hidden">
                    <img src={r.img} alt={r.title} className="h-full w-full object-cover transition duration-[1.4s] group-hover:scale-105" />
                  </div>
                </div>
                <p className="mt-4 text-[0.65rem] uppercase tracking-[0.25em] text-accent-warm">{r.tag}</p>
                <h3 className="mt-2 font-display text-lg text-ink group-hover:text-accent-warm transition-colors">{r.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-32 max-w-4xl px-6 pb-32 text-center">
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-light leading-[1.1] text-ink">
            Want a story like this for <em className="italic text-accent-warm">your studio?</em>
          </h2>
          <Link
            to="/"
            hash="contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm text-paper transition hover:-translate-y-0.5"
          >
            Start a project <ArrowUpRight size={16} />
          </Link>
        </section>
      </article>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <p className="text-[0.7rem] uppercase tracking-[0.3em] text-accent-warm">{label}</p>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">{children}</p>
    </motion.div>
  );
}