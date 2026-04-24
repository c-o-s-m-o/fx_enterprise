// 📁 src/presentation/sections/CtaSection.tsx
// [MOVIDO v2.1] — Extraído de components/sections/ContatoSection.tsx
// Visual e comportamento 100% idênticos ao original

"use client";
import React, { FC } from "react";
import { ArrowRight, MessageCircle, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { FadeUp, BgVideo } from "@/presentation/components/ui";
import { C } from "@/domain/constants/design-tokens";
import { waLink } from "@/domain/constants/wa";
import { SECTION_VIDEOS } from "@/data/hero-slides";

export const CtaSection: FC = () => (
  <section className="relative py-16 sm:py-28 overflow-hidden" style={{ background: C.navy950 }}>
    <BgVideo src={SECTION_VIDEOS.cta} poster="https://www-cdn.djiits.com/dps/59107212f2158b087e5647cdee0751a6.jpg" className="" opacity={0.28} />
    <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.navy950} 0%, ${C.navy950}88 60%, ${C.navy950}60 100%)` }} />
    <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 55% 55% at 15% 50%, rgba(249,115,22,0.13) 0%, transparent 60%)` }} />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.38em] text-orange-400">Adote antes da concorrência</span>
          </div>
          <h2 className="hn text-5xl sm:text-7xl font-black uppercase leading-[0.84] text-white mb-5">
            Não fique<br />para <span style={{ color: C.orange }}>trás.</span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
            O mercado cresce <strong className="text-white font-semibold">45% ao ano</strong>. Empresas que integram drones inteligentes hoje constroem vantagem competitiva que leva anos para ser alcançada.
          </p>
          <p className="text-[14px] leading-relaxed mb-9" style={{ color: "rgba(255,255,255,0.35)" }}>
            Diagnóstico gratuito com nossos engenheiros. Proposta técnica com ROI detalhado em até 48 horas.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#contato"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-3 px-7 py-4 text-[11px] font-extrabold uppercase tracking-[0.26em] text-white rounded-xl hover:opacity-90 transition-all"
              style={{ background: C.orange, boxShadow: "0 8px 40px rgba(249,115,22,0.32)" }}>
              Diagnóstico Gratuito <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href={waLink("Olá, vim pelo site e quero entender como drones autônomos podem melhorar minha operação.")}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 border-2 border-white/20 hover:border-white/40 text-white/70 hover:text-white px-7 py-4 text-[11px] font-extrabold uppercase tracking-[0.26em] rounded-xl hover:bg-white/5 transition-all">
              <MessageCircle size={13} /> WhatsApp
            </a>
          </div>
        </FadeUp>
        <FadeUp delay={0.12}>
          <div className="space-y-4">
            {[
              { icon: TrendingUp,  accent: "#f97316", titulo: "Crescimento de 45%/ano",      texto: "Cada mês sem adoção é vantagem acumulada para o concorrente que já adotou." },
              { icon: CheckCircle, accent: "#10b981", titulo: "Cases reais já comprovaram",  texto: "Um condomínio em Brasília e uma fazenda no Ceará — dois cenários reais, zero dúvida." },
              { icon: Clock,       accent: "#3b82f6", titulo: "Payback em menos de 4 meses", texto: "Eliminação real de custo operacional e prevenção de perdas — não por promessa." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl border"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${item.accent}18` }}>
                  <item.icon size={18} style={{ color: item.accent }} />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white mb-1">{item.titulo}</div>
                  <div className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>{item.texto}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </div>
  </section>
);
