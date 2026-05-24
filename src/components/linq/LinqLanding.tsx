import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "motion/react";
import { Link } from "@tanstack/react-router";
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
  Music2,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";

import founderHuzaifa from "@/assets/founder-huzaifa.png";
import founderFaiz from "@/assets/founder-faiz.jpg";
import showLinkedin from "@/assets/showcase-linkedin.jpg";
import showSaas from "@/assets/showcase-saas.jpg";
import showBrand from "@/assets/showcase-brand.jpg";
import showAi from "@/assets/showcase-ai.jpg";
import showFounder from "@/assets/showcase-founder.jpg";
import showCarousel from "@/assets/showcase-carousel.jpg";
import linqLogo from "@/assets/linq-logo.webp";
import { ContactForm } from "./ContactForm";
import { caseStudies } from "./caseStudies";

/* -------------------- Custom cursor -------------------- */
function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 220, damping: 22, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 220, damping: 22, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  if (!mounted) return null;
  if (window.matchMedia?.("(pointer: coarse)").matches) return null;

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
          <img src={linqLogo} alt="LinqWrites" className="h-9 w-9 rounded-full ring-1 ring-accent-warm/40 shadow-soft" />
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
      {/* Ambient video background — responsive cover */}
      <video
        aria-hidden
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
        src="/linq-hero.mp4"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-paper/70 via-paper/55 to-paper" />
      {/* Floating gradients */}
      <motion.div style={{ x: mx, y: my }} className="pointer-events-none absolute -left-32 top-20 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.12_80/0.28),transparent_70%)] blur-2xl" />
      <motion.div style={{ x: useTransform(mx, (v) => -v), y: useTransform(my, (v) => -v) }} className="pointer-events-none absolute -right-40 top-60 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,oklch(0.72_0.13_55/0.22),transparent_70%)] blur-2xl" />

      <motion.div style={{ y, opacity }} className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <div className="text-center md:text-left">
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0} className="mb-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.25em] text-ink-soft backdrop-blur">
            <Sparkles size={12} className="text-accent-warm" /> Creative Growth Studio
          </motion.p>

          <h1 className="font-display text-[clamp(2.4rem,6vw,5.5rem)] font-light leading-[0.98] text-ink">
            {["Master the", "founder narrative", "the internet", "wants to follow."].map((line, i) => (
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
                    wants to <em className="not-italic font-display italic text-accent-warm">follow.</em>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={6} className="mt-10 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            LinqWrites helps startups and founders grow through strategic storytelling, personal branding,
            content systems, design and AI powered workflows.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={7} className="mt-12 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a href="#contact" className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm text-[var(--paper)] shadow-lift transition hover:-translate-y-0.5">
              Start a project
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#work" className="group inline-flex items-center gap-3 rounded-full border border-hairline bg-white/5 px-7 py-4 text-sm text-ink backdrop-blur transition hover:bg-white/10">
              View our work
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >
          <HeroVideo />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* -------------------- Hero Video (replaces globe) -------------------- */
function HeroVideo() {
  return (
    <div className="relative aspect-square w-full max-w-[520px]">
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-6 rounded-full bg-[conic-gradient(from_0deg,oklch(0.82_0.14_80/0.35),transparent_30%,transparent_70%,oklch(0.72_0.13_55/0.35))] blur-2xl opacity-70"
      />
      <div className="liquid-glass relative h-full w-full rounded-[2.5rem] shadow-lift">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full rounded-[2.5rem] object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4"
        />
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-white/80">
          <span className="inline-flex items-center gap-2"><Sparkles size={12} className="text-accent-warm" /> Live reel</span>
          <span>LinqWrites · 2026</span>
        </div>
      </div>
    </div>
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
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">Selected work · 2024, Now</p>
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
      <div className="pointer-events-none absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,oklch(0.82_0.14_80/0.12),transparent_70%)] blur-3xl" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-10 text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">
          (01) · The Founders
        </motion.p>
        <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl font-display text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05] text-ink">
          <Quote size={32} className="mb-6 inline-block -rotate-6 text-accent-warm" />
          <br />
          <em className="italic">“Most founders don’t need more ideas. They need clearer positioning.”</em>
        </motion.h2>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={1} className="mt-12 grid max-w-3xl gap-5 text-base leading-relaxed text-ink-soft md:text-lg">
          <p>
            LinqWrites is a two person studio built by <span className="text-ink">Huzaifa</span> &amp; <span className="text-ink">Faiz</span>,
            operators who believe smart founders deserve to sound like themselves online: sharp, specific, human.
            Not robotic, corporate, or forgettable.
          </p>
          <p>
            We design narrative systems, the words, the visuals, the workflows, so the right people start
            paying attention, and stay.
          </p>
        </motion.div>

        {/* Founders grid, both visible on every screen */}
        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          {[
            { img: founderHuzaifa, name: "Huzaifa", role: "Co founder · Strategy & Voice", bio: "Obsessed with positioning, narrative arcs and the founder voice. Architects the words that make people lean in.", y: y1 },
            { img: founderFaiz, name: "Faiz", role: "Co founder · Design & Systems", bio: "Lives at the intersection of taste and ops. Designs the visuals, the systems and the AI that make it all run quietly.", y: y2 },
          ].map((f) => (
            <motion.figure
              key={f.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <motion.div style={{ y: f.y }} className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-paper shadow-lift">
                <img
                  src={f.img}
                  alt={`${f.name}, co-founder of LinqWrites`}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition duration-[1.6s] group-hover:grayscale-0 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="font-display text-3xl text-[var(--paper)] mix-blend-difference">{f.name}</div>
                  <div className="mt-1 text-[0.7rem] uppercase tracking-[0.25em] text-white/80">{f.role}</div>
                </div>
              </motion.div>
              <figcaption className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">{f.bio}</figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="mt-20 grid grid-cols-3 gap-8 border-t border-hairline pt-12">
          {[["42","Founders served"],["13M+","Impressions generated"],["4.1","Avg. client rating"]].map(([n,l])=>(
            <div key={l}>
              <div className="font-display text-3xl text-ink md:text-4xl">{n}</div>
              <div className="mt-2 text-[0.65rem] uppercase tracking-widest text-ink-soft md:text-xs">{l}</div>
            </div>
          ))}
        </motion.div>
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
  { icon: PenLine, title: "LinkedIn Ghostwriting", desc: "Founder led posts that sound like you on your sharpest day, every week.", slug: "halcyon-linkedin-growth" },
  { icon: Layers, title: "Personal Branding", desc: "An identity, a tone, a thesis. Built so the right rooms start knowing your name.", slug: "northwind-founder-voice" },
  { icon: FileText, title: "Content Writing", desc: "Long form articles, newsletters and thought pieces engineered for compounding trust.", slug: "foundry-content-system" },
  { icon: Search, title: "SEO & Blog Writing", desc: "Search first content systems that bring buyers, not just browsers.", slug: "foundry-content-system" },
  { icon: Film, title: "Script Writing", desc: "Hooks, narratives and CTAs for short form video that earns the swipe.", slug: "halcyon-linkedin-growth" },
  { icon: Palette, title: "Logo & Brand Identity", desc: "Visual systems with the restraint and confidence of a category leader.", slug: "cinder-saas-launch" },
  { icon: Globe, title: "Website Development", desc: "Cinematic, fast, conversion tuned sites, designed and shipped end to end.", slug: "cinder-saas-launch" },
  { icon: Megaphone, title: "Social Media Management", desc: "A weekly rhythm across platforms, strategy, creative, posting, reporting.", slug: "halcyon-linkedin-growth" },
  { icon: Target, title: "Ad Management", desc: "Paid acquisition and retargeting funnels tuned to your real economics.", slug: "northwind-founder-voice" },
  { icon: Bot, title: "AI Automation", desc: "Custom AI workflows that compress 20 hours of busywork into a quiet afternoon.", slug: "meridian-ai-workflows" },
];

function Services() {
  return (
    <section id="services" className="relative bg-paper py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">(02), Capabilities</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05] text-ink">
              Ten disciplines.<br />
              <em className="italic text-accent-warm">One narrative system.</em>
            </h2>
          </div>
          <p className="max-w-md text-ink-soft md:text-right">
            We stitch strategy, writing, design and automation into one engine, so growth stops feeling
            like a guessing game.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-hairline bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/case/$slug"
                params={{ slug: s.slug }}
                data-hover
                className="group relative isolate flex h-full flex-col justify-between gap-12 bg-[var(--paper)] p-8 transition duration-700 hover:bg-paper-warm"
              >
                <div className="flex items-start justify-between">
                  <s.icon size={26} strokeWidth={1.4} className="text-ink transition group-hover:text-accent-warm" />
                  <span className="text-xs tabular-nums text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl text-ink">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink-soft transition group-hover:text-ink">
                    Explore <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-accent-warm transition-transform duration-700 group-hover:scale-x-100" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Testimonials carousel -------------------- */
const testimonials = [
  { quote: "LinqWrites turned my LinkedIn from a graveyard into a pipeline. Three enterprise calls in the first month.", name: "Ananya Rao", role: "Founder, Northwind AI" },
  { quote: "Finally, content that sounds like me, only sharper. Inbound went from 0 to 14 qualified leads in 6 weeks.", name: "Daniel Okafor", role: "CEO, Cinder Labs" },
  { quote: "They built the brand, the site and the AI workflows. We launched in 19 days and looked five years old.", name: "Mira Pereira", role: "Co-founder, Halcyon" },
  { quote: "Strategic, fast and emotionally intelligent. The clearest creative partner we’ve ever worked with.", name: "Yusuf Demir", role: "Founder, Meridian" },
  { quote: "Our LinkedIn now closes deals before the sales call even happens. That’s the bar.", name: "Priya Shankar", role: "GTM Lead, Foundry" },
];

/* -------------------- Pricing -------------------- */
const pricingTiers = [
  { name: "LinkedIn Post Pack", price: "$49", cadence: "flagship", headline: "Your voice. Their attention.", description: "The fastest way to show up on LinkedIn without writing a single word yourself. Built for founders and executives who know LinkedIn matters but never have time to post.", features: ["10 ready to post LinkedIn posts", "Written in your exact voice", "Delivered in 24 hours", "Google Doc — copy paste done", "Hook + body + CTA + hashtags", "One revision included"], featured: true },
  { name: "Personal Branding", price: "$149", cadence: "one time", headline: "A voice, a position, a presence.", description: "We build the complete foundation of your LinkedIn personal brand — so every post, every DM, every pitch sounds unmistakably like you.", features: ["Full LinkedIn profile rewrite (Headline, About, Experience)", "Brand voice document (tone, words, style guide)", "Positioning statement (who you help and how)", "30 day content thesis", "Featured section setup", "One strategy call included"] },
  { name: "Long Form Writing", price: "$85", cadence: "per piece", headline: "Articles, essays, newsletters.", description: "Deeply researched long form content built to compound trust, travel beyond your immediate network, and establish you as the authority in your space.", features: ["1,200 - 2,500 words", "Full research included", "Written in your voice", "SEO structured", "Distribution notes included", "One revision pass"] },
  { name: "SEO Blog System", price: "$199", cadence: "per month", headline: "Buyers. Not browsers.", description: "Four search-first blog posts every month that rank on Google, educate your ideal buyer, and drive them to your offer without paid ads.", features: ["4 blog posts per month", "Full keyword research", "On-page SEO optimised", "Internal linking strategy", "Google Doc delivery", "Monthly performance report"] },
  { name: "Script Writing", price: "$39", cadence: "per script", headline: "Hooks that earn the swipe.", description: "Short form video scripts built for maximum retention — opening hooks that stop the scroll, beats that hold attention, and CTAs that actually convert.", features: ["Up to 90 seconds", "Hook variations included", "Shot suggestions", "LinkedIn · Reels · Shorts ready", "One revision included"] },
  { name: "Logo + Brand Identity", price: "$199", cadence: "one time", headline: "A category leader look.", description: "A restrained, confident visual system that makes your brand impossible to ignore and easy to trust — from first glance.", features: ["Logo suite (primary + variations)", "Colour system + usage guide", "Typography pairing", "Brand guidelines document", "Business card ready", "All file formats delivered"] },
  { name: "Website Development", price: "$299", cadence: "starting at", headline: "Clean. Fast. Conversion tuned.", description: "A five to seven page marketing site designed, built and shipped end to end — modern stack, mobile first, ready to convert visitors into leads.", features: ["Custom design from scratch", "Mobile first build", "CMS or static — your choice", "Contact form + integrations", "Basic SEO setup", "Full handover + documentation", "7 day delivery"] },
  { name: "Social Media Management", price: "$149", cadence: "per month", headline: "A weekly creative rhythm.", description: "Your brand stays visible, consistent and growing — every single week — without you lifting a finger.", features: ["12 posts per month", "2 platforms included", "Written in your founder voice", "Community replies managed", "Content calendar provided", "Monthly performance report"] },
  { name: "AI Automation Workflow", price: "$149", cadence: "per workflow", headline: "Twenty hours back every week.", description: "Custom AI workflows that quietly absorb the busywork your team should never have been doing — designed, built and documented so it runs without you.", features: ["Full workflow design", "Tool integration", "Testing + quality check", "Complete documentation", "30 day support included"] },
];

function Pricing() {
  return (
    <section id="pricing" className="relative bg-paper-warm py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">(04), Pricing</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05] text-ink">
              Plain numbers.<br />
              <em className="italic text-accent-warm">No retainers in disguise.</em>
            </h2>
          </div>
          <p className="max-w-md text-ink-soft md:text-right">
            Our flagship is fixed. Everything else starts here and shifts only when scope honestly does. No hourly games.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-hairline bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-3">
          {pricingTiers.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex h-full flex-col justify-between gap-10 p-8 transition duration-700 ${p.featured ? "bg-ink text-paper" : "bg-paper hover:bg-paper-warm"}`}
            >
              <div className="flex items-start justify-between">
                <span className={`text-[0.65rem] uppercase tracking-[0.3em] ${p.featured ? "text-accent-warm" : "text-ink-soft"}`}>
                  {p.featured ? "Flagship" : "Studio rate"}
                </span>
                <span className={`text-xs tabular-nums ${p.featured ? "text-paper/70" : "text-ink-soft"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className={`font-display text-2xl ${p.featured ? "text-paper" : "text-ink"}`}>{p.name}</h3>
                <p className={`mt-2 text-sm ${p.featured ? "text-paper/70" : "text-ink-soft"}`}>{p.headline}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className={`font-display text-4xl ${p.featured ? "text-accent-warm" : "text-ink"}`}>{p.price}</span>
                  <span className={`text-xs uppercase tracking-widest ${p.featured ? "text-paper/60" : "text-ink-soft"}`}>{p.cadence}</span>
                </div>
                <p className={`mt-5 text-sm leading-relaxed ${p.featured ? "text-paper/75" : "text-ink-soft"}`}>{p.description}</p>
                <ul className="mt-6 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-xs ${p.featured ? "text-paper/80" : "text-ink-soft"}`}>
                      <span className="mt-1 h-1 w-1 rounded-full bg-accent-warm" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#contact"
                data-hover
                className={`inline-flex items-center gap-2 text-xs uppercase tracking-widest transition ${p.featured ? "text-paper hover:text-accent-warm" : "text-ink-soft hover:text-ink"}`}
              >
                {p.featured ? "Book the sprint" : "Start a project"}
                <ArrowUpRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ink-soft">
          Prices in USD. Bespoke retainers available for founders on a quarterly rhythm.
        </p>
      </div>
    </section>
  );
}

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
        <p className="mb-10 text-[0.7rem] uppercase tracking-[0.3em] text-white/50">(03), Founder Voices</p>

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
                {t.name} <span className="text-white/40">, {t.role}</span>
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

function Projects() {
  return (
    <section id="work" className="relative bg-paper py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-24 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">(04), Case Studies</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05] text-ink">
              Work that compounds.<br />
              <em className="italic text-accent-warm">Stories that close.</em>
            </h2>
          </div>
          <Link to="/" hash="contact" className="group inline-flex items-center gap-2 text-sm text-ink">
            Full archive <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="space-y-32">
          {caseStudies.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-1 items-center gap-12 md:grid-cols-12 ${i % 2 ? "md:[&>figure]:order-2" : ""}`}
            >
              <Link to="/case/$slug" params={{ slug: p.slug }} className="col-span-7">
                <figure data-hover className="group relative overflow-hidden rounded-3xl shadow-soft transition duration-700 hover:shadow-lift">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-[1.6s] group-hover:scale-[1.04]" />
                  </div>
                </figure>
              </Link>
              <div className="col-span-5">
                <p className="mb-4 text-[0.7rem] uppercase tracking-[0.3em] text-accent-warm">{p.tag}</p>
                <h3 className="font-display text-3xl font-light leading-tight text-ink md:text-4xl">{p.title}</h3>
                <p className="mt-5 max-w-md text-ink-soft">{p.excerpt}</p>
                <Link to="/case/$slug" params={{ slug: p.slug }} className="group mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm uppercase tracking-widest text-ink">
                  Read case <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Contact section with form -------------------- */
function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-paper-warm py-32 md:py-44">
      <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.12_80/0.18),transparent_70%)] blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="mb-6 text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">(05), Start a project</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05] text-ink">
            Tell us what you are <em className="italic text-accent-warm">building.</em>
          </h2>
          <p className="mt-6 max-w-md text-ink-soft">
            Founders, operators and creative teams welcome. We reply within 24 hours with a sharp first reaction.
          </p>
          <div className="mt-10 space-y-3 text-sm text-ink">
            <a href="mailto:linqwrites@gmail.com" className="inline-flex items-center gap-3 hover:text-accent-warm"><Mail size={14}/><span>linqwrites@gmail.com</span></a>
            <br />
            <a href="tel:+917381442999" className="inline-flex items-center gap-3 hover:text-accent-warm"><Phone size={14}/><span>+91 73814 42999</span></a>
          </div>
        </div>
        <div className="md:col-span-7">
          <ContactForm />
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
  const cards = [
    { src: showLinkedin, rot: -14, x: -260, y: 40, d: 0.05 },
    { src: showSaas, rot: -6, x: -120, y: -10, d: 0.12 },
    { src: showBrand, rot: 4, x: 40, y: -30, d: 0.19 },
    { src: showAi, rot: 12, x: 200, y: 10, d: 0.26 },
    { src: showCarousel, rot: 20, x: 340, y: 60, d: 0.33 },
  ];
  return (
    <section
      id="partner"
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
        <p className="mb-10 text-[0.7rem] uppercase tracking-[0.3em] text-ink-soft">(05), Let’s build</p>
        <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="font-display text-[clamp(2.4rem,7vw,6rem)] font-light leading-[0.98] text-ink">
          Partner with <em className="italic text-accent-warm">LinqWrites.</em>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }} className="mx-auto mt-10 max-w-xl text-lg leading-relaxed text-ink-soft">
          A two-person studio. A short waitlist. Tell us what you’re building, we’ll tell you what we’d do.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.35 }} className="mt-14">
          <a href="mailto:linqwrites@gmail.com" data-hover className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-5 text-sm text-[var(--paper)] shadow-lift transition hover:-translate-y-0.5">
            Start a chat with LinqWrites
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>

        {/* Floating fanned project cards, sendoff inspired */}
        <div className="relative mx-auto mt-24 hidden h-[260px] w-full max-w-3xl md:block">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80, rotate: 0 }}
              whileInView={{ opacity: 1, y: c.y, rotate: c.rot }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, delay: c.d, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: c.y - 18, rotate: c.rot * 0.6, scale: 1.05, zIndex: 20 }}
              style={{ left: `calc(50% + ${c.x}px)` }}
              className="absolute top-0 -translate-x-1/2"
            >
              <div className="h-[200px] w-[150px] overflow-hidden rounded-2xl bg-paper shadow-lift ring-1 ring-white/10">
                <img src={c.src} alt="" className="h-full w-full object-cover" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-ink-soft">
          <a href="mailto:linqwrites@gmail.com" className="inline-flex items-center gap-2 hover:text-ink"><Mail size={14}/><span>linqwrites@gmail.com</span></a>
          <a href="tel:+917381442999" className="inline-flex items-center gap-2 hover:text-ink"><Phone size={14}/><span>+91 73814 42999</span></a>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Footer -------------------- */
function Footer() {
  const columns = [
    {
      title: "Discover",
      links: [
        { label: "Labs & Workshops", to: "/labs" },
        { label: "Deep Dive Series", to: "/deep-dive" },
        { label: "Founders Circle", to: "/founders-circle" },
        { label: "Resource Vault", to: "/resource-vault" },
        { label: "Future Roadmap", to: "/roadmap" },
      ],
    },
    {
      title: "The Mission",
      links: [
        { label: "Origin Story", to: "/origin" },
        { label: "The Collective", to: "/collective" },
        { label: "Newsroom Hub", to: "/newsroom" },
        { label: "Join the Team", to: "/careers" },
      ],
    },
    {
      title: "Concierge",
      links: [
        { label: "Get in Touch", to: "/contact" },
        { label: "Legal & Privacy", to: "/legal" },
        { label: "User Agreement", to: "/terms" },
        { label: "Report a Concern", to: "/report" },
      ],
    },
  ];
  const socials: { Icon: typeof Facebook; href: string; label: string }[] = [
    { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61589520398455", label: "Facebook" },
    { Icon: Instagram, href: "https://www.instagram.com/linqwrites", label: "Instagram" },
    { Icon: Youtube, href: "https://youtube.com/@linqwrites", label: "YouTube" },
  ];
  return (
    <div className="relative w-full px-4 pb-10 md:px-8">
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="liquid-glass mx-auto mt-32 w-full max-w-7xl rounded-3xl p-6 text-white/70 md:mt-44 md:p-10"
      >
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
                <path d="M 4.688 136 C 68.373 136 120 187.627 120 251.312 C 120 252.883 119.967 254.445 119.905 256 L 0 256 L 0 136.096 C 1.555 136.034 3.117 136 4.688 136 Z M 251.312 136 C 252.883 136 254.445 136.034 256 136.096 L 256 256 L 136.095 256 C 136.032 254.438 136.001 252.875 136 251.312 C 136 187.627 187.627 136 251.312 136 Z M 119.905 0 C 119.967 1.555 120 3.117 120 4.688 C 120 68.373 68.373 120 4.687 120 C 3.117 120 1.555 119.967 0 119.905 L 0 0 Z M 256 119.905 C 254.445 119.967 252.883 120 251.312 120 C 187.627 120 136 68.373 136 4.687 C 136 3.117 136.033 1.555 136.095 0 L 256 0 Z" />
              </svg>
              <span className="text-xl font-medium tracking-tight">LINQWRITES</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              LinqWrites is a two person studio crafting narrative systems, branding and AI workflows for founders who want to be remembered. Shared with care, built with taste.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-white">{col.title}</h4>
                <ul className="space-y-2 text-xs">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="transition-colors hover:text-white">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 md:flex-row md:gap-4">
          <p className="text-[10px] uppercase tracking-widest opacity-50">Curated by @LinqWrites · © {new Date().getFullYear()}</p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest opacity-50">Join the Journey:</span>
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="opacity-70 transition-colors hover:text-white hover:opacity-100"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
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

/* -------------------- Preloader -------------------- */
function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 14 + 6);
      setProgress(Math.floor(p));
      if (p >= 100) {
        clearInterval(id);
        setTimeout(onDone, 650);
      }
    }, 110);
    return () => clearInterval(id);
  }, [onDone]);
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-paper"
    >
      <motion.div
        initial={{ scale: 1 }}
        exit={{ scale: 1.1, y: -40 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md px-8 text-center"
      >
        <motion.img
          src={linqLogo}
          alt="LinqWrites"
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 h-24 w-24 rounded-full shadow-lift ring-1 ring-accent-warm/50"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl tracking-tight text-ink md:text-6xl"
        >
          Linq<em className="italic text-accent-warm">Writes</em>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 text-[0.7rem] uppercase tracking-[0.4em] text-ink-soft"
        >
          Master your narrative
        </motion.p>
        <div className="relative mx-auto mt-12 h-px w-full overflow-hidden bg-white/10">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className="absolute inset-y-0 left-0 bg-accent-warm"
          />
        </div>
        <div className="mt-4 flex justify-between text-[0.65rem] uppercase tracking-[0.3em] text-ink-soft tabular-nums">
          <span>Loading studio</span>
          <span>{String(progress).padStart(3, "0")}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------- Page -------------------- */
export function LinqLanding() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [loading]);
  return (
    <div className="bg-paper text-ink">
      <AnimatePresence>
        {loading && <Preloader key="pre" onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Services />
        <Pricing />
        <Testimonials />
        <Projects />
        <ContactSection />
        <PartnerCTA />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}