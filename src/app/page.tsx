import Link from "next/link";
import { HeroReel } from "@/components/hero-reel";
import { ReelCard } from "@/components/reel-card";
import { Reveal } from "@/components/reveal";
import { site, heroMedia } from "@/content/site";
import { featuredWork, work } from "@/content/work";
import { leadTestimonials } from "@/content/testimonials";
import { about } from "@/content/about";

export default function HomePage() {
  const marqueeWords = [
    "weddings",
    "commercials",
    "travel",
    "love",
    "laughter",
    "life in motion",
  ];

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative -mt-[4.5rem] flex min-h-[100svh] flex-col justify-end pt-[4.5rem]">
        <HeroReel video={heroMedia.video} poster={heroMedia.poster} />

        <div className="shell relative z-10 pb-14 md:pb-20">
          <p className="marker mb-6 text-bone-dim">
            {site.contact.baseCity} · {site.contact.travel}
          </p>

          <h1 className="display d1 max-w-[15ch]">
            Capturing love,
            <br />
            laughter, and
            <br />
            <em className="text-ember not-italic">life in motion.</em>
          </h1>

          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="lede max-w-[46ch]">
              Mobile and camera content for weddings, brands and the places in between. One person,
              a small bag, and a habit of catching the moment everyone else missed.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/book"
                className="group inline-flex items-center gap-3 bg-bone px-7 py-4 text-ink transition-colors hover:bg-ember hover:text-bone"
              >
                <span className="text-[0.95rem] font-medium">Check your date</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/work"
                className="border border-bone/25 px-7 py-4 text-[0.95rem] transition-colors hover:border-bone hover:bg-bone/5"
              >
                See the work
              </Link>
            </div>
          </div>
        </div>

        <div className="shell relative z-10 flex items-center gap-3 pb-6 text-bone-faint">
          <span className="marker">Scroll</span>
          <span aria-hidden className="h-px w-12 bg-ink-line" />
        </div>
      </section>

      {/* ============================ MARQUEE ============================= */}
      <section aria-hidden className="rule overflow-hidden border-b border-ink-line py-5">
        <div className="marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {marqueeWords.map((w) => (
                <span key={w} className="display flex items-center text-[2rem] whitespace-nowrap">
                  <span className="px-6 text-bone-dim">{w}</span>
                  <span className="text-ember">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============================ PILLARS ============================= */}
      <section className="shell py-24 md:py-32">
        <Reveal>
          <p className="marker mb-4">What I shoot</p>
          <h2 className="display d2 mb-14 max-w-[16ch]">Three things, done properly.</h2>
        </Reveal>

        <div className="grid gap-px bg-ink-line md:grid-cols-3">
          {site.pillars.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <Link
                href={`/work?c=${p.slug}`}
                className="group relative flex h-full flex-col justify-between gap-16 bg-ink p-8 transition-colors hover:bg-ink-raised md:p-10"
              >
                <div>
                  <p className="marker mb-6 text-ember">{p.index}</p>
                  <h3 className="display d3 mb-4">{p.title}</h3>
                  <p className="text-[0.98rem] leading-relaxed text-bone-dim">{p.blurb}</p>
                </div>
                <span className="flex items-center gap-2 text-[0.9rem] text-bone-faint transition-colors group-hover:text-ember">
                  See {p.title.toLowerCase()} work
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================= SELECTED WORK ========================== */}
      <section className="shell pb-24 md:pb-32">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="marker mb-4">Selected</p>
            <h2 className="display d2 max-w-[14ch]">A taste of it.</h2>
          </div>
          <Link href="/work" className="link-draw text-[0.95rem] text-bone-dim hover:text-bone">
            Full portfolio →
          </Link>
        </Reveal>

        {/* Three reels, playing in place. Deliberately only three: each embed
            pulls in Instagram's own bundle, and this is the page that has to
            load fast on a phone off an Instagram bio link. The rest live on
            /work behind the category filters. */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {featuredWork.slice(0, 3).map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 90}>
              <ReelCard item={item} uniform />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 border border-bone/25 px-8 py-4 transition-colors hover:border-ember hover:bg-bone/5"
          >
            <span className="text-[0.95rem]">See all {work.length} pieces</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* ============================= STATS ============================== */}
      <section className="rule border-b border-ink-line">
        <div className="shell grid grid-cols-2 gap-px bg-ink-line md:grid-cols-4">
          {about.stats.map((s) => (
            <div key={s.label} className="bg-ink px-2 py-10 text-center">
              <p className="display d3 text-ember">{s.figure}</p>
              <p className="mt-2 text-[0.85rem] text-bone-faint">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================== TESTIMONIAL =========================== */}
      <section className="shell py-24 md:py-32">
        <Reveal>
          <p className="marker mb-8">In their words</p>
          <blockquote className="display max-w-[20ch] text-[clamp(1.75rem,4.6vw,3.5rem)] leading-[1.05]">
            <span className="text-ember">“</span>
            {leadTestimonials[0]?.quote}
          </blockquote>
          <figcaption className="mt-8 text-[0.95rem] text-bone-dim">
            {leadTestimonials[0]?.name}
            <span className="mx-2 text-bone-faint">·</span>
            <span className="text-bone-faint">{leadTestimonials[0]?.detail}</span>
          </figcaption>
          <Link
            href="/testimonials"
            className="link-draw mt-8 inline-block text-[0.95rem] text-bone-dim hover:text-bone"
          >
            Read the rest →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
