import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

const styles = {
  default: "border border-ink/10 bg-cream/70 text-ink/80",
  gold: "border border-gold/25 bg-gold/10 text-gold-dark",
  plum: "border border-plum/15 bg-plum/8 text-plum",
  success: "border border-emerald-200 bg-emerald-50 text-emerald-900",
} as const;

export type BadgeTone = keyof typeof styles;

export function Badge({
  className,
  tone = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        styles[tone],
        className,
      )}
      {...props}
    />
  );
}
