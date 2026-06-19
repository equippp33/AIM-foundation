import Image from "next/image";
import { programsIntro, programs } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { FundButton } from "@/components/ui/FundButton";

type Accent = "brand" | "green";

const ACCENT: Record<
  Accent,
  { label: string; value: string; link: string; panel: string; chip: string }
> = {
  brand: {
    label: "text-brand-600",
    value: "text-brand-600",
    link: "text-brand-600 hover:text-brand-700",
    panel: "from-brand-50 to-mist",
    chip: "text-brand-500",
  },
  green: {
    label: "text-emerald-600",
    value: "text-emerald-600",
    link: "text-emerald-600 hover:text-emerald-700",
    panel: "from-emerald-50 to-mist",
    chip: "text-emerald-500",
  },
};

type Program = {
  id: string;
  accent: Accent;
  icon: IconName;
  label: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  imagePosition?: string;
  caption?: string;
  metrics: { value: string; label: string }[];
};

const PROGRAMS: Program[] = [
  {
    ...(programs[0] as Program),
    imagePosition: "object-top",
    caption: "Beneficiary — Janani Mitra pilot cohort, Andhra Pradesh",
  },
  {
    ...(programs[1] as Program),
    imagePosition: "object-center",
    caption: "Inauguration — Centre for Microbiome Research India, AIG Hospitals",
  },
];

function ProgramVisual({ program }: { program: Program }) {
  const a = ACCENT[program.accent];
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-line shadow-card">
      {program.image ? (
        <>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={program.image}
              alt={program.name}
              fill
              className={`object-cover ${program.imagePosition ?? "object-center"}`}
              sizes="(min-width:1024px) 50vw, 100vw"
            />
          </div>
          {program.caption && (
            <div className="border-t border-line bg-white/90 px-4 py-2.5 backdrop-blur-sm">
              <p className="text-[11.5px] font-medium leading-snug text-slatey-400">
                {program.caption}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className={`aspect-[4/3] grid place-items-center bg-gradient-to-br ${a.panel}`}>
          <div className="flex flex-col items-center text-center">
            <span className={`grid h-16 w-16 place-items-center rounded-full bg-white/80 shadow-soft ${a.chip}`}>
              <Icon name={program.icon} size={28} />
            </span>
            <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-slatey-400">
              Program photo
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ProgramRow({ program, index }: { program: Program; index: number }) {
  const a = ACCENT[program.accent];
  const imageRight = index % 2 === 1;

  return (
    <div
      id={program.id}
      className="reveal grid scroll-mt-24 items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16"
    >
      {/* Visual */}
      <div className={imageRight ? "lg:order-2" : ""}>
        <ProgramVisual program={program} />
      </div>

      {/* Content */}
      <div className={imageRight ? "lg:order-1" : ""}>
        <p className={`text-[12px] font-semibold uppercase tracking-[0.18em] ${a.label}`}>
          {program.label}
        </p>
        <h3 className="mt-1.5 font-display text-[30px] font-bold leading-tight text-ink sm:text-[34px]">
          {program.name}
        </h3>
        <p className="mt-1.5 text-[16px] font-medium text-slatey-600">{program.tagline}</p>

        <p className="mt-5 text-[15.5px] leading-relaxed text-slatey-500">{program.description}</p>

        {/* Metrics */}
        <div className="mt-7 grid grid-cols-3 gap-5">
          {program.metrics.map((m) => (
            <div key={m.label}>
              <span className={`num ${a.value}`} style={{ fontSize: "26px", lineHeight: "30px" }}>
                {m.value}
              </span>
              <p className="mt-1 text-[12px] leading-snug text-slatey-400">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Learn more */}
        <div className="mt-7 border-t border-line pt-5">
          <FundButton
            program={program.id === "janani" ? "JANANI_MITRA" : "MAP_AP"}
            label="Support"
            className={`inline-flex items-center gap-1.5 text-[14px] font-semibold transition-colors ${a.link}`}
          />
        </div>
      </div>
    </div>
  );
}

export function Programs() {
  return (
    <section id="programs" className="section bg-white">
      <div className="container-x">
        {/* Intro */}
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">{programsIntro.eyebrow}</span>
          <h2 className="mt-3 font-display text-[34px] font-bold leading-[1.1] text-ink sm:text-[44px]">
            {programsIntro.title}
          </h2>
        </div>

        {/* Alternating program rows, separated by hairline rules */}
        <div className="mt-12 divide-y divide-line border-t border-line lg:mt-14">
          {PROGRAMS.map((program, i) => (
            <ProgramRow key={program.id} program={program} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
