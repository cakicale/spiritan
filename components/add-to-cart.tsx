"use client";
import Link from "next/link";
import { useCart } from "./cart-provider";
import { Icon } from "./icon";

export function AddToCart({ productId, available }: { productId: string; available: boolean }) {
  const { items, addItem, ready } = useCart();
  if (!available) return <button className="button product-purchase-button" type="button" disabled>Coming soon</button>;
  if (ready && items.some((item) => item.id === productId)) return <Link className="button button-primary add-to-cart" href="/cart"><Icon name="check" />In cart · View cart</Link>;
  return <button className="button button-primary add-to-cart" type="button" disabled={!ready} onClick={() => addItem(productId)}><Icon name="cart" />Add to cart</button>;
}
