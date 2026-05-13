import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
};

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { id, label, error, className, children, ...props },
  ref,
) {
  const selectId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      <label htmlFor={selectId} className="block text-sm font-medium text-ink/75">
        {label}
      </label>
      <select
        ref={ref}
        id={selectId}
        className={cn(
          "h-12 w-full appearance-none rounded-xl border border-ink/10 bg-white px-4 text-sm text-ink outline-none transition",
          "focus:border-plum/35 focus:ring-2 focus:ring-plum/15",
          error && "border-red-300 focus:border-red-400 focus:ring-red-200",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <p className="text-xs text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
});
