import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/linq/PageShell";

const URL = "https://linqwrites-growth-studio.lovable.app/origin";

export const Route = createFileRoute("/origin")({
  head: () => ({
    meta: [
      { title: "Origin Story — Two Brothers, One Studio" },
      { name: "description", content: "How LinqWrites started. Two brothers, a JEE prep desk and a decision not to wait until later to build something real." },
      { name: "keywords", content: "LinqWrites story, founder story, brothers agency, ghostwriting agency origin, young founders" },
      { property: "og:title", content: "The LinqWrites Origin Story" },
      { property: "og:description", content: "Two brothers, one studio, built between school days and study nights." },
      { property: "og:url", content: URL },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: OriginPage,
});

function OriginPage() {
  return (
    <PageShell
      index="06"
      eyebrow="The Mission · Origin Story"
      title="Built between school nights"
      emphasis="and study days."
      lede="LinqWrites is run by two brothers, Huzaifa and Faiz. One is preparing for JEE in 12th grade. The other is learning to run a studio."
    >
      <p>We did not want to wait until graduation to make something real. We had been writing on LinkedIn for fun, helping friends rewrite their bios, ghosting posts for a cousin who runs a small SaaS. People kept coming back. So we built a name around the thing they were already paying us for.</p>
      <h2>What we believe</h2>
      <p>That a personal brand is not a logo or a tagline. It is the way a founder thinks, written down often enough that the right people start to recognise it. Our job is to make that easier.</p>
      <h2>What we promise</h2>
      <ul>
        <li>To answer every message ourselves.</li>
        <li>To deliver on time, even when life is loud.</li>
        <li>To write in your voice, not ours.</li>
        <li>To stay small enough to care.</li>
      </ul>
      <h2>Why the name</h2>
      <p>Linq is the link between a founder and the audience that should already know them. Writes is what we do all day. Together it is a quiet promise to bring the two closer.</p>
    </PageShell>
  );
}
