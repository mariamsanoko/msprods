import Link from 'next/link';

const plans = ['free', 'starter', 'pro'];
export default function PricingPage() {
  return <main className="container section"><span className="eyebrow">Tarifs</span><h1>Choisir un plan</h1><div className="pricing-grid">{plans.map((plan) => <article className="card" key={plan}><h2>{plan}</h2><p>Accès adapté pour progresser avec MS Prods.</p><Link className="btn" href="/signup">Choisir</Link></article>)}</div></main>;
}
