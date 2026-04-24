// [NOVO v1.1] — Arquivo de dados: cases de sucesso reais
// Separado do static-content para seguir [SOLID-S]

import {
  Flame, Thermometer, Target, Clock,
  Eye, Crosshair, Users, TrendingDown,
} from "lucide-react";
import type { CaseStudy } from "@/domain/entities/index";

export const CASES: CaseStudy[] = [
  {
    id: "vistapark",
    title: "Vista Park Sul",
    subtitle: "Flagrante ao vivo na primeira demonstração",
    category: "Segurança Perimetral · Condomínio Residencial",
    accent: "#f97316",
    location: "Brasília, DF",
    period: "2025 · Demonstração Ativa",
    logo: "VP",
    badge: "🏆 Case Real",
    image: "https://www-cdn.djiits.com/dps/bdc1bcf701fa9c7123e8a045408cc208.jpg",
    challenge: "Moradores do Vista Park Sul, Brasília, sofriam com furtos constantes. A vigilância humana não cobria o perímetro nem reagia a tempo. Um morador com experiência em tecnologia entrou em contato e pediu uma demonstração presencial.",
    solution: "Levamos o Matrice 4T ao condomínio para uma apresentação. No meio da demo, havia um furto acontecendo naquele exato momento. Ativamos o drone imediatamente — o que era simulação virou prova ao vivo.",
    highlight: "⚡ Flagrante ao vivo — o drone identificou os furtadores com câmera térmica, zoom e IA de rastreamento. O veículo foi acompanhado até a chegada das autoridades. Sucesso total na 1ª demonstração.",
    results: [
      { icon: Flame,       label: "Flagrante", value: "100%",    desc: "Real, ao vivo, na 1ª demo" },
      { icon: Thermometer, label: "Câmera",    value: "Termal",  desc: "Identificação no escuro total" },
      { icon: Target,      label: "IA",        value: "Ativa",   desc: "Rastreio e travamento em tempo real" },
      { icon: Clock,       label: "Resposta",  value: "< 2 min", desc: "Do alerta ao drone no ar" },
    ],
    quote: "Estávamos em uma simulação quando o real aconteceu. O drone identificou os furtadores, rastreou o carro e transmitiu tudo ao vivo. A tecnologia se vendeu sozinha.",
    quoteAuthor: "Morador — Vista Park Sul",
    quoteRole: "Brasília, DF · Demonstração Aero Drone Solutions",
    products: ["Matrice 4T", "Câmera Térmica VOx 640 px", "IA de Rastreamento em Tempo Real"],
  },
  {
    id: "fazendacamarao",
    title: "Fazenda de Camarão",
    subtitle: "40 tanques. Escuridão total. Perdas eliminadas.",
    category: "Segurança Rural · Aquicultura · Agronegócio",
    accent: "#10b981",
    location: "Ceará, CE",
    period: "2025 · Implantação em Curso",
    logo: "FC",
    badge: "📍 Case Real",
    image: "https://www-cdn.djiits.com/dps/63481217ecc8f12dace7b0e52da16770.jpg",
    challenge: "Proprietário com 40+ tanques de camarão no Ceará perdia toneladas por mês para roubos. Os criminosos exploravam a imensidão da propriedade e a escuridão total à noite.",
    solution: "Implantação de monitoramento autônomo com Matrice 4T e câmera térmica. O drone identifica calor humano no breu total e envia localização em tempo real para a equipe de segurança.",
    highlight: "🎯 O gap crítico — o tempo entre o crime e a chegada da patrulha — foi reduzido a zero. O drone elimina a cegueira operacional que permitia os roubos noite após noite.",
    results: [
      { icon: Eye,          label: "Visibilidade", value: "Noturna",   desc: "Térmica no breu absoluto" },
      { icon: Crosshair,    label: "Rastreio",     value: "Real-time", desc: "Localização contínua dos invasores" },
      { icon: Users,        label: "Resposta",     value: "Exata",     desc: "Patrulha chega ao ponto certo" },
      { icon: TrendingDown, label: "Perdas",       value: "→ Zero",    desc: "Toneladas/mês protegidas" },
    ],
    quote: "Quando a patrulha chegava, os ladrões já tinham ido. Com o drone, eles chegam onde o invasor está. A câmera térmica no escuro absoluto foi decisiva.",
    quoteAuthor: "Proprietário — Fazenda de Camarão",
    quoteRole: "Ceará, CE · Cliente Aero Drone Solutions",
    products: ["Matrice 4T", "Câmera Térmica VOx 640 px", "Monitoramento Autônomo Noturno"],
  },
];
