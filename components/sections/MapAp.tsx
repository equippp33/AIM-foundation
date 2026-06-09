import { mapap } from "@/lib/content";
import { StatCard } from "@/components/ui/StatCard";
import { Icon } from "@/components/ui/Icon";

export function MapAp() {
  return (
    <section id="mapap" className="section bg-mist">
      <div className="container-x">
        {/* Heading */}
        <div className="reveal max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-sky-700">
            {mapap.tag}
          </span>
          <h2 className="mt-4 font-display text-[34px] leading-tight text-ink sm:text-[44px]">
            {mapap.title}
          </h2>
          <p className="mt-1 text-[17px] font-medium text-slatey-600">{mapap.subtitle}</p>
          <p className="mt-4 font-display text-[20px] text-brand-500">{mapap.lead}</p>
          <p className="mt-5 text-[16px] leading-relaxed text-slatey-500">{mapap.intro}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-slatey-500">{mapap.body}</p>
        </div>

        {/* Partner contributions */}
        <div className="reveal mt-12">
          <h3 className="font-display text-[22px] text-ink">{mapap.contributionsTitle}</h3>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {mapap.contributions.map((c) => (
              <div key={c.party} className="card card-hover p-6">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-sky-50 text-sky-600">
                  <Icon name="building" size={20} />
                </span>
                <h4 className="mt-4 text-[16px] font-semibold text-ink">{c.party}</h4>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slatey-500">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Funding breakdown */}
        <div className="reveal mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h3 className="font-display text-[22px] text-ink">{mapap.fundingTitle}</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-slatey-500">
              {mapap.fundingBody}
            </p>

            {/* Capital multiplier */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {mapap.multiplier.map((m) => (
                <StatCard key={m.label} value={m.value} label={m.label} tint={m.tint as any} />
              ))}
            </div>
          </div>

          {/* Cost table */}
          <div className="card overflow-hidden p-0">
            <div className="border-b border-line bg-mist px-6 py-4">
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slatey-600">
                Fund Utilisation
              </span>
            </div>
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

        {/* How collection works */}
        <div className="reveal mt-14">
          <h3 className="font-display text-[22px] text-ink">{mapap.collectionTitle}</h3>
          <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-slatey-500">
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

        {/* Deliverables */}
        <div className="reveal mt-12">
          <h3 className="font-display text-[22px] text-ink">{mapap.deliverablesTitle}</h3>
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
