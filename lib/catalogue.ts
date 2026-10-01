import { groupGames, type GameGroup } from "./game-groups";
import type { Game } from "./mock-games";
import { platforms, type PlatformFilter } from "./platforms";

export const genres = ["All games", "Open world", "RPG", "Action", "Adventure", "Indie", "Racing", "Co-op", "Fighting", "Puzzle", "Simulation", "Strategy"] as const;
export type Genre = (typeof genres)[number];
export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "title", label: "Title: A to Z" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;
export type SortOrder = (typeof sortOptions)[number]["value"];
export type CatalogueFilters = { platform: PlatformFilter; genre: Genre; query: string; sort: SortOrder; page: number };
export const pageSize = 12;

export function readCatalogueFilters(params: { get: (key: string) => string | null }): CatalogueFilters {
  const platform = params.get("platform");
  const genre = params.get("genre");
  const sort = params.get("sort");
  const page = Number(params.get("page") ?? "1");
  return {
    platform: platforms.includes(platform as (typeof platforms)[number]) ? platform as PlatformFilter : "All platforms",
    genre: genres.includes(genre as Genre) ? genre as Genre : "All games",
    query: (params.get("q") ?? "").slice(0, 100),
    sort: sortOptions.some((option) => option.value === sort) ? sort as SortOrder : "featured",
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
  };
}

export function catalogueHref(filters: CatalogueFilters) {
  const params = new URLSearchParams();
  if (filters.platform !== "All platforms") params.set("platform", filters.platform);
  if (filters.genre !== "All games") params.set("genre", filters.genre);
  if (filters.query) params.set("q", filters.query);
  if (filters.sort !== "featured") params.set("sort", filters.sort);
  if (filters.page > 1) params.set("page", String(filters.page));
  const query = params.toString();
  return `/games${query ? `?${query}` : ""}`;
}

function groupPrice(group: GameGroup, platform: PlatformFilter) {
  const prices = group.editions
    .filter((game) => platform === "All platforms" || game.platform === platform)
    .map((game) => game.price)
    .filter((price): price is number => price !== null);
  return prices.length ? Math.min(...prices) : null;
}

function searchText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function getCatalogue(games: Game[], filters: CatalogueFilters) {
  const query = searchText(filters.query);
  const groups = groupGames(games);
  const filtered = groups.filter((group) => group.editions.some((game) =>
    (filters.platform === "All platforms" || game.platform === filters.platform) &&
    (filters.genre === "All games" || game.genre === filters.genre) &&
    [game.title, ...(game.searchAliases ?? [])].some((title) => searchText(title).includes(query)),
  ));
  if (filters.sort !== "featured") filtered.sort((a, b) => {
    if (filters.sort === "title") return a.editions[0].title.localeCompare(b.editions[0].title, "en");
    const first = groupPrice(a, filters.platform);
    const second = groupPrice(b, filters.platform);
    // Unpriced upcoming games belong at the end in either price direction.
    if (first === null) return second === null ? 0 : 1;
    if (second === null) return -1;
    return filters.sort === "price-asc" ? first - second : second - first;
  });
  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(filters.page, pages);
  const start = (page - 1) * pageSize;
  return { groups, total, pages, page, start, games: filtered.slice(start, start + pageSize) };
}
