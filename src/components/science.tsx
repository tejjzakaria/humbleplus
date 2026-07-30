import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function Science({ dict }: { dict: Dictionary }) {
  const { science, certifications } = dict;

  return (
    <section id="science" className="bg-muted/50 py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
              <span className="size-1.5 rounded-full bg-brass" aria-hidden />
              {science.eyebrow}
            </span>
            <h2 className="mt-4 text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              {science.title}
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
              {science.subtitle}
            </p>

            <StaggerGroup className="mt-8 flex flex-col gap-5">
              {science.points.map((point) => (
                <StaggerItem key={point.title} className="flex items-start gap-3">
                  <BadgeCheck
                    className="mt-0.5 size-5 shrink-0 text-sage"
                    strokeWidth={1.75}
                  />
                  <div>
                    <p className="font-medium text-foreground">
                      {point.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <p className="mt-8 max-w-xl text-xs leading-relaxed text-muted-foreground/80">
              {science.disclaimer}
            </p>

            <div className="mt-6 inline-flex max-w-xs items-center rounded-2xl border border-border bg-card p-3">
              <Image
                src="/labs.webp"
                alt={certifications.badgeAlt}
                width={640}
                height={101}
                className="h-auto w-full"
              />
            </div>
          </FadeIn>

          <FadeIn
            delay={0.15}
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-border bg-secondary lg:max-w-none"
          >
            <Image
              src="/content/science-ingredient.jpg"
              alt={science.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
