import Link from "next/link";
import { platforms } from "@/lib/platforms";
import { contactHref } from "@/lib/site";
import { Icon } from "./icon";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><Link className="wordmark" href="/" aria-label="Spiritan home"><span className="brand-mark">s</span>spiritan<span className="brand-period">.</span></Link><p>Good games. New adventures.<br />An independent store taking shape in Serbia.</p><span className="footer-preview"><span />PRE-LAUNCH / DEMO</span></div>
        <nav className="footer-column" aria-label="Explore Spiritan"><h2>Explore</h2><Link href="/games">All games</Link><Link href="/about">Our story</Link><Link href="/contact">Contact</Link><Link href="/cart">Your cart</Link></nav>
        <nav className="footer-column" aria-label="Browse games by platform"><h2>Your platform</h2>{platforms.map((platform) => <Link key={platform} href={`/games?platform=${platform}`}>{platform === "PS5" ? "PlayStation 5" : platform === "Nintendo" ? "Nintendo Switch" : platform}</Link>)}</nav>
        <div className="footer-column footer-contact"><h2>Let&apos;s talk games.</h2><p>Questions, ideas or a possible partnership? We&apos;d like to hear from you.</p><a className="text-link" href={contactHref()}>Get in touch<Icon name="arrow-right" /></a><Link href="/contact#questions">Demo questions</Link></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Spiritan</span><span>Illustrative catalogue and prices. Game trademarks belong to their respective owners.</span><span>Serbia / Europe</span></div>
    </footer>
  );
}
