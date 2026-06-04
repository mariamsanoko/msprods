import { SignupForm } from '../../components/auth/SignupForm.js';

export const metadata = { title: 'Inscription - MS Prods' };

export default function SignupPage() {
  return `<main><h1>Créer un compte</h1><p>Démarre ton parcours MS Prods en quelques secondes.</p>${SignupForm()}</main>`;
}
