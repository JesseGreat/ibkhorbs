import Image from "next/image";

/**
 * One media surface for the whole site.
 *
 * - `poster` set  -> next/image, lazy by default, blurred-in.
 * - no `poster`   -> a deterministic designed placeholder derived from the
 *                    seed string, so an unfinished portfolio still looks
 *                    composed instead of broken.
 *
 * Requirement: never autoplay a wall of video. The grid only ever renders
 * stills; motion is opt-in inside the lightbox.
 */

const TONES = [
  ["#3d1a07", "#ff4d19"],
  ["#12262d", "#e3b778"],
  ["#2a1524", "#ff6b3d"],
  ["#1b1c24", "#9aa3b2"],
  ["#33200a", "#e3b778"],
  ["#0f2119", "#6fbf95"],
];

function toneFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return TONES[h % TONES.length];
}

export function MediaFrame({
  src,
  alt,
  seed,
  label,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 40vw",
  className = "",
}: {
  src?: string;
  alt: string;
  seed: string;
  /** Shown across the placeholder when there's no image yet. */
  label?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={`object-cover ${className}`}
      />
    );
  }

  const [base, accent] = toneFor(seed);

  return (
    <div
      aria-hidden
      className={`absolute inset-0 flex items-end overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(95% 75% at 72% 18%, ${accent}4d 0%, transparent 68%), radial-gradient(80% 60% at 10% 95%, ${accent}26 0%, transparent 60%), linear-gradient(155deg, ${base} 0%, #0d0d12 88%)`,
      }}
    >
      {/* film-perf ticks down the left edge */}
      <div
        className="absolute inset-y-0 left-0 w-3 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0 10px, rgba(243,239,233,0.55) 10px 18px)",
        }}
      />
      {label ? (
        <span
          className="display d3 pointer-events-none px-4 pb-4 pl-8 leading-none opacity-30"
          style={{ color: accent }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
