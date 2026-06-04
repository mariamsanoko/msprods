export function getStripeCheckoutUrl({ plan = 'pro', email = '' } = {}) {
  const configuredUrl = process.env.STRIPE_CHECKOUT_URL;
  if (!configuredUrl) {
    const error = new Error('STRIPE_CHECKOUT_URL is not configured.');
    error.statusCode = 503;
    throw error;
  }

  const url = new URL(configuredUrl);
  url.searchParams.set('client_reference_id', email || 'anonymous');
  url.searchParams.set('plan', plan);
  return url.toString();
}
