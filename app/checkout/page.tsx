import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout-view";
export const metadata: Metadata = { title: "Demo checkout | Spiritan" };
export default function CheckoutPage() { return <CheckoutView />; }
