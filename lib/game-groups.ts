import type { Game } from "./mock-games";

export type GameGroup = { id: string; editions: Game[] };

export function groupGames(games: Game[]): GameGroup[] {
  const groups = new Map<string, GameGroup>();
  for (const game of games) {
    const group = groups.get(game.gameId);
    if (group) group.editions.push(game);
    else groups.set(game.gameId, { id: game.gameId, editions: [game] });
  }
  return [...groups.values()];
}
