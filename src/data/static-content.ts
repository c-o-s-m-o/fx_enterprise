// [REFATORADO v1.1] — Dados secundários extraídos do page.tsx monolítico
// Inclui: SOLUTIONS, CASES, GALLERY, STATS, HOW, FAQ, COMPARATIVO, ISCAS
// [SOLID-S] — Arquivo separado por tipo de dado (arquivo de índice de dados estáticos)

import {
  Shield, Eye, Factory, TreePine, Radio, Building2,
  TrendingUp, Activity, Globe, Zap, Award, LifeBuoy,
  Clock, Target, Map, Boxes, BarChart3,
  Calculator, FileText, Thermometer, BookOpen,
  Flame, Crosshair, Users, TrendingDown,
  Star,
} from "lucide-react";
import type {
  Solution, CaseStudy, GalleryItem, MarketStat, HowStep, FaqItem, ComparativoRow, Isca,
} from "@/domain/entities/index";
import { SECTION_VIDEOS } from "@/data/hero-slides";

// ── Soluções ────────────────────────────────────────────────────────────────
export const SOLUTIONS: Solution[] = [
  {
    icon: Shield, title: "Segurança Perimetral", accent: "#f97316",
    clients: "Mineração · Portos · Presídios · Condomínios",
    metric: "73%", metricLabel: "redução de incidentes",
    videoSrc: SECTION_VIDEOS.sol1,
    desc: "Rondas autônomas 24/7 com câmera térmica 640 px. Dock 3 + Matrice 4TD responde a alarmes em < 60 s — identifica intrusos com calor corporal a 1 km sem operador local.",
    tags: ["24/7 Autônomo", "< 60 s de resposta", "Térmica 640 px"],
    benefits: ["Resposta automática < 60 s", "Integração CFTV via API REST", "Relatório automático por ocorrência", "73% menos incidentes comprovado"],
  },
  {
    icon: Eye, title: "Monitoramento de Áreas", accent: "#3b82f6",
    clients: "Utilities · Agronegócio · Mineração",
    metric: "500 ha", metricLabel: "cobertos por hora",
    videoSrc: SECTION_VIDEOS.sol2,
    desc: "Matrice 4T detecta anomalias térmicas. Matrice 4E mapeia NDVI e relevo com RTK ±1 cm. 500 ha cobertos por hora com dados georreferenciados.",
    tags: ["Inspeção Automática", "NDVI RTK", "Análise Térmica"],
    benefits: ["500 ha/h de cobertura", "Alerta em < 2 min", "Histórico georreferenciado", "Integração SCADA"],
  },
  {
    icon: Factory, title: "Inspeção Industrial", accent: "#10b981",
    clients: "Energia · Petróleo & Gás · Construção Civil",
    metric: "8×", metricLabel: "mais rápido que inspeção manual",
    videoSrc: SECTION_VIDEOS.sol3,
    desc: "Torres, dutos, chaminés e subestações inspecionados sem parar a operação. Termografia detecta anomalias invisíveis ao olho nu.",
    tags: ["Nuvem 3D RTK", "Termografia", "Zero Downtime"],
    benefits: ["8× mais rápido", "Zero risco para equipes", "Laudos automáticos < 2h", "Compliance NR-35 / NR-13"],
  },
  {
    icon: TreePine, title: "Gestão Ambiental", accent: "#f59e0b",
    clients: "Órgãos Públicos · Florestais · ESG",
    metric: "2 min", metricLabel: "para detectar foco de incêndio",
    videoSrc: SECTION_VIDEOS.sol4,
    desc: "VOx do Matrice 4T identifica focos com variação de 30 mK. Matrice 4E com RTK mapeia APPs e NDVI por talhão.",
    tags: ["NDVI Matrice 4E · RTK", "Foco Incêndio Matrice 4T", "IBAMA Compliance"],
    benefits: ["Foco detectado em 2 min", "NDVI semanal automatizado", "Relatórios IBAMA prontos", "Dados auditoria ESG"],
  },
  {
    icon: Radio, title: "Resposta a Emergências", accent: "#ef4444",
    clients: "Bombeiros · Defesa Civil · SAMU",
    metric: "<60 s", metricLabel: "do alarme ao drone no ar",
    videoSrc: SECTION_VIDEOS.bg1,
    desc: "Dock 3 integrado a pluviômetros e sensores lança o Matrice 4TD automaticamente ao alerta.",
    tags: ["Busca & Resgate SAR", "Vídeo Térmico ao COI", "Decolagem Automática"],
    benefits: ["Drone no ar em < 60 s", "Câmera térmica + NIR ativo", "Live HD para o COI", "Coordenação multi-agência"],
  },
  {
    icon: Building2, title: "Smart Cities & Governo", accent: "#8b5cf6",
    clients: "Municípios · Concessionárias · BID",
    metric: "24/7", metricLabel: "monitoramento autônomo",
    videoSrc: SECTION_VIDEOS.bg2,
    desc: "FlightHub 2 integra via API com centrais de comando urbano (CICC, 190, 192).",
    tags: ["API Prefeituras", "Dashboard CICC", "Análise de Tráfego"],
    benefits: ["Integração CICC / 190 / 192", "Dashboard situacional", "API REST open", "Conformidade LGPD"],
  },
];

