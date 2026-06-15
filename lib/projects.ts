/**
 * Single source of truth for the foundation's programs.
 *
 * `code` is the value stored in the DB — it matches the Postgres enum
 * `project_type` ('JANANI_MITRA' | 'MAP_AP'). `label` is what humans see
 * (form cards, emails, dashboard). Always store the code, always display the
 * label via `projectLabel()`.
 */

export const PROJECTS = [
  {
    code: "JANANI_MITRA",
    label: "Janani Mitra",
    amount: "₹1 Crore",
    desc: "Scale AI-maternal health to 1,00,000 women.",
  },
  {
    code: "MAP_AP",
    label: "MAP-AP",
    amount: "₹30 Lakhs",
    desc: "Unlock India's first rural gut microbiome database.",
  },
] as const;

export type ProjectCode = (typeof PROJECTS)[number]["code"];

export const PROJECT_CODES: ProjectCode[] = PROJECTS.map((p) => p.code);

const LABEL_BY_CODE: Record<string, string> = Object.fromEntries(
  PROJECTS.map((p) => [p.code, p.label])
);

/** Turn a stored enum code into its display label (falls back to the raw value). */
export function projectLabel(code: string | null | undefined): string {
  if (!code) return "";
  return LABEL_BY_CODE[code] ?? code;
}

/** Whether a string is one of the valid enum codes. */
export function isProjectCode(value: string): value is ProjectCode {
  return (PROJECT_CODES as string[]).includes(value);
}
