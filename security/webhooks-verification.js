import crypto from 'node:crypto';

export function verifyStripeSignature({ rawBody, signatureHeader, secret, toleranceSeconds = 300 }) {
  if (!rawBody || !signatureHeader || !secret) throw new Error('Stripe webhook signature inputs are required.');

  const parts = Object.fromEntries(signatureHeader.split(',').map((part) => part.split('=')));
  const timestamp = Number(parts.t);
  const signature = parts.v1;
  if (!timestamp || !signature) throw new Error('Invalid Stripe signature header.');

  const age = Math.abs(Math.floor(Date.now() / 1000) - timestamp);
  if (age > toleranceSeconds) throw new Error('Stripe signature timestamp is outside tolerance.');

  const payload = `${timestamp}.${rawBody}`;
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    throw new Error('Invalid Stripe webhook signature.');
  }

  return true;
}
