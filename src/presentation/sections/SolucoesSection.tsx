"use client";
// [CORRIGIDO v2.1] — SolucoesSection: 3 divergências restauradas do original:
//   1. SectionTag label: "O Que Fazemos" (era "Soluções por Setor")
//   2. H2: "Soluções para cada missão." (era "Cada operação, um resultado preciso.")
//   3. Header layout: flex justify-between com parágrafo à direita (era text-center)
//   4. Mobile pills: rounded-full + text-[11px] + border com cor (era rounded-xl)
//   5. Section: relative overflow-hidden + radial gradient (estavam ausentes)

import React, { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ChevronRight } from "lucide-react";
import { FadeUp, SectionTag, BgVideo } from "@/presentation/components/ui";
import { C } from "@/domain/constants/design-tokens";
import { waLink } from "@/domain/constants/wa";
import { SOLUTIONS } from "@/data/solutions";

// ── Soluções ─────────────────────────────────────────────────────────────────────
export const SolucoesSection: FC = () => {
  const [activeSol, setActiveSol] = useState(0);
  return (
    // [CORRIGIDO v2.1] — relative overflow-hidden + radial gradient restaurados
    <section id="solucoes" className="py-14 sm:py-24 relative overflow-hidden" style={{ background: C.navy800 }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249,115,22,0.07) 0%, transparent 60%)" }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* [CORRIGIDO v2.1] — flex justify-between (era text-center) */}
        <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            {/* [CORRIGIDO v2.1] — "O Que Fazemos" (era "Soluções por Setor") */}
            <SectionTag label="O Que Fazemos" dark />
            {/* [CORRIGIDO v2.1] — texto e tamanho originais restaurados */}
            <h2 className="hn text-4xl sm:text-5xl font-black uppercase leading-[0.88] text-white">
              Soluções para<br /><span style={{ color: C.orange }}>cada missão.</span>
            </h2>
          </div>
          {/* [CORRIGIDO v2.1] — parágrafo à direita restaurado */}
          <p className="text-[14px] leading-relaxed max-w-xs sm:text-right"
            style={{ color: "rgba(255,255,255,0.38)" }}>
            Soluções modulares adaptadas ao setor, escala e criticidade da sua operação.
          </p>
        </FadeUp>

        {/* Mobile pills — [CORRIGIDO v2.1] rounded-full + text-[11px] + border com cor */}
        <div className="lg:hidden flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4">
          {SOLUTIONS.map((s, i) => (
            <button key={i} onClick={() => setActiveSol(i)}
              className="flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] font-bold transition-all border"
              style={{
                background: activeSol === i ? s.accent : "rgba(255,255,255,0.06)",
                color: activeSol === i ? "#fff" : "rgba(255,255,255,0.5)",
                borderColor: activeSol === i ? s.accent : "rgba(255,255,255,0.1)",
              }}>
              <s.icon size={12} /> {s.title}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Desktop list */}
          <div className="hidden lg:block lg:col-span-4 space-y-1.5">
            {SOLUTIONS.map((s, i) => (
              <FadeUp key={i} delay={i * 0.04}>
                <button onClick={() => setActiveSol(i)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all border"
                  style={{
                    background: activeSol === i ? `${s.accent}18` : "rgba(255,255,255,0.04)",
                    borderColor: activeSol === i ? `${s.accent}35` : "transparent",
                  }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: activeSol === i ? `${s.accent}22` : "rgba(255,255,255,0.07)" }}>
                    <s.icon size={16} style={{ color: activeSol === i ? s.accent : "rgba(255,255,255,0.38)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-bold truncate"
                      style={{ color: activeSol === i ? "#fff" : "rgba(255,255,255,0.52)" }}>{s.title}</div>
                    <div className="text-[10px] truncate mt-0.5"
                      style={{ color: "rgba(255,255,255,0.22)" }}>{s.clients}</div>
                  </div>
                  {activeSol === i && <ChevronRight size={13} style={{ color: s.accent }} className="shrink-0" />}
                </button>
              </FadeUp>
            ))}
          </div>

          {/* Painel detalhe */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div key={activeSol}
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                {(() => {
                  const s = SOLUTIONS[activeSol];
                  return (
                    <div className="rounded-2xl overflow-hidden relative border"
                      style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)" }}>
                      <div className="relative overflow-hidden" style={{ aspectRatio: "16/8" }}>
                        <BgVideo src={s.videoSrc} poster="https://www-cdn.djiits.com/dps/ee14cfbfb676fe008817889d1001cc53.jpg" className="" opacity={0.6} />
                        <div className="absolute inset-0"
                          style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(8,13,36,0.98) 100%)" }} />
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                          <div className="flex items-end gap-4 flex-wrap">
                            <div>
                              <div className="text-[9px] font-extrabold uppercase tracking-[0.4em] mb-1"
                                style={{ color: s.accent }}>{s.clients}</div>
                              <h3 className="hn text-3xl sm:text-4xl font-black uppercase text-white">{s.title}</h3>
                            </div>
                            <div className="ml-auto text-right">
                              <div className="hn text-4xl sm:text-5xl font-black" style={{ color: s.accent }}>{s.metric}</div>
                              <div className="text-[10px] uppercase tracking-wider text-white/30">{s.metricLabel}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 sm:p-8">
                        <p className="text-[14px] sm:text-[15px] leading-relaxed mb-6"
                          style={{ color: "rgba(255,255,255,0.52)" }}>{s.desc}</p>
                        <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                          {s.benefits.map((b, bi) => (
                            <div key={bi} className="flex items-center gap-3 text-[13px]"
                              style={{ color: "rgba(255,255,255,0.62)" }}>
                              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                style={{ background: `${s.accent}20` }}>
                                <Check size={11} style={{ color: s.accent }} />
                              </div>
                              {b}
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-7">
                          {s.tags.map((t, ti) => (
                            <span key={ti} className="px-3 py-1.5 rounded-full text-[10px] font-bold"
                              style={{ background: `${s.accent}15`, color: s.accent }}>{t}</span>
                          ))}
                        </div>
                        <a href={waLink("Olá, vim pelo site e tenho interesse na solução: " + s.title + ". Gostaria de saber mais.")}
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.28em] text-white group">
                          Solicitar Proposta <ArrowRight size={12} style={{ color: s.accent }} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};


