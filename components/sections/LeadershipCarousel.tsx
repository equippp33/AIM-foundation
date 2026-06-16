"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const PHOTO_BASE = "/images/support/public/images/contributers/";

const photoMap: Record<string, string | null> = {
  "Dr Rakesh Kalapala": `${PHOTO_BASE}Dr Rakesh Kalapala.jpg`,
  "Dr D. Nageshwar Reddy": `${PHOTO_BASE}Dr D. Nageshwar Reddy.jpg`,
  "Dr Santanu Chattopadhyay": `${PHOTO_BASE}Dr. Santanu Chattopadhyay.jpg`,
};

const accentMap: Record<string, string> = {
  brand: "from-brand-500 to-brand-600",
  green: "from-emerald-500 to-emerald-600",
  blue: "from-sky-500 to-sky-600",
};

function initials(name: string): string {
  const parts = name.replace(/^Dr\.?\s+/, "").split(" ");
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export type Leader = { name: string; role: string; color: string };

const ROTATE_MS = 4000;

export function LeadershipCarousel({ leaders }: { leaders: Leader[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  // Auto-advance the highlighted leader, unless paused or reduced-motion.
  useEffect(() => {
    if (paused || reduceRef.current || leaders.length <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % leaders.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, leaders.length]);

  const go = useCallback((i: number) => setActive(i), []);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="space-y-3.5">
        {leaders.map((person, i) => {
          const isActive = i === active;
          const src = photoMap[person.name];
          const gradient = accentMap[person.color] ?? accentMap.brand;
          return (
            <button
              key={person.name}
              type="button"
              aria-pressed={isActive}
              aria-label={`Show ${person.name}`}
              onClick={() => go(i)}
              className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-500 ease-out ${
                isActive
                  ? "scale-[1.015] border-brand-300 bg-brand-50/70 shadow-[0_12px_34px_-12px_rgba(14,165,233,0.45)]"
                  : "border-line bg-white opacity-65 shadow-[0_2px_10px_rgba(16,34,63,0.04)] hover:opacity-100"
              }`}
            >
              {/* Avatar */}
              <div className="relative h-14 w-14 shrink-0 rounded-full ring-2 ring-white shadow-[0_3px_12px_rgba(0,0,0,0.12)]">
                {src ? (
                  <Image
                    src={src}
                    alt={person.name}
                    fill
                    sizes="56px"
                    className={`rounded-full object-cover object-top transition-all duration-500 ${
                      isActive ? "grayscale-0" : "grayscale"
                    }`}
                  />
                ) : (
                  <div
                    className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br ${gradient} transition-all duration-500 ${
                      isActive ? "grayscale-0" : "grayscale"
                    }`}
                  >
                    <span className="select-none font-display text-[15px] font-bold tracking-tight text-white">
                      {initials(person.name)}
                    </span>
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="min-w-0">
                <h3 className="font-display text-[16px] font-bold leading-snug text-ink">
                  {person.name}
                </h3>
                <p
                  className={`mt-0.5 text-[13px] leading-snug transition-colors duration-500 ${
                    isActive ? "font-medium text-brand-600" : "text-slatey-500"
                  }`}
                >
                  {person.role}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pagination dots */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {leaders.map((person, i) => (
          <button
            key={person.name}
            type="button"
            aria-label={`Show ${person.name}`}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-brand-500" : "w-2 bg-line hover:bg-brand-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
