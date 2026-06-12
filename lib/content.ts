/**
 * lib/content.ts
 * Single source of truth for all site content.
 * Premium copy for AIM Foundation — every fact (names, numbers, partners,
 * programs, compliance) is preserved; only the prose is elevated.
 */

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
    { label: "Infrastructure", href: "#infrastructure" },
    { label: "About", href: "#about" },
    { label: "Programs", href: "#programs" },
    { label: "Impact", href: "#impact" },
    { label: "Governance", href: "#governance" },
    { label: "Contact", href: "#contact" },
  ],
  secondaryCta: { label: "Explore our impact", href: "#impact" },
  cta: { label: "Express Now", href: "/express" },
};

export const hero = {
  eyebrow: "AI & MedTech Alliance",
  badge: "Registered Section 8 Non-Profit",
  titleLine1: "We treat healthcare",
  titleLine2: "as infrastructure",
  lead: "India's healthcare gaps are not a failure of compassion — they are a failure of infrastructure. AIM Foundation unites clinical excellence, artificial intelligence, and government partnerships to build the systems that carry proven medicine to the people who need it most.",
  sub: "We work at the intersection of clinical credibility, AI-driven tools, and government reach — closing the execution gap that keeps good science from becoming real-world transformation.",
  primaryCta: { label: "Express Now", href: "/express" },
  secondaryCta: { label: "Explore our impact", href: "#impact" },
};

export const infrastructure = {
  eyebrow: "Healthcare Infrastructure",
  title: "We treat healthcare as infrastructure",
  body: "Good medicine already exists. What's missing is the infrastructure to deliver it — reliably, affordably, and at scale. We design and operate the connective systems that turn clinical breakthroughs into everyday access for India's underserved communities.",
  badges: ["Section 8 Non-Profit", "CSR Eligible", "SDG Aligned"],
  features: [
    {
      icon: "stethoscope",
      title: "Clinical Credibility",
      desc: "Anchored by AIG Hospitals and led by senior clinicians, every program is grounded in validated medical practice — never assumptions.",
    },
    {
      icon: "cpu",
      title: "AI-Driven Tools",
      desc: "Multilingual, real-time intelligence that turns frontline observation into timely, life-saving intervention.",
    },
    {
      icon: "building",
      title: "Government Reach",
      desc: "Signed MoUs and primary health centre access across entire constituencies — strengthening public systems, not building parallel ones.",
    },
    {
      icon: "infinity",
      title: "Built to Outlast",
      desc: "We engineer infrastructure that endures beyond a single grant cycle — systems that keep working long after we step back.",
    },
  ],
};

export const about = {
  eyebrow: "Who We Are",
  title: "About AIM Foundation",
  paragraphs: [
    "AIM Foundation is a registered Section 8 non-profit built on a single conviction: healthcare is infrastructure. India's most pressing health challenges are not a shortage of goodwill or of science — they are a shortage of the systems that carry proven care to the communities that need it. We exist to build those systems.",
    "We work at the intersection of clinical excellence, artificial intelligence, and public health reach — partnering with leading hospitals, research institutions, and government bodies to pilot, validate, and scale solutions in the real world. We are not a charity distributing aid. We are an execution engine that turns science, policy, and technology into measurable public impact.",
  ],
  premise: {
    title: "Our Premise",
    body: "Healthcare is infrastructure. The gap is not goodwill — it is the system that fails to reach far enough, fast enough.",
  },
  approach: {
    title: "Our Approach",
    body: "We bridge clinical mastery, AI, and public health reach to pilot, validate, and scale solutions that endure well beyond a single funding cycle.",
  },
  leadershipTitle: "Leadership",
  leadership: [
    {
      initial: "R",
      color: "brand",
      name: "Dr Rakesh Kalapala",
      role: "Founder & President",
      detail:
        "Director at AIG Hospitals. Bridges frontline clinical practice and technology deployment across every AIM program.",
    },
    {
      initial: "N",
      color: "green",
      name: "Dr D. Nageshwar Reddy",
      role: "Board Advisor",
      detail:
        "Chairman of AIG Hospitals and one of India's most cited gastroenterologists. Provides clinical oversight and strategic direction.",
    },
    {
      initial: "S",
      color: "blue",
      name: "Dr Santanu Chattopadhyay",
      role: "Science Lead, MAP-AP",
      detail:
        "Leads the microbiome research program at AIG's Barry Marshall Nobel Prize Centre, overseeing DNA sequencing, bioinformatics, and sample analysis.",
    },
  ],
  milestonesTitle: "Key Milestones",
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
  eyebrow: "Impact",
  title: "Where the Impact Leads Us",
  subtitle:
    "Our return is measured in lives, not just rupees — the mother carried safely through pregnancy, the frontline worker equipped to act, the researcher finally given data that reflects the population they serve.",
  pillars: [
    {
      icon: "heart",
      tint: "brand",
      title: "For Patients",
      desc: "An expectant mother in a remote village receives the same precision monitoring as a metro hospital — at her doorstep, in her own language, through a health worker she already trusts.",
    },
    {
      icon: "users",
      tint: "green",
      title: "For Frontline Workers",
      desc: "ASHAs and ANMs carry rural public health on their shoulders. We equip them with multilingual AI tools that turn field observations into real-time, guided interventions.",
    },
    {
      icon: "flask",
      tint: "blue",
      title: "For Science & Technology",
      desc: "India has almost no large-scale biomedical data from its rural populations. We build the foundational datasets for diagnostics and therapies designed for Indian biology.",
    },
  ],
  gap: {
    eyebrow: "Execution Gap",
    title: "The Execution Gap",
    body: "Proven science exists. Government will exists. What's missing is the infrastructure that carries one to the other — especially across rural India. That gap is exactly where we work.",
    flow: ["Science", "Infrastructure", "Government", "Impact"],
    items: [
      { icon: "alert-triangle", text: "No systemic delivery infrastructure" },
      { icon: "map-pin-off", text: "Science that never reaches the field" },
      { icon: "database-off", text: "No biomedical data from rural India" },
      { icon: "unlink", text: "A persistent pilot-to-scale gap" },
    ],
  },
};

