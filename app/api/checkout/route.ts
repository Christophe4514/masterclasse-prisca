import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { PRODUCT, PENDING_CHECKOUT_MAX_MS } from "@/lib/constants";
import { maishaPayConfigured } from "@/lib/maishapay";
import { checkoutSchema } from "@/lib/validators/checkout";

const bodySchema = checkoutSchema.extend({
  /** Optionnel : montant côté client ignoré en prod — toujours recalculé serveur */
  amountCents: z.number().int().positive().optional(),
});

/**
 * POST /api/checkout
 *
 * Crée une commande en base (paiement PENDING) + livraison en attente.
 * Les commandes PENDING expirées (sans paiement dans le délai défini) sont purgées pour limiter le volume en base.
 * Si MaishaPay est configuré, le client redirige vers `/api/payments/maishapay/submit?orderId=…`
 * (page HTML auto-POST vers la passerelle — clés API uniquement côté serveur).
 */
export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps JSON invalide." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation échouée.", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { fullName, email, phone, country } = parsed.data;
  const amount = PRODUCT.amountCents;
  const currency = PRODUCT.currency;

  try {
    const expiredBefore = new Date(Date.now() - PENDING_CHECKOUT_MAX_MS);
    await prisma.order.deleteMany({
      where: {
        paymentStatus: "PENDING",
        createdAt: { lt: expiredBefore },
      },
    });

    const order = await prisma.order.create({
      data: {
        fullName,
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        country: country.trim(),
        amount,
        currency,
        paymentStatus: "PENDING",
        delivery: {
          create: {
            deliveryStatus: "PENDING",
          },
        },
      },
      select: { id: true },
    });

    if (maishaPayConfigured()) {
      const submitPath = `/api/payments/maishapay/submit?orderId=${encodeURIComponent(order.id)}`;
      return NextResponse.json({
        orderId: order.id,
        maishapaySubmitUrl: submitPath,
      });
    }

    return NextResponse.json({
      orderId: order.id,
      maishapaySubmitUrl: null as string | null,
      message:
        "Commande enregistrée. Configurez MAISHAPAY_PUBLIC_API_KEY et MAISHAPAY_SECRET_API_KEY pour activer le paiement MaishaPay.",
    });
  } catch (e) {
    console.error("[checkout]", e);
    return NextResponse.json({ error: "Impossible de créer la commande." }, { status: 500 });
  }
}
