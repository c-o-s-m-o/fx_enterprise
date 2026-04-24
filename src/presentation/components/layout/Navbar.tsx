"use client";
// [REFATORADO v1.1] — Navbar extraída do page.tsx
// [VALIDADO v1.2]   — Menu mobile usa grid-cols-2 e height:0→auto idênticos ao original

import React, { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "@/presentation/components/ui";
import { C } from "@/domain/constants/design-tokens";
import { waLink } from "@/domain/constants/wa";

const NAV_ITEMS = [
  { l: "Mercado",         href: "#futuro" },
  { l: "Soluções",        href: "#solucoes" },
  { l: "Produtos",        href: "#produtos" },
  { l: "Cases",           href: "#cases" },
  { l: "Materiais",       href: "#iscas" },
  { l: "Contato",         href: "#contato" },
];

interface NavbarProps {
  scrolled: boolean;
  mobileMenu: boolean;
  setMobileMenu: (v: boolean | ((prev: boolean) => boolean)) => void;
  onLogoClick: () => void;
}

export const Navbar: FC<NavbarProps> = ({ scrolled, mobileMenu, setMobileMenu, onLogoClick }) => (
  <nav
    className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${scrolled ? "border-b shadow-xl" : ""}`}
    style={{
      background: scrolled ? `${C.navy900}f5` : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderColor: "rgba(255,255,255,0.06)",
    }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 h-14 sm:h-16">

      {/* Logo */}
      <a href="#top" className="flex items-center gap-2.5 group flex-shrink-0"
        onClick={e => { e.preventDefault(); onLogoClick(); }}>
        <Logo size={32} white />
        <div className="leading-none">
          <div className="text-[15px] sm:text-[17px] font-black tracking-wide hn text-white">AERO</div>
          <div className="text-[7px] tracking-[0.42em] font-bold uppercase hidden sm:block"
            style={{ color: "rgba(249,115,22,0.75)" }}>Drone Solutions</div>
        </div>
      </a>

      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-5 xl:gap-7">
        {NAV_ITEMS.map(item => (
          <a key={item.l} href={item.href}
            onClick={(e) => {
              e.preventDefault();
              const id = item.href.slice(1);
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-orange-400"
            style={{ color: "rgba(255,255,255,0.5)" }}>
            {item.l}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
        <a href={waLink("Olá, vim pelo site da Aero Drone Solutions.")} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,0.38)" }}>
          <MessageCircle size={12} />
          <span className="hidden xl:inline">(61) 9 8237-3501</span>
        </a>
        <a href="#contato"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-white rounded-lg transition-all hover:opacity-90"
          style={{ background: C.orange }}>
          Proposta
        </a>
      </div>

      {/* Botão mobile */}
      <button onClick={() => setMobileMenu(v => !v)}
        className="lg:hidden w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors flex-shrink-0">
        {mobileMenu ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>

    {/* Menu mobile — grid-cols-2 e height:0→auto idênticos ao original */}
    <AnimatePresence>
      {mobileMenu && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden overflow-hidden border-t"
          style={{ background: C.navy800, borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="px-4 pt-3 pb-5">
            {/* Grid 2 colunas para os itens de nav */}
            <div className="grid grid-cols-2 gap-1 mb-4">
              {NAV_ITEMS.map(item => (
                <a key={item.l} href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenu(false);
                    const id = item.href.slice(1);
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center py-3 px-4 text-[12px] font-bold uppercase tracking-wider rounded-xl hover:bg-white/[0.07] transition-all text-white/55 hover:text-white">
                  {item.l}
                </a>
              ))}
            </div>
            {/* Grid 2 colunas para botões de ação */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <a href={waLink("Olá, vim pelo site da Aero Drone Solutions.")}
                target="_blank" rel="noopener noreferrer"
                onClick={() => setMobileMenu(false)}
                className="flex items-center justify-center gap-2 rounded-xl py-3.5 text-[11px] font-extrabold uppercase tracking-wider text-white"
                style={{ background: "#25d366" }}>
                <MessageCircle size={13} /> WhatsApp
              </a>
              <a href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenu(false);
                  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 text-white text-[11px] font-extrabold uppercase tracking-wider rounded-xl py-3.5"
                style={{ background: C.orange }}>
                Proposta
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </nav>
);
