// src/app/solucoes/[segmento]/page.tsx
"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, TrendingUp, BarChart3,
  Users, MapPin, MessageCircle, X, Quote, Database,
  Eye, Target, Radar, Activity, Clock, DollarSign,
  Building2, Shield, Cpu, Globe, Lock, Layers,
  Award, ThumbsUp, ChevronRight, Play, TrendingDown,
  CloudRain, ScanLine, ShieldCheck,
  FileText, Check, Star, Rocket, Zap, Timer, ChevronDown,
  Phone, Mail, ArrowUpRight
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { SEGMENT_BY_SLUG } from "@/domain/constants/segments";
import { C } from "@/domain/constants/design-tokens";
import { Container } from "@/presentation/components/ui/primitives";
import { SegmentPageClient } from "./SegmentPageClient";
import { waLink } from "@/domain/constants/wa";
import { SEGMENT_ENHANCED_DETAILS } from "@/data/segment-enhanced-content";
import { toSlug } from "@/lib/slug";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const FONT_IMPORT = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;600&display=swap');
`;

const GLOBAL_CSS = `
  .seg-page { font-family: 'DM Sans', system-ui, sans-serif; }
  .seg-display { font-family: 'Syne', system-ui, sans-serif; }
  .seg-mono { font-family: 'JetBrains Mono', monospace; }
  .seg-page * { box-sizing: border-box; }
  .noise-overlay::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1;
  }
  @keyframes pulse-ring {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.5); opacity: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes scroll-hint {
    0%, 100% { opacity: 0.4; transform: translateY(0); }
    50% { opacity: 1; transform: translateY(6px); }
  }
  .float-anim { animation: float 4s ease-in-out infinite; }
  .scroll-hint { animation: scroll-hint 2s ease-in-out infinite; }
  .pulse-dot::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: inherit;
    animation: pulse-ring 2s ease-out infinite;
  }
`;

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
const AnimatedCounter = ({
  value, suffix = "", prefix = "", duration = 2, decimals = 0
}: { value: number; suffix?: string; prefix?: string; duration?: number; decimals?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = value / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else { setCount(start); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  const formatted = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString("pt-BR");
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
};

// ─── LIVE COST TICKER ─────────────────────────────────────────────────────────
const LiveCostTicker = ({ accentColor }: { accentColor: string }) => {
  const [elapsed, setElapsed] = useState(0);
  const PER_SECOND = 35400 / (30 * 24 * 3600); // R$35.400/mês → por segundo

  useEffect(() => {
    const t = setInterval(() => setElapsed(prev => prev + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const cost = (elapsed * PER_SECOND).toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });
  return (
    <div className="inline-flex flex-col items-center">
      <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2 seg-mono">
        Custo acumulado desta visita com vigilância humana
      </div>
      <div className="seg-mono text-3xl md:text-4xl font-bold text-red-400 tabular-nums">{cost}</div>
    </div>
  );
};

// ─── SECTION TAG ──────────────────────────────────────────────────────────────
const Tag = ({ label, color }: { label: string; color?: string }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
    style={{ background: color ? `${color}18` : "rgba(255,255,255,0.08)", border: `1px solid ${color || "rgba(255,255,255,0.12)"}` }}>
    <span className="w-1.5 h-1.5 rounded-full" style={{ background: color || "#fff" }} />
    <span className="seg-mono text-[10px] font-semibold uppercase tracking-[0.15em]"
      style={{ color: color || "rgba(255,255,255,0.6)" }}>{label}</span>
  </div>
);

// ─── PROGRESS NAV ─────────────────────────────────────────────────────────────
const ProgressNav = ({ sections, accentColor }: { sections: string[]; accentColor: string }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const ids = ["hero", "problema", "solucao", "comparativo", "cases", "roi", "faq"];
      let found = 0;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) found = i;
      });
      setActive(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3">
      {sections.map((s, i) => (
        <a key={i} href={`#${["hero", "problema", "solucao", "comparativo", "cases", "roi", "faq"][i]}`}
          title={s}
          className="group flex items-center gap-2 cursor-pointer"
          onClick={() => setActive(i)}
        >
          <span className={`text-xs seg-mono transition-all duration-300 opacity-0 group-hover:opacity-100 text-right whitespace-nowrap`}
            style={{ color: accentColor }}>{s}</span>
          <div className={`w-2 h-2 rounded-full transition-all duration-300 relative ${active === i ? "scale-150" : "opacity-40 hover:opacity-70"}`}
            style={{ background: active === i ? accentColor : "rgba(255,255,255,0.4)" }} />
        </a>
      ))}
    </nav>
  );
};

