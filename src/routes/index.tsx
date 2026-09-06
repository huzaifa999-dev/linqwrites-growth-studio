import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/bother/Home";

const URL = "https://linqwrites-growth-studio.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BOTHER — Make the important thing easier to see, say, and run" },
      {
        name: "description",
        content:
          "BOTHER is a clarity-and-systems studio. We sharpen the signal, carry it into your customer-facing surfaces, and build bounded systems for work that keeps repeating.",
      },
      { property: "og:title", content: "BOTHER — Make the important thing easier to see, say, and run" },
      {
        property: "og:description",
        content: "BOTHER finds the signal, then helps it carry. Authority, customer-facing surfaces, and systems.",
      },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: Home,
});
