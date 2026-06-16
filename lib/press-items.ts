import type { ShowcaseItem } from "@/components/showcase-marquee/types";

// Image paths point to /public/press/*.jpg — drop the real clippings there and
// they appear automatically. Until then, ShowcaseCard falls back to a
// placeholder on load error.
export const pressItems: ShowcaseItem[] = [
  { id: "p1", title: "AP Gov. Launches AI-led Maternal Healthcare App — Times of India", image: "/press/toi-janani.jpg", href: "#" },
  { id: "p2", title: "TG right platform for innovation, avers CM — Hans India", image: "/press/hans-india.jpg", href: "#" },
  { id: "p3", title: "Hyderabad emerging as global biotech & medtech hub — South India Times", image: "/press/south-india-times.jpg", href: "#" },
  { id: "p4", title: "Janani Mitra — Eenadu coverage", image: "/press/eenadu-janani.jpg", href: "#" },
  { id: "p5", title: "CM Chandrababu Naidu meets AIM Foundation — ABN", image: "/press/abn-cm.jpg", href: "#" },
  { id: "p6", title: "Dr Rakesh Kalapala — ASGE Associate Editor — N Chandrababu Naidu tweet", image: "/press/cbn-tweet.jpg", href: "#" },
  { id: "p7", title: "Congratulations Dr Prateek Sharma — Padma Shri — AIM Foundation", image: "/press/padma-shri.jpg", href: "#" },
  { id: "p8", title: "APAC BioDesign Alliance Summit — Hyderabad", image: "/press/apac-biodesign.jpg", href: "#" },
  { id: "p9", title: "The Pioneer — Rising in Biotech, MedTech Innovation", image: "/press/pioneer.jpg", href: "#" },
  { id: "p10", title: "Bharat Biodesign collaborates with Tata Innovation Hub", image: "/press/tata-collab.jpg", href: "#" },
];
