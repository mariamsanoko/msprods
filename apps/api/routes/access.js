import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { getPlanCapabilities, hasAccess } from '../services/access.service.js';

export const accessRouter = Router();

accessRouter.get('/access', requireAuth, (req, res) => {
  const plan = req.user?.plan || 'free';
  const capability = req.query.capability;
  res.json({ plan, capabilities: getPlanCapabilities(plan), allowed: capability ? hasAccess(plan, capability) : true });
});
