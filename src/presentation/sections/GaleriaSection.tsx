// 📁 src/presentation/sections/GaleriaSection.tsx
// [MOVIDO v2.1] — Extraído de components/sections/ContatoSection.tsx
// Visual e comportamento 100% idênticos ao original

"use client";
import React, { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { FadeUp, SectionTag } from "@/presentation/components/ui";
import { Lightbox } from "@/presentation/components/ui/media";
import { C } from "@/domain/constants/design-tokens";
import { GALLERY, GALLERY_CATS } from "@/data/gallery";
import type { GalleryItem } from "@/domain/entities/index";

export const GaleriaSection: FC = () => {
  const [galCat,   setGalCat]   = useState("Todos");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const filtered = galCat === "Todos" ? GALLERY : GALLERY.filter(g => g.cat === galCat);

  return (
    <section id="galeria" className="py-14 sm:py-24" style={{ background: C.light200 }}>
      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
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
              style={{
                background: galCat === cat ? C.orange : C.light100,
                color: galCat === cat ? "#fff" : C.ink400,
                border: `1px solid ${galCat === cat ? C.orange : C.bLight}`,
              }}>
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          <AnimatePresence>
            {filtered.map(img => (
              <motion.div key={img.id} layout
                initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-xl cursor-pointer hover:shadow-lg transition-all"
                style={{ aspectRatio: "1/1" }} onClick={() => setLightbox(img)}>
                <img src={img.thumb} alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
  );
};
