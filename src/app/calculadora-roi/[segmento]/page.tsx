// src/app/calculadora-roi/[segmento]/page.tsx
import { notFound } from "next/navigation";
import { ROICalculator } from "@/presentation/components/ROICalculator";
import { SEGMENT_BY_SLUG } from "@/domain/constants/segments";

interface PageProps {
  params: Promise<{ segmento: string }>;
}

export default async function SegmentROICalculatorPage({ params }: PageProps) {
  const { segmento } = await params;
  const segmentMeta = SEGMENT_BY_SLUG[segmento];
  if (!segmentMeta) return notFound();

  // Mapeamento do slug para o tipo Setor (ajuste conforme seus ids)
  const segmentToSetor: Record<string, any> = {
    seguranca: "seguranca",
    agro: "agro",
    engenharia: "industria", // engenharia usa o mesmo config de industria
    energia: "energia",
  };
  const setorId = segmentToSetor[segmento] || "seguranca";

  return <ROICalculator initialSegment={setorId} hideSelector />;
}