import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/linq/PageShell";
import { ContactForm } from "@/components/linq/ContactForm";
import { Mail, MessageCircle } from "lucide-react";

const URL = "https://linqwrites-growth-studio.lovable.app/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Get in Touch — LinqWrites" },
      { name: "description", content: "Email, WhatsApp or message LinqWrites. We reply within 24 hours, founder to founder." },
      { name: "keywords", content: "contact LinqWrites, hire ghostwriter, LinkedIn ghostwriting contact, WhatsApp LinqWrites, agency enquiry" },
      { property: "og:title", content: "Get in Touch — LinqWrites" },
      { property: "og:description", content: "Reach the studio in under a minute. Email, WhatsApp or form." },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell
      index="10"
      eyebrow="Concierge · Get in Touch"
      title="Say hello to"
      emphasis="the studio."
      lede="Founders, operators and curious humans welcome. We answer every message ourselves within 24 hours."
    >
      <div className="card-grid">
        <a className="card" href="mailto:linqwrites@gmail.com">
          <h3><Mail size={18} style={{ display: "inline", marginRight: 8 }} />Email</h3>
          <p>linqwrites@gmail.com</p>
        </a>
        <a className="card" href="https://wa.me/917381442999" target="_blank" rel="noreferrer">
          <h3><MessageCircle size={18} style={{ display: "inline", marginRight: 8 }} />WhatsApp</h3>
          <p>+91 73814 42999</p>
        </a>
      </div>
      <h2>Or send a short brief</h2>
      <ContactForm />
    </PageShell>
  );
}
