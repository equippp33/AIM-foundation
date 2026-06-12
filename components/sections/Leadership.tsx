import { about } from "@/lib/content";

export function Leadership() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <span className="eyebrow">{about.leadershipTitle}</span>
          <h2 className="mt-4 font-display text-[34px] leading-tight text-ink sm:text-[44px]">
            {about.leadershipTitle}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {about.leadership.map((person, i) => (
            <div
              key={person.name}
              className="reveal card card-hover p-7"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-500 text-[14px] font-bold tracking-tight text-white">
                AIM
              </span>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-500">
                {person.role}
              </p>
              <h3 className="mt-1.5 text-[17px] font-semibold text-ink">{person.name}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-slatey-500">
                {person.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
