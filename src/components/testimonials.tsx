import { Star, Languages } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

function initials(name: string) {
  return name.trim().slice(0, 1).toUpperCase();
}

export function Testimonials({ dict }: { dict: Dictionary }) {
  const { testimonials, reviewsUi } = dict;

  return (
    <section id="avis" className="bg-muted/50 py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
            <span className="size-1.5 rounded-full bg-sage" aria-hidden />
            {testimonials.eyebrow}
          </span>
          <h2 className="mt-4 text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            {testimonials.title}
          </h2>
          <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
            {testimonials.subtitle}
          </p>
          <div className="mt-4 flex items-center justify-center gap-1.5 text-sm font-medium text-foreground">
            <span className="flex items-center" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-brass text-brass"
                  strokeWidth={0}
                />
              ))}
            </span>
            {testimonials.ratingValue}
            <span className="font-normal text-muted-foreground">
              &middot; {testimonials.ratingCount}
            </span>
          </div>
        </FadeIn>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.items.map((item, index) => (
            <StaggerItem
              key={`${item.name}-${index}`}
              className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-6"
            >
              <div className="flex" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < item.rating
                        ? "size-4 fill-brass text-brass"
                        : "size-4 text-border"
                    }
                    strokeWidth={i < item.rating ? 0 : 1.5}
                  />
                ))}
              </div>

              <p className="flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{item.quote}&rdquo;
              </p>

              {item.translated && (
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[0.7rem] font-medium text-muted-foreground">
                  <Languages className="size-3" strokeWidth={1.75} />
                  {reviewsUi.translatedBadge}
                </span>
              )}

              <div className="flex items-center gap-3 border-t border-border pt-4">
                <Avatar>
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    {initials(item.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.location}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
