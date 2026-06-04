import { signJwt } from '../../../security/jwt.js';
import { findUserByEmail, upsertUser } from './user.service.js';

export async function signup({ email, name }) {
  const user = await upsertUser({ email, name });
  return { user, token: signJwt({ sub: user.email, email: user.email, plan: user.plan }) };
}

export async function login({ email }) {
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error('Compte introuvable.');
    error.statusCode = 404;
    throw error;
  }
  return { user, token: signJwt({ sub: user.email, email: user.email, plan: user.plan }) };
}
