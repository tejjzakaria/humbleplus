"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "@/lib/meta-pixel";

export function PurchasePixel({
  contentId,
  contentName,
  value,
}: {
  contentId: string;
  contentName: string;
  value: number;
}) {
  useEffect(() => {
    trackMetaEvent("Purchase", {
      content_ids: [contentId],
      content_name: contentName,
      content_type: "product",
      currency: "MAD",
      value,
    });
    // Fires once per thank-you page load; the order itself is only ever
    // created once server-side, so a duplicate pixel fire here (e.g. a
    // refresh) doesn't double-write the order but will double-count ad spend.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentId]);

  return null;
}
