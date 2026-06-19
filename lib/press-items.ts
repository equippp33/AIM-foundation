import type { ShowcaseItem } from "@/components/showcase-marquee/types";

// Image paths point to /public/press/*.jpg — drop the real clippings there and
// they appear automatically. Until then, ShowcaseCard falls back to a
// placeholder on load error.
export const pressItems: ShowcaseItem[] = [
  { id: "p1", title: "AP Gov. Launches AI-led Maternal Healthcare App — Times of India", image: "/press/toi-janani.webp", href: "#" },
  { id: "p2", title: "TG right platform for innovation, avers CM — Hans India", image: "/press/hans-india.webp", href: "https://www.thehansindia.com/telangana/tg-right-platform-for-innovation-avers-cm-1000135" },
  { id: "p3", title: "Hyderabad emerging as global biotech & medtech hub — South India Times", image: "/press/south-india-times.jpg", href: "#" },
  { id: "p4", title: "Janani Mitra — Eenadu coverage", image: "/press/eenadu-janani.webp", href: "#" },
  { id: "p5", title: "CM Chandrababu Naidu meets AIM Foundation — ABN", image: "/press/abn-cm.webp", href: "https://www.thehansindia.com/andhra-pradesh/chandrababu-launches-digital-nerve-centre-in-kuppam-for-enhanced-healthcare-984811" },
  { id: "p6", title: "Dr Rakesh Kalapala — ASGE Associate Editor — N Chandrababu Naidu tweet", image: "/press/cbn-tweet.png", href: "https://thesouthfirst.com/telangana/dr-rakesh-kalapala-appointed-associate-editor-of-asges-prestigious-igie-journal/" },
  { id: "p7", title: "Congratulations Dr Prateek Sharma — Padma Shri — AIM Foundation", image: "/press/padma-shri.webp", href: "https://medicaldialogues.in/news/health/doctors/padma-awards-2026-in-medicine-2-conferred-padma-bhushan-13-receive-padma-shri-163371" },
  { id: "p8", title: "APAC BioDesign Alliance Summit — Hyderabad", image: "/press/apac-biodesign.jpg", href: "https://bharatbiodesign.com/apac-biodesign-innovation-summit-2025/" },
  { id: "p9", title: "The Pioneer — Rising in Biotech, MedTech Innovation", image: "/press/pioneer.webp", href: "#" },
  { id: "p10", title: "Bharat Biodesign collaborates with Tata Innovation Hub", image: "/press/tata-collab.webp", href: "https://www.deccanchronicle.com/southern-states/andhra-pradesh/ap-biodesign-research-initiative-to-collaborate-with-ratan-tata-innovation-hub-1899696" },
];
