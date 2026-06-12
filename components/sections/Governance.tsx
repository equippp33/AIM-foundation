import { governance } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";

export function Governance() {
  return (
    <section id="governance" className="section bg-white">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <span className="eyebrow">{governance.eyebrow}</span>
          <h2 className="mt-4 font-display text-[34px] leading-tight text-ink sm:text-[44px]">
            {governance.title}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-slatey-500">{governance.intro}</p>
        </div>

        {/* SDG big number cards */}
        <div className="reveal mt-12 flex flex-wrap items-stretch justify-center gap-4">
          {governance.sdgs.map((s) => (
            <div
              key={s.num}
              className="flex min-w-[160px] max-w-[200px] flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-white px-5 py-6 text-center shadow-card"
            >
              <span className="num text-brand-500" style={{ fontSize: "48px", lineHeight: "52px" }}>
                {s.num}
              </span>
              <p className="text-[12.5px] font-semibold leading-tight text-ink">{s.title}</p>
              <p className="text-[11px] leading-snug text-slatey-400">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Accountability pillars */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {governance.pillars.map((p, i) => (
            <div
              key={p.title}
              className="reveal card card-hover p-7"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-500">
                <Icon name={p.icon as IconName} size={24} />
              </span>
              <h3 className="mt-5 font-display text-[19px] text-ink">{p.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-slatey-500">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
