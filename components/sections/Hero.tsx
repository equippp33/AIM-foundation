import { hero } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { HeadlineEcg } from "@/components/sections/HeadlineEcg";
import { FeaturedPrograms } from "@/components/sections/FeaturedPrograms";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-68px)] items-center overflow-hidden bg-mist text-slatey-600"
      style={{
        background:
          "radial-gradient(1100px 600px at 88% -10%, rgba(14,165,233,0.14), transparent 60%), radial-gradient(900px 500px at -5% 110%, rgba(6,182,212,0.10), transparent 55%), linear-gradient(135deg,#ffffff 0%,#f5fbff 55%,#eef9ff 100%)",
      }}
    >
      {/* subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#16223f 1px,transparent 1px),linear-gradient(90deg,#16223f 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Living healthcare-network animation (ECG pulse + AI particles + nodes) */}
      <HeroBackground />

      <div className="container-x relative z-10 w-full py-12 lg:py-16">
        <div className="reveal relative mx-auto max-w-4xl text-center" style={{ isolation: "isolate" }}>
          <HeadlineEcg />
          <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-brand-600">
            <span className="h-px w-7 bg-brand-500" />
            {hero.eyebrow}
          </span>

          <h1
            className="mt-6 font-display font-bold leading-[1.04] text-ink"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4.25rem)" }}
          >
            {hero.titleLine1}
            <br />
            <span className="text-gradient">{hero.titleLine2}</span>
          </h1>

          <p className="mt-5 mx-auto max-w-xl text-[16.5px] leading-relaxed text-slatey-500">
            {hero.lead}
          </p>

        </div>

        {/* Single container so CTA left-edge always aligns with the left card */}
        <div className="reveal mx-auto mt-6 w-full max-w-[760px] lg:mt-7">
          <FeaturedPrograms />
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a href={hero.primaryCta.href} className="btn-primary">
              {hero.primaryCta.label}
              <Icon name="arrow-right" size={18} />
            </a>
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-slatey-400">
              {hero.complianceNote}
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
