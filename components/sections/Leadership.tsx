import Image from "next/image";
import { about } from "@/lib/content";

const BASE = "/images/support/public/images/contributers/";

// Photo map — null means show initials placeholder
const photoMap: Record<string, string | null> = {
  "Dr Rakesh Kalapala": `${BASE}Dr Rakesh Kalapala.jpg`,
  "Dr D. Nageshwar Reddy": `${BASE}Dr D. Nageshwar Reddy.jpg`,
  "Dr Santanu Chattopadhyay": `${BASE}Dr. Santanu Chattopadhyay.jpg`,
};

// Two-letter initials extracted from name
function initials(name: string): string {
  const parts = name.replace(/^Dr\.?\s+/, "").split(" ");
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

// Accent colour per person (matches content.ts `color` field)
const accentMap: Record<string, string> = {
  brand: "from-brand-500 to-brand-600",
  green: "from-emerald-500 to-emerald-600",
  blue: "from-sky-500 to-sky-600",
};

interface AvatarProps {
  name: string;
  color: string;
}

function Avatar({ name, color }: AvatarProps) {
  const src = photoMap[name];
  const gradient = accentMap[color] ?? accentMap.brand;

  return (
    // Ring + shadow wrapper — always exactly 96 × 96 px
    <div className="relative h-24 w-24 shrink-0 rounded-full ring-2 ring-white ring-offset-0 shadow-[0_4px_16px_rgba(0,0,0,0.13)]">
      {src ? (
        /* Real photo — object-top keeps face visible if image is tall */
        <Image
          src={src}
          alt={name}
          fill
          className="rounded-full object-cover object-top"
          sizes="96px"
          priority
        />
      ) : (
        /* Initials placeholder — branded gradient, identical shape */
        <div
          className={`flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br ${gradient}`}
        >
          <span className="select-none font-display text-[22px] font-bold tracking-tight text-white">
            {initials(name)}
          </span>
        </div>
      )}
    </div>
  );
}

export function Leadership() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        {/* Section heading */}
        <div className="reveal max-w-2xl">
          <span className="eyebrow">{about.leadershipTitle}</span>
          <h2 className="mt-4 font-display text-[34px] leading-tight text-ink sm:text-[44px]">
            {about.leadershipHeading}
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {about.leadership.map((person, i) => (
            <div
              key={person.name}
              className="reveal group flex flex-col rounded-2xl border border-line bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_8px_32px_rgba(14,165,233,0.12)]"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              {/* Avatar — sits at the top of the card, in normal flow */}
              <Avatar name={person.name} color={person.color} />

              {/* Role label */}
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-500">
                {person.role}
              </p>

              {/* Name */}
              <h3 className="mt-2 font-display text-[19px] font-bold leading-snug text-ink">
                {person.name}
              </h3>

              {/* Separator */}
              <span className="mt-4 block h-px w-10 rounded-full bg-brand-200 transition-all duration-300 group-hover:w-16 group-hover:bg-brand-400" />

              {/* Bio */}
              <p className="mt-4 flex-1 text-[13.5px] leading-[1.75] text-slatey-500">
                {person.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
