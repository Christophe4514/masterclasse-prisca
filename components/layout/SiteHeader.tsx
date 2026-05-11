import Link from "next/link";

const links = [
  { href: "#autrice", label: "Autrice" },
  { href: "#masterclass", label: "Programme" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-porcelain/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="font-serif text-lg tracking-tight text-ink">
          Prisca Makila
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-ink/70 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/checkout"
            className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-wide text-porcelain sm:text-sm"
          >
            Commander
          </Link>
        </div>
      </div>
    </header>
  );
}
