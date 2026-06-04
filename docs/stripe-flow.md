# Flux Stripe

1. Le frontend appelle `/stripe/checkout` avec le `priceId` choisi.
2. L’API crée une session Checkout Stripe en mode abonnement.
3. Stripe redirige vers `/success` ou `/cancel`.
4. Le webhook `/webhook-stripe` active le plan utilisateur après `checkout.session.completed`.
