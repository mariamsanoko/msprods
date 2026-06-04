import { StripeCheckout } from '../../../components/billing/StripeCheckout.js';
import { AccessGate } from '../../../components/dashboard/AccessGate.js';

export const metadata = { title: 'Facturation - MS Prods' };

export default function BillingPage({ plan = 'free' } = {}) {
  const content = `<section><h1>Facturation</h1><p>Gère ton abonnement et tes factures.</p>${StripeCheckout({ priceId: 'price_pro' })}</section>`;
  return AccessGate({ plan, feature: 'billing', children: content });
}
