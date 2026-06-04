export const stripeConfig = {
  checkoutUrl: process.env.STRIPE_CHECKOUT_URL || '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || ''
};
