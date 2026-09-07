import type { PillarSlug } from "./site";

/* =====================================================================
   PORTFOLIO
   ---------------------------------------------------------------------
   Every item below is a real Instagram reel from @ibk.horbs, playing in
   place in the grid via Instagram's own embed.

   ⚠️  CATEGORIES AND TITLES ARE GUESSES — PLEASE CORRECT THEM.
   I can't watch the reels, so I can't tell which are weddings, which are
   commercials and which are travel. They've been spread across all three
   so every filter has something in it. Two things to fix per item:

     category: "weddings" | "commercials" | "travel"
     title:    "Reel 01"  ->  the couple's or client's actual name

   Titles are deliberately neutral rather than invented — these are real
   clients' weddings, and putting made-up names on them would be worse
   than an obvious placeholder.

   TO USE YOUR OWN MEDIA INSTEAD OF THE EMBED:
   Add a `poster` (and optionally a `video`) and the item renders as a
   designed dark tile that opens in the lightbox, with none of Instagram's
   card chrome:  poster: "/work/weddings/reel-01.jpg"

   `span` sets the size in the grid, which is what gives it its rhythm:
     "std"   — one column, standard height
     "tall"  — one column, noticeably deeper
     "wide"  — two columns, so the reel plays larger
   Mobile is a single column, so span only applies from tablet up.
   ===================================================================== */

export type Span = "std" | "tall" | "wide";

export type WorkItem = {
  slug: string;
  title: string;
  /** Couple or brand. Optional while titles are still placeholders. */
  client?: string;
  category: PillarSlug;
  year: number;
  location: string;
  /** Short caption shown in the lightbox. */
  note?: string;
  poster?: string;
  video?: string;
  /** Instagram reel/post URL — embedded in the lightbox when there's no `video`. */
  instagram?: string;
  span: Span;
  /** Show on the homepage "selected work" strip. */
  featured?: boolean;
};

const reel = (code: string) => `https://www.instagram.com/reel/${code}/`;

export const work: WorkItem[] = [
  // ---- guessed as WEDDINGS ------------------------------------------
  { slug: "reel-01", title: "Reel 01", category: "weddings", year: 2026, location: "Abuja, NG", instagram: reel("DSeceUFiDKG"), span: "wide", featured: true },
  { slug: "reel-02", title: "Reel 02", category: "weddings", year: 2026, location: "Abuja, NG", instagram: reel("DTQh1ZXjYnL"), span: "std", featured: true },
  { slug: "reel-03", title: "Reel 03", category: "weddings", year: 2026, location: "Abuja, NG", instagram: reel("Dc9Kw-0uv8S"), span: "tall", featured: true },
  { slug: "reel-04", title: "Reel 04", category: "weddings", year: 2026, location: "Abuja, NG", instagram: reel("Dc5pCNxuRb7"), span: "std" },
  { slug: "reel-05", title: "Reel 05", category: "weddings", year: 2026, location: "Abuja, NG", instagram: reel("Dc3B41AOfj2"), span: "std" },
  { slug: "reel-06", title: "Reel 06", category: "weddings", year: 2026, location: "Abuja, NG", instagram: reel("Dc0ecnOuI0o"), span: "tall", featured: true },
  { slug: "reel-07", title: "Reel 07", category: "weddings", year: 2026, location: "Abuja, NG", instagram: reel("DcoRNjzoIhl"), span: "std" },
  { slug: "reel-08", title: "Reel 08", category: "weddings", year: 2025, location: "Lagos, NG", instagram: reel("Dcg6SxrObgd"), span: "wide" },
  { slug: "reel-09", title: "Reel 09", category: "weddings", year: 2025, location: "Lagos, NG", instagram: reel("DcdSkwUuRBQ"), span: "std" },
  { slug: "reel-10", title: "Reel 10", category: "weddings", year: 2025, location: "Abuja, NG", instagram: reel("DcYBRURoe76"), span: "tall" },
  { slug: "reel-11", title: "Reel 11", category: "weddings", year: 2025, location: "Abuja, NG", instagram: reel("DcUDpX9oOiu"), span: "std" },
  { slug: "reel-12", title: "Reel 12", category: "weddings", year: 2025, location: "Enugu, NG", instagram: reel("DcRbuBpOhjw"), span: "std" },
  { slug: "reel-13", title: "Reel 13", category: "weddings", year: 2025, location: "Abuja, NG", instagram: reel("DcN6DxHuwoC"), span: "tall" },
  { slug: "reel-14", title: "Reel 14", category: "weddings", year: 2025, location: "Abuja, NG", instagram: reel("DcLLJKAOiVo"), span: "std" },

  // ---- guessed as COMMERCIALS ---------------------------------------
  { slug: "reel-15", title: "Reel 15", category: "commercials", year: 2025, location: "Abuja, NG", instagram: reel("DcCGu8gNEGq"), span: "wide", featured: true },
  { slug: "reel-16", title: "Reel 16", category: "commercials", year: 2025, location: "Abuja, NG", instagram: reel("DcA9VdsOvXI"), span: "std" },
  { slug: "reel-17", title: "Reel 17", category: "commercials", year: 2025, location: "Lagos, NG", instagram: reel("DbtZafRuXD9"), span: "tall" },
  { slug: "reel-18", title: "Reel 18", category: "commercials", year: 2025, location: "Lagos, NG", instagram: reel("DbsJY5AsBgB"), span: "std" },
  { slug: "reel-19", title: "Reel 19", category: "commercials", year: 2025, location: "Abuja, NG", instagram: reel("Dbcv1urq7J9"), span: "std" },
  { slug: "reel-20", title: "Reel 20", category: "commercials", year: 2025, location: "Abuja, NG", instagram: reel("DbYuMmiOynB"), span: "tall" },

  // ---- guessed as TRAVEL --------------------------------------------
  { slug: "reel-21", title: "Reel 21", category: "travel", year: 2025, location: "Nigeria", instagram: reel("DbRHRB9OlSx"), span: "wide", featured: true },
  { slug: "reel-22", title: "Reel 22", category: "travel", year: 2025, location: "Nigeria", instagram: reel("DbOjLtvOuNP"), span: "std" },
  { slug: "reel-23", title: "Reel 23", category: "travel", year: 2024, location: "Nigeria", instagram: reel("DagG-_zs0W5"), span: "tall" },
  { slug: "reel-24", title: "Reel 24", category: "travel", year: 2024, location: "Nigeria", instagram: reel("DZN_Dt4uYDO"), span: "std" },
];

export const featuredWork = work.filter((w) => w.featured);

export function countByCategory(category: PillarSlug | "all") {
  return category === "all" ? work.length : work.filter((w) => w.category === category).length;
}
