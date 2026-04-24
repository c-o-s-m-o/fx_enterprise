// [REFATORADO v1.1] — Constantes de integração WhatsApp
// [MELHORIA v1.2] — Exportado com ambos os nomes para compatibilidade total

/** Número WhatsApp no formato internacional (sem + ou espaços) */
export const WA_NUMBER = "5561982373501";

/**
 * Gera o link do WhatsApp com mensagem pré-preenchida.
 * @param msg Mensagem que será enviada ao abrir o WhatsApp
 */
export const waLink = (msg: string): string =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

/** Tempo em ms de cada slide do hero carousel */
export const HERO_SLIDE_INTERVAL_MS = 11_000;

/** @deprecated Use HERO_SLIDE_INTERVAL_MS — mantido para compatibilidade */
export const INTERVAL_MS = HERO_SLIDE_INTERVAL_MS;
