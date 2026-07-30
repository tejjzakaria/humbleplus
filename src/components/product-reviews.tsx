import { Star, Languages } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

interface Review {
  name: string;
  location: string;
  rating: number;
  quote: string;
  translated?: boolean;
}

function initials(name: string) {
  return name.trim().slice(0, 1).toUpperCase();
}

export function ProductReviews({
  title,
  ratingValue,
  ratingCount,
  reviews,
  translatedBadge,
}: {
  title: string;
  ratingValue: string;
  ratingCount: string;
  reviews: Review[];
  translatedBadge: string;
}) {
  return (
    <section className="bg-muted/50 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            {title}
          </h2>
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
            {ratingValue}
            <span className="font-normal text-muted-foreground">
              &middot; {ratingCount}
            </span>
          </div>
        </FadeIn>

        <StaggerGroup className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {reviews.map((review, index) => (
            <StaggerItem
              key={`${review.name}-${index}`}
              className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-6"
            >
              <div className="flex" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < review.rating
                        ? "size-4 fill-brass text-brass"
                        : "size-4 text-border"
                    }
                    strokeWidth={i < review.rating ? 0 : 1.5}
                  />
                ))}
              </div>

              <p className="flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{review.quote}&rdquo;
              </p>

              {review.translated && (
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[0.7rem] font-medium text-muted-foreground">
                  <Languages className="size-3" strokeWidth={1.75} />
                  {translatedBadge}
                </span>
              )}

              <div className="flex items-center gap-3 border-t border-border pt-4">
                <Avatar>
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    {initials(review.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {review.location}
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
