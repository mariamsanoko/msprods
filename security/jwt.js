import crypto from 'node:crypto';

function base64Url(input) {
  return Buffer.from(JSON.stringify(input)).toString('base64url');
}

function signPayload(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

export function signJwt(payload, { expiresInSeconds = 60 * 60 * 24 * 7 } = {}) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is required.');

  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const body = { ...payload, iat: now, exp: now + expiresInSeconds };
  const unsigned = `${base64Url(header)}.${base64Url(body)}`;
  return `${unsigned}.${signPayload(unsigned, secret)}`;
}

export function verifyJwt(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is required.');

  const [header, payload, signature] = String(token || '').split('.');
  if (!header || !payload || !signature) throw new Error('Malformed token.');

  const unsigned = `${header}.${payload}`;
  const expected = signPayload(unsigned, secret);
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    throw new Error('Invalid token signature.');
  }

  const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) throw new Error('Expired token.');
  return decoded;
}
