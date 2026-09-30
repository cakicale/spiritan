"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import type { Game } from "@/lib/mock-games";
import { createBrowserStore } from "@/lib/browser-store";
import { CART_KEY, ORDER_KEY, resolveCart, cartTotalCents, parseDemoOrder, canAddToCart, type CartGame, type DemoOrder } from "@/lib/cart";

const cartStore = createBrowserStore(CART_KEY, "localStorage", "[]");
const orderStore = createBrowserStore(ORDER_KEY, "sessionStorage", "null");
const subscribeHydration = () => () => {};
const clientHydration = () => true;
const serverHydration = () => false;

type CartContextValue = {
  items: CartGame[];
  totalCents: number;
  ready: boolean;
  order: DemoOrder | null;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  placeDemoOrder: (email: string) => DemoOrder | null;
};
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ products, children }: { products: Game[]; children: ReactNode }) {
  const snapshot = useSyncExternalStore(cartStore.subscribe, cartStore.read, cartStore.serverSnapshot);
  const orderSnapshot = useSyncExternalStore(orderStore.subscribe, orderStore.read, orderStore.serverSnapshot);
  const ready = useSyncExternalStore(subscribeHydration, clientHydration, serverHydration);
  const items = resolveCart(snapshot, products);
  const order = parseDemoOrder({ snapshot: orderSnapshot, products });

  function addItem(id: string) {
    const game = products.find((item) => item.id === id);
    if (!game || !canAddToCart(game)) return;
    const current = resolveCart(cartStore.read(), products);
    if (current.some((item) => item.id === id)) return;
    cartStore.write(JSON.stringify([...current.map((item) => item.id), id]));
  }

  function removeItem(id: string) {
    cartStore.write(JSON.stringify(resolveCart(cartStore.read(), products).filter((item) => item.id !== id).map((item) => item.id)));
  }

  function placeDemoOrder(email: string) {
    const address = email.trim();
    const current = resolveCart(cartStore.read(), products);
    if (!current.length || address.length > 254 || !/^[^\s@]+@[^\s@]+$/.test(address)) return null;
    const receipt: DemoOrder = {
      id: `DEMO-${window.crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      email: address,
      createdAt: new Date().toISOString(),
      items: current,
      totalCents: cartTotalCents(current),
    };
    orderStore.write(JSON.stringify({ id: receipt.id, email: receipt.email, createdAt: receipt.createdAt, itemIds: current.map((item) => item.id) }));
    cartStore.write("[]");
    return receipt;
  }

  return (
    <CartContext.Provider value={{ items, totalCents: cartTotalCents(items), ready, order, addItem, removeItem, placeDemoOrder }}>
      {children}
      <p className="sr-only" role="status">{ready ? `${items.length} ${items.length === 1 ? "game" : "games"} in your cart.` : ""}</p>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
