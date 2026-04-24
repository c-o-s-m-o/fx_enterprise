"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── Logo Aero Drone Solutions ────────────────────────────────────────────────────────────
export const Logo: FC<{ size?: number; white?: boolean }> = ({ size = 32, white = false }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8"
      fill={white ? "rgba(255,255,255,0.07)" : "rgba(249,115,22,0.09)"}
      stroke={white ? "rgba(255,255,255,0.2)" : "#f97316"} strokeWidth="1.2" />
    <path d="M9 30 L20 10" stroke={white ? "#ffffff" : "#f97316"} strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M20 10 L29 30" stroke={white ? "#ffffff" : "#f97316"} strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M13.5 24 L32 15" stroke={white ? "#ffffff" : "#f97316"} strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M30 20 L36 20" stroke={white ? "rgba(255,255,255,0.55)" : "rgba(249,115,22,0.55)"} strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <path d="M31 24 L36 24" stroke={white ? "rgba(255,255,255,0.3)" : "rgba(249,115,22,0.3)"} strokeWidth="1.2" strokeLinecap="round" fill="none" />
  </svg>
);

// ── FadeUp ─────────────────────────────────────────────────────────────────────
export const FadeUp: FC<{ children: React.ReactNode; delay?: number; className?: string; once?: boolean }> = ({
  children, delay = 0, className = "", once = true,
}) => {
  const ref = useRef(null);
  const visible = useInView(ref, { once, margin: "-40px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
};

// ── AnimNum ────────────────────────────────────────────────────────────────────
export const AnimNum: FC<{ val: string }> = ({ val }) => {
  const [disp, setDisp] = useState<string | number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  useEffect(() => {
    if (!visible) return;
    const n = parseFloat(val.replace(",", "."));
    if (isNaN(n)) { setDisp(val); return; }
    let cur = 0; const step = n / 45;
    const id = setInterval(() => {
      cur = Math.min(cur + step, n);
      setDisp(n % 1 !== 0 ? cur.toFixed(1).replace(".", ",") : Math.floor(cur).toString());
      if (cur >= n) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [visible, val]);
  return <span ref={ref}>{disp}</span>;
};

// ── SectionTag ─────────────────────────────────────────────────────────────────
export const SectionTag: FC<{ label: string; dark?: boolean }> = ({ label, dark = false }) => (
  <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 ${
    dark ? "bg-orange-500/15 border border-orange-500/25" : "bg-orange-50 border border-orange-100"
  }`}>
    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
    <span className={`text-[10px] font-extrabold uppercase tracking-[0.38em] ${
      dark ? "text-orange-400" : "text-orange-600"
    }`}>{label}</span>
  </div>
);

export { 
  Button, 
  type ButtonVariant, 
  type ButtonSize 
} from "./Button";

export { 
  Typography, 
  type TypographyProps 
} from "./Typography";

export {
  Container,
  Section,
  SectionHeading,
  Card,
  IconBox,
  AccentPill,
  CheckItem,
  FormField,
  TextInput,
  SelectInput,
  TextareaInput,
  type ContainerProps,
  type CardProps,
  type SectionProps,
  type IconBoxProps,
  type AccentPillProps,
  type CheckItemProps,
  type FormFieldProps
} from "./primitives";

export { 
  VideoPlayer, 
  Lightbox,
  BgVideo
} from "./media";

export { cn } from "./utils/cn";