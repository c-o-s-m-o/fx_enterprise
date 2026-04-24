// 📁 src/lib/slug.ts
// Converte IDs de produto para slugs de URL limpos e vice-versa.
// Necessário porque os IDs originais têm espaços ("Matrice 4T", "FlightHub 2").
//
// Mapeamento explícito — mais seguro que slugify automático,
// garante que renomear um produto não quebra URLs existentes.

const SLUG_TO_ID: Record<string, string> = {
  "matrice-4t":  "Matrice 4T",
  "matrice-4e":  "Matrice 4E",
  "dock3":       "dock3",
  "flighthub-2": "FlightHub 2",
};

// Gerado automaticamente a partir do mapa acima — única fonte de verdade
const ID_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_TO_ID).map(([slug, id]) => [id, slug])
);

/**
 * Converte ID do produto para slug de URL.
 * @example toSlug("Matrice 4T")  → "matrice-4t"
 * @example toSlug("FlightHub 2") → "flighthub-2"
 * @example toSlug("dock3")       → "dock3"
 */
export function toSlug(id: string): string {
  return ID_TO_SLUG[id] ?? id.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Converte slug de URL de volta ao ID original do produto.
 * @example fromSlug("matrice-4t")  → "Matrice 4T"
 * @example fromSlug("flighthub-2") → "FlightHub 2"
 */
export function fromSlug(slug: string): string {
  return SLUG_TO_ID[slug] ?? slug;
}

/** Todos os slugs válidos — usado em generateStaticParams */
export const ALL_SLUGS = Object.keys(SLUG_TO_ID);
