import { MessageCircle } from "lucide-react";
import { buildWhatsappLink } from "@/data/site-config";

export function WhatsappOrderButton({
  label,
  message,
}: {
  label: string;
  message: string;
}) {
  return (
    <a
      href={buildWhatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-sage bg-sage/10 text-base font-medium text-sage transition-colors hover:bg-sage/20"
    >
      <MessageCircle className="size-5" strokeWidth={1.75} />
      {label}
    </a>
  );
}
