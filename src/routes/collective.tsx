import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/linq/PageShell";

const URL = "https://linqwrites-growth-studio.lovable.app/collective";

export const Route = createFileRoute("/collective")({
  head: () => ({
    meta: [
      { title: "The Collective — The Team Behind LinqWrites" },
      { name: "description", content: "Meet the writers, strategists and AI specialists who shape every LinqWrites engagement across India, the US, UK, Australia and Canada." },
      { name: "keywords", content: "LinqWrites team, ghostwriting team, content collective, AI specialists, content strategists" },
      { property: "og:title", content: "The Collective — LinqWrites" },
      { property: "og:description", content: "A small, deliberate network of writers, strategists and AI specialists." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: CollectivePage,
});

function CollectivePage() {
  const roles = [
    { t: "The Founders", d: "Huzaifa and Faiz lead voice, strategy and client relationships. Every project starts and ends with them." },
    { t: "Editors", d: "Two senior editors review every post before it leaves the studio. Nothing ships unedited." },
    { t: "Prompt Engineers", d: "Our prompt stack is owned by a small group of specialists who refine it weekly." },
    { t: "Strategists", d: "Distribution, analytics and positioning support for accounts on retainer." },
  ];
  return (
    <PageShell
      index="07"
      eyebrow="The Mission · The Collective"
      title="A small studio,"
      emphasis="a deliberate network."
      lede="LinqWrites stays a two person studio at the centre, with a trusted bench of editors, strategists and prompt specialists around it."
    >
      <div className="card-grid">
        {roles.map((r) => (
          <div className="card" key={r.t}>
            <h3>{r.t}</h3>
            <p>{r.d}</p>
          </div>
        ))}
      </div>
      <h2>How we work together</h2>
      <p>Every client gets a single point of contact from the founders. The bench works behind the scenes, never on email threads with you. The result feels like working with one person who somehow gets a lot done.</p>
    </PageShell>
  );
}