// ─── PROBLEM CARD ─────────────────────────────────────────────────────────────
const ProblemCard = ({ problem, index }: { problem: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="group relative overflow-hidden rounded-3xl border border-white/8 hover:border-red-500/30 transition-all duration-500"
    style={{ background: "rgba(255,255,255,0.03)" }}
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.06) 0%, transparent 100%)" }} />
    <div className="p-6 relative z-10">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: "rgba(239,68,68,0.12)" }}>
          <AlertTriangle size={18} className="text-red-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="seg-display font-bold text-lg text-white mb-2">{problem.title}</h3>
          <p className="text-white/50 text-sm leading-relaxed mb-4">{problem.description}</p>
          <div className="flex flex-wrap gap-2">
            {problem.financialImpact && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-300">
                <DollarSign size={10} /> {problem.financialImpact}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-300">
              ⛔ {problem.consequence}
            </span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// ─── STAT PILL ────────────────────────────────────────────────────────────────
const StatPill = ({ stat, label, source, accentColor, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="relative overflow-hidden rounded-2xl p-6 border"
    style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
  >
    <div className="seg-display text-3xl md:text-4xl font-bold mb-2" style={{ color: accentColor }}>{stat}</div>
    <div className="text-white text-sm font-medium mb-2">{label}</div>
    {source && <div className="text-white/30 text-xs seg-mono">{source}</div>}
  </motion.div>
);

// ─── BENCHMARKING ROW ─────────────────────────────────────────────────────────
const BenchRow = ({ row, index, accentColor }: { row: any; index: number; accentColor: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06, duration: 0.5 }}
    className="grid grid-cols-4 gap-4 py-4 px-4 rounded-2xl hover:bg-white/3 transition-colors group"
    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
  >
    <div className="text-white/70 text-sm font-medium col-span-1">{row.criteria}</div>
    <div className="text-red-400/80 text-sm text-center">{row.human}</div>
    <div className="text-sm text-center font-semibold" style={{ color: accentColor }}>{row.drone}</div>
    <div className="text-emerald-400 text-sm text-center font-semibold seg-mono">{row.improvement}</div>
  </motion.div>
);

// ─── EFFICACY METRIC ──────────────────────────────────────────────────────────
const EfficacyMetric = ({ metric, value, source, accentColor, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.5 }}
    className="flex items-center justify-between py-4 border-b border-white/8 group"
  >
    <span className="text-white/60 text-sm group-hover:text-white/80 transition">{metric}</span>
    <div className="text-right">
      <div className="seg-display text-xl font-bold" style={{ color: accentColor }}>{value}</div>
      <div className="text-white/30 text-xs seg-mono">{source}</div>
    </div>
  </motion.div>
);

