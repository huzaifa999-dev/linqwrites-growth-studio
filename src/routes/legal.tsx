import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/linq/PageShell";

const URL = "https://linqwrites-growth-studio.lovable.app/legal";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal & Privacy — LinqWrites" },
      { name: "description", content: "How LinqWrites handles your data, payments, content ownership and confidentiality, written in plain English." },
      { name: "keywords", content: "LinqWrites privacy, data policy, content ownership, payment policy, confidentiality" },
      { property: "og:title", content: "Legal & Privacy — LinqWrites" },
      { property: "og:description", content: "Privacy and legal terms in plain English." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <PageShell
      index="11"
      eyebrow="Concierge · Legal & Privacy"
      title="What we keep,"
      emphasis="and what we never do."
      lede="Plain English answers to the questions a careful founder should ask before working with us."
    >
      <h2>Your data</h2>
      <p>We collect only what is needed to write for you. Voice notes, interview transcripts, past posts and the brief you fill on this site. Everything is stored in encrypted cloud storage and deleted on request within 30 days.</p>
      <h2>Payments</h2>
      <p>Invoices are issued in USD via Stripe or by manual bank transfer. We do not store card details. All transactions are processed by our payment partner.</p>
      <h2>Content ownership</h2>
      <p>Once a project is paid in full, the content is yours. You can edit it, reuse it, publish it under your name. We may anonymise headline metrics for case studies and only with written permission for direct attribution.</p>
      <h2>Confidentiality</h2>
      <p>Everything you share with us, including unpublished plans, financials and personal stories, stays between the studio team and you. We sign NDAs on request at no cost.</p>
      <h2>Cookies and analytics</h2>
      <p>This site uses privacy first analytics that do not track you across the web. We never sell or share data with advertisers.</p>
    </PageShell>
  );
}
