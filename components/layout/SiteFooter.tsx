import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/8 bg-sand/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-serif text-lg text-ink">Prisca Makila</p>
          <p className="mt-1 text-sm text-ink/60">Masterclass & livre numérique — tous droits réservés.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-ink/60">
          <Link href="/checkout" className="hover:text-ink">
            Checkout
          </Link>
          <Link href="/admin/login" className="hover:text-ink">
            Administration
          </Link>
        </div>
      </div>
    </footer>
  );
}
