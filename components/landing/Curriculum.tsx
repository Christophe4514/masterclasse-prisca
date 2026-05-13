"use client";

import { Accordion, type AccordionItemData } from "@/components/ui/accordion";

const curriculum: AccordionItemData[] = [
  {
    id: "m1",
    title: "Module 1 — Cartographier le désir du récit",
    content:
      "Clarifier l’enjeu, le manque, la promesse : poser une boussole narrative solide avant d’écrire « pour écrire ».",
  },
  {
    id: "m2",
    title: "Module 2 — La scène qui tient",
    content:
      "Structure d’une scène efficace : entrée tardive, tension, pivot, sortie qui pousse à tourner la page.",
  },
  {
    id: "m3",
    title: "Module 3 — Dialogues : respiration & sous-texte",
    content:
      "Faire parler vos personnages sans sur-expliquer : économie, rythme, doubles sens.",
  },
  {
    id: "m4",
    title: "Module 4 — Voix, style, silence",
    content:
      "Affiner la phrase, choisir l’ellipse, utiliser le blanc comme matière romanesque.",
  },
  {
    id: "m5",
    title: "Chapitres bonus — Ateliers express",
    content:
      "Micro-exercices pour débloquer une scène, réécrire un dialogue, resserrer un chapitre trop bavard.",
  },
  {
    id: "m6",
    title: "Livre numérique + ressources",
    content:
      "PDF annoté, grilles de relecture, checklist d’auto-édition : un compagnon premium pour prolonger la masterclass.",
  },
];

export function Curriculum() {
  return (
    <section id="programme" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum">Contenu</p>
        <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">Le programme, en profondeur</h2>
        <p className="mt-4 text-base leading-relaxed text-ink/65">
          Modules vidéo, chapitres structurants, bonus pratiques : tout est pensé pour une progression nette, sans
          surcharge cognitive.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion items={curriculum} />
        <p className="mt-6 text-center text-xs text-ink/45">
          Format : vidéos + supports PDF · Accès replay · Mises à jour mineures incluses
        </p>
      </div>
    </section>
  );
}
