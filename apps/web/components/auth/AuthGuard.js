import { isAuthenticated } from '../../lib/auth.js';

export function AuthGuard(session, content) {
  if (!isAuthenticated(session)) {
    return '<section class="auth-required"><h1>Connexion requise</h1><p>Connecte-toi pour accéder à ton espace privé.</p><a href="/login">Se connecter</a></section>';
  }

  return content;
}
