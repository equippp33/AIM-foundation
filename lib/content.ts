/**
 * lib/content.ts
 * Single source of truth for all site content.
 * Every string here is drawn from the AIM Foundation brief.
 */

export const site = {
  name: "AIM Foundation",
  fullName: "AI & MedTech Alliance Foundation",
  tagline: "Engineering the future of healthcare. At scale.",
  description:
    "AIM Foundation bridges clinical mastery, artificial intelligence and public health infrastructure to build scalable medical solutions across India.",
  url: "https://aimfoundation.ai",
};

export const nav = {
  links: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Programs", href: "#programs" },
    { label: "Impact", href: "#impact" },
    { label: "Governance", href: "#governance" },
  ],
  cta: { label: "Partner With Us", href: "#contact" },
};

export const hero = {
  badge: "Registered Section 8 Non-Profit",
  titleLine1: "Engineering the Future of",
  titleLine2: "Healthcare. At Scale.",
  lead: "We bridge clinical mastery, artificial intelligence and public health infrastructure to build scalable medical solutions across India — starting where the gap is most prominent.",
  sub: "We sit at the intersection of clinical credibility, AI-driven tools and government reach, filling the execution gap that prevents good science from becoming real-world transformation.",
  primaryCta: { label: "Partner With Us", href: "#contact" },
  secondaryCta: { label: "Learn more about us", href: "#about" },
  card: {
    title: "We treat healthcare as infrastructure",
    body: "India's prominent healthcare gaps are not a shortage of goodwill — they are a shortage of systemic infrastructure. We pilot and deploy medical technology that fixes the system, not just the symptom.",
    features: [
      {
        icon: "stethoscope",
        title: "Clinical Credibility",
        desc: "Anchored by AIG Hospitals partnership and senior clinical oversight.",
      },
      {
        icon: "cpu",
        title: "AI-Driven Tools",
        desc: "Multilingual, real-time intelligence that turns observation into intervention.",
      },
      {
        icon: "building",
        title: "Government Reach",
        desc: "MoUs and PHC access secured across entire constituencies.",
      },
      {
        icon: "infinity",
        title: "Built to Outlast",
        desc: "Infrastructure that endures — we don't just distribute aid.",
      },
    ],
    badges: ["Section 8 Non-Profit", "CSR Compliant", "SDG Aligned"],
  },
};

