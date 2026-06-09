import { janani } from "@/lib/content";
import { StatCard } from "@/components/ui/StatCard";
import { Icon } from "@/components/ui/Icon";

export function Janani() {
  return (
    <section id="janani" className="section bg-white">
      <div className="container-x">
        {/* Heading block (left aligned, project style) */}
        <div className="reveal max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-600">
            {janani.tag}
          </span>
          <h2 className="mt-4 font-display text-[34px] leading-tight text-ink sm:text-[44px]">
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
              <StatCard key={n.label} value={n.value} label={n.label} tint={n.tint as any} />
            ))}
          </div>
        </div>

        {/* Two-column: tech list + quote */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="reveal">
            <h3 className="font-display text-[22px] text-ink">{janani.techTitle}</h3>
            <ul className="mt-5">
              {janani.tech.map((t, i) => (
                <li
                  key={t}
                  className="flex items-start gap-4 border-b border-line py-4 last:border-b-0"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                    <span className="num" style={{ fontSize: "12px", lineHeight: "16px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="pt-1 text-[14.5px] leading-snug text-slatey-600">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Validation quote card */}
          <div className="reveal" style={{ transitionDelay: "120ms" }}>
            <div
              className="relative h-full overflow-hidden rounded-2xl border border-line p-8 text-slatey-600 shadow-soft"
              style={{
                background:
                  "linear-gradient(150deg,#ffffff 0%,#f7f8fb 60%,#fdf2f6 100%)",
              }}
            >
              <span className="font-display text-[64px] leading-none text-brand-300">&ldquo;</span>
              <p className="-mt-4 font-display text-[20px] leading-snug text-ink">
                {janani.quote}
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-400 text-amber-900">
                  <Icon name="award" size={18} />
                </span>
                <span className="text-[13px] font-medium text-slatey-600">
                  Government validated &amp; field tested
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
