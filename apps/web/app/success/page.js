import Link from 'next/link';

export default function SuccessPage() {
  return <main className="container section"><span className="eyebrow">Paiement validé</span><h1>Bienvenue dans votre plan MS Prods</h1><p>Votre accès sera synchronisé automatiquement.</p><Link className="btn" href="/dashboard">Aller au dashboard</Link></main>;
}
