import type { PillarSlug } from "./site";

/* =====================================================================
   SERVICES + PACKAGES
   PLACEHOLDER PRICING — replace `price` and `includes` with your real
   numbers. Set `price: "On request"` for anything you'd rather quote.
   ===================================================================== */

export type Package = {
  name: string;
  price: string;
  summary: string;
  includes: string[];
  /** Renders the highlighted treatment. Keep to one per pillar. */
  highlight?: boolean;
};

export type Service = {
  slug: PillarSlug;
  index: string;
  title: string;
  intro: string;
  /** How the engagement actually runs, step by step. */
  process: { step: string; detail: string }[];
  packages: Package[];
};

export const services: Service[] = [
  {
    slug: "weddings",
    index: "01",
    title: "Weddings",
    intro:
      "One shooter, or a small team when the day needs it. I work quietly and close. No directing you into poses you'd never hold, no missing the moment because a light stand needed moving.",
    process: [
      { step: "Say hello", detail: "Tell me the date, the place, and what the day looks like in your head." },
      { step: "Call", detail: "Twenty minutes on video to work out whether we fit. No pressure either way." },
      { step: "Hold the date", detail: "A 30% retainer and a simple contract lock it in." },
      { step: "Plan", detail: "A timeline walkthrough four weeks out so nothing gets rushed." },
      { step: "The day", detail: "I arrive early, stay late, and stay out of the way." },
      { step: "Delivery", detail: "A teaser inside 7 days, the full film and gallery within 8 weeks." },
    ],
    packages: [
      {
        name: "The Reel",
        price: "from ₦350,000",
        summary: "Social-first coverage for an intimate day or a registry ceremony.",
        includes: [
          "Up to 6 hours coverage",
          "One 60–90s vertical film",
          "15 short-form clips, ready to post",
          "Teaser within 72 hours",
        ],
      },
      {
        name: "The Full Day",
        price: "from ₦850,000",
        summary: "The one most couples book. Prep through to first dance.",
        includes: [
          "Up to 12 hours coverage",
          "5–7 minute highlight film",
          "Full ceremony + speeches, edited",
          "40 short-form clips",
          "Licensed music, colour graded",
          "Delivered within 8 weeks",
        ],
        highlight: true,
      },
      {
        name: "The Whole Story",
        price: "from ₦1,800,000",
        summary: "Multi-day and traditional ceremonies, home and abroad.",
        includes: [
          "Two days coverage, second shooter",
          "10–15 minute feature film",
          "Separate film per ceremony",
          "80 short-form clips",
          "Documentary stills gallery",
          "Travel within Nigeria included",
        ],
      },
    ],
  },
  {
    slug: "commercials",
    index: "02",
    title: "Commercials",
    intro:
      "Brand films, product launches, founder stories and the endless hunger of paid social. Built to perform in the feed first and look good on a homepage second.",
    process: [
      { step: "Brief", detail: "What you're selling, who to, and what 'working' looks like in numbers." },
      { step: "Treatment", detail: "A short deck: look, structure, shot list, deliverables." },
      { step: "Shoot", detail: "Half or full day, with or without talent. I can help cast." },
      { step: "Cut", detail: "Two rounds of revisions built into every package." },
      { step: "Deliver", detail: "Master file plus every aspect ratio your channels need." },
    ],
    packages: [
      {
        name: "Content Day",
        price: "from ₦250,000",
        summary: "One day, one location, a month of content.",
        includes: [
          "6 hours on location",
          "20 short-form verticals",
          "30 edited stills",
          "72-hour turnaround",
        ],
      },
      {
        name: "Brand Film",
        price: "from ₦750,000",
        summary: "A hero film with the cutdowns that make it earn its keep.",
        includes: [
          "Pre-production + treatment",
          "Full day shoot",
          "60–90s hero film",
          "6 cutdowns (9:16, 1:1, 16:9)",
          "Licensed music + sound design",
          "Two revision rounds",
        ],
        highlight: true,
      },
      {
        name: "Retainer",
        price: "from ₦600,000/mo",
        summary: "Ongoing content so the feed never goes quiet.",
        includes: [
          "Two shoot days per month",
          "40 deliverables per month",
          "Monthly planning call",
          "Priority turnaround",
          "Rolling 3-month minimum",
        ],
      },
    ],
  },
  {
    slug: "travel",
    index: "03",
    title: "Travel",
    intro:
      "Destination weddings, tourism boards, hotels and resorts. I travel light and move fast: one bag, no crew calls, footage that looks like the place rather than the brochure.",
    process: [
      { step: "Scope", detail: "Dates, destination, what you need to come home with." },
      { step: "Logistics", detail: "I handle my own kit, insurance, visas and carnets." },
      { step: "On the ground", detail: "Shooting days built around light, not itineraries." },
      { step: "Deliver", detail: "Films and stills, plus raw selects if you want an archive." },
    ],
    packages: [
      {
        name: "Destination Add-on",
        price: "+ ₦200,000",
        summary: "Add to any wedding or commercial package for work abroad.",
        includes: [
          "Flights + accommodation at cost",
          "Extra scouting day on location",
          "Location b-roll package",
        ],
      },
      {
        name: "Destination Wedding",
        price: "from ₦1,500,000",
        summary: "The full day, wherever it is.",
        includes: [
          "Three days on location",
          "Welcome event + ceremony + party",
          "8–12 minute feature film",
          "60 short-form clips",
          "Travel and stay included within West Africa",
        ],
        highlight: true,
      },
      {
        name: "Tourism & Hospitality",
        price: "On request",
        summary: "Property, resort and destination campaigns.",
        includes: [
          "Multi-day shoots",
          "Property, food, experience and lifestyle coverage",
          "Full stills + motion library",
          "Usage licensing negotiated per campaign",
        ],
      },
    ],
  },
];

export const faqs = [
  {
    q: "How far will you travel?",
    a: "Anywhere. Travel within Nigeria is included in most packages; further afield is flights and accommodation at cost, plus a destination fee.",
  },
  {
    q: "How quickly do we get everything back?",
    a: "A teaser within 7 days, the full delivery inside 8 weeks. Commercial turnarounds are faster and agreed up front.",
  },
  {
    q: "Do you shoot on a phone or a camera?",
    a: "Both, deliberately. Cameras for the wide, cinematic coverage; phone for the moments where a big rig would kill the room. It cuts together seamlessly.",
  },
  {
    q: "Can we choose the music?",
    a: "Yes. Every track is properly licensed, so your film won't get muted on Instagram.",
  },
  {
    q: "What do you need to hold a date?",
    a: "A 30% retainer and a signed contract. The balance is due two weeks before the shoot.",
  },
  {
    q: "Do you do photo as well as video?",
    a: "Documentary stills come with the larger packages and can be added to any other.",
  },
];
