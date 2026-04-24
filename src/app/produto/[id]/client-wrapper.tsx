"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductPage } from "@/presentation/pages/ProductPage";
import { PRODUCTS } from "@/data/products";
import { toSlug } from "@/lib/slug";

export function ProductClientWrapper({ productId }: { productId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromSegment = searchParams.get("from");

  const product = PRODUCTS.find(p => toSlug(p.id) === productId);
  if (!product) return <div>Produto não encontrado</div>;

  // Passa o segmento de origem para o ProductPage
  return (
    <ProductPage
      product={product}
      fromSegment={fromSegment || undefined}
      onBack={() => router.back()}
      onContact={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
    />
  );
}