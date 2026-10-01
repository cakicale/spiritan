"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [{ href: "/", label: "Discover" }, { href: "/games", label: "Games" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }];

export function MainNav() {
  const pathname = usePathname();
  return <nav className="main-nav" aria-label="Main navigation">{links.map((link) => {
    const active = link.href === "/" ? pathname === "/" : pathname === link.href || pathname.startsWith(`${link.href}/`);
    return <Link key={link.href} className={active ? "nav-active" : undefined} href={link.href} aria-current={active ? "page" : undefined}>{link.label}</Link>;
  })}</nav>;
}
