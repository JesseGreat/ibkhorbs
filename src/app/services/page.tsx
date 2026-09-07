import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { services, faqs } from "@/content/services";

export const metadata: Metadata = {
  title: "Services & Packages",
  description:
    "Wedding films, brand commercials and travel content: what's included, how the process runs, and what it costs.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        marker="Services"
        title={
          <>
            What you
            <br />
            get.
          </>
        }
        lede="Three pillars, clear packages, no mystery line items. Everything below is a starting point. Most bookings get shaped around the day itself."
        aside={
          <nav className="flex flex-wrap gap-2" aria-label="Jump to service">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="border border-ink-line px-4 py-2 text-[0.9rem] text-bone-dim transition-colors hover:border-ember hover:text-bone"
              >
                <span className="font-mono text-[0.7rem] text-bone-faint">{s.index}</span>{" "}
                {s.title}
              </a>
            ))}
          </nav>
        }
      />

      {services.map((service) => (
        <section
          key={service.slug}
          id={service.slug}
          className="shell scroll-mt-28 border-t border-ink-line py-20 md:py-28"
        >
          <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="marker mb-5 text-ember">{service.index}</p>
              <h2 className="display d2">{service.title}</h2>
            </div>
            <p className="lede lg:pt-3">{service.intro}</p>
          </Reveal>

          {/* Packages */}
          <div className="mt-14 grid gap-px bg-ink-line lg:grid-cols-3">
            {service.packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 80}>
                <div
                  className={`flex h-full flex-col p-7 md:p-9 ${
                    pkg.highlight ? "bg-ink-raised" : "bg-ink"
                  }`}
                >
                  {pkg.highlight ? (
                    <p className="marker mb-5 text-ember">Most booked</p>
                  ) : (
                    <p className="marker mb-5 opacity-0" aria-hidden>
                      .
                    </p>
                  )}
                  <h3 className="display text-[1.75rem] leading-none">{pkg.name}</h3>
                  <p className="mt-3 font-mono text-[1.05rem] text-ember">{pkg.price}</p>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-bone-dim">{pkg.summary}</p>

                  <ul className="mt-7 space-y-2.5 border-t border-ink-line pt-7 text-[0.92rem] text-bone-dim">
                    {pkg.includes.map((inc) => (
                      <li key={inc} className="flex gap-3">
                        <span aria-hidden className="mt-[0.45em] h-px w-3 shrink-0 bg-ember" />
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/book?service=${service.slug}&package=${encodeURIComponent(pkg.name)}`}
                    className="mt-8 inline-flex items-center gap-2 self-start border-b border-bone/30 pb-1 text-[0.92rem] transition-colors hover:border-ember hover:text-ember"
                  >
                    Inquire about {pkg.name}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Process */}
          <Reveal className="mt-16">
            <p className="marker mb-6">How it runs</p>
            <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.process.map((step, i) => (
                <li key={step.step} className="border-t border-ink-line pt-4">
                  <p className="marker mb-2 text-ember">{String(i + 1).padStart(2, "0")}</p>
                  <h4 className="mb-1.5 text-[1.05rem]">{step.step}</h4>
                  <p className="text-[0.9rem] leading-relaxed text-bone-faint">{step.detail}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>
      ))}

      {/* FAQ */}
      <section className="shell border-t border-ink-line py-20 md:py-28">
        <Reveal>
          <p className="marker mb-5">Before you ask</p>
          <h2 className="display d2 mb-12 max-w-[14ch]">The usual questions.</h2>
        </Reveal>
        <div className="grid gap-x-14 gap-y-10 md:grid-cols-2">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={(i % 2) * 70}>
              <h3 className="display mb-3 text-[1.3rem] leading-snug">{f.q}</h3>
              <p className="text-[0.95rem] leading-relaxed text-bone-dim">{f.a}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
