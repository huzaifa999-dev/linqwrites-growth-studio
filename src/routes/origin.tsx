import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/bother/SiteChrome";
import { Reveal, MaskedLine } from "@/components/bother/Reveal";
import { Portrait, ScrollHighlight, Magnetic } from "@/components/bother/Motion";
import founderHuzaifa from "@/assets/founder-huzaifa.png";
import founderFaiz from "@/assets/founder-faiz.jpg";

const URL = "https://linqwrites-growth-studio.lovable.app/origin";

export const Route = createFileRoute("/origin")({
  head: () => ({
    meta: [
      { title: "About BOTHER — Two brothers, one useful interruption" },
      {
        name: "description",
        content:
          "BOTHER is run by two brothers, Faiz and Huzaifa. One kept bothering the other about the vague part until the questions became a studio. Here is how we work and what we hold to.",
      },
      { property: "og:title", content: "About BOTHER — Two brothers, one useful interruption" },
      {
        property: "og:description",
        content: "The origin, the values, and the behaviour the studio is named after.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    name: "Clarity",
    behaviour:
      "We write the plain sentence before the clever one. If a stranger cannot repeat it back, it is not finished.",
  },
  {
    name: "Human judgement",
    behaviour:
      "Tools draft, people decide. Nothing goes out with your name on it that neither of us would defend in a room.",
  },
  {
    name: "Useful friction",
    behaviour:
      "We ask the awkward question early. A hard conversation in week one is cheaper than a rebuild in month six.",
  },
  {
    name: "Evidence",
    behaviour:
      "Claims come with proof or they come out. We report what did not work in the same email as what did.",
  },
  {
    name: "Carry",
    behaviour:
      "The idea is not done when it is written. It is done when it survives the website, the follow-up and the handover.",
  },
] as const;

function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteNav />
      <main>
        <section className="wrap pb-16 pt-20 md:pb-24 md:pt-28">
          <div className="rail">
            <p className="rail-label">
              <b>04</b> / About
            </p>
            <div>
              <h1 className="t-display max-w-[18ch]">
                <MaskedLine>One brother kept bothering</MaskedLine>
                <MaskedLine delay={0.08}>the other. It became a studio.</MaskedLine>
              </h1>
              <div className="measure mt-8 space-y-5">
                <p className="t-lead text-ink-soft">
                  Faiz and Huzaifa are brothers. The studio exists because one of us would not let a vague
                  answer stand, and the other kept getting better answers because of it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap rail">
            <p className="rail-label">The method</p>
            <ScrollHighlight
              className="t-h2 max-w-[24ch]"
              tone="teal"
              text="The interruption was never rude. It was the question that made the vague thing specific."
            />
          </div>
        </section>

        <section className="section">
          <div className="wrap rail">
            <p className="rail-label">The story</p>
            <div className="measure space-y-6 text-ink-soft">
              <p className="t-body">
                It started at a desk between school and study. One of us was writing on the internet, helping
                friends rewrite their bios and ghostwriting posts for a cousin with a small software business.
                The other kept asking the same annoying question about every draft: what is the actual point,
                and why would anyone care.
              </p>
              <p className="t-body">
                That question turned out to be the service. The writing was never the hard part. Finding the
                one true thing worth writing about, and refusing to publish anything vaguer than it, is what
                people kept coming back for.
              </p>
              <p className="t-body">
                For a while the studio was called LinqWrites. The name explained one service while we sold
                several, and every conversation opened with someone asking what we actually did. So we ran the
                diagnostic on ourselves, cut the offer back to three connected jobs, and renamed the studio
                after the behaviour that built it.
              </p>
              <p className="t-body text-ink">
                We are small on purpose. You talk to the people doing the work, because there is nobody else
                to talk to.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap rail">
            <p className="rail-label">The two of us</p>
            <div className="grid gap-16 sm:grid-cols-2">
              <Portrait
                src={founderFaiz}
                alt="Faiz, co-founder of BOTHER"
                name="Faiz"
                role="Co-founder"
                tone="ink"
              >
                Writing, positioning and the editorial standard. The one who decides whether a sentence has
                earned its place before a client ever sees it.
              </Portrait>
              <Portrait
                src={founderHuzaifa}
                alt="Huzaifa, co-founder of BOTHER"
                name="Huzaifa"
                role="Co-founder"
                tone="teal"
                delay={0.12}
              >
                Surfaces and systems. Builds the site, wires the workflows, and asks the awkward question
                that turns a nice idea into something you can actually run.
              </Portrait>
            </div>
          </div>
        </section>

        <section className="section on-teal">
          <div className="wrap rail">
            <p className="rail-label">What we hold to</p>
            <div>
              <h2 className="t-h2 max-w-[20ch]">Five values, written as behaviour.</h2>
              <ul className="mt-12 divide-y divide-[var(--rule)] border-y border-rule">
                {VALUES.map((v, i) => (
                  <Reveal as="li" key={v.name} delay={i * 0.04} className="grid gap-3 py-7 md:grid-cols-[12rem_minmax(0,1fr)]">
                    <span className="t-h3">{v.name}</span>
                    <span className="t-body max-w-[55ch] text-ink-soft">{v.behaviour}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section on-ink">
          <div className="wrap rail">
            <p className="rail-label">Start</p>
            <div>
              <h2 className="t-h2 max-w-[20ch]">Tell us the part that feels stuck.</h2>
              <p className="measure t-lead mt-6 text-ink-soft">
                The diagnostic is a short conversation about what people misunderstand, where attention leaks,
                and what work keeps repeating. You leave with a shortlist either way.
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
