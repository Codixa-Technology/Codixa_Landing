import { JetBrains_Mono, Manrope, Noto_Sans_Armenian } from "next/font/google";

/**
 * Brand typefaces (brand book p.09): Manrope for headings, body and UI;
 * JetBrains Mono for labels, numbers and code. Neither covers Armenian
 * script, so Noto Sans Armenian is chained as the per-glyph fallback — the
 * browser downloads it only on pages that contain Armenian characters.
 * All three are self-hosted at build time (no requests to Google).
 */
export const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains",
  preload: false,
});

export const armenian = Noto_Sans_Armenian({
  subsets: ["armenian"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-armenian",
  preload: false,
});

export const fontVariables = `${manrope.variable} ${jetbrains.variable} ${armenian.variable}`;
