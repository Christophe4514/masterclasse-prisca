"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AccordionItemData = {
  id: string;
  title: string;
  content: ReactNode;
};

export function Accordion({
  items,
  className,
  variant = "default",
}: {
  items: AccordionItemData[];
  className?: string;
  variant?: "default" | "minimal";
}) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-2xl border transition",
              variant === "default" && "border-ink/8 bg-white/90 shadow-sm",
              variant === "minimal" && "border-ink/8 bg-cream/35",
              isOpen && "border-plum/20 shadow-card",
            )}
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold tracking-tight text-ink sm:text-base">{item.title}</span>
              <ChevronDown
                className={cn("size-5 shrink-0 text-ink/40 transition", isOpen && "rotate-180 text-plum")}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="border-t border-ink/6"
                >
                  <div className="px-5 py-4 text-sm leading-relaxed text-ink/70">{item.content}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
