"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Comment accéder à la masterclass après achat ?",
    a: "Vous recevez un e-mail de confirmation puis un second message avec votre lien d’accès sécurisé. Le tout est automatisé dès validation du paiement.",
  },
  {
    q: "Puis-je suivre les modules à mon rythme ?",
    a: "Oui. Les contenus restent disponibles pendant 12 mois pour vous permettre d’alterner écriture, relecture et reprise des leçons.",
  },
  {
    q: "Le livre numérique est-il inclus ?",
    a: "Oui, le pack inclut le livre compagnon au format numérique, avec les exercices et repères utilisés dans la masterclass.",
  },
  {
    q: "Proposez-vous des remboursements ?",
    a: "Les contenus numériques étant livrés instantanément, nous appliquons une politique stricte. Contactez-nous en cas de problème technique avéré.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:py-24">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">FAQ</p>
        <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">Questions fréquentes</h2>
      </div>
      <div className="mt-10 space-y-3">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="overflow-hidden rounded-2xl border border-ink/8 bg-white">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-ink"
              >
                {item.q}
                <ChevronDown className={`size-4 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="border-t border-ink/6"
                  >
                    <p className="px-5 py-4 text-sm leading-relaxed text-ink/70">{item.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
