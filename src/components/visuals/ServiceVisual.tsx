import type { ReactNode } from "react";
import type { ServiceSlug } from "@/content/types";
import styles from "./ServiceVisual.module.css";

/**
 * Schematic illustrations — abstract diagrams of what each service produces.
 * They are deliberately not product screenshots. Palette: graphite shapes,
 * hairline strokes, exactly one orange focal element (brand book p.06, p.10).
 */

const G = "#2A2A2D"; // graphite
const L = "#3A3A3F"; // hairline
const M = "#A19D98"; // mist
const O = "#FB4001"; // orange
const W = "#F8F7F5"; // paper

const bar = (x: number, y: number, w: number, h = 6, fill = L) => <rect x={x} y={y} width={w} height={h} rx={3} fill={fill} />;

const scenes: Record<ServiceSlug, ReactNode> = {
  "website-development": (
    <>
      <rect x="40" y="36" width="320" height="228" rx="10" fill="none" stroke={L} />
      <path d="M40 60h320" stroke={L} />
      <circle cx="56" cy="48" r="3" fill={L} />
      <circle cx="68" cy="48" r="3" fill={L} />
      <circle cx="80" cy="48" r="3" fill={L} />
      {bar(60, 78, 44, 6, M)}
      {bar(232, 78, 22)}
      {bar(262, 78, 22)}
      {bar(292, 78, 48)}
      <rect x="60" y="106" width="170" height="16" rx="4" fill={W} />
      <rect x="60" y="128" width="128" height="16" rx="4" fill={W} />
      {bar(60, 156, 150)}
      {bar(60, 168, 110)}
      <rect className={styles.focus} x="60" y="186" width="74" height="22" rx="5" fill={O} />
      <rect x="250" y="106" width="90" height="102" rx="8" fill={G} />
      <path d="M262 196 296 120l32 76z" fill={L} />
      <rect x="60" y="224" width="86" height="26" rx="6" fill={G} />
      <rect x="157" y="224" width="86" height="26" rx="6" fill={G} />
      <rect x="254" y="224" width="86" height="26" rx="6" fill={G} />
    </>
  ),
  "web-application-development": (
    <>
      <rect x="40" y="36" width="320" height="228" rx="10" fill="none" stroke={L} />
      <rect x="40" y="36" width="70" height="228" rx="10" fill={G} />
      {[64, 84, 104, 124].map((y) => (
        <rect key={y} x="54" y={y} width="42" height="7" rx="3.5" fill={L} />
      ))}
      <rect x="54" y="64" width="42" height="7" rx="3.5" fill={M} />
      {bar(126, 56, 90, 8, M)}
      <rect x="126" y="80" width="68" height="44" rx="6" fill="none" stroke={L} />
      <rect x="202" y="80" width="68" height="44" rx="6" fill="none" stroke={L} />
      <rect x="278" y="80" width="68" height="44" rx="6" fill="none" stroke={L} />
      {bar(136, 92, 30, 6, M)}
      {bar(212, 92, 30, 6, M)}
      {bar(288, 92, 30, 6, M)}
      {bar(136, 106, 44, 10, W)}
      {bar(212, 106, 36, 10, W)}
      {bar(288, 106, 40, 10, W)}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const h = [40, 62, 48, 86, 58, 72, 50][i];
        return (
          <rect
            key={i}
            className={i === 3 ? styles.focus : undefined}
            x={134 + i * 30}
            y={248 - h}
            width="18"
            height={h}
            rx="3"
            fill={i === 3 ? O : G}
          />
        );
      })}
      <path d="M126 248h220" stroke={L} />
    </>
  ),
  "ecommerce-development": (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={40 + i * 110} y="46" width="96" height="150" rx="10" fill="none" stroke={L} />
          <rect x={48 + i * 110} y="54" width="80" height="78" rx="6" fill={G} />
          <circle cx={88 + i * 110} cy="93" r="18" fill={L} />
          {bar(48 + i * 110, 144, 64, 7, M)}
          {bar(48 + i * 110, 158, 40)}
          <rect x={48 + i * 110} y="174" width="32" height="12" rx="3" fill={W} />
        </g>
      ))}
      <rect x="40" y="214" width="320" height="44" rx="10" fill={G} />
      {bar(58, 233, 90, 7, M)}
      <rect className={styles.focus} x="262" y="224" width="84" height="24" rx="6" fill={O} />
      <path d="M296 236h16m-5-5 5 5-5 5" stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "crm-development": (
    <>
      {[0, 1, 2].map((col) => (
        <g key={col}>
          <rect x={40 + col * 110} y="40" width="98" height="222" rx="10" fill="none" stroke={L} />
          {bar(52 + col * 110, 54, 46, 7, M)}
          {[0, 1, 2].slice(0, 3 - (col === 2 ? 1 : 0)).map((row) => (
            <g key={row}>
              <rect x={50 + col * 110} y={72 + row * 56} width="78" height="46" rx="6" fill={G} />
              {bar(58 + col * 110, 82 + row * 56, 50, 6, W)}
              {bar(58 + col * 110, 96 + row * 56, 34)}
              <circle cx={118 + col * 110} cy={106 + row * 56} r="5" fill={L} />
            </g>
          ))}
        </g>
      ))}
      <g className={styles.focus}>
        <rect x="160" y="206" width="78" height="46" rx="6" fill="#111" stroke={O} strokeWidth="1.5" />
        {bar(168, 216, 50, 6, W)}
        {bar(168, 230, 34, 6, O)}
        <path d="M152 198h10M152 198v10M246 260h-10M246 260v-10" stroke={O} strokeWidth="2" fill="none" />
      </g>
    </>
  ),
  "business-automation": (
    <>
      <path d="M100 90h60a20 20 0 0 1 20 20v40a20 20 0 0 0 20 20h40" stroke={L} strokeWidth="2" fill="none" />
      <path d="M100 210h60a20 20 0 0 0 20-20v-20" stroke={L} strokeWidth="2" fill="none" />
      <path d="M280 170h20a20 20 0 0 0 20-20V110" stroke={L} strokeWidth="2" fill="none" />
      <path d="M280 170h20a20 20 0 0 1 20 20v40" stroke={L} strokeWidth="2" fill="none" />
      <path className={styles.flow} d="M100 90h60a20 20 0 0 1 20 20v40a20 20 0 0 0 20 20h40" stroke={O} strokeWidth="2" fill="none" strokeDasharray="6 10" />
      <rect className={styles.focus} x="40" y="68" width="62" height="44" rx="8" fill={O} />
      <path d="m66 82-6 9h10l-6 9" stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="40" y="188" width="62" height="44" rx="8" fill={G} />
      <rect x="220" y="148" width="62" height="44" rx="8" fill="none" stroke={M} strokeWidth="1.5" />
      <path d="m240 170 7 7 13-13" stroke={W} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="298" y="70" width="62" height="40" rx="8" fill={G} />
      <rect x="298" y="230" width="62" height="40" rx="8" fill={G} />
      {bar(52, 206, 38)}
      {bar(310, 86, 38, 6, M)}
      {bar(310, 246, 38, 6, M)}
    </>
  ),
  "custom-software-development": (
    <>
      {[
        [60, 54],
        [270, 54],
        [60, 206],
        [270, 206],
        [165, 30],
        [165, 230],
      ].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x + 35} ${y + 20} L200 150`} stroke={L} strokeWidth="1.5" />
          <rect x={x} y={y} width="70" height="40" rx="8" fill={G} />
          {bar(x + 12, y + 12, 34, 6, M)}
          {bar(x + 12, y + 24, 22)}
        </g>
      ))}
      <rect className={styles.focus} x="160" y="118" width="80" height="64" rx="10" fill={O} />
      <path d="m186 140-8 10 8 10M214 140l8 10-8 10" stroke="#111" strokeWidth="2.25" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "ui-ux-design": (
    <>
      <rect x="44" y="40" width="150" height="222" rx="14" fill="none" stroke={L} />
      <rect x="58" y="58" width="122" height="70" rx="6" fill={G} />
      {bar(58, 142, 96, 8, W)}
      {bar(58, 158, 70)}
      {bar(58, 172, 110)}
      <rect x="58" y="196" width="122" height="26" rx="6" fill={G} />
      <rect x="58" y="230" width="122" height="18" rx="5" fill="none" stroke={L} />
      <g className={styles.focus}>
        <rect x="216" y="70" width="140" height="90" rx="6" fill="none" stroke={O} strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M208 62h14M208 62v14M364 168h-14M364 168v-14" stroke={O} strokeWidth="2.25" fill="none" />
        <rect x="232" y="88" width="72" height="9" rx="4" fill={W} />
        <rect x="232" y="104" width="104" height="6" rx="3" fill={M} />
        <rect x="232" y="128" width="58" height="18" rx="5" fill={O} />
      </g>
      <path d="M300 196l26 64 9-26 26-9z" fill={W} />
      {bar(216, 186, 54, 6)}
      {bar(216, 200, 34, 6)}
    </>
  ),
  "maintenance-support": (
    <>
      <rect x="40" y="40" width="320" height="100" rx="10" fill="none" stroke={L} />
      {bar(56, 56, 80, 7, M)}
      <circle cx="338" cy="60" r="5" fill={W} />
      {Array.from({ length: 28 }, (_, i) => (
        <rect key={i} x={56 + i * 10.6} y="80" width="6" height="42" rx="2" fill={i === 19 ? M : G} />
      ))}
      <rect x="40" y="156" width="320" height="104" rx="10" fill="none" stroke={L} />
      {bar(56, 172, 64, 7, M)}
      <path d="M56 236h288" stroke={L} />
      <path d="M56 230c26-2 40-24 64-22s30 18 54 14 32-34 58-36 36 14 60 10 30-12 52-14" stroke={G} strokeWidth="2" fill="none" />
      <path className={styles.focus} d="M56 222c26-4 40-20 64-18s30 10 54 4 32-20 58-20 36 6 60 2 30-8 52-8" stroke={O} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle className={styles.focus} cx="344" cy="182" r="5" fill={O} />
    </>
  ),
};

interface ServiceVisualProps {
  slug: ServiceSlug;
  label: string;
}

export function ServiceVisual({ slug, label }: ServiceVisualProps) {
  return (
    <figure className={styles.root}>
      <svg viewBox="0 0 400 300" role="img" aria-label={label} className={styles.svg}>
        {scenes[slug]}
      </svg>
      <span className={styles.cut} aria-hidden="true" />
    </figure>
  );
}
