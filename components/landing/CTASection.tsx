"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="border-t border-ink/8 bg-ink text-porcelain">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-16 sm:flex-row sm:items-center sm:px-6 lg:py-20">
        <div className="max-w-xl space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl">Votre prochain chapitre commence ici</h2>
          <p className="text-porcelain/75">
            Rejoignez une communauté d’écrivain·e·s qui choisissent la précision plutôt que le bruit.
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-ink shadow-lg shadow-black/20 transition hover:bg-gold-dark hover:text-porcelain"
          >
            Accéder à la masterclass
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
