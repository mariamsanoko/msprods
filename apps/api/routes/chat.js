import express from 'express';
import { askCoach } from '../services/ai.service.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    res.json(await askCoach({
      message: req.body?.message,
      history: req.body?.history,
      name: req.body?.name
    }));
  } catch (error) {
    next(error);
  }
});

export default router;
