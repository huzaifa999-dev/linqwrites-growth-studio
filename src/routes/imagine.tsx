import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/bother/ServicePage";

const URL = "https://linqwrites-growth-studio.lovable.app/imagine";

export const Route = createFileRoute("/imagine")({
  head: () => ({
    meta: [
      { title: "Signal — Authority and content that people can repeat | BOTHER" },
      {
        name: "description",
        content:
          "Signal is BOTHER's authority practice: founder voice and positioning, LinkedIn ghostwriting, newsletters, SEO-aware long form, research and proof. From $1,500/mo.",
      },
      { property: "og:title", content: "Signal — Authority and content | BOTHER" },
      {
        property: "og:description",
        content: "Find the sentence your market can repeat, then say it often enough that it sticks.",
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
          name: "Signal",
          serviceType: "Authority and content strategy",
          provider: { "@type": "Organization", name: "BOTHER", url: "https://linqwrites-growth-studio.lovable.app" },
          areaServed: "Worldwide",
          url: URL,
          description:
            "Founder voice and positioning, LinkedIn ghostwriting, newsletters, SEO-aware long form, editorial strategy, research and proof development, repurposing and reporting.",
          offers: [
            { "@type": "Offer", name: "Signal Core", price: "1500", priceCurrency: "USD" },
            { "@type": "Offer", name: "Signal Authority", price: "3500", priceCurrency: "USD" },
            { "@type": "Offer", name: "Authority + Distribution", price: "4500", priceCurrency: "USD" },
          ],
        }),
      },
    ],
  }),
  component: SignalPage,
});

function SignalPage() {
  return (
    <ServicePage
      index="01"
      label="Signal"
      lead="Find the sentence, then say it until it carries."
      intro={[
        "Most founders are not short of ideas. They are short of one clear line that a stranger can repeat correctly. Signal is the practice of finding that line inside the work you already do, and then publishing it often enough that the right people recognise it.",
        "We interview you, read what you have already written, and build a voice foundation: what you believe, what you refuse, and the proof behind both. Everything after that is production against a plan, not posting for the sake of it.",
      ]}
      capabilities={[
        {
          title: "Founder voice and positioning",
          body: "Interviews and archive review that turn how you actually think into a written standard the whole studio can write to.",
        },
        {
          title: "LinkedIn ghostwriting",
          body: "Posts in your voice on a steady cadence, built from your work and your opinions rather than recycled industry advice.",
        },
        {
          title: "Newsletters",
          body: "A recurring letter that keeps the audience you already earned, with a structure your readers learn to expect.",
        },
        {
          title: "SEO-aware long form",
          body: "Essays and articles written for people first, structured so search and AI answer engines can read the argument.",
        },
        {
          title: "Editorial strategy",
          body: "Pillars, cadence and a running calendar so publishing stops depending on who felt inspired that week.",
        },
        {
          title: "Research and proof development",
          body: "Turning client results, internal data and lived experience into evidence a sceptical reader will accept.",
        },
        {
          title: "Repurposing",
          body: "One serious piece of thinking becomes the post, the letter, the carousel and the sales follow-up asset.",
        },
        {
          title: "Reporting",
          body: "Plain monthly reads on what landed, what did not, and what we are changing next month because of it.",
        },
      ]}
      tiers={[
        {
          name: "Signal Core",
          price: "$1,500",
          cadence: "/mo",
          scope:
            "Voice foundation, editorial calendar, eight ghostwritten LinkedIn posts a month, monthly reporting and a working session.",
          bestFit: "Founders who need to show up consistently and have never had a written voice standard.",
          logic:
            "Consistency is the cheapest advantage on the internet and the hardest to sustain alone. Core buys the cadence and the standard, so you stop restarting from zero every month.",
        },
        {
          name: "Signal Authority",
          price: "$3,500",
          cadence: "/mo",
          scope:
            "Everything in Core, plus twelve to sixteen posts, one long-form essay a month, a newsletter, and research and proof development.",
          bestFit: "Founders selling considered, higher-value work where the buyer reads before they reply.",
          highlight: "Most chosen",
          logic:
            "Short posts get attention. Long form is what a buyer forwards to the person who signs. Authority pairs the two so the audience and the argument grow together.",
        },
        {
          name: "Authority + Distribution",
          price: "$4,500",
          cadence: "/mo",
          scope:
            "Everything in Authority, plus multi-channel repurposing, guest and podcast placement support, and a distribution plan per flagship piece.",
          bestFit: "Teams with a proven point of view that is still only reaching the audience they already had.",
          logic:
            "Publishing is production. Distribution is reach. When the writing is already working, the constraint moves to how far each piece travels, so that is where the money should go.",
        },
      ]}
      footnote="Standalone voice foundation available at $650 if you want the standard without the retainer. Monthly engagements run month to month after the first ninety days."
      cta={{ label: "Find the friction", note: "Start with a diagnostic. No pitch deck." }}
      next={[
        { to: "/deep-dive", label: "Carry", blurb: "Attention arrives. Your website, copy and proof decide whether it converts." },
        { to: "/labs", label: "Systems", blurb: "The repeated manual work behind the scenes, made bounded and reliable." },
      ]}
    />
  );
}
