import { getStripeCheckoutUrl } from './stripe.service.js';

export async function createCheckoutSession({ plan, email }) {
  return { url: getStripeCheckoutUrl({ plan, email }) };
}
