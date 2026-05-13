"use client";

import { Accordion, type AccordionItemData } from "@/components/ui/accordion";

const faqs: AccordionItemData[] = [
  {
    id: "f1",
    title: "Comment accéder à la Master Classe après achat ?",
    content:
      "Vous recevez un e-mail de confirmation puis un second message avec votre lien d’accès sécurisé. L’activation est automatisée dès validation du paiement par votre prestataire.",
  },
  {
    id: "f2",
    title: "Puis-je suivre à mon rythme ?",
    content:
      "Oui. Le contenu reste disponible sur une longue période (selon les conditions affichées au moment de l’achat) pour vous permettre d’alterner écriture, relecture et reprise des leçons.",
  },
  {
    id: "f3",
    title: "Le livre numérique est-il inclus ?",
    content:
      "Oui : le pack inclut le livre compagnon au format numérique, avec exercices et repères utilisés dans la masterclass.",
  },
  {
    id: "f4",
    title: "Proposez-vous des remboursements ?",
    content:
      "Les contenus numériques étant livrés instantanément, une politique stricte s’applique. Contactez-nous en cas de problème technique avéré : nous trouverons une solution équitable.",
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
