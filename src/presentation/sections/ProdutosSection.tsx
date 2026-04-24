"use client";
import React, { FC } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, Layers2 } from "lucide-react";
import { FadeUp, SectionTag } from "@/presentation/components/ui";
import { Section, Container, Card, AccentPill } from "@/presentation/components/ui/primitives";
import { C } from "@/domain/constants/design-tokens";
import { waLink } from "@/domain/constants/wa";
import { PRODUCTS } from "@/data/products";
import { toSlug } from "@/lib/slug";

export const ProdutosSection: FC = () => (
  <Section id="produtos" bg="light2">
    <Container>
      <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
        <div>
          <SectionTag label="Linha Matrice 4 · DJI Enterprise" />
          <h2 className="hn text-4xl sm:text-5xl font-black uppercase leading-[0.88]" style={{ color: C.ink900 }}>
            Tecnologia DJI<br /><span style={{ color: C.orange }}>Enterprise 2025.</span>
          </h2>
        </div>
        <p className="text-[14px] leading-relaxed max-w-xs sm:text-right" style={{ color: C.ink400 }}>
          Equipamentos de grau industrial integrados à nossa expertise para missões críticas em todo o Brasil.
        </p>
      </FadeUp>

      <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
        {PRODUCTS.map((prod, i) => (
          <FadeUp key={prod.id} delay={i * 0.07}>
            <div className="relative group">
              {/* 🔁 Link alterado para /produto */}
              <Link href={`/produto/${toSlug(prod.id)}`} className="block">
                <Card variant="light" rounded="xl"
                  className="border-transparent hover:border-gray-100 cursor-pointer transition-all duration-400 hover:shadow-2xl">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <video
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      autoPlay muted loop playsInline poster={prod.poster}
                      onError={e => { (e.target as HTMLVideoElement).style.display = "none"; }}>
                      <source src={prod.videoSrc} type="video/mp4" />
                    </video>
                    <img src={prod.poster} alt={prod.name}
                      className="absolute inset-0 w-full h-full object-cover -z-10" />
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 50%)" }} />
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold text-white border border-white/20 backdrop-blur-sm"
                      style={{ background: `${prod.accent}cc` }}>
                      {prod.category}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 flex-wrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      {prod.highlights.map((h, hi) => (
                        <div key={hi} className="flex items-center gap-1.5 bg-black/55 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/10">
                          <span className="hn text-[13px] font-black text-white">
                            {h.value}<span className="text-[10px]" style={{ color: prod.accent }}>{h.unit}</span>
                          </span>
                          <span className="text-[9px] text-white/45">{h.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 sm:p-7">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="hn text-xl sm:text-2xl font-black uppercase tracking-tight mb-0.5"
                          style={{ color: C.ink900 }}>{prod.name}</h3>
                        <p className="text-[11px] italic" style={{ color: C.ink400 }}>{prod.tagline}</p>
                      </div>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${prod.accent}15` }}>
                        <ArrowUpRight size={14} style={{ color: prod.accent }} />
                      </div>
                    </div>

                    <p className="text-[12px] leading-relaxed mb-4 line-clamp-2"
                      style={{ color: C.ink400 }}>{prod.taglineSub}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {prod.capabilities.slice(0, 3).map((c, ci) => (
                        <AccentPill key={ci} accent={prod.accent}>
                          {c.label.split(" ").slice(0, 3).join(" ")}
                        </AccentPill>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <span
                        className="flex-1 flex items-center justify-center gap-1.5 py-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white rounded-xl transition-all hover:opacity-90"
                        style={{ background: prod.accent }}>
                        Ver Produto
                      </span>
                      <button
                        type="button"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(waLink("Olá, quero uma demo do " + prod.name), "_blank", "noopener,noreferrer");
                        }}
                        className="relative z-10 flex items-center justify-center gap-1 px-3.5 py-3 text-[10px] font-bold border-2 rounded-xl hover:bg-gray-50 transition-all"
                        style={{ borderColor: C.bLight, color: C.ink500 }}>
                        <MessageCircle size={12} /> Demo
                      </button>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* Tabela comparativa (inalterada) */}
      <FadeUp delay={0.1} className="mt-12">
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: C.bLight }}>
          <div className="px-5 sm:px-6 py-4 border-b flex items-center gap-3"
            style={{ background: C.navy800, borderColor: "rgba(255,255,255,0.06)" }}>
            <Layers2 size={16} className="text-orange-400" />
            <span className="text-[12px] font-bold text-white uppercase tracking-widest">
              Comparativo Rápido — Série Matrice 4
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] sm:text-[12px]" style={{ background: C.light100 }}>
              <thead>
                <tr className="border-b" style={{ borderColor: C.bLight }}>
                  <th className="text-left px-4 sm:px-5 py-3 font-bold" style={{ color: C.ink500 }}>Recurso</th>
                  {["Matrice 4T", "Matrice 4E", "M4D / Matrice 4TD"].map(h => (
                    <th key={h} className="px-4 sm:px-5 py-3 font-bold text-center" style={{ color: C.ink900 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Câmera Térmica 640 px",  "✓ VOx LWIR", "✗",            "✓ VOx LWIR"],
                  ["Night Scene f/1.7",      "✓",          "✗",            "✓ (Matrice 4TD)"],
                  ["Obturador Mecânico",      "✗",          "✓ 4/3 CMOS",   "✗"],
                  ["RTK ±1 cm",              "✗",          "✓ nativo",      "✓ (M4D)"],
                  ["Telêmetro Laser 1.800 m","✓",          "✓",            "✓"],
                  ["Compatible com Dock 3",  "✗",          "✗",            "✓ nativo"],
                  ["Autonomia",              ">48 min",    ">48 min",       "~48 min"],
                  ["Uso principal", "Segurança · SAR", "Mapeamento · Topografia", "Operação autônoma 24/7"],
                ].map((row, i) => (
                  <tr key={i} className="border-b" style={{ borderColor: C.bLighter }}>
                    {row.map((cell, j) => (
                      <td key={j}
                        className={`px-4 sm:px-5 py-3 ${j === 0 ? "font-semibold text-left" : "text-center"}`}
                        style={{ color: cell === "✓" ? "#10b981" : cell === "✗" ? C.ink300 : C.ink500 }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeUp>
    </Container>
  </Section>
);