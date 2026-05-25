import { createFileRoute } from "@tanstack/react-router";
import { LinqLanding } from "@/components/linq/LinqLanding";

const URL = "https://linqwrites-growth-studio.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: LinqLanding,
});
