// src/presentation/sections/SegmentSelectorSection.tsx
"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SEGMENTS } from "@/domain/constants/segments";
import { Section, Container, Card, SectionHeading } from "@/presentation/components/ui/primitives";
import { FadeUp } from "@/presentation/components/ui";
import { C } from "@/domain/constants/design-tokens";

export const SegmentSelectorSection = () => {
  return (
    <Section bg="light2" id="segmentos">
      <Container>
        <FadeUp className="text-center max-w-2xl mx-auto mb-10">
          <SectionHeading
            tag="Para qual operação você precisa de drones?"
            subtitle="Escolha o seu segmento e veja uma análise personalizada, com cases reais e simulação de ROI."
          >
            Soluções por <span style={{ color: C.orange }}>setor</span>
          </SectionHeading>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SEGMENTS.map(segment => {
            const Icon = segment.icon;
            return (
              <FadeUp key={segment.id} delay={0.05}>
                <Link href={`/solucoes/${segment.slug}`} className="block h-full">
                  <Card variant="light" hoverable className="h-full p-6 text-center transition-all group">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110"
                      style={{ background: `${segment.accentColor}15` }}
                    >
                      <Icon size={28} style={{ color: segment.accentColor }} />
                    </div>
                    <h3 className="font-black text-base mb-2" style={{ color: C.ink900 }}>
                      {segment.label}
                    </h3>
                    <p className="text-xs mb-4" style={{ color: C.ink400 }}>
                      {segment.description}
                    </p>
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider transition-all group-hover:gap-2"
                      style={{ color: segment.accentColor }}
                    >
                      Ver soluções <ArrowRight size={12} />
                    </span>
                  </Card>
                </Link>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};