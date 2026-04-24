// 📁 src/presentation/sections/IscasSection.tsx
// [MOVIDO v2.1] — Extraído de components/sections/ContatoSection.tsx
// Visual e comportamento 100% idênticos ao original

"use client";
import React, { FC } from "react";
import { MessageCircle, CheckCircle } from "lucide-react";
import { FadeUp, SectionTag } from "@/presentation/components/ui";
import { C } from "@/domain/constants/design-tokens";
import { waLink } from "@/domain/constants/wa";
import { ISCAS } from "@/data/static-content";

export const IscasSection: FC = () => (
  <section id="iscas" className="py-14 sm:py-24 relative overflow-hidden" style={{ background: C.navy800 }}>
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 65%)" }} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <FadeUp className="text-center max-w-2xl mx-auto mb-12">
        <SectionTag label="Material Exclusivo · Grátis" dark />
        <h2 className="hn text-3xl sm:text-5xl font-black uppercase leading-[0.88] text-white mb-4">
          Antes de falar com<br />um especialista,<br /><span style={{ color: C.orange }}>veja a prova.</span>
        </h2>
        <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          Materiais ricos para gestores de segurança, diretores de operações e engenheiros. Enviados por WhatsApp — sem compromisso.
        </p>
      </FadeUp>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {ISCAS.map((isca, i) => (
          <FadeUp key={i} delay={i * 0.07}>
            <div className="group flex flex-col rounded-2xl overflow-hidden border h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-2 px-4 sm:px-5 pt-4 sm:pt-5 pb-0">
                <span className="text-[9px] font-extrabold uppercase tracking-[0.38em] px-2.5 py-1 rounded-full"
                  style={{ background: `${isca.tagColor}20`, color: isca.tagColor }}>
                  {isca.tag}
                </span>
              </div>
              <div className="flex-1 p-4 sm:p-5 pt-3 flex flex-col">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: `${isca.accent}18` }}>
                  <isca.icon size={20} style={{ color: isca.accent }} />
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                    style={{ background: `${isca.accent}12`, color: isca.accent }}>{isca.badge}</span>
                </div>
                <h3 className="text-[14px] font-black mb-1 text-white leading-tight">{isca.title}</h3>
                <p className="text-[12px] font-medium mb-3" style={{ color: isca.accent }}>{isca.subtitle}</p>
                <p className="text-[12px] leading-relaxed mb-4 flex-1" style={{ color: "rgba(255,255,255,0.4)" }}>{isca.desc}</p>
                <div className="flex items-start gap-2 p-3 rounded-lg mb-4"
                  style={{ background: `${isca.accent}10`, border: `1px solid ${isca.accent}20` }}>
                  <CheckCircle size={12} className="mt-0.5 shrink-0" style={{ color: isca.accent }} />
                  <p className="text-[11px] leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>{isca.highlight}</p>
                </div>
                <a href={waLink(isca.wa)} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-[0.22em] text-white transition-all hover:opacity-90"
                  style={{ background: "#25d366" }}>
                  <MessageCircle size={12} /> {isca.cta}
                </a>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="text-center mt-8">
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>
          📲 Todos os materiais são enviados via WhatsApp · Sem spam · Sem compromisso
        </p>
      </FadeUp>
    </div>
  </section>
);
