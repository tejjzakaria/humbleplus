"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "@/lib/meta-pixel";

export function ViewContentPixel({
  contentId,
  contentName,
  value,
}: {
  contentId: string;
  contentName: string;
  value: number;
}) {
  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_ids: [contentId],
      content_name: contentName,
      content_type: "product",
      currency: "MAD",
      value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId]);

  return null;
}
