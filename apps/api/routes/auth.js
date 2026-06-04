import express from 'express';
import { login, signup } from '../services/auth.service.js';
import { authRateLimit } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/signup', authRateLimit, async (req, res, next) => {
  try {
    res.status(201).json(await signup(req.body || {}));
  } catch (error) {
    next(error);
  }
});

router.post('/login', authRateLimit, async (req, res, next) => {
  try {
    res.json(await login(req.body || {}));
  } catch (error) {
    next(error);
  }
});

export default router;
