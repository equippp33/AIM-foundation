import { impact } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";

const tintBg: Record<string, string> = {
  brand: "bg-brand-50 text-brand-500",
  green: "bg-emerald-50 text-emerald-500",
  blue: "bg-sky-50 text-sky-600",
};

export function Impact() {
  return (
    <section id="impact" className="section bg-mist">
      <div className="container-x">
        <SectionHeading
          eyebrow={impact.eyebrow}
          title={impact.title}
          subtitle={impact.subtitle}
        />

        {/* Pillar cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {impact.pillars.map((p, i) => (
            <div
              key={p.title}
              className="reveal card card-hover p-7"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-xl ${tintBg[p.tint]}`}
              >
                <Icon name={p.icon as IconName} size={24} />
              </span>
              <h3 className="mt-5 font-display text-[20px] text-ink">{p.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-slatey-500">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Dark callout */}
        <div className="reveal mt-10 overflow-hidden rounded-2xl border border-line bg-white p-8 shadow-soft sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <h3 className="font-display text-[26px] text-ink">{impact.gap.title}</h3>
              <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-slatey-500">
                {impact.gap.body}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {impact.gap.items.map((it) => (
                <div
                  key={it.text}
                  className="flex items-center gap-3 rounded-xl border border-line bg-mist px-4 py-3"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-400/90 text-amber-900">
                    <Icon name={it.icon as IconName} size={16} />
                  </span>
                  <span className="text-[13px] font-medium text-ink">{it.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
