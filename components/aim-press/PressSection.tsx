"use client";

import { ShowcaseMarquee } from "@/components/showcase-marquee/ShowcaseMarquee";
import { pressItems } from "@/lib/press-items";

// Fade-mask colour — matches the section background (bg-mist).
const EDGE = "#f7f8fb";

export function PressSection() {
  return (
    <section className="overflow-hidden bg-mist py-16 md:py-24">
      <div className="container-x mb-12 text-center">
        <span className="eyebrow">In the Press</span>
        <h2 className="mt-3 font-display text-[34px] font-bold leading-tight text-ink sm:text-[42px]">
          Recognised. Reported. Verified.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-slatey-500">
          AIM Foundation&apos;s work, as covered by national media, government channels, and
          research institutions.
        </p>
      </div>

      {/* One continuous, seamless row across the full width */}
      <ShowcaseMarquee items={pressItems} speed={40} pauseOnHover edgeColor={EDGE} />
    </section>
  );
}
