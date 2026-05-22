import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/linq/PageShell";

const URL = "https://linqwrites-growth-studio.lovable.app/labs";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "LinqWrites Labs — Live Workshops on LinkedIn Growth" },
      { name: "description", content: "Live and on-demand workshops on LinkedIn content strategy, prompt engineering for personal brands, and hooks that convert." },
      { name: "keywords", content: "LinkedIn workshops, ghostwriting workshop, AI content workshop, LinkedIn hooks training, personal branding course" },
      { property: "og:title", content: "LinqWrites Labs — Workshops for Founders" },
      { property: "og:description", content: "Hands on workshops on LinkedIn strategy, AI prompting and hook craft." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: LabsPage,
});

function LabsPage() {
  return (
    <PageShell
      index="01"
      eyebrow="Discover · Labs & Workshops"
      title="Sharpen the way you"
      emphasis="show up."
      lede="Small group sessions where founders, freelancers and consultants learn the systems we use to write 10 posts in 24 hours."
      cta={{ label: "Join the next cohort", href: "mailto:linqwrites@gmail.com?subject=Labs%20waitlist" }}
    >
      <div className="card-grid">
        <div className="card">
          <h3>The Hook Lab</h3>
          <p>A two hour live session on writing first lines that stop the scroll. Walk away with 30 hook patterns we test every week.</p>
        </div>
        <div className="card">
          <h3>Prompting for Personal Brands</h3>
          <p>Build a prompt stack that captures your voice. We share the exact templates we use to ghostwrite for founders.</p>
        </div>
        <div className="card">
          <h3>LinkedIn Operator School</h3>
          <p>A four week cohort. Pillars, calendar, distribution, DMs. By the end you own a content engine that runs without you.</p>
        </div>
      </div>

      <h2>What you walk away with</h2>
      <ul>
        <li>A documented voice guide built from your own posts and interviews.</li>
        <li>A 30 day content calendar mapped to three audience pillars.</li>
        <li>Templates for hooks, carousels and founder essays you can reuse forever.</li>
        <li>Office hours with the LinqWrites team for 30 days after the workshop.</li>
      </ul>

      <h2>Who it is for</h2>
      <p>Founders, operators, coaches and consultants who already understand LinkedIn matters and want a calmer, repeatable way to show up.</p>
    </PageShell>
  );
}
