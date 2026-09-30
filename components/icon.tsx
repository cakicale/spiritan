import type { ReactNode, SVGProps } from "react";
type IconName = "controller" | "monitor" | "download" | "globe" | "search" | "close" | "mail" | "cart" | "check" | "trash";
const paths: Record<IconName, ReactNode> = {
  cart: <><path d="M2 3h3l2.5 13H19l3-9H6" /><circle cx="9" cy="21" r="1" /><circle cx="18" cy="21" r="1" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  trash: <><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7" /></>,
  controller: <><path d="M7 7h10a4 4 0 0 1 4 3l1 7a2.5 2.5 0 0 1-4.3 2L15 16H9l-2.7 3A2.5 2.5 0 0 1 2 17l1-7a4 4 0 0 1 4-3Z" /><path d="M8 10v5M5.5 12.5h5M16 11h.01M18 14h.01" /></>,
  monitor: <><rect x="3" y="3" width="18" height="13" rx="2" /><path d="M8 21h8M12 16v5" /></>,
  download: <path d="M12 3v12m-4-4 4 4 4-4M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" />,
  globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
};
export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
