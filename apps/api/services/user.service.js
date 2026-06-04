import { sha256 } from '../../../security/encryption.js';

const users = new Map();

function sanitizeUser(user) {
  if (!user) return null;
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export async function createUser({ email, password, name }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!normalizedEmail || !password) {
    const error = new Error('Email et mot de passe requis.');
    error.statusCode = 400;
    throw error;
  }
  if (users.has(normalizedEmail)) {
    const error = new Error('Un compte existe déjà avec cet email.');
    error.statusCode = 409;
    throw error;
  }

  const user = {
    id: `usr_${Date.now()}`,
    email: normalizedEmail,
    name: name || normalizedEmail.split('@')[0],
    plan: 'free',
    subscriptionStatus: 'inactive',
    passwordHash: sha256(password),
    createdAt: new Date().toISOString()
  };
  users.set(normalizedEmail, user);
  return sanitizeUser(user);
}

export async function findUserByEmail(email) {
  return sanitizeUser(users.get(String(email || '').trim().toLowerCase()));
}

export async function verifyPassword(email, password) {
  const user = users.get(String(email || '').trim().toLowerCase());
  if (!user || user.passwordHash !== sha256(password)) return null;
  return sanitizeUser(user);
}

export async function setUserPlan(email, plan, subscriptionStatus = 'active') {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const user = users.get(normalizedEmail);
  if (!user) return null;
  user.plan = plan;
  user.subscriptionStatus = subscriptionStatus;
  return sanitizeUser(user);
}
