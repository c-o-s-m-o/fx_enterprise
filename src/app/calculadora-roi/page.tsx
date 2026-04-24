// app/calculadora-roi/page.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  TrendingDown,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Car,
  Shield,
  ChevronRight,
  X,
  Download,
  MessageCircle,
  Check,
  AlertCircle,
  BarChart3,
  Target,
  Zap,
  Award,
  Map,
  Eye,
  Thermometer,
  Navigation,
  Scan,
  Globe,
  Info,
  ChevronDown,
  Star,
  Activity,
  Wind,
  FileText,
  Database,
  Wheat,
  Factory,
  AlertTriangle,
  LineChart,
  PieChart,
  FileDown,
  Leaf,
  Truck,
  HardHat,
  Sun,
  TrendingUp as TrendingUpIcon,
  Calendar,
  BarChart,
  HelpCircle,
} from "lucide-react";

// PDF
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Svg,
  Rect,
  Path,
  Line as PdfLine,
} from "@react-pdf/renderer";

// Gráficos web
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Line,
} from "recharts";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  bg: "#f8fafc",
  bgAlt: "#f1f5f9",
  white: "#ffffff",
  navy: "#05091a",
  navyMid: "#0d1530",
  navyLight: "#1e293b",
  ink: "#0f172a",
  inkMid: "#1e293b",
  ink500: "#475569",
  ink400: "#64748b",
  ink300: "#94a3b8",
  orange: "#f97316",
  orangeD: "#c2410c",
  orangeL: "#ffedd5",
  orangeM: "#fed7aa",
  border: "#e2e8f0",
  borderL: "#f1f5f9",
  green: "#16a34a",
  greenL: "#dcfce7",
  blue: "#2563eb",
  blueL: "#dbeafe",
  purple: "#7c3aed",
  purpleL: "#ede9fe",
  red: "#dc2626",
  redL: "#fee2e2",
  cyan: "#0891b2",
  cyanL: "#cffafe",
};

type Setor =
  | "seguranca"
  | "agro"
  | "industria"
  | "energia"
  | "mineracao"
  | "portos"
  | "construcao";

