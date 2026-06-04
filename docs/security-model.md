# Modèle de sécurité MS Prods

- Les routes `/dashboard/*` sont protégées côté frontend par le middleware.
- Les routes API privées utilisent un JWT signé côté serveur.
- Les secrets OpenAI, Airtable, Supabase et Stripe restent dans l’environnement backend.
- Les webhooks Stripe sont validés avec la signature `stripe-signature` avant traitement.
- Les tables Supabase activent RLS pour limiter la lecture aux ressources du propriétaire.
