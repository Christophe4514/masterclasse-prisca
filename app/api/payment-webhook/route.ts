import { NextResponse } from "next/server";
import { z } from "zod";
import { fulfillOrderPaid, deletePendingOrderOnPaymentFailure } from "@/lib/payment/fulfill-order";

const webhookBodySchema = z.object({
  orderId: z.string().min(1),
  paymentReference: z.string().min(1),
  /** Simule un paiement réussi — avec Stripe, déduisez l’état des événements checkout.session.completed / payment_intent.succeeded */
  paid: z.boolean(),
});

/**
 * POST /api/payment-webhook
 *
 * POINT D’EXTENSION pour votre prestataire (Stripe, Paddle, etc.) :
 * - Stripe : utilisez `stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET)`
 *   et traitez `checkout.session.completed` / `invoice.paid`.
 * - Vérifiez TOUJOURS la signature avec le secret du dashboard — ne faites jamais confiance au JSON brut.
 * - Répondez rapidement (2xx) pour éviter les retries infinis.
 *
 * Ce handler minimal valide le paiement (Order + livraison + e-mails) ou supprime la commande en attente si refusé.
 */
export async function POST(req: Request) {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  const provided = req.headers.get("x-webhook-secret");

  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const parsed = webhookBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Payload invalide." }, { status: 422 });
  }

  const { orderId, paymentReference, paid } = parsed.data;
  if (!paid) {
    await deletePendingOrderOnPaymentFailure(orderId);
    return NextResponse.json({ ok: true, status: "failed" });
  }

  try {
    const result = await fulfillOrderPaid(orderId, paymentReference);
    if (!result.ok) {
      return NextResponse.json({ error: "Commande introuvable ou déjà traitée." }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[payment-webhook]", e);
    return NextResponse.json({ error: "Traitement impossible." }, { status: 500 });
  }
}
