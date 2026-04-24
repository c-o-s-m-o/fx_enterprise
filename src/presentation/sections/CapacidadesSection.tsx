"use client";
// [COMPONENTIZADO v2.0] — CapacidadesSection: uso de Section, Container, Card, IconBox

import React, { FC } from "react";
import { Clock, BarChart3 } from "lucide-react";
import {
  Shield, Factory, Map, Thermometer, TreePine, Database, Building2, Radio,
} from "lucide-react";
import { FadeUp, SectionTag } from "@/presentation/components/ui";
import { Section, Container, Card, SectionHeading, IconBox } from "@/presentation/components/ui/primitives";
import { C } from "@/domain/constants/design-tokens";

const CAPS = [
  { n:"01", icon:Shield,      title:"Segurança & Vigilância",     desc:"Patrulha 24/7, intrusos via térmica, resposta automática.",            accent:"#f97316" },
  { n:"02", icon:Factory,     title:"Inspeção Técnica",           desc:"Torres, dutos, subestações — termografia e nuvem 3D.",                  accent:"#3b82f6" },
  { n:"03", icon:Map,         title:"Mapeamento & Topografia",    desc:"Ortofotos centimétricos, MDT e análise volumétrica RTK.",               accent:"#10b981" },
  { n:"04", icon:Thermometer, title:"Análise Termográfica",       desc:"Anomalias térmicas invisíveis ao olho nu em tempo real.",               accent:"#f59e0b" },
  { n:"05", icon:TreePine,    title:"Monitoramento Ambiental",    desc:"NDVI, foco de incêndio 30 mK, relatórios IBAMA automáticos.",           accent:"#22c55e" },
  { n:"06", icon:Database,    title:"Dados Geoespaciais & BI",    desc:"GIS, SIG, ERP — dados de campo viram inteligência de negócio.",         accent:"#8b5cf6" },
  { n:"07", icon:Building2,   title:"Gestão de Infraestrutura",   desc:"Pontes, obras, ativos e áreas de risco geológico contínuo.",            accent:"#06b6d4" },
  { n:"08", icon:Radio,       title:"Apoio a Operações Críticas", desc:"SAR, Defesa Civil, incêndios — consciência situacional em tempo real.", accent:"#ef4444" },
];

const BEFORE_AFTER = [
  { label:"Atividades que levavam dias",   after:"realizadas em minutos",        icon:Clock,    accent:"#f97316" },
  { label:"Equipes expostas a risco",      after:"substituídas por dados remotos", icon:Shield,   accent:"#10b981" },
  { label:"Relatórios semanais manuais",   after:"gerados automaticamente por IA", icon:BarChart3, accent:"#3b82f6" },
];

export const CapacidadesSection: FC = () => (
  // [COMPONENTIZADO v2.0] Section substitui <section className="py-14 sm:py-24" style={{background:...}}>
  <Section bg="light2">
    <Container>
      {/* [COMPONENTIZADO v2.0] SectionHeading substitui SectionTag + h2 inline */}
      <FadeUp className="text-center max-w-2xl mx-auto mb-12">
        <SectionHeading
          tag="Múltiplas Capacidades · Um Ativo"
          subtitle="Com plataformas aéreas inteligentes integradas à nossa solução, um único drone pode desempenhar até 8 funções operacionais — com velocidade, precisão e segurança muito superiores aos métodos tradicionais."
        >
          Um equipamento.<br /><span style={{ color: C.orange }}>8 capacidades.</span>
        </SectionHeading>
      </FadeUp>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
        {CAPS.map((cap, i) => (
          <FadeUp key={i} delay={(i % 4) * 0.05}>
            {/* [COMPONENTIZADO v2.0] Card substitui div com shadow/border inline */}
            <Card variant="light" hoverable className="p-4 sm:p-5 h-full border-transparent hover:border-transparent">
              <div className="flex items-center justify-between mb-3">
                {/* [COMPONENTIZADO v2.0] IconBox substitui container de ícone inline */}
                <IconBox icon={cap.icon} accent={cap.accent} bgOpacity="12" iconSize={16}
                  className="group-hover:scale-110 transition-all" />
                <span className="hn text-2xl sm:text-3xl font-black" style={{ color: `${cap.accent}15` }}>{cap.n}</span>
              </div>
              <h3 className="text-[12px] sm:text-[13px] font-black mb-1 leading-snug" style={{ color: C.ink900 }}>{cap.title}</h3>
              <p className="text-[11px] leading-relaxed hidden sm:block" style={{ color: C.ink400 }}>{cap.desc}</p>
            </Card>
          </FadeUp>
        ))}
      </div>

      {/* Comparativo antes/depois */}
      <FadeUp>
        <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
          {BEFORE_AFTER.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl border"
              style={{ background: C.light100, borderColor: C.bLight }}>
              <IconBox icon={item.icon} accent={item.accent} bgOpacity="12" iconSize={18} />
              <div>
                <div className="text-[11px] line-through mb-0.5" style={{ color: C.ink400 }}>{item.label}</div>
                <div className="text-[13px] font-bold" style={{ color: C.ink900 }}>{item.after}</div>
              </div>
            </div>
          ))}
        </div>
      </FadeUp>
    </Container>
  </Section>
);
