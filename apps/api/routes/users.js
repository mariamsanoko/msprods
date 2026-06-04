import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';

export const usersRouter = Router();

usersRouter.get('/users/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});
