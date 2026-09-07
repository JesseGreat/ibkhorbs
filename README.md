# IBK Horbs

Portfolio and booking site — Next.js 16 (App Router), TypeScript, Tailwind v4.

---

## Preview locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Edits hot-reload.

```bash
npm run build && npm start   # production build, exactly what deploys
npx eslint .                 # lint
```

---

## Where to edit content

Everything editable lives in `src/content/`. You should not need to touch markup.

| File              | Holds                                                        |
| ----------------- | ------------------------------------------------------------ |
| `site.ts`         | Brand, tagline, **contact details**, socials, nav, hero video |
| `work.ts`         | The portfolio — **the 24 Instagram reels live here**          |
| `services.ts`     | Packages, pricing, process steps, FAQs                       |
| `testimonials.ts` | Client quotes                                                 |
| `about.ts`        | Bio, stats, kit list, portraits                               |

Anything marked `TODO:` is a placeholder. **Pricing and testimonials are invented** — replace before launch. Prices are in naira; the budget bands on the booking form are in `src/components/inquiry-form.tsx`.

### Adding portfolio work

1. Drop files in `public/work/weddings/` (or `commercials/`, `travel/`).
2. Append to the `work` array in `src/content/work.ts`:

```ts
{
  slug: "amaka-and-joe",
  title: "Amaka & Joe",
  client: "Private commission",
  category: "weddings",
  year: 2026,
  location: "Abuja, NG",
  poster: "/work/weddings/amaka-and-joe.jpg",
  video: "/work/weddings/amaka-and-joe.mp4",  // optional
  span: "tall",        // "std" | "tall" | "wide"
  featured: true,      // also show on the homepage
}
```

Filters, counts, the lightbox and the homepage strip all update automatically. Items with no `poster` render a designed placeholder, so the grid never looks broken mid-upload.

**Compress before committing:**

```bash
ffmpeg -i in.mov -vcodec libx264 -crf 26 -preset slow -vf scale=-2:1080 -an out.mp4
```

Posters: JPG/WebP, ~2000px long edge, under 400 KB.

### Hero reel

Put a ~10s silent clip at `public/hero.mp4` and a still at `public/hero.jpg`, then set both in `heroMedia` in `src/content/site.ts`. It plays muted, pauses off-screen and when the tab is hidden, and is skipped entirely on save-data connections or under reduced-motion.

---

## Booking inquiries

**The form is currently OFF.** The full inquiry form renders as normal, but pressing **Send inquiry** swaps it for a "coming soon" panel listing WhatsApp, email, phone and Instagram DM, rather than submitting. Nothing is posted, so nothing can error while Resend is still being set up. A "Back to the form" link returns to it.

### Switching the form on

