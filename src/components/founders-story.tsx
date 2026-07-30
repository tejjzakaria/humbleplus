import Image from "next/image";
import type { Dictionary } from "@/i18n/get-dictionary";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function FoundersStory({ dict }: { dict: Dictionary }) {
  const { story } = dict;

  return (
    <section id="histoire" className="py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn className="relative order-first mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-border bg-secondary lg:max-w-none">
            <Image
              src="/content/story-lifestyle.jpg"
              alt={story.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </FadeIn>

          <FadeIn delay={0.15}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
              <span className="size-1.5 rounded-full bg-sage" aria-hidden />
              {story.eyebrow}
            </span>
            <h2 className="mt-4 text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              {story.title}
            </h2>

            <div className="mt-5 flex flex-col gap-4">
              {story.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <StaggerGroup className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {story.stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <p className="font-heading text-2xl font-semibold text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
