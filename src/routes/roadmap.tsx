import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/linq/PageShell";

const URL = "https://linqwrites-growth-studio.lovable.app/roadmap";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Future Roadmap — What LinqWrites is Building Next" },
      { name: "description", content: "A transparent look at the services, features, markets and milestones LinqWrites is building over the next twelve months." },
      { name: "keywords", content: "agency roadmap, LinqWrites roadmap, agency milestones, content agency growth, public roadmap" },
      { property: "og:title", content: "Future Roadmap — LinqWrites" },
      { property: "og:description", content: "An open log of what we are shipping next." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: RoadmapPage,
});

function RoadmapPage() {
  const steps = [
    { q: "Now", t: "10 posts in 24 hours at $35", d: "Our flagship sprint for founders who need momentum this week." },
    { q: "Next quarter", t: "Carousel Studio", d: "A premium carousel design service paired with our writing system." },
    { q: "Mid 2026", t: "Voice Capture v2", d: "An AI voice cloning tool that turns one 45 minute call into months of drafts." },
    { q: "Late 2026", t: "LinqWrites for Teams", d: "A workspace where executive teams can ship content together with one editor." },
    { q: "2027", t: "Expansion into video", d: "Short form scripts and editing for founders who are ready to move beyond text." },
  ];
  return (
    <PageShell
      index="05"
      eyebrow="Discover · Future Roadmap"
      title="An open log of"
      emphasis="what is next."
      lede="No surprises, no closed door planning. Here is exactly what the studio is building."
    >
      <ul>
        {steps.map((s) => (
          <li key={s.t}>
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-accent-warm">{s.q}</span>
            <h3 style={{ margin: "0.25rem 0 0.25rem 0" }}>{s.t}</h3>
            <p style={{ margin: 0 }}>{s.d}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