// ── Cases ────────────────────────────────────────────────────────────────────
export const CASES: CaseStudy[] = [
  {
    id: "vistapark", title: "Vista Park Sul", subtitle: "Flagrante ao vivo na primeira demonstração",
    category: "Segurança Perimetral · Condomínio Residencial", accent: "#f97316",
    location: "Brasília, DF", period: "2025 · Demonstração Ativa", logo: "VP", badge: "🏆 Case Real",
    image: "https://www-cdn.djiits.com/dps/bdc1bcf701fa9c7123e8a045408cc208.jpg",
    challenge: "Moradores do Vista Park Sul sofriam com furtos constantes. A vigilância humana não cobria o perímetro nem reagia a tempo.",
    solution: "Levamos o Matrice 4T ao condomínio. No meio da demo, havia um furto acontecendo. Ativamos o drone imediatamente.",
    highlight: "⚡ Flagrante ao vivo — o drone identificou os furtadores com câmera térmica, zoom e IA. Sucesso total na 1ª demonstração.",
    results: [
      { icon: Flame,       label: "Flagrante", value: "100%",    desc: "Real, ao vivo, na 1ª demo" },
      { icon: Thermometer, label: "Câmera",    value: "Termal",  desc: "Identificação no escuro total" },
      { icon: Target,      label: "IA",        value: "Ativa",   desc: "Rastreio e travamento em tempo real" },
      { icon: Clock,       label: "Resposta",  value: "< 2 min", desc: "Do alerta ao drone no ar" },
    ],
    quote: "Estávamos em uma simulação quando o real aconteceu. O drone identificou os furtadores, rastreou o carro e transmitiu tudo ao vivo.",
    quoteAuthor: "Morador — Vista Park Sul", quoteRole: "Brasília, DF · Demonstração Aero Drone Solutions",
    products: ["Matrice 4T", "Câmera Térmica VOx 640 px", "IA de Rastreamento em Tempo Real"],
  },
  {
    id: "fazendacamarao", title: "Fazenda de Camarão", subtitle: "40 tanques. Escuridão total. Perdas eliminadas.",
    category: "Segurança Rural · Aquicultura · Agronegócio", accent: "#10b981",
    location: "Ceará, CE", period: "2025 · Implantação em Curso", logo: "FC", badge: "📍 Case Real",
    image: "https://www-cdn.djiits.com/dps/63481217ecc8f12dace7b0e52da16770.jpg",
    challenge: "Proprietário com 40+ tanques de camarão perdia toneladas/mês para roubos noturnos.",
    solution: "Monitoramento autônomo com Matrice 4T e câmera térmica. O drone identifica calor humano no breu total e envia localização em tempo real.",
    highlight: "🎯 O gap crítico foi reduzido a zero. O drone elimina a cegueira operacional que permitia os roubos noite após noite.",
    results: [
      { icon: Eye,          label: "Visibilidade", value: "Noturna",   desc: "Térmica no breu absoluto" },
      { icon: Crosshair,    label: "Rastreio",     value: "Real-time", desc: "Localização contínua dos invasores" },
      { icon: Users,        label: "Resposta",     value: "Exata",     desc: "Patrulha chega ao ponto certo" },
      { icon: TrendingDown, label: "Perdas",       value: "→ Zero",    desc: "Toneladas/mês protegidas" },
    ],
    quote: "Quando a patrulha chegava, os ladrões já tinham ido. Com o drone, eles chegam onde o invasor está.",
    quoteAuthor: "Proprietário — Fazenda de Camarão", quoteRole: "Ceará, CE · Cliente Aero Drone Solutions",
    products: ["Matrice 4T", "Câmera Térmica VOx 640 px", "Monitoramento Autônomo Noturno"],
  },
];

