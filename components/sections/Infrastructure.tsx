import { infrastructure } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";

export function Infrastructure() {
  return (
    <section id="infrastructure" className="section bg-white">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <span className="eyebrow">{infrastructure.eyebrow}</span>
          <h2 className="mt-4 font-display text-[34px] leading-tight text-ink sm:text-[44px]">
            {infrastructure.title}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-slatey-500">
            {infrastructure.body}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {infrastructure.features.map((f, i) => (
            <div
              key={f.title}
              className="reveal card card-hover p-7"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-500">
                  <Icon name={f.icon as IconName} size={24} />
                </span>
                <span className="num text-slatey-400/60" style={{ fontSize: "15px", lineHeight: "18px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-[16px] font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slatey-500">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal mt-8 flex flex-wrap gap-2.5">
          {infrastructure.badges.map((b) => (
            <span
              key={b}
              className="rounded-full border border-line bg-mist px-4 py-1.5 text-[12px] font-medium text-slatey-600"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
