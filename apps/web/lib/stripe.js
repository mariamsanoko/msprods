import { apiFetch } from './api';

export async function startCheckout({ plan, email }) {
  return apiFetch('/stripe/checkout', { method: 'POST', body: JSON.stringify({ plan, email }) });
}
