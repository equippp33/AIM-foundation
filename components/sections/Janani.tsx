import { janani } from "@/lib/content";
import { StatCard } from "@/components/ui/StatCard";
import { Icon } from "@/components/ui/Icon";

export function Janani() {
  return (
    <section id="janani" className="section bg-white">
      <div className="container-x">
        {/* Heading */}
        <div className="reveal max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
            {janani.tag}
          </span>
          <h2 className="mt-4 font-display text-[36px] leading-tight text-ink sm:text-[46px]">
            {janani.title}
          </h2>
          <p className="mt-1 text-[17px] font-medium text-slatey-600">{janani.subtitle}</p>
          <p className="mt-5 text-[16px] leading-relaxed text-slatey-500">{janani.intro}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-slatey-500">{janani.body}</p>
        </div>

        {/* Key numbers */}
        <div className="reveal mt-12">
          <h3 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-slatey-400">
            Key Numbers
          </h3>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {janani.numbers.map((n) => (
              <StatCard
                key={n.label}
                value={n.value}
                label={n.label}
                tint={n.tint as any}
                featured={(n as { featured?: boolean }).featured}
              />
            ))}
          </div>
        </div>

        {/* Technology pathway */}
        <div className="reveal mt-12">
          <h3 className="font-display text-[22px] text-ink">{janani.techTitle}</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {janani.tech.map((t, i) => (
              <div
                key={t}
                className="flex items-start gap-4 rounded-xl border border-line bg-white p-5 shadow-card"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                  <span className="num" style={{ fontSize: "12px", lineHeight: "16px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className="pt-1 text-[14.5px] leading-snug text-slatey-600">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Government validation banner */}
        <div className="reveal mt-10 flex items-center gap-4 rounded-2xl border border-brand-200 bg-brand-50 px-6 py-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
            <Icon name="check" size={20} />
          </span>
          <p className="text-[14.5px] leading-snug text-ink">
            <span className="font-semibold">Government validation</span> — {janani.quote}
          </p>
        </div>
      </div>
    </section>
  );
}
