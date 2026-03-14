"use client";
/**
 * SM Company — Drone as a Service · Inteligência Aérea Enterprise
 * ─────────────────────────────────────────────────────────────────────────────
 * Landing Page + Páginas de Produto (SPA via estado, sem router)
 *
 * Seções:
 *   NAVBAR · HERO · MARQUEE · MERCADO (DaaS) · 8 CAPACIDADES
 *   SOBRE · PRODUTOS · SOLUÇÕES · CASES · COMO FUNCIONA
 *   COMPARATIVO · FAQ · GALERIA · ISCAS · CTA · CONTATO · FOOTER
 *
 * Cada produto tem página própria com:
 *   HERO · HIGHLIGHTS · OVERVIEW · CAPACIDADES · SPECS · APLICAÇÕES
 *   GALERIA · CTA
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ═══ 1. IMPORTS ═══════════════════════════════════════════════════════════════
import React, { useState, useEffect, useRef, useCallback, FC } from "react";
import {
  Shield, ArrowRight, ArrowLeft, Activity, Target, Database,
  ChevronLeft, ChevronRight, Eye, Crosshair, Wifi, Battery, Check,
  Thermometer, Layers, Zap, Map, TrendingUp, X, Star,
  Clock, BarChart3, Globe, Building2, TreePine, Factory, Lock, CheckCircle,
  Menu, Phone, Mail, ArrowUpRight, Radar, CloudRain, Users, HelpCircle,
  ChevronDown, Award, Radio, Play, Pause, Volume2, VolumeX, Minus, Plus,
  Maximize2, LocateFixed, Gauge, Heart, Lightbulb,
  MapPin, TrendingDown, Quote, ZoomIn, ScanLine, LifeBuoy, Boxes,
  Cpu, Satellite, Layers2, MessageCircle, Calculator, AlertTriangle,
  FileText, BookOpen, Flame, Wifi as WifiIcon, BarChart, DollarSign,
} from "lucide-react";
import {
  motion, AnimatePresence, useScroll, useTransform, useInView,
} from "framer-motion";

// ═══ 2. DESIGN SYSTEM ════════════════════════════════════════════════════════
const C = {
  // Backgrounds Light
  light100: "#ffffff",
  light200: "#f8fafc",
  light300: "#f1f5f9",
  light400: "#e2e8f0",
  // Backgrounds Dark/Navy
  navy950:  "#030712",
  navy900:  "#05091a",
  navy800:  "#080d24",
  navy700:  "#0d1530",
  // Text
  ink900:   "#0f172a",
  ink700:   "#1e293b",
  ink500:   "#475569",
  ink400:   "#64748b",
  ink300:   "#94a3b8",
  // Accent
  orange:   "#f97316",
  orangeD:  "#ea6c10",
  orangeL:  "#fed7aa",
  orangeBg: "#fff7ed",
  // Borders
  bLight:   "#e2e8f0",
  bLighter: "#f1f5f9",
  // Shadows
  shadow:   "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
  shadowMd: "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
  shadowLg: "0 8px 48px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)",
} as const;

// ═══ 3. TYPES ═════════════════════════════════════════════════════════════════
type Product = {
  id: string; name: string; nameShort: string; accent: string;
  category: string; tagline: string; taglineSub: string;
  videoSrc: string; poster: string; heroDesc: string; overview: string;
  highlights: { icon: React.ElementType; value: string; unit: string; label: string }[];
  capabilities: { icon: React.ElementType; label: string; desc: string }[];
  specs: { group: string; items: { k: string; v: string }[] }[];
  useCases: { icon: React.ElementType; title: string; desc: string }[];
  gallery: string[];
  dockCompat?: string;
};

// ═══ 4. DADOS — PRODUTOS ══════════════════════════════════════════════════════
const PRODUCTS: Product[] = [
  // ── MATRICE 4T ──────────────────────────────────────────────────────────────
  {
    id: "m4t", name: "Matrice 4T", nameShort: "M4T", accent: "#f97316",
    category: "Portátil · Térmico & Segurança Noturna",
    tagline: "Veja no escuro. Missão sem limites.",
    taglineSub: "O drone portátil mais avançado para segurança noturna — câmera térmica VOx 640 px, Night Scene Mode e rastreamento por IA.",
    videoSrc: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/d6354026-ddbf-4d04-afd2-3cde1d25bc2f.mp4?w=3840&h=2160",
    poster: "https://www-cdn.djiits.com/dps/f384d2286ea002458baa31f8f8805953.jpg",
    heroDesc: "48 min de voo · Térmica 640×512 px · Laser 1.800 m · Night Scene Mode · IP55",
    overview: "O Matrice 4T é a escolha certa quando a missão acontece no escuro. Em vez do obturador mecânico do M4E, o 4T traz um sensor 1/1.3\" CMOS f/1.7 — a maior abertura da série — maximizado para capturar luz em ambientes sem iluminação. O Night Scene Mode combina esse sensor com processamento de imagem dedicado para produzir cenas nítidas à luz das estrelas. Mas o coração do M4T é o microbolômetro VOx LWIR de 640×512 px com sensibilidade ≤30 mK: ele detecta calor humano a 1 km de distância, identifica focos de incêndio com variação de apenas 30 mK e lê a temperatura de equipamentos industriais sem contato. O iluminador NIR ativo projeta luz infravermelha a 100 m — completamente invisível ao alvo. O telêmetro laser de 1.800 m localiza e mede distâncias sem contato. LiDAR rotativo e radar mmWave fazem varredura omnidirecional de obstáculos para voos noturnos autônomos seguros. É a plataforma que a SM Company utiliza em operações de segurança perimetral, SAR e inspeção termográfica.",
    highlights: [
      { icon: Clock,       value: "48",    unit: "min", label: "Autonomia de voo" },
      { icon: Thermometer, value: "640",   unit: "px",  label: "Resolução térmica" },
      { icon: Crosshair,   value: "1.800", unit: "m",   label: "Alcance do laser" },
      { icon: Eye,         value: "100",   unit: "m",   label: "Iluminador NIR" },
    ],
    capabilities: [
      { icon: Thermometer, label: "Sensor Térmico VOx 640×512",      desc: "Microbolômetro VOx LWIR. Sensibilidade ≤30 mK. Faixa -20°C a +550°C. Precisão ±2°C. Super-resolução IA 1.280×1.024 px. Paletas configuráveis por missão." },
      { icon: Eye,         label: "Night Scene — 1/1.3\" f/1.7",     desc: "Sensor CMOS 48 MP com a maior abertura da série. Night Scene Mode gera imagens nítidas em breu total. ISO ampliado para captura máxima de luz ambiente disponível." },
      { icon: ScanLine,    label: "Iluminador NIR Ativo 100 m",       desc: "Projeta luz infravermelha invisível ao olho humano a até 100 m. O alvo não sabe que está iluminado. Essencial para operações táticas e SAR noturno em áreas sem luz." },
      { icon: Crosshair,   label: "Telêmetro Laser 1.800 m",          desc: "Medição de distância de 3 a 1.800 m com precisão de ±1 m sem contato. Combinado às câmeras tele 70 mm e 168 mm — identifica e localiza alvos a distância segura." },
      { icon: Target,      label: "IA de Borda — Rastreamento",       desc: "Reconhecimento e rastreamento de alvos processado localmente no drone. Funciona sem cloud, essencial em áreas sem cobertura 4G. Rastreia pessoas e veículos em tempo real." },
      { icon: Radar,       label: "LiDAR + Radar mmWave Omnidirecional", desc: "LiDAR rotativo + radar mmWave em 6 direções. O mmWave detecta fios elétricos finos em breu total. Voos noturnos autônomos com segurança máxima em qualquer ambiente." },
    ],
    specs: [
      { group: "Câmera Térmica", items: [
        { k: "Sensor",               v: "VOx LWIR microbolômetro" },
        { k: "Resolução nativa",     v: "640 × 512 px" },
        { k: "Super-resolução (IA)", v: "1.280 × 1.024 px" },
        { k: "Sensibilidade (NETD)", v: "≤ 30 mK (F/1.0)" },
        { k: "Faixa de medição",     v: "-20°C a +550°C" },
        { k: "Precisão radiométrica",v: "±2°C ou ±2%" },
        { k: "Wavelength",           v: "8–14 μm" },
      ]},
      { group: "Câmeras Visuais & Laser", items: [
        { k: "Câmera Wide (Night Scene)", v: "1/1.3\" CMOS · 48 MP · f/1.7" },
        { k: "Câmera Tele Média",         v: "48 MP · EFL 70 mm" },
        { k: "Câmera Tele Longo Alcance", v: "48 MP · EFL 168 mm" },
        { k: "Iluminador NIR",            v: "Alcance ativo até 100 m" },
        { k: "Telêmetro laser",           v: "3–1.800 m · ±1 m de precisão" },
      ]},
      { group: "Voo & Proteção", items: [
        { k: "Autonomia",            v: "≈ 48 min (sem vento)" },
        { k: "Obturador",            v: "Eletrônico (Night Scene otimizado)" },
        { k: "Transmissão",          v: "O4 Enterprise" },
        { k: "Proteção IP",          v: "IP55" },
        { k: "Resistência ao vento", v: "15 m/s" },
        { k: "Obstacle sensing",     v: "LiDAR rotativo + radar mmWave" },
        { k: "GNSS",                 v: "GPS + GLONASS + BeiDou + Galileo" },
      ]},
    ],
    useCases: [
      { icon: Shield,   title: "Segurança Perimetral Noturna",   desc: "Rondas com câmera térmica 640 px. Identifica intrusos a 1 km antes de qualquer alarme perimetral. NIR ativo para confirmação visual em breu absoluto." },
      { icon: Radio,    title: "Busca & Salvamento (SAR)",        desc: "Detecção de calor humano em florestas, escombros e áreas alagadas. Feed térmico ao vivo para coordenação de equipes de socorro. 48 min ininterruptos por voo." },
      { icon: TreePine, title: "Detecção de Incêndio Florestal",  desc: "Sensor de 30 mK identifica focos antes da chama. Mapeamento de expansão em tempo real para Bombeiros e Defesa Civil — até 2 min antes do incêndio se alastrar." },
      { icon: Factory,  title: "Inspeção Termográfica Industrial",desc: "Subestações, painéis solares, linhas e equipamentos. Relatório automático com coordenadas GPS e imagem térmica + visual side-by-side por anomalia." },
    ],
    gallery: [
      "https://www-cdn.djiits.com/dps/07efe0459b61c60e63c9d064646a5e97.jpg",
      "https://www-cdn.djiits.com/dps/237ea2e0582685cfe4dcef2af048f8b0.jpg",
      "https://www-cdn.djiits.com/dps/6bd9a7d3ae41ad4a1c5e955137357a94.jpg",
    ],
    dockCompat: "O M4T é portátil — não é compatível com Dock 3. Para autonomia 24/7 com câmera térmica, use o Matrice 4TD com Dock 3.",
  },
// ── MATRICE 4E ──────────────────────────────────────────────────────────────
{
  id: "m4e", name: "Matrice 4E", nameShort: "M4E", accent: "#3b82f6",
  category: "Portátil · Mapeamento RTK & Fotogrametria",
  tagline: "Precisão centimétrica. Mapas perfeitos.",
  taglineSub: "Obturador mecânico 4/3 CMOS elimina rolling shutter. RTK integrado ±1 cm sem GCPs. Três câmeras especializadas em um único voo.",
  videoSrc: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/f665aa43-cc37-4f9c-ba64-9fdc40d626f8.mp4?w=2560&h=1440",
  poster: "https://www-cdn.djiits.com/dps/e2be7f3115eba85952fed9a6a03758dc.jpg",
  heroDesc: "48 min de voo · Sensor 4/3 CMOS · Obturador mecânico · RTK ±1 cm · Laser 1.800 m",
  overview: "O Matrice 4E foi projetado para engenheiros, topógrafos e gestores ambientais que exigem o mais alto grau de precisão geométrica. O diferencial central é o obturador mecânico integrado ao sensor 4/3 CMOS de 20 MP: ele elimina completamente o rolling shutter — o efeito gelatina que distorce ortofotos durante voos de alta velocidade. O módulo RTK nativo entrega ±1 cm horizontal sem pontos de controle no terreno (GCPs), reduzindo o tempo de campo em até 70%. As câmeras tele de 70 mm e 168 mm permitem inspeção visual de longo alcance simultânea ao mapeamento — em um único voo. O M4E não tem sensor térmico; para inspeções termográficas, o M4T é o indicado. É a escolha da SM Company para mapeamento de APPs, topografia de mineração, ortomosaicos de obras civis e modelagem 3D de ativos.",
  highlights: [
    { icon: Clock,       value: "48",    unit: "min",  label: "Autonomia de voo" },
    { icon: LocateFixed, value: "1",     unit: "cm",   label: "Precisão RTK" },
    { icon: Crosshair,   value: "1.800", unit: "m",    label: "Alcance do laser" },
    { icon: Layers,      value: "3",     unit: "cams", label: "Câmeras simultâneas" },
  ],
  capabilities: [
    { icon: Gauge,       label: "Obturador Mecânico 4/3 CMOS",    desc: "Elimina rolling shutter em voos de mapeamento a alta velocidade. Sensor 20 MP 4/3 garante cobertura de solo máxima por passagem — essencial para ortomosaicos grandes." },
    { icon: LocateFixed, label: "RTK Integrado ±1 cm sem GCPs",   desc: "Precisão ±1 cm horizontal e ±1,5 cm vertical nativamente. Sem hardware adicional, sem pontos de controle. Ideal para cadastro, mineração e obras de engenharia civil." },
    { icon: Eye,         label: "3 Câmeras Especializadas",        desc: "Wide 4/3 para mapeamento + Tele Média 48 MP (EFL 70 mm) + Tele Longo 48 MP (EFL 168 mm). Um único voo entrega dados de mapa e inspeção visual de alta resolução." },
    { icon: Crosshair,   label: "Telêmetro Laser 1.800 m",         desc: "Medição sem contato de 3 a 1.800 m (±1 m). Combinado às câmeras tele, localiza alvos de inspeção com coordenadas precisas antes de qualquer aproximação." },
    { icon: Database,    label: "Exportação GeoTIFF · KML · SHP",  desc: "Dados processados no FlightHub 2 exportados diretamente para GIS, CAD e ERPs. Ortomosaicos e nuvens de pontos 3D prontos para engenharia e relatórios de compliance." },
    { icon: Activity,    label: "48 min · Transmissão O4 Enterprise", desc: "Autonomia de 48 min com transmissão O4 Enterprise. Cobertura de grandes áreas (400 ha+) em missões contínuas com reconexão automática em caso de perda de sinal." },
  ],
  specs: [
    { group: "Câmera Wide", items: [
      { k: "Sensor",               v: "4/3\" CMOS · 20 MP" },
      { k: "Obturador",            v: "Mecânico (sem rolling shutter)" },
      { k: "Distância focal equiv.",v: "24 mm (EFL)" },
      { k: "Abertura máxima",      v: "f/2.8" },
      { k: "ISO máx.",             v: "6.400 (foto) · 6.400 (vídeo)" },
    ]},
    { group: "Câmeras Tele & Laser", items: [
      { k: "Câmera Tele Média",    v: "48 MP · EFL 70 mm · f/2.8" },
      { k: "Câmera Tele Longo",    v: "48 MP · EFL 168 mm · f/2.8" },
      { k: "Telêmetro laser",      v: "3–1.800 m · ±1 m" },
      { k: "Obstacle sensing",     v: "LiDAR rotativo + radar mmWave" },
    ]},
    { group: "RTK & Voo", items: [
      { k: "RTK horizontal",       v: "±1 cm + 1 ppm" },
      { k: "RTK vertical",         v: "±1,5 cm + 1 ppm" },
      { k: "GNSS",                 v: "GPS + GLONASS + BeiDou + Galileo" },
      { k: "Autonomia",            v: "≈ 48 min (sem vento)" },
      { k: "Transmissão",          v: "O4 Enterprise" },
      { k: "Proteção IP",          v: "IP55" },
      { k: "Resistência ao vento", v: "15 m/s" },
    ]},
  ],
  useCases: [
    { icon: Map,      title: "Topografia e Cadastro Territorial",    desc: "Levantamentos centimétricos sem GCPs. Cadastro de propriedades rurais, mapeamento urbano e planos diretores com precisão cartográfica garantida pelo RTK integrado." },
    { icon: Factory,  title: "Controle de Obras e Mineração",        desc: "Volumetria precisa de pilhas, cavas e taludes. Comparativo entre fases de obra com nuvem de pontos 3D. Atualização semanal automática com FlightHub 2." },
    { icon: TreePine, title: "Monitoramento Ambiental e NDVI",       desc: "Mapeamento de APPs e reservas legais. NDVI por talhão para diagnóstico de lavouras. Relatórios IBAMA gerados automaticamente com dados georreferenciados." },
    { icon: Building2,title: "Inspeção de Infraestrutura Civil",     desc: "Levantamento de pontes, viadutos e estruturas. Modelo 3D para análise de deformações e patologias. Documentação para laudos de engenharia e perícias." },
  ],
  gallery: [
    "https://www-cdn.djiits.com/dps/8d41a4523cf8af9a5b05b45d548ea2dd.jpg",
    "https://www-cdn.djiits.com/dps/b447fe129046c9b474ddd2299a0c2673.jpg",
    "https://www-cdn.djiits.com/dps/56d393ce2c3600833fba064f8a60b78f.jpg",
  ],
  dockCompat: "O M4E é portátil — não é compatível com Dock 3. Para mapeamento autônomo programado, use o Matrice 4D com Dock 3.",
},
// ── DOCK 3 + M4TD ──────────────────────────────────────────────────────────
{
  id: "dock3", name: "DJI Dock 3 + M4TD", nameShort: "Dock 3", accent: "#10b981",
  category: "Drone-in-a-Box · Autonomia 24/7 Sem Operador",
  tagline: "Zero intervenção humana. 24 horas.",
  taglineSub: "Do alarme ao drone no ar em menos de 60 segundos — sem ninguém em campo. Recarga automática e missões ilimitadas.",
  videoSrc: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/98cf1338-bfe4-4596-89db-fb6940a7c4ea.mp4?w=2400&h=1200",
  poster: "https://www-cdn.djiits.com/dps/143282128fe4c8c8ea3b8d1f02b19fef.jpg",
  heroDesc: "Deploy < 60 s · Recarga 27 min · Raio 10 km · IP55 · 4G/5G nativo",
  overview: "O DJI Dock 3 é a espinha dorsal de qualquer operação autônoma real. Uma estação robótica inteligente com ar-condicionado, aquecedores anticongelantes, estação meteorológica integrada (vento, chuva, temperatura) e antenas 4G/5G + RTK de base. O Matrice 4TD vive permanentemente dentro dela — braços fixos para pouso de precisão milimétrica repetido centenas de vezes sem desgaste, hardware de carregamento por contato metálico direto e hélices anticongelantes. Ao receber um alarme via API REST — de câmeras, sensores de intrusão, pluviômetros ou qualquer sistema externo — o Dock verifica o clima, abre automaticamente e lança o M4TD em menos de 60 segundos. Após a missão, o drone retorna, pousa com precisão centimétrica e a bateria vai de 15% a 95% em 27 minutos. Os dados sobem automaticamente para o FlightHub 2 enquanto o drone recarrega. Um único Dock 3 cobre raio de 10 km — 314 km² de área. A SM Company já operou redes de Dock 3 em portos, fazendas e municípios com uptime acima de 99,7%.",
  highlights: [
    { icon: Zap,      value: "60",   unit: "s",    label: "Deploy do alarme ao voo" },
    { icon: Battery,  value: "27",   unit: "min",  label: "Recarga 15%→95%" },
    { icon: Globe,    value: "10",   unit: "km",   label: "Raio operacional" },
    { icon: Activity, value: "99,7", unit: "%",    label: "Uptime garantido" },
  ],
  capabilities: [
    { icon: Zap,       label: "Deploy Automático < 60 Segundos",   desc: "Do alarme disparado no sistema ao drone no ar em menos de 60 s — a qualquer hora, em qualquer clima dentro dos parâmetros operacionais configurados." },
    { icon: CloudRain, label: "Estação Meteorológica Integrada",    desc: "Sensores de vento, chuva, temperatura e umidade no próprio Dock. Missões adiadas automaticamente se condições ultrapassarem limites configurados." },
    { icon: Battery,   label: "Recarga Automática em 27 Minutos",  desc: "Bateria vai de 15% a 95% em 27 minutos por contato metálico direto. Sem baterias sobressalentes, sem logística de campo, missões contínuas ilimitadas." },
    { icon: Globe,     label: "10 km de Raio — 314 km²",           desc: "Um único Dock 3 cobre 314 km². Redes de múltiplos Docks eliminam pontos cegos em instalações de grande porte com cobertura contínua 24/7/365." },
    { icon: Lock,      label: "API REST Aberta — Integração Total", desc: "Conecta com câmeras CFTV, sensores de intrusão, pluviômetros, SCADAs e ERPs via webhook em tempo real. Automação completa sem desenvolvimento proprietário." },
    { icon: Activity,  label: "Health Monitoring Contínuo",         desc: "Monitoramento de bateria, servos, temperatura interna, conectividade e componentes mecânicos. Alertas preditivos antes de falhas — zero surpresas em campo." },
  ],
  specs: [
    { group: "Operação Autônoma", items: [
      { k: "Tempo de deploy",          v: "< 60 segundos do alarme" },
      { k: "Tempo de recarga",         v: "27 min (15% → 95%)" },
      { k: "Raio operacional",         v: "10 km (cobre 314 km²)" },
      { k: "Drones compatíveis",       v: "Matrice 4TD · Matrice 4D" },
      { k: "Missões por dia",          v: "Ilimitadas (recarga automática)" },
      { k: "Latência de vídeo ao vivo",v: "≤ 60 ms (HD streaming)" },
    ]},
    { group: "Proteção & Conectividade", items: [
      { k: "Proteção IP (Dock)",       v: "IP55" },
      { k: "Resistência ao vento",     v: "12 m/s em operação" },
      { k: "Temperatura de operação",  v: "-20°C a +50°C" },
      { k: "Conectividade",            v: "4G LTE / 5G + Wi-Fi + Ethernet" },
      { k: "Alimentação",              v: "AC 100–240V 50/60 Hz" },
      { k: "Estação meteorológica",    v: "Vento · Chuva · Temperatura · Umidade" },
    ]},
    { group: "Software & Integração", items: [
      { k: "Plataforma obrigatória",   v: "DJI FlightHub 2" },
      { k: "API de integração",        v: "REST Webhook — tempo real" },
      { k: "Criptografia",             v: "AES-256 / TLS 1.3" },
      { k: "Conformidade",             v: "LGPD · ISO 27001" },
      { k: "Acesso remoto",            v: "Web · iOS · Android" },
      { k: "Relatórios automáticos",   v: "PDF com IA após cada missão" },
    ]},
  ],
  useCases: [
    { icon: Shield,   title: "Patrulha Perimetral 24/7",         desc: "Rondas programadas a cada 20 min. Resposta a alarmes em < 60 s com câmera térmica ativa. Zero operador local — apenas tecnologia e um agente de segurança no COI." },
    { icon: Factory,  title: "Inspeção Industrial Diária",       desc: "Voos automáticos antes do turno. Laudos de dutos, linhas e equipamentos gerados e enviados por e-mail antes do técnico iniciar o dia de trabalho." },
    { icon: Globe,    title: "Instalações Remotas e Offshore",   desc: "Plataformas, represas, subestações e mineradoras. Gestão completa via FlightHub 2 a centenas de quilômetros — sem deslocamento de equipe para campo." },
    { icon: Radio,    title: "Resposta Automática a Alertas",    desc: "Integrado a sensores, câmeras, pluviômetros e alarmes. O Dock lança o M4TD automaticamente ao primeiro gatilho — humano apenas na decisão final de resposta." },
  ],
  gallery: [
    "https://www-cdn.djiits.com/dps/445980305fd997d74239d466e542444a.jpg",
    "https://www-cdn.djiits.com/dps/3518859e30b80a9a77eec2a4c8ac4906.jpg",
    "https://www-cdn.djiits.com/dps/4b3b9dc6b460e9d91fb660b697cfdeca.jpg",
  ],
  dockCompat: "O Dock 3 é compatível com Matrice 4TD (câmera térmica) e Matrice 4D (mapeamento visual). NÃO é compatível com os modelos portáteis M4T e M4E.",
},
// ── FLIGHTHUB 2 ─────────────────────────────────────────────────────────────
{
  id: "fh2", name: "FlightHub 2", nameShort: "FH2", accent: "#8b5cf6",
  category: "Software Cloud · Gestão de Frotas · Central de Comando",
  tagline: "Central de comando. Em qualquer lugar.",
  taglineSub: "Gerencie 100+ drones simultâneos, agende missões autônomas e receba relatórios gerados por IA — de qualquer dispositivo.",
  videoSrc: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/94dd8984-42ef-4f70-9f0e-336919652223.mp4?w=2400&h=1200",
  poster: "https://www-cdn.djiits.com/dps/951d57cb2c1fb420818cf7cd5c603b68.jpg",
  heroDesc: "100+ drones · 60 ms latência · 5 TB cloud · API REST · AES-256 · Web + iOS + Android",
  overview: "FlightHub 2 é o sistema nervoso de toda operação SM Company. Obrigatório para operar qualquer Dock 3, ele gerencia frotas mistas — drones portáteis (M4T, M4E) e estações autônomas (Dock 3 + M4TD) — em um único painel com latência de 60 ms. O operador acessa via navegador ou app, desenha rotas 3D com waypoints no mapa, agenda missões recorrentes ('todos os dias às 06:00') e monitora telemetria completa de cada aeronave em tempo real. A IA embarcada gera PDFs de relatório automaticamente após cada missão: imagens anotadas, anomalias identificadas com coordenadas GPS, KPIs operacionais e histórico comparativo — tudo enviado por e-mail ao gestor sem qualquer ação manual. O plano de boas-vindas (incluído na compra de qualquer Dock) oferece 20.000 min de streaming e 200 GB de armazenamento. A licença Professional para empresas custa R$ 15.000–20.000/ano por organização. API REST documentada com webhooks permite integração com SCADAs, ERPs e sistemas de alarme externos sem desenvolvimento proprietário.",
  highlights: [
    { icon: Radar,    value: "100",  unit: "+",   label: "Drones simultâneos" },
    { icon: Activity, value: "60",   unit: "ms",  label: "Latência de vídeo" },
    { icon: Database, value: "5",    unit: "TB",  label: "Armazenamento cloud" },
    { icon: Lock,     value: "256",  unit: "bit", label: "Criptografia AES" },
  ],
  capabilities: [
    { icon: Radar,    label: "Mapa Situacional — 100+ Drones",     desc: "Posição GPS, altitude, velocidade, bateria, status e feed de vídeo de cada aeronave em tempo real. Frotas mistas de Docks e portáteis em um painel único." },
    { icon: Map,      label: "Rotas 3D + Missões Recorrentes",      desc: "Waypoints 3D, geofencing dinâmico, zonas restritas e agendamento recorrente. O Dock 3 executa automaticamente sem nenhum clique do operador." },
    { icon: Activity, label: "Telemetria ao Vivo — 60 ms",          desc: "Streaming HD, GPS, IMU, bateria e sensores com latência média de 60 ms. Operador pode assumir o controle da câmera remotamente a qualquer momento." },
    { icon: BarChart3, label: "Relatórios Automáticos por IA",      desc: "PDF completo com imagens anotadas, anomalias identificadas, KPIs operacionais e histórico comparativo — gerado e enviado por e-mail após cada missão." },
    { icon: Database, label: "Cloud Híbrida 5 TB + Exportação",     desc: "Cloud ou on-premise. Exporta GeoTIFF, KML, SHP, CSV. API REST documentada com webhooks para SCADAs, ERPs e alarmes externos." },
    { icon: Lock,     label: "AES-256 · MFA · RBAC · LGPD",        desc: "Criptografia ponta a ponta. MFA obrigatório, RBAC por perfil, log completo de auditoria. Conformidade LGPD / ISO 27001 para operações reguladas e seguros." },
  ],
  specs: [
    { group: "Planos & Preços", items: [
      { k: "Plano Boas-vindas",         v: "20.000 min streaming + 200 GB cloud" },
      { k: "Licença Professional/ano",  v: "R$ 15.000 – R$ 20.000 / organização" },
      { k: "Recarga streaming",         v: "10.000 min ≈ R$ 1.300–1.600" },
      { k: "Compatibilidade hardware",  v: "Dock 3 · M4D · M4TD · M4T · M4E" },
      { k: "SLA de disponibilidade",    v: "99,95%" },
    ]},
    { group: "Desempenho & Segurança", items: [
      { k: "Drones simultâneos",        v: "100+" },
      { k: "Latência de streaming",     v: "≤ 60 ms" },
      { k: "Armazenamento máximo",      v: "5 TB (cloud híbrida)" },
      { k: "Criptografia",              v: "AES-256 / TLS 1.3" },
      { k: "Autenticação",              v: "MFA + SSO (SAML 2.0) + RBAC" },
      { k: "Conformidade",              v: "LGPD · ISO 27001" },
    ]},
    { group: "Integrações & Acesso", items: [
      { k: "API",                       v: "REST Open — documentação pública" },
      { k: "Webhooks",                  v: "Alarmes e eventos em tempo real" },
      { k: "Exportação",                v: "GeoTIFF · KML · SHP · CSV" },
      { k: "Acesso",                    v: "Web · iOS · Android" },
      { k: "Integração Dock 3",         v: "Nativa — missões agendadas automáticas" },
    ]},
  ],
  useCases: [
    { icon: Building2, title: "Central de Comando Unificada",     desc: "Todas as frotas em múltiplas localizações em um dashboard. Perfis de acesso por operador, gerente e analista. Histórico completo de cada voo." },
    { icon: Factory,   title: "Inspeções Programadas Automáticas",desc: "Calendário recorrente: o Dock 3 executa sem clique. Relatório gerado, anotado por IA e enviado ao gestor — antes do técnico iniciar o dia." },
    { icon: Globe,     title: "Integração com Sistemas Existentes",desc: "API REST conecta com SCADAs, ERPs, câmeras CFTV e pluviômetros. Do alarme externo ao relatório final sem intervenção humana." },
    { icon: Shield,    title: "Auditoria & Compliance ANAC",       desc: "Rastreabilidade total: piloto registrado, rota executada, telemetria bruta por voo. Conformidade para auditorias regulatórias, seguros e certificações." },
  ],
  gallery: [
    "https://www-cdn.djiits.com/dps/62ca197c8968de6dc16d0fa4463f1504.jpg",
    "https://www-cdn.djiits.com/dps/8c5abaa1e7e5a90d000404e23e74f149.png",
    "https://www-cdn.djiits.com/dps/6362040444dc2e1d149bfdc1302eff8b.png",
  ],
},
];

// ═══ 5. DADOS — HERO, VÍDEOS, SOLUÇÕES, CASES, GALERIA, ISCAS ════════════════

const HERO_SLIDES = [
  { productId:"m4t",   badge:"Câmera Térmica · Flagrante em Tempo Real",  code:"M4T-THERM-640",
    videoSrc:"https://www-cdn.djiits.com/reactor/assets/_next/static/videos/d6354026-ddbf-4d04-afd2-3cde1d25bc2f.mp4?w=3840&h=2160" },
{ productId:"m4e",   badge:"Mapeamento RTK · Inteligência Geoespacial",  code:"M4E-MAP-4CMOS",
  videoSrc:"https://www-cdn.djiits.com/reactor/assets/_next/static/videos/f665aa43-cc37-4f9c-ba64-9fdc40d626f8.mp4?w=2560&h=1440" },
{ productId:"dock3", badge:"Autonomia 24/7 · Zero Intervenção Humana",   code:"DOCK3-4TD-AUTO",
  videoSrc:"https://www-cdn.djiits.com/reactor/assets/_next/static/videos/98cf1338-bfe4-4596-89db-fb6940a7c4ea.mp4?w=2400&h=1200" },
{ productId:"fh2",   badge:"IA + Cloud · Dados que Geram Decisões",      code:"FH2-CLOUD-PRO",
  videoSrc:"https://www-cdn.djiits.com/reactor/assets/_next/static/videos/94dd8984-42ef-4f70-9f0e-336919652223.mp4?w=2400&h=1200" },
];

const SECTION_VIDEOS = {
  about1: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/0689266e-82a4-4920-86d0-f7e505fdfdac.mp4?w=1184&h=800",
  about2: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/61abb329-e881-40a5-9ec0-0c88a993a744.mp4?w=1184&h=800",
  prod1:  "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/f56e9d40-9dea-46b3-bb6b-430a9d5df8d7.mp4?w=2400&h=1200",
  prod2:  "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/5063deac-ca0c-4e28-847a-ea8346be6e47.mp4?w=2400&h=1200",
  prod3:  "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/6e1b28da-fee6-4e7e-84e2-24f3f1bc9052.mp4?w=2400&h=1200",
  dock1:  "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/47d90972-848e-48c8-a100-0ffc3275ad7a.mp4?w=1386&h=1040",
  sol1:   "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/c488b565-4386-4c29-9d5f-9d641b261e8d.mp4?w=2400&h=1200",
  sol2:   "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/8a3296bf-c121-4db8-97ec-93a40ac78af8.mp4?w=2400&h=1200",
  sol3:   "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/267ea73a-b111-42c8-abc8-3bd23126f31e.mp4?w=2400&h=1200",
  sol4:   "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/77096fea-dd11-4ac7-b5b9-4ff6f3df3b09.mp4?w=2400&h=1200",
  bg1:    "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/66a3982a-0b8e-4085-8dde-888ab91ce763.mp4?w=2400&h=1200",
  bg2:    "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/66b820e2-06fe-4565-8be5-8fd0bfeed149.mp4?w=2400&h=1200",
  cta:    "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/9705bd63-54af-4174-a72d-f3c858e75e5b.mp4?w=2400&h=1200",
};

const SOLUTIONS = [
  { icon:Shield,   title:"Segurança Perimetral",   accent:"#f97316",
    clients:"Mineração · Portos · Presídios · Condomínios",
    metric:"73%", metricLabel:"redução de incidentes",
    videoSrc:SECTION_VIDEOS.sol1,
    desc:"Rondas autônomas 24/7 com câmera térmica 640 px. Dock 3 + M4TD responde a alarmes em < 60 s — identifica intrusos com calor corporal a 1 km sem operador local. Relatório automático por ocorrência no FlightHub 2.",
    tags:["24/7 Autônomo","< 60 s de resposta","Térmica 640 px"],
    benefits:["Resposta automática < 60 s","Integração CFTV via API REST","Relatório automático por ocorrência","73% menos incidentes comprovado"] },
{ icon:Eye,      title:"Monitoramento de Áreas", accent:"#3b82f6",
  clients:"Utilities · Agronegócio · Mineração",
  metric:"500 ha", metricLabel:"cobertos por hora",
  videoSrc:SECTION_VIDEOS.sol2,
  desc:"M4T detecta anomalias térmicas em reservatórios e linhas. M4E mapeia NDVI e relevo com RTK ±1 cm. Relatórios automáticos ao gestor — 500 ha cobertos por hora de voo com dados georreferenciados prontos.",
  tags:["Inspeção Automática","NDVI RTK","Análise Térmica"],
  benefits:["500 ha/h de cobertura","Alerta em < 2 min","Histórico georreferenciado","Integração SCADA"] },
{ icon:Factory,  title:"Inspeção Industrial",    accent:"#10b981",
  clients:"Energia · Petróleo & Gás · Construção Civil",
  metric:"8×", metricLabel:"mais rápido que inspeção manual",
  videoSrc:SECTION_VIDEOS.sol3,
  desc:"Torres, dutos, chaminés e subestações inspecionados sem parar a operação. Termografia com M4T detecta anomalias invisíveis ao olho nu. M4E gera nuvem de pontos 3D RTK para análise estrutural completa.",
  tags:["Nuvem 3D RTK","Termografia","Zero Downtime"],
  benefits:["8× mais rápido","Zero risco para equipes","Laudos automáticos < 2h","Compliance NR-35 / NR-13"] },
{ icon:TreePine, title:"Gestão Ambiental",       accent:"#f59e0b",
  clients:"Órgãos Públicos · Florestais · ESG",
  metric:"2 min", metricLabel:"para detectar foco de incêndio",
  videoSrc:SECTION_VIDEOS.sol4,
  desc:"Sensor VOx do M4T identifica focos com variação de 30 mK. M4E com RTK mapeia APPs e NDVI por talhão. Relatórios IBAMA gerados automaticamente — dados de compliance ambiental e metas ESG em um voo.",
  tags:["NDVI M4E · RTK","Foco Incêndio M4T","IBAMA Compliance"],
  benefits:["Foco detectado em 2 min","NDVI semanal automatizado","Relatórios IBAMA prontos","Dados auditoria ESG"] },
{ icon:Radio,    title:"Resposta a Emergências", accent:"#ef4444",
  clients:"Bombeiros · Defesa Civil · SAMU",
  metric:"<60 s", metricLabel:"do alarme ao drone no ar",
  videoSrc:SECTION_VIDEOS.bg1,
  desc:"Dock 3 integrado a pluviômetros e sensores de risco civil lança o M4TD automaticamente ao alerta. NIR ativo e câmera térmica fornecem visão completa para coordenação de equipes em áreas de escuridão total.",
  tags:["Busca & Resgate SAR","Vídeo Térmico ao COI","Decolagem Automática"],
  benefits:["Drone no ar em < 60 s","Câmera térmica + NIR ativo","Live HD para o COI","Coordenação multi-agência"] },
{ icon:Building2,title:"Smart Cities & Governo",  accent:"#8b5cf6",
  clients:"Municípios · Concessionárias · BID",
  metric:"24/7", metricLabel:"monitoramento autônomo",
  videoSrc:SECTION_VIDEOS.bg2,
  desc:"FlightHub 2 integra via API com centrais de comando urbano (CICC, 190, 192). Monitoramento de tráfego, eventos e ocorrências com dashboard em tempo real e API REST aberta para sistemas municipais.",
  tags:["API Prefeituras","Dashboard CICC","Análise de Tráfego"],
  benefits:["Integração CICC / 190 / 192","Dashboard situacional","API REST open","Conformidade LGPD"] },
];

// WhatsApp — número real
const WA_NUMBER = "5561993711678";
const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const CASES = [
  {
    id:"vistapark", title:"Vista Park Sul", subtitle:"Flagrante ao vivo na primeira demonstração",
    category:"Segurança Perimetral · Condomínio Residencial", accent:"#f97316",
    location:"Brasília, DF", period:"2025 · Demonstração Ativa", logo:"VP", badge:"🏆 Case Real",
    image:"https://www-cdn.djiits.com/dps/bdc1bcf701fa9c7123e8a045408cc208.jpg",
    challenge:"Moradores do Vista Park Sul, Brasília, sofriam com furtos constantes. A vigilância humana não cobria o perímetro nem reagia a tempo. Um morador com experiência em tecnologia soube dos novos drones com câmera térmica e IA, entrou em contato e pediu uma demonstração presencial.",
    solution:"Levamos o Matrice 4T ao condomínio para uma apresentação. No meio da demo, o grupo de WhatsApp dos moradores disparou: havia um furto acontecendo naquele exato momento. Ativamos o drone imediatamente — o que era simulação virou prova ao vivo.",
    highlight:"⚡ Flagrante ao vivo — o drone identificou os furtadores com câmera térmica, zoom e IA de rastreamento. O veículo e os indivíduos foram travados e acompanhados até a chegada das autoridades. Sucesso total na 1ª demonstração.",
    results:[
      { icon:Flame,       label:"Flagrante",   value:"100%",   desc:"Real, ao vivo, na 1ª demo" },
      { icon:Thermometer, label:"Câmera",       value:"Termal", desc:"Identificação no escuro total" },
      { icon:Target,      label:"IA",           value:"Ativa",  desc:"Rastreio e travamento em tempo real" },
      { icon:Clock,       label:"Resposta",     value:"< 2 min",desc:"Do alerta ao drone no ar" },
    ],
    quote:"Estávamos em uma simulação quando o real aconteceu. O drone identificou os furtadores, rastreou o carro e transmitiu tudo ao vivo. A tecnologia se vendeu sozinha.",
    quoteAuthor:"Morador — Vista Park Sul", quoteRole:"Brasília, DF · Demonstração SM Company",
    products:["Matrice 4T","Câmera Térmica VOx 640 px","IA de Rastreamento em Tempo Real"],
  },
{
  id:"fazendacamarao", title:"Fazenda de Camarão", subtitle:"40 tanques. Escuridão total. Perdas eliminadas.",
  category:"Segurança Rural · Aquicultura · Agronegócio", accent:"#10b981",
  location:"Ceará, CE", period:"2025 · Implantação em Curso", logo:"FC", badge:"📍 Case Real",
  image:"https://www-cdn.djiits.com/dps/63481217ecc8f12dace7b0e52da16770.jpg",
  challenge:"Proprietário com 40+ tanques de camarão no Ceará perdia toneladas por mês para roubos. Os criminosos exploravam a imensidão da propriedade e a escuridão total à noite. Quando a patrulha armada chegava, os ladrões já tinham sumido sem deixar rastro.",
  solution:"Implantação de monitoramento autônomo com Matrice 4T e câmera térmica. O drone identifica calor humano no breu total, acompanha os invasores sem que percebam e envia localização em tempo real para a equipe de segurança.",
  highlight:"🎯 O gap crítico — o tempo entre o crime e a chegada da patrulha — foi reduzido a zero. O drone não substitui a patrulha: ele elimina a cegueira operacional que permitia os roubos noite após noite.",
  results:[
    { icon:Eye,         label:"Visibilidade", value:"Noturna", desc:"Térmica no breu absoluto" },
    { icon:Crosshair,   label:"Rastreio",     value:"Real-time",desc:"Localização contínua dos invasores" },
    { icon:Users,       label:"Resposta",     value:"Exata",   desc:"Patrulha chega ao ponto certo" },
    { icon:TrendingDown,label:"Perdas",       value:"→ Zero",  desc:"Toneladas/mês protegidas" },
  ],
  quote:"Quando a patrulha chegava, os ladrões já tinham ido. Com o drone, eles chegam onde o invasor está. A câmera térmica no escuro absoluto foi decisiva.",
  quoteAuthor:"Proprietário — Fazenda de Camarão", quoteRole:"Ceará, CE · Cliente SM Company",
  products:["Matrice 4T","Câmera Térmica VOx 640 px","Monitoramento Autônomo Noturno"],
},
];

const GALLERY = [
  { id:1,  thumb:"https://www-cdn.djiits.com/dps/59107212f2158b087e5647cdee0751a6.jpg",  full:"https://www-cdn.djiits.com/dps/ee14cfbfb676fe008817889d1001cc53.jpg",  title:"M4T em missão noturna",           cat:"Operações" },
{ id:2,  thumb:"https://www-cdn.djiits.com/dps/92f41eddf6b8233ac6cdd8e3b58914f8.jpg",  full:"https://www-cdn.djiits.com/dps/92f41eddf6b8233ac6cdd8e3b58914f8.jpg",  title:"Inspeção termográfica de linha",   cat:"Inspeção" },
{ id:3,  thumb:"https://www-cdn.djiits.com/dps/3518859e30b80a9a77eec2a4c8ac4906.jpg",  full:"https://www-cdn.djiits.com/dps/4b3b9dc6b460e9d91fb660b697cfdeca.jpg",  title:"Dock 3 — ciclo autônomo",          cat:"Equipamentos" },
{ id:4,  thumb:"https://www-cdn.djiits.com/dps/0f7d0ee78e369ae32ae883982d52bafa.jpg",  full:"https://www-cdn.djiits.com/dps/0f7d0ee78e369ae32ae883982d52bafa.jpg",  title:"Sensor térmico VOx 640 px",        cat:"Equipamentos" },
{ id:5,  thumb:"https://www-cdn.djiits.com/dps/56d393ce2c3600833fba064f8a60b78f.jpg",  full:"https://www-cdn.djiits.com/dps/56d393ce2c3600833fba064f8a60b78f.jpg",  title:"Monitoramento rede elétrica",      cat:"Inspeção" },
{ id:6,  thumb:"https://www-cdn.djiits.com/dps/d93d6cff08c6a735850d449b7c3ef5e0.jpg",  full:"https://www-cdn.djiits.com/dps/d93d6cff08c6a735850d449b7c3ef5e0.jpg",  title:"Mapeamento NDVI florestal",        cat:"Ambiental" },
{ id:7,  thumb:"https://www-cdn.djiits.com/dps/72622f7e64a41cc67fc83a1f528578ba.jpg",  full:"https://www-cdn.djiits.com/dps/72622f7e64a41cc67fc83a1f528578ba.jpg",  title:"Segurança portuária 24/7",         cat:"Segurança" },
{ id:8,  thumb:"https://www-cdn.djiits.com/dps/bef1f86adbe9c814b2c2439dfefa9142.jpg",  full:"https://www-cdn.djiits.com/dps/bef1f86adbe9c814b2c2439dfefa9142.jpg",  title:"Operação Defesa Civil — emergência",cat:"Emergências" },
{ id:9,  thumb:"https://www-cdn.djiits.com/dps/62ca197c8968de6dc16d0fa4463f1504.jpg",  full:"https://www-cdn.djiits.com/dps/62ca197c8968de6dc16d0fa4463f1504.jpg",  title:"FlightHub 2 — central de comando", cat:"Software" },
{ id:10, thumb:"https://www-cdn.djiits.com/dps/b732ccbb31fdbaac87ea00155919d588.jpg",  full:"https://www-cdn.djiits.com/dps/b732ccbb31fdbaac87ea00155919d588.jpg",  title:"M4T voo noturno industrial",       cat:"Operações" },
{ id:11, thumb:"https://www-cdn.djiits.com/dps/cf5e1cd6262d2eeecfb7e58f99ca7a1b.jpg",  full:"https://www-cdn.djiits.com/dps/cf5e1cd6262d2eeecfb7e58f99ca7a1b.jpg",  title:"M4E mapeamento florestal",         cat:"Ambiental" },
{ id:12, thumb:"https://www-cdn.djiits.com/dps/e36163cb0e5373866cb8a03f0b0697a0.png",  full:"https://www-cdn.djiits.com/dps/e36163cb0e5373866cb8a03f0b0697a0.png",  title:"Decolagem autônoma Dock 3",        cat:"Operações" },
];
const GALLERY_CATS = ["Todos","Operações","Inspeção","Equipamentos","Ambiental","Segurança","Emergências","Software"];

const ISCAS = [
  { icon:Calculator, tag:"Mais Baixado", tagColor:"#f97316",
    title:"Calculadora de ROI",         subtitle:"Quanto sua operação perde sem drone?",
    desc:"Planilha interativa que calcula a redução de custos ao substituir rondas humanas por monitoramento autônomo 24/7. Usada por gestores de segurança e diretores de operações.",
    cta:"Receber Calculadora Grátis",
    wa:"Olá, vim pelo site da SM Company e quero receber a Calculadora de ROI de drones autônomos.",
    accent:"#f97316", badge:"Planilha Excel",
    highlight:"Mostre ao seu diretor financeiro o payback em < 4 meses" },
{ icon:FileText,   tag:"Para Engenheiros", tagColor:"#3b82f6",
  title:"Guia de Implementação",      subtitle:"Segurança Perimetral 24/7 com Drones",
  desc:"Guia técnico completo: dimensionar cobertura, posicionar Dock 3, integrar com CFTV via API REST e configurar alertas automáticos. Do diagnóstico ao primeiro voo autônomo.",
  cta:"Receber o Guia Técnico",
  wa:"Olá, vim pelo site da SM Company e quero receber o Guia de Implementação de Segurança Perimetral com Drones.",
  accent:"#3b82f6", badge:"PDF 40 páginas",
  highlight:"Da decisão ao primeiro voo autônomo em 7 dias" },
{ icon:Thermometer,tag:"Exclusivo", tagColor:"#10b981",
  title:"Vídeo: Câmera Térmica em Ação", subtitle:"Flagrante real — Vista Park Sul, Brasília",
  desc:"Assista ao vídeo exclusivo de como o Matrice 4T identificou e rastreou furtadores ao vivo na demo no Vista Park Sul. Câmera térmica, zoom e IA — tudo real, sem edição.",
  cta:"Quero Assistir ao Vídeo",
  wa:"Olá, vim pelo site e quero assistir ao vídeo do flagrante real com o Matrice 4T no Vista Park Sul.",
  accent:"#10b981", badge:"Vídeo Real",
  highlight:"A prova mais poderosa que câmera térmica funciona" },
{ icon:BookOpen,   tag:"Alta Conversão", tagColor:"#8b5cf6",
  title:"Checklist de Vulnerabilidade", subtitle:"5 pontos cegos que custam caro",
  desc:"Auditoria rápida: 5 brechas de segurança que criminosos exploram e drones autônomos eliminam. Para síndicos, diretores de segurança e proprietários rurais.",
  cta:"Receber Checklist Grátis",
  wa:"Olá, vim pelo site da SM Company e quero receber o Checklist de Vulnerabilidade de Segurança.",
  accent:"#8b5cf6", badge:"Checklist PDF",
  highlight:"Apresente ao conselho de segurança com dados concretos" },
];

const STATS = [
  { v:"US$700 Bi", label:"Mercado Global 2035",    icon:TrendingUp },
{ v:"45%/ano",   label:"Crescimento do Setor",   icon:Activity },
{ v:"R$2 Bi",    label:"Mercado Brasil/ano",      icon:Globe },
{ v:"8 funções", label:"Por Equipamento",         icon:Zap },
{ v:"< 4 meses", label:"Payback Médio",           icon:Award },
{ v:"24/7",      label:"Autonomia Operacional",   icon:LifeBuoy },
];

const HOW = [
  { n:"01", title:"Diagnóstico Gratuito", icon:Target,
    desc:"Analisamos sua infraestrutura, área de cobertura e objetivos. Proposta técnica com ROI detalhado em até 48h — sem compromisso, sem custo." },
{ n:"02", title:"Engenharia & Planejamento", icon:Map,
  desc:"Rotas autônomas 3D, posicionamento dos Docks, integração de rede e configuração de alarmes no FlightHub 2. Projeto completo antes da instalação." },
{ n:"03", title:"Instalação Especializada", icon:Boxes,
  desc:"Montagem e configuração das estações Dock 3, calibração RTK, integração com CFTV e sistemas existentes, testes de ciclo completo e homologação ANAC." },
{ n:"04", title:"Capacitação & Suporte 24/7", icon:BarChart3,
  desc:"Treinamento de operadores em IA, sensores térmicos e FlightHub 2. Suporte técnico 24/7 pós-implementação incluso no contrato por todo o período." },
];

const FAQ_ITEMS = [
  { q:"Preciso de piloto habilitado para operar o Dock 3?",
    a:"Para missões autônomas com o Dock 3, não é necessário um piloto CANAC em campo — a operação é remotamente supervisionada pelo FlightHub 2. Entretanto, toda operação deve ser homologada junto à ANAC e registrada no sistema SISANT. A SM Company cuida de toda a documentação regulatória como parte da implementação." },
{ q:"Qual é o prazo de retorno do investimento (payback)?",
  a:"Em nossos casos reais, o payback médio ficou em menos de 4 meses. Isso porque o Dock 3 opera 24/7 sem custo de mão de obra adicional, substitui várias rondas de segurança humana e elimina os custos de incidentes não detectados. A Calculadora de ROI que disponibilizamos permite simular o retorno para sua operação específica." },
{ q:"Como o sistema responde a um alarme de intrusão?",
  a:"O FlightHub 2 recebe o alerta via API REST (do CFTV, sensor de perimetro ou qualquer outro sistema), verifica as condições climáticas e aciona o Dock 3. Em menos de 60 segundos o M4TD está no ar sobre o ponto do alarme, transmitindo vídeo térmico + óptico ao vivo para o operador no COI. Tudo automático, sem intervenção humana em campo." },
  { q:"O sistema funciona em caso de chuva ou vento forte?",
    a:"O Dock 3 e o M4TD têm proteção IP55 e operam com ventos de até 12 m/s. A estação meteorológica integrada no Dock monitora condições em tempo real. Se as condições excederem os limites configurados (ex: vento > 12 m/s), a missão é automaticamente adiada e reagendada assim que o clima normalizar." },
    { q:"Quantos Docks preciso para cobrir minha área?",
      a:"Um único Dock 3 cobre um raio de 10 km — equivalente a 314 km². Para instalações maiores ou com múltiplas zonas críticas, trabalhamos com redes de Docks estrategicamente posicionados. No diagnóstico gratuito, nossos engenheiros calculam a quantidade ideal para cobertura total sem pontos cegos." },
{ q:"O que é o FlightHub 2 e preciso pagar a mais por ele?",
  a:"FlightHub 2 é o software de gestão cloud da DJI — obrigatório para operar o Dock 3. A compra de qualquer Dock inclui um plano de boas-vindas (20.000 min de streaming + 200 GB). Para operações corporativas, a licença Professional custa R$ 15.000–20.000/ano por organização. A SM Company inclui consultoria de configuração e treinamento." },
];

// Comparativo: rondas humanas × drone autônomo
const COMPARATIVO = [
  { criterio:"Custo mensal",           humano:"R$ 18.000–35.000 (4 vigilantes 24/7)",  drone:"R$ 3.000–8.000 (Dock 3 + FH2)",   melhor:"drone" },
  { criterio:"Tempo de resposta",      humano:"8–25 minutos",                           drone:"< 60 segundos",                   melhor:"drone" },
{ criterio:"Cobertura noturna",      humano:"Limitada à rota de ronda",               drone:"100% do perímetro, câmera térmica", melhor:"drone" },
{ criterio:"Identificação de alvos", humano:"Depende da iluminação",                  drone:"Térmica 640 px no breu absoluto",  melhor:"drone" },
{ criterio:"Registro de evidências", humano:"Relatório escrito manual",                drone:"Vídeo HD + dados GPS automáticos",  melhor:"drone" },
{ criterio:"Risco para a equipe",    humano:"Alto — confronto físico possível",        drone:"Zero — drone no lugar da pessoa",  melhor:"drone" },
{ criterio:"Disponibilidade 24/7",   humano:"Escala, férias, faltas",                 drone:"Sem feriado, sem doença",           melhor:"drone" },
{ criterio:"Payback",                humano:"Custo recorrente para sempre",            drone:"< 4 meses",                        melhor:"drone" },
];

const INTERVAL_MS = 11000;

// ═══ 6. COMPONENTES UTILITÁRIOS ═══════════════════════════════════════════════

/** Logo SM Company */
const Logo: FC<{ size?: number; white?: boolean }> = ({ size = 32, white = false }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="40" rx="8"
  fill={white ? "rgba(255,255,255,0.07)" : "rgba(249,115,22,0.09)"}
  stroke={white ? "rgba(255,255,255,0.2)" : "#f97316"} strokeWidth="1.2" />
  {/* S */}
  <path d="M10 15.5C10 13 12 11 15 11H18C21 11 23 13 23 15.5C23 17.5 21.5 19 19 19.5L15 20.5C12.5 21 11 22.5 11 24.5C11 27 13 29 16 29H19C22 29 24 27 24 24.5"
  stroke={white ? "#ffffff" : "#f97316"} strokeWidth="2" strokeLinecap="round" fill="none" />
  {/* M */}
  <path d="M26 29V11L30 20L34 11V29" stroke={white ? "rgba(255,255,255,0.5)" : "rgba(249,115,22,0.5)"}
  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

/** FadeUp — animação de entrada */
const FadeUp: FC<{ children: React.ReactNode; delay?: number; className?: string; once?: boolean }> = ({
  children, delay = 0, className = "", once = true,
}) => {
  const ref = useRef(null);
  const visible = useInView(ref, { once, margin: "-40px" });
  return (
    <motion.div ref={ref} className={className}
    initial={{ opacity: 0, y: 24 }}
    animate={visible ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
    </motion.div>
  );
};

/** AnimNum — contador animado */
const AnimNum: FC<{ val: string }> = ({ val }) => {
  const [disp, setDisp] = useState<string | number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  useEffect(() => {
    if (!visible) return;
    const n = parseFloat(val.replace(",", "."));
    if (isNaN(n)) { setDisp(val); return; }
    let cur = 0; const step = n / 45;
    const id = setInterval(() => {
      cur = Math.min(cur + step, n);
      setDisp(n % 1 !== 0 ? cur.toFixed(1).replace(".", ",") : Math.floor(cur).toString());
      if (cur >= n) clearInterval(id);
    }, 28);
      return () => clearInterval(id);
  }, [visible, val]);
  return <span ref={ref}>{disp}</span>;
};

/** SectionTag — pill de label de seção */
const SectionTag: FC<{ label: string; dark?: boolean }> = ({ label, dark = false }) => (
  <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 ${
    dark ? "bg-orange-500/15 border border-orange-500/25" : "bg-orange-50 border border-orange-100"
  }`}>
  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
  <span className={`text-[10px] font-extrabold uppercase tracking-[0.38em] ${
    dark ? "text-orange-400" : "text-orange-600"
  }`}>{label}</span>
  </div>
);

/** BgVideo — vídeo de fundo sem controles */
const BgVideo: FC<{ src: string; poster: string; className?: string; opacity?: number }> = ({
  src, poster, className = "", opacity = 1,
}) => {
  const vRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (vRef.current) {
      vRef.current.load();
      vRef.current.play().catch(() => {});
    }
  }, [src]);
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ opacity }}>
    <video ref={vRef} key={src} className="w-full h-full object-cover" autoPlay muted loop playsInline poster={poster}
    onError={() => { if (vRef.current) vRef.current.style.display = "none"; }}>
    <source src={src} type="video/mp4" />
    </video>
    </div>
  );
};

/** VideoPlayer — player com controles */
const VideoPlayer: FC<{ src: string; poster: string; accent?: string; autoPlay?: boolean; className?: string }> = ({
  src, poster, accent = "#f97316", autoPlay = false, className = "",
}) => {
  const vRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(true);
  const [prog,    setProg]    = useState(0);
  const [err,     setErr]     = useState(false);
  useEffect(() => {
    const v = vRef.current; if (!v) return;
    v.load();
    const onTime = () => setProg(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    v.addEventListener("timeupdate", onTime);
    if (autoPlay) { v.play().then(() => setPlaying(true)).catch(() => setErr(true)); }
    return () => v.removeEventListener("timeupdate", onTime);
  }, [src, autoPlay]);
  const toggle = () => {
    const v = vRef.current; if (!v) return;
    if (playing) v.pause(); else v.play().catch(() => {});
    setPlaying(p => !p);
  };
  if (err) return <img src={poster} alt="" className={`w-full h-full object-cover ${className}`} />;
  return (
    <div className={`relative group/vp overflow-hidden bg-black ${className}`}>
    <video ref={vRef} key={src} className="w-full h-full object-cover" muted={muted} loop playsInline poster={poster}
    onError={() => setErr(true)}>
    <source src={src} type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 opacity-0 group-hover/vp:opacity-100 transition-all duration-300">
    <div className="mb-2 h-[3px] bg-white/15 rounded-full overflow-hidden cursor-pointer"
    onClick={e => { const v = vRef.current; if (!v?.duration) return; const b = e.currentTarget.getBoundingClientRect(); v.currentTime = ((e.clientX - b.left) / b.width) * v.duration; }}>
    <div className="h-full rounded-full" style={{ width: `${prog}%`, background: accent }} />
    </div>
    <div className="flex items-center gap-2">
    <button onClick={toggle} className="w-7 h-7 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
    {playing ? <Pause size={10} className="text-white" /> : <Play size={10} className="text-white ml-0.5" />}
    </button>
    <span className="flex-1" />
    <button onClick={() => { setMuted(m => !m); if (vRef.current) vRef.current.muted = !muted; }}
    className="w-7 h-7 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
    {muted ? <VolumeX size={10} className="text-white" /> : <Volume2 size={10} className="text-white" />}
    </button>
    <button onClick={() => vRef.current?.requestFullscreen()}
    className="w-7 h-7 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
    <Maximize2 size={10} className="text-white" />
    </button>
    </div>
    </div>
    {!playing && (
      <button onClick={toggle} className="absolute inset-0 flex items-center justify-center">
      <div className="w-14 h-14 rounded-full border-2 border-white/40 bg-black/35 flex items-center justify-center hover:scale-110 hover:border-white/70 transition-all">
      <Play size={20} className="text-white ml-1" />
      </div>
      </button>
    )}
    </div>
  );
};

/** Lightbox */
const Lightbox: FC<{ item: typeof GALLERY[number] | null; onClose: () => void }> = ({ item, onClose }) => {
  useEffect(() => { document.body.style.overflow = item ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [item]);
  return (
    <AnimatePresence>
    {item && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
      transition={{ type: "spring", bounce: 0.15 }}
      className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
      <img src={item.full} alt={item.title} className="w-full max-h-[80dvh] object-contain rounded-xl" />
      <div className="mt-3 flex justify-between items-center">
      <div>
      <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest block">{item.cat}</span>
      <span className="text-white font-semibold text-sm">{item.title}</span>
      </div>
      <button onClick={onClose} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
      <X size={14} />
      </button>
      </div>
      </motion.div>
      </motion.div>
    )}
    </AnimatePresence>
  );
};

// ═══ 7. PRODUCT PAGE ══════════════════════════════════════════════════════════
const ProductPage: FC<{ product: Product; onBack: () => void; onContact: () => void }> = ({
  product: p, onBack, onContact,
}) => {
  const [specGroup, setSpecGroup] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState<typeof GALLERY[number] | null>(null);
  const [activeNav, setActiveNav] = useState("overview");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const PNAV = [
    { id: "overview",     label: "Visão Geral" },
    { id: "capabilities", label: "Capacidades" },
    { id: "specs",        label: "Especificações" },
    { id: "usecases",     label: "Aplicações" },
  ];
  const scrollTo = (id: string) => {
    document.getElementById(`prod-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveNav(id);
  };
  const prodGallery = p.gallery.map((src, i) => ({
    id: 100 + i, thumb: src, full: src, title: `${p.name} — Imagem ${i + 1}`, cat: p.category,
  }));

  return (
    <div className="min-h-screen" style={{ background: C.light200 }}>
    <Lightbox item={galleryOpen} onClose={() => setGalleryOpen(null)} />

    {/* ── Navbar produto ── */}
    <div className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${scrolled ? "shadow-xl" : ""}`}
    style={{ background: `${C.navy900}f8`, backdropFilter: "blur(20px)", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
    <button onClick={onBack} className="flex items-center gap-2 group flex-shrink-0">
    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all">
    <ArrowLeft size={14} className="text-white/70" />
    </div>
    <span className="text-[11px] font-semibold text-white/50 hidden sm:block">← Voltar</span>
    </button>
    {/* Nav seções desktop */}
    <div className="hidden md:flex items-center justify-center gap-1 flex-1">
    {PNAV.map(n => (
      <button key={n.id} onClick={() => scrollTo(n.id)}
      className="px-3.5 py-1.5 text-[10px] font-bold rounded-full transition-all"
      style={{ background: activeNav === n.id ? p.accent : "transparent", color: activeNav === n.id ? "#fff" : "rgba(255,255,255,0.4)" }}>
      {n.label}
      </button>
    ))}
    </div>
    <a href={waLink("Olá, quero uma demonstração do " + p.name + " para minha operação.")}
    target="_blank" rel="noopener noreferrer"
    className="flex-shrink-0 flex items-center gap-1.5 px-3.5 sm:px-5 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white rounded-lg transition-all hover:opacity-90"
    style={{ background: p.accent }}>
    <MessageCircle size={11} /> <span className="hidden sm:inline">Demo WA</span><span className="sm:hidden">Demo</span>
    </a>
    </div>
    {/* Nav mobile scroll row */}
    <div className="md:hidden flex gap-2 px-4 pb-2 overflow-x-auto scrollbar-hide">
    {PNAV.map(n => (
      <button key={n.id} onClick={() => scrollTo(n.id)}
      className="flex-shrink-0 px-3 py-1.5 text-[10px] font-bold rounded-full transition-all"
      style={{ background: activeNav === n.id ? p.accent : "rgba(255,255,255,0.07)", color: activeNav === n.id ? "#fff" : "rgba(255,255,255,0.45)" }}>
      {n.label}
      </button>
    ))}
    </div>
    </div>

    {/* ── Hero produto ── */}
    <section className="relative min-h-[100dvh] flex items-end sm:items-center overflow-hidden" style={{ background: C.navy900 }}>
    <div className="absolute inset-0">
    <VideoPlayer src={p.videoSrc} poster={p.poster} accent={p.accent} autoPlay className="w-full h-full" />
    <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.navy900}f2 0%, ${C.navy900}95 55%, ${C.navy900}40 100%)` }} />
    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.navy900} 0%, transparent 60%)` }} />
    </div>
    <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 60% at 80% 40%, ${p.accent}12 0%, transparent 70%)` }} />
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-12 sm:pt-32 sm:pb-24 w-full">
    <div className="max-w-xl">
    <FadeUp><SectionTag label={p.category} dark /></FadeUp>
    <FadeUp delay={0.07}>
    <h1 className="hn uppercase leading-[0.84] text-white tracking-tight mb-3"
    style={{ fontSize: "clamp(52px, 14vw, 108px)" }}>
    {p.nameShort}
    </h1>
    <p className="font-light mb-2 leading-snug" style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(16px,4vw,26px)" }}>{p.tagline}</p>
    <p className="text-[13px] sm:text-[15px] font-light mb-6" style={{ color: "rgba(255,255,255,0.30)" }}>{p.taglineSub}</p>
    </FadeUp>
    <FadeUp delay={0.13}>
    <div className="flex flex-wrap gap-2 mb-7">
    {p.heroDesc.split(" · ").map((item, i) => (
      <span key={i} className="text-[11px] px-3 py-1.5 rounded-full font-medium border"
      style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }}>
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

    {/* ── Highlights barra ── */}
    <div style={{ background: p.accent }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-black/10">
    {p.highlights.map((h, i) => (
      <FadeUp key={i} delay={i * 0.05}>
      <div className="py-5 sm:py-7 px-4 sm:px-8 text-center">
      <h.icon size={15} className="mx-auto mb-1.5 text-white/50" />
      <div className="hn text-3xl sm:text-4xl font-black text-white leading-none mb-1">
      <AnimNum val={h.value.replace(",", ".")} /><span className="text-xl sm:text-2xl ml-1">{h.unit}</span>
      </div>
      <div className="text-[10px] text-white/60 font-medium uppercase tracking-wider">{h.label}</div>
      </div>
      </FadeUp>
    ))}
    </div>
    </div>
    </div>

    {/* ── Overview ── */}
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
      <div className="flex gap-3 p-4 rounded-xl mb-7 border" style={{ background: `${p.accent}08`, borderColor: `${p.accent}25` }}>
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
    <a href={waLink("Olá, quero uma demonstração do " + p.name + ".")} target="_blank" rel="noopener noreferrer"
    className="flex items-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white rounded-xl transition-all hover:opacity-90"
    style={{ background: p.accent }}>
    Demo WhatsApp <ArrowRight size={12} />
    </a>
    </div>
    </FadeUp>
    <FadeUp delay={0.12}>
    <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ aspectRatio: "16/10", maxHeight: "50vw" }}>
    <VideoPlayer src={p.videoSrc} poster={p.poster} accent={p.accent} autoPlay={false} className="w-full h-full" />
    </div>
    </FadeUp>
    </div>
    </div>
    </section>

    {/* ── Capacidades ── */}
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
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{ background: `${p.accent}15` }}>
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

    {/* ── Specs ── */}
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
      style={{ background: specGroup === i ? p.accent : "rgba(255,255,255,0.08)", color: specGroup === i ? "#fff" : "rgba(255,255,255,0.45)" }}>
      {grp.group}
      </button>
    ))}
    </div>
    <AnimatePresence mode="wait">
    <motion.div key={specGroup} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/[0.07]"
    style={{ background: "rgba(255,255,255,0.04)" }}>
    {p.specs[specGroup].items.map((spec, i) => (
      <div key={i} className={`flex items-start justify-between gap-4 px-5 sm:px-7 py-3.5 hover:bg-white/[0.03] transition-colors ${i < p.specs[specGroup].items.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
      <span className="text-[12px] sm:text-[13px] flex-1" style={{ color: "rgba(255,255,255,0.42)" }}>{spec.k}</span>
      <span className="text-[12px] sm:text-[13px] font-semibold text-white text-right">{spec.v}</span>
      </div>
    ))}
    </motion.div>
    </AnimatePresence>
    </div>
    </section>

    {/* ── Use Cases ── */}
    <section id="prod-usecases" className="py-14 sm:py-24" style={{ background: C.light100 }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <FadeUp className="text-center max-w-lg mx-auto mb-12">
    <SectionTag label="Aplicações Reais" />
    <h2 className="hn text-3xl sm:text-5xl font-black uppercase leading-[0.88]" style={{ color: C.ink900 }}>
    Onde o <span style={{ color: p.accent }}>{p.nameShort}</span><br />opera.
    </h2>
    </FadeUp>
    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
    {p.useCases.map((uc, i) => (
      <FadeUp key={i} delay={i * 0.06}>
      <div className="group flex gap-4 p-5 sm:p-6 bg-white rounded-2xl border hover:border-transparent hover:shadow-xl transition-all duration-300"
      style={{ borderColor: C.bLight }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110" style={{ background: `${p.accent}12` }}>
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

    {/* ── Galeria produto ── */}
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
        style={{ aspectRatio: i === 0 ? "4/3" : "1/1" }} onClick={() => setGalleryOpen(img)}>
        <img src={img.thumb} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
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

    {/* ── CTA produto ── */}
    <section className="py-16 sm:py-24 relative overflow-hidden" style={{ background: p.accent }}>
    <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 95% 50%, rgba(255,255,255,0.12) 0%, transparent 55%)" }} />
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
    <button onClick={onBack}
    className="flex items-center justify-center gap-2.5 border-2 border-white/30 hover:border-white text-white px-8 py-4 text-[11px] font-extrabold uppercase tracking-[0.26em] rounded-xl hover:bg-white/10 transition-all">
    <ArrowLeft size={13} /> Outros Produtos
    </button>
    </div>
    </FadeUp>
    </div>
    </section>

    {/* Footer produto */}
    <div className="py-4 text-center text-[11px] border-t" style={{ background: C.navy900, color: "rgba(255,255,255,0.25)", borderColor: "rgba(255,255,255,0.05)" }}>
    <button onClick={onBack} className="hover:text-white/50 transition-colors">← Voltar ao início</button>
    <span className="mx-4 opacity-30">·</span>
    <span>© {new Date().getFullYear()} SM Company · DJI Enterprise</span>
    </div>
    </div>
  );
};

// ═══ 8. PÁGINA PRINCIPAL ══════════════════════════════════════════════════════
export default function Page() {
  const [route,       setRoute]       = useState<string | null>(null);
  const [heroSlide,   setHeroSlide]   = useState(0);
  const [heroProg,    setHeroProg]    = useState(0);
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileMenu,  setMobileMenu]  = useState(false);
  const [activeSol,   setActiveSol]   = useState(0);
  const [activeCase,  setActiveCase]  = useState(0);
  const [galCat,      setGalCat]      = useState("Todos");
  const [lightbox,    setLightbox]    = useState<typeof GALLERY[number] | null>(null);
  const [openFaq,     setOpenFaq]     = useState<number | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroParallax = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const curSlide   = HERO_SLIDES[heroSlide];
  const curProd    = PRODUCTS.find(p => p.id === curSlide.productId)!;
  const goToSlide  = useCallback((i: number) => { setHeroSlide(i); setHeroProg(0); }, []);
  const nextSlide  = useCallback(() => goToSlide((heroSlide + 1) % HERO_SLIDES.length), [heroSlide, goToSlide]);
  const prevSlide  = useCallback(() => goToSlide((heroSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), [heroSlide, goToSlide]);

  useEffect(() => {
    setHeroProg(0);
    const start = Date.now(); let raf: number;
    const tick = () => {
      const p = Math.min(((Date.now() - start) / INTERVAL_MS) * 100, 100);
      setHeroProg(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
      raf = requestAnimationFrame(tick);
      const t = setTimeout(nextSlide, INTERVAL_MS);
      return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [heroSlide, nextSlide]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (mobileMenu || lightbox) ? "hidden" : "";
  }, [mobileMenu, lightbox]);

  const openProduct = (id: string) => { setRoute(id); setMobileMenu(false); };
  const goHome      = () => { setRoute(null); window.scrollTo({ top: 0, behavior: "instant" }); };
  const goContact   = () => { setRoute(null); setTimeout(() => { document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" }); }, 100); };

  const filteredGallery = galCat === "Todos" ? GALLERY : GALLERY.filter(g => g.cat === galCat);

  if (route) {
    const prod = PRODUCTS.find(p => p.id === route);
    if (prod) return <ProductPage product={prod} onBack={goHome} onContact={goContact} />;
  }

  const NAV = [
    { l:"Mercado",   href:"#futuro" },
    { l:"Soluções",  href:"#solucoes" },
    { l:"Produtos",  href:"#produtos" },
    { l:"Cases",     href:"#cases" },
    { l:"Materiais", href:"#iscas" },
    { l:"Contato",   href:"#contato" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: C.light200 }}>
    <Lightbox item={lightbox} onClose={() => setLightbox(null)} />

    {/* ══════════════════════════════════════════════════════════
      NAVBAR
      ══════════════════════════════════════════════════════════ */}
      <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${scrolled ? "border-b shadow-xl" : ""}`}
      style={{ background: scrolled ? `${C.navy900}f5` : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 h-14 sm:h-16">
      <a href="#top" className="flex items-center gap-2.5 group flex-shrink-0" onClick={e => { e.preventDefault(); goHome(); }}>
      <Logo size={32} white />
      <div className="leading-none">
      <div className="text-[15px] sm:text-[17px] font-black tracking-wide hn text-white">SM Company</div>
      <div className="text-[7px] tracking-[0.42em] font-bold uppercase hidden sm:block" style={{ color: "rgba(249,115,22,0.75)" }}>Drone Enterprise</div>
      </div>
      </a>
      <div className="hidden lg:flex items-center gap-5 xl:gap-7">
      {NAV.map(item => (
        <a key={item.l} href={item.href}
        className="text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-orange-400"
        style={{ color: "rgba(255,255,255,0.5)" }}>
        {item.l}
        </a>
      ))}
      </div>
      <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
      <a href={waLink("Olá, vim pelo site da SM Company.")} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-[11px] transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.38)" }}>
      <MessageCircle size={12} /> <span className="hidden xl:inline">(61) 9 9371-1678</span>
      </a>
      <a href="#contato" className="flex items-center gap-2 px-4 sm:px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-white rounded-lg transition-all hover:opacity-90" style={{ background: C.orange }}>
      Proposta
      </a>
      </div>
      <button onClick={() => setMobileMenu(v => !v)} className="lg:hidden w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors flex-shrink-0">
      {mobileMenu ? <X size={20} /> : <Menu size={20} />}
      </button>
      </div>
      {/* Menu mobile */}
      <AnimatePresence>
      {mobileMenu && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
        className="lg:hidden overflow-hidden border-t" style={{ background: C.navy800, borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="px-4 pt-3 pb-5">
        <div className="grid grid-cols-2 gap-1 mb-4">
        {NAV.map(item => (
          <a key={item.l} href={item.href} onClick={() => setMobileMenu(false)}
          className="flex items-center py-3 px-4 text-[12px] font-bold uppercase tracking-wider rounded-xl hover:bg-white/[0.07] transition-all text-white/55 hover:text-white">
          {item.l}
          </a>
        ))}
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <a href={waLink("Olá, vim pelo site da SM Company.")} target="_blank" rel="noopener noreferrer"
        onClick={() => setMobileMenu(false)}
        className="flex items-center justify-center gap-2 rounded-xl py-3.5 text-[11px] font-extrabold uppercase tracking-wider text-white"
        style={{ background: "#25d366" }}>
        <MessageCircle size={13} /> WhatsApp
        </a>
        <a href="#contato" onClick={() => setMobileMenu(false)}
        className="flex items-center justify-center gap-2 text-white text-[11px] font-extrabold uppercase tracking-wider rounded-xl py-3.5"
        style={{ background: C.orange }}>
        Proposta
        </a>
        </div>
        </div>
        </motion.div>
      )}
      </AnimatePresence>
      </nav>

      {/* ══════════════════════════════════════════════════════════
        HERO — carrossel de vídeos
        ══════════════════════════════════════════════════════════ */}
        <section ref={heroRef} id="top" className="relative min-h-[100dvh] flex items-end sm:items-center overflow-hidden" style={{ background: C.navy900 }}>
        <AnimatePresence mode="wait">
        <motion.div key={curProd.id + "-bg"} initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }} className="absolute inset-0" style={{ y: heroParallax }}>
        <video key={curSlide.videoSrc} className="w-full h-full object-cover scale-105" autoPlay muted loop playsInline
        poster={curProd.poster} onError={e => { (e.target as HTMLVideoElement).style.display = "none"; }}>
        <source src={curSlide.videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.navy900} 0%, ${C.navy900}88 55%, ${C.navy900}30 100%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.navy900} 0%, transparent 55%)` }} />
        </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
        <motion.div key={curProd.id + "-glow"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }} className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 70% at 85% 50%, ${curProd.accent}18 0%, transparent 70%)` }} />
        </AnimatePresence>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12 sm:pt-24 sm:pb-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[100dvh] sm:py-24">
        <div className="lg:col-span-7 xl:col-span-8">
        <AnimatePresence mode="wait">
        <motion.div key={curProd.id + "-content"} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        {/* Badge */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full" style={{ background: `${curProd.accent}20`, border: `1px solid ${curProd.accent}35` }}>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: curProd.accent }} />
        <span className="text-[10px] font-extrabold uppercase tracking-[0.35em]" style={{ color: curProd.accent }}>{curSlide.badge}</span>
        </div>
        <span className="text-[10px] font-mono text-white/20">{curSlide.code}</span>
        </div>
        {/* Título */}
        <h1 className="hn uppercase leading-[0.82] tracking-tight text-white mb-3" style={{ fontSize: "clamp(54px,10vw,110px)" }}>
        <span>{curProd.name.split(" ").slice(0, -1).join(" ")}</span><br />
        <span className="hero-ghost">{curProd.name.split(" ").slice(-1)[0]}</span>
        </h1>
        <p className="font-light mb-2" style={{ color: "rgba(255,255,255,0.50)", fontSize: "clamp(15px,3vw,24px)" }}>{curProd.tagline}</p>
        {/* Highlights inline */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 my-6">
        {curProd.highlights.map((h, i) => (
          <div key={i} className="flex items-center gap-2">
          <span className="hn text-2xl font-black text-white">{h.value}
          <span className="text-base ml-0.5" style={{ color: curProd.accent }}>{h.unit}</span>
          </span>
          <span className="text-[10px] text-white/30 leading-tight max-w-[56px]">{h.label}</span>
          </div>
        ))}
        </div>
        {/* CTAs */}
        <div className="flex flex-wrap gap-2.5">
        <button onClick={() => openProduct(curProd.id)}
        className="group flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 text-[11px] font-extrabold uppercase tracking-[0.24em] text-white rounded-xl transition-all hover:opacity-90"
        style={{ background: curProd.accent, boxShadow: `0 8px 32px ${curProd.accent}35` }}>
        Ver Solução Completa <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
        <a href="#futuro"
        className="flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 text-[11px] font-extrabold uppercase tracking-[0.24em] text-white/55 rounded-xl border border-white/10 hover:border-white/25 hover:text-white transition-all">
        Ver Dados de Mercado
        </a>
        </div>
        {/* Progress indicators */}
        <div className="flex items-center gap-4 mt-8">
        {HERO_SLIDES.map((_, i) => {
          const p = PRODUCTS.find(px => px.id === HERO_SLIDES[i].productId)!;
          return (
            <button key={i} onClick={() => goToSlide(i)} className="group flex items-center gap-2">
            <div className="relative overflow-hidden rounded-full h-[2px] bg-white/10 transition-all duration-500" style={{ width: i === heroSlide ? 44 : 14, opacity: i === heroSlide ? 1 : 0.3 }}>
            {i === heroSlide && <div className="absolute inset-y-0 left-0 rounded-full" style={{ background: p.accent, width: `${heroProg}%` }} />}
            </div>
            <span className="text-[9px] font-bold text-white/25 group-hover:text-white/50 transition-colors">0{i + 1}</span>
            </button>
          );
        })}
        <div className="ml-auto flex gap-1">
        <button onClick={prevSlide} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white/50 hover:text-white">
        <ChevronLeft size={14} />
        </button>
        <button onClick={nextSlide} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white/50 hover:text-white">
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
        <motion.div key={curProd.id + "-panel"} initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5 }}>
        <div className="rounded-2xl overflow-hidden border" style={{ background: "rgba(5,9,26,0.88)", backdropFilter: "blur(32px)", borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div>
        <div className="text-[9px] font-extrabold uppercase tracking-[0.4em] mb-0.5" style={{ color: curProd.accent }}>Performance · DaaS</div>
        <div className="text-[8px] font-mono text-white/18">sm_company · {curProd.id} · ativo estratégico</div>
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
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.05)" }}>
          <h.icon size={13} style={{ color: "rgba(255,255,255,0.35)" }} />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/38">{h.label}</span>
          </div>
          <div className="hn text-xl font-black text-white">
          <AnimNum val={h.value.replace(",", ".")} />
          <span className="text-sm ml-0.5" style={{ color: curProd.accent }}>{h.unit}</span>
          </div>
          </div>
          <div className="h-[2px] rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${72 + i * 9}%` }}
          transition={{ duration: 1.2, ease: "circOut", delay: i * 0.1 }}
          className="h-full rounded-full" style={{ background: curProd.accent }} />
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
        <button onClick={() => openProduct(curProd.id)}
        className="w-full py-2.5 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-lg transition-all hover:opacity-90"
        style={{ background: `${curProd.accent}18`, color: curProd.accent, border: `1px solid ${curProd.accent}25` }}>
        Ver Solução Completa <ArrowRight size={10} />
        </button>
        </div>
        </div>
        </motion.div>
        </AnimatePresence>
        </div>
        </div>
        </div>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 2.3 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-20 pointer-events-none">
        <span className="text-[8px] text-white uppercase tracking-[0.44em]">Rolar</span>
        <ChevronDown size={12} className="text-white" />
        </motion.div>
        </section>

        {/* MARQUEE — dados de mercado */}
        <div className="overflow-hidden border-y border-orange-500/20" style={{ background: C.orange }}>
        <div className="flex marquee-run whitespace-nowrap select-none py-3.5">
        {[...STATS, ...STATS, ...STATS].map((s, i) => (
          <div key={i} className="flex items-center gap-2.5 px-6 shrink-0">
          <s.icon size={12} className="text-white/50" />
          <span className="text-[11px] font-black uppercase tracking-wider text-white">{s.v}</span>
          <span className="text-white/60 text-[11px]">{s.label}</span>
          <span className="text-white/28 pl-6">◆</span>
          </div>
        ))}
        </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
          MERCADO — O futuro já começou
          ══════════════════════════════════════════════════════════ */}
          <section id="futuro" className="py-14 sm:py-28 relative overflow-hidden" style={{ background: C.navy900 }}>
          <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(249,115,22,0.09) 0%, transparent 65%)" }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <FadeUp className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.42em] text-orange-400">Dados de Mercado · Drone as a Service (DaaS)</span>
          </div>
          <h2 className="hn text-4xl sm:text-7xl font-black uppercase leading-[0.84] text-white mb-6">
          O futuro das<br />operações<br /><span style={{ color: C.orange }}>já começou.</span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          O mercado global de serviços com drones deve crescer de{" "}
          <strong className="text-white font-semibold">US$ 24 bilhões em 2026</strong> para{" "}
          <strong className="text-orange-400 font-semibold">mais de US$ 700 bilhões até 2035</strong> — crescimento anual superior a 45%.
          No Brasil, o setor já movimenta{" "}
          <strong className="text-white font-semibold">R$ 2 bilhões por ano</strong> e cresce aceleradamente em energia, agro, segurança e logística.
          </p>
          </FadeUp>
          <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {[
            { n:"01", icon:TrendingUp, accent:"#f97316", title:"Não é tendência. É transformação inevitável.", text:"Empresas que adotam drones autônomos hoje constroem vantagem competitiva que leva anos para ser alcançada. As que esperam terão que correr para acompanhar.", stat:"45%/ano", statLabel:"crescimento do setor" },
            { n:"02", icon:Cpu,        accent:"#3b82f6", title:"IA + drone = inteligência operacional.", text:"A próxima evolução não é o drone mais rápido — é o drone mais inteligente. IA embarcada transforma cada voo em análise, cada imagem em dado, cada dado em decisão.", stat:"8 funções", statLabel:"um único equipamento" },
            { n:"03", icon:BarChart3,  accent:"#10b981", title:"Não vendemos hardware. Entregamos ROI.", text:"Nossa abordagem DaaS: o equipamento é o meio. O resultado é redução de custos, aumento de produtividade e decisões baseadas em dados em tempo real.", stat:"< 4 meses", statLabel:"payback médio comprovado" },
          ].map((card, i) => (
            <FadeUp key={i} delay={i * 0.09}>
            <div className="group h-full rounded-2xl p-5 sm:p-8 flex flex-col border transition-all duration-300 hover:-translate-y-1"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="flex items-start justify-between mb-5">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${card.accent}18` }}>
            <card.icon size={22} style={{ color: card.accent }} />
            </div>
            <span className="hn text-5xl font-black leading-none" style={{ color: "rgba(255,255,255,0.05)" }}>{card.n}</span>
            </div>
            <h3 className="text-[15px] font-black text-white mb-3 leading-snug">{card.title}</h3>
            <p className="text-[13px] leading-relaxed flex-1 mb-6" style={{ color: "rgba(255,255,255,0.42)" }}>{card.text}</p>
            <div className="pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="hn text-3xl font-black" style={{ color: card.accent }}>{card.stat}</div>
            <div className="text-[10px] uppercase tracking-wider font-semibold mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{card.statLabel}</div>
            </div>
            </div>
            </FadeUp>
          ))}
          </div>
          {/* Citação de posicionamento */}
          <FadeUp>
          <div className="rounded-2xl p-6 sm:p-10 relative overflow-hidden border" style={{ background: "rgba(249,115,22,0.06)", borderColor: "rgba(249,115,22,0.2)" }}>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hn text-[120px] font-black leading-none pointer-events-none select-none hidden lg:block" style={{ color: "rgba(249,115,22,0.06)" }}>DaaS</div>
          <div className="relative lg:max-w-2xl">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.42em] mb-4" style={{ color: "rgba(249,115,22,0.7)" }}>Nossa Visão · Drone as a Service</div>
          <p className="text-xl sm:text-2xl font-light leading-relaxed text-white mb-6">
          "Hoje já não se trata apenas de voar —<br className="hidden sm:block" />
          trata-se de gerar <strong className="font-black text-orange-400">informação, eficiência</strong><br className="hidden sm:block" />
          e <strong className="font-black text-orange-400">vantagem competitiva.</strong>"
          </p>
          <div className="flex flex-wrap gap-3">
          <a href="#contato" className="inline-flex items-center gap-2.5 px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.26em] text-white rounded-xl transition-all hover:opacity-90" style={{ background: C.orange }}>
          Diagnóstico Gratuito <ArrowRight size={12} />
          </a>
          <a href="#cases" className="inline-flex items-center gap-2.5 px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.26em] rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all">
          Ver Cases Reais
          </a>
          </div>
          </div>
          </div>
          </FadeUp>
          </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
            8 CAPACIDADES
            ══════════════════════════════════════════════════════════ */}
            <section className="py-14 sm:py-24" style={{ background: C.light200 }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <FadeUp className="text-center max-w-2xl mx-auto mb-12">
            <SectionTag label="Múltiplas Capacidades · Um Ativo" />
            <h2 className="hn text-3xl sm:text-6xl font-black uppercase leading-[0.85] mb-4" style={{ color: C.ink900 }}>
            Um equipamento.<br /><span style={{ color: C.orange }}>8 capacidades.</span>
            </h2>
            <p className="text-[14px] leading-relaxed" style={{ color: C.ink400 }}>
            Com plataformas aéreas inteligentes integradas à nossa solução, um único drone pode desempenhar até 8 funções operacionais — com velocidade, precisão e segurança muito superiores aos métodos tradicionais.
            </p>
            </FadeUp>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
            {[
              { n:"01", icon:Shield,      title:"Segurança & Vigilância",     desc:"Patrulha 24/7, intrusos via térmica, resposta automática.",       accent:"#f97316" },
              { n:"02", icon:Factory,     title:"Inspeção Técnica",           desc:"Torres, dutos, subestações — termografia e nuvem 3D.",             accent:"#3b82f6" },
              { n:"03", icon:Map,         title:"Mapeamento & Topografia",    desc:"Ortofotos centimétricos, MDT e análise volumétrica RTK.",           accent:"#10b981" },
              { n:"04", icon:Thermometer, title:"Análise Termográfica",       desc:"Anomalias térmicas invisíveis ao olho nu em tempo real.",           accent:"#f59e0b" },
              { n:"05", icon:TreePine,    title:"Monitoramento Ambiental",    desc:"NDVI, foco de incêndio 30 mK, relatórios IBAMA automáticos.",      accent:"#22c55e" },
              { n:"06", icon:Database,    title:"Dados Geoespaciais & BI",    desc:"GIS, SIG, ERP — dados de campo viram inteligência de negócio.",    accent:"#8b5cf6" },
              { n:"07", icon:Building2,   title:"Gestão de Infraestrutura",   desc:"Pontes, obras, ativos e áreas de risco geológico contínuo.",        accent:"#06b6d4" },
              { n:"08", icon:Radio,       title:"Apoio a Operações Críticas", desc:"SAR, Defesa Civil, incêndios — consciência situacional em tempo real.", accent:"#ef4444" },
            ].map((cap, i) => (
              <FadeUp key={i} delay={(i % 4) * 0.05}>
              <div className="group bg-white rounded-2xl p-4 sm:p-5 h-full border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-transparent cursor-default"
              style={{ boxShadow: C.shadow, borderColor: C.bLighter }}>
              <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110" style={{ background: `${cap.accent}12` }}>
              <cap.icon size={16} style={{ color: cap.accent }} />
              </div>
              <span className="hn text-2xl sm:text-3xl font-black" style={{ color: `${cap.accent}15` }}>{cap.n}</span>
              </div>
              <h3 className="text-[12px] sm:text-[13px] font-black mb-1 leading-snug" style={{ color: C.ink900 }}>{cap.title}</h3>
              <p className="text-[11px] leading-relaxed hidden sm:block" style={{ color: C.ink400 }}>{cap.desc}</p>
              </div>
              </FadeUp>
            ))}
            </div>
            {/* Comparativo antes/depois */}
            <FadeUp>
            <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { label:"Atividades que levavam dias",    after:"realizadas em minutos", icon:Clock, accent:"#f97316" },
              { label:"Equipes expostas a risco",       after:"substituídas por dados remotos", icon:Shield, accent:"#10b981" },
              { label:"Relatórios semanais manuais",    after:"gerados automaticamente por IA", icon:BarChart3, accent:"#3b82f6" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl border" style={{ background: C.light100, borderColor: C.bLight }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.accent}12` }}>
              <item.icon size={18} style={{ color: item.accent }} />
              </div>
              <div>
              <div className="text-[11px] line-through mb-0.5" style={{ color: C.ink400 }}>{item.label}</div>
              <div className="text-[13px] font-bold" style={{ color: C.ink900 }}>{item.after}</div>
              </div>
              </div>
            ))}
            </div>
            </FadeUp>
            </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
              SOBRE NÓS
              ══════════════════════════════════════════════════════════ */}
              <section id="sobre" className="py-14 sm:py-24" style={{ background: C.light100 }}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              <FadeUp>
              <SectionTag label="Nossa Missão · DJI Enterprise Brasil" />
              <h2 className="hn text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[0.88] mb-6" style={{ color: C.ink900 }}>
              Não vendemos drones.<br /><span style={{ color: C.orange }}>Entregamos</span><br />soluções completas.
              </h2>
              <p className="text-base sm:text-lg leading-relaxed mb-4" style={{ color: C.ink500 }}>
              A SM Company acredita que a verdadeira inovação não está no equipamento — está na forma como ele é integrado à operação do cliente. Implementamos o drone como um <strong className="font-semibold text-slate-700">ativo estratégico</strong>, capaz de gerar eficiência operacional, reduzir custos e ampliar a capacidade de monitoramento e análise em tempo real.
              </p>
              <p className="text-[14px] leading-relaxed mb-7" style={{ color: C.ink400 }}>
              Do <strong className="font-semibold text-slate-600">Matrice 4T portátil</strong> para resposta tática imediata, ao <strong className="font-semibold text-slate-600">Dock 3 + Matrice 4TD</strong> para autonomia 100% sem presença humana — tudo gerenciado pelo <strong className="font-semibold text-slate-600">FlightHub 2</strong>. O drone deixa de ser ferramenta e passa a ser multiplicador de inteligência operacional.
              </p>
              <div className="space-y-3 mb-8">
              {[
                { title:"Drone as a Service (DaaS)",    desc:"Não entregamos tecnologia isolada — construímos operações. Hardware, software, integração, treinamento e suporte em modelo de solução completa." },
          { title:"Inteligência Aérea Aplicada",  desc:"IA embarcada transforma cada voo em dados estratégicos: imagens anotadas, anomalias detectadas, relatórios antes do técnico chegar ao trabalho." },
          { title:"Payback comprovado < 4 meses", desc:"Dois cases reais — condomínio em Brasília e fazenda no Ceará — validaram o retorno operacional antes de qualquer investimento em escala." },
              ].map((d, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-xl border" style={{ background: C.light200, borderColor: C.bLight }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(249,115,22,0.15)" }}>
                <Check size={11} style={{ color: C.orange }} />
                </div>
                <div>
                <div className="text-[13px] font-bold mb-0.5" style={{ color: C.ink900 }}>{d.title}</div>
                <div className="text-[12px]" style={{ color: C.ink400 }}>{d.desc}</div>
                </div>
                </div>
              ))}
              </div>
              <a href="#cases" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest group" style={{ color: C.orange }}>
              Ver Cases Reais <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </a>
              </FadeUp>
              <FadeUp delay={0.12}>
              <div className="relative grid grid-cols-2 gap-3" style={{ height: "min(480px, 65vw)" }}>
              <div className="relative overflow-hidden rounded-2xl row-span-2">
              <BgVideo src={SECTION_VIDEOS.about1} poster="https://www-cdn.djiits.com/dps/59107212f2158b087e5647cdee0751a6.jpg" className="" opacity={1} />
              </div>
              <div className="relative overflow-hidden rounded-2xl">
              <BgVideo src={SECTION_VIDEOS.about2} poster="https://www-cdn.djiits.com/dps/62ca197c8968de6dc16d0fa4463f1504.jpg" className="" opacity={1} />
              </div>
              <div className="relative overflow-hidden rounded-2xl">
              <BgVideo src={SECTION_VIDEOS.dock1} poster="https://www-cdn.djiits.com/dps/3518859e30b80a9a77eec2a4c8ac4906.jpg" className="" opacity={1} />
              </div>
              <div className="absolute -bottom-3 -left-3 rounded-2xl p-4 shadow-xl z-10" style={{ background: C.orange }}>
              <div className="hn text-4xl font-black text-white leading-none">DJI</div>
              <div className="text-[9px] font-bold text-white/70 uppercase tracking-wider leading-tight">Parceiro<br />Enterprise</div>
              </div>
              </div>
              </FadeUp>
              </div>
              {/* Pilares do negócio */}
              <div className="mt-16 sm:mt-20">
              <FadeUp className="text-center mb-10">
              <SectionTag label="Como Operamos" />
              <h3 className="hn text-3xl sm:text-4xl font-black uppercase" style={{ color: C.ink900 }}>
              Da portabilidade à <span style={{ color: C.orange }}>autonomia total.</span>
              </h3>
              <p className="mt-4 text-[14px] max-w-lg mx-auto leading-relaxed" style={{ color: C.ink400 }}>
              Três modelos de implantação — escolhidos conforme criticidade da operação, tamanho da área e nível de autonomia desejado.
              </p>
              </FadeUp>
              <div className="grid sm:grid-cols-3 gap-5">
              {[
                { title:"Série 4 Portable", badge:"M4T · M4E", icon:Target, desc:"Operações táticas e rápidas com mobilidade total. Resposta imediata em campo — ideal para inspeções pontuais, mapeamentos e missões SAR com operador presente.", video:SECTION_VIDEOS.prod1, poster:"https://www-cdn.djiits.com/dps/0f7d0ee78e369ae32ae883982d52bafa.jpg" },
                { title:"Dock 3 + Série 4 Dock", badge:"M4D · M4TD", icon:Zap, desc:"Drone-in-a-Box definitivo. 100% autônomo: decolagem, missão, pouso e recarga sem presença humana. Para ambientes severos com operação 24/7/365.", video:SECTION_VIDEOS.prod2, poster:"https://www-cdn.djiits.com/dps/3518859e30b80a9a77eec2a4c8ac4906.jpg" },
                { title:"Gestão via FlightHub 2", badge:"Cloud · IA", icon:Radar, desc:"Central de comando em nuvem para frotas inteiras. Rotas 3D, telemetria ao vivo, relatórios automáticos por IA e API REST aberta para integração.", video:SECTION_VIDEOS.prod3, poster:"https://www-cdn.djiits.com/dps/62ca197c8968de6dc16d0fa4463f1504.jpg" },
              ].map((p, i) => (
                <FadeUp key={i} delay={i * 0.08}>
                <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border hover:border-transparent" style={{ boxShadow: C.shadow, borderColor: C.bLighter }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <BgVideo src={p.video} poster={p.poster} className="" opacity={1} />
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.28)" }} />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold text-white" style={{ background: "rgba(249,115,22,0.85)" }}>{p.badge}</div>
                </div>
                <div className="p-5 sm:p-6">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: C.orangeBg }}>
                <p.icon size={16} style={{ color: C.orange }} />
                </div>
                <h4 className="text-[14px] font-bold mb-2" style={{ color: C.ink900 }}>{p.title}</h4>
                <p className="text-[12px] sm:text-[13px] leading-relaxed" style={{ color: C.ink400 }}>{p.desc}</p>
                </div>
                </div>
                </FadeUp>
              ))}
              </div>
              </div>
              </div>
              </section>

              {/* ══════════════════════════════════════════════════════════
                PRODUTOS
                ══════════════════════════════════════════════════════════ */}
                <section id="produtos" className="py-14 sm:py-24" style={{ background: C.light200 }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
                <div>
                <SectionTag label="Linha Matrice 4 · DJI Enterprise" />
                <h2 className="hn text-4xl sm:text-5xl font-black uppercase leading-[0.88]" style={{ color: C.ink900 }}>
                Tecnologia DJI<br /><span style={{ color: C.orange }}>Enterprise 2025.</span>
                </h2>
                </div>
                <p className="text-[14px] leading-relaxed max-w-xs sm:text-right" style={{ color: C.ink400 }}>Equipamentos de grau industrial integrados à nossa expertise para missões críticas em todo o Brasil.</p>
                </FadeUp>
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                {PRODUCTS.map((prod, i) => (
                  <FadeUp key={prod.id} delay={i * 0.07}>
                  <div className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-400 border border-transparent hover:border-gray-100" style={{ boxShadow: C.shadow }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <video className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" autoPlay muted loop playsInline poster={prod.poster}
                  onError={e => { (e.target as HTMLVideoElement).style.display = "none"; }}>
                  <source src={prod.videoSrc} type="video/mp4" />
                  </video>
                  <img src={prod.poster} alt={prod.name} className="absolute inset-0 w-full h-full object-cover -z-10" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 50%)" }} />
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-bold text-white border border-white/20 backdrop-blur-sm" style={{ background: `${prod.accent}cc` }}>
                  {prod.category}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 flex-wrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {prod.highlights.map((h, hi) => (
                    <div key={hi} className="flex items-center gap-1.5 bg-black/55 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/10">
                    <span className="hn text-[13px] font-black text-white">{h.value}<span className="text-[10px]" style={{ color: prod.accent }}>{h.unit}</span></span>
                    <span className="text-[9px] text-white/45">{h.label}</span>
                    </div>
                  ))}
                  </div>
                  </div>
                  <div className="p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                  <h3 className="hn text-xl sm:text-2xl font-black uppercase tracking-tight mb-0.5" style={{ color: C.ink900 }}>{prod.name}</h3>
                  <p className="text-[11px] italic" style={{ color: C.ink400 }}>{prod.tagline}</p>
                  </div>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${prod.accent}15` }}>
                  <ArrowUpRight size={14} style={{ color: prod.accent }} />
                  </div>
                  </div>
                  <p className="text-[12px] leading-relaxed mb-4 line-clamp-2" style={{ color: C.ink400 }}>{prod.taglineSub}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                  {prod.capabilities.slice(0, 3).map((c, ci) => (
                    <span key={ci} className="text-[10px] px-2.5 py-1 rounded-full font-medium" style={{ background: `${prod.accent}10`, color: prod.accent }}>
                    {c.label.split(" ").slice(0, 3).join(" ")}
                    </span>
                  ))}
                  </div>
                  <div className="flex gap-2">
                  <button onClick={() => openProduct(prod.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white rounded-xl transition-all hover:opacity-90"
                  style={{ background: prod.accent }}>
                  Ver Produto <ArrowRight size={11} />
                  </button>
                  <a href={waLink("Olá, quero uma demo do " + prod.name)} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 px-3.5 py-3 text-[10px] font-bold border-2 rounded-xl hover:bg-gray-50 transition-all"
                  style={{ borderColor: C.bLight, color: C.ink500 }}>
                  <MessageCircle size={12} /> Demo
                  </a>
                  </div>
                  </div>
                  </div>
                  </FadeUp>
                ))}
                </div>

                {/* Tabela comparativa */}
                <FadeUp delay={0.1} className="mt-12">
                <div className="rounded-2xl overflow-hidden border" style={{ borderColor: C.bLight }}>
                <div className="px-5 sm:px-6 py-4 border-b flex items-center gap-3" style={{ background: C.navy800, borderColor: "rgba(255,255,255,0.06)" }}>
                <Layers2 size={16} className="text-orange-400" />
                <span className="text-[12px] font-bold text-white uppercase tracking-widest">Comparativo Rápido — Série Matrice 4</span>
                </div>
                <div className="overflow-x-auto">
                <table className="w-full text-[11px] sm:text-[12px]" style={{ background: C.light100 }}>
                <thead>
                <tr className="border-b" style={{ borderColor: C.bLight }}>
                <th className="text-left px-4 sm:px-5 py-3 font-bold" style={{ color: C.ink500 }}>Recurso</th>
                {["M4T","M4E","M4D / M4TD"].map(h => (
                  <th key={h} className="px-4 sm:px-5 py-3 font-bold text-center" style={{ color: C.ink900 }}>{h}</th>
                ))}
                </tr>
                </thead>
                <tbody>
                {[
                  ["Câmera Térmica 640 px","✓ VOx LWIR","✗","✓ VOx LWIR"],
                  ["Night Scene f/1.7","✓","✗","✓ (M4TD)"],
          ["Obturador Mecânico","✗","✓ 4/3 CMOS","✗"],
          ["RTK ±1 cm","✗","✓ nativo","✓ (M4D)"],
          ["Telêmetro Laser 1.800 m","✓","✓","✓"],
          ["Compatible com Dock 3","✗","✗","✓ nativo"],
          ["Autonomia",">48 min",">48 min","~48 min"],
          ["Uso principal","Segurança · SAR","Mapeamento · Topografia","Operação autônoma 24/7"],
                ].map((row, i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? "" : ""}`} style={{ borderColor: C.bLighter }}>
                  {row.map((cell, j) => (
                    <td key={j} className={`px-4 sm:px-5 py-3 ${j === 0 ? "font-semibold text-left" : "text-center"}`}
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
                </div>
                </section>

                {/* ══════════════════════════════════════════════════════════
                  SOLUÇÕES
                  ══════════════════════════════════════════════════════════ */}
                  <section id="solucoes" className="py-14 sm:py-24 relative overflow-hidden" style={{ background: C.navy800 }}>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249,115,22,0.07) 0%, transparent 60%)" }} />
                  <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
                  <div>
                  <SectionTag label="O Que Fazemos" dark />
                  <h2 className="hn text-4xl sm:text-5xl font-black uppercase leading-[0.88] text-white">
                  Soluções para<br /><span style={{ color: C.orange }}>cada missão.</span>
                  </h2>
                  </div>
                  <p className="text-[14px] leading-relaxed max-w-xs sm:text-right" style={{ color: "rgba(255,255,255,0.38)" }}>
                  Soluções modulares adaptadas ao setor, escala e criticidade da sua operação.
                  </p>
                  </FadeUp>
                  {/* Mobile pills */}
                  <div className="lg:hidden flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-4">
                  {SOLUTIONS.map((s, i) => (
                    <button key={i} onClick={() => setActiveSol(i)}
                    className="flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] font-bold transition-all border"
                    style={{ background: activeSol === i ? s.accent : "rgba(255,255,255,0.06)", color: activeSol === i ? "#fff" : "rgba(255,255,255,0.5)", borderColor: activeSol === i ? s.accent : "rgba(255,255,255,0.1)" }}>
                    <s.icon size={12} /> {s.title}
                    </button>
                  ))}
                  </div>
                  <div className="grid lg:grid-cols-12 gap-5 sm:gap-6">
                  {/* Desktop list */}
                  <div className="hidden lg:block lg:col-span-4 space-y-1.5">
                  {SOLUTIONS.map((s, i) => (
                    <FadeUp key={i} delay={i * 0.04}>
                    <button onClick={() => setActiveSol(i)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all border"
                    style={{ background: activeSol === i ? `${s.accent}18` : "rgba(255,255,255,0.04)", borderColor: activeSol === i ? `${s.accent}35` : "transparent" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: activeSol === i ? `${s.accent}22` : "rgba(255,255,255,0.07)" }}>
                    <s.icon size={16} style={{ color: activeSol === i ? s.accent : "rgba(255,255,255,0.38)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-bold truncate" style={{ color: activeSol === i ? "#fff" : "rgba(255,255,255,0.52)" }}>{s.title}</div>
                    <div className="text-[10px] truncate mt-0.5" style={{ color: "rgba(255,255,255,0.22)" }}>{s.clients}</div>
                    </div>
                    {activeSol === i && <ChevronRight size={13} style={{ color: s.accent }} className="shrink-0" />}
                    </button>
                    </FadeUp>
                  ))}
                  </div>
                  {/* Painel detalhe */}
                  <div className="lg:col-span-8">
                  <AnimatePresence mode="wait">
                  <motion.div key={activeSol} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                  {(() => {
                    const s = SOLUTIONS[activeSol];
                    return (
                      <div className="rounded-2xl overflow-hidden relative border" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)" }}>
                      <div className="relative overflow-hidden" style={{ aspectRatio: "16/8" }}>
                      <BgVideo src={s.videoSrc} poster="https://www-cdn.djiits.com/dps/ee14cfbfb676fe008817889d1001cc53.jpg" className="" opacity={0.6} />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(8,13,36,0.98) 100%)" }} />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                      <div className="flex items-end gap-4 flex-wrap">
                      <div>
                      <div className="text-[9px] font-extrabold uppercase tracking-[0.4em] mb-1" style={{ color: s.accent }}>{s.clients}</div>
                      <h3 className="hn text-3xl sm:text-4xl font-black uppercase text-white">{s.title}</h3>
                      </div>
                      <div className="ml-auto text-right">
                      <div className="hn text-4xl sm:text-5xl font-black" style={{ color: s.accent }}>{s.metric}</div>
                      <div className="text-[10px] uppercase tracking-wider text-white/30">{s.metricLabel}</div>
                      </div>
                      </div>
                      </div>
                      </div>
                      <div className="p-5 sm:p-8">
                      <p className="text-[14px] sm:text-[15px] leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.52)" }}>{s.desc}</p>
                      <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                      {s.benefits.map((b, bi) => (
                        <div key={bi} className="flex items-center gap-3 text-[13px]" style={{ color: "rgba(255,255,255,0.62)" }}>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${s.accent}20` }}>
                        <Check size={11} style={{ color: s.accent }} />
                        </div>
                        {b}
                        </div>
                      ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-7">
                      {s.tags.map((t, ti) => (
                        <span key={ti} className="px-3 py-1.5 rounded-full text-[10px] font-bold" style={{ background: `${s.accent}15`, color: s.accent }}>{t}</span>
                      ))}
                      </div>
                      <a href={waLink("Olá, vim pelo site e tenho interesse na solução: " + s.title + ". Gostaria de saber mais.")}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.28em] text-white group">
                      Solicitar Proposta <ArrowRight size={12} style={{ color: s.accent }} className="group-hover:translate-x-0.5 transition-transform" />
                      </a>
                      </div>
                      </div>
                    );
                  })()}
                  </motion.div>
                  </AnimatePresence>
                  </div>
                  </div>
                  </div>
                  </section>

                  {/* Faixa de urgência */}
                  <div className="relative overflow-hidden py-8 sm:py-10 border-y" style={{ background: C.navy900, borderColor: "rgba(255,255,255,0.05)" }}>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 100% at 0% 50%, rgba(249,115,22,0.07) 0%, transparent 60%)" }} />
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
                  <div className="flex-1">
                  <div className="text-[9px] font-extrabold uppercase tracking-[0.45em] mb-2 text-orange-400">Adoção acelerada · dados de mercado</div>
                  <h3 className="hn text-2xl sm:text-4xl font-black uppercase text-white leading-tight">
                  Empresas que adotam hoje ganham vantagem real.<br />
                  <span style={{ color: C.orange }}>As que esperam, correm para alcançar.</span>
                  </h3>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                  <div className="text-center px-5 py-4 rounded-2xl" style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)" }}>
                  <div className="hn text-3xl font-black text-orange-400">45%</div>
                  <div className="text-[9px] text-white/35 uppercase tracking-wider">crescimento/ano</div>
                  </div>
                  <div className="text-center px-5 py-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="hn text-3xl font-black text-white">2035</div>
                  <div className="text-[9px] text-white/35 uppercase tracking-wider">US$700 Bi</div>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>

                  {/* ══════════════════════════════════════════════════════════
                    CASES
                    ══════════════════════════════════════════════════════════ */}
                    <section id="cases" className="py-14 sm:py-24" style={{ background: C.light100 }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
                    <div>
                    <SectionTag label="Cases de Sucesso Reais" />
                    <h2 className="hn text-4xl sm:text-5xl font-black uppercase leading-[0.88]" style={{ color: C.ink900 }}>
                    Câmera térmica.<br /><span style={{ color: C.orange }}>Prova real.</span>
                    </h2>
                    </div>
                    <p className="text-[14px] max-w-xs sm:text-right" style={{ color: C.ink400 }}>Não são demos montadas. São situações reais em que o drone provou seu valor em campo.</p>
                    </FadeUp>
                    {/* Tabs */}
                    <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
                    {CASES.map((c, i) => (
                      <button key={i} onClick={() => setActiveCase(i)}
                      className="shrink-0 flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all"
                      style={{ background: activeCase === i ? c.accent : C.light200, color: activeCase === i ? "#fff" : C.ink400, border: `1.5px solid ${activeCase === i ? c.accent : C.bLight}` }}>
                      <span>{c.badge}</span>
                      <span className="hidden sm:inline">{c.title}</span>
                      </button>
                    ))}
                    </div>
                    <AnimatePresence mode="wait">
                    {CASES.map((c, i) => activeCase === i && (
                      <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                      <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
                      {/* Esquerda */}
                      <div className="flex flex-col gap-5">
                      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/11" }}>
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)" }} />
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20" style={{ background: `${c.accent}cc` }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-white">{c.badge}</span>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                      <MapPin size={9} className="text-white/50" />
                      <span className="text-[10px] text-white/65">{c.location}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="text-[9px] font-extrabold uppercase tracking-[0.4em] block mb-1" style={{ color: c.accent }}>{c.category}</span>
                      <h3 className="hn text-3xl sm:text-4xl font-black uppercase text-white mb-0.5">{c.title}</h3>
                      <p className="text-sm text-white/55">{c.subtitle}</p>
                      </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                      {c.results.map((r, ri) => (
                        <div key={ri} className="rounded-xl p-4 sm:p-5 border" style={{ background: C.light200, borderColor: C.bLight }}>
                        <r.icon size={14} className="mb-2" style={{ color: c.accent }} />
                        <div className="hn text-2xl sm:text-3xl font-black mb-0.5" style={{ color: C.ink900 }}>{r.value}</div>
                        <div className="text-[11px] font-bold" style={{ color: C.ink700 }}>{r.label}</div>
                        <div className="text-[10px] mt-0.5" style={{ color: C.ink400 }}>{r.desc}</div>
                        </div>
                      ))}
                      </div>
                      </div>
                      {/* Direita */}
                      <div className="flex flex-col gap-5">
                      <div className="rounded-2xl p-6 sm:p-8 flex-1" style={{ background: C.light200, border: `1px solid ${C.bLight}` }}>
                      {[{ label:"O Desafio", emoji:"⚡", text:c.challenge }, { label:"A Solução", emoji:"✅", text:c.solution }].map((block, bi) => (
                        <div key={bi} className={bi > 0 ? "mt-6 pt-6 border-t" : ""} style={{ borderColor: C.bLight }}>
                        <div className="flex items-center gap-2.5 mb-3">
                        <span className="text-sm">{block.emoji}</span>
                        <span className="text-[10px] font-extrabold uppercase tracking-[0.32em]" style={{ color: C.ink400 }}>{block.label}</span>
                        </div>
                        <p className="text-[13px] sm:text-[14px] leading-relaxed" style={{ color: C.ink500 }}>{block.text}</p>
                        </div>
                      ))}
                      <div className="mt-6 pt-5 border-t rounded-xl p-4 -mx-1" style={{ borderColor: C.bLight, background: `${c.accent}08`, border: `1.5px solid ${c.accent}22` }}>
                      <p className="text-[13px] leading-relaxed font-semibold" style={{ color: C.ink700 }}>{c.highlight}</p>
                      </div>
                      <div className="mt-5 pt-5 border-t" style={{ borderColor: C.bLight }}>
                      <div className="text-[10px] font-extrabold uppercase tracking-[0.3em] mb-3" style={{ color: C.ink400 }}>Tecnologia Aplicada</div>
                      <div className="flex flex-wrap gap-2">
                      {c.products.map((prod, pi) => (
                        <span key={pi} className="text-[11px] font-semibold px-3 py-1.5 rounded-full" style={{ background: `${c.accent}10`, color: c.accent }}>{prod}</span>
                      ))}
                      </div>
                      </div>
                      </div>
                      <div className="rounded-2xl p-6 sm:p-7" style={{ background: `${c.accent}07`, border: `1px solid ${c.accent}20` }}>
                      <Quote size={20} className="mb-3" style={{ color: `${c.accent}35` }} />
                      <p className="text-[14px] sm:text-[15px] leading-relaxed italic mb-5" style={{ color: C.ink700 }}>"{c.quote}"</p>
                      <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-[11px] text-white shrink-0" style={{ background: c.accent }}>
                      {c.quoteAuthor.split(" ").slice(-1)[0].slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                      <div className="text-[13px] font-bold" style={{ color: C.ink900 }}>{c.quoteAuthor}</div>
                      <div className="text-[11px]" style={{ color: C.ink400 }}>{c.quoteRole}</div>
                      </div>
                      </div>
                      <a href={waLink("Olá, vi o case " + c.title + " no site e quero saber como o drone pode funcionar na minha operação.")}
                      target="_blank" rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider text-white transition-all hover:opacity-90"
                      style={{ background: "#25d366" }}>
                      <MessageCircle size={12} /> Quero igual
                      </a>
                      </div>
                      </div>
                      </div>
                      </div>
                      </motion.div>
                    ))}
                    </AnimatePresence>
                    </div>
                    </section>

                    {/* ══════════════════════════════════════════════════════════
                      COMPARATIVO — Rondas Humanas vs Drone Autônomo
                      ══════════════════════════════════════════════════════════ */}
                      <section className="py-14 sm:py-24" style={{ background: C.navy800 }}>
                      <div className="max-w-7xl mx-auto px-4 sm:px-6">
                      <FadeUp className="text-center max-w-2xl mx-auto mb-12">
                      <SectionTag label="Comparativo Operacional" dark />
                      <h2 className="hn text-3xl sm:text-5xl font-black uppercase leading-[0.88] text-white">
                      Rondas humanas<br /><span style={{ color: C.orange }}>vs drone autônomo.</span>
                      </h2>
                      <p className="mt-4 text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                      Os números falam por si. A mesma cobertura, com mais eficiência, menos custo e zero risco para equipes.
                      </p>
                      </FadeUp>
                      <FadeUp>
                      <div className="rounded-2xl overflow-hidden border border-white/[0.07]">
                      {/* Header */}
                      <div className="grid grid-cols-3 text-center" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div className="py-4 px-4 border-r text-[11px] font-bold text-white/40 uppercase tracking-widest" style={{ borderColor: "rgba(255,255,255,0.07)" }}>Critério</div>
                      <div className="py-4 px-4 border-r flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest" style={{ borderColor: "rgba(255,255,255,0.07)", color: "#ef4444" }}>
                      <Users size={13} /> Ronda Humana
                      </div>
                      <div className="py-4 px-4 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: "#10b981" }}>
                      <Radar size={13} /> Drone Autônomo
                      </div>
                      </div>
                      {COMPARATIVO.map((row, i) => (
                        <div key={i} className={`grid grid-cols-3 border-t text-[12px] sm:text-[13px]`} style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                        <div className="py-4 px-4 sm:px-5 font-semibold border-r" style={{ color: "rgba(255,255,255,0.55)", borderColor: "rgba(255,255,255,0.05)" }}>{row.criterio}</div>
                        <div className="py-4 px-4 sm:px-5 text-center border-r" style={{ color: "#ef4444", borderColor: "rgba(255,255,255,0.05)", background: "rgba(239,68,68,0.04)" }}>{row.humano}</div>
                        <div className="py-4 px-4 sm:px-5 text-center font-bold" style={{ color: "#10b981", background: "rgba(16,185,129,0.06)" }}>{row.drone}</div>
                        </div>
                      ))}
                      </div>
                      </FadeUp>
                      </div>
                      </section>

                      {/* ══════════════════════════════════════════════════════════
                        COMO FUNCIONA
                        ══════════════════════════════════════════════════════════ */}
                        <section className="py-14 sm:py-24" style={{ background: C.light200 }}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <FadeUp className="text-center max-w-xl mx-auto mb-12">
                        <SectionTag label="Como Funciona" />
                        <h2 className="hn text-3xl sm:text-5xl font-black uppercase leading-[0.88]" style={{ color: C.ink900 }}>
                        Do diagnóstico à <span style={{ color: C.orange }}>operação plena.</span>
                        </h2>
                        <p className="mt-5 text-[14px] leading-relaxed" style={{ color: C.ink400 }}>
                        4 etapas turnkey — do diagnóstico ao primeiro voo autônomo, acompanhadas pelos nossos engenheiros do início ao fim.
                        </p>
                        </FadeUp>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {HOW.map((step, i) => (
                          <FadeUp key={i} delay={i * 0.07}>
                          <div className="group bg-white rounded-2xl p-5 sm:p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border hover:border-orange-100" style={{ boxShadow: C.shadow, borderColor: C.bLighter }}>
                          <div className="flex items-start justify-between mb-5">
                          <span className="hn text-5xl sm:text-6xl font-black leading-none" style={{ color: `${C.orange}18` }}>{step.n}</span>
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all group-hover:bg-orange-100" style={{ background: C.orangeBg }}>
                          <step.icon size={18} style={{ color: C.orange }} />
                          </div>
                          </div>
                          <h3 className="text-[14px] sm:text-[15px] font-bold mb-2 group-hover:text-orange-600 transition-colors" style={{ color: C.ink900 }}>{step.title}</h3>
                          <p className="text-[12px] sm:text-[13px] leading-relaxed" style={{ color: C.ink400 }}>{step.desc}</p>
                          </div>
                          </FadeUp>
                        ))}
                        </div>
                        </div>
                        </section>

                        {/* ══════════════════════════════════════════════════════════
                          FAQ
                          ══════════════════════════════════════════════════════════ */}
                          <section className="py-14 sm:py-24" style={{ background: C.light100 }}>
                          <div className="max-w-4xl mx-auto px-4 sm:px-6">
                          <FadeUp className="text-center mb-12">
                          <SectionTag label="Perguntas Frequentes" />
                          <h2 className="hn text-3xl sm:text-5xl font-black uppercase leading-[0.88]" style={{ color: C.ink900 }}>
                          Dúvidas comuns<br /><span style={{ color: C.orange }}>respondidas.</span>
                          </h2>
                          </FadeUp>
                          <div className="space-y-3">
                          {FAQ_ITEMS.map((item, i) => (
                            <FadeUp key={i} delay={i * 0.04}>
                            <div className="rounded-2xl overflow-hidden border transition-all" style={{ borderColor: openFaq === i ? `${C.orange}40` : C.bLight, background: C.light100 }}>
                            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className="w-full flex items-center gap-4 p-5 sm:p-6 text-left group">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all" style={{ background: openFaq === i ? C.orangeBg : C.light200 }}>
                            {openFaq === i
                              ? <Minus size={14} style={{ color: C.orange }} />
                              : <Plus size={14} style={{ color: C.ink400 }} />}
                              </div>
                              <span className="flex-1 text-[14px] font-semibold text-left leading-snug" style={{ color: C.ink900 }}>{item.q}</span>
                              <ChevronDown size={16} className={`shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} style={{ color: C.ink400 }} />
                              </button>
                              <AnimatePresence>
                              {openFaq === i && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }} className="overflow-hidden">
                                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                                <div className="ml-12 pl-0.5 border-l-2 pl-4" style={{ borderColor: `${C.orange}30` }}>
                                <p className="text-[13px] sm:text-[14px] leading-relaxed" style={{ color: C.ink500 }}>{item.a}</p>
                                </div>
                                </div>
                                </motion.div>
                              )}
                              </AnimatePresence>
                              </div>
                              </FadeUp>
                          ))}
                          </div>
                          <FadeUp className="text-center mt-10">
                          <p className="text-[14px] mb-4" style={{ color: C.ink400 }}>Tem mais alguma dúvida?</p>
                          <a href={waLink("Olá, tenho uma dúvida sobre os drones da SM Company.")} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-[11px] font-extrabold uppercase tracking-[0.26em] text-white transition-all hover:opacity-90"
                          style={{ background: "#25d366" }}>
                          <MessageCircle size={14} /> Perguntar no WhatsApp
                          </a>
                          </FadeUp>
                          </div>
                          </section>

                          {/* ══════════════════════════════════════════════════════════
                            GALERIA
                            ══════════════════════════════════════════════════════════ */}
                            <section id="galeria" className="py-14 sm:py-24" style={{ background: C.light200 }}>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-10">
                            <div>
                            <SectionTag label="Galeria" />
                            <h2 className="hn text-4xl sm:text-5xl font-black uppercase leading-[0.88]" style={{ color: C.ink900 }}>
                            Operações em <span style={{ color: C.orange }}>campo.</span>
                            </h2>
                            </div>
                            </FadeUp>
                            <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
                            {GALLERY_CATS.map(cat => (
                              <button key={cat} onClick={() => setGalCat(cat)}
                              className="shrink-0 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] transition-all"
                              style={{ background: galCat === cat ? C.orange : C.light100, color: galCat === cat ? "#fff" : C.ink400, border: `1px solid ${galCat === cat ? C.orange : C.bLight}` }}>
                              {cat}
                              </button>
                            ))}
                            </div>
                            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                            <AnimatePresence>
                            {(galCat === "Todos" ? GALLERY : GALLERY.filter(g => g.cat === galCat)).map(img => (
                              <motion.div key={img.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
                              transition={{ duration: 0.3 }}
                              className="group relative overflow-hidden rounded-xl cursor-pointer hover:shadow-lg transition-all"
                              style={{ aspectRatio: "1/1" }} onClick={() => setLightbox(img)}>
                              <img src={img.thumb} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                              <ZoomIn size={16} className="text-white" />
                              </div>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all bg-gradient-to-t from-black/80 to-transparent">
                              <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest block">{img.cat}</span>
                              <span className="text-[11px] font-semibold text-white line-clamp-1">{img.title}</span>
                              </div>
                              </motion.div>
                            ))}
                            </AnimatePresence>
                            </motion.div>
                            </div>
                            </section>

                            {/* ══════════════════════════════════════════════════════════
                              CTA — Não fique para trás
                              ══════════════════════════════════════════════════════════ */}
                              <section className="relative py-16 sm:py-28 overflow-hidden" style={{ background: C.navy950 }}>
                              <BgVideo src={SECTION_VIDEOS.cta} poster="https://www-cdn.djiits.com/dps/59107212f2158b087e5647cdee0751a6.jpg" className="" opacity={0.28} />
                              <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${C.navy950} 0%, ${C.navy950}88 60%, ${C.navy950}60 100%)` }} />
                              <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 55% 55% at 15% 50%, rgba(249,115,22,0.13) 0%, transparent 60%)` }} />
                              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                              <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                              <FadeUp>
                              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6" style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)" }}>
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                              <span className="text-[10px] font-extrabold uppercase tracking-[0.38em] text-orange-400">Adote antes da concorrência</span>
                              </div>
                              <h2 className="hn text-5xl sm:text-7xl font-black uppercase leading-[0.84] text-white mb-5">
                              Não fique<br />para <span style={{ color: C.orange }}>trás.</span>
                              </h2>
                              <p className="text-base sm:text-lg leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                              O mercado cresce <strong className="text-white font-semibold">45% ao ano</strong>. Empresas que integram drones inteligentes hoje constroem vantagem competitiva que leva anos para ser alcançada.
                              </p>
                              <p className="text-[14px] leading-relaxed mb-9" style={{ color: "rgba(255,255,255,0.35)" }}>
                              Diagnóstico gratuito com nossos engenheiros. Proposta técnica com ROI detalhado em até 48 horas.
                              </p>
                              <div className="flex flex-wrap gap-3">
                              <a href="#contato" className="group flex items-center gap-3 px-7 py-4 text-[11px] font-extrabold uppercase tracking-[0.26em] text-white rounded-xl hover:opacity-90 transition-all"
                              style={{ background: C.orange, boxShadow: "0 8px 40px rgba(249,115,22,0.32)" }}>
                              Diagnóstico Gratuito <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                              </a>
                              <a href={waLink("Olá, vim pelo site e quero entender como drones autônomos podem melhorar minha operação.")}
                              target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-2.5 border-2 border-white/20 hover:border-white/40 text-white/70 hover:text-white px-7 py-4 text-[11px] font-extrabold uppercase tracking-[0.26em] rounded-xl hover:bg-white/05 transition-all">
                              <MessageCircle size={13} /> WhatsApp
                              </a>
                              </div>
                              </FadeUp>
                              <FadeUp delay={0.12}>
                              <div className="space-y-4">
                              {[
                                { icon:TrendingUp,  accent:"#f97316", titulo:"Crescimento de 45%/ano", texto:"O setor de drones é um dos que mais cresce no mundo. Cada mês sem adoção é vantagem acumulada para o concorrente que já adotou." },
                                { icon:CheckCircle, accent:"#10b981", titulo:"Cases reais já comprovaram", texto:"Um condomínio em Brasília e uma fazenda no Ceará. Dois cenários reais. Zero dúvida sobre o retorno operacional da tecnologia." },
                                { icon:Clock,       accent:"#3b82f6", titulo:"Payback em menos de 4 meses", texto:"O investimento se paga rápido — não por promessa, mas pela eliminação real de custo operacional e prevenção de perdas." },
                              ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-5 rounded-2xl border" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)" }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.accent}18` }}>
                                <item.icon size={18} style={{ color: item.accent }} />
                                </div>
                                <div>
                                <div className="text-[13px] font-bold text-white mb-1">{item.titulo}</div>
                                <div className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>{item.texto}</div>
                                </div>
                                </div>
                              ))}
                              </div>
                              </FadeUp>
                              </div>
                              </div>
                              </section>

                              {/* ══════════════════════════════════════════════════════════
                                ISCAS DIGITAIS
                                ══════════════════════════════════════════════════════════ */}
                                <section id="iscas" className="py-14 sm:py-24 relative overflow-hidden" style={{ background: C.navy800 }}>
                                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 65%)" }} />
                                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                                <FadeUp className="text-center max-w-2xl mx-auto mb-12">
                                <SectionTag label="Material Exclusivo · Grátis" dark />
                                <h2 className="hn text-3xl sm:text-5xl font-black uppercase leading-[0.88] text-white mb-4">
                                Antes de falar com<br />um especialista,<br /><span style={{ color: C.orange }}>veja a prova.</span>
                                </h2>
                                <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                                Materiais ricos para gestores de segurança, diretores de operações e engenheiros que avaliam a tecnologia. Enviados por WhatsApp — sem compromisso.
                                </p>
                                </FadeUp>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                                {ISCAS.map((isca, i) => (
                                  <FadeUp key={i} delay={i * 0.07}>
                                  <div className="group flex flex-col rounded-2xl overflow-hidden border h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)" }}>
                                  <div className="flex items-center gap-2 px-4 sm:px-5 pt-4 sm:pt-5 pb-0">
                                  <span className="text-[9px] font-extrabold uppercase tracking-[0.38em] px-2.5 py-1 rounded-full"
                                  style={{ background: `${isca.tagColor}20`, color: isca.tagColor }}>
                                  {isca.tag}
                                  </span>
                                  </div>
                                  <div className="flex-1 p-4 sm:p-5 pt-3 flex flex-col">
                                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: `${isca.accent}18` }}>
                                  <isca.icon size={20} style={{ color: isca.accent }} />
                                  </div>
                                  <div className="flex items-center gap-1.5 mb-2">
                                  <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded" style={{ background: `${isca.accent}12`, color: isca.accent }}>{isca.badge}</span>
                                  </div>
                                  <h3 className="text-[14px] font-black mb-1 text-white leading-tight">{isca.title}</h3>
                                  <p className="text-[12px] font-medium mb-3" style={{ color: isca.accent }}>{isca.subtitle}</p>
                                  <p className="text-[12px] leading-relaxed mb-4 flex-1" style={{ color: "rgba(255,255,255,0.4)" }}>{isca.desc}</p>
                                  <div className="flex items-start gap-2 p-3 rounded-lg mb-4" style={{ background: `${isca.accent}10`, border: `1px solid ${isca.accent}20` }}>
                                  <CheckCircle size={12} className="mt-0.5 shrink-0" style={{ color: isca.accent }} />
                                  <p className="text-[11px] leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>{isca.highlight}</p>
                                  </div>
                                  <a href={waLink(isca.wa)} target="_blank" rel="noopener noreferrer"
                                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-[0.22em] text-white transition-all hover:opacity-90"
                                  style={{ background: "#25d366" }}>
                                  <MessageCircle size={12} /> {isca.cta}
                                  </a>
                                  </div>
                                  </div>
                                  </FadeUp>
                                ))}
                                </div>
                                <FadeUp className="text-center mt-8">
                                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                                📲 Todos os materiais são enviados via WhatsApp · Sem spam · Sem compromisso
                                </p>
                                </FadeUp>
                                </div>
                                </section>

                                {/* ══════════════════════════════════════════════════════════
                                  CONTATO
                                  ══════════════════════════════════════════════════════════ */}
                                  <section id="contato" className="py-14 sm:py-24" style={{ background: C.light100 }}>
                                  <div className="max-w-7xl mx-auto px-4 sm:px-6">
                                  <FadeUp className="text-center max-w-2xl mx-auto mb-12">
                                  <SectionTag label="Fale com Especialista" />
                                  <h2 className="hn text-4xl sm:text-5xl font-black uppercase leading-[0.88] mb-5" style={{ color: C.ink900 }}>
                                  A resposta mais rápida<br />está no <span style={{ color: "#25d366" }}>WhatsApp.</span>
                                  </h2>
                                  <p className="text-base leading-relaxed mb-7" style={{ color: C.ink400 }}>
                                  Engenheiros certificados DJI — diagnóstico gratuito em até 1 hora no horário comercial. Prefere formulário? Está logo abaixo.
                                  </p>
                                  <a href={waLink("Olá, vim pelo site da SM Company e gostaria de um diagnóstico gratuito para minha operação.")}
                                  target="_blank" rel="noopener noreferrer"
                                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.22em] sm:tracking-[0.28em] text-white transition-all hover:opacity-90 shadow-2xl"
                                  style={{ background: "#25d366", boxShadow: "0 12px 40px rgba(37,211,102,0.32)" }}>
                                  <MessageCircle size={18} /> Falar no WhatsApp Agora
                                  </a>
                                  <div className="flex items-center justify-center gap-4 sm:gap-6 mt-5 flex-wrap">
                                  {["Resposta em < 1h","Diagnóstico gratuito","Sem compromisso"].map((l, i) => (
                                    <div key={i} className="flex items-center gap-1.5 text-[11px]" style={{ color: C.ink400 }}>
                                    <Check size={11} style={{ color: "#25d366" }} /> {l}
                                    </div>
                                  ))}
                                  </div>
                                  </FadeUp>

                                  <div className="flex items-center gap-4 max-w-lg mx-auto mb-10">
                                  <div className="flex-1 h-px" style={{ background: C.bLight }} />
                                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ background: C.light200, color: C.ink400 }}>ou prefere e-mail</span>
                                  <div className="flex-1 h-px" style={{ background: C.bLight }} />
                                  </div>

                                  <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                                  <FadeUp>
                                  <h3 className="hn text-3xl font-black uppercase mb-5" style={{ color: C.ink900 }}>
                                  Escolha como<br /><span style={{ color: C.orange }}>prefere falar.</span>
                                  </h3>
                                  <p className="text-[14px] leading-relaxed mb-8" style={{ color: C.ink400 }}>
                                  Seja qual for o canal, um engenheiro especialista analisa seu caso e propõe a solução ideal — do condomínio à fazenda, do porto ao município.
                                  </p>
                                  <div className="space-y-3 mb-8">
                                  {[
                                    { icon:MessageCircle, label:"WhatsApp — Resposta + rápida", value:"(61) 9 9371-1678", href:waLink("Olá, vim pelo site da SM Company."), bg:"#25d366" },
          { icon:Phone,         label:"Telefone Comercial",           value:"(61) 9 9371-1678", href:"tel:+5561993711678", bg:C.orange },
          { icon:Mail,          label:"E-mail Comercial",             value:"comercial@smcompany.com.br", href:"mailto:comercial@smcompany.com.br", bg:"#3b82f6" },
                                  ].map((item, i) => (
                                    <a key={i} href={item.href} target={item.href.startsWith("https") ? "_blank" : "_self"} rel="noopener noreferrer"
                                    className="flex items-center gap-4 group p-4 rounded-2xl border hover:shadow-md transition-all" style={{ background: C.light200, borderColor: C.bLight }}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.bg}15` }}>
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
                                  <div className="grid grid-cols-3 gap-3">
                                  {[
                                    { icon:Award,       label:"DJI Enterprise", sub:"Parceiro Cert." },
                                    { icon:Shield,      label:"ANAC",           sub:"Homologado" },
                                    { icon:CheckCircle, label:"Turnkey",        sub:"Implementação" },
                                  ].map((b, i) => (
                                    <div key={i} className="text-center p-4 rounded-xl border" style={{ background: C.light200, borderColor: C.bLight }}>
                                    <b.icon size={16} className="mx-auto mb-2" style={{ color: C.orange }} />
                                    <div className="text-[11px] font-bold" style={{ color: C.ink900 }}>{b.label}</div>
                                    <div className="text-[10px]" style={{ color: C.ink400 }}>{b.sub}</div>
                                    </div>
                                  ))}
                                  </div>
                                  </FadeUp>

                                  <FadeUp delay={0.12}>
                                  <div className="rounded-3xl p-7 sm:p-10 shadow-xl" style={{ background: C.light100, boxShadow: C.shadowLg, border: `1px solid ${C.bLight}` }}>
                                  <h3 className="hn text-2xl font-black uppercase tracking-tight mb-2" style={{ color: C.ink900 }}>Enviar Mensagem</h3>
                                  <p className="text-[12px] mb-6" style={{ color: C.ink400 }}>Retorno em até 24h · Diagnóstico gratuito</p>
                                  <div className="space-y-4">
                                  <div className="grid sm:grid-cols-2 gap-4">
                                  {[{ l:"Nome *", p:"João Silva", t:"text" }, { l:"Empresa", p:"Empresa S.A.", t:"text" }].map((f, i) => (
                                    <div key={i}>
                                    <label className="text-[10px] font-bold uppercase tracking-wider block mb-2" style={{ color: C.ink400 }}>{f.l}</label>
                                    <input type={f.t} placeholder={f.p} className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-all" style={{ background: C.light200, borderColor: C.bLight, color: C.ink900 }} />
                                    </div>
                                  ))}
                                  </div>
                                  <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider block mb-2" style={{ color: C.ink400 }}>WhatsApp / E-mail *</label>
                                  <input type="text" placeholder="(61) 9 9371-1678 ou email@empresa.com" className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-all" style={{ background: C.light200, borderColor: C.bLight, color: C.ink900 }} />
                                  </div>
                                  <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider block mb-2" style={{ color: C.ink400 }}>Qual é o seu desafio?</label>
                                  <select className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none appearance-none cursor-pointer" style={{ background: C.light200, borderColor: C.bLight, color: C.ink500 }}>
                                  <option>Selecione...</option>
                                  {["Segurança Perimetral / Furtos","Monitoramento de Área Grande","Inspeção Industrial","Gestão Ambiental / Agronegócio","Emergências / Defesa Civil","Quero saber o preço","Outro"].map(v => <option key={v}>{v}</option>)}
                                  </select>
                                  </div>
                                  <div>
                                  <label className="text-[10px] font-bold uppercase tracking-wider block mb-2" style={{ color: C.ink400 }}>Descreva em poucas palavras</label>
                                  <textarea rows={3} placeholder="Ex: Fazenda 300ha, perda mensal com furtos, quero monitorar à noite..."
                                  className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none resize-none" style={{ background: C.light200, borderColor: C.bLight, color: C.ink900 }} />
                                  </div>
                                  <button className="w-full text-white py-4 rounded-xl text-[11px] font-extrabold uppercase tracking-[0.26em] transition-all hover:opacity-90 flex items-center justify-center gap-3 group"
                                  style={{ background: C.orange, boxShadow: "0 8px 32px rgba(249,115,22,0.25)" }}>
                                  Enviar Mensagem <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                                  </button>
                                  <p className="text-[10px] text-center" style={{ color: C.ink400 }}>Retorno em até 24h · AES-256 · Conforme LGPD</p>
                                  </div>
                                  </div>
                                  </FadeUp>
                                  </div>
                                  </div>
                                  </section>

                                  {/* ══════════════════════════════════════════════════════════
                                    FOOTER
                                    ══════════════════════════════════════════════════════════ */}
                                    <footer className="border-t" style={{ background: C.navy900, borderColor: "rgba(255,255,255,0.05)" }}>
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8" style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 mb-12">
                                    <div className="col-span-2 sm:col-span-1">
                                    <div className="flex items-center gap-2.5 mb-5">
                                    <Logo size={32} white />
                                    <div>
                                    <div className="font-black text-[16px] tracking-wide hn text-white">SM Company</div>
                                    <div className="text-[7px] tracking-[0.46em] font-bold uppercase text-orange-500/70">Drone Enterprise</div>
                                    </div>
                                    </div>
                                    <p className="text-[12px] leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.22)" }}>
                                    Drone as a Service — autonomia e inteligência aérea para missões críticas em todo o Brasil.
                                    </p>
                                    <div className="flex gap-2">
                                    {["in", "yt", "ig"].map(s => (
                                      <a key={s} href="#" className="w-8 h-8 rounded-lg border flex items-center justify-center text-[10px] font-black uppercase transition-all hover:bg-white/10 hover:border-white/20"
                                      style={{ borderColor: "rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.28)" }}>{s}</a>
                                    ))}
                                    </div>
                                    </div>
                                    {[
                                      { title:"Soluções", links:["Segurança Perimetral","Monitoramento de Áreas","Inspeção Industrial","Gestão Ambiental","Smart Cities"] },
                                      { title:"Produtos",  links:["Matrice 4T","Matrice 4E","Dock 3 + M4TD","FlightHub 2","Matrice 4D"] },
                                      { title:"Empresa",   links:["Sobre Nós","Cases Reais","Materiais Grátis","Blog Técnico","Carreiras"] },
                                    ].map(col => (
                                      <div key={col.title}>
                                      <h5 className="text-[10px] font-bold uppercase tracking-[0.38em] mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>{col.title}</h5>
                                      <ul className="space-y-2.5">
                                      {col.links.map(l => (
                                        <li key={l}><a href="#" className="text-[12px] transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>{l}</a></li>
                                      ))}
                                      </ul>
                                      </div>
                                    ))}
                                    </div>
                                    <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                                    <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>© {new Date().getFullYear()} SM Company · DJI Enterprise Partner · Brasília, DF</p>
                                    <div className="flex gap-5 flex-wrap justify-center">
                                    {["Termos", "Privacidade", "LGPD", "Compliance"].map(l => (
                                      <a key={l} href="#" className="text-[10px] font-bold uppercase tracking-wider transition-colors hover:text-white/50" style={{ color: "rgba(255,255,255,0.2)" }}>{l}</a>
                                    ))}
                                    </div>
                                    </div>
                                    </div>
                                    </footer>

                                    {/* ══════════════════════════════════════════════════════════
                                      BOTÃO FLUTUANTE WHATSAPP
                                      ══════════════════════════════════════════════════════════ */}
                                      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                      transition={{ delay: 2.5, type: "spring", bounce: 0.45 }}
                                      className="fixed wa-float z-[200] flex flex-col items-end gap-2">
                                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.5 }}
                                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-white text-[11px] font-semibold shadow-xl"
                                      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}>
                                      <span>Resposta em até 1h</span><span className="text-xs">👋</span>
                                      </motion.div>
                                      <a href={waLink("Olá, vim pelo site da SM Company e gostaria de um diagnóstico gratuito.")}
                                      target="_blank" rel="noopener noreferrer"
                                      className="group relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110"
                                      style={{ background: "#25d366", boxShadow: "0 8px 32px rgba(37,211,102,0.45)" }}>
                                      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(37,211,102,0.25)" }} />
                                      <MessageCircle size={28} className="text-white relative z-10" />
                                      </a>
                                      </motion.div>

                                      {/* ══════════════════════════════════════════════════════════
                                        ESTILOS GLOBAIS
                                        ══════════════════════════════════════════════════════════ */}
                                        <style dangerouslySetInnerHTML={{ __html: `
                                          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&display=swap');

                                          *, *::before, *::after { box-sizing: border-box; }
                                          html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
                                          body {
                                            font-family: 'DM Sans', system-ui, sans-serif;
                                            -webkit-font-smoothing: antialiased;
                                            text-rendering: optimizeLegibility;
                                            overflow-x: hidden;
                                            padding-left: env(safe-area-inset-left);
                                            padding-right: env(safe-area-inset-right);
                                          }

                                          .hn { font-family: 'Bebas Neue', sans-serif; }
                                          .hero-ghost { -webkit-text-stroke: 1.5px rgba(255,255,255,0.14); color: transparent; }

                                          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
                                          .marquee-run { animation: marquee 32s linear infinite; will-change: transform; }

                                          ::-webkit-scrollbar { width: 3px; height: 3px; }
                                          ::-webkit-scrollbar-track { background: transparent; }
                                          ::-webkit-scrollbar-thumb { background: #f97316; border-radius: 2px; }
                                          .scrollbar-hide::-webkit-scrollbar { display: none; }
                                          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

                                          ::selection { background: #f97316; color: #fff; }
                                          :focus-visible { outline: 2px solid #f97316; outline-offset: 3px; }
                                          input:focus, textarea:focus, select:focus {
                                            border-color: #f97316 !important;
                                            box-shadow: 0 0 0 3px rgba(249,115,22,0.12) !important;
                                          }

                                          .line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
                                          .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
                                          .duration-400 { transition-duration: 400ms; }

                                          @media (max-width: 768px) {
                                            input, textarea, select { font-size: 16px !important; }
                                            button, a { min-height: 44px; }
                                          }
                                          @media (max-width: 480px) {
                                            .hn { letter-spacing: 0.01em; }
                                          }

                                          .wa-float {
                                            bottom: calc(1.5rem + env(safe-area-inset-bottom));
                                            right: calc(1.5rem + env(safe-area-inset-right));
                                          }
                                          ` }} />
                                          </div>
  );
}
