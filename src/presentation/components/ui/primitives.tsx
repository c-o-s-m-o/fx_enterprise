// 📁 src/presentation/components/ui/primitives.tsx
// [CORRIGIDO v2.2] — 3 bugs corrigidos:
//   1. import { ElementType } e import { Check } movidos para o topo (eram mid-file → erro TypeScript)
//   2. import ROUNDED removido (não existe em theme.ts; primitives usa ROUNDED_MAP local)
//   3. IconBox recebe prop bgColor para sobrescrever background sem precisar de `as any`

"use client";

import React, { FC, ReactNode, ElementType } from "react";
import { Check }        from "lucide-react";
import { C }            from "@/domain/constants/design-tokens";
import { SectionTag }   from "@/presentation/components/ui";
import { FadeUp }       from "@/presentation/components/ui";
import { SECTION_PY, CARD, BG, T } from "@/presentation/styles/theme";

// ─────────────────────────────────────────────────────────────────────────────
// Container — max-w-7xl mx-auto px-4 sm:px-6
// ─────────────────────────────────────────────────────────────────────────────
export interface ContainerProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

export const Container: FC<ContainerProps> = ({ children, className = "", narrow = false }) => (
  <div className={`${narrow ? "max-w-4xl" : "max-w-7xl"} mx-auto px-4 sm:px-6 ${className}`}>
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// Section — <section> com padding e background padronizados
// ─────────────────────────────────────────────────────────────────────────────
type SectionBg = keyof typeof BG | "transparent";

const BG_MAP: Record<SectionBg, string> = {
  light:       C.light100,
  light2:      C.light200,
  navy:        C.navy900,
  navyMd:      C.navy800,
  navyDk:      C.navy950,
  transparent: "transparent",
};

export interface SectionProps {
  children: ReactNode;
  id?: string;
  bg?: SectionBg;
  py?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Section: FC<SectionProps> = ({
  children, id, bg = "light2", py = SECTION_PY, className = "", style,
}) => (
  <section
    id={id}
    className={`${py} ${className}`}
    style={{ background: BG_MAP[bg], ...style }}
  >
    {children}
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// Card — container com variantes de fundo e borda
// ─────────────────────────────────────────────────────────────────────────────
type CardVariant = keyof typeof CARD;

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  rounded?: "md" | "lg" | "xl";
  style?: React.CSSProperties;
}

const ROUNDED_MAP = { md: "rounded-xl", lg: "rounded-2xl", xl: "rounded-3xl" };

export const Card: FC<CardProps> = ({
  children, variant = "light", className = "", onClick,
  hoverable = false, rounded = "lg", style,
}) => {
  const token = CARD[variant];
  const hoverClass = hoverable
    ? "group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    : "";

  return (
    <div
      className={`${ROUNDED_MAP[rounded]} overflow-hidden ${hoverClass} ${className}`}
      style={{
        background: token.background,
        border: token.border,
        boxShadow: token.shadow !== "none" ? token.shadow : undefined,
        ...("backdropFilter" in token ? { backdropFilter: (token as any).backdropFilter } : {}),
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SectionHeading — SectionTag + H2 + subtítulo opcional
// [CORRIGIDO v2.2] — T.h2 e T.bodyMd inlinados (T removido de theme.ts)
// ─────────────────────────────────────────────────────────────────────────────
interface SectionHeadingProps {
  tag: string;
  children: ReactNode;
  dark?: boolean;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const H_SIZE = {
  sm: "text-3xl sm:text-4xl",
  md: "text-3xl sm:text-5xl",
  lg: "text-4xl sm:text-5xl lg:text-6xl",
};

export const SectionHeading: FC<SectionHeadingProps> = ({
  tag, children, dark = false, subtitle,
  align = "center", className = "", size = "md",
}) => (
  <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
    <SectionTag label={tag} dark={dark} />
    <h2
      className={`${T.h2} ${H_SIZE[size]}`}
      style={{ color: dark ? "#ffffff" : C.ink900 }}
    >
      {children}
    </h2>
    {subtitle && (
      <p
        className={`mt-4 ${T.bodyMd}`}
        style={{ color: dark ? "rgba(255,255,255,0.42)" : C.ink400 }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// IconBox — container de ícone com accent color
// [ATUALIZADO v2.2] — aceita prop bgColor para sobrescrever o background
// ─────────────────────────────────────────────────────────────────────────────
export interface IconBoxProps {
  icon: ElementType;
  accent: string;
  bgOpacity?: string;
  /** Cor de background explícita — sobrescreve accent+bgOpacity quando fornecida */
  bgColor?: string;
  iconSize?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const IBOX_SIZE = {
  sm:  "w-7  h-7",
  md:  "w-10 h-10",
  lg:  "w-11 h-11 sm:w-12 sm:h-12",
};

export const IconBox: FC<IconBoxProps> = ({
  icon: Icon, accent, bgOpacity = "15", bgColor,
  iconSize = 18, size = "md", className = "",
}) => (
  <div
    className={`${IBOX_SIZE[size]} rounded-xl flex items-center justify-center shrink-0 ${className}`}
    style={{ background: bgColor ?? `${accent}${bgOpacity}` }}
  >
    <Icon size={iconSize} style={{ color: accent }} />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// AccentPill — tag colorida arredondada
// ─────────────────────────────────────────────────────────────────────────────
export interface AccentPillProps {
  accent: string;
  children: ReactNode;
  className?: string;
  variant?: "filled" | "outline";
}

export const AccentPill: FC<AccentPillProps> = ({
  accent, children, className = "", variant = "filled",
}) => (
  <span
    className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${className}`}
    style={
      variant === "filled"
        ? { background: `${accent}15`, color: accent }
        : { background: `${accent}10`, color: accent, border: `1px solid ${accent}25` }
    }
  >
    {children}
  </span>
);

// ─────────────────────────────────────────────────────────────────────────────
// CheckItem — item de lista com ícone de check laranja
// ─────────────────────────────────────────────────────────────────────────────
export interface CheckItemProps {
  title: string;
  desc: string;
}

export const CheckItem: FC<CheckItemProps> = ({ title, desc }) => (
  <div className="flex gap-3 p-4 rounded-xl border" style={{ background: C.light200, borderColor: C.bLight }}>
    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
      style={{ background: "rgba(249,115,22,0.15)" }}>
      <Check size={11} style={{ color: C.orange }} />
    </div>
    <div>
      <div className="text-[13px] font-bold mb-0.5" style={{ color: C.ink900 }}>{title}</div>
      <div className="text-[12px]" style={{ color: C.ink400 }}>{desc}</div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// FormField + inputs — formulário padronizado
// ─────────────────────────────────────────────────────────────────────────────
export interface FormFieldProps { label: string; children: ReactNode; }

export const FormField: FC<FormFieldProps> = ({ label, children }) => (
  <div>
    <label className="text-[10px] font-bold uppercase tracking-wider block mb-2"
      style={{ color: C.ink400 }}>
      {label}
    </label>
    {children}
  </div>
);

const INPUT_STYLE = { background: C.light200, borderColor: C.bLight, color: C.ink900 };
const INPUT_CLASS  = "w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-all";

interface TextInputProps     { placeholder: string; type?: string; }
interface SelectInputProps   { options: string[];   placeholder?: string; }
interface TextareaInputProps { placeholder: string; rows?: number; }

export const TextInput: FC<TextInputProps> = ({ placeholder, type = "text" }) => (
  <input type={type} placeholder={placeholder} className={INPUT_CLASS} style={INPUT_STYLE} />
);

export const SelectInput: FC<SelectInputProps> = ({ options, placeholder = "Selecione..." }) => (
  <select className={`${INPUT_CLASS} appearance-none cursor-pointer`}
    style={{ ...INPUT_STYLE, color: C.ink500 }}>
    <option>{placeholder}</option>
    {options.map(v => <option key={v}>{v}</option>)}
  </select>
);

export const TextareaInput: FC<TextareaInputProps> = ({ placeholder, rows = 3 }) => (
  <textarea rows={rows} placeholder={placeholder}
    className={`${INPUT_CLASS} resize-none`} style={INPUT_STYLE} />
);
