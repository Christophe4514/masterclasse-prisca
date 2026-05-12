"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  "Histoire de réussite et de résilience dans l'entrepreneuriat du numérique",
  "Des conseils pratiques pour réussir dans l'entrepreneuriat du numérique",
  "Des astuces pour optimiser votre temps et votre productivité pour réussir dans l'entrepreneuriat du numérique",
  "Des outils pour vous aider à vous organiser et à vous concentrer",
  "Des conseils pour vous aider à vous organiser et à vous concentrer",
  "Des solutions pour vous permettre de développer votre entreprise de manière durable",
];

export function Masterclass() {
  return (
    <section id="masterclass" className="border-y border-ink/8 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">Contenu</p>
          <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">Un livre compagnon taillé pour durer</h2>
          <p className="mt-4 text-ink/70">
            Découvrez mon histoire de réussite et de résilience dans l'entrepreneuriat du numérique en quelques chapitres.
            Ce livre compagnon est conçu pour vous accompagner dans votre entreprise de manière durable.
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
