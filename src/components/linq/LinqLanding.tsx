import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Sparkles,
  PenLine,
  Layers,
  FileText,
  Search,
  Film,
  Palette,
  Globe,
  Megaphone,
  Target,
  Bot,
  Quote,
  Star,
  Linkedin,
  Twitter,
  Mail,
  Phone,
} from "lucide-react";

import founderHuzaifa from "@/assets/founder-huzaifa.png";
import founderFaiz from "@/assets/founder-faiz.jpg";
import showLinkedin from "@/assets/showcase-linkedin.jpg";
import showSaas from "@/assets/showcase-saas.jpg";
import showBrand from "@/assets/showcase-brand.jpg";
import showAi from "@/assets/showcase-ai.jpg";
import showFounder from "@/assets/showcase-founder.jpg";
import showCarousel from "@/assets/showcase-carousel.jpg";

/* -------------------- Custom cursor -------------------- */
function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 220, damping: 22, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 220, damping: 22, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[data-hover]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [dotX, dotY]);

  if (typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full bg-[var(--accent-warm)] mix-blend-difference"
      />
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        animate={{ scale: hover ? 1.6 : 1, backgroundColor: hover ? "rgba(201,168,76,0.18)" : "rgba(0,0,0,0)" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-4 -mt-4 h-8 w-8 rounded-full border border-[var(--accent-warm)]"
      />
    </>
  );
}

/* -------------------- Nav -------------------- */
function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 40)), [scrollY]);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3 backdrop-blur-xl bg-paper/70 border-b border-hairline" : "py-6 bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-tight text-ink">Linq<span className="italic text-accent-warm">Writes</span></span>
        </a>
        <nav className="hidden items-center gap-10 text-sm text-ink-soft md:flex">
          {[
            ["Work", "#work"],
            ["Services", "#services"],
            ["About", "#about"],
            ["Contact", "#contact"],
          ].map(([l, h]) => (
            <a key={l} href={h} className="group relative transition hover:text-ink">
              {l}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-[var(--paper)] transition hover:bg-[var(--ink-soft)]">
          Start a project
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.header>
  );
}

/* -------------------- Reveal helper -------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

/* -------------------- Hero -------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  return (
    <section ref={ref} id="top" className="relative isolate grain overflow-hidden bg-paper pt-40 pb-28 md:pt-48 md:pb-40" onMouseMove={(e) => { const r = (e.currentTarget as HTMLElement).getBoundingClientRect(); mx.set((e.clientX - r.left - r.width / 2) / 30); my.set((e.clientY - r.top - r.height / 2) / 30); }}>
      {/* Floating gradients */}
      <motion.div style={{ x: mx, y: my }} className="pointer-events-none absolute -left-32 top-20 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.12_80/0.28),transparent_70%)] blur-2xl" />
      <motion.div style={{ x: useTransform(mx, (v) => -v), y: useTransform(my, (v) => -v) }} className="pointer-events-none absolute -right-40 top-60 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,oklch(0.72_0.13_55/0.22),transparent_70%)] blur-2xl" />

      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0} className="mb-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.25em] text-ink-soft backdrop-blur">
          <Sparkles size={12} className="text-accent-warm" /> Creative Growth Studio
        </motion.p>

        <h1 className="font-display text-[clamp(2.6rem,7vw,6.5rem)] font-light leading-[0.98] text-ink">
          {["Create a bold", "founder presence", "that turns attention", "into trust."].map((line, i) => (
            <motion.span
              key={line}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={i + 1}
              className="block"
            >
              {i === 1 ? (
                <em className="not-italic font-display italic text-accent-warm">{line}</em>
              ) : i === 3 ? (
                <>
                  into <em className="not-italic font-display italic text-accent-warm">trust.</em>
                </>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={6} className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
          LinqWrites helps startups and founders grow through strategic storytelling, personal branding,
          content systems, design, and AI-powered workflows.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={7} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="#contact" className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm text-[var(--paper)] shadow-lift transition hover:-translate-y-0.5 hover:shadow-[0_50px_120px_-30px_rgba(0,0,0,0.35)]">
            Start a project
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a href="#work" className="group inline-flex items-center gap-3 rounded-full border border-hairline bg-white/5 px-7 py-4 text-sm text-ink backdrop-blur transition hover:bg-white/10">
            View our work
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={9} className="mt-24 flex flex-col items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">
          <span>Scroll</span>
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="block h-10 w-px bg-ink/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* -------------------- Marquee -------------------- */
function Marquee() {
  const items = [
    { src: showLinkedin, label: "LinkedIn growth" },
    { src: showSaas, label: "SaaS landing" },
    { src: showBrand, label: "Brand identity" },
    { src: showAi, label: "AI workflows" },
    { src: showCarousel, label: "Content systems" },
    { src: showFounder, label: "Founder branding" },
  ];
  return (
    <section className="relative overflow-hidden bg-paper py-20">
      <div className="mb-10 px-6">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 border-b border-hairline pb-6">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">Selected work · 2024 — Now</p>
          <p className="hidden text-sm text-ink-soft md:block">Branding · Content · Design · Automation</p>
        </div>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[var(--paper)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[var(--paper)] to-transparent" />
        <div className="flex w-max marquee-track gap-8 px-8">
          {[...items, ...items].map((it, i) => (
            <figure key={i} className="group relative h-[380px] w-[520px] shrink-0 overflow-hidden rounded-3xl bg-paper-warm shadow-soft transition duration-700 hover:shadow-lift">
              <img src={it.src} alt={it.label} loading="lazy" className="h-full w-full object-cover transition duration-[1.4s] group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent p-5 text-sm text-white">
                <span>{it.label}</span>
                <ArrowUpRight size={16} />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- About / Story -------------------- */
function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-paper-warm py-32 md:py-44">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-10 text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">
            (01) — The Founders
          </motion.p>
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="font-display text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05] text-ink">
            <Quote size={36} className="mb-6 inline-block -rotate-6 text-accent-warm" />
            <br />
            <em className="italic">“Most founders don’t need more ideas. They need clearer positioning.”</em>
          </motion.h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1} className="mt-12 max-w-xl space-y-5 text-base leading-relaxed text-ink-soft">
            <p>
              LinqWrites was built by <span className="text-ink">Huzaifa</span> &amp; <span className="text-ink">Faiz</span>
              {" "}— two operators who believe that smart founders deserve to sound like themselves online: sharp,
              specific, human. Not robotic, corporate, or forgettable.
            </p>
            <p>
              We design narrative systems — the words, the visuals, the workflows — so the right people start
              paying attention, and stay.
            </p>
            <div className="grid grid-cols-3 gap-8 pt-10">
              {[["120+","Founders served"],["38M+","Impressions generated"],["4.9","Avg. client rating"]].map(([n,l])=>(
                <div key={l as string}>
                  <div className="font-display text-3xl text-ink">{n}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-ink-soft">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative md:col-span-5">
          <motion.div style={{ y: y1 }} className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-lift">
            <img src={founderHuzaifa} alt="Huzaifa — co-founder of LinqWrites" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-4 py-1.5 text-xs tracking-wide text-ink backdrop-blur">Huzaifa — Strategy &amp; Voice</div>
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute -bottom-16 -left-6 hidden aspect-[3/4] w-2/3 overflow-hidden rounded-3xl shadow-lift md:block">
            <img src={founderFaiz} alt="Faiz — co-founder of LinqWrites" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-4 py-1.5 text-xs tracking-wide text-ink backdrop-blur">Faiz — Design &amp; Systems</div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto mt-32 max-w-7xl px-6">
        <p className="mb-6 text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">Trusted by founders building at</p>
        <div className="flex flex-wrap items-center gap-x-12 gap-y-6 opacity-70">
          {["Northwind", "Cinder", "Halcyon", "Meridian", "Foundry", "Cobalt", "Atlas Labs"].map((n) => (
            <span key={n} className="font-display text-2xl italic text-ink-soft transition hover:text-ink">{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Services -------------------- */
const services = [
  { icon: PenLine, title: "LinkedIn Ghostwriting", desc: "Founder-led posts that sound like you on your sharpest day — every week." },
  { icon: Layers, title: "Personal Branding", desc: "An identity, a tone, a thesis. Built so the right rooms start knowing your name." },
  { icon: FileText, title: "Content Writing", desc: "Long-form articles, newsletters and thought pieces engineered for compounding trust." },
  { icon: Search, title: "SEO & Blog Writing", desc: "Search-first content systems that bring buyers, not just browsers." },
  { icon: Film, title: "Script Writing", desc: "Hooks, narratives and CTAs for short-form video that earns the swipe." },
  { icon: Palette, title: "Logo & Brand Identity", desc: "Visual systems with the restraint and confidence of a category leader." },
  { icon: Globe, title: "Website Development", desc: "Cinematic, fast, conversion-tuned sites — designed and shipped end to end." },
  { icon: Megaphone, title: "Social Media Management", desc: "A weekly rhythm across platforms — strategy, creative, posting, reporting." },
  { icon: Target, title: "Ad Management", desc: "Paid acquisition and retargeting funnels tuned to your real economics." },
  { icon: Bot, title: "AI Automation", desc: "Custom AI workflows that compress 20 hours of busywork into a quiet afternoon." },
];

function Services() {
  return (
    <section id="services" className="relative bg-paper py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">(02) — Capabilities</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05] text-ink">
              Ten disciplines.<br />
              <em className="italic text-accent-warm">One narrative system.</em>
            </h2>
          </div>
          <p className="max-w-md text-ink-soft md:text-right">
            We stitch strategy, writing, design and automation into one engine — so growth stops feeling
            like a guessing game.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-hairline bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              data-hover
              className="group relative isolate flex h-full flex-col justify-between gap-12 bg-[var(--paper)] p-8 transition duration-700 hover:bg-paper-warm"
            >
              <div className="flex items-start justify-between">
                <s.icon size={26} strokeWidth={1.4} className="text-ink transition group-hover:text-accent-warm" />
                <span className="text-xs tabular-nums text-ink-soft">0{i + 1 < 10 ? i + 1 : i + 1}</span>
              </div>
              <div>
                <h3 className="font-display text-2xl text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink-soft transition group-hover:text-ink">
                  Explore <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-accent-warm transition-transform duration-700 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Testimonials carousel -------------------- */
const testimonials = [
  { quote: "LinqWrites turned my LinkedIn from a graveyard into a pipeline. Three enterprise calls in the first month.", name: "Ananya Rao", role: "Founder, Northwind AI" },
  { quote: "Finally, content that sounds like me — only sharper. Inbound went from 0 to 14 qualified leads in 6 weeks.", name: "Daniel Okafor", role: "CEO, Cinder Labs" },
  { quote: "They built the brand, the site and the AI workflows. We launched in 19 days and looked five years old.", name: "Mira Pereira", role: "Co-founder, Halcyon" },
  { quote: "Strategic, fast and emotionally intelligent. The clearest creative partner we’ve ever worked with.", name: "Yusuf Demir", role: "Founder, Meridian" },
  { quote: "Our LinkedIn now closes deals before the sales call even happens. That’s the bar.", name: "Priya Shankar", role: "GTM Lead, Foundry" },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);
  const t = testimonials[i];
  return (
    <section className="relative overflow-hidden bg-ink py-32 text-[var(--paper)] md:py-44">
      <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.12_80/0.22),transparent_70%)] blur-2xl" />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="mb-10 text-[0.7rem] uppercase tracking-[0.3em] text-white/50">(03) — Founder Voices</p>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="mb-8 flex justify-center gap-1 text-accent-warm">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={14} fill="currentColor" strokeWidth={0} />)}
              </div>
              <blockquote className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-[1.2] italic">
                “{t.quote}”
              </blockquote>
              <div className="mt-10 text-sm uppercase tracking-[0.25em] text-white/70">
                {t.name} <span className="text-white/40">— {t.role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-14 flex justify-center gap-3">
          {testimonials.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Show testimonial ${k + 1}`} className={`h-1 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-accent-warm" : "w-4 bg-white/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Projects -------------------- */
const projects = [
  { tag: "Founder Branding", title: "From silent operator to LinkedIn voice of the category.", body: "A 90-day narrative system for a B2B SaaS founder: positioning, weekly ghostwritten posts, and a content engine that turned cold inbound into closed pipeline.", img: showLinkedin },
  { tag: "SaaS Landing", title: "A launch site that closed the seed round in 11 days.", body: "End-to-end identity, copy and a cinematic Next.js site for an AI infra startup — engineered for clarity, conversion and credibility.", img: showSaas },
  { tag: "LinkedIn Growth", title: "0 → 42,000 followers in 7 months, 100% organic.", body: "Founder-led content with sharp hooks, opinionated POVs and visual carousels designed to be saved, shared and remembered.", img: showCarousel },
  { tag: "AI Workflows", title: "Cutting 22 weekly hours of busywork — without a single hire.", body: "Custom AI agents wired into the team’s stack: research, drafting, reporting, CRM hygiene. Quiet leverage, on tap.", img: showAi },
  { tag: "Content Strategy", title: "A messaging system the whole company could stand behind.", body: "Brand voice, narrative pillars and editorial cadence — codified into a 24-page operating manual the team actually uses.", img: showBrand },
];

function Projects() {
  return (
    <section id="work" className="relative bg-paper py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-24 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">(04) — Case Studies</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05] text-ink">
              Work that compounds.<br />
              <em className="italic text-accent-warm">Stories that close.</em>
            </h2>
          </div>
          <a href="#contact" className="group inline-flex items-center gap-2 text-sm text-ink">
            Full archive <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="space-y-32">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-1 items-center gap-12 md:grid-cols-12 ${i % 2 ? "md:[&>figure]:order-2" : ""}`}
            >
              <figure data-hover className="group relative col-span-7 overflow-hidden rounded-3xl shadow-soft transition duration-700 hover:shadow-lift">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-[1.6s] group-hover:scale-[1.04]" />
                </div>
              </figure>
              <div className="col-span-5">
                <p className="mb-4 text-[0.7rem] uppercase tracking-[0.3em] text-accent-warm">{p.tag}</p>
                <h3 className="font-display text-3xl font-light leading-tight text-ink md:text-4xl">{p.title}</h3>
                <p className="mt-5 max-w-md text-ink-soft">{p.body}</p>
                <a href="#contact" className="mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm uppercase tracking-widest text-ink">
                  Read case <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- CTA with mouse-follow -------------------- */
function PartnerCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  return (
    <section
      id="contact"
      ref={ref}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="relative isolate grain overflow-hidden bg-paper-warm py-40 md:py-56"
    >
      <motion.div style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }} className="pointer-events-none absolute left-0 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,oklch(0.72_0.13_55/0.28),transparent_65%)] blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <p className="mb-10 text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">(05) — Let’s build</p>
        <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="font-display text-[clamp(2.4rem,7vw,6rem)] font-light leading-[0.98] text-ink">
          Build something <em className="italic text-accent-warm">people remember.</em>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }} className="mx-auto mt-10 max-w-xl text-lg leading-relaxed text-ink-soft">
          Visibility compounds. Authority scales. Trust closes.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.35 }} className="mt-14">
          <a href="mailto:linqwrites@gmail.com" data-hover className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-5 text-sm text-[var(--paper)] shadow-lift transition hover:-translate-y-0.5">
            Start a chat with LinqWrites
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-ink-soft">
          <a href="mailto:linqwrites@gmail.com" className="inline-flex items-center gap-2 hover:text-ink"><Mail size={14}/> linqwrites@gmail.com</a>
          <a href="tel:+917381442999" className="inline-flex items-center gap-2 hover:text-ink"><Phone size={14}/> +91 73814 42999</a>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Footer -------------------- */
function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
        <div className="col-span-2">
          <div className="font-display text-3xl text-ink">Linq<em className="italic text-accent-warm">Writes</em></div>
          <p className="mt-4 max-w-sm text-sm text-ink-soft">Creative systems for founders who want to be remembered.</p>
        </div>
        <div>
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.25em] text-ink-soft">Studio</p>
          <ul className="space-y-2 text-sm text-ink">
            <li><a href="#services" className="hover:text-accent-warm">Services</a></li>
            <li><a href="#work" className="hover:text-accent-warm">Work</a></li>
            <li><a href="#about" className="hover:text-accent-warm">About</a></li>
            <li><a href="#contact" className="hover:text-accent-warm">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.25em] text-ink-soft">Elsewhere</p>
          <ul className="space-y-2 text-sm text-ink">
            <li><a href="#" className="inline-flex items-center gap-2 hover:text-accent-warm"><Linkedin size={14}/> LinkedIn</a></li>
            <li><a href="#" className="inline-flex items-center gap-2 hover:text-accent-warm"><Twitter size={14}/> X / Twitter</a></li>
            <li><a href="mailto:linqwrites@gmail.com" className="inline-flex items-center gap-2 hover:text-accent-warm"><Mail size={14}/> Email</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-hairline px-6 pt-8 text-xs text-ink-soft md:flex-row md:items-center">
        <span>© {new Date().getFullYear()} LinqWrites. All rights reserved.</span>
        <span>Master your narrative.</span>
      </div>
    </footer>
  );
}

/* -------------------- Floating CTA -------------------- */
function FloatingCTA() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setShow(v > 600)), [scrollY]);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          data-hover
          className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-ink px-5 py-3 text-xs uppercase tracking-widest text-[var(--paper)] shadow-lift md:inline-flex"
        >
          Start a project <ArrowUpRight size={14} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* -------------------- Page -------------------- */
export function LinqLanding() {
  return (
    <div className="bg-paper text-ink">
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Services />
        <Testimonials />
        <Projects />
        <PartnerCTA />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}