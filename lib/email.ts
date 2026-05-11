import { Resend } from "resend";
import { PRODUCT, SITE } from "@/lib/constants";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const from = () =>
  process.env.RESEND_FROM_EMAIL ?? "Prisca Makila <onboarding@resend.dev>";

/**
 * E-mail de confirmation après paiement réussi.
 * Branchez votre domaine vérifié sur Resend pour la production.
 */
export async function sendPaymentConfirmationEmail(params: {
  to: string;
  customerName: string;
  orderId: string;
  amountLabel: string;
}) {
  const resend = getResend();
  const html = `
    <p>Bonjour ${escapeHtml(params.customerName)},</p>
    <p>Nous avons bien enregistré votre paiement pour <strong>${escapeHtml(PRODUCT.name)}</strong>.</p>
    <p>Montant : <strong>${escapeHtml(params.amountLabel)}</strong></p>
    <p>Référence commande : <code>${escapeHtml(params.orderId)}</code></p>
    <p>Vous recevrez un second e-mail dès que l’accès numérique sera activé.</p>
    <p>— ${escapeHtml(SITE.name)}</p>
  `;

  if (!resend) {
    console.info("[email] RESEND_API_KEY manquant — confirmation non envoyée", params.to);
    return { ok: false as const, skipped: true };
  }

  const { data, error } = await resend.emails.send({
    from: from(),
    to: params.to,
    subject: `Paiement confirmé — ${PRODUCT.name}`,
    html,
  });

  if (error) {
    console.error("[email] Resend error", error);
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
