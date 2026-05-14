"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

/** Visuel hero — fichier `public/images/couverture.png` */
export function AuthorHeroArt({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-ink/10 bg-gradient-to-br from-cream via-porcelain to-sand shadow-card",
        className,
      )}
    >
      <Image
        src="/images/couverture.png"
        alt="Couverture — Le prix du chemin, par Prisca Makila"
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
    </div>
  );
}
