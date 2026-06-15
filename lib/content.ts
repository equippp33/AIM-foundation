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
    { label: "Contact", href: "#express" },
  ],
  secondaryCta: { label: "Explore our work", href: "#programs" },
  cta: { label: "Express Now", href: "#express" },
};

export const hero = {
  eyebrow: "AI & MedTech Alliance Foundation",
  badge: "Registered Section 8 Non-Profit",
  titleLine1: "Engineering the future of healthcare.",
  titleLine2: "At Scale.",
  lead: "We bridge clinical mastery, artificial intelligence and public health infrastructure to build scalable medical solutions across India — starting where the gap is most prominent.",
  sub: "We work at the intersection of clinical credibility, AI-driven tools, and government reach — closing the execution gap that keeps good science from becoming real-world transformation.",
  primaryCta: { label: "Partner With Us", href: "#express" },
  secondaryCta: { label: "Explore Our Work", href: "#programs" },
};

export const mission = {
  quote:
    "We exist at the intersection of clinical excellence, artificial intelligence, and public health reach — turning science and policy into systems that endure.",
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
  eyebrow: "Our Premise",
  title: "About AIM Foundation",
  headlineLines: ["The gap isn't science.", "It isn't compassion.", "It's the system."],
  paragraphs: [
    "India has brilliant doctors. Dedicated researchers. Government health workers walking miles to reach the last household. What it has lacked — in maternal care, in rural diagnostics, in population-scale data — is the connective infrastructure that carries all of this together.",
    "That is the gap AIM Foundation was built to close. We are not a charity, and we don't distribute aid. We design, pilot, and operate the systems that make proven healthcare reach further — reliably, affordably, and long after the funding cycle ends.",
  ],
  premise: {
    title: "Not a Charity",
    body: "We don't distribute aid. We design, pilot, and operate the systems that carry proven healthcare further into the communities that need it.",
  },
  approach: {
    title: "Built to Endure",
    body: "Our systems are engineered for continuity — reliable, affordable, and independent of any single grant or funding cycle.",
  },
  leadershipTitle: "Leadership",
  leadershipHeading: "Built by clinicians. Guided by science.",
  leadership: [
    {
      initial: "R",
      color: "brand",
      name: "Dr Rakesh Kalapala",
      role: "Founder & President",
      detail:
        "Director at AIG Hospitals. Bridges the gap between frontline clinical practice and technology deployment — driving every AIM program from conception to the field.",
    },
    {
      initial: "N",
      color: "green",
      name: "Dr D. Nageshwar Reddy",
      role: "Board Advisor",
      detail:
        "Chairman of AIG Hospitals and one of India's most respected gastroenterologists. Provides the clinical oversight and strategic direction that gives every AIM initiative its institutional credibility.",
    },
    {
      initial: "S",
      color: "blue",
      name: "Dr Santanu Chattopadhyay",
      role: "Science Lead, MAP-AP",
      detail:
        "Leads the microbiome research program at AIG's Barry Marshall Nobel Prize Centre — overseeing DNA sequencing, bioinformatics, and the scientific integrity of MAP-AP's 10,000-sample collection.",
    },
  ],
  milestonesTitle: "Where We Stand",
  milestonesHeading: "Progress you can verify.",
  milestones: [
    { year: "S-8", text: "Registered as a Section 8 non-profit foundation" },
    { year: "Pilot", text: "Janani Mitra validated across an initial cohort of 5,000 pregnant women" },
    { year: "Gov", text: "Presented directly to the Hon'ble Chief Minister of Andhra Pradesh" },
    { year: "Press", text: "Featured in Eenadu — independently validated in the field" },
    { year: "MoU", text: "Primary health centre access secured across the Kuppam constituency for MAP-AP" },
    {
      year: "26-27",
      text: "FY 2026–27 target: scale Janani Mitra to 1,00,000 women",
      status: "In Progress",
    },
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

export const janani = {
  tag: "Flagship Program",
  title: "Janani Mitra",
  subtitle: "A mother in a village. The same care as a metro hospital.",
  intro:
    "Every year, preventable complications claim the lives of mothers and newborns who never received a warning in time — not because the medicine doesn't exist, but because the system didn't reach them. Janani Mitra changes that equation.",
  body: "The program places an AI health companion inside the government's own maternal health infrastructure. It monitors nutrition, identifies obstetric risk before it becomes a crisis, and escalates emergencies through a centralised command system — speaking to women in Telugu, in their own terms and context. It has been validated across an initial cohort of 5,000 pregnant women and presented directly to the Chief Minister of Andhra Pradesh.",
  techTitle: "What the Program Does",
  tech: [
    "Real-time nutrition tracking with proactive dietary alerts",
    "Automated obstetric risk identification",
    "Telugu-language AI guidance and emergency chatbots",
    "SOS escalation with defined command-centre protocols",
    "Four-tier monitoring dashboards for ASHA supervisors",
    "85%+ antenatal care compliance target",
  ],
  numbers: [
    { value: "5,000+", label: "Women in the pilot cohort", tint: "brand" },
    { value: "1,00,000", label: "Target for FY 2026–27", tint: "green", featured: true },
    { value: "500+", label: "ASHAs to be trained & activated", tint: "amber" },
    { value: "₹100", label: "Cost per beneficiary", tint: "blue" },
  ],
  quote:
    "Presented directly to the Hon'ble Chief Minister of Andhra Pradesh. Featured in Eenadu. Independently validated in the field.",
};

export const mapap = {
  tag: "Research Program",
  title: "MAP-AP",
  subtitle: "India's biology deserves India's own data.",
  lead: "India's first population-scale rural gut microbiome database.",
  pipeline: ["Village", "PHC", "Collection", "Cold Chain", "AIG Lab", "Research"],
  intro:
    "The global microbiome research field is advancing rapidly, with institutions worldwide racing to build population-scale biological datasets. But almost none of that data reflects India's rural populations — people whose biology, diet, and disease patterns are distinct, and whose health challenges remain poorly understood. MAP-AP is changing that.",
  body: "Conducted in Kuppam, Andhra Pradesh, the Microbiome Assessment Program collects 10,000 biological samples — blood, sputum, and stool — from a rural community. The science is led by Dr Santanu Chattopadhyay at AIG's Barry Marshall Nobel Prize Centre, government access across the Kuppam constituency is already secured, and AIG Hospitals is committing its full laboratory infrastructure — DNA sequencing, bioinformatics, and clinical oversight, a multi-crore in-kind investment already in place. What remains is the bridge between the village and the lab.",
  contributionsTitle: "Partner Contributions",
  contributions: [
    {
      party: "AIG Hospitals",
      desc: "Full lab processing, DNA sequencing, bioinformatics, and clinical oversight under Dr Santanu Chattopadhyay — an in-kind investment running into multiple crores.",
    },
    {
      party: "AP Government",
      desc: "MoU for primary health centre access across the Kuppam constituency, with ASHA worker coordination for community enrolment and follow-up.",
    },
    {
      party: "AIM Foundation",
      desc: "End-to-end field operations: sample collection, cold-chain logistics, data capture, quality assurance, and transparent donor reporting.",
    },
  ],
  fundingTitle: "Your ₹30 Lakhs — Exactly What It Funds",
  fundingBody:
    "AIG Hospitals is committing a multi-crore investment in lab infrastructure, sequencing, and analysis. Your ₹30 lakhs fund the field operations that collect and deliver 10,000 samples to those labs. Without field collection, world-class lab capacity sits idle; without the labs, the samples have no value. This funding is the bridge between the two.",
  costs: [
    {
      item: "Collection kits & materials",
      detail:
        "10,000 sets — blood tubes, sputum cups, stool containers, labels, and biohazard packaging",
      cost: "₹12–14 L",
    },
    {
      item: "Field manpower (3 months)",
      detail:
        "Lab technicians across 10 PHCs, home-visit assistants, cold-chain transporters, and supervisors",
      cost: "₹14–16 L",
    },
    {
      item: "Cold-chain infrastructure & training",
      detail:
        "−80°C freezer storage, insulated shippers, temperature monitoring, and staff training",
      cost: "₹3–5 L",
    },
  ],
  costsTotal: { item: "Total Estimated Cost", cost: "₹29–35 L" },
  multiplier: [
    { value: "₹5 Cr+", label: "AIG's committed in-kind lab infrastructure", tint: "blue" },
    { value: "15×", label: "Capital multiplier on partner investment", tint: "brand", featured: true },
    { value: "₹3,000", label: "Cost per participant", tint: "green" },
  ],
};

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
      tag: "Janani Mitra",
      program: "JANANI_MITRA",
      amount: "₹1 Crore",
      pitch: "Scale validated AI maternal health to 1,00,000 women across Andhra Pradesh.",
      points: [
        "Validated pilot — 5,000 women already tracked",
        "Presented to the Chief Minister of Andhra Pradesh",
        "₹100 per beneficiary — exceptional unit economics",
        "500+ ASHAs upskilled and activated",
        "Featured in national media (Eenadu), with visibility included",
        "Full CSR compliance reporting and site access",
      ],
      featured: true,
    },
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
        { label: "Janani Mitra", href: "#janani" },
        { label: "MAP-AP", href: "#mapap" },
        { label: "Maternal Health AI", href: "#janani" },
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