export const about = {
  eyebrow: "Who We Are",
  title: "About AIM Foundation",
  paragraphs: [
    "AIM Foundation is a registered Section 8 Non-Profit. Our work begins from a simple premise: India's prominent healthcare gaps are not a shortage of goodwill, but a shortage of systemic infrastructure. We facilitate, pilot and deploy medical technologies that fix this system — not just the symptom.",
    "We sit at the intersection of clinical credibility, AI-driven tools and government reach. We fill the execution gap that prevents good science from becoming a real-world transformation. We do not just distribute aid — we build infrastructure that outlasts us.",
  ],
  premise: {
    title: "Our Premise",
    body: "Healthcare is infrastructure. The gap is not goodwill — it is the system that fails to reach far enough, fast enough.",
  },
  approach: {
    title: "Our Approach",
    body: "Bridge clinical mastery, AI and public health reach to pilot, validate and scale solutions that endure beyond a single grant cycle.",
  },
  leadershipTitle: "Leadership",
  leadership: [
    {
      initial: "R",
      color: "brand",
      name: "Dr Rakesh Kalapala",
      role: "Founder & President",
      detail:
        "Director at AIG Hospitals. Leads the integration of clinical practice and technology deployment across all AIM programs.",
    },
    {
      initial: "N",
      color: "green",
      name: "Dr D. Nageshwar Reddy",
      role: "Board Advisor",
      detail:
        "Chairman, AIG Hospitals. One of India's most cited gastroenterologists. Provides clinical oversight and strategic direction.",
    },
    {
      initial: "S",
      color: "blue",
      name: "Dr Santanu Chattopadhyay",
      role: "Science Lead, MAP-AP",
      detail:
        "Leads the microbiome research program at AIG's Barry Marshall Nobel Prize Centre. Oversees DNA sequencing, bioinformatics and sample analysis.",
    },
  ],
  milestonesTitle: "Key Milestones",
  milestones: [
    { year: "S-8", text: "Registered as a Section 8 Non-Profit foundation" },
    { year: "Pilot", text: "Janani Mitra validated across an initial cohort of 5,000 pregnant women" },
    { year: "Gov", text: "Presented directly to the Hon. Chief Minister of Andhra Pradesh" },
    { year: "Press", text: "Featured in Eenadu — validated in the field" },
    { year: "MoU", text: "PHC access secured across the Kuppam constituency for MAP-AP" },
    {
      year: "26-27",
      text: "FY 2026-27 target: scale Janani Mitra to 1,00,000 women",
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
  eyebrow: "Where the Impact Leads Us",
  title: "Who We Build For",
  subtitle:
    "The return on investment is not solely financial — its greatest value lies in the lives reached: the mother monitored, the field worker empowered, the researcher finally given data.",
  pillars: [
    {
      icon: "heart",
      tint: "brand",
      title: "For Patients",
      desc: "An expectant mother in a remote village receives the same precision monitoring as a Tier-1 facility — at her doorstep, in her mother tongue, through a worker she already trusts.",
    },
    {
      icon: "users",
      tint: "green",
      title: "For Frontline Workers",
      desc: "ASHAs and ANMs carry public health on their shoulders. We equip them with multilingual AI tools that turn raw field observations into real-time interventions.",
    },
    {
      icon: "flask",
      tint: "blue",
      title: "For Science & Technology",
      desc: "India has almost no large-scale biomedical data from its rural populations. We lay the foundation for diagnostics and therapies designed for Indian biology.",
    },
  ],
  gap: {
    title: "The Execution Gap",
    body: "Good science exists. Government will exists. What is missing is the infrastructure that carries one to the other — especially in rural India.",
    items: [
      { icon: "alert-triangle", text: "No systemic infrastructure" },
      { icon: "map-pin-off", text: "Science doesn't reach the field" },
      { icon: "database-off", text: "No rural biomedical data" },
      { icon: "unlink", text: "Pilot-to-scale execution gap" },
    ],
  },
};

export const janani = {
  tag: "Active Project 01",
  title: "Janani Mitra",
  subtitle: "AI-Powered Maternal Health Program",
  intro:
    "Every year, women lose their lives to complications that could have been prevented during pregnancies that should have ended in healthy births — not because care does not exist, but because the system does not reach far enough, fast enough. Janani Mitra closes that distance.",
  body: "The program embeds an AI Health Companion into existing government infrastructure. It tracks nutrition, flags risk in real time, escalates emergencies, and communicates in the language the mother speaks. It has already been presented to the Chief Minister of Andhra Pradesh and validated across an initial cohort of 5,000 pregnant women.",
  techTitle: "What the Technology Does",
  tech: [
    "Machine-learning-driven nutrition tracking and dietary alerts",
    "Automated real-time obstetric risk identification",
    "Multilingual AI chatbots (Telugu)",
    "Centralised SOS emergency command centres with escalation protocols",
    "4-tier tracking dashboards for ASHA supervisors",
    "85%+ antenatal care compliance target",
  ],
  numbers: [
    { value: "5,000+", label: "Women in pilot", tint: "brand" },
    { value: "1,00,000", label: "FY 2026-27 target", tint: "green" },
    { value: "500+", label: "ASHAs to be upskilled", tint: "amber" },
    { value: "Rs. 100", label: "Per beneficiary", tint: "blue" },
  ],
  quote:
    "Presented directly to the Hon. Chief Minister of Andhra Pradesh. Featured in Eenadu. Validated in the field.",
};

export const mapap = {
  tag: "Active Project 02",
  title: "MAP-AP",
  subtitle: "Microbiome Assessment Program, Andhra Pradesh",
  lead: "India's first population-scale gut microbiome database.",
  intro:
    "India does not have large-scale gut microbiome data from its own rural populations. The global microbiome diagnostics market is heading toward $15–20 billion, and every major research institution in the world is building these databases. MAP-AP collects 10,000 biological samples — blood, sputum and stool — from a rural population in Kuppam, Andhra Pradesh.",
  body: "The science is led by Dr Santanu Chattopadhyay at AIG's Barry Marshall Nobel Prize Centre. The government has granted PHC access across the constituency. Infrastructure, clinical credibility and government partnership are all in place. What is needed is the funding to reach people: the field teams, collection kits and cold-chain logistics that get samples from a village to a world-class lab.",
  contributionsTitle: "Partner Contributions",
  contributions: [
    {
      party: "AIG Hospitals",
      desc: "Full lab processing, DNA sequencing, bioinformatics analysis and clinical oversight via Dr Santanu Chattopadhyay. In-kind investment runs to multiple crores.",
    },
    {
      party: "AP Government",
      desc: "MoU for PHC access across Kuppam constituency. ASHA worker coordination for community enrolment and follow-up.",
    },
    {
      party: "AIM Foundation",
      desc: "End-to-end field operations, sample collection, cold-chain logistics, data capture, quality assurance and donor reporting.",
    },
  ],
  fundingTitle: "Your Rs. 30 Lakhs — Exactly What It Funds",
  fundingBody:
    "AIG Hospitals is making a multi-crore investment in lab infrastructure, sequencing and analysis. Your Rs. 30 lakhs fund the field operations needed to collect and deliver 10,000 samples to their labs. Without field collection, AIG's capacity sits idle. Without AIG's labs, samples have no value. This funding bridges the two.",
  costs: [
    {
      item: "Collection kits & materials",
      detail:
        "10,000 sets — blood tubes, sputum cups, stool containers, labels, biohazard packaging",
      cost: "₹12–14 L",
    },
    {
      item: "Field manpower (3 months)",
      detail:
        "Lab technicians at 10 PHCs, home-visit assistants, cold-chain transporters and supervisors",
      cost: "₹14–16 L",
    },
    {
      item: "Cold-chain infrastructure & training",
      detail:
        "−80°C freezer storage, insulated shippers, temperature monitoring and staff training",
      cost: "₹3–5 L",
    },
  ],
  costsTotal: { item: "Total Estimated Cost", cost: "₹29–35 L" },
  multiplier: [
    { value: "Rs. 5 Cr+", label: "AIG in-kind contribution", tint: "blue" },
    { value: "15x", label: "Your Rs. 30L activates Rs. 5Cr+ of infrastructure", tint: "brand" },
    { value: "Rs. 3,000", label: "Per participant — lean rural biospecimen collection", tint: "green" },
  ],
  collectionTitle: "How Collection Works",
  collectionNote:
    "This model uses existing government health infrastructure. No new clinics, no new patient populations.",
  collectionSteps: [
    {
      day: "Day 1",
      title: "PHC visit & first samples",
      desc: "Participants visit their local Primary Health Centre for a routine checkup. Our lab technician draws blood and collects a sputum sample. A field assistant completes digital consent and hands over the stool collection kit with Telugu-language instructions.",
    },
    {
      day: "Day 2",
      title: "Home collection & transport",
      desc: "The field assistant visits the patient's home to collect the stool sample. The same day, all samples are transported to a central freezer within 2–4 hours. Batch dispatch to AIG every 7–10 days via dry-ice shippers with full temperature logging.",
    },
  ],
  deliverablesTitle: "What You Receive at the End of Month 3",
  deliverables: [
    {
      title: "10,000 samples preserved",
      desc: "Biological samples safely collected and preserved at −80°C, creating a high-quality repository for future analysis and discovery.",
    },
    {
      title: "Rich linked metadata",
      desc: "Participant information linked to every sample — demographic details, health history and geographic context — enabling accurate research insights.",
    },
    {
      title: "Full traceability",
      desc: "Complete transparency throughout: digital consent records, cold-chain monitoring and comprehensive sample-tracking systems.",
    },
    {
      title: "A proven, replicable model",
      desc: "Demonstrating that large-scale, high-quality research can be conducted in underserved communities and replicated in other regions.",
    },
    {
      title: "Scientific contribution",
      desc: "Co-authorship on peer-reviewed publications and participation in developing potentially patentable diagnostic biomarkers.",
    },
  ],
};

export const governance = {
  eyebrow: "Governance & Compliance",
  title: "Accountability, Built In",
  intro:
    "Both programs fall squarely within Schedule VII, Section 135 of the Companies Act 2013 — Clause (i) promoting preventive healthcare and Clause (ix) research and incubation. Every project report contributes to SDGs 3, 5, 9, 10 and 17.",
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
      desc: "Government-verified field data, institutional verification through AIG, independent third-party assessments and itemised fund-utilisation reports for every partner.",
    },
    {
      icon: "eye",
      title: "Donor Access",
      desc: "Monthly progress reports with field photographs and collection metrics. Site visits welcome any time. Scope adjusts if early results underperform before the full budget is deployed.",
    },
    {
      icon: "award",
      title: "Corporate Visibility",
      desc: "Acknowledgement across our website, published whitepapers, international research citations, state-level government events and national media coverage.",
    },
  ],
};

