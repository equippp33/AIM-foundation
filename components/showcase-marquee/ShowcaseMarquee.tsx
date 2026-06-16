"use client";

import { useEffect, useRef } from "react";
import type { ShowcaseItem } from "./types";
import { ShowcaseCard } from "./ShowcaseCard";

type Props = {
  items: ShowcaseItem[];
  /** Scroll speed in px/second. */
  speed?: number;
  pauseOnHover?: boolean;
  /** Colour of the left/right fade masks — match the section background. */
  edgeColor?: string;
};

/**
 * Seamless left-scrolling marquee. Items are duplicated once; the track
 * translateX runs from 0 → -half (half = one full set width) and wraps, so the
 * loop is invisible. GPU-friendly (transform only); respects reduced-motion.
 */
export function ShowcaseMarquee({
  items,
  speed = 40,
  pauseOnHover = true,
  edgeColor = "#0a0f1a",
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      const half = track.scrollWidth / 2;
      if (half > 0 && !pausedRef.current) {
        offsetRef.current = (offsetRef.current + speed * delta) % half;
        track.style.transform = `translateX(-${offsetRef.current}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  const loop = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28"
        style={{ background: `linear-gradient(to right, ${edgeColor}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28"
        style={{ background: `linear-gradient(to left, ${edgeColor}, transparent)` }}
      />
      <div
        ref={trackRef}
        className="flex w-max gap-5 will-change-transform"
        onMouseEnter={() => {
          if (pauseOnHover) pausedRef.current = true;
        }}
        onMouseLeave={() => {
          if (pauseOnHover) pausedRef.current = false;
        }}
      >
        {loop.map((item, i) => (
          <ShowcaseCard key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
