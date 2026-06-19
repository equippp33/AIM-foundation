import { Navbar } from "@/components/Navbar";
import { RevealProvider } from "@/components/RevealProvider";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Partners } from "@/components/sections/Partners";
import { PressSection } from "@/components/aim-press/PressSection";
import { Programs } from "@/components/sections/Programs";
import { Partnership } from "@/components/sections/Partnership";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.fullName,
  alternateName: site.name,
  url: site.url,
  description: site.description,
  slogan: site.tagline,
  areaServed: "IN",
};

export default function HomePage() {
  return (
    <RevealProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Partners />
        <PressSection />
        <Programs />
        <Partnership />
      </main>
      <Footer />
    </RevealProvider>
  );
}
