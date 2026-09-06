import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./Wordmark";

const NAV = [
  { to: "/imagine", label: "Signal" },
  { to: "/deep-dive", label: "Carry" },
  { to: "/labs", label: "Systems" },
  { to: "/newsroom", label: "Work" },
  { to: "/origin", label: "About" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="wrap flex items-center justify-between py-4">
        <Link to="/" className="text-ink" aria-label="BOTHER home">
          <Wordmark size={22} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="t-label text-ink-soft transition-colors duration-200 hover:text-ink"
              activeProps={{ className: "t-label text-ink" }}
            >
              {n.label}
            </Link>
          ))}
          <Link to="/book-your-sprint" className="btn btn-primary">
            Find the friction
          </Link>
        </nav>

        <button
          type="button"
          className="btn btn-quiet px-3 py-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
          <span className="sr-only">Menu</span>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-rule md:hidden">
          <div className="wrap flex flex-col gap-4 py-6">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="t-label text-ink" onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
            <Link to="/book-your-sprint" className="btn btn-primary self-start" onClick={() => setOpen(false)}>
              Find the friction
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="on-ink">
      <div className="wrap py-20">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.6fr))]">
          <div className="max-w-sm">
            <Wordmark size={28} />
            <p className="t-body mt-6 text-ink-soft">
              Make the important thing easier to see, say, and run. BOTHER finds the signal, then helps it
              carry.
            </p>
            <Link to="/book-your-sprint" className="btn btn-signal mt-8">
              Book a diagnostic
            </Link>
          </div>

          <FooterCol
            title="Work with us"
            links={[
              { to: "/imagine", label: "Signal" },
              { to: "/deep-dive", label: "Carry" },
              { to: "/labs", label: "Systems" },
              { to: "/founders-circle", label: "Who we work with" },
            ]}
          />
          <FooterCol
            title="Evidence"
            links={[
              { to: "/newsroom", label: "Work" },
              { to: "/report", label: "Research" },
              { to: "/resource-vault", label: "Templates" },
              { to: "/roadmap", label: "How we work" },
            ]}
          />
          <FooterCol
            title="Studio"
            links={[
              { to: "/origin", label: "About" },
              { to: "/collective", label: "How BOTHER works" },
              { to: "/contact", label: "Contact" },
              { to: "/careers", label: "Careers" },
            ]}
          />
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-rule pt-8 text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p className="t-small">© {new Date().getFullYear()} BOTHER. Built by two brothers.</p>
          <div className="flex gap-6">
            <Link to="/legal" className="t-small link-ink">
              Privacy
            </Link>
            <Link to="/terms" className="t-small link-ink">
              Terms
            </Link>
            <a href="mailto:linqwrites@gmail.com" className="t-small link-ink">
              linqwrites@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="t-label text-ink-soft">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="t-small text-ink transition-colors duration-200 hover:text-ochre">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
