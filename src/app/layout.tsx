// 📁 src/app/layout.tsx
// [ATUALIZADO v3.0] — Metadata da empresa atualizada + og:image base configurado.
// Fontes mantidas (Geist para body por compatibilidade com Tailwind).
// DM Sans e Bebas Neue são carregadas via GlobalStyles (Google Fonts no <head>).

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aerodronesolucoes.com.br"),
  title: {
    default: "AeroDroneSolutions — DJI Enterprise",
    template: "%s — Aero",
  },
  description:
    "Inteligência aérea para operações críticas. Segurança perimetral, mapeamento RTK, inspeção industrial e gestão ambiental com drones DJI Enterprise autônomos.",
  keywords: [
    "drone enterprise",
    "DJI Matrice",
    "drone as a service",
    "segurança perimetral drone",
    "mapeamento RTK",
    "inspeção industrial drone",
    "DaaS",
    "Aero Drone Solutions",
    "Brasília",
  ],
  authors: [{ name: "Aero Drone Solutions" }],
  openGraph: {
    siteName: "Aero Drone Solutions — Drone as a Service",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
