import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

interface Step {
  title: string;
  description: string;
}

export function UsageSteps({
  title,
  subtitle,
  steps,
}: {
  title: string;
  subtitle: string;
  steps: Step[];
}) {
  return (
    <section className="bg-muted/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-pretty text-base text-muted-foreground">
            {subtitle}
          </p>
        </FadeIn>

        <StaggerGroup className="relative mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          <div
            aria-hidden
            className="absolute inset-x-0 top-6 hidden border-t border-dashed border-border sm:block"
          />
          {steps.map((step, index) => (
            <StaggerItem
              key={step.title}
              className="relative flex flex-col items-center gap-3 text-center"
            >
              <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-primary-foreground">
                {index + 1}
              </span>
              <h3 className="font-heading text-lg font-semibold text-foreground">
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
