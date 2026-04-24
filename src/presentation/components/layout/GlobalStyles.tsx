import React from "react";

export const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; }
    html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
    body {
      font-family: 'DM Sans', system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      overflow-x: hidden;
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    }

    .hn { font-family: 'Bebas Neue', sans-serif; }
    .hero-ghost { -webkit-text-stroke: 1.5px rgba(255,255,255,0.14); color: transparent; }

    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
    .marquee-run { animation: marquee 32s linear infinite; will-change: transform; }

    ::-webkit-scrollbar { width: 3px; height: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #f97316; border-radius: 2px; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

    ::selection { background: #f97316; color: #fff; }
    :focus-visible { outline: 2px solid #f97316; outline-offset: 3px; }
    input:focus, textarea:focus, select:focus {
      border-color: #f97316 !important;
      box-shadow: 0 0 0 3px rgba(249,115,22,0.12) !important;
    }

    .line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
    .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
    .duration-400 { transition-duration: 400ms; }

    @media (max-width: 768px) {
      input, textarea, select { font-size: 16px !important; }
      button, a { min-height: 44px; }
    }
    @media (max-width: 480px) {
      .hn { letter-spacing: 0.01em; }
    }

    .wa-float {
      bottom: calc(1.5rem + env(safe-area-inset-bottom));
      right: calc(1.5rem + env(safe-area-inset-right));
    }
  ` }} />
);
