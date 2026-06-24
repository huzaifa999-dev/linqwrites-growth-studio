import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import linqLogo from "@/assets/linq-logo.webp";
import bgAsset from "@/assets/book-sprint-bg.jpg.asset.json";

export const Route = createFileRoute("/book-your-sprint")({
  head: () => ({
    meta: [
      { title: "Book Your Sprint — LinqWrites" },
      {
        name: "description",
        content:
          "Book a 30-minute strategy call with LinqWrites. Fixed-price deliverables, fast turnaround, founder-friendly.",
      },
      { property: "og:title", content: "Book Your Sprint — LinqWrites" },
      {
        property: "og:description",
        content:
          "30-min strategy call, fixed-price deliverables, fast turnaround.",
      },
      { property: "og:image", content: bgAsset.url },
      { name: "twitter:image", content: bgAsset.url },
    ],
  }),
  component: BookYourSprintPage,
});

function BookYourSprintPage() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      document.body.removeChild(s);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#05070d] text-white">
      {/* Top navigation / brand */}
      <header className="fixed inset-x-0 top-0 z-50 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <img
              src={linqLogo}
              alt="LinqWrites"
              className="h-10 w-10 rounded-full ring-1 ring-teal-300/40 shadow-[0_0_20px_rgba(45,212,191,0.15)]"
            />
            <span className="font-display text-2xl tracking-tight text-white">
              Linq<span className="italic text-teal-300">Writes</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Cinematic background */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[78vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgAsset.url})` }}
      />
      {/* Fade into solid black for embed */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[78vh] bg-gradient-to-b from-transparent via-[#05070d]/40 to-[#05070d]"
      />
      {/* Side vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(5,7,13,0.85) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-[68vh] pb-24 md:pt-[72vh]">
        {/* Calendly embed */}
        <section
          aria-label="Schedule a 30 minute call"
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-[0_30px_80px_-30px_rgba(45,212,191,0.25)] backdrop-blur-xl"
        >
          <div
            className="calendly-inline-widget rounded-xl overflow-hidden"
            data-url="https://calendly.com/linqwrites/30min?hide_gdpr_banner=1&background_color=0a0f1c&text_color=ffffff&primary_color=2dd4bf"
            style={{ minWidth: "320px", height: "720px" }}
          />
        </section>

        <p className="mt-6 text-center text-sm text-white/50">
          Prefer email? Reach us at{" "}
          <a
            href="mailto:hello@linqwrites.com"
            className="text-teal-300 hover:text-teal-200 underline-offset-4 hover:underline"
          >
            hello@linqwrites.com
          </a>
        </p>
      </div>
    </main>
  );
}