"use client";
import Link from "next/link";
import { useCart } from "./cart-provider";
import { Icon } from "./icon";

export function CartLink() {
  const { items, ready } = useCart();
  const count = ready ? items.length : 0;
  return <Link className="cart-link" href="/cart" aria-label={`Cart, ${count} ${count === 1 ? "game" : "games"}`}><Icon name="cart" /><span>Cart</span><span className="cart-count" aria-hidden="true">{count}</span></Link>;
}
