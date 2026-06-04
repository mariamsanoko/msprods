import express from 'express';
import { stripeConfig } from '../config/stripe.js';
import { applyStripeEvent } from '../services/payment.service.js';
import { verifyStripeSignature } from '../../../security/webhooks-verification.js';

const router = express.Router();

router.post('/', express.raw({ type: 'application/json' }), async (req, res, next) => {
  try {
    const rawBody = req.body.toString('utf8');
    const signature = req.get('stripe-signature') || '';
    if (stripeConfig.webhookSecret && !verifyStripeSignature(rawBody, signature, stripeConfig.webhookSecret)) {
      res.status(400).json({ error: 'Signature Stripe invalide.' });
      return;
    }

    const event = JSON.parse(rawBody);
    res.json(await applyStripeEvent(event));
  } catch (error) {
    next(error);
  }
});

export default router;
