# Modèle de sécurité MS Prods

- Les routes `/dashboard` sont protégées côté Next.js par `apps/web/middleware.js` et côté client par `AuthGuard`.
- Les routes API privées utilisent un JWT signé par `security/jwt.js`.
- Stripe est vérifié avec la signature du webhook avant tout traitement métier.
- Les clés OpenAI, Airtable, Stripe et Supabase restent côté serveur.
