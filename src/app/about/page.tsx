import type { Metadata } from "next";
import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { about } from "@/content/about";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The person behind the camera: how IBK Horbs works, what the kit is, and why the films look the way they do.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        marker="About"
        title={about.headline}
        lede={about.intro}
      />

      {/* Portrait / intro video — portrait-shaped, so a vertical photo isn't
          cropped to a letterbox strip. */}
      <section className="shell">
        <Reveal className="relative aspect-[3/4] w-full overflow-hidden bg-ink-raised sm:aspect-[4/3] lg:aspect-[16/9]">
          {about.introVideo ? (
            <video
              src={about.introVideo}
              poster={about.portrait}
              controls
              playsInline
              preload="none"
              className="h-full w-full object-cover"
            />
          ) : (
            <MediaFrame
              src={about.portrait}
              alt={`${site.name} portrait`}
              seed="about-portrait"
              label="IBK Horbs"
              priority
              sizes="100vw"
              className="object-[center_28%]"
            />
          )}
        </Reveal>
      </section>

      {/* Story — second portrait runs alongside the copy. */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <p className="marker mb-8">The long version</p>
            <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden bg-ink-raised">
              <MediaFrame
                src={about.portraitAlt}
                alt={`${site.name} portrait`}
                seed="about-portrait-alt"
                label="IBK"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </div>
          </Reveal>
          <div className="space-y-6">
            {about.body.map((para, i) => (
              <Reveal key={i} delay={i * 70}>
                <p className="text-[1.05rem] leading-[1.75] text-bone-dim md:text-[1.15rem]">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the scenes */}
      <section className="border-y border-ink-line">
        <div className="shell py-16">
          <p className="marker mb-8">Behind the scenes</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {about.behindTheScenes.map((shot, i) => (
              <Reveal key={shot.caption} delay={i * 60}>
                <figure>
                  <div className="relative aspect-square overflow-hidden bg-ink-raised">
                    <MediaFrame
                      src={shot.src}
                      alt={shot.caption}
                      seed={shot.caption}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <figcaption className="marker mt-2.5">{shot.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Kit + stats */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="marker mb-6">The bag</p>
            <p className="mb-6 text-[1.05rem] text-bone-dim">
              {about.kit.note}the gear matters far less than the timing, but here it is anyway.
            </p>
            <ul className="divide-y divide-ink-line border-y border-ink-line">
              {about.kit.items.map((item) => (
                <li key={item} className="py-3 text-[0.95rem] text-bone-dim">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <p className="marker mb-6">By the numbers</p>
            <div className="grid grid-cols-2 gap-px bg-ink-line">
              {about.stats.map((s) => (
                <div key={s.label} className="bg-ink p-6">
                  <p className="display text-[2.25rem] leading-none text-ember">{s.figure}</p>
                  <p className="mt-2 text-[0.85rem] text-bone-faint">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="marker mb-4">Based in</p>
              <p className="display d3">{site.contact.baseCity}</p>
              <p className="mt-2 text-[0.95rem] text-bone-dim">{site.contact.travel}</p>
              <Link
                href="/book"
                className="mt-8 inline-flex items-center gap-3 bg-bone px-6 py-3.5 text-ink transition-colors hover:bg-ember hover:text-bone"
              >
                <span className="text-[0.95rem] font-medium">Work with me</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
