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
        <Reveal>
          <InquiryForm enabled={site.bookingFormEnabled} />
        </Reveal>

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
