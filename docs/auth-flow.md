# Auth flow

1. L'utilisateur s'inscrit ou se connecte via `/signup` ou `/login`.
2. Le frontend appelle `/auth/signup` ou `/auth/login`.
3. L'API retourne un JWT stocké en cookie `msprods_token` et en `localStorage`.
4. Le middleware Next.js redirige les visiteurs non authentifiés hors du dashboard.
