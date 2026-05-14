"use client";

import { motion } from "framer-motion";
import {
  ListOrdered,
  MessageCircleWarning,
  MessagesSquare,
  ShieldAlert,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/** Aligné sur l’avant-propos « Le prix du chemin » — Master class by Prisca Makila */
const problems = [
  {
    icon: Users,
    title: "Peu de visibilité des femmes dans le STEM",
    text: "Représentation limitée et manque de modèles féminins en ingénierie : difficile de s’y projeter quand on ne voit presque personne « comme soi » sur le terrain.",
  },
  {
    icon: MessageCircleWarning,
    title: "Stéréotypes et critiques",
    text: "Un secteur encore très masculin : casser les clichés, encaisser les jugements et rester concentrée sur son objectif demande des stratégies — pas seulement de la volonté.",
  },
  {
    icon: Workflow,
    title: "De l’idée au produit qui se vend",
    text: "Beaucoup d’étudiantes et de futures techpreneures ne savent pas comment passer d’une vision innovante à un prototype, puis à un produit fini, commercialisé et apprécié sur le marché.",
  },
];

const solutions = [
  {
    icon: MessagesSquare,
    title: "Des réponses réelles sur le parcours",
    text: "Une master class pensée pour répondre aux questions concrètes sur le chemin parcouru et les difficultés rencontrées — pour les jeunes femmes en STEM, les futures techpreneures et toute personne porteuse d’une vision innovante.",
  },
  {
    icon: ShieldAlert,
    title: "Gérer l’hostilité et cadrer la vision",
    text: "Des directives pour affronter les stéréotypes et les critiques, et des méthodes pour transformer une simple idée en vision concrète, actionnable.",
  },
  {
    icon: ListOrdered,
    title: "Les 12 vérités du parcours",
    text: "Le partage des douze leçons tirées du vécu : des repères pour passer d’une vision technologique à une réalité industrielle, sans détour.",
  },
];

export function ProblemSolution() {
  return (
    <section id="transform" className="scroll-mt-28 border-y border-ink/8 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum">
            Master class : Le prix du chemin
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
            Pourquoi ce parcours existe
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/65">
            Ce livre compagnon répond à un constat : le besoin de parler du manque de femmes dans le STEM, et d’offrir un
            guide pour avancer dans une industrie dominée par les hommes :
            <br />
            <span className="mt-1 inline-block sm:mt-0">du prototypage au produit industriel abouti.</span>
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
            <p className="text-sm font-semibold text-terracotta">Les défis au cœur du récit</p>
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
            <p className="text-sm font-semibold text-plum">Ce que la master class vous apporte</p>
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

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-gold/25 bg-gold/5 px-6 py-5 text-center sm:flex-row sm:text-left"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white ring-1 ring-gold/20">
            <Target className="size-5 text-gold-dark" />
          </span>
          <p className="text-sm leading-relaxed text-ink/75">
            <strong className="text-ink">Objectif :</strong> transformer une vision technologique en réalité industrielle
            — avec les clés opérationnelles et la résilience indispensables pour tenir le chemin.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
