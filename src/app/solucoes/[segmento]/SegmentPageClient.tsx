// src/app/solucoes/[segmento]/SegmentPageClient.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NivelTipoSelector } from "@/presentation/components/NivelTipoSelector";

interface SegmentPageClientProps {
  segmento: string;
  accentColor: string;
}

export function SegmentPageClient({ segmento, accentColor }: SegmentPageClientProps) {
  const [nivel, setNivel] = useState<string>("");
  const [capacidade, setCapacidade] = useState<string>("");

  const handleSelect = (nivelSelecionado: string, capacidadeSelecionada?: string) => {
    setNivel(nivelSelecionado);
    setCapacidade(capacidadeSelecionada || "");
  };

  const calculadoraUrl = `/calculadora-roi/${segmento}${nivel ? `?nivel=${nivel}${capacidade ? `&capacidade=${capacidade}` : ""}` : ""}`;

  return (
    <div>
      <NivelTipoSelector segmento={segmento} onSelect={handleSelect} />
      {nivel && (
        <div className="mt-8 text-center">
          <Link
            href={calculadoraUrl}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-extrabold uppercase tracking-wider text-white transition-all hover:opacity-90"
            style={{ background: accentColor }}
          >
            Calcular ROI da minha operação <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}