// ─────────────────────────────────────────────────────────────────────────────
// LOGOS
// ─────────────────────────────────────────────────────────────────────────────
const AeroLogo = ({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      width="40"
      height="40"
      rx="8"
      fill="rgba(249,115,22,0.09)"
      stroke="#f97316"
      strokeWidth="1.2"
    />
    <path
      d="M9 30 L20 10"
      stroke="#f97316"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M20 10 L29 30"
      stroke="#f97316"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M13.5 24 L32 15"
      stroke="#f97316"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M30 20 L36 20"
      stroke="rgba(249,115,22,0.55)"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M31 24 L36 24"
      stroke="rgba(249,115,22,0.3)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const AeroLogoPDF = () => (
  <Svg viewBox="0 0 40 40" style={{ width: 32, height: 32 }}>
    <Rect
      x="0"
      y="0"
      width="40"
      height="40"
      rx="8"
      fill="rgba(249,115,22,0.09)"
      stroke="#f97316"
      strokeWidth="1.2"
    />
    <Path
      d="M9 30 L20 10"
      stroke="#f97316"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <Path
      d="M20 10 L29 30"
      stroke="#f97316"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <Path
      d="M13.5 24 L32 15"
      stroke="#f97316"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M30 20 L36 20"
      stroke="rgba(249,115,22,0.55)"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <Path
      d="M31 24 L36 24"
      stroke="rgba(249,115,22,0.3)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </Svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// DADOS ESTÁTICOS (SETORES, CASES, CONFIGS, CAPS, FAQS)
// ─────────────────────────────────────────────────────────────────────────────
const SETORES = [
  {
    id: "seguranca" as Setor,
    label: "Segurança Patrimonial",
    icon: Shield,
    desc: "Condomínios, fazendas, logística",
    cor: C.orange,
  },
  {
    id: "agro" as Setor,
    label: "Agronegócio",
    icon: Wheat,
    desc: "Lavouras, pecuária, aquicultura",
    cor: C.green,
  },
  {
    id: "industria" as Setor,
    label: "Indústria & Construção",
    icon: Factory,
    desc: "Plantas, canteiros, armazéns",
    cor: C.blue,
  },
  {
    id: "energia" as Setor,
    label: "Energia & Solar",
    icon: Zap,
    desc: "Painéis solares, transmissão",
    cor: "#fbbf24",
  },
  {
    id: "mineracao" as Setor,
    label: "Mineração",
    icon: Database,
    desc: "Minas, lavras, stockpiles",
    cor: C.purple,
  },
  {
    id: "portos" as Setor,
    label: "Portos & Logística",
    icon: Globe,
    desc: "Terminais, pátios",
    cor: C.cyan,
  },
  {
    id: "construcao" as Setor,
    label: "Construção Civil",
    icon: HardHat,
    desc: "Obras, infraestrutura",
    cor: C.red,
  },
];

const CASES_VERIFICADOS: Record<Setor, any> = {
  seguranca: {
    titulo: "Titan Protection: 60% redução de custos com segurança autônoma",
    historia:
      "Empresa de segurança com 600+ funcionários substituiu cobertura presencial 24/7 (US$ 13.000/mês) por drones autônomos (US$ 6.100/mês). Resultado: 60% redução de custo e 40% menos incidentes.",
    metricas: [
      { valor: "60%", label: "Redução de custo" },
      { valor: "40%", label: "Menos incidentes" },
      { valor: "12-18 meses", label: "Payback médio" },
    ],
    empresa: "Titan Protection",
    local: "Estados Unidos",
    fonte: "FlytBase Case Study, 2025",
    url: "https://www.flytbase.com/case-studies/titan-protection",
    icon: Shield,
    cor: C.orange,
  },
  agro: {
    titulo: "Dole Asia: Monitoramento 24/7 de plantações nas Filipinas",
    historia:
      "Dole implementou drones autônomos para vigilância perimetral e monitoramento de pragas em plantações de banana. Cobertura contínua reduziu furtos e permitiu detecção precoce de doenças.",
    metricas: [
      { valor: "24/7", label: "Cobertura contínua" },
      { valor: "75%", label: "Redução no tempo" },
      { valor: "< 14 meses", label: "Payback" },
    ],
    empresa: "Dole Asia Company",
    local: "Filipinas",
    fonte: "FlytBase Case Study, 2024",
    url: "https://www.flytbase.com/case-studies/dole-asia",
    icon: Leaf,
    cor: C.green,
  },
  industria: {
    titulo: "Shell: Inspeção de infraestrutura com drones autônomos",
    historia:
      "Shell Petroleum em Rotterdam utiliza drones docked para inspeção de infraestrutura crítica de óleo e gás. Mais de 30.000 voos registrados com redução significativa em paradas não planejadas.",
    metricas: [
      { valor: "30.000+", label: "Voos registrados" },
      { valor: "60%", label: "Redução em custos" },
      { valor: "90%", label: "Menos riscos humanos" },
    ],
    empresa: "Shell Petroleum",
    local: "Rotterdam, Holanda",
    fonte: "FlytBase / Innovate Energy Now, 2025",
    url: "https://innovateenergynow.com/resources/drone-case-study-roundup-the-best-of-2025-so-far",
    icon: Factory,
    cor: C.blue,
  },
  energia: {
    titulo: "EnBW: Escalonamento de inspeções solares de 150MW para 1GW",
    historia:
      "EnBW (Alemanha) utilizou docks autônomos para inspeção térmica de usinas solares. Aumento de 6x na capacidade de inspeção mantendo o mesmo orçamento anual.",
    metricas: [
      { valor: "6x", label: "Mais inspeções" },
      { valor: "98.7%", label: "Precisão falhas" },
      { valor: "US$ 2.1K/MW", label: "Economia" },
    ],
    empresa: "EnBW Energie",
    local: "Alemanha",
    fonte: "FlytBase Case Study, 2025",
    url: "https://www.flytbase.com/case-studies/enbw-solar",
    icon: Sun,
    cor: "#fbbf24",
  },
  mineracao: {
    titulo: "Anglo American: Segurança e eficiência em mineração no Peru",
    historia:
      "Anglo American implementou drones autônomos para mapeamento de taludes, medição de stockpiles e monitoramento de barragens. Redução de 90% no tempo de deslocamento para áreas de risco.",
    metricas: [
      { valor: "90%", label: "Menos deslocamento" },
      { valor: "2x", label: "Frequência inspeção" },
      { valor: "±2 cm", label: "Precisão" },
    ],
    empresa: "Anglo American",
    local: "Peru",
    fonte: "FlytBase / PACSys ROI Study, 2025",
    url: "https://pacsys.co.za/return-on-investment-drone-case-studies/",
    icon: Database,
    cor: C.purple,
  },
  portos: {
    titulo: "MSS Security: Primeira operação BVLOS aprovada em aeroporto",
    historia:
      "MSS Security obteve aprovação CASA para operações BVLOS no Aeroporto de Port Lincoln, Austrália. Drones autônomos para segurança perimetral e monitoramento de pátio.",
    metricas: [
      { valor: "1ª", label: "Aprovação BVLOS (CASA)" },
      { valor: "10x", label: "Mais área coberta" },
      { valor: "99%", label: "Disponibilidade" },
    ],
    empresa: "MSS Security",
    local: "Port Lincoln, Austrália",
    fonte: "FlytBase Case Study, 2025",
    url: "https://www.flytbase.com/case-studies/mss-security",
    icon: Truck,
    cor: C.cyan,
  },
  construcao: {
    titulo: "Turner Industries: Inspeção de piperacks 60% mais econômica",
    historia:
      "Turner Industries utilizou drone Elios 3 para inspeção de piperacks industriais, eliminando necessidade de andaimes e reduzindo tempo de 2 semanas para 2 dias.",
    metricas: [
      { valor: "60%", label: "Redução custos" },
      { valor: "2 dias", label: "Tempo execução" },
      { valor: "0", label: "Acidentes altura" },
    ],
    empresa: "Turner Industries",
    local: "Estados Unidos",
    fonte: "Drones for Good / Innovate Energy Now, 2025",
    url: "https://innovateenergynow.com/resources/drone-case-study-roundup-the-best-of-2025-so-far",
    icon: HardHat,
    cor: C.red,
  },
};

type SetorConfig = {
  pessoalLabel: string;
  pessoalDefault: number;
  pessoalMax: number;
  pessoalStep: number;
  pessoalUnidade: string;
  numDefault: number;
  numMax: number;
  veiculoDefault: number;
  perdasLabel: string;
  perdasDefault: number;
  perdasMax: number;
  perdasStep: number;
  contratoLabel: string;
  contratoDefault: number;
  contratoMax: number;
  inspecaoLabel: string;
  inspecaoDefault: number;
  inspecaoMax: number;
  eficienciaDefault: number;
  reducaoDefault: number;
  areaLabel: string;
  areaDefault: number;
};

const SETOR_CONFIG: Record<Setor, SetorConfig> = {
  seguranca: {
    pessoalLabel: "Custo mensal total por profissional de segurança",
    pessoalDefault: 3800,
    pessoalMax: 18000,
    pessoalStep: 100,
    pessoalUnidade: "profissionais",
    numDefault: 8,
    numMax: 300,
    veiculoDefault: 2500,
    perdasLabel: "Perdas anuais estimadas por incidentes",
    perdasDefault: 80000,
    perdasMax: 20000000,
    perdasStep: 5000,
    contratoLabel: "Contratos de monitoramento / mês",
    contratoDefault: 4500,
    contratoMax: 100000,
    inspecaoLabel: "Auditorias e vistorias / ano",
    inspecaoDefault: 15000,
    inspecaoMax: 500000,
    eficienciaDefault: 80,
    reducaoDefault: 4,
    areaLabel: "Área a monitorar (hectares)",
    areaDefault: 350,
  },
  agro: {
    pessoalLabel: "Custo mensal total por colaborador de campo",
    pessoalDefault: 3200,
    pessoalMax: 12000,
    pessoalStep: 100,
    pessoalUnidade: "colaboradores",
    numDefault: 12,
    numMax: 500,
    veiculoDefault: 3500,
    perdasLabel: "Perdas anuais (pragas, seca, furtos)",
    perdasDefault: 250000,
    perdasMax: 50000000,
    perdasStep: 10000,
    contratoLabel: "Mapeamento aéreo e laudos / ano",
    contratoDefault: 32000,
    contratoMax: 500000,
    inspecaoLabel: "Inspeções técnicas / ano",
    inspecaoDefault: 22000,
    inspecaoMax: 300000,
    eficienciaDefault: 78,
    reducaoDefault: 4,
    areaLabel: "Área da propriedade (hectares)",
    areaDefault: 1200,
  },
  industria: {
    pessoalLabel: "Custo mensal por profissional de segurança/ronda",
    pessoalDefault: 4500,
    pessoalMax: 20000,
    pessoalStep: 100,
    pessoalUnidade: "profissionais",
    numDefault: 15,
    numMax: 500,
    veiculoDefault: 4000,
    perdasLabel: "Impacto de paradas não planejadas / ano",
    perdasDefault: 500000,
    perdasMax: 50000000,
    perdasStep: 20000,
    contratoLabel: "Inspeções externas / ano",
    contratoDefault: 65000,
    contratoMax: 2000000,
    inspecaoLabel: "Laudos e auditorias / ano",
    inspecaoDefault: 30000,
    inspecaoMax: 1000000,
    eficienciaDefault: 72,
    reducaoDefault: 5,
    areaLabel: "Área da planta (hectares)",
    areaDefault: 80,
  },
  energia: {
    pessoalLabel: "Custo mensal por técnico de inspeção",
    pessoalDefault: 7000,
    pessoalMax: 30000,
    pessoalStep: 200,
    pessoalUnidade: "técnicos",
    numDefault: 10,
    numMax: 300,
    veiculoDefault: 8000,
    perdasLabel: "Perdas por falhas não detectadas / ano",
    perdasDefault: 800000,
    perdasMax: 100000000,
    perdasStep: 50000,
    contratoLabel: "Inspeção aérea / ano",
    contratoDefault: 110000,
    contratoMax: 5000000,
    inspecaoLabel: "Laudos técnicos / ano",
    inspecaoDefault: 45000,
    inspecaoMax: 1000000,
    eficienciaDefault: 86,
    reducaoDefault: 4,
    areaLabel: "Capacidade (MW) ou km",
    areaDefault: 50,
  },
  mineracao: {
    pessoalLabel: "Custo mensal por técnico de topografia",
    pessoalDefault: 8000,
    pessoalMax: 40000,
    pessoalStep: 200,
    pessoalUnidade: "técnicos",
    numDefault: 20,
    numMax: 500,
    veiculoDefault: 12000,
    perdasLabel: "Impacto de acidentes / paradas / ano",
    perdasDefault: 2000000,
    perdasMax: 200000000,
    perdasStep: 100000,
    contratoLabel: "Levantamentos externos / ano",
    contratoDefault: 180000,
    contratoMax: 5000000,
    inspecaoLabel: "Inspeções de barragem / ano",
    inspecaoDefault: 90000,
    inspecaoMax: 3000000,
    eficienciaDefault: 75,
    reducaoDefault: 6,
    areaLabel: "Área da lavra (hectares)",
    areaDefault: 2000,
  },
  portos: {
    pessoalLabel: "Custo mensal por vigilante/operador",
    pessoalDefault: 5000,
    pessoalMax: 25000,
    pessoalStep: 200,
    pessoalUnidade: "profissionais",
    numDefault: 25,
    numMax: 500,
    veiculoDefault: 6000,
    perdasLabel: "Perdas anuais por incidentes",
    perdasDefault: 400000,
    perdasMax: 50000000,
    perdasStep: 20000,
    contratoLabel: "Vigilância terceirizada / mês",
    contratoDefault: 15000,
    contratoMax: 500000,
    inspecaoLabel: "Inspeções estruturais / ano",
    inspecaoDefault: 55000,
    inspecaoMax: 2000000,
    eficienciaDefault: 80,
    reducaoDefault: 8,
    areaLabel: "Área do terminal (hectares)",
    areaDefault: 500,
  },
  construcao: {
    pessoalLabel: "Custo mensal por profissional de obra",
    pessoalDefault: 4200,
    pessoalMax: 18000,
    pessoalStep: 100,
    pessoalUnidade: "profissionais",
    numDefault: 18,
    numMax: 400,
    veiculoDefault: 3800,
    perdasLabel: "Impacto de atrasos / retrabalho / ano",
    perdasDefault: 350000,
    perdasMax: 30000000,
    perdasStep: 15000,
    contratoLabel: "Topografia externa / ano",
    contratoDefault: 48000,
    contratoMax: 1500000,
    inspecaoLabel: "Laudos de progresso / ano",
    inspecaoDefault: 28000,
    inspecaoMax: 800000,
    eficienciaDefault: 75,
    reducaoDefault: 5,
    areaLabel: "Área do canteiro (hectares)",
    areaDefault: 45,
  },
};

const CAPS = [
  {
    icon: Eye,
    cor: C.orange,
    titulo: "Monitoramento 24/7",
    subtitulo: "Câmera 48MP + zoom 7× óptico",
    narrativa:
      "Às 2h17 da manhã, a missão de ronda #14 foi concluída. Relatório automático: 0 anomalias. Próximo voo em 43 minutos. Sem intervenção humana.",
    tag: "Vigilância",
  },
  {
    icon: Thermometer,
    cor: C.red,
    titulo: "Diagnóstico Térmico FLIR",
    subtitulo: "Sensor 640×512 px, f/1.0",
    narrativa:
      "Célula fotovoltaica com ponto quente de 87°C identificada entre 4.800 painéis. Custo da detecção: 47 min de voo. Custo de não detectar: parada de R$ 380 mil.",
    tag: "Inspeção",
  },
  {
    icon: Map,
    cor: C.blue,
    titulo: "Mapeamento RTK Centimétrico",
    subtitulo: "Precisão 1 cm horizontal",
    narrativa:
      "Propriedade de 1.800 ha que pagava R$ 42.000/ano em levantamentos passou a executar em 9 voos autônomos semanais — sem custo adicional.",
    tag: "Mapeamento",
  },
  {
    icon: Scan,
    cor: C.purple,
    titulo: "Inspeção de Ativos",
    subtitulo: "Tele 168mm — leitura a 250m",
    narrativa:
      "Subestação inspecionada sem acesso humano à área restrita. Leitura de medidores, ferrugem e aquecimento anômalo — tudo em 1 voo de 40 min.",
    tag: "Ativo",
  },
  {
    icon: Navigation,
    cor: C.cyan,
    titulo: "Dock 3 — Operação Autônoma",
    subtitulo: "Decola, executa, recarrega em 27 min",
    narrativa:
      "366 dias/ano. 8.760 horas disponíveis. O sistema opera enquanto a equipe está em outras atividades. Sem licença sick, turnover ou 13º.",
    tag: "Autonomia",
  },
  {
    icon: Wind,
    cor: "#ea580c",
    titulo: "Resistência Operacional",
    subtitulo: "IP55 · -30°C a +50°C · vento 12 m/s",
    narrativa:
      "Chuva moderada, 8°C, rajadas de 10 m/s. Missão executada normalmente. Relatório às 6h04. Nenhum funcionário precisou sair do abrigo.",
    tag: "Resiliência",
  },
  {
    icon: FileText,
    cor: C.green,
    titulo: "Relatórios Georreferenciados",
    subtitulo: "Cada voo = documentação jurídica",
    narrativa:
      "Advogado pediu prova da condição do imóvel na data X. Sistema entregou 312 imagens com GPS, timestamp e temperatura. Processo encerrado em 2 semanas.",
    tag: "Docs",
  },
  {
    icon: Database,
    cor: "#7c3aed",
    titulo: "Inteligência de Dados & IA",
    subtitulo: "FlightHub 2 — histórico + alertas",
    narrativa:
      "Após 60 dias, o sistema aprendeu o padrão normal de temperatura. Desvio de 4°C gerou alerta preventivo. Falha corrigida antes de virar parada.",
    tag: "IA",
  },
];

const SPECS_TECH = [
  {
    cat: "Câmeras",
    cor: C.orange,
    items: [
      { k: "Wide-angle", v: "48 MP · f/1.7 · 24 mm" },
      { k: "Mid-tele", v: "48 MP · f/2.8 · 70 mm" },
      { k: "Tele", v: "48 MP · f/2.8 · 168 mm" },
      { k: "Térmica (FLIR)", v: "640×512 · f/1.0 · UHR 1280×1024" },
    ],
  },
  {
    cat: "Voo & Performance",
    cor: C.blue,
    items: [
      { k: "Autonomia", v: "54 min fwd · 47 min hover" },
      { k: "Velocidade", v: "21 m/s (Sport) · 15 m/s (Normal)" },
      { k: "Altitude máx.", v: "4.500 m AMSL" },
      { k: "Vento máx.", v: "Voo: 15 m/s · Pouso: 12 m/s" },
    ],
  },
  {
    cat: "Dock 3 — Estação",
    cor: C.cyan,
    items: [
      { k: "Recarga completa", v: "27 min (15% → 95%)" },
      { k: "Decolagem", v: "10 s após comando remoto" },
      { k: "Proteção", v: "IP56 (poeira + água)" },
      { k: "Temperatura", v: "-30°C a +50°C" },
    ],
  },
  {
    cat: "Transmissão & Posição",
    cor: C.purple,
    items: [
      { k: "Sistema O4+", v: "25 km FCC · 12 km CE" },
      { k: "RTK horizontal", v: "1 cm + 1 ppm (RMS)" },
      { k: "RTK vertical", v: "2 cm + 1 ppm (RMS)" },
      { k: "Laser rangefinder", v: "1.800 m · ±0,2 m" },
    ],
  },
];

const FAQS = [
  {
    q: "R$ 205 mil é um valor expressivo. Como justificar internamente?",
    a: "A lógica é simples: com base nos dados inseridos, o custo operacional atual é de X/ano. A solução autônoma custa Y/ano (com depreciação de 5 anos). A diferença é seu resultado. Oferecemos análise de viabilidade com TIR e VPL para apresentação ao conselho, sem custo. Também trabalhamos com DaaS (Drone-as-a-Service) para eliminar CAPEX inicial.",
  },
  {
    q: "Precisa de piloto certificado na equipe?",
    a: "Não. O sistema Dock 3 + M4TD é projetado para operação 100% autônoma. Missões são programadas via FlightHub 2 na nuvem. O drone decola, executa, retorna e recarrega sem intervenção. Um gestor monitora múltiplas missões no celular. Treinamento operacional incluso: 8 horas.",
  },
  {
    q: "Como fica a operação com chuva, vento ou temperatura extrema?",
    a: "O Matrice 4TD tem IP55 e opera entre -30°C e +50°C. O Dock 3 tem IP56 e monitoramento climático integrado: adia missões em condições inseguras automaticamente e retoma quando o tempo melhora. Voo em ventos de até 12 m/s para pouso e 15 m/s em cruzeiro.",
  },
  {
    q: "O sistema se integra com nosso centro de controle / SCADA / ERP?",
    a: "Sim. O FlightHub 2 possui API aberta para integração com SCADA, BMS, ERP e plataformas terceiras. Há opção de deploy em servidor privado ou nuvem interna, mantendo todos os dados de voo sob controle total da sua operação.",
  },
  {
    q: "E a questão regulatória de voos autônomos no Brasil?",
    a: "Voos até 120m AGL em áreas privadas seguem o RBAC-E 94 da ANAC/DECEA. Nossa equipe cuida de todo o processo: registro ANATEL, cadastro SISANT, plano de voo e documentação. Para operações BVLOS, assessoramos o processo de autorização específica.",
  },
  {
    q: "Quais são todos os custos após o investimento inicial?",
    a: "Custo fixo: R$ 1.500/mês (energia, manutenção preventiva e FlightHub 2). Manutenção anual: R$ 8.000-12.000 conforme uso — já incluído na estimativa. Peças de reposição: variável por uso. Sem taxa por missão, sem licença por usuário, sem custo oculto.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// UI COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const Tag = ({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) => (
  <div
    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 ${
      dark
        ? `bg-orange-500/15 border border-orange-500/25`
        : `bg-orange-50 border border-orange-100`
    }`}
  >
    <span
      className={`text-[10px] font-extrabold uppercase tracking-[0.38em] ${
        dark ? `text-orange-400` : `text-orange-600`
      }`}
    >
      {label}
    </span>
  </div>
);

const KPI = ({
  icon: Icon,
  label,
  value,
  sub,
  variant = "default",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  variant?: "default" | "positive" | "highlight" | "dark";
}) => {
  const V = {
    default: {
      bg: C.white,
      bd: C.border,
      val: C.ink,
      lbl: C.ink400,
    },
    positive: {
      bg: "#f0fdf4",
      bd: "#86efac",
      val: "#15803d",
      lbl: C.green,
    },
    highlight: {
      bg: C.orangeL,
      bd: C.orangeM,
      val: C.orangeD,
      lbl: C.orange,
    },
    dark: {
      bg: C.navy,
      bd: C.navyLight,
      val: "#fff",
      lbl: C.ink300,
    },
  }[variant];
  return (
    <div
      className="rounded-xl p-4 border"
      style={{ background: V.bg, borderColor: V.bd }}
    >
      <Icon
        size={14}
        className="mb-1.5"
        style={{ color: variant === "dark" ? C.orange : V.lbl }}
      />
      <div
        className="text-[10px] font-bold uppercase tracking-widest mb-1"
        style={{ color: V.lbl }}
      >
        {label}
      </div>
      <div
        className="text-xl font-black leading-tight"
        style={{ color: V.val }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="text-[11px] mt-0.5"
          style={{ color: variant === "dark" ? C.ink300 : C.ink400 }}
        >
          {sub}
        </div>
      )}
    </div>
  );
};

const SliderRow = ({
  label,
  icon: Icon,
  hint,
  value,
  min,
  max,
  step,
  onChange,
  fmt,
}: {
  label: string;
  icon: React.ElementType;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  fmt: (v: number) => string;
}) => (
  <div className="mb-4">
    <div className="flex items-center gap-1.5 mb-1">
      <Icon size={13} style={{ color: C.orange }} />
      <label className="text-xs font-semibold" style={{ color: C.inkMid }}>
        {label}
      </label>
    </div>
    {hint && (
      <p className="text-[11px] mb-1.5 ml-4" style={{ color: C.ink400 }}>
        {hint}
      </p>
    )}
    <div className="flex items-center gap-3 ml-4">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-orange-500 h-1.5 cursor-pointer"
      />
      <span
        className="text-sm font-black text-right whitespace-nowrap min-w-[110px]"
        style={{ color: C.ink }}
      >
        {fmt(value)}
      </span>
    </div>
  </div>
);

const MetricTooltip = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="ml-1 text-gray-400 hover:text-orange-500 focus:outline-none"
      >
        <HelpCircle size={12} />
      </button>
      {open && (
        <div className="absolute z-50 w-64 p-3 mt-2 -left-20 bg-white rounded-xl shadow-xl border border-gray-200 text-left">
          <p className="text-xs font-bold mb-1" style={{ color: C.ink }}>
            {title}
          </p>
          <p className="text-[11px] leading-relaxed" style={{ color: C.ink500 }}>
            {children}
          </p>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// GRÁFICO WEB
// ─────────────────────────────────────────────────────────────────────────────
const ProjecaoChart = ({
  beneficio,
  investimento,
  opAnual,
}: {
  beneficio: number;
  investimento: number;
  opAnual: number;
}) => {
  const data = useMemo(() => {
    const anos = [0, 1, 2, 3, 4, 5];
    return anos.map((ano) => ({
      ano: `Ano ${ano}`,
      saldo:
        ano === 0
          ? -investimento
          : beneficio * ano - investimento - opAnual * ano,
    }));
  }, [beneficio, investimento, opAnual]);

  const paybackYear =
    beneficio > opAnual ? investimento / (beneficio - opAnual) : null;

  return (
    <div className="w-full h-56 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.orange} stopOpacity={0.3} />
              <stop offset="95%" stopColor={C.orange} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            vertical={false}
          />
          <XAxis
            dataKey="ano"
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) =>
              v >= 1e6
                ? `R$ ${(v / 1e6).toFixed(1)}M`
                : v >= 1000
                ? `R$ ${(v / 1000).toFixed(0)}K`
                : `R$ ${v}`
            }
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number) =>
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            }
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "12px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" />
          {paybackYear && paybackYear <= 5 && paybackYear >= 0 && (
            <ReferenceLine
              x={`Ano ${paybackYear.toFixed(1)}`}
              stroke="#16a34a"
              strokeWidth={2}
              strokeDasharray="4 4"
              label={{
                value: "Payback",
                position: "top",
                fill: "#16a34a",
                fontSize: 11,
                fontWeight: 700,
              }}
            />
          )}
          <Area
            type="monotone"
            dataKey="saldo"
            stroke={C.orange}
            strokeWidth={3}
            fill="url(#colorSaldo)"
          />
          <Line
            type="monotone"
            dataKey="saldo"
            stroke={C.orange}
            strokeWidth={3}
            dot={{ r: 4, fill: C.orange, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: C.orangeD }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FUNÇÕES FINANCEIRAS
// ─────────────────────────────────────────────────────────────────────────────
const calcularVPL = (fluxos: number[], taxa: number) =>
  fluxos.reduce((acc, val, i) => acc + val / Math.pow(1 + taxa, i), 0);

const calcularTIR = (
  fluxos: number[],
  guess = 0.1,
  maxIter = 1000,
  tol = 1e-6
) => {
  let rate = guess;
  for (let i = 0; i < maxIter; i++) {
    const npv = fluxos.reduce(
      (acc, val, t) => acc + val / Math.pow(1 + rate, t),
      0
    );
    if (Math.abs(npv) < tol) return rate;
    const derivative = fluxos.reduce(
      (acc, val, t) => acc - (t * val) / Math.pow(1 + rate, t + 1),
      0
    );
    const newRate = rate - npv / derivative;
    if (Math.abs(newRate - rate) < tol) return newRate;
    rate = newRate;
  }
  return NaN;
};

// ─────────────────────────────────────────────────────────────────────────────
// PDF STYLES E DOCUMENTO
// ─────────────────────────────────────────────────────────────────────────────
const pdfStyles = StyleSheet.create({
  coverPage: {
    backgroundColor: "#0f172a",
    padding: 40,
    fontFamily: "Helvetica",
    color: "#ffffff",
  },
  coverLogo: {
    marginBottom: 60,
  },
  coverTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#f97316",
    marginBottom: 16,
    textTransform: "uppercase",
  },
  coverSubtitle: {
    fontSize: 20,
    color: "#cbd5e1",
    marginBottom: 40,
  },
  coverInfo: {
    fontSize: 12,
    color: "#94a3b8",
    marginBottom: 8,
  },
  coverFooter: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    fontSize: 10,
    color: "#475569",
    borderTop: "1 solid #334155",
    paddingTop: 16,
  },
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 35,
    backgroundColor: "#ffffff",
    color: "#0f172a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 12,
    borderBottom: "2 solid #f97316",
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
  },
  section: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
    border: "0.5 solid #e2e8f0",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 14,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    borderLeft: "4 solid #f97316",
    paddingLeft: 8,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5 solid #e2e8f0",
    paddingVertical: 6,
  },
  tableLabel: {
    width: "45%",
    fontSize: 10,
    color: "#475569",
    fontWeight: "bold",
  },
  tableValue: {
    width: "55%",
    fontSize: 11,
    color: "#0f172a",
    fontWeight: "bold",
    textAlign: "right",
  },
  chartContainer: {
    marginTop: 10,
    height: 140,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    border: "0.5 solid #e2e8f0",
    padding: 10,
  },
  barChart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 100,
    gap: 12,
    justifyContent: "space-around",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 35,
    right: 35,
    fontSize: 9,
    color: "#64748b",
    borderTop: "0.5 solid #e2e8f0",
    paddingTop: 12,
    textAlign: "center",
  },
  disclaimer: {
    fontSize: 8,
    color: "#94a3b8",
    fontStyle: "italic",
    marginTop: 6,
    lineHeight: 1.4,
  },
  explanationText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#475569",
    marginBottom: 8,
  },
});

const fmtPdf = (v: number) =>
  v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });
const fmtMPdf = (v: number) => {
  const a = Math.abs(v);
  if (a >= 1e9) return (v < 0 ? "−" : "") + "R$ " + (a / 1e9).toFixed(2) + "B";
  if (a >= 1e6) return (v < 0 ? "−" : "") + "R$ " + (a / 1e6).toFixed(2) + "M";
  if (a >= 1000) return (v < 0 ? "−" : "") + "R$ " + (a / 1000).toFixed(0) + "K";
  return fmtPdf(v);
};

interface PdfData {
  setor: string;
  setorLabel: string;
  custoMensalAtual: number;
  custoAnualAtual: number;
  beneficio: number;
  paybackMeses: number;
  r3: number;
  r5: number;
  roi5: number;
  ecoPessoas: number;
  ecoContratos: number;
  ecoPerdas: number;
  caseData: typeof CASES_VERIFICADOS[Setor];
  numPessoas: number;
  reducao: number;
  eficiencia: number;
  area: number;
  dataGeracao: string;
  vpl: number;
  tir: number;
  investimento: number;
  opAnual: number;
  leadEmpresa?: string;
  leadNome?: string;
  custoPessoa?: number;
  perdasAnuais?: number;
}

const ROIPdfDocument = ({ data }: { data: PdfData }) => {
  const anos = [0, 1, 2, 3, 4, 5];
  const saldos = anos.map((a) =>
    a === 0
      ? -data.investimento
      : data.beneficio * a - data.investimento - data.opAnual * a
  );
  const paybackYear =
    data.beneficio > data.opAnual
      ? data.investimento / (data.beneficio - data.opAnual)
      : null;
  const maxAbsSaldo = Math.max(...saldos.map(Math.abs), 1);
  const barHeight = (saldo: number) =>
    Math.max(15, Math.min(80, (Math.abs(saldo) / maxAbsSaldo) * 60));

  const fluxos = [-data.investimento, ...Array(5).fill(data.beneficio - data.opAnual)];
  const vpl = calcularVPL(fluxos, 0.12);
  const tir = calcularTIR(fluxos);
  const paybackDescontado = (() => {
    let acumulado = 0;
    for (let i = 0; i < fluxos.length; i++) {
      acumulado += fluxos[i] / Math.pow(1.12, i);
      if (acumulado >= 0)
        return i + (acumulado - fluxos[i]) / (fluxos[i] / Math.pow(1.12, i));
    }
    return null;
  })();

  return (
    <Document title={`Analise ROI - Aero Drone - ${data.setorLabel}`}>
      {/* CAPA */}
      <Page size="A4" style={pdfStyles.coverPage}>
        <View style={pdfStyles.coverLogo}>
          <AeroLogoPDF />
        </View>
        <Text style={pdfStyles.coverTitle}>Análise de Viabilidade</Text>
        <Text style={pdfStyles.coverSubtitle}>DJI Matrice 4TD + Dock 3</Text>
        <Text style={pdfStyles.coverInfo}>Setor: {data.setorLabel}</Text>
        <Text style={pdfStyles.coverInfo}>Data: {data.dataGeracao}</Text>
        <Text style={pdfStyles.coverInfo}>
          Preparado para: {data.leadEmpresa || data.leadNome || "Cliente"}
        </Text>
        <View style={pdfStyles.coverFooter}>
          <Text>Aero Drone Solutions · DJI Enterprise Partner</Text>
          <Text>comercial@aerodronesolutions.com.br · (61) 9 8237-3501</Text>
        </View>
      </Page>

      {/* ÍNDICE */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.headerTitle}>Índice</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 12, marginBottom: 8 }}>
            1. Resumo Executivo .................... 3
          </Text>
          <Text style={{ fontSize: 12, marginBottom: 8 }}>
            2. Premissas e Metodologia ............. 4
          </Text>
          <Text style={{ fontSize: 12, marginBottom: 8 }}>
            3. Análise de Fluxo de Caixa .......... 5
          </Text>
          <Text style={{ fontSize: 12, marginBottom: 8 }}>
            4. Indicadores Financeiros (VPL, TIR, Payback) ... 6
          </Text>
          <Text style={{ fontSize: 12, marginBottom: 8 }}>
            5. Análise de Sensibilidade ........... 7
          </Text>
          <Text style={{ fontSize: 12, marginBottom: 8 }}>
            6. Benefícios Estratégicos e Intangíveis ... 8
          </Text>
          <Text style={{ fontSize: 12, marginBottom: 8 }}>
            7. Case de Referência ................. 9
          </Text>
          <Text style={{ fontSize: 12, marginBottom: 8 }}>
            8. Próximos Passos ................... 10
          </Text>
        </View>
        <View style={pdfStyles.footer}>
          <Text>Aero Drone Solutions · Confidencial</Text>
        </View>
      </Page>

      {/* PÁGINA: RESUMO EXECUTIVO */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <AeroLogoPDF />
            <Text style={pdfStyles.headerTitle}>1. Resumo Executivo</Text>
          </View>
          <Text style={{ fontSize: 10, color: "#64748b" }}>
            {data.dataGeracao}
          </Text>
        </View>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Principais Números</Text>
          <View style={pdfStyles.table}>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableLabel}>Investimento Inicial</Text>
              <Text style={pdfStyles.tableValue}>
                {fmtMPdf(data.investimento)}
              </Text>
            </View>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableLabel}>Custo Operacional Anual</Text>
              <Text style={pdfStyles.tableValue}>{fmtMPdf(data.opAnual)}</Text>
            </View>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableLabel}>
                Benefício Anual Estimado
              </Text>
              <Text style={[pdfStyles.tableValue, { color: "#c2410c" }]}>
                {fmtMPdf(data.beneficio)}
              </Text>
            </View>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableLabel}>Payback Simples</Text>
              <Text style={pdfStyles.tableValue}>
                {data.paybackMeses < Infinity
                  ? `${data.paybackMeses.toFixed(1)} meses`
                  : "> 5 anos"}
              </Text>
            </View>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableLabel}>VPL (12% a.a.)</Text>
              <Text
                style={[
                  pdfStyles.tableValue,
                  vpl > 0 ? { color: "#16a34a" } : {},
                ]}
              >
                {fmtMPdf(vpl)}
              </Text>
            </View>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableLabel}>TIR</Text>
              <Text
                style={[
                  pdfStyles.tableValue,
                  !isNaN(tir) && tir > 0.12 ? { color: "#16a34a" } : {},
                ]}
              >
                {!isNaN(tir) ? `${(tir * 100).toFixed(1)}%` : "—"}
              </Text>
            </View>
          </View>
        </View>
        <View style={pdfStyles.footer}>
          <Text>Página 3</Text>
        </View>
      </Page>

      {/* PÁGINA: PREMISSAS E METODOLOGIA */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.headerTitle}>2. Premissas e Metodologia</Text>
        </View>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Premissas Adotadas</Text>
          <Text style={pdfStyles.explanationText}>
            • Investimento inicial (CAPEX): R$ 205.000 (DJI Matrice 4TD + Dock
            3 + implantação).{"\n"}
            • Depreciação linear em 5 anos.{"\n"}
            • Custo operacional fixo: R$ 1.500/mês (energia, manutenção
            preventiva, software FlightHub 2).{"\n"}
            • Número de profissionais com potencial de realocação:{" "}
            {data.reducao} de {data.numPessoas}.{"\n"}
            • Eficiência na redução de perdas: {data.eficiencia}%.{"\n"}
            • Taxa de desconto para VPL e payback descontado: 12% a.a. (custo de
            oportunidade).{"\n"}
            • Horizonte de análise: 5 anos.
          </Text>
        </View>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Cálculo do Benefício Anual</Text>
          <Text style={pdfStyles.explanationText}>
            Benefício = (Realocação de profissionais) + (Eliminação de
            contratos/inspeções) + (Recuperação de perdas){"\n\n"}• Realocação:{" "}
            {data.reducao} profissionais × R${" "}
            {fmtPdf(data.custoPessoa || 0).replace("R$", "")}/mês × 12 ={" "}
            {fmtMPdf(data.ecoPessoas)}
            {"\n"}• Contratos/Inspeções: R${" "}
            {fmtPdf(data.ecoContratos).replace("R$", "")}
            {"\n"}• Recuperação de perdas: R${" "}
            {fmtMPdf(data.perdasAnuais || 0)} × {data.eficiencia}% ={" "}
            {fmtMPdf(data.ecoPerdas)}
            {"\n\n"}Total = {fmtMPdf(data.beneficio)}/ano
          </Text>
        </View>
        <View style={pdfStyles.footer}>
          <Text>Página 4</Text>
        </View>
      </Page>

      {/* PÁGINA: FLUXO DE CAIXA E GRÁFICO */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.headerTitle}>
            3. Análise de Fluxo de Caixa
          </Text>
        </View>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>
            Fluxo de Caixa Acumulado (R$)
          </Text>
          <View style={pdfStyles.chartContainer}>
            <View style={pdfStyles.barChart}>
              {anos.map((ano, idx) => (
                <View key={ano} style={{ alignItems: "center", width: 45 }}>
                  <View
                    style={{
                      height: 80,
                      justifyContent: "flex-end",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        height: barHeight(saldos[idx]),
                        width: 24,
                        backgroundColor:
                          saldos[idx] >= 0 ? "#f97316" : "#ef4444",
                        borderRadius: 4,
                      }}
                    />
                  </View>
                  <Text style={{ fontSize: 8, marginTop: 4, color: "#64748b" }}>
                    Ano {ano}
                  </Text>
                  <Text
                    style={{
                      fontSize: 7,
                      color: saldos[idx] >= 0 ? "#16a34a" : "#dc2626",
                    }}
                  >
                    {fmtMPdf(saldos[idx])}
                  </Text>
                </View>
              ))}
            </View>
            {paybackYear && paybackYear <= 5 && (
              <View style={{ marginTop: 10, alignItems: "center" }}>
                <Text
                  style={{ fontSize: 9, color: "#16a34a", fontWeight: "bold" }}
                >
                  Payback Simples: {paybackYear.toFixed(1)} anos
                </Text>
                <View
                  style={{
                    height: 2,
                    width: "100%",
                    backgroundColor: "#e2e8f0",
                    marginTop: 4,
                  }}
                >
                  <View
                    style={{
                      height: 2,
                      width: `${(paybackYear / 5) * 100}%`,
                      backgroundColor: "#16a34a",
                    }}
                  />
                </View>
              </View>
            )}
          </View>
          <Text style={pdfStyles.explanationText}>
            O gráfico acima mostra a evolução do saldo acumulado do projeto.
            Valores negativos representam o período de recuperação do
            investimento. O ponto onde a linha cruza o zero é o payback.
          </Text>
        </View>
        <View style={pdfStyles.footer}>
          <Text>Página 5</Text>
        </View>
      </Page>

      {/* PÁGINA: INDICADORES FINANCEIROS COM EXPLICAÇÕES */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.headerTitle}>
            4. Indicadores Financeiros
          </Text>
        </View>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Resumo dos Indicadores</Text>
          <View style={pdfStyles.table}>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableLabel}>VPL (12% a.a.)</Text>
              <Text
                style={[
                  pdfStyles.tableValue,
                  vpl > 0 ? { color: "#16a34a" } : {},
                ]}
              >
                {fmtMPdf(vpl)}
              </Text>
            </View>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableLabel}>TIR</Text>
              <Text
                style={[
                  pdfStyles.tableValue,
                  !isNaN(tir) && tir > 0.12 ? { color: "#16a34a" } : {},
                ]}
              >
                {!isNaN(tir) ? `${(tir * 100).toFixed(1)}%` : "—"}
              </Text>
            </View>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableLabel}>Payback Simples</Text>
              <Text style={pdfStyles.tableValue}>
                {data.paybackMeses < Infinity
                  ? `${data.paybackMeses.toFixed(1)} meses`
                  : "> 5 anos"}
              </Text>
            </View>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableLabel}>Payback Descontado</Text>
              <Text style={pdfStyles.tableValue}>
                {paybackDescontado
                  ? `${paybackDescontado.toFixed(1)} anos`
                  : "> 5 anos"}
              </Text>
            </View>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableLabel}>ROI em 5 anos</Text>
              <Text
                style={[
                  pdfStyles.tableValue,
                  data.roi5 > 0 ? { color: "#16a34a" } : {},
                ]}
              >
                {data.roi5 > 0 ? `${data.roi5.toFixed(0)}%` : "—"}
              </Text>
            </View>
          </View>
        </View>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>
            Interpretação dos Indicadores
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "bold", marginTop: 4 }}>
            VPL (Valor Presente Líquido)
          </Text>
          <Text style={pdfStyles.explanationText}>
            Representa o valor gerado pelo projeto em reais de hoje, já
            descontado o custo de oportunidade (12%). VPL positivo indica que o
            projeto cria valor e deve ser aceito.
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "bold", marginTop: 8 }}>
            TIR (Taxa Interna de Retorno)
          </Text>
          <Text style={pdfStyles.explanationText}>
            É a taxa de desconto que zera o VPL. Se a TIR for maior que a taxa
            mínima de atratividade (12%), o projeto é viável.
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "bold", marginTop: 8 }}>
            Payback Descontado
          </Text>
          <Text style={pdfStyles.explanationText}>
            Tempo necessário para recuperar o investimento considerando o valor
            do dinheiro no tempo. Mais conservador que o payback simples.
          </Text>
        </View>
        <View style={pdfStyles.footer}>
          <Text>Página 6</Text>
        </View>
      </Page>

      {/* PÁGINA: SENSIBILIDADE E BENEFÍCIOS INTANGÍVEIS */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.headerTitle}>
            5. Análise de Sensibilidade
          </Text>
        </View>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>
            Variação do VPL conforme cenários
          </Text>
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <Text
              style={{
                width: "30%",
                fontSize: 9,
                fontWeight: "bold",
                color: "#475569",
              }}
            >
              Cenário
            </Text>
            <Text
              style={{
                width: "35%",
                fontSize: 9,
                fontWeight: "bold",
                color: "#475569",
              }}
            >
              Benefício Anual
            </Text>
            <Text
              style={{
                width: "35%",
                fontSize: 9,
                fontWeight: "bold",
                color: "#475569",
              }}
            >
              VPL
            </Text>
          </View>
          {[
            { label: "Pessimista (-20%)", fator: 0.8 },
            { label: "Base", fator: 1.0 },
            { label: "Otimista (+20%)", fator: 1.2 },
          ].map((cenario) => {
            const benefMod = data.beneficio * cenario.fator;
            const fluxosMod = [
              -data.investimento,
              ...Array(5).fill(benefMod - data.opAnual),
            ];
            const vplMod = calcularVPL(fluxosMod, 0.12);
            return (
              <View key={cenario.label} style={{ flexDirection: "row", marginTop: 4 }}>
                <Text style={{ width: "30%", fontSize: 9 }}>
                  {cenario.label}
                </Text>
                <Text style={{ width: "35%", fontSize: 9 }}>
                  {fmtMPdf(benefMod)}/ano
                </Text>
                <Text
                  style={{
                    width: "35%",
                    fontSize: 9,
                    color: vplMod >= 0 ? "#16a34a" : "#dc2626",
                  }}
                >
                  {fmtMPdf(vplMod)}
                </Text>
              </View>
            );
          })}
          <Text style={pdfStyles.explanationText}>
            A análise de sensibilidade mostra o impacto de variações no
            benefício anual sobre o VPL. Mesmo no cenário pessimista, o projeto
            mantém-se viável.
          </Text>
        </View>

        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>
            6. Benefícios Estratégicos e Intangíveis
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "bold", marginTop: 4 }}>
            Segurança Operacional
          </Text>
          <Text style={pdfStyles.explanationText}>
            Eliminação de exposição a riscos em altura, áreas perigosas ou
            trabalho noturno. Redução de acidentes e passivos trabalhistas.
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "bold", marginTop: 8 }}>
            Conformidade e Imagem
          </Text>
          <Text style={pdfStyles.explanationText}>
            Relatórios automáticos atendem exigências regulatórias (ANAC, órgãos
            ambientais). Reforço da marca como empresa inovadora e sustentável.
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "bold", marginTop: 8 }}>
            Tomada de Decisão Baseada em Dados
          </Text>
          <Text style={pdfStyles.explanationText}>
            Histórico de imagens e análises permite identificar padrões,
            antecipar falhas e otimizar processos continuamente.
          </Text>
        </View>
        <View style={pdfStyles.footer}>
          <Text>Página 7</Text>
        </View>
      </Page>

      {/* PÁGINA: CASE E PRÓXIMOS PASSOS */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.headerTitle}>
            7. Case de Referência: {data.caseData.empresa}
          </Text>
        </View>
        <View style={pdfStyles.section}>
          <View
            style={{
              backgroundColor: "#fff7ed",
              padding: 12,
              borderRadius: 4,
              borderLeft: "4 solid #f97316",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "#c2410c",
                marginBottom: 6,
              }}
            >
              {data.caseData.titulo}
            </Text>
            <Text
              style={{ fontSize: 10, color: "#7c2d12", lineHeight: 1.5 }}
            >
              {data.caseData.historia}
            </Text>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
              {data.caseData.metricas.map((m: any, i: number) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    padding: 8,
                    backgroundColor: "rgba(249,115,22,0.1)",
                    borderRadius: 4,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: "bold", color: "#c2410c" }}
                  >
                    {m.valor}
                  </Text>
                  <Text
                    style={{ fontSize: 9, color: "#92400e", textAlign: "center" }}
                  >
                    {m.label}
                  </Text>
                </View>
              ))}
            </View>
            <Text style={{ fontSize: 8, color: "#92400e", marginTop: 8 }}>
              Fonte: {data.caseData.fonte}
            </Text>
          </View>
        </View>

        <View
          style={[
            pdfStyles.section,
            { backgroundColor: "#fff7ed", borderColor: "#fed7aa" },
          ]}
        >
          <Text
            style={[
              pdfStyles.sectionTitle,
              { color: "#c2410c", borderLeftColor: "#c2410c" },
            ]}
          >
            8. Próximos Passos
          </Text>
          <Text style={{ fontSize: 10, lineHeight: 1.6, color: "#7c2d12" }}>
            1. Agendar diagnóstico operacional gratuito com nossa equipe.{"\n"}
            2. Validar premissas com dados reais da sua operação.{"\n"}
            3. Receber proposta personalizada e suporte regulatório.{"\n\n"}
            Contato: comercial@aerodronesolutions.com.br | (61) 9 8237-3501
          </Text>
        </View>
        <View style={pdfStyles.footer}>
          <Text>Página 8</Text>
        </View>
        <Text style={pdfStyles.disclaimer}>
          Este documento é confidencial. Simulação baseada em benchmarks e casos
          verificados.
        </Text>
      </Page>
    </Document>
  );
};

const downloadROIPdf = async (data: PdfData, fileName: string) => {
  try {
    const blob = await pdf(<ROIPdfDocument data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}_${data.dataGeracao
      .split("/")
      .reverse()
      .join("-")}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    throw error;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
export default function ROICalculatorPage() {
  const [setor, setSetor] = useState<Setor>("seguranca");
  const cfg = SETOR_CONFIG[setor];
  const caseData = CASES_VERIFICADOS[setor];

  const [numPessoas, setNumPessoas] = useState(cfg.numDefault);
  const [custoPessoa, setCustoPessoa] = useState(cfg.pessoalDefault);
  const [custoVeiculo, setCustoVeiculo] = useState(cfg.veiculoDefault);
  const [perdasAnuais, setPerdasAnuais] = useState(cfg.perdasDefault);
  const [contrato, setContrato] = useState(cfg.contratoDefault);
  const [inspecao, setInspecao] = useState(cfg.inspecaoDefault);
  const [area, setArea] = useState(cfg.areaDefault);
  const [reducao, setReducao] = useState(cfg.reducaoDefault);
  const [eficiencia, setEficiencia] = useState(cfg.eficienciaDefault);

  const [capAtiva, setCapAtiva] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showLead, setShowLead] = useState(false);
  const [leadNome, setLeadNome] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadWA, setLeadWA] = useState("");
  const [leadEmpresa, setLeadEmpresa] = useState("");
  const [leadOk, setLeadOk] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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
  }, [setor, cfg]);

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
  const paybackMeses =
    beneficio > OP_ANO ? (INV / (beneficio - OP_ANO)) * 12 : Infinity;
  const r3 = beneficio * 3 - INV - OP_ANO * 3;
  const r5 = beneficio * 5 - INV - OP_ANO * 5;
  const roi5 = INV > 0 ? (r5 / INV) * 100 : 0;
  const voosArea = area > 0 ? Math.ceil(area / 200) : 1;

  const fluxos = [-INV, ...Array(VIDA).fill(beneficio - OP_ANO)];
  const vpl = calcularVPL(fluxos, 0.12);
  const tir = calcularTIR(fluxos);

  const fmt = (v: number) =>
    v.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    });
  const fmtM = (v: number) => {
    const a = Math.abs(v);
    if (a >= 1e9) return (v < 0 ? "−" : "") + "R$ " + (a / 1e9).toFixed(2) + "B";
    if (a >= 1e6) return (v < 0 ? "−" : "") + "R$ " + (a / 1e6).toFixed(2) + "M";
    if (a >= 1000) return (v < 0 ? "−" : "") + "R$ " + (a / 1000).toFixed(0) + "K";
    return fmt(v);
  };

  const shareWA = () => {
    const txt = encodeURIComponent(
      `*Análise de ROI — Aero Drone Solutions*\n\nSetor: ${
        SETORES.find((s) => s.id === setor)?.label
      }\nCusto operacional anual atual: ${fmtM(
        custoAnualAtual
      )}\nBenefício anual estimado: ${fmtM(beneficio)}\nPayback: ${
        paybackMeses < Infinity ? paybackMeses.toFixed(1) + " meses" : "—"
      }\nRetorno em 5 anos: ${fmtM(r5)}\nVPL (12% a.a.): ${fmtM(
        vpl
      )}\nTIR: ${
        !isNaN(tir) ? (tir * 100).toFixed(1) + "%" : "—"
      }\n\nSolicite análise personalizada: aerodronesolutions.com.br`
    );
    window.open(`https://wa.me/5561982373501?text=${txt}`, "_blank");
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const pdfData: PdfData = {
        setor,
        setorLabel: SETORES.find((s) => s.id === setor)?.label || "",
        custoMensalAtual,
        custoAnualAtual,
        beneficio,
        paybackMeses,
        r3,
        r5,
        roi5,
        ecoPessoas,
        ecoContratos,
        ecoPerdas,
        caseData,
        numPessoas,
        reducao,
        eficiencia,
        area,
        dataGeracao: new Date().toLocaleDateString("pt-BR"),
        vpl,
        tir,
        investimento: INV,
        opAnual: OP_ANO,
        leadEmpresa,
        leadNome,
        custoPessoa,
        perdasAnuais,
      };
      await downloadROIPdf(pdfData, `ROI_AeroDrone_${setor}`);
    } catch (error) {
      alert("Não foi possível gerar o PDF. Tente novamente.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const PaybackProgress = () => {
    const progresso =
      paybackMeses < Infinity ? Math.min(100, (paybackMeses / 60) * 100) : 100;
    return (
      <div className="mt-2">
        <div
          className="flex justify-between text-[10px] font-semibold mb-1"
          style={{ color: C.ink400 }}
        >
          <span>0m</span>
          <span>
            Payback:{" "}
            {paybackMeses < Infinity
              ? `${paybackMeses.toFixed(1)} meses`
              : "> 5 anos"}
          </span>
          <span>60m</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progresso}%` }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full"
            style={{ background: progresso < 100 ? C.orange : C.green }}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      style={{ background: C.bg, minHeight: "100vh", fontFamily: "system-ui" }}
    >
      {/* Header */}
      <header
        className="bg-white border-b sticky top-0 z-50"
        style={{ borderColor: C.border }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AeroLogo size={32} />
            <div className="hidden sm:block">
              <div className="text-sm font-black" style={{ color: C.ink }}>
                Aero Drone Solutions
              </div>
              <div className="text-[10px]" style={{ color: C.ink400 }}>
                Análise de ROI · Matrice 4TD + Dock 3
              </div>
            </div>
            <div
              className="sm:hidden text-sm font-black"
              style={{ color: C.ink }}
            >
              Aero Drone · ROI
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={shareWA}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border transition-all hover:bg-gray-50"
              style={{ borderColor: C.border, color: C.ink500 }}
            >
              <MessageCircle size={13} /> WhatsApp
            </button>
            <a
              href="/"
              className="text-xs hover:text-orange-500 transition-colors"
              style={{ color: C.ink400 }}
            >
              ← Voltar
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(150deg, #05091a 0%, #0d1530 55%, #1a0800 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid lg:grid-cols-[1fr_440px] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Tag label="Análise consultiva · Aero Drone Solutions" dark />
              <h1 className="text-4xl sm:text-6xl font-black uppercase leading-[0.85] text-white mb-5">
                Não é sobre <br />o custo do drone. <br />
                <span style={{ color: C.orange }}>
                  É sobre o custo <br />de não ter um.
                </span>
              </h1>
              <p
                className="text-sm sm:text-base leading-relaxed mb-8 max-w-xl"
                style={{ color: "#94a3b8" }}
              >
                Cada missão não executada, cada falha não detectada, cada hora
                perdida — esses são os custos reais que esta análise revela.
                Baseada em dados de operações verificadas, não em projeções de
                vendas.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { n: "8", u: "funções", d: "em 1 plataforma" },
                  { n: "25 km", u: "alcance", d: "transmissão O4+" },
                  { n: "54 min", u: "autonomia", d: "por carga" },
                  { n: "1 cm", u: "precisão", d: "RTK horizontal" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3 border"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      className="text-xl font-black"
                      style={{ color: C.orange }}
                    >
                      {s.n}
                    </div>
                    <div className="text-xs font-bold text-white">{s.u}</div>
                    <div className="text-[11px]" style={{ color: "#64748b" }}>
                      {s.d}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#calculadora"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-extrabold text-white uppercase tracking-widest transition-all"
                  style={{ background: C.orange }}
                >
                  Simular minha operação <ChevronRight size={15} />
                </a>
                <button
                  onClick={shareWA}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold border transition-all hover:bg-white/5"
                  style={{
                    borderColor: "rgba(255,255,255,0.12)",
                    color: "#94a3b8",
                  }}
                >
                  <MessageCircle size={14} /> Falar com especialista
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl p-5 border"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Activity size={14} style={{ color: C.orange }} />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-white">
                  Cases verificados · Dados reais 2024/2025
                </span>
              </div>
              <div className="space-y-4">
                {[
                  {
                    v: "60%",
                    l: "Redução em custo de segurança",
                    src: "Titan Protection",
                    icon: Shield,
                    cor: C.orange,
                  },
                  {
                    v: "40%",
                    l: "Menos incidentes pós-implantação",
                    src: "FlytBase",
                    icon: AlertTriangle,
                    cor: C.red,
                  },
                  {
                    v: "6x",
                    l: "Mais inspeções solares no mesmo budget",
                    src: "EnBW",
                    icon: Zap,
                    cor: C.blue,
                  },
                  {
                    v: "US$2.1K/MW",
                    l: "Economia por ciclo de inspeção",
                    src: "Raptor Maps",
                    icon: DollarSign,
                    cor: C.green,
                  },
                  {
                    v: "90%",
                    l: "Menos deslocamento em áreas de risco",
                    src: "Anglo American",
                    icon: Database,
                    cor: C.purple,
                  },
                  {
                    v: "60%",
                    l: "Redução em custos de inspeção industrial",
                    src: "Turner Industries",
                    icon: Factory,
                    cor: C.cyan,
                  },
                ].map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <Icon
                        size={12}
                        className="shrink-0 mt-0.5"
                        style={{ color: b.cor }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span
                            className="text-[11px]"
                            style={{ color: "#94a3b8" }}
                          >
                            {b.l}
                          </span>
                          <span
                            className="text-sm font-black shrink-0"
                            style={{ color: b.cor }}
                          >
                            {b.v}
                          </span>
                        </div>
                        <div
                          className="text-[10px] mt-0.5"
                          style={{ color: "#475569" }}
                        >
                          {b.src}
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

      {/* Seção de Capacidades */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <Tag label="Plataforma operacional" />
          <h2
            className="text-3xl sm:text-4xl font-black"
            style={{ color: C.ink }}
          >
            Um sistema. Oito operações{" "}
            <span style={{ color: C.orange }}>simultâneas.</span>
          </h2>
          <p
            className="mt-3 text-sm max-w-2xl mx-auto"
            style={{ color: C.ink400 }}
          >
            A diferença entre comprar um drone e adquirir uma plataforma
            autônoma é o que acontece além do voo — dados, diagnósticos e
            registros gerados automaticamente.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-6 justify-center">
          {CAPS.map((c, i) => (
            <button
              key={i}
              onClick={() => setCapAtiva(i)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all"
              style={{
                background: capAtiva === i ? c.cor : C.white,
                borderColor: capAtiva === i ? c.cor : C.border,
                color: capAtiva === i ? "#fff" : C.ink500,
              }}
            >
              <c.icon size={10} /> {c.tag}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={capAtiva}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl overflow-hidden border"
              style={{ borderColor: C.border }}
            >
              <div
                className="p-6"
                style={{ background: CAPS[capAtiva].cor + "10" }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: CAPS[capAtiva].cor }}
                  >
                    {React.createElement(CAPS[capAtiva].icon, {
                      size: 22,
                      color: "#fff",
                    })}
                  </div>
                  <div>
                    <h3
                      className="font-black text-lg"
                      style={{ color: C.ink }}
                    >
                      {CAPS[capAtiva].titulo}
                    </h3>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: C.ink400 }}
                    >
                      {CAPS[capAtiva].subtitulo}
                    </p>
                  </div>
                </div>
                <blockquote
                  className="border-l-4 pl-4 py-1 italic text-sm leading-relaxed"
                  style={{
                    borderColor: CAPS[capAtiva].cor,
                    color: C.inkMid,
                    background: CAPS[capAtiva].cor + "06",
                    borderRadius: "0 8px 8px 0",
                  }}
                >
                  "{CAPS[capAtiva].narrativa}"
                </blockquote>
              </div>
              <div className="p-5 bg-white">
                <div
                  className="text-[10px] font-bold uppercase tracking-widest mb-3"
                  style={{ color: C.ink400 }}
                >
                  Especificação técnica
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {SPECS_TECH.flatMap((s) => s.items)
                    .slice(capAtiva * 2, capAtiva * 2 + 4)
                    .map((sp, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs py-1 border-b last:border-0"
                        style={{ borderColor: C.borderL }}
                      >
                        <Check
                          size={11}
                          style={{ color: CAPS[capAtiva].cor }}
                          className="shrink-0"
                        />
                        <span style={{ color: C.ink500 }}>{sp.k}: </span>
                        <span
                          className="font-bold ml-0.5"
                          style={{ color: C.ink }}
                        >
                          {sp.v}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="grid grid-cols-2 gap-2.5">
            {CAPS.map((c, i) => (
              <button
                key={i}
                onClick={() => setCapAtiva(i)}
                className="rounded-xl p-3.5 border text-left transition-all"
                style={{
                  background: capAtiva === i ? c.cor + "0f" : C.white,
                  borderColor: capAtiva === i ? c.cor : C.border,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                  style={{
                    background: capAtiva === i ? c.cor : C.orangeL,
                  }}
                >
                  {React.createElement(c.icon, {
                    size: 14,
                    color: capAtiva === i ? "#fff" : C.orange,
                  })}
                </div>
                <div
                  className="text-[11px] font-black leading-tight"
                  style={{ color: C.ink }}
                >
                  {c.titulo}
                </div>
                <div
                  className="text-[10px] mt-0.5"
                  style={{ color: C.ink400 }}
                >
                  {c.subtitulo.split("—")[0].split("·")[0]}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Calculadora */}
      <section id="calculadora" style={{ background: C.bgAlt }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <Tag label="Diagnóstico financeiro da operação" />
            <h2
              className="text-3xl sm:text-4xl font-black"
              style={{ color: C.ink }}
            >
              O que está custando{" "}
              <span style={{ color: C.orange }}>não ter isso hoje?</span>
            </h2>
            <p
              className="mt-3 text-sm max-w-2xl mx-auto"
              style={{ color: C.ink400 }}
            >
              Preencha os dados da sua operação. Cálculos baseados em benchmarks
              de mercado reais e casos verificados.
            </p>
          </div>

          {/* Seleção de Setor */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 mb-8">
            {SETORES.map((s) => {
              const Icon = s.icon;
              const isActive = setor === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSetor(s.id)}
                  className="rounded-xl p-3.5 border text-left transition-all"
                  style={{
                    background: isActive ? C.navy : C.white,
                    borderColor: isActive ? C.orange : C.border,
                    boxShadow: isActive ? `0 0 0 2px ${C.orange}33` : "none",
                  }}
                >
                  <Icon
                    size={14}
                    className="mb-1.5"
                    style={{ color: isActive ? C.orange : C.ink400 }}
                  />
                  <div
                    className="text-[11px] font-black leading-tight"
                    style={{ color: isActive ? "#fff" : C.ink }}
                  >
                    {s.label}
                  </div>
                  <div
                    className="text-[10px] mt-0.5"
                    style={{ color: isActive ? C.ink300 : C.ink400 }}
                  >
                    {s.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Case do Setor */}
          <motion.div
            key={setor}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-5 mb-8 border"
            style={{ background: C.orangeL, borderColor: C.orangeM }}
          >
            <div className="flex items-start gap-4">
              <Star
                size={16}
                className="shrink-0 mt-0.5"
                style={{ color: C.orange }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ background: C.orange, color: "#fff" }}
                  >
                    {caseData.empresa}
                  </span>
                  <span className="text-[11px]" style={{ color: "#7c2d12" }}>
                    {caseData.local}
                  </span>
                </div>
                <h3
                  className="font-black text-sm mb-1.5"
                  style={{ color: C.orangeD }}
                >
                  {caseData.titulo}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-3"
                  style={{ color: "#7c2d12" }}
                >
                  {caseData.historia}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {caseData.metricas.map((m: any, i: number) => (
                    <div
                      key={i}
                      className="rounded-lg p-2.5 text-center"
                      style={{ background: "rgba(249,115,22,0.1)" }}
                    >
                      <div
                        className="text-lg font-black"
                        style={{ color: C.orangeD }}
                      >
                        {m.valor}
                      </div>
                      <div
                        className="text-[10px]"
                        style={{ color: "#92400e" }}
                      >
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] mt-2" style={{ color: "#b45309" }}>
                  Fonte: {caseData.fonte} ·{" "}
                  <a
                    href={caseData.url}
                    target="_blank"
                    rel="noopener"
                    className="underline hover:text-orange-600"
                  >
                    Ver case completo
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulário e Resultados */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Coluna Esquerda - Formulário */}
            <div
              className="bg-white rounded-2xl p-6 sm:p-7 border"
              style={{ borderColor: C.border }}
            >
              <div
                className="flex items-center gap-2.5 mb-5 pb-4 border-b"
                style={{ borderColor: C.borderL }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: C.orangeL }}
                >
                  <TrendingDown size={13} style={{ color: C.orange }} />
                </div>
                <div>
                  <h3 className="font-black text-sm" style={{ color: C.ink }}>
                    Custo operacional atual
                  </h3>
                  <p className="text-[10px]" style={{ color: C.ink400 }}>
                    Preencha com os valores reais da sua operação
                  </p>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Users size={13} style={{ color: C.orange }} />
                    <label
                      className="text-xs font-semibold"
                      style={{ color: C.inkMid }}
                    >
                      Número de {cfg.pessoalUnidade}
                    </label>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <input
                      type="range"
                      min={1}
                      max={Math.min(cfg.numMax, 500)}
                      step={1}
                      value={Math.min(numPessoas, 500)}
                      onChange={(e) => setNumPessoas(Number(e.target.value))}
                      className="flex-1 accent-orange-500 h-1.5 cursor-pointer"
                    />
                    <div
                      className="flex items-center gap-1 border rounded-lg px-2 py-1"
                      style={{ borderColor: C.border }}
                    >
                      <input
                        type="number"
                        value={numPessoas}
                        min={1}
                        max={cfg.numMax}
                        onChange={(e) =>
                          setNumPessoas(
                            Math.max(
                              1,
                              Math.min(cfg.numMax, Number(e.target.value))
                            )
                          )
                        }
                        className="w-16 text-right text-sm font-black outline-none"
                        style={{ color: C.ink }}
                      />
                      <span className="text-[10px]" style={{ color: C.ink400 }}>
                        prof.
                      </span>
                    </div>
                  </div>
                </div>

                <SliderRow
                  label={cfg.pessoalLabel}
                  icon={DollarSign}
                  hint="Custo total: salário + encargos + benefícios + FGTS"
                  value={custoPessoa}
                  min={1500}
                  max={cfg.pessoalMax}
                  step={cfg.pessoalStep}
                  onChange={setCustoPessoa}
                  fmt={fmt}
                />

                <SliderRow
                  label="Veículos, deslocamentos e logística operacional / mês"
                  icon={Car}
                  value={custoVeiculo}
                  min={0}
                  max={50000}
                  step={200}
                  onChange={setCustoVeiculo}
                  fmt={fmt}
                />

                <SliderRow
                  label={cfg.perdasLabel}
                  icon={TrendingDown}
                  hint="Estimativa anual conservadora. Zero se não souber."
                  value={perdasAnuais}
                  min={0}
                  max={cfg.perdasMax}
                  step={cfg.perdasStep}
                  onChange={setPerdasAnuais}
                  fmt={fmtM}
                />

                <div
                  className="rounded-xl border p-4"
                  style={{ background: "#fffbeb", borderColor: "#fde68a" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Info size={12} style={{ color: "#d97706" }} />
                    <span
                      className="text-[11px] font-bold"
                      style={{ color: "#92400e" }}
                    >
                      Custos que a plataforma absorve diretamente
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Globe size={12} style={{ color: C.orange }} />
                        <label
                          className="text-[11px] font-semibold"
                          style={{ color: C.inkMid }}
                        >
                          {cfg.contratoLabel}
                        </label>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <input
                          type="range"
                          min={0}
                          max={cfg.contratoMax}
                          step={500}
                          value={contrato}
                          onChange={(e) => setContrato(Number(e.target.value))}
                          className="flex-1 accent-orange-500 h-1.5 cursor-pointer"
                        />
                        <div
                          className="flex items-center gap-1 border rounded-lg px-2 py-1"
                          style={{
                            borderColor: C.border,
                            background: C.white,
                          }}
                        >
                          <input
                            type="number"
                            value={contrato}
                            min={0}
                            max={cfg.contratoMax}
                            onChange={(e) =>
                              setContrato(Math.max(0, Number(e.target.value)))
                            }
                            className="w-20 text-right text-xs font-bold outline-none"
                            style={{ color: C.ink }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Scan size={12} style={{ color: C.orange }} />
                        <label
                          className="text-[11px] font-semibold"
                          style={{ color: C.inkMid }}
                        >
                          {cfg.inspecaoLabel}
                        </label>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <input
                          type="range"
                          min={0}
                          max={cfg.inspecaoMax}
                          step={1000}
                          value={inspecao}
                          onChange={(e) => setInspecao(Number(e.target.value))}
                          className="flex-1 accent-orange-500 h-1.5 cursor-pointer"
                        />
                        <div
                          className="flex items-center gap-1 border rounded-lg px-2 py-1"
                          style={{
                            borderColor: C.border,
                            background: C.white,
                          }}
                        >
                          <input
                            type="number"
                            value={inspecao}
                            min={0}
                            max={cfg.inspecaoMax}
                            onChange={(e) =>
                              setInspecao(Math.max(0, Number(e.target.value)))
                            }
                            className="w-20 text-right text-xs font-bold outline-none"
                            style={{ color: C.ink }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Map size={13} style={{ color: C.orange }} />
                    <label
                      className="text-xs font-semibold"
                      style={{ color: C.inkMid }}
                    >
                      {cfg.areaLabel}
                    </label>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <input
                      type="number"
                      value={area}
                      min={0}
                      onChange={(e) =>
                        setArea(Math.max(0, Number(e.target.value)))
                      }
                      className="flex-1 px-3 py-2 rounded-xl border text-sm font-bold"
                      style={{
                        background: C.bg,
                        borderColor: C.border,
                        color: C.ink,
                      }}
                    />
                    <div
                      className="text-[11px] font-bold px-3 py-2 rounded-xl shrink-0"
                      style={{ background: C.orangeL, color: C.orangeD }}
                    >
                      ~{voosArea} {voosArea === 1 ? "voo" : "voos"}/ciclo
                    </div>
                  </div>
                </div>

                <div className="h-px" style={{ background: C.border }} />

                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={13} style={{ color: C.orange }} />
                  <h4
                    className="font-black text-xs uppercase tracking-wider"
                    style={{ color: C.ink }}
                  >
                    Parâmetros da solução autônoma
                  </h4>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Users size={13} style={{ color: C.orange }} />
                    <label
                      className="text-xs font-semibold"
                      style={{ color: C.inkMid }}
                    >
                      Profissionais com potencial de realocação estratégica
                    </label>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <input
                      type="range"
                      min={0}
                      max={numPessoas}
                      step={1}
                      value={Math.min(reducao, numPessoas)}
                      onChange={(e) => setReducao(Number(e.target.value))}
                      className="flex-1 accent-orange-500 h-1.5 cursor-pointer"
                    />
                    <span
                      className="text-sm font-black min-w-[80px] text-right"
                      style={{ color: C.ink }}
                    >
                      {Math.min(reducao, numPessoas)} de {numPessoas}
                    </span>
                  </div>
                </div>

                <SliderRow
                  label="Eficiência estimada na redução de perdas operacionais"
                  icon={Target}
                  hint="80% é conservador. Cases reais chegam a 100%."
                  value={eficiencia}
                  min={0}
                  max={100}
                  step={5}
                  onChange={setEficiencia}
                  fmt={(v) => `${v}%`}
                />
              </div>
            </div>

            {/* Coluna Direita - Resultados */}
            <div className="lg:sticky lg:top-20 self-start space-y-5">
              <AnimatePresence mode="wait">
                {!showLead ? (
                  <motion.div
                    key="res"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-2xl p-5 sm:p-6 border"
                    style={{ borderColor: C.border }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Tag label="Dashboard de ROI" />
                      <button
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPDF}
                        className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border transition-all hover:bg-orange-50"
                        style={{ borderColor: C.orange, color: C.orange }}
                      >
                        {isGeneratingPDF ? (
                          <>
                            <div className="w-3 h-3 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                            Gerando...
                          </>
                        ) : (
                          <>
                            <FileDown size={14} /> Baixar PDF
                          </>
                        )}
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div
                        className="p-4 rounded-xl border"
                        style={{ background: "#f8fafc", borderColor: C.borderL }}
                      >
                        <h4
                          className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                          style={{ color: C.ink500 }}
                        >
                          <TrendingDown size={14} /> Situação Atual (Anual)
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <KPI
                            icon={DollarSign}
                            label="Custo Mensal"
                            value={fmtM(custoMensalAtual)}
                            variant="default"
                          />
                          <KPI
                            icon={Calendar}
                            label="Custo Anual Total"
                            value={fmtM(custoAnualAtual)}
                            variant="default"
                          />
                        </div>
                      </div>

                      <div
                        className="p-4 rounded-xl border"
                        style={{
                          background: C.orangeL + "80",
                          borderColor: C.orangeM,
                        }}
                      >
                        <h4
                          className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                          style={{ color: C.orangeD }}
                        >
                          <TrendingUpIcon size={14} /> Ganhos Projetados
                          <MetricTooltip title="Benefício Anual">
                            Soma da realocação de profissionais, eliminação de
                            contratos e recuperação de perdas.
                          </MetricTooltip>
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <KPI
                            icon={BarChart}
                            label="Benefício Anual"
                            value={fmtM(beneficio)}
                            variant={beneficio > 0 ? "highlight" : "default"}
                          />
                          <KPI
                            icon={Clock}
                            label="Payback"
                            value={
                              paybackMeses < Infinity
                                ? `${paybackMeses.toFixed(1)} meses`
                                : "—"
                            }
                            variant="default"
                          />
                        </div>
                        <PaybackProgress />
                      </div>

                      <div
                        className="p-4 rounded-xl border"
                        style={{ background: C.white, borderColor: C.border }}
                      >
                        <h4
                          className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                          style={{ color: C.ink500 }}
                        >
                          <PieChart size={14} /> Indicadores Financeiros
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <KPI
                            icon={Award}
                            label="ROI em 5 anos"
                            value={roi5 > 0 ? `${roi5.toFixed(0)}%` : "—"}
                            variant={roi5 > 0 ? "dark" : "default"}
                          />
                          <KPI
                            icon={DollarSign}
                            label="VPL (12% a.a.)"
                            value={fmtM(vpl)}
                            variant={vpl > 0 ? "positive" : "default"}
                          />
                          <KPI
                            icon={TrendingUp}
                            label="TIR"
                            value={
                              !isNaN(tir) ? `${(tir * 100).toFixed(1)}%` : "—"
                            }
                            variant={
                              !isNaN(tir) && tir > 0.12 ? "highlight" : "default"
                            }
                          />
                          <KPI
                            icon={BarChart3}
                            label="Retorno 3 anos"
                            value={fmtM(r3)}
                            variant={r3 > 0 ? "positive" : "default"}
                          />
                        </div>
                        <div className="mt-3 text-[11px] text-gray-500 flex items-start gap-1">
                          <Info size={12} className="shrink-0 mt-0.5" />
                          <span>
                            VPL positivo indica criação de valor. TIR &gt; 12%
                            significa retorno superior ao custo de oportunidade.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="mt-6 rounded-xl border p-4"
                      style={{ background: C.bg, borderColor: C.border }}
                    >
                      <div className="flex items-center gap-1.5 mb-3">
                        <LineChart size={14} style={{ color: C.orange }} />
                        <span
                          className="text-[11px] font-bold uppercase tracking-wider"
                          style={{ color: C.ink400 }}
                        >
                          Projeção de Retorno Acumulado
                        </span>
                      </div>
                      <ProjecaoChart
                        beneficio={beneficio}
                        investimento={INV}
                        opAnual={OP_ANO}
                      />
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setShowLead(true)}
                        className="flex items-center justify-center gap-2 text-white py-3.5 rounded-xl text-sm font-extrabold uppercase tracking-widest transition-all hover:scale-[1.02]"
                        style={{ background: C.orange }}
                      >
                        <Download size={16} /> Análise Completa
                      </button>
                      <button
                        onClick={shareWA}
                        className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold border transition-all hover:bg-gray-50"
                        style={{ borderColor: C.border, color: C.ink500 }}
                      >
                        <MessageCircle size={16} /> WhatsApp
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="lead"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-2xl p-5 sm:p-6 border"
                    style={{ borderColor: C.border }}
                  >
                    {!leadOk ? (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3
                              className="text-lg font-black"
                              style={{ color: C.ink }}
                            >
                              Receba a análise personalizada
                            </h3>
                            <p
                              className="text-[11px]"
                              style={{ color: C.ink400 }}
                            >
                              Sem compromisso. Sem script de vendas.
                            </p>
                          </div>
                          <button
                            onClick={() => setShowLead(false)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <X size={15} />
                          </button>
                        </div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setLeadOk(true);
                          }}
                          className="space-y-3"
                        >
                          {[
                            {
                              l: "Nome completo",
                              v: leadNome,
                              s: setLeadNome,
                              t: "text",
                              p: "Seu nome",
                            },
                            {
                              l: "Empresa",
                              v: leadEmpresa,
                              s: setLeadEmpresa,
                              t: "text",
                              p: "Nome da empresa",
                            },
                            {
                              l: "E-mail corporativo",
                              v: leadEmail,
                              s: setLeadEmail,
                              t: "email",
                              p: "email@empresa.com.br",
                            },
                            {
                              l: "WhatsApp",
                              v: leadWA,
                              s: setLeadWA,
                              t: "tel",
                              p: "(61) 99999-9999",
                            },
                          ].map((f) => (
                            <div key={f.l}>
                              <label
                                className="text-[11px] font-semibold block mb-1"
                                style={{ color: C.ink500 }}
                              >
                                {f.l}
                              </label>
                              <input
                                type={f.t}
                                required
                                value={f.v}
                                onChange={(e) => f.s(e.target.value)}
                                placeholder={f.p}
                                className="w-full px-3.5 py-2.5 rounded-xl border text-sm"
                                style={{
                                  background: C.bg,
                                  borderColor: C.border,
                                }}
                              />
                            </div>
                          ))}
                          <button
                            type="submit"
                            className="w-full text-white py-3.5 rounded-xl text-sm font-extrabold uppercase tracking-widest"
                            style={{ background: C.orange }}
                          >
                            Enviar e receber análise
                          </button>
                        </form>
                      </>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="text-center py-6"
                      >
                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check size={26} className="text-green-600" />
                        </div>
                        <h3
                          className="text-lg font-black mb-1.5"
                          style={{ color: C.ink }}
                        >
                          Recebemos sua solicitação.
                        </h3>
                        <p
                          className="text-xs mb-5"
                          style={{ color: C.ink400 }}
                        >
                          Um especialista da Aero Drone Solutions entrará em
                          contato em até 24h.
                        </p>
                        <div className="space-y-2">
                          <button
                            onClick={shareWA}
                            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl text-sm font-semibold"
                          >
                            <MessageCircle size={14} /> Falar agora no WhatsApp
                          </button>
                          <a
                            href="/"
                            className="w-full flex items-center justify-center border px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-50"
                            style={{ borderColor: C.border }}
                          >
                            Voltar ao site
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className="rounded-xl p-4 border bg-white"
                style={{ borderColor: C.border }}
              >
                <div className="flex items-start gap-2">
                  <AlertCircle
                    size={12}
                    className="shrink-0 mt-0.5"
                    style={{ color: C.ink300 }}
                  />
                  <p
                    className="text-[10px] leading-relaxed"
                    style={{ color: C.ink400 }}
                  >
                    <strong>Metodologia:</strong> Custo total anual = pessoal +
                    veículos + contratos + perdas + inspeções. Solução
                    depreciada em 5 anos. Custo fixo: R$ 1.500/mês. Benefício =
                    realocação + contratos + recuperação de perdas. Resultados
                    reais variam conforme operação.
                    <br />
                    <br />
                    <strong>Investimento base:</strong> R$ 205.000 (DJI Matrice
                    4TD + Dock 3 + implantação). Valores Q1/2026.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <Tag label="Evidências de campo" />
          <h2
            className="text-3xl sm:text-4xl font-black"
            style={{ color: C.ink }}
          >
            O ROI não é teórico. <br />
            <span style={{ color: C.orange }}>Está documentado.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.values(CASES_VERIFICADOS).map((c: any, i: number) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: C.border }}
              >
                <div className="p-5" style={{ background: c.cor + "0d" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ background: c.cor, color: "#fff" }}
                    >
                      {c.empresa}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ color: C.ink400 }}
                    >
                      {c.local}
                    </span>
                  </div>
                  <h3
                    className="font-black text-sm mb-2 leading-tight"
                    style={{ color: C.ink }}
                  >
                    {c.titulo}
                  </h3>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: C.ink500 }}
                  >
                    {c.historia}
                  </p>
                </div>
                <div
                  className="px-5 py-4 bg-white border-t"
                  style={{ borderColor: C.borderL }}
                >
                  <div className="flex flex-col gap-1.5 mb-3">
                    {c.metricas.map((m: any, mi: number) => (
                      <div
                        key={mi}
                        className="flex items-center gap-2 text-[11px]"
                        style={{ color: C.ink }}
                      >
                        <Check
                          size={10}
                          className="shrink-0"
                          style={{ color: c.cor }}
                        />
                        <span className="font-semibold">
                          {m.valor} · {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px]" style={{ color: C.ink400 }}>
                    Fonte: {c.fonte} ·{" "}
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener"
                      className="underline hover:text-orange-500"
                    >
                      Ver detalhes
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: C.bgAlt }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center mb-8">
            <Tag label="Perguntas frequentes" />
            <h2 className="text-3xl font-black" style={{ color: C.ink }}>
              As perguntas que todo gestor faz. <br />
              <span style={{ color: C.orange }}>Respondidas com dados.</span>
            </h2>
          </div>
          <div className="space-y-2.5">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border overflow-hidden"
                style={{ borderColor: C.border }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                >
                  <span className="font-bold text-sm" style={{ color: C.ink }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={14}
                    className="shrink-0 transition-transform"
                    style={{
                      color: C.ink400,
                      transform:
                        openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="px-5 pb-5 text-sm leading-relaxed border-t"
                        style={{ color: C.ink500, borderColor: C.borderL }}
                      >
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

      {/* CTA Final */}
      <section style={{ background: C.navy }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <Tag label="Próximo passo" dark />
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
            A análise que você viu agora <br />
            <span style={{ color: C.orange }}>usou dados genéricos.</span>
          </h2>
          <p
            className="text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#94a3b8" }}
          >
            A análise com os dados reais da{" "}
            <strong className="text-white">sua</strong> operação é mais precisa,
            mais conservadora — e, na maioria dos casos, mais favorável. Nossa
            equipe faz o diagnóstico completo, gratuito, sem pressão.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={() => setShowLead(true)}
              className="flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl font-extrabold text-sm uppercase tracking-widest"
              style={{ background: C.orange }}
            >
              <Calculator size={15} /> Quero minha análise personalizada
            </button>
            <button
              onClick={shareWA}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border transition-all hover:bg-white/5"
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                color: "#94a3b8",
              }}
            >
              <MessageCircle size={15} /> Falar com especialista
            </button>
          </div>
          <p className="text-xs" style={{ color: "#334155" }}>
            Sem compromisso de compra · Diagnóstico gratuito · Análise em até 24
            horas
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t"
        style={{ background: C.navy, borderColor: "rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AeroLogo size={24} />
            <span className="text-[11px]" style={{ color: "#64748b" }}>
              Aero Drone Solutions · DJI Enterprise Partner
            </span>
          </div>
          <span className="text-[11px]" style={{ color: "#334155" }}>
            Simulação com dados de mercado. Resultados reais variam conforme
            operação.
          </span>
        </div>
      </footer>
    </div>
  );
}