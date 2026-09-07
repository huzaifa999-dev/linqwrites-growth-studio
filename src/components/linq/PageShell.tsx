import type { ReactNode } from "react";
import { SiteNav, SiteFooter } from "@/components/bother/SiteChrome";
import { MaskedLine } from "@/components/bother/Reveal";

export interface PageShellProps {
  index: string;
  eyebrow: string;
  title: string;
  emphasis?: string;
  lede: string;
  children: ReactNode;
  cta?: { label: string; href: string; external?: boolean };
}

export function PageShell({ index, eyebrow, title, emphasis, lede, children, cta }: PageShellProps) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteNav />
      <main>
        <section className="wrap pb-16 pt-20 md:pb-24 md:pt-28">
          <div className="rail">
            <p className="rail-label">
              <b>{index}</b> / {eyebrow}
            </p>
            <div>
              <h1 className="t-display max-w-[18ch]">
                <MaskedLine>
                  {title}
                  {emphasis ? ` ${emphasis}` : ""}
                </MaskedLine>
              </h1>
              <p className="measure t-lead mt-8 text-ink-soft">{lede}</p>
              {cta && (
                <a
                  href={cta.href}
                  className="btn btn-primary mt-10"
                  {...(cta.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {cta.label}
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap rail">
            <p className="rail-label">Detail</p>
            <div className="prose-bother measure">{children}</div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
