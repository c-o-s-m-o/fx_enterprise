// src/presentation/components/ROICalculator.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator, TrendingDown, TrendingUp, Clock, DollarSign,
  Users, Car, Shield, ChevronRight, X, Download,
  MessageCircle, Check, AlertCircle, BarChart3,
  Target, Zap, Award, Map, Eye, Thermometer,
  Navigation, Scan, Globe, Info, ChevronDown, Star, Activity,
  Wind, FileText, Database, Wheat, Factory,
  AlertTriangle, LineChart, PieChart,
} from "lucide-react";
import { C } from "@/domain/constants/design-tokens";
import { waLink } from "@/domain/constants/wa";
import { recomendarProduto, type Nivel, type Capacidade } from "@/lib/recommendationRules";
import { RecomendacaoProduto } from "./RecomendacaoProduto";
import type { Product } from "@/domain/entities/Product";

type Setor = "seguranca" | "agro" | "industria" | "energia" | "mineracao" | "portos";

const SETORES = [
  { id: "seguranca" as Setor, label: "Segurança Patrimonial", icon: Shield, desc: "Condomínios, fazendas, centros logísticos" },
  { id: "agro" as Setor, label: "Agronegócio", icon: Wheat, desc: "Lavouras, pecuária, aquicultura" },
  { id: "industria" as Setor, label: "Indústria & Construção", icon: Factory, desc: "Plantas, canteiros de obra, armazéns" },
  { id: "energia" as Setor, label: "Energia & Solar", icon: Zap, desc: "Painéis solares, torres, transmissão" },
  { id: "mineracao" as Setor, label: "Mineração", icon: Database, desc: "Minas a céu aberto, lavras, stockpiles" },
  { id: "portos" as Setor, label: "Portos & Logística", icon: Globe, desc: "Terminais, armazéns, pátios" },
];

const CASES_DATA: Record<Setor, any> = {
  seguranca: {
    titulo: "Titan Protection reduziu custos em 60% com segurança autônoma",
    historia: "A empresa de segurança Titan Protection substituiu cobertura presencial 24/7 — que custava US$ 13.000/mês por site — por drones autônomos a US$ 6.100/mês. O resultado foi 60% de redução de custo e 40% menos incidentes.",
    metrica1: "60%", metrica1Label: "redução de custo operacional",
    metrica2: "40%", metrica2Label: "redução em incidentes",
    metrica3: "12–18 meses", metrica3Label: "payback médio por site",
    fonte: "FlytBase / Titan Protection, dados de operação 2025",
  },
  agro: {
    titulo: "Fazenda de Camarão (CE): perdas mensais zeradas em 60 dias",
    historia: "Viveiros de 480 ha sofriam furtos recorrentes. Com rondas autônomas a cada 90 min e câmera térmica FLIR, as perdas foram a zero no segundo mês.",
    metrica1: "0", metrica1Label: "perdas após implantação",
    metrica2: "200 ha", metrica2Label: "cobertos por voo de 47 min",
    metrica3: "< 14 meses", metrica3Label: "payback estimado",
    fonte: "Aero Drone Solutions — case real, 2024",
  },
  industria: {
    titulo: "58% dos grandes projetos de construção já usam drones autônomos",
    historia: "Uma planta química com 12 tanques inspecionava manualmente com andaimes — 2 dias por tanque. Com o M4TD, a inspeção térmica completa passa a ser feita em 3 horas.",
    metrica1: "52%", metrica1Label: "redução no tempo de inspeção",
    metrica2: "48%", metrica2Label: "menos intervenção manual",
    metrica3: "58%", metrica3Label: "dos grandes projetos usam drones",
    fonte: "Global Growth Insights, Drone-in-a-Box Market, 2025",
  },
  energia: {
    titulo: "Inspeção solar: US$ 2.100 economizados por MW inspecionado",
    historia: "900.000 painéis no Muhammed bin Rashid Solar Park levavam 2 meses de inspeção manual. Com drones, 5 dias — 400% mais rápido.",
    metrica1: "75%", metrica1Label: "mais rápido que inspeção manual",
    metrica2: "US$ 2.100/MW", metrica2Label: "economia média por inspeção",
    metrica3: "97%", metrica3Label: "ganho de eficiência em 4 sites",
    fonte: "Raptor Maps 2025 / The Drone Life 2025",
  },
  mineracao: {
    titulo: "53% das minas a céu aberto já usam drones para mapeamento e segurança",
    historia: "Mineradoras como Rio Tinto e Barrick Gold implementaram sistemas autônomos para mapeamento de taludes, stockpile volumétrico e monitoramento de barragens.",
    metrica1: "53%", metrica1Label: "das minas usam drones autônomos",
    metrica2: "48%", metrica2Label: "usam para medição de stockpile",
    metrica3: "100%", metrica3Label: "de cobertura em áreas de risco",
    fonte: "FlytBase Mining Report / Global Growth Insights 2025",
  },
  portos: {
    titulo: "Gestão aérea de pátios: cobertura total sem equipe de ronda terrestre",
    historia: "Terminais portuários e logísticos utilizam drones autônomos para inventário visual, segurança perimetral e inspeção de estruturas.",
    metrica1: "24/7", metrica1Label: "cobertura contínua automática",
    metrica2: "10×", metrica2Label: "mais área por hora vs. ronda terrestre",
    metrica3: "47%", metrica3Label: "dos operadores de pátio usam drones",
    fonte: "Global Growth Insights, Drone-in-a-Box 2025",
  },
};

