# MS Prods Platform

Plateforme SaaS MS Prods pour `msprods.fr` : frontend public, espace privé protégé, coach IA connecté à Airtable, API Express, Stripe, Supabase/RLS et documentation sécurité.

## Arborescence cible

```text
apps/web      Frontend : landing, login, signup, dashboard, pricing, success/cancel
apps/api      Backend : auth, chat IA, Stripe, webhooks, users, access, health
database      Schéma Supabase, RLS, migrations et seed
security      JWT, helpers crypto, vérification webhooks, rate-limit partagé
infra         Notes de déploiement Stripe, Cloudflare, Vercel, Railway, env
docs          Flows auth, Stripe, sécurité et architecture SaaS
```

## Fonctionnalités

- Landing et pages SaaS structurées dans `apps/web/app`.
- Dashboard protégé avec sections formations, coach IA, billing et settings.
- Composants frontend dédiés à l’auth, au dashboard, à l’IA et à Stripe.
- API Express modulaire dans `apps/api`.
- Réutilisation du chatbot Airtable Brain existant pour le coach IA.
- Auth JWT, rate limiting, CORS, Helmet et gestion d’erreurs centralisée.
- Checkout Stripe et webhook Stripe avec vérification de signature.
- Schéma Supabase et policies RLS pour utilisateurs, abonnements et paiements.

## Installation

```bash
npm install
```

Copier l’exemple d’environnement :

```bash
cp .env.example .env
```

Renseigner ensuite les clés OpenAI, Airtable, Supabase, JWT et Stripe.

## Développement

Démarrer la nouvelle API plateforme :

```bash
npm run dev
```

Health check :

```bash
curl http://localhost:3000/health
```

## Scripts

```bash
npm start       # démarre apps/api/server.js
npm run dev     # démarre apps/api/server.js en watch
npm run check   # vérifie la syntaxe JS des dossiers platform + legacy
```

Les scripts `legacy:start` et `legacy:dev` restent disponibles pour l’ancien serveur racine `server.js`.

## Variables d’environnement principales

- `OPENAI_API_KEY`, `OPENAI_MODEL`
- `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_FORMATIONS_TABLE`, `AIRTABLE_FAQ_TABLE`, `AIRTABLE_PARCOURS_TABLE`
- `JWT_SECRET`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRO_PRICE_ID`, `STRIPE_ENTERPRISE_PRICE_ID`
- `ALLOWED_ORIGINS`, `FRONTEND_URL`, `NEXT_PUBLIC_API_BASE_URL`

## Sécurité

- Les secrets restent côté backend et ne doivent jamais être exposés dans `apps/web`.
- Le middleware frontend redirige les routes `/dashboard/*` sans cookie de session.
- Les routes privées API utilisent un JWT signé par `JWT_SECRET`.
- Les webhooks Stripe sont validés avec `STRIPE_WEBHOOK_SECRET`.
- Les tables Supabase disposent de policies RLS dans `database/rls-policies.sql`.
