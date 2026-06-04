import { setUserPlan } from './user.service.js';

export async function applyStripeEvent(event) {
  const type = event?.type || '';
  const customerEmail = event?.data?.object?.customer_email || event?.data?.object?.customer_details?.email || '';

  if (type === 'checkout.session.completed' && customerEmail) {
    await setUserPlan(customerEmail, 'pro', 'active');
    return { processed: true, action: 'subscription_activated' };
  }

  return { processed: false, action: 'ignored' };
}