type SetorConfig = {
  pessoalLabel: string; pessoalDefault: number; pessoalMax: number; pessoalStep: number; pessoalUnidade: string;
  numDefault: number; numMax: number;
  veiculoDefault: number;
  perdasLabel: string; perdasDefault: number; perdasMax: number; perdasStep: number;
  contratoLabel: string; contratoDefault: number; contratoMax: number;
  inspecaoLabel: string; inspecaoDefault: number; inspecaoMax: number;
  eficienciaDefault: number; reducaoDefault: number;
  areaLabel: string; areaDefault: number;
};

const SETOR_CONFIG: Record<Setor, SetorConfig> = {
  seguranca: {
    pessoalLabel: "Custo mensal total por profissional de segurança",
    pessoalDefault: 3800, pessoalMax: 18000, pessoalStep: 100, pessoalUnidade: "profissionais",
    numDefault: 8, numMax: 300,
    veiculoDefault: 2500,
    perdasLabel: "Perdas anuais estimadas por incidentes (furtos, danos, acionamentos)",
    perdasDefault: 80000, perdasMax: 20000000, perdasStep: 5000,
    contratoLabel: "Contratos de monitoramento e câmeras terceirizados / mês",
    contratoDefault: 4500, contratoMax: 100000,
    inspecaoLabel: "Auditorias, relatórios e vistorias de segurança / ano",
    inspecaoDefault: 15000, inspecaoMax: 500000,
    eficienciaDefault: 80, reducaoDefault: 4,
    areaLabel: "Área a monitorar (hectares)", areaDefault: 350,
  },
  agro: {
    pessoalLabel: "Custo mensal total por colaborador de campo",
    pessoalDefault: 3200, pessoalMax: 12000, pessoalStep: 100, pessoalUnidade: "colaboradores",
    numDefault: 12, numMax: 500,
    veiculoDefault: 3500,
    perdasLabel: "Perdas anuais (pragas, seca, furtos, rastreamento tardio)",
    perdasDefault: 250000, perdasMax: 50000000, perdasStep: 10000,
    contratoLabel: "Contratos de mapeamento aéreo e laudos agronômicos / ano",
    contratoDefault: 32000, contratoMax: 500000,
    inspecaoLabel: "Inspeções técnicas e monitoramento de pragas terceirizados / ano",
    inspecaoDefault: 22000, inspecaoMax: 300000,
    eficienciaDefault: 78, reducaoDefault: 4,
    areaLabel: "Área total da propriedade (hectares)", areaDefault: 1200,
  },
  industria: {
    pessoalLabel: "Custo mensal total por profissional de segurança e ronda",
    pessoalDefault: 4500, pessoalMax: 20000, pessoalStep: 100, pessoalUnidade: "profissionais",
    numDefault: 15, numMax: 500,
    veiculoDefault: 4000,
    perdasLabel: "Impacto financeiro de paradas não planejadas / ano",
    perdasDefault: 500000, perdasMax: 50000000, perdasStep: 20000,
    contratoLabel: "Inspeções técnicas externas (andaimes, drones locados) / ano",
    contratoDefault: 65000, contratoMax: 2000000,
    inspecaoLabel: "Laudos estruturais, relatórios de conformidade e auditorias / ano",
    inspecaoDefault: 30000, inspecaoMax: 1000000,
    eficienciaDefault: 72, reducaoDefault: 5,
    areaLabel: "Área da planta / canteiro (hectares)", areaDefault: 80,
  },
  energia: {
    pessoalLabel: "Custo mensal total por técnico de campo para inspeção",
    pessoalDefault: 7000, pessoalMax: 30000, pessoalStep: 200, pessoalUnidade: "técnicos",
    numDefault: 10, numMax: 300,
    veiculoDefault: 8000,
    perdasLabel: "Perdas por falhas não detectadas a tempo / ano",
    perdasDefault: 800000, perdasMax: 100000000, perdasStep: 50000,
    contratoLabel: "Serviços de inspeção aérea terceirizados / ano",
    contratoDefault: 110000, contratoMax: 5000000,
    inspecaoLabel: "Laudos técnicos e relatórios regulatórios / ano",
    inspecaoDefault: 45000, inspecaoMax: 1000000,
    eficienciaDefault: 86, reducaoDefault: 4,
    areaLabel: "Capacidade instalada (MW) ou km de linha", areaDefault: 50,
  },
  mineracao: {
    pessoalLabel: "Custo mensal total por técnico de segurança e topografia",
    pessoalDefault: 8000, pessoalMax: 40000, pessoalStep: 200, pessoalUnidade: "técnicos",
    numDefault: 20, numMax: 500,
    veiculoDefault: 12000,
    perdasLabel: "Impacto de paradas e acidentes não previstos / ano",
    perdasDefault: 2000000, perdasMax: 200000000, perdasStep: 100000,
    contratoLabel: "Levantamentos topográficos e laudos externos / ano",
    contratoDefault: 180000, contratoMax: 5000000,
    inspecaoLabel: "Inspeções de barragem, taludes e conformidade ambiental / ano",
    inspecaoDefault: 90000, inspecaoMax: 3000000,
    eficienciaDefault: 75, reducaoDefault: 6,
    areaLabel: "Área da lavra / concessão (hectares)", areaDefault: 2000,
  },
  portos: {
    pessoalLabel: "Custo mensal total por profissional de vigilância / operação",
    pessoalDefault: 5000, pessoalMax: 25000, pessoalStep: 200, pessoalUnidade: "profissionais",
    numDefault: 25, numMax: 500,
    veiculoDefault: 6000,
    perdasLabel: "Perdas anuais por furtos, desvios e incidentes",
    perdasDefault: 400000, perdasMax: 50000000, perdasStep: 20000,
    contratoLabel: "Contratos de vigilância e monitoramento terceirizados / mês",
    contratoDefault: 15000, contratoMax: 500000,
    inspecaoLabel: "Inspeções estruturais, relatórios de conformidade e auditorias / ano",
    inspecaoDefault: 55000, inspecaoMax: 2000000,
    eficienciaDefault: 80, reducaoDefault: 8,
    areaLabel: "Área do terminal / pátio (hectares)", areaDefault: 500,
  },
};

