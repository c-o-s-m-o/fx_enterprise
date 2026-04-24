// [NOVO v1.1] — Repositório concreto implementando o contrato do domain
// [SOLID-D] — Camada de aplicação importa IProductRepository, não este arquivo
// [SOLID-L] — Substitui qualquer outra implementação do contrato sem quebrar nada

import type { IProductRepository } from "@/domain/repositories/IProductRepository";
import type { Product } from "@/domain/entities/Product";
import { PRODUCTS } from "@/data/products";

/**
 * Implementação estática do repositório de produtos.
 * Fonte: array local em /data/products.ts.
 *
 * Quando a API REST estiver disponível, basta criar StaticProductRepository
 * em /infrastructure/repositories/ e trocar a injeção no use-case — sem
 * alterar componentes React.
 */
export class StaticProductRepository implements IProductRepository {
  // [MELHORIA v1.2] — Singleton leve: evita recriar instância a cada chamada
  private static instance: StaticProductRepository;

  static getInstance(): StaticProductRepository {
    if (!StaticProductRepository.instance) {
      StaticProductRepository.instance = new StaticProductRepository();
    }
    return StaticProductRepository.instance;
  }

  getAll(): Product[] {
    return PRODUCTS;
  }

  getById(id: string): Product | undefined {
    // [MELHORIA v1.2] — Busca case-insensitive para tolerar variação de capitalização
    return PRODUCTS.find(p => p.id.toLowerCase() === id.toLowerCase());
  }
}
