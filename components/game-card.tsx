import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/lib/mock-games";
import { platforms, type Platform } from "@/lib/platforms";
import { formatPrice } from "@/lib/products";
import { Icon } from "./icon";

type Props = { game: Game; editions?: Game[]; activePlatform?: Platform };

export function GameCard({ game, editions = [game], activePlatform }: Props) {
  const availableEditions = platforms.flatMap((platform) => {
    const edition = editions.find((item) => item.platform === platform);
    return edition ? [edition] : [];
  });
  const pricedEditions = editions.filter((edition) => edition.price !== null);
  const lowestPrice = Math.min(...pricedEditions.map((edition) => edition.price!));
  const hasPriceRange = !activePlatform && pricedEditions.some((edition) => edition.price !== lowestPrice);
  const price = hasPriceRange ? lowestPrice : game.price;

  return (
    <article className="game-card">
      <div className="game-image">
        <Image src={game.image} alt={`${game.title} cover art`} width={460} height={215} sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw" />
        <div className="game-platforms" aria-label={`${game.title} platforms`}>
          {availableEditions.map((edition) => (
            <Link
              key={edition.id}
              href={`/games/${edition.slug}`}
              className={`game-platform${activePlatform === edition.platform ? " selected" : ""}`}
              aria-label={`View ${game.title} for ${edition.platform}`}
            >
              <Icon name={edition.platform === "PC" ? "monitor" : "controller"} />{edition.platform}
            </Link>
          ))}
        </div>
        {game.status && <span className="game-status">{game.status}</span>}
        <span className="game-hover-label">View game</span>
      </div>
      <div className="game-info">
        <span className="game-genre">{game.genre}</span>
        <h3><Link className="game-title-link" href={`/games/${game.slug}`} aria-label={`View ${game.title}`}>{game.title}</Link></h3>
        <div className="game-price">
          <span>{price === null ? "Coming soon" : hasPriceRange ? "Demo price from" : "Demo price"}</span>
          <strong>{price === null ? "Price TBA" : formatPrice(price, game.currency)}</strong>
        </div>
      </div>
    </article>
  );
}
