"use client";

import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

export function Modal({
  open,
  title,
  description,
  children,
  onClose,
  className,
}: {
  open: boolean;
  title: string;
  description?: string;
  children?: React.ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const labelId = useId();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Fermer"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        className={cn(
          "relative w-full max-w-lg overflow-hidden rounded-[1.5rem] border border-ink/10 bg-porcelain shadow-2xl",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-ink/8 px-6 py-5">
          <div className="min-w-0">
            <h2 id={labelId} className="font-serif text-xl text-ink">
              {title}
            </h2>
            {description ? <p className="mt-1 text-sm text-ink/60">{description}</p> : null}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-10 w-10 rounded-full p-0"
            onClick={onClose}
            aria-label="Fermer la fenêtre"
          >
            <X className="size-5" />
          </Button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
