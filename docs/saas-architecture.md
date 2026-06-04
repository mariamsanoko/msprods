# Architecture SaaS MS Prods

```text
apps/web        Frontend public, auth, dashboard et billing
apps/api        API Express, IA, Stripe, accès et utilisateurs
database        Schéma Supabase, migrations et policies RLS
security        JWT, chiffrement, webhooks et rate limiting partagés
infra           Notes de configuration Vercel, Railway, Cloudflare et Stripe
```

Le backend existant Airtable Brain reste réutilisé par le service `ai.service.js` pour conserver la base de connaissances formations/FAQ/parcours.
