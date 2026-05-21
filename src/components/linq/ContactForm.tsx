import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Tell us your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  company: z.string().trim().max(120).optional(),
  budget: z.string().max(40).optional(),
  message: z.string().trim().min(10, "A few words please").max(1200),
});

type FormState = z.infer<typeof schema>;

const budgets = ["< $2k", "$2k – $5k", "$5k – $15k", "$15k+"];

export function ContactForm() {
  const [state, setState] = useState<FormState>({ name: "", email: "", company: "", budget: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setState((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(state);
    if (!parsed.success) {
      const errs: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    // Mailto handoff so it works without backend
    const body = encodeURIComponent(
      `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nCompany: ${parsed.data.company ?? ""}\nBudget: ${parsed.data.budget ?? ""}\n\n${parsed.data.message}`,
    );
    const subject = encodeURIComponent(`New project enquiry from ${parsed.data.name}`);
    window.location.href = `mailto:linqwrites@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl border border-hairline bg-paper-warm p-10 text-center"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-warm text-paper">
          <Check size={20} />
        </div>
        <h3 className="mt-6 font-display text-2xl text-ink">Your message is on the way.</h3>
        <p className="mt-3 text-sm text-ink-soft">We reply to every founder within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={submit}
      className="rounded-3xl border border-hairline bg-paper-warm/60 p-8 backdrop-blur md:p-10"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Your name" error={errors.name}>
          <input
            value={state.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Ada Lovelace"
            className="field"
            maxLength={80}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={state.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@studio.com"
            className="field"
            maxLength={160}
          />
        </Field>
        <Field label="Company" error={errors.company}>
          <input
            value={state.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="Optional"
            className="field"
            maxLength={120}
          />
        </Field>
        <Field label="Budget">
          <div className="flex flex-wrap gap-2">
            {budgets.map((b) => (
              <button
                type="button"
                key={b}
                onClick={() => set("budget", b)}
                className={`rounded-full border px-3.5 py-1.5 text-xs transition ${state.budget === b ? "border-accent-warm bg-accent-warm/10 text-ink" : "border-hairline text-ink-soft hover:text-ink"}`}
              >
                {b}
              </button>
            ))}
          </div>
        </Field>
        <div className="md:col-span-2">
          <Field label="What are you building?" error={errors.message}>
            <textarea
              value={state.message}
              onChange={(e) => set("message", e.target.value)}
              rows={5}
              placeholder="Tell us what you want people to think when they hear your name."
              className="field resize-none"
              maxLength={1200}
            />
          </Field>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-ink-soft">We read every message. No bots, no funnels.</p>
        <button
          type="submit"
          className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm text-paper transition hover:-translate-y-0.5"
        >
          Send enquiry
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
      <style>{`
        .field {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid var(--hairline);
          padding: 0.65rem 0;
          font-size: 0.95rem;
          color: var(--ink);
          outline: none;
          transition: border-color 0.4s ease;
        }
        .field::placeholder { color: oklch(0.55 0.018 80); }
        .field:focus { border-color: var(--accent-warm); }
      `}</style>
    </motion.form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.25em] text-ink-soft">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-[oklch(0.7_0.18_25)]">{error}</span>}
    </label>
  );
}