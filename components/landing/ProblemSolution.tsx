"use client";

import { motion } from "framer-motion";
import { Feather, HeartHandshake, PenLine, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const problems = [
  {
    icon: PenLine,
    title: "Vous tournoyez dans la forme",
    text: "Des phrases soignées… mais une histoire qui peine à avancer, et un lecteur qui se décroche.",
  },
  {
    icon: Feather,
    title: "Vous doutez de votre voix",
    text: "Vous réécrivez sans fin, craignant d’être trop cru·e, trop sensible, ou pas « assez littéraire ».",
  },
  {
    icon: Sparkles,
    title: "Vous manquez de méthode",
    text: "Vous apprenez au feeling, sans cadre : utile au début, épuisant quand le manuscrit grossit.",
  },
];

const solutions = [
  {
    icon: HeartHandshake,
    title: "Une méthode premium, humaine",
    text: "Des modules courts, exigeants, concrets : cartographier, trancher, resserrer — sans tuer la sensibilité.",
  },
  {
    icon: PenLine,
    title: "Des outils immédiatement actionnables",
    text: "Fiches, grilles, prompts d’atelier : vous réinvestissez chaque leçon dans votre manuscrit le jour même.",
  },
  {
    icon: Sparkles,
    title: "Un livre compagnon qui prolonge",
    text: "Un ebook riche pour relire, annoter, progresser entre deux sessions — comme un mentor dans la poche.",
  },
];

export function ProblemSolution() {
  return (
    <section id="transform" className="border-y border-ink/8 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum">Pourquoi cette Master Classe</p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
            Quand l’écriture devient un labyrinthe, il faut une boussole
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65">
            Ce parcours est pensé pour les voix modernes : celles qui veulent être lues, comprises, aimées — sans
            sacrifier leur singularité.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <p className="text-sm font-semibold text-terracotta">Les blocages fréquents</p>
            <div className="grid gap-4">
              {problems.map((p) => (
                <Card key={p.title} className="border-ink/10 bg-cream/35">
                  <CardContent className="flex gap-4 p-5 sm:p-6">
                    <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-ink/8">
                      <p.icon className="size-5 text-plum" />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{p.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="space-y-4"
          >
            <p className="text-sm font-semibold text-plum">Ce que vous gagnez</p>
            <div className="grid gap-4">
              {solutions.map((p) => (
                <Card key={p.title} className="border-plum/15 bg-gradient-to-br from-white to-cream/60">
                  <CardContent className="flex gap-4 p-5 sm:p-6">
                    <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-2xl bg-plum/10 ring-1 ring-plum/15">
                      <p.icon className="size-5 text-plum" />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{p.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
