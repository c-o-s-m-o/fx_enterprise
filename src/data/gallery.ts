// [NOVO v1.1] — Arquivo de dados: galeria de imagens
// Separado do static-content para seguir [SOLID-S]

import type { GalleryItem } from "@/domain/entities/index";

export const GALLERY: GalleryItem[] = [
  { id: 2,  thumb: "https://www-cdn.djiits.com/dps/92f41eddf6b8233ac6cdd8e3b58914f8.jpg", full: "https://www-cdn.djiits.com/dps/92f41eddf6b8233ac6cdd8e3b58914f8.jpg", title: "Inspeção termográfica de linha",    cat: "Inspeção" },
  { id: 8,  thumb: "https://www-cdn.djiits.com/dps/bef1f86adbe9c814b2c2439dfefa9142.jpg", full: "https://www-cdn.djiits.com/dps/bef1f86adbe9c814b2c2439dfefa9142.jpg", title: "Operação Defesa Civil — emergência", cat: "Emergências" },
  { id: 9,  thumb: "https://www-cdn.djiits.com/dps/62ca197c8968de6dc16d0fa4463f1504.jpg", full: "https://www-cdn.djiits.com/dps/62ca197c8968de6dc16d0fa4463f1504.jpg", title: "FlightHub 2 — central de comando", cat: "Software" },

];

/** Categorias derivadas automaticamente do array GALLERY + "Todos" no início */
export const GALLERY_CATS: string[] = [
  "Todos",
  ...Array.from(new Set(GALLERY.map(g => g.cat))),
];
