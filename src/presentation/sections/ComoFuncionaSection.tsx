// 📁 src/presentation/sections/ComoFuncionaSection.tsx
// [CORRIGIDO v2.2] — Removido `style={{ ... } as any}` no IconBox.
// Usa a prop bgColor adicionada ao IconBox em primitives.tsx.

"use client";
import React, { FC } from "react";
import { FadeUp } from "@/presentation/components/ui";
import { Section, Container, Card, SectionHeading, IconBox } from "@/presentation/components/ui/primitives";
import { C } from "@/domain/constants/design-tokens";
import { HOW } from "@/data/static-content";

export const ComoFuncionaSection: FC = () => (
  <Section bg="light2">
    <Container>
      <FadeUp className="text-center max-w-xl mx-auto mb-12">
        <SectionHeading
          tag="Como Funciona"
          subtitle="4 etapas turnkey — do diagnóstico ao primeiro voo autônomo, acompanhadas pelos nossos engenheiros."
        >
          Do diagnóstico à <span style={{ color: C.orange }}>operação plena.</span>
        </SectionHeading>
      </FadeUp>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {HOW.map((step, i) => (
          <FadeUp key={i} delay={i * 0.07}>
            <Card variant="light" hoverable className="p-5 sm:p-7 hover:border-orange-100 border">
              <div className="flex items-start justify-between mb-5">
                <span className="hn text-5xl sm:text-6xl font-black leading-none"
                  style={{ color: `${C.orange}18` }}>{step.n}</span>
                {/* [CORRIGIDO v2.2] bgColor + className para group-hover substituem style as any */}
                <IconBox
                  icon={step.icon}
                  accent={C.orange}
                  bgColor={C.orangeBg}
                  iconSize={18}
                  className="w-10 h-10 sm:w-11 sm:h-11 group-hover:bg-orange-100 transition-all"
                />
              </div>
              <h3 className="text-[14px] sm:text-[15px] font-bold mb-2 group-hover:text-orange-600 transition-colors"
                style={{ color: C.ink900 }}>{step.title}</h3>
              <p className="text-[12px] sm:text-[13px] leading-relaxed"
                style={{ color: C.ink400 }}>{step.desc}</p>
            </Card>
          </FadeUp>
        ))}
      </div>
    </Container>
  </Section>
);
