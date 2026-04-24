// src/presentation/components/NivelTipoSelector.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { C } from "@/domain/constants/design-tokens";

interface NivelTipoSelectorProps {
  segmento: string;
  onSelect: (nivel: string, capacidade?: string) => void;
}

const NIVEL_OPCOES = [
  { id: "tatico", label: "Tático", desc: "Resposta rápida, portátil, missões esporádicas" },
  { id: "profissional", label: "Profissional", desc: "Voo diário, mapeamento ou inspeção recorrente" },
  { id: "estrategico", label: "Estratégico", desc: "Autonomia 24/7, zero intervenção humana" },
];

const CAPACIDADE_POR_SEGMENTO: Record<string, Array<{ id: string; label: string }>> = {
  seguranca: [{ id: "termico", label: "Câmera Térmica (noturno)" }],
  agro: [
    { id: "multiespectral", label: "Multiespectral (NDVI)" },
    { id: "rtk", label: "Mapeamento RTK" },
  ],
  energia: [{ id: "termico", label: "Termografia de precisão" }],
  engenharia: [{ id: "rtk", label: "Topografia RTK" }],
};

export const NivelTipoSelector: React.FC<NivelTipoSelectorProps> = ({ segmento, onSelect }) => {
  const [nivel, setNivel] = useState<string>("");
  const [capacidade, setCapacidade] = useState<string>("");

  const capacidades = CAPACIDADE_POR_SEGMENTO[segmento] || [];

  const handleNivelClick = (nivelId: string) => {
    setNivel(nivelId);
    setCapacidade("");
    if (capacidades.length === 0) {
      onSelect(nivelId);
    }
  };

  const handleCapacidadeClick = (capId: string) => {
    setCapacidade(capId);
    onSelect(nivel, capId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold mb-3" style={{ color: C.ink700 }}>
          1. Qual o nível da sua operação?
        </h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {NIVEL_OPCOES.map((op) => (
            <button
              key={op.id}
              onClick={() => handleNivelClick(op.id)}
              className={`p-4 rounded-xl text-left border transition-all ${
                nivel === op.id ? "border-orange-500 bg-orange-50" : "border-gray-200 bg-white"
              }`}
            >
              <div className="font-black text-lg" style={{ color: nivel === op.id ? C.orange : C.ink900 }}>
                {op.label}
              </div>
              <div className="text-xs mt-1" style={{ color: C.ink400 }}>
                {op.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {capacidades.length > 0 && nivel && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="text-sm font-bold mb-3" style={{ color: C.ink700 }}>
            2. Qual capacidade você precisa?
          </h3>
          <div className="flex flex-wrap gap-3">
            {capacidades.map((cap) => (
              <button
                key={cap.id}
                onClick={() => handleCapacidadeClick(cap.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  capacidade === cap.id
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cap.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};