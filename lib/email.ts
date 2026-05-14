import { Resend } from "resend";
import { PRODUCT, SITE } from "@/lib/constants";
import { invoiceTableHtmlEmail, type InvoicePayload } from "@/lib/invoice";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const from = () =>
  process.env.RESEND_FROM_EMAIL ?? "Prisca Makila <onboarding@resend.dev>";

/**
 * Facture / reçu envoyé après paiement validé (même envoi que la trace comptable minimale).
 * Branchez votre domaine vérifié sur Resend pour la production.
 */
export async function sendInvoiceEmail(params: {
  to: string;
  customerName: string;
  customerEmail: string;
  orderId: string;
  amountLabel: string;
  currency: string;
  paymentReference: string;
  orderDate: Date;
}) {
  const resend = getResend();
  const payload: InvoicePayload = {
    customerName: params.customerName,
    customerEmail: params.customerEmail,
    orderId: params.orderId,
    amountLabel: params.amountLabel,
    currency: params.currency,
    paymentReference: params.paymentReference,
    orderDate: params.orderDate,
  };

  const html = `
    <p>Bonjour ${escapeHtml(params.customerName)},</p>
    <p>Veuillez trouver ci-dessous le reçu de votre achat auprès de <strong>${escapeHtml(SITE.name)}</strong>.</p>
    ${invoiceTableHtmlEmail(payload)}
    <p>Un second e-mail vous indiquera comment accéder à votre contenu numérique.</p>
    <p>— ${escapeHtml(SITE.name)}</p>
  `;

  if (!resend) {
    console.info("[email] RESEND_API_KEY manquant — facture non envoyée", params.to);
    return { ok: false as const, skipped: true };
  }

  const { data, error } = await resend.emails.send({
    from: from(),
    to: params.to,
    subject: `Votre facture — ${PRODUCT.name}`,
    html,
  });

  if (error) {
    console.error("[email] Resend invoice error", error);
    return { ok: false as const, error };
  }
  return { ok: true as const, id: data?.id };
}

/**
 * E-mail de livraison : lien de téléchargement / accès masterclass.
 * Remplacez <code>downloadLink</code> par votre URL réelle (Lemon Squeezy, Podia, etc.).
 */
export async function sendDeliveryEmail(params: {
  to: string;
  customerName: string;
  downloadLink: string;
}) {
  const resend = getResend();
  const html = `
    <p>Bonjour ${escapeHtml(params.customerName)},</p>
    <p>Votre accès à <strong>${escapeHtml(PRODUCT.name)}</strong> est prêt.</p>
    <p><a href="${escapeHtml(params.downloadLink)}">Accéder à votre contenu</a></p>
    <p>— ${escapeHtml(SITE.name)}</p>
  `;

  if (!resend) {
    console.info("[email] RESEND_API_KEY manquant — livraison non envoyée", params.to);
    return { ok: false as const, skipped: true };
  }

  const { data, error } = await resend.emails.send({
    from: from(),
    to: params.to,
    subject: `Votre accès — ${PRODUCT.name}`,
    html,
  });

  if (error) {
    console.error("[email] Resend delivery error", error);
    return { ok: false as const, error };
  }
  return { ok: true as const, id: data?.id };
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
