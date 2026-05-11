"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const quotes = [
  {
    text: "J’ai enfin compris comment tenir une scène sans la sur-expliquer. Une claque douce.",
    author: "Léa M.",
    role: "Romancière débutante",
  },
  {
    text: "Une rigueur rare, jamais intimidante. Mes dialogues ont gagné en respiration.",
    author: "Thomas K.",
    role: "Scénariste",
  },
  {
    text: "Le livre numérique se lit comme un carnet d’autrice : précis, incisif, généreux.",
    author: "Aminata D.",
    role: "Essayiste",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">Témoignages</p>
        <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">Des voix qui se sont déplacées</h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {quotes.map((q, i) => (
          <motion.figure
            key={q.author}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="flex h-full flex-col rounded-2xl border border-ink/8 bg-gradient-to-b from-white to-sand/50 p-6 shadow-sm"
          >
            <Quote className="size-8 text-gold/50" />
            <blockquote className="mt-4 flex-1 text-ink/80">« {q.text} »</blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-semibold text-ink">{q.author}</span>
              <span className="block text-ink/55">{q.role}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
