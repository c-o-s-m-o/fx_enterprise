"use client";
// [NOVO v1.1] — Hook de scroll extraído dos vários componentes que o duplicavam
// [MELHORIA v1.2] — Antes estava repetido em Navbar, ProductPage e HeroSection
// Camada: presentation/hooks — lógica de UI pura, sem dependência de domínio

import { useEffect, useState } from "react";

/**
 * Retorna `true` quando o usuário rolou além de `threshold` px.
 * Usado para mudar o estilo da navbar (transparente → sólida).
 *
 * @param threshold Pixels de scroll para ativar. Default: 60.
 */
export function useScrolled(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}
