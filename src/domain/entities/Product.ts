// [REFATORADO v1.1] — Entidade Product extraída do page.tsx monolítico
// [SOLID-S] — Tipo isolado: única razão de mudança é alteração no modelo de produto
// Camada: domain/entities — não importa NADA externo

import type { ElementType } from "react";

/** Highlight numérico exibido na barra colorida abaixo do hero do produto */
export interface ProductHighlight {
  icon: ElementType;
  value: string;
  unit: string;
  label: string;
}

/** Capacidade técnica com ícone, título e descrição */
export interface ProductCapability {
  icon: ElementType;
  label: string;
  desc: string;
}

/** Linha de especificação técnica (chave → valor) */
export interface SpecItem {
  k: string;
  v: string;
}

/** Grupo de specs agrupados por tema (ex: "Câmera Térmica") */
export interface SpecGroup {
  group: string;
  items: SpecItem[];
}

/** Caso de uso / aplicação real do produto */
export interface UseCase {
  icon: ElementType;
  title: string;
  desc: string;
}

/**
 * [MELHORIA v1.2] — Interface Product completa com JSDoc
 * Representa um produto DJI Enterprise na plataforma Aero Drone Solutions
 */
export interface Product {
  /** Identificador único usado para roteamento SPA */
  id: string;
  /** Nome completo (ex: "DJI Dock 3 + Matrice 4TD") */
  name: string;
  /** Nome curto para exibições compactas (ex: "Dock 3") */
  nameShort: string;
  /** Cor de destaque hex do produto — usada em badges, CTAs e destaques */
  accent: string;
  /** Categoria/segmento exibida como chip (ex: "Portátil · Térmico") */
  category: string;
  /** Tagline principal — frase de impacto */
  tagline: string;
  /** Tagline secundária — descrição técnica resumida */
  taglineSub: string;
  /** URL do vídeo MP4 para background do hero */
  videoSrc: string;
  /** URL da imagem poster do vídeo (fallback) */
  poster: string;
  /** Chips de spec exibidos no hero (separados por " · ") */
  heroDesc: string;
  /** Texto longo de visão geral do produto */
  overview: string;
  highlights: ProductHighlight[];
  capabilities: ProductCapability[];
  specs: SpecGroup[];
  useCases: UseCase[];
  /** URLs das imagens da galeria do produto */
  gallery: string[];
  /** Nota opcional de compatibilidade com Dock 3 */
  dockCompat?: string;
}
