import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import Link from "next/link";

export const metadata = {
  title: "Connexion admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-porcelain px-4 py-16">
      <div className="mx-auto w-full max-w-md rounded-[1.75rem] border border-ink/8 bg-white p-8 shadow-lg shadow-ink/5">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">Administration</p>
        <h1 className="mt-2 text-center font-serif text-2xl text-ink">Espace commandes</h1>
        <p className="mt-2 text-center text-sm text-ink/60">Accès réservé — authentification par mot de passe.</p>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
        <p className="mt-8 text-center text-xs text-ink/45">
          <Link href="/" className="underline-offset-2 hover:underline">
            ← Retour au site
          </Link>
        </p>
      </div>
    </main>
  );
}
