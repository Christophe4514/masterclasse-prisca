import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata = {
  title: "Politique de confidentialité",
  description: "Comment nous traitons vos données — Prisca Makila.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum">Légal</p>
        <h1 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">Politique de confidentialité</h1>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-ink/70">
          <p>
            Cette page est un <strong>modèle</strong> à adapter à votre situation (pays, prestataire de paiement,
            hébergeur, outils analytics). Elle ne constitue pas un avis juridique.
          </p>
          <p>
            <strong>Données collectées :</strong> informations de commande (nom, e-mail, téléphone, pays) nécessaires à la
            livraison du produit numérique et au support client.
          </p>
          <p>
            <strong>Base légale :</strong> exécution du contrat (vente) et intérêt légitime (sécurité, amélioration du
            service), selon votre cadre applicable (RGPD, etc.).
          </p>
          <p>
            <strong>Conservation :</strong> définissez une durée cohérente avec vos obligations comptables et la gestion
            des litiges.
          </p>
          <p>
            <strong>Contact :</strong> pour toute question, écrivez via les coordonnées indiquées dans le pied de page.
          </p>
        </div>
        <Link href="/" className="mt-10 inline-flex text-sm font-semibold text-plum underline-offset-4 hover:underline">
          ← Retour au site
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
