// 📁 src/presentation/sections/SobreSection.tsx
// [CORRIGIDO v2.2] — Removido `style={{ ... } as any}` no IconBox.
// Agora usa a prop bgColor que foi adicionada ao IconBox em primitives.tsx.

"use client";
import React, { FC } from "react";
import { ArrowRight, Target, Zap, Radar } from "lucide-react";
import { FadeUp, SectionTag, BgVideo } from "@/presentation/components/ui";
import { Section, Container, Card, CheckItem, IconBox } from "@/presentation/components/ui/primitives";
import { Button } from "@/presentation/components/ui/Button";
import { C } from "@/domain/constants/design-tokens";
import { SECTION_VIDEOS } from "@/data/hero-slides";

const PILARES = [
  { title: "Drone as a Service (DaaS)",    desc: "Hardware, software, integração, treinamento e suporte em modelo de solução completa." },
  { title: "Inteligência Aérea Aplicada",  desc: "IA embarcada transforma cada voo em dados estratégicos: imagens anotadas, anomalias detectadas." },
  { title: "Payback comprovado < 4 meses", desc: "Cases reais em Brasília e Ceará validaram o retorno operacional." },
];

const MODELOS = [
  { title: "Série 4 Portable",      badge: "Matrice 4T · Matrice 4E", icon: Target, desc: "Operações táticas e rápidas com mobilidade total. Resposta imediata em campo.", video: SECTION_VIDEOS.prod1, poster: "https://www-cdn.djiits.com/dps/0f7d0ee78e369ae32ae883982d52bafa.jpg" },
  { title: "Dock 3 + Série 4 Dock", badge: "M4D · Matrice 4TD",       icon: Zap,    desc: "Drone-in-a-Box definitivo. 100% autônomo: decolagem, missão, pouso e recarga sem presença humana.", video: SECTION_VIDEOS.prod2, poster: "https://www-cdn.djiits.com/dps/3518859e30b80a9a77eec2a4c8ac4906.jpg" },
  { title: "Gestão via FlightHub 2", badge: "Cloud · IA",              icon: Radar,  desc: "Central de comando em nuvem para frotas inteiras. Rotas 3D, telemetria ao vivo, relatórios automáticos por IA.", video: SECTION_VIDEOS.prod3, poster: "https://www-cdn.djiits.com/dps/62ca197c8968de6dc16d0fa4463f1504.jpg" },
];

export const SobreSection: FC = () => (
  <Section id="sobre" bg="light">
    <Container>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <FadeUp>
          <SectionTag label="Nossa Missão · DJI Enterprise Brasil" />
          <h2 className="hn text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[0.88] mb-6" style={{ color: C.ink900 }}>
            Não vendemos drones.<br /><span style={{ color: C.orange }}>Entregamos</span><br />soluções completas.
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4" style={{ color: C.ink500 }}>
            A Aero Drone Solutions acredita que a verdadeira inovação não está no equipamento — está na forma como ele é integrado à operação do cliente. Implementamos o drone como um <strong className="font-semibold text-slate-700">ativo estratégico</strong>, capaz de gerar eficiência operacional, reduzir custos e ampliar a capacidade de monitoramento e análise em tempo real.
          </p>
          <p className="text-[14px] leading-relaxed mb-7" style={{ color: C.ink400 }}>
            Do <strong className="font-semibold text-slate-600">Matrice 4T portátil</strong> para resposta tática imediata, ao <strong className="font-semibold text-slate-600">Dock 3 + Matrice 4TD</strong> para autonomia 100% sem presença humana — tudo gerenciado pelo <strong className="font-semibold text-slate-600">FlightHub 2</strong>. O drone deixa de ser ferramenta e passa a ser multiplicador de inteligência operacional.
          </p>

          <div className="space-y-3 mb-8">
            {PILARES.map((d, i) => <CheckItem key={i} title={d.title} desc={d.desc} />)}
          </div>

          <Button variant="link" accent={C.orange} href="#cases" 
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' });
          }}
          iconRight={ArrowRight} iconSize={13} size="sm">
            Ver Cases Reais
          </Button>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div className="relative grid grid-cols-2 gap-3" style={{ height: "min(480px, 65vw)" }}>
            <div className="relative overflow-hidden rounded-2xl row-span-2">
              <BgVideo src={SECTION_VIDEOS.about1} poster="https://www-cdn.djiits.com/dps/59107212f2158b087e5647cdee0751a6.jpg" className="" opacity={1} />
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <BgVideo src={SECTION_VIDEOS.about2} poster="https://www-cdn.djiits.com/dps/62ca197c8968de6dc16d0fa4463f1504.jpg" className="" opacity={1} />
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <BgVideo src={SECTION_VIDEOS.dock1} poster="https://www-cdn.djiits.com/dps/3518859e30b80a9a77eec2a4c8ac4906.jpg" className="" opacity={1} />
            </div>
            <div className="absolute -bottom-3 -left-3 rounded-2xl p-4 shadow-xl z-10" style={{ background: C.orange }}>
              <div className="hn text-4xl font-black text-white leading-none">DJI</div>
              <div className="text-[9px] font-bold text-white/70 uppercase tracking-wider leading-tight">Parceiro<br />Enterprise</div>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Como Operamos */}
      <div className="mt-16 sm:mt-20">
        <FadeUp className="text-center mb-10">
          <SectionTag label="Como Operamos" />
          <h3 className="hn text-3xl sm:text-4xl font-black uppercase" style={{ color: C.ink900 }}>
            Da portabilidade à <span style={{ color: C.orange }}>autonomia total.</span>
          </h3>
          <p className="mt-4 text-[14px] max-w-lg mx-auto leading-relaxed" style={{ color: C.ink400 }}>
            Três modelos de implantação — escolhidos conforme criticidade da operação, tamanho da área e nível de autonomia desejado.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-3 gap-5">
          {MODELOS.map((p, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <Card variant="light" hoverable className="border hover:border-transparent">
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <BgVideo src={p.video} poster={p.poster} className="" opacity={1} />
                  <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.28)" }} />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold text-white"
                    style={{ background: "rgba(249,115,22,0.85)" }}>{p.badge}</div>
                </div>
                <div className="p-5 sm:p-6">
                  {/* [CORRIGIDO v2.2] bgColor prop substitui style={{ } as any} */}
                  <IconBox icon={p.icon} accent={C.orange} bgColor={C.orangeBg} iconSize={16} className="mb-4" />
                  <h4 className="text-[14px] font-bold mb-2" style={{ color: C.ink900 }}>{p.title}</h4>
                  <p className="text-[12px] sm:text-[13px] leading-relaxed" style={{ color: C.ink400 }}>{p.desc}</p>
                </div>
              </Card>
            </FadeUp>
          ))}
        </div>
      </div>
    </Container>
  </Section>
);
