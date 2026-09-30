"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "./cart-provider";
import { EmptyCart } from "./cart-view";
import { CheckoutSteps } from "./checkout-steps";
import { Icon } from "./icon";
import { formatPrice } from "@/lib/products";

export function CheckoutView() {
  const { items, totalCents, ready, placeDemoOrder } = useCart();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current || !event.currentTarget.reportValidity()) return;
    submittingRef.current = true;
    const receipt = placeDemoOrder(email);
    if (!receipt) {
      submittingRef.current = false;
      setError("Check your email address and make sure your cart contains a game.");
      return;
    }
    setSubmitting(true);
    router.push("/checkout/success");
  }

  return (
    <main id="main" className="container basket-page">
      <CheckoutSteps active={2} />
      <div className="basket-heading"><div><p className="eyebrow">ONE LAST STEP</p><h1>Make it yours.</h1></div><Link className="text-link" href="/cart">Back to cart</Link></div>
      {!ready ? <p className="basket-loading" role="status">Loading your cart…</p> : submitting ? <p className="basket-loading" role="status">Opening your demo confirmation…</p> : !items.length ? <EmptyCart checkout /> : (
        <form className="basket-layout" onSubmit={submit}>
          <div className="checkout-details">
            <section className="checkout-section" aria-labelledby="email-title"><span className="checkout-section-number">01</span><h2 id="email-title">Your email</h2><p>Use a test email for this preview. Nothing will be sent.</p><label className="checkout-label" htmlFor="checkout-email">Email address</label><input className="checkout-input" id="checkout-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="player@example.com" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} /><p className="checkout-field-note">In the live store, this is where your order details would go.</p></section>
            <section className="checkout-section" aria-labelledby="payment-title"><span className="checkout-section-number">02</span><h2 id="payment-title">Payment</h2><div className="demo-payment"><Icon name="check" /><div><strong>Demo mode</strong><p>No card details needed. No charge.</p></div><span>SIMULATED</span></div><p>This checkout lets you try the complete flow with illustrative products and prices.</p></section>
          </div>
          <aside className="basket-summary" aria-labelledby="checkout-summary-title">
            <p className="eyebrow">YOUR SELECTION</p><h2 id="checkout-summary-title">Order summary</h2>
            <ul className="checkout-items">{items.map((game) => <li key={game.id}><Image src={game.image} alt="" width={64} height={40} /><div><strong>{game.title}</strong><span>{game.platform}</span></div><span>{formatPrice(game.price, game.currency)}</span></li>)}</ul>
            <dl className="summary-lines"><div className="summary-total"><dt>Demo total</dt><dd>{formatPrice(totalCents / 100, "EUR")}</dd></div><div><dt>Amount charged</dt><dd>€0.00</dd></div></dl>
            {error && <p className="checkout-error" role="alert">{error}</p>}
            <button className="button button-primary summary-action" type="submit" disabled={submitting}>Place demo order</button>
            <p className="summary-note">No payment is processed. No game keys or emails are sent.</p>
          </aside>
        </form>
      )}
    </main>
  );
}
