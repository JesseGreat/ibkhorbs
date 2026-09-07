"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useAutoplayAllowed } from "@/lib/client-hooks";

/**
 * Background reel. Muted, looping, playsInline — and deliberately
 * conservative about bandwidth:
 *  - never loads on a save-data connection or under reduced-motion
 *  - `preload="none"` until we've decided to play
 *  - pauses whenever the tab is hidden or the hero scrolls away
 * Falls back to the poster still, then to a pure gradient.
 */
export function HeroReel({ video, poster }: { video?: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const autoplayOk = useAutoplayAllowed();
  const allowed = Boolean(video) && autoplayOk;

  useEffect(() => {
    const el = ref.current;
    if (!el || !allowed) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.hidden) el.pause();
      else void el.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [allowed]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Base gradient — always painted, so there is never a flash of nothing. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 70% at 70% 10%, #2a1206 0%, transparent 60%), radial-gradient(60% 60% at 10% 90%, #14161c 0%, transparent 65%), #08080a",
        }}
      />

      {poster && !allowed ? (
        /* Faded still. Weighted to the right so the portrait sits beside the
           headline rather than behind it, and dimmed so type stays readable. */
        <Image
          src={poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center] opacity-45 md:object-[72%_center] md:opacity-55"
        />
      ) : null}

      {video && allowed ? (
        <video
          ref={ref}
          src={video}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      {/* Legibility scrim + vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/70" />
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 22rem 4rem rgba(8,8,10,0.9)" }}
      />
    </div>
  );
}
