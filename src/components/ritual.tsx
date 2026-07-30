import type { Dictionary } from "@/i18n/get-dictionary";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function Ritual({ dict }: { dict: Dictionary }) {
  const { ritual } = dict;

  return (
    <section id="rituel" className="py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
            <span className="size-1.5 rounded-full bg-sage" aria-hidden />
            {ritual.eyebrow}
          </span>
          <h2 className="mt-4 text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            {ritual.title}
          </h2>
          <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
            {ritual.subtitle}
          </p>
        </FadeIn>

        <StaggerGroup className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          <div
            aria-hidden
            className="absolute inset-x-0 top-6 hidden border-t border-dashed border-border sm:block"
          />
          {ritual.steps.map((step, index) => (
            <StaggerItem
              key={step.title}
              className="relative flex flex-col items-center gap-4 text-center sm:items-center"
            >
              <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-primary-foreground">
                {index + 1}
              </span>
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="max-w-64 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
