"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { useScrolledPast } from "@/lib/client-hooks";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolledPast(24);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled && !open
          ? "border-b border-ink-line bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name} home`} className="relative z-10 shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`link-draw text-[0.9rem] transition-colors ${
                  active ? "text-bone" : "text-bone-dim hover:text-bone"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/book"
            className="group relative overflow-hidden border border-bone/25 px-5 py-2 text-[0.85rem] text-bone transition-colors hover:border-ember"
          >
            <span className="absolute inset-0 -translate-y-full bg-ember transition-transform duration-300 group-hover:translate-y-0" />
            <span className="relative">Start a booking</span>
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative z-10 flex items-center gap-2.5 lg:hidden"
        >
          <span className="text-[0.85rem] text-bone">{open ? "Close" : "Menu"}</span>
          <span className="flex h-4 w-5 flex-col justify-center gap-[5px]">
            <span
              className={`block h-px w-full bg-bone transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-full bg-bone transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile / tablet panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 top-0 z-0 flex flex-col justify-between bg-ink pt-[4.5rem] lg:hidden"
      >
        <nav aria-label="Mobile" className="shell flex flex-col pt-6">
          {site.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display d3 border-b border-ink-line py-4 text-bone"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="marker mr-4 align-middle">0{i + 1}</span>
              {item.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="display d3 mt-6 bg-ember px-5 py-5 text-center text-ink"
          >
            Start a booking
          </Link>
        </nav>

        <div className="shell flex flex-wrap gap-x-5 gap-y-2 py-8 text-[0.85rem] text-bone-dim">
          {site.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="link-draw">
              {s.label}
            </a>
          ))}
          <a href={`mailto:${site.contact.email}`} className="link-draw">
            {site.contact.email}
          </a>
        </div>
      </div>
    </header>
  );
}
