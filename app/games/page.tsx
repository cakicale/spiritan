import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { GameCatalogue } from "@/components/game-catalogue";
import { GameCard } from "@/components/game-card";
import { groupGames } from "@/lib/game-groups";
import { getProducts } from "@/lib/products";
import { pageSize } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Explore games | Spiritan", description: "Explore the Spiritan demo collection for PC, PlayStation 5, Xbox and Nintendo Switch. Find your next adventure by platform, genre or title." };

export default async function GamesPage() {
  const games = await getProducts();
  const groups = groupGames(games);
  return (
    <main id="main" className="games-page">
      <section className="container catalogue-hero" aria-labelledby="catalogue-title">
        <div><p className="eyebrow">THE DEMO COLLECTION</p><h1 id="catalogue-title">So many worlds.<br /><span>Where to next?</span></h1><p>From the next big adventure to the little game that stays with you. Find something worth your playtime.</p><div className="catalogue-stats"><span><strong>{groups.length}</strong> games to explore</span><span><strong>4</strong> platforms</span></div></div>
        <div className="catalogue-hero-art" aria-hidden="true"><div className="catalogue-art-back"><Image src="/games/elden-ring.jpg" alt="" fill sizes="340px" /></div><div className="catalogue-art-front"><Image src="/games/hades.jpg" alt="" fill sizes="340px" /></div><span>ONE MORE GAME.</span></div>
      </section>
      <Suspense fallback={<section className="container full-catalogue catalogue-loading" aria-label="Game catalogue"><p role="status">Loading catalogue filters…</p><div className="game-grid">{groups.slice(0, pageSize).map((group) => <GameCard key={group.id} game={group.editions[0]} editions={group.editions} />)}</div></section>}>
        <GameCatalogue games={games} />
      </Suspense>
    </main>
  );
}