// ─── CASE CARD ────────────────────────────────────────────────────────────────
const CaseCard = ({ c, accentColor, index }: { c: any; accentColor: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="relative rounded-3xl overflow-hidden border border-white/8 hover:border-white/16 transition-all duration-500 group"
    style={{ background: "rgba(255,255,255,0.03)" }}
  >
    <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}44)` }} />
    <div className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Building2 size={14} className="text-white/40" />
            <span className="text-white/40 text-xs font-medium">{c.company}</span>
            <span className="text-white/20">·</span>
            <MapPin size={14} className="text-white/40" />
            <span className="text-white/40 text-xs">{c.location}</span>
          </div>
          <h3 className="seg-display text-xl font-bold text-white">{c.title}</h3>
        </div>
        {c.timeline && (
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold seg-mono shrink-0 ml-4"
            style={{ background: `${accentColor}18`, color: accentColor }}>
            {c.timeline}
          </span>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-2xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">Antes</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">{c.before}</p>
        </div>
        <div className="p-4 rounded-2xl" style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.15)" }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Depois</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">{c.after}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {c.results.map((r: string, i: number) => (
          <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: `${accentColor}18`, color: accentColor }}>
            <Check size={10} /> {r}
          </span>
        ))}
      </div>
      {c.quote && (
        <div className="p-4 rounded-2xl relative" style={{ background: "rgba(255,255,255,0.04)" }}>
          <Quote size={16} className="text-white/20 mb-2" />
          <p className="text-white/70 text-sm italic leading-relaxed">"{c.quote}"</p>
          {c.quoteAuthor && <p className="text-white/40 text-xs mt-2">— {c.quoteAuthor}</p>}
        </div>
      )}
      {(c.investment || c.roi) && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {c.investment && (
            <div className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
              <div className="text-white/30 text-xs mb-1">Investimento</div>
              <div className="text-white font-semibold text-sm">{c.investment}</div>
            </div>
          )}
          {c.roi && (
            <div className="p-3 rounded-xl" style={{ background: `${accentColor}12` }}>
              <div className="text-white/30 text-xs mb-1">ROI</div>
              <div className="font-semibold text-sm" style={{ color: accentColor }}>{c.roi}</div>
            </div>
          )}
        </div>
      )}
    </div>
  </motion.div>
);

// ─── ROI CALCULATOR ───────────────────────────────────────────────────────────
const ROICalculator = ({
  defaults, accentColor, segmentLabel
}: {
  defaults: any; accentColor: string; segmentLabel: string;
}) => {
  const [staffCount, setStaffCount] = useState(defaults.staffCount);
  const [staffCost, setStaffCost] = useState(defaults.staffCost);
  const [area, setArea] = useState(defaults.area);

  const DRONE_MONTHLY = defaults.droneMonthlyCost;
  const humanMonthly = staffCount * staffCost;
  const savingsMonthly = humanMonthly - DRONE_MONTHLY;
  const savingsAnnual = savingsMonthly * 12;
  const INVESTMENT = 205000;
  const payback = savingsMonthly > 0 ? INVESTMENT / savingsMonthly : 0;
  const reduction = ((humanMonthly - DRONE_MONTHLY) / humanMonthly) * 100;

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

  const SliderField = ({
    label, value, onChange, min, max, step, format, unit
  }: {
    label: string; value: number; onChange: (v: number) => void;
    min: number; max: number; step: number; format: (v: number) => string; unit: string;
  }) => (
    <div>
      <div className="flex justify-between mb-3">
        <span className="text-white/60 text-sm">{label}</span>
        <span className="text-white font-bold seg-mono text-sm">{format(value)} {unit}</span>
      </div>
      <div className="relative">
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-1 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) 100%)`
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="rounded-3xl p-8 border border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
        <Tag label="Simulador de ROI" color={accentColor} />
        <h3 className="seg-display text-2xl font-bold text-white mb-8">Configure sua operação</h3>
        <div className="space-y-8">
          <SliderField label="Número de vigilantes" value={staffCount} onChange={setStaffCount}
            min={2} max={30} step={1} format={v => String(v)} unit="pessoas" />
          <SliderField label="Custo por vigilante/mês" value={staffCost} onChange={setStaffCost}
            min={2000} max={8000} step={100} format={v => fmt(v)} unit="" />
          <SliderField label="Área monitorada" value={area} onChange={setArea}
            min={5000} max={500000} step={5000} format={v => v.toLocaleString("pt-BR")} unit="m²" />
        </div>
      </div>

      <div className="space-y-4">
        <motion.div key={savingsAnnual}
          initial={{ scale: 0.97 }}
          animate={{ scale: 1 }}
          className="rounded-3xl p-8 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}08)`, border: `1px solid ${accentColor}30` }}>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-10"
            style={{ background: accentColor, transform: "translate(30%, -30%)" }} />
          <div className="relative z-10">
            <div className="text-white/50 text-sm mb-2">Economia projetada por ano</div>
            <div className="seg-display text-5xl font-bold mb-1" style={{ color: accentColor }}>
              {fmt(savingsAnnual)}
            </div>
            <div className="text-white/40 text-sm seg-mono">{Math.round(reduction)}% de redução no custo de segurança</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Custo atual/mês", value: fmt(humanMonthly), sub: "vigilância humana", color: "rgba(239,68,68,0.15)", textColor: "#f87171" },
            { label: "Com drone/mês", value: fmt(DRONE_MONTHLY), sub: "Dock 3 + Matrice 4TD", color: `${accentColor}15`, textColor: accentColor },
            { label: "Payback em", value: `${payback.toFixed(1)}`, sub: "meses para ROI", color: "rgba(52,211,153,0.12)", textColor: "#34d399" }
          ].map((item, i) => (
            <div key={i} className="rounded-2xl p-4 border border-white/8" style={{ background: item.color }}>
              <div className="text-white/40 text-xs mb-2">{item.label}</div>
              <div className="seg-display text-xl font-bold mb-1" style={{ color: item.textColor }}>{item.value}</div>
              <div className="text-white/30 text-xs">{item.sub}</div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl p-6 border border-white/8" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="text-white/60 text-sm mb-4 font-medium">Projeção acumulada (5 anos)</div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(year => {
              const net = savingsAnnual * year - INVESTMENT;
              const isPos = net >= 0;
              const barPct = Math.min(100, Math.abs(net) / (INVESTMENT * 1.5) * 100);
              return (
                <div key={year} className="flex items-center gap-3">
                  <span className="text-white/40 text-xs seg-mono w-12">Ano {year}</span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div className="h-full rounded-full"
                      initial={{ width: 0 }} animate={{ width: `${barPct}%` }}
                      transition={{ duration: 0.6, delay: year * 0.1 }}
                      style={{ background: isPos ? "#34d399" : "#f87171" }} />
                  </div>
                  <span className={`text-xs font-semibold seg-mono w-28 text-right ${isPos ? "text-emerald-400" : "text-red-400"}`}>
                    {isPos ? "+" : ""}{fmt(net)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <a
          href={waLink(`Olá, simulei o ROI para ${segmentLabel} e gostaria de uma proposta personalizada. Economia anual projetada: ${fmt(savingsAnnual)}.`)}
          target="_blank" rel="noopener noreferrer"
          className="w-full py-5 rounded-2xl font-bold text-white text-sm uppercase tracking-wider transition-all hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center gap-3"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, boxShadow: `0 8px 32px ${accentColor}40` }}>
          Receber proposta via WhatsApp <ArrowRight size={18} />
        </a>
        <p className="text-center text-white/30 text-xs">Diagnóstico gratuito em até 48h • Sem compromisso</p>
      </div>
    </div>
  );
};

