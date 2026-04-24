// [REFATORADO v1.1] — Entidades secundárias extraídas do page.tsx
// [SOLID-S] — Cada interface descreve um único conceito do domínio

import type { ElementType } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY
// ─────────────────────────────────────────────────────────────────────────────

/** Item da galeria de imagens */
export interface GalleryItem {
  id: number;
  /** URL da miniatura */
  thumb: string;
  /** URL da imagem em alta resolução (lightbox) */
  full: string;
  title: string;
  /** Categoria usada nos filtros (ex: "Operações", "Inspeção") */
  cat: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SOLUTION
// ─────────────────────────────────────────────────────────────────────────────

/** Solução por vertical de mercado */
export interface Solution {
  icon: ElementType;
  title: string;
  /** Cor de destaque do setor */
  accent: string;
  /** Clientes-alvo (ex: "Mineração · Portos · Presídios") */
  clients: string;
  /** Métrica principal de impacto (ex: "73%") */
  metric: string;
  /** Rótulo da métrica (ex: "redução de incidentes") */
  metricLabel: string;
  /** URL do vídeo de fundo da solução */
  videoSrc: string;
  /** Descrição longa da solução */
  desc: string;
  tags: string[];
  benefits: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// CASE STUDY
// ─────────────────────────────────────────────────────────────────────────────

/** Resultado individual de um case */
export interface CaseResult {
  icon: ElementType;
  label: string;
  value: string;
  desc: string;
}

/** Case de sucesso real */
export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  accent: string;
  location: string;
  period: string;
  /** Iniciais para avatar (ex: "VP") */
  logo: string;
  /** Badge de destaque (ex: "🏆 Case Real") */
  badge: string;
  /** URL da imagem principal do case */
  image: string;
  challenge: string;
  solution: string;
  /** Destaque em negrito com emoji (ex: "⚡ Flagrante ao vivo…") */
  highlight: string;
  results: CaseResult[];
  quote: string;
  quoteAuthor: string;
  quoteRole: string;
  /** Produtos utilizados no case */
  products: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// ISCA DIGITAL
// ─────────────────────────────────────────────────────────────────────────────

/** [MELHORIA v1.2] — Renomeado de "Isca" para "LeadMagnet" internamente,
 *  mas mantido como "Isca" no tipo público para não quebrar referências */
export interface Isca {
  icon: ElementType;
  /** Label de tag (ex: "Mais Baixado") */
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  desc: string;
  /** Texto do botão de CTA */
  cta: string;
  /** Mensagem pré-preenchida do WhatsApp */
  wa: string;
  accent: string;
  /** Badge de formato (ex: "Planilha Excel", "PDF 40 páginas") */
  badge: string;
  /** Frase de valor curta exibida no card */
  highlight: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

/** Item do menu de navegação */
export interface NavItem {
  label: string;
  href: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// STATIC CONTENT
// ─────────────────────────────────────────────────────────────────────────────

/** Estatística de mercado exibida na seção Mercado */
export interface MarketStat {
  v: string;
  label: string;
  icon: ElementType;
}

/** Etapa do processo "Como Funciona" */
export interface HowStep {
  n: string;
  title: string;
  icon: ElementType;
  desc: string;
}

/** Item do FAQ */
export interface FaqItem {
  q: string;
  a: string;
}

/** Linha do comparativo humano vs drone */
export interface ComparativoRow {
  criterio: string;
  humano: string;
  drone: string;
  melhor: "drone" | "humano";
}
