/**
 * MaishaPay Checkout — configuration serveur uniquement.
 *
 * **Une seule URL** (`MAISHAPAY_CHECKOUT_URL` ou défaut marchand).
 *
 * **`gatewayMode` doit correspondre aux clés** (doc MaishaPay) :
 * `0` = sandbox / clés d’essai, `1` = production / clés live du compte marchand.
 * Sinon : erreur « Compte not found » / mode de fonctionnement.
 */

const DEFAULT_CHECKOUT_URL =
  "https://marchand.maishapay.online/payment/vers1.0/merchant/checkout";

/** Retire espaces et guillemets accidentels autour des clés copiées depuis le dashboard. */
export function normalizeMaishaPayApiKey(value: string): string {
  let s = value.trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

/**
 * Doc MaishaPay : `0` = sandbox, `1` = production (live).
 * Défini par `MAISHAPAY_GATEWAY_MODE` ; si absent, heuristique sur la clé publique (`LIVE` → production).
 */
export function getMaishaPayGatewayMode(): 0 | 1 {
  const raw = process.env.MAISHAPAY_GATEWAY_MODE?.trim().toLowerCase();
  if (raw === "1" || raw === "live" || raw === "production") return 1;
  if (raw === "0" || raw === "sandbox" || raw === "test") return 0;
  if (raw != null && raw !== "") {
    const n = Number.parseInt(raw, 10);
    if (n === 1) return 1;
    if (n === 0) return 0;
  }

  const pub = normalizeMaishaPayApiKey(process.env.MAISHAPAY_PUBLIC_API_KEY ?? "");
  if (/live|prod/i.test(pub)) return 1;
  if (/sandbox|test|stag/i.test(pub)) return 0;

  return 0;
}

export function getMaishaPayCheckoutUrl(): string {
  const fromEnv = process.env.MAISHAPAY_CHECKOUT_URL?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_CHECKOUT_URL;
}

/** Montant attendu par MaishaPay : chaîne décimale (ex. USD → "12.99"). */
export function maishaPayAmountString(amountCents: number): string {
  return (amountCents / 100).toFixed(2);
}

/** Devises supportées par la doc MaishaPay */
const ALLOWED = new Set(["USD", "CDF", "FCFA", "EURO"]);

export function toMaishaPayDevise(currency: string): string {
  const c = currency.toUpperCase();
  if (c === "EUR") return "EURO";
  if (ALLOWED.has(c)) return c;
  return "USD";
}

export function maishaPayConfigured(): boolean {
  const pub = process.env.MAISHAPAY_PUBLIC_API_KEY;
  const sec = process.env.MAISHAPAY_SECRET_API_KEY;
  return Boolean(
    pub && normalizeMaishaPayApiKey(pub) && sec && normalizeMaishaPayApiKey(sec),
  );
}

/** Cookie HttpOnly — lien retour MaishaPay peut ne pas renvoyer notre orderId dans l’URL. */
export const MAISHAPAY_PENDING_ORDER_COOKIE = "mp_pending_order";
