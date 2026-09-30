import type { Platform } from "./platforms";

export type Game = { id: string; gameId: string; title: string; slug: string; image: string; platform: Platform; genre: "Open world" | "RPG" | "Indie" | "Racing" | "Action"; price: number | null; releaseDate?: string; status?: "Coming soon"; searchAliases?: string[]; currency: "EUR"; description: string; };
// Illustrative products only. Prices are not supplier quotes or live offers.
const pcGames: Game[] = [
  { id: "1091500", gameId: "1091500", title: "Cyberpunk 2077", slug: "cyberpunk-2077", image: "/games/cyberpunk-2077.jpg", platform: "PC", genre: "Open world", price: 29.99, currency: "EUR", description: "Step into Night City as V, a mercenary navigating a sprawling world of cybernetic upgrades, dangerous deals and choices that shape your story." },
  { id: "1245620", gameId: "1245620", title: "ELDEN RING", slug: "elden-ring", image: "/games/elden-ring.jpg", platform: "PC", genre: "RPG", price: 39.99, currency: "EUR", description: "Explore the Lands Between, uncover its mysteries and take on formidable enemies in a vast fantasy action RPG." },
  { id: "1086940", gameId: "1086940", title: "Baldur's Gate 3", slug: "baldurs-gate-3", image: "/games/baldurs-gate-3.jpg", platform: "PC", genre: "RPG", price: 49.99, currency: "EUR", description: "Gather your party for a story-rich adventure where your choices, companions and a roll of the dice can change everything." },
  { id: "1551360", gameId: "1551360", title: "Forza Horizon 5", slug: "forza-horizon-5", image: "/games/forza-horizon-5.jpg", platform: "PC", genre: "Racing", price: 34.99, currency: "EUR", description: "Head out on an open-world driving adventure through Mexico, from sun-soaked roads to jungles, deserts and bustling cities." },
  { id: "1145360", gameId: "1145360", title: "Hades", slug: "hades", image: "/games/hades.jpg", platform: "PC", genre: "Indie", price: 14.99, currency: "EUR", description: "Defy the god of the dead and battle your way out of the Underworld in an action-packed roguelike. Every escape attempt brings a new story." },
  { id: "367520", gameId: "367520", title: "Hollow Knight", slug: "hollow-knight", image: "/games/hollow-knight.jpg", platform: "PC", genre: "Indie", price: 9.99, currency: "EUR", description: "Descend into a beautifully drawn underground kingdom. Discover forgotten paths, face challenging foes and unravel the secrets of Hallownest." },
];

// Console entries demonstrate separate product editions, not confirmed stock.
// Nintendo examples are for Nintendo Switch; Xbox examples are Series X|S.
const demoEditions: Record<string, Platform[]> = {
  "cyberpunk-2077": ["PS5", "Xbox"],
  "elden-ring": ["PS5", "Xbox"],
  "baldurs-gate-3": ["PS5", "Xbox"],
  "forza-horizon-5": ["Xbox"],
  "hades": ["PS5", "Xbox", "Nintendo"],
  "hollow-knight": ["Nintendo"],
};

const gtaVI: Game = {
  id: "gta-vi-ps5",
  gameId: "gta-vi",
  title: "Grand Theft Auto VI",
  slug: "grand-theft-auto-vi-ps5",
  image: "/games/gta-vi.jpg",
  platform: "PS5",
  genre: "Open world",
  price: null,
  currency: "EUR",
  status: "Coming soon",
  releaseDate: "November 19, 2026",
  searchAliases: ["GTA 6", "GTA VI", "Grand Theft Auto 6"],
  description: "Return to Vice City with Jason and Lucia in Rockstar Games' next open-world adventure, set across the state of Leonida.",
};

const spotlightGames: Game[] = [
  gtaVI,
  { ...gtaVI, id: "gta-vi-xbox", slug: "grand-theft-auto-vi-xbox", platform: "Xbox" },
  {
    id: "marvels-wolverine-ps5",
    gameId: "marvels-wolverine",
    title: "Marvel's Wolverine",
    slug: "marvels-wolverine-ps5",
    image: "/games/marvels-wolverine.jpg",
    platform: "PS5",
    genre: "Action",
    price: 59.99,
    currency: "EUR",
    description: "Take on an original, story-driven adventure as Logan, with fierce claw combat and a journey through Canada, Japan and Madripoor. Developed by Insomniac Games for PlayStation 5.",
  },
];

export const mockGames: Game[] = [
  ...spotlightGames,
  ...pcGames,
  ...pcGames.flatMap((game) =>
    demoEditions[game.slug].map((platform) => ({
      ...game,
      id: `${game.id}-${platform.toLowerCase()}`,
      slug: `${game.slug}-${platform.toLowerCase()}`,
      platform,
    })),
  ),
];
