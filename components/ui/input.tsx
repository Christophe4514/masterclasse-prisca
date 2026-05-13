import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, hint, error, className, ...props },
  ref,
) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-medium text-ink/75">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "h-12 w-full rounded-xl border bg-white px-4 text-sm text-ink outline-none transition",
          "border-ink/10 placeholder:text-ink/35",
          "focus:border-plum/35 focus:ring-2 focus:ring-plum/15",
          error && "border-red-300 focus:border-red-400 focus:ring-red-200",
          className,
        )}
        {...props}
      />
      {hint && !error ? <p className="text-xs text-ink/45">{hint}</p> : null}
      {error ? (
        <p className="text-xs text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
});
