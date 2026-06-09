import { hero } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-mist text-slatey-600"
      style={{
        background:
          "radial-gradient(1200px 600px at 85% -10%, rgba(232,51,111,0.10), transparent 60%), radial-gradient(900px 500px at 0% 110%, rgba(38,57,125,0.08), transparent 55%), linear-gradient(135deg,#ffffff 0%,#f7f8fb 55%,#fdf2f6 100%)",
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



      <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        {/* Left — copy */}
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-[12.5px] font-medium text-slatey-600 shadow-card">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {hero.badge}
          </span>

          <h1 className="mt-6 font-display text-[42px] font-bold leading-[1.06] text-ink sm:text-[54px] lg:text-[58px]">
            {hero.titleLine1}
            <br />
            <span className="text-gradient">{hero.titleLine2}</span>
          </h1>

          <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-slatey-600">
            {hero.lead}
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slatey-500">
            {hero.sub}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a href={hero.primaryCta.href} className="btn-primary">
              {hero.primaryCta.label}
              <Icon name="arrow-right" size={18} />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-slatey-600 transition-colors hover:text-ink"
            >
              {hero.secondaryCta.label}
              <Icon name="arrow-down" size={16} />
            </a>
          </div>
        </div>

        {/* Right — feature card */}
        <div className="reveal relative" style={{ transitionDelay: "120ms" }}>
          {/* Yellow accent icon — anchored to top-right corner of card */}
          <div className="absolute -right-5 -top-5 z-10 hidden animate-float lg:block">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-amber-400 text-amber-900">
              <Icon name="trending-up" size={24} />
            </div>
          </div>

          <div className="relative rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-7">
            <h2 className="text-[18px] font-semibold text-ink">{hero.card.title}</h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-slatey-500">{hero.card.body}</p>

            <ul className="mt-5 space-y-2.5">
              {hero.card.features.map((f) => (
                <li
                  key={f.title}
                  className="flex items-start gap-3 rounded-xl border border-line bg-mist px-4 py-3 transition-colors hover:bg-line"
                >
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-500/90 to-coral-500/90 text-white">
                    <Icon name={f.icon as IconName} size={18} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-ink">{f.title}</span>
                    <span className="block text-[12.5px] leading-snug text-slatey-500">
                      {f.desc}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {hero.card.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-md bg-mist px-3 py-1.5 text-[11.5px] font-medium text-slatey-600"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Green verified badge — anchored to bottom-left corner of card */}
          <span className="absolute -bottom-5 -left-5 z-10 grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500 text-white">
            <Icon name="check" size={22} />
          </span>
        </div>
      </div>
    </section>
  );
}
