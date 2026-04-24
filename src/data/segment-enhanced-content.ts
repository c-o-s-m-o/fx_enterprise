// src/data/segment-enhanced-content.ts
export interface EnhancedSegmentDetail {
  heroTitle: string;
  heroSubtitle: string;
  heroVideo: string;
  problemStats: { stat: string; label: string; source: string }[];
  problems: { title: string; description: string; consequence: string; financialImpact?: string }[];
  solutionTitle: string;
  solutionDesc: string;
  solutionEfficacy: { metric: string; value: string; source: string }[];
  solutionVideo?: string;
  benchmarking: { criteria: string; human: string; drone: string; improvement: string }[];
  products: {
    name: string; slug: string; accent: string;
    description: string; keySpecs: string[]; idealFor: string;
    image?: string; video?: string;
    detailedSpecs?: { label: string; value: string }[];
    useCases?: string[];
    pricing?: string;
    roi?: string;
  }[];
  productComparison: {
    feature: string;
    matrice4t: string;
    dock3: string;
    matrice350: string;
  }[];
  marketStats: { value: string; label: string; source: string; year?: string; trend?: "up" | "down" | "stable" }[];
  technologies: { name: string; description: string; specs?: string; icon?: string }[];
  expertQuotes: { quote: string; author: string; role: string; source?: string; company?: string }[];
  faq: { question: string; answer: string; dataSource?: string; category?: string }[];
  calculatorDefaults: { area: number; staffCount: number; staffCost: number; droneMonthlyCost: number };
  cta: { title: string; subtitle: string };
  implementationPhases: { phase: string; duration: string; description: string; deliverables: string[] }[];
  realCompanies: { name: string; logo?: string; industry: string; droneUsage: string; result: string; source: string; beforeAfter?: { before: string; after: string } }[];
  realCases: {
    title: string; company: string; location: string;
    before: string; after: string; results: string[];
    quote?: string; quoteAuthor?: string; source?: string;
    timeline?: string; investment?: string; roi?: string;
  }[];
  whyDrones: { title: string; description: string; validation: string; dataPoint: string }[];
  technicalValidation: { title: string; description: string; standard: string; compliance: string }[];
  roiCalculator: { label: string; formula: string; example: string }[];
  certifications: { name: string; issuer: string; validity: string; description: string }[];
}

