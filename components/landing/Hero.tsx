"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ShieldCheck, Sparkles } from "lucide-react";
import { AuthorHeroArt } from "@/components/media/AuthorHeroArt";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { PRODUCT } from "@/lib/constants";
import { formatMoney } from "@/lib/format";

const fade = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink/8 bg-gradient-to-b from-porcelain via-cream/60 to-porcelain">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(196,113,95,0.18),transparent_42%),radial-gradient(circle_at_90%_20%,rgba(198,162,74,0.16),transparent_45%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-24">
        <motion.div
          className="lg:col-span-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={fade} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-plum">
              <Sparkles className="size-3.5" />
              Master Classe digitale
            </span>
            <Badge tone="gold" className="normal-case tracking-normal">
              <ShieldCheck className="size-3.5" />
              Paiement sécurisé
            </Badge>
          </motion.div>

          <motion.h1
            variants={fade}
            className="mt-6 font-serif text-[2.35rem] leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]"
          >
            Donnez à votre écriture{" "}
            <span className="bg-gradient-to-r from-plum via-terracotta to-gold bg-clip-text text-transparent">
              une voix irrésistible
            </span>
          </motion.h1>

          <motion.p variants={fade} className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            {PRODUCT.shortDescription}
          </motion.p>

          <motion.div variants={fade} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/checkout" variant="primary" size="xl" className="w-full sm:w-auto">
              Acheter maintenant
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="#programme" variant="secondary" size="xl" className="w-full sm:w-auto">
              <BookOpen className="size-4" />
              Voir le programme
            </ButtonLink>
          </motion.div>

          <motion.p variants={fade} className="mt-6 text-sm text-ink/50">
            Accès immédiat après paiement · {formatMoney(PRODUCT.amountCents, PRODUCT.currency)}
          </motion.p>
        </motion.div>

        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <AuthorHeroArt />
        </motion.div>
      </div>
    </section>
  );
}
