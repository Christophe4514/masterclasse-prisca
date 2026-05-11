"use client";

import { motion } from "framer-motion";

export function AboutAuthor() {
  return (
    <section id="autrice" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative flex size-56 items-center justify-center rounded-full border border-ink/10 bg-gradient-to-br from-sand to-porcelain text-4xl font-serif text-ink shadow-inner sm:size-64">
            PM
            <span className="absolute -bottom-2 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">
              Auteure
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="space-y-5"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">Présentation</p>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">Prisca Makila</h2>
          <p className="text-lg text-ink/75">
            Romancière et passeuse de voix, Prisca accompagne les écritures contemporaines qui cherchent la justesse du
            geste et la profondeur du récit. Sa pédagogie mêle exigence littéraire et bienveillance créative.
          </p>
          <p className="text-ink/70">
            Cette masterclass condense des années d’ateliers et d’éditions : structure narrative, tension dramatique,
            économie de la phrase, et silence comme matière romanesque.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
