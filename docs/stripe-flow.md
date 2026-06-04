# Stripe flow

1. Le dashboard facturation appelle `/stripe/checkout`.
2. L'API génère ou retourne l'URL de paiement configurée.
3. Stripe redirige vers `/success` ou `/cancel`.
4. Le webhook `/webhooks/stripe` vérifie la signature avant mise à jour des droits.
