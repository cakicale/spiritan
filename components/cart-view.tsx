"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cart-provider";
import { CheckoutSteps } from "./checkout-steps";
import { Icon } from "./icon";
import { formatPrice } from "@/lib/products";

export function EmptyCart({ checkout = false }: { checkout?: boolean }) {
  return <div className="basket-empty"><Icon name="cart" width={44} height={44} /><h2>Your next adventure is waiting.</h2><p>{checkout ? "Add a game to your cart before starting the demo checkout." : "Find a game you love and choose your platform."}</p><Link className="button button-primary" href="/#games">Explore games</Link></div>;
}

export function CartView() {
  const { items, totalCents, removeItem, ready } = useCart();
  return (
    <main id="main" className="container basket-page">
      <CheckoutSteps active={1} />
      <div className="basket-heading"><div><p className="eyebrow">YOUR NEXT ADVENTURES</p><h1>Your cart.</h1></div><Link className="text-link" href="/#games">Keep exploring</Link></div>
      {!ready ? <p className="basket-loading" role="status">Loading your cart…</p> : !items.length ? <EmptyCart /> : (
        <div className="basket-layout">
          <section className="basket-items" aria-label="Games in your cart">
            {items.map((game) => (
              <article className="basket-item" key={game.id}>
                <Link className="basket-item-image" href={`/games/${game.slug}`} tabIndex={-1} aria-hidden="true"><Image src={game.image} alt="" fill sizes="140px" /></Link>
                <div className="basket-item-info"><h2><Link href={`/games/${game.slug}`}>{game.title}</Link></h2><p><span className="basket-platform">{game.platform}</span><span>Digital game</span></p><button className="remove-item" type="button" aria-label={`Remove ${game.title} for ${game.platform}`} onClick={() => removeItem(game.id)}><Icon name="trash" />Remove</button></div>
                <strong className="basket-item-price">{formatPrice(game.price, game.currency)}</strong>
              </article>
            ))}
          </section>
          <aside className="basket-summary" aria-labelledby="summary-title">
            <p className="eyebrow">THE LINEUP</p><h2 id="summary-title">Order summary</h2>
            <dl className="summary-lines"><div><dt>Games ({items.length})</dt><dd>{formatPrice(totalCents / 100, "EUR")}</dd></div><div><dt>Format</dt><dd>Digital</dd></div><div className="summary-total"><dt>Total</dt><dd>{formatPrice(totalCents / 100, "EUR")}</dd></div></dl>
            <Link className="button button-primary summary-action" href="/checkout">Continue to demo checkout</Link>
            <p className="summary-note">A preview of the shopping experience. No payment or game delivery takes place.</p>
          </aside>
        </div>
      )}
    </main>
  );
}
