import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Wordmark } from "./Wordmark";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/imagine", label: "Signal" },
  { to: "/deep-dive", label: "Carry" },
  { to: "/labs", label: "Systems" },
  { to: "/newsroom", label: "Work" },
  { to: "/origin", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const UTILITY_NAV = [
  { to: "/careers", label: "Careers" },
  { to: "/legal", label: "Legal" },
  { to: "/terms", label: "Terms" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [releasing, setReleasing] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])');
    focusables?.[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  const follow = (to: string) => {
    setReleasing(to);
    window.setTimeout(() => {
      setOpen(false);
      setReleasing(null);
      navigate({ to });
    }, reduced ? 0 : 170);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100]">
      <div className="wrap flex items-center justify-between py-5">
        <Link to="/" className="text-ink" aria-label="BOTHER home">
          <Wordmark size={22} />
        </Link>
        {!open && (
          <motion.button
            ref={triggerRef}
            layoutId="menu-shell"
            type="button"
            className="menu-pill pointer-events-auto"
            aria-expanded={false}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
            transition={reduced ? { duration: 0 } : { duration: 0.7, ease: [0.77, 0, 0.18, 1] }}
          >
            MENU
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="site-menu"
            layoutId="menu-shell"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="menu-panel pointer-events-auto"
            transition={reduced ? { duration: 0 } : { duration: 0.7, ease: [0.77, 0, 0.18, 1] }}
          >
            <button type="button" className="menu-pill menu-close" onClick={() => setOpen(false)}>
              CLOSE
            </button>
            <nav aria-label="Primary" className="menu-primary">
              {NAV.map((item, index) => (
                <motion.a
                  key={item.to}
                  href={item.to}
                  onClick={(event) => { event.preventDefault(); follow(item.to); }}
                  className={`menu-link ${releasing === item.to ? "is-releasing" : ""}`}
                  initial={reduced ? false : { opacity: 0, x: 28, skewX: -7 }}
                  animate={{ opacity: 1, x: 0, skewX: 0 }}
                  transition={{ delay: reduced ? 0 : 0.28 + index * 0.07, duration: reduced ? 0 : 0.5 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <nav aria-label="Utility" className="menu-utility">
              {UTILITY_NAV.map((item) => (
                <a key={item.to} href={item.to} onClick={(event) => { event.preventDefault(); follow(item.to); }}>
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="on-teal">
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
            <Link to={l.to} className="t-small text-ink transition-colors duration-200 hover:text-amber">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
