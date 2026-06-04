import Link from 'next/link';

export default function CancelPage() {
  return <main className="container section"><span className="eyebrow">Paiement annulé</span><h1>Aucun paiement n’a été finalisé</h1><p>Vous pouvez reprendre le choix du plan quand vous le souhaitez.</p><Link className="btn" href="/pricing">Retour aux tarifs</Link></main>;
}
