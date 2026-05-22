import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/linq/PageShell";

const URL = "https://linqwrites-growth-studio.lovable.app/deep-dive";

export const Route = createFileRoute("/deep-dive")({
  head: () => ({
    meta: [
      { title: "Deep Dive Series — LinkedIn, AI & Founder Branding" },
      { name: "description", content: "Long form essays and video studies on LinkedIn growth, AI ghostwriting, and the craft of founder branding." },
      { name: "keywords", content: "LinkedIn growth essays, AI ghostwriting, founder branding, content strategy blog, LinkedIn case studies" },
      { property: "og:title", content: "Deep Dive Series — LinqWrites" },
      { property: "og:description", content: "The thought leadership hub for LinkedIn, AI and personal brand strategy." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: DeepDivePage,
});

function DeepDivePage() {
  const essays = [
    { t: "The Quiet Math of LinkedIn", d: "Why three honest posts a week beat thirty noisy ones, with the numbers to back it." },
    { t: "Voice is a System", d: "How we capture a founder's voice in 45 minutes and turn it into months of content." },
    { t: "AI is not the Author", d: "A field guide to using AI as a co writer without losing the human edge." },
    { t: "The 24 Hour Promise", d: "An inside look at the workflow behind ten posts delivered in a single day." },
  ];
  return (
    <PageShell
      index="02"
      eyebrow="Discover · Deep Dive Series"
      title="The work behind the"
      emphasis="words."
      lede="Long form essays, video studies and teardown breakdowns from the LinqWrites team. Published when we have something worth saying."
      cta={{ label: "Subscribe by email", href: "mailto:linqwrites@gmail.com?subject=Deep%20Dive%20subscription" }}
    >
      <div className="card-grid">
        {essays.map((e) => (
          <div className="card" key={e.t}>
            <h3>{e.t}</h3>
            <p>{e.d}</p>
          </div>
        ))}
      </div>
      <h2>Why we publish</h2>
      <p>Most agencies hide their playbook. We show it. Every essay here is the same thinking we apply to client work the next morning.</p>
    </PageShell>
  );
}