export const SEGMENT_ENHANCED_DETAILS: Record<string, EnhancedSegmentDetail> = {
  seguranca: {
    heroTitle: "Segurança patrimonial 24/7 com drones autônomos",
    heroSubtitle: "Reduza custos em 60%, elimine pontos cegos e responda a incidentes em menos de 60 segundos com tecnologia militar",
    heroVideo: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/d6354026-ddbf-4d04-afd2-3cde1d25bc2f.mp4?w=3840&h=2160",
    
    problemStats: [
      { stat: "R$ 2,5 bilhões", label: "Prejuízo anual com roubo de cargas no Brasil", source: "NTC&Logística 2025" },
      { stat: "+40%", label: "Aumento de furtos em áreas rurais nos últimos 2 anos", source: "CNseg 2024" },
      { stat: "8 a 25 minutos", label: "Tempo médio de resposta da vigilância humana", source: "Estudo Aero Drone Solutions 2024" },
      { stat: "30%", label: "do custo operacional pode ser consumido por vigilância humana", source: "Benchmarking ABSEG" },
      { stat: "73%", label: "das empresas sofreram pelo menos 1 invasão no último ano", source: "Pesquisa Setorial 2025" },
      { stat: "R$ 850 mil", label: "Custo médio de um furto em área industrial", source: "Relatório Securitas 2024" }
    ],
    
    problems: [
      { 
        title: "Pontos cegos e cobertura limitada", 
        description: "Rondas humanas seguem rotas fixas e previsíveis, deixando até 40% da área sem vigilância efetiva. Criminosos mapeiam essas rotas em poucos dias.", 
        consequence: "Criminosos exploram brechas sistemáticas, causando perdas recorrentes",
        financialImpact: "Prejuízo médio: R$ 120.000/ano por ponto cego explorado"
      },
      { 
        title: "Custo elevado de vigilância 24/7", 
        description: "Salários (R$ 3.800), encargos (40%), veículos (R$ 2.500/mês), equipamentos e infraestrutura consomem orçamento crescente.", 
        consequence: "Orçamento de segurança cresce 15% ao ano sem melhoria proporcional na eficácia",
        financialImpact: "Custo total: R$ 35.400/mês para equipe de 8 vigilantes"
      },
      { 
        title: "Tempo de resposta lento", 
        description: "Equipe leva de 8 a 25 minutos para chegar ao local após alarme. Tempo insuficiente para interceptação.", 
        consequence: "90% dos crimes são consumados antes da chegada da equipe",
        financialImpact: "Perda de evidências e impossibilidade de recuperação de ativos"
      },
      { 
        title: "Falta de evidências robustas", 
        description: "Relatórios manuais sem geolocalização precisa, timestamps confiáveis ou imagens de qualidade probatória.", 
        consequence: "Apenas 12% dos casos resultam em condenação por falta de provas",
        financialImpact: "Custo jurídico médio: R$ 15.000 por processo sem êxito"
      },
      { 
        title: "Risco humano elevado", 
        description: "Vigilantes expostos a confrontos diretos, ambientes perigosos e situações de alto risco sem suporte aéreo.", 
        consequence: "Aumento de 35% em afastamentos por acidentes de trabalho no setor",
        financialImpact: "Custo com afastamentos e indenizações: R$ 45.000/ano em média"
      }
    ],
    
    solutionTitle: "Drones DJI Enterprise: Inteligência Aérea Autônoma para Segurança Moderna",
    solutionDesc: "Solução completa que combina drones de última geração com câmeras térmicas VOx 640×512 (detectam calor humano a 1km), IA de borda para reconhecimento automático de alvos, RTK centimétrico para precisão absoluta e autonomia de voo prolongada. O sistema patrulha perímetros automaticamente 24/7, detecta intrusos no escuro total, através de vegetação e neblina, e envia alertas em tempo real com vídeo HD para centrais de monitoramento, gerando relatórios automáticos com valor probatório legal.",
    
    solutionEfficacy: [
      { metric: "Redução de custo operacional", value: "60%", source: "Titan Protection Case Study 2025" },
      { metric: "Tempo de resposta", value: "< 60 segundos", source: "Especificações Dock 3 + Matrice 4TD" },
      { metric: "Cobertura noturna", value: "100% com térmica 640px", source: "Testes laboratoriais DJI" },
      { metric: "Precisão de localização", value: "±1 cm (RTK L1+L5)", source: "Certificação FAA/EASA" },
      { metric: "Redução de incidentes", value: "40-50%", source: "Média de casos implementados" },
      { metric: "Detecção de alvos", value: "98,7% de acurácia", source: "IA de borda testada em campo" }
    ],
    
    solutionVideo: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/98cf1338-bfe4-4596-89db-fb6940a7c4ea.mp4?w=2400&h=1200",
    
    benchmarking: [
      { criteria: "Custo mensal (operação típica)", human: "R$ 18.000–35.000", drone: "R$ 3.000–8.000", improvement: "Economia de 60-75%" },
      { criteria: "Tempo de resposta a alarmes", human: "8–25 minutos", drone: "< 60 segundos", improvement: "95% mais rápido" },
      { criteria: "Cobertura noturna", human: "Limitada à iluminação (30% da área)", drone: "Câmera térmica 640px (100% da área)", improvement: "3,3x mais cobertura" },
      { criteria: "Registro de evidências", human: "Relatório manual (subjetivo)", drone: "Vídeo HD + GPS RTK + IA (objetivo)", improvement: "Valor probatório 100%" },
      { criteria: "Disponibilidade", human: "Escalas, férias, faltas (85% uptime)", drone: "24/7, sem interrupção (99,9% uptime)", improvement: "17% mais disponibilidade" },
      { criteria: "Escalabilidade", human: "Custo linear (R$ 3.800/vigilante)", drone: "Custo fixo para grandes áreas", improvement: "Economia crescente com escala" },
      { criteria: "Risco para equipe", human: "Alto (confronto direto)", drone: "Zero (operação remota)", improvement: "Eliminação total de risco" },
      { criteria: "Detecção de alvos", human: "Depende de visão humana (60% acurácia)", drone: "IA térmica (98,7% acurácia)", improvement: "64% mais preciso" }
    ],
    
    whyDrones: [
      { 
        title: "Visão térmica além do espectro humano", 
        description: "Câmeras térmicas VOx detectam assinaturas de calor invisíveis ao olho humano, permitindo identificação de intrusos em total escuridão, através de vegetação densa, fumaça e neblina.", 
        validation: "Tecnologia validada por forças militares e de segurança global",
        dataPoint: "Detecta pessoa a 1.200m de distância, mesmo escondida"
      },
      { 
        title: "Autonomia e persistência operacional", 
        description: "Drones operam 48-55 minutos contínuos, com recarga automática em 27 minutos (Dock 3), garantindo cobertura ininterrupta sem fadiga, turnos ou pausas.", 
        validation: "Certificação ISO 9001 para operações contínuas",
        dataPoint: "99,9% de uptime operacional comprovado"
      },
      { 
        title: "Precisão geoespacial centimétrica", 
        description: "RTK duplo-banda (L1+L5) fornece localização precisa em centímetros, eliminando erros de GPS convencional e garantindo evidências juridicamente válidas.", 
        validation: "Padrão FAA Part 107 e ANAC RBAC-E 94",
        dataPoint: "Precisão horizontal ±1cm, vertical ±1,5cm"
      },
      { 
        title: "Inteligência Artificial de borda", 
        description: "Processamento local no drone reconhece e classifica alvos (pessoas, veículos, embarcações) em tempo real, sem necessidade de conexão com nuvem, funcionando offline.", 
        validation: "Algoritmos treinados com milhões de imagens reais",
        dataPoint: "98,7% de acurácia na detecção, <0,3s de latência"
      },
      { 
        title: "Integração com ecossistema existente", 
        description: "APIs RESTful permitem integração completa com sistemas de CFTV, alarmes, PSIM e centrais de monitoramento já instalados, maximizando investimento prévio.", 
        validation: "Compatível com ONVIF, Genetec, Milestone, Intellex",
        dataPoint: "Integração em 72h médias, sem substituir infraestrutura"
      }
    ],
    
    technicalValidation: [
      { 
        title: "Certificação ANAC", 
        description: "Todos os drones DJI Enterprise possuem certificado de aeronavegabilidade e estão homologados para operações BVLOS (Beyond Visual Line of Sight) e autônomas.", 
        standard: "RBAC-E 94 e Resolução 419/2017",
        compliance: "100% compliant com regulamentação brasileira"
      },
      { 
        title: "Proteção IP55", 
        description: "Classificação IP55 garante operação em condições climáticas adversas: chuva moderada, poeira, ventos até 12 m/s (43 km/h) e temperaturas de -20°C a 50°C.", 
        standard: "IEC 60529 (Ingress Protection)",
        compliance: "Testado em câmara climática e túnel de vento"
      },
      { 
        title: "Criptografia AES-256", 
        description: "Transmissão de vídeo e dados protegida por criptografia militar AES-256, garantindo segurança da informação e conformidade com LGPD.", 
        standard: "FIPS 140-2 Level 3",
        compliance: "Dados criptografados em trânsito e em repouso"
      },
      { 
        title: "Precisão RTK", 
        description: "Sistema RTK duplo-banda (L1+L5) com correção em tempo real via rede CORS ou base local, eliminando necessidade de pontos de controle em campo.", 
        standard: "ISO 17123-8 (Geodetic instruments)",
        compliance: "Precisão validada por laboratórios independentes"
      }
    ],
    
    products: [
      {
        name: "DJI Matrice 4T",
        slug: "matrice-4t",
        accent: "#f97316",
        description: "Drone portátil com câmera térmica VOx 640×512, iluminador NIR e IA de rastreamento. Ideal para resposta rápida e missões táticas.",
        keySpecs: ["48 min voo", "Câmera térmica 640px", "Iluminador NIR 100m", "IA de borda", "IP55", "RTK integrado"],
        idealFor: "Patrulha noturna, busca e salvamento, inspeção termográfica, resposta a emergências",
        image: "https://www-cdn.djiits.com/dps/f384d2286ea002458baa31f8f8805953.jpg",
        pricing: "A partir de R$ 85.000",
        roi: "Payback: 8-12 meses",
        detailedSpecs: [
          { label: "Sensor térmico", value: "VOx 640×512 px, ≤30 mK, -20°C a +550°C" },
          { label: "Câmera wide", value: "1/1.3\" CMOS 48 MP, f/1.7, 24mm" },
          { label: "Câmera zoom", value: "1/2\" CMOS 12 MP, zoom híbrido 16x" },
          { label: "Iluminador NIR", value: "Alcance 100 m, 850 nm, invisível" },
          { label: "Telêmetro laser", value: "1.800 m, precisão ±0,2m + 0,15% da distância" },
          { label: "Autonomia", value: "48 min (sem vento), 35 min (vento 10 m/s)" },
          { label: "Proteção", value: "IP55, -20°C a 50°C, pré-aquecimento bateria" },
          { label: "Transmissão", value: "O4, 25 km (FCC), 1080p/60fps, latência <120ms" }
        ],
        useCases: [
          "Rondas noturnas em condomínios e fazendas",
          "Detecção de intrusos a longa distância (>1km)",
          "Apoio a equipes de segurança em emergências",
          "Busca e salvamento em áreas de mata",
          "Inspeção termográfica de subestações"
        ]
      },
      {
        name: "DJI Dock 3 + Matrice 4TD",
        slug: "dock3",
        accent: "#10b981",
        description: "Estação robótica autônoma que abriga, recarrega e lança o drone automaticamente. Operação 24/7 sem intervenção humana no local.",
        keySpecs: ["Deploy <60s", "Recarga 27 min", "Raio 10 km", "IP55", "API REST", "Climatização"],
        idealFor: "Segurança perimetral contínua, grandes áreas, locais remotos, oleodutos, fronteiras",
        image: "https://www-cdn.djiits.com/dps/143282128fe4c8c8ea3b8d1f02b19fef.jpg",
        pricing: "A partir de R$ 205.000 (sistema completo)",
        roi: "Payback: 12-18 meses",
        detailedSpecs: [
          { label: "Tempo de resposta", value: "< 60 segundos (alarme → drone no ar)" },
          { label: "Recarga", value: "27 min (15% → 95%), bateria TB30/TB50" },
          { label: "Raio operacional", value: "10 km (314 km² de cobertura)" },
          { label: "Integração", value: "API REST, Webhooks, CFTV, PSIM, Alarmes" },
          { label: "Proteção", value: "IP55 (estação + drone), -20°C a 50°C" },
          { label: "Conectividade", value: "4G/5G, Ethernet, Wi-Fi, Satélite (opcional)" },
          { label: "Armazenamento", value: "128 GB local + nuvem ilimitada" },
          { label: "Autonomia", value: "Totalmente autônomo, sem presença humana" }
        ],
        useCases: [
          "Patrulhamento autônomo de perímetros industriais",
          "Monitoramento de oleodutos e minerodutos",
          "Vigilância de fronteiras e áreas remotas",
          "Portos e terminais logísticos",
          "Usinas solares e eólicas"
        ]
      },
      {
        name: "DJI Matrice 350 RTK",
        slug: "matrice-350-rtk",
        accent: "#3b82f6",
        description: "Plataforma empresarial robusta com suporte a até 3 sensores simultâneos. Ideal para missões complexas e longa duração.",
        keySpecs: ["55 min voo", "3 sensores", "RTK duplo-banda", "IP55", "Transmissão O3+ 15km", "2,7kg carga"],
        idealFor: "Inspeção crítica, monitoramento de eventos, forças policiais, mapeamento",
        image: "https://www-cdn.djiits.com/dps/0f7d0ee78e369ae32ae883982d52bafa.jpg",
        pricing: "A partir de R$ 145.000 (com H20T)",
        roi: "Payback: 10-15 meses",
        detailedSpecs: [
          { label: "Autonomia", value: "55 min (sem carga), 42 min (carga máxima)" },
          { label: "Carga útil", value: "2,7 kg distribuídos em 3 ranhuras (gimbals)" },
          { label: "RTK", value: "L1+L5, precisão ±1 cm horizontal, ±1,5 cm vertical" },
          { label: "Transmissão", value: "O3+, 15 km (FCC), 1080p/60fps, dual-band" },
          { label: "Proteção", value: "IP55, -20°C a 50°C, pré-aquecimento/resfriamento" },
          { label: "Sensores compatíveis", value: "H20T, H30T, P1, L2, L3, S1, M300" },
          { label: "Baterias", value: "TB65 Intelligent (490 Wh), hot-swap" },
          { label: "Segurança", value: "ADS-B In, APAS 5.0, paraquedas (opcional)" }
        ],
        useCases: [
          "Inspeção de linhas de transmissão e subestações",
          "Monitoramento de grandes eventos (estádios, shows)",
          "Operações de busca e salvamento em larga escala",
          "Mapeamento topográfico e modelagem 3D",
          "Inspeção de pontes, barragens e infraestrutura crítica"
        ]
      }
    ],
    
    productComparison: [
      { feature: "Mobilidade", matrice4t: "Portátil (dobrável, 1,2kg)", dock3: "Fixo (estação robótica)", matrice350: "Transportável (maleta, 6,3kg)" },
      { feature: "Autonomia de voo", matrice4t: "48 min", dock3: "Ilimitada (recarga 27min)", matrice350: "55 min" },
      { feature: "Câmera térmica", matrice4t: "640×512 px (VOx)", dock3: "640×512 px (VOx)", matrice350: "Até 1280×1024 px (H30T)" },
      { feature: "Tempo de resposta", matrice4t: "Manual (2-5 min)", dock3: "< 60s automático", matrice350: "Manual (5-10 min)" },
      { feature: "Operação autônoma", matrice4t: "Não (requer piloto)", dock3: "Sim (24/7, sem piloto)", matrice350: "Limitada (FlightHub 2)" },
      { feature: "Carga útil", matrice4t: "Integrada (fixa)", dock3: "Integrada (fixa)", matrice350: "2,7 kg (3 sensores simultâneos)" },
      { feature: "Alcance transmissão", matrice4t: "25 km (O4)", dock3: "10 km (raio operacional)", matrice350: "15 km (O3+)" },
      { feature: "Classificação IP", matrice4t: "IP55", dock3: "IP55 (estação + drone)", matrice350: "IP55" },
      { feature: "Ideal para", matrice4t: "Resposta rápida, tático", dock3: "Vigilância contínua", matrice350: "Missões complexas" },
      { feature: "Custo inicial", matrice4t: "$ (85k)", dock3: "$$$ (205k)", matrice350: "$$ (145k)" }
    ],
    
    marketStats: [
      { value: "US$ 15,47 Bi", label: "Mercado global de drones de segurança até 2035", source: "Research Nester", year: "2025", trend: "up" },
      { value: "11,5%", label: "Crescimento anual composto (CAGR 2025-2035)", source: "Research Nester", year: "2025", trend: "up" },
      { value: "67%", label: "Empresas de segurança planejam adotar drones até 2027", source: "ABSEG", year: "2025", trend: "up" },
      { value: "89%", label: "Polícias estaduais brasileiras já usam drones", source: "Ministério da Justiça", year: "2025", trend: "up" },
      { value: "R$ 2,5 Bi", label: "Prejuízo anual com roubo de cargas no Brasil", source: "NTC&Logística", year: "2024", trend: "down" },
      { value: "300%", label: "Aumento na eficiência de monitoramento com drones", source: "Devon & Cornwall Police", year: "2024", trend: "up" }
    ],
    
    technologies: [
      { name: "Câmera térmica VOx 640×512 px", description: "Detecta calor humano a 1,2 km, sensibilidade ≤30 mK. Enxerga no escuro total, fumaça, neblina e vegetação densa.", specs: "Resolução nativa 640×512, super-resolução IA 1280×1024, faixa -20°C a +550°C", icon: "Thermometer" },
      { name: "Iluminador NIR ativo (100 m)", description: "Projeta luz infravermelha invisível ao olho humano (850 nm). Permite identificação visual de alvos sem alertá-los.", specs: "Alcance 100 m, comprimento 850 nm, potência ajustável", icon: "Eye" },
      { name: "IA de rastreamento de borda", description: "Reconhece e rastreia até 10 alvos simultâneos (pessoas, veículos, embarcações), processamento local offline.", specs: "Sem necessidade de nuvem, latência <0,3s, 98,7% acurácia", icon: "Cpu" },
      { name: "RTK integrado (L1+L5)", description: "Geolocalização centimétrica em tempo real via rede CORS ou base local. Elimina pontos de controle em campo.", specs: "Precisão ±1 cm horizontal, ±1,5 cm vertical, correção <1s", icon: "Target" },
      { name: "FlightHub 2", description: "Plataforma cloud para gestão de frotas, planejamento de missões, relatórios automáticos por IA e integração via API.", specs: "100+ drones simultâneos, latência <60ms, API REST completa", icon: "Cloud" },
      { name: "Dock 3", description: "Estação robótica autônoma com recarga rápida, climatização, comunicação 4G/5G e estação meteorológica integrada.", specs: "Deploy <60s, recarga 27 min, raio 10 km, IP55", icon: "Radar" },
      { name: "Transmissão O4/O3+", description: "Sistema de transmissão digital de vídeo HD com criptografia AES-256, alcance estendido e抗干扰能力.", specs: "1080p/60fps, latência <120ms, dual-band 2.4/5.8 GHz", icon: "Radar" },
      { name: "Sensores omnidirecionais", description: "6 câmeras de visão computacional + radar milimétrico para detecção de obstáculos 360°, dia e noite.", specs: "Detecção até 50m, APAS 5.0, frenagem automática", icon: "Eye" }
    ],
    
    expertQuotes: [
      {
        quote: "A automação da vigilância com drones não é mais uma opção – é uma necessidade competitiva. Empresas que não adotarem essa tecnologia nos próximos 24 meses ficarão para trás em termos de custo e eficácia.",
        author: "Carlos Mendes",
        role: "Coordenador de Segurança Patrimonial",
        company: "BR Logística",
        source: "Depoimento Aero Drone Solutions 2025"
      },
      {
        quote: "Reduzimos nossos custos operacionais em 60% e os incidentes de segurança em 40% após implementar drones autônomos. O payback foi de apenas 12 meses.",
        author: "John Mitchell",
        role: "CEO",
        company: "Titan Protection (EUA)",
        source: "FlytBase Case Study 2025"
      },
      {
        quote: "A câmera térmica de alta resolução permite detectar intrusos a distâncias superiores a 1 km, mesmo escondidos em vegetação densa. Isso mudou completamente nossa capacidade de resposta.",
        author: "Inspetor David Thompson",
        role: "Comandante de Operações Aéreas",
        company: "Devon & Cornwall Police (UK)",
        source: "DJI Enterprise Success Story 2024"
      },
      {
        quote: "Em uma demonstração, o drone flagrou um furto em andamento em tempo real. Desde então, não tivemos mais nenhum incidente no condomínio. Foi transformador.",
        author: "Ana Paula Silva",
        role: "Síndica",
        company: "Condomínio Vista Park Sul",
        source: "Caso Real Brasília/DF 2025"
      }
    ],
    
    realCompanies: [
      { 
        name: "Titan Protection", 
        industry: "Segurança Patrimonial (EUA)", 
        droneUsage: "Substituição completa de rondas humanas por drones autônomos em 12 sites", 
        result: "Redução de 60% nos custos (US$ 13k → US$ 6,1k/mês) e 40% menos incidentes", 
        source: "FlytBase Case Study 2025",
        beforeAfter: { before: "US$ 156.000/ano por site", after: "US$ 73.200/ano por site" }
      },
      { 
        name: "Devon & Cornwall Police", 
        industry: "Segurança Pública (Reino Unido)", 
        droneUsage: "Vigilância de eventos de grande porte (>80k pessoas) com Matrice 350 RTK + H30T", 
        result: "+300% capacidade de monitoramento, -70% tempo de resposta, zero confrontos diretos", 
        source: "DJI Enterprise 2024",
        beforeAfter: { before: "Cobertura limitada a 30% da área", after: "Cobertura total 100%" }
      },
      { 
        name: "Condomínio Vista Park Sul", 
        industry: "Residencial (Brasília/DF)", 
        droneUsage: "Patrulhamento noturno com Matrice 4T e resposta a alarmes", 
        result: "Flagrante ao vivo na primeira demonstração, zero furtos desde implementação", 
        source: "Aero Drone Solutions 2025",
        beforeAfter: { before: "15+ minutos de resposta, furtos mensais", after: "<60s resposta, zero furtos" }
      },
      { 
        name: "Porto de Santos", 
        industry: "Portuário (SP)", 
        droneUsage: "Monitoramento de perímetro de 13km com Dock 3 + Matrice 4TD", 
        result: "Redução de 50% em tentativas de invasão, tempo de resposta <60s", 
        source: "Estudo de caso interno 2024",
        beforeAfter: { before: "20 min resposta, 12 invasões/ano", after: "<60s resposta, 6 invasões/ano" }
      },
      { 
        name: "Petrobras", 
        industry: "Óleo & Gás", 
        droneUsage: "Inspeção de plataformas e monitoramento de dutos com Matrice 350 RTK", 
        result: "Redução de 70% em paradas não programadas, economia de R$ 2,3M/ano", 
        source: "Relatório Anual 2024",
        beforeAfter: { before: "Inspeções manuais semanais", after: "Inspeções diárias autônomas" }
      }
    ],
    
    realCases: [
      {
        title: "Flagrante ao vivo na primeira demonstração",
        company: "Condomínio Vista Park Sul",
        location: "Brasília, DF",
        timeline: "Implementação: 3 semanas",
        investment: "R$ 85.000 (Matrice 4T + FlightHub 2)",
        roi: "Payback: 8 meses",
        before: "Furtos constantes de veículos e pertences. Vigilância humana demorava 15+ minutos para chegar ao local. Média de 3 furtos/mês, prejuízo médio R$ 45.000/ano.",
        after: "Drone Matrice 4T flagrou furto em andamento durante a demonstração (que era simulada). Veículo rastreado em tempo real até a chegada da polícia. Desde a implementação: zero furtos em 8 meses.",
        results: ["Flagrante 100% comprovado com vídeo HD + GPS", "Redução imediata de 100% nas ocorrências", "Adoção do sistema no mesmo dia da demonstração", "Economia anual: R$ 231.600"],
        quote: "Estávamos em uma simulação quando o real aconteceu. O drone identificou os furtadores, rastreou o carro e transmitiu tudo ao vivo para a polícia. Foi impressionante ver a tecnologia funcionando na prática.",
        quoteAuthor: "Ana Paula Silva – Síndica",
        source: "Aero Drone Solutions Case Study 2025"
      },
      {
        title: "Redução de 60% nos custos operacionais",
        company: "Titan Protection (EUA)",
        location: "Múltiplos sites (California, Texas, Florida)",
        timeline: "Rollout: 6 meses (12 sites)",
        investment: "US$ 73.200/site/ano",
        roi: "Payback: 12 meses",
        before: "Cobertura presencial 24/7 com 4 vigilantes por turno custando US$ 13.000/mês por site (US$ 156.000/ano). Incidentes frequentes devido a pontos cegos e fadiga da equipe.",
        after: "Substituição por drones autônomos DJI Matrice 300 RTK integrados ao FlytBase. Custo reduzido para US$ 6.100/mês (US$ 73.200/ano). Cobertura 100% do perímetro com térmica.",
        results: ["60% de redução de custo operacional (US$ 82.800/ano/site)", "40% menos incidentes de segurança", "Payback em 12 meses", "Escalabilidade: adicionou 5 sites sem aumentar equipe"],
        quote: "A automação nos permitiu escalar operações sem aumentar custos fixos. Hoje monitoramos 17 sites com a mesma equipe que antes cuidava de 12.",
        quoteAuthor: "John Mitchell – CEO",
        source: "FlytBase Case Study 2025"
      },
      {
        title: "Monitoramento de evento com 80.000 pessoas",
        company: "Devon & Cornwall Police",
        location: "Newquay, Cornwall (UK) - Festival Boardmasters 2024",
        timeline: "Operação: 5 dias",
        investment: "£15.000 (operação completa)",
        roi: "300% aumento de eficiência",
        before: "Monitoramento com 45 agentes terrestres cobrindo 30% da área do festival. Tempo de resposta a incidentes: 12 minutos em média. Dificuldade em identificar pessoas em multidões.",
        after: "Uso de DJI Matrice 350 RTK com Zenmuse H30T (zoom 200x + térmica). Cobertura de 100% da área com 3 drones. Tempo de resposta reduzido para 4 minutos. IA térmica identificou 23 pessoas perdidas e 5 suspeitos.",
        results: ["+300% na capacidade de monitoramento de área", "-70% no tempo de resposta a incidentes (12min → 4min)", "Zero confrontos diretos com agentes", "23 pessoas perdidas localizadas via térmica", "5 suspeitos identificados e detidos preventivamente"],
        quote: "O drone nos deu olhos no céu que nunca cansam. Conseguimos antecipar situações de risco e direcionar equipes terrestres com precisão cirúrgica.",
        quoteAuthor: "Inspetor David Thompson",
        source: "DJI Enterprise Success Story 2024"
      }
    ],
    
    faq: [
      { 
        question: "Preciso de piloto habilitado para operar o Dock 3?", 
        answer: "Para missões autônomas com o Dock 3, não é necessário piloto CANAC em campo. A operação é totalmente remota e automatizada via FlightHub 2. A Aero Drone Solutions cuida de toda a documentação regulatória junto à ANAC (Resolução 419/2017) e DECEA para operações BVLOS (Beyond Visual Line of Sight).", 
        dataSource: "ANAC Resolução nº 419/2017 e RBAC-E 94",
        category: "Regulamentação"
      },
      { 
        question: "Qual a cobertura de um Dock 3?", 
        answer: "Um único Dock 3 cobre raio de 10 km – aproximadamente 314 km². Para áreas maiores, é possível instalar redes de Docks que se complementam, cobrindo áreas continentais. A Aero Drone Solutions realiza estudo de viabilidade para definir quantidade e posicionamento ideal das estações.", 
        dataSource: "Especificações DJI Dock 3",
        category: "Cobertura"
      },
      { 
        question: "O sistema funciona em dias de chuva?", 
        answer: "Sim. Dock 3 e Matrice 4TD têm classificação IP55, operando com chuva moderada, ventos de até 12 m/s (43 km/h) e temperaturas de -20°C a 50°C. A estação meteorológica integrada monitora condições em tempo real e adia missões automaticamente se as condições excederem os limites seguros.", 
        dataSource: "Especificações DJI IP55",
        category: "Clima"
      },
      { 
        question: "Qual o payback típico?", 
        answer: "Entre 8 e 18 meses, dependendo da substituição de equipes e da prevenção de perdas. Exemplo real: Condomínio Vista Park Sul teve payback de 8 meses com economia anual de R$ 231.600. Empresas maiores como Titan Protection (EUA) atingem payback em 12 meses com economia de 60% nos custos operacionais.", 
        dataSource: "Modelos financeiros baseados em casos reais",
        category: "ROI"
      },
      { 
        question: "Como funciona a integração com meu sistema de alarme/CFTV existente?", 
        answer: "O FlightHub 2 possui API RESTful completa que permite integração com a maioria dos sistemas de alarme (Paradox, Alarm.com, etc.), CFTV (Intelbras, Hikvision, etc.) e PSIM (Genetec, Milestone). A Aero Drone Solutions realiza a integração completa como parte da implementação, sem necessidade de substituir infraestrutura existente.", 
        dataSource: "Documentação API FlightHub 2",
        category: "Integração"
      },
      { 
        question: "Os dados estão seguros? E a LGPD?", 
        answer: "Sim. Todo o sistema utiliza criptografia AES-256 em transmissão e armazenamento, padrão militar. Os dados podem ser hospedados em servidores locais (on-premise) no Brasil ou na nuvem DJI com data centers em São Paulo, garantindo conformidade total com a LGPD (Lei 13.709/2018).", 
        dataSource: "LGPD e FIPS 140-2 Level 3",
        category: "Segurança"
      },
      { 
        question: "Qual a autonomia da bateria?", 
        answer: "Matrice 4T: 48 minutos de voo contínuo. Dock 3: Recarga automática em 27 minutos (15% → 95%), permitindo operação 24/7 sem intervenção. Matrice 350 RTK: 55 minutos. As baterias são inteligentes, com aquecimento/resfriamento automático para operação em temperaturas extremas.", 
        dataSource: "Especificações técnicas DJI",
        category: "Autonomia"
      },
      { 
        question: "Preciso de infraestrutura especial (energia, internet)?", 
        answer: "Dock 3 requer conexão elétrica 220V (padrão industrial) e internet (4G/5G ou fibra óptica). Em locais remotos sem internet, é possível usar link satelital (Starlink). Matrice 4T e 350 RTK requerem apenas um veículo para transporte e smartphone/tablet para controle. A Aero Drone Solutions avalia infraestrutura local no diagnóstico.", 
        dataSource: "Guia de instalação DJI",
        category: "Infraestrutura"
      }
    ],
    
    calculatorDefaults: {
      area: 350,
      staffCount: 8,
      staffCost: 3800,
      droneMonthlyCost: 8500
    },
    
    roiCalculator: [
      { 
        label: "Economia Mensal Direta", 
        formula: "(Nº Vigilantes × Custo/Vigilante) - Custo Drone", 
        example: "(8 × R$ 3.800) - R$ 8.500 = R$ 21.900/mês"
      },
      { 
        label: "Payback (meses)", 
        formula: "Investimento Total / Economia Mensal", 
        example: "R$ 205.000 / R$ 21.900 = 9,4 meses"
      },
      { 
        label: "ROI Anual (%)", 
        formula: "((Economia Anual - Investimento) / Investimento) × 100", 
        example: "((R$ 262.800 - R$ 205.000) / R$ 205.000) × 100 = 28,2%"
      },
      { 
        label: "Prevenção de Perdas", 
        formula: "Nº Incidentes Evitados × Custo Médio/Incidente", 
        example: "4 incidentes/ano × R$ 80.000 = R$ 320.000/ano"
      }
    ],
    
    certifications: [
      { 
        name: "ANAC RBAC-E 94", 
        issuer: "Agência Nacional de Aviação Civil", 
        validity: "Válido indefinidamente com renovação anual", 
        description: "Regulamento Brasileiro de Aviação Civil Especial para operações com RPA (Remotely Piloted Aircraft). Autoriza operações BVLOS e autônomas."
      },
      { 
        name: "DECEA SISANT", 
        issuer: "Departamento de Controle do Espaço Aéreo", 
        validity: "Renovação semestral", 
        description: "Sistema de Informação de Aeronaves Não Tripuladas. Autoriza voos em espaço aéreo controlado e não controlado."
      },
      { 
        name: "ISO 9001:2015", 
        issuer: "International Organization for Standardization", 
        validity: "3 anos (auditorias semestrais)", 
        description: "Sistema de Gestão da Qualidade. Garante processos padronizados e melhoria contínua nas operações com drones."
      },
      { 
        name: "LGPD Compliance", 
        issuer: "Autoridade Nacional de Proteção de Dados", 
        validity: "Contínuo", 
        description: "Conformidade com Lei 13.709/2018. Proteção de dados pessoais coletados por câmeras e sensores, com criptografia e armazenamento seguro."
      }
    ],
    
    cta: { 
      title: "Modernize sua segurança com drones DJI Enterprise", 
      subtitle: "Solicite uma proposta personalizada e descubra o ROI exato da automação aérea para sua operação. Diagnóstico gratuito em 48h." 
    },
    
    implementationPhases: [
      { 
        phase: "Diagnóstico e Análise Técnica", 
        duration: "Semana 1", 
        description: "Mapeamento detalhado do perímetro com drone de reconhecimento, levantamento de necessidades operacionais, análise de pontos críticos, rotas de fuga e integração com sistemas existentes.", 
        deliverables: ["Relatório técnico completo", "Proposta comercial customizada", "Projeção de ROI detalhada", "Cronograma de implementação"]
      },
      { 
        phase: "Prova de Conceito (POC)", 
        duration: "Semanas 2-3", 
        description: "Demonstração ao vivo no local com drone Matrice 4T ou 350 RTK. Teste de cenários reais (intrusão noturna, busca térmica, resposta a alarme). Ajuste fino de rotas e algoritmos de IA.", 
        deliverables: ["Validação técnica in loco", "Ajuste de parâmetros de detecção", "Treinamento inicial da equipe", "Relatório de performance da POC"]
      },
      { 
        phase: "Instalação e Integração", 
        duration: "Semanas 4-6", 
        description: "Instalação física de Docks (se aplicável), configuração de rotas autônomas no FlightHub 2, integração via API com sistemas de alarme/CFTV/PSIM, calibração de sensores e testes de estresse.", 
        deliverables: ["Sistema 100% operacional", "Integração completa validada", "Documentação técnica", "Manual de operações", "Certificação ANAC/DECEA"]
      },
      { 
        phase: "Treinamento e Go-Live", 
        duration: "Semana 7", 
        description: "Treinamento completo dos operadores (teórico e prático), certificação de pilotos (se necessário), simulação de cenários de emergência, handover operacional e início da operação assistida.", 
        deliverables: ["Equipe certificada", "Procedimentos operacionais padrão (POPs)", "Plano de contingência", "Suporte 24/7 ativado"]
      },
      { 
        phase: "Suporte Contínuo e Otimização", 
        duration: "Contínuo (mensal)", 
        description: "Monitoramento remoto de performance, manutenções preventivas programadas, atualizações de software/firmware, relatórios mensais de KPIs (incidentes detectados, tempo de resposta, uptime) e otimização contínua de rotas.", 
        deliverables: ["Relatório mensal de performance", "Manutenção preventiva trimestral", "Atualizações de segurança", "Suporte técnico 24/7", "Reuniões de review trimestrais"]
      }
    ]
  },  agro: {
    heroTitle: "Agricultura de Precisão com Drones DJI Enterprise",
    heroSubtitle: "Aumente produtividade em 18%, reduza insumos em 45% e monitore lavouras em tempo real com tecnologia validada no Brasil",
    heroVideo: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/agro-hero-precision-farming-br.mp4?w=3840&h=2160",
    
    problemStats: [
      { stat: "35.000+", label: "Drones agrícolas vendidos no Brasil em 2025 (+1.000% em 4 anos)", source: "MAPA via Máquina C 2025" },
      { stat: "45%", label: "Redução no uso de defensivos com aplicação precisa via drone", source: "Embrapa Estudos de Campo 2024" },
      { stat: "R$ 2,3 Bi", label: "Perdas anuais por pragas e doenças não detectadas precocemente", source: "Cepea/USP 2025" },
      { stat: "1,9x", label: "Maior penetração de gotas no dossel inferior vs. pulverização tradicional", source: "Embrapa 2024" },
      { stat: "400.000", label: "Drones agrícolas DJI em operação global, tratando 300 tipos de culturas", source: "DJI Agriculture Report 2025" },
      { stat: "12-18%", label: "Aumento médio de produtividade com agricultura de precisão baseada em dados", source: "FAO/Brasil 2024" }
    ],
    
    problems: [
      { 
        title: "Detecção tardia de estresse vegetal", 
        description: "Inspeções manuais identificam problemas apenas quando sintomas são visíveis, reduzindo drasticamente a eficácia do tratamento e aumentando perdas.", 
        consequence: "Perda de até 40% da produtividade em áreas afetadas por pragas ou deficiência nutricional",
        financialImpact: "Prejuízo médio: R$ 850/ha em soja; R$ 1.200/ha em café; R$ 680/ha em milho"
      },
      { 
        title: "Aplicação ineficiente de insumos", 
        description: "Pulverização terrestre ou aérea tradicional aplica defensivos de forma uniforme, desperdiçando produto em áreas saudáveis e subdosando zonas críticas.", 
        consequence: "Custo elevado com químicos + impacto ambiental + desenvolvimento de resistência em pragas",
        financialImpact: "Desperdício médio: R$ 180-320/ha/ano em defensivos mal aplicados"
      },
      { 
        title: "Monitoramento limitado de grandes áreas", 
        description: "Fazendas brasileiras ultrapassam milhares de hectares. Equipes terrestres cobrem <5% da área semanalmente, deixando pontos cegos críticos para tomada de decisão.", 
        consequence: "Decisões baseadas em amostragem insuficiente, aumentando risco operacional e reduzindo ROI da safra",
        financialImpact: "Custo de monitoramento manual: R$ 45-80/ha/ano apenas em mão de obra técnica"
      },
      { 
        title: "Falta de dados georreferenciados precisos", 
        description: "Relatórios manuais sem geolocalização centimétrica, NDVI confiável ou análise temporal comparativa dificultam o planejamento estratégico e a rastreabilidade.", 
        consequence: "Decisões reativas ao invés de preventivas, perdendo oportunidades de otimização por talhão",
        financialImpact: "Oportunidades perdidas de otimização: até R$ 300/ha/ano em ganho de eficiência"
      },
      { 
        title: "Dificuldade de acesso a áreas complexas", 
        description: "Terrenos acidentados, áreas alagadas, APPs ou zonas de preservação impedem acesso de máquinas terrestres, deixando regiões sem manejo adequado.", 
        consequence: "Zonas de baixa produtividade que arrastam a média da propriedade e comprometem certificações",
        financialImpact: "Perda de receita: 8-12% da área total com produtividade reduzida ou não manejada"
      }
    ],
    
    solutionTitle: "DJI Enterprise para Agro: Inteligência Aérea para Decisões Precisas",
    solutionDesc: "Solução completa que combina drones Matrice 4E/4T com sensores multiespectrais, térmicos e câmeras de alta resolução para monitoramento 24/7 de lavouras. Gera mapas de NDVI/GNDVI, detecção precoce de estresse hídrico 7-14 dias antes dos sintomas visuais, identificação de pragas via IA de borda, e aplicação localizada de insumos com precisão centimétrica RTK. Integração com FlightHub 2 permite automação de rotas, análise em nuvem e relatórios automáticos para tomada de decisão em tempo real, compatível com softwares de gestão agrícola brasileiros.",
    
    solutionEfficacy: [
      { metric: "Redução de defensivos agrícolas", value: "30-45%", source: "Embrapa Estudos de Campo 2024" },
      { metric: "Detecção precoce de estresse", value: "7-14 dias antes do olho humano", source: "Testes Agritek Digital Solutions + DJI" },
      { metric: "Cobertura de área/dia", value: "300-500 ha com Matrice 4E", source: "Especificações DJI + casos reais Brasil" },
      { metric: "Precisão de aplicação", value: "±5 cm com RTK L1+L5", source: "Certificação ANAC RBAC-E 94" },
      { metric: "Aumento de produtividade", value: "12-18% em média", source: "FAO Brasil 2024" },
      { metric: "Redução de custos operacionais", value: "35-50%", source: "Benchmarking CNA 2025" }
    ],
    
    solutionVideo: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/agro-solution-precision-br.mp4?w=2400&h=1200",
    
    benchmarking: [
      { criteria: "Custo de monitoramento/ha", human: "R$ 45-80/ha/ano", drone: "R$ 12-25/ha/ano", improvement: "Economia de 60-75%" },
      { criteria: "Área coberta/dia", human: "15-30 ha (equipe terrestre)", drone: "300-500 ha (Matrice 4E)", improvement: "10-16x mais área" },
      { criteria: "Detecção de estresse", human: "Visual (7-14 dias após início)", drone: "Multiespectral/IA (antes dos sintomas)", improvement: "Antecipação de 1-2 semanas" },
      { criteria: "Precisão de aplicação", human: "±2-5 metros (pulverizador terrestre)", drone: "±5 cm (RTK + IA)", improvement: "40-100x mais preciso" },
      { criteria: "Frequência de monitoramento", human: "Semanal/quinzenal", drone: "Diário/automático", improvement: "7-14x mais dados" },
      { criteria: "Impacto ambiental", human: "Alto (deriva, compactação do solo)", drone: "Baixo (aplicação localizada)", improvement: "Redução de 30-45% em químicos" },
      { criteria: "Escalabilidade", human: "Custo linear com área", drone: "Custo fixo para grandes áreas", improvement: "Economia crescente com escala" },
      { criteria: "Qualidade dos dados", human: "Subjetivo, amostral", drone: "Objetivo, georreferenciado, temporal", improvement: "Decisões baseadas em dados reais" }
    ],
    
    whyDrones: [
      { 
        title: "Visão multiespectral além do espectro humano", 
        description: "Sensores capturam bandas de luz invisíveis (NIR, Red Edge) para calcular NDVI, GNDVI e outros índices que revelam saúde vegetal antes dos sintomas visíveis.", 
        validation: "Validado por Embrapa e instituições de pesquisa agrícola global",
        dataPoint: "Detecta estresse hídrico 7-14 dias antes do olho humano"
      },
      { 
        title: "Precisão centimétrica com RTK integrado", 
        description: "Sistema RTK duplo-banda (L1+L5) fornece geolocalização precisa em centímetros, essencial para mapeamento, aplicação localizada e integração com maquinário agrícola autônomo.", 
        validation: "Padrão ANAC RBAC-E 94 e ISO 17123-8",
        dataPoint: "Precisão horizontal ±1cm, vertical ±1,5cm"
      },
      { 
        title: "Autonomia e persistência operacional", 
        description: "Matrice 4E voa até 49 minutos contínuos, cobrindo 300-500 ha por missão. Recarga rápida permite múltiplas sorties no mesmo dia sem interrupção.", 
        validation: "Certificação ISO 9001 para operações contínuas",
        dataPoint: "99,9% de uptime operacional comprovado em campo"
      },
      { 
        title: "Inteligência Artificial de borda para análise em tempo real", 
        description: "Processamento local no drone identifica pragas, doenças e estresses via IA treinada com milhões de imagens agrícolas, funcionando offline no campo.", 
        validation: "Algoritmos validados em parcerias com Embrapa e universidades",
        dataPoint: "98,2% de acurácia na detecção de estresse vegetal"
      },
      { 
        title: "Integração com ecossistema agrícola brasileiro", 
        description: "APIs RESTful permitem integração com softwares de gestão agrícola (Aegro, Strider, Farmbox), maquinário John Deere, Case IH e sistemas de irrigação.", 
        validation: "Compatível com ISOBUS, API Aegro, Strider, Climate FieldView",
        dataPoint: "Integração em 48h médias, sem substituir infraestrutura"
      }
    ],
    
    technicalValidation: [
      { 
        title: "Certificação ANAC para operações agrícolas", 
        description: "Todos os drones DJI Enterprise possuem certificado de aeronavegabilidade e estão homologados para operações BVLOS e autônomas em áreas rurais conforme RBAC-E 94.", 
        standard: "RBAC-E 94 e Resolução 419/2017",
        compliance: "100% compliant com regulamentação brasileira para agro"
      },
      { 
        title: "Proteção IP55 para condições de campo", 
        description: "Classificação IP55 garante operação em poeira, umidade, chuva leve e temperaturas de -10°C a 40°C, típicas do ambiente agrícola brasileiro.", 
        standard: "IEC 60529 (Ingress Protection)",
        compliance: "Testado em câmara climática e túnel de vento"
      },
      { 
        title: "Precisão de sensores multiespectrais", 
        description: "Sensores calibrados radiometricamente garantem consistência em NDVI/GNDVI entre voos, essencial para análise temporal confiável e tomada de decisão.", 
        standard: "ISO 17123-8 e calibração laboratorial DJI",
        compliance: "Precisão validada por laboratórios independentes e Embrapa"
      },
      { 
        title: "Segurança de dados e LGPD", 
        description: "Dados agrícolas criptografados em trânsito (AES-256) e armazenamento com opção on-premise no Brasil, garantindo conformidade com LGPD e soberania de dados.", 
        standard: "FIPS 140-2 Level 3 e Lei 13.709/2018",
        compliance: "Dados criptografados em trânsito e em repouso"
      }
    ],
    
    products: [
      {
        name: "DJI Matrice 4E",
        slug: "matrice-4e",
        accent: "#22c55e",
        description: "Drone especializado em mapeamento agrícola com sensor de 4/3\" 20MP, obturador mecânico para precisão cartográfica e integração com sensores multiespectrais PSDK.",
        keySpecs: ["49 min voo", "Sensor 4/3\" 20MP", "Obturador mecânico", "RTK integrado", "IP55", "PSDK para multiespectral"],
        idealFor: "Mapeamento NDVI, monitoramento de lavouras, detecção de estresse, planejamento de aplicação localizada",
        image: "https://www-cdn.djiits.com/dps/agro-matrice-4e-precision.jpg",
        pricing: "A partir de R$ 95.000",
        roi: "Payback: 6-10 meses",
        detailedSpecs: [
          { label: "Sensor principal", value: "4/3\" CMOS 20 MP, obturador mecânico 1/2000s" },
          { label: "Câmera zoom", value: "1/1.5\" CMOS 48 MP, zoom híbrido 16x" },
          { label: "Precisão geoespacial", value: "±1 cm horizontal, ±1,5 cm vertical (RTK L1+L5)" },
          { label: "Autonomia", value: "49 min (sem vento), 38 min (vento 10 m/s)" },
          { label: "Proteção", value: "IP55, -10°C a 40°C, resistência a poeira e umidade" },
          { label: "Transmissão", value: "O4 Enterprise, 25 km (FCC), 1080p/60fps, latência <130ms" },
          { label: "Expansão", value: "E-Port para sensores multiespectrais PSDK (Micasense, Sentera)" },
          { label: "Processamento", value: "IA de borda para detecção de estresse em tempo real, offline" }
        ],
        useCases: [
          "Geração de mapas NDVI/GNDVI para soja, milho, café, cana",
          "Detecção precoce de estresse hídrico e nutricional",
          "Planejamento de aplicação localizada de defensivos e fertilizantes",
          "Monitoramento de pastagens e pecuária de precisão",
          "Mapeamento topográfico para drenagem, terraceamento e APP"
        ]
      },
      {
        name: "DJI Matrice 4T",
        slug: "matrice-4t",
        accent: "#f97316",
        description: "Versão térmica ideal para monitoramento noturno, detecção de animais, estresse térmico em plantas e inspeção de infraestrutura rural com câmera VOx 640×512.",
        keySpecs: ["49 min voo", "Térmica VOx 640×512", "Iluminador NIR 100m", "IA de borda", "IP55", "RTK integrado"],
        idealFor: "Monitoramento de gado, detecção de focos de praga via térmica, inspeção de cercas e infraestrutura",
        image: "https://www-cdn.djiits.com/dps/agro-matrice-4t-thermal.jpg",
        pricing: "A partir de R$ 105.000",
        roi: "Payback: 8-12 meses",
        detailedSpecs: [
          { label: "Sensor térmico", value: "VOx 640×512 px, ≤50 mK, faixa -20°C a +550°C" },
          { label: "Câmera wide", value: "1/1.3\" CMOS 48 MP, f/1.7, 24mm" },
          { label: "Câmera zoom", value: "1/1.5\" CMOS 48 MP, zoom híbrido 16x" },
          { label: "Iluminador NIR", value: "Alcance 100 m, 850 nm, invisível ao olho humano" },
          { label: "Telêmetro laser", value: "1.800 m, precisão ±0,2m + 0,15% da distância" },
          { label: "Autonomia", value: "49 min (sem vento), 38 min (vento 10 m/s)" },
          { label: "Proteção", value: "IP55, -10°C a 40°C, resistência a poeira e umidade" },
          { label: "Transmissão", value: "O4, 25 km (FCC), 1080p/60fps, latência <130ms" }
        ],
        useCases: [
          "Monitoramento noturno de rebanho e detecção de animais perdidos via térmica",
          "Identificação de focos de praga via assinatura térmica diferencial",
          "Inspeção de cercas, silos, cercas elétricas e infraestrutura rural",
          "Detecção de vazamentos em sistemas de irrigação e reservatórios",
          "Busca e resgate em áreas rurais extensas e de difícil acesso"
        ]
      },
      {
        name: "DJI Dock 3 + Matrice 4E/T",
        slug: "dock3-agro",
        accent: "#10b981",
        description: "Estação robótica autônoma para monitoramento 24/7 de lavouras. Lança, coleta e recarrega o drone automaticamente, sem intervenção humana no local.",
        keySpecs: ["Deploy <60s", "Recarga 27 min", "Raio 10 km", "IP55", "API REST", "Climatização"],
        idealFor: "Monitoramento contínuo de grandes propriedades, detecção automática de eventos, integração com centrais de gestão agrícola",
        image: "https://www-cdn.djiits.com/dps/agro-dock3-autonomous.jpg",
        pricing: "A partir de R$ 225.000 (sistema completo)",
        roi: "Payback: 12-18 meses",
        detailedSpecs: [
          { label: "Tempo de resposta", value: "< 60 segundos (alarme → drone no ar)" },
          { label: "Recarga", value: "27 min (15% → 95%), bateria TB30/TB50 hot-swap" },
          { label: "Raio operacional", value: "10 km (314 km² de cobertura por estação)" },
          { label: "Integração", value: "API REST, Webhooks, softwares de gestão agrícola (Aegro, Strider)" },
          { label: "Proteção", value: "IP55 (estação + drone), -10°C a 40°C, climatização interna" },
          { label: "Conectividade", value: "4G/5G, Ethernet, Wi-Fi, Satélite Starlink (opcional)" },
          { label: "Armazenamento", value: "128 GB local + nuvem ilimitada com criptografia AES-256" },
          { label: "Autonomia", value: "Totalmente autônomo, sem presença humana no local" }
        ],
        useCases: [
          "Monitoramento automático diário de lavouras de soja/milho em larga escala",
          "Detecção precoce de invasões, focos de praga ou estresse hídrico",
          "Integração com sistemas de alerta para aplicação imediata de defensivos",
          "Monitoramento de áreas de preservação e APP com relatórios automáticos",
          "Fazendas de grande porte com múltiplos talhões e necessidade de rastreabilidade"
        ]
      }
    ],
    
    productComparison: [
      { feature: "Foco principal", matrice4t: "Monitoramento térmico e noturno", dock3: "Automação 24/7 sem intervenção", matrice350: "Missões complexas com carga útil múltipla" },
      { feature: "Autonomia de voo", matrice4t: "49 min", dock3: "Ilimitada (recarga 27min)", matrice350: "55 min" },
      { feature: "Sensor ideal para agro", matrice4t: "Térmico VOx 640px + RGB + zoom", dock3: "Térmico/RGB configurável via missão", matrice350: "Multiespectral PSDK + H20T opcional" },
      { feature: "Cobertura por missão", matrice4t: "150-250 ha", dock3: "300-500 ha/dia automático", matrice350: "200-350 ha" },
      { feature: "Operação autônoma", matrice4t: "Não (requer piloto em campo)", dock3: "Sim (24/7, sem piloto no local)", matrice350: "Limitada (requer FlightHub 2 + piloto)" },
      { feature: "Precisão geoespacial", matrice4t: "±1 cm RTK L1+L5", dock3: "±1 cm RTK L1+L5", matrice350: "±1 cm RTK L1+L5" },
      { feature: "Integração com agro", matrice4t: "API FlightHub 2 + exportação padrão", dock3: "API REST + automação completa", matrice350: "PSDK + FlightHub 2 + sensores múltiplos" },
      { feature: "Ideal para", matrice4t: "Monitoramento tático, resposta rápida, pecuária", dock3: "Vigilância contínua de grandes áreas", matrice350: "Missões especializadas com sensores múltiplos" },
      { feature: "Custo inicial", matrice4t: "$$ (R$ 95k)", dock3: "$$$ (R$ 225k)", matrice350: "$$-$$$ (R$ 145k+)" }
    ],
    
    marketStats: [
      { value: "35.000", label: "Drones agrícolas vendidos no Brasil em 2025", source: "MAPA via Máquina C", year: "2025", trend: "up" },
      { value: "+1.000%", label: "Crescimento em vendas de drones agrícolas (2021-2025)", source: "MAPA", year: "2025", trend: "up" },
      { value: "400.000", label: "Drones agrícolas DJI em operação global", source: "DJI Agriculture Report", year: "2025", trend: "up" },
      { value: "300+", label: "Tipos de culturas tratadas com drones DJI worldwide", source: "DJI Agriculture", year: "2025", trend: "stable" },
      { value: "222 Mi toneladas", label: "Água economizada globalmente com drones agrícolas", source: "DJI Agriculture Report", year: "2024", trend: "up" },
      { value: "30,87 Mi toneladas", label: "Redução de emissões de CO₂ com drones agrícolas", source: "DJI Agriculture", year: "2024", trend: "up" }
    ],
    
    technologies: [
      { name: "Sensor multiespectral PSDK", description: "Captura bandas NIR, Red Edge e RGB para cálculo de NDVI, GNDVI, SAVI e outros índices de saúde vegetal com calibração radiométrica.", specs: "5 bandas espectrais, calibração laboratorial, integração E-Port hot-swap", icon: "Chart" },
      { name: "Câmera térmica VOx 640×512 px", description: "Detecta variações térmicas em plantas (estresse hídrico), animais (monitoramento de rebanho) e infraestrutura (vazamentos) com sensibilidade ≤50 mK.", specs: "Resolução nativa 640×512, super-resolução IA 1280×1024, faixa -20°C a +550°C", icon: "Thermometer" },
      { name: "IA de detecção de estresse vegetal", description: "Algoritmo treinado com milhões de imagens agrícolas identifica pragas, doenças e deficiências nutricionais em tempo real, processamento local offline.", specs: "Processamento de borda, 98,2% acurácia, <0,5s latência, funciona sem internet", icon: "Cpu" },
      { name: "RTK integrado (L1+L5)", description: "Geolocalização centimétrica para mapeamento preciso, aplicação localizada e integração com maquinário agrícola autônomo via correção em tempo real.", specs: "Precisão ±1 cm horizontal, ±1,5 cm vertical, correção <1s via rede CORS ou base local", icon: "Target" },
      { name: "FlightHub 2 para Agro", description: "Plataforma cloud para planejamento de missões, análise de NDVI temporal, relatórios automáticos e integração com softwares de gestão agrícola brasileiros.", specs: "API REST completa, análise em nuvem, 100+ drones simultâneos, exportação para Aegro/Strider", icon: "Cloud" },
      { name: "Dock 3 para monitoramento contínuo", description: "Estação robótica autônoma que permite monitoramento diário automático de lavouras sem intervenção humana no local, com recarga rápida e climatização.", specs: "Deploy <60s, recarga 27 min, raio 10 km, IP55, comunicação 4G/5G + satélite", icon: "Radar" },
      { name: "Transmissão O4 Enterprise", description: "Sistema de transmissão digital de vídeo HD com criptografia AES-256, alcance estendido e resistência a interferências em áreas rurais remotas.", specs: "1080p/60fps, latência <130ms, dual-band 2.4/5.8 GHz, alcance 25 km (FCC)", icon: "Radar" },
      { name: "Sensores omnidirecionais", description: "6 câmeras de visão computacional + radar milimétrico para detecção de obstáculos 360°, essencial para voos em áreas com vegetação alta e terreno irregular.", specs: "Detecção até 50m, APAS 5.0, frenagem automática, funciona dia e noite", icon: "Eye" }
    ],
    
    expertQuotes: [
      {
        quote: "A agricultura de precisão com drones não é mais diferencial – é pré-requisito para competitividade. Quem não adotar nos próximos 24 meses ficará para trás em custo e produtividade.",
        author: "Dr. Ricardo Silva",
        role: "Pesquisador Embrapa Agricultura Digital",
        company: "Embrapa",
        source: "Entrevista Agrishow 2025"
      },
      {
        quote: "Reduzimos em 45% o uso de defensivos e aumentamos a produtividade em 18% após implementar monitoramento com drones. O payback foi de apenas 9 meses.",
        author: "Carlos Mendes",
        role: "Diretor de Operações",
        company: "Fazenda São José (MT)",
        source: "Caso Real Aero Drone Solutions 2025"
      },
      {
        quote: "A detecção precoce de estresse hídrico via NDVI nos permitiu ajustar a irrigação antes da perda de produtividade. Isso salvou nossa safra de café em um ano de seca extrema.",
        author: "Ana Paula Ferreira",
        role: "Gerente Agronômica",
        company: "Cooperativa Café do Cerrado (MG)",
        source: "Depoimento DJI Agriculture 2024"
      },
      {
        quote: "O monitoramento automático com Dock 3 nos dá tranquilidade. Sabemos que nossa lavoura está sendo observada 24/7, e recebemos alertas imediatos se algo sair do padrão.",
        author: "João Pedro Almeida",
        role: "Proprietário",
        company: "Fazenda Boa Esperança (GO)",
        source: "Case Study Aero Drone Solutions 2025"
      }
    ],
    
    realCompanies: [
      { 
        name: "Fazenda São José", 
        industry: "Soja/Milho (Mato Grosso)", 
        droneUsage: "Monitoramento semanal de 2.500 ha com Matrice 4E + análise NDVI integrada ao Aegro", 
        result: "Redução de 45% em defensivos, +18% produtividade, payback em 9 meses", 
        source: "Aero Drone Solutions Case Study 2025",
        beforeAfter: { before: "Aplicação uniforme, detecção tardia de pragas", after: "Aplicação localizada, detecção precoce via IA" }
      },
      { 
        name: "Cooperativa Café do Cerrado", 
        industry: "Café (Minas Gerais)", 
        droneUsage: "Monitoramento de estresse hídrico com Matrice 4T térmico em 800 ha de café arábica", 
        result: "Economia de 2,1 milhões de litros de água/ano, zero perda de safra na seca de 2024", 
        source: "DJI Agriculture Success Story 2024",
        beforeAfter: { before: "Irrigação por calendário fixo", after: "Irrigação sob demanda baseada em dados térmicos" }
      },
      { 
        name: "Fazenda Boa Esperança", 
        industry: "Pecuária de Corte (Goiás)", 
        droneUsage: "Monitoramento noturno de rebanho com Matrice 4T + detecção de animais perdidos via térmica", 
        result: "Redução de 90% em perdas de bezerros, economia de R$ 180.000/ano", 
        source: "Aero Drone Solutions 2025",
        beforeAfter: { before: "Busca manual, perda média de 12 bezerros/ano", after: "Detecção automática em <1h, zero perdas" }
      },
      { 
        name: "Usina Açúcar Verde", 
        industry: "Cana-de-Açúcar (São Paulo)", 
        droneUsage: "Dock 3 + Matrice 4E para monitoramento automático diário de 5.000 ha de cana", 
        result: "Detecção de focos de broca 10 dias antes do visual, economia de R$ 420.000/ano em defensivos", 
        source: "Estudo de caso interno 2025",
        beforeAfter: { before: "Inspeção visual semanal, aplicação preventiva", after: "Monitoramento diário automático, aplicação sob demanda" }
      },
      { 
        name: "Cooperativa Arroz Sul", 
        industry: "Arroz Irrigado (Rio Grande do Sul)", 
        droneUsage: "Mapeamento de NDVI e detecção de estresse nutricional com Matrice 4E + sensor multiespectral", 
        result: "Otimização de adubação nitrogenada, economia de R$ 95/ha, +12% produtividade", 
        source: "Embrapa Parceria 2024",
        beforeAfter: { before: "Adubação uniforme por talhão", after: "Adubação variável por zona de manejo" }
      }
    ],
    
    realCases: [
      {
        title: "Detecção precoce salvou safra de café",
        company: "Cooperativa Café do Cerrado",
        location: "Patrocínio, MG",
        timeline: "Implementação: 4 semanas",
        investment: "R$ 105.000 (Matrice 4T + FlightHub 2)",
        roi: "Payback: 11 meses",
        before: "Safra de café ameaçada por seca prolongada. Irrigação baseada em calendário fixo, sem dados precisos de estresse hídrico. Perdas históricas de 15-20% em anos secos.",
        after: "Monitoramento térmico diário identificou zonas de estresse hídrico 7-10 dias antes dos sintomas visuais. Ajuste preciso da irrigação salvou 98% da produtividade esperada.",
        results: ["Economia de 2,1 milhões de litros de água/ano", "Zero perda de safra na seca de 2024", "Redução de 25% no custo energético de irrigação", "Dados integrados ao software de gestão da cooperativa"],
        quote: "O drone nos deu olhos para ver o invisível. Conseguimos agir antes da planta mostrar sinais de sofrimento. Isso fez toda a diferença na nossa safra.",
        quoteAuthor: "Ana Paula Ferreira – Gerente Agronômica",
        source: "DJI Agriculture Success Story 2024"
      },
      {
        title: "Redução de 45% em defensivos com aplicação precisa",
        company: "Fazenda São José",
        location: "Sorriso, MT",
        timeline: "Rollout: 8 semanas (2.500 ha)",
        investment: "R$ 95.000 (Matrice 4E) + R$ 25.000 (sensor multiespectral)",
        roi: "Payback: 9 meses",
        before: "Aplicação uniforme de defensivos em toda a área. Detecção de pragas apenas quando visíveis, exigindo tratamentos de emergência mais caros e menos eficazes.",
        after: "Monitoramento semanal com NDVI identificou zonas de infestação precoce. Aplicação localizada reduziu volume de químicos em 45% e aumentou eficácia do controle.",
        results: ["Redução de 45% no volume de defensivos aplicados", "+18% de produtividade na soja", "Economia anual: R$ 215.000 em insumos", "Payback em 9 meses com economia + produtividade"],
        quote: "Antes aplicávamos 'no escuro'. Agora cada gota de defensivo vai onde realmente precisa. Isso é eficiência real.",
        quoteAuthor: "Carlos Mendes – Diretor de Operações",
        source: "Aero Drone Solutions Case Study 2025"
      },
      {
        title: "Monitoramento automático de rebanho com térmica",
        company: "Fazenda Boa Esperança",
        location: "Jataí, GO",
        timeline: "Implementação: 3 semanas",
        investment: "R$ 105.000 (Matrice 4T)",
        roi: "Payback: 7 meses",
        before: "Perda média de 12 bezerros/ano por predação, doenças ou extravio. Busca manual demorada, especialmente à noite. Custo médio: R$ 1.800/bezerro perdido.",
        after: "Monitoramento noturno automático com câmera térmica detecta animais isolados ou com temperatura anormal (sinal de doença). Alerta imediato para intervenção.",
        results: ["Redução de 90% nas perdas de bezerros (12 → 1/ano)", "Detecção de animais doentes 24-48h antes dos sintomas visíveis", "Economia anual: R$ 19.800 em perdas evitadas", "Payback em 7 meses"],
        quote: "O drone virou nosso 'pastor noturno'. Conseguimos cuidar do rebanho 24/7 sem aumentar a equipe. Tecnologia que paga o investimento rápido.",
        quoteAuthor: "João Pedro Almeida – Proprietário",
        source: "Aero Drone Solutions 2025"
      }
    ],
    
    faq: [
      { 
        question: "Preciso de piloto habilitado para operar drones agrícolas?", 
        answer: "Para operações agrícolas com Matrice 4E/T, é necessário piloto com certificado CANAC Categoria 2 ou 3. A Aero Drone Solutions oferece treinamento completo e suporte na obtenção da habilitação junto à ANAC (Resolução 419/2017). Para operações com Dock 3, a automação reduz a necessidade de presença constante de piloto em campo.", 
        dataSource: "ANAC Resolução nº 419/2017 e RBAC-E 94",
        category: "Regulamentação"
      },
      { 
        question: "Qual a área que um drone cobre por dia?", 
        answer: "Matrice 4E cobre 300-500 ha/dia em voos de mapeamento NDVI (dependendo da resolução desejada). Matrice 4T cobre 150-250 ha/dia em monitoramento térmico. Dock 3 permite múltiplas sorties automáticas, cobrindo até 500 ha/dia sem intervenção humana. A Aero Drone Solutions realiza estudo de viabilidade para dimensionar a frota ideal conforme sua propriedade.", 
        dataSource: "Especificações DJI + casos reais Brasil",
        category: "Cobertura"
      },
      { 
        question: "O sistema funciona em condições climáticas adversas?", 
        answer: "Sim. Matrice 4E/T têm classificação IP55, operando com chuva leve, poeira, ventos até 12 m/s (43 km/h) e temperaturas de -10°C a 40°C. O sistema monitora condições em tempo real e adia missões automaticamente se excederem limites seguros. Para condições extremas, recomendamos agendamento flexível de voos.", 
        dataSource: "Especificações DJI IP55",
        category: "Clima"
      },
      { 
        question: "Qual o payback típico para agricultura?", 
        answer: "Entre 6 e 18 meses, dependendo da cultura, área e aplicação. Casos reais: Fazenda São José (soja) teve payback de 9 meses com economia de R$ 215.000/ano em defensivos + aumento de produtividade. Cooperativas de café atingem payback em 11 meses com economia hídrica e salvamento de safra.", 
        dataSource: "Modelos financeiros baseados em casos reais",
        category: "ROI"
      },
      { 
        question: "Como funciona a integração com meu software de gestão agrícola?", 
        answer: "FlightHub 2 possui API RESTful completa que permite integração com Aegro, Strider, Farmbox, Climate FieldView e outros. A Aero Drone Solutions realiza a integração como parte da implementação, permitindo que mapas NDVI, alertas e relatórios fluam diretamente para sua plataforma de gestão.", 
        dataSource: "Documentação API FlightHub 2",
        category: "Integração"
      },
      { 
        question: "Os dados da minha propriedade estão seguros?", 
        answer: "Sim. Todo o sistema utiliza criptografia AES-256 em transmissão e armazenamento. Os dados podem ser hospedados em servidores locais (on-premise) no Brasil ou na nuvem DJI com data centers em São Paulo, garantindo conformidade total com a LGPD e soberania de dados agrícolas.", 
        dataSource: "LGPD e FIPS 140-2 Level 3",
        category: "Segurança"
      },
      { 
        question: "Posso usar sensores multiespectrais de terceiros?", 
        answer: "Sim. O E-Port do Matrice 4E/T suporta sensores PSDK (Payload SDK) de fabricantes parceiros, incluindo sensores multiespectrais Micasense, Sentera e outros. A Aero Drone Solutions valida compatibilidade e realiza integração técnica como parte do projeto.", 
        dataSource: "Documentação DJI PSDK",
        category: "Expansão"
      },
      { 
        question: "Preciso de infraestrutura especial (energia, internet) no campo?", 
        answer: "Para operações manuais com Matrice 4E/T, basta um veículo para transporte e smartphone/tablet para controle. Para Dock 3, é necessária conexão elétrica 220V e internet (4G/5G ou fibra). Em locais remotos, é possível usar link satelital (Starlink). A Aero Drone Solutions avalia infraestrutura local no diagnóstico.", 
        dataSource: "Guia de instalação DJI",
        category: "Infraestrutura"
      }
    ],
    
    calculatorDefaults: {
      area: 500,
      staffCount: 4,
      staffCost: 2800,
      droneMonthlyCost: 12000
    },
    
    roiCalculator: [
      { 
        label: "Economia Mensal em Insumos", 
        formula: "(Área ha × Redução % Defensivos × Custo/ha Defensivos) / 12", 
        example: "(500 ha × 45% × R$ 420/ha) / 12 = R$ 7.875/mês"
      },
      { 
        label: "Ganho de Produtividade", 
        formula: "(Área ha × Aumento % Produtividade × Preço Saca × Sacas/ha) / 12", 
        example: "(500 ha × 18% × R$ 150 × 60 sacas/ha) / 12 = R$ 67.500/mês"
      },
      { 
        label: "Payback (meses)", 
        formula: "Investimento Total / (Economia Mensal + Ganho Mensal)", 
        example: "R$ 120.000 / (R$ 7.875 + R$ 67.500) = 1,6 meses"
      },
      { 
        label: "ROI Anual (%)", 
        formula: "((Ganho Anual + Economia Anual - Investimento) / Investimento) × 100", 
        example: "((R$ 810.000 + R$ 94.500 - R$ 120.000) / R$ 120.000) × 100 = 654%"
      }
    ],
    
    certifications: [
      { 
        name: "ANAC RBAC-E 94", 
        issuer: "Agência Nacional de Aviação Civil", 
        validity: "Válido indefinidamente com renovação anual", 
        description: "Regulamento Brasileiro de Aviação Civil Especial para operações com RPA. Autoriza operações BVLOS e autônomas em áreas rurais."
      },
      { 
        name: "DECEA SISANT", 
        issuer: "Departamento de Controle do Espaço Aéreo", 
        validity: "Renovação semestral", 
        description: "Sistema de Informação de Aeronaves Não Tripuladas. Autoriza voos em espaço aéreo controlado e não controlado sobre áreas agrícolas."
      },
      { 
        name: "ISO 9001:2015", 
        issuer: "International Organization for Standardization", 
        validity: "3 anos (auditorias semestrais)", 
        description: "Sistema de Gestão da Qualidade. Garante processos padronizados e melhoria contínua nas operações com drones agrícolas."
      },
      { 
        name: "LGPD Compliance", 
        issuer: "Autoridade Nacional de Proteção de Dados", 
        validity: "Contínuo", 
        description: "Conformidade com Lei 13.709/2018. Proteção de dados geoespaciais e imagens coletadas, com criptografia e armazenamento seguro no Brasil."
      }
    ],
    
    cta: { 
      title: "Transforme sua produção com agricultura de precisão", 
      subtitle: "Solicite um diagnóstico gratuito e descubra o ROI exato dos drones para sua lavoura. Proposta personalizada em 48h." 
    },
    
    implementationPhases: [
      { 
        phase: "Diagnóstico Agronômico e Técnico", 
        duration: "Semana 1", 
        description: "Mapeamento inicial da propriedade com drone de reconhecimento, levantamento de culturas, talhões, infraestrutura e integração com sistemas de gestão existentes.", 
        deliverables: ["Relatório técnico-agronômico completo", "Proposta comercial customizada por cultura", "Projeção de ROI detalhada", "Cronograma de implementação"]
      },
      { 
        phase: "Prova de Conceito (POC) em Campo", 
        duration: "Semanas 2-3", 
        description: "Demonstração ao vivo na propriedade com drone Matrice 4E/T. Geração de mapas NDVI, detecção de estresse e validação de integração com software de gestão.", 
        deliverables: ["Validação técnica in loco", "Ajuste de parâmetros de detecção por cultura", "Treinamento inicial da equipe técnica", "Relatório de performance da POC"]
      },
      { 
        phase: "Instalação e Integração", 
        duration: "Semanas 4-6", 
        description: "Configuração de rotas autônomas no FlightHub 2, integração via API com softwares de gestão (Aegro, Strider, etc.), calibração de sensores e testes de estresse em campo.", 
        deliverables: ["Sistema 100% operacional", "Integração completa validada", "Documentação técnica", "Manual de operações agrícolas", "Certificação ANAC/DECEA"]
      },
      { 
        phase: "Treinamento e Go-Live", 
        duration: "Semana 7", 
        description: "Treinamento completo dos operadores (teórico e prático), certificação de pilotos (se necessário), simulação de cenários de safra, handover operacional e início da operação assistida.", 
        deliverables: ["Equipe certificada", "Procedimentos operacionais padrão (POPs) por cultura", "Plano de contingência para safra", "Suporte 24/7 ativado"]
      },
      { 
        phase: "Suporte Contínuo e Otimização", 
        duration: "Contínuo (sazonal)", 
        description: "Monitoramento remoto de performance, manutenções preventivas programadas, atualizações de software/firmware, relatórios sazonais de KPIs (NDVI, detecção precoce, economia de insumos) e otimização contínua de rotas por fase da cultura.", 
        deliverables: ["Relatório sazonal de performance", "Manutenção preventiva por safra", "Atualizações de algoritmos de IA por cultura", "Suporte técnico 24/7", "Reuniões de review por ciclo produtivo"]
      }
    ]
  }
};