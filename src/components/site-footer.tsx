import Link from "next/link";
import { site } from "@/content/site";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="rule mt-32 bg-ink">
      {/* Closing CTA */}
      <div className="shell border-b border-ink-line py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="marker mb-6">Next</p>
            <h2 className="display d2">
              Tell me about
              <br />
              <span className="text-ember">the day.</span>
            </h2>
          </div>
          <div className="lg:pb-3">
            <p className="lede mb-7 text-[1rem]">
              {site.contact.seasonNote} {site.contact.responseTime}
            </p>
            <Link
              href="/book"
              className="group inline-flex items-center gap-3 bg-bone px-7 py-4 text-ink transition-colors hover:bg-ember hover:text-bone"
            >
              <span className="text-[0.95rem] font-medium">Start a booking</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Directory */}
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-[26ch] text-[0.9rem] leading-relaxed text-bone-faint">
            {site.tagline}.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="marker mb-4">Pages</p>
          <ul className="space-y-2 text-[0.9rem]">
            {[{ label: "Home", href: "/" }, ...site.nav, { label: "Book", href: "/book" }].map(
              (item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-draw text-bone-dim hover:text-bone">
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div>
          <p className="marker mb-4">Elsewhere</p>
          <ul className="space-y-2 text-[0.9rem]">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-draw text-bone-dim hover:text-bone"
                >
                  {s.label} <span className="text-bone-faint">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="marker mb-4">Direct</p>
          <ul className="space-y-2 text-[0.9rem] text-bone-dim">
            <li>
              <a href={`mailto:${site.contact.email}`} className="link-draw hover:text-bone">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={site.contact.phoneHref} className="link-draw hover:text-bone">
                {site.contact.phone}
              </a>
            </li>
            <li className="text-bone-faint">{site.contact.baseCity}</li>
            <li className="text-bone-faint">{site.contact.travel}</li>
          </ul>
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-ink-line py-6 text-[0.75rem] text-bone-faint sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. All films and images remain the property of the
          creator.
        </p>
        <p>{site.contact.travel}</p>
      </div>
    </footer>
  );
}
