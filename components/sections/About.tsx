import { about } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="section bg-mist">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left — heading block */}
          <div className="reveal">
            <span className="eyebrow">{about.eyebrow}</span>
            <h2 className="mt-4 font-display text-[34px] font-bold leading-[1.1] text-ink sm:text-[42px]">
              {about.headlineLines.map((line, i) => (
                <span key={i} className={i === about.headlineLines.length - 1 ? "text-brand-500" : undefined}>
                  {line}
                  {i < about.headlineLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>

          {/* Right — copy */}
          <div className="reveal" style={{ transitionDelay: "120ms" }}>
            <div className="border-l-[3px] border-brand-500 pl-6">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="mb-5 text-[16px] leading-relaxed text-slatey-500 last:mb-0">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-line bg-white p-5 shadow-card">
                <h3 className="font-display text-[18px] text-ink">{about.premise.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slatey-500">
                  {about.premise.body}
                </p>
              </div>
              <div className="rounded-lg border border-line bg-white p-5 shadow-card">
                <h3 className="font-display text-[18px] text-ink">{about.approach.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slatey-500">
                  {about.approach.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
