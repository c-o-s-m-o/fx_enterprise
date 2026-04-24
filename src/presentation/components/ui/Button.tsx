import React, { ButtonHTMLAttributes, forwardRef, ElementType } from "react";
import { cn } from "./utils/cn";
import { C } from "@/domain/constants/design-tokens";
import { WA_NUMBER } from "@/domain/constants/wa";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "wa";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual do botão */
  variant?: ButtonVariant;
  /** Tamanho do botão */
  size?: ButtonSize;
  /** Cor de destaque (usada para variantes que dependem de accent) */
  accent?: string;
  /** Se o botão deve ocupar toda a largura */
  fullWidth?: boolean;
  /** Ícone à esquerda */
  iconLeft?: ElementType;
  /** Ícone à direita */
  iconRight?: ElementType;
  /** Tamanho do ícone (padrão 13) */
  iconSize?: number;
  /** URL para transformar o botão em link (aplica a mesma estilização) */
  href?: string;
  /** Abre o link em nova aba (quando href presente) */
  external?: boolean;
  /** Conteúdo do botão */
  children: React.ReactNode;
}

/**
 * Botão reutilizável com suporte a diferentes variantes, tamanhos e ícones.
 * Pode ser usado como link externo ou interno (via `href`).
 *
 * @example
 * <Button variant="primary" size="md">Clique aqui</Button>
 * <Button variant="wa" href="wa:..." external>WhatsApp</Button>
 * <Button iconLeft={ArrowLeft} iconRight={ArrowRight}>Navegar</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      accent = C.orange,
      fullWidth = false,
      iconLeft: IconLeft,
      iconRight: IconRight,
      iconSize = 13,
      href,
      external = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 font-extrabold uppercase transition-all rounded-xl shrink-0 cursor-pointer";

    const sizeClasses = {
      xs: "px-3.5 py-2 text-[9px] tracking-[0.2em]",
      sm: "px-4 py-2.5 text-[10px] tracking-[0.2em]",
      md: "px-6 py-3 text-[11px] tracking-[0.24em]",
      lg: "px-7 py-3.5 text-[11px] tracking-[0.26em]",
      xl: "px-8 sm:px-10 py-4 sm:py-5 text-[12px] sm:text-[13px] tracking-[0.22em] sm:tracking-[0.28em]",
    };

    // Classes de variante – usamos CSS custom properties para cores dinâmicas
    const variantClasses = {
      primary: "bg-[--accent] text-white hover:opacity-90",
      secondary: "bg-[--accent]/15 text-[--accent] border border-[--accent]/25 hover:opacity-90",
      outline: "bg-transparent text-slate-700 border-2 border-slate-200 hover:bg-gray-50",
      ghost: "bg-transparent text-white/55 border border-white/10 hover:border-white/25 hover:text-white",
      link: "bg-transparent text-[--accent] hover:opacity-75 p-0",
      wa: "bg-[#25d366] text-white hover:opacity-90",
    };

    // Se for link, renderiza <a> com as mesmas classes
    if (href) {
      const isWaLink = href.startsWith("wa:");
      const finalHref = isWaLink
        ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(href.slice(3))}`
        : href;

      return (
        <a
          href={finalHref}
          target={external || isWaLink ? "_blank" : undefined}
          rel={external || isWaLink ? "noopener noreferrer" : undefined}
          className={cn(
            baseClasses,
            sizeClasses[size],
            variantClasses[variant],
            fullWidth && "w-full",
            className
          )}
          style={{ "--accent": accent } as React.CSSProperties}
        >
          {IconLeft && <IconLeft size={iconSize} />}
          {children}
          {IconRight && (
            <IconRight
              size={iconSize}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          )}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          fullWidth && "w-full",
          className
        )}
        style={{ "--accent": accent } as React.CSSProperties}
        {...props}
      >
        {IconLeft && <IconLeft size={iconSize} />}
        {children}
        {IconRight && (
          <IconRight
            size={iconSize}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";