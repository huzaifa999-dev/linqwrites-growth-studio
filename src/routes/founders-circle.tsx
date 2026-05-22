import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/linq/PageShell";

const URL = "https://linqwrites-growth-studio.lovable.app/founders-circle";

export const Route = createFileRoute("/founders-circle")({
  head: () => ({
    meta: [
      { title: "Founders Circle — A Private Cohort by LinqWrites" },
      { name: "description", content: "A private cohort of founders building their LinkedIn presence together with peer review, monthly teardowns, and concierge support." },
      { name: "keywords", content: "founders community, LinkedIn cohort, personal branding community, peer review, founder mastermind" },
      { property: "og:title", content: "Founders Circle — LinqWrites" },
      { property: "og:description", content: "An invite only cohort of founders shipping their narrative in public." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: FoundersCirclePage,
});

function FoundersCirclePage() {
  return (
    <PageShell
      index="03"
      eyebrow="Discover · Founders Circle"
      title="Build in public,"
      emphasis="together."
      lede="A small invite only room of founders, operators and creators building their LinkedIn presence side by side."
      cta={{ label: "Apply to join", href: "mailto:linqwrites@gmail.com?subject=Founders%20Circle%20application" }}
    >
      <h2>What you get</h2>
      <ul>
        <li>Monthly post teardowns with the LinqWrites editors.</li>
        <li>A private channel of founders trading hooks, drafts and feedback.</li>
        <li>Quarterly strategy calls to plan your next 90 days of content.</li>
        <li>First access to new templates, prompt stacks and case studies.</li>
      </ul>
      <h2>Who it is for</h2>
      <p>Founders and senior operators who already post on LinkedIn and want the room sharper. We cap membership at fifty so every voice gets attention.</p>
    </PageShell>
  );
}
