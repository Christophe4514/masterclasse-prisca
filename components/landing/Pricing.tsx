"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PRODUCT } from "@/lib/constants";
import { formatMoney } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const perks = [
  "Master Classe complète (modules + bonus)",
  "Livre numérique compagnon",
  "Supports PDF & grilles d’atelier",
  "Accès immédiat après paiement",
  "Mises à jour mineures incluses",
];

export function Pricing() {
  return (
    <section id="tarifs" className="border-t border-ink/8 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum">Tarification</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">Une offre unique, premium</h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65">
            Tout ce dont vous avez besoin pour stabiliser votre voix — sans dispersion.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-lg"
        >
          <Card className="border-ink/10 bg-gradient-to-b from-white via-cream/25 to-porcelain shadow-card">
            <CardContent className="p-7 sm:p-9">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-ink/55">Pack complet</p>
                  <div className="mt-2 flex flex-wrap items-baseline gap-2">
                    <p className="font-serif text-4xl tracking-tight text-ink sm:text-5xl">
                      {formatMoney(PRODUCT.amountCents, PRODUCT.currency)}
                    </p>
                    <p className="text-base text-ink/45 line-through decoration-ink/25">
                      {formatMoney(PRODUCT.listPriceCents, PRODUCT.currency)}
                    </p>
                  </div>
                  <p className="mt-1 text-xs font-medium text-terracotta">Offre prévente jusqu&apos;à la sortie du livre</p>
                </div>
                <Badge tone="plum" className="normal-case">
                  Accès digital
                </Badge>
              </div>

              <ul className="mt-8 space-y-3 text-sm text-ink/70">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-gold/15 text-gold-dark ring-1 ring-gold/20">
                      <Check className="size-3.5" />
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-center text-xs font-semibold text-ink/65">
                Accès immédiat après paiement
              </div>

              <ButtonLink href="/checkout" variant="accent" size="xl" className="mt-6 w-full">
                Acheter maintenant
              </ButtonLink>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
