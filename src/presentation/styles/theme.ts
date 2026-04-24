// 📁 src/presentation/styles/theme.ts
// [CORRIGIDO v2.2] — T restaurado: é usado por primitives.tsx (T.h2, T.bodyMd).
// ROUNDED continua removido: primitives.tsx usa ROUNDED_MAP local, não importa ROUNDED.

import { C } from "@/domain/constants/design-tokens";

// ─────────────────────────────────────────────────────────────────────────────
// TIPOGRAFIA — classes reutilizáveis
// Usado por: primitives.tsx (SectionHeading)
// ─────────────────────────────────────────────────────────────────────────────
export const T = {
  h1:      "hn font-black uppercase leading-[0.84] tracking-tight",
  h2:      "hn font-black uppercase leading-[0.88]",
  h3:      "hn font-black uppercase",
  body:    "text-base sm:text-lg leading-relaxed",
  bodyMd:  "text-[14px] leading-relaxed",
  bodySm:  "text-[12px] sm:text-[13px] leading-relaxed",
  bodyXs:  "text-[11px] leading-relaxed",
  label:   "text-[10px] font-extrabold uppercase tracking-[0.38em]",
  labelSm: "text-[9px] font-extrabold uppercase tracking-[0.44em]",
  mono:    "font-mono text-[10px]",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// ESPAÇAMENTO DE SEÇÃO
// Usado por: primitives.tsx (Section)
// ─────────────────────────────────────────────────────────────────────────────
export const SECTION_PY    = "py-14 sm:py-24" as const;
export const SECTION_PY_LG = "py-14 sm:py-28" as const;

// ─────────────────────────────────────────────────────────────────────────────
// BACKGROUNDS
// Usado por: primitives.tsx (Section, BG_MAP)
// ─────────────────────────────────────────────────────────────────────────────
export const BG = {
  light:  C.light100,
  light2: C.light200,
  navy:   C.navy900,
  navyMd: C.navy800,
  navyDk: C.navy950,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// BUTTON — tokens de estilo por variante e tamanho
// Usado por: Button.tsx
// ─────────────────────────────────────────────────────────────────────────────
export const BTN_BASE =
  "inline-flex items-center justify-center gap-2 font-extrabold uppercase transition-all rounded-xl shrink-0 cursor-pointer" as const;

export const BTN_SIZE = {
  xs: "px-3.5 py-2    text-[9px]  tracking-[0.2em]",
  sm: "px-4   py-2.5  text-[10px] tracking-[0.2em]",
  md: "px-6   py-3    text-[11px] tracking-[0.24em]",
  lg: "px-7   py-3.5  text-[11px] tracking-[0.26em]",
  xl: "px-8 sm:px-10 py-4 sm:py-5 text-[12px] sm:text-[13px] tracking-[0.22em] sm:tracking-[0.28em]",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// CARD — tokens de fundo e borda por variante
// Usado por: primitives.tsx (Card)
// ─────────────────────────────────────────────────────────────────────────────
export const CARD = {
  light: {
    background: C.light100,
    border: `1px solid ${C.bLight}`,
    shadow: C.shadow,
  },
  light2: {
    background: C.light200,
    border: `1px solid ${C.bLight}`,
    shadow: "none",
  },
  dark: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.07)",
    shadow: "none",
  },
  glass: {
    background: "rgba(5,9,26,0.88)",
    border: "1px solid rgba(255,255,255,0.07)",
    backdropFilter: "blur(32px)",
    shadow: "none",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// CORES DE TEXTO
// ─────────────────────────────────────────────────────────────────────────────
export const TEXT = {
  primary:    C.ink900,
  secondary:  C.ink500,
  muted:      C.ink400,
  dPrimary:   "#ffffff",
  dSecondary: "rgba(255,255,255,0.50)",
  dMuted:     "rgba(255,255,255,0.38)",
  dFaint:     "rgba(255,255,255,0.20)",
  orange:     C.orange,
  green:      "#25d366",
} as const;
