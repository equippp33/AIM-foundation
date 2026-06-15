import { mapap } from "@/lib/content";
import { StatCard } from "@/components/ui/StatCard";
import { Icon } from "@/components/ui/Icon";

function BlockLabel({ letter, title }: { letter: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500 text-[13px] font-bold text-white">
        {letter}
      </span>
      <h3 className="font-display text-[22px] text-ink">{title}</h3>
    </div>
  );
}

export function MapAp() {
  return (
    <section id="mapap" className="section bg-mist">
      <div className="container-x">
        {/* Heading */}
        <div className="reveal max-w-3xl">
          <span className="eyebrow">{mapap.tag}</span>
          <h2 className="mt-4 font-display text-[36px] leading-tight text-ink sm:text-[46px]">
            {mapap.title}
          </h2>
          <p className="mt-1 text-[17px] font-medium text-slatey-600">{mapap.subtitle}</p>
          <p className="mt-4 font-display text-[20px] text-brand-500">{mapap.lead}</p>
          <p className="mt-5 text-[16px] leading-relaxed text-slatey-500">{mapap.intro}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-slatey-500">{mapap.body}</p>
        </div>

        {/* Pipeline */}
        <div className="reveal mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {mapap.pipeline.map((step, i) => (
            <div key={step} className="relative">
              <div className="flex h-full flex-col items-center justify-center rounded-xl border border-line bg-white px-3 py-5 text-center shadow-card">
                <span className="num text-brand-500" style={{ fontSize: "13px", lineHeight: "16px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-1.5 text-[13.5px] font-semibold text-ink">{step}</span>
              </div>
              {i < mapap.pipeline.length - 1 && (
                <span className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-brand-400 lg:block">
                  <Icon name="arrow-right" size={16} />
                </span>
              )}
            </div>
          ))}
        </div>

        {/* A — Partner Contributions */}
        <div className="reveal mt-14">
          <BlockLabel letter="A" title={mapap.contributionsTitle} />
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {mapap.contributions.map((c) => (
              <div key={c.party} className="card card-hover p-6">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name="building" size={20} />
                </span>
                <h4 className="mt-4 text-[16px] font-semibold text-ink">{c.party}</h4>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slatey-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* B — Funding Impact */}
        <div className="reveal mt-14">
          <BlockLabel letter="B" title={mapap.fundingTitle} />
          <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed text-slatey-500">
            {mapap.fundingBody}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {mapap.multiplier.map((m) => (
              <StatCard
                key={m.label}
                value={m.value}
                label={m.label}
                tint={m.tint as any}
                featured={(m as { featured?: boolean }).featured}
              />
            ))}
          </div>
        </div>

        {/* C — Fund Utilisation */}
        <div className="reveal mt-14">
          <BlockLabel letter="C" title="Fund Utilisation" />
          <div className="card mt-5 overflow-hidden p-0">
            <div className="divide-y divide-line">
              {mapap.costs.map((c) => (
                <div key={c.item} className="flex items-start justify-between gap-4 px-6 py-4">
                  <div>
                    <p className="text-[14.5px] font-semibold text-ink">{c.item}</p>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-slatey-400">{c.detail}</p>
                  </div>
                  <span className="num shrink-0" style={{ fontSize: "16px", lineHeight: "22px" }}>
                    {c.cost}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between bg-brand-50/60 px-6 py-4">
                <span className="text-[15px] font-semibold text-ink">{mapap.costsTotal.item}</span>
                <span className="num font-semibold text-brand-600" style={{ fontSize: "19px", lineHeight: "24px" }}>
                  {mapap.costsTotal.cost}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* D — Collection Workflow */}
        <div className="reveal mt-14">
          <BlockLabel letter="D" title={mapap.collectionTitle} />
          <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-slatey-500">
            {mapap.collectionNote}
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {mapap.collectionSteps.map((s) => (
              <div key={s.day} className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-brand-50 px-3 py-1 text-[12px] font-semibold text-brand-600">
                    {s.day}
                  </span>
                  <h4 className="text-[16px] font-semibold text-ink">{s.title}</h4>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slatey-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* E — End of Month 3 Deliverables */}
        <div className="reveal mt-14">
          <BlockLabel letter="E" title={mapap.deliverablesTitle} />
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mapap.deliverables.map((d) => (
              <div key={d.title} className="card card-hover p-5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50 text-emerald-500">
                  <Icon name="check" size={16} />
                </span>
                <h4 className="mt-3 text-[15px] font-semibold text-ink">{d.title}</h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slatey-500">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
