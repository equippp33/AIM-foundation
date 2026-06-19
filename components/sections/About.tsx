import { about } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { LeadershipCarousel } from "@/components/sections/LeadershipCarousel";

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slatey-400">
      {children}
    </p>
  );
}

function InfoCard({
  title,
  body,
  accent,
}: {
  title: string;
  body: string;
  accent: "brand" | "green";
}) {
  const bar = accent === "green" ? "from-emerald-400 to-emerald-600" : "from-brand-400 to-brand-600";
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-[0_2px_14px_rgba(16,34,63,0.05)]">
      <span className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${bar}`} />
      <h3 className="font-display text-[18px] font-bold text-ink">{title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-slatey-500">{body}</p>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="section bg-white">
      <div className="container-x">
        {/* Centered section header */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">{about.eyebrow}</span>
          <h2 className="mt-3 font-display text-[34px] font-bold leading-[1.1] text-ink sm:text-[42px]">
            {about.title}
          </h2>
          <span className="heading-underline" />
        </div>

        {/* Paragraphs — full width, side by side */}
        <div className="reveal mt-14 grid gap-8 lg:grid-cols-2 lg:gap-16">
          {about.paragraphs.map((p) => (
            <p key={p} className="text-[16px] leading-relaxed text-slatey-600">
              {p}
            </p>
          ))}
        </div>

        {/* Row 2 — mission/vision | leadership carousel */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div className="reveal space-y-5">
            <InfoCard title={about.mission.title} body={about.mission.body} accent="brand" />
            <InfoCard title={about.vision.title} body={about.vision.body} accent="green" />
          </div>

          <div className="reveal">
            <ColumnLabel>{about.leadershipTitle}</ColumnLabel>
            <div className="mt-4">
              <LeadershipCarousel leaders={about.leadership} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-line lg:mt-20" />

        {/* Row 2 — "Where we stand" | milestones timeline */}
        <div className="mt-12 grid gap-12 lg:mt-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="reveal">
            <span className="eyebrow">{about.milestonesEyebrow}</span>
            <h2 className="mt-3 font-display text-[30px] font-bold leading-tight text-ink sm:text-[36px]">
              {about.milestonesHeading}
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-slatey-500">
              {about.milestonesIntro}
            </p>
          </div>

          <ol className="reveal" style={{ transitionDelay: "100ms" }}>
            {about.milestones.map((m) => {
              const inProgress = Boolean(m.status);
              return (
                <li
                  key={m.text}
                  className="flex items-start gap-4 border-t border-line py-5 first:border-t-0 first:pt-0"
                >
                  {/* status dot */}
                  <span
                    className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                      inProgress ? "bg-emerald-500" : "bg-brand-500"
                    }`}
                  />
                  {/* code chip */}
                  <span
                    className={`mt-0.5 inline-flex shrink-0 items-center rounded-md px-2.5 py-1 text-[11px] font-bold leading-none ${
                      inProgress ? "bg-brand-500 text-white" : "bg-ink text-white"
                    }`}
                  >
                    {m.year}
                  </span>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {m.url ? (
                      <a
                        href={m.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-[14.5px] font-semibold leading-snug text-ink hover:text-brand-600 transition-colors"
                      >
                        {m.text}
                        <Icon name="external-link" size={12} className="text-brand-400 group-hover:text-brand-600 transition-colors" />
                      </a>
                    ) : (
                      <p className="text-[14.5px] font-semibold leading-snug text-ink">{m.text}</p>
                    )}
                    {m.status && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                        <Icon name="spark" size={11} />
                        {m.status}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
