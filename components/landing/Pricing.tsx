"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PRODUCT } from "@/lib/constants";
import { formatMoney } from "@/lib/format";
import { Check } from "lucide-react";

const perks = ["Accès 12 mois", "Livre numérique inclus", "Mises à jour mineures", "Support e-mail 30 jours"];

export function Pricing() {
  return (
    <section id="tarifs" className="border-t border-ink/8 bg-sand/35">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">Offre</p>
          <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">Un investissement pour votre écriture</h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-lg rounded-[2rem] border border-ink/10 bg-white p-8 shadow-xl shadow-ink/5"
        >
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-ink/55">Pack complet</p>
              <p className="mt-1 font-serif text-4xl text-ink">{formatMoney(PRODUCT.amountCents, PRODUCT.currency)}</p>
            </div>
            <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-dark">Accès digital</span>
          </div>
          <ul className="mt-8 space-y-3 text-sm text-ink/75">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Check className="size-4 text-gold-dark" />
                {p}
              </li>
            ))}
          </ul>
          <Link
            href="/checkout"
            className="mt-8 flex w-full items-center justify-center rounded-full bg-ink py-3 text-sm font-semibold text-porcelain transition hover:bg-ink/90"
          >
            Commander
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
