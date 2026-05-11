import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendDeliveryEmail, sendPaymentConfirmationEmail } from "@/lib/email";
import { formatMoney } from "@/lib/format";

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
 * Ce handler minimal met à jour Order + Delivery et envoie les e-mails Resend.
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
    await prisma.order.updateMany({
      where: { id: orderId },
      data: { paymentStatus: "FAILED", paymentReference },
    });
    return NextResponse.json({ ok: true, status: "failed" });
  }

  const downloadUrl =
    process.env.DIGITAL_DELIVERY_URL ?? `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/merci`;

  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: "PAID",
        paymentReference,
      },
      include: { delivery: true },
    });

    if (!order.delivery) {
      return NextResponse.json({ error: "Livraison introuvable." }, { status: 400 });
    }

    await prisma.delivery.update({
      where: { id: order.delivery.id },
      data: {
        deliveryStatus: "SENT",
        downloadLink: downloadUrl,
        deliveredAt: new Date(),
      },
    });

    const amountLabel = formatMoney(order.amount, order.currency);

    await sendPaymentConfirmationEmail({
      to: order.email,
      customerName: order.fullName,
      orderId: order.id,
      amountLabel,
    });

    await sendDeliveryEmail({
      to: order.email,
      customerName: order.fullName,
      downloadLink: downloadUrl,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[payment-webhook]", e);
    return NextResponse.json({ error: "Traitement impossible." }, { status: 500 });
  }
}
