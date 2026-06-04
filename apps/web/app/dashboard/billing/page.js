import StripeCheckout from '../../../components/billing/StripeCheckout';

export default function BillingPage() {
  return <><span className="eyebrow">Facturation</span><h1>Abonnement</h1><section className="card"><p>Gérez votre plan et activez l’accès complet via Stripe.</p><StripeCheckout plan="pro" /></section></>;
}
