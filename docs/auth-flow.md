# Flux d’authentification

1. L’utilisateur crée un compte via `/signup`.
2. L’API `/auth/signup` crée le profil et retourne un JWT.
3. Le frontend stocke la session dans un cookie sécurisé `msprods_session`.
4. Le middleware redirige les visiteurs non connectés vers `/login` pour tout accès dashboard.
