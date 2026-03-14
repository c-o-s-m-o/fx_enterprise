// app/calculadora-roi/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calculator, TrendingDown, TrendingUp, Clock, DollarSign,
    Users, Car, Shield, ChevronRight, X, Download,
    MessageCircle, Check, AlertCircle, BarChart3,
    Target, Zap, Award, Map, Eye, Thermometer,
    Navigation, Scan, Globe, Info,
    ChevronDown, Star, Cpu, Activity,
    Wind, FileText, Database, Wheat, Factory,
    AlertTriangle, LineChart, PieChart,
} from "lucide-react";

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const C = {
    bg: "#f8fafc", bgAlt: "#f1f5f9",
    white: "#ffffff",
    navy: "#05091a", navyMid: "#0d1530", navyLight: "#1e293b",
    ink: "#0f172a", inkMid: "#1e293b", ink500: "#475569", ink400: "#64748b", ink300: "#94a3b8",
    orange: "#f97316", orangeD: "#c2410c", orangeL: "#ffedd5", orangeM: "#fed7aa",
    border: "#e2e8f0", borderL: "#f1f5f9",
    green: "#16a34a", greenL: "#dcfce7",
    blue: "#2563eb", blueL: "#dbeafe",
    purple: "#7c3aed", purpleL: "#ede9fe",
    red: "#dc2626", redL: "#fee2e2",
    cyan: "#0891b2", cyanL: "#cffafe",
};

type Setor = "seguranca" | "agro" | "industria" | "energia" | "mineracao" | "portos";

// ─────────────────────────────────────────────
// DADOS ESTÁTICOS
// ─────────────────────────────────────────────
const SETORES = [
    { id: "seguranca" as Setor, label: "Segurança Patrimonial", icon: Shield, desc: "Condomínios, fazendas, centros logísticos" },
{ id: "agro" as Setor, label: "Agronegócio", icon: Wheat, desc: "Lavouras, pecuária, aquicultura" },
{ id: "industria" as Setor, label: "Indústria & Construção", icon: Factory, desc: "Plantas, canteiros de obra, armazéns" },
{ id: "energia" as Setor, label: "Energia & Solar", icon: Zap, desc: "Painéis solares, torres, transmissão" },
{ id: "mineracao" as Setor, label: "Mineração", icon: Database, desc: "Minas a céu aberto, lavras, stockpiles" },
{ id: "portos" as Setor, label: "Portos & Logística", icon: Globe, desc: "Terminais, armazéns, pátios" },
];

