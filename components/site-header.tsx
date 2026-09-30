import Link from "next/link";
import { Icon } from "./icon";
import { CartLink } from "./cart-link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="wordmark" href="/" aria-label="Spiritan home">
          <span className="brand-mark">s</span>spiritan<span className="brand-period">.</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link className="nav-active" href="/#games">Discover</Link>
          <Link href="/#platforms">Platforms</Link>
          <Link href="/#about">Our story</Link>
        </nav>
        <div className="header-actions"><Link className="header-cta" href="/#games"><Icon name="controller" />Explore games</Link><CartLink /></div>
      </div>
    </header>
  );
}
