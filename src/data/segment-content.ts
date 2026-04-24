// src/data/segment-content.ts
// [NOVO] Conteúdo rico para cada segmento – educacional, comercial, técnico

import type { SegmentContent } from "@/domain/entities/SegmentContent";

export const SEGMENT_CONTENT: Record<string, SegmentContent> = {
  seguranca: {
    heroTitle: "Segurança patrimonial que não tira férias",
    heroSubtitle: "Monitore 24/7 perímetros, áreas remotas e ativos críticos com drones autônomos",
    problems: [
      {
        title: "Furtos e invasões noturnas",
        description: "Rondas humanas não cobrem toda a extensão. Criminosos exploram escuridão e pontos cegos.",
        consequence: "Perda de equipamentos, estoques e imagem da empresa.",
      },
      {
        title: "Custo elevado de vigilância 24/7",
        description: "Múltiplos turnos, encargos, veículos, infraestrutura de guarita.",
        consequence: "Orçamento de segurança consome até 30% do custo operacional.",
      },
      {
        title: "Tempo de resposta lento a alarmes",
        description: "Equipe leva de 8 a 25 minutos para chegar ao local do incidente.",
        consequence: "Ocorrências não flagradas, provas frágeis, reincidência.",
      },
    ],
    solutionExplanation:
      "Drones autônomos com câmera térmica 640×512 e iluminador NIR realizam rondas programadas a cada 20 minutos. Ao detectar calor humano em área restrita, o sistema envia alerta imediato com GPS e vídeo ao vivo para a central. O drone pode seguir o alvo automaticamente enquanto a equipe se desloca.",
    educationalContent:
      "A câmera térmica enxerga no escuro total, identificando pessoas a até 1 km de distância. O sistema não depende de iluminação artificial. Cada missão gera um relatório automático com geolocalização, horário e imagens – prova jurídica válida. O investimento se paga em menos de 4 meses pela redução de efetivo e prevenção de perdas.",
    benefits: [
      "Redução de 60% a 80% no custo de vigilância",
      "Resposta a incidentes em menos de 60 segundos",
      "Cobertura total do perímetro, 24/7",
      "Relatórios automáticos com valor probatório",
    ],
    recommendedProductIds: ["Matrice 4T", "dock3", "FlightHub 2"],
    relatedCaseIds: ["vistapark", "fazendacamarao"],
    marketMetrics: [
      { label: "redução de custo operacional", value: "60%", source: "Titan Protection / FlytBase 2025" },
      { label: "payback médio", value: "< 4 meses", source: "Aero Drone Solutions cases" },
    ],
  },
  agro: {
    heroTitle: "Agricultura de precisão que aumenta produtividade",
    heroSubtitle: "Mapeie NDVI, detecte pragas e otimize insumos com drones autônomos",
    problems: [
      {
        title: "Perdas por pragas ou estresse hídrico não detectados a tempo",
        description: "Inspeção manual cobre apenas amostragem. Problemas evoluem até se tornarem visíveis.",
        consequence: "Queda de produtividade, desperdício de insumos, safra comprometida.",
      },
      {
        title: "Custo alto com mapeamento aéreo terceirizado",
        description: "Levantamentos por empresas especializadas custam de R$ 30 a R$ 80 por hectare.",
        consequence: "Propriedades grandes pagam mais de R$ 100 mil/ano.",
      },
      {
        title: "Falta de dados históricos para gestão",
        description: "Decisões baseadas em impressões, não em métricas consistentes.",
        consequence: "Fertilização e irrigação ineficientes, menor rentabilidade.",
      },
    ],
    solutionExplanation:
      "Drones com sensores multiespectrais (NDVI) e câmera RGB de alta resolução realizam voos automáticos sobre toda a propriedade. Geração de mapas de vigor, falhas no plantio, pragas e estresse hídrico. Integração com softwares de agricultura de precisão para aplicação localizada de insumos.",
    educationalContent:
      "O NDVI (Índice de Vegetação por Diferença Normalizada) quantifica a saúde da planta através da reflectância. Com drones, é possível mapear talhões de 200 ha em um único voo de 40 minutos. Os dados são processados em nuvem e entregues em formato GeoTIFF, compatível com John Deere, Climate FieldView e outros.",
    benefits: [
      "Redução de 15% a 30% no uso de fertilizantes",
      "Aumento de produtividade de 10% a 25%",
      "Mapeamento semanal sem custo adicional",
      "Laudos automáticos para financiamento e seguro",
    ],
    recommendedProductIds: ["Matrice 4E", "FlightHub 2"],
    relatedCaseIds: ["fazendacamarao"],
    marketMetrics: [
      { label: "aumento de produtividade", value: "10–25%", source: "Embrapa / DJI Agro" },
      { label: "economia de insumos", value: "15–30%", source: "Cases reais" },
    ],
  },
  engenharia: {
    heroTitle: "Engenharia com precisão centimétrica",
    heroSubtitle: "Levantamentos topográficos, volumetria e inspeção estrutural com drones RTK",
    problems: [
      {
        title: "Levantamentos demorados e caros",
        description: "Topografia tradicional exige equipe em campo por dias ou semanas.",
        consequence: "Atrasos em projetos, custos altos de mobilização.",
      },
      {
        title: "Volumetria de pilhas de estoque imprecisa",
        description: "Medição manual ou com GPS tem margem de erro grande.",
        consequence: "Inventários incorretos, perdas financeiras.",
      },
      {
        title: "Inspeção de estruturas altas com risco",
        description: "Pontes, silos, chaminés exigem andaimes ou equipes em altura.",
        consequence: "Risco de acidentes, custos de EPI e treinamento.",
      },
    ],
    solutionExplanation:
      "Drone com RTK integrado (precisão ±1 cm) realiza levantamentos aerofotogramétricos gerando ortomosaicos, nuvens de pontos 3D e modelos digitais de terreno. O obturador mecânico elimina distorções rolling shutter. Volumetria de pilhas com precisão de 99%.",
    educationalContent:
      "O RTK (Real Time Kinematic) corrige erros de posicionamento em tempo real, eliminando a necessidade de pontos de controle em campo (GCPs). Um voo de 40 minutos cobre até 200 hectares com resolução de 2 cm/pixel. Os dados são compatíveis com AutoCAD, QGIS e Revit.",
    benefits: [
      "Levantamentos 8× mais rápidos",
      "Precisão centimétrica sem GCPs",
      "Inspeção de áreas de risco sem expor equipe",
      "Laudos automáticos em formato CAD/GIS",
    ],
    recommendedProductIds: ["Matrice 4E", "FlightHub 2"],
    relatedCaseIds: [],
    marketMetrics: [
      { label: "ganho de produtividade", value: "8×", source: "Aero Drone Solutions" },
      { label: "precisão RTK", value: "1 cm", source: "DJI Enterprise" },
    ],
  },
  energia: {
    heroTitle: "Inspeção de ativos energéticos com diagnóstico térmico",
    heroSubtitle: "Detecte anomalias em painéis solares, torres e subestações antes da falha",
    problems: [
      {
        title: "Paradas não planejadas por falha térmica",
        description: "Componentes superaquecidos não são identificados em inspeção visual.",
        consequence: "Perda de geração, custo de reparo emergencial, multas regulatórias.",
      },
      {
        title: "Inspeção de ativos extensos e remotos",
        description: "Parques solares com milhares de painéis, linhas de transmissão de centenas de km.",
        consequence: "Inspeções incompletas ou muito caras.",
      },
      {
        title: "Risco para equipes de campo",
        description: "Acesso a áreas de alta tensão, torres, telhados.",
        consequence: "Acidentes, custos de segurança, restrições de acesso.",
      },
    ],
    solutionExplanation:
      "Drones com câmera térmica de alta resolução (640×512) e zoom óptico de até 168 mm realizam inspeções termográficas automáticas. Identificação de pontos quentes, células fotovoltaicas com defeito, conexões frouxas. Relatórios georreferenciados com temperatura e recomendação de ação.",
    educationalContent:
      "A termografia detecta anomalias térmicas invisíveis ao olho humano. Uma célula solar com microfissura opera com resistência interna maior, gerando calor. O drone identifica esse ponto quente antes da queda de produção. Em linhas de transmissão, conectores mal apertados aparecem como pontos de até 80°C acima da média.",
    benefits: [
      "Redução de 75% no tempo de inspeção",
      "Detecção precoce de falhas (até 3 meses antes)",
      "Laudos automáticos para manutenção preditiva",
      "Zero risco para equipes",
    ],
    recommendedProductIds: ["Matrice 4T", "FlightHub 2"],
    relatedCaseIds: [],
    marketMetrics: [
      { label: "redução no tempo de inspeção", value: "75%", source: "The Drone Life / Raptor Maps" },
      { label: "economia por MW", value: "US$ 2.100", source: "Raptor Maps 2025" },
    ],
  },
};