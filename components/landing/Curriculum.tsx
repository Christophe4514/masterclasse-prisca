"use client";

import { Accordion, type AccordionItemData } from "@/components/ui/accordion";

const curriculum: AccordionItemData[] = [
  {
    id: "m1",
    title: "Module 1 — STEM, visibilité et modèles",
    content:
      "Pourquoi la sous-représentation des femmes dans le STEM structure votre trajectoire : visibilité, mentors, et conséquences concrètes sur le terrain.",
  },
  {
    id: "m2",
    title: "Module 2 — Stéréotypes, critiques, résilience",
    content:
      "Stratégies concrètes pour tenir dans un environnement encore très masculin : répondre sans se disperser, protéger son énergie, avancer.",
  },
  {
    id: "m3",
    title: "Module 3 — De l’idée au prototype",
    content:
      "Structurer une vision innovante en plan d’action : cadrer l’hypothèse, itérer, valider — sans brûler les étapes.",
  },
  {
    id: "m4",
    title: "Module 4 — Produit fini & mise sur le marché",
    content:
      "Du prototype à un produit commercialisé et apprécié : industrialisation, distribution, retours terrain (notamment à l’échelle nationale).",
  },
  {
    id: "m5",
    title: "Les 12 vérités du parcours",
    content:
      "Les douze enseignements tirés du vécu : des repères pour transformer une vision technologique en réalité industrielle.",
  },
  {
    id: "m6",
    title: "Livre compagnon & ressources",
    content:
      "Supports pour prolonger la master class : relire, annoter, appliquer — un compagnon pour ne pas rester seule face aux décisions.",
  },
];

export function Curriculum() {
  return (
    <section id="programme" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum">Contenu</p>
        <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">Le programme — Le prix du chemin</h2>
        <p className="mt-4 text-base leading-relaxed text-ink/65">
          Modules structurants et bonus pratiques : une progression claire, orientée terrain — de la vision à
          l’industrialisation.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        {/* <Accordion items={curriculum} /> */}
        <p className="mt-6 text-center text-xs leading-relaxed text-ink/45">
          Commander à un prix préférentiel et retirer le livre le{" "}
          <time dateTime="2026-09-15">15 septembre 2026</time>, jour du vernissage de l&apos;ouvrage, avec une dédicace
          personnalisée de l&apos;auteure.
        </p>
      </div>
    </section>
  );
}
