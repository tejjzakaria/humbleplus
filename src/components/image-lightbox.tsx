"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ImageLightbox({
  images,
  alt,
  index,
  onIndexChange,
  open,
  onOpenChange,
}: {
  images: string[];
  alt: string;
  index: number;
  onIndexChange: (index: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [zoomed, setZoomed] = useState(false);

  function goTo(nextIndex: number) {
    setZoomed(false);
    onIndexChange(((nextIndex % images.length) + images.length) % images.length);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setZoomed(false);
      }}
    >
      <DialogContent
        showCloseButton
        className="flex h-[92vh] w-[95vw] max-w-5xl flex-col gap-0 overflow-hidden bg-background p-0 sm:max-w-5xl"
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>

        <div
          className={cn(
            "relative flex-1 overflow-auto",
            zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          )}
          onClick={() => setZoomed((z) => !z)}
        >
          <div
            className={cn(
              "relative mx-auto h-full min-h-full w-full origin-center transition-transform duration-300",
              zoomed ? "scale-[1.9]" : "scale-100"
            )}
          >
            <Image
              src={images[index]}
              alt={alt}
              fill
              sizes="95vw"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {images.length > 1 && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Previous"
              onClick={(event) => {
                event.stopPropagation();
                goTo(index - 1);
              }}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full shadow-md"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label="Next"
              onClick={(event) => {
                event.stopPropagation();
                goTo(index + 1);
              }}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full shadow-md"
            >
              <ChevronRight className="size-5" />
            </Button>
          </>
        )}

        <div className="flex items-center justify-center gap-3 border-t border-border p-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={(event) => {
              event.stopPropagation();
              setZoomed((z) => !z);
            }}
          >
            {zoomed ? (
              <ZoomOut className="size-4" strokeWidth={1.75} />
            ) : (
              <ZoomIn className="size-4" strokeWidth={1.75} />
            )}
          </Button>
          {images.length > 1 && (
            <span className="text-xs text-muted-foreground">
              {index + 1} / {images.length}
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
