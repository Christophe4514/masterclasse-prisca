"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Léa M.",
    role: "Romancière",
    text: "Une clarté rare : j’ai enfin arrêté de tourner autour de mes scènes. Le livre compagnon est une pépite.",
    initials: "LM",
    rating: 5,
  },
  {
    name: "Thomas K.",
    role: "Scénariste",
    text: "Des outils concrets, une exigence bienveillante. Mes dialogues ont gagné en densité sans perdre en respiration.",
    initials: "TK",
    rating: 5,
  },
  {
    name: "Aminata D.",
    role: "Essayiste",
    text: "On sent une pratique réelle de l’écriture. Premium, humain, crédible — exactement ce que je cherchais.",
    initials: "AD",
    rating: 5,
  },
];

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < value ? "fill-gold/85 text-gold" : "fill-transparent text-ink/15"}`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum">Témoignages</p>
        <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">La confiance se mérite</h2>
        <p className="mt-4 text-base leading-relaxed text-ink/65">
          Des retours de lecteur·rice·s et d’écrivain·e·s qui ont choisi l’exigence — sans sacrifier la douceur du
          parcours.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <Card className="h-full border-ink/10 bg-gradient-to-b from-white to-cream/40">
              <CardContent className="flex h-full flex-col p-6 sm:p-7">
                <Stars value={r.rating} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/75">« {r.text} »</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-plum/15 to-terracotta/15 text-sm font-semibold text-ink ring-1 ring-ink/10">
                    {r.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{r.name}</p>
                    <p className="truncate text-xs text-ink/55">{r.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
