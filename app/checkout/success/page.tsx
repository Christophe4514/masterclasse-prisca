import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SUPPORT } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, MessageCircle, Sparkles } from "lucide-react";

export const metadata = {
  title: "Merci pour votre confiance",
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
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="gold" className="mx-auto normal-case">
            <Sparkles className="size-3.5" />
            Confirmation de commande
          </Badge>
          <h1 className="mt-5 font-serif text-3xl tracking-tight text-ink sm:text-4xl">Félicitations</h1>
          <p className="mt-4 text-sm leading-relaxed text-ink/65 sm:text-base">
            Merci pour votre confiance. Votre accès est en cours d’activation — vous recevrez aussi un e-mail récapitulatif.
          </p>
        </div>

        <Card className="mt-10 border-ink/10 shadow-card">
          <CardContent className="p-7 sm:p-10">
            <div className="mx-auto max-w-sm">
              <div className="mx-auto flex size-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-plum/12 via-cream to-terracotta/12 ring-1 ring-ink/10">
                <svg viewBox="0 0 120 120" className="h-20 w-20" aria-hidden>
                  <circle cx="60" cy="60" r="44" fill="rgba(92,61,79,0.12)" />
                  <path
                    d="M38 62l14 14 30-34"
                    fill="none"
                    stroke="#5c3d4f"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {orderId ? (
              <p className="mt-8 text-center text-sm text-ink/60">
                Référence commande :{" "}
                <span className="rounded-lg bg-cream px-2 py-1 font-mono text-xs text-ink">{orderId}</span>
              </p>
            ) : null}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <ButtonLink href={SUPPORT.downloadUrl} variant="accent" size="lg" className="w-full">
                <Download className="size-4" />
                Télécharger / accéder
              </ButtonLink>
              <a
                href={SUPPORT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-ink/12 bg-white text-sm font-semibold text-ink transition hover:border-plum/25 hover:bg-cream/40"
              >
                <MessageCircle className="size-4 text-plum" />
                Support WhatsApp
              </a>
            </div>

            <p className="mt-8 text-center text-xs leading-relaxed text-ink/50">
              Si votre paiement est géré par un prestataire externe, la confirmation finale peut arriver quelques secondes
              après le webhook <code className="font-mono text-[11px]">/api/payment-webhook</code>.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/" variant="secondary" size="md">
                Retour à l’accueil
              </ButtonLink>
              <ButtonLink href="/checkout" variant="ghost" size="md" className="border border-ink/10">
                Nouvelle commande
              </ButtonLink>
            </div>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </>
  );
}
