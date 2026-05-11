import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { PRODUCT } from "@/lib/constants";
import { checkoutSchema } from "@/lib/validators/checkout";

const bodySchema = checkoutSchema.extend({
  /** Optionnel : montant côté client ignoré en prod — toujours recalculé serveur */
  amountCents: z.number().int().positive().optional(),
});

/**
 * POST /api/checkout
 *
 * Crée une commande en base (paiement PENDING) + livraison en attente.
 *
 * INTÉGRATION FUTURE (Stripe, Lemon Squeezy, PayPal, etc.) :
 * 1. Valider le panier / produit (prix, devise) uniquement côté serveur (déjà fait via PRODUCT).
 * 2. Créer la session de paiement chez le prestataire avec metadata.orderId = order.id
 * 3. Retourner { checkoutUrl } pour redirection navigateur, ou clientSecret pour Payment Element.
 * 4. Laisser paymentReference null jusqu’au webhook de confirmation.
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

    // --- Branchez ici votre prestataire de paiement ---
    // const session = await stripe.checkout.sessions.create({ ... metadata: { orderId: order.id } })
    // return NextResponse.json({ orderId: order.id, checkoutUrl: session.url })

    return NextResponse.json({
      orderId: order.id,
      checkoutUrl: null as string | null,
      message:
        "Commande enregistrée. Intégrez un prestataire de paiement pour renvoyer checkoutUrl.",
    });
  } catch (e) {
    console.error("[checkout]", e);
    return NextResponse.json({ error: "Impossible de créer la commande." }, { status: 500 });
  }
}
