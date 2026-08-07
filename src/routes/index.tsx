import { createFileRoute } from "@tanstack/react-router";
import { LinqLanding } from "@/components/linq/LinqLanding";
import { LuminousBackdrop } from "@/components/linq/LuminousBackdrop";
import { OrbNav } from "@/components/linq/OrbNav";

const URL = "https://linqwrites-growth-studio.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LinqWrites — Founder Growth Studio | Dubai, USA, Germany, Australia, Canada" },
      {
        name: "description",
        content:
          "LinqWrites is a founder growth studio for ghostwriting, narrative engineering, SEO systems, brand design and AI operations. Serving founders in Dubai, the USA, Germany, Australia and Canada.",
      },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: HomeRoute,
});

function HomeRoute() {
  return (
    <>
      <LuminousBackdrop />
      <LinqLanding />
      <OrbNav />
    </>
  );
}