// ─── TECHNOLOGY FEATURE ───────────────────────────────────────────────────────
const TechFeature = ({ item, index, accentColor }: { item: any; index: number; accentColor: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    className="group relative overflow-hidden rounded-3xl p-6 border border-white/8 hover:border-white/16 transition-all duration-500 cursor-default"
    style={{ background: "rgba(255,255,255,0.03)" }}
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}10, transparent 70%)` }} />
    <div className="relative z-10">
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: `${accentColor}18` }}>
        <Cpu size={18} style={{ color: accentColor }} />
      </div>
      <h3 className="seg-display font-bold text-white text-lg mb-2">{item.title || item.name}</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-3">{item.description}</p>
      {item.dataPoint && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold seg-mono"
          style={{ background: `${accentColor}18`, color: accentColor }}>
          <Zap size={10} /> {item.dataPoint}
        </div>
      )}
    </div>
  </motion.div>
);

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
const FAQItem = ({ item, index, accentColor }: { item: any; index: number; accentColor: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="border-b border-white/8 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 gap-4 text-left group"
      >
        <span className="text-white font-medium group-hover:text-white/80 transition">{item.question}</span>
        <div className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ background: open ? `${accentColor}18` : "transparent", borderColor: open ? `${accentColor}40` : "rgba(255,255,255,0.1)" }}>
          <ChevronDown size={14} style={{ color: open ? accentColor : "rgba(255,255,255,0.5)" }} />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-5">
              <p className="text-white/50 text-sm leading-relaxed">{item.answer}</p>
              {item.dataSource && (
                <p className="text-white/25 text-xs mt-3 seg-mono">Fonte: {item.dataSource}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function SegmentPage() {
  const params = useParams();
  const segmento = params.segmento as string;
  const segmentMeta = SEGMENT_BY_SLUG[segmento];
  if (!segmentMeta) return notFound();

  const detail = SEGMENT_ENHANCED_DETAILS[segmentMeta.id];
  if (!detail) return notFound();

  const acc = segmentMeta.accentColor;
  const SegmentIcon = segmentMeta.icon;

  const [showScrollCta, setShowScrollCta] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setShowScrollCta(pct > 0.35);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV_SECTIONS = ["Início", "Problema", "Solução", "Comparativo", "Cases", "ROI", "FAQ"];

  return (
    <>
      <style>{FONT_IMPORT}</style>
      <style>{GLOBAL_CSS}</style>
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: ${acc};
          cursor: pointer;
          box-shadow: 0 0 0 4px ${acc}25;
        }
        input[type='range']::-moz-range-thumb {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: ${acc};
          cursor: pointer;
          border: none;
        }
      `}</style>

      {/* ── Botão Voltar para Home ────────────────────────────── */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all text-sm font-medium shadow-lg"
      >
        <ArrowLeft size={16} /> Início
      </Link>

      <ProgressNav sections={NAV_SECTIONS} accentColor={acc} />

      {/* ── Floating CTA ──────────────────────────────────────── */}
      <AnimatePresence>
        {showScrollCta && (
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
          >
            <a
              href={waLink(`Olá, quero falar com um especialista sobre ${segmentMeta.label}`)}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-full text-white text-sm font-bold shadow-2xl backdrop-blur-xl transition-all hover:scale-105"
              style={{ background: `${acc}EE`, boxShadow: `0 4px 24px ${acc}60` }}>
              <Rocket size={16} /> Falar no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="seg-page" style={{ background: "#070B14", color: "#fff" }}>

        {/* ══════════ HERO ══════════════════════════════════════════════════════ */}
        <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden noise-overlay">
          <div className="absolute inset-0">
            <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
              <source src={detail.heroVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0" style={{
              background: "linear-gradient(135deg, rgba(7,11,20,0.95) 0%, rgba(7,11,20,0.80) 50%, rgba(7,11,20,0.70) 100%)"
            }} />
          </div>
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

          <Container className="relative z-10 py-24 pt-32">
            <div className="max-w-5xl">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Tag label={`Solução enterprise · ${segmentMeta.label}`} color={acc} />
                <h1 className="seg-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6 tracking-tight">
                  {detail.heroTitle.split(" ").map((word, i, arr) => (
                    <motion.span key={i} className="inline-block mr-3"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                      {i >= arr.length - 2
                        ? <span style={{ color: acc }}>{word}</span>
                        : word}
                    </motion.span>
                  ))}
                </h1>
                <motion.p className="text-white/60 text-xl max-w-2xl mb-10 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                  {detail.heroSubtitle}
                </motion.p>
                <motion.div className="flex flex-wrap gap-4 mb-16"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                  <a href={waLink(`Olá, quero simular o ROI para ${segmentMeta.label}`)}
                    target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-2xl"
                    style={{ background: acc, boxShadow: `0 8px 32px ${acc}50` }}>
                    Calcular meu ROI agora <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#cases"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider border border-white/15 text-white hover:bg-white/8 transition-all backdrop-blur-sm">
                    <Play size={16} /> Ver cases reais
                  </a>
                </motion.div>
                <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                  {detail.problemStats.slice(0, 4).map((s, i) => (
                    <div key={i}>
                      <div className="seg-display text-2xl md:text-3xl font-bold" style={{ color: acc }}>{s.stat}</div>
                      <div className="text-white/40 text-xs mt-1 leading-snug">{s.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </Container>
          <motion.div className="relative z-10 text-center py-12 border-t border-white/8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
            <LiveCostTicker accentColor={acc} />
          </motion.div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-hint">
            <span className="text-white/25 text-xs seg-mono tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </section>

        {/* ══════════ PROBLEMA ══════════════════════════════════════════════════ */}
        <section id="problema" className="py-24 relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.03]"
            style={{ background: "radial-gradient(circle, #ef4444, transparent)" }} />
          <Container>
            <div className="max-w-6xl mx-auto">
              <motion.div className="text-center mb-16"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <Tag label="Diagnóstico operacional" />
                <h2 className="seg-display text-4xl md:text-6xl font-bold mb-6">
                  O custo invisível de<br /><span className="text-red-400">não modernizar</span>
                </h2>
                <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
                  Enquanto você lê isso, a segurança tradicional está consumindo orçamento sem entregar o que precisa. Os números são claros.
                </p>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                {detail.problemStats.map((s, i) => (
                  <StatPill key={i} {...s} accentColor="#ef4444" delay={i * 0.08} />
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {detail.problems.map((p, i) => <ProblemCard key={i} problem={p} index={i} />)}
              </div>
              <motion.div className="mt-12 text-center"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <p className="text-white/40 text-sm mb-4">Você tem uma operação de risco? Deixe calcularmos sua exposição.</p>
                <a href={waLink(`Olá, quero um diagnóstico gratuito para minha operação de ${segmentMeta.label}`)}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-white/15 hover:bg-white/8 transition-all text-white/70 hover:text-white">
                  Ver diagnóstico gratuito <ChevronRight size={14} />
                </a>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* ══════════ SOLUÇÃO ═══════════════════════════════════════════════════ */}
        <section id="solucao" className="py-24 relative" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.04]"
            style={{ background: `radial-gradient(circle, ${acc}, transparent)` }} />
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div>
                  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <Tag label="Tecnologia comprovada" color={acc} />
                    <h2 className="seg-display text-4xl md:text-5xl font-bold mb-6">{detail.solutionTitle}</h2>
                    <p className="text-white/50 leading-relaxed text-base mb-10">{detail.solutionDesc}</p>
                  </motion.div>
                  <div className="divide-y divide-white/6">
                    {detail.solutionEfficacy.map((e, i) => (
                      <EfficacyMetric key={i} {...e} accentColor={acc} index={i} />
                    ))}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {detail.whyDrones.map((item, i) => (
                    <TechFeature key={i} item={item} index={i} accentColor={acc} />
                  ))}
                </div>
              </div>
              {detail.products && detail.products.length > 0 && (
                <div className="mt-16">
                  <motion.div className="text-center mb-10"
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <Tag label="Produtos DJI Enterprise" color={acc} />
                    <h3 className="seg-display text-3xl font-bold">Hardware recomendado para {segmentMeta.label}</h3>
                  </motion.div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {detail.products.map((product, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group rounded-3xl overflow-hidden border border-white/8 hover:border-white/20 transition-all duration-500"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                      >
                        {product.image && (
                          <div className="relative overflow-hidden h-52">
                            <img src={product.image} alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />
                            {product.pricing && (
                              <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                                style={{ background: acc, color: "#fff" }}>{product.pricing}</span>
                            )}
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="seg-display text-xl font-bold text-white mb-2">{product.name}</h3>
                          <p className="text-white/40 text-sm mb-4 line-clamp-2">{product.description}</p>
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {product.keySpecs.slice(0, 3).map((spec, j) => (
                              <span key={j} className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-white/50">{spec}</span>
                            ))}
                          </div>
                          {product.slug && (
                            <Link href={`/produto/${toSlug(product.slug)}`}
                              className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                              style={{ color: acc }}>
                              Ver especificações <ArrowRight size={14} />
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* ══════════ COMPARATIVO ═══════════════════════════════════════════════ */}
        <section id="comparativo" className="py-24">
          <Container>
            <div className="max-w-6xl mx-auto">
              <motion.div className="text-center mb-16"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Tag label="Benchmarking" color={acc} />
                <h2 className="seg-display text-4xl md:text-6xl font-bold mb-4">
                  Humano <span className="text-white/25">vs</span>{" "}
                  <span style={{ color: acc }}>Drone autônomo</span>
                </h2>
                <p className="text-white/40 max-w-xl mx-auto">Dados baseados em implementações reais. Sem estimativas otimistas.</p>
              </motion.div>
              <div className="grid grid-cols-4 gap-4 px-4 mb-3">
                <div className="text-white/30 text-xs font-semibold uppercase tracking-wider">Critério</div>
                <div className="text-red-400/60 text-xs font-semibold uppercase tracking-wider text-center">Vigilante humano</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-center" style={{ color: `${acc}80` }}>Drone autônomo</div>
                <div className="text-emerald-400/60 text-xs font-semibold uppercase tracking-wider text-center">Melhoria</div>
              </div>
              <div className="rounded-3xl overflow-hidden border border-white/8" style={{ background: "rgba(255,255,255,0.02)" }}>
                {detail.benchmarking.map((row, i) => (
                  <BenchRow key={i} row={row} index={i} accentColor={acc} />
                ))}
              </div>
              {detail.certifications && detail.certifications.length > 0 && (
                <div className="mt-12">
                  <div className="text-center text-white/30 text-xs font-semibold uppercase tracking-widest mb-6">
                    Certificações e conformidade técnica
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {detail.certifications.map((cert, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                        className="p-4 rounded-2xl border border-white/8 text-center"
                        style={{ background: "rgba(255,255,255,0.03)" }}>
                        <CheckCircle size={20} className="mx-auto mb-2" style={{ color: acc }} />
                        <div className="text-white text-sm font-semibold">{cert.name}</div>
                        <div className="text-white/30 text-xs mt-1">{cert.issuer}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* ══════════ CASES ═════════════════════════════════════════════════════ */}
        <section id="cases" className="py-24" style={{ background: "rgba(255,255,255,0.02)" }}>
          <Container>
            <div className="max-w-6xl mx-auto">
              <motion.div className="text-center mb-16"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Tag label="Provas reais" color={acc} />
                <h2 className="seg-display text-4xl md:text-6xl font-bold mb-4">
                  Resultados que<br /><span style={{ color: acc }}>já aconteceram</span>
                </h2>
                <p className="text-white/40 max-w-xl mx-auto">
                  Cases documentados com dados verificáveis. Não prometemos o que não entregamos.
                </p>
              </motion.div>
              {detail.realCompanies && detail.realCompanies.length > 0 && (
                <div className="mb-16 overflow-hidden">
                  <div className="text-center text-white/20 text-xs font-semibold uppercase tracking-widest mb-8">
                    Empresas que já modernizaram com tecnologia DJI Enterprise
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {detail.realCompanies.map((co, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                        className="p-4 rounded-2xl text-center border border-white/6 hover:border-white/15 transition-all"
                        style={{ background: "rgba(255,255,255,0.03)" }}>
                        <div className="text-white/60 font-semibold text-sm mb-1">{co.name}</div>
                        <div className="text-white/25 text-xs">{co.industry}</div>
                        <div className="mt-2 text-emerald-400 text-xs font-medium">{co.result.substring(0, 40)}{co.result.length > 40 ? "..." : ""}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                {detail.realCases.map((c, i) => (
                  <CaseCard key={i} c={c} accentColor={acc} index={i} />
                ))}
              </div>
              {detail.expertQuotes && detail.expertQuotes.length > 0 && (
                <div className="mt-16 grid md:grid-cols-2 gap-6">
                  {detail.expertQuotes.map((eq, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="p-6 rounded-3xl border border-white/8"
                      style={{ background: "rgba(255,255,255,0.03)" }}>
                      <Quote size={20} className="mb-4 opacity-25" style={{ color: acc }} />
                      <p className="text-white/70 text-sm italic leading-relaxed mb-5">"{eq.quote}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                          style={{ background: `${acc}30`, border: `1px solid ${acc}40` }}>
                          {eq.author.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white text-sm font-semibold">{eq.author}</div>
                          <div className="text-white/35 text-xs">{eq.role}{eq.company ? ` · ${eq.company}` : ""}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* ══════════ ROI CALCULATOR ════════════════════════════════════════════ */}
        <section id="roi" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-[0.04]"
            style={{ background: `radial-gradient(circle, ${acc}, transparent)` }} />
          <Container className="relative z-10">
            <div className="max-w-6xl mx-auto">
              <motion.div className="text-center mb-16"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Tag label="Calculadora de ROI" color={acc} />
                <h2 className="seg-display text-4xl md:text-6xl font-bold mb-4">
                  Quanto você vai<br /><span style={{ color: acc }}>economizar?</span>
                </h2>
                <p className="text-white/40 max-w-xl mx-auto">
                  Configure os parâmetros da sua operação e veja o retorno real em segundos.
                </p>
              </motion.div>
              <ROICalculator defaults={detail.calculatorDefaults} accentColor={acc} segmentLabel={segmentMeta.label} />
            </div>
          </Container>
        </section>

        {/* ══════════ IMPLEMENTAÇÃO ═════════════════════════════════════════════ */}
        {detail.implementationPhases && detail.implementationPhases.length > 0 && (
          <section className="py-24" style={{ background: "rgba(255,255,255,0.02)" }}>
            <Container>
              <div className="max-w-4xl mx-auto">
                <motion.div className="text-center mb-16"
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <Tag label="Implementação" color={acc} />
                  <h2 className="seg-display text-4xl md:text-5xl font-bold mb-4">
                    Do contrato ao ar em <span style={{ color: acc }}>semanas</span>
                  </h2>
                  <p className="text-white/40">Processo estruturado, sem surpresas, com SLA garantido.</p>
                </motion.div>
                <div className="relative">
                  <div className="absolute left-[27px] top-8 bottom-8 w-px hidden md:block"
                    style={{ background: `linear-gradient(to bottom, ${acc}, ${acc}20)` }} />
                  <div className="space-y-6">
                    {detail.implementationPhases.map((phase, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
                        className="flex gap-6">
                        <div className="flex flex-col items-center shrink-0">
                          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg z-10"
                            style={{ background: `linear-gradient(135deg, ${acc}, ${acc}99)` }}>
                            {i + 1}
                          </div>
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="rounded-3xl p-6 border border-white/8 hover:border-white/15 transition-all"
                            style={{ background: "rgba(255,255,255,0.03)" }}>
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <h3 className="seg-display text-xl font-bold text-white">{phase.phase}</h3>
                              <span className="px-3 py-1 rounded-full text-xs font-semibold seg-mono"
                                style={{ background: `${acc}18`, color: acc }}>
                                <Clock size={10} className="inline mr-1" /> {phase.duration}
                              </span>
                            </div>
                            <p className="text-white/50 text-sm mb-4">{phase.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {phase.deliverables.map((d, j) => (
                                <span key={j} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border border-white/10 text-white/50">
                                  <Check size={10} className="text-emerald-400" /> {d}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* ══════════ FAQ ═══════════════════════════════════════════════════════ */}
        <section id="faq" className="py-24">
          <Container>
            <div className="max-w-3xl mx-auto">
              <motion.div className="text-center mb-16"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Tag label="Perguntas frequentes" color={acc} />
                <h2 className="seg-display text-4xl md:text-5xl font-bold mb-4">
                  Dúvidas sobre <span style={{ color: acc }}>{segmentMeta.label}</span>
                </h2>
              </motion.div>
              <div className="rounded-3xl border border-white/8 overflow-hidden p-4 md:p-8"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                {detail.faq.map((item, i) => (
                  <FAQItem key={i} item={item} index={i} accentColor={acc} />
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ══════════ CTA FINAL ═════════════════════════════════════════════════ */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 50% 50%, ${acc}18 0%, transparent 70%)` }} />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)", backgroundSize: "24px 24px" }} />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ background: acc }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-8"
            style={{ background: acc }} />
          <Container className="relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <Tag label="Próximo passo" color={acc} />
                <h2 className="seg-display text-5xl md:text-7xl font-bold mb-6">
                  {detail.cta.title}
                </h2>
                <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                  {detail.cta.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                  <a href={waLink(`Olá, quero simular o ROI para ${segmentMeta.label} e receber uma proposta`)}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-white uppercase tracking-wider text-sm transition-all hover:scale-105 hover:shadow-2xl"
                    style={{ background: `linear-gradient(135deg, ${acc}, ${acc}cc)`, boxShadow: `0 8px 40px ${acc}40` }}>
                    Simular ROI e solicitar proposta <ArrowRight size={18} />
                  </a>
                  <a href={waLink("Olá, quero falar com um especialista sobre " + segmentMeta.label)}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold uppercase tracking-wider text-sm border border-white/15 hover:bg-white/8 transition-all text-white">
                    <MessageCircle size={18} /> Falar com especialista
                  </a>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6 text-white/35 text-sm">
                  {[
                    { icon: CheckCircle, text: "Diagnóstico gratuito em 48h" },
                    { icon: Shield, text: "Proposta sem compromisso" },
                    { icon: Star, text: "NPS 94/100" }
                  ].map((b, i) => (
                    <span key={i} className="flex items-center gap-2">
                      <b.icon size={14} style={{ color: acc }} /> {b.text}
                    </span>
                  ))}
                </div>
                <p className="mt-8 text-white/20 text-sm">
                  ⚡ 67% das empresas de segurança planejam adotar drones até 2027 — as que saírem na frente definirão o padrão do mercado.
                </p>
              </motion.div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}