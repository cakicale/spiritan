import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container not-found-page">
      <p className="eyebrow">404 / OFF THE MAP</p>
      <h1>This one got away.</h1>
      <p>We couldn&apos;t find this page. There are more games waiting in the collection.</p>
      <Link className="button button-primary" href="/games">Explore games</Link>
    </main>
  );
}
