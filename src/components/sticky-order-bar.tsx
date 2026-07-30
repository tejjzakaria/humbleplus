"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function StickyOrderBar({
  targetId,
  name,
  price,
  cta,
}: {
  targetId: string;
  name: string;
  price: string;
  cta: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-3 backdrop-blur supports-backdrop-filter:bg-card/80 md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground">{name}</p>
          <p className="font-heading text-lg font-semibold text-foreground">
            {price}
          </p>
        </div>
        <Button asChild size="lg" className="h-11 shrink-0 px-6 text-sm">
          <a href={`#${targetId}`}>{cta}</a>
        </Button>
      </div>
    </div>
  );
}
