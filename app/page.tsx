import Image from "next/image";
import { GameCatalogue } from "@/components/game-catalogue";
import { Icon } from "@/components/icon";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const games = await getProducts();
  return (
    <>
      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-art"><Image src="/games/cyberpunk-hero.jpg" alt="Cyberpunk 2077's V against the Night City skyline" fill sizes="(max-width: 1280px) 100vw, 1280px" preload /></div><div className="hero-shade" />
          <div className="hero-copy"><p className="eyebrow">FOR THE LOVE OF PLAY</p><h1 id="hero-title">Your next<br />adventure<br /><span>starts here.</span></h1><p className="hero-description">Big worlds. Small discoveries. Games you&apos;ll keep coming back to.</p><a className="button button-primary" href="#games">Find your next game</a><p className="hero-note"><Icon name="monitor" />Digital games. Built for players.</p></div>
          <div className="hero-spotlight"><span className="spotlight-label">IN THE SPOTLIGHT</span><strong>Cyberpunk 2077</strong><span>PC · PS5 · Xbox / Open world</span></div><span className="hero-edition">THE SPIRITAN EDIT / 001</span>
        </section>
        <div className="container value-strip"><div><Icon name="controller" /><span>Great games, one place</span></div><div><Icon name="download" /><span>A fully digital experience</span></div><div><Icon name="globe" /><span>Serbia first. Balkans next.</span></div></div>
        <GameCatalogue games={games} />
        <section className="container about-section" id="about" aria-labelledby="about-title"><div><p className="eyebrow">A NEW PLAYER IN THE BALKANS</p><h2 id="about-title">Made by a gamer.<br /><span>For gamers.</span></h2></div><div className="about-copy"><p>That one more level. A world you get lost in. The game you still talk about years later. That&apos;s why we&apos;re building Spiritan.</p><p>We&apos;re working towards an independent digital games store for Serbia and the wider Balkans, with a focus on officially sourced products. This is our first chapter.</p><a className="text-link" href="mailto:aleksandar.popovic311@gmail.com">Let&apos;s talk <Icon name="mail" /></a></div></section>
      </main>

    </>
  );
}
