// [NOVO v1.1] — Arquivo de dados: soluções por vertical de mercado
// Separado do static-content para seguir [SOLID-S]

import { Shield, Eye, Factory, TreePine, Radio, Building2 } from "lucide-react";
import type { Solution } from "@/domain/entities/index";
import { SECTION_VIDEOS } from "@/data/hero-slides";

export const SOLUTIONS: Solution[] = [
  {
    icon: Shield, title: "Segurança Perimetral", accent: "#f97316",
    clients: "Mineração · Portos · Presídios · Condomínios",
    metric: "73%", metricLabel: "redução de incidentes",
    videoSrc: SECTION_VIDEOS.sol1,
    desc: "Rondas autônomas 24/7 com câmera térmica 640 px. Dock 3 + Matrice 4TD responde a alarmes em < 60 s — identifica intrusos com calor corporal a 1 km sem operador local. Relatório automático por ocorrência no FlightHub 2.",
    tags: ["24/7 Autônomo", "< 60 s de resposta", "Térmica 640 px"],
    benefits: ["Resposta automática < 60 s", "Integração CFTV via API REST", "Relatório automático por ocorrência", "73% menos incidentes comprovado"],
  },
  {
    icon: Eye, title: "Monitoramento de Áreas", accent: "#3b82f6",
    clients: "Utilities · Agronegócio · Mineração",
    metric: "500 ha", metricLabel: "cobertos por hora",
    videoSrc: SECTION_VIDEOS.sol2,
    desc: "Matrice 4T detecta anomalias térmicas em reservatórios e linhas. Matrice 4E mapeia NDVI e relevo com RTK ±1 cm. 500 ha cobertos por hora com dados georreferenciados.",
    tags: ["Inspeção Automática", "NDVI RTK", "Análise Térmica"],
    benefits: ["500 ha/h de cobertura", "Alerta em < 2 min", "Histórico georreferenciado", "Integração SCADA"],
  },
  {
    icon: Factory, title: "Inspeção Industrial", accent: "#10b981",
    clients: "Energia · Petróleo & Gás · Construção Civil",
    metric: "8×", metricLabel: "mais rápido que inspeção manual",
    videoSrc: SECTION_VIDEOS.sol3,
    desc: "Torres, dutos, chaminés e subestações inspecionados sem parar a operação. Termografia com Matrice 4T detecta anomalias invisíveis ao olho nu.",
    tags: ["Nuvem 3D RTK", "Termografia", "Zero Downtime"],
    benefits: ["8× mais rápido", "Zero risco para equipes", "Laudos automáticos < 2h", "Compliance NR-35 / NR-13"],
  },
  {
    icon: TreePine, title: "Gestão Ambiental", accent: "#f59e0b",
    clients: "Órgãos Públicos · Florestais · ESG",
    metric: "2 min", metricLabel: "para detectar foco de incêndio",
    videoSrc: SECTION_VIDEOS.sol4,
    desc: "Sensor VOx do Matrice 4T identifica focos com variação de 30 mK. Matrice 4E com RTK mapeia APPs e NDVI por talhão. Relatórios IBAMA automáticos.",
    tags: ["NDVI Matrice 4E · RTK", "Foco Incêndio Matrice 4T", "IBAMA Compliance"],
    benefits: ["Foco detectado em 2 min", "NDVI semanal automatizado", "Relatórios IBAMA prontos", "Dados auditoria ESG"],
  },
  {
    icon: Radio, title: "Resposta a Emergências", accent: "#ef4444",
    clients: "Bombeiros · Defesa Civil · SAMU",
    metric: "<60 s", metricLabel: "do alarme ao drone no ar",
    videoSrc: SECTION_VIDEOS.bg1,
    desc: "Dock 3 integrado a pluviômetros e sensores lança o Matrice 4TD automaticamente ao alerta. NIR ativo e câmera térmica para coordenação em áreas sem iluminação.",
    tags: ["Busca & Resgate SAR", "Vídeo Térmico ao COI", "Decolagem Automática"],
    benefits: ["Drone no ar em < 60 s", "Câmera térmica + NIR ativo", "Live HD para o COI", "Coordenação multi-agência"],
  },
  {
    icon: Building2, title: "Smart Cities & Governo", accent: "#8b5cf6",
    clients: "Municípios · Concessionárias · BID",
    metric: "24/7", metricLabel: "monitoramento autônomo",
    videoSrc: SECTION_VIDEOS.bg2,
    desc: "FlightHub 2 integra via API com centrais de comando urbano (CICC, 190, 192). Dashboard em tempo real e API REST aberta para sistemas municipais.",
    tags: ["API Prefeituras", "Dashboard CICC", "Análise de Tráfego"],
    benefits: ["Integração CICC / 190 / 192", "Dashboard situacional", "API REST open", "Conformidade LGPD"],
  },
];
