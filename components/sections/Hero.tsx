import { hero } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

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

      <div className="container-x relative w-full py-24 lg:py-28">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-brand-600">
            <span className="h-px w-7 bg-brand-500" />
            {hero.eyebrow}
          </span>

          <h1 className="mt-6 font-display text-[44px] font-bold leading-[1.04] text-ink sm:text-[60px] lg:text-[68px]">
            {hero.titleLine1}
            <br />
            <span className="text-gradient">{hero.titleLine2}</span>
          </h1>

          <p className="mt-7 mx-auto max-w-xl text-[16.5px] leading-relaxed text-slatey-500">
            {hero.lead}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href={hero.primaryCta.href} className="btn-primary">
              {hero.primaryCta.label}
              <Icon name="arrow-right" size={18} />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-[15px] font-medium text-ink transition-colors hover:border-brand-300 hover:text-brand-600"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
