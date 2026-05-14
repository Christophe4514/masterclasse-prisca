import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { InvoiceReceipt } from "@/components/checkout/InvoiceReceipt";
import { SUPPORT } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { prisma } from "@/lib/prisma";
import { invoicePayloadFromPaidOrder } from "@/lib/invoice";
import { BookOpen, Download, MessageCircle, Sparkles } from "lucide-react";

export const metadata = {
  title: "Merci pour votre confiance",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  const order =
    orderId?.trim() != null && orderId.trim() !== ""
      ? await prisma.order.findUnique({
          where: { id: orderId.trim() },
          include: { delivery: true },
        })
      : null;

  const paid = order?.paymentStatus === "PAID";
  const invoicePayload = paid && order ? invoicePayloadFromPaidOrder(order) : null;
  const contentAccessUrl =
    (order?.delivery?.downloadLink?.trim() && order.delivery.downloadLink.trim().length > 0
      ? order.delivery.downloadLink
      : null) ?? SUPPORT.downloadUrl;

  const invoiceDownloadHref =
    orderId?.trim() && paid
      ? `/api/orders/${encodeURIComponent(orderId.trim())}/invoice?download=1`
      : null;

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
            {paid ? (
              <>
                Merci pour votre confiance. Votre paiement est confirmé : votre facture figure juste ci-dessous. Vous
                pouvez la télécharger au format PDF ; un e-mail récapitulatif vous parviendra également, suivi d’un
                message pour l’accès à votre contenu numérique.
              </>
            ) : order && orderId ? (
              <>
                Merci pour votre confiance. Si le paiement vient d’être finalisé, la confirmation peut prendre quelques
                instants : actualisez cette page dans un moment pour voir votre facture et vos liens d’accès. Vous
                recevrez aussi un e-mail avec votre facture et l’accès numérique.
              </>
            ) : (
              <>
                Merci pour votre confiance. Votre accès est en cours d’activation — vous recevrez un e-mail avec votre
                facture et un second pour l’accès numérique.
              </>
            )}
          </p>
        </div>

        {invoicePayload ? <InvoiceReceipt payload={invoicePayload} /> : null}

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
              {invoiceDownloadHref ? (
                <a
                  href={invoiceDownloadHref}
                  className={cn(
                    "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-tight transition select-none",
                    "bg-gradient-to-r from-terracotta to-plum text-white shadow-soft hover:opacity-[0.96] active:scale-[0.99]",
                  )}
                >
                  <Download className="size-4 shrink-0" aria-hidden />
                  Télécharger la facture
                </a>
              ) : null}
              <ButtonLink
                href={contentAccessUrl}
                variant={invoiceDownloadHref ? "secondary" : "accent"}
                size="lg"
                className={cn("w-full", invoiceDownloadHref ? "" : "sm:col-span-2")}
              >
                <BookOpen className="size-4 shrink-0" aria-hidden />
                Accéder au contenu
              </ButtonLink>
            </div>

            <div className="mt-3">
              <a
                href={SUPPORT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-ink/12 bg-white text-sm font-semibold text-ink transition hover:border-plum/25 hover:bg-cream/40"
              >
                <MessageCircle className="size-4 text-plum" aria-hidden />
                Support WhatsApp
              </a>
            </div>

            <p className="mt-8 text-center text-xs leading-relaxed text-ink/50">
              Si votre paiement est géré par un prestataire externe, la confirmation finale peut arriver quelques
              secondes après le webhook <code className="font-mono text-[11px]">/api/payment-webhook</code> ou après le
              retour MaishaPay.
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
