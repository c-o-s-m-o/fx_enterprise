// 📁 src/app/page.tsx
// [SIMPLIFICADO v3.0] — Rota raiz agora é somente a HomePage.
//
// Antes: controlava qual página renderizar (home ou produto) via estado SPA.
// Agora: produtos têm rotas reais em /produtos/[id].
//        Esta página é sempre a home — simples e direta.

import { HomePage } from "@/presentation/pages/HomePage";

export default function Page() {
  return <HomePage />;
}
