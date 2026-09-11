import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/bother/ServicePage";

const URL = "https://linqwrites-growth-studio.lovable.app/labs";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Systems — Automation and operational leverage for small teams | BOTHER" },
      {
        name: "description",
        content:
          "Systems is BOTHER's automation practice: CRM, lead capture and response, booking, follow-up, reactivation, dashboards, knowledge assistants and agentic workflows. From $1,500/mo.",
      },
      { property: "og:title", content: "Systems — Operational leverage | BOTHER" },
      {
        property: "og:description",
        content: "The same work keeps repeating. Systems makes it bounded, observable and reversible.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Systems",
          serviceType: "Business automation and AI workflow design",
          provider: { "@type": "Organization", name: "BOTHER", url: "https://linqwrites-growth-studio.lovable.app" },
          areaServed: "Worldwide",
          url: URL,
          description:
            "Automation discovery, CRM, lead capture and response, booking and reminders, proposal follow-up, reactivation, dashboards, knowledge assistants, AI receptionists and agentic workflows.",
          offers: [
            { "@type": "Offer", name: "Systems Starter", price: "1500", priceCurrency: "USD" },
            { "@type": "Offer", name: "Systems Operator", price: "3000", priceCurrency: "USD" },
            { "@type": "Offer", name: "Systems Architecture", price: "5000", priceCurrency: "USD" },
          ],
        }),
      },
    ],
  }),
  component: SystemsPage,
});

function SystemsPage() {
  return (
    <ServicePage
      showBriefMark
      index="03"
      label="Systems"
      lead="Stop paying twice for the same work."
      intro={[
        "Manual work is fine until it is the ceiling. The same follow-up written again, the same lead answered late, the same number pulled by hand on a Friday. None of it is dramatic, and together it is the reason the team cannot take on more.",
        "Systems is the practice of finding that repeated work, deciding what should be automated and what should stay human, and building the small number of workflows that actually remove the load. Every build starts with a workflow brief and a rollback path.",
      ]}
      capabilities={[
        {
          title: "Automation discovery",
          body: "A mapped list of what repeats, how often, who does it, and what it costs in hours before anything is built.",
        },
        {
          title: "CRM",
          body: "One place where a lead, a conversation and a deal are the same record, set up to match how you actually sell.",
        },
        {
          title: "Lead capture and response",
          body: "Enquiries captured, routed and acknowledged fast, because speed to first reply decides most small-business deals.",
        },
        {
          title: "Booking and reminders",
          body: "Scheduling, confirmations and reminders that cut no-shows without anyone chasing by hand.",
        },
        {
          title: "Proposal follow-up",
          body: "Structured, human-sounding follow-up on open proposals so quotes stop dying from silence.",
        },
        {
          title: "Reactivation",
          body: "Sequences that reopen past customers and stale enquiries, which is usually the cheapest revenue available.",
        },
        {
          title: "Dashboards",
          body: "The five numbers you actually decide on, updated automatically, instead of a monthly spreadsheet ritual.",
        },
        {
          title: "Knowledge assistants",
          body: "An assistant grounded in your own documents, so the team stops asking the same question in chat.",
        },
        {
          title: "AI receptionists",
          body: "First-line handling for calls and messages with clear rules for when a human takes over.",
        },
        {
          title: "Agentic workflows",
          body: "Bounded multi-step automations with logging and limits. Useful because they are constrained, not because they are clever.",
        },
      ]}
      tiers={[
        {
          name: "Systems Starter",
          price: "$1,500",
          cadence: "/mo",
          scope:
            "Automation discovery, one core workflow built and maintained, CRM or lead capture set up properly, and monthly support.",
          bestFit: "Small teams losing hours to one obvious repeated process.",
          logic:
            "Most automation projects fail by starting with ten workflows. Starter builds one that works and is trusted, because a system nobody trusts gets bypassed within a month.",
        },
        {
          name: "Systems Operator",
          price: "$3,000",
          cadence: "/mo",
          scope:
            "Everything in Starter, plus three to five connected workflows, booking and follow-up, reactivation, and a live dashboard.",
          bestFit: "Businesses where sales and delivery both depend on manual chasing.",
          highlight: "Most chosen",
          logic:
            "Value appears when workflows connect: a lead that books itself, follows itself up and reports itself. Operator is the smallest set that turns isolated automations into an operating rhythm.",
        },
        {
          name: "Systems Architecture",
          price: "$5,000",
          cadence: "/mo",
          scope:
            "Everything in Operator, plus knowledge assistants, AI receptionist, agentic workflows, integration work and documented ownership handover.",
          bestFit: "Teams ready to run assisted operations rather than a handful of automations.",
          logic:
            "At this level the risk is no longer effort, it is fragility. Architecture buys design, logging, limits and documentation, so the system survives a staff change and a bad day.",
        },
      ]}
      footnote="Discovery available standalone at $650. Vendor, API and messaging costs are billed separately at cost. Every build begins with a written workflow brief and ships with a rollback path."
      cta={{ label: "Find the friction", note: "Discovery first. We only build what earns its place." }}
      next={[
        { to: "/imagine", label: "Signal", blurb: "The authority work that fills the pipeline these systems handle." },
        { to: "/deep-dive", label: "Carry", blurb: "The surface that turns attention into an enquiry worth automating." },
      ]}
    />
  );
}
