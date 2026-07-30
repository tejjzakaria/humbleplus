import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { NavLinks } from "@/components/nav-links";
import { TapScale } from "@/components/motion/tap-scale";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

export function SiteHeader({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const base = `/${locale}`;

  const navItems = [
    { href: base, label: dict.nav.home },
    { href: `${base}/produits`, label: dict.nav.products },
    { href: `${base}/histoire`, label: dict.nav.story },
    { href: `${base}/contact`, label: dict.nav.contact },
    { href: `${base}/faq`, label: dict.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <MobileNav
            locale={locale}
            navItems={navItems}
            homeHref={base}
            menuLabel={dict.header.menu}
            ctaLabel={dict.header.cta}
            ctaHref={`${base}/produits`}
          />
          <Link href={base} className="flex items-center">
            <Image
              src="/logo.png"
              alt="Humble+"
              width={560}
              height={160}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </Link>
        </div>

        <NavLinks items={navItems} homeHref={base} className="hidden md:flex" />

        <div className="flex items-center gap-2 sm:gap-3">
          <TapScale className="hidden sm:inline-flex">
            <Button asChild size="lg" className="h-10 px-5 text-sm">
              <Link href={`${base}/produits`}>{dict.header.cta}</Link>
            </Button>
          </TapScale>
        </div>
      </div>
    </header>
  );
}
