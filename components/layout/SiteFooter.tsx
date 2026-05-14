import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, PhoneCall, Youtube } from "lucide-react";
import { SOCIAL, SITE, SUPPORT } from "@/lib/constants";

const social = [
  { href: SOCIAL.instagram, label: "Instagram", Icon: Instagram },
  { href: SOCIAL.facebook, label: "Facebook", Icon: Facebook },
  { href: SOCIAL.youtube, label: "YouTube", Icon: Youtube },
  { href: SOCIAL.linkedin, label: "LinkedIn", Icon: Linkedin },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/8 bg-gradient-to-b from-cream/40 to-porcelain">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-serif text-2xl tracking-tight text-ink">Prisca Makila</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/60">{SITE.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/70 transition hover:border-plum/25 hover:text-ink"
                  aria-label={s.label}
                >
                  <s.Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum">Contact</p>
              <a
                href={`mailto:${SUPPORT.email}`}
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-plum"
              >
                <Mail className="size-4 text-plum" />
                {SUPPORT.email}
              </a>
              <a
                href={`tel:${SUPPORT.phone}`}
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-plum"
              >
                <PhoneCall className="size-4 text-plum" />
                {SUPPORT.phone}
              </a>
              <p className="mt-4 text-xs leading-relaxed text-ink/50">
                Réponse sous 48h ouvrées (indicatif).
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-plum">Liens</p>
              <ul className="mt-3 space-y-2 text-sm text-ink/65">
                <li>
                  <Link href="/checkout" className="hover:text-ink">
                    Paiement sécurisé
                  </Link>
                </li>
                {/* <li>
                  <Link href="/confidentialite" className="hover:text-ink">
                    Politique de confidentialité
                  </Link>
                </li> */}
                {/* <li>
                  <Link href="/admin/login" className="hover:text-ink">
                    Administration
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink/8 pt-8 text-xs text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Prisca Makila. Tous droits réservés.</p>
          <p className="text-ink/40">Design premium — Next.js + Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
