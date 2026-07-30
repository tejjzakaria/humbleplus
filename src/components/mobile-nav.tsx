"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

type NavItem = { href: string; label: string };

export function MobileNav({
  locale,
  navItems,
  homeHref,
  menuLabel,
  ctaLabel,
  ctaHref,
}: {
  locale: Locale;
  navItems: NavItem[];
  homeHref: string;
  menuLabel: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawerSide = locale === "ar" ? "right" : "left";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={menuLabel}
          className="md:hidden"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side={drawerSide} className="w-4/5 bg-background sm:max-w-xs">
        <SheetHeader>
          <SheetTitle asChild>
            <Image
              src="/logo.png"
              alt="Humble+"
              width={560}
              height={160}
              className="h-7 w-auto self-start"
            />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => {
            const active =
              item.href === homeHref
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg border-s-2 px-3 py-3 text-base font-medium transition-colors",
                  active
                    ? "border-s-primary bg-muted text-foreground"
                    : "border-s-transparent text-foreground/80 hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto p-4">
          <Button asChild size="lg" className="h-12 w-full text-base">
            <Link href={ctaHref} onClick={() => setOpen(false)}>
              {ctaLabel}
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
