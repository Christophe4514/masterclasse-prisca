import { formatMoney } from "@/lib/format";
import { PRODUCT } from "@/lib/constants";

export type InvoicePayload = {
  customerName: string;
  customerEmail: string;
  orderId: string;
  amountLabel: string;
  currency: string;
  paymentReference: string;
  orderDate: Date;
};

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function formatInvoiceDateFr(d: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(d);
}

/** Date seule (en-tête de facture). */
export function formatInvoiceDateOnlyFr(d: Date): string {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(d);
}

export function invoicePayloadFromPaidOrder(order: {
  id: string;
  fullName: string;
  email: string;
  amount: number;
  currency: string;
  paymentReference: string | null;
  createdAt: Date;
}): InvoicePayload {
  return {
    customerName: order.fullName,
    customerEmail: order.email,
    orderId: order.id,
    amountLabel: formatMoney(order.amount, order.currency),
    currency: order.currency,
    paymentReference: order.paymentReference ?? "—",
    orderDate: order.createdAt,
  };
}

/** Tableau HTML (styles inline) — e-mail et document HTML autonome. */
export function invoiceTableHtmlEmail(payload: InvoicePayload): string {
  const dateStr = formatInvoiceDateFr(payload.orderDate);
  return `
    <table style="border-collapse:collapse;margin:1.25rem 0;font-size:14px;max-width:520px" cellpadding="8" cellspacing="0">
      <tr><td style="border:1px solid #ddd"><strong>Facture / commande</strong></td><td style="border:1px solid #ddd"><code>${escapeHtml(payload.orderId)}</code></td></tr>
      <tr><td style="border:1px solid #ddd"><strong>Date</strong></td><td style="border:1px solid #ddd">${escapeHtml(dateStr)}</td></tr>
      <tr><td style="border:1px solid #ddd"><strong>E-mail</strong></td><td style="border:1px solid #ddd">${escapeHtml(payload.customerEmail)}</td></tr>
      <tr><td style="border:1px solid #ddd"><strong>Produit</strong></td><td style="border:1px solid #ddd">${escapeHtml(PRODUCT.name)}</td></tr>
      <tr><td style="border:1px solid #ddd"><strong>Montant TTC</strong></td><td style="border:1px solid #ddd">${escapeHtml(payload.amountLabel)} (${escapeHtml(payload.currency)})</td></tr>
      <tr><td style="border:1px solid #ddd"><strong>Réf. paiement</strong></td><td style="border:1px solid #ddd"><code>${escapeHtml(payload.paymentReference)}</code></td></tr>
    </table>
  `;
}

