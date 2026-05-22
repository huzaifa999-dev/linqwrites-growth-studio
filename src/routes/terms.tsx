import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/linq/PageShell";

const URL = "https://linqwrites-growth-studio.lovable.app/terms";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "User Agreement — LinqWrites Terms of Service" },
      { name: "description", content: "Terms of service for the LinqWrites $35 sprint and ongoing engagements. Delivery, revisions, refunds and IP in plain English." },
      { name: "keywords", content: "LinqWrites terms, user agreement, revision policy, refund policy, IP ownership" },
      { property: "og:title", content: "User Agreement — LinqWrites" },
      { property: "og:description", content: "Terms of service for LinqWrites clients." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell
      index="12"
      eyebrow="Concierge · User Agreement"
      title="The rules that"
      emphasis="protect both of us."
      lede="Short, fair and written without legalese. Reach out if anything is unclear."
    >
      <h2>The $35 sprint</h2>
      <p>Our flagship offer is 10 LinkedIn posts delivered within 24 hours of receiving your voice brief. Pricing is fixed at $35 per sprint and is not changing. Larger packages and retainers are priced on request.</p>
      <h2>Delivery timelines</h2>
      <p>The 24 hour clock starts when you complete the voice brief. If we miss the deadline through our own delay, the next sprint is free. Holidays and weekends are honoured unless we agree otherwise in writing.</p>
      <h2>Revisions</h2>
      <p>Every sprint includes one round of revisions per post within seven days of delivery. Major rewrites beyond that round are quoted separately.</p>
      <h2>Refunds</h2>
      <p>If we have not started writing, you get a full refund. Once writing has begun, refunds are issued at our discretion based on how much work has been done.</p>
      <h2>Ownership</h2>
      <p>You own the final content. We retain the right to discuss the engagement in anonymous case studies unless you ask us not to.</p>
      <h2>Acceptable use</h2>
      <p>We do not write content that is misleading, defamatory or promotes adult, hate or illegal categories. We will refund any work that turns out to fall in these buckets.</p>
    </PageShell>
  );
}
