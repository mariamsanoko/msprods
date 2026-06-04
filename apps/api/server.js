import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { readEnv } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiRateLimit } from './middleware/rateLimit.js';
import { accessRouter } from './routes/access.js';
import { authRouter } from './routes/auth.js';
import { chatRouter } from './routes/chat.js';
import { healthRouter } from './routes/health.js';
import { stripeRouter } from './routes/stripe.js';
import { stripeWebhookRouter } from './routes/webhook-stripe.js';
import { usersRouter } from './routes/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');
const { port, nodeEnv, allowedOrigins } = readEnv();
const app = express();

app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Origin not allowed by CORS.'));
  }
}));
app.use(morgan(nodeEnv === 'production' ? 'combined' : 'dev'));

app.use(stripeWebhookRouter);
app.use(express.json({ limit: '64kb' }));
app.use(apiRateLimit);
app.use('/public', express.static(path.join(rootDir, 'public'), { maxAge: '1h', dotfiles: 'deny' }));

app.use(healthRouter, authRouter, chatRouter, stripeRouter, usersRouter, accessRouter);

if (nodeEnv !== 'production') {
  const allowedStaticExtensions = new Set(['.html', '.css', '.ico', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.txt']);
  app.get('/', (_req, res) => res.sendFile(path.join(rootDir, 'index.html')));
  app.get('/:asset', (req, res, next) => {
    const asset = path.basename(req.params.asset);
    if (!allowedStaticExtensions.has(path.extname(asset))) return next();
    res.sendFile(path.join(rootDir, asset));
  });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`MS Prods Platform API listening on http://localhost:${port}`);
});
