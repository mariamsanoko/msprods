import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'MS Prods Platform API',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});