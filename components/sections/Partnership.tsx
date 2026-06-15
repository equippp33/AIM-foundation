import { partnership } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { FundButton } from "@/components/ui/FundButton";

export function Partnership() {
  return (
    <section id="partnership" className="section bg-white">
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
              className={`reveal relative overflow-hidden rounded-2xl shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
                tier.featured ? "bg-gradient-to-br from-brand-500 to-brand-600" : "bg-white"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {tier.featured && (
                <span className="absolute right-5 top-5 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-600">
                  Flagship
                </span>
              )}

              <div className="p-8">
                <span
                  className={`text-[12px] font-semibold uppercase tracking-[0.16em] ${
                    tier.featured ? "text-white/70" : "text-slatey-400"
                  }`}
                >
                  {tier.tag}
                </span>
                <p className={`num mt-2 ${tier.featured ? "text-white" : "text-ink"}`}>{tier.amount}</p>
                <p
                  className={`mt-2 text-[15px] leading-relaxed ${
                    tier.featured ? "text-white/85" : "text-slatey-500"
                  }`}
                >
                  {tier.pitch}
                </p>

                <ul className="mt-6 space-y-3">
                  {tier.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                          tier.featured ? "bg-white/20 text-white" : "bg-brand-50 text-brand-500"
                        }`}
                      >
                        <Icon name="check" size={13} />
                      </span>
                      <span
                        className={`text-[14px] leading-snug ${
                          tier.featured ? "text-white/90" : "text-slatey-600"
                        }`}
                      >
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>

                <FundButton
                  program={tier.program}
                  className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-all duration-300 active:scale-[0.98] ${
                    tier.featured
                      ? "bg-white text-brand-600 hover:bg-white/90"
                      : "border border-line bg-white text-ink hover:border-brand-300 hover:text-brand-600"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
