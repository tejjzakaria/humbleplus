"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimate, stagger, type Transition } from "framer-motion";
import { Star, Users, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

// Declarative `animate`/`whileInView` prop-diffing was unreliable in this
// app's exact React/framer-motion combo, so the hero reveal is driven
// imperatively instead — a more robust code path that sidesteps that issue.
export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const base = `/${locale}`;
  const { hero } = dict;
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "[data-reveal]",
      { opacity: 1, y: 0 },
      { duration: 0.5, ease: easeOut, delay: stagger(0.1) }
    );
    animate(
      "[data-reveal-image]",
      { opacity: 1, scale: 1 },
      { duration: 0.8, ease: easeOut }
    );
    animate(
      "[data-reveal-card]",
      { opacity: 1, scale: 1, y: 0 },
      { type: "spring", stiffness: 260, damping: 20, delay: 0.6 }
    );
  }, [animate]);

  return (
    <section ref={scope} id="accueil" className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(60%_50%_at_50%_0%,var(--secondary)_0%,transparent_70%)]"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="flex flex-col items-start gap-6">
          <span
            data-reveal
            style={{ opacity: 0, transform: "translateY(20px)" }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm"
          >
            <span className="size-1.5 rounded-full bg-sage" aria-hidden />
            {hero.eyebrow}
          </span>

          <h1
            data-reveal
            style={{ opacity: 0, transform: "translateY(20px)" }}
            className="text-balance font-heading text-4xl font-semibold leading-[1.15] text-foreground sm:text-5xl md:text-6xl"
          >
            {hero.title}
          </h1>

          <p
            data-reveal
            style={{ opacity: 0, transform: "translateY(20px)" }}
            className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {hero.subtitle}
          </p>

          <div
            data-reveal
            style={{ opacity: 0, transform: "translateY(20px)" }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" className="h-12 w-full px-8 text-base sm:w-auto">
                <Link href={`${base}#produits`}>{hero.ctaPrimary}</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 w-full px-8 text-base sm:w-auto"
              >
                <Link href={`${base}/histoire`}>{hero.ctaSecondary}</Link>
              </Button>
            </motion.div>
          </div>

          <div
            data-reveal
            style={{ opacity: 0, transform: "translateY(20px)" }}
            className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6"
          >
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <span className="flex items-center" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-brass text-brass"
                    strokeWidth={0}
                  />
                ))}
              </span>
              {hero.trust.ratingValue}
              <span className="font-normal text-muted-foreground">
                &middot; {hero.trust.ratingCount}
              </span>
            </div>
          </div>

          <div
            data-reveal
            style={{ opacity: 0, transform: "translateY(20px)" }}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-4 text-sage" strokeWidth={1.75} />
              {hero.trust.customers}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-sage" strokeWidth={1.75} />
              {hero.trust.clinical}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-sage" strokeWidth={1.75} />
              {hero.trust.madeIn}
            </span>
          </div>
        </div>

        <div className="relative">
          <div
            data-reveal-image
            style={{ opacity: 0, transform: "scale(1.04)" }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-border bg-secondary lg:max-w-none"
          >
            <Image
              src="/content/hero-lifestyle.jpg"
              alt={hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div
            data-reveal-card
            style={{ opacity: 0, transform: "scale(0.85) translateY(12px)" }}
            aria-hidden
            className="absolute -bottom-6 start-4 hidden rounded-2xl border border-border bg-card px-5 py-4 shadow-lg sm:block"
          >
            <p className="font-heading text-2xl font-semibold text-primary">
              {hero.trust.ratingValue}
            </p>
            <p className="text-xs text-muted-foreground">
              {hero.trust.ratingCount}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
