"use client";

import { Accordion, type AccordionItemData } from "@/components/ui/accordion";

const faqs: AccordionItemData[] = [
  {
    id: "f1",
    title: "Comment commander le livre compagnon ?",
    content:
      "En cliquant sur le bouton 'Acheter maintenant' ou en allant sur la page de paiement sur le site, vous pouvez commander le livre compagnon. Une fois le paiement effectué, vous recevrez un e-mail de confirmation.une facture vous sera emise et vous pouvez la télécharger au format PDF.",
  },
  {
    id: "f2",
    title: "Comment puis-je obtenir le livre ?",
    content:
      "Le jour du vernissage du livre, vous pourrez venir le récupérer en personne ou nous le faire envoyer à votre adresse. la facture emise vous sera demandée pour la livraison.",
  },
  {
    id: "f3",
    title: "Quand sera le vernissage du livre ?",
    content:
      "Le vernissage aura lieu le 15 septembre 2026 à kinshasa. Les détails vous seront communiqués par e-mail.",
  },
  {
    id: "f4",
    title: "Comment puis-je contacter l'auteure ?",
    content:
      "Vous pouvez contacter l'auteure via WhatsApp ou par e-mail. Nous vous répondrons dans les 48 heures ouvrées.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-28 border-t border-ink/8 bg-cream/25">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum">FAQ</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">Questions fréquentes</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60">
            Des réponses simples — pour décider vite, sereinement.
          </p>
        </div>
        <div className="mt-10">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
