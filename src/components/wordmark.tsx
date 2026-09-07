/**
 * Text-based wordmark, standing in until there's a real logo.
 * To swap in artwork later, replace the contents of this component —
 * every usage across the site picks it up.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline gap-[0.28em] font-sans text-[0.95rem] leading-none font-medium tracking-[0.14em] uppercase select-none ${className}`}
    >
      <span>IBK</span>
      <span aria-hidden className="text-ember">
        /
      </span>
      <span className="text-bone-dim">Horbs</span>
    </span>
  );
}
