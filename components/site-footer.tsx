import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <Link className="wordmark" href="/">
          <span className="brand-mark">s</span>spiritan<span className="brand-period">.</span>
        </Link>
        <p>Good games. New adventures.</p>
        <a href="mailto:aleksandar.popovic311@gmail.com">Get in touch</a>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Spiritan</span>
        <span>Demo prices and products are illustrative. Game trademarks belong to their respective owners.</span>
        <span>Serbia / Europe</span>
      </div>
    </footer>
  );
}
