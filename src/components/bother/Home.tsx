import { PairedRails } from "./VisualDevices";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "./SiteChrome";
import { Reveal } from "./Reveal";
import { ClipLine, Magnetic, ScrollHighlight } from "./Motion";
import { VideoFrame, HERO_CLIP, PROCESS_CLIP } from "./VideoFrame";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import processPoster from "@/assets/process-poster.jpg.asset.json";
import founderHuzaifa from "@/assets/founder-huzaifa.png";
import founderFaiz from "@/assets/founder-faiz.jpg";

const PROBLEMS = [
  {
    n: "01",
    title: "People don't understand you",
    body: "You know what you believe. Your market hears a blur. The signal exists, it is just never said the same way twice.",
    to: "/imagine",
    path: "Signal",
  },
  {
    n: "02",
    title: "Your surface isn't carrying it",
    body: "The conversation goes well until someone opens the site. Then the argument loses shape and the decision stalls.",
    to: "/deep-dive",
    path: "Carry",
  },
  {
    n: "03",
    title: "The same work keeps repeating",
    body: "The same follow-up, the same copy-paste, the same missed lead. Manual work that used to be fine is now the ceiling.",
    to: "/labs",
    path: "Systems",
  },
] as const;

const PATHS = [
  {
    n: "01",
    name: "Signal",
    to: "/imagine",
    line: "Authority and content.",
    forWhen: "For when your point of view is real but nobody outside the room can repeat it back to you.",
    from: "$1,500/mo",
  },
  {
    n: "02",
    name: "Carry",
    to: "/deep-dive",
    line: "Customer-facing surfaces.",
    forWhen: "For when attention arrives and the website, copy, or proof loses it before the decision.",
    from: "$1,800/mo",
  },
  {
    n: "03",
    name: "Systems",
    to: "/labs",
    line: "Operational leverage.",
    forWhen: "For when repeated manual work is quietly setting the limit on what the business can take on.",
    from: "$1,500/mo",
  },
] as const;

