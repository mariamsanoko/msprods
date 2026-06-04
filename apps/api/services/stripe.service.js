import { env } from '../config/env.js';
import { stripeConfig } from '../config/stripe.js';

export async function createCheckout({ priceId, customerEmail }) {
  if (!stripeConfig.secretKey) {
    const error = new Error('Stripe non configuré.');
    error.statusCode = 503;
    throw error;
  }

  const params = new URLSearchParams({
    mode: 'subscription',
    'line_items[0][price]': priceId || stripeConfig.proPriceId,
    'line_items[0][quantity]': '1',
    success_url: `${env.frontendUrl}/success`,
    cancel_url: `${env.frontendUrl}/cancel`
  });
  if (customerEmail) params.set('customer_email', customerEmail);

  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeConfig.secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });
  const payload = await response.json();
  if (!response.ok) {
    const error = new Error(payload.error?.message || 'Création checkout impossible.');
    error.statusCode = response.status;
    throw error;
  }
  return { id: payload.id, url: payload.url };
}
