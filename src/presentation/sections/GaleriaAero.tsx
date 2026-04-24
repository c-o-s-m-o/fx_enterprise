// src/presentation/sections/GaleriaAero.tsx
"use client";
import React, { FC, useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ZoomIn, AlertCircle, X, Play, ChevronLeft, ChevronRight, ImageOff, ChevronDown, ChevronUp } from "lucide-react";
import { FadeUp, SectionTag } from "@/presentation/components/ui";
import { C } from "@/domain/constants/design-tokens";

type GalleryItem = {
  id: string;
  title: string;
  src: string;
  thumb: string;
  cat: string;
  type: 'image' | 'video';
};

// Componente de imagem otimizado
const LazyImage: FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full bg-gray-100">
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          {/* Substituído border-3 por border-[3px] */}
          <div className="w-6 h-6 border-[3px] border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <ImageOff className="w-6 h-6 text-gray-400" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

export const GaleriaAero: FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const itemsPerView = 4;
  const maxCarouselIndex = Math.max(0, galleryItems.length - itemsPerView);

  // Bloqueia scroll do body
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  // Busca dados da API (agora estática)
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Erro desconhecido');
        if (!Array.isArray(data)) throw new Error('Formato de resposta inválido');
        setGalleryItems(data);
      } catch (err: any) {
        console.error('Erro ao carregar galeria:', err);
        setError(err.message || 'Não foi possível carregar as imagens.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Auto-carrossel
  useEffect(() => {
    if (expanded || galleryItems.length <= itemsPerView) return;
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % (maxCarouselIndex + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [expanded, galleryItems.length, maxCarouselIndex]);

  useEffect(() => {
    if (carouselIndex > maxCarouselIndex) {
      setCarouselIndex(Math.max(0, maxCarouselIndex));
    }
  }, [carouselIndex, maxCarouselIndex]);

  const navigate = useCallback((newIndex: number, dir: number) => {
    setDirection(dir);
    setSelectedIndex(newIndex);
  }, []);

  const handlePrevious = useCallback(() => {
    if (selectedIndex !== null) {
      const newIndex = (selectedIndex - 1 + galleryItems.length) % galleryItems.length;
      navigate(newIndex, -1);
    }
  }, [selectedIndex, galleryItems.length, navigate]);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      const newIndex = (selectedIndex + 1) % galleryItems.length;
      navigate(newIndex, 1);
    }
  }, [selectedIndex, galleryItems.length, navigate]);

  const openModal = (index: number) => {
    setDirection(0);
    setSelectedIndex(index);
  };

  const closeModal = () => setSelectedIndex(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipe = info.offset.x;
    if (swipe < -100) handleNext();
    else if (swipe > 100) handlePrevious();
  };

  // Eventos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowLeft') handlePrevious();
      else if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrevious, handleNext]);

  // Pré-carrega imagens adjacentes
  useEffect(() => {
    if (selectedIndex !== null && galleryItems.length > 0) {
      const preloadImages = (indices: number[]) => {
        indices.forEach(idx => {
          if (idx >= 0 && idx < galleryItems.length) {
            const item = galleryItems[idx];
            if (item.type === 'image') {
              const img = new Image();
              img.src = item.thumb;
            }
          }
        });
      };
      preloadImages([selectedIndex - 1, selectedIndex + 1]);
    }
  }, [selectedIndex, galleryItems]);

  // Variantes de animação
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const contentVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotate: direction * 2
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      // Corrigido: tipo da animação explicitamente como "spring"
      transition: { type: "spring" as const, stiffness: 300, damping: 25 }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      rotate: direction * -2,
      transition: { duration: 0.2 }
    })
  };

  // Estados de UI
  if (isLoading) {
    return (
      <section id="galeria" className="py-14 sm:py-24" style={{ background: C.light200 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-10 h-10 mx-auto border-[3px] border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-ink-500">Carregando galeria...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="galeria" className="py-14 sm:py-24" style={{ background: C.light200 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
          <p className="text-ink-700">{error}</p>
        </div>
      </section>
    );
  }

  if (galleryItems.length === 0) {
    return (
      <section id="galeria" className="py-14 sm:py-24" style={{ background: C.light200 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-ink-500">Nenhuma imagem ou vídeo encontrado.</p>
        </div>
      </section>
    );
  }

  const selectedItem = selectedIndex !== null ? galleryItems[selectedIndex] : null;
  const visibleCarouselItems = galleryItems.slice(carouselIndex, carouselIndex + itemsPerView);

  return (
    <>
      {/* MODAL FULLSCREEN */}
      <AnimatePresence custom={direction}>
        {selectedItem && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0,0,0,0.85)' }}
            onClick={closeModal}
          >
            {/* Botão Fechar */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
              className="absolute top-6 right-6 z-30 p-3 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all group"
              onClick={closeModal}
              aria-label="Fechar"
            >
              <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>

            {/* Navegação */}
            {galleryItems.length > 1 && (
              <>
                <motion.button
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                  onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                  aria-label="Anterior"
                >
                  <ChevronLeft size={32} />
                </motion.button>
                <motion.button
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  aria-label="Próximo"
                >
                  <ChevronRight size={32} />
                </motion.button>
              </>
            )}

            {/* Conteúdo da mídia */}
            <motion.div
              key={selectedItem.id}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === 'image' ? (
                <img
                  src={selectedItem.src}  // Agora usa a URL fornecida pela API (imgBB)
                  alt={selectedItem.title}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                  style={{ pointerEvents: 'none' }}
                />
              ) : (
                <iframe
                  src={`https://drive.google.com/file/d/${selectedItem.id}/preview`}
                  className="w-full h-full max-w-7xl max-h-full rounded-xl shadow-2xl"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              )}
            </motion.div>

            {/* Indicador de posição */}
            {galleryItems.length > 1 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-6 left-0 right-0 flex justify-center gap-2"
              >
                {galleryItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                    className={`h-2 rounded-full transition-all duration-300 ${i === selectedIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
                    aria-label={`Ir para item ${i + 1}`}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEÇÃO PRINCIPAL */}
      <section id="galeria" className="py-14 sm:py-24" style={{ background: C.light200 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeUp className="mb-8 sm:mb-10">
            <SectionTag label="Galeria Aero" />
            <h2 className="hn text-4xl sm:text-5xl font-black uppercase leading-[0.88]" style={{ color: C.ink900 }}>
              Imagens da <span style={{ color: C.orange }}>Galeria Aero.</span>
            </h2>
          </FadeUp>

          {/* CARROSSEL DE 4 IMAGENS */}
          <div className="relative mb-8">
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {visibleCarouselItems.map((item, idx) => {
                const globalIndex = carouselIndex + idx;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative overflow-hidden rounded-xl cursor-pointer bg-gray-100 shadow-sm hover:shadow-md transition-all"
                    style={{ aspectRatio: "1/1" }}
                    onClick={() => openModal(globalIndex)}
                  >
                    <LazyImage
                      src={item.thumb}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                          <Play size={20} className="text-white ml-0.5" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                        <ZoomIn size={16} className="text-white" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Indicadores do carrossel */}
            {galleryItems.length > itemsPerView && !expanded && (
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: maxCarouselIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`h-2 rounded-full transition-all ${i === carouselIndex ? 'w-6 bg-orange-500' : 'w-2 bg-gray-300'}`}
                    aria-label={`Ir para slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* BOTÃO SANFONA */}
          <div className="text-center mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-ink-700 font-medium shadow-sm hover:shadow-md transition-all"
              style={{ color: C.ink700 }}
            >
              {expanded ? (
                <>
                  <ChevronUp size={18} />
                  Recolher galeria
                </>
              ) : (
                <>
                  <ChevronDown size={18} />
                  Ver todas as fotos ({galleryItems.length})
                </>
              )}
            </motion.button>
          </div>

          {/* GRADE COMPLETA (SANFONA) */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <motion.div
                  layout
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
                >
                  {galleryItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className="group relative overflow-hidden rounded-xl cursor-pointer bg-gray-100 shadow-sm hover:shadow-md transition-all"
                      style={{ aspectRatio: "1/1" }}
                      onClick={() => openModal(index)}
                    >
                      <LazyImage
                        src={item.thumb}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                            <Play size={20} className="text-white ml-0.5" />
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                          <ZoomIn size={16} className="text-white" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};