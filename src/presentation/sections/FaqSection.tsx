// 📁 src/presentation/sections/FaqSection.tsx
// [MOVIDO v2.1] — Extraído de components/sections/ContatoSection.tsx para arquivo próprio
// Visual e comportamento 100% idênticos ao original

"use client";
import React, { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ChevronDown, MessageCircle } from "lucide-react";
import { FadeUp, SectionTag } from "@/presentation/components/ui";
import { C } from "@/domain/constants/design-tokens";
import { waLink } from "@/domain/constants/wa";
import { FAQ_ITEMS } from "@/data/static-content";

export const FaqSection: FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <section className="py-14 sm:py-24" style={{ background: C.light100 }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <FadeUp className="text-center mb-12">
          <SectionTag label="Perguntas Frequentes" />
          <h2 className="hn text-3xl sm:text-5xl font-black uppercase leading-[0.88]" style={{ color: C.ink900 }}>
            Dúvidas comuns<br /><span style={{ color: C.orange }}>respondidas.</span>
          </h2>
        </FadeUp>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={i} delay={i * 0.04}>
              <div className="rounded-2xl overflow-hidden border transition-all"
                style={{ borderColor: openFaq === i ? `${C.orange}40` : C.bLight, background: C.light100 }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center gap-4 p-5 sm:p-6 text-left group">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all"
                    style={{ background: openFaq === i ? C.orangeBg : C.light200 }}>
                    {openFaq === i
                      ? <Minus size={14} style={{ color: C.orange }} />
                      : <Plus size={14} style={{ color: C.ink400 }} />}
                  </div>
                  <span className="flex-1 text-[14px] font-semibold text-left leading-snug" style={{ color: C.ink900 }}>{item.q}</span>
                  <ChevronDown size={16}
                    className={`shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    style={{ color: C.ink400 }} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                        <div className="ml-12 border-l-2 pl-4" style={{ borderColor: `${C.orange}30` }}>
                          <p className="text-[13px] sm:text-[14px] leading-relaxed" style={{ color: C.ink500 }}>{item.a}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp className="text-center mt-10">
          <p className="text-[14px] mb-4" style={{ color: C.ink400 }}>Tem mais alguma dúvida?</p>
          <a href={waLink("Olá, tenho uma dúvida sobre os drones da Aero Drone Solutions.")}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-[11px] font-extrabold uppercase tracking-[0.26em] text-white transition-all hover:opacity-90"
            style={{ background: "#25d366" }}>
            <MessageCircle size={14} /> Perguntar no WhatsApp
          </a>
        </FadeUp>
      </div>
    </section>
  );
};
