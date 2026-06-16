"use client";

import type { ShowcaseItem } from "./types";

// Shown if an item's image fails to load (e.g. real /press/*.jpg not added yet).
const FALLBACK = "https://placehold.co/600x400/eaf4fb/0ea5e9?text=AIM+Foundation";

export function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <a
      href={item.href}
      className="card-size group flex h-[210px] w-[290px] shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover md:h-[220px] md:w-[330px]"
    >
      {/* Clipping / image */}
      <div className="relative flex-1 overflow-hidden bg-mist">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          onError={(e) => {
            const el = e.currentTarget;
            if (el.src !== FALLBACK) el.src = FALLBACK;
          }}
        />
      </div>
      {/* Caption */}
      <div className="border-t border-line px-4 py-3">
        <p className="line-clamp-2 text-[12.5px] font-medium leading-snug text-ink transition-colors group-hover:text-brand-700">
          {item.title}
        </p>
      </div>
    </a>
  );
}
