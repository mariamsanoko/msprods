import { env } from '../config/env.js';
import { createToken } from '../../../security/jwt.js';
import { createUser, verifyPassword } from './user.service.js';

function issueSession(user) {
  const accessToken = createToken({ sub: user.id, email: user.email, plan: user.plan }, env.jwtSecret);
  return { user, accessToken };
}

export async function signup(data) {
  const user = await createUser(data);
  return issueSession(user);
}

export async function login({ email, password }) {
  const user = await verifyPassword(email, password);
  if (!user) {
    const error = new Error('Identifiants invalides.');
    error.statusCode = 401;
    throw error;
  }
  return issueSession(user);
}
