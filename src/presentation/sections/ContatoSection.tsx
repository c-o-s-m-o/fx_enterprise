// 📁 src/presentation/sections/ContatoSection.tsx
// [CONSOLIDADO v2.2] — Seção de contato focada em conversão via WhatsApp, sem formulário.
// Layout centralizado com canais de atendimento e selos de confiança.

"use client";
import React, { FC } from "react";
import { Check, Phone, Mail, MessageCircle, ArrowUpRight, Award, Shield, CheckCircle } from "lucide-react";
import { FadeUp, SectionTag } from "@/presentation/components/ui";
import { C } from "@/domain/constants/design-tokens";
import { waLink } from "@/domain/constants/wa";

export const ContatoSection: FC = () => (
  <section id="contato" className="py-14 sm:py-24" style={{ background: C.light100 }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header com CTA WhatsApp principal */}
      <FadeUp className="text-center max-w-2xl mx-auto mb-12">
        <SectionTag label="Fale com Especialista" />
        <h2 className="hn text-4xl sm:text-5xl font-black uppercase leading-[0.88] mb-5" style={{ color: C.ink900 }}>
          A resposta mais rápida<br />está no <span style={{ color: "#25d366" }}>WhatsApp.</span>
        </h2>
        <p className="text-base leading-relaxed mb-7" style={{ color: C.ink400 }}>
          Engenheiros certificados DJI — diagnóstico gratuito em até 1 hora no horário comercial.
        </p>
        <a href={waLink("Olá, vim pelo site da Aero Drone Solutions e gostaria de um diagnóstico gratuito para minha operação.")}
          target="_blank" rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.22em] sm:tracking-[0.28em] text-white transition-all hover:opacity-90 shadow-2xl"
          style={{ background: "#25d366", boxShadow: "0 12px 40px rgba(37,211,102,0.32)" }}>
          <MessageCircle size={18} /> Falar no WhatsApp Agora
        </a>
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-5 flex-wrap">
          {["Resposta em < 1h", "Diagnóstico gratuito", "Sem compromisso"].map((l, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[11px]" style={{ color: C.ink400 }}>
              <Check size={11} style={{ color: "#25d366" }} /> {l}
            </div>
          ))}
        </div>
      </FadeUp>

      {/* Divisor */}
      <div className="flex items-center gap-4 max-w-lg mx-auto mb-10">
        <div className="flex-1 h-px" style={{ background: C.bLight }} />
        <span className="text-[11px] font-semibold px-3 py-1 rounded-full"
          style={{ background: C.light200, color: C.ink400 }}>ou prefere e-mail</span>
        <div className="flex-1 h-px" style={{ background: C.bLight }} />
      </div>

      {/* Canais de contato + Credenciais (centralizado) */}
      <FadeUp className="max-w-2xl mx-auto">
        <h3 className="hn text-3xl font-black uppercase mb-5 text-center" style={{ color: C.ink900 }}>
          Escolha como<br /><span style={{ color: C.orange }}>prefere falar.</span>
        </h3>
        <p className="text-[14px] leading-relaxed mb-8 text-center" style={{ color: C.ink400 }}>
          Seja qual for o canal, um engenheiro especialista analisa seu caso e propõe a solução ideal.
        </p>

        <div className="space-y-3 mb-8">
          {[
            { icon: MessageCircle, label: "WhatsApp — Resposta + rápida", value: "(61) 9 8237-3501", href: waLink("Olá, vim pelo site da Aero Drone Solutions."), bg: "#25d366" },
            { icon: Phone,         label: "Telefone Comercial",           value: "(61) 9 8237-3501", href: "tel:+5561982373501",                        bg: C.orange },
            { icon: Mail,          label: "E-mail Comercial",             value: "contato.aerods@gmail.com", href: "mailto:comercial@smcompany.com.br", bg: "#3b82f6" },
          ].map((item, i) => (
            <a key={i} href={item.href}
              target={item.href.startsWith("https") ? "_blank" : "_self"} rel="noopener noreferrer"
              className="flex items-center gap-4 group p-4 rounded-2xl border hover:shadow-md transition-all"
              style={{ background: C.light200, borderColor: C.bLight }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${item.bg}15` }}>
                <item.icon size={16} style={{ color: item.bg }} />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: C.ink400 }}>{item.label}</div>
                <div className="text-[14px] font-semibold" style={{ color: C.ink900 }}>{item.value}</div>
              </div>
              <ArrowUpRight size={13} className="text-slate-300 group-hover:text-orange-500 transition-colors" />
            </a>
          ))}
        </div>

        {/* Badges de credencial */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Award,       label: "DJI Enterprise", sub: "Parceiro Cert." },
            { icon: Shield,      label: "ANAC",           sub: "Homologado" },
            { icon: CheckCircle, label: "Turnkey",        sub: "Implementação" },
          ].map((b, i) => (
            <div key={i} className="text-center p-4 rounded-xl border" style={{ background: C.light200, borderColor: C.bLight }}>
              <b.icon size={16} className="mx-auto mb-2" style={{ color: C.orange }} />
              <div className="text-[11px] font-bold" style={{ color: C.ink900 }}>{b.label}</div>
              <div className="text-[10px]" style={{ color: C.ink400 }}>{b.sub}</div>
            </div>
          ))}
        </div>
      </FadeUp>
    </div>
  </section>
);