"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/products";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

function isValidMoroccanPhone(value: string) {
  const digits = value.replace(/[\s.-]/g, "");
  return /^(0|\+212|00212)[5-7]\d{8}$/.test(digits);
}

const tiers = [
  { qty: 1, discount: 0 },
  { qty: 2, discount: 0.05 },
  { qty: 3, discount: 0.1 },
];

export function OrderForm({
  copy,
  locale,
  unitPrice,
  productName,
  productSlug,
}: {
  copy: Dictionary["productDetail"]["orderForm"];
  locale: Locale;
  unitPrice: number;
  productName: string;
  productSlug: string;
}) {
  const router = useRouter();
  const formId = useId();
  const [tierIndex, setTierIndex] = useState(0);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  const selectedTier = tiers[tierIndex];
  const total = Math.round(unitPrice * selectedTier.qty * (1 - selectedTier.discount));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();

    const nextErrors: typeof errors = {};
    if (!name) nextErrors.name = copy.errorRequired;
    if (!phone) nextErrors.phone = copy.errorRequired;
    else if (!isValidMoroccanPhone(phone)) nextErrors.phone = copy.errorPhone;
    if (!address) nextErrors.address = copy.errorRequired;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          productSlug,
          quantity: selectedTier.qty,
          unitPrice,
          totalPrice: total,
          name,
          phone,
          address,
          locale,
        }),
      });

      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      if (data?.success === false) throw new Error(data?.error ?? "Request failed");

      const query = new URLSearchParams({ name, product: productName, phone });
      router.push(`/${locale}/merci?${query.toString()}`);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5 border-b border-primary/15 pb-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ShoppingBag className="size-4.5" strokeWidth={1.75} />
        </span>
        <p className="font-heading text-lg font-semibold text-foreground">
          {copy.title}
        </p>
      </div>

      <div>
        <span className="text-sm font-medium text-foreground">
          {copy.chooseFormat}
        </span>
        <div className="mt-2 grid grid-cols-3 gap-2.5">
          {tiers.map((tier, index) => {
            const isActive = index === tierIndex;
            const tierTotal = Math.round(
              unitPrice * tier.qty * (1 - tier.discount)
            );
            return (
              <button
                key={tier.qty}
                type="button"
                onClick={() => setTierIndex(index)}
                aria-pressed={isActive}
                className={cn(
                  "relative flex flex-col items-center gap-1 rounded-xl border px-2 py-3 transition-colors",
                  isActive
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-foreground/30"
                )}
              >
                {tier.discount > 0 && (
                  <span className="absolute -top-2.5 rounded-full bg-sage px-2 py-0.5 text-[0.65rem] font-semibold text-sage-foreground">
                    -{tier.discount * 100}%
                  </span>
                )}
                <span className="font-heading text-lg font-semibold text-foreground">
                  ×{tier.qty}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {formatPrice(tierTotal, locale)}
                </span>
                {tier.qty > 1 && (
                  <span className="text-[0.7rem] text-muted-foreground">
                    {copy.perUnit.replace(
                      "{price}",
                      formatPrice(Math.round(tierTotal / tier.qty), locale)
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor={`${formId}-name`}
          className="text-sm font-medium text-foreground"
        >
          {copy.nameLabel}
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          placeholder={copy.namePlaceholder}
          aria-invalid={!!errors.name}
          className="mt-1.5 h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-destructive">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor={`${formId}-phone`}
          className="text-sm font-medium text-foreground"
        >
          {copy.phoneLabel}
        </label>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          placeholder={copy.phonePlaceholder}
          aria-invalid={!!errors.phone}
          className="mt-1.5 h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
        )}
      </div>

      <div>
        <label
          htmlFor={`${formId}-address`}
          className="text-sm font-medium text-foreground"
        >
          {copy.addressLabel}
        </label>
        <textarea
          id={`${formId}-address`}
          name="address"
          rows={3}
          placeholder={copy.addressPlaceholder}
          aria-invalid={!!errors.address}
          className="mt-1.5 w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
        />
        {errors.address && (
          <p className="mt-1 text-xs text-destructive">{errors.address}</p>
        )}
      </div>

      <div className="flex items-center justify-between rounded-lg bg-muted/60 px-4 py-3">
        <span className="text-sm font-medium text-muted-foreground">
          {copy.total}
        </span>
        <span className="font-heading text-xl font-semibold text-foreground">
          {formatPrice(total, locale)}
        </span>
      </div>

      <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="mt-1 h-13 w-full text-base font-semibold shadow-md shadow-primary/20"
        >
          {status === "submitting" ? copy.submitting : copy.submit}
        </Button>
      </motion.div>

      {status === "error" && (
        <p role="alert" className="text-center text-xs font-medium text-destructive">
          {copy.submitError}
        </p>
      )}

      <p className="text-center text-xs font-medium text-sage">
        {copy.codNote}
      </p>
      <p className="text-center text-[0.7rem] leading-relaxed text-muted-foreground">
        {copy.secureNote}
      </p>
    </form>
  );
}
