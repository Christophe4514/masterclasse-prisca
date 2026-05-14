import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  MAISHAPAY_GATEWAY_MODE,
  MAISHAPAY_PENDING_ORDER_COOKIE,
  getMaishaPayCheckoutUrl,
  maishaPayAmountString,
  maishaPayConfigured,
  normalizeMaishaPayApiKey,
  toMaishaPayDevise,
} from "@/lib/maishapay";
import { SITE } from "@/lib/constants";

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const PENDING_MAX_AGE_MS = 2 * 60 * 60 * 1000;

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

  const publicKey = "MP-SBPK-dsK61xEy09p0T1m6gO4NvQuJoj0SUmdK.$uq34mLjzBty$caGMru2j2l4zJ$5VeZ$1$5Bp/iq$lBy6zlD2FiXEnsz1gziT2NpbyD/enZ90K5FVNHQZAFeR75";
    const secretKey = "MP-SBPK-NGYNy$2y4$9gDWXM7ZBmKqqTO2A8xeP02O$oA6lxyme3J1BoYA/TSwrs9Jd$XQzSW.V2GheDV.zmRHRCjU$0nRmkg9cR1$PYNJg1X6SPgC4Ox2YMageyeozF";
    const checkoutAction = "https://marchand.maishapay.online/payment/vers1.0/merchant/checkout";
    const gatewayMode = 0;

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

  if (Date.now() - order.createdAt.getTime() > PENDING_MAX_AGE_MS) {
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
