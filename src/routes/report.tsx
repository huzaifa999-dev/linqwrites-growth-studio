import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/linq/PageShell";
import { ContactForm } from "@/components/linq/ContactForm";

const URL = "https://linqwrites-growth-studio.lovable.app/report";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report a Concern — LinqWrites Client Care" },
      { name: "description", content: "Flag an issue, request a refund or raise a concern with LinqWrites. We respond personally within one business day." },
      { name: "keywords", content: "LinqWrites support, refund request, raise concern, client care, agency complaint" },
      { property: "og:title", content: "Report a Concern — LinqWrites" },
      { property: "og:description", content: "A direct line for clients to raise concerns or request refunds." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ReportPage,
});

function ReportPage() {
  return (
    <PageShell
      index="13"
      eyebrow="Concierge · Report a Concern"
      title="If something is off,"
      emphasis="we want to know."
      lede="Whether it is a missed deadline, a draft that misses the voice, or a billing question, this form goes straight to the founders."
    >
      <h2>How we handle reports</h2>
      <ul>
        <li>A founder reads your message within one business day.</li>
        <li>We respond personally, not from a support queue.</li>
        <li>If the fault is ours, we make it right with a rewrite, a credit or a refund.</li>
        <li>Your message stays private to the founders unless you ask us to involve others.</li>
      </ul>
      <h2>Send your message</h2>
      <ContactForm />
    </PageShell>
  );
}
