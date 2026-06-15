"use client";

import { motion, useReducedMotion } from "framer-motion";

// ECG waveform anchored to the headline container.
// Two beat heights: tall (r=108) peaks land in "Engineering the future of
// healthcare." and regular (r=62) peaks land in the "of healthcare." / "At
// Scale." zone. ECG_BASE=160 = vertical center of the SVG, which maps to the
// vertical center of the headline container — i.e. the "At Scale." line —
// because the container itself is flex-centered in the hero (items-center).
function buildPath(width: number, base: number): string {
  const beats = [
    { x: 260, r: 108 },
    { x: 640, r: 62 },
    { x: 1000, r: 108 },
    { x: 1360, r: 62 },
  ];
  let d = `M0 ${base}`;
  for (const { x, r } of beats) {
    d += ` L${x - 90} ${base}`;
    d += ` L${x - 60} ${base - 12}`;
    d += ` L${x - 40} ${base}`;
    d += ` L${x - 14} ${base + 16}`;
    d += ` L${x} ${base - r}`;
    d += ` L${x + 14} ${base + 30}`;
    d += ` L${x + 26} ${base}`;
    d += ` L${x + 56} ${base - 20}`;
    d += ` L${x + 88} ${base}`;
  }
  d += ` L${width} ${base}`;
  return d;
}

const W = 1600;
const H = 320;
const BASE = 160;
const PATH = buildPath(W, BASE);

function Strip({ id }: { id: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="h-full w-1/2 shrink-0"
    >
      <defs>
        <linearGradient id={`hecg-g-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1DA1F2" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#4FC3FF" />
        </linearGradient>
        <filter id={`hecg-f-${id}`} x="-5%" y="-120%" width="110%" height="340%">
          <feGaussianBlur stdDeviation="7.5" />
        </filter>
      </defs>
      {/* glow bloom */}
      <path
        d={PATH}
        fill="none"
        stroke={`url(#hecg-g-${id})`}
        strokeWidth={14}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.55}
        filter={`url(#hecg-f-${id})`}
      />
      {/* crisp line */}
      <path
        d={PATH}
        fill="none"
        stroke={`url(#hecg-g-${id})`}
        strokeWidth={4.8}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeadlineEcg() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    // Spans 130vw centred on the headline container so the waveform extends
    // naturally beyond the text block on both sides, then fades via mask.
    // inset-y-0 makes height = container height; since ECG_BASE = 160/320 = 50%
    // of the SVG, the flat baseline always sits at 50% of the container = "At
    // Scale." — and the tall spikes (r=108) reach ~34% of container height
    // above that, landing inside "Engineering the future of healthcare."
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 overflow-hidden opacity-[0.28]"
      style={{
        width: "130vw",
        zIndex: -1,
        maskImage:
          "linear-gradient(to right, transparent 0%, black 16%, black 84%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 16%, black 84%, transparent 100%)",
      }}
    >
      <motion.div
        className="flex h-full w-[200%]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 26, ease: "linear", repeat: Infinity }}
      >
        <Strip id="a" />
        <Strip id="b" />
      </motion.div>
    </div>
  );
}
