import { about, collaborators } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

const avatarColor: Record<string, string> = {
  brand: "bg-brand-500",
  green: "bg-emerald-500",
  blue: "bg-sky-600",
};

export function About() {
  return (
    <section id="about" className="section bg-white">
      <div className="container-x">
        {/* Centered heading */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">{about.eyebrow}</span>
          <h2 className="mt-3 font-display text-[34px] leading-tight text-ink sm:text-[42px]">
            {about.title}
          </h2>
          <div className="heading-underline" />
        </div>

        {/* Collaborators strip */}
        <div className="reveal mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slatey-400">
            In collaboration with
          </span>
          {collaborators.map((c) => (
            <span key={c} className="text-[12.5px] font-medium text-slatey-500">
              {c}
            </span>
          ))}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <div className="reveal">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="mb-5 text-[16px] leading-relaxed text-slatey-500">
                {p}
              </p>
            ))}

            <div className="mt-8 space-y-4">
              <div className="rounded-lg border border-line bg-brand-50/60 p-5 [border-left-width:4px] !border-l-brand-500">
                <h3 className="font-display text-[18px] text-ink">{about.premise.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slatey-500">
                  {about.premise.body}
                </p>
              </div>
              <div className="rounded-lg border border-line bg-emerald-50/60 p-5 [border-left-width:4px] !border-l-emerald-500">
                <h3 className="font-display text-[18px] text-ink">{about.approach.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slatey-500">
                  {about.approach.body}
                </p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="reveal" style={{ transitionDelay: "120ms" }}>
            <h3 className="font-display text-[22px] text-ink">{about.leadershipTitle}</h3>
            <div className="mt-5 space-y-3">
              {about.leadership.map((person) => (
                <div
                  key={person.name}
                  className="card card-hover flex items-start gap-4 px-5 py-4"
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-[16px] font-semibold text-white ${
                      avatarColor[person.color]
                    }`}
                  >
                    {person.initial}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{person.name}</p>
                    <p className="text-[12.5px] font-medium text-brand-500">{person.role}</p>
                    <p className="mt-1 text-[13px] leading-snug text-slatey-500">
                      {person.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Milestones */}
            <h3 className="mt-9 font-display text-[22px] text-ink">{about.milestonesTitle}</h3>
            <ul className="mt-5 space-y-3">
              {about.milestones.map((m) => (
                <li key={m.text} className="flex items-center gap-3">
                  <span className="grid h-7 min-w-[48px] place-items-center rounded-full bg-brand-50 px-2 text-brand-600">
                    <span className="num" style={{ fontSize: "11px", lineHeight: "14px" }}>
                      {m.year}
                    </span>
                  </span>
                  <span className="flex-1 text-[13.5px] text-slatey-600">{m.text}</span>
                  {m.status && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                      <Icon name="spark" size={11} />
                      {m.status}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
