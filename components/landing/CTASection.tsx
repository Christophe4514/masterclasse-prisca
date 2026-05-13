"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="border-t border-ink/8 bg-ink text-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 px-4 py-16 sm:flex-row sm:items-center sm:px-6 lg:py-20">
        <div className="max-w-xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold/85">Prêt·e à écrire autrement ?</p>
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">Votre prochain chapitre commence ici</h2>
          <p className="text-sm leading-relaxed text-cream/70 sm:text-base">
            Une expérience digitale haut de gamme : claire, élégante, orientée résultats — pour convaincre sans forcer.
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <ButtonLink href="/checkout" variant="accent" size="xl" className="shadow-2xl shadow-black/25">
            Acheter maintenant
            <ArrowRight className="size-4" />
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
