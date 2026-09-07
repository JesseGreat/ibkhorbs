/* =====================================================================
   TESTIMONIALS — PLACEHOLDERS. Swap for real client quotes.
   `weight: "lead"` pulls a quote out large on the testimonials page and
   makes it eligible for the homepage.
   ===================================================================== */

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  category: "weddings" | "commercials" | "travel";
  weight?: "lead";
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We have watched it more times than we can admit. He caught things we did not even know happened — my dad crying during the speeches, my sister fixing my dress in a doorway. It plays like a memory, not a video.",
    name: "Tolu & David",
    detail: "Three-day wedding, Lagos",
    category: "weddings",
    weight: "lead",
  },
  {
    quote:
      "Booked for a launch film, got a month of content out of one shoot day. Our paid social CPA dropped by a third on the new creative.",
    name: "Naomi Adeyemi",
    detail: "Head of Brand, Amara Skincare",
    category: "commercials",
    weight: "lead",
  },
  {
    quote:
      "He shot our entire ceremony without a single guest noticing there was a videographer in the room. That is the whole review, really.",
    name: "Chi & Emeka",
    detail: "Traditional ceremony, Abuja",
    category: "weddings",
  },
  {
    quote:
      "Turned up at Obudu in the thickest harmattan haze and still came back with the best footage the campaign has ever had.",
    name: "Ngozi Eze",
    detail: "Cross River Tourism",
    category: "travel",
  },
  {
    quote:
      "Fast, calm, and genuinely good to have on set. Two revision rounds and we only needed one.",
    name: "Tunde Bakare",
    detail: "Creative Director, Runwell",
    category: "commercials",
  },
  {
    quote:
      "The teaser landed three days after the wedding and completely broke our group chat.",
    name: "Sade & Tom",
    detail: "Garden wedding, Enugu",
    category: "weddings",
    weight: "lead",
  },
  {
    quote:
      "We flew him to Bolivia on a hunch. Came back with the strongest set of images in our library.",
    name: "Amaka Obi",
    detail: "Marketing Lead, Altiplano Travel",
    category: "travel",
  },
  {
    quote:
      "Understood the brand from the first call and did not need hand-holding through any of it.",
    name: "James Okonkwo",
    detail: "Founder, Kiosk Coffee",
    category: "commercials",
  },
];

export const leadTestimonials = testimonials.filter((t) => t.weight === "lead");
