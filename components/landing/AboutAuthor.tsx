"use client";

import { motion } from "framer-motion";
import { Award, Cpu, Factory } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const distinctions = [
  "Forbes 30 Under 30 (2022)",
  "Miss Entrepreneure — Level Up Makutano (2023)",
  "Première Congolaise nominée aux Women in Tech Awards — Afrique du Sud (2024)",
  "Global Entrepreneurship Award — Ghana (2025)",
];

export function AboutAuthor() {
  return (
    <section id="autrice" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <Card className="overflow-hidden border-ink/10 bg-white/95 p-0">
            <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-plum/15 via-cream to-terracotta/15">
              <div className="absolute inset-0 flex items-center justify-center p-10">
                <div className="relative size-44 rounded-full border border-white/60 bg-white/40 shadow-soft backdrop-blur-md sm:size-52">
                  <span className="absolute inset-0 flex items-center justify-center font-serif text-4xl text-ink/35">
                    PM
                  </span>
                </div>
              </div>
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-sm leading-snug text-ink/75 backdrop-blur-md">
                « De la vision technologique à la réalité industrielle. »
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum">À propos de l’auteure</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl">Prisca Makila</h2>
          <p className="mt-3 text-sm font-medium text-ink/60">
            Ingénieure · Fondatrice &amp; CEO · Première œuvre
          </p>

          <Card className="mt-8 border-ink/10 bg-white/90">
            <CardContent className="space-y-6 p-6 sm:p-8">
              <p className="prose-premium">
                Prisca Makila est <strong>ingénieure en Électronique Industrielle et Informatique Appliquée</strong>,
                diplômée de l’<strong>Institut Supérieur de Techniques Appliquées (ISTA)</strong>. Elle est la fondatrice
                et <strong>CEO</strong> de l’entreprise <strong>KIM ENGINEERING</strong> et l’inventrice de la{" "}
                <strong>KIM BOX</strong>, une logette intelligente conçue pour la gestion de l’énergie.
              </p>

              <div className="rounded-2xl border border-gold/20 bg-gold/5 px-5 py-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gold-dark">
                  <Award className="size-4 shrink-0" />
                  Reconnaissance — 26 distinctions nationales et internationales
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/75">
                  {distinctions.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-terracotta" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                  <li className="pl-3 text-xs text-ink/50">… et d’autres prix au fil de son parcours.</li>
                </ul>
              </div>

              <p className="prose-premium">
                Forte d&apos;une expérience de terrain allant du <strong>prototypage</strong> à la{" "}
                <strong>commercialisation à l&apos;échelle nationale</strong> (Kinshasa, Lubumbashi), elle signe ici{" "}
                <strong>son premier ouvrage</strong>. À travers ce récit sans détour, Prisca Makila livre les{" "}
                <strong>clés opérationnelles</strong> et les <strong>stratégies de résilience</strong> indispensables
                pour transformer une <strong>vision technologique</strong> en une <strong>réalité industrielle</strong>.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { Icon: Cpu, k: "Formation", v: "ISTA — Électronique & informatique appliquée" },
                  { Icon: Factory, k: "Terrain", v: "Prototypage → échelle nationale (RDC)" },
                  { Icon: Award, k: "26+", v: "Distinctions & prix" },
                ].map(({ Icon, k, v }) => (
                  <div key={k} className="rounded-2xl border border-ink/8 bg-cream/50 px-4 py-4">
                    <Icon className="size-5 text-plum" aria-hidden />
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink/45">{k}</p>
                    <p className="mt-2 text-sm font-semibold leading-snug text-ink">{v}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