const Tag = ({ label, dark = false }: { label: string; dark?: boolean }) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 ${dark ? "bg-orange-500/15 border border-orange-500/25" : "bg-orange-50 border border-orange-100"}`}>
    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
    <span className={`text-[10px] font-extrabold uppercase tracking-[0.38em] ${dark ? "text-orange-400" : "text-orange-600"}`}>{label}</span>
  </div>
);

const SliderRow = ({ label, icon: Icon, hint, value, min, max, step, onChange, fmt }: any) => (
  <div>
    <div className="flex items-center gap-1.5 mb-1">
      <Icon size={13} style={{ color: C.orange }} />
      <label className="text-xs font-semibold" style={{ color: C.inkMid }}>{label}</label>
    </div>
    {hint && <p className="text-[11px] mb-1.5 ml-4" style={{ color: C.ink400 }}>{hint}</p>}
    <div className="flex items-center gap-3 ml-4">
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))} className="flex-1 accent-orange-500 h-1.5 cursor-pointer" />
      <span className="hn text-sm font-black text-right whitespace-nowrap" style={{ color: C.ink, minWidth: 110 }}>{fmt(value)}</span>
    </div>
  </div>
);

const KPI = ({ icon: Icon, label, value, sub, variant = "default" }: any) => {
  const V: any = {
    default: { bg: C.white, bd: C.border, val: C.ink, lbl: C.ink400 },
    positive: { bg: "#f0fdf4", bd: "#86efac", val: "#15803d", lbl: C.green },
    highlight: { bg: C.orangeL, bd: C.orange, val: C.orangeD, lbl: C.orange },
    dark: { bg: C.navy, bd: C.navyLight, val: "#fff", lbl: C.ink300 },
  }[variant];
  return (
    <div className="rounded-xl p-4 border" style={{ background: V.bg, borderColor: V.bd }}>
      <Icon size={14} className="mb-1.5" style={{ color: variant === "dark" ? C.orange : V.lbl }} />
      <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: V.lbl }}>{label}</div>
      <div className="hn text-xl font-black leading-tight" style={{ color: V.val }}>{value}</div>
      {sub && <div className="text-[11px] mt-0.5" style={{ color: variant === "dark" ? C.ink300 : C.ink400 }}>{sub}</div>}
    </div>
  );
};

const GraficoProjecao = ({ beneficio, investimento, opAnual }: any) => {
  const anos = [0, 1, 2, 3, 4, 5];
  const W = 100; const H = 64; const PL = 18; const PT = 10; const PB = 18; const PR = 4;
  const cW = W - PL - PR; const cH = H - PT - PB;

  const saldos = anos.map(a => a === 0 ? -investimento : beneficio * a - investimento - opAnual * a);
  const minV = Math.min(...saldos) * 1.08;
  const maxV = Math.max(...saldos) * 1.1;
  const rng = maxV - minV || 1;

  const tX = (i: number) => PL + (i / (anos.length - 1)) * cW;
  const tY = (v: number) => PT + cH - ((v - minV) / rng) * cH;
  const z = tY(0);

  const path = saldos.map((v, i) => `${i === 0 ? "M" : "L"}${tX(i)},${tY(v)}`).join(" ");
  const fill = saldos.map((v, i) => `${i === 0 ? "M" : "L"}${tX(i)},${Math.min(tY(v), z)}`).join(" ") +
    ` L${tX(5)},${z} L${tX(0)},${z} Z`;

  const fmtK = (v: number) => {
    const abs = Math.abs(v);
    if (abs >= 1e6) return (v < 0 ? "-" : "") + "R$" + (abs / 1e6).toFixed(1) + "M";
    if (abs >= 1000) return (v < 0 ? "-" : "") + "R$" + (abs / 1000).toFixed(0) + "K";
    return "R$" + v.toFixed(0);
  };

  const paybackA = beneficio > opAnual ? investimento / (beneficio - opAnual) : null;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ overflow: "visible" }}>
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1={PL} y1={PT + (i / 3) * cH} x2={W - PR} y2={PT + (i / 3) * cH}
          stroke="#e2e8f0" strokeWidth="0.35" />
      ))}
      {z >= PT && z <= PT + cH && (
        <line x1={PL} y1={z} x2={W - PR} y2={z} stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="1.5,1" />
      )}
      <path d={fill} fill={C.orange} fillOpacity="0.07" />
      <path d={path} fill="none" stroke={C.orange} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
      {paybackA && paybackA <= 5 && paybackA >= 0 && (
        <>
          <line x1={tX(paybackA)} y1={PT} x2={tX(paybackA)} y2={PT + cH}
            stroke={C.green} strokeWidth="0.6" strokeDasharray="1,1" />
          <text x={tX(paybackA) + 0.8} y={PT + 4} fontSize="2.8" fill={C.green} fontWeight="700">Payback</text>
        </>
      )}
      {saldos.map((v, i) => (
        <g key={i}>
          <circle cx={tX(i)} cy={tY(v)} r="1.4" fill={v >= 0 ? C.orange : C.ink400} />
          {i > 0 && (
            <text x={tX(i)} y={tY(v) - 2.8} textAnchor="middle" fontSize="3" fill={v >= 0 ? C.orangeD : C.ink400} fontWeight="700">
              {fmtK(v)}
            </text>
          )}
        </g>
      ))}
      <text x={tX(0) + 0.8} y={tY(saldos[0]) - 2.8} fontSize="2.8" fill={C.ink400}>{fmtK(saldos[0])}</text>
      {anos.map((a, i) => (
        <text key={a} x={tX(i)} y={H - 2} textAnchor="middle" fontSize="3" fill={C.ink400}>Ano {a}</text>
      ))}
    </svg>
  );
};

const BreakdownBar = ({ items }: any) => {
  const total = items.reduce((s: number, i: any) => s + i.value, 0);
  const fmt = (v: number) => {
    if (v >= 1e6) return "R$ " + (v / 1e6).toFixed(2) + "M";
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });
  };
  return (
    <div className="space-y-3">
      {items.map((it: any, i: number) => {
        const pct = total > 0 ? (it.value / total) * 100 : 0;
        const Icon = it.icon;
        return (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-[11px]" style={{ color: C.ink500 }}>
                <Icon size={11} style={{ color: it.color }} />
                <span className="font-medium">{it.label}</span>
              </div>
              <span className="text-xs font-bold" style={{ color: C.ink }}>{fmt(it.value)}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.bgAlt }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: "easeOut" }}
                className="h-full rounded-full" style={{ background: it.color }} />
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: C.ink300 }}>{pct.toFixed(1)}% do benefício</div>
          </div>
        );
      })}
    </div>
  );
};

interface ROICalculatorProps {
  initialSegment?: Setor;
  hideSelector?: boolean;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ initialSegment, hideSelector = false }) => {
  const searchParams = useSearchParams();
  const nivelParam = searchParams.get("nivel") as Nivel | null;
  const capacidadeParam = searchParams.get("capacidade") as Capacidade | null;

  const [setor, setSetor] = useState<Setor>(initialSegment || "seguranca");
  const cfg = SETOR_CONFIG[setor];
  const caseData = CASES_DATA[setor];

  const [numPessoas, setNumPessoas] = useState(cfg.numDefault);
  const [custoPessoa, setCustoPessoa] = useState(cfg.pessoalDefault);
  const [custoVeiculo, setCustoVeiculo] = useState(cfg.veiculoDefault);
  const [perdasAnuais, setPerdasAnuais] = useState(cfg.perdasDefault);
  const [contrato, setContrato] = useState(cfg.contratoDefault);
  const [inspecao, setInspecao] = useState(cfg.inspecaoDefault);
  const [area, setArea] = useState(cfg.areaDefault);
  const [reducao, setReducao] = useState(cfg.reducaoDefault);
  const [eficiencia, setEficiencia] = useState(cfg.eficienciaDefault);

  const [showLead, setShowLead] = useState(false);
  const [leadNome, setLeadNome] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadWA, setLeadWA] = useState("");
  const [leadEmpresa, setLeadEmpresa] = useState("");
  const [leadOk, setLeadOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [produtoRecomendado, setProdutoRecomendado] = useState<Product | null>(null);

  useEffect(() => {
    setNumPessoas(cfg.numDefault);
    setCustoPessoa(cfg.pessoalDefault);
    setCustoVeiculo(cfg.veiculoDefault);
    setPerdasAnuais(cfg.perdasDefault);
    setContrato(cfg.contratoDefault);
    setInspecao(cfg.inspecaoDefault);
    setArea(cfg.areaDefault);
    setReducao(cfg.reducaoDefault);
    setEficiencia(cfg.eficienciaDefault);
  }, [setor]);

  const INV = 205000;
  const OP_MES = 1500;
  const VIDA = 5;
  const OP_ANO = OP_MES * 12;

  const custoMensalAtual = numPessoas * custoPessoa + custoVeiculo + contrato;
  const custoAnualAtual = custoMensalAtual * 12 + perdasAnuais + inspecao;

  const ecoPessoas = reducao * custoPessoa * 12;
  const ecoContratos = contrato * 12 + inspecao;
  const ecoPerdas = perdasAnuais * (eficiencia / 100);
  const beneficio = ecoPessoas + ecoContratos + ecoPerdas;

  const custoDroneAno = INV / VIDA + OP_ANO;
  const economiaNeta = beneficio - custoDroneAno;
  const paybackMeses = beneficio > OP_ANO ? (INV / (beneficio - OP_ANO)) * 12 : Infinity;
  const r3 = beneficio * 3 - INV - OP_ANO * 3;
  const r5 = beneficio * 5 - INV - OP_ANO * 5;
  const roi5 = ((r5) / INV) * 100;
  const voosArea = area > 0 ? Math.ceil(area / 200) : 1;

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });
  const fmtM = (v: number) => {
    const a = Math.abs(v);
    if (a >= 1e9) return (v < 0 ? "−" : "") + "R$ " + (a / 1e9).toFixed(2) + "B";
    if (a >= 1e6) return (v < 0 ? "−" : "") + "R$ " + (a / 1e6).toFixed(2) + "M";
    if (a >= 1000) return (v < 0 ? "−" : "") + "R$ " + (a / 1000).toFixed(0) + "K";
    return fmt(v);
  };

  const shareWA = () => {
    const txt = encodeURIComponent(
      `*Análise de ROI — Aero Drone Solutions*\n\nSetor: ${SETORES.find(s => s.id === setor)?.label}\nCusto operacional anual atual: ${fmtM(custoAnualAtual)}\nBenefício anual estimado: ${fmtM(beneficio)}\nPayback: ${paybackMeses < Infinity ? paybackMeses.toFixed(1) + " meses" : "—"}\nRetorno em 5 anos: ${fmtM(r5)}\n\nGostaria de uma análise personalizada para a minha operação.`
    );
    window.open(`https://wa.me/5561982373501?text=${txt}`, "_blank");
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: leadNome,
          email: leadEmail,
          empresa: leadEmpresa,
          whatsapp: leadWA,
          segmento: setor,
          resultadoCalculadora: { beneficio, paybackMeses, roi5, custoAnualAtual },
        }),
      });
      if (res.ok) {
        const recomendacaoInput = {
          segmento: setor,
          nivel: nivelParam || "profissional",
          capacidade: capacidadeParam || undefined,
          areaHectares: area,
          perdasAnuais: perdasAnuais,
        };
        const produto = recomendarProduto(recomendacaoInput);
        setProdutoRecomendado(produto);
        setLeadOk(true);
      } else {
        alert("Erro ao enviar. Tente novamente.");
      }
    } catch (err) {
      alert("Erro de conexão. Tente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-10">
          <Tag label="Análise de Valor Operacional" />
          <h1 className="hn text-3xl sm:text-4xl font-black" style={{ color: C.ink }}>
            Quanto custa <span style={{ color: C.orange }}>não ter autonomia aérea?</span>
          </h1>
        </div>

        {!hideSelector && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
            {SETORES.map(s => {
              const Icon = s.icon;
              const isActive = setor === s.id;
              return (
                <button key={s.id} onClick={() => setSetor(s.id)}
                  className="rounded-xl p-3.5 border text-left transition-all"
                  style={{
                    background: isActive ? C.navy : C.white,
                    borderColor: isActive ? C.orange : C.border,
                  }}>
                  <Icon size={14} className="mb-1.5" style={{ color: isActive ? C.orange : C.ink400 }} />
                  <div className="text-[11px] font-black leading-tight" style={{ color: isActive ? "#fff" : C.ink }}>{s.label}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: isActive ? C.ink300 : C.ink400 }}>{s.desc}</div>
                </button>
              );
            })}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: C.border }}>
            <h3 className="hn font-black text-lg mb-4">Dados da operação</h3>
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Users size={13} style={{ color: C.orange }} />
                  <label className="text-xs font-semibold">Número de {cfg.pessoalUnidade}</label>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <input type="range" min={1} max={Math.min(cfg.numMax, 500)} step={1} value={Math.min(numPessoas, 500)}
                    onChange={e => setNumPessoas(Number(e.target.value))} className="flex-1 accent-orange-500" />
                  <input type="number" value={numPessoas} min={1} max={cfg.numMax}
                    onChange={e => setNumPessoas(Math.max(1, Math.min(cfg.numMax, Number(e.target.value))))}
                    className="w-20 text-right text-sm font-black border rounded px-2 py-1" />
                </div>
              </div>
              <SliderRow label={cfg.pessoalLabel} icon={DollarSign} value={custoPessoa} min={1500} max={cfg.pessoalMax} step={cfg.pessoalStep}
                onChange={setCustoPessoa} fmt={fmt} />
              <SliderRow label="Veículos e logística / mês" icon={Car} value={custoVeiculo} min={0} max={50000} step={200}
                onChange={setCustoVeiculo} fmt={fmt} />
              <SliderRow label={cfg.perdasLabel} icon={TrendingDown} value={perdasAnuais} min={0} max={cfg.perdasMax} step={cfg.perdasStep}
                onChange={setPerdasAnuais} fmt={fmtM} />
              <div className="rounded-xl border p-4" style={{ background: "#fffbeb", borderColor: "#fde68a" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Info size={12} style={{ color: "#d97706" }} />
                  <span className="text-[11px] font-bold" style={{ color: "#92400e" }}>Custos que a plataforma absorve</span>
                </div>
                <SliderRow label={cfg.contratoLabel} icon={Globe} value={contrato} min={0} max={cfg.contratoMax} step={500}
                  onChange={setContrato} fmt={fmtM} />
                <SliderRow label={cfg.inspecaoLabel} icon={Scan} value={inspecao} min={0} max={cfg.inspecaoMax} step={1000}
                  onChange={setInspecao} fmt={fmtM} />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block">{cfg.areaLabel}</label>
                <input type="number" value={area} onChange={e => setArea(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl border" />
                <div className="text-[11px] mt-1 text-orange-600">~{voosArea} voos/ciclo</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {!showLead ? (
              <div className="bg-white rounded-2xl p-6 border">
                <Tag label="Resultado estimado" />
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  <KPI icon={TrendingDown} label="Custo atual anual" value={fmtM(custoAnualAtual)} />
                  <KPI icon={TrendingUp} label="Benefício anual" value={fmtM(beneficio)} variant="highlight" />
                  <KPI icon={Clock} label="Payback" value={paybackMeses < Infinity ? `${paybackMeses.toFixed(1)} meses` : "—"} />
                  <KPI icon={Award} label="ROI em 5 anos" value={roi5 > 0 ? `${roi5.toFixed(0)}%` : "—"} variant="dark" />
                </div>
                <div className="rounded-xl border p-4 mb-4">
                  <GraficoProjecao beneficio={beneficio} investimento={INV} opAnual={OP_ANO} />
                </div>
                <button onClick={() => setShowLead(true)}
                  className="w-full bg-orange-500 text-white py-3 rounded-xl font-extrabold uppercase tracking-wider flex items-center justify-center gap-2">
                  <Download size={14} /> Receber análise completa
                </button>
                <button onClick={shareWA} className="w-full mt-2 border py-3 rounded-xl flex items-center justify-center gap-2">
                  <MessageCircle size={14} /> Compartilhar no WhatsApp
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 border">
                {!leadOk ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="hn text-xl font-black">Receba a análise</h3>
                      <button onClick={() => setShowLead(false)}><X size={16} /></button>
                    </div>
                    <form onSubmit={handleLeadSubmit} className="space-y-3">
                      <input type="text" placeholder="Nome completo" required value={leadNome} onChange={e => setLeadNome(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl" />
                      <input type="email" placeholder="E-mail corporativo" required value={leadEmail} onChange={e => setLeadEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl" />
                      <input type="text" placeholder="Empresa" required value={leadEmpresa} onChange={e => setLeadEmpresa(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl" />
                      <input type="tel" placeholder="WhatsApp" value={leadWA} onChange={e => setLeadWA(e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl" />
                      <button type="submit" disabled={loading}
                        className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold disabled:opacity-50">
                        {loading ? "Enviando..." : "Enviar e ver resultado completo"}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <Check size={48} className="mx-auto text-green-500 mb-3" />
                    <h3 className="text-xl font-black">Recebemos sua solicitação!</h3>
                    <p className="text-sm text-gray-500 mt-2">Um especialista entrará em contato em até 24h.</p>
                    {produtoRecomendado && (
                      <RecomendacaoProduto produto={produtoRecomendado} fromSegment={setor} />
                    )}
                    <button onClick={shareWA} className="mt-4 bg-green-500 text-white px-6 py-2 rounded-xl flex items-center justify-center gap-2 mx-auto">
                      <MessageCircle size={14} /> Falar agora no WhatsApp
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};