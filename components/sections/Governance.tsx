import { governance } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";

export function Governance() {
  return (
    <section id="governance" className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow={governance.eyebrow}
          title={governance.title}
          subtitle={governance.intro}
        />

        {/* SDG badges */}
        <div className="reveal mt-10 flex flex-wrap items-stretch justify-center gap-3">
          {governance.sdgs.map((s) => (
            <div
              key={s.num}
              className="flex max-w-[200px] items-center gap-3 rounded-xl border border-line bg-mist px-4 py-3"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-coral-500 text-white">
                <span className="num" style={{ fontSize: "16px", lineHeight: "20px" }}>
                  {s.num}
                </span>
              </span>
              <div>
                <p className="text-[12.5px] font-semibold leading-tight text-ink">{s.title}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-slatey-400">{s.desc}</p>
              </div>
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
