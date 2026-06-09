# AIM Foundation — Website

Production-ready marketing site for **AIM Foundation (AI & MedTech Alliance Foundation)** — *Engineering the future of healthcare. At scale.*

Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. All content is driven from a single source of truth in `lib/content.ts`, so copy can be updated without touching markup.

## Tech stack

- Next.js 14 (App Router, static export-friendly)
- TypeScript (strict)
- Tailwind CSS 3
- Zero runtime UI dependencies — custom SVG icon set, hand-built components
- Fonts: Playfair Display (display) + Plus Jakarta Sans (body), loaded via `<link>` (no build-time network dependency)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & deploy

```bash
npm run build    # production build
npm run start    # serve the production build
```

The project deploys as-is to **Vercel**, **Netlify**, or any Node host. No environment variables are required.

## Project structure

```
aim-foundation/
├── app/
│   ├── layout.tsx        # Root layout, <head>, SEO metadata, fonts
│   ├── page.tsx          # Home page — composes all sections + JSON-LD
│   ├── globals.css       # Tailwind layers, design tokens, utilities
│   └── icon.svg          # Favicon (brand mark)
├── components/
│   ├── Navbar.tsx        # Sticky nav with mobile drawer
│   ├── RevealProvider.tsx# Scroll-reveal wrapper (client)
│   ├── sections/         # One file per page section
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Impact.tsx
│   │   ├── Janani.tsx       # Active Project 01
│   │   ├── MapAp.tsx        # Active Project 02
│   │   ├── Governance.tsx
│   │   ├── Partnership.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── ui/               # Reusable primitives
│       ├── Icon.tsx        # Typed inline SVG icon set
│       ├── Logo.tsx
│       ├── SectionHeading.tsx
│       └── StatCard.tsx
├── hooks/
│   └── useReveal.ts      # IntersectionObserver scroll-reveal
├── lib/
│   └── content.ts        # SINGLE SOURCE OF CONTENT (all copy lives here)
├── styles/               # (reserved for additional global styles)
├── public/               # Static assets
├── tailwind.config.ts    # Design tokens (colors, radius, shadows, fonts)
├── next.config.js
├── tsconfig.json
└── postcss.config.js
```

## Editing content

Every heading, paragraph, statistic, leadership profile, program detail, and
contact is defined in **`lib/content.ts`**. Update the data objects there and the
UI updates automatically — no JSX edits needed for copy changes.

## Sections

1. **Hero** — vision, mission, and the "healthcare as infrastructure" value card
2. **About** — who we are, leadership (Founder, Board Advisor, Science Lead), key milestones
3. **Impact** — who we build for (patients, frontline workers, science) + the execution gap
4. **Janani Mitra** — Active Project 01: AI-powered maternal health (key numbers, technology, validation)
5. **MAP-AP** — Active Project 02: rural gut-microbiome database (partner contributions, fund utilisation, collection model, deliverables)
6. **Governance & Compliance** — Schedule VII alignment, SDGs, auditing, donor access
7. **Partnership Opportunity** — structured funding tiers for CSR / HNI / family offices
8. **Get in Touch** — executive and proposals contacts
9. **Footer** — navigation, programs, contact, socials

## Accessibility & SEO

- Semantic landmarks (`header`, `main`, `section`, `footer`), labelled nav and icon buttons
- `prefers-reduced-motion` respected (reveal animations disabled)
- Open Graph + Twitter metadata and `NGO` JSON-LD structured data
- Responsive from 360px mobile up to large desktop

---

© 2026 AIM Foundation — AI & MedTech Alliance Foundation. Registered Section 8 Non-Profit.
