import { mockGames, type Game } from "./mock-games";
// Replace this adapter with supplier data when the API is available.
export async function getProducts(): Promise<Game[]> { return mockGames; }
export async function getProduct(slug: string): Promise<Game | undefined> {
  const products = await getProducts();
  return products.find((game) => game.slug === slug);
}

export function formatPrice(price: number, currency: Game["currency"]) { return new Intl.NumberFormat("en-IE", { style: "currency", currency }).format(price); }
