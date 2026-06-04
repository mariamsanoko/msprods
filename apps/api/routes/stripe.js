import express from 'express';
import { createCheckout } from '../services/stripe.service.js';

const router = express.Router();

router.post('/checkout', async (req, res, next) => {
  try {
    res.json(await createCheckout({ priceId: req.body?.priceId, customerEmail: req.body?.customerEmail }));
  } catch (error) {
    next(error);
  }
});

export default router;
