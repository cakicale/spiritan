import Link from "next/link";
import { Icon } from "./icon";
import { CartLink } from "./cart-link";
import { MainNav } from "./main-nav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="wordmark" href="/" aria-label="Spiritan home">
          <span className="brand-mark">s</span>spiritan<span className="brand-period">.</span>
        </Link>
        <MainNav />
        <div className="header-actions"><Link className="header-cta" href="/games"><Icon name="search" /><span>Find a game</span></Link><CartLink /></div>
      </div>
    </header>
  );
}
