import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  MAISHAPAY_PENDING_ORDER_COOKIE,
  maishaPayAmountString,
  maishaPayConfigured,
  toMaishaPayDevise,
} from "@/lib/maishapay";
import { PENDING_CHECKOUT_MAX_MS, SITE } from "@/lib/constants";

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * GET — renvoie une page HTML qui POSTe automatiquement vers MaishaPay Checkout.
 * Les clés API ne sont jamais exposées au client React : elles ne figurent que dans cette réponse HTML ponctuelle.
 */
export async function GET(req: Request) {
  if (!maishaPayConfigured()) {
    return NextResponse.json(
      { error: "Paiement MaishaPay non configuré (clés API manquantes)." },
      { status: 503 },
    );
  }

  const publicKey = "MP-LIVEPK-$53lKES$5JyfZ8.U$vc9s69DUCUX0i5d0nE7KtTQ1feH$iMG6BEkV3fnfb1hIA.iVAeuf9j14l8sy2j1e2Auie1$Wh6IujKNh28BS$Lry0/Be9b4be9f2jIt"
  const secretKey = "MP-LIVEPK-cv2WrfJ8m8St8z0pcMk4IoyK1hMeMo.$$P$71qlDOmkXoEM8FR$O2GBBLnJcyu9VE1rmHf2e4$MMPftfhJ4PCFDVtNi1hUzwcX20T4c82MEj$NIorebesGj0"
  const checkoutAction = "https://marchand.maishapay.online/payment/vers1.0/merchant/checkout"
  const gatewayMode = 1;

  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId")?.trim();
  if (!orderId) {
    return NextResponse.json({ error: "orderId requis." }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { id: true, amount: true, currency: true, paymentStatus: true, createdAt: true },
  });

  if (!order || order.paymentStatus !== "PENDING") {
    return NextResponse.json({ error: "Commande introuvable ou déjà traitée." }, { status: 404 });
  }

  if (Date.now() - order.createdAt.getTime() > PENDING_CHECKOUT_MAX_MS) {
    return NextResponse.json({ error: "Session de paiement expirée. Repassez commande." }, { status: 410 });
  }

  const baseUrl = SITE.url.replace(/\/$/, "");
  const callbackUrl = `${baseUrl}/checkout/maishapay-return?oid=${encodeURIComponent(order.id)}`;
  const montant = maishaPayAmountString(order.amount);
  const devise = toMaishaPayDevise(order.currency);

  const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Redirection MaishaPay…</title></head>
<body>
<p style="font-family:system-ui,sans-serif;text-align:center;margin-top:2rem">Redirection vers le paiement sécurisé…</p>
<form id="mp" method="POST" action="${escapeAttr(checkoutAction)}">
<input type="hidden" name="gatewayMode" value="${gatewayMode}"/>
<input type="hidden" name="publicApiKey" value="${publicKey}"/>
<input type="hidden" name="secretApiKey" value="${secretKey}"/>
<input type="hidden" name="montant" value="${escapeAttr(montant)}"/>
<input type="hidden" name="devise" value="${escapeAttr(devise)}"/>
<input type="hidden" name="callbackUrl" value="${escapeAttr(callbackUrl)}"/>
</form>
<script>document.getElementById("mp").submit();</script>
</body>
</html>`;

  const res = new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });

  res.cookies.set(MAISHAPAY_PENDING_ORDER_COOKIE, order.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
    path: "/",
  });

  return res;
}