// ── Galeria ──────────────────────────────────────────────────────────────────
export const GALLERY: GalleryItem[] = [
  { id: 1,  thumb: "https://www-cdn.djiits.com/dps/59107212f2158b087e5647cdee0751a6.jpg", full: "https://www-cdn.djiits.com/dps/ee14cfbfb676fe008817889d1001cc53.jpg", title: "Matrice 4T em missão noturna",            cat: "Operações" },
  { id: 2,  thumb: "https://www-cdn.djiits.com/dps/92f41eddf6b8233ac6cdd8e3b58914f8.jpg", full: "https://www-cdn.djiits.com/dps/92f41eddf6b8233ac6cdd8e3b58914f8.jpg", title: "Inspeção termográfica de linha",    cat: "Inspeção" },
  { id: 3,  thumb: "https://www-cdn.djiits.com/dps/3518859e30b80a9a77eec2a4c8ac4906.jpg", full: "https://www-cdn.djiits.com/dps/4b3b9dc6b460e9d91fb660b697cfdeca.jpg", title: "Dock 3 — ciclo autônomo",          cat: "Equipamentos" },
  { id: 4,  thumb: "https://www-cdn.djiits.com/dps/0f7d0ee78e369ae32ae883982d52bafa.jpg", full: "https://www-cdn.djiits.com/dps/0f7d0ee78e369ae32ae883982d52bafa.jpg", title: "Sensor térmico VOx 640 px",        cat: "Equipamentos" },
  { id: 5,  thumb: "https://www-cdn.djiits.com/dps/56d393ce2c3600833fba064f8a60b78f.jpg", full: "https://www-cdn.djiits.com/dps/56d393ce2c3600833fba064f8a60b78f.jpg", title: "Monitoramento rede elétrica",      cat: "Inspeção" },
  { id: 6,  thumb: "https://www-cdn.djiits.com/dps/d93d6cff08c6a735850d449b7c3ef5e0.jpg", full: "https://www-cdn.djiits.com/dps/d93d6cff08c6a735850d449b7c3ef5e0.jpg", title: "Mapeamento NDVI florestal",        cat: "Ambiental" },
  { id: 7,  thumb: "https://www-cdn.djiits.com/dps/72622f7e64a41cc67fc83a1f528578ba.jpg", full: "https://www-cdn.djiits.com/dps/72622f7e64a41cc67fc83a1f528578ba.jpg", title: "Segurança portuária 24/7",         cat: "Segurança" },
  { id: 8,  thumb: "https://www-cdn.djiits.com/dps/bef1f86adbe9c814b2c2439dfefa9142.jpg", full: "https://www-cdn.djiits.com/dps/bef1f86adbe9c814b2c2439dfefa9142.jpg", title: "Operação Defesa Civil",            cat: "Emergências" },
  { id: 9,  thumb: "https://www-cdn.djiits.com/dps/62ca197c8968de6dc16d0fa4463f1504.jpg", full: "https://www-cdn.djiits.com/dps/62ca197c8968de6dc16d0fa4463f1504.jpg", title: "FlightHub 2 — central de comando", cat: "Software" },
  { id: 10, thumb: "https://www-cdn.djiits.com/dps/b732ccbb31fdbaac87ea00155919d588.jpg", full: "https://www-cdn.djiits.com/dps/b732ccbb31fdbaac87ea00155919d588.jpg", title: "Matrice 4T voo noturno industrial", cat: "Operações" },
  { id: 11, thumb: "https://www-cdn.djiits.com/dps/cf5e1cd6262d2eeecfb7e58f99ca7a1b.jpg", full: "https://www-cdn.djiits.com/dps/cf5e1cd6262d2eeecfb7e58f99ca7a1b.jpg", title: "Matrice 4E mapeamento florestal",   cat: "Ambiental" },
  { id: 12, thumb: "https://www-cdn.djiits.com/dps/e36163cb0e5373866cb8a03f0b0697a0.png", full: "https://www-cdn.djiits.com/dps/e36163cb0e5373866cb8a03f0b0697a0.png", title: "Decolagem autônoma Dock 3",        cat: "Operações" },
];

