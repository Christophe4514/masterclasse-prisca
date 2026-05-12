/** Produit numérique — masterclass / ebook Prisca Makila */
export const PRODUCT = {
  name: "Masterclass — Prisca Makila",
  shortDescription: "Une masterclass littéraire et un accès ebook pour approfondir votre écriture.",
  /** Prix en centimes (ex. 4900 = 49,00 €) */
  amountCents: 19_00,
  currency: "USD" as const,
};

export const SITE = {
  name: "Prisca Makila",
  title: "Prisca Makila — Masterclass & livre numérique",
  description:
    "Découvrez la masterclass et le livre numérique de Prisca Makila : un parcours premium pour écrire avec exigence et sens.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};
