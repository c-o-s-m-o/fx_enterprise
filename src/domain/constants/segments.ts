// src/domain/constants/segments.ts
// [NOVO] Definição dos segmentos de mercado para o funil de conversão

import { Shield, Wheat, Factory, Zap } from "lucide-react";
import type { ElementType } from "react";

export type SegmentId = "seguranca" | "agro" | "engenharia" | "energia";

export interface Segment {
  id: SegmentId;
  label: string;
  slug: string;
  icon: ElementType;
  accentColor: string;
  description: string;
  /** Palavras-chave para SEO e recomendação */
  keywords: string[];
}

export const SEGMENTS: Segment[] = [
  {
    id: "seguranca",
    label: "Segurança Patrimonial",
    slug: "seguranca",
    icon: Shield,
    accentColor: "#f97316",
    description: "Condomínios, fazendas, centros logísticos, indústrias",
    keywords: ["perímetro", "furto", "ronda noturna", "câmera térmica"],
  },
  {
    id: "agro",
    label: "Agronegócio",
    slug: "agro",
    icon: Wheat,
    accentColor: "#10b981",
    description: "Lavouras, pecuária, aquicultura, florestas",
    keywords: ["NDVI", "pragas", "mapeamento", "produtividade"],
  },
  {
    id: "engenharia",
    label: "Engenharia & Construção",
    slug: "engenharia",
    icon: Factory,
    accentColor: "#3b82f6",
    description: "Obras, topografia, inspeção estrutural",
    keywords: ["volumetria", "RTK", "projetos", "as-built"],
  },
  {
    id: "energia",
    label: "Energia & Utilities",
    slug: "energia",
    icon: Zap,
    accentColor: "#8b5cf6",
    description: "Solar, eólica, linhas de transmissão, subestações",
    keywords: ["termografia", "painéis solares", "torres", "inspeção"],
  },
];

export const SEGMENT_MAP = Object.fromEntries(
  SEGMENTS.map(s => [s.id, s])
) as Record<SegmentId, Segment>;

export const SEGMENT_BY_SLUG = Object.fromEntries(
  SEGMENTS.map(s => [s.slug, s])
) as Record<string, Segment>;