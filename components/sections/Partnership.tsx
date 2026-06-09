import { partnership } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

export function Partnership() {
  return (
    <section id="partnership" className="section bg-mist">
      <div className="container-x">
        <SectionHeading
          eyebrow={partnership.eyebrow}
          title={partnership.title}
          subtitle={partnership.subtitle}
        />

        <div className="mt-14 grid gap-7 lg:grid-cols-2">
          {partnership.tiers.map((tier, i) => (
            <div
              key={tier.tag}
              className="reveal relative overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              style={{ transitionDelay: `${i * 100}ms` }}
            >

              {tier.featured && (
                <span className="absolute right-5 top-5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-600">
                  Flagship
                </span>
              )}

              <div className="p-8">
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slatey-400">
                  {tier.tag}
                </span>
                <p className="num mt-2 text-ink">{tier.amount}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-slatey-500">{tier.pitch}</p>

                <ul className="mt-6 space-y-3">
                  {tier.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-500">
                        <Icon name="check" size={13} />
                      </span>
                      <span className="text-[14px] leading-snug text-slatey-600">{pt}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-all duration-300 active:scale-[0.98] ${
                    tier.featured
                      ? "bg-brand-500 text-white hover:bg-brand-600 hover:shadow-soft"
                      : "border border-line bg-white text-ink hover:border-brand-300 hover:text-brand-600"
                  }`}
                >
                  Fund this program
                  <Icon name="arrow-right" size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
