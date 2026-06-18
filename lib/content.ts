/**
 * lib/content.ts
 * Single source of truth for all site content.
 * Premium, storytelling-led copy for AIM Foundation — every fact (names, numbers,
 * partners, programs, compliance) is preserved; only the prose is elevated.
 */

import { PROJECTS } from "./projects";

export const site = {
  name: "AIM Foundation",
  fullName: "AI & MedTech Alliance Foundation",
  tagline: "Healthcare is infrastructure. We build it to scale.",
  description:
    "AIM Foundation is a Section 8 non-profit building scalable healthcare infrastructure across India. We unite clinical excellence, artificial intelligence, and government partnerships to close the gap between proven medical science and the communities it must reach — from AI-powered maternal health to population-scale medical research.",
  url: "https://aimfoundation.ai",
};

export const nav = {
  links: [
    { label: "How We Work", href: "#infrastructure" },
    { label: "About", href: "#about" },
    { label: "Programs", href: "#programs" },
    { label: "Impact", href: "#impact" },
    { label: "Governance", href: "#governance" },
    { label: "Contact", href: "/express" },
  ],
  secondaryCta: { label: "Explore our work", href: "#programs" },
  cta: { label: "Express Now", href: "/express" },
};

export const hero = {
  eyebrow: "AI & MedTech Alliance Foundation",
  badge: "Registered Section 8 Non-Profit",
  titleLine1: "Fund healthcare that",
  titleLine2: "reaches the last mile.",
  lead: "We turn CSR and Impact capital into deployed medical infrastructure across rural India — AI-powered maternal care and population-scale microbiome science, already validated in the field. Choose a program and fund it directly.",
  sub: "We work at the intersection of clinical credibility, AI-driven tools, and government reach — closing the execution gap that keeps good science from becoming real-world transformation.",
  primaryCta: { label: "Fund a Program", href: "/express" },
  secondaryCta: { label: "Explore Our Work", href: "#programs" },
  complianceNote: "100% CSR-Eligible · Section 8 Non-Profit",
};

export const featuredPrograms = {
  items: [
    {
      icon: "heart" as const,
      title: "Janani Mitra",
      program: "JANANI_MITRA",
      desc: "AI-powered maternal health across Andhra Pradesh.",
      amount: "₹1 Cr",
      impact: "100,000 Women",
    },
    {
      icon: "flask" as const,
      title: "MAP-AP",
      program: "MAP_AP",
      desc: "India's first rural microbiome database.",
      amount: "₹30 Lakhs",
      impact: "10,000 Samples",
    },
  ],
};

export const partners = {
  eyebrow: "Institutional Partners",
  title: "Credibility isn't claimed. It's built — with the right partners.",
  body: "AIM Foundation works with institutions that represent the highest standards in clinical care, scientific research, and academic excellence.",
};

export const infrastructure = {
  eyebrow: "How We Work",
  title: "Four forces. One system.",
  body: "Clinical credibility, AI built as infrastructure, government partnership, and systems engineered to outlast us — four forces working as one.",
  badges: ["Section 8 Non-Profit", "CSR Eligible", "SDG Aligned"],
  features: [
    {
      icon: "stethoscope",
      title: "Clinical Credibility",
      desc: "Every program is anchored by AIG Hospitals and guided by senior clinicians. Nothing we build is assumption-led — everything is validated in the real world first.",
      featured: true,
    },
    {
      icon: "cpu",
      title: "AI as Infrastructure",
      desc: "We don't use AI as a feature. We embed it as infrastructure — multilingual, real-time, and designed for the frontline worker in the field, not the clinician in the city.",
    },
    {
      icon: "building",
      title: "Government as Partner",
      desc: "We work inside existing public health systems, not around them. Signed MoUs, primary health centre access, ASHA worker integration — government reach, strengthened.",
    },
    {
      icon: "infinity",
      title: "Built to Outlast",
      desc: "We engineer for continuity. Our systems keep working long after we step back — independent of any single grant, cycle, or intervention.",
    },
  ],
};

