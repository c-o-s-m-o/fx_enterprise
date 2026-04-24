// src/domain/entities/SegmentContent.ts
// [NOVO] Entidade que define o conteúdo educacional e comercial de cada segmento

export interface SegmentProblem {
  title: string;
  description: string;
  consequence: string;
}

export interface SegmentContent {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundVideo?: string;
  /** Principais dores do segmento */
  problems: SegmentProblem[];
  /** Explicação da solução (sem focar em produto específico) */
  solutionExplanation: string;
  /** Conteúdo educativo: como a tecnologia resolve */
  educationalContent: string;
  /** Benefícios quantificáveis */
  benefits: string[];
  /** IDs dos produtos recomendados (ex: "Matrice 4T", "dock3") */
  recommendedProductIds: string[];
  /** IDs de cases relacionados (ex: "vistapark") */
  relatedCaseIds: string[];
  /** Link do vídeo explicativo (YouTube ou próprio) */
  explainerVideoUrl?: string;
  /** Métricas de mercado específicas do segmento */
  marketMetrics: {
    label: string;
    value: string;
    source: string;
  }[];
}