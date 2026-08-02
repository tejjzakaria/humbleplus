import Link from "next/link";
import Image from "next/image";
import { Home, Search, Leaf } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function NotFoundContent({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const base = `/${locale}`;
  const copy = dict.notFound;

  return (
    <>
      <SiteHeader dict={dict} locale={locale} />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-background px-4 py-20 sm:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(60%_50%_at_50%_0%,var(--secondary)_0%,transparent_70%)]"
        />
        <div className="mx-auto flex max-w-lg flex-col items-center text-center">
          <div className="relative flex items-center justify-center">
            <span className="font-heading text-[7rem] font-semibold leading-none text-primary/15 sm:text-[9rem]">
              404
            </span>
            <div className="absolute flex size-16 items-center justify-center rounded-full border-2 border-primary/25 bg-card shadow-sm sm:size-20">
              <Leaf className="size-7 text-primary sm:size-9" strokeWidth={1.5} />
            </div>
          </div>

          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-primary">
            {copy.eyebrow}
          </p>
          <h1 className="mt-2 text-balance font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            {copy.title}
          </h1>
          <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
            {copy.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href={base}>
                <Home className="size-4" strokeWidth={1.75} />
                {copy.homeCta}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href={`${base}/produits`}>
                <Search className="size-4" strokeWidth={1.75} />
                {copy.productsCta}
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-2 opacity-70">
            <Image src="/logo.png" alt="" width={560} height={160} className="h-6 w-auto" />
          </div>
        </div>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </>
  );
}
