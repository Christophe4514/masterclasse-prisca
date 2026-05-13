import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { PRODUCT } from "@/lib/constants";
import { formatMoney } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Sparkles } from "lucide-react";

export const metadata = {
  title: "Paiement sécurisé",
  description: "Finalisez votre commande — Master Classe & livre numérique Prisca Makila.",
};

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-2xl text-center lg:max-w-none lg:text-left">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <Badge tone="plum" className="normal-case">
              <Sparkles className="size-3.5" />
              Checkout premium
            </Badge>
            <Badge tone="gold" className="normal-case">
              <ShieldCheck className="size-3.5" />
              Paiement sécurisé
            </Badge>
          </div>
          <h1 className="mt-5 font-serif text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Finalisez votre accès
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink/65 sm:text-base lg:max-w-xl">
            Quelques informations — puis redirection vers la confirmation. Vos données servent uniquement à la livraison
            et au support client.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Card className="border-ink/10">
              <CardContent className="p-6 sm:p-8">
                <CheckoutForm />
              </CardContent>
            </Card>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-28">
            <Card className="border-ink/10 bg-gradient-to-b from-white via-cream/35 to-porcelain shadow-card">
              <CardContent className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum">Résumé</p>
                <h2 className="mt-3 font-serif text-2xl text-ink">Votre commande</h2>

                <div className="mt-6 space-y-4 text-sm text-ink/70">
                  <div className="flex items-start justify-between gap-4">
                    <span className="leading-snug">{PRODUCT.name}</span>
                    <span className="shrink-0 font-semibold text-ink">
                      {formatMoney(PRODUCT.amountCents, PRODUCT.currency)}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-ink/50">
                    Taxes éventuelles selon votre pays au moment du paiement réel. Le montant catalogue est validé côté
                    serveur.
                  </p>
                </div>

                <div className="mt-8 rounded-2xl border border-ink/10 bg-white/70 px-4 py-4 text-xs text-ink/55">
                  Accès immédiat après paiement — livraison par e-mail sécurisé.
                </div>

                <div className="mt-8 border-t border-ink/10 pt-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-ink/60">Total</span>
                    <span className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
                      {formatMoney(PRODUCT.amountCents, PRODUCT.currency)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/"
                  className="mt-8 inline-flex text-sm font-semibold text-plum underline-offset-4 hover:underline"
                >
                  ← Retour au site
                </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
