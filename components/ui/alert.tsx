import { cn } from "@/lib/cn";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";

const tones = {
  success: {
    wrap: "border-emerald-200/80 bg-emerald-50 text-emerald-950",
    icon: CheckCircle2,
  },
  error: {
    wrap: "border-red-200/80 bg-red-50 text-red-950",
    icon: AlertCircle,
  },
  info: {
    wrap: "border-ink/10 bg-white text-ink",
    icon: Info,
  },
} as const;

export type AlertTone = keyof typeof tones;

export function Alert({
  tone = "info",
  title,
  children,
  className,
}: HTMLAttributes<HTMLDivElement> & {
  tone?: AlertTone;
  title?: string;
  children: ReactNode;
}) {
  const cfg = tones[tone];
  const Icon = cfg.icon;

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn("flex gap-3 rounded-2xl border p-4", cfg.wrap, className)}
    >
      <Icon className="mt-0.5 size-5 shrink-0 opacity-80" />
      <div className="min-w-0">
        {title ? <p className="text-sm font-semibold">{title}</p> : null}
        <div className={cn("text-sm leading-relaxed text-ink/75", title && "mt-1")}>{children}</div>
      </div>
    </div>
  );
}
