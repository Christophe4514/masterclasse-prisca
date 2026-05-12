"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { PRODUCT } from "@/lib/constants";
import { formatMoney } from "@/lib/format";

const fade = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink/8 bg-gradient-to-b from-porcelain via-sand/40 to-porcelain">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,162,39,0.12),_transparent_55%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:py-28">
        <motion.div
          className="flex-1 space-y-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.p variants={fade} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <Sparkles className="size-3.5" />
            Masterclass & livre numérique
          </motion.p>
          <motion.h1 variants={fade} className="font-serif text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
            Écrire avec précision,{" "}
            <span className="bg-gradient-to-r from-gold to-gold-dark bg-clip-text text-transparent">raconter avec âme</span>
          </motion.h1>
          <motion.p variants={fade} className="max-w-xl text-lg text-ink/70">
            {PRODUCT.shortDescription} Une expérience premium pensée pour les auteur·rice·s exigeant·e·s.
          </motion.p>
          <motion.div variants={fade} className="flex flex-wrap gap-4">
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-porcelain shadow-lg shadow-ink/10 transition hover:bg-ink/90"
            >
              Commander la masterclass
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="#masterclass"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-6 py-3 text-sm font-semibold text-ink backdrop-blur transition hover:border-gold/40"
            >
              <BookOpen className="size-4" />
              Découvrir le livre compagnon
            </a>
          </motion.div>
          <motion.p variants={fade} className="text-sm text-ink/50">
            À partir de {formatMoney(PRODUCT.amountCents, PRODUCT.currency)} — accès numérique sécurisé.
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex-1"
        >
          <div className="relative mx-auto max-w-md rounded-[2rem] border border-ink/10 bg-white p-8 shadow-xl shadow-ink/5">
            <div className="absolute -right-6 -top-6 size-24 rounded-full bg-gold/15 blur-2xl" />
            <p className="font-serif text-2xl text-ink">« La voix n’est pas un don : c’est un artisanat. »</p>
            <p className="mt-6 text-sm font-medium text-gold-dark">Prisca Makila</p>
            <div className="mt-8 grid gap-3 text-sm text-ink/65">
              <div className="flex items-center justify-between rounded-xl bg-sand/80 px-4 py-3">
                <span>Chapitres</span>
                <span className="font-semibold text-ink">6</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-sand/80 px-4 py-3">
                <span>Livre compagnon</span>
                <span className="font-semibold text-ink">Inclus</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-sand/80 px-4 py-3">
                <span>Dédicaces</span>
                <span className="font-semibold text-ink">De l'auteure</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
