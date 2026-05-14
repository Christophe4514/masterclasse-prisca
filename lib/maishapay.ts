/**
 * MaishaPay Checkout — configuration serveur uniquement.
 *
 * **Une seule URL** (`MAISHAPAY_CHECKOUT_URL` ou défaut marchand).
 *
 * **`gatewayMode` fixe en sandbox** : la constante `MAISHAPAY_GATEWAY_MODE` vaut toujours `0` (doc MaishaPay).
 * Utilisez les clés d’essai associées dans le dashboard.
 */

const DEFAULT_CHECKOUT_URL =
  "https://marchand.maishapay.online/payment/vers1.0/merchant/checkout";

/** Doc MaishaPay : 0 = sandbox (test) — non configurable via `.env`. */
export const MAISHAPAY_GATEWAY_MODE = 0 as const;

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