export const partnership = {
  eyebrow: "Partnership Opportunity",
  title: "Where Your Investment Goes",
  subtitle:
    "Whether you are a CSR fund, HNI investor, family office or impact-focused institution, there is a structured entry point for everyone.",
  tiers: [
    {
      tag: "Janani Mitra",
      amount: "Rs. 1 Crore",
      pitch: "Scale AI maternal health to 1,00,000 women across Andhra Pradesh.",
      points: [
        "Validated pilot — 5,000 women already tracked",
        "Presented to the CM of Andhra Pradesh",
        "Rs. 100 per beneficiary — high-efficiency unit economics",
        "500+ ASHAs upskilled and activated",
        "Featured in prominent media (Eenadu) with visibility included",
        "CSR compliance reporting and site access",
      ],
      featured: true,
    },
    {
      tag: "MAP-AP",
      amount: "Rs. 30 Lakhs",
      pitch: "Unlock India's first rural gut microbiome database.",
      points: [
        "Rs. 30L enables ~Rs. 5 Crore of AIG lab infrastructure",
        "15x capital multiplier — rare in CSR funding",
        "Government MoU and PHC access secured",
        "Collaboration on peer-reviewed publications",
        "Credit for patentable diagnostic biomarker outputs",
        "Proprietary model replicable across other states",
      ],
      featured: false,
    },
  ],
};

export const contact = {
  eyebrow: "Get in Touch",
  title: "Let's Build Healthcare Infrastructure",
  body: "We are looking for partners who see healthcare the way we do — not as a problem to be managed, but as infrastructure to be built. If that resonates with your vision, we'd like to show you exactly where your investment goes.",
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

export const footer = {
  tagline:
    "Bridging clinical mastery, AI and public health infrastructure to build scalable medical solutions across India.",
  legal: "Registered Section 8 Non-Profit. CSR-eligible under Schedule VII, Companies Act 2013.",
  columns: [
    {
      title: "Navigate",
      links: [
        { label: "About", href: "#about" },
        { label: "Programs", href: "#programs" },
        { label: "Impact", href: "#impact" },
        { label: "Governance", href: "#governance" },
        { label: "Partner With Us", href: "#contact" },
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
