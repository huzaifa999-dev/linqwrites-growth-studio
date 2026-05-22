import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/linq/PageShell";

const URL = "https://linqwrites-growth-studio.lovable.app/newsroom";

export const Route = createFileRoute("/newsroom")({
  head: () => ({
    meta: [
      { title: "Newsroom Hub — Press, Milestones & Client Wins" },
      { name: "description", content: "Press mentions, client milestones and agency news from the LinqWrites studio." },
      { name: "keywords", content: "LinqWrites press, agency news, client wins, content agency milestones, ghostwriting press" },
      { property: "og:title", content: "Newsroom Hub — LinqWrites" },
      { property: "og:description", content: "Where we keep press, client wins and studio milestones in one place." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: NewsroomPage,
});

function NewsroomPage() {
  const items = [
    { d: "2026", t: "42 founders served", c: "Crossed our first major client milestone across five countries." },
    { d: "2026", t: "13M impressions generated", c: "Aggregate reach across client accounts since launch." },
    { d: "2026", t: "4.1 average client rating", c: "Measured on every closed engagement, no cherry picking." },
    { d: "2025", t: "Studio launch", c: "LinqWrites opens its doors with a single $35 sprint offer." },
  ];
  return (
    <PageShell
      index="08"
      eyebrow="The Mission · Newsroom"
      title="What the studio has"
      emphasis="shipped so far."
      lede="A short, honest list of the milestones, mentions and client wins that mattered."
      cta={{ label: "Press enquiries", href: "mailto:linqwrites@gmail.com?subject=Press%20enquiry" }}
    >
      <ul>
        {items.map((i) => (
          <li key={i.t}>
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-accent-warm">{i.d}</span>
            <h3 style={{ margin: "0.25rem 0" }}>{i.t}</h3>
            <p style={{ margin: 0 }}>{i.c}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
