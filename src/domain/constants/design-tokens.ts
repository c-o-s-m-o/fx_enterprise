// [REFATORADO v1.1] — Design tokens extraídos do escopo do componente
// [SOLID-S] — Única responsabilidade: definir a paleta de cores e sombras do sistema
// Camada: domain/constants — valores imutáveis, sem dependências

/**
 * Design system tokens da Aero Drone Solutions.
 * Centralizados aqui para garantir consistência visual em toda a aplicação.
 * Para mudar um tom, basta alterar este arquivo.
 */
export const C = {
  // ── Backgrounds Light ──────────────────────────────────────────────────────
  light100: "#ffffff",
  light200: "#f8fafc",
  light300: "#f1f5f9",
  light400: "#e2e8f0",

  // ── Backgrounds Dark / Navy ────────────────────────────────────────────────
  navy950: "#030712",
  navy900: "#05091a",
  navy800: "#080d24",
  navy700: "#0d1530",

  // ── Texto ──────────────────────────────────────────────────────────────────
  ink900: "#0f172a",
  ink700: "#1e293b",
  ink500: "#475569",
  ink400: "#64748b",
  ink300: "#94a3b8",

  // ── Accent — Laranja Aero Drone Solutions ────────────────────────────────────────────
  orange:    "#f97316",
  orangeD:   "#ea6c10",
  orangeL:   "#fed7aa",
  orangeBg:  "#fff7ed",

  // ── Bordas ─────────────────────────────────────────────────────────────────
  bLight:    "#e2e8f0",
  bLighter:  "#f1f5f9",

  // ── Sombras ────────────────────────────────────────────────────────────────
  shadow:   "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
  shadowMd: "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
  shadowLg: "0 8px 48px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)",
} as const;

/** Tipo utilitário para usar valores de C com type-safety */
export type DesignToken = typeof C;
