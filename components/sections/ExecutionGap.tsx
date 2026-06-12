import { impact } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";

export function ExecutionGap() {
  const { gap } = impact;
  return (
    <section className="section bg-mist">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <span className="eyebrow">{gap.eyebrow}</span>
          <h2 className="mt-4 font-display text-[34px] leading-tight text-ink sm:text-[44px]">
            {gap.title}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-slatey-500">{gap.body}</p>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-2">
          {/* Left — flow */}
          <div className="reveal flex flex-col gap-3">
            {gap.flow.map((step, i) => (
              <div key={step} className="flex flex-col items-stretch">
                <div className="flex items-center gap-4 rounded-xl border border-line bg-white px-5 py-4 shadow-card">
                  <span className="num text-brand-500" style={{ fontSize: "13px", lineHeight: "16px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-semibold text-ink">{step}</span>
                </div>
                {i < gap.flow.length - 1 && (
                  <span className="my-1 flex justify-center text-brand-400">
                    <Icon name="arrow-down" size={16} />
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Right — gaps list */}
          <div className="reveal flex flex-col gap-3" style={{ transitionDelay: "120ms" }}>
            {gap.items.map((it) => (
              <div
                key={it.text}
                className="flex items-center gap-3 rounded-xl border border-line bg-white px-5 py-4 shadow-card"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-500">
                  <Icon name={it.icon as IconName} size={16} />
                </span>
                <span className="text-[14px] font-medium text-ink">{it.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