// Dados reais de cases por setor — usados na narrativa
const CASES_DATA = {
    seguranca: {
        titulo: "Titan Protection reduziu custos em 60% com segurança autônoma",
        historia: "A empresa de segurança Titan Protection substituiu cobertura presencial 24/7 — que custava US$ 13.000/mês por site — por drones autônomos a US$ 6.100/mês. O resultado foi 60% de redução de custo e 40% menos incidentes. A operação ficou mais eficaz, não apenas mais barata.",
        metrica1: "60%", metrica1Label: "redução de custo operacional",
        metrica2: "40%", metrica2Label: "redução em incidentes",
        metrica3: "12–18 meses", metrica3Label: "payback médio por site",
        fonte: "FlytBase / Titan Protection, dados de operação 2025",
    },
    agro: {
        titulo: "Fazenda de Camarão (CE): perdas mensais zeradas em 60 dias",
        historia: "Viveiros de 480 ha sofriam furtos recorrentes. Equipe noturna não cobria toda a extensão. Com rondas autônomas a cada 90 min e câmera térmica FLIR, as perdas foram a zero no segundo mês. O gestor cortou 2 contratos de monitoramento externo no mesmo período.",
        metrica1: "0", metrica1Label: "perdas após implantação",
        metrica2: "200 ha", metrica2Label: "cobertos por voo de 47 min",
        metrica3: "< 14 meses", metrica3Label: "payback estimado",
        fonte: "SM Company — case real, 2024",
    },
    industria: {
        titulo: "58% dos grandes projetos de construção já usam drones autônomos",
        historia: "Uma planta química com 12 tanques inspecionava manualmente com andaimes — 2 dias por tanque, 24 dias/ciclo com risco de acidente. Com o M4TD, a inspeção térmica completa passa a ser feita em 3 horas sem paralisar produção e sem expor equipe a área de risco.",
        metrica1: "52%", metrica1Label: "redução no tempo de inspeção (média)",
        metrica2: "48%", metrica2Label: "menos intervenção manual",
        metrica3: "58%", metrica3Label: "dos grandes projetos usam drones",
        fonte: "Global Growth Insights, Drone-in-a-Box Market, 2025",
    },
    energia: {
        titulo: "Inspeção solar: US$ 2.100 economizados por MW inspecionado",
        historia: "900.000 painéis no Muhammed bin Rashid Solar Park levavam 2 meses de inspeção manual. Com drones, o mesmo levantamento foi concluído em 5 dias — 400% mais rápido. Em 2025, US$ 788 milhões foram economizados globalmente com inspeção aérea de ativos solares.",
        metrica1: "75%", metrica1Label: "mais rápido que inspeção manual",
        metrica2: "US$ 2.100/MW", metrica2Label: "economia média por inspeção",
        metrica3: "97%", metrica3Label: "ganho de eficiência em 4 sites (Raptor Maps)",
        fonte: "Raptor Maps 2025 / FEDS Group 2024 / The Drone Life 2025",
    },
    mineracao: {
        titulo: "53% das minas a céu aberto já usam drones para mapeamento e segurança",
        historia: "Mineradoras como Rio Tinto e Barrick Gold implementaram sistemas autônomos para mapeamento de taludes, stockpile volumétrico e monitoramento de barragens. Resultado: acidentes reduzidos, inventários mais precisos, inspeções de áreas instáveis sem risco humano.",
        metrica1: "53%", metrica1Label: "das minas usam drones autônomos",
        metrica2: "48%", metrica2Label: "usam para medição de stockpile",
        metrica3: "100%", metrica3Label: "de cobertura em áreas de risco",
        fonte: "FlytBase Mining Report / Global Growth Insights 2025",
    },
    portos: {
        titulo: "Gestão aérea de pátios: cobertura total sem equipe de ronda terrestre",
        historia: "Terminais portuários e logísticos com centenas de hectares de pátio utilizam drones autônomos para inventário visual, segurança perimetral, inspeção de estruturas e rastreamento de ativos — substituindo múltiplas equipes de ronda e contratos de vigilância terceirizados.",
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
        pessoalDefault: 3200, pessoalMax: 12000, pessoalStep: 100, pessoalUnidade: "colaboradores de campo",
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
        pessoalDefault: 7000, pessoalMax: 30000, pessoalStep: 200, pessoalUnidade: "técnicos de campo",
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

// Capacidades técnicas reais DJI M4TD
const CAPS = [
    { icon: Eye, cor: C.orange, titulo: "Monitoramento 24/7", subtitulo: "Câmera 48MP + zoom 7× óptico", narrativa: "Às 2h17 da manhã, a missão de ronda #14 do dia foi concluída. O gestor recebeu relatório automático: 0 anomalias. O próximo voo começa em 43 minutos. Sem intervenção humana.", tag: "Vigilância" },
{ icon: Thermometer, cor: C.red, titulo: "Diagnóstico Térmico FLIR", subtitulo: "Sensor 640×512 px, f/1.0 — detecção de anomalias", narrativa: "Uma célula fotovoltaica com ponto quente de 87°C foi identificada entre 4.800 painéis. Custo da detecção: 47 minutos de voo. Custo de não detectar: parada de produção de R$ 380 mil.", tag: "Inspeção" },
{ icon: Map, cor: C.blue, titulo: "Mapeamento RTK Centimétrico", subtitulo: "Precisão 1 cm horizontal, 200 ha por voo", narrativa: "Uma propriedade de 1.800 ha que pagava R$ 42.000/ano em levantamentos aéreos terceirizados passou a executar o mesmo serviço em 9 voos autônomos semanais — sem custo adicional.", tag: "Mapeamento" },
{ icon: Scan, cor: C.purple, titulo: "Inspeção de Ativos", subtitulo: "Tele 168mm — leitura de instrumentos a 250 m", narrativa: "Subestação de alta tensão inspecionada sem acesso humano à área restrita. Leitura de medidores, identificação de ferrugem e detecção de aquecimento anômalo — tudo em 1 voo de 40 min.", tag: "Ativo" },
{ icon: Navigation, cor: C.cyan, titulo: "Dock 3 — Operação Autônoma", subtitulo: "Decola, executa e recarrega em 27 min sem operador", narrativa: "366 dias por ano. 8.760 horas disponíveis. O sistema opera enquanto a equipe está em outras atividades, dorme ou está em reunião. Não há licença sick, turnover ou 13º salário.", tag: "Autonomia" },
{ icon: Wind, cor: "#ea580c", titulo: "Resistência Operacional Extrema", subtitulo: "IP55 · -30°C a +50°C · vento 12 m/s", narrativa: "Chuva moderada, 8°C, rajadas de 10 m/s. A missão foi executada normalmente. O relatório chegou às 6h04. Nenhum funcionário precisou sair do abrigo.", tag: "Resiliência" },
{ icon: FileText, cor: C.green, titulo: "Relatórios Georreferenciados", subtitulo: "Cada voo = documentação jurídica automática", narrativa: "Quando o advogado pediu prova da condição do imóvel na data X, o sistema entregou 312 imagens com GPS, timestamp e temperatura ambiente. O processo foi encerrado em 2 semanas.", tag: "Docs" },
{ icon: Database, cor: "#7c3aed", titulo: "Inteligência de Dados & IA", subtitulo: "FlightHub 2 — histórico + alertas automáticos", narrativa: "Após 60 dias, o sistema aprendeu o padrão normal de temperatura de cada equipamento. Um desvio de 4°C gerou alerta preventivo. A falha foi corrigida antes de virar parada.", tag: "IA" },
];

const SPECS_TECH = [
    { cat: "Câmeras", cor: C.orange, items: [
        { k: "Wide-angle", v: "48 MP · f/1.7 · 24 mm" },
        { k: "Mid-tele", v: "48 MP · f/2.8 · 70 mm" },
        { k: "Tele", v: "48 MP · f/2.8 · 168 mm" },
        { k: "Térmica (FLIR)", v: "640×512 · f/1.0 · UHR 1280×1024" },
    ]},
{ cat: "Voo & Performance", cor: C.blue, items: [
    { k: "Autonomia", v: "54 min fwd · 47 min hover" },
    { k: "Velocidade", v: "21 m/s (Sport) · 15 m/s (Normal)" },
    { k: "Altitude máx.", v: "4.500 m AMSL" },
    { k: "Vento máx.", v: "Voo: 15 m/s · Pouso: 12 m/s" },
]},
{ cat: "Dock 3 — Estação", cor: C.cyan, items: [
    { k: "Recarga completa", v: "27 min (15% → 95%)" },
    { k: "Decolagem", v: "10 s após comando remoto" },
    { k: "Proteção", v: "IP56 (poeira + água)" },
    { k: "Temperatura", v: "-30°C a +50°C" },
]},
{ cat: "Transmissão & Posição", cor: C.purple, items: [
    { k: "Sistema O4+", v: "25 km FCC · 12 km CE" },
    { k: "RTK horizontal", v: "1 cm + 1 ppm (RMS)" },
    { k: "RTK vertical", v: "2 cm + 1 ppm (RMS)" },
    { k: "Laser rangefinder", v: "1.800 m · ±0,2 m" },
]},
];

// ─────────────────────────────────────────────
// SUB-COMPONENTES
// ─────────────────────────────────────────────
const Tag = ({ label, dark = false }: { label: string; dark?: boolean }) => (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 ${dark ? "bg-orange-500/15 border border-orange-500/25" : "bg-orange-50 border border-orange-100"}`}>
    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
    <span className={`text-[10px] font-extrabold uppercase tracking-[0.38em] ${dark ? "text-orange-400" : "text-orange-600"}`}>{label}</span>
    </div>
);

const SliderRow = ({
    label, icon: Icon, hint, value, min, max, step, onChange, fmt,
}: {
    label: string; icon: React.ElementType; hint?: string; value: number;
    min: number; max: number; step: number; onChange: (v: number) => void; fmt: (v: number) => string;
}) => (
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

const KPI = ({
    icon: Icon, label, value, sub, variant = "default",
}: {
    icon: React.ElementType; label: string; value: string; sub?: string;
    variant?: "default" | "positive" | "highlight" | "dark";
}) => {
    const V = {
        default: { bg: C.white, bd: C.border, val: C.ink, lbl: C.ink400 },
            positive: { bg: "#f0fdf4", bd: "#86efac", val: "#15803d", lbl: C.green },
            highlight: { bg: C.orangeL, bd: C.orangeM, val: C.orangeD, lbl: C.orange },
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

// Gráfico de projeção 5 anos — SVG puro, sem dependência externa
const GraficoProjecao = ({ beneficio, investimento, opAnual }: {
    beneficio: number; investimento: number; opAnual: number;
}) => {
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

// Barras de breakdown
const BreakdownBar = ({ items }: { items: { label: string; value: number; color: string; icon: React.ElementType }[] }) => {
    const total = items.reduce((s, i) => s + i.value, 0);
    const fmt = (v: number) => {
        if (v >= 1e6) return "R$ " + (v / 1e6).toFixed(2) + "M";
        return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });
    };
    return (
        <div className="space-y-3">
        {items.map((it, i) => {
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

// ─────────────────────────────────────────────
// PÁGINA PRINCIPAL
// ─────────────────────────────────────────────
export default function ROICalculatorPage() {
    const [setor, setSetor] = useState<Setor>("seguranca");
    const cfg = SETOR_CONFIG[setor];
    const caseData = CASES_DATA[setor];

    // Inputs
    const [numPessoas, setNumPessoas] = useState(cfg.numDefault);
    const [custoPessoa, setCustoPessoa] = useState(cfg.pessoalDefault);
    const [custoVeiculo, setCustoVeiculo] = useState(cfg.veiculoDefault);
    const [perdasAnuais, setPerdasAnuais] = useState(cfg.perdasDefault);
    const [contrato, setContrato] = useState(cfg.contratoDefault);
    const [inspecao, setInspecao] = useState(cfg.inspecaoDefault);
    const [area, setArea] = useState(cfg.areaDefault);
    const [reducao, setReducao] = useState(cfg.reducaoDefault);
    const [eficiencia, setEficiencia] = useState(cfg.eficienciaDefault);

    // UI state
    const [capAtiva, setCapAtiva] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [showLead, setShowLead] = useState(false);
    const [leadNome, setLeadNome] = useState("");
    const [leadEmail, setLeadEmail] = useState("");
    const [leadWA, setLeadWA] = useState("");
    const [leadEmpresa, setLeadEmpresa] = useState("");
    const [leadOk, setLeadOk] = useState(false);

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

    // Constantes fixas
    const INV = 205000;
    const OP_MES = 1500;
    const VIDA = 5;
    const OP_ANO = OP_MES * 12;

    // Cálculos
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
            `*Análise de ROI — SM Company*\n\nSetor: ${SETORES.find(s => s.id === setor)?.label}\nCusto operacional anual atual: ${fmtM(custoAnualAtual)}\nBenefício anual estimado: ${fmtM(beneficio)}\nPayback: ${paybackMeses < Infinity ? paybackMeses.toFixed(1) + " meses" : "—"}\nRetorno em 5 anos: ${fmtM(r5)}\n\nGostaria de uma análise personalizada para a minha operação.`
        );
        window.open(`https://wa.me/5561993711678?text=${txt}`, "_blank");
    };

    const faqs = [
        {
            q: "R$ 205 mil é um valor expressivo. Como justificar internamente?",
            a: `A lógica é simples: com base nos dados que você inseriu, o custo operacional atual da sua operação é de ${fmtM(custoAnualAtual)}/ano. A solução autônoma custa ${fmtM(custoDroneAno)}/ano (a partir do 2º ano, com depreciação de 5 anos). A diferença é o seu resultado. Para facilitar a aprovação interna, podemos elaborar uma análise de viabilidade formatada com TIR e VPL para apresentação ao conselho ou ao diretor financeiro — sem custo. Além disso, trabalhamos com modelos de DaaS (Drone-as-a-Service) e locação operacional que eliminam o CAPEX inicial.`,
        },
        {
            q: "Precisa de piloto certificado na equipe?",
            a: "Não. O sistema Dock 3 + M4TD é projetado para operação 100% autônoma. Missões são programadas via FlightHub 2 na nuvem. O drone decola, executa, retorna e recarrega sem qualquer intervenção. Um gestor pode monitorar múltiplas missões no celular ou notebook. O treinamento operacional incluso no projeto dura 8 horas.",
        },
        {
            q: "Como fica a operação com chuva, vento forte ou temperatura extrema?",
            a: "O Matrice 4TD tem IP55 (poeira + jato d'água) e opera entre -30°C e +50°C — cobrindo desde o Cerrado no verão até o Sul no inverno. O Dock 3 tem IP56 e monitoramento climático integrado: adia missões em condições inseguras automaticamente e retoma quando o tempo melhora. Voo em ventos de até 12 m/s para pouso e 15 m/s em cruzeiro.",
        },
        {
            q: "O sistema se integra com nosso centro de controle / SCADA / ERP?",
            a: "Sim. O FlightHub 2 possui API aberta para integração com sistemas SCADA, BMS, ERP e plataformas de segurança terceiras. A partir do 2º semestre de 2025, há também opção de deploy em servidor privado ou nuvem interna, mantendo todos os dados de voo sob controle total da sua operação.",
        },
        {
            q: "E a questão regulatória de voos autônomos no Brasil?",
            a: "Voos em altitude padrão (até 120 m AGL) em áreas de propriedade privada seguem o RBAC-E 94 da ANAC/DECEA. Nossa equipe cuida de todo o processo de regularização: registro ANATEL, cadastro SISANT, plano de voo e documentação de conformidade. Para operações além da linha de visada (BVLOS), assessoramos o processo de autorização específica.",
        },
        {
            q: "Quais são todos os custos após o investimento inicial?",
            a: `Custo operacional fixo: R$ 1.500/mês (energia, manutenção preventiva básica e plano FlightHub 2). Manutenção preventiva anual: R$ 8.000 a R$ 12.000 dependendo da intensidade de uso — já incluído na nossa estimativa de R$ 1.500/mês. Peças de reposição (hélices, bateria de reserva): variável por uso. Sem taxa por missão, sem licença por usuário adicional, sem custo oculto de plataforma.`,
        },
    ];

    return (
        <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>

        {/* ─── HEADER ─── */}
        <header className="bg-white border-b sticky top-0 z-50" style={{ borderColor: C.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: C.orangeL }}>
        <Calculator size={15} style={{ color: C.orange }} />
        </div>
        <div className="hidden sm:block">
        <div className="hn text-sm font-black" style={{ color: C.ink }}>Análise de Valor Operacional</div>
        <div className="text-[10px]" style={{ color: C.ink400 }}>SM Company · DJI Matrice 4TD + Dock 3</div>
        </div>
        <div className="sm:hidden hn text-sm font-black" style={{ color: C.ink }}>SM Company · ROI</div>
        </div>
        <div className="flex items-center gap-3">
        <button onClick={shareWA}
        className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border transition-all hover:bg-gray-50"
        style={{ borderColor: C.border, color: C.ink500 }}>
        <MessageCircle size={13} /> WhatsApp
        </button>
        <a href="/" className="text-xs hidden sm:block hover:text-orange-500 transition-colors" style={{ color: C.ink400 }}>
        ← Voltar ao site
        </a>
        </div>
        </div>
        </header>

        {/* ─── HERO ─── */}
        <section style={{ background: `linear-gradient(150deg, #05091a 0%, #0d1530 55%, #1a0800 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-22">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Tag label="Análise consultiva de valor · SM Company" dark />
        <h1 className="hn text-4xl sm:text-6xl font-black uppercase leading-[0.85] text-white mb-5">
        Não é sobre<br />o custo do drone.<br />
        <span style={{ color: C.orange }}>É sobre o custo<br />de não ter um.</span>
        </h1>
        <p className="text-sm sm:text-base leading-relaxed mb-8 max-w-xl" style={{ color: "#94a3b8" }}>
        Cada missão não executada, cada mapa não gerado, cada falha não detectada a tempo —
        esses são os custos reais que esta análise vai mostrar. Baseada em dados de operações reais,
        não em projeções de vendas.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
            { n: "8", u: "funções", d: "em 1 plataforma" },
            { n: "25 km", u: "alcance real", d: "transmissão O4+" },
            { n: "54 min", u: "autonomia", d: "por carregamento" },
            { n: "1 cm", u: "precisão RTK", d: "horizontal (RMS)" },
        ].map((s, i) => (
            <div key={i} className="rounded-xl p-3 border" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="hn text-xl font-black" style={{ color: C.orange }}>{s.n}</div>
            <div className="text-xs font-bold text-white">{s.u}</div>
            <div className="text-[11px]" style={{ color: "#64748b" }}>{s.d}</div>
            </div>
        ))}
        </div>
        <div className="flex flex-wrap gap-3">
        <a href="#calculadora" className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-extrabold text-white uppercase tracking-widest transition-all"
        style={{ background: C.orange }}>
        Simular minha operação <ChevronRight size={15} />
        </a>
        <button onClick={shareWA}
        className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold border transition-all hover:bg-white/5"
        style={{ borderColor: "rgba(255,255,255,0.12)", color: "#94a3b8" }}>
        <MessageCircle size={14} /> Falar com especialista
        </button>
        </div>
        </motion.div>

        {/* Benchmarks globais */}
        <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-2xl p-5 border" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-2 mb-5">
        <Activity size={14} style={{ color: C.orange }} />
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-white">
        Benchmarks de mercado — dados reais 2024/2025
        </span>
        </div>
        <div className="space-y-4">
        {[
            { v: "60%", l: "redução em custo de segurança", src: "Titan Protection / FlytBase 2025", icon: Shield, cor: C.orange },
            { v: "40%", l: "menos incidentes pós-implantação", src: "Titan Protection, dados 2025", icon: AlertTriangle, cor: C.red },
            { v: "75%", l: "mais rápido que inspeção manual (solar)", src: "The Drone Life / Raptor Maps 2025", icon: Zap, cor: C.blue },
            { v: "US$2.100/MW", l: "economizados por ciclo de inspeção solar", src: "Raptor Maps — $788M globais em 2025", icon: DollarSign, cor: C.green },
            { v: "58%", l: "dos grandes projetos de construção usam drones", src: "Global Growth Insights 2025", icon: Factory, cor: C.purple },
            { v: "53%", l: "das minas a céu aberto usam drones autônomos", src: "FlytBase Mining Report 2025", icon: Database, cor: C.cyan },
        ].map((b, i) => {
            const Icon = b.icon;
            return (
                <div key={i} className="flex items-start gap-3">
                <Icon size={12} className="shrink-0 mt-0.5" style={{ color: b.cor }} />
                <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                <span className="text-[11px]" style={{ color: "#94a3b8" }}>{b.l}</span>
                <span className="hn text-sm font-black shrink-0" style={{ color: b.cor }}>{b.v}</span>
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: "#475569" }}>{b.src}</div>
                <div className="h-0.5 rounded-full mt-1" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div className="h-full rounded-full" style={{ background: b.cor, opacity: 0.6, width: b.v.startsWith("US$") ? "80%" : b.v.replace("%", "") + "%" }} />
                </div>
                </div>
                </div>
            );
        })}
        </div>
        </motion.div>
        </div>
        </div>
        </section>

        {/* ─── CAPACIDADES ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
        <Tag label="Plataforma operacional" />
        <h2 className="hn text-3xl sm:text-4xl font-black" style={{ color: C.ink }}>
        Um sistema. Oito operações <span style={{ color: C.orange }}>simultâneas.</span>
        </h2>
        <p className="mt-3 text-sm max-w-2xl mx-auto" style={{ color: C.ink400 }}>
        A diferença entre comprar um drone e adquirir uma plataforma operacional autônoma é o que acontece
        além do voo — dados, relatórios, diagnósticos e registros gerados automaticamente, a cada missão.
        </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1.5 mb-6 justify-center">
        {CAPS.map((c, i) => (
            <button key={i} onClick={() => setCapAtiva(i)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all"
            style={{
                background: capAtiva === i ? c.cor : C.white,
                borderColor: capAtiva === i ? c.cor : C.border,
                color: capAtiva === i ? "#fff" : C.ink500,
            }}>
            <c.icon size={10} /> {c.tag}
            </button>
        ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
        {/* Detalhe ativo */}
        <AnimatePresence mode="wait">
        <motion.div key={capAtiva} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
        className="rounded-2xl overflow-hidden border" style={{ borderColor: C.border }}>
        <div className="p-6" style={{ background: CAPS[capAtiva].cor + "10" }}>
        <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: CAPS[capAtiva].cor }}>
        {React.createElement(CAPS[capAtiva].icon, { size: 22, color: "#fff" })}
        </div>
        <div>
        <h3 className="hn font-black text-lg" style={{ color: C.ink }}>{CAPS[capAtiva].titulo}</h3>
        <p className="text-xs mt-0.5" style={{ color: C.ink400 }}>{CAPS[capAtiva].subtitulo}</p>
        </div>
        </div>
        <blockquote className="border-l-4 pl-4 py-1 italic text-sm leading-relaxed"
        style={{ borderColor: CAPS[capAtiva].cor, color: C.inkMid, background: CAPS[capAtiva].cor + "06", borderRadius: "0 8px 8px 0" }}>
        "{CAPS[capAtiva].narrativa}"
        </blockquote>
        </div>
        <div className="p-5 bg-white">
        <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: C.ink400 }}>Especificação técnica</div>
        <div className="grid grid-cols-1 gap-1.5">
        {[
            ...SPECS_TECH.flatMap(s => s.items).slice(capAtiva * 2, capAtiva * 2 + 4).length > 0
            ? SPECS_TECH.flatMap(s => s.items).slice(capAtiva * 2, capAtiva * 2 + 4)
            : SPECS_TECH[capAtiva % 4].items
        ].map((sp, i) => (
            <div key={i} className="flex items-center gap-2 text-xs py-1 border-b last:border-0" style={{ borderColor: C.borderL }}>
            <Check size={11} style={{ color: CAPS[capAtiva].cor }} className="shrink-0" />
            <span style={{ color: C.ink500 }}>{sp.k}: </span>
            <span className="font-bold ml-0.5" style={{ color: C.ink }}>{sp.v}</span>
            </div>
        ))}
        </div>
        </div>
        </motion.div>
        </AnimatePresence>

        {/* Grid de todas */}
        <div className="grid grid-cols-2 gap-2.5">
        {CAPS.map((c, i) => (
            <button key={i} onClick={() => setCapAtiva(i)}
            className="rounded-xl p-3.5 border text-left transition-all"
            style={{
                background: capAtiva === i ? c.cor + "0f" : C.white,
                borderColor: capAtiva === i ? c.cor : C.border,
            }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
            style={{ background: capAtiva === i ? c.cor : C.orangeL }}>
            {React.createElement(c.icon, { size: 14, color: capAtiva === i ? "#fff" : C.orange })}
            </div>
            <div className="text-[11px] font-black leading-tight" style={{ color: C.ink }}>{c.titulo}</div>
            <div className="text-[10px] mt-0.5" style={{ color: C.ink400 }}>{c.subtitulo.split("—")[0].split("·")[0]}</div>
            </button>
        ))}
        </div>
        </div>
        </section>

        {/* ─── SPECS TÉCNICAS ─── */}
        <section style={{ background: C.navyMid }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center gap-3 mb-6">
        <Cpu size={15} style={{ color: C.orange }} />
        <h2 className="hn text-sm font-black text-white uppercase tracking-widest">
        Matrice 4TD + Dock 3 — Especificações Oficiais DJI
        </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SPECS_TECH.map((cat, ci) => (
            <div key={ci} className="rounded-xl overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="px-4 py-2.5" style={{ background: cat.cor }}>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-white">{cat.cat}</span>
            </div>
            <div className="p-4 space-y-2.5" style={{ background: "rgba(255,255,255,0.03)" }}>
            {cat.items.map((item, ii) => (
                <div key={ii}>
                <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>{item.k}</div>
                <div className="text-sm font-bold text-white">{item.v}</div>
                </div>
            ))}
            </div>
            </div>
        ))}
        </div>
        <div className="mt-4 text-[11px] text-center" style={{ color: "#334155" }}>
        Fonte: DJI Enterprise oficial · enterprise.dji.com · advexure.com · dslrpros.com · tecnodrones.com.br
        </div>
        </div>
        </section>

        {/* ─── CALCULADORA ─── */}
        <section id="calculadora" style={{ background: C.bgAlt }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

        <div className="text-center mb-10">
        <Tag label="Diagnóstico financeiro da operação" />
        <h2 className="hn text-3xl sm:text-4xl font-black" style={{ color: C.ink }}>
        O que está custando <span style={{ color: C.orange }}>não ter isso hoje?</span>
        </h2>
        <p className="mt-3 text-sm max-w-2xl mx-auto" style={{ color: C.ink400 }}>
        Preencha os dados da sua operação. Os cálculos são baseados em benchmarks de mercado reais,
        não em projeções otimistas. Ajuste cada valor para a sua realidade.
        </p>
        </div>

        {/* Seletor de setor */}
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
                    boxShadow: isActive ? `0 0 0 2px ${C.orange}33` : "none",
                }}>
                <Icon size={14} className="mb-1.5" style={{ color: isActive ? C.orange : C.ink400 }} />
                <div className="text-[11px] font-black leading-tight" style={{ color: isActive ? "#fff" : C.ink }}>{s.label}</div>
                <div className="text-[10px] mt-0.5" style={{ color: isActive ? C.ink300 : C.ink400 }}>{s.desc}</div>
                </button>
            );
        })}
        </div>

        {/* Case do setor selecionado */}
        <motion.div key={setor} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 mb-8 border" style={{ background: C.orangeL, borderColor: C.orangeM }}>
        <div className="flex items-start gap-4">
        <Star size={16} className="shrink-0 mt-0.5" style={{ color: C.orange }} />
        <div className="flex-1">
        <h3 className="font-black text-sm mb-1.5" style={{ color: C.orangeD }}>{caseData.titulo}</h3>
        <p className="text-xs leading-relaxed mb-3" style={{ color: "#7c2d12" }}>{caseData.historia}</p>
        <div className="grid grid-cols-3 gap-3">
        {[
            { v: caseData.metrica1, l: caseData.metrica1Label },
            { v: caseData.metrica2, l: caseData.metrica2Label },
            { v: caseData.metrica3, l: caseData.metrica3Label },
        ].map((m, i) => (
            <div key={i} className="rounded-lg p-2.5 text-center" style={{ background: "rgba(249,115,22,0.1)" }}>
            <div className="hn text-lg font-black" style={{ color: C.orangeD }}>{m.v}</div>
            <div className="text-[10px]" style={{ color: "#92400e" }}>{m.l}</div>
            </div>
        ))}
        </div>
        <div className="text-[10px] mt-2" style={{ color: "#b45309" }}>Fonte: {caseData.fonte}</div>
        </div>
        </div>
        </motion.div>

        {/* Grid inputs + resultados */}
        <div className="grid lg:grid-cols-2 gap-6">

        {/* ─ INPUTS ─ */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border" style={{ borderColor: C.border }}>
        <div className="flex items-center gap-2.5 mb-5 pb-4 border-b" style={{ borderColor: C.borderL }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: C.orangeL }}>
        <TrendingDown size={13} style={{ color: C.orange }} />
        </div>
        <div>
        <h3 className="hn font-black text-sm" style={{ color: C.ink }}>Custo operacional atual</h3>
        <p className="text-[10px]" style={{ color: C.ink400 }}>Preencha com os valores reais da sua operação</p>
        </div>
        </div>

        <div className="space-y-5">
        {/* Número de pessoas — input numérico direto para grandes operações */}
        <div>
        <div className="flex items-center gap-1.5 mb-2">
        <Users size={13} style={{ color: C.orange }} />
        <label className="text-xs font-semibold" style={{ color: C.inkMid }}>
        Número de {cfg.pessoalUnidade}
        </label>
        </div>
        <p className="text-[11px] mb-2 ml-4" style={{ color: C.ink400 }}>
        Total envolvido nas atividades que a plataforma pode amplificar
        </p>
        <div className="flex items-center gap-3 ml-4">
        <input type="range" min={1} max={Math.min(cfg.numMax, 500)} step={1} value={Math.min(numPessoas, 500)}
        onChange={e => setNumPessoas(Number(e.target.value))}
        className="flex-1 accent-orange-500 h-1.5 cursor-pointer" />
        <div className="flex items-center gap-1 border rounded-lg px-2 py-1" style={{ borderColor: C.border }}>
        <input type="number" value={numPessoas} min={1} max={cfg.numMax}
        onChange={e => setNumPessoas(Math.max(1, Math.min(cfg.numMax, Number(e.target.value))))}
        className="w-16 text-right text-sm font-black outline-none" style={{ color: C.ink }} />
        <span className="text-[10px]" style={{ color: C.ink400 }}>prof.</span>
        </div>
        </div>
        </div>

        <SliderRow label={cfg.pessoalLabel} icon={DollarSign}
        hint="Custo total para a empresa: salário + encargos + benefícios + FGTS"
        value={custoPessoa} min={1500} max={cfg.pessoalMax} step={cfg.pessoalStep}
        onChange={setCustoPessoa} fmt={fmt} />

        <SliderRow label="Veículos, deslocamentos e logística operacional / mês" icon={Car}
        value={custoVeiculo} min={0} max={50000} step={200}
        onChange={setCustoVeiculo} fmt={fmt} />

        <SliderRow label={cfg.perdasLabel} icon={TrendingDown}
        hint="Estimativa anual conservadora. Zero se não souber."
        value={perdasAnuais} min={0} max={cfg.perdasMax} step={cfg.perdasStep}
        onChange={setPerdasAnuais} fmt={fmtM} />

        {/* Custos substituídos */}
        <div className="rounded-xl border p-4" style={{ background: "#fffbeb", borderColor: "#fde68a" }}>
        <div className="flex items-center gap-2 mb-3">
        <Info size={12} style={{ color: "#d97706" }} />
        <span className="text-[11px] font-bold" style={{ color: "#92400e" }}>
        Custos que a plataforma absorve diretamente
        </span>
        </div>
        <div className="space-y-4">
        <div>
        <div className="flex items-center gap-1.5 mb-1">
        <Globe size={12} style={{ color: C.orange }} />
        <label className="text-[11px] font-semibold" style={{ color: C.inkMid }}>{cfg.contratoLabel}</label>
        </div>
        <div className="flex items-center gap-3 ml-4">
        <input type="range" min={0} max={cfg.contratoMax} step={500} value={contrato}
        onChange={e => setContrato(Number(e.target.value))}
        className="flex-1 accent-orange-500 h-1.5 cursor-pointer" />
        <div className="flex items-center gap-1 border rounded-lg px-2 py-1" style={{ borderColor: C.border, background: C.white }}>
        <input type="number" value={contrato} min={0} max={cfg.contratoMax}
        onChange={e => setContrato(Math.max(0, Number(e.target.value)))}
        className="w-20 text-right text-xs font-bold outline-none" style={{ color: C.ink }} />
        </div>
        </div>
        </div>
        <div>
        <div className="flex items-center gap-1.5 mb-1">
        <Scan size={12} style={{ color: C.orange }} />
        <label className="text-[11px] font-semibold" style={{ color: C.inkMid }}>{cfg.inspecaoLabel}</label>
        </div>
        <div className="flex items-center gap-3 ml-4">
        <input type="range" min={0} max={cfg.inspecaoMax} step={1000} value={inspecao}
        onChange={e => setInspecao(Number(e.target.value))}
        className="flex-1 accent-orange-500 h-1.5 cursor-pointer" />
        <div className="flex items-center gap-1 border rounded-lg px-2 py-1" style={{ borderColor: C.border, background: C.white }}>
        <input type="number" value={inspecao} min={0} max={cfg.inspecaoMax}
        onChange={e => setInspecao(Math.max(0, Number(e.target.value)))}
        className="w-20 text-right text-xs font-bold outline-none" style={{ color: C.ink }} />
        </div>
        </div>
        </div>
        </div>
        </div>

        <div>
        <div className="flex items-center gap-1.5 mb-1.5">
        <Map size={13} style={{ color: C.orange }} />
        <label className="text-xs font-semibold" style={{ color: C.inkMid }}>{cfg.areaLabel}</label>
        </div>
        <div className="flex items-center gap-3 ml-4">
        <input type="number" value={area} min={0}
        onChange={e => setArea(Math.max(0, Number(e.target.value)))}
        className="flex-1 px-3 py-2 rounded-xl border text-sm font-bold"
        style={{ background: C.bg, borderColor: C.border, color: C.ink }} />
        <div className="text-[11px] font-bold px-3 py-2 rounded-xl shrink-0"
        style={{ background: C.orangeL, color: C.orangeD }}>
        ~{voosArea} {voosArea === 1 ? "voo" : "voos"}/ciclo
        </div>
        </div>
        </div>

        <div className="h-px" style={{ background: C.border }} />

        <div className="flex items-center gap-2 mb-1">
        <TrendingUp size={13} style={{ color: C.orange }} />
        <h4 className="hn font-black text-xs uppercase tracking-wider" style={{ color: C.ink }}>
        Parâmetros da solução autônoma
        </h4>
        </div>

        <div>
        <div className="flex items-center gap-1.5 mb-1">
        <Users size={13} style={{ color: C.orange }} />
        <label className="text-xs font-semibold" style={{ color: C.inkMid }}>
        Profissionais com potencial de realocamento estratégico
        </label>
        </div>
        <p className="text-[11px] mb-2 ml-4" style={{ color: C.ink400 }}>
        Equipe que pode ser direcionada a funções de maior valor, com a plataforma assumindo tarefas repetitivas
        </p>
        <div className="flex items-center gap-3 ml-4">
        <input type="range" min={0} max={numPessoas} step={1} value={Math.min(reducao, numPessoas)}
        onChange={e => setReducao(Number(e.target.value))}
        className="flex-1 accent-orange-500 h-1.5 cursor-pointer" />
        <span className="hn text-sm font-black min-w-[80px] text-right" style={{ color: C.ink }}>
        {Math.min(reducao, numPessoas)} de {numPessoas}
        </span>
        </div>
        </div>

        <SliderRow label="Eficiência estimada na redução de perdas operacionais" icon={Target}
        hint="80% é conservador. Cases reais chegam a 100% em categorias específicas."
        value={eficiencia} min={0} max={100} step={5}
        onChange={setEficiencia} fmt={v => `${v}%`} />
        </div>
        </div>

        {/* ─ RESULTADOS ─ */}
        <div className="lg:sticky lg:top-20 self-start space-y-4">
        <AnimatePresence mode="wait">
        {!showLead ? (
            <motion.div key="res" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="bg-white rounded-2xl p-5 sm:p-6 border" style={{ borderColor: C.border }}>
            <Tag label="Análise de retorno" />

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
            <KPI icon={TrendingDown} label="Custo operacional mensal atual" value={fmtM(custoMensalAtual)} />
            <KPI icon={DollarSign} label="Custo total anual (status quo)" value={fmtM(custoAnualAtual)} />
            <KPI icon={TrendingUp} label="Benefício anual estimado"
            value={fmtM(beneficio)} variant={beneficio > 0 ? "highlight" : "default"} />
            <KPI icon={Clock} label="Payback estimado"
            value={paybackMeses < Infinity ? `${paybackMeses.toFixed(1)} meses` : "—"}
            sub="Retorno do inv. inicial" />
            </div>
            <div className="grid grid-cols-2 gap-2.5 mb-4">
            <KPI icon={BarChart3} label="Retorno em 3 anos"
            value={fmtM(r3)} sub="Resultado líquido acumulado"
            variant={r3 > 0 ? "positive" : "default"} />
            <KPI icon={Award} label="ROI em 5 anos"
            value={roi5 > 0 ? `${roi5.toFixed(0)}%` : "—"}
            sub="Sobre o investimento inicial" variant={roi5 > 0 ? "dark" : "default"} />
            </div>

            {/* Gráfico */}
            <div className="rounded-xl border p-4 mb-4" style={{ background: C.bg, borderColor: C.border }}>
            <div className="flex items-center gap-1.5 mb-3">
            <LineChart size={12} style={{ color: C.orange }} />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: C.ink400 }}>
            Projeção de retorno acumulado (5 anos)
            </span>
            </div>
            <GraficoProjecao beneficio={beneficio} investimento={INV} opAnual={OP_ANO} />
            <div className="flex items-center gap-4 mt-2 justify-center flex-wrap">
            <div className="flex items-center gap-1.5 text-[10px]" style={{ color: C.ink400 }}>
            <div className="w-3 h-0.5 rounded" style={{ background: C.orange }} />
            Saldo acumulado
            </div>
            <div className="flex items-center gap-1.5 text-[10px]" style={{ color: C.green }}>
            <div className="w-3 h-0.5 rounded" style={{ borderTop: `1.5px dashed ${C.green}` }} />
            Ponto de payback
            </div>
            </div>
            </div>

            {/* Breakdown */}
            <div className="rounded-xl border p-4 mb-4" style={{ borderColor: C.border }}>
            <div className="flex items-center gap-1.5 mb-3">
            <PieChart size={12} style={{ color: C.orange }} />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: C.ink400 }}>
            Composição do benefício anual
            </span>
            </div>
            <BreakdownBar items={[
                { label: `Eficiência de equipe (${Math.min(reducao, numPessoas)} prof. realocados)`, value: ecoPessoas, color: C.orange, icon: Users },
                      { label: "Contratos e serviços externos eliminados", value: ecoContratos, color: C.blue, icon: Globe },
                      { label: `Recuperação de perdas (${eficiencia}% de eficiência)`, value: ecoPerdas, color: C.green, icon: Shield },
            ]} />
            </div>

            {/* Intangíveis */}
            <div className="rounded-xl border border-orange-100 p-4 mb-4" style={{ background: C.orangeL }}>
            <h4 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: C.orangeD }}>
            <Award size={12} /> Ganhos que não entram na planilha
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
            {[
                "Registros com validade jurídica — GPS, timestamp e imagem 4K por voo",
                "Mapeamento interno sem contratar empresa topográfica externa",
                "Inspeção de ativos de alto risco sem expor equipes",
                "Cobertura 10× maior por hora de operação vs. ronda convencional",
                "Capacidade de resposta a incidente em minutos, não em horas",
                "Dados históricos comparativos — base para seguro e compliance",
                "Relatórios de conformidade automáticos — sem custo de consultoria adicional",
            ].map((b, i) => (
                <div key={i} className="flex gap-2 items-start text-[11px]" style={{ color: "#7c2d12" }}>
                <Check size={10} className="shrink-0 mt-0.5" style={{ color: C.orange }} />
                {b}
                </div>
            ))}
            </div>
            </div>

            <div className="space-y-2">
            <button onClick={() => setShowLead(true)}
            className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-xl text-sm font-extrabold uppercase tracking-widest"
            style={{ background: C.orange }}>
            <Download size={14} /> Receber análise completa
            </button>
            <button onClick={shareWA}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border transition-all hover:bg-gray-50"
            style={{ borderColor: C.border, color: C.ink500 }}>
            <MessageCircle size={13} /> Compartilhar no WhatsApp
            </button>
            </div>
            </motion.div>
        ) : (
            <motion.div key="lead" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-white rounded-2xl p-5 sm:p-6 border" style={{ borderColor: C.border }}>
            {!leadOk ? (
                <>
                <div className="flex items-center justify-between mb-4">
                <div>
                <h3 className="hn text-lg font-black" style={{ color: C.ink }}>Receba a análise personalizada</h3>
                <p className="text-[11px]" style={{ color: C.ink400 }}>Sem compromisso. Sem script de vendas.</p>
                </div>
                <button onClick={() => setShowLead(false)} className="p-1 rounded-full hover:bg-gray-100"><X size={15} /></button>
                </div>
                <form onSubmit={e => { e.preventDefault(); setLeadOk(true); }} className="space-y-3">
                {[
                    { l: "Nome completo", v: leadNome, s: setLeadNome, t: "text", p: "Seu nome" },
                    { l: "Empresa", v: leadEmpresa, s: setLeadEmpresa, t: "text", p: "Nome da empresa" },
                    { l: "E-mail corporativo", v: leadEmail, s: setLeadEmail, t: "email", p: "email@empresa.com.br" },
                    { l: "WhatsApp", v: leadWA, s: setLeadWA, t: "tel", p: "(61) 99999-9999" },
                ].map(f => (
                    <div key={f.l}>
                    <label className="text-[11px] font-semibold block mb-1" style={{ color: C.ink500 }}>{f.l}</label>
                    <input type={f.t} required value={f.v} onChange={e => f.s(e.target.value)} placeholder={f.p}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm"
                    style={{ background: C.bg, borderColor: C.border }} />
                    </div>
                ))}
                <button type="submit" className="w-full text-white py-3.5 rounded-xl text-sm font-extrabold uppercase tracking-widest"
                style={{ background: C.orange }}>
                Enviar e receber análise
                </button>
                </form>
                </>
            ) : (
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-center py-6">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={26} className="text-green-600" />
                </div>
                <h3 className="hn text-lg font-black mb-1.5" style={{ color: C.ink }}>Recebemos sua solicitação.</h3>
                <p className="text-xs mb-5" style={{ color: C.ink400 }}>
                Um especialista da SM Company entrará em contato em até 24h para aprofundar a análise da sua operação.
                </p>
                <div className="space-y-2">
                <button onClick={shareWA}
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl text-sm font-semibold">
                <MessageCircle size={14} /> Falar agora no WhatsApp
                </button>
                <a href="/" className="w-full flex items-center justify-center border px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50"
                style={{ borderColor: C.border }}>Voltar ao site</a>
                </div>
                </motion.div>
            )}
            </motion.div>
        )}
        </AnimatePresence>

        {/* Nota metodológica */}
        <div className="rounded-xl p-4 border bg-white" style={{ borderColor: C.border }}>
        <div className="flex items-start gap-2">
        <AlertCircle size={12} className="shrink-0 mt-0.5" style={{ color: C.ink300 }} />
        <p className="text-[10px] leading-relaxed" style={{ color: C.ink400 }}>
        <strong>Metodologia:</strong> Custo total anual = pessoal + veículos + contratos + perdas + inspeções.
        Solução depreciada em 5 anos (linear). Custo fixo: R$ 1.500/mês (energia, manutenção, FlightHub 2).
        Benefício = realocação de equipe + contratos eliminados + recuperação de perdas.
        Resultados reais variam. Benchmarks citados com fonte verificável.
        </p>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>

        {/* ─── CASES REAIS ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
        <Tag label="Evidências de campo" />
        <h2 className="hn text-3xl sm:text-4xl font-black" style={{ color: C.ink }}>
        O ROI não é teórico.<br />
        <span style={{ color: C.orange }}>Está documentado.</span>
        </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
            {
                local: "Titan Protection — EUA", badge: "Segurança", badgeCor: C.orange,
            titulo: "US$ 13.000/mês → US$ 6.100/mês com drone autônomo",
            historia: "Empresa de segurança com 600 funcionários e milhares de câmeras monitoradas. Substituiu cobertura presencial por drone-in-a-box em múltiplos sites. 60% de redução de custo, 40% menos incidentes, payback de 12–18 meses.",
            fonte: "FlytBase / Titan Protection, 2025",
            metricas: ["60% custo operacional", "40% menos incidentes", "Payback: 12–18 meses"],
            },
            {
                local: "Fazenda de Camarão — CE / Brasil", badge: "Agronegócio", badgeCor: C.green,
            titulo: "Perdas de toneladas/mês zeradas em 60 dias",
            historia: "480 ha de viveiros de camarão. Rondas autônomas a cada 90 min com câmera FLIR. Perdas eliminadas, 2 contratos de monitoramento cancelados. O gestor monitora tudo do celular.",
            fonte: "SM Company — case real, 2024",
            metricas: ["Perdas → zero", "2 contratos eliminados", "Payback < 14 meses"],
            },
            {
                local: "Muhammed bin Rashid Solar Park — UAE", badge: "Energia Solar", badgeCor: C.blue,
            titulo: "900.000 painéis inspecionados em 5 dias (vs. 2 meses)",
            historia: "A maior fazenda solar do mundo. Inspeção manual levaria 2 meses com equipe completa. Com drones, 5 dias. 400% mais rápido, US$ 2.100 economizados por MW inspecionado, anomalias detectadas com 98.7% de precisão.",
            fonte: "FEDS Group / Raptor Maps, 2024/2025",
            metricas: ["400% mais rápido", "US$ 2.100/MW economizados", "98.7% precisão na detecção"],
            },
            {
                local: "Rio Tinto & Barrick Gold — Global", badge: "Mineração", badgeCor: C.purple,
            titulo: "Mapeamento de taludes e stockpile sem risco humano",
            historia: "Grandes mineradoras usam drones autônomos para mapear áreas instáveis, medir volume de stockpile e monitorar barragens. 53% das minas a céu aberto já operam com sistemas autônomos. Redução de acidentes e maior precisão de inventário.",
            fonte: "FlytBase Mining Report / Global Growth Insights, 2025",
            metricas: ["53% das minas usam drones", "Inventário preciso sem riscos", "Monitoramento contínuo de barragem"],
            },
            {
                local: "Vista Park Sul — Brasília, DF", badge: "Condomínio", badgeCor: C.cyan,
            titulo: "Flagrante ao vivo na primeira demonstração",
            historia: "Sistema identificou 2 pessoas contornando o perímetro às 22h47. Alerta em tempo real com GPS e vídeo 4K. Ocorrência resolvida em 9 minutos com prova visual completa. Zero ocorrências nos 90 dias seguintes.",
            fonte: "SM Company — case real, 2024",
            metricas: ["Resposta: 9 minutos", "Prova jurídica completa", "Zero ocorrências / 90 dias"],
            },
            {
                local: "Construção civil — Global", badge: "Construção", badgeCor: C.orange,
            titulo: "58% dos grandes projetos usam drones para progresso e segurança",
            historia: "O mercado de drone-in-a-box na construção atingiu US$ 23.3 bilhões em 2025. 52% relatam redução no tempo de inspeção. 47% usam para visualização de obras em tempo real. A adoção cresce 14% ao ano.",
            fonte: "Global Growth Insights, Drone-in-a-Box Market, 2025",
            metricas: ["52% menos tempo de inspeção", "CAGR 14% até 2035", "47% adotam visualização real-time"],
            },
        ].map((c, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border" style={{ borderColor: C.border }}>
            <div className="p-5" style={{ background: c.badgeCor + "0d" }}>
            <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: c.badgeCor, color: "#fff" }}>{c.badge}</span>
            <span className="text-[11px]" style={{ color: C.ink400 }}>{c.local}</span>
            </div>
            <h3 className="hn font-black text-sm mb-2 leading-tight" style={{ color: C.ink }}>{c.titulo}</h3>
            <p className="text-xs leading-relaxed" style={{ color: C.ink500 }}>{c.historia}</p>
            </div>
            <div className="px-5 py-4 bg-white border-t" style={{ borderColor: C.borderL }}>
            <div className="flex flex-col gap-1.5 mb-3">
            {c.metricas.map((m, mi) => (
                <div key={mi} className="flex items-center gap-2 text-[11px]" style={{ color: C.ink }}>
                <Check size={10} className="shrink-0" style={{ color: c.badgeCor }} />
                <span className="font-semibold">{m}</span>
                </div>
            ))}
            </div>
            <div className="text-[10px]" style={{ color: C.ink400 }}>Fonte: {c.fonte}</div>
            </div>
            </div>
        ))}
        </div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ background: C.bgAlt }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-8">
        <Tag label="Perguntas frequentes" />
        <h2 className="hn text-3xl font-black" style={{ color: C.ink }}>
        As perguntas que todo gestor faz.<br />
        <span style={{ color: C.orange }}>Respondidas com dados.</span>
        </h2>
        </div>
        <div className="space-y-2.5">
        {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: C.border }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left gap-4">
            <span className="font-bold text-sm" style={{ color: C.ink }}>{faq.q}</span>
            <ChevronDown size={14} className="shrink-0 transition-transform"
            style={{ color: C.ink400, transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }} />
            </button>
            <AnimatePresence>
            {openFaq === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                <div className="px-5 pb-5 text-sm leading-relaxed border-t" style={{ color: C.ink500, borderColor: C.borderL }}>
                <div className="pt-4">{faq.a}</div>
                </div>
                </motion.div>
            )}
            </AnimatePresence>
            </div>
        ))}
        </div>
        </div>
        </section>

        {/* ─── CTA FINAL ─── */}
        <section style={{ background: C.navy }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <Tag label="Próximo passo" dark />
        <h2 className="hn text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
        A análise que você viu agora<br />
        <span style={{ color: C.orange }}>usou dados genéricos.</span>
        </h2>
        <p className="text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: "#94a3b8" }}>
        A análise com os dados reais da <strong className="text-white">sua</strong> operação é mais precisa,
        mais conservadora — e, na maioria dos casos, mais favorável. Nossa equipe faz o diagnóstico completo,
        gratuito, sem pressão de fechamento. Apenas números reais aplicados ao seu contexto.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <button onClick={() => setShowLead(true)}
        className="flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl font-extrabold text-sm uppercase tracking-widest"
        style={{ background: C.orange }}>
        <Calculator size={15} /> Quero minha análise personalizada
        </button>
        <button onClick={shareWA}
        className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border transition-all hover:bg-white/5"
        style={{ borderColor: "rgba(255,255,255,0.12)", color: "#94a3b8" }}>
        <MessageCircle size={15} /> Falar com especialista
        </button>
        </div>
        <p className="text-xs" style={{ color: "#334155" }}>
        Sem compromisso de compra. Diagnóstico gratuito. Análise em até 24 horas.
        </p>
        </div>
        </section>

        {/* Footer */}
        <footer className="border-t" style={{ background: C.navy, borderColor: "rgba(255,255,255,0.04)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px]" style={{ color: "#334155" }}>SM Company · DJI Enterprise Partner · smcompany.com.br</span>
        <span className="text-[11px]" style={{ color: "#334155" }}>Simulação com dados de mercado. Resultados reais variam conforme operação.</span>
        </div>
        </footer>
        </div>
    );
}
