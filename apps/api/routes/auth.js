import { Router } from 'express';
import { login, signup } from '../services/auth.service.js';

export const authRouter = Router();

authRouter.post('/auth/signup', async (req, res, next) => {
  try {
    res.status(201).json(await signup(req.body || {}));
  } catch (error) {
    next(error);
  }
});

authRouter.post('/auth/login', async (req, res, next) => {
  try {
    res.json(await login(req.body || {}));
  } catch (error) {
    next(error);
  }
});
