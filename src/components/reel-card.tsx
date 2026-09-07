import { site } from "@/content/site";
import type { WorkItem } from "@/content/work";
import { parsePostUrl } from "@/lib/post-url";

/**
 * A reel, playing in place — Instagram's own iframe embed, so the footage is
 * visible in the grid rather than hidden behind a click.
 *
 * No client-side JavaScript: it's a plain iframe, so this stays a server
 * component. `loading="lazy"` on all but the first few keeps the initial
 * page light, since each embed pulls in Instagram's own bundle — which is
 * not cheap on mobile data.
 */
/* Drives the uneven grid rhythm. `wide` takes two columns so the reel plays
   noticeably larger; `tall` stays one column but runs deeper. Mobile is a
   single column, so every card is the same size there by design. */
const SPAN: Record<WorkItem["span"], { outer: string; frame: string }> = {
  std: { outer: "", frame: "h-[660px] sm:h-[620px] xl:h-[640px]" },
  tall: { outer: "", frame: "h-[660px] sm:h-[720px] xl:h-[780px]" },
  wide: { outer: "sm:col-span-2", frame: "h-[660px] sm:h-[680px] xl:h-[720px]" },
};

export function ReelCard({
  item,
  eager = false,
  uniform = false,
}: {
  item: WorkItem;
  eager?: boolean;
  /** Ignore `span` and render at a single size (used on the homepage row). */
  uniform?: boolean;
}) {
  const { src } = parsePostUrl(item.instagram ?? "");
  const pillar = site.pillars.find((p) => p.slug === item.category);

  if (!src) return null;

  const span = uniform ? SPAN.std : SPAN[item.span];

  return (
    <figure className={`flex flex-col ${span.outer}`}>
      {/* Tall enough to clear Instagram's whole card — video, action row and
          footer — since the iframe can't scroll. */}
      <div className={`relative overflow-hidden bg-ink-raised ${span.frame}`}>
        <iframe
          src={src}
          title={`${item.title}, ${pillar?.title ?? item.category}`}
          loading={eager ? "eager" : "lazy"}
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-3">
        <div>
          <p className="marker mb-1">
            {item.location} · {item.year}
          </p>
          <h3 className="display text-[1.25rem] leading-none text-bone">{item.title}</h3>
        </div>
        <span className="marker shrink-0 text-ember">{pillar?.title}</span>
      </figcaption>
    </figure>
  );
}
