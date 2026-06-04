import { Router } from 'express';
import { verifyStripeSignature } from '../../../security/webhooks-verification.js';
import { stripeConfig } from '../config/stripe.js';

export const stripeWebhookRouter = Router();

stripeWebhookRouter.post('/webhooks/stripe', expressRawJson, (req, res, next) => {
  try {
    verifyStripeSignature({ rawBody: req.rawBody, signatureHeader: req.headers['stripe-signature'], secret: stripeConfig.webhookSecret });
    res.json({ received: true });
  } catch (error) {
    next(error);
  }
});

function expressRawJson(req, res, next) {
  let data = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => { data += chunk; });
  req.on('end', () => {
    req.rawBody = data;
    try {
      req.body = data ? JSON.parse(data) : {};
      next();
    } catch {
      res.status(400).json({ error: 'Invalid JSON payload.' });
    }
  });
}
