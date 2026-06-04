import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ ok: true, service: 'MS Prods API', timestamp: new Date().toISOString() });
});

export default router;
