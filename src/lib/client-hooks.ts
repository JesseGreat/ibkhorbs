"use client";

import { useSyncExternalStore } from "react";

/* Browser values read during render rather than synced into state with an
   effect — no cascading render on mount, and correct SSR snapshots. */

/* ---------------- URL query string ---------------- */

/** Fired by `setSearch` so subscribers see our own replaceState calls. */
const SEARCH_EVENT = "ibk:searchchange";

function subscribeSearch(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(SEARCH_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(SEARCH_EVENT, onChange);
  };
}

/**
 * The live `?a=b` string. Empty on the server, so the first client render
 * matches the prerendered HTML and then updates in place.
 */
export function useSearchString() {
  return useSyncExternalStore(
    subscribeSearch,
    () => window.location.search,
    () => "",
  );
}

/** Replace the query string without a navigation, and notify subscribers. */
export function setSearch(next: string) {
  const url = next ? `?${next}` : window.location.pathname;
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(SEARCH_EVENT));
}

/* ---------------- Scroll position ---------------- */

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolledPast(threshold: number) {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > threshold,
    () => false,
  );
}

/* ---------------- Motion / data budget ---------------- */

/**
 * Whether it's reasonable to autoplay background video: motion is not
 * reduced and the connection isn't in save-data mode. Re-evaluates if the
 * user changes their reduced-motion preference mid-session.
 */
export function useAutoplayAllowed() {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window.matchMedia !== "function") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => {
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      return !reduced && !conn?.saveData;
    },
    () => false,
  );
}
