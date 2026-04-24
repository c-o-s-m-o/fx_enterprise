// src/presentation/components/RecomendacaoProduto.tsx
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/domain/entities/Product";
import { toSlug } from "@/lib/slug";
import { C } from "@/domain/constants/design-tokens";

interface Props {
  produto: Product;
  fromSegment?: string;
}

export const RecomendacaoProduto: React.FC<Props> = ({ produto, fromSegment }) => {
  return (
    <div className="mt-6 p-5 rounded-2xl border-2" style={{ borderColor: C.orange, background: C.orangeBg }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
          <span className="text-white text-xs font-bold">✓</span>
        </div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600">
          Recomendação inteligente
        </span>
      </div>
      <h4 className="font-black text-lg mb-1" style={{ color: C.ink900 }}>
        Com base na sua operação, recomendamos:
      </h4>
      <p className="text-sm font-bold" style={{ color: C.orange }}>
        {produto.name}
      </p>
      <p className="text-xs text-gray-500 mt-1 mb-4">{produto.tagline}</p>
      <Link
        href={`/produto/${toSlug(produto.id)}${fromSegment ? `?from=${fromSegment}` : ""}`}
        className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:underline"
      >
        Ver detalhes do produto <ArrowRight size={12} />
      </Link>
    </div>
  );
};