export const janani = {
  tag: "Flagship Program",
  title: "Janani Mitra",
  subtitle: "AI-Powered Maternal Health Program",
  intro:
    "Every year, mothers lose their lives to complications that are entirely preventable — not because the medicine doesn't exist, but because the system doesn't reach them in time. Janani Mitra closes that distance.",
  body: "The program embeds an AI health companion directly into existing government infrastructure. It tracks nutrition, flags obstetric risk in real time, escalates emergencies, and communicates in the mother's own language. It has been presented to the Chief Minister of Andhra Pradesh and validated across an initial cohort of 5,000 pregnant women.",
  techTitle: "What the Technology Does",
  tech: [
    "Machine-learning nutrition tracking with proactive dietary alerts",
    "Automated, real-time obstetric risk identification",
    "Multilingual AI guidance and chatbots (Telugu)",
    "Centralised SOS command centres with defined escalation protocols",
    "Four-tier monitoring dashboards for ASHA supervisors",
    "85%+ antenatal care compliance target",
  ],
  numbers: [
    { value: "5,000+", label: "Women in pilot", tint: "brand" },
    { value: "1,00,000", label: "FY 2026-27 target", tint: "green" },
    { value: "500+", label: "ASHAs to be upskilled", tint: "amber" },
    { value: "Rs. 100", label: "Cost per beneficiary", tint: "blue" },
  ],
  quote:
    "Presented directly to the Hon'ble Chief Minister of Andhra Pradesh. Featured in Eenadu. Independently validated in the field.",
};

