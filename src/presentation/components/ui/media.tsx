"use client";

import React, { FC, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from "lucide-react";
import type { GalleryItem } from "@/domain/entities/index";

export const BgVideo: FC<{
  src: string; poster: string; className?: string; opacity?: number;
}> = ({ src, poster, className = "", opacity = 1 }) => {
  const vRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (vRef.current) { vRef.current.load(); vRef.current.play().catch(() => {}); }
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

export const VideoPlayer: FC<{
  src: string; poster: string; accent?: string; autoPlay?: boolean; className?: string;
}> = ({ src, poster, accent = "#f97316", autoPlay = false, className = "" }) => {
  const vRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [prog, setProg] = useState(0);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const v = vRef.current; if (!v) return;
    v.load();
    const onTime = () => setProg(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    v.addEventListener("timeupdate", onTime);
    if (autoPlay) { v.play().then(() => setPlaying(true)).catch(() => setErr(true)); }
    return () => v.removeEventListener("timeupdate", onTime);
  }, [src, autoPlay]);
  const toggle = () => { const v = vRef.current; if (!v) return; if (playing) v.pause(); else v.play().catch(() => {}); setPlaying(p => !p); };
  if (err) return <img src={poster} alt="" className={`w-full h-full object-cover ${className}`} />;
  return (
    <div className={`relative group/vp overflow-hidden bg-black ${className}`}>
      <video ref={vRef} key={src} className="w-full h-full object-cover" muted={muted} loop playsInline poster={poster} onError={() => setErr(true)}>
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

export const Lightbox: FC<{ item: GalleryItem | null; onClose: () => void }> = ({ item, onClose }) => {
  useEffect(() => { document.body.style.overflow = item ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [item]);
  return (
    <AnimatePresence>
      {item && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl" onClick={onClose}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} transition={{ type: "spring", bounce: 0.15 }}
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
