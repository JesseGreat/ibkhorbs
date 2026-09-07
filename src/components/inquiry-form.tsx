"use client";

import { useMemo, useState } from "react";
import { site } from "@/content/site";
import { useSearchString } from "@/lib/client-hooks";

type Status = "idle" | "sending" | "sent" | "error";

const BUDGETS = [
  "Under ₦300,000",
  "₦300,000 – ₦750,000",
  "₦750,000 – ₦1.5m",
  "₦1.5m – ₦3m",
  "₦3m+",
  "Not sure yet",
];

const fieldClass =
  "w-full border-b border-ink-line bg-transparent py-3 text-[1rem] text-bone outline-none transition-colors placeholder:text-bone-faint focus:border-ember";

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  /* /services links through as ?service=weddings&package=The%20Full%20Day.
     Read from location rather than useSearchParams so this component
     doesn't force a Suspense boundary and keeps the page statically rendered. */
  const search = useSearchString();
  const prefill = useMemo(() => {
    const q = new URLSearchParams(search);
    return {
      service: q.get("service") ?? undefined,
      packageName: q.get("package") ?? undefined,
    };
  }, [search]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    setMessage("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (res.ok) {
        setStatus("sent");
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        setStatus("error");
        setMessage("A couple of fields need another look.");
        return;
      }
      setStatus("error");
      setMessage(json.error ?? "Something went wrong. Try again in a moment.");
    } catch {
      setStatus("error");
      setMessage(`Couldn't reach the server. Email me directly at ${site.contact.email}.`);
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-ember/40 bg-ink-raised p-10 md:p-14">
        <p className="marker mb-6 text-ember">Sent</p>
        <h2 className="display d2 mb-5 max-w-[16ch]">That&apos;s with me.</h2>
        <p className="lede mb-8">
          A confirmation is on its way to your inbox. {site.contact.responseTime} If it&apos;s
          urgent, call {site.contact.phone}.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-draw text-[0.95rem] text-bone-dim hover:text-bone"
        >
          Send another inquiry →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 sm:grid-cols-2">
      {/* Honeypot */}
      <div aria-hidden className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label="Your name" name="name" error={errors.name} required>
        <input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Tolu Adeyemi"
          className={fieldClass}
        />
      </Field>

      <Field label="Email" name="email" error={errors.email} required>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={fieldClass}
        />
      </Field>

      <Field label="Phone" name="phone" hint="Optional">
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+44 …"
          className={fieldClass}
        />
      </Field>

      <Field label="What are you booking?" name="service" error={errors.service} required>
        <select
          id="service"
          name="service"
          defaultValue={prefill.service ?? ""}
          key={prefill.service ?? "service"}
          className={`${fieldClass} [&>option]:bg-ink-raised [&>option]:text-bone`}
        >
          <option value="" disabled>
            Choose one
          </option>
          {site.pillars.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
          <option value="other">Something else</option>
        </select>
      </Field>

      <Field label="Date" name="date" hint="Or a rough month if it's not fixed">
        <input id="date" name="date" type="text" placeholder="14 June 2026" className={fieldClass} />
      </Field>

      <Field label="Location" name="location" hint="City, venue, or country">
        <input id="location" name="location" placeholder="Lagos, Nigeria" className={fieldClass} />
      </Field>

      <Field label="Budget range" name="budget" hint="Helps me shape the right package">
        <select
          id="budget"
          name="budget"
          defaultValue=""
          className={`${fieldClass} [&>option]:bg-ink-raised [&>option]:text-bone`}
        >
          <option value="">Prefer not to say</option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </Field>

      <Field label="How did you find me?" name="source" hint="Optional">
        <input
          id="source"
          name="source"
          placeholder="Instagram, a friend, a venue…"
          className={fieldClass}
        />
      </Field>

      <div className="sm:col-span-2">
        <Field
          label="Tell me about it"
          name="message"
          error={errors.message}
          required
          hint="The day, the vibe, what you want to remember"
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="We're getting married in June, about 120 guests, and the ceremony is outdoors…"
            className={`${fieldClass} resize-y`}
          />
        </Field>
      </div>

      {/* Carried through from /services so the package context isn't lost. */}
      <input type="hidden" name="packageName" value={prefill.packageName ?? ""} />

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[42ch] text-[0.85rem] text-bone-faint">
          {site.contact.responseTime} Your details go straight to my inbox and nowhere else.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-3 bg-bone px-8 py-4 text-ink transition-colors hover:bg-ember hover:text-bone disabled:cursor-wait disabled:opacity-60"
        >
          <span className="text-[0.95rem] font-medium">
            {status === "sending" ? "Sending…" : "Send inquiry"}
          </span>
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>

      <p aria-live="polite" className="sm:col-span-2">
        {status === "error" && message ? (
          <span className="text-[0.9rem] text-ember">{message}</span>
        ) : null}
      </p>

      {prefill.packageName ? (
        <p className="marker sm:col-span-2">Enquiring about: {prefill.packageName}</p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 flex items-baseline justify-between gap-3">
        <span className="text-[0.95rem] text-bone">
          {label}
          {required ? <span className="ml-1 text-ember">*</span> : null}
        </span>
        {hint ? <span className="marker">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-[0.82rem] text-ember" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
