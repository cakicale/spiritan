import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartProvider } from "@/components/cart-provider";
import { getProducts } from "@/lib/products";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteOrigin = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin ? `https://${siteOrigin}` : "http://localhost:3000"),
  robots: { index: false, follow: false },
  title: "Spiritan | Your next adventure starts here",
  description:
    "Discover Spiritan, an upcoming digital games store for Serbia and the Balkans. Explore a first look at our digital games catalogue.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const products = await getProducts();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main">Skip to content</a>
        <div className="preview-bar"><span className="preview-label">PRE-LAUNCH</span>A first look at Spiritan. Demo catalogue, no purchases yet.</div>
        <CartProvider products={products}>
        <SiteHeader />
        {children}
        <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
