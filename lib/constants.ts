/** Délai max. pour payer une commande en attente (aligné avec la redirection MaishaPay). */
export const PENDING_CHECKOUT_MAX_MS = 2 * 60 * 60 * 1000;

/** Produit numérique — masterclass / ebook Prisca Makila */
export const PRODUCT = {
  name: "Master Classe — Prisca Makila",
  shortDescription:
    "Le premier ouvrage de l’ingénieure Prisca Makila.",
  /** Prix facturé aujourd’hui (prévente avant sortie) — centimes */
  amountCents: 1_00,
  /** Prix catalogue après sortie — affiché barré pendant la promo */
  listPriceCents: 20_99,
  currency: "USD" as const,
};

export const SITE = {
  name: "Prisca Makila",
  title: "Prisca Makila — Master Classe & livre numérique",
  description:
    "Master Classe & livre numérique de Prisca Makila (KIM ENGINEERING, KIM BOX) : clés opérationnelles, résilience et passage à l’échelle industriel.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://masterclasse-prisca.vercel.app",
};

/** Liens publics (marketing / succès / footer) */
export const SUPPORT = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "priscamakila@kimengin.com",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+243 814 311 909",
  whatsappUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ??
    "https://wa.me/?text=Bonjour%20Prisca%2C%20j%E2%80%99ai%20une%20question%20sur%20la%20Master%20Classe.",
  /** Lien de téléchargement affiché après paiement (à aligner avec DIGITAL_DELIVERY_URL côté serveur) */
  downloadUrl: process.env.NEXT_PUBLIC_DOWNLOAD_URL ?? "#telecharger",
};

export const SOCIAL = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/ingenieure_prisca_makila?igsh=MXUxeWxqMnBoN3BmYQ==",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/ing%C3%A9nieure-prisca-makila-biakong-4b9418242?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
};
