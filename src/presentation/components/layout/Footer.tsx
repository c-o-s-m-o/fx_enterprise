"use client";
// [CORRIGIDO v2.1] — Footer: 3 diferenças corrigidas vs original:
//   1. Logo size: 28 → 32
//   2. Nome: "Aero Drone Solutions" → "Aero Drone Solutions" (mixed case)
//   3. Subtítulo: "Drone Solutions" → "Drone Enterprise"
//   4. Padding: py-14 sm:py-20 → pt-12 sm:pt-16 pb-8 + env(safe-area-inset-bottom)
//   5. Descrição do footer: restaurada do original

import React, { FC } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Logo } from "@/presentation/components/ui";
import { C } from "@/domain/constants/design-tokens";
import { waLink } from "@/domain/constants/wa";

export const Footer: FC = () => (
  // [CORRIGIDO v2.1] — border-t + borderColor restaurados do original
  <footer className="border-t" style={{ background: C.navy900, borderColor: "rgba(255,255,255,0.05)" }}>
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8"
      // [CORRIGIDO v2.1] — safe-area-inset-bottom restaurado
      style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 mb-12">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2.5 mb-5">
            {/* [CORRIGIDO v2.1] size=32 (era 28) */}
            <Logo size={32} white />
            <div>
              {/* [CORRIGIDO v2.1] "Aero Drone Solutions" mixed case (era "Aero Drone Solutions") */}
              <div className="font-black text-[16px] tracking-wide hn text-white">Aero Drone Solutions</div>
              {/* [CORRIGIDO v2.1] "Drone Enterprise" (era "Drone Solutions") */}
              <div className="text-[7px] tracking-[0.46em] font-bold uppercase text-orange-500/70">Drone Enterprise</div>
            </div>
          </div>
          {/* [CORRIGIDO v2.1] Texto original restaurado */}
          <p className="text-[12px] leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.22)" }}>
            Drone as a Service — autonomia e inteligência aérea para missões críticas em todo o Brasil.
          </p>
          <div className="flex gap-2">
            {[
              { s: "in", url: "https://linkedin.com" },
              { s: "yt", url: "https://youtube.com" },
              { s: "ig", url: "https://instagram.com" },
            ].map(({ s, url }) => (
              <a key={s} href={url}
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border flex items-center justify-center text-[10px] font-black uppercase transition-all hover:bg-white/10 hover:border-white/20"
                style={{ borderColor: "rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.28)" }}>
                {s}
              </a>
            ))}
          </div>
        </div>

        {[
          { title: "Soluções", links: [
            { label: "Segurança Perimetral", href: "#solucoes" },
            { label: "Monitoramento de Áreas", href: "#solucoes" },
            { label: "Inspeção Industrial", href: "#solucoes" },
            { label: "Gestão Ambiental", href: "#solucoes" },
            { label: "Smart Cities", href: "#solucoes" },
          ]},
          { title: "Produtos", links: [
            { label: "Matrice 4T", href: "/produto/matrice-4t" },
            { label: "Matrice 4E", href: "/produto/matrice-4e" },
            { label: "Dock 3 + Matrice 4TD", href: "/produto/matrice-4t" },
            { label: "FlightHub 2", href: "#produtos" },
            { label: "Matrice 4D", href: "#produtos" },
          ]},
          { title: "Empresa", links: [
            { label: "Sobre Nós", href: "#top" },
            { label: "Cases Reais", href: "#cases" },
            { label: "Materiais Grátis", href: "#iscas" },
            { label: "Blog Técnico", href: "#" },
            { label: "Carreiras", href: "#" },
          ]},
        ].map(col => (
          <div key={col.title}>
            <h5 className="text-[10px] font-bold uppercase tracking-[0.38em] mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}>{col.title}</h5>
            <ul className="space-y-2.5">
              {col.links.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-[12px] transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.3)" }}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>
          © {new Date().getFullYear()} Aero Drone Solutions · DJI Enterprise Partner · Brasília, DF
        </p>
        <div className="flex gap-5 flex-wrap justify-center">
          {[
            { label: "Termos", href: "#" },
            { label: "Privacidade", href: "#" },
            { label: "LGPD", href: "#" },
            { label: "Compliance", href: "#" },
          ].map(link => (
            <a key={link.label} href={link.href}
              className="text-[10px] font-bold uppercase tracking-wider transition-colors hover:text-white/50"
              style={{ color: "rgba(255,255,255,0.2)" }}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export const WhatsAppFloat: FC = () => (
  <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 2.5, type: "spring", bounce: 0.45 }}
    className="fixed wa-float z-[200] flex flex-col items-end gap-2">
    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.5 }}
      className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-white text-[11px] font-semibold shadow-xl"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}>
      <span>Resposta em até 1h</span><span className="text-xs">👋</span>
    </motion.div>
    <a href={waLink("Olá, vim pelo site da Aero Drone Solutions e gostaria de um diagnóstico gratuito.")}
      target="_blank" rel="noopener noreferrer"
      className="group relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110"
      style={{ background: "#25d366", boxShadow: "0 8px 32px rgba(37,211,102,0.45)" }}>
      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(37,211,102,0.25)" }} />
      <MessageCircle size={28} className="text-white relative z-10" />
    </a>
  </motion.div>
);
