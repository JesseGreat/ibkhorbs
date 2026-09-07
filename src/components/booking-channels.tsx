import { site } from "@/content/site";

/**
 * The ways to reach IBK that already work. Shown in place of a submission
 * while `site.bookingFormEnabled` is false — every route out is a plain
 * link, so there is nothing that can fail.
 */
export function BookingChannels() {
  const channels = [
    {
      label: "WhatsApp",
      value: site.contact.phone,
      href: site.contact.whatsapp,
      note: "Fastest, usually answered same day",
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
  );
}
