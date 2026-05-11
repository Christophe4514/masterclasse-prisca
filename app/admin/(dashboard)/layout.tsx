import Link from "next/link";
import { logoutAdminAction } from "@/actions/admin-auth";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-porcelain">
      <div className="border-b border-ink/8 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/admin" className="font-serif text-lg text-ink">
            Commandes
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="text-ink/60 hover:text-ink">
              Site vitrine
            </Link>
            <form action={logoutAdminAction}>
              <button type="submit" className="rounded-full border border-ink/12 px-4 py-1.5 font-medium hover:bg-sand">
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
