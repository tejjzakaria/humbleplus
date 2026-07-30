"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import { formatPrice, type Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

export function ProductCard({
  product,
  locale,
  base,
  ctaLabel,
  subscribeLabel,
}: {
  product: Product;
  locale: Locale;
  base: string;
  ctaLabel: string;
  subscribeLabel: string;
}) {
  return (
    <MotionLink
      href={`${base}/produits/${product.slug}`}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div className="relative p-3 pb-0">
        {product.badge && (
          <Badge className="absolute start-5 top-5 z-10">
            {product.badge[locale]}
          </Badge>
        )}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
          <Image
            src={product.images[0]}
            alt={product.imageAlt[locale]}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground">
            {product.name[locale]}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.tagline[locale]}
          </p>
        </div>

        <div className="mt-auto flex items-baseline gap-2">
          <span className="font-heading text-xl font-semibold text-foreground">
            {formatPrice(product.price, locale)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice, locale)}
            </span>
          )}
        </div>

        <p className="text-xs font-medium text-sage">{subscribeLabel}</p>

        <span
          aria-hidden
          className={cn(buttonVariants(), "mt-1 h-11 w-full")}
        >
          {ctaLabel}
        </span>
      </div>
    </MotionLink>
  );
}
