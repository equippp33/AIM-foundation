"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Premium animated hero background for AIM Foundation.
 *
 * A living "healthcare network" that sits quietly behind the hero text:
 *  - a glowing ECG / heartbeat pulse line that flows seamlessly left→right
 *  - faint AI data particles, connection nodes and network lines
 *  - subtle mouse parallax
 *
 * Everything is GPU-friendly (transform/opacity only), kept between 5–15%
 * opacity so the headline stays perfectly readable, and fully disabled when
 * the user prefers reduced motion.
 */

// ── Ambient data particles (deterministic → no hydration mismatch) ───────────
const PARTICLES = [
  { left: "7%", top: "28%", size: 5, dur: 9, delay: 0, drift: 20 },
  { left: "16%", top: "62%", size: 3, dur: 11, delay: 1.5, drift: 16 },
  { left: "24%", top: "40%", size: 4, dur: 8, delay: 0.8, drift: 22 },
  { left: "34%", top: "70%", size: 3, dur: 12, delay: 2.2, drift: 14 },
  { left: "44%", top: "24%", size: 5, dur: 10, delay: 0.4, drift: 24 },
  { left: "52%", top: "58%", size: 3, dur: 13, delay: 1.1, drift: 18 },
  { left: "61%", top: "36%", size: 4, dur: 9.5, delay: 2.6, drift: 20 },
  { left: "70%", top: "66%", size: 3, dur: 11.5, delay: 0.6, drift: 16 },
  { left: "78%", top: "30%", size: 5, dur: 8.5, delay: 1.8, drift: 22 },
  { left: "86%", top: "54%", size: 3, dur: 12.5, delay: 0.2, drift: 14 },
  { left: "92%", top: "38%", size: 4, dur: 10.5, delay: 2.0, drift: 20 },
];

// ── Connection nodes + network lines ─────────────────────────────────────────
const NODES = [
  { x: 120, y: 140, r: 4, dur: 6, delay: 0 },
  { x: 300, y: 360, r: 5, dur: 7, delay: 1 },
  { x: 520, y: 200, r: 4, dur: 6.5, delay: 0.5 },
  { x: 720, y: 420, r: 6, dur: 8, delay: 1.5 },
  { x: 880, y: 240, r: 4, dur: 7.5, delay: 0.8 },
  { x: 980, y: 460, r: 5, dur: 6.8, delay: 2 },
];
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
];

export function HeroBackground() {
  const reduce = useReducedMotion();

  // Mouse parallax: -1..1 on each axis, smoothed with a spring.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 22, mass: 0.6 });

  const nodesX = useTransform(sx, [-1, 1], [26, -26]);
  const nodesY = useTransform(sy, [-1, 1], [18, -18]);
  const particlesX = useTransform(sx, [-1, 1], [-18, 18]);
  const particlesY = useTransform(sy, [-1, 1], [-12, 12]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Network nodes + connection lines */}
      <motion.svg
        className="absolute inset-0 h-full w-full opacity-[0.12] [will-change:transform]"
        viewBox="0 0 1100 600"
        preserveAspectRatio="xMidYMid slice"
        style={{ x: nodesX, y: nodesY }}
      >
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="#1DA1F2"
            strokeWidth={0.8}
          />
        ))}
        {NODES.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="#1DA1F2"
            animate={reduce ? undefined : { opacity: [0.4, 1, 0.4], scale: [1, 1.35, 1] }}
            transition={
              reduce
                ? undefined
                : { duration: n.dur, delay: n.delay, repeat: Infinity, ease: "easeInOut" }
            }
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
        ))}
      </motion.svg>

      {/* Ambient data particles */}
      <motion.div
        className="absolute inset-0 [will-change:transform]"
        style={{ x: particlesX, y: particlesY }}
      >
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: "radial-gradient(circle, #4FC3FF 0%, #1DA1F2 70%, transparent 100%)",
            }}
            animate={
              reduce ? { opacity: 0.1 } : { y: [0, -p.drift, 0], opacity: [0.05, 0.16, 0.05] }
            }
            transition={
              reduce
                ? undefined
                : { duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }
            }
          />
        ))}
      </motion.div>

    </div>
  );
}
