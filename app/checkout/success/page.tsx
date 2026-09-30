import type { Metadata } from "next";
import { DemoReceipt } from "@/components/demo-receipt";
export const metadata: Metadata = { title: "Demo order complete | Spiritan" };
export default function SuccessPage() { return <DemoReceipt />; }