export const about = {
  eyebrow: "Who We Are",
  title: "About AIM Foundation",
  paragraphs: [
    "AIM Foundation was built on a single conviction — that India's healthcare failures are not a shortage of science or compassion, but a shortage of the systems that carry proven care to the communities that need it.",
    "We are a registered Section 8 non-profit working at the intersection of clinical excellence, artificial intelligence, and public health infrastructure — partnering with leading hospitals, research institutions, and government bodies to build systems that endure.",
  ],
  mission: {
    title: "Our Mission",
    body: "To engineer scalable, AI-powered healthcare infrastructure that carries clinical excellence and public health reach to every underserved community across India.",
  },
  vision: {
    title: "Our Vision",
    body: "A future where geography is no longer a barrier to healthcare — where every patient, regardless of where they live, receives the care they deserve.",
  },
  leadershipTitle: "Leadership",
  leadership: [
    {
      color: "brand",
      name: "Dr Rakesh Kalapala",
      role: "Founder & President · Director, AIG Hospitals",
    },
    {
      color: "green",
      name: "Dr D. Nageshwar Reddy",
      role: "Board Advisor · Chairman, AIG Hospitals",
    },
    {
      color: "blue",
      name: "Dr Santanu Chattopadhyay",
      role: "Science Lead, MAP-AP · AIG Barry Marshall Centre",
    },
  ],
  milestonesEyebrow: "Where We Stand",
  milestonesHeading: "Progress you can verify.",
  milestonesIntro:
    "Every milestone is documented, government-verified, and independently validated.",
  milestones: [
    { year: "S-8", text: "Registered as a Section 8 non-profit foundation", url: "https://www.linkedin.com/company/ai-medtech-alliance/?originalSubdomain=in", status: undefined },
    { year: "Gov", text: "Presented to the Chief Minister of Andhra Pradesh", url: "https://www.thehindu.com/news/national/andhra-pradesh/chief-minister-chandrababu-naidu-opens-andhra-pradeshs-first-digital-nerve-centre-in-kuppam/article69768296.ece", status: undefined },
    { year: "Press", text: "Featured in Eenadu — independently validated in the field", url: "https://www.aimfoundation.ai/media", status: undefined },
    { year: "MoU", text: "PHC access secured across Kuppam constituency for MAP-AP", url: "https://www.aimfoundation.ai/#programs", status: undefined },
  ],
};

export const collaborators = [
  "Government of Andhra Pradesh",
  "AIG Hospitals",
  "Stanford Mussallem Centre for Biodesign",
  "IIT Delhi",
  "ISB",
  "IIIT Hyderabad",
];

export const impact = {
  eyebrow: "Our Measure of Impact",
  title: "We measure impact in lives — then build the system that makes it repeatable.",
  subtitle:
    "Our return is measured in lives, not just rupees — the mother carried safely through pregnancy, the frontline worker equipped to act, the researcher finally given data that reflects the population they serve.",
  pillars: [
    {
      icon: "heart",
      tint: "brand",
      title: "For Patients",
      desc: "An expectant mother in a remote village receives the same precision monitoring as a city hospital — through a health worker she already trusts, in her own language, at her doorstep.",
    },
    {
      icon: "users",
      tint: "green",
      title: "For Frontline Workers",
      desc: "ASHAs carry rural public health on their shoulders with almost no decision-support. We give them AI tools that turn their field observations into timely, guided interventions.",
    },
    {
      icon: "flask",
      tint: "blue",
      title: "For Science",
      desc: "India has almost no large-scale biomedical data from its rural populations. We build the foundational datasets that future diagnostics and therapies will be designed from — data that actually reflects who India is.",
    },
  ],
};

export const programsIntro = {
  eyebrow: "Our Programs",
  title: "Our Key Initiatives",
};

export const programs = [
  {
    id: "mapap",
    accent: "green" as const,
    icon: "flask" as const,
    label: "Research Program",
    name: "MAP-AP",
    tagline: "India's first rural gut microbiome database.",
    description:
      "MAP-AP collects 10,000 biological samples from rural Andhra Pradesh — building the biomedical foundation India's future diagnostics will be designed from. Led by Dr. Santanu Chattopadhyay at AIG's Barry Marshall Nobel Prize Centre.",
    image: "/images/map-ap.webp",
    metrics: [
      { value: "10,000", label: "Biological samples" },
      { value: "15×", label: "Capital multiplier" },
      { value: "₹5 Cr+", label: "AIG in-kind infrastructure" },
    ],
  },
];

