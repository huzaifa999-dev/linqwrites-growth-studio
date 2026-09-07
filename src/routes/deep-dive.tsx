import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/bother/ServicePage";

const URL = "https://linqwrites-growth-studio.lovable.app/deep-dive";

export const Route = createFileRoute("/deep-dive")({
  head: () => ({
    meta: [
      { title: "Carry — Websites and customer-facing surfaces that hold the argument | BOTHER" },
      {
        name: "description",
        content:
          "Carry is BOTHER's surface practice: diagnostic and IA, conversion copy, website design and build, proof architecture, lead capture and CRM handoff, SEO and GEO. From $1,800/mo.",
      },
      { property: "og:title", content: "Carry — Customer-facing surfaces | BOTHER" },
      {
        property: "og:description",
        content: "The conversation goes well until someone opens the site. Carry fixes the surface that loses it.",
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
          name: "Carry",
          serviceType: "Website and conversion design",
          provider: { "@type": "Organization", name: "BOTHER", url: "https://linqwrites-growth-studio.lovable.app" },
          areaServed: "Worldwide",
          url: URL,
          description:
            "Diagnostic and information architecture, conversion copy, website design and implementation, proof and case study architecture, lead capture and CRM handoff, SEO and GEO.",
          offers: [
            { "@type": "Offer", name: "Carry Foundation", price: "1800", priceCurrency: "USD" },
            { "@type": "Offer", name: "Carry Build", price: "3200", priceCurrency: "USD" },
            { "@type": "Offer", name: "Carry Partner", price: "4800", priceCurrency: "USD" },
          ],
        }),
      },
    ],
  }),
  component: CarryPage,
});

function CarryPage() {
  return (
    <ServicePage
      index="02"
      label="Carry"
      lead="The surface has to hold the argument."
      intro={[
        "Attention is the expensive part and most businesses lose it after they have already paid for it. The call went well, the referral was warm, and then someone opened the website and the argument lost its shape.",
        "Carry is the work of making your customer-facing surfaces say the same true thing in the same order, with the proof attached and an obvious next step. We start with a diagnostic, not a redesign, because most sites do not need to be prettier.",
      ]}
      capabilities={[
        {
          title: "Diagnostic and information architecture",
          body: "What each page is for, in what order, and what we cut. Structure before styling, always.",
        },
        {
          title: "Conversion copy",
          body: "Page copy written from customer language and real objections, not from a competitor's homepage.",
        },
        {
          title: "Website design and implementation",
          body: "Design and build in the same studio, so nothing gets lost in a handoff between a deck and a developer.",
        },
        {
          title: "Proof and case study architecture",
          body: "A repeatable format for showing results, so evidence stops living in someone's inbox.",
        },
        {
          title: "Lead capture and CRM handoff",
          body: "Forms, routing and tracking wired so an enquiry lands somewhere a human will actually see it.",
        },
        {
          title: "SEO and GEO",
          body: "Technical hygiene, metadata, structured data and answer-engine readability built in rather than bolted on.",
        },
      ]}
      tiers={[
        {
          name: "Carry Foundation",
          price: "$1,800",
          cadence: "/mo",
          scope:
            "Diagnostic, information architecture, conversion copy for core pages, and ongoing improvements to the site you already have.",
          bestFit: "Businesses with a site that basically works but keeps losing people at the same point.",
          logic:
            "Rebuilding is the expensive answer to a problem that is usually structural. Foundation fixes the order and the words first, because that is where most of the loss actually happens.",
        },
        {
          name: "Carry Build",
          price: "$3,200",
          cadence: "/mo",
          scope:
            "Everything in Foundation, plus a full site design and build, proof and case study architecture, and lead capture wired into your CRM.",
          bestFit: "Businesses whose current surface no longer matches the work they now sell.",
          highlight: "Most chosen",
          logic:
            "When the offer has outgrown the site, patching it costs more over a year than replacing it once. Build gives you a surface designed around today's argument, not the one you started with.",
        },
        {
          name: "Carry Partner",
          price: "$4,800",
          cadence: "/mo",
          scope:
            "Everything in Build, plus a continuous improvement cycle, landing pages per campaign, ongoing SEO and GEO work, and quarterly conversion review.",
          bestFit: "Teams running real demand where a small conversion gain is worth more than the retainer.",
          logic:
            "A website is not a project that ends. Partner treats it as an asset with an owner, tested and adjusted monthly, which is the only way compounding gains actually show up.",
        },
      ]}
      footnote="Standalone diagnostic available at $750, credited against the first month if you continue. Third-party costs such as hosting, domains and CRM licences are billed separately at cost."
      cta={{ label: "Find the friction", note: "We diagnose before we quote." }}
      next={[
        { to: "/imagine", label: "Signal", blurb: "The point of view that gives the surface something worth carrying." },
        { to: "/labs", label: "Systems", blurb: "What happens after the form is filled in, made reliable." },
      ]}
    />
  );
}
