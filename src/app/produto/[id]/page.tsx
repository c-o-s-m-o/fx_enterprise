import Link from "next/link";
import { ProductPage } from "@/presentation/pages/ProductPage";
import { PRODUCTS } from "@/data/products";
import { toSlug } from "@/lib/slug";
import { ProductClientWrapper } from "./client-wrapper";

interface ProductDynamicPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDynamicPage({ params }: ProductDynamicPageProps) {
  const { id } = await params;
  
  // Procurar produto pelo slug
  const product = PRODUCTS.find(p => toSlug(p.id) === id);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Produto não encontrado</h1>
          <p className="text-gray-500 mb-6">O produto que você procura não existe.</p>
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
          >
            Voltar à Home
          </Link>
        </div>
      </div>
    );
  }

  return <ProductClientWrapper productId={id} />;
}
