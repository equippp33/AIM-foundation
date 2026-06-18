"use client";

import { featuredPrograms } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

function selectProgram(program: string) {
  window.location.href = `/express?program=${program}`;
}

/**
 * Compact program cards sitting directly on the hero background, beneath the
 * CTAs — no outer panel, so both cards stay above the fold alongside the
 * headline. Each card is itself the click target (scrolls to Express + pre-
 * selects the program), keeping the footprint to icon + name, one line of
 * description, and the funding/impact metrics only.
 */
export function FeaturedPrograms() {
  return (
    <div className="flex flex-col items-stretch gap-5 sm:flex-row sm:gap-7">
      {featuredPrograms.items.map((item) => (
        <a
          key={item.program}
          href={`/express?program=${item.program}`}
          onClick={(e) => {
            e.preventDefault();
            selectProgram(item.program);
          }}
          className="group relative block w-full flex-1 overflow-hidden rounded-[20px] border border-white/60 bg-white/70 p-5 text-left shadow-[0_14px_34px_-16px_rgba(14,165,233,0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_20px_44px_-16px_rgba(14,165,233,0.55)]"
        >


          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
              <Icon name={item.icon} size={16} />
            </span>
            <h3 className="font-display text-[16px] font-bold text-ink">{item.title}</h3>
          </div>

          <p className="mt-2.5 line-clamp-2 text-[12.5px] leading-snug text-slatey-500">
            {item.desc}
          </p>

          <div className="mt-3 flex items-end justify-between border-t border-line pt-3">
            <p className="text-[14.5px] font-extrabold text-ink">
              {item.amount}{" "}
              <span className="text-[10px] font-semibold uppercase tracking-wide text-slatey-400">
                Goal
              </span>
            </p>
            <p className="text-[12px] font-semibold text-brand-600">{item.impact}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
