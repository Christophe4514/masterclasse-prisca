import { cn } from "@/lib/cn";

/** Illustration élégante (placeholder) — remplacez par une photo via `next/image` si vous ajoutez `/public/images/prisca.jpg`. */
export function AuthorHeroArt({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-ink/10 bg-gradient-to-br from-cream via-porcelain to-sand shadow-card",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,113,95,0.22),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(92,61,79,0.18),transparent_50%)]" />
      <svg
        viewBox="0 0 400 500"
        className="relative h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5c3d4f" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c4715f" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="430" rx="150" ry="28" fill="url(#g1)" opacity="0.55" />
        <path
          d="M200 92c-58 0-104 46-104 104v86c0 44 28 82 68 96 10 3 20 5 31 5h10c11 0 21-2 31-5 40-14 68-52 68-96v-86c0-58-46-104-104-104z"
          fill="#161214"
          opacity="0.08"
        />
        <path
          d="M200 110c-48 0-86 38-86 86v92c0 38 24 70 58 82 8 3 17 4 28 4s20-1 28-4c34-12 58-44 58-82v-92c0-48-38-86-86-86z"
          fill="#faf6f0"
          stroke="#161214"
          strokeOpacity="0.12"
          strokeWidth="2"
        />
        <path
          d="M160 210c10-18 28-28 40-28s30 10 40 28"
          fill="none"
          stroke="#5c3d4f"
          strokeOpacity="0.35"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
      <div className="pointer-events-none absolute inset-x-6 bottom-6 rounded-2xl border border-white/50 bg-white/55 px-4 py-3 text-center text-xs font-semibold tracking-wide text-ink/70 backdrop-blur-md">
        Remplacez par votre portrait — dossier <code className="font-mono text-[11px]">/public/images</code>
      </div>
    </div>
  );
}
