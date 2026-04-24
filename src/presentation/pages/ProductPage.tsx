// src/presentation/pages/ProductPage.tsx
"use client";
import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, MessageCircle, Cpu, ZoomIn } from "lucide-react";
import { FadeUp, SectionTag, AnimNum } from "@/presentation/components/ui";
import { VideoPlayer, Lightbox } from "@/presentation/components/ui/media";
import { C } from "@/domain/constants/design-tokens";
import { waLink } from "@/domain/constants/wa";
import type { Product } from "@/domain/entities/Product";
import type { GalleryItem } from "@/domain/entities/index";

interface ProductPageProps {
  product: Product;
  fromSegment?: string;
  onBack: () => void;
  onContact: () => void;
}

export const ProductPage: FC<ProductPageProps> = ({ product: p, fromSegment, onBack, onContact }) => {
  const [specGroup, setSpecGroup] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState<GalleryItem | null>(null);
  const [activeNav, setActiveNav] = useState("overview");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const PNAV = [
    { id: "overview", label: "Visão Geral" },
    { id: "capabilities", label: "Capacidades" },
    { id: "specs", label: "Especificações" },
    { id: "usecases", label: "Aplicações" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(`prod-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveNav(id);
  };

  const prodGallery: GalleryItem[] = p.gallery.map((src, i) => ({
    id: 100 + i, thumb: src, full: src,
    title: `${p.name} — Imagem ${i + 1}`, cat: p.category,
  }));

  // Reordenar useCases com base no segmento de origem
  const getSortedUseCases = () => {
    if (!fromSegment) return p.useCases;
    const keywords: Record<string, string[]> = {
      seguranca: ["Segurança", "Perimetral", "Noturna", "Shield"],
      agro: ["Ambiental", "NDVI", "Florestal", "TreePine"],
      energia: ["Inspeção", "Térmica", "Industrial", "Factory"],
      engenharia: ["Topografia", "Mapeamento", "RTK", "Map"],
    };
    const kw = keywords[fromSegment] || [];
    return [...p.useCases].sort((a, b) => {
      const aScore = kw.some(k => a.title.includes(k)) ? 1 : 0;
      const bScore = kw.some(k => b.title.includes(k)) ? 1 : 0;
      return bScore - aScore;
    });
  };

  const sortedUseCases = getSortedUseCases();

  return (
    <div className="min-h-screen" style={{ background: C.light200 }}>
      <Lightbox item={galleryOpen} onClose={() => setGalleryOpen(null)} />

      {/* Navbar produto */}
      <div className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${scrolled ? "shadow-xl" : ""}`}
        style={{
          background: `${C.navy900}f8`,
          backdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <button onClick={onBack} className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all">
              <ArrowLeft size={14} className="text-white/70" />
            </div>
            <span className="text-[11px] font-semibold text-white/50 hidden sm:block">← Voltar</span>
          </button>
          <div className="hidden md:flex items-center justify-center gap-1 flex-1">
            {PNAV.map(n => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className="px-3.5 py-1.5 text-[10px] font-bold rounded-full transition-all"
                style={{
                  background: activeNav === n.id ? p.accent : "transparent",
                  color: activeNav === n.id ? "#fff" : "rgba(255,255,255,0.4)",
                }}>
                {n.label}
              </button>
            ))}
          </div>
          <a href={waLink("Olá, quero uma demonstração do " + p.name + " para minha operação.")}
            target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1.5 px-3.5 sm:px-5 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white rounded-lg transition-all hover:opacity-90"
            style={{ background: p.accent }}>
            <MessageCircle size={11} />
            <span className="hidden sm:inline">Demo WA</span>
            <span className="sm:hidden">Demo</span>
          </a>
        </div>
        <div className="md:hidden flex gap-2 px-4 pb-2 overflow-x-auto scrollbar-hide">
          {PNAV.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)}
              className="flex-shrink-0 px-3 py-1.5 text-[10px] font-bold rounded-full transition-all"
              style={{
                background: activeNav === n.id ? p.accent : "rgba(255,255,255,0.07)",
                color: activeNav === n.id ? "#fff" : "rgba(255,255,255,0.45)",
              }}>
              {n.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero produto */}
      <section className="relative min-h-[100dvh] flex items-end sm:items-center overflow-hidden"
        style={{ background: C.navy900 }}>
        <div className="absolute inset-0">
          <VideoPlayer src={p.videoSrc} poster={p.poster} accent={p.accent} autoPlay className="w-full h-full" />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to right, ${C.navy900}f2 0%, ${C.navy900}95 55%, ${C.navy900}40 100%)` }} />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${C.navy900} 0%, transparent 60%)` }} />
        </div>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 60% at 80% 40%, ${p.accent}12 0%, transparent 70%)` }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-12 sm:pt-32 sm:pb-24 w-full">
          <div className="max-w-xl">
            <FadeUp><SectionTag label={p.category} dark /></FadeUp>
            <FadeUp delay={0.07}>
              <h1 className="hn uppercase leading-[0.84] text-white tracking-tight mb-3"
                style={{ fontSize: "clamp(52px, 14vw, 108px)" }}>
                {p.nameShort}
              </h1>
              <p className="font-light mb-2 leading-snug"
                style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(16px,4vw,26px)" }}>{p.tagline}</p>
              <p className="text-[13px] sm:text-[15px] font-light mb-6"
                style={{ color: "rgba(255,255,255,0.30)" }}>{p.taglineSub}</p>
            </FadeUp>
            <FadeUp delay={0.13}>
              <div className="flex flex-wrap gap-2 mb-7">
                {p.heroDesc.split(" · ").map((item, i) => (
                  <span key={i} className="text-[11px] px-3 py-1.5 rounded-full font-medium border"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderColor: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.55)",
                    }}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex gap-2.5 flex-wrap">
                <button onClick={() => scrollTo("overview")}
                  className="flex items-center gap-2 px-5 sm:px-7 py-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-white rounded-xl transition-all hover:opacity-90 group"
                  style={{ background: p.accent, boxShadow: `0 8px 28px ${p.accent}30` }}>
                  Explorar <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <a href={waLink("Olá, quero falar sobre o " + p.name + " com um especialista.")}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 sm:px-7 py-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/60 border border-white/15 hover:border-white/30 hover:text-white rounded-xl transition-all">
                  <MessageCircle size={12} /> WhatsApp
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2.3 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-20 pointer-events-none">
          <span className="text-[8px] text-white uppercase tracking-[0.44em]">Rolar</span>
          <ChevronDown size={12} className="text-white" />
        </motion.div>
      </section>

      {/* Highlights barra */}
      <div style={{ background: p.accent }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-black/10">
            {p.highlights.map((h, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="py-5 sm:py-7 px-4 sm:px-8 text-center">
                  <h.icon size={15} className="mx-auto mb-1.5 text-white/50" />
                  <div className="hn text-3xl sm:text-4xl font-black text-white leading-none mb-1">
                    <AnimNum val={h.value.replace(",", ".")} />
                    <span className="text-xl sm:text-2xl ml-1">{h.unit}</span>
                  </div>
                  <div className="text-[10px] text-white/60 font-medium uppercase tracking-wider">{h.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* Overview */}
      <section id="prod-overview" className="py-16 sm:py-24" style={{ background: C.light100 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <FadeUp>
              <SectionTag label="Visão Geral" />
              <h2 className="hn text-4xl sm:text-5xl font-black uppercase leading-[0.88] mb-5" style={{ color: C.ink900 }}>
                Por que o<br /><span style={{ color: p.accent }}>{p.nameShort}?</span>
              </h2>
              <p className="text-[14px] sm:text-[15px] leading-relaxed mb-7" style={{ color: C.ink500 }}>{p.overview}</p>
              {p.dockCompat && (
                <div className="flex gap-3 p-4 rounded-xl mb-7 border"
                  style={{ background: `${p.accent}08`, borderColor: `${p.accent}25` }}>
                  <Cpu size={15} className="mt-0.5 shrink-0" style={{ color: p.accent }} />
                  <p className="text-[13px] leading-relaxed" style={{ color: C.ink500 }}>
                    <strong className="font-bold" style={{ color: C.ink700 }}>Compatibilidade Dock:</strong> {p.dockCompat}
                  </p>
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <button onClick={() => scrollTo("specs")}
                  className="flex items-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] border-2 hover:bg-gray-50 transition-colors rounded-xl"
                  style={{ borderColor: C.light400, color: C.ink700 }}>
                  Ver Specs
                </button>
                <a href={waLink("Olá, quero uma demonstração do " + p.name + ".")}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white rounded-xl transition-all hover:opacity-90"
                  style={{ background: p.accent }}>
                  Demo WhatsApp <ArrowRight size={12} />
                </a>
              </div>
            </FadeUp>
            <FadeUp delay={0.12}>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl"
                style={{ aspectRatio: "16/10", maxHeight: "50vw" }}>
                <VideoPlayer src={p.videoSrc} poster={p.poster} accent={p.accent} autoPlay={false} className="w-full h-full" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Capacidades */}
      <section id="prod-capabilities" className="py-14 sm:py-24" style={{ background: C.light200 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeUp className="text-center max-w-xl mx-auto mb-12">
            <SectionTag label="Capacidades Técnicas" />
            <h2 className="hn text-3xl sm:text-5xl font-black uppercase leading-[0.88]" style={{ color: C.ink900 }}>
              O que o <span style={{ color: p.accent }}>{p.nameShort}</span><br />entrega.
            </h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {p.capabilities.map((cap, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="group bg-white rounded-2xl p-5 sm:p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-100"
                  style={{ boxShadow: C.shadow }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                    style={{ background: `${p.accent}15` }}>
                    <cap.icon size={18} style={{ color: p.accent }} />
                  </div>
                  <h3 className="text-[14px] font-bold mb-1.5" style={{ color: C.ink900 }}>{cap.label}</h3>
                  <p className="text-[12px] leading-relaxed" style={{ color: C.ink400 }}>{cap.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section id="prod-specs" className="py-14 sm:py-24" style={{ background: C.navy800 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeUp className="text-center max-w-lg mx-auto mb-10">
            <SectionTag label="Especificações Técnicas" dark />
            <h2 className="hn text-3xl sm:text-5xl font-black uppercase leading-[0.88] text-white">
              Cada detalhe,<br /><span style={{ color: p.accent }}>engenhado.</span>
            </h2>
          </FadeUp>
          <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
            {p.specs.map((grp, i) => (
              <button key={i} onClick={() => setSpecGroup(i)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all"
                style={{
                  background: specGroup === i ? p.accent : "rgba(255,255,255,0.08)",
                  color: specGroup === i ? "#fff" : "rgba(255,255,255,0.45)",
                }}>
                {grp.group}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={specGroup}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/[0.07]"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              {p.specs[specGroup].items.map((spec, i) => (
                <div key={i}
                  className={`flex items-start justify-between gap-4 px-5 sm:px-7 py-3.5 hover:bg-white/[0.03] transition-colors ${
                    i < p.specs[specGroup].items.length - 1 ? "border-b border-white/[0.05]" : ""
                  }`}>
                  <span className="text-[12px] sm:text-[13px] flex-1"
                    style={{ color: "rgba(255,255,255,0.42)" }}>{spec.k}</span>
                  <span className="text-[12px] sm:text-[13px] font-semibold text-white text-right">{spec.v}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Use Cases (ordenados) */}
      <section id="prod-usecases" className="py-14 sm:py-24" style={{ background: C.light100 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeUp className="text-center max-w-lg mx-auto mb-12">
            <SectionTag label="Aplicações Reais" />
            <h2 className="hn text-3xl sm:text-5xl font-black uppercase leading-[0.88]" style={{ color: C.ink900 }}>
              Onde o <span style={{ color: p.accent }}>{p.nameShort}</span><br />opera.
            </h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {sortedUseCases.map((uc, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div className="group flex gap-4 p-5 sm:p-6 bg-white rounded-2xl border hover:border-transparent hover:shadow-xl transition-all duration-300"
                  style={{ borderColor: C.bLight }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                    style={{ background: `${p.accent}12` }}>
                    <uc.icon size={20} style={{ color: p.accent }} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold mb-1" style={{ color: C.ink900 }}>{uc.title}</h3>
                    <p className="text-[12px] sm:text-[13px] leading-relaxed" style={{ color: C.ink400 }}>{uc.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria produto */}
      {prodGallery.length > 0 && (
        <section className="py-14 sm:py-20" style={{ background: C.light200 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeUp className="text-center mb-10">
              <SectionTag label="Em Campo" />
              <h2 className="hn text-3xl sm:text-4xl font-black uppercase" style={{ color: C.ink900 }}>
                {p.nameShort} em <span style={{ color: p.accent }}>ação.</span>
              </h2>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {prodGallery.map((img, i) => (
                <FadeUp key={i} delay={i * 0.08}>
                  <div className="group relative overflow-hidden rounded-xl cursor-pointer"
                    style={{ aspectRatio: i === 0 ? "4/3" : "1/1" }}
                    onClick={() => setGalleryOpen(img)}>
                    <img src={img.thumb} alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-white/20 border border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                        <ZoomIn size={16} className="text-white" />
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA produto */}
      <section className="py-16 sm:py-24 relative overflow-hidden" style={{ background: p.accent }}>
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle at 95% 50%, rgba(255,255,255,0.12) 0%, transparent 55%)" }} />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative">
          <FadeUp>
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.42em] mb-3">Pronto para começar?</p>
            <h2 className="hn text-4xl sm:text-5xl font-black uppercase leading-[0.86] text-white mb-4">
              Veja o {p.nameShort}<br />na sua operação.
            </h2>
            <p className="text-white/60 text-[14px] max-w-sm mx-auto mb-8 leading-relaxed">
              Diagnóstico gratuito com nosso engenheiro. Proposta com ROI em 48h.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href={waLink("Olá, quero uma demonstração do " + p.name + " para minha operação.")}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-8 py-4 text-[11px] font-extrabold uppercase tracking-[0.26em] rounded-xl transition-all hover:opacity-90 shadow-2xl"
                style={{ background: "#25d366", color: "#fff" }}>
                <MessageCircle size={14} /> WhatsApp Agora
              </a>
              <Link href="/"
                className="flex items-center justify-center gap-2.5 border-2 border-white/30 hover:border-white text-white px-8 py-4 text-[11px] font-extrabold uppercase tracking-[0.26em] rounded-xl hover:bg-white/10 transition-all">
                <ArrowLeft size={13} /> Outros Produtos
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer produto */}
      <div className="py-4 text-center text-[11px] border-t"
        style={{ background: C.navy900, color: "rgba(255,255,255,0.25)", borderColor: "rgba(255,255,255,0.05)" }}>
        <Link href="/" className="hover:text-white/50 transition-colors">← Voltar ao início</Link>
        <span className="mx-4 opacity-30">·</span>
        <span>© {new Date().getFullYear()} Aero Drone Solutions · DJI Enterprise</span>
      </div>
    </div>
  );
};