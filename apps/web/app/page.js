import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <header className="container nav">
        <Link className="brand" href="/"><span className="brand-mark">MS</span><span>MS Prods Platform</span></Link>
        <nav className="nav-links"><Link href="/pricing">Tarifs</Link><Link href="/login">Connexion</Link><Link className="btn" href="/signup">Démarrer</Link></nav>
      </header>
      <main>
        <section className="container hero two-cols grid">
          <div>
            <span className="eyebrow">Microsoft • IA • NoCode</span>
            <h1>Formez-vous, automatisez et pilotez votre progression.</h1>
            <p>Une plateforme SaaS claire pour accéder aux formations MS Prods, au coach IA, à la facturation Stripe et à un espace privé sécurisé.</p>
            <p><Link className="btn" href="/signup">Créer mon accès</Link> <Link className="btn secondary" href="/pricing">Voir les plans</Link></p>
          </div>
          <div className="card"><h2>Votre parcours recommandé</h2><p>Power Platform, Dynamics 365, Power Automate ou IA & NoCode : le dashboard centralise vos modules et vous guide étape par étape.</p></div>
        </section>
        <section className="container section feature-grid">
          {['Formations structurées', 'Coach IA relié au BRAIN_MS', 'Paiements et accès sécurisés'].map((item) => <article className="card" key={item}><h3>{item}</h3><p>Une brique prête pour une plateforme professionnelle msprods.fr.</p></article>)}
        </section>
      </main>
    </>
  );
}
