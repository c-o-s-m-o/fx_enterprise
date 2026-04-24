"use client";

import React, { FC } from "react";
import { Users, Radar } from "lucide-react";
import { FadeUp, SectionTag } from "@/presentation/components/ui";
import { C } from "@/domain/constants/design-tokens";
import { COMPARATIVO } from "@/data/static-content";

export const ComparativoSection: FC = () => (
  <section className="py-14 sm:py-24" style={{ background: C.navy800 }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <FadeUp className="text-center max-w-2xl mx-auto mb-12">
        <SectionTag label="Comparativo Operacional" dark />
        <h2 className="hn text-3xl sm:text-5xl font-black uppercase leading-[0.88] text-white">
          Rondas humanas<br /><span style={{ color: C.orange }}>vs drone autônomo.</span>
        </h2>
        <p className="mt-4 text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
          Os números falam por si. A mesma cobertura, com mais eficiência, menos custo e zero risco para equipes.
        </p>
      </FadeUp>
      <FadeUp>
        <div className="rounded-2xl overflow-hidden border border-white/[0.07]">
          <div className="grid grid-cols-3 text-center" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div className="py-4 px-4 border-r text-[11px] font-bold text-white/40 uppercase tracking-widest" style={{ borderColor: "rgba(255,255,255,0.07)" }}>Critério</div>
            <div className="py-4 px-4 border-r flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest" style={{ borderColor: "rgba(255,255,255,0.07)", color: "#ef4444" }}>
              <Users size={13} /> Ronda Humana
            </div>
            <div className="py-4 px-4 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: "#10b981" }}>
              <Radar size={13} /> Drone Autônomo
            </div>
          </div>
          {COMPARATIVO.map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-t text-[12px] sm:text-[13px]" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="py-4 px-4 sm:px-5 font-semibold border-r" style={{ color: "rgba(255,255,255,0.55)", borderColor: "rgba(255,255,255,0.05)" }}>{row.criterio}</div>
              <div className="py-4 px-4 sm:px-5 text-center border-r" style={{ color: "#ef4444", borderColor: "rgba(255,255,255,0.05)", background: "rgba(239,68,68,0.04)" }}>{row.humano}</div>
              <div className="py-4 px-4 sm:px-5 text-center font-bold" style={{ color: "#10b981", background: "rgba(16,185,129,0.06)" }}>{row.drone}</div>
            </div>
          ))}
        </div>
      </FadeUp>
    </div>
  </section>
);
