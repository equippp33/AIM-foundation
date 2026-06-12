import { impact } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";

const tintBg: Record<string, string> = {
  brand: "bg-brand-50 text-brand-500",
  green: "bg-emerald-50 text-emerald-500",
  blue: "bg-sky-50 text-sky-600",
};

export function Impact() {
  return (
    <section id="impact" className="section bg-white">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <span className="eyebrow">{impact.eyebrow}</span>
          <h2 className="mt-4 font-display text-[34px] leading-tight text-ink sm:text-[44px]">
            {impact.title}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-slatey-500">{impact.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {impact.pillars.map((p, i) => (
            <div
              key={p.title}
              className="reveal card card-hover flex flex-col p-7"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className={`grid h-12 w-12 place-items-center rounded-xl ${tintBg[p.tint]}`}>
                  <Icon name={p.icon as IconName} size={24} />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slatey-400">
                  {String(i + 1).padStart(2, "0")} / Impact
                </span>
              </div>
              <h3 className="mt-5 font-display text-[21px] text-ink">{p.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-slatey-500">{p.desc}</p>
              <span className="mt-5 h-[3px] w-12 rounded-full bg-gradient-to-r from-brand-500 to-coral-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
