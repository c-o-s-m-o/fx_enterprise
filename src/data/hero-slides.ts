// [REFATORADO v1.1] — Slides e vídeos extraídos do page.tsx
// [SOLID-S] — Arquivo com única responsabilidade: definir os slides do hero

/** URLs dos vídeos usados nas seções da landing page */
export const SECTION_VIDEOS = {
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
} as const;

/** Tipo inferido das chaves de SECTION_VIDEOS */
export type SectionVideoKey = keyof typeof SECTION_VIDEOS;

/** Slide do hero carousel — associa produto a vídeo e badge */
export interface HeroSlide {
  /** ID do produto associado (deve existir em PRODUCTS) */
  productId: string;
  badge: string;
  /** Código técnico exibido em monospace no badge */
  code: string;
  videoSrc: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    productId: "Matrice 4T",
    badge: "Câmera Térmica · Flagrante em Tempo Real",
    code: "M4T-THERM-640",
    videoSrc: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/d6354026-ddbf-4d04-afd2-3cde1d25bc2f.mp4?w=3840&h=2160",
  },
  {
    productId: "Matrice 4E",
    badge: "Mapeamento RTK · Inteligência Geoespacial",
    code: "M4E-MAP-4CMOS",
    videoSrc: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/f665aa43-cc37-4f9c-ba64-9fdc40d626f8.mp4?w=2560&h=1440",
  },
  {
    productId: "dock3",
    badge: "Autonomia 24/7 · Zero Intervenção Humana",
    code: "DOCK3-4TD-AUTO",
    videoSrc: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/98cf1338-bfe4-4596-89db-fb6940a7c4ea.mp4?w=2400&h=1200",
  },
  {
    productId: "FlightHub 2",
    badge: "IA + Cloud · Dados que Geram Decisões",
    code: "FH2-CLOUD-PRO",
    videoSrc: "https://www-cdn.djiits.com/reactor/assets/_next/static/videos/94dd8984-42ef-4f70-9f0e-336919652223.mp4?w=2400&h=1200",
  },
];
