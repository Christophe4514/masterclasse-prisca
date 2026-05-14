/** Produit numérique — masterclass / ebook Prisca Makila */
export const PRODUCT = {
  name: "Master Classe — Prisca Makila",
  shortDescription:
    "Le premier ouvrage de l’ingénieure Prisca Makila.",
  /** Prix facturé aujourd’hui (prévente avant sortie) — centimes */
  amountCents: 12_99,
  /** Prix catalogue après sortie — affiché barré pendant la promo */
  listPriceCents: 19_99,
  currency: "USD" as const,
};

export const SITE = {
  name: "Prisca Makila",
  title: "Prisca Makila — Master Classe & livre numérique",
  description:
    "Master Classe & livre numérique de Prisca Makila (KIM ENGINEERING, KIM BOX) : clés opérationnelles, résilience et passage à l’échelle industriel — de Kinshasa à Lubumbashi.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

/** Liens publics (marketing / succès / footer) */
export const SUPPORT = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "priscamakila@kimengin.com",
  whatsappUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ??
    "https://wa.me/?text=Bonjour%20Prisca%2C%20j%E2%80%99ai%20une%20question%20sur%20la%20Master%20Classe.",
  /** Lien de téléchargement affiché après paiement (à aligner avec DIGITAL_DELIVERY_URL côté serveur) */
  downloadUrl: process.env.NEXT_PUBLIC_DOWNLOAD_URL ?? "#telecharger",
};

export const SOCIAL = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://facebook.com/",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "https://youtube.com/",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com/",
};
