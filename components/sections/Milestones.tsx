import { about } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

export function Milestones() {
  return (
    <section className="section bg-mist">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <span className="eyebrow">{about.milestonesTitle}</span>
          <h2 className="mt-4 font-display text-[34px] leading-tight text-ink sm:text-[44px]">
            {about.milestonesHeading}
          </h2>
        </div>

        <ol className="reveal relative mt-12 max-w-2xl border-l border-line pl-8">
          {about.milestones.map((m, i) => (
            <li key={m.text} className="relative pb-8 last:pb-0">
              {/* node */}
              <span className="absolute -left-[41px] top-0.5 grid h-5 w-5 place-items-center rounded-full border-2 border-brand-500 bg-white">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-500">
                Milestone {String(i + 1).padStart(2, "0")} · {m.year}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2.5">
                <h3 className="text-[15.5px] font-semibold text-ink">{m.text}</h3>
                {m.status && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
                    <Icon name="spark" size={11} />
                    {m.status}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
