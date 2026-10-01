import Link from "next/link";
import { groupGames } from "@/lib/game-groups";
import type { Game } from "@/lib/mock-games";
import { platforms } from "@/lib/platforms";
import { Icon } from "./icon";

export function PlatformBrowser({ games }: { games: Game[] }) {
  const groups = groupGames(games);
  return (
    <section className="container platform-section" id="platforms" aria-labelledby="platform-title">
      <div className="section-heading"><div><p className="eyebrow">YOUR SETUP. YOUR WORLD.</p><h2 id="platform-title">Play your way.</h2></div><p>Pick your platform.<br />We&apos;ll take you to the games.</p></div>
      <div className="platform-grid">
        {platforms.map((platform) => <Link key={platform} className="platform-card platform-browser-card" href={`/games?platform=${platform}`}>
          {platform === "PC" ? <Icon name="monitor" /> : platform === "PS5" ? <span className="platform-monogram">PS</span> : platform === "Xbox" ? <span className="platform-monogram xbox-mark">X</span> : <Icon name="controller" />}
          <span><strong>{platform}</strong><span>{groups.filter((group) => group.editions.some((game) => game.platform === platform)).length} demo games</span></span><Icon name="arrow-right" className="platform-arrow" />
        </Link>)}
      </div>
    </section>
  );
}
