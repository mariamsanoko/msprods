import { Router } from 'express';
import { createCheckoutSession } from '../services/payment.service.js';

export const stripeRouter = Router();

stripeRouter.post('/stripe/checkout', async (req, res, next) => {
  try {
    res.json(await createCheckoutSession({ plan: req.body?.plan, email: req.body?.email }));
  } catch (error) {
    next(error);
  }
});
