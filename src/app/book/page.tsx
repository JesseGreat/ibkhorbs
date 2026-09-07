import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Book",
  description:
    "Check your date with IBK Horbs. Send the details of your wedding, brand shoot or travel project and get a reply within 48 hours.",
  alternates: { canonical: "/book" },
};

const steps = [
  { n: "01", t: "You get in touch", d: "Date, place, and what the day looks like." },
  { n: "02", t: "I reply within 48 hours", d: "Availability, a rough quote, and a few questions." },
  { n: "03", t: "We talk", d: "Twenty minutes on video. No pressure either way." },
  { n: "04", t: "The date is yours", d: "A 30% retainer and a simple contract lock it in." },
];

/**
 * Shown while `site.bookingFormEnabled` is false. There is no form and no
 * submission, so there is nothing that can fail — every route out of here
 * is a plain link to a channel that already works.
 */
function BookingComingSoon() {
  const channels = [
    {
      label: "WhatsApp",
      value: site.contact.phone,
      href: site.contact.whatsapp,
      note: "Fastest — usually answered same day",
      external: true,
    },
    {
      label: "Email",
      value: site.contact.email,
      href: `mailto:${site.contact.email}?subject=${encodeURIComponent("Booking inquiry")}`,
      note: "Best for dates, budgets and the full brief",
    },
    {
      label: "Call",
      value: site.contact.phone,
      href: site.contact.phoneHref,
      note: "If it's urgent",
    },
    {
      label: "Instagram DM",
      value: site.socials[0].handle,
      href: site.socials[0].url,
      note: "Where most people find me anyway",
      external: true,
    },
  ];

  return (
    <div className="border border-ink-line bg-ink-raised p-8 md:p-12">
      <p className="marker mb-6 text-ember">Online booking — coming soon</p>
      <h2 className="display d2 mb-5 max-w-[18ch]">Talk to me directly.</h2>
      <p className="lede mb-10 max-w-[52ch]">
        The booking form is being switched on shortly. Until then, reach me on any of these — they
        all land with me personally, and {site.contact.responseTime.toLowerCase()}
      </p>

      <ul className="divide-y divide-ink-line border-y border-ink-line">
        {channels.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 transition-colors hover:text-ember"
            >
              <span className="flex min-w-0 flex-col">
                <span className="display text-[1.35rem] leading-none">{c.value}</span>
                <span className="marker mt-2">{c.note}</span>
              </span>
              <span className="marker shrink-0 text-bone-dim group-hover:text-ember">
                {c.label} {c.external ? "↗" : "→"}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-[0.85rem] leading-relaxed text-bone-faint">
        Have the date, the location and roughly what you need in mind — it saves a round trip.
      </p>
    </div>
  );
}

export default function BookPage() {
  return (
    <>
      <PageHeader
        marker="Booking"
        title={
          <>
            Check
            <br />
            your date.
          </>
        }
        lede={`${site.contact.seasonNote} The earlier you ask, the better. ${site.contact.responseTime}`}
      />

      <section className="shell grid gap-16 pb-24 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
        <Reveal>{site.bookingFormEnabled ? <InquiryForm /> : <BookingComingSoon />}</Reveal>

        <aside className="space-y-12 lg:pt-2">
          <Reveal delay={80}>
            <p className="marker mb-6">What happens next</p>
            <ol className="space-y-6">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4 border-t border-ink-line pt-4">
                  <span className="marker mt-0.5 text-ember">{s.n}</span>
                  <div>
                    <p className="text-[1rem] text-bone">{s.t}</p>
                    <p className="mt-1 text-[0.88rem] leading-relaxed text-bone-faint">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={140}>
            <p className="marker mb-5">Starting points</p>
            <ul className="divide-y divide-ink-line border-y border-ink-line">
              {services.map((s) => {
                const cheapest = s.packages[0];
                return (
                  <li key={s.slug} className="flex items-baseline justify-between gap-4 py-3">
                    <span className="text-[0.95rem] text-bone-dim">{s.title}</span>
                    <span className="font-mono text-[0.85rem] text-ember">{cheapest.price}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-[0.85rem] leading-relaxed text-bone-faint">
              Full breakdowns are on the services page. Everything gets quoted properly once I know
              the day.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="marker mb-5">Rather just talk?</p>
            <div className="space-y-2 text-[0.95rem]">
              <p>
                <a href={`mailto:${site.contact.email}`} className="link-draw text-bone-dim hover:text-bone">
                  {site.contact.email}
                </a>
              </p>
              <p>
                <a href={site.contact.phoneHref} className="link-draw text-bone-dim hover:text-bone">
                  {site.contact.phone}
                </a>
              </p>
              <p className="text-bone-faint">
                {site.contact.baseCity} · {site.contact.travel}
              </p>
            </div>
          </Reveal>
        </aside>
      </section>
    </>
  );
}
