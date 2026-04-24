"use client";
// [NOVO v1.1] — Lógica do carousel extraída do componente HeroSection
// [SOLID-S] — Única responsabilidade: controlar tempo e estado do slider
// [MELHORIA v1.2] — Lógica de RAF + timeout separada e testável

import { useCallback, useEffect, useState } from "react";
import { HERO_SLIDES } from "@/data/hero-slides";
import { HERO_SLIDE_INTERVAL_MS } from "@/domain/constants/wa";

interface UseHeroSliderReturn {
  /** Índice do slide atual */
  currentIndex: number;
  /** Progresso do slide atual (0–100) */
  progress: number;
  /** Vai para o slide seguinte */
  next: () => void;
  /** Vai para o slide anterior */
  prev: () => void;
  /** Vai para um slide específico */
  goTo: (index: number) => void;
  /** Total de slides */
  total: number;
}

/**
 * Gerencia o carousel do Hero com auto-avanço e barra de progresso.
 *
 * Antes (page.tsx): useState, useEffect e RAF espalhados no corpo do componente.
 * Agora: isolado e reutilizável em qualquer componente de slide.
 */
export function useHeroSlider(): UseHeroSliderReturn {
  const total = HERO_SLIDES.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  }, []);

  const next = useCallback(
    () => goTo((currentIndex + 1) % total),
    [currentIndex, goTo, total]
  );

  const prev = useCallback(
    () => goTo((currentIndex - 1 + total) % total),
    [currentIndex, goTo, total]
  );

  // Auto-avanço com barra de progresso via requestAnimationFrame
  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();
    let raf: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / HERO_SLIDE_INTERVAL_MS) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    const timer = setTimeout(next, HERO_SLIDE_INTERVAL_MS);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [currentIndex, next]);

  return { currentIndex, progress, next, prev, goTo, total };
}
