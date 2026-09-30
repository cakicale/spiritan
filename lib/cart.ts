import type { Game } from "./mock-games";

export const CART_KEY = "spiritan:cart:v1";
export const ORDER_KEY = "spiritan:demo-order:v1";
export type CartGame = Game & { price: number };
export type DemoOrder = {
  id: string;
  email: string;
  createdAt: string;
  items: CartGame[];
  totalCents: number;
};

export function canAddToCart(game: Game): game is CartGame {
  return game.status !== "Coming soon" && game.price !== null && Number.isFinite(game.price) && game.price >= 0;
}

// Only product IDs are saved in the cart. Pricing comes from the catalogue.
export function resolveCart(snapshot: string, products: Game[]): CartGame[] {
  try {
    const ids: unknown = JSON.parse(snapshot);
    if (!Array.isArray(ids)) return [];
    return [...new Set(ids)].flatMap((id) => {
      const game = products.find((item) => item.id === id);
      return game && canAddToCart(game) ? [game] : [];
    });
  } catch {
    return [];
  }
}

export function cartTotalCents(items: CartGame[]) {
  return items.reduce((total, game) => total + Math.round(game.price * 100), 0);
}

function readStoredIds(order: Record<string, unknown>) {
  if (Array.isArray(order.itemIds)) return stringsOnly(order.itemIds);
  if (!Array.isArray(order.items) || order.items.length === 0) return null;
  const ids = order.items.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const id = (item as Record<string, unknown>).id;
    return typeof id === "string" ? [id] : [];
  });
  return ids.length === order.items.length ? ids : null;
}

function stringsOnly(values: unknown[]) {
  const ids = values.filter((id): id is string => typeof id === "string" && id.length > 0);
  if (ids.length !== values.length || ids.length === 0) return null;
  return ids;
}

function resolveOrderItems({ ids, products }: { ids: string[]; products: Game[] }) {
  const uniqueIds = [...new Set(ids)];
  const items = uniqueIds.flatMap((id) => {
    const game = products.find((item) => item.id === id);
    return game && canAddToCart(game) ? [game] : [];
  });
  if (items.length !== uniqueIds.length) return null;
  return items;
}

// Receipt titles and prices come from the catalogue, not from stored JSON.
export function parseDemoOrder({ snapshot, products }: { snapshot: string; products: Game[] }): DemoOrder | null {
  try {
    const order: unknown = JSON.parse(snapshot);
    if (!order || typeof order !== "object") return null;
    const record = order as Record<string, unknown>;
    if (typeof record.id !== "string" || !record.id.startsWith("DEMO-")) return null;
    if (typeof record.email !== "string" || record.email.length === 0 || record.email.length > 254) return null;
    if (typeof record.createdAt !== "string" || !Number.isFinite(Date.parse(record.createdAt))) return null;
    const ids = readStoredIds(record);
    if (!ids) return null;
    const items = resolveOrderItems({ ids, products });
    if (!items) return null;
    return { id: record.id, email: record.email, createdAt: record.createdAt, items, totalCents: cartTotalCents(items) };
  } catch {
    return null;
  }
}
