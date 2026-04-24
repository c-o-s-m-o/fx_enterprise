"use client";
// [COMPONENTIZADO v2.0] — UrgenciaSection extraída do corpo do HomePage
// Era uma função inline dentro do componente. Agora é um arquivo próprio.

import React, { FC } from "react";
import { C } from "@/domain/constants/design-tokens";
import { Container } from "@/presentation/components/ui/primitives";

export const UrgenciaSection: FC = () => (
  <div className="relative overflow-hidden py-8 sm:py-10 border-y"
    style={{ background: C.navy900, borderColor: "rgba(255,255,255,0.05)" }}>
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse 60% 100% at 0% 50%, rgba(249,115,22,0.07) 0%, transparent 60%)" }} />
    <Container className="relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
        <div className="flex-1">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.45em] mb-2 text-orange-400">
            Adoção acelerada · dados de mercado
          </div>
          <h3 className="hn text-2xl sm:text-4xl font-black uppercase text-white leading-tight">
            Empresas que adotam hoje ganham vantagem real.<br />
            <span style={{ color: C.orange }}>As que esperam, correm para alcançar.</span>
          </h3>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <div className="text-center px-5 py-4 rounded-2xl"
            style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)" }}>
            <div className="hn text-3xl font-black text-orange-400">45%</div>
            <div className="text-[9px] text-white/35 uppercase tracking-wider">crescimento/ano</div>
          </div>
          <div className="text-center px-5 py-4 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="hn text-3xl font-black text-white">2035</div>
            <div className="text-[9px] text-white/35 uppercase tracking-wider">US$700 Bi</div>
          </div>
        </div>
      </div>
    </Container>
  </div>
);
