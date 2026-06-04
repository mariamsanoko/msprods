import express from 'express';
import { checkAccess } from '../services/access.service.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(checkAccess(req.query.plan, req.query.feature));
});

export default router;
