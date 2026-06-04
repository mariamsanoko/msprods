import { Router } from 'express';
import { chatRateLimit } from '../middleware/rateLimit.js';
import { routeAiMessage } from '../ai/router.js';

export const chatRouter = Router();

chatRouter.post('/chat', chatRateLimit, async (req, res, next) => {
  try {
    const result = await routeAiMessage({
      message: req.body?.message,
      history: req.body?.history,
      name: req.body?.name
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});
