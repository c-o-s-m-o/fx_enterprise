// src/lib/recommendationRules.ts
import type { Product } from "@/domain/entities/Product";
import { PRODUCTS } from "@/data/products";

export type Nivel = "tatico" | "profissional" | "estrategico";
export type Capacidade = "termico" | "multiespectral" | "autonomo" | "rtk";

export interface RecomendacaoInput {
  segmento: string;
  nivel: Nivel;
  capacidade?: Capacidade;
  areaHectares?: number;
  perdasAnuais?: number;
}

export function recomendarProduto(input: RecomendacaoInput): Product | null {
  const { segmento, nivel, capacidade, areaHectares } = input;

  // Estratégico → Dock 3
  if (nivel === "estrategico") {
    return PRODUCTS.find(p => p.id === "dock3") || null;
  }

  // Segurança
  if (segmento === "seguranca") {
    if (nivel === "tatico" || nivel === "profissional") {
      return PRODUCTS.find(p => p.id === "Matrice 4T") || null;
    }
  }

  // Agro
  if (segmento === "agro") {
    if (capacidade === "multiespectral" || (areaHectares && areaHectares > 500)) {
      return PRODUCTS.find(p => p.id === "Matrice 4E") || null;
    }
    return PRODUCTS.find(p => p.id === "Matrice 4E") || null;
  }

  // Energia
  if (segmento === "energia") {
    if (capacidade === "termico") return PRODUCTS.find(p => p.id === "Matrice 4T") || null;
    if (capacidade === "rtk") return PRODUCTS.find(p => p.id === "Matrice 4E") || null;
    return PRODUCTS.find(p => p.id === "Matrice 4T") || null;
  }

  // Engenharia
  if (segmento === "engenharia") {
    if (capacidade === "rtk") return PRODUCTS.find(p => p.id === "Matrice 4E") || null;
    return PRODUCTS.find(p => p.id === "Matrice 4E") || null;
  }

  // fallback
  return PRODUCTS[0];
}