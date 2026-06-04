import { createCheckoutSession } from '../../lib/stripe.js';

export async function startStripeCheckout(priceId) {
  const session = await createCheckoutSession(priceId);
  if (session.url) globalThis.location.href = session.url;
  return session;
}

export function StripeCheckout({ priceId = '' } = {}) {
  return `<button data-price-id="${priceId}" data-action="stripe-checkout">Passer au plan Pro</button>`;
}
