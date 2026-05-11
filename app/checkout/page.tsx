import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { PRODUCT } from "@/lib/constants";
import { formatMoney } from "@/lib/format";

export const metadata = {
  title: "Checkout",
  description: "Finalisez votre commande — masterclass & livre numérique Prisca Makila.",
};

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">Commande</p>
            <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Vos informations</h1>
            <p className="mt-3 max-w-md text-sm text-ink/65">
              Après validation, vous serez redirigé·e vers la confirmation. Branchez votre prestataire de paiement pour
              encaisser en production.
            </p>
            <div className="mt-8 rounded-[1.75rem] border border-ink/8 bg-white p-6 shadow-sm sm:p-8">
              <CheckoutForm />
            </div>
          </div>
          <aside className="rounded-[1.75rem] border border-ink/8 bg-gradient-to-b from-white to-sand/60 p-6 shadow-sm sm:p-8">
            <h2 className="font-serif text-xl text-ink">Résumé</h2>
            <div className="mt-6 space-y-4 text-sm text-ink/75">
              <div className="flex justify-between gap-4">
                <span>{PRODUCT.name}</span>
                <span className="font-semibold text-ink">
                  {formatMoney(PRODUCT.amountCents, PRODUCT.currency)}
                </span>
              </div>
              <p className="text-xs text-ink/55">
                TVA / taxes : selon votre pays au moment du paiement réel. Le montant affiché correspond au tarif catalogue
                serveur.
              </p>
            </div>
            <div className="mt-8 border-t border-ink/10 pt-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-ink/70">Total</span>
                <span className="font-serif text-3xl text-ink">
                  {formatMoney(PRODUCT.amountCents, PRODUCT.currency)}
                </span>
              </div>
            </div>
            <Link href="/" className="mt-8 inline-block text-sm font-medium text-gold-dark underline-offset-4 hover:underline">
              ← Retour au site
            </Link>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
