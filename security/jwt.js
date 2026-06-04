import crypto from 'node:crypto';

function base64Url(input) {
  return Buffer.from(JSON.stringify(input)).toString('base64url');
}

function sign(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

export function createToken(payload, secret, { expiresInSeconds = 60 * 60 * 24 * 7 } = {}) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const body = { ...payload, iat: now, exp: now + expiresInSeconds };
  const unsigned = `${base64Url(header)}.${base64Url(body)}`;
  return `${unsigned}.${sign(unsigned, secret)}`;
}

export function verifyToken(token, secret) {
  const [encodedHeader, encodedPayload, signature] = String(token || '').split('.');
  if (!encodedHeader || !encodedPayload || !signature) throw new Error('Invalid token.');

  const unsigned = `${encodedHeader}.${encodedPayload}`;
  const expected = sign(unsigned, secret);
  if (signature.length !== expected.length) throw new Error('Invalid token signature.');
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) throw new Error('Invalid token signature.');

  const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) throw new Error('Token expired.');
  return payload;
}
