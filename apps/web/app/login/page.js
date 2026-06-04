import { LoginForm } from '../../components/auth/LoginForm.js';

export const metadata = { title: 'Connexion - MS Prods' };

export default function LoginPage() {
  return `<main><h1>Connexion</h1><p>Accède à ton dashboard, tes formations et ton coach IA.</p>${LoginForm()}</main>`;
}
