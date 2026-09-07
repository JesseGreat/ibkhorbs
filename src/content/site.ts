/* =====================================================================
   SITE CONFIG — edit this file to change brand, contact + social details.
   Anything marked TODO is a placeholder waiting on real content.
   ===================================================================== */

export const site = {
  name: "IBK Horbs",
  tagline: "Capturing love, laughter, and life in motion",
  /** Used for <title> suffix, OG tags, structured data. */
  description:
    "IBK Horbs is a mobile and camera content creator shooting weddings, brand commercials and travel films. Available to travel worldwide.",
  /** Change to your live domain before deploying — used for canonical URLs + sitemap. */
  url: "https://ibkhorbs.com",

  contact: {
    email: "hello@ibkhorbs.com", // TODO: real booking inbox
    phone: "0706 133 4931",
    /** International form, so the link works for clients dialling from abroad. */
    phoneHref: "tel:+2347061334931",
    baseCity: "Abuja, Nigeria",
    travel: "Available worldwide",
    responseTime: "Every inquiry gets a reply within 48 hours.",
    /** Booking urgency line. Nigeria's wedding season is the dry season —
        November to January, with December the busiest by a distance. */
    seasonNote: "Dry-season dates go first — December is usually gone a year ahead.",
    /** WhatsApp is how most Nigerian clients would rather reach you. */
    whatsapp: "https://wa.me/2347061334931",
  },

  /* -------------------------------------------------------------------
     BOOKING FORM SWITCH
     false -> /book shows a "coming soon" panel with direct contact only.
              Nothing can error, because nothing is submitted.
     true  -> the full inquiry form is live.

     Flip to true once RESEND_API_KEY, INQUIRY_TO and INQUIRY_FROM are set
     (in .env.local locally, and in Vercel > Settings > Environment
     Variables for production). See README, "Booking inquiries".
     ------------------------------------------------------------------- */
  bookingFormEnabled: false,

  socials: [
    { label: "Instagram", handle: "@ibk.horbs", url: "https://www.instagram.com/ibk.horbs" },
    { label: "TikTok", handle: "@ibk.horbs", url: "https://tiktok.com/@ibk.horbs" },
    { label: "YouTube", handle: "@ibk.horbs", url: "https://youtube.com/@ibk.horbs" }, // TODO: confirm
  ],

  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],

  /* The three service pillars. Slugs drive /services anchors and portfolio filters. */
  pillars: [
    {
      slug: "weddings",
      index: "01",
      title: "Weddings",
      blurb:
        "The whole day, felt rather than filed. Vows, the walk out, the dancefloor at 1am — cut to something you will actually rewatch.",
    },
    {
      slug: "commercials",
      index: "02",
      title: "Commercials",
      blurb:
        "Brand films and social-first content that move at the speed of the feed without looking like everyone else's feed.",
    },
    {
      slug: "travel",
      index: "03",
      title: "Travel",
      blurb:
        "Places, motion, light. Destination weddings, tourism boards, hotels and the long-haul stories in between.",
    },
  ],
} as const;

export type PillarSlug = (typeof site.pillars)[number]["slug"];

/* ---------------------------------------------------------------------
   HERO MEDIA
   Drop a short, compressed reel at /public/hero.mp4 (aim for < 6 MB,
   ~10 seconds, no audio track — it plays muted) and a still at
   /public/hero.jpg as the poster/fallback. Set both below.
   Leave as undefined and the hero renders a typographic treatment.
   --------------------------------------------------------------------- */
export const heroMedia: { video?: string; poster?: string } = {
  video: undefined,
  /** Faded behind the hero type. Swap for a reel still once there's one you like. */
  poster: "/about/ibk.jpg",
};
