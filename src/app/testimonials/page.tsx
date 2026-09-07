import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { testimonials } from "@/content/testimonials";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What couples and brands say after working with IBK Horbs — wedding films, commercials and travel content.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        marker={`Testimonials · ${String(testimonials.length).padStart(2, "0")}`}
        title={
          <>
            Said
            <br />
            after.
          </>
        }
        lede="Every quote below is from someone who booked, watched the delivery land, and then wrote back."
      />

      <div className="shell columns-1 gap-6 pb-10 md:columns-2 lg:columns-3">
        {testimonials.map((t, i) => {
          const lead = t.weight === "lead";
          return (
            <Reveal
              key={t.name + i}
              delay={(i % 3) * 70}
              className={`mb-6 break-inside-avoid border p-7 md:p-8 ${
                lead ? "border-ember/40 bg-ink-raised" : "border-ink-line"
              }`}
            >
              <p className="marker mb-5 text-ember">
                {site.pillars.find((p) => p.slug === t.category)?.title}
              </p>
              <blockquote
                className={
                  lead
                    ? "display text-[1.4rem] leading-[1.3]"
                    : "text-[1rem] leading-[1.7] text-bone-dim"
                }
              >
                {t.quote}
              </blockquote>
              <footer className="mt-6 border-t border-ink-line pt-4">
                <p className="text-[0.95rem] text-bone">{t.name}</p>
                <p className="marker mt-1">{t.detail}</p>
              </footer>
            </Reveal>
          );
        })}
      </div>

      <section className="shell border-t border-ink-line py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display d3 max-w-[18ch]">Want to be the next one?</h2>
          <Link
            href="/book"
            className="inline-flex items-center gap-3 bg-bone px-7 py-4 text-ink transition-colors hover:bg-ember hover:text-bone"
          >
            <span className="text-[0.95rem] font-medium">Check your date</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
