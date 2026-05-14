import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { MAISHAPAY_PENDING_ORDER_COOKIE } from "@/lib/maishapay";
import { maishaPayReturnHtmlResponse } from "@/lib/payment/maishapay-return-html";
import { fulfillOrderPaid, markOrderPaymentFailed } from "@/lib/payment/fulfill-order";

function queryParamsMap(url: URL): Map<string, string> {
  const m = new Map<string, string>();
  url.searchParams.forEach((v, k) => m.set(k.toLowerCase(), v));
  return m;
}

async function readBodyParams(req: Request, into: Map<string, string>) {
  const ct = (req.headers.get("content-type") ?? "").toLowerCase();
  try {
    if (ct.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      new URLSearchParams(text).forEach((v, k) => into.set(k.toLowerCase(), v));
      return;
    }
    if (ct.includes("application/json")) {
      const json = (await req.json()) as Record<string, unknown>;
      for (const [k, v] of Object.entries(json)) {
        if (v != null) into.set(k.toLowerCase(), String(v));
      }
      return;
    }
    if (ct.includes("multipart/form-data")) {
      const fd = await req.formData();
      fd.forEach((v, k) => {
        if (typeof v === "string") into.set(k.toLowerCase(), v);
      });
      return;
    }
    const raw = await req.text();
    if (raw.trim().startsWith("{")) {
      const json = JSON.parse(raw) as Record<string, unknown>;
      for (const [k, v] of Object.entries(json)) {
        if (v != null) into.set(k.toLowerCase(), String(v));
      }
      return;
    }
    if (raw.includes("=")) {
      new URLSearchParams(raw).forEach((v, k) => into.set(k.toLowerCase(), v));
    }
  } catch {
    /* ignore */
  }
}

function getStatusParam(params: Map<string, string>): string | undefined {
  return (
    params.get("status") ??
    params.get("statut") ??
    params.get("paymentstatus") ??
    params.get("payment_status")
  );
}

function getDescriptionParam(params: Map<string, string>): string | undefined {
  return params.get("description") ?? params.get("message") ?? params.get("msg");
}

/** Succès confirmé uniquement si le PSP renvoie un critère clair (pas de supposition sur un ref seul). */
function isMaishaPaySuccess(status: string | undefined, description: string | undefined): boolean {
  const s = status?.trim() ?? "";
  const d = (description ?? "").trim().toLowerCase();
  const sl = s.toLowerCase();
  if (sl === "202" || sl === "201" || sl === "200" || sl === "success" || sl === "ok" || sl === "paid") return true;
  const n = Number(s);
  if (n === 202 || n === 201 || n === 200) return true;
  const first = d.split(/[.,;]/)[0]?.trim() ?? "";
  if (first === "accepted" || first === "acceptée") return true;
  if (d === "success" || d === "paid" || d === "completed") return true;
  return false;
}

function isExplicitFailure(status: string | undefined, description: string | undefined): boolean {
  const s = status?.trim() ?? "";
  const d = (description ?? "").toLowerCase();
  if (d.includes("refus") || d.includes("fail") || d.includes("error") || d.includes("cancel")) return true;
  const n = Number(s);
  if (s !== "" && !Number.isNaN(n) && n >= 400) return true;
  const sl = s.toLowerCase();
  if (sl === "failed" || sl === "cancelled" || sl === "canceled" || sl === "refused" || sl === "declined")
    return true;
  return false;
}

function clearPendingCookie(res: NextResponse) {
  res.cookies.set(MAISHAPAY_PENDING_ORDER_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

async function handle(req: Request) {
  const url = new URL(req.url);
  const params = queryParamsMap(url);
  if (req.method === "POST") {
    await readBodyParams(req, params);
  }

  const jar = await cookies();
  const orderIdFromCookie = jar.get(MAISHAPAY_PENDING_ORDER_COOKIE)?.value;
  const orderIdParam =
    params.get("oid") ?? params.get("orderid") ?? params.get("order_id");
  const orderId = orderIdFromCookie ?? orderIdParam ?? "";

  const status = getStatusParam(params);
  const description = getDescriptionParam(params);
  const transactionRefId =
    params.get("transactionrefid") ?? params.get("transaction_ref_id") ?? params.get("transactionref");
  const operatorRefId = params.get("operatorrefid") ?? params.get("operator_ref_id");

  const ref =
    [transactionRefId, operatorRefId].filter(Boolean).join("|") || `maisha-${Date.now()}`;

  if (!orderId) {
    const res = maishaPayReturnHtmlResponse(url.origin, "session");
    clearPendingCookie(res);
    return res;
  }

  if (isExplicitFailure(status, description)) {
    await markOrderPaymentFailed(orderId, ref);
    const res = maishaPayReturnHtmlResponse(url.origin, "refused");
    clearPendingCookie(res);
    return res;
  }

  if (isMaishaPaySuccess(status, description)) {
    const result = await fulfillOrderPaid(orderId, ref);
    if (!result.ok) {
      const res = maishaPayReturnHtmlResponse(url.origin, "server_error");
      clearPendingCookie(res);
      return res;
    }
    const res = NextResponse.redirect(
      new URL(`/checkout/success?orderId=${encodeURIComponent(orderId)}`, url.origin),
      303,
    );
    clearPendingCookie(res);
    return res;
  }

  /* Pas de succès explicite : pas de redirection vers le site « comme payé », page neutre */
  const res = maishaPayReturnHtmlResponse(url.origin, "unknown");
  clearPendingCookie(res);
  return res;
}

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}
