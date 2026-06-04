import { apiFetch } from './api.js';

export function createCheckoutSession(priceId) {
  return apiFetch('/stripe/checkout', {
    method: 'POST',
    body: JSON.stringify({ priceId })
  });
}
