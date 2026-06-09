import type { SVGProps } from "react";

export type IconName =
  | "stethoscope"
  | "cpu"
  | "building"
  | "infinity"
  | "heart"
  | "users"
  | "flask"
  | "alert-triangle"
  | "map-pin-off"
  | "database-off"
  | "unlink"
  | "shield-check"
  | "eye"
  | "award"
  | "check"
  | "arrow-right"
  | "arrow-down"
  | "external-link"
  | "trending-up"
  | "phone"
  | "mail"
  | "map-pin"
  | "spark"
  | "menu"
  | "close"
  | "facebook"
  | "instagram"
  | "youtube"
  | "twitter"
  | "linkedin";

const paths: Record<IconName, JSX.Element> = {
  stethoscope: (
    <>
      <path d="M4 3v5a6 6 0 0 0 12 0V3" />
      <path d="M4 3H2m12 0h2M11 20a4 4 0 0 0 8 0v-3" />
      <circle cx="19" cy="14" r="2" />
    </>
  ),
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v2m6-2v2M9 20v2m6-2v2M2 9h2m-2 6h2m16-6h2m-2 6h2" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M10 21v-3a2 2 0 0 1 4 0v3" />
    </>
  ),
  infinity: (
    <path d="M6 9a3 3 0 1 0 0 6c2 0 3-2 6-2 1.5 0 3 1 4 1a3 3 0 1 0 0-6c-1 0-2.5 1-4 1-3 0-4-2-6-2Z" />
  ),
  heart: (
    <path d="M19.5 5.5a4.5 4.5 0 0 0-7.5 1.6A4.5 4.5 0 0 0 4.5 5.5C2.5 7.5 3 11 7 14.5l5 4.5 5-4.5c4-3.5 4.5-7 2.5-9Z" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.3A3 3 0 0 1 18 11m3 9a5 5 0 0 0-4-4.9" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />
      <path d="M7 15h10" />
    </>
  ),
  "alert-triangle": (
    <>
      <path d="M12 4 2.5 20h19L12 4Z" />
      <path d="M12 10v4m0 3h.01" />
    </>
  ),
  "map-pin-off": (
    <>
      <path d="M19 11c0 4-7 10-7 10s-2.2-1.9-4.2-4.6" />
      <path d="M9 4.5A7 7 0 0 1 19 11M3 3l18 18" />
    </>
  ),
  "database-off": (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3m8-3V5M3 3l18 18M4 12v6c0 1.7 3.6 3 8 3 1.6 0 3-.2 4.3-.5" />
    </>
  ),
  unlink: (
    <>
      <path d="M9.5 14.5 5.7 18.3a3.5 3.5 0 0 1-5-5l3.8-3.8M14.5 9.5l3.8-3.8a3.5 3.5 0 0 1 5 5l-3.8 3.8" />
      <path d="M8 3v2m-5 3h2m11 13v-2m5-3h-2" />
    </>
  ),
  "shield-check": (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m9 14-1.5 7L12 18l4.5 3L15 14" />
    </>
  ),
  check: <path d="m5 12 5 5L20 6" />,
  "arrow-right": <path d="M5 12h14m-6-6 6 6-6 6" />,
  "arrow-down": <path d="M12 5v14m-6-6 6 6 6-6" />,
  "external-link": (
    <>
      <path d="M15 3h6v6m-11 5L21 3" />
      <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
    </>
  ),
  "trending-up": (
    <>
      <path d="M3 17 9 11l4 4 8-8" />
      <path d="M16 7h5v5" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  spark: (
    <path d="M12 2v6m0 8v6m10-10h-6M8 12H2m15.1-5.1-4.2 4.2m-1.8 1.8-4.2 4.2m12 0-4.2-4.2m-1.8-1.8L6.9 6.9" />
  ),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  facebook: (
    <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5v4h3v8h4v-8h3l1-4h-4V7.5A.5.5 0 0 1 12.5 7H15V3Z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="m10 9 5 3-5 3V9Z" />
    </>
  ),
  twitter: (
    <path d="M4 4l7 9-7 7h2.5l5.6-5.6L16 20h4l-7.4-9.6L19 4h-2.5l-5.2 5.2L8 4H4Z" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4m-4-4v4" />
    </>
  ),
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 22, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
