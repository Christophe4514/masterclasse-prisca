import { prisma } from "@/lib/prisma";
import { sendDeliveryEmail, sendPaymentConfirmationEmail } from "@/lib/email";
import { formatMoney } from "@/lib/format";

const downloadUrl = () =>
  process.env.DIGITAL_DELIVERY_URL ?? `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/merci`;

/**
 * Marque la commande comme payée, active la livraison et envoie les e-mails (idempotent si déjà PAID).
 */
export async function fulfillOrderPaid(orderId: string, paymentReference: string) {
  const existing = await prisma.order.findUnique({
    where: { id: orderId },
    include: { delivery: true },
  });
  if (!existing) {
    return { ok: false as const, error: "not_found" as const };
  }
  if (existing.paymentStatus === "PAID") {
    return { ok: true as const, alreadyPaid: true };
  }

  const claimed = await prisma.order.updateMany({
    where: { id: orderId, paymentStatus: "PENDING" },
    data: {
      paymentStatus: "PAID",
      paymentReference,
    },
  });

  if (claimed.count === 0) {
    const again = await prisma.order.findUnique({ where: { id: orderId }, select: { paymentStatus: true } });
    if (again?.paymentStatus === "PAID") {
      return { ok: true as const, alreadyPaid: true };
    }
    return { ok: false as const, error: "not_pending" as const };
  }

  const url = downloadUrl();

  if (existing.delivery) {
    await prisma.delivery.update({
      where: { id: existing.delivery.id },
      data: {
        deliveryStatus: "SENT",
        downloadLink: url,
        deliveredAt: new Date(),
      },
    });
  }

  const amountLabel = formatMoney(existing.amount, existing.currency);

  await sendPaymentConfirmationEmail({
    to: existing.email,
    customerName: existing.fullName,
    orderId: existing.id,
    amountLabel,
  });

  await sendDeliveryEmail({
    to: existing.email,
    customerName: existing.fullName,
    downloadLink: url,
  });

  return { ok: true as const, alreadyPaid: false };
}

export async function markOrderPaymentFailed(orderId: string, paymentReference: string) {
  const ref =
    paymentReference.trim() || `failed-${orderId}-${Date.now()}`;
  await prisma.order.updateMany({
    where: { id: orderId, paymentStatus: "PENDING" },
    data: { paymentStatus: "FAILED", paymentReference: ref },
  });
}
