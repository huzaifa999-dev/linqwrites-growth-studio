import showLinkedin from "@/assets/showcase-linkedin.jpg";
import showSaas from "@/assets/showcase-saas.jpg";
import showCarousel from "@/assets/showcase-carousel.jpg";
import showAi from "@/assets/showcase-ai.jpg";
import showBrand from "@/assets/showcase-brand.jpg";

export type CaseStudy = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  img: string;
  client: string;
  year: string;
  services: string[];
  metrics: { label: string; value: string }[];
  challenge: string;
  approach: string[];
  outcome: string;
  seoTitle: string;
  seoDescription: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "northwind-founder-voice",
    tag: "Founder Branding",
    title: "From silent operator to LinkedIn voice of the category.",
    excerpt:
      "A 90 day narrative system for a B2B SaaS founder: positioning, weekly ghostwritten posts, and a content engine that turned cold inbound into closed pipeline.",
    img: showLinkedin,
    client: "Northwind AI",
    year: "2025",
    services: ["Positioning", "Ghostwriting", "Content Strategy"],
    metrics: [
      { label: "Followers", value: "0 to 18k" },
      { label: "Inbound", value: "+312%" },
      { label: "Closed pipeline", value: "$640k" },
    ],
    challenge:
      "A technical founder with sharp ideas and zero presence. Every sales call started from scratch and the brand had no gravity.",
    approach: [
      "Mined 12 hours of founder interviews into a single narrative thesis.",
      "Built a weekly editorial rhythm of three ghostwritten posts.",
      "Layered comment routines and DM playbooks to convert attention into calls.",
    ],
    outcome:
      "Inside 90 days the founder became the most quoted voice in the niche, and outbound shrank to a side channel.",
    seoTitle: "Northwind AI · Founder Branding Case Study | LinqWrites",
    seoDescription:
      "How LinqWrites turned a quiet B2B SaaS founder into the voice of their category in 90 days through positioning, ghostwriting and content systems.",
  },
  {
    slug: "cinder-saas-launch",
    tag: "SaaS Landing",
    title: "A launch site that closed the seed round in 11 days.",
    excerpt:
      "End to end identity, copy and a cinematic site for an AI infra startup, engineered for clarity, conversion and credibility.",
    img: showSaas,
    client: "Cinder Labs",
    year: "2025",
    services: ["Brand Identity", "Web Design", "Conversion Copy"],
    metrics: [
      { label: "Time to ship", value: "19 days" },
      { label: "Seed closed", value: "11 days" },
      { label: "Demo bookings", value: "47" },
    ],
    challenge:
      "Two founders, three weeks of runway and a category most investors had never heard of. Needed credibility on first scroll.",
    approach: [
      "Crafted a one line thesis the team rallied around.",
      "Designed a restrained editorial system with cinematic motion.",
      "Wrote modular copy blocks tuned for both investors and engineers.",
    ],
    outcome:
      "The site became the deck. The seed round closed in under two weeks and the team kept shipping.",
    seoTitle: "Cinder Labs · SaaS Launch Site Case Study | LinqWrites",
    seoDescription:
      "How LinqWrites shipped a cinematic SaaS launch site, brand identity and conversion copy that helped Cinder Labs close their seed round in 11 days.",
  },
  {
    slug: "halcyon-linkedin-growth",
    tag: "LinkedIn Growth",
    title: "0 to 42,000 followers in 7 months, 100% organic.",
    excerpt:
      "Founder led content with sharp hooks, opinionated POVs and visual carousels designed to be saved, shared and remembered.",
    img: showCarousel,
    client: "Halcyon",
    year: "2025",
    services: ["Content Strategy", "Carousels", "Community"],
    metrics: [
      { label: "Followers", value: "42,300" },
      { label: "Impressions", value: "13.4M" },
      { label: "Paid spend", value: "$0" },
    ],
    challenge:
      "An ambitious founder competing against legacy voices with bigger teams and louder budgets.",
    approach: [
      "Built a hook library tuned to the founder's strongest opinions.",
      "Shipped weekly carousel sets engineered for save and share rate.",
      "Treated the comment section as a second product surface.",
    ],
    outcome:
      "Seven months in, the audience compounds on its own. Inbound is now the primary GTM.",
    seoTitle: "Halcyon · LinkedIn Growth Case Study | LinqWrites",
    seoDescription:
      "How LinqWrites grew Halcyon's founder LinkedIn from zero to 42,000 followers and 13M impressions in seven months, organically.",
  },
  {
    slug: "meridian-ai-workflows",
    tag: "AI Workflows",
    title: "Cutting 22 weekly hours of busywork without a single hire.",
    excerpt:
      "Custom AI agents wired into the team stack: research, drafting, reporting and CRM hygiene. Quiet leverage, on tap.",
    img: showAi,
    client: "Meridian",
    year: "2025",
    services: ["AI Automation", "Ops Systems", "Internal Tooling"],
    metrics: [
      { label: "Hours saved / week", value: "22" },
      { label: "Tools replaced", value: "6" },
      { label: "Headcount avoided", value: "2" },
    ],
    challenge:
      "A nine person team buried in research, reporting and copy work that scaled linearly with revenue.",
    approach: [
      "Mapped every recurring task into a quiet automation surface.",
      "Built agents for research briefs, weekly reports and CRM grooming.",
      "Wrapped everything in a single internal dashboard the team actually uses.",
    ],
    outcome:
      "The team ships faster, hires slower and spends the saved hours on the work that compounds.",
    seoTitle: "Meridian · AI Workflow Case Study | LinqWrites",
    seoDescription:
      "How LinqWrites designed custom AI agents that cut 22 hours of weekly busywork for Meridian without adding a single new hire.",
  },
  {
    slug: "foundry-content-system",
    tag: "Content Strategy",
    title: "A messaging system the whole company could stand behind.",
    excerpt:
      "Brand voice, narrative pillars and editorial cadence codified into a 24 page operating manual the team actually uses.",
    img: showBrand,
    client: "Foundry",
    year: "2025",
    services: ["Brand Voice", "Editorial System", "Enablement"],
    metrics: [
      { label: "Pages", value: "24" },
      { label: "Teams aligned", value: "5" },
      { label: "Content velocity", value: "3.4x" },
    ],
    challenge:
      "Five teams writing in five different voices. Buyers felt the dissonance and conversion suffered.",
    approach: [
      "Ran a voice audit across every public surface.",
      "Defined three narrative pillars and a one page tone guide.",
      "Packaged everything into a working manual with examples and templates.",
    ],
    outcome:
      "Marketing, sales and support now sound like one company. Content velocity tripled within a quarter.",
    seoTitle: "Foundry · Content System Case Study | LinqWrites",
    seoDescription:
      "How LinqWrites built a 24 page editorial operating manual that aligned five Foundry teams and tripled content velocity.",
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);