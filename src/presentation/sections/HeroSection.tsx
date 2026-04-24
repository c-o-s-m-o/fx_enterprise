"use client";
import React, { FC, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { FadeUp, AnimNum } from "@/presentation/components/ui";
import { C } from "@/domain/constants/design-tokens";
import { HERO_SLIDES } from "@/data/hero-slides";
import { PRODUCTS } from "@/data/products";
import { toSlug } from "@/lib/slug";
import { useHeroSlider } from "@/application/hooks/useHeroSlider";

export const HeroSection: FC = () => {
  const {
    currentIndex: heroSlide,
    progress: heroProg,
    next: nextSlide,
    prev: prevSlide,
    goTo: goToSlide,
  } = useHeroSlider();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroParallax = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const curSlide = HERO_SLIDES[heroSlide];
  const curProd = PRODUCTS.find(p => p.id === curSlide.productId)!;

  return (
    <section ref={heroRef} id="top"
      className="relative min-h-[100dvh] flex items-end sm:items-center overflow-hidden"
      style={{ background: C.navy900 }}>

      {/* Vídeo de fundo */}
      <AnimatePresence mode="wait">
        <motion.div key={curProd.id + "-bg"}
          initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }} className="absolute inset-0" style={{ y: heroParallax }}>
          <video key={curSlide.videoSrc}
            className="w-full h-full object-cover scale-105"
            autoPlay muted loop playsInline poster={curProd.poster}
            onError={e => { (e.target as HTMLVideoElement).style.display = "none"; }}>
            <source src={curSlide.videoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to right, ${C.navy900} 0%, ${C.navy900}88 55%, ${C.navy900}30 100%)` }} />
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${C.navy900} 0%, transparent 55%)` }} />
        </motion.div>
      </AnimatePresence>

      {/* Glow accent */}
      <AnimatePresence mode="wait">
        <motion.div key={curProd.id + "-glow"}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 70% at 85% 50%, ${curProd.accent}18 0%, transparent 70%)` }} />
      </AnimatePresence>

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12 sm:pt-24 sm:pb-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[100dvh] sm:py-24">

          {/* Coluna esquerda */}
          <div className="lg:col-span-7 xl:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div key={curProd.id + "-content"}
                initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>

                {/* Badge */}
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
                    style={{ background: `${curProd.accent}20`, border: `1px solid ${curProd.accent}35` }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: curProd.accent }} />
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.35em]"
                      style={{ color: curProd.accent }}>{curSlide.badge}</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/20">{curSlide.code}</span>
                </div>

                {/* Título */}
                <h1 className="hn uppercase leading-[0.82] tracking-tight text-white mb-3"
                  style={{ fontSize: "clamp(54px,10vw,110px)" }}>
                  <span>{curProd.name.split(" ").slice(0, -1).join(" ")}</span><br />
                  <span className="hero-ghost">{curProd.name.split(" ").slice(-1)[0]}</span>
                </h1>

                <p className="font-light mb-2"
                  style={{ color: "rgba(255,255,255,0.50)", fontSize: "clamp(15px,3vw,24px)" }}>
                  {curProd.tagline}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 my-6">
                  {curProd.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="hn text-2xl font-black text-white">
                        {h.value}
                        <span className="text-base ml-0.5" style={{ color: curProd.accent }}>{h.unit}</span>
                      </span>
                      <span className="text-[10px] text-white/30 leading-tight max-w-[56px]">{h.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs — 🔁 links alterados para /produto */}
                <div className="flex flex-wrap gap-2.5">
                  <Link href={`/produto/${toSlug(curProd.id)}`}
                    className="group flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 text-[11px] font-extrabold uppercase tracking-[0.24em] text-white rounded-xl transition-all hover:opacity-90"
                    style={{ background: curProd.accent, boxShadow: `0 8px 32px ${curProd.accent}35` }}>
                    Ver Solução Completa <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <a href="#futuro"
                    className="flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 text-[11px] font-extrabold uppercase tracking-[0.24em] text-white/55 rounded-xl border border-white/10 hover:border-white/25 hover:text-white transition-all">
                    Ver Dados de Mercado
                  </a>
                </div>

                {/* Progress indicators + setas */}
                <div className="flex items-center gap-4 mt-8">
                  {HERO_SLIDES.map((_, i) => {
                    const p = PRODUCTS.find(px => px.id === HERO_SLIDES[i].productId)!;
                    return (
                      <button key={i} onClick={() => goToSlide(i)} className="group flex items-center gap-2">
                        <div className="relative overflow-hidden rounded-full h-[2px] bg-white/10 transition-all duration-500"
                          style={{ width: i === heroSlide ? 44 : 14, opacity: i === heroSlide ? 1 : 0.3 }}>
                          {i === heroSlide && (
                            <div className="absolute inset-y-0 left-0 rounded-full"
                              style={{ background: p.accent, width: `${heroProg}%` }} />
                          )}
                        </div>
                        <span className="text-[9px] font-bold text-white/25 group-hover:text-white/50 transition-colors">
                          0{i + 1}
                        </span>
                      </button>
                    );
                  })}
                  <div className="ml-auto flex gap-1">
                    <button onClick={prevSlide}
                      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white/50 hover:text-white">
                      <ChevronLeft size={14} />
                    </button>
                    <button onClick={nextSlide}
                      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white/50 hover:text-white">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Painel de telemetria — desktop */}
          <div className="lg:col-span-5 xl:col-span-4 hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div key={curProd.id + "-panel"}
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}>
                <div className="rounded-2xl overflow-hidden border"
                  style={{ background: "rgba(5,9,26,0.88)", backdropFilter: "blur(32px)", borderColor: "rgba(255,255,255,0.07)" }}>

                  <div className="px-6 py-4 border-b flex items-center justify-between"
                    style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                    <div>
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.4em] mb-0.5"
                        style={{ color: curProd.accent }}>Performance · DaaS</div>
                      <div className="text-[8px] font-mono text-white/18">
                        sm_company · {curProd.id} · ativo estratégico
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] text-emerald-400 font-bold">LIVE</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    {curProd.highlights.map((h, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                              style={{ background: "rgba(255,255,255,0.05)" }}>
                              <h.icon size={13} style={{ color: "rgba(255,255,255,0.35)" }} />
                            </div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/38">
                              {h.label}
                            </span>
                          </div>
                          <div className="hn text-xl font-black text-white">
                            <AnimNum val={h.value.replace(",", ".")} />
                            <span className="text-sm ml-0.5" style={{ color: curProd.accent }}>{h.unit}</span>
                          </div>
                        </div>
                        <div className="h-[2px] rounded-full bg-white/[0.06] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${72 + i * 9}%` }}
                            transition={{ duration: 1.2, ease: "circOut", delay: i * 0.1 }}
                            className="h-full rounded-full"
                            style={{ background: curProd.accent }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">Mercado 2035</span>
                      </div>
                      <span className="hn text-base font-black text-orange-400">US$700 Bi</span>
                    </div>
                    {/* 🔁 Link no painel também alterado */}
                    <Link href={`/produto/${toSlug(curProd.id)}`}
                      className="w-full py-2.5 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-lg transition-all hover:opacity-90"
                      style={{ background: `${curProd.accent}18`, color: curProd.accent, border: `1px solid ${curProd.accent}25` }}>
                      Ver Solução Completa <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2.3 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-20 pointer-events-none">
        <span className="text-[8px] text-white uppercase tracking-[0.44em]">Rolar</span>
        <ChevronDown size={12} className="text-white" />
      </motion.div>
    </section>
  );
};