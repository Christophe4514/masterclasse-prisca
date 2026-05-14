import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { invoicePayloadFromPaidOrder } from "@/lib/invoice";
import { buildInvoicePdfBytes } from "@/lib/invoice-pdf";

export async function GET(
  req: Request,
  context: { params: Promise<{ orderId: string }> },
) {
  const { orderId } = await context.params;
  if (!orderId?.trim()) {
    return NextResponse.json({ error: "Commande introuvable." }, { status: 404 });
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId.trim() },
    select: {
      id: true,
      fullName: true,
      email: true,
      amount: true,
      currency: true,
      paymentReference: true,
      paymentStatus: true,
      createdAt: true,
    },
  });

  if (!order || order.paymentStatus !== "PAID") {
    return NextResponse.json({ error: "Facture non disponible (paiement non confirmé)." }, { status: 404 });
  }

  const payload = invoicePayloadFromPaidOrder(order);
  const pdfBytes = await buildInvoicePdfBytes(payload);
  const url = new URL(req.url);
  const asAttachment = url.searchParams.get("download") === "1";
  const safeSlug = order.id.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 20) || "commande";
  const disposition = asAttachment ? "attachment" : "inline";

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "private, no-store",
      "Content-Disposition": `${disposition}; filename="facture-${safeSlug}.pdf"`,
    },
  });
}
