"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageLightbox } from "@/components/image-lightbox";

export function ProductGallery({
  images,
  alt,
  zoomHint,
}: {
  images: string[];
  alt: string;
  zoomHint: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label={zoomHint}
        className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-3xl border border-border bg-secondary"
      >
        <Image
          src={images[activeIndex]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-3 end-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow transition-opacity group-hover:opacity-100">
          <Expand className="size-3.5" strokeWidth={1.75} />
          {zoomHint}
        </span>
      </button>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={alt}
              aria-current={index === activeIndex ? "true" : undefined}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl border bg-secondary transition-colors",
                index === activeIndex
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border hover:border-foreground/30"
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <ImageLightbox
        images={images}
        alt={alt}
        index={activeIndex}
        onIndexChange={setActiveIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  );
}
