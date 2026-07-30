"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/get-dictionary";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm({ copy }: { copy: Dictionary["contact"] }) {
  const formId = useId();
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [result, setResult] = useState<{ name: string } | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const nextErrors: typeof errors = {};
    if (!name) nextErrors.name = copy.errorRequired;
    if (!email) nextErrors.email = copy.errorRequired;
    else if (!isValidEmail(email)) nextErrors.email = copy.errorEmail;
    if (!message) nextErrors.message = copy.errorRequired;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setResult({ name });
  }

  if (result) {
    return (
      <div role="status" className="rounded-2xl border border-sage/30 bg-sage/10 p-6">
        <p className="font-heading text-lg font-semibold text-foreground">
          {copy.formSuccessTitle.replace("{name}", result.name)}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {copy.formSuccessBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor={`${formId}-name`} className="text-sm font-medium text-foreground">
          {copy.formNameLabel}
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          placeholder={copy.formNamePlaceholder}
          aria-invalid={!!errors.name}
          className="mt-1.5 h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
        />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor={`${formId}-email`} className="text-sm font-medium text-foreground">
          {copy.formEmailLabel}
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          inputMode="email"
          placeholder={copy.formEmailPlaceholder}
          aria-invalid={!!errors.email}
          className="mt-1.5 h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
        />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="text-sm font-medium text-foreground">
          {copy.formMessageLabel}
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          placeholder={copy.formMessagePlaceholder}
          aria-invalid={!!errors.message}
          className="mt-1.5 w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
        />
        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
      </div>

      <Button type="submit" size="lg" className="mt-2 h-12 w-full text-base">
        {copy.formSubmit}
      </Button>
    </form>
  );
}
