import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-ink text-cream shadow-soft hover:bg-ink/92 active:scale-[0.99]",
  secondary:
    "border border-ink/12 bg-white text-ink shadow-sm hover:border-plum/25 hover:bg-cream/50 active:scale-[0.99]",
  accent:
    "bg-gradient-to-r from-terracotta to-plum text-white shadow-soft hover:opacity-[0.96] active:scale-[0.99]",
  ghost: "text-ink/75 hover:bg-ink/[0.04] hover:text-ink",
  outlineGold: "border border-gold/35 bg-transparent text-ink hover:bg-gold/10",
} as const;

const sizes = {
  sm: "h-9 px-4 text-xs gap-1.5 rounded-full",
  md: "h-11 px-5 text-sm gap-2 rounded-full",
  lg: "h-12 px-7 text-sm gap-2 rounded-full",
  xl: "h-14 px-8 text-base gap-2 rounded-full",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center font-semibold tracking-tight transition select-none disabled:pointer-events-none disabled:opacity-45",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
});

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function ButtonLink({ className, variant = "primary", size = "md", href, ...props }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center font-semibold tracking-tight transition select-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
