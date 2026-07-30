import { Sparkles, Dumbbell, SunMedium } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

const icons = [Sparkles, Dumbbell, SunMedium];

export function Benefits({ dict }: { dict: Dictionary }) {
  const { benefits } = dict;

  return (
    <section id="bienfaits" className="bg-muted/50 py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
            <span className="size-1.5 rounded-full bg-sage" aria-hidden />
            {benefits.eyebrow}
          </span>
          <h2 className="mt-4 text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            {benefits.title}
          </h2>
          <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
            {benefits.subtitle}
          </p>
        </FadeIn>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {benefits.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <StaggerItem
                key={item.title}
                className="flex h-full flex-col items-start gap-4 rounded-3xl border border-border bg-card p-6 sm:p-8"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Icon className="size-6" strokeWidth={1.75} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
