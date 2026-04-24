// [REFATORADO v1.1] — Dados de produtos movidos de page.tsx para camada /data
// [SOLID-S] — Única responsabilidade: ser a fonte de verdade dos produtos DJI
// Camada: data — dados estáticos, importa apenas entities do domain

import {
  Clock, Thermometer, Crosshair, Eye, LocateFixed, Gauge, Zap, Battery,
  Globe, Activity, Database, Map, Factory, TreePine, Building2, Shield,
  Radio, ScanLine, Target, Radar, Lock, CloudRain, BarChart3,
} from "lucide-react";
import type { Product } from "@/domain/entities/Product";

// [MELHORIA v1.2] — Array tipado explicitamente para evitar inferência incorreta
export const PRODUCTS: Product[] = [
  // ── MATRICE 4T ─────────────────────────────────────────────────────────────
  {
    id: "Matrice 4T", name: "Matrice 4T", nameShort: "Matrice 4T",
    accent: "#f97316",
    category: "Portátil · Térmico & Segurança Noturna",
    tagline: "Veja no escuro. Missão sem limites.",
    taglineSub: "O drone portátil mais avançado para segurança noturna — câmera térmica VOx 640 px, Night Scene Mode e rastreamento por IA.",
    videoSrc: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/d6354026-ddbf-4d04-afd2-3cde1d25bc2f.mp4?w=3840&h=2160",
    poster: "https://www-cdn.djiits.com/dps/f384d2286ea002458baa31f8f8805953.jpg",
    heroDesc: "48 min de voo · Térmica 640×512 px · Laser 1.800 m · Night Scene Mode · IP55",
    overview: "O Matrice 4T é a escolha certa quando a missão acontece no escuro. Em vez do obturador mecânico do Matrice 4E, o 4T traz um sensor 1/1.3\" CMOS f/1.7 — a maior abertura da série — maximizado para capturar luz em ambientes sem iluminação. O Night Scene Mode combina esse sensor com processamento de imagem dedicado para produzir cenas nítidas à luz das estrelas. Mas o coração do Matrice 4T é o microbolômetro VOx LWIR de 640×512 px com sensibilidade ≤30 mK: ele detecta calor humano a 1 km de distância, identifica focos de incêndio com variação de apenas 30 mK e lê a temperatura de equipamentos industriais sem contato. O iluminador NIR ativo projeta luz infravermelha a 100 m — completamente invisível ao alvo. O telêmetro laser de 1.800 m localiza e mede distâncias sem contato. LiDAR rotativo e radar mmWave fazem varredura omnidirecional de obstáculos para voos noturnos autônomos seguros.",
    highlights: [
      { icon: Clock,       value: "48",    unit: "min", label: "Autonomia de voo" },
      { icon: Thermometer, value: "640",   unit: "px",  label: "Resolução térmica" },
      { icon: Crosshair,   value: "1.800", unit: "m",   label: "Alcance do laser" },
      { icon: Eye,         value: "100",   unit: "m",   label: "Iluminador NIR" },
    ],
    capabilities: [
      { icon: Thermometer, label: "Sensor Térmico VOx 640×512",         desc: "Microbolômetro VOx LWIR. Sensibilidade ≤30 mK. Faixa -20°C a +550°C. Precisão ±2°C. Super-resolução IA 1.280×1.024 px." },
      { icon: Eye,         label: "Night Scene — 1/1.3\" f/1.7",        desc: "Sensor CMOS 48 MP com a maior abertura da série. Night Scene Mode gera imagens nítidas em breu total." },
      { icon: ScanLine,    label: "Iluminador NIR Ativo 100 m",          desc: "Projeta luz infravermelha invisível ao olho humano a até 100 m. Essencial para operações táticas e SAR noturno." },
      { icon: Crosshair,   label: "Telêmetro Laser 1.800 m",             desc: "Medição de distância de 3 a 1.800 m com precisão de ±1 m sem contato." },
      { icon: Target,      label: "IA de Borda — Rastreamento",          desc: "Reconhecimento e rastreamento de alvos processado localmente no drone. Sem cloud, funciona offline." },
      { icon: Radar,       label: "LiDAR + Radar mmWave Omnidirecional", desc: "LiDAR rotativo + radar mmWave em 6 direções. Detecta fios finos em breu total." },
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
      { icon: Shield,   title: "Segurança Perimetral Noturna",    desc: "Rondas com câmera térmica 640 px. Identifica intrusos a 1 km antes de qualquer alarme perimetral." },
      { icon: Radio,    title: "Busca & Salvamento (SAR)",         desc: "Detecção de calor humano em florestas, escombros e áreas alagadas. 48 min ininterruptos por voo." },
      { icon: TreePine, title: "Detecção de Incêndio Florestal",   desc: "Sensor de 30 mK identifica focos antes da chama. Mapeamento de expansão em tempo real." },
      { icon: Factory,  title: "Inspeção Termográfica Industrial", desc: "Subestações, painéis solares, linhas. Relatório automático com coordenadas GPS." },
    ],
    gallery: [
  // Imagens
  
  "https://www-cdn.djiits.com/dps/acb158fae2533c646ee5d464e29d03cb.jpg",
  "https://www-cdn.djiits.com/dps/f28ff5c9b5c9dcd23f9f5354f1e5b373.jpg",
  "https://www-cdn.djiits.com/dps/feb9d7cb3e2d1b1ac8801967987519c0.jpg",

  // Vídeos
  "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/d1701748-93a8-4526-b2d5-e5e799091cb6.mp4",
  "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/c2660ff3-35fd-41a6-9964-03598e9d367b.mp4",
  "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/7a530960-eb20-4ec5-ac58-70387edf69a6.mp4",
],
    dockCompat: "O Matrice 4T é portátil — não é compatível com Dock 3. Para autonomia 24/7 com câmera térmica, use o Matrice 4TD com Dock 3.",
  },

  // ── MATRICE 4E ─────────────────────────────────────────────────────────────
  {
    id: "Matrice 4E", name: "Matrice 4E", nameShort: "Matrice 4E",
    accent: "#3b82f6",
    category: "Portátil · Mapeamento RTK & Fotogrametria",
    tagline: "Precisão centimétrica. Mapas perfeitos.",
    taglineSub: "Obturador mecânico 4/3 CMOS elimina rolling shutter. RTK integrado ±1 cm sem GCPs.",
    videoSrc: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/82111ccc-84ca-4b38-b138-43fac4556f60.mp4?w=2560&h=1440",
    poster: "https://www-cdn.djiits.com/dps/a8de516c06017122e114a433b632be85.jpg",
    heroDesc: "48 min de voo · Sensor 4/3 CMOS · Obturador mecânico · RTK ±1 cm · Laser 1.800 m",
    overview: "O Matrice 4E foi projetado para engenheiros, topógrafos e gestores ambientais que exigem o mais alto grau de precisão geométrica. O diferencial central é o obturador mecânico integrado ao sensor 4/3 CMOS de 20 MP: ele elimina completamente o rolling shutter. O módulo RTK nativo entrega ±1 cm horizontal sem pontos de controle no terreno (GCPs), reduzindo o tempo de campo em até 70%. As câmeras tele de 70 mm e 168 mm permitem inspeção visual de longo alcance simultânea ao mapeamento — em um único voo.",
    highlights: [
      { icon: Clock,       value: "48",    unit: "min",  label: "Autonomia de voo" },
      { icon: LocateFixed, value: "1",     unit: "cm",   label: "Precisão RTK" },
      { icon: Crosshair,   value: "1.800", unit: "m",    label: "Alcance do laser" },
      { icon: Eye,         value: "3",     unit: "cams", label: "Câmeras simultâneas" },
    ],
    capabilities: [
      { icon: Gauge,       label: "Obturador Mecânico 4/3 CMOS",      desc: "Elimina rolling shutter em voos de mapeamento a alta velocidade. Sensor 20 MP." },
      { icon: LocateFixed, label: "RTK Integrado ±1 cm sem GCPs",     desc: "Precisão ±1 cm horizontal e ±1,5 cm vertical nativamente. Sem hardware adicional." },
      { icon: Eye,         label: "3 Câmeras Especializadas",          desc: "Wide 4/3 + Tele Média 48 MP (EFL 70 mm) + Tele Longo 48 MP (EFL 168 mm)." },
      { icon: Crosshair,   label: "Telêmetro Laser 1.800 m",           desc: "Medição sem contato de 3 a 1.800 m (±1 m). Localiza alvos com coordenadas precisas." },
      { icon: Database,    label: "Exportação GeoTIFF · KML · SHP",   desc: "Exportado para GIS, CAD e ERPs. Ortomosaicos e nuvens de pontos 3D." },
      { icon: Activity,    label: "48 min · Transmissão O4 Enterprise", desc: "Cobertura de 400 ha+ em missões contínuas com reconexão automática." },
    ],
    specs: [
      { group: "Câmera Wide", items: [
        { k: "Sensor",               v: "4/3\" CMOS · 20 MP" },
        { k: "Obturador",            v: "Mecânico (sem rolling shutter)" },
        { k: "Distância focal equiv.",v: "24 mm (EFL)" },
        { k: "Abertura máxima",      v: "f/2.8" },
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
      { icon: Map,       title: "Topografia e Cadastro Territorial", desc: "Levantamentos centimétricos sem GCPs. Cadastro rural e mapeamento urbano." },
      { icon: Factory,   title: "Controle de Obras e Mineração",     desc: "Volumetria de pilhas, cavas e taludes. Nuvem de pontos 3D semanal." },
      { icon: TreePine,  title: "Monitoramento Ambiental e NDVI",    desc: "Mapeamento de APPs e reservas legais. Relatórios IBAMA automáticos." },
      { icon: Building2, title: "Inspeção de Infraestrutura Civil",  desc: "Pontes, viadutos. Modelo 3D para análise de deformações e patologias." },
    ],
    gallery: [
      "https://www-cdn.djiits.com/dps/cf101574155c556928a8791f3ab8d147.jpg",
      "https://www-cdn.djiits.com/dps/fa2aaf75f27eb34fd387ad6a20c8ae63.jpg",
      "https://www-cdn.djiits.com/dps/f28ff5c9b5c9dcd23f9f5354f1e5b373.jpg",
    ],
    dockCompat: "O Matrice 4E é portátil — não é compatível com Dock 3. Para mapeamento autônomo, use o Matrice 4D com Dock 3.",
  },

  // ── DOCK 3 + Matrice 4TD ───────────────────────────────────────────────────
  {
    id: "dock3", name: "DJI Dock 3 + Matrice 4TD", nameShort: "Dock 3",
    accent: "#10b981",
    category: "Drone-in-a-Box · Autonomia 24/7 Sem Operador",
    tagline: "Zero intervenção humana. 24 horas.",
    taglineSub: "Do alarme ao drone no ar em menos de 60 segundos — sem ninguém em campo.",
    videoSrc: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/f56e9d40-9dea-46b3-bb6b-430a9d5df8d7.mp4?w=2400&h=1200",
    poster: "https://www-cdn.djiits.com/dps/f1d7623c70c7ffa24a895ac36989c2e1@origin.jpg",
    heroDesc: "Deploy < 60 s · Recarga 27 min · Raio 10 km · IP55 · 4G/5G nativo",
    overview: "O DJI Dock 3 é a espinha dorsal de qualquer operação autônoma real. Uma estação robótica inteligente com ar-condicionado, aquecedores anticongelantes, estação meteorológica integrada e antenas 4G/5G + RTK de base. O Matrice 4TD vive permanentemente dentro dela. Ao receber um alarme via API REST, o Dock verifica o clima, abre automaticamente e lança o drone em menos de 60 segundos. Após a missão, retorna, pousa com precisão centimétrica e recarrega em 27 minutos. Um único Dock 3 cobre raio de 10 km — 314 km².",
    highlights: [
      { icon: Zap,      value: "60",   unit: "s",   label: "Deploy do alarme ao voo" },
      { icon: Battery,  value: "27",   unit: "min", label: "Recarga 15%→95%" },
      { icon: Globe,    value: "10",   unit: "km",  label: "Raio operacional" },
      { icon: Activity, value: "99,7", unit: "%",   label: "Uptime garantido" },
    ],
    capabilities: [
      { icon: Zap,       label: "Deploy Automático < 60 Segundos",  desc: "Do alarme disparado ao drone no ar em menos de 60 s — qualquer hora, qualquer clima." },
      { icon: CloudRain, label: "Estação Meteorológica Integrada",   desc: "Sensores de vento, chuva, temperatura. Missões adiadas automaticamente se necessário." },
      { icon: Battery,   label: "Recarga Automática em 27 Minutos", desc: "Bateria 15%→95% em 27 min por contato metálico. Missões contínuas ilimitadas." },
      { icon: Globe,     label: "10 km de Raio — 314 km²",          desc: "Um Dock cobre 314 km². Redes de múltiplos Docks eliminam pontos cegos." },
      { icon: Lock,      label: "API REST Aberta",                   desc: "Conecta com CFTV, sensores de intrusão, SCADAs via webhook em tempo real." },
      { icon: Activity,  label: "Health Monitoring Contínuo",        desc: "Alertas preditivos de bateria, servos, temperatura — zero surpresas em campo." },
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
      ]},
      { group: "Software & Integração", items: [
        { k: "Plataforma obrigatória",   v: "DJI FlightHub 2" },
        { k: "API de integração",        v: "REST Webhook — tempo real" },
        { k: "Criptografia",             v: "AES-256 / TLS 1.3" },
        { k: "Conformidade",             v: "LGPD · ISO 27001" },
        { k: "Relatórios automáticos",   v: "PDF com IA após cada missão" },
      ]},
    ],
    useCases: [
      { icon: Shield,  title: "Patrulha Perimetral 24/7",       desc: "Rondas programadas a cada 20 min. Resposta a alarmes em < 60 s com câmera térmica." },
      { icon: Factory, title: "Inspeção Industrial Diária",     desc: "Voos automáticos antes do turno. Laudos enviados por e-mail antes do técnico iniciar." },
      { icon: Globe,   title: "Instalações Remotas e Offshore", desc: "Gestão completa via FlightHub 2 — sem deslocamento de equipe para campo." },
      { icon: Radio,   title: "Resposta Automática a Alertas",  desc: "Integrado a sensores e câmeras — drone no ar ao primeiro gatilho." },
    ],
    gallery: [
      "https://www-cdn.djiits.com/dps/4dfa0f33657eb9e644dd6631f8ab5dc0.png",
      "https://www-cdn.djiits.com/dps/3518859e30b80a9a77eec2a4c8ac4906.jpg",
      "https://www-cdn.djiits.com/dps/01063b7bafd4c34338f8803df76bc5cf.jpg",
    ],
    dockCompat: "O Dock 3 é compatível com Matrice 4TD e Matrice 4D. NÃO é compatível com Matrice 4T e Matrice 4E.",
  },

  // ── FLIGHTHUB 2 ────────────────────────────────────────────────────────────
  {
    id: "FlightHub 2", name: "FlightHub 2", nameShort: "FlightHub 2",
    accent: "#8b5cf6",
    category: "Software Cloud · Gestão de Frotas · Central de Comando",
    tagline: "Central de comando. Em qualquer lugar.",
    taglineSub: "Gerencie 100+ drones simultâneos, agende missões autônomas e receba relatórios por IA.",
    videoSrc: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/3b32ce00-0621-4d08-baf0-40357feb73f0.mp4?w=2560&h=1440",
    poster: "https://www-cdn.djiits.com/dps/5bc9045f3ba870fb3ede5f7324554e6c.jpg?w=982&h=800",
    heroDesc: "100+ drones · 60 ms latência · 5 TB cloud · API REST · AES-256",
    overview: "FlightHub 2 é o sistema nervoso de toda operação Aero Drone Solutions. Obrigatório para operar qualquer Dock 3, ele gerencia frotas mistas em um único painel com latência de 60 ms. O operador acessa via navegador ou app, desenha rotas 3D com waypoints, agenda missões recorrentes e monitora telemetria completa. A IA embarcada gera PDFs de relatório automaticamente após cada missão.",
    highlights: [
      { icon: Radar,    value: "100",  unit: "+",   label: "Drones simultâneos" },
      { icon: Activity, value: "60",   unit: "ms",  label: "Latência de vídeo" },
      { icon: Database, value: "5",    unit: "TB",  label: "Armazenamento cloud" },
      { icon: Lock,     value: "256",  unit: "bit", label: "Criptografia AES" },
    ],
    capabilities: [
      { icon: Radar,    label: "Mapa Situacional — 100+ Drones",    desc: "Posição GPS, bateria, status e feed de vídeo de cada aeronave em tempo real." },
      { icon: Map,      label: "Rotas 3D + Missões Recorrentes",     desc: "Waypoints 3D, geofencing dinâmico e agendamento recorrente automático." },
      { icon: Activity, label: "Telemetria ao Vivo — 60 ms",         desc: "Streaming HD, GPS, IMU, bateria com latência média de 60 ms." },
      { icon: BarChart3,label: "Relatórios Automáticos por IA",      desc: "PDF completo com anomalias identificadas — gerado e enviado por e-mail." },
      { icon: Database, label: "Cloud Híbrida 5 TB + Exportação",    desc: "Cloud ou on-premise. Exporta GeoTIFF, KML, SHP, CSV." },
      { icon: Lock,     label: "AES-256 · MFA · RBAC · LGPD",       desc: "Criptografia ponta a ponta, MFA obrigatório, log completo de auditoria." },
    ],
    specs: [
      { group: "Planos & Preços", items: [
        { k: "Plano Boas-vindas",        v: "20.000 min streaming + 200 GB cloud" },
        { k: "Licença Professional/ano", v: "R$ 15.000 – R$ 20.000 / organização" },
        { k: "SLA de disponibilidade",   v: "99,95%" },
      ]},
      { group: "Desempenho & Segurança", items: [
        { k: "Drones simultâneos",       v: "100+" },
        { k: "Latência de streaming",    v: "≤ 60 ms" },
        { k: "Armazenamento máximo",     v: "5 TB (cloud híbrida)" },
        { k: "Criptografia",             v: "AES-256 / TLS 1.3" },
        { k: "Autenticação",             v: "MFA + SSO (SAML 2.0) + RBAC" },
        { k: "Conformidade",             v: "LGPD · ISO 27001" },
      ]},
      { group: "Integrações & Acesso", items: [
        { k: "API",               v: "REST Open — documentação pública" },
        { k: "Webhooks",          v: "Alarmes e eventos em tempo real" },
        { k: "Exportação",        v: "GeoTIFF · KML · SHP · CSV" },
        { k: "Acesso",            v: "Web · iOS · Android" },
        { k: "Integração Dock 3", v: "Nativa — missões agendadas automáticas" },
      ]},
    ],
    useCases: [
      { icon: Building2, title: "Central de Comando Unificada",      desc: "Todas as frotas em múltiplos locais em um dashboard. Histórico completo." },
      { icon: Factory,   title: "Inspeções Programadas Automáticas", desc: "Dock 3 executa sem clique. Relatório gerado e enviado ao gestor." },
      { icon: Globe,     title: "Integração com Sistemas Existentes", desc: "API REST conecta SCADAs, ERPs, CFTV e pluviômetros." },
      { icon: Shield,    title: "Auditoria & Compliance ANAC",        desc: "Rastreabilidade total por voo. Conformidade para auditorias e seguros." },
    ],
    gallery: [
      "https://www-cdn.djiits.com/dps/6c46cdcc71e010f5bbe4224954ef2b4b.jpg?w=3840&h=2160",
      "https://www-cdn.djiits.com/dps/60e6c322697c70810dc0bc731b0e07be.jpg?w=941&h=471",
      "https://www-cdn.djiits.com/dps/4e78a22d84104af88eb019e970304d04.jpg?w=3840&h=2160",
    ],
  },
];