export function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteNav />

      <main>
        {/* Hero */}
        <section className="wrap pb-20 pt-20 md:pb-28 md:pt-28">
          <div className="rail">
            <p className="rail-label">
              <b>00</b> / Clarity and systems studio
            </p>
            <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
              <div>
                <h1 className="t-display max-w-[16ch]">
                  <ClipLine>Good work gets expensive</ClipLine>
                  <ClipLine delay={0.14}>when people cannot see it.</ClipLine>
                </h1>
                <p className="measure t-lead mt-8 text-ink-soft">
                  BOTHER finds the signal, then helps it carry — through authority, customer-facing surfaces,
                  and systems that stop useful work from being repeated badly.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <Link to="/book-your-sprint" className="btn btn-primary" data-cursor="start">
                      Find the friction <ArrowRight size={16} />
                    </Link>
                  </Magnetic>
                  <Magnetic>
                    <Link to="/deep-dive" className="btn btn-quiet">
                      See how we carry it
                    </Link>
                  </Magnetic>
                </div>
              </div>
              <VideoFrame
                src={HERO_CLIP}
                poster={heroPoster.url}
                ratio="3 / 4"
                caption="Working notes, not slogans"
              />
            </div>
          </div>
        </section>

        {/* Problems */}
        <section className="section pin-seq">
          <div className="wrap rail">
            <p className="rail-label">
              <b>01</b> / Where it breaks
            </p>
            <div>
              <h2 className="t-h2 pin-seq-inner max-w-[20ch] bg-paper py-2">
                Three plain problems. One of them is yours right now.
              </h2>
              <ul className="mt-12 divide-y divide-[var(--rule)] border-y border-rule">
                {PROBLEMS.map((p, i) => (
                  <Reveal as="li" key={p.n} delay={i * 0.05}>
                    <Link
                      to={p.to}
                      className="group grid gap-3 py-8 transition-transform duration-300 hover:translate-x-1 md:grid-cols-[4rem_minmax(0,1fr)_10rem]"
                    >
                      <span className="rail-label">{p.n}</span>
                      <span>
                        <span className="t-h3 block">{p.title}</span>
                        <span className="t-body mt-3 block max-w-[55ch] text-ink-soft">{p.body}</span>
                      </span>
                      <span className="t-label flex items-start gap-2 text-amber md:justify-end">
                        {p.path}
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="wrap flex justify-center py-2">
          <PairedRails />
        </div>

        {/* Statement */}
        <section className="section">
          <div className="wrap rail">
            <p className="rail-label">
              <b>01b</b> / The point
            </p>
            <ScrollHighlight
              className="t-h2 max-w-[22ch]"
              tone="amber"
              text="We make the important thing easier to see, easier to say, and easier to run."
            />
          </div>
        </section>

        {/* Paths */}
        <section className="section on-teal">
          <div className="wrap rail">
            <p className="rail-label">
              <b>02</b> / The three jobs
            </p>
            <div className="space-y-px bg-[var(--rule)]">
              {PATHS.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.05} className="bg-teal">
                  <Link
                    to={p.to}
                    className={`group grid items-end gap-6 py-10 md:grid-cols-12 ${
                      i === 1 ? "md:pl-16" : i === 2 ? "md:pl-32" : ""
                    }`}
                  >
                    <div className="md:col-span-5">
                      <p className="rail-label">{p.n}</p>
                      <h3 className="font-display mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-none">
                        {p.name}
                      </h3>
                      <p className="t-label mt-3 text-amber">{p.line}</p>
                    </div>
                    <p className="t-body max-w-[50ch] text-ink-soft md:col-span-6">{p.forWhen}</p>
                    <p className="t-label flex items-center gap-2 md:col-span-1 md:justify-end">
                      {p.from}
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Proof */}
        <section className="section">
          <div className="wrap rail">
            <p className="rail-label">
              <b>03</b> / Proof
            </p>
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_16rem] md:items-start">
              <div>
              <h2 className="t-h2 max-w-[20ch]">We bothered ourselves first.</h2>
              <div className="measure mt-8 space-y-5 text-ink-soft">
                <p className="t-body">
                  This studio used to be called LinqWrites. The work was good. The name explained one service,
                  the site sold five, and every enquiry started with the same question: so what do you
                  actually do.
                </p>
                <p className="t-body">
                  So we ran our own diagnostic. We wrote down what people kept misunderstanding, cut the
                  services back to three connected jobs, and renamed the studio after the behaviour that
                  built it. Same team, same standards, a sentence a stranger can repeat.
                </p>
                <p className="t-body">
                  It is the first honest case study here, and the only one with no client data attached to it.
                </p>
              </div>
              <Link to="/origin" className="btn btn-quiet mt-8">
                Read the origin <ArrowRight size={16} />
              </Link>
              </div>
              <VideoFrame
                src={PROCESS_CLIP}
                poster={processPoster.url}
                ratio="4 / 5"
                caption="The diagnostic, in practice"
              />
            </div>
          </div>
        </section>

        {/* Pricing route */}
        <section className="section">
          <div className="wrap rail">
            <p className="rail-label">
              <b>04</b> / Where pricing starts
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {PATHS.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.05} className="flex">
                  <Link to={p.to} className="card flex w-full flex-col transition-transform duration-300 hover:-translate-y-1">
                    <h2 className="t-h3">{p.name}</h2>
                    <p className="font-display mt-3 text-[2rem] font-bold leading-none">{p.from}</p>
                    <p className="t-body mt-4 text-ink-soft">{p.line}</p>
                    <span className="t-label mt-6 flex items-center gap-2 text-amber">
                      See the tiers <ArrowRight size={14} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Origin teaser */}
        <section className="section">
          <div className="wrap rail">
            <p className="rail-label">
              <b>05</b> / Origin
            </p>
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_16rem]">
              <div>
                <h2 className="t-h2 max-w-[22ch]">One brother kept bothering the other until it became a company.</h2>
                <p className="measure t-body mt-6 text-ink-soft">
                  Faiz and Huzaifa. The interruption was never rude, it was useful: the question that made the
                  vague thing specific. That is still the method, and it is why the studio is named after it.
                </p>
                <Link to="/origin" className="btn btn-quiet mt-8">
                  About BOTHER <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                <figure className="frame overflow-hidden">
                  <img
                    src={founderFaiz}
                    alt="Faiz, co-founder of BOTHER"
                    width={512}
                    height={512}
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                  <figcaption className="t-label mt-2 text-ink-soft">Faiz</figcaption>
                </figure>
                <figure className="frame overflow-hidden">
                  <img
                    src={founderHuzaifa}
                    alt="Huzaifa, co-founder of BOTHER"
                    width={512}
                    height={512}
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                  <figcaption className="t-label mt-2 text-ink-soft">Huzaifa</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="section on-ink">
          <div className="wrap rail">
            <p className="rail-label">
              <b>06</b> / Start
            </p>
            <div>
              <h2 className="t-h2 max-w-[20ch]">You do not need to know which service to buy.</h2>
              <p className="measure t-lead mt-6 text-ink-soft">
                Start by explaining what feels stuck. The diagnostic is a short conversation: what people
                misunderstand, where attention leaks, and what work keeps repeating. You leave with the
                shortlist either way.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link to="/book-your-sprint" className="btn btn-signal" data-cursor="start">
                    Find the friction <ArrowRight size={16} />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link to="/contact" className="btn btn-quiet">
                    Or send a note
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
