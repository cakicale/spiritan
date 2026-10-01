import Image from "next/image";
import Link from "next/link";
import { GameCard } from "@/components/game-card";
import { Icon } from "@/components/icon";
import { PlatformBrowser } from "@/components/platform-browser";
import { groupGames } from "@/lib/game-groups";
import { getProducts } from "@/lib/products";

const featuredIds = ["gta-vi", "marvels-wolverine", "1091500", "1245620", "1086940", "1145360"];

export default async function Home() {
  const games = await getProducts();
  const groups = groupGames(games);
  const featured = featuredIds.flatMap((id) => {
    const group = groups.find((game) => game.id === id);
    return group ? [group] : [];
  });
  return (
    <main id="main">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-art"><Image src="/games/cyberpunk-hero.jpg" alt="Cyberpunk 2077's V against the Night City skyline" fill sizes="(max-width: 1280px) 100vw, 1280px" preload /></div><div className="hero-shade" />
        <div className="hero-copy"><p className="eyebrow">FOR THE LOVE OF PLAY</p><h1 id="hero-title">Your next<br />adventure<br /><span>starts here.</span></h1><p className="hero-description">Big worlds. Small discoveries. Games you&apos;ll keep coming back to.</p><Link className="button button-primary" href="/games">Find your next game<Icon name="arrow-right" /></Link><p className="hero-note"><Icon name="monitor" />Digital games. Built for players.</p></div>
        <Link className="hero-spotlight" href="/games/cyberpunk-2077"><span className="spotlight-label">IN THE SPOTLIGHT</span><strong>Cyberpunk 2077 <Icon name="arrow-right" /></strong><span>PC · PS5 · Xbox / Open world</span></Link><span className="hero-edition">THE SPIRITAN EDIT / 001</span>
      </section>
      <div className="container value-strip"><div><Icon name="controller" /><span>Great games, one place</span></div><div><Icon name="download" /><span>A fully digital experience</span></div><div><Icon name="globe" /><span>Serbia first. Balkans next.</span></div></div>
      <section className="container catalogue-section featured-section" id="games" aria-labelledby="featured-title">
        <div className="section-heading"><div><p className="eyebrow">THE SPIRITAN PICKS</p><h2 id="featured-title">Featured games.</h2></div><Link className="text-link" href="/games">View all {groups.length} games<Icon name="arrow-right" /></Link></div>
        <p className="section-intro">A few big adventures and personal favourites to get you started.</p>
        <div className="game-grid">{featured.map((group) => <GameCard key={group.id} game={group.editions[0]} editions={group.editions} />)}</div>
        <div className="featured-more"><p>Your next favourite might be just around the corner.</p><Link className="button button-secondary" href="/games">Explore the full collection<Icon name="arrow-right" /></Link></div>
      </section>
      <PlatformBrowser games={games} />
      <section className="container about-section" id="about" aria-labelledby="about-title"><div><p className="eyebrow">A NEW PLAYER IN THE BALKANS</p><h2 id="about-title">Made by a gamer.<br /><span>For gamers.</span></h2></div><div className="about-copy"><p>That one more level. A world you get lost in. The game you still talk about years later. That&apos;s why we&apos;re building Spiritan.</p><p>An independent digital games store taking shape in Serbia, with the wider Balkans in mind. A focus on officially sourced products, thoughtful discovery and a love of play.</p><Link className="text-link" href="/about">Meet Spiritan<Icon name="arrow-right" /></Link></div></section>
    </main>
  );
}
