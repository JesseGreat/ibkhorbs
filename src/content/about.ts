/* =====================================================================
   ABOUT — bio copy. PLACEHOLDER: rewrite in your own voice.
   ===================================================================== */

export const about = {
  headline: "I make things you'll still watch in ten years.",
  intro:
    "IBK Horbs is a mobile and camera content creator working across weddings, brand films and travel. The kit changes depending on the room: sometimes a full cinema rig, sometimes just a phone in one hand. What never changes is the instinct. Get close, stay quiet, and catch the thing that would otherwise have gone unrecorded.",
  body: [
    "It started with a borrowed camera at a friend's wedding and no idea what I was doing. The footage was rough. It also made three people cry, and that was the end of any other career plan.",
    "Since then: weddings across three continents, launch films for brands that had never shot video before, and a lot of hours on planes with a bag that's always slightly over the weight limit. The through-line is motion. I'd rather shoot a bad frame of something real than a perfect frame of something staged.",
    "I work alone on most jobs, which keeps the room small and the day light. For bigger productions I bring in a second shooter and a sound op I've worked with for years. Either way, you deal with me from the first email to the final delivery.",
  ],
  /** Drop a personal intro video in /public/about/ and reference it here. */
  introVideo: undefined as string | undefined,
  portrait: "/about/ibk.jpg" as string | undefined,
  /** Secondary portrait, shown alongside the story. */
  portraitAlt: "/about/ibk2.jpg" as string | undefined,

  /* Behind-the-scenes strip. Add paths to /public/about/ images. */
  behindTheScenes: [
    { caption: "Second shooter's view, Abuja", src: undefined as string | undefined },
    { caption: "4am load-in, Lagos", src: undefined as string | undefined },
    { caption: "The bag, mid-Obudu", src: undefined as string | undefined },
    { caption: "Colour grade, 2am", src: undefined as string | undefined },
  ],

  stats: [
    { figure: "180+", label: "weddings filmed" },
    { figure: "14", label: "countries shot in" },
    { figure: "8 yrs", label: "behind the camera" },
    { figure: "48 hrs", label: "average reply time" },
  ],

  kit: {
    note: "Asked constantly, so: ",
    items: [
      "Sony FX3 + FX30",
      "Sigma 24–70 / 35mm 1.4 / 85mm 1.4",
      "iPhone 17 Pro (log, genuinely)",
      "DJI RS4 + Mini 4 Pro",
      "DJI Mic 2, Rode Wireless Pro",
    ],
  },
};
