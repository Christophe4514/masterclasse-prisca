# Masterclasse Prisca Makila

Site vitrine et checkout pour vendre une **masterclass / livre numérique** de **Prisca Makila**.  
Stack : **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Prisma 5**, **PostgreSQL (Neon)**, **React Hook Form**, **Zod**, **Framer Motion**, **Lucide**, **Resend**, **TanStack Table** (admin).

## Prérequis

- Node.js 20+
- Compte [Neon](https://neon.tech) (gratuit)
- (Optionnel) Compte [Resend](https://resend.com) pour les e-mails
- (Optionnel) Compte [Vercel](https://vercel.com) pour le déploiement

## Installation

```bash
npm install
```

Copiez les variables d’environnement :

```bash
cp .env.example .env
```

Renseignez au minimum `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SECRET`, `PAYMENT_WEBHOOK_SECRET` et `NEXT_PUBLIC_SITE_URL`.

## Base de données (Neon + Prisma)

1. Créez un projet sur [Neon](https://console.neon.tech) et récupérez l’URL **pooled** (adaptée au serverless).
2. Collez-la dans `.env` :

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST/neondb?sslmode=require"
   ```

3. Poussez le schéma :

   ```bash
   npx prisma db push
   ```

   En équipe ou pour l’historique des migrations :

   ```bash
   npx prisma migrate dev --name init
   ```

4. (Optionnel) Interface graphique :

   ```bash
   npm run db:studio
   ```

## Lancement local

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Scripts utiles

| Script            | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Serveur de développement |
| `npm run build`   | Build production           |
| `npm run start`   | Démarrer après build       |
| `npm run lint`    | ESLint                     |
| `npm run db:push` | Synchroniser le schéma     |
| `npm run db:studio` | Prisma Studio            |

## Déploiement (Vercel Free)

1. Poussez le dépôt sur GitHub / GitLab.
2. Importez le projet dans Vercel.
3. Ajoutez les **mêmes variables** que dans `.env` (onglet *Environment Variables*), notamment `DATABASE_URL` Neon.
4. Déployez. Le script `postinstall` exécute `prisma generate` automatiquement.

Conseils :

- Utilisez l’URL **pooled** Neon pour limiter les connexions sur les fonctions serverless.
- Définissez `NEXT_PUBLIC_SITE_URL` sur l’URL de production (`https://votre-domaine.vercel.app` ou domaine custom).

## Administration

- URL : `/admin/login`
- Variables : `ADMIN_PASSWORD` (mot de passe saisi) et `ADMIN_SECRET` (secret long pour dériver le cookie de session, **ne pas partager**).
- Export CSV : bouton sur le tableau de bord → `GET /api/admin/export` (cookie admin requis).

## Paiement & webhook

- **`POST /api/checkout`** : crée une commande `PENDING` + une livraison `PENDING`. Les commentaires dans le fichier indiquent où brancher Stripe / Lemon Squeezy / autre.
- **`POST /api/payment-webhook`** : exemple minimal protégé par le header `x-webhook-secret` (valeur = `PAYMENT_WEBHOOK_SECRET`). En production, remplacez par la vérification de signature du prestataire (ex. `stripe.webhooks.constructEvent` avec le **raw body**).

Test manuel du webhook (après une commande créée) :

```bash
curl -X POST http://localhost:3000/api/payment-webhook \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: VOTRE_SECRET" \
  -d "{\"orderId\":\"ID_DE_LA_COMMANDE\",\"paymentReference\":\"test-123\",\"paid\":true}"
```

Les e-mails (Resend) partent si `RESEND_API_KEY` et `RESEND_FROM_EMAIL` sont configurés. Sinon, un log console indique que l’envoi est ignoré.

## Structure du dépôt

- `app/` — routes App Router, pages, API.
- `components/` — UI (landing, layout, checkout, admin).
- `lib/` — Prisma client, e-mails, constantes, validateurs.
- `actions/` — Server Actions (auth admin).
- `prisma/` — schéma et migrations.
- `types/` — types partagés.
- `hooks/` — hooks React réutilisables.

## Personnalisation

- Produit / prix : `lib/constants.ts` (`PRODUCT.amountCents`, textes).
- Palette : `app/globals.css` (`:root` et `@theme inline`).
- Lien de livraison post-paiement : `DIGITAL_DELIVERY_URL` dans `.env`.

## Licence

Voir le fichier `LICENSE` à la racine du dépôt.
