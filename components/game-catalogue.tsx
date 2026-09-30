"use client";

import { useState } from "react";
import type { Game } from "@/lib/mock-games";
import { groupGames } from "@/lib/game-groups";
import { platforms, type Platform, type PlatformFilter } from "@/lib/platforms";
import { GameCard } from "./game-card";
import { Icon } from "./icon";

const genres = ["All games", "Open world", "RPG", "Indie", "Racing", "Action"] as const;
const platformFilters: PlatformFilter[] = ["All platforms", ...platforms];

function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "PC") return <Icon name="monitor" />;
  if (platform === "PS5") return <span className="platform-monogram">PS</span>;
  if (platform === "Xbox") return <span className="platform-monogram xbox-mark">X</span>;
  return <Icon name="controller" />;
}

export function GameCatalogue({ games }: { games: Game[] }) {
  const [platform, setPlatform] = useState<PlatformFilter>("All platforms");
  const [genre, setGenre] = useState<(typeof genres)[number]>("All games");
  const [query, setQuery] = useState("");
  const grouped = groupGames(games);
  const filtered = grouped.filter((group) =>
    group.editions.some(
      (game) =>
        (platform === "All platforms" || game.platform === platform) &&
        (genre === "All games" || game.genre === genre) &&
        [game.title, ...(game.searchAliases ?? [])].some((title) =>
          title.toLowerCase().includes(query.trim().toLowerCase()),
        ),
    ),
  );

  function resetFilters() {
    setPlatform("All platforms");
    setGenre("All games");
    setQuery("");
  }

  function browsePlatform(value: Platform) {
    setPlatform(value);
    const section = document.getElementById("games");
    section?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  }

  return (
    <>
      <section className="container catalogue-section" id="games" aria-labelledby="games-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WORTH YOUR PLAYTIME</p>
            <h2 id="games-title">Find your next obsession.</h2>
          </div>
          <span className="collection-label">THE DEMO COLLECTION <span>/ {String(filtered.length).padStart(2, "0")}</span></span>
        </div>
        <div className="platform-filters" role="group" aria-label="Filter games by platform">
          {platformFilters.map((item) => (
            <button
              key={item}
              type="button"
              className={`platform-filter${platform === item ? " selected" : ""}`}
              aria-pressed={platform === item}
              onClick={() => setPlatform(item)}
            >
              {item === "PC" ? <Icon name="monitor" /> : item !== "All platforms" ? <Icon name="controller" /> : null}
              {item}
            </button>
          ))}
        </div>
        <div className="catalogue-toolbar">
          <div className="genre-filters" role="group" aria-label="Filter games by genre">
            {genres.map((item) => (
              <button key={item} type="button" aria-pressed={genre === item} className={genre === item ? "genre-filter selected" : "genre-filter"} onClick={() => setGenre(item)}>{item}</button>
            ))}
          </div>
          <label className="game-search">
            <Icon name="search" />
            <span className="sr-only">Search games</span>
            <input type="search" placeholder="Search games" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
        </div>
        <p className="sr-only" role="status">{filtered.length} games found{platform !== "All platforms" ? ` for ${platform}` : " across all platforms"}</p>
        {filtered.length ? (
          <div className="game-grid">
            {filtered.map((group) => (
              <GameCard
                key={group.id}
                game={group.editions.find((edition) => edition.platform === platform) ?? group.editions[0]}
                editions={group.editions}
                activePlatform={platform === "All platforms" ? undefined : platform}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Icon name="search" width={28} height={28} />
            <h3>No games found</h3>
            <p>Try another platform, title or genre.</p>
            <button className="button button-secondary" type="button" onClick={resetFilters}>Reset filters</button>
          </div>
        )}
        <p className="catalogue-note">A taste of what we&apos;re building. Final catalogue and pricing will depend on our distribution partners.</p>
      </section>

      <section className="container platform-section" id="platforms" aria-labelledby="platform-title">
        <div className="section-heading">
          <div><p className="eyebrow">YOUR SETUP. YOUR WORLD.</p><h2 id="platform-title">Play your way.</h2></div>
          <p>Pick your platform.<br />Find your next adventure.</p>
        </div>
        <div className="platform-grid" role="group" aria-label="Browse a platform">
          {platforms.map((item) => (
            <button
              key={item}
              type="button"
              className={`platform-card${platform === item ? " selected" : ""}`}
              aria-pressed={platform === item}
              aria-label={`Browse ${item} games`}
              onClick={() => browsePlatform(item)}
            >
              <PlatformIcon platform={item} />
              <span><strong>{item}</strong><span>{grouped.filter((group) => group.editions.some((game) => game.platform === item)).length} demo games</span></span>
              {platform === item && <span className="platform-tag">SELECTED</span>}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
