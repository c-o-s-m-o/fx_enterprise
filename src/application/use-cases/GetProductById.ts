// [NOVO v1.1] — Use case extraído da lógica inline do page.tsx
// [SOLID-S] — Única responsabilidade: buscar e validar um produto por ID
// [SOLID-D] — Depende da abstração IProductRepository, não da implementação
// Camada: application/use-cases

import type { IProductRepository } from "@/domain/repositories/IProductRepository";
import type { Product } from "@/domain/entities/Product";

/**
 * Caso de uso: buscar um produto pelo seu identificador.
 *
 * Antes da refatoração, esta lógica estava inline no componente Page():
 *   const prod = PRODUCTS.find(p => p.id === route);
 *
 * Agora está isolada, testável e reutilizável.
 */
export class GetProductByIdUseCase {
  constructor(private readonly productRepo: IProductRepository) {}

  /**
   * Executa a busca.
   * @returns Produto encontrado ou `undefined` se o ID não existir
   */
  execute(id: string): Product | undefined {
    if (!id || id.trim() === "") return undefined;
    return this.productRepo.getById(id);
  }
}
