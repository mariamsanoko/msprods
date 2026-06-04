import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { answerChat } from './src/chat-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 3000);
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

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
app.use(express.json({ limit: '32kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(rateLimit({ windowMs: 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false }));

app.use('/public', express.static(path.join(__dirname, 'public'), { maxAge: '1h', dotfiles: 'deny' }));

const allowedStaticExtensions = new Set(['.html', '.css', '.ico', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.txt']);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:asset', (req, res, next) => {
  const asset = path.basename(req.params.asset);
  const extension = path.extname(asset);
  if (!allowedStaticExtensions.has(extension)) return next();
  res.sendFile(path.join(__dirname, asset));
});

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'MS Prods Airtable Brain' });
});

app.post('/chat', async (req, res, next) => {
  try {
    const result = await answerChat({
      message: req.body?.message,
      history: req.body?.history,
      name: req.body?.name
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  const isOperational = statusCode < 500;
  if (!isOperational) console.error(error);
  res.status(statusCode).json({
    error: isOperational ? error.message : 'Le chatbot est momentanément indisponible. Réessayez dans quelques instants.'
  });
});

app.listen(port, () => {
  console.log(`MS Prods Airtable Brain listening on http://localhost:${port}`);
});