export const governance = {
  eyebrow: "Accountability",
  title: "Transparent by design. Not by obligation.",
  intro:
    "Both programs are structured to meet the highest standards of institutional accountability. They qualify under Schedule VII, Section 135 of the Companies Act, 2013 — Clause (i), preventive healthcare, and Clause (ix), research and innovation. Every initiative maps directly to SDGs 3, 5, 9, 10, and 17.",
  sdgs: [
    { num: "3", title: "Good Health & Well-Being", desc: "Ensure healthy lives and promote well-being for all at all ages." },
    { num: "5", title: "Gender Equality", desc: "Achieve gender equality and empower all women and girls." },
    { num: "9", title: "Innovation & Infrastructure", desc: "Build resilient infrastructure and foster innovation." },
    { num: "10", title: "Reduced Inequalities", desc: "Reduce inequality within and among countries." },
    { num: "17", title: "Partnerships for the Goals", desc: "Strengthen implementation and revitalise global partnership." },
  ],
  pillars: [
    {
      icon: "shield-check",
      title: "Transparent Auditing",
      desc: "Government-verified field data, institutional verification through AIG, independent third-party assessments, and itemised fund-utilisation reports for every partner.",
    },
    {
      icon: "eye",
      title: "Donor Access",
      desc: "Monthly field reports with verified data and photography, site visits welcome at any time, and a scope that adjusts if early results underperform before the full budget is deployed.",
    },
    {
      icon: "award",
      title: "Corporate Visibility",
      desc: "Acknowledgement across our website, published whitepapers, international research citations, state-level government events, and national media coverage.",
    },
  ],
};

export const partnership = {
  eyebrow: "Partner With Us",
  title: "The infrastructure exists. The partnerships are in place. What moves this forward is you.",
  subtitle:
    "Whether you lead a CSR fund, a family office, a healthcare institution, or a government initiative — there is a structured, accountable entry point built for you.",
  tiers: [
    {
      tag: "MAP-AP",
      program: "MAP_AP",
      amount: "₹30 Lakhs",
      pitch: "Unlock India's first rural gut microbiome database.",
      points: [
        "₹30L activates ~₹5 Crore of AIG lab infrastructure",
        "15× capital multiplier — rare in CSR funding",
        "Government MoU and PHC access already secured",
        "Collaboration on peer-reviewed publications",
        "Credit for patentable diagnostic biomarker outputs",
        "A proprietary model replicable across other states",
      ],
      featured: false,
    },
  ],
};

export const contact = {
  eyebrow: "Get in Touch",
  title: "Let's build something that lasts.",
  body: "If you believe healthcare is infrastructure — and that the right systems can carry it further than any single intervention — we'd like to speak with you.",
  audience: [
    "Government stakeholders",
    "CSR leaders",
    "Family offices",
    "Philanthropists",
    "Healthcare institutions",
    "Research organisations",
    "International partners",
  ],
  primaryCta: { label: "Express Now", href: "/express" },
  secondaryCta: { label: "Learn more about us", href: "#about" },
  contacts: [
    {
      role: "Executive",
      name: "Dr. Rakesh Kalapala",
      email: "drrakesh@aimfoundation.ai",
    },
    {
      role: "Proposals & Queries",
      name: "Surya Vasireddy",
      email: "surya.vasireddy@aimfoundation.ai",
      phone: "+91 96037 70001",
    },
  ],
};

export const express = {
  eyebrow: "Partnership Opportunity",
  title: "Express Your Interest",
  intro:
    "This is not a payment. It is an expression of intent. Our team will reach out to discuss your partnership.",
  audienceNote:
    "For CSR funds, HNI investors, family offices and impact-focused institutions — there is a structured entry point for everyone.",
  nameLabel: "Full Name",
  phoneLabel: "Mobile Number",
  emailLabel: "Email Address",
  projectLabel: "Project of Interest",
  amountLabel: "Indicative Amount",
  submitLabel: "Submit Expression of Interest",
  // Programs live in lib/projects.ts (code = DB enum value, label = display text).
  projects: PROJECTS,
};

export const footer = {
  tagline:
    "Building the healthcare infrastructure that carries clinical excellence, AI, and public health reach to every community we serve.",
  legal: "Registered Section 8 Non-Profit. CSR-eligible under Schedule VII, Companies Act, 2013.",
  columns: [
    {
      title: "Navigate",
      links: [
        { label: "About", href: "#about" },
        { label: "Programs", href: "#programs" },
        { label: "Impact", href: "#impact" },
        { label: "Governance", href: "#governance" },
        { label: "Express Now", href: "/express" },
      ],
    },
    {
      title: "Programs",
      links: [
        { label: "MAP-AP", href: "#mapap" },
        { label: "Microbiome Database", href: "#mapap" },
      ],
    },
  ],
  contactCol: {
    title: "Contact",
    address: "AIG Hospitals, Gachibowli, Hyderabad, Telangana",
    phone: "+91 96037 70001",
    email: "info@aimfoundation.ai",
  },
  copyright: "© 2026 AIM Foundation — AI & MedTech Alliance Foundation. All rights reserved.",
};
