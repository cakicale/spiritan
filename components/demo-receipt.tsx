"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cart-provider";
import { CheckoutSteps } from "./checkout-steps";
import { Icon } from "./icon";
import { formatPrice } from "@/lib/products";

export function DemoReceipt() {
  const { order, ready } = useCart();
  return (
    <main id="main" className="container basket-page">
      <CheckoutSteps active={3} />
      {!ready ? <p className="basket-loading" role="status">Loading your confirmation…</p> : !order ? <div className="basket-empty"><Icon name="cart" width={44} height={44} /><h1>No demo order yet.</h1><p>Your confirmation appears here after you complete the demo checkout.</p><Link className="button button-primary" href="/cart">Go to cart</Link></div> : (
        <div className="receipt-layout">
          <div className="receipt-intro"><span className="receipt-check"><Icon name="check" width={30} height={30} /></span><p className="eyebrow">DEMO CHECKOUT COMPLETE</p><h1>A new adventure.<br /><span>One click closer.</span></h1><p>You&apos;ve tried the Spiritan purchase flow. No payment was taken, and no game keys or emails were sent.</p><Link className="button button-primary" href="/games">Keep exploring</Link></div>
          <section className="basket-summary receipt-summary" aria-labelledby="receipt-title"><p className="eyebrow">{order.id}</p><h2 id="receipt-title">Your demo order</h2><dl className="receipt-details"><div><dt>Test email</dt><dd>{order.email}</dd></div><div><dt>Date</dt><dd>{new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(order.createdAt))}</dd></div></dl><ul className="checkout-items">{order.items.map((game) => <li key={game.id}><Image src={game.image} alt="" width={64} height={40} /><div><strong>{game.title}</strong><span>{game.platform}</span></div><span>{formatPrice(game.price, game.currency)}</span></li>)}</ul><dl className="summary-lines"><div className="summary-total"><dt>Demo total</dt><dd>{formatPrice(order.totalCents / 100, "EUR")}</dd></div><div><dt>Amount charged</dt><dd>€0.00</dd></div></dl></section>
        </div>
      )}
    </main>
  );
}
