"use client";
// [REFATORADO v1.1] — Marquee e Mercado extraídos do page.tsx
// [VALIDADO v1.2]   — Background laranja, STATS, cards 01/02/03 e quote idênticos ao original

import React, { FC } from "react";
import { TrendingUp, Cpu, BarChart3, ArrowRight } from "lucide-react";
import { FadeUp } from "@/presentation/components/ui";
import { C } from "@/domain/constants/design-tokens";
import { STATS } from "@/data/static-content";

// ── Marquee ──────────────────────────────────────────────────────────────────
// [VALIDADO] — background C.orange, usa STATS com ícone/valor/label/◆
export const MarqueeSection: FC = () => (
  <div className="overflow-hidden border-y border-orange-500/20" style={{ background: C.orange }}>
    <div className="flex marquee-run whitespace-nowrap select-none py-3.5">
      {[...STATS, ...STATS, ...STATS].map((s, i) => (
        <div key={i} className="flex items-center gap-2.5 px-6 shrink-0">
          <s.icon size={12} className="text-white/50" />
          <span className="text-[11px] font-black uppercase tracking-wider text-white">{s.v}</span>
          <span className="text-white/60 text-[11px]">{s.label}</span>
          <span className="text-white/28 pl-6">◆</span>
        </div>
      ))}
    </div>
  </div>
);

// ── Mercado (DaaS) ────────────────────────────────────────────────────────────
// [VALIDADO] — Grid pattern, 3 cards numerados, citação com "DaaS" fantasma
export const MercadoSection: FC = () => (
  <section id="futuro" className="py-14 sm:py-28 relative overflow-hidden" style={{ background: C.navy900 }}>
    {/* Grid pattern de fundo */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
      style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(249,115,22,0.09) 0%, transparent 65%)" }} />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
      <FadeUp className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.42em] text-orange-400">
            Dados de Mercado · Drone as a Service (DaaS)
          </span>
        </div>
        <h2 className="hn text-4xl sm:text-7xl font-black uppercase leading-[0.84] text-white mb-6">
          O futuro das<br />operações<br /><span style={{ color: C.orange }}>já começou.</span>
        </h2>
        <p className="text-base sm:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          O mercado global de serviços com drones deve crescer de{" "}
          <strong className="text-white font-semibold">US$ 24 bilhões em 2026</strong> para{" "}
          <strong className="text-orange-400 font-semibold">mais de US$ 700 bilhões até 2035</strong> — crescimento anual superior a 45%.
          No Brasil, o setor já movimenta{" "}
          <strong className="text-white font-semibold">R$ 2 bilhões por ano</strong> e cresce aceleradamente em energia, agro, segurança e logística.
        </p>
      </FadeUp>

      {/* 3 cards numerados */}
      <div className="grid sm:grid-cols-3 gap-5 mb-14">
        {[
          { n:"01", icon:TrendingUp, accent:"#f97316", title:"Não é tendência. É transformação inevitável.", text:"Empresas que adotam drones autônomos hoje constroem vantagem competitiva que leva anos para ser alcançada. As que esperam terão que correr para acompanhar.", stat:"45%/ano", statLabel:"crescimento do setor" },
          { n:"02", icon:Cpu,        accent:"#3b82f6", title:"IA + drone = inteligência operacional.", text:"A próxima evolução não é o drone mais rápido — é o drone mais inteligente. IA embarcada transforma cada voo em análise, cada imagem em dado, cada dado em decisão.", stat:"8 funções", statLabel:"um único equipamento" },
          { n:"03", icon:BarChart3,  accent:"#10b981", title:"Não vendemos hardware. Entregamos ROI.", text:"Nossa abordagem DaaS: o equipamento é o meio. O resultado é redução de custos, aumento de produtividade e decisões baseadas em dados em tempo real.", stat:"< 4 meses", statLabel:"payback médio comprovado" },
        ].map((card, i) => (
          <FadeUp key={i} delay={i * 0.09}>
            <div className="group h-full rounded-2xl p-5 sm:p-8 flex flex-col border transition-all duration-300 hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)" }}>
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${card.accent}18` }}>
                  <card.icon size={22} style={{ color: card.accent }} />
                </div>
                <span className="hn text-5xl font-black leading-none" style={{ color: "rgba(255,255,255,0.05)" }}>{card.n}</span>
              </div>
              <h3 className="text-[15px] font-black text-white mb-3 leading-snug">{card.title}</h3>
              <p className="text-[13px] leading-relaxed flex-1 mb-6" style={{ color: "rgba(255,255,255,0.42)" }}>{card.text}</p>
              <div className="pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="hn text-3xl font-black" style={{ color: card.accent }}>{card.stat}</div>
                <div className="text-[10px] uppercase tracking-wider font-semibold mt-0.5"
                  style={{ color: "rgba(255,255,255,0.3)" }}>{card.statLabel}</div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* Citação com "DaaS" fantasma de 120px (idêntico ao original) */}
      <FadeUp>
        <div className="rounded-2xl p-6 sm:p-10 relative overflow-hidden border"
          style={{ background: "rgba(249,115,22,0.06)", borderColor: "rgba(249,115,22,0.2)" }}>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hn text-[120px] font-black leading-none pointer-events-none select-none hidden lg:block"
            style={{ color: "rgba(249,115,22,0.06)" }}>DaaS</div>
          <div className="relative lg:max-w-2xl">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.42em] mb-4"
              style={{ color: "rgba(249,115,22,0.7)" }}>Nossa Visão · Drone as a Service</div>
            <p className="text-xl sm:text-2xl font-light leading-relaxed text-white mb-6">
              "Hoje já não se trata apenas de voar —<br className="hidden sm:block" />
              trata-se de gerar <strong className="font-black text-orange-400">informação, eficiência</strong><br className="hidden sm:block" />
              e <strong className="font-black text-orange-400">vantagem competitiva.</strong>"
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.26em] text-white rounded-xl transition-all hover:opacity-90"
                style={{ background: C.orange }}>
                Diagnóstico Gratuito <ArrowRight size={12} />
              </a>
              <a href="#cases"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.26em] rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all">
                Ver Cases Reais
              </a>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  </section>
);
