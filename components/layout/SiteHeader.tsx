"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/cn";

const links = [
  { href: "#autrice", label: "Autrice" },
  { href: "#transform", label: "Parcours" },
  { href: "#programme", label: "Programme" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-porcelain/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="font-serif text-lg tracking-tight text-ink">
          Prisca Makila
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink/65 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/checkout" variant="primary" size="md">
            Acheter
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink md:hidden"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-5" />
        </button>
      </div>

      <Modal open={open} title="Menu" description="Navigation rapide" onClose={() => setOpen(false)}>
        <nav className="space-y-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "block rounded-2xl border border-ink/8 bg-white px-4 py-3 text-sm font-semibold text-ink",
                "hover:border-plum/25 hover:bg-cream/40",
              )}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <ButtonLink href="/checkout" variant="accent" size="lg" className="mt-2 w-full" onClick={() => setOpen(false)}>
            Acheter maintenant
          </ButtonLink>
        </nav>
      </Modal>
    </header>
  );
}
