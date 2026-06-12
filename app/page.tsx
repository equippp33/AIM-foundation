import { Navbar } from "@/components/Navbar";
import { RevealProvider } from "@/components/RevealProvider";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { About } from "@/components/sections/About";
import { Leadership } from "@/components/sections/Leadership";
import { Milestones } from "@/components/sections/Milestones";
import { Impact } from "@/components/sections/Impact";
import { ExecutionGap } from "@/components/sections/ExecutionGap";
import { Janani } from "@/components/sections/Janani";
import { MapAp } from "@/components/sections/MapAp";
import { Governance } from "@/components/sections/Governance";
import { Partnership } from "@/components/sections/Partnership";
import { Contact } from "@/components/sections/Contact";
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
        <Partners />
        <Infrastructure />
        <About />
        <Leadership />
        <Milestones />
        <Impact />
        <ExecutionGap />
        {/* Programs anchor wraps both flagship projects */}
        <div id="programs">
          <Janani />
          <MapAp />
        </div>
        <Governance />
        <Partnership />
        <Contact />
      </main>
      <Footer />
    </RevealProvider>
  );
}
