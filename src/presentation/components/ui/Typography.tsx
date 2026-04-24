import React, { ElementType, HTMLAttributes } from "react";
import { cn } from "./utils/cn";
import { C } from "@/domain/constants/design-tokens";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type TextVariant = "body" | "bodyMd" | "bodySm" | "bodyXs" | "label" | "labelSm" | "mono";
type ColorVariant = "primary" | "secondary" | "muted" | "white" | "orange" | "green" | "inherit";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Componente HTML ou elemento customizado */
  as?: ElementType;
  /** Variante de texto (determina tamanho e peso) */
  variant?: HeadingLevel | TextVariant;
  /** Cor do texto – usa tokens do tema */
  color?: ColorVariant;
  /** Se deve ser um texto com maiúsculas */
  uppercase?: boolean;
  /** Se deve ter tracking (letter-spacing) maior */
  tracking?: boolean;
  /** Conteúdo */
  children: React.ReactNode;
}

/**
 * Componente de tipografia padronizado.
 * Aplica classes pré-definidas para headings e textos comuns.
 *
 * @example
 * <Typography as="h2" variant="h2">Título</Typography>
 * <Typography variant="body" color="muted">Texto secundário</Typography>
 */
export const Typography = ({
  as: Component = "p",
  variant = "body",
  color = "primary",
  uppercase = false,
  tracking = false,
  children,
  className,
  ...props
}: TypographyProps) => {
  const variantClasses = {
    // Headings
    h1: "hn font-black uppercase leading-[0.84] tracking-tight text-[clamp(54px,10vw,110px)]",
    h2: "hn font-black uppercase leading-[0.88] text-3xl sm:text-5xl",
    h3: "hn font-black uppercase text-2xl sm:text-3xl",
    h4: "hn font-black uppercase text-xl sm:text-2xl",
    // Text bodies
    body: "text-base sm:text-lg leading-relaxed",
    bodyMd: "text-[14px] leading-relaxed",
    bodySm: "text-[12px] sm:text-[13px] leading-relaxed",
    bodyXs: "text-[11px] leading-relaxed",
    label: "text-[10px] font-extrabold uppercase tracking-[0.38em]",
    labelSm: "text-[9px] font-extrabold uppercase tracking-[0.44em]",
    mono: "font-mono text-[10px]",
  };

  const colorMap = {
    primary: C.ink900,
    secondary: C.ink500,
    muted: C.ink400,
    white: "#ffffff",
    orange: C.orange,
    green: "#25d366",
    inherit: "inherit",
  };

  const finalColor = colorMap[color];

  return (
    <Component
      className={cn(variantClasses[variant], uppercase && "uppercase", tracking && "tracking-wide", className)}
      style={{ color: finalColor }}
      {...props}
    >
      {children}
    </Component>
  );
};