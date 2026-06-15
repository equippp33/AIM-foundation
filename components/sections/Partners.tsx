import Image from "next/image";
import { partners } from "@/lib/content";

const BASE = "/images/support/public/images/support/";

const logos = [
  {
    name: "Government of Andhra Pradesh",
    src: `${BASE}Government of Andhra Pradesh.png`,
    // Wide emblem — give it a bit more breathing room
    inset: "inset-[14%]",
  },
  {
    name: "AIG Hospitals",
    src: `${BASE}AIG Hospitals.jpg`,
    inset: "inset-[18%]",
  },
  {
    name: "Stanford Mussallem Centre for Biodesign",
    src: `${BASE}Stanford Mussallem Centre for Biodesign.png`,
    // Typically a wide word-mark — needs more horizontal room
    inset: "inset-[12%]",
  },
  {
    name: "IIT Delhi",
    src: `${BASE}IIT Delhi.jpg`,
    inset: "inset-[18%]",
  },
  {
    name: "ISB",
    src: `${BASE}ISB logo.jpg`,
    inset: "inset-[18%]",
  },
  {
    name: "IIIT Hyderabad",
    src: `${BASE}IIIT Hyderabad.jpg`,
    inset: "inset-[18%]",
  },
];

export function Partners() {
  return (
    <section className="border-b border-line bg-white">
      <div className="container-x py-16 lg:py-20">
        {/* Section heading */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">{partners.eyebrow}</span>
          <h2 className="mt-4 font-display text-[28px] leading-tight text-ink sm:text-[36px]">
            {partners.title}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-slatey-500">{partners.body}</p>
        </div>

        {/* Logo grid */}
        <div className="reveal mt-14 flex flex-wrap items-start justify-center gap-x-8 gap-y-10 sm:gap-x-12 lg:gap-x-14">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="group flex flex-col items-center gap-4"
            >
              {/* Uniform circle container — 120 × 120 px on all breakpoints */}
              <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-full border border-line bg-white shadow-[0_2px_12px_rgba(0,0,0,0.07)] transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-[0_6px_24px_rgba(14,165,233,0.15)]">
                {/* Inset wrapper: keeps the logo away from the circular clip edge */}
                <div className={`absolute ${logo.inset}`}>
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="object-contain"
                    sizes="120px"
                  />
                </div>
              </div>

              {/* Partner name */}
              <p className="max-w-[120px] text-center text-[11.5px] font-semibold leading-snug text-slatey-600 transition-colors duration-200 group-hover:text-ink">
                {logo.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