/** [MELHORIA v1.2] — Derivado de GALLERY para garantir consistência automática */
export const GALLERY_CATS: string[] = [
  "Todos",
  ...Array.from(new Set(GALLERY.map(g => g.cat))),
];

// ── Estatísticas de Mercado ──────────────────────────────────────────────────
export const STATS: MarketStat[] = [
  { v: "US$700 Bi", label: "Mercado Global 2035",  icon: TrendingUp },
  { v: "45%/ano",   label: "Crescimento do Setor", icon: Activity },
  { v: "R$2 Bi",    label: "Mercado Brasil/ano",    icon: Globe },
  { v: "8 funções", label: "Por Equipamento",       icon: Zap },
  { v: "< 4 meses", label: "Payback Médio",         icon: Award },
  { v: "24/7",      label: "Autonomia Operacional", icon: LifeBuoy },
];

// ── Como Funciona ────────────────────────────────────────────────────────────
export const HOW: HowStep[] = [
  { n: "01", title: "Diagnóstico Gratuito",       icon: Target,   desc: "Analisamos sua infraestrutura, área e objetivos. Proposta com ROI em até 48h — sem compromisso." },
  { n: "02", title: "Engenharia & Planejamento",  icon: Map,      desc: "Rotas autônomas 3D, posicionamento dos Docks, integração e configuração de alarmes no FlightHub 2." },
  { n: "03", title: "Instalação Especializada",   icon: Boxes,    desc: "Montagem do Dock 3, calibração RTK, integração com CFTV, testes de ciclo e homologação ANAC." },
  { n: "04", title: "Capacitação & Suporte 24/7", icon: BarChart3,desc: "Treinamento em IA, sensores térmicos e FlightHub 2. Suporte técnico 24/7 incluso no contrato." },
];

// ── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Preciso de piloto habilitado para operar o Dock 3?",
    a: "Para missões autônomas com o Dock 3, não é necessário piloto CANAC em campo. Entretanto, toda operação deve ser homologada junto à ANAC. A Aero Drone Solutions cuida de toda a documentação regulatória.",
  },
  {
    q: "Qual é o prazo de retorno do investimento (payback)?",
    a: "Em nossos cases reais, o payback médio ficou em menos de 4 meses. O Dock 3 opera 24/7 sem custo de mão de obra adicional e elimina os custos de incidentes não detectados.",
  },
  {
    q: "Como o sistema responde a um alarme de intrusão?",
    a: "O FlightHub 2 recebe o alerta via API REST, verifica as condições climáticas e aciona o Dock 3. Em menos de 60 segundos o Matrice 4TD está transmitindo vídeo térmico ao vivo para o COI.",
  },
  {
    q: "O sistema funciona em caso de chuva ou vento forte?",
    a: "O Dock 3 e o Matrice 4TD têm IP55 e operam com ventos de até 12 m/s. A estação meteorológica integrada adia missões automaticamente se as condições excederem os limites.",
  },
  {
    q: "Quantos Docks preciso para cobrir minha área?",
    a: "Um Dock 3 cobre raio de 10 km — 314 km². Para instalações maiores, trabalhamos com redes de Docks. No diagnóstico gratuito, calculamos a quantidade ideal.",
  },
  {
    q: "O que é o FlightHub 2 e preciso pagar a mais por ele?",
    a: "FlightHub 2 é o software cloud da DJI — obrigatório para o Dock 3. A compra inclui boas-vindas (20.000 min + 200 GB). A licença Professional custa R$ 15.000–20.000/ano.",
  },
];

