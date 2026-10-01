import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GameCard } from "@/components/game-card";
import { Icon } from "@/components/icon";
import { AddToCart } from "@/components/add-to-cart";
import { canAddToCart } from "@/lib/cart";
import { formatPrice, gameHeroImage, getProduct, getProducts } from "@/lib/products";
import type { Platform } from "@/lib/platforms";

type Props = { params: Promise<{ slug: string }> };

const platformNames: Record<Platform, string> = {
  PC: "PC",
  PS5: "PlayStation 5",
  Xbox: "Xbox Series X|S",
  Nintendo: "Nintendo Switch",
};

export async function generateStaticParams() {
  return (await getProducts()).map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = await getProduct((await params).slug);
  if (!game) notFound();
  return {
    title: `${game.title} for ${platformNames[game.platform]} | Spiritan`,
    description: game.description,
    openGraph: {
      title: `${game.title} | Spiritan`,
      description: game.description,
      images: [{ url: gameHeroImage(game.image), alt: `${game.title}` }],
    },
  };
}

export default async function GamePage({ params }: Props) {
  const game = await getProduct((await params).slug);
  if (!game) notFound();
  const products = await getProducts();
  const editions = products.filter((item) => item.gameId === game.gameId);
  const related = products
    .filter((item) => item.platform === game.platform && item.gameId !== game.gameId)
    .sort((first, second) => Number(second.genre === game.genre) - Number(first.genre === game.genre))
    .slice(0, 3);
  const upcoming = game.status === "Coming soon";

  return (
    <main id="main" className="container product-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span>
        <Link href="/games">Games</Link><span aria-hidden="true">/</span>
        <span aria-current="page">{game.title}</span>
      </nav>
      <div className="product-layout">
        <div className="product-content">
          <div className="product-media">
            <Image src={gameHeroImage(game.image)} alt={`${game.title}`} fill sizes="(max-width: 800px) 100vw, (max-width: 1280px) 60vw, 760px" preload />
            <span className="product-image-label"><Icon name={game.platform === "PC" ? "monitor" : "controller"} />{platformNames[game.platform]}</span>
            {upcoming && <span className="game-status">Coming soon</span>}
          </div>
          <section className="product-description" aria-labelledby="about-game-title">
            <p className="eyebrow">THE WORLD YOU&apos;RE STEPPING INTO</p>
            <h2 id="about-game-title">About the game</h2>
            <p>{game.description}</p>
          </section>
          <section className="product-information" aria-labelledby="play-info-title">
            <h2 id="play-info-title">Before you play.</h2>
            <dl className="product-facts">
              <div><dt><Icon name={game.platform === "PC" ? "monitor" : "controller"} />Platform</dt><dd>{platformNames[game.platform]}</dd></div>
              <div><dt><Icon name="download" />Activation</dt><dd>To be confirmed</dd></div>
              <div><dt><Icon name="globe" />Region</dt><dd>To be confirmed</dd></div>
            </dl>
            <p className="product-facts-note">Activation instructions and regional restrictions will be listed with each confirmed product edition.</p>
          </section>
        </div>
        <aside className="purchase-panel" aria-label="Game edition and pricing">
          <p className="eyebrow">{game.platform} / {game.genre}</p>
          <h1 className="product-title">{game.title}</h1>
          <p className="product-edition">{platformNames[game.platform]} edition</p>
          <div className="edition-selection">
            <p>Choose your platform</p>
            <div className="edition-links" aria-label="Available demo editions">
              {editions.map((edition) => (
                <Link key={edition.id} href={`/games/${edition.slug}`} className={`edition-link${edition.id === game.id ? " selected" : ""}`} aria-current={edition.id === game.id ? "page" : undefined}>{edition.platform}</Link>
              ))}
            </div>
          </div>
          <div className="product-price">
            <span>{game.price === null ? "Price to be confirmed" : "Demo price"}</span>
            <strong>{game.price === null ? "Price TBA" : formatPrice(game.price, game.currency)}</strong>
          </div>
          {game.releaseDate && <p className="product-release"><span>Expected release</span><strong>{game.releaseDate}</strong></p>}
          <AddToCart productId={game.id} available={canAddToCart(game)} />
          <p className="product-preview-note">This is a demo listing. Try the cart and checkout with illustrative prices. No payment or game delivery takes place.</p>
          <Link className="product-back-link" href={`/games?platform=${game.platform}`}>Keep exploring</Link>
        </aside>
      </div>
      {related.length > 0 && (
        <section className="related-games" aria-labelledby="related-title">
          <div className="section-heading"><div><p className="eyebrow">KEEP THE ADVENTURE GOING</p><h2 id="related-title">More on {game.platform}.</h2></div><Link className="text-link" href={`/games?platform=${game.platform}`}>Explore the collection</Link></div>
          <div className="game-grid">{related.map((item) => <GameCard key={item.id} game={item} editions={products.filter((edition) => edition.gameId === item.gameId)} activePlatform={game.platform} />)}</div>
        </section>
      )}
    </main>
  );
}
