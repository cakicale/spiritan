"use client";

import { useSearchParams } from "next/navigation";
import type { MouseEvent } from "react";
import type { Game } from "@/lib/mock-games";
import { catalogueHref, genres, getCatalogue, readCatalogueFilters, sortOptions } from "@/lib/catalogue";
import { platforms, type PlatformFilter } from "@/lib/platforms";
import { CatalogueSelect } from "./catalogue-select";
import { GameCard } from "./game-card";
import { Icon } from "./icon";

const platformFilters: PlatformFilter[] = ["All platforms", ...platforms];

export function GameCatalogue({ games }: { games: Game[] }) {
  const searchParams = useSearchParams();
  const filters = readCatalogueFilters(searchParams);
  const result = getCatalogue(games, filters);
  const hasFilters = filters.platform !== "All platforms" || filters.genre !== "All games" || filters.query !== "" || filters.sort !== "featured";

  function updateFilters(changes: Partial<CatalogueFilters>, replace = false) {
    const next = { ...filters, page: 1, ...changes };
    const href = catalogueHref(next);
    if (replace) window.history.replaceState(null, "", href);
    else window.history.pushState(null, "", href);
  }

  function resetFilters() {
    window.history.pushState(null, "", "/games");
  }

  function changePage(event: MouseEvent<HTMLAnchorElement>, page: number) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    updateFilters({ page });
    document.getElementById("catalogue-results")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
  }

  return (
    <section className="container full-catalogue" aria-label="Game catalogue">
      <div className="platform-filters" role="group" aria-label="Filter games by platform">
        {platformFilters.map((item) => {
          const count = item === "All platforms" ? result.groups.length : result.groups.filter((group) => group.editions.some((game) => game.platform === item)).length;
          return <button key={item} type="button" className={`platform-filter${filters.platform === item ? " selected" : ""}`} aria-label={`${item}, ${count} demo games`} aria-pressed={filters.platform === item} onClick={() => updateFilters({ platform: item })}>
            {item !== "All platforms" && <Icon name={item === "PC" ? "monitor" : "controller"} />}
            {item}<span className="filter-count" aria-hidden="true">{count}</span>
          </button>;
        })}
      </div>
      <div className="catalogue-controls">
        <label className="game-search catalogue-search"><Icon name="search" /><span className="sr-only">Search games</span><input type="search" placeholder="Search your next adventure…" value={filters.query} maxLength={100} onChange={(event) => updateFilters({ query: event.target.value }, true)} /></label>
        <CatalogueSelect label="Genre" value={filters.genre} options={genres.map((genre) => ({ value: genre, label: genre }))} onChange={(genre) => updateFilters({ genre })} />
        <CatalogueSelect label="Sort by" value={filters.sort} options={sortOptions} onChange={(sort) => updateFilters({ sort })} />
      </div>
      <div className="catalogue-results-heading" id="catalogue-results">
        <p role="status" aria-live="polite">{result.total ? <>Showing <strong>{result.start + 1}-{result.start + result.games.length}</strong> of <strong>{result.total}</strong> games</> : "No games found"}{filters.platform !== "All platforms" && <> for <strong>{filters.platform}</strong></>}</p>
        {hasFilters ? <button className="clear-filters" type="button" onClick={resetFilters}><Icon name="close" />Clear filters</button> : <span className="catalogue-demo-label">THE DEMO COLLECTION</span>}
      </div>
      {result.total ? (
        <div className="game-grid">
          {result.games.map((group) => <GameCard key={group.id} game={group.editions.find((edition) => edition.platform === filters.platform) ?? group.editions[0]} editions={group.editions} activePlatform={filters.platform === "All platforms" ? undefined : filters.platform} />)}
        </div>
      ) : (
        <div className="empty-state"><Icon name="search" width={28} height={28} /><h2>No adventures found.</h2><p>Try another title, platform or genre.</p><button className="button button-secondary" type="button" onClick={resetFilters}>Reset filters</button></div>
      )}
      {result.pages > 1 && (
        <nav className="catalogue-pagination" aria-label="Catalogue pages">
          {result.page > 1 ? <a className="pagination-direction" href={catalogueHref({ ...filters, page: result.page - 1 })} onClick={(event) => changePage(event, result.page - 1)}><Icon name="arrow-left" />Previous</a> : <span className="pagination-direction disabled" aria-disabled="true"><Icon name="arrow-left" />Previous</span>}
          <div className="pagination-numbers">{Array.from({ length: result.pages }, (_, index) => index + 1).map((page) => <a key={page} href={catalogueHref({ ...filters, page })} className={page === result.page ? "selected" : undefined} aria-current={page === result.page ? "page" : undefined} aria-label={`Page ${page}`} onClick={(event) => changePage(event, page)}>{page}</a>)}</div>
          {result.page < result.pages ? <a className="pagination-direction" href={catalogueHref({ ...filters, page: result.page + 1 })} onClick={(event) => changePage(event, result.page + 1)}>Next<Icon name="arrow-right" /></a> : <span className="pagination-direction disabled" aria-disabled="true">Next<Icon name="arrow-right" /></span>}
        </nav>
      )}
      <p className="catalogue-note">Explore the demo. Final products, prices and territories will depend on confirmed distribution agreements.</p>
    </section>
  );
}
