import Link from 'next/link';
import LoginForm from '../../components/auth/LoginForm';

export default function LoginPage() {
  return <main className="container section"><span className="eyebrow">Connexion</span><h1>Accéder à mon espace privé</h1><LoginForm /><p>Pas encore de compte ? <Link href="/signup">Créer un compte</Link></p></main>;
}
