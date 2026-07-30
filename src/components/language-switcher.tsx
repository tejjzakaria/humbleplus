"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = {
  fr: "FR",
  ar: "ع",
};

export function LanguageSwitcher({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/");

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-full border border-border bg-card p-0.5",
        className
      )}
    >
      {locales.map((targetLocale) => {
        const nextSegments = [...segments];
        nextSegments[1] = targetLocale;
        const href = nextSegments.join("/") || "/";
        const isActive = targetLocale === locale;

        return (
          <Link
            key={targetLocale}
            href={href}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {labels[targetLocale]}
          </Link>
        );
      })}
    </div>
  );
}
