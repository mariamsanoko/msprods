import express from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { findUserByEmail } from '../services/user.service.js';

const router = express.Router();

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    res.json({ user: await findUserByEmail(req.user.email) });
  } catch (error) {
    next(error);
  }
});

export default router;