// ── Comparativo ──────────────────────────────────────────────────────────────
export const COMPARATIVO: ComparativoRow[] = [
  { criterio: "Custo mensal",           humano: "R$ 18.000–35.000 (4 vigilantes 24/7)", drone: "R$ 3.000–8.000 (Dock 3 + FlightHub 2)", melhor: "drone" },
  { criterio: "Tempo de resposta",      humano: "8–25 minutos",                          drone: "< 60 segundos",                          melhor: "drone" },
  { criterio: "Cobertura noturna",      humano: "Limitada à rota de ronda",              drone: "100% do perímetro, câmera térmica",       melhor: "drone" },
  { criterio: "Identificação de alvos", humano: "Depende da iluminação",                 drone: "Térmica 640 px no breu absoluto",         melhor: "drone" },
  { criterio: "Registro de evidências", humano: "Relatório escrito manual",              drone: "Vídeo HD + dados GPS automáticos",         melhor: "drone" },
  { criterio: "Risco para a equipe",    humano: "Alto — confronto físico possível",      drone: "Zero — drone no lugar da pessoa",         melhor: "drone" },
  { criterio: "Disponibilidade 24/7",   humano: "Escala, férias, faltas",                drone: "Sem feriado, sem doença",                 melhor: "drone" },
  { criterio: "Payback",                humano: "Custo recorrente para sempre",          drone: "< 4 meses",                              melhor: "drone" },
];

// ── Iscas Digitais ───────────────────────────────────────────────────────────
export const ISCAS: Isca[] = [
  {
    icon: Calculator, tag: "Mais Baixado", tagColor: "#f97316",
    title: "Calculadora de ROI", subtitle: "Quanto sua operação perde sem drone?",
    desc: "Planilha interativa que calcula a redução de custos ao substituir rondas humanas por monitoramento autônomo 24/7.",
    cta: "Receber Calculadora Grátis",
    wa: "Olá, vim pelo site da Aero Drone Solutions e quero receber a Calculadora de ROI de drones autônomos.",
    accent: "#f97316", badge: "Planilha Excel",
    highlight: "Mostre ao seu diretor financeiro o payback em < 4 meses",
  },
  {
    icon: FileText, tag: "Para Engenheiros", tagColor: "#3b82f6",
    title: "Guia de Implementação", subtitle: "Segurança Perimetral 24/7 com Drones",
    desc: "Guia técnico completo: dimensionar cobertura, posicionar Dock 3, integrar com CFTV via API REST.",
    cta: "Receber o Guia Técnico",
    wa: "Olá, vim pelo site da Aero Drone Solutions e quero receber o Guia de Implementação de Segurança Perimetral.",
    accent: "#3b82f6", badge: "PDF 40 páginas",
    highlight: "Da decisão ao primeiro voo autônomo em 7 dias",
  },
  {
    icon: Thermometer, tag: "Exclusivo", tagColor: "#10b981",
    title: "Vídeo: Câmera Térmica em Ação", subtitle: "Flagrante real — Vista Park Sul, Brasília",
    desc: "Assista ao vídeo exclusivo de como o Matrice 4T identificou e rastreou furtadores ao vivo.",
    cta: "Quero Assistir ao Vídeo",
    wa: "Olá, vim pelo site e quero assistir ao vídeo do flagrante real com o Matrice 4T no Vista Park Sul.",
    accent: "#10b981", badge: "Vídeo Real",
    highlight: "A prova mais poderosa que câmera térmica funciona",
  },
  {
    icon: BookOpen, tag: "Alta Conversão", tagColor: "#8b5cf6",
    title: "Checklist de Vulnerabilidade", subtitle: "5 pontos cegos que custam caro",
    desc: "Auditoria rápida: 5 brechas de segurança que criminosos exploram e drones autônomos eliminam.",
    cta: "Receber Checklist Grátis",
    wa: "Olá, vim pelo site da Aero Drone Solutions e quero receber o Checklist de Vulnerabilidade de Segurança.",
    accent: "#8b5cf6", badge: "Checklist PDF",
    highlight: "Apresente ao conselho de segurança com dados concretos",
  },
];
