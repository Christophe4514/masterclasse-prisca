"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function AboutPublisher() {
  return (
    <section
      id="editeur"
      className="scroll-mt-28 border-y border-ink/8 bg-gradient-to-b from-cream/40 via-porcelain to-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <motion.div
            className="lg:col-span-7 lg:order-1"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum">L’éditeur</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Les éditions k-possible
            </h2>
            <p className="prose-premium mt-8 text-base leading-relaxed sm:text-lg">
              Les éditions k-possible, avec un modèle dynamique d’accompagnement littéraire, se forgent à rendre
              possible des rêves littéraires d’ici et d’ailleurs depuis 10 ans.
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-5 lg:order-2"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.06 }}
          >
            <Card className="overflow-hidden border-ink/10 bg-white/95 p-0 shadow-sm">
              <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-plum/10 via-cream to-terracotta/10 sm:aspect-[5/4]">
                <Image
                  src="/images/editeur.jpg"
                  alt="Les éditions k-possible"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
