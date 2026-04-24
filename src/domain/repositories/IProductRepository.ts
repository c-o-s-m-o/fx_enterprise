// [NOVO v1.1] — Contrato de repositório criado seguindo SOLID-D
// [SOLID-D] — Dependency Inversion: camada de aplicação depende desta
//             abstração, não da implementação concreta em /data
// [SOLID-I] — Interface Segregation: interface focada somente em produtos

import type { Product } from "@/domain/entities/Product";

/**
 * Contrato que toda implementação de repositório de produtos deve seguir.
 * Permite trocar a fonte de dados (estática → API → DB) sem alterar
 * os casos de uso nem os componentes.
 */
export interface IProductRepository {
  /** Retorna todos os produtos disponíveis */
  getAll(): Product[];

  /** Busca produto por ID. Retorna undefined se não encontrar. */
  getById(id: string): Product | undefined;
}
