"use client";

import React, { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, MapPin, MessageCircle } from "lucide-react";
import { FadeUp, SectionTag } from "@/presentation/components/ui";
import { C } from "@/domain/constants/design-tokens";
import { waLink } from "@/domain/constants/wa";
import { CASES } from "@/data/cases";

export const CasesSection: FC = () => {
  const [activeCase, setActiveCase] = useState(0);
  return (
    <section id="cases" className="py-14 sm:py-24" style={{ background: C.light100 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <SectionTag label="Cases de Sucesso Reais" />
            <h2 className="hn text-4xl sm:text-5xl font-black uppercase leading-[0.88]" style={{ color: C.ink900 }}>
              Câmera térmica.<br /><span style={{ color: C.orange }}>Prova real.</span>
            </h2>
          </div>
          <p className="text-[14px] max-w-xs sm:text-right" style={{ color: C.ink400 }}>
            Não são demos montadas. São situações reais em que o drone provou seu valor em campo.
          </p>
        </FadeUp>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
          {CASES.map((c, i) => (
            <button key={i} onClick={() => setActiveCase(i)}
              className="shrink-0 flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all"
              style={{ background: activeCase === i ? c.accent : C.light200, color: activeCase === i ? "#fff" : C.ink400, border: `1.5px solid ${activeCase === i ? c.accent : C.bLight}` }}>
              <span>{c.badge}</span>
              <span className="hidden sm:inline">{c.title}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {CASES.map((c, i) => activeCase === i && (
            <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-5">
                  <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/11" }}>
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)" }} />
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20"
                      style={{ background: `${c.accent}cc` }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-white">{c.badge}</span>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                      <MapPin size={9} className="text-white/50" />
                      <span className="text-[10px] text-white/65">{c.location}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.4em] block mb-1" style={{ color: c.accent }}>{c.category}</span>
                      <h3 className="hn text-3xl sm:text-4xl font-black uppercase text-white mb-0.5">{c.title}</h3>
                      <p className="text-sm text-white/55">{c.subtitle}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {c.results.map((r, ri) => (
                      <div key={ri} className="rounded-xl p-4 sm:p-5 border" style={{ background: C.light200, borderColor: C.bLight }}>
                        <r.icon size={14} className="mb-2" style={{ color: c.accent }} />
                        <div className="hn text-2xl sm:text-3xl font-black mb-0.5" style={{ color: C.ink900 }}>{r.value}</div>
                        <div className="text-[11px] font-bold" style={{ color: C.ink700 }}>{r.label}</div>
                        <div className="text-[10px] mt-0.5" style={{ color: C.ink400 }}>{r.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="rounded-2xl p-6 sm:p-8 flex-1" style={{ background: C.light200, border: `1px solid ${C.bLight}` }}>
                    {[{ label:"O Desafio", emoji:"⚡", text:c.challenge }, { label:"A Solução", emoji:"✅", text:c.solution }].map((block, bi) => (
                      <div key={bi} className={bi > 0 ? "mt-6 pt-6 border-t" : ""} style={{ borderColor: C.bLight }}>
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className="text-sm">{block.emoji}</span>
                          <span className="text-[10px] font-extrabold uppercase tracking-[0.32em]" style={{ color: C.ink400 }}>{block.label}</span>
                        </div>
                        <p className="text-[13px] sm:text-[14px] leading-relaxed" style={{ color: C.ink500 }}>{block.text}</p>
                      </div>
                    ))}
                    <div className="mt-6 pt-5 border-t rounded-xl p-4 -mx-1"
                      style={{ borderColor: C.bLight, background: `${c.accent}08`, border: `1.5px solid ${c.accent}22` }}>
                      <p className="text-[13px] leading-relaxed font-semibold" style={{ color: C.ink700 }}>{c.highlight}</p>
                    </div>
                    <div className="mt-5 pt-5 border-t" style={{ borderColor: C.bLight }}>
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.3em] mb-3" style={{ color: C.ink400 }}>Tecnologia Aplicada</div>
                      <div className="flex flex-wrap gap-2">
                        {c.products.map((prod, pi) => (
                          <span key={pi} className="text-[11px] font-semibold px-3 py-1.5 rounded-full"
                            style={{ background: `${c.accent}10`, color: c.accent }}>{prod}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl p-6 sm:p-7" style={{ background: `${c.accent}07`, border: `1px solid ${c.accent}20` }}>
                    <Quote size={20} className="mb-3" style={{ color: `${c.accent}35` }} />
                    <p className="text-[14px] sm:text-[15px] leading-relaxed italic mb-5" style={{ color: C.ink700 }}>"{c.quote}"</p>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-[11px] text-white shrink-0"
                          style={{ background: c.accent }}>
                          {c.quoteAuthor.split(" ").slice(-1)[0].slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-[13px] font-bold" style={{ color: C.ink900 }}>{c.quoteAuthor}</div>
                          <div className="text-[11px]" style={{ color: C.ink400 }}>{c.quoteRole}</div>
                        </div>
                      </div>
                      <a href={waLink("Olá, vi o case " + c.title + " no site e quero saber como o drone pode funcionar na minha operação.")}
                        target="_blank" rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider text-white transition-all hover:opacity-90"
                        style={{ background: "#25d366" }}>
                        <MessageCircle size={12} /> Quero igual
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
