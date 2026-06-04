export function SignupForm() {
  return '<form class="auth-form" data-auth="signup"><label>Nom<input name="name" required /></label><label>Email<input type="email" name="email" required /></label><label>Mot de passe<input type="password" name="password" minlength="8" required /></label><button type="submit">Créer mon compte</button></form>';
}
