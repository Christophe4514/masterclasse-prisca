"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Cpu, GraduationCap, ListOrdered } from "lucide-react";
import { ALL_DISTINCTIONS, DISTINCTIONS_PREVIEW, INTERNATIONAL_SALONS } from "@/lib/author-distinctions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";

export function AboutAuthor() {
  const [distinctionsOpen, setDistinctionsOpen] = useState(false);

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
              <Image
                src="/images/author.JPG"
                alt="Portrait de Prisca Makila"
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
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
                  Reconnaissance & distinctions nationales et internationales :
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/75">
                  {DISTINCTIONS_PREVIEW.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-terracotta" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-start">
                  <Button
                    type="button"
                    variant="outlineGold"
                    size="sm"
                    className="gap-2"
                    onClick={() => setDistinctionsOpen(true)}
                  >
                    <ListOrdered className="size-4" />
                    Tout voir
                  </Button>
                </div>
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
                  {
                    Icon: GraduationCap,
                    k: "Certification",
                    v: "National University (WES) — Certificate of Completion : Leaders Transform Business Growth Program — 30 h, 3 CEU — sept. 2022",
                  },
                  { Icon: Award, k: "28+", v: "Distinctions & salons" },
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

      <Modal
        open={distinctionsOpen}
        onClose={() => setDistinctionsOpen(false)}
        title="Distinctions & salons internationaux"
        description="Liste des reconnaissances et représentations de la RDC sur la scène internationale."
        className="max-w-2xl"
      >
        <div className="max-h-[min(70vh,560px)] space-y-6 overflow-y-auto pr-1">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-plum">Prix et distinctions</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink/80">
              {ALL_DISTINCTIONS.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-plum">
              Salons internationaux — représentation de la RDC
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/80">
              {INTERNATIONAL_SALONS.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </section>
  );
}
