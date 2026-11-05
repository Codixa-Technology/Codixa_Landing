/**
 * Codixa line icons — brand spec (page 11): 24×24 grid, 2px live-area padding,
 * constant 1.75 stroke, round caps and joins, 2.5–3px corner radius.
 */
const paths = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M9 7h8v8" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  website: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18M6.5 6.75h.01M9 6.75h.01" />
    </>
  ),
  crm: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.6-3 2.8-4.75 5.5-4.75S13.9 16 14.5 19M15.5 5.75a3 3 0 0 1 0 5.5M17.5 14.6c1.6.6 2.6 2.1 3 4.4" />
    </>
  ),
  modules: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.2l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.45-1.12L20.5 7.5H6.1" />
      <circle cx="9.5" cy="19.5" r="1.25" />
      <circle cx="17" cy="19.5" r="1.25" />
    </>
  ),
  integrations: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
      <path d="M10 6.5h4.5a3 3 0 0 1 3 3V14M14 17.5H9.5a3 3 0 0 1-3-3V10" />
    </>
  ),
  design: (
    <>
      <path d="M4 20l1.2-4.6L15.6 5a2.1 2.1 0 0 1 3 0l.4.4a2.1 2.1 0 0 1 0 3L8.6 18.8 4 20Z" />
      <path d="M13.5 7.1l3.4 3.4" />
    </>
  ),
  settings: (
    <>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2.25" />
      <circle cx="9" cy="17" r="2.25" />
    </>
  ),
  data: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="2.75" />
      <path d="M4.5 6v12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75V6M4.5 12c0 1.5 3.4 2.75 7.5 2.75s7.5-1.25 7.5-2.75" />
    </>
  ),
  security: (
    <>
      <path d="M12 3.5 5 6v5.5c0 4.4 3 7.8 7 9 4-1.2 7-4.6 7-9V6l-7-2.5Z" />
      <path d="m9 12 2.2 2.2L15.2 10" />
    </>
  ),
  analytics: <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />,
  mobile: (
    <>
      <rect x="6.5" y="3" width="11" height="18" rx="2.5" />
      <path d="M11 17.5h2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.4-4.4" />
    </>
  ),
  rocket: (
    <>
      <path d="M12.5 15.5 8.5 11.5c1.5-4.5 5-7.5 11-8-.5 6-3.5 9.5-8 11Z" />
      <path d="M8.5 11.5 5 12l-1.5 3 4 .5M12.5 15.5 12 19l-3 1.5-.5-4" />
      <circle cx="15.25" cy="8.75" r="1.25" />
    </>
  ),
  users: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  building: (
    <>
      <rect x="4.5" y="3.5" width="10" height="17" rx="2" />
      <path d="M14.5 9.5h3.5a1.5 1.5 0 0 1 1.5 1.5v9.5M8 7.5h3M8 11h3M8 14.5h3M3 20.5h18" />
    </>
  ),
  growth: <path d="M3.5 17.5 9 12l3.5 3.5L20.5 7.5M15 7.5h5.5V13" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5S9.7 5.9 12 3.5Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.25" />
    </>
  ),
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5.5M12 16.5h.01" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 24, className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
