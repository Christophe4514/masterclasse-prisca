import { NextResponse } from "next/server";

export type MaishaReturnPageVariant =
  | "session"
  | "refused"
  | "unknown"
  | "server_error"
  | "declined";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const copy: Record<
  MaishaReturnPageVariant,
  { title: string; lead: string; detail?: string }
> = {
  session: {
    title: "Retour paiement — session introuvable",
    lead: "Nous n’avons pas pu associer ce retour à une commande en cours.",
    detail: "Reprenez depuis la page de paiement, ou contactez le support en indiquant votre e-mail.",
  },
  refused: {
    title: "Paiement non abouti",
    lead: "La transaction a été refusée ou annulée côté MaishaPay.",
    detail: "Aucun encaissement n’a été confirmé sur notre site. Vous pouvez réessayer quand vous le souhaitez.",
  },
  unknown: {
    title: "Paiement non confirmé",
    lead: "MaishaPay n’a pas renvoyé un statut de succès exploitable par notre système.",
    detail:
      "Nous ne validons une commande payée qu’après confirmation explicite. Si une somme a été débitée, gardez votre preuve et écrivez-nous ; sinon, vous pouvez repasser par le paiement.",
  },
  server_error: {
    title: "Erreur technique",
    lead: "La confirmation du paiement n’a pas pu être enregistrée.",
    detail: "Si vous avez été débité, contactez-nous avec l’heure du paiement et votre e-mail.",
  },
  declined: {
    title: "Paiement refusé",
    lead: "La transaction a été refusée ou annulée côté MaishaPay.",
    detail: "Aucun encaissement n’a été confirmé sur notre site. Vous pouvez réessayer quand vous le souhaitez.",
  },
};

/**
 * Page HTML minimale (hors layout Next) — utilisée quand le paiement n’est pas confirmé « succès »,
 * pour ne pas rediriger vers le site avec un état ambigu.
 */
export function maishaPayReturnHtmlResponse(
  origin: string,
  variant: MaishaReturnPageVariant,
): NextResponse {
  const { title, lead, detail } = copy[variant];
  const home = `${origin}/`;
  const checkout = `${origin}/checkout`;

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${escapeHtml(title)}</title>
  <style>
    body{font-family:system-ui,sans-serif;line-height:1.5;max-width:32rem;margin:3rem auto;padding:0 1.25rem;color:#161214;}
    h1{font-size:1.25rem;font-weight:700;margin:0 0 0.75rem;}
    p{margin:0 0 1rem;color:rgba(22,18,20,.78);}
    .actions{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1.5rem;}
    a{color:#5c3d4f;font-weight:600;}
  </style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(lead)}</p>
  ${detail ? `<p>${escapeHtml(detail)}</p>` : ""}
  <div class="actions">
    <a href="${escapeHtml(checkout)}">Retour au paiement</a>
    <span aria-hidden>·</span>
    <a href="${escapeHtml(home)}">Accueil</a>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
