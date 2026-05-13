"use client";

import { Accordion, type AccordionItemData } from "@/components/ui/accordion";

const faqs: AccordionItemData[] = [
  {
    id: "f1",
    title: "Comment commander le livre compagnon ?",
    content:
      "En cliquant sur le bouton 'Acheter maintenant' ou en allant sur la page de paiement sur le site, vous pouvez commander le livre compagnon. Une fois le paiement effectué, vous recevrez un e-mail de confirmation avec le lien de téléchargement du livre compagnon.",
  },
  {
    id: "f2",
    title: "Comment puis-je suivre à mon rythme ?",
    content:
      "Le livre compagnon est disponible en téléchargement immédiat après le paiement. Vous pouvez télécharger le livre compagnon et le lire à votre rythme.",
  },
  {
    id: "f3",
    title: "Le livre compagnon est-il inclus ?",
    content:
      "Oui : le livre compagnon est inclus dans le prix de vente. Vous pouvez télécharger le livre compagnon et le lire à votre rythme.",
  },
  {
    id: "f4",
    title: "Comment puis-je me faire rembourser ?",
    content:
      "En cas de problème avec le livre compagnon, vous pouvez contacter l'auteure via WhatsApp ou par e-mail. Nous vous aiderons à trouver une solution équitable.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-ink/8 bg-cream/25">
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
