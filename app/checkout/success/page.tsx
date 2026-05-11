import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata = {
  title: "Commande enregistrée",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <div className="rounded-[1.75rem] border border-ink/8 bg-white p-8 text-center shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">Merci</p>
          <h1 className="mt-3 font-serif text-3xl text-ink">Votre commande est enregistrée</h1>
          {orderId ? (
            <p className="mt-4 text-sm text-ink/65">
              Référence : <span className="font-mono text-ink">{orderId}</span>
            </p>
          ) : null}
          <p className="mt-6 text-sm leading-relaxed text-ink/70">
            Lorsque votre prestataire de paiement appellera le webhook{" "}
            <code className="rounded bg-sand px-1 py-0.5 text-xs">/api/payment-webhook</code>, le statut passera à
            payé et les e-mails de confirmation / livraison seront envoyés (Resend).
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-sand"
            >
              Retour à l’accueil
            </Link>
            <Link
              href="/checkout"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-porcelain hover:bg-ink/90"
            >
              Nouvelle commande
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
