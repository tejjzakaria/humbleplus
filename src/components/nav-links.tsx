"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem {
  href: string;
  label: string;
}

function isItemActive(pathname: string, href: string, isHome: boolean) {
  if (isHome) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({
  items,
  homeHref,
  className,
}: {
  items: NavItem[];
  homeHref: string;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("items-center gap-7", className)}>
      {items.map((item) => {
        const active = isItemActive(pathname, item.href, item.href === homeHref);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative inline-flex py-1 text-sm font-medium transition-colors duration-200",
              active
                ? "text-foreground"
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            {item.label}
            {active ? (
              <motion.span
                layoutId="nav-underline"
                aria-hidden
                className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : (
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full bg-primary/60 transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
