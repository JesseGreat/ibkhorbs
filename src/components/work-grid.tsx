"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { site, type PillarSlug } from "@/content/site";
import { work, type WorkItem } from "@/content/work";
import { setSearch, useSearchString } from "@/lib/client-hooks";
import { parsePostUrl } from "@/lib/post-url";
import { MediaFrame } from "./media-frame";
import { ReelCard } from "./reel-card";

type Filter = PillarSlug | "all";

/** How many pieces render before the "Load more" button. */
const BATCH = 9;

export function WorkGrid({ items = work }: { items?: WorkItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(BATCH);

  /* The URL is the single source of truth for the filter, so /work?c=weddings
     is linkable from the homepage pillars and survives a refresh. Read via
     useSyncExternalStore rather than useSearchParams, which would force a
     Suspense boundary and opt the whole page out of static rendering. */
  const search = useSearchString();
  const filter = useMemo<Filter>(() => {
    const c = new URLSearchParams(search).get("c");
    return c && site.pillars.some((p) => p.slug === c) ? (c as Filter) : "all";
  }, [search]);

  const matching = useMemo(
    () => (filter === "all" ? items : items.filter((w) => w.category === filter)),
    [items, filter],
  );

  const shown = matching.slice(0, visible);
  const remaining = matching.length - shown.length;

  const choose = useCallback((next: Filter) => {
    setSearch(next === "all" ? "" : `c=${next}`);
    setVisible(BATCH); // start each category from the top
  }, []);

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    ...site.pillars.map((p) => ({ value: p.slug as Filter, label: p.title })),
  ];

  return (
    <>
      {/* Filter bar */}
      <div className="no-scrollbar sticky top-[4.5rem] z-30 -mx-[var(--shell)] overflow-x-auto border-y border-ink-line bg-ink/85 px-[var(--shell)] backdrop-blur-xl">
        <div className="flex min-w-max items-center gap-1 py-3" role="group" aria-label="Filter work">
          {filters.map((f) => {
            const count =
              f.value === "all" ? items.length : items.filter((w) => w.category === f.value).length;
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => choose(f.value)}
                aria-pressed={active}
                className={`flex items-baseline gap-2 px-4 py-2 text-[0.9rem] transition-colors ${
                  active ? "bg-bone text-ink" : "text-bone-dim hover:text-bone"
                }`}
              >
                {f.label}
                <span
                  className={`font-mono text-[0.65rem] ${active ? "text-ink/50" : "text-bone-faint"}`}
                >
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 items-start gap-x-5 gap-y-10 py-10 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((item, i) =>
          item.instagram && !item.poster ? (
            <ReelCard key={item.slug} item={item} eager={i < 3} />
          ) : (
            <PosterCard key={item.slug} item={item} onOpen={() => setOpenIndex(i)} eager={i < 3} />
          ),
        )}
      </div>

      {matching.length === 0 ? (
        <p className="lede py-20 text-center">Nothing here yet. New work lands most months.</p>
      ) : null}

      {remaining > 0 ? (
        <div className="flex flex-col items-center gap-3 pb-6">
          <button
            type="button"
            onClick={() => setVisible((v) => v + BATCH)}
            className="group inline-flex items-center gap-3 border border-bone/25 px-8 py-4 transition-colors hover:border-ember hover:bg-bone/5"
          >
            <span className="text-[0.95rem]">Load {Math.min(remaining, BATCH)} more</span>
            <span aria-hidden className="transition-transform group-hover:translate-y-0.5">
              ↓
            </span>
          </button>
          <p className="marker" aria-live="polite">
            Showing {shown.length} of {matching.length}
          </p>
        </div>
      ) : null}

      {openIndex !== null && openIndex < shown.length ? (
        <Lightbox
          items={shown}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------------ */

/** A piece backed by a real still/video file — opens in the lightbox. */
function PosterCard({
  item,
  onOpen,
  eager,
}: {
  item: WorkItem;
  onOpen: () => void;
  eager: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-[4/5] overflow-hidden bg-ink-raised text-left"
    >
      <MediaFrame
        src={item.poster}
        alt={`${item.title}, ${item.category}`}
        seed={item.slug}
        priority={eager}
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
        <div>
          <p className="marker mb-1.5 text-bone-dim">
            {item.location} · {item.year}
          </p>
          <h3 className="display text-[1.4rem] leading-none text-bone">{item.title}</h3>
        </div>
        <span
          aria-hidden
          className="mb-1 translate-y-1 text-ember opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          ↗
        </span>
      </div>
      {item.video || item.instagram ? (
        <span className="marker absolute top-3 right-3 border border-bone/25 px-1.5 py-0.5 text-bone">
          FILM
        </span>
      ) : null}
    </button>
  );
}

/* ------------------------------------------------------------------ */

function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: WorkItem[];
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, items.length, onClose, onNavigate]);

  const embed = item.instagram ? parsePostUrl(item.instagram).src : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/97 backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b border-ink-line px-[var(--shell)] py-4">
        <p className="marker">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="text-[0.9rem] text-bone-dim hover:text-bone"
        >
          Close ✕
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center p-[var(--shell)]">
        <figure className="flex h-full max-h-full w-full max-w-6xl flex-col">
          <div className="relative min-h-0 flex-1 overflow-hidden bg-ink-raised">
            {item.video ? (
              // Only ever one video element on screen at a time.
              <video
                key={item.slug}
                src={item.video}
                poster={item.poster}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            ) : embed ? (
              <div className="flex h-full w-full justify-center">
                <iframe
                  key={item.slug}
                  src={embed}
                  title={item.title}
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full max-w-[26rem] border-0"
                />
              </div>
            ) : (
              <MediaFrame
                src={item.poster}
                alt={item.title}
                seed={item.slug}
                label={item.title}
                priority
                sizes="90vw"
              />
            )}
          </div>

          <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
            <div>
              <h2 className="display d3">{item.title}</h2>
              {item.note ? (
                <p className="mt-1.5 max-w-[52ch] text-[0.95rem] text-bone-dim">{item.note}</p>
              ) : null}
            </div>
            <p className="marker">
              {[item.client, item.location, item.year].filter(Boolean).join(" · ")}
            </p>
          </figcaption>
        </figure>
      </div>

      <div className="flex items-center justify-between border-t border-ink-line px-[var(--shell)] py-4">
        <button
          type="button"
          onClick={() => onNavigate((index - 1 + items.length) % items.length)}
          className="text-[0.9rem] text-bone-dim hover:text-bone"
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={() => onNavigate((index + 1) % items.length)}
          className="text-[0.9rem] text-bone-dim hover:text-bone"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
