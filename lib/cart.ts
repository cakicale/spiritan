import type { Game } from "./mock-games";
import { platforms } from "./platforms";

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

export function parseDemoOrder(snapshot: string): DemoOrder | null {
  try {
    const order = JSON.parse(snapshot);
    if (!order || typeof order !== "object" || typeof order.id !== "string" || !order.id.startsWith("DEMO-") || typeof order.email !== "string" || typeof order.createdAt !== "string" || !Number.isFinite(Date.parse(order.createdAt)) || !Array.isArray(order.items) || !order.items.length) return null;
    const validItems = order.items.every((item: unknown) => {
      if (!item || typeof item !== "object") return false;
      const game = item as Record<string, unknown>;
      return ["id", "gameId", "slug", "title", "image"].every((key) => typeof game[key] === "string") && typeof game.platform === "string" && platforms.some((platform) => platform === game.platform) && game.currency === "EUR" && typeof game.price === "number" && Number.isFinite(game.price) && game.price >= 0;
    });
    if (!validItems) return null;
    return { ...order, totalCents: cartTotalCents(order.items) };
  } catch {
    return null;
  }
}
