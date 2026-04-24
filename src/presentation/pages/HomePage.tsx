// 📁 src/presentation/pages/HomePage.tsx
// [SIMPLIFICADO v3.0] — onOpenProduct removido.
// Seções agora usam <Link href="/produtos/[slug]"> diretamente.

"use client";
import React, { FC, useCallback, useEffect, useState } from "react";

import { Navbar }                from "@/presentation/components/layout/Navbar";
import { Footer, WhatsAppFloat } from "@/presentation/components/layout/Footer";
import { GlobalStyles }          from "@/presentation/components/layout/GlobalStyles";

import { HeroSection }         from "@/presentation/sections/HeroSection";
import { SegmentSelectorSection } from "@/presentation/sections/SegmentSelectorSection";
import { MarqueeSection,
         MercadoSection }      from "@/presentation/sections/MarqueeSection";
import { CapacidadesSection }  from "@/presentation/sections/CapacidadesSection";
import { SobreSection }        from "@/presentation/sections/SobreSection";
import { ProdutosSection }     from "@/presentation/sections/ProdutosSection";
import { SolucoesSection } from "@/presentation/sections/SolucoesSection";
import { CasesSection } from "@/presentation/sections/CasesSection";
import { ComparativoSection } from "@/presentation/sections/ComparativoSection";
import { ComoFuncionaSection } from "@/presentation/sections/ComoFuncionaSection";
import { UrgenciaSection }     from "@/presentation/sections/UrgenciaSection";
import { FaqSection }          from "@/presentation/sections/FaqSection";
import { GaleriaSection }      from "@/presentation/sections/GaleriaSection";
import { CtaSection }          from "@/presentation/sections/CtaSection";
import { IscasSection }        from "@/presentation/sections/IscasSection";
import { ContatoSection }      from "@/presentation/sections/ContatoSection";

import { C } from "@/domain/constants/design-tokens";
import { GaleriaAero } from "@/presentation/sections/GaleriaAero";

// [SIMPLIFICADO v3.0] — sem props: seções usam Link interno
export const HomePage: FC = () => {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
  }, [mobileMenu]);

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setMobileMenu(false);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: C.light200 }}>
      <GlobalStyles />

      <Navbar
        scrolled={scrolled}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        onLogoClick={handleLogoClick}
      />

      <main>
        <HeroSection />
         <GaleriaAero/>
          <SegmentSelectorSection />   {/* NOVA LINHA */}
        <MarqueeSection />
        <MercadoSection />
        <CapacidadesSection />
        <SobreSection />
        <ProdutosSection />
        <SolucoesSection />
        <UrgenciaSection />
        <CasesSection />
        <ComparativoSection />
        <ComoFuncionaSection />
        <FaqSection />
       
        <CtaSection />
        <IscasSection />
        <ContatoSection />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};
