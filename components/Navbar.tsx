"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-navbar backdrop-blur" : "bg-white/80 backdrop-blur"
      }`}
    >
      <nav className="container-x flex h-[68px] items-center justify-between" aria-label="Primary">
        <a href="#home" className="flex items-center gap-2" aria-label={`${site.name} home`}>
          <Logo />
        </a>

        <div className="hidden items-center gap-6 xl:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14.5px] font-medium text-ink-soft/80 transition-colors hover:text-brand-500"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={nav.secondaryCta.href}
            className="hidden text-[14.5px] font-medium text-ink-soft/80 transition-colors hover:text-brand-500 xl:inline-flex"
          >
            {nav.secondaryCta.label}
          </a>
          <a href={nav.cta.href} className="btn-primary hidden sm:inline-flex !px-6 !py-2.5 !text-sm">
            {nav.cta.label}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md text-ink xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-line bg-white transition-all duration-300 xl:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container-x flex flex-col gap-1 py-3">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-[15px] font-medium text-ink-soft transition-colors hover:bg-mist"
            >
              {l.label}
            </a>
          ))}
          <a
            href={nav.cta.href}
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 justify-center"
          >
            {nav.cta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
