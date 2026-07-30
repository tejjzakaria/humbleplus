"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function NewsletterForm({
  placeholder,
  cta,
  success,
}: {
  placeholder: string;
  cta: string;
  success: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p role="status" className="text-sm font-medium text-sage">
        {success}
      </p>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        {placeholder}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder={placeholder}
        className="h-11 flex-1 rounded-lg border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      <Button type="submit" className="h-11 px-6">
        {cta}
      </Button>
    </form>
  );
}
