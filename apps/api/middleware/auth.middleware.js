import { env } from '../config/env.js';
import { verifyToken } from '../../../security/jwt.js';

export function requireAuth(req, res, next) {
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : req.cookies?.msprods_session;

  try {
    req.user = verifyToken(token, env.jwtSecret);
    next();
  } catch {
    res.status(401).json({ error: 'Authentification requise.' });
  }
}
