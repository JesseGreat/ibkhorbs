# Prompt for Claude Code — IBK Horbs Website

Copy everything below into Claude Code, filling in the bracketed placeholders first.

---

Build me a full portfolio-and-booking website for a mobile/camera content creator brand. This is a business site, not a one-pager — treat it like a proper multi-page site with a real information architecture, strong visual identity, and a working inquiry/booking flow. Make it feel premium and cinematic, since the whole brand is about capturing motion and emotion.

## Brand
- Name: IBK Horbs
- Tagline/positioning: "Capturing love, laughter, and life in motion"
- What they do: mobile and camera content creation — weddings, commercials/brand content, and travel content. Available to travel for bookings.
- Tone: warm, cinematic, energetic but polished — not corporate, not overly casual.

## Site structure ("massive" — this should feel like a full site, not a landing page)
1. **Home** — cinematic hero (video background or auto-playing muted reel), tagline, quick nav into the three service pillars (Weddings / Commercials / Travel), a taste of the best portfolio work, and a clear call to action to book/inquire.
2. **Portfolio / Work** — the core of the site. Filterable by category (Weddings, Commercials, Travel — plus "All"). Grid or masonry layout of video/photo work, each opening into a larger view. This needs to hold a lot of content and stay fast.
3. **Services** — what's offered for each pillar (weddings, commercials, travel content), roughly how it works, and packages/pricing if I provide them (see below).
4. **About** — who IBK Horbs is, story/approach, maybe behind-the-scenes photos or a personal video intro.
5. **Social / Feed** — embedded Instagram and TikTok content so visitors can see the full body of work without leaving the site (see "Social embeds" below for the real constraints here).
6. **Booking / Inquire** — the page that actually converts visitors into booked clients (see "Booking system" below).
7. **Testimonials** — client quotes/reviews, ideally with the couple/brand name and what the project was.
8. **Contact** — direct contact info, socials, location/travel radius, response-time expectation.

Use a persistent nav (header on desktop, hamburger/menu on mobile) so all pages are reachable from anywhere.

## Social embeds — real constraints to design around
Neither Instagram nor TikTok lets a static site pull in a live, auto-updating grid of all content for free:
- **Instagram**: the official embed (oEmbed) only embeds one post at a time nicely. For a scrolling feed of everything, use a third-party widget (SnapWidget, Elfsight, Curator.io, or similar — most have a usable free tier) or Meta's Graph API if I set up a proper developer app.
- **TikTok**: same idea — official embed works per-video; a full feed needs their embed SDK or a widget service.
- Build the Social/Feed page so it's easy to drop in whichever option I choose — e.g. a clearly marked embed container/component I can swap the code into, rather than hardcoding a specific service. Recommend the option you think is most practical for a solo creator (not an enterprise dev budget), and note in your reply what I'll need to sign up for.
- Instagram handle: [@HANDLE]
- TikTok handle: [@HANDLE]

## Booking system — pick an approach and tell me why
A real static site can't run a full booking backend on its own. Propose (and build) one of these, whichever you think fits best given the rest of the stack, and explain the trade-off in your reply:
- **Option A — embedded scheduler**: embed a tool like Calendly or Cal.com on the Booking page so visitors pick a date/time directly; simplest to set up, least custom-branded.
- **Option B — custom inquiry form + lightweight backend**: a styled form (event type, date, location, budget range, message) that saves to a simple backend (e.g. Supabase or Firebase) and/or emails IBK Horbs directly (e.g. via Formspree or a similar form service), with a simple admin view or notification so bookings don't get missed.
- Either way: confirmation message/email to the client, and a clear note in your reply about any accounts I'll need to create and any ongoing cost.

## Content I'll provide
- Photos/videos for the portfolio and hero sections: [I'LL SUPPLY A FOLDER — structure them by category if you can: /weddings /commercials /travel]
- Service packages/pricing (optional): [PASTE PACKAGES OR SAY "NOT YET — USE PLACEHOLDER PACKAGES I CAN EDIT LATER"]
- Testimonials: [PASTE QUOTES + NAMES, OR SAY "USE PLACEHOLDERS FOR NOW"]
- Contact info: [EMAIL, PHONE, LOCATION/BASE CITY, TRAVEL RADIUS OR "AVAILABLE WORLDWIDE"]
- Logo/monogram: [DO YOU HAVE ONE, OR SHOULD CLAUDE CODE DESIGN A SIMPLE TEXT-BASED WORDMARK FOR NOW]

## Design direction
- Style/vibe: [e.g. bold and cinematic, minimalist editorial, warm and documentary-feel — or say "surprise me based on the brand description"]
- Colors: [OPTIONAL — leave blank to let Claude Code choose something distinctive]
- Fonts: [OPTIONAL]

## Requirements
1. Mobile-first — most traffic to a content creator's site comes from Instagram/TikTok bio links on phones.
2. Fast-loading despite heavy media: lazy-load images/videos, compress everything, don't autoplay every video at once on the portfolio grid.
3. Distinctive, intentional visual design — not a generic AI-templated look (avoid: cream background + terracotta accent, all-caps eyebrow labels, identical rounded cards with soft shadows, tracked-out labels with em dashes). This is a creative brand — it should look like it, not like a SaaS template.
4. Portfolio and Social/Feed pages need to scale — I'll be adding content over time, so structure the code so new work can be added without rebuilding the layout each time.
5. SEO basics: proper page titles/meta descriptions per page, since this needs to be found by couples and brands searching for a videographer/content creator.
6. Keep all editable content (bio text, packages, contact info, testimonials) in one obvious place (a config/data file) so it can be updated without digging through markup.
7. Give me simple deploy instructions for whichever host you'd recommend for a multi-page site with a bit of backend logic (e.g. Netlify, Vercel).

Build it, then show me how to preview it locally before I deploy. If anything above needs a decision only I can make (which booking option, which social widget service), ask me directly rather than guessing.