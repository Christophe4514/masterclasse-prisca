import { FileText } from "lucide-react";
import { PRODUCT, SITE, SUPPORT } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { formatInvoiceDateFr, type InvoicePayload } from "@/lib/invoice";

export function InvoiceReceipt({ payload }: { payload: InvoicePayload }) {
  return (
    <Card id="facture" className="mt-10 overflow-hidden border-ink/10 shadow-card">
      <div className="bg-gradient-to-r from-plum to-plum/90 px-7 py-5 text-cream sm:px-10">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/80">Facture</p>
            <h2 className="mt-1 font-serif text-2xl tracking-tight sm:text-3xl">Reçu de commande</h2>
            <p className="mt-1 text-xs text-cream/75">
              {SITE.name} · {PRODUCT.name}
            </p>
          </div>
          <dl className="mt-4 text-right text-xs leading-relaxed text-cream/85 sm:mt-0 sm:text-sm">
            <div>
              <dt className="text-cream/55">Réf.</dt>
              <dd className="font-mono text-[11px] text-cream">{payload.orderId}</dd>
            </div>
            <div className="mt-2">
              <dt className="text-cream/55">Date</dt>
              <dd>{formatInvoiceDateFr(payload.orderDate)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <CardContent className="space-y-8 p-7 sm:p-10">
        <div className="grid gap-8 border-b border-ink/10 pb-8 sm:grid-cols-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-plum">Émetteur</p>
            <p className="mt-2 font-semibold text-ink">{SITE.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink/65">{PRODUCT.shortDescription}</p>
            <p className="mt-2 text-sm text-ink/55">{SITE.url}</p>
            <p className="mt-1 text-sm text-ink/55">{SUPPORT.email}</p>
            <p className="mt-1 text-sm text-ink/55">{SUPPORT.phone}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-plum">Facturation</p>
            <p className="mt-2 font-semibold text-ink">{payload.customerName}</p>
            <p className="mt-1 text-sm text-ink/65">{payload.customerEmail}</p>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-plum">Détail</p>
          <div className="mt-3 overflow-hidden rounded-xl border border-ink/10">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 bg-cream/40 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-ink/55 sm:px-5 sm:text-xs">
              <span>Désignation</span>
              <span className="text-right">Qté</span>
              <span className="hidden text-right sm:block">Prix unit.</span>
              <span className="text-right">Montant</span>
            </div>
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 border-t border-ink/10 px-4 py-4 text-sm sm:px-5">
              <span className="leading-snug text-ink">{PRODUCT.name}</span>
              <span className="text-right tabular-nums text-ink/80">1</span>
              <span className="hidden text-right tabular-nums text-ink/80 sm:block">{payload.amountLabel}</span>
              <span className="text-right font-semibold tabular-nums text-ink">{payload.amountLabel}</span>
            </div>
            <div className="flex justify-end border-t border-ink/10 bg-cream/25 px-4 py-3 sm:px-5">
              <div className="flex min-w-[12rem] items-baseline justify-between gap-8 text-sm">
                <span className="font-semibold text-ink">Total TTC</span>
                <span className="font-serif text-lg font-semibold text-plum">
                  {payload.amountLabel}{" "}
                  <span className="text-xs font-sans font-medium text-ink/50">({payload.currency})</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-ink/8 bg-cream/20 px-4 py-3 text-xs leading-relaxed text-ink/60 sm:px-5">
          <p className="flex items-start gap-2">
            <FileText className="mt-0.5 size-4 shrink-0 text-plum" aria-hidden />
            <span>
              <strong className="text-ink/75">Paiement :</strong>{" "}
              <span className="font-mono text-[11px] text-ink/70">{payload.paymentReference}</span>
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
