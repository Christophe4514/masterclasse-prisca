"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  "Cartographie du désir narratif et des enjeux de voix",
  "Ateliers d’écriture ciblés : scène, dialogue, ellipses",
  "Corrections de posture : où la précision remplace le verbiage",
  "Livre numérique compagnon avec lectures et exercices annotés",
  "Espace d’intimité créative — rythme compatible avec une vie chargée",
];

export function Masterclass() {
  return (
    <section id="masterclass" className="border-y border-ink/8 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">Programme</p>
          <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">Une masterclass taillée pour durer</h2>
          <p className="mt-4 text-ink/70">
            Ni cours magistral figé, ni promesse creuse : un parcours dense, progressif, pensé pour transformer votre
            manière d’habiter la page.
          </p>
        </div>
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="mx-auto mt-12 grid max-w-3xl gap-4"
        >
          {items.map((t) => (
            <motion.li
              key={t}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="flex gap-3 rounded-2xl border border-ink/8 bg-porcelain px-5 py-4 text-left text-ink/80"
            >
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-dark">
                <Check className="size-3.5" />
              </span>
              <span>{t}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
