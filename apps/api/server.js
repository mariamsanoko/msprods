import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { apiRateLimit } from './middleware/rateLimit.js';
import { errorHandler } from './middleware/errorHandler.js';
import accessRoutes from './routes/access.js';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import healthRoutes from './routes/health.js';
import stripeRoutes from './routes/stripe.js';
import stripeWebhookRoutes from './routes/webhook-stripe.js';
import userRoutes from './routes/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || env.allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Origin not allowed by CORS.'));
  }
}));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use('/webhook-stripe', stripeWebhookRoutes);
app.use(express.json({ limit: '64kb' }));
app.use(apiRateLimit);
app.use('/public', express.static(path.join(__dirname, '../../public'), { maxAge: '1h', dotfiles: 'deny' }));

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/stripe', stripeRoutes);
app.use('/users', userRoutes);
app.use('/access', accessRoutes);
app.use('/health', healthRoutes);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`MS Prods API listening on http://localhost:${env.port}`);
});