1. Sign up at [resend.com](https://resend.com) — free tier 3,000 emails/month.
2. Add your domain and set the DNS records it gives you.
3. `cp .env.example .env.local` and fill in:

```
RESEND_API_KEY=re_xxxxxxxx
INQUIRY_TO=hello@ibkhorbs.com
INQUIRY_FROM="IBK Horbs <hello@ibkhorbs.com>"
```

4. In `src/content/site.ts`, set `bookingFormEnabled: true` — the same form then submits for real.
5. On Vercel, add the same three variables under **Settings → Environment Variables**, then redeploy.

`INQUIRY_FROM` must be on a domain verified in Resend. Before verifying, `onboarding@resend.dev` works for testing but only delivers to your own signup address.

Do steps 1–3 before step 4 — turning the form on without keys means submissions are written to the server console and effectively lost.

Never commit `.env.local`; it's already gitignored.

### What the form does once live

Validates server-side, blocks spam with a honeypot and per-field length caps, emails you the inquiry, and sends the client a branded confirmation. A delivery failure returns a clear error telling the visitor to email directly — nothing is silently swallowed.

There is also a `WEB3FORMS_ACCESS_KEY` path in `src/app/api/inquire/route.ts` as a no-DNS fallback. It is unused while Resend is configured, and untested against Cloudflare's bot challenge from a datacentre IP — treat Resend as the supported route.

## Instagram reels

There is no separate feed page. All 24 reels from `@ibk.horbs` live in the portfolio itself — `src/content/work.ts` — and **play in place in the grid**, using Instagram's own iframe embed. No widget service, no account, no cost, no embed.js.

The grid renders 9 at a time behind a "Load more" button, and everything past the first three is `loading="lazy"`. That matters: each embed pulls in Instagram's own bundle, and this site is mostly opened on phones off an Instagram bio link. The homepage shows just three for the same reason.

### ⚠️ Categories and titles need correcting

Every reel is currently `Reel 01`–`Reel 24` and the categories are guesses, spread across all three pillars so no filter is empty. Two fields to fix per item:

```ts
{
  slug: "reel-03",
  title: "Reel 03",          // ->  "Tolu & David"
  category: "weddings",      // ->  "weddings" | "commercials" | "travel"
  year: 2026,
  location: "Abuja, NG",
  instagram: "https://www.instagram.com/reel/Dc9Kw-0uv8S/",
  span: "tall",
  featured: true,            // also shows on the homepage
}
```

Titles are neutral on purpose — these are real clients' weddings, and putting invented names on them would be worse than an obvious placeholder.

### Adding a new reel

Append an item with the reel URL. Paste straight from Instagram's share sheet — `?stkn=` share tokens are stripped automatically, and `/p/`, `/reel/`, `/reels/`, `/tv/` and profile-prefixed URLs all work. Shortened links (`instagr.am/…`) do not; open one and copy the full URL it lands on.

The account must stay **public** — private accounts cannot be embedded by anyone, by any method.

### Swapping an embed for your own file

Embeds carry Instagram's own chrome (the white card, the likes row). To replace one with your own media, add a `poster` — and optionally a `video` — to that item. It then renders as a designed dark tile that opens in the lightbox instead of an Instagram card:

```ts
poster: "/work/weddings/reel-03.jpg",
video:  "/work/weddings/reel-03.mp4",   // optional
```

Posters: JPG/WebP, ~2000px long edge, under 400 KB. Compress video with:

```bash
ffmpeg -i in.mov -vcodec libx264 -crf 26 -preset slow -vf scale=-2:1080 -an out.mp4
```

The two styles can coexist — the grid picks per item.

## Deploy — Vercel

Vercel is the right host here: the site is Next.js, and `/api/inquire` is a real server route, so a static-only host won't work without changes.

```bash
npm i -g vercel
vercel
```

Or via the dashboard: push to GitHub → [vercel.com/new](https://vercel.com/new) → import the repo. Framework auto-detects; no build settings to change.

Then:

1. **Settings → Environment Variables** — add `RESEND_API_KEY`, `INQUIRY_TO` and `INQUIRY_FROM` for Production (and Preview if you want the form live there).
2. **Settings → Domains** — add your domain and point the DNS at Vercel.
3. Set `url` in `src/content/site.ts` to the live domain — canonical URLs, OG tags and `sitemap.xml` are generated from it.

Every push to `main` deploys; branches get preview URLs.

**Cost:** Vercel Hobby is free and fine for this. Resend free tier covers 3,000 emails/month. A domain is about ₦18,000–25,000/year.

Netlify also works (it supports the Next.js runtime), but Vercel needs zero configuration.

---

## Structure

```
src/
  app/
    layout.tsx           Fonts, metadata, header/footer, JSON-LD
    page.tsx             Home
    work/ services/ about/ social/ testimonials/ book/ contact/
    api/inquire/route.ts Booking endpoint (Resend)
    sitemap.ts robots.ts not-found.tsx
  components/            Header, footer, work grid + lightbox, forms, media
  content/               ← everything editable
  lib/client-hooks.ts    URL / scroll / motion hooks
```

### Performance notes

- Every page is statically prerendered; only `/api/inquire` runs on demand.
- The portfolio grid renders **stills only** — video is loaded exclusively inside the lightbox, one element at a time.
- `next/image` handles lazy-loading, sizing and modern formats for anything with a `poster`.
- Reveal animations use one self-disconnecting IntersectionObserver per element and are disabled under `prefers-reduced-motion`.

### SEO

Per-page titles and descriptions, canonical URLs, OpenGraph/Twitter tags, `ProfessionalService` JSON-LD, generated `sitemap.xml` and `robots.txt`.

Not yet added: a social share image. Drop one at `src/app/opengraph-image.png` (1200×630) and Next will wire it up automatically.
