import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/linq/PageShell";

const URL = "https://linqwrites-growth-studio.lovable.app/careers";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Join the Team — Work with LinqWrites" },
      { name: "description", content: "Open roles for ghostwriters, prompt engineers and outreach specialists at LinqWrites, a small founder led studio." },
      { name: "keywords", content: "LinqWrites careers, ghostwriter jobs, prompt engineer jobs, content agency hiring, remote writing jobs" },
      { property: "og:title", content: "Join the Team — LinqWrites" },
      { property: "og:description", content: "We are hiring writers, prompt engineers and outreach specialists." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: CareersPage,
});

function CareersPage() {
  const roles = [
    { t: "Ghostwriter (LinkedIn)", d: "You write five days a week in other people's voices. You read a transcript and hear the music. Remote, part time or full time." },
    { t: "Prompt Engineer", d: "You own and improve our voice capture stack. You enjoy writing prompts the same way some people enjoy writing code." },
    { t: "Outreach Specialist", d: "You run cold and warm outreach for our flagship sprint offer. You care about reply quality, not vanity metrics." },
  ];
  return (
    <PageShell
      index="09"
      eyebrow="The Mission · Join the Team"
      title="A short bench,"
      emphasis="a long apprenticeship."
      lede="We hire slowly and stay small. If you write well and care about craft, we would love to read your work."
      cta={{ label: "Apply with your portfolio", href: "mailto:linqwrites@gmail.com?subject=Apply%20to%20LinqWrites" }}
    >
      <div className="card-grid">
        {roles.map((r) => (
          <div className="card" key={r.t}>
            <h3>{r.t}</h3>
            <p>{r.d}</p>
          </div>
        ))}
      </div>
      <h2>What we look for</h2>
      <ul>
        <li>Three writing samples you are proud of, in any voice.</li>
        <li>A short note on why you want to write for founders.</li>
        <li>Availability and time zone.</li>
      </ul>
    </PageShell>
  );
}
