import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/linq/PageShell";

const URL = "https://linqwrites-growth-studio.lovable.app/resource-vault";

export const Route = createFileRoute("/resource-vault")({
  head: () => ({
    meta: [
      { title: "Resource Vault — Free LinkedIn Templates & Prompts" },
      { name: "description", content: "Free templates, hook formulas, post structures and AI prompts used by the LinqWrites team for client work." },
      { name: "keywords", content: "LinkedIn templates, hook formulas, AI prompts, swipe file, LinkedIn post templates" },
      { property: "og:title", content: "Resource Vault — LinqWrites" },
      { property: "og:description", content: "The free library behind a paid agency. Templates, prompts and frameworks." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ResourceVaultPage,
});

function ResourceVaultPage() {
  const items = [
    { t: "Hook Library", d: "120 first lines, sorted by pattern. Curiosity, contrarian, story, data." },
    { t: "Carousel Skeletons", d: "Ten slide structures for thought leadership, case study and listicle posts." },
    { t: "Voice Capture Brief", d: "The questionnaire we send every new founder client." },
    { t: "Prompt Stack v3", d: "Our current ghostwriting prompt chain, fully commented." },
    { t: "Distribution Checklist", d: "What we do in the first ninety minutes after a post goes live." },
    { t: "Founder Essay Template", d: "A repeatable structure for long form posts that travel." },
  ];
  return (
    <PageShell
      index="04"
      eyebrow="Discover · Resource Vault"
      title="The shelves we"
      emphasis="open to everyone."
      lede="The same templates and prompts we use inside the studio. Free, no email wall, updated when something changes."
      cta={{ label: "Request the vault", href: "mailto:linqwrites@gmail.com?subject=Resource%20Vault%20access" }}
    >
      <div className="card-grid">
        {items.map((i) => (
          <div className="card" key={i.t}>
            <h3>{i.t}</h3>
            <p>{i.d}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
