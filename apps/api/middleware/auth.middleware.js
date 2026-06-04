import { verifyJwt } from '../../../security/jwt.js';

export function requireAuth(req, _res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) {
    const error = new Error('Authentification requise.');
    error.statusCode = 401;
    next(error);
    return;
  }

  try {
    req.user = verifyJwt(token);
    next();
  } catch {
    const error = new Error('Session invalide ou expirée.');
    error.statusCode = 401;
    next(error);
  }
}