export const mapap = {
  tag: "Research Program",
  title: "MAP-AP",
  subtitle: "Microbiome Assessment Program, Andhra Pradesh",
  lead: "India's first population-scale gut microbiome database.",
  pipeline: ["Village", "PHC", "Collection", "Cold Chain", "AIG Lab", "Research"],
  intro:
    "India has almost no large-scale gut microbiome data from its own rural populations. The global microbiome diagnostics market is approaching $15–20 billion, and every major research institution is racing to build these datasets. MAP-AP collects 10,000 biological samples — blood, sputum, and stool — from a rural population in Kuppam, Andhra Pradesh.",
  body: "The science is led by Dr Santanu Chattopadhyay at AIG's Barry Marshall Nobel Prize Centre, and the government has granted primary health centre access across the constituency. Infrastructure, clinical credibility, and government partnership are already in place. What remains is the funding to reach people: the field teams, collection kits, and cold-chain logistics that move a sample from a village to a world-class lab.",
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
  fundingTitle: "Your Rs. 30 Lakhs — Exactly What It Funds",
  fundingBody:
    "AIG Hospitals is committing a multi-crore investment in lab infrastructure, sequencing, and analysis. Your Rs. 30 lakhs fund the field operations that collect and deliver 10,000 samples to those labs. Without field collection, world-class lab capacity sits idle; without the labs, the samples have no value. This funding is the bridge between the two.",
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
    { value: "Rs. 5 Cr+", label: "AIG in-kind contribution", tint: "blue" },
    { value: "15x", label: "Capital multiplier on your Rs. 30L", tint: "brand" },
    { value: "Rs. 3,000", label: "Cost per participant", tint: "green" },
  ],
  collectionTitle: "How Collection Works",
  collectionNote:
    "The model runs entirely on existing government health infrastructure — no new clinics, no new patient populations.",
  collectionSteps: [
    {
      day: "Day 1",
      title: "PHC visit & first samples",
      desc: "Participants visit their local Primary Health Centre for a routine checkup. Our lab technician draws blood and collects a sputum sample, while a field assistant completes digital consent and hands over the stool-collection kit with Telugu-language instructions.",
    },
    {
      day: "Day 2",
      title: "Home collection & transport",
      desc: "The field assistant visits the participant's home to collect the stool sample. All samples reach a central freezer within 2–4 hours, with batch dispatch to AIG every 7–10 days via dry-ice shippers and full temperature logging.",
    },
  ],
  deliverablesTitle: "What You Receive at the End of Month 3",
  deliverables: [
    {
      title: "10,000 samples preserved",
      desc: "Biological samples safely collected and preserved at −80°C — a high-quality repository for years of future analysis and discovery.",
    },
    {
      title: "Rich linked metadata",
      desc: "Every sample linked to participant data — demographics, health history, and geographic context — enabling accurate, reproducible research insights.",
    },
    {
      title: "Full traceability",
      desc: "Complete transparency end to end: digital consent records, cold-chain monitoring, and comprehensive sample-tracking systems.",
    },
    {
      title: "A proven, replicable model",
      desc: "Evidence that large-scale, high-quality research can be conducted in underserved communities — and replicated across other regions.",
    },
    {
      title: "Scientific contribution",
      desc: "Co-authorship on peer-reviewed publications and a role in developing potentially patentable diagnostic biomarkers.",
    },
  ],
};

export const governance = {
  eyebrow: "Governance & Compliance",
  title: "Accountability, Built In",
  intro:
    "Both programs sit squarely within Schedule VII, Section 135 of the Companies Act, 2013 — Clause (i), promoting preventive healthcare, and Clause (ix), research and incubation. Every project report maps directly to SDGs 3, 5, 9, 10, and 17.",
  sdgs: [
    { num: "3", title: "Good Health & Well-Being", desc: "Ensure healthy lives and promote well-being for all at all ages." },
    { num: "5", title: "Gender Equality", desc: "Achieve gender equality and empower all women and girls." },
    { num: "9", title: "Industry, Innovation & Infrastructure", desc: "Build resilient infrastructure and foster innovation." },
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
      desc: "Monthly progress reports with field photography and collection metrics, site visits welcome at any time, and a scope that adjusts if early results underperform before the full budget is deployed.",
    },
    {
      icon: "award",
      title: "Corporate Visibility",
      desc: "Acknowledgement across our website, published whitepapers, international research citations, state-level government events, and national media coverage.",
    },
  ],
};

export const partnership = {
  eyebrow: "Partnership Opportunity",
  title: "Where Your Investment Goes",
  subtitle:
    "Whether you represent a CSR fund, a family office, an impact investor, or a mission-aligned institution, there is a structured, accountable entry point built for you.",
  tiers: [
    {
      tag: "Janani Mitra",
      amount: "Rs. 1 Crore",
      pitch: "Scale validated AI maternal health to 1,00,000 women across Andhra Pradesh.",
      points: [
        "Validated pilot — 5,000 women already tracked",
        "Presented to the Chief Minister of Andhra Pradesh",
        "Rs. 100 per beneficiary — exceptional unit economics",
        "500+ ASHAs upskilled and activated",
        "Featured in national media (Eenadu), with visibility included",
        "Full CSR compliance reporting and site access",
      ],
      featured: true,
    },
    {
      tag: "MAP-AP",
      amount: "Rs. 30 Lakhs",
      pitch: "Unlock India's first rural gut microbiome database.",
      points: [
        "Rs. 30L activates ~Rs. 5 Crore of AIG lab infrastructure",
        "15x capital multiplier — rare in CSR funding",
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
  eyebrow: "Contact",
  title: "Partner With Us",
  body: "We're looking for partners who see healthcare the way we do — not as a problem to manage, but as infrastructure to build. If that resonates with your vision, we'll show you exactly where your investment goes.",
  audience: [
    "Government stakeholders",
    "CSR leaders",
    "Family offices",
    "Philanthropists",
    "Healthcare institutions",
    "Research organizations",
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
  badge: "Social Stock Exchange (SSE)",
  title: "Express Your Support",
  subtitle:
    "AIM Foundation is listing on SEBI's Social Stock Exchange. Pledge your contribution toward building healthcare infrastructure that reaches everyone.",
  amountLabel: "Amount (in multiples of ₹10,000)",
  submitLabel: "Express",
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
