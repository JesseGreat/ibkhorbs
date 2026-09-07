import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with IBK Horbs at ${site.contact.email}. Based in ${site.contact.baseCity}, ${site.contact.travel.toLowerCase()}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        marker="Contact"
        title={
          <>
            Say
            <br />
            hello.
          </>
        }
        lede={site.contact.responseTime}
      />

      <section className="shell grid gap-px bg-ink-line md:grid-cols-2">
        <Reveal className="bg-ink p-8 md:p-12">
          <p className="marker mb-6">Direct</p>
          <a
            href={`mailto:${site.contact.email}`}
            className="display block text-[clamp(1.5rem,4vw,2.5rem)] leading-tight break-all hover:text-ember"
          >
            {site.contact.email}
          </a>
          <a
            href={site.contact.phoneHref}
            className="display mt-4 block text-[clamp(1.5rem,4vw,2.5rem)] leading-tight hover:text-ember"
          >
            {site.contact.phone}
          </a>
          <p className="mt-8 max-w-[40ch] text-[0.95rem] leading-relaxed text-bone-dim">
            For bookings, the{" "}
            <Link href="/book" className="link-draw text-bone">
              inquiry form
            </Link>{" "}
            is faster. It asks for everything I need to check the date in one go.
          </p>
        </Reveal>

        <Reveal delay={80} className="bg-ink p-8 md:p-12">
          <p className="marker mb-6">Elsewhere</p>
          <ul className="space-y-4">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-baseline justify-between gap-4 border-b border-ink-line pb-3"
                >
                  <span className="display text-[1.5rem] group-hover:text-ember">{s.label}</span>
                  <span className="marker">{s.handle} ↗</span>
                </a>
              </li>
            ))}
          </ul>
          <Link href="/work" className="link-draw mt-6 inline-block text-[0.95rem] text-bone-dim hover:text-bone">
            See the work →
          </Link>
        </Reveal>

        <Reveal delay={120} className="bg-ink p-8 md:p-12">
          <p className="marker mb-6">Based in</p>
          <p className="display d3">{site.contact.baseCity}</p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-bone-dim">
            {site.contact.travel}. Travel within Nigeria is included in most packages; anywhere else
            is flights and accommodation at cost plus a destination fee, agreed before anything is
            signed.
          </p>
        </Reveal>

        <Reveal delay={160} className="bg-ink p-8 md:p-12">
          <p className="marker mb-6">Response time</p>
          <p className="display d3">Within 48 hours</p>
          <p className="mt-3 max-w-[40ch] text-[0.95rem] leading-relaxed text-bone-dim">
            If you haven&apos;t heard back in two days, something has gone wrong with email, so call
            or send a DM and I&apos;ll pick it up.
          </p>
        </Reveal>
      </section>

      <section className="shell py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink-line pt-10">
          <h2 className="display d3 max-w-[18ch]">Got a date in mind?</h2>
          <Link
            href="/book"
            className="inline-flex items-center gap-3 bg-bone px-7 py-4 text-ink transition-colors hover:bg-ember hover:text-bone"
          >
            <span className="text-[0.95rem] font-medium">Check availability</